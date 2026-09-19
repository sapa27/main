'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {once}=require('node:events');
const {REV,GAS_RESPONSE_CONTRACT,cfg,gasUrl,allowed,isWrite,timeout,validateGasEnvelope,directRpc,createServer}=require('../server');

const ORIGIN='https://sapa27-gateway-asxuzzwspa-eu.a.run.app';
const ENV={
  GAS_WEB_APP_URL:'https://script.google.com/macros/s/AKfycbwXIRMjP4yKRRlS7loJFiAmVCLxKq_uie6rUPsaKw17wtzWQOkjjaH2ah8gIqsHA6_G/exec',
  GATEWAY_ALLOWED_ORIGINS:ORIGIN,
  APP_SOURCE_SHA:'test-source-sha'
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
  assert.equal(REV,'cr8-gas-canonical-response-r340');
  assert.equal(GAS_RESPONSE_CONTRACT,'gas-direct-json-v1');
  assert.equal(gasUrl(ENV.GAS_WEB_APP_URL),ENV.GAS_WEB_APP_URL);
  assert.equal(allowed(ORIGIN,c),true);
  assert.equal(allowed('https://example.invalid',c),false);
  assert.equal(isWrite('apiSaveCase'),true);
  assert.equal(isWrite('apiGetDashboardBundle'),false);
  assert.equal(timeout('apiGetDashboardBundle',999999,c),75000);
  assert.equal(timeout('apiRouter',70000,c),70000);
  assert.equal(Object.prototype.hasOwnProperty.call(c,'rpc'),false);
  assert.equal(Object.prototype.hasOwnProperty.call(c,'parent'),false);
});

test('readiness and version expose direct-only CR-7 contract',async()=>withServer(async base=>{
  const ready=await (await fetch(base+'/ready')).json();
  const version=await (await fetch(base+'/version')).json();
  assert.equal(ready.ok,true);
  assert.equal(ready.gateway,'cr8-gas-canonical-response-r340');
  assert.equal(ready.gasTransport,'direct-json-primary');
  assert.equal(ready.responseContract,'gas-direct-json-v1');
  assert.equal(ready.legacyFallbackEnabled,false);
  assert.equal(ready.sourceSha,'test-source-sha');
  assert.equal(version.frontendHost,'cloud-run');
  assert.equal(version.gasTransport,'direct-json-primary');
  assert.equal(version.responseContract,'gas-direct-json-v1');
  assert.equal(version.legacyFallbackEnabled,false);
  assert.equal(version.sourceSha,'test-source-sha');
}));

test('local health is fast and does not depend on GAS',async()=>withServer(async base=>{
  const r=await fetch(base+'/health');
  const j=await r.json();
  assert.equal(r.status,200);
  assert.equal(j.ok,true);
  assert.equal(j.status,'healthy');
  assert.equal(j.upstream.checked,false);
  assert.equal(j.upstream.transport,'gas-direct-json');
},{...ENV,GAS_WEB_APP_URL:''}));

test('upstream health probes GAS separately',async()=>{
  const original=global.fetch;
  global.fetch=async(url,opt={})=>{
    if(String(url).startsWith('http://127.0.0.1:'))return original(url,opt);
    return {ok:true,status:200,text:async()=>JSON.stringify({transportOk:true,result:{ok:true}})};
  };
  try{
    await withServer(async base=>{
      const r=await fetch(base+'/upstream-health');
      const j=await r.json();
      assert.equal(r.status,200);
      assert.equal(j.ok,true);
      assert.equal(j.upstream.checked,true);
      assert.equal(j.upstream.transport,'gas-direct-json');
    });
  }finally{global.fetch=original}
});

test('upstream health fails closed when GAS is unavailable',async()=>withServer(async base=>{
  const r=await fetch(base+'/upstream-health');
  const j=await r.json();
  assert.equal(r.status,503);
  assert.equal(j.ok,false);
  assert.equal(j.error.code,'GAS_URL_NOT_CONFIGURED');
},{...ENV,GAS_WEB_APP_URL:''}));

test('CORS accepts same Cloud Run origin and rejects unknown origin',async()=>withServer(async base=>{
  const denied=await fetch(base+'/api/router',{method:'OPTIONS',headers:{Origin:'https://evil.invalid','Access-Control-Request-Method':'POST'}});
  assert.equal(denied.status,403);
  const ok=await fetch(base+'/api/router',{method:'OPTIONS',headers:{Origin:ORIGIN,'Access-Control-Request-Method':'POST'}});
  assert.equal(ok.status,204);
  assert.equal(ok.headers.get('access-control-allow-origin'),ORIGIN);
}));

test('directRpc posts JSON to GAS and preserves canonical GAS envelope',async()=>{
  const original=global.fetch;
  let call=null;
  global.fetch=async(url,opt={})=>{
    call={url:String(url),opt};
    return {ok:true,status:200,text:async()=>JSON.stringify({transportOk:true,result:{ok:true,data:{rows:[{id:1}]}}})};
  };
  try{
    const routed={method:'apiGetDashboardBundle',payload:{scope:'main'}};
    const out=await directRpc('apiRouter',routed,70000,cfg(ENV));
    assert.equal(out.envelope.transportOk,true);
    assert.equal(out.envelope.result.ok,true);
    assert.deepEqual(out.envelope.result.data.rows,[{id:1}]);
    assert.equal(out.meta.transport,'gas-direct-json');
    assert.equal(out.meta.responseContract,'gas-direct-json-v1');
    assert.equal(out.meta.method,'apiRouter');
    assert.equal(call.url,ENV.GAS_WEB_APP_URL);
    assert.equal(call.opt.method,'POST');
    assert.equal(call.opt.headers['Content-Type'],'application/json;charset=UTF-8');
    assert.deepEqual(JSON.parse(call.opt.body),{method:'apiRouter',payload:{method:'apiGetDashboardBundle',payload:{scope:'main'}}});
  }finally{global.fetch=original}
});


test('canonical GAS response contract is strict',()=>{
  assert.deepEqual(validateGasEnvelope({transportOk:true,result:{ok:true}}),{transportOk:true,result:{ok:true}});
  assert.deepEqual(validateGasEnvelope({transportOk:false,error:{code:'X',message:'fail'}}),{transportOk:false,error:{code:'X',message:'fail'}});
  assert.throws(()=>validateGasEnvelope({ok:true,result:{}}),e=>e&&e.code==='GAS_RESPONSE_CONTRACT_MISMATCH');
  assert.throws(()=>validateGasEnvelope({transportOk:true}),e=>e&&e.code==='GAS_RESPONSE_CONTRACT_MISMATCH');
});

test('api/router passes GAS envelope through without business re-wrapping',async()=>{
  const original=global.fetch;
  global.fetch=async(url,opt={})=>{
    if(String(url).startsWith('http://127.0.0.1:'))return original(url,opt);
    return {ok:true,status:200,text:async()=>JSON.stringify({transportOk:true,result:{ok:true,data:{value:7}}})};
  };
  try{
    await withServer(async base=>{
      const r=await fetch(base+'/api/router',{method:'POST',headers:{Origin:ORIGIN,'Content-Type':'application/json'},body:JSON.stringify({method:'apiRouter',payload:{method:'apiGetDashboardBundle',payload:{}}})});
      const j=await r.json();
      assert.equal(r.status,200);
      assert.deepEqual(j,{transportOk:true,result:{ok:true,data:{value:7}}});
      assert.equal(r.headers.get('x-gas-response-contract'),'gas-direct-json-v1');
      assert.ok(r.headers.get('x-request-id'));
    });
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

test('directRpc rejects non-canonical GAS envelopes',async()=>{
  const original=global.fetch;
  global.fetch=async()=>({ok:true,status:200,text:async()=>JSON.stringify({ok:true,result:{}})});
  try{
    await assert.rejects(
      directRpc('apiSessionCheck',{},30000,cfg(ENV)),
      e=>e&&e.code==='GAS_RESPONSE_CONTRACT_MISMATCH'
    );
  }finally{global.fetch=original}
});
