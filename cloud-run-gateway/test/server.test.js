'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {once}=require('node:events');
const {REV,cfg,gasUrl,allowed,isWrite,timeout,directRpc,createServer}=require('../server');

const ORIGIN='https://sapa27-gateway-asxuzzwspa-eu.a.run.app';
const ENV={
  GAS_WEB_APP_URL:'https://script.google.com/macros/s/AKfycbwXIRMjP4yKRRlS7loJFiAmVCLxKq_uie6rUPsaKw17wtzWQOkjjaH2ah8gIqsHA6_G/exec',
  GATEWAY_ALLOWED_ORIGINS:ORIGIN
};

async function withServer(fn,env=ENV){
  const server=createServer(env);
  server.listen(0,'127.0.0.1');
  await once(server,'listening');
  try{return await fn('http://127.0.0.1:'+server.address().port)}
  finally{await new Promise(resolve=>server.close(resolve))}
}

test('CR-7 configuration is direct-only',()=>{
  const c=cfg(ENV);
  assert.equal(REV,'cr7-runtime-decoupled-r330');
  assert.equal(gasUrl(ENV.GAS_WEB_APP_URL),ENV.GAS_WEB_APP_URL);
  assert.equal(allowed(ORIGIN,c),true);
  assert.equal(allowed('https://example.invalid',c),false);
  assert.equal(isWrite('apiSaveCase'),true);
  assert.equal(isWrite('apiGetDashboardBundle'),false);
  assert.equal(timeout('apiGetDashboardBundle',999999,c),45000);
  assert.equal(Object.prototype.hasOwnProperty.call(c,'rpc'),false);
  assert.equal(Object.prototype.hasOwnProperty.call(c,'parent'),false);
});

test('readiness and version expose direct-only CR-7 contract',async()=>withServer(async base=>{
  const ready=await (await fetch(base+'/ready')).json();
  const version=await (await fetch(base+'/version')).json();
  assert.equal(ready.ok,true);
  assert.equal(ready.gateway,'cr7-runtime-decoupled-r330');
  assert.equal(ready.gasTransport,'direct-json-primary');
  assert.equal(ready.legacyFallbackEnabled,false);
  assert.equal(version.frontendHost,'cloud-run');
  assert.equal(version.gasTransport,'direct-json-primary');
  assert.equal(version.legacyFallbackEnabled,false);
}));

test('CORS accepts same Cloud Run origin and rejects unknown origin',async()=>withServer(async base=>{
  const denied=await fetch(base+'/api/router',{method:'OPTIONS',headers:{Origin:'https://evil.invalid','Access-Control-Request-Method':'POST'}});
  assert.equal(denied.status,403);
  const ok=await fetch(base+'/api/router',{method:'OPTIONS',headers:{Origin:ORIGIN,'Access-Control-Request-Method':'POST'}});
  assert.equal(ok.status,204);
  assert.equal(ok.headers.get('access-control-allow-origin'),ORIGIN);
}));

test('directRpc posts JSON to GAS and normalizes response',async()=>{
  const original=global.fetch;
  let call=null;
  global.fetch=async(url,opt={})=>{
    call={url:String(url),opt};
    return {ok:true,status:200,text:async()=>JSON.stringify({ok:true,data:{rows:[{id:1}]}})};
  };
  try{
    const out=await directRpc('apiGetDashboardBundle',{scope:'main'},35000,cfg(ENV));
    assert.equal(out.ok,true);
    assert.equal(out.meta.transport,'gas-direct-json');
    assert.equal(out.meta.method,'apiGetDashboardBundle');
    assert.equal(call.url,ENV.GAS_WEB_APP_URL);
    assert.equal(call.opt.method,'POST');
    assert.equal(call.opt.headers['Content-Type'],'application/json;charset=UTF-8');
    assert.deepEqual(JSON.parse(call.opt.body),{method:'apiGetDashboardBundle',payload:{scope:'main'}});
  }finally{global.fetch=original}
});

test('directRpc rejects non-JSON GAS responses',async()=>{
  const original=global.fetch;
  global.fetch=async()=>({ok:true,status:200,text:async()=>'<html>not json</html>'});
  try{
    await assert.rejects(
      directRpc('apiSessionCheck',{},30000,cfg(ENV)),
      e=>e&&e.code==='GAS_DIRECT_JSON_INVALID'
    );
  }finally{global.fetch=original}
});
