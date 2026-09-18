'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {once}=require('node:events');
const {REV,cfg,gasUrl,allowed,invoke,isWrite,timeout,parseJsonp,createServer}=require('../server');

const ENV={
  GAS_WEB_APP_URL:'https://script.google.com/macros/s/AKfycbwXIRMjP4yKRRlS7loJFiAmVCLxKq_uie6rUPsaKw17wtzWQOkjjaH2ah8gIqsHA6_G/exec',
  GAS_RPC_VERSION:'github-pages-rpc-r330',
  GATEWAY_ALLOWED_ORIGINS:'https://sapa27.github.io'
};

async function withServer(fn){
  const server=createServer(ENV);
  server.listen(0,'127.0.0.1');
  await once(server,'listening');
  const port=server.address().port;
  try{return await fn('http://127.0.0.1:'+port)}
  finally{await new Promise(resolve=>server.close(resolve))}
}

test('configuration and method routing stay canonical',()=>{
  const c=cfg(ENV);
  assert.equal(REV,'cr6-data-loading-r330');
  assert.equal(c.rpc,'github-pages-rpc-r330');
  assert.equal(gasUrl(ENV.GAS_WEB_APP_URL),ENV.GAS_WEB_APP_URL);
  assert.equal(gasUrl('http://script.google.com/macros/s/x/exec'),'');
  assert.equal(allowed('https://sapa27.github.io',c),true);
  assert.equal(allowed('https://example.invalid',c),false);
  assert.deepEqual(invoke('apiSearchCasesLite',{q:'x'}),{fn:'apiRouter',args:{method:'apiSearchCasesLite',payload:{q:'x'}},orig:'apiSearchCasesLite'});
  assert.equal(isWrite('apiSaveCase'),true);
  assert.equal(isWrite('apiGetDashboardBundle'),false);
  assert.equal(timeout('apiGetDashboardBundle',999999,c),45000);
});

test('JSONP parser accepts only the exact callback envelope',()=>{
  assert.deepEqual(parseJsonp('/**/cb({"ok":true});','cb'),{ok:true});
  assert.throws(()=>parseJsonp('cb({"ok":true});','cb'),/Invalid GAS JSONP/);
});

test('readiness and version endpoints expose the CR-6 contract',async()=>withServer(async base=>{
  const r=await (await fetch(base+'/ready')).json();
  assert.equal(r.ok,true);
  assert.equal(r.gateway,'cr6-data-loading-r330');
  assert.equal(r.upstreamConfigured,true);
  const v=await (await fetch(base+'/version')).json();
  assert.equal(v.ok,true);
  assert.equal(v.gateway,'cr6-data-loading-r330');
  assert.equal(v.rpcVersion,'github-pages-rpc-r330');
}));

test('CORS rejects unknown origins and accepts configured preflight',async()=>withServer(async base=>{
  const denied=await fetch(base+'/api/router',{method:'OPTIONS',headers:{Origin:'https://evil.invalid','Access-Control-Request-Method':'POST'}});
  assert.equal(denied.status,403);
  const ok=await fetch(base+'/api/router',{method:'OPTIONS',headers:{Origin:'https://sapa27.github.io','Access-Control-Request-Method':'POST'}});
  assert.equal(ok.status,204);
  assert.equal(ok.headers.get('access-control-allow-origin'),'https://sapa27.github.io');
}));

test('API route uses POST plus GAS result polling and returns normalized JSON',async()=>{
  const browserFetch=global.fetch;
  const upstream=[];
  global.fetch=async(url,opt={})=>{
    const u=new URL(String(url));
    upstream.push({url:u.toString(),method:opt.method||'GET',body:opt.body&&String(opt.body)});
    if((opt.method||'GET')==='POST') return {ok:true,status:200,text:async()=>''};
    const cb=u.searchParams.get('callback');
    const payload={transportOk:true,result:{ok:true,data:{rows:[{id:1}]}}};
    return {ok:true,status:200,text:async()=>'/ ** /'.replace(/ /g,'')+cb+'('+JSON.stringify(payload)+');'};
  };
  try{
    await withServer(async base=>{
      const res=await browserFetch(base+'/api/router',{
        method:'POST',
        headers:{Origin:'https://sapa27.github.io','Content-Type':'application/json'},
        body:JSON.stringify({method:'apiSearchCasesLite',payload:{query:'1111/2569'}})
      });
      assert.equal(res.status,200);
      const out=await res.json();
      assert.equal(out.ok,true);
      assert.equal(out.result.ok,true);
      assert.equal(out.meta.method,'apiSearchCasesLite');
      assert.ok(upstream.some(x=>x.method==='POST'&&/rpcFunction=apiRouter/.test(x.body)));
      assert.ok(upstream.some(x=>/mode=github-rpc-result/.test(x.url)));
    });
  } finally { global.fetch=browserFetch; }
});
