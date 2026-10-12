'use strict';

const test=require('node:test');
const assert=require('node:assert/strict');
const {once}=require('node:events');
const {
  config,signatureFor,verifySignature,parseIntent,parseSheetDate,dateKey,classifyDataAccessError,dataAccessProbe,answerDueTodayOfficer,processEvent
}=require('../line-webhook');
const {createServer}=require('../server');
const intentAi=require('../line-intent-ai');

const GROUP='C0123456789';
const SECRET='test-channel-secret';
const ACCESS='test-channel-access-token';
const ENV={
  GAS_WEB_APP_URL:'https://script.google.com/macros/s/test123/exec',
  GATEWAY_ALLOWED_ORIGINS:'https://app.example.test',
  PUBLIC_APP_ORIGIN:'https://app.example.test',
  GOOGLE_SHEETS_SPREADSHEET_ID:'sheet-test',
  GOOGLE_OAUTH_ACCESS_TOKEN:'oauth-test',
  LINE_CHANNEL_SECRET:SECRET,
  LINE_CHANNEL_ACCESS_TOKEN:ACCESS,
  LINE_ALLOWED_GROUP_IDS:GROUP,
  LINE_QA_SHEETS_TIMEOUT_MS:'2000'
};

function webhook(text,groupId=GROUP,replyToken='reply-token-1'){
  return {
    destination:'Ubot',
    events:[{
      type:'message',
      replyToken,
      source:{type:'group',groupId,userId:'Uuser'},
      timestamp:Date.now(),
      mode:'active',
      message:{id:'m1',type:'text',text}
    }]
  };
}

function sheetBatch(){
  return {
    valueRanges:[
      {values:[
        ['caseId','caseNum','recNo','title','caseTitle','status','staffs','isDeleted'],
        ['case-1','123','265/2569','เรื่องทดสอบ','เรื่องพิจารณาทดสอบ','อยู่ระหว่างดำเนินการ','เจ้าหน้าที่ ก','']
      ]},
      {values:[
        ['letterId','caseId','letterNo','subject','dueDate','extendDate','status','isDeleted'],
        ['letter-1','case-1','กมธ 001','ติดตามเรื่องทดสอบ','2026-10-10','','ยังไม่ได้รับ','']
      ]}
    ]
  };
}

async function withServer(fn,env=ENV){
  const server=createServer(env);
  server.listen(0,'127.0.0.1');
  await once(server,'listening');
  try{return await fn('http://127.0.0.1:'+server.address().port)}
  finally{await new Promise(resolve=>server.close(resolve))}
}

test('P1 AI intent contract only permits approved read intents',()=>{
  assert.deepEqual(intentAi.sanitizeIntent({type:'case-status',recNo:'265/2569',extra:'ignored'}),{type:'case-status',recNo:'265/2569'});
  assert.deepEqual(intentAi.sanitizeIntent({type:'case-officer',caseNum:'123'}),{type:'case-officer',caseNum:'123'});
  assert.deepEqual(intentAi.sanitizeIntent({type:'delete-case',caseNum:'123'}),{type:'unknown'});
  assert.deepEqual(intentAi.sanitizeIntent({type:'case-status',recNo:'bad'}),{type:'unknown'});
});

test('P1 never calls AI for mutation-like requests',async()=>{
  let calls=0;
  const resolved=await intentAi.resolveIntent('ช่วยลบเรื่อง 123',{type:'blocked-write',query:'ช่วยลบเรื่อง 123'},{
    env:{LINE_QA_AI_ENABLED:'Y',GEMINI_API_KEY:'test-key'},
    fetchImpl:async()=>{calls++;throw new Error('AI must not be called')}
  });
  assert.equal(resolved.intent.type,'blocked-write');
  assert.equal(resolved.aiAttempted,false);
  assert.equal(calls,0);
});

test('P1 AI maps natural language to allowlisted intent without reading Sheets',async()=>{
  let calls=0;
  const resolved=await intentAi.resolveIntent('ตอนนี้เรื่องเลขรับนี้อยู่ขั้นตอนไหน',{type:'unknown',query:'ตอนนี้เรื่องเลขรับนี้อยู่ขั้นตอนไหน'},{
    env:{LINE_QA_AI_ENABLED:'Y',GEMINI_API_KEY:'test-key',LINE_QA_AI_MODEL:'test-model'},
    fetchImpl:async(url,opt={})=>{
      calls++;
      assert.match(String(url),/generativelanguage\.googleapis\.com/);
      const body=JSON.parse(opt.body);
      assert.equal(Array.isArray(body.contents),true);
      return {ok:true,status:200,text:async()=>JSON.stringify({candidates:[{content:{parts:[{text:'{"type":"help"}'}]}}]})};
    }
  });
  assert.equal(resolved.intent.type,'help');
  assert.equal(resolved.source,'ai-intent');
  assert.equal(calls,1);
});

test('P1 AI failure degrades to deterministic unknown without blocking LINE',async()=>{
  const fallback={type:'unknown',query:'ถามแบบภาษาธรรมชาติ'};
  const resolved=await intentAi.resolveIntent('ถามแบบภาษาธรรมชาติ',fallback,{
    env:{LINE_QA_AI_ENABLED:'Y',GEMINI_API_KEY:'test-key'},
    fetchImpl:async()=>{throw new Error('network down')}
  });
  assert.deepEqual(resolved.intent,fallback);
  assert.equal(resolved.source,'ai-fallback');
  assert.equal(resolved.aiAttempted,true);
});

test('LINE Q&A Sheets timeout defaults to repository-safe 30 seconds',()=>{
  const c=config({});
  assert.equal(c.sheetTimeoutMs,30000);
  assert.equal(config({LINE_QA_SHEETS_TIMEOUT_MS:'1000'}).sheetTimeoutMs,5000);
  assert.equal(config({LINE_QA_SHEETS_TIMEOUT_MS:'60000'}).sheetTimeoutMs,45000);
});

test('LINE data-access error classifier distinguishes permission and disabled API',()=>{
  assert.equal(classifyDataAccessError({code:'GOOGLE_API_HTTP_403',message:'The caller does not have permission'}),'SPREADSHEET_ACCESS_DENIED');
  assert.equal(classifyDataAccessError({code:'GOOGLE_API_HTTP_403',message:'Google Sheets API has not been used in project before or it is disabled'}),'SHEETS_API_DISABLED');
});

test('LINE data-access probe returns safe error code without exposing data',async()=>{
  const env={...ENV,GOOGLE_SHEETS_SPREADSHEET_ID:'sheet-test',GOOGLE_OAUTH_ACCESS_TOKEN:'oauth-test'};
  const bad=await dataAccessProbe(env,async()=>({ok:false,status:403,text:async()=>JSON.stringify({error:{message:'permission denied'}})}),Number.MAX_SAFE_INTEGER-1000);
  assert.equal(bad.checked,true);
  assert.equal(bad.ok,false);
  assert.equal(bad.errorCode,'SPREADSHEET_ACCESS_DENIED');
  assert.equal(Object.prototype.hasOwnProperty.call(bad,'message'),false);
});

test('LINE signature uses HMAC-SHA256 base64 and rejects tampering',()=>{
  const raw=Buffer.from(JSON.stringify(webhook('สถานะ 265/2569')));
  const sig=signatureFor(raw,SECRET);
  assert.equal(verifySignature(raw,sig,SECRET),true);
  assert.equal(verifySignature(Buffer.from(raw.toString()+' '),sig,SECRET),false);
  assert.equal(verifySignature(raw,'invalid',SECRET),false);
});

test('P0 parser is deterministic and write-free',()=>{
  assert.deepEqual(parseIntent('สถานะ 265/2569'),{type:'case-status',recNo:'265/2569'});
  assert.deepEqual(parseIntent('เรื่อง 123'),{type:'case-summary',caseNum:'123'});
  assert.deepEqual(parseIntent('เจ้าหน้าที่เรื่อง 123'),{type:'case-officer',caseNum:'123'});
  assert.deepEqual(parseIntent('ครบกำหนดวันนี้'),{type:'due-today'});
  assert.deepEqual(parseIntent('วันนี้มีหนังสือครบกำหนดกี่เรื่อง'),{type:'due-today'});
  assert.deepEqual(parseIntent('วันนี้มีหนังสือถึงกำหนดอะไรบ้าง'),{type:'due-today'});
  assert.deepEqual(parseIntent('มีหนังสือกำลังจะครบกำหนดไหม'),{type:'due-soon'});
  assert.deepEqual(parseIntent('มีหนังสือพ้นกำหนดกี่รายการ'),{type:'overdue'});
  assert.deepEqual(parseIntent('ใครรับผิดชอบ'),{type:'due-today-officer'});
  assert.deepEqual(parseIntent('ใครเป็นเจ้าหน้าที่'),{type:'due-today-officer'});
  assert.deepEqual(parseIntent('ใกล้ครบกำหนด'),{type:'due-soon'});
  assert.deepEqual(parseIntent('เกินกำหนด'),{type:'overdue'});
  assert.equal(parseIntent('ลบเรื่อง 123').type,'blocked-write');
});

test('P1-D follow-up officer uses the single due-today case and never guesses when ambiguous',()=>{
  const today=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Bangkok',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
  const model={
    cases:[
      {caseId:'case-86',caseNum:'86',recNo:'',title:'เรื่องทดสอบ',status:'อยู่ระหว่างดำเนินการ',staffs:'เจ้าหน้าที่ ก'}
    ],
    letters:[
      {letterId:'letter-1',caseId:'case-86',letterNo:'001',subject:'เรื่องทดสอบ',dueDate:today,status:'ยังไม่ได้รับ'}
    ]
  };
  assert.match(answerDueTodayOfficer(model),/เจ้าหน้าที่ ก/);
  const ambiguous={...model,letters:[...model.letters,{letterId:'letter-2',caseId:'case-86',letterNo:'002',subject:'เรื่องทดสอบ 2',dueDate:today,status:'ยังไม่ได้รับ'}]};
  assert.match(answerDueTodayOfficer(ambiguous),/กรุณาระบุเลขเรื่อง/);
});

test('Thai Buddhist and ISO dates normalize to same date key',()=>{
  assert.equal(dateKey(parseSheetDate('10/10/2569')),'2026-10-10');
  assert.equal(dateKey(parseSheetDate('2026-10-10')),'2026-10-10');
});

test('disallowed LINE group is ignored without Sheets or LINE calls',async()=>{
  let calls=0;
  const result=await processEvent(webhook('เรื่อง 123','CNOTALLOWED').events[0],{
    env:ENV,
    fetchImpl:async()=>{calls++;throw new Error('must not call')}
  });
  assert.equal(result.handled,false);
  assert.equal(result.reason,'GROUP_NOT_ALLOWED');
  assert.equal(calls,0);
});

test('allowed group reads MainData/Letters and replies with case status',async()=>{
  const calls=[];
  const result=await processEvent(webhook('สถานะ 265/2569').events[0],{
    env:ENV,
    fetchImpl:async(url,opt={})=>{
      calls.push({url:String(url),opt});
      if(String(url).includes('sheets.googleapis.com'))return {ok:true,status:200,text:async()=>JSON.stringify(sheetBatch())};
      if(String(url).includes('/v2/bot/message/reply'))return {ok:true,status:200,text:async()=>''};
      throw new Error('unexpected url '+url);
    }
  });
  assert.equal(result.handled,true);
  assert.equal(result.intent,'case-status');
  const sheetCall=calls.find(x=>x.url.includes('sheets.googleapis.com'));
  const replyCall=calls.find(x=>x.url.includes('/v2/bot/message/reply'));
  assert.ok(sheetCall);
  assert.ok(replyCall);
  const payload=JSON.parse(replyCall.opt.body);
  assert.match(payload.messages[0].text,/265\/2569/);
  assert.match(payload.messages[0].text,/123/);
  assert.match(payload.messages[0].text,/อยู่ระหว่างดำเนินการ/);
  assert.equal(replyCall.opt.headers.Authorization,'Bearer '+ACCESS);
});

test('HTTP /line/webhook rejects invalid signature before data access',async()=>{
  const original=global.fetch;
  let externalCalls=0;
  global.fetch=async(url,opt={})=>{
    if(String(url).startsWith('http://127.0.0.1:'))return original(url,opt);
    externalCalls++;
    throw new Error('external call must not happen');
  };
  try{
    await withServer(async base=>{
      const raw=JSON.stringify(webhook('เรื่อง 123'));
      const r=await fetch(base+'/line/webhook',{
        method:'POST',
        headers:{'Content-Type':'application/json','X-Line-Signature':'invalid'},
        body:raw
      });
      const j=await r.json();
      assert.equal(r.status,401);
      assert.equal(j.ok,false);
      assert.equal(j.error.code,'LINE_SIGNATURE_INVALID');
      assert.equal(externalCalls,0);
    });
  }finally{global.fetch=original}
});

test('HTTP /line/webhook accepts signed allowed-group case query',async()=>{
  const original=global.fetch;
  const external=[];
  global.fetch=async(url,opt={})=>{
    if(String(url).startsWith('http://127.0.0.1:'))return original(url,opt);
    external.push({url:String(url),opt});
    if(String(url).includes('sheets.googleapis.com'))return {ok:true,status:200,text:async()=>JSON.stringify(sheetBatch())};
    if(String(url).includes('/v2/bot/message/reply'))return {ok:true,status:200,text:async()=>''};
    throw new Error('unexpected external url '+url);
  };
  try{
    await withServer(async base=>{
      const raw=JSON.stringify(webhook('สถานะ 265/2569'));
      const sig=signatureFor(Buffer.from(raw),SECRET);
      const r=await fetch(base+'/line/webhook',{
        method:'POST',
        headers:{'Content-Type':'application/json','X-Line-Signature':sig},
        body:raw
      });
      const j=await r.json();
      assert.equal(r.status,200);
      assert.equal(j.ok,true);
      assert.equal(j.events,1);
      assert.equal(j.handled,1);
      assert.equal(external.filter(x=>x.url.includes('sheets.googleapis.com')).length,1);
      assert.equal(external.filter(x=>x.url.includes('/v2/bot/message/reply')).length,1);
    });
  }finally{global.fetch=original}
});
