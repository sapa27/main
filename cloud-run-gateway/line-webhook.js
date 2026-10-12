'use strict';

const crypto=require('node:crypto');
const sheets=require('./google-sheets-repository');
const intentAi=require('./line-intent-ai');

const LINE_REPLY_ENDPOINT='https://api.line.me/v2/bot/message/reply';
const TZ='Asia/Bangkok';
const DATA_PROBE_TTL_MS=60000;
let dataProbeCache={expiresAt:0,value:null,promise:null};

function txt(v){return v==null?'':String(v)}
function fail(message,code='LINE_QA_ERROR',status=500){const e=new Error(message);e.code=code;e.status=status;return e}

function config(env=process.env){
  return {
    channelSecret:txt(env.LINE_CHANNEL_SECRET).trim(),
    channelAccessToken:txt(env.LINE_CHANNEL_ACCESS_TOKEN).trim(),
    allowedGroupIds:new Set(txt(env.LINE_ALLOWED_GROUP_IDS).split(',').map(x=>x.trim()).filter(Boolean)),
    maxReplyChars:Math.max(500,Math.min(4900,+env.LINE_QA_MAX_REPLY_CHARS||4000)),
    sheetTimeoutMs:Math.max(5000,Math.min(45000,+env.LINE_QA_SHEETS_TIMEOUT_MS||30000))
  };
}

function status(env=process.env){
  const c=config(env);
  return {
    enabled:!!(c.channelSecret&&c.channelAccessToken&&c.allowedGroupIds.size),
    signatureConfigured:!!c.channelSecret,
    replyTokenConfigured:!!c.channelAccessToken,
    allowedGroupCount:c.allowedGroupIds.size,
    readOnly:true,
    sheets:['MainData','Letters'],
    intents:['case-status','case-summary','case-officer','due-today','due-soon','overdue'],
    naturalLanguage:intentAi.status(env)
  };
}

function secureEqual(a,b){
  const x=Buffer.from(txt(a)),y=Buffer.from(txt(b));
  return x.length===y.length&&crypto.timingSafeEqual(x,y);
}

function signatureFor(raw,secret){
  return crypto.createHmac('sha256',secret).update(raw).digest('base64');
}

function verifySignature(raw,signature,secret){
  if(!secret)throw fail('LINE channel secret is not configured','LINE_SECRET_NOT_CONFIGURED',503);
  if(!signature)return false;
  return secureEqual(signatureFor(raw,secret),signature);
}

function normalizeText(value){return txt(value).replace(/\s+/g,' ').trim()}
function normalizeKey(value){return normalizeText(value).toLowerCase()}

function parseIntent(text){
  const q=normalizeText(text);
  if(!q)return{type:'help'};
  if(/(?:ลบ|แก้ไข|บันทึก|อัปเดต|เพิ่ม|เปลี่ยนสถานะ|อนุมัติ|ยกเลิก)/.test(q))return{type:'blocked-write',query:q};
  let m;
  if((m=q.match(/(?:เจ้าหน้าที่|ผู้รับผิดชอบ)(?:เรื่อง|ลำดับเรื่อง)?\s*(\d+)\b/i)))return{type:'case-officer',caseNum:m[1]};
  if(/^(?:ใครรับผิดชอบ|ใครเป็นผู้รับผิดชอบ|ใครเป็นเจ้าหน้าที่|เจ้าหน้าที่คือใคร|ผู้รับผิดชอบคือใคร)[?？ ]*$/i.test(q))return{type:'due-today-officer'};
  if((m=q.match(/(?:สถานะ|เลขรับเรื่อง|เลขรับ)?\s*(\d+\/\d{4})\b/i))&&q.includes('สถานะ'))return{type:'case-status',recNo:m[1]};
  if((m=q.match(/\b(\d+\/\d{4})\b/)))return{type:'case-summary',recNo:m[1]};
  if((m=q.match(/(?:เรื่อง|ลำดับเรื่อง)\s*(\d+)\b/i)))return{type:'case-summary',caseNum:m[1]};
  if(/ครบกำหนดวันนี้/.test(q)||(/วันนี้/.test(q)&&/ครบกำหนด|ถึงกำหนด/.test(q)))return{type:'due-today'};
  if(/ใกล้ครบกำหนด|ใกล้ถึงกำหนด|กำลังจะครบกำหนด|กำลังจะถึงกำหนด/.test(q))return{type:'due-soon'};
  if(/เกินกำหนด|เลยกำหนด|พ้นกำหนด|ค้างเกินกำหนด/.test(q))return{type:'overdue'};
  if(/^(?:ช่วย|คำสั่ง|help|เมนู)$/i.test(q))return{type:'help'};
  return{type:'unknown',query:q};
}

function active(row){
  const v=normalizeKey(row&&row.isDeleted);
  return !(v==='true'||v==='1'||v==='y'||v==='yes'||v==='deleted');
}

function first(row,names){
  for(const name of names){const value=row&&row[name];if(value!==undefined&&value!==null&&normalizeText(value)!=='')return value}
  return'';
}

function bangkokDateKey(date=new Date()){
  const parts=new Intl.DateTimeFormat('en-US',{timeZone:TZ,year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(date);
  const map=Object.fromEntries(parts.map(x=>[x.type,x.value]));
  return map.year+'-'+map.month+'-'+map.day;
}

function parseSheetDate(value){
  if(value instanceof Date&&!Number.isNaN(value.getTime()))return value;
  if(typeof value==='number'&&value>20000&&value<80000)return new Date(Date.UTC(1899,11,30)+Math.round(value*86400000));
  const s=normalizeText(value);
  if(!s)return null;
  let m=s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if(m){let y=+m[1];if(y>2400)y-=543;return new Date(Date.UTC(y,+m[2]-1,+m[3]))}
  m=s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if(m){let y=+m[3];if(y>2400)y-=543;return new Date(Date.UTC(y,+m[2]-1,+m[1]))}
  const d=new Date(s);return Number.isNaN(d.getTime())?null:d;
}

function dateKey(value){
  const d=parseSheetDate(value);if(!d)return'';
  return d.getUTCFullYear()+'-'+String(d.getUTCMonth()+1).padStart(2,'0')+'-'+String(d.getUTCDate()).padStart(2,'0');
}

function dayDiff(fromKey,toKey){
  const [fy,fm,fd]=fromKey.split('-').map(Number),[ty,tm,td]=toKey.split('-').map(Number);
  return Math.round((Date.UTC(ty,tm-1,td)-Date.UTC(fy,fm-1,fd))/86400000);
}

function isClosedLetter(row){
  const s=normalizeKey(first(row,['letterStatus','status']));
  return /ได้รับแล้ว|ได้รับตอบกลับแล้ว|ตอบรับแล้ว|เสร็จสิ้น|ปิดเรื่อง/.test(s);
}

async function readModel(env=process.env,fetchImpl=fetch){
  const c=config(env);
  const base=sheets.config(env);
  const sheetConfig={...base,timeoutMs:c.sheetTimeoutMs};
  const result=await sheets.batchGetValues(["'MainData'!A:ZZ","'Letters'!A:ZZ"],{env,fetchImpl,config:sheetConfig});
  const ranges=Array.isArray(result.valueRanges)?result.valueRanges:[];
  return {
    cases:sheets.tableFromValues(ranges[0]||{}).rows.filter(active),
    letters:sheets.tableFromValues(ranges[1]||{}).rows.filter(active)
  };
}

function classifyDataAccessError(error){
  const code=txt(error&&error.code)||'LINE_QA_READ_FAILED';
  const message=normalizeKey(error&&error.message);
  if(code==='GOOGLE_API_HTTP_403'){
    if(/has not been used|is disabled|api has not been used|access not configured/.test(message))return'SHEETS_API_DISABLED';
    if(/permission|forbidden|does not have access|insufficient/.test(message))return'SPREADSHEET_ACCESS_DENIED';
  }
  return code;
}

async function dataAccessProbe(env=process.env,fetchImpl=fetch,now=Date.now()){
  if(dataProbeCache.value&&now<dataProbeCache.expiresAt)return dataProbeCache.value;
  if(dataProbeCache.promise)return dataProbeCache.promise;
  const started=Date.now();
  dataProbeCache.promise=(async()=>{
    let runtimeIdentity='';
    try{runtimeIdentity=await sheets.identityEmail(fetchImpl)}catch(_){}
    try{
      await readModel(env,fetchImpl);
      const value={checked:true,ok:true,errorCode:'',runtimeIdentity,durationMs:Date.now()-started};
      dataProbeCache={expiresAt:Date.now()+DATA_PROBE_TTL_MS,value,promise:null};
      return value;
    }catch(error){
      const value={checked:true,ok:false,errorCode:classifyDataAccessError(error),runtimeIdentity,durationMs:Date.now()-started};
      dataProbeCache={expiresAt:Date.now()+DATA_PROBE_TTL_MS,value,promise:null};
      return value;
    }
  })();
  return dataProbeCache.promise;
}

function matchCases(rows,intent){
  return rows.filter(row=>{
    if(intent.recNo)return normalizeText(first(row,['recNo','receiveNo','เลขรับเรื่อง','เลขรับ']))===intent.recNo;
    if(intent.caseNum)return normalizeText(first(row,['caseNum','caseNo','runningNo','ลำดับเรื่อง']))===intent.caseNum;
    return false;
  });
}

function caseLine(row){
  const caseNum=normalizeText(first(row,['caseNum','caseNo','runningNo','ลำดับเรื่อง']))||'-';
  const recNo=normalizeText(first(row,['recNo','receiveNo','เลขรับเรื่อง','เลขรับ']))||'-';
  const title=normalizeText(first(row,['caseTitle','title','subject','considerationTitle','ชื่อเรื่อง']))||'-';
  const statusText=normalizeText(first(row,['status','สถานะ']))||'-';
  return{caseNum,recNo,title,status:statusText};
}

function helpText(){
  return [
    'คำสั่ง LINE Q&A ที่รองรับ',
    '• สถานะ 265/2569',
    '• เรื่อง 123',
    '• เจ้าหน้าที่เรื่อง 123',
    '• ครบกำหนดวันนี้',
    '• ใกล้ครบกำหนด',
    '• เกินกำหนด',
    '',
    'ระบบนี้อ่านข้อมูลอย่างเดียว ไม่แก้ไขหรือลบข้อมูล'
  ].join('\n');
}

function answerCase(model,intent){
  const rows=matchCases(model.cases,intent);
  if(!rows.length)return'ไม่พบข้อมูลเรื่องตามเลขที่ระบุ';
  if(rows.length>1)return'พบข้อมูลมากกว่า 1 รายการ กรุณาระบุเลขรับเรื่องให้ชัดเจน';
  const row=rows[0],c=caseLine(row);
  if(intent.type==='case-status')return 'เลขรับเรื่อง '+c.recNo+'\nลำดับเรื่อง '+c.caseNum+'\nสถานะ: '+c.status+'\nเรื่อง: '+c.title;
  if(intent.type==='case-officer'){
    const staff=normalizeText(first(row,['staffs','assignees','officer','เจ้าหน้าที่','เจ้าหน้าที่ฝ่ายเลขานุการ']))||'-';
    return 'ลำดับเรื่อง '+c.caseNum+'\nเจ้าหน้าที่: '+staff+'\nเรื่อง: '+c.title;
  }
  return 'ลำดับเรื่อง '+c.caseNum+'\nเลขรับเรื่อง '+c.recNo+'\nสถานะ: '+c.status+'\nเรื่อง: '+c.title;
}

function letterCaseMap(cases){
  const map=new Map();
  for(const row of cases){const id=normalizeText(first(row,['caseId','id']));if(id)map.set(id,caseLine(row))}
  return map;
}

function dueRows(model,intent,env=process.env){
  const today=bangkokDateKey(new Date()),soonDays=Math.max(1,Math.min(30,+env.LINE_QA_SOON_DAYS||3)),caseMap=letterCaseMap(model.cases);
  const rows=[];
  for(const row of model.letters){
    if(isClosedLetter(row))continue;
    const due=dateKey(first(row,['extendDate','dueDate']));
    if(!due)continue;
    const diff=dayDiff(today,due);
    const include=intent.type==='due-today'?diff===0:intent.type==='overdue'?diff<0:intent.type==='due-soon'?diff>0&&diff<=soonDays:false;
    if(!include)continue;
    const caseId=normalizeText(first(row,['caseId'])),c=caseMap.get(caseId)||{};
    rows.push({
      diff,due,
      letterNo:normalizeText(first(row,['letterNo','bookNo']))||'-',
      subject:normalizeText(first(row,['subject','issue']))||c.title||'-',
      agency:normalizeText(first(row,['agency']))||'-',
      caseId,
      caseNum:c.caseNum||normalizeText(first(row,['caseNum']))||'-'
    });
  }
  rows.sort((a,b)=>a.diff-b.diff||a.letterNo.localeCompare(b.letterNo,'th'));
  return rows;
}

function answerDue(model,intent,env=process.env){
  const rows=dueRows(model,intent,env),label=intent.type==='due-today'?'หนังสือครบกำหนดวันนี้':intent.type==='overdue'?'หนังสือเกินกำหนด':'หนังสือใกล้ครบกำหนด';
  if(!rows.length)return label+': ไม่พบรายการ';
  const max=Math.max(1,Math.min(10,+env.LINE_QA_MAX_ITEMS||5));
  const lines=[label+' '+rows.length+' รายการ'];
  rows.slice(0,max).forEach((r,i)=>lines.push((i+1)+'. '+r.letterNo+' | เรื่อง '+r.caseNum+' | '+r.subject+' | กำหนด '+r.due+(r.diff<0?' | เกิน '+Math.abs(r.diff)+' วัน':'')));
  if(rows.length>max)lines.push('… และอีก '+(rows.length-max)+' รายการ');
  return lines.join('\n');
}

function answerDueTodayOfficer(model,env=process.env){
  const rows=dueRows(model,{type:'due-today'},env);
  if(!rows.length)return'วันนี้ไม่มีหนังสือครบกำหนด จึงไม่มีรายการสำหรับระบุผู้รับผิดชอบ';
  if(rows.length>1)return'วันนี้มีหนังสือครบกำหนด '+rows.length+' รายการ กรุณาระบุเลขเรื่อง เช่น “เจ้าหน้าที่เรื่อง 86”';
  const caseNum=normalizeText(rows[0].caseNum);
  if(!caseNum||caseNum==='-')return'พบหนังสือครบกำหนดวันนี้ แต่ไม่พบเลขเรื่องสำหรับค้นหาผู้รับผิดชอบ';
  return answerCase(model,{type:'case-officer',caseNum});
}

function groundedEvidence(model,intent,query,env=process.env){
  const safeCase=row=>({
    caseNum:normalizeText(first(row,['caseNum','caseNo','runningNo','ลำดับเรื่อง']))||'-',
    recNo:normalizeText(first(row,['recNo','receiveNo','เลขรับเรื่อง','เลขรับ']))||'-',
    title:normalizeText(first(row,['caseTitle','title','subject','considerationTitle','ชื่อเรื่อง']))||'-',
    status:normalizeText(first(row,['status','สถานะ']))||'-',
    officer:normalizeText(first(row,['staffs','assignees','officer','เจ้าหน้าที่','เจ้าหน้าที่ฝ่ายเลขานุการ']))||'-',
    petitioner:normalizeText(first(row,['petitioners','petitioner','ผู้ร้อง','ผู้เสนอญัตติ']))||'-',
    respondent:normalizeText(first(row,['respondent','agency','หน่วยงานที่เกี่ยวข้อง']))||'-'
  });
  const safeLetter=row=>({
    letterNo:normalizeText(first(row,['letterNo','bookNo']))||'-',
    caseNum:normalizeText(first(row,['caseNum']))||'-',
    subject:normalizeText(first(row,['subject','issue']))||'-',
    agency:normalizeText(first(row,['agency']))||'-',
    dueDate:dateKey(first(row,['extendDate','dueDate']))||'-',
    status:normalizeText(first(row,['letterStatus','status']))||'-'
  });
  if(intent.type==='due-today'||intent.type==='due-soon'||intent.type==='overdue'){
    return{intent:intent.type,items:dueRows(model,intent,env).slice(0,10)};
  }
  if(intent.type==='due-today-officer'){
    const rows=dueRows(model,{type:'due-today'},env).slice(0,10);
    const nums=new Set(rows.map(r=>normalizeText(r.caseNum)).filter(x=>x&&x!=='-'));
    return{intent:intent.type,dueToday:rows,cases:model.cases.filter(r=>nums.has(normalizeText(first(r,['caseNum','caseNo','runningNo','ลำดับเรื่อง'])))).slice(0,10).map(safeCase)};
  }
  if(/^case-/.test(intent.type)){
    return{intent:intent.type,cases:matchCases(model,intent).slice(0,5).map(safeCase)};
  }
  const q=normalizeKey(query),tokens=q.split(/\s+/).map(x=>x.trim()).filter(x=>x.length>=2);
  const score=row=>{
    const blob=normalizeKey(Object.values(row||{}).join(' '));
    let n=0;
    for(const t of tokens)if(blob.includes(t))n++;
    return n;
  };
  const cases=model.cases.map(r=>({r,s:score(r)})).sort((a,b)=>b.s-a.s).filter(x=>x.s>0).slice(0,12).map(x=>safeCase(x.r));
  const letters=model.letters.map(r=>({r,s:score(r)})).sort((a,b)=>b.s-a.s).filter(x=>x.s>0).slice(0,12).map(x=>safeLetter(x.r));
  return{intent:'grounded-query',cases,letters};
}

function answer(model,intent,env=process.env){
  if(intent.type==='blocked-write')return 'LINE Q&A เปิดใช้งานแบบอ่านอย่างเดียว ไม่อนุญาตให้เพิ่ม แก้ไข ลบ หรือเปลี่ยนสถานะข้อมูล';
  if(intent.type==='help'||intent.type==='unknown')return helpText();
  if(intent.type==='due-today-officer')return answerDueTodayOfficer(model,env);
  if(/^case-/.test(intent.type))return answerCase(model,intent);
  return answerDue(model,intent,env);
}

function trimReply(text,max){
  const s=normalizeText(text).replace(/ ?\n ?/g,'\n');
  return s.length<=max?s:s.slice(0,Math.max(0,max-2))+'…';
}

async function replyText(replyToken,textValue,c=config(),fetchImpl=fetch){
  if(!c.channelAccessToken)throw fail('LINE channel access token is not configured','LINE_TOKEN_NOT_CONFIGURED',503);
  const r=await fetchImpl(LINE_REPLY_ENDPOINT,{
    method:'POST',
    headers:{Authorization:'Bearer '+c.channelAccessToken,'Content-Type':'application/json'},
    body:JSON.stringify({replyToken,messages:[{type:'text',text:trimReply(textValue,c.maxReplyChars)}]})
  });
  if(!r.ok){let detail='';try{detail=txt(await r.text()).slice(0,300)}catch(_){}throw fail('LINE reply HTTP '+r.status+(detail?': '+detail:''),'LINE_REPLY_HTTP_'+r.status,502)}
  return{ok:true,status:r.status};
}

async function processEvent(event,options={}){
  const env=options.env||process.env,c=options.config||config(env),fetchImpl=options.fetchImpl||fetch;
  if(!event||event.type!=='message'||!event.message||event.message.type!=='text')return{handled:false,reason:'UNSUPPORTED_EVENT'};
  const source=event.source||{},groupId=normalizeText(source.groupId);
  if(source.type!=='group'||!groupId)return{handled:false,reason:'GROUP_ONLY'};
  if(!c.allowedGroupIds.has(groupId))return{handled:false,reason:'GROUP_NOT_ALLOWED'};
  const replyToken=normalizeText(event.replyToken);
  if(!replyToken)return{handled:false,reason:'REPLY_TOKEN_MISSING'};
  const baseIntent=parseIntent(event.message.text);
  const resolved=await intentAi.resolveIntent(event.message.text,baseIntent,{env,fetchImpl:options.aiFetchImpl||fetchImpl});
  let intent=resolved.intent;
  if(intent.type==='help'||intent.type==='blocked-write'){
    await replyText(replyToken,intent.type==='blocked-write'?answer({},intent,env):helpText(),c,fetchImpl);
    return{handled:true,intent:intent.type,intentSource:resolved.source};
  }
  if(intent.type==='unknown')intent={type:'grounded-query'};
  try{
    const model=await readModel(env,fetchImpl);
    const fallback=intent.type==='grounded-query'?'ไม่พบข้อมูลเพียงพอในระบบสำหรับคำถามนี้':answer(model,intent,env);
    const evidence=groundedEvidence(model,intent,event.message.text,env);
    const natural=await intentAi.answerGrounded(event.message.text,evidence,fallback,{env,fetchImpl:options.aiFetchImpl||fetchImpl});
    await replyText(replyToken,natural.answer,c,fetchImpl);
    return{handled:true,intent:intent.type,intentSource:resolved.source,answerSource:natural.source};
  }catch(error){
    if(options.rethrowErrors===true)throw error;
    try{await replyText(replyToken,'ไม่สามารถค้นข้อมูลได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง',c,fetchImpl)}catch(_){}
    return{handled:true,intent:intent.type,intentSource:resolved.source,errorCode:txt(error&&error.code)||'LINE_QA_READ_FAILED'};
  }
}

async function handleWebhook(raw,headers={},options={}){
  const env=options.env||process.env,c=options.config||config(env),signature=txt(headers['x-line-signature']||headers['X-Line-Signature']);
  if(!verifySignature(raw,signature,c.channelSecret))throw fail('Invalid LINE signature','LINE_SIGNATURE_INVALID',401);
  let body;try{body=JSON.parse(Buffer.isBuffer(raw)?raw.toString('utf8'):txt(raw))}catch(_){throw fail('Invalid LINE webhook JSON','LINE_WEBHOOK_JSON_INVALID',400)}
  const events=Array.isArray(body.events)?body.events:[];
  const results=[];
  for(const event of events)results.push(await processEvent(event,{...options,env,config:c}));
  return{ok:true,events:events.length,handled:results.filter(x=>x.handled).length,results};
}

module.exports={
  LINE_REPLY_ENDPOINT,TZ,config,status,signatureFor,verifySignature,parseIntent,bangkokDateKey,parseSheetDate,dateKey,dayDiff,
  readModel,classifyDataAccessError,dataAccessProbe,matchCases,dueRows,groundedEvidence,answerDueTodayOfficer,answer,helpText,replyText,processEvent,handleWebhook
};
