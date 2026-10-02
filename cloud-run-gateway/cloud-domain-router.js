'use strict';

const sheets=require('./google-sheets-repository');
const DOMAIN_ORDER=['tracking','meeting','petitioner','people','budget','cases','admin'];
const HANDLERS=Object.create(null);

function txt(v){return v==null?'':String(v)}
function fail(message,code='CLOUD_DOMAIN_ERROR',status=503){const e=new Error(message);e.code=code;e.status=status;return e}
function owners(env=process.env){
  return new Set(txt(env.CLOUD_RUN_DOMAIN_OWNERS).split(',').map(x=>x.trim().toLowerCase()).filter(Boolean));
}
function domainForMethod(method){
  const m=txt(method).trim();
  if(/^(?:apiGetTracking|apiGetLetters|apiSaveLetter|apiDeleteLetter)$/.test(m))return'tracking';
  if(/^api(?:GetCommitteeMeeting|ListCommitteeMeeting|SaveCommitteeMeeting|DeleteCommitteeMeeting|GetMeeting|ListMeeting|SaveMeeting|DeleteMeeting)/.test(m))return'meeting';
  if(/^api(?:GetPetitioner|GetPetitioners|SavePetitioner|DeletePetitioner)/.test(m))return'petitioner';
  if(/^api(?:GetPeople|ListPeople|SavePersonnel|DeletePersonnel|GetPersonnel|ListPersonnel|SaveSalarySettings)/.test(m))return'people';
  if(/^apiBudget/.test(m))return'budget';
  if(/^api(?:SearchCases|GetCase|ListCase|SaveCase|DeleteCase|CheckDuplicateCase)/.test(m))return'cases';
  if(/^apiAdmin/.test(m))return'admin';
  return'';
}
function register(domain,handler){
  domain=txt(domain).trim().toLowerCase();
  if(!DOMAIN_ORDER.includes(domain))throw fail('Unknown domain: '+domain,'CLOUD_DOMAIN_UNKNOWN',400);
  if(!handler||typeof handler.handle!=='function')throw fail('Domain handler requires handle()','CLOUD_DOMAIN_HANDLER_INVALID',500);
  if(HANDLERS[domain])throw fail('Duplicate domain owner: '+domain,'CLOUD_DOMAIN_OWNER_DUPLICATE',500);
  HANDLERS[domain]=handler;return handler;
}
async function dispatch(method,payload,context={}){
  const domain=domainForMethod(method),active=owners(context.env||process.env);
  if(!domain||!active.has(domain))return{handled:false,domain};
  const handler=HANDLERS[domain];
  if(!handler)throw fail('Cloud Run domain owner is enabled but not migrated: '+domain,'CLOUD_DOMAIN_OWNER_NOT_READY',503);
  const started=Date.now(),result=await handler.handle(method,payload||{},Object.assign({},context,{domain,sheets}));
  if(!result||typeof result!=='object'||Array.isArray(result))throw fail('Cloud domain handler returned invalid envelope','CLOUD_DOMAIN_ENVELOPE_INVALID',502);
  return{handled:true,domain,envelope:{transportOk:true,result},meta:{gateway:'cloud-domain-router',method,transport:'cloud-run-native',responseContract:'gas-direct-json-v1',durationMs:Date.now()-started}};
}
function status(env=process.env){
  const active=owners(env);
  return{mode:'explicit-domain-owner-no-fallback',order:DOMAIN_ORDER.slice(),activeOwners:DOMAIN_ORDER.filter(x=>active.has(x)),registeredOwners:Object.keys(HANDLERS).sort(),sheets:sheets.status(env)};
}
module.exports={DOMAIN_ORDER,domainForMethod,owners,register,dispatch,status,fail};
