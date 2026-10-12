'use strict';

const ALLOWED_TYPES=new Set(['case-status','case-summary','case-officer','due-today','due-soon','overdue','due-today-officer','grounded-query','help','unknown']);
const MUTATION_RE=/(?:ลบ|แก้ไข|บันทึก|อัปเดต|เพิ่ม|เปลี่ยนสถานะ|อนุมัติ|ยกเลิก)/;

function txt(v){return v==null?'':String(v)}
function normalize(v){return txt(v).replace(/\s+/g,' ').trim()}

function config(env=process.env){
  return {
    enabled:/^(?:1|true|y|yes)$/i.test(txt(env.LINE_QA_AI_ENABLED).trim())&&!!txt(env.GEMINI_API_KEY).trim(),
    apiKey:txt(env.GEMINI_API_KEY).trim(),
    model:txt(env.LINE_QA_AI_MODEL).trim()||'gemini-2.5-flash',
    timeoutMs:Math.max(500,Math.min(5000,+env.LINE_QA_AI_TIMEOUT_MS||2500)),
    answerTimeoutMs:Math.max(1000,Math.min(8000,+env.LINE_QA_AI_ANSWER_TIMEOUT_MS||5000)),
    maxInputChars:Math.max(80,Math.min(1000,+env.LINE_QA_AI_MAX_INPUT_CHARS||400))
  };
}

function status(env=process.env){
  const c=config(env);
  return {
    enabled:c.enabled,
    configured:!!c.apiKey,
    mode:'grounded-read-only',
    readOnly:true,
    answerMode:'grounded-data-only',
    allowedIntents:Array.from(ALLOWED_TYPES).filter(x=>x!=='unknown')
  };
}

function fail(message,code='LINE_QA_AI_ERROR'){const e=new Error(message);e.code=code;return e}

function sanitizeIntent(value){
  const x=value&&typeof value==='object'&&!Array.isArray(value)?value:{};
  const type=ALLOWED_TYPES.has(txt(x.type))?txt(x.type):'unknown';
  const out={type};
  if(type==='case-status'||type==='case-summary'){
    const recNo=normalize(x.recNo);
    const caseNum=normalize(x.caseNum);
    if(recNo&&/^\d+\/\d{4}$/.test(recNo))out.recNo=recNo;
    else if(caseNum&&/^\d+$/.test(caseNum))out.caseNum=caseNum;
    else return{type:'unknown'};
  }else if(type==='case-officer'){
    const caseNum=normalize(x.caseNum);
    if(caseNum&&/^\d+$/.test(caseNum))out.caseNum=caseNum;
    else return{type:'unknown'};
  }
  return out;
}

function extractJson(text){
  const s=normalize(text).replace(/^\`\`\`(?:json)?/i,'').replace(/\`\`\`$/,'').trim();
  const start=s.indexOf('{'),end=s.lastIndexOf('}');
  if(start<0||end<start)throw fail('AI response missing JSON object','LINE_QA_AI_JSON_INVALID');
  try{return JSON.parse(s.slice(start,end+1))}catch(_){throw fail('AI response JSON invalid','LINE_QA_AI_JSON_INVALID')}
}

async function callGemini(query,c,fetchImpl=fetch){
  const ac=new AbortController(),timer=setTimeout(()=>ac.abort(),c.timeoutMs);
  const url='https://generativelanguage.googleapis.com/v1beta/models/'+encodeURIComponent(c.model)+':generateContent?key='+encodeURIComponent(c.apiKey);
  const prompt=[
    'You are an intent classifier for a Thai parliamentary committee internal LINE read-only Q&A system.',
    'Return JSON only. Never answer the user and never invent data.',
    'Allowed types: case-status, case-summary, case-officer, due-today, due-soon, overdue, due-today-officer, grounded-query, help, unknown.',
    'Use grounded-query for any other read-only question about case or tracking-letter data that should be answered from stored data.',
    'Use due-today-officer for short follow-up questions such as ใครรับผิดชอบ or ใครเป็นเจ้าหน้าที่ when no case number is present.',
    'For case-status/case-summary include exactly one of recNo (digits/digits, e.g. 265/2569) or caseNum (digits only).',
    'For case-officer include caseNum only.',
    'Never classify any create/update/delete/approve/cancel request as a read intent; use unknown.',
    'Thai user text: '+query
  ].join('\n');
  try{
    const r=await fetchImpl(url,{
      method:'POST',
      signal:ac.signal,
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        contents:[{role:'user',parts:[{text:prompt}]}],
        generationConfig:{temperature:0,responseMimeType:'application/json'}
      })
    });
    const raw=await r.text();
    if(!r.ok)throw fail('AI HTTP '+r.status,'LINE_QA_AI_HTTP_'+r.status);
    let body;try{body=raw?JSON.parse(raw):{}}catch(_){throw fail('AI response envelope invalid','LINE_QA_AI_ENVELOPE_INVALID')}
    const text=body?.candidates?.[0]?.content?.parts?.map(p=>txt(p.text)).join('')||'';
    return sanitizeIntent(extractJson(text));
  }catch(e){
    if(ac.signal.aborted)throw fail('AI intent timeout','LINE_QA_AI_TIMEOUT');
    throw e;
  }finally{clearTimeout(timer)}
}

async function resolveIntent(text,fallbackIntent,options={}){
  const env=options.env||process.env,c=options.config||config(env),query=normalize(text),fallback=sanitizeIntent(fallbackIntent);
  if(MUTATION_RE.test(query)||fallbackIntent?.type==='blocked-write')return{intent:fallbackIntent,source:'deterministic',aiAttempted:false};
  if(fallback.type!=='unknown')return{intent:fallbackIntent,source:'deterministic',aiAttempted:false};
  if(!c.enabled)return{intent:fallbackIntent,source:'deterministic-fallback',aiAttempted:false};
  if(!query||query.length>c.maxInputChars)return{intent:fallbackIntent,source:'deterministic-fallback',aiAttempted:false};
  try{
    const intent=await callGemini(query,c,options.fetchImpl||fetch);
    return{intent,source:intent.type==='unknown'?'ai-unknown':'ai-intent',aiAttempted:true};
  }catch(error){
    return{intent:fallbackIntent,source:'ai-fallback',aiAttempted:true,errorCode:txt(error&&error.code)||'LINE_QA_AI_FAILED'};
  }
}

function factTokens(value){
  return new Set((txt(value).match(/[0-9]+(?:[\\/.-][0-9]+)*/g)||[]).map(normalize));
}

function validateGroundedAnswer(answer,evidence,query=''){
  const allowed=factTokens(JSON.stringify(evidence||{})+' '+normalize(query));
  const used=factTokens(answer);
  for(const token of used){
    if(!allowed.has(token))throw fail('AI answer contains unsupported numeric fact','LINE_QA_AI_ANSWER_UNGROUNDED_FACT');
  }
  return true;
}

async function answerGrounded(query,evidence,fallbackAnswer,options={}){
  const env=options.env||process.env,c=options.config||config(env),fetchImpl=options.fetchImpl||fetch;
  if(!c.enabled)return{answer:fallbackAnswer,source:'deterministic-fallback',aiAttempted:false};
  const evidenceJson=JSON.stringify(evidence||{});
  const ac=new AbortController(),timer=setTimeout(()=>ac.abort(),c.answerTimeoutMs);
  const url='https://generativelanguage.googleapis.com/v1beta/models/'+encodeURIComponent(c.model)+':generateContent?key='+encodeURIComponent(c.apiKey);
  const prompt=[
    'You answer Thai questions for an internal parliamentary committee LINE read-only system.',
    'Your only job is to REPHRASE facts already present in EVIDENCE into natural Thai.',
    'Answer in natural Thai, concise and clear for LINE chat.',
    'Use ONLY the EVIDENCE JSON below. Never invent, infer, assume, calculate, combine into a new fact, or add any fact not explicitly present in EVIDENCE.',
    'Case and tracking-letter facts for the same matter may be present together. Use those linked facts when the question asks for a summary or tracking information.',
    'If a requested fact is absent from EVIDENCE, say that the system does not contain that information. Do not guess.',
    'Do not introduce a name, date, number, status, agency, person, event, deadline, or identifier unless it appears in EVIDENCE.',
    'Do not claim that you changed, saved, approved, deleted, or updated anything.',
    'Do not expose internal IDs unless they are normal business identifiers shown in evidence.',
    'USER QUESTION: '+normalize(query),
    'EVIDENCE: '+evidenceJson
  ].join('\n');
  try{
    const r=await fetchImpl(url,{
      method:'POST',
      signal:ac.signal,
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        contents:[{role:'user',parts:[{text:prompt}]}],
        generationConfig:{temperature:0}
      })
    });
    const raw=await r.text();
    if(!r.ok)throw fail('AI answer HTTP '+r.status,'LINE_QA_AI_ANSWER_HTTP_'+r.status);
    let body;try{body=raw?JSON.parse(raw):{}}catch(_){throw fail('AI answer envelope invalid','LINE_QA_AI_ANSWER_ENVELOPE_INVALID')}
    const answer=normalize(body?.candidates?.[0]?.content?.parts?.map(p=>txt(p.text)).join('')||'');
    if(!answer)throw fail('AI answer empty','LINE_QA_AI_ANSWER_EMPTY');
    validateGroundedAnswer(answer,evidence,query);
    return{answer,source:'ai-grounded',aiAttempted:true};
  }catch(error){
    return{answer:fallbackAnswer,source:'ai-answer-fallback',aiAttempted:true,errorCode:txt(error&&error.code)||'LINE_QA_AI_ANSWER_FAILED'};
  }finally{clearTimeout(timer)}
}

module.exports={ALLOWED_TYPES,config,status,sanitizeIntent,extractJson,callGemini,resolveIntent,factTokens,validateGroundedAnswer,answerGrounded};
