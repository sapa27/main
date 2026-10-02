'use strict';

const METADATA_TOKEN_URL='http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token';
const SHEETS_ROOT='https://sheets.googleapis.com/v4/spreadsheets';

function txt(v){return v==null?'':String(v)}
function fail(message,code='SHEETS_REPOSITORY_ERROR',status=502){const e=new Error(message);e.code=code;e.status=status;return e}
function config(env=process.env){
  return {
    spreadsheetId:txt(env.GOOGLE_SHEETS_SPREADSHEET_ID).trim(),
    accessToken:txt(env.GOOGLE_OAUTH_ACCESS_TOKEN).trim(),
    timeoutMs:Math.max(5000,Math.min(120000,+env.GOOGLE_SHEETS_TIMEOUT_MS||30000))
  };
}
function requireSpreadsheetId(c){if(!c.spreadsheetId)throw fail('GOOGLE_SHEETS_SPREADSHEET_ID is not configured','SHEETS_ID_NOT_CONFIGURED',503);return c.spreadsheetId}
async function fetchJson(url,options={},timeoutMs=30000,fetchImpl=fetch){
  const ac=new AbortController(),timer=setTimeout(()=>ac.abort(),timeoutMs);
  try{
    const r=await fetchImpl(url,{...options,signal:ac.signal});
    const raw=await r.text();
    let body={};try{body=raw?JSON.parse(raw):{}}catch(_){throw fail('Google API returned non-JSON','GOOGLE_API_JSON_INVALID',502)}
    if(!r.ok){const m=body&&body.error&&body.error.message||('Google API HTTP '+r.status);throw fail(m,'GOOGLE_API_HTTP_'+r.status,r.status>=500?502:r.status)}
    return body;
  }catch(e){if(ac.signal.aborted)throw fail('Google Sheets request timeout','GOOGLE_SHEETS_TIMEOUT',504);throw e}
  finally{clearTimeout(timer)}
}
async function accessToken(c=config(),fetchImpl=fetch){
  if(c.accessToken)return c.accessToken;
  const r=await fetchJson(METADATA_TOKEN_URL,{headers:{'Metadata-Flavor':'Google'}},10000,fetchImpl);
  const token=txt(r.access_token).trim();
  if(!token)throw fail('Cloud Run service account token unavailable','GOOGLE_ACCESS_TOKEN_MISSING',503);
  return token;
}
function rangeUrl(id,range){
  return SHEETS_ROOT+'/'+encodeURIComponent(id)+'/values/'+encodeURIComponent(range)+'?majorDimension=ROWS&valueRenderOption=UNFORMATTED_VALUE&dateTimeRenderOption=FORMATTED_STRING';
}
async function getValues(range,options={}){
  const c=options.config||config(options.env),id=requireSpreadsheetId(c),token=await accessToken(c,options.fetchImpl||fetch);
  return fetchJson(rangeUrl(id,range),{headers:{Authorization:'Bearer '+token}},c.timeoutMs,options.fetchImpl||fetch);
}
async function batchGetValues(ranges,options={}){
  const c=options.config||config(options.env),id=requireSpreadsheetId(c),token=await accessToken(c,options.fetchImpl||fetch);
  const q=(Array.isArray(ranges)?ranges:[]).map(x=>'ranges='+encodeURIComponent(x)).join('&');
  if(!q)throw fail('At least one range is required','SHEETS_RANGE_REQUIRED',400);
  const url=SHEETS_ROOT+'/'+encodeURIComponent(id)+'/values:batchGet?majorDimension=ROWS&valueRenderOption=UNFORMATTED_VALUE&dateTimeRenderOption=FORMATTED_STRING&'+q;
  return fetchJson(url,{headers:{Authorization:'Bearer '+token}},c.timeoutMs,options.fetchImpl||fetch);
}
async function updateValues(range,values,options={}){
  const c=options.config||config(options.env),id=requireSpreadsheetId(c),token=await accessToken(c,options.fetchImpl||fetch);
  const url=SHEETS_ROOT+'/'+encodeURIComponent(id)+'/values/'+encodeURIComponent(range)+'?valueInputOption=USER_ENTERED';
  return fetchJson(url,{method:'PUT',headers:{Authorization:'Bearer '+token,'Content-Type':'application/json'},body:JSON.stringify({majorDimension:'ROWS',values:Array.isArray(values)?values:[]})},c.timeoutMs,options.fetchImpl||fetch);
}
async function appendValues(range,values,options={}){
  const c=options.config||config(options.env),id=requireSpreadsheetId(c),token=await accessToken(c,options.fetchImpl||fetch);
  const url=SHEETS_ROOT+'/'+encodeURIComponent(id)+'/values/'+encodeURIComponent(range)+':append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS';
  return fetchJson(url,{method:'POST',headers:{Authorization:'Bearer '+token,'Content-Type':'application/json'},body:JSON.stringify({majorDimension:'ROWS',values:Array.isArray(values)?values:[]})},c.timeoutMs,options.fetchImpl||fetch);
}
function tableFromValues(valueRange){
  const values=Array.isArray(valueRange&&valueRange.values)?valueRange.values:[];
  if(!values.length)return{headers:[],rows:[]};
  const headers=(values[0]||[]).map(x=>txt(x).trim());
  const rows=values.slice(1).map((row,rowIndex)=>{const out={__rowNumber:rowIndex+2};headers.forEach((h,i)=>{if(h)out[h]=row&&i<row.length?row[i]:''});return out});
  return{headers,rows};
}
async function readTable(sheetName,options={}){
  const name=txt(sheetName).trim();if(!name)throw fail('Sheet name required','SHEET_NAME_REQUIRED',400);
  return tableFromValues(await getValues("'"+name.replace(/'/g,"''")+"'!A:ZZ",options));
}
function status(env=process.env){
  const c=config(env);return{configured:!!c.spreadsheetId,spreadsheetIdConfigured:!!c.spreadsheetId,authMode:c.accessToken?'explicit-token':'cloud-run-metadata-service-account',timeoutMs:c.timeoutMs};
}
module.exports={METADATA_TOKEN_URL,SHEETS_ROOT,config,accessToken,getValues,batchGetValues,updateValues,appendValues,tableFromValues,readTable,status,fail};
