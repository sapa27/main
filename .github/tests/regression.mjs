#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT=process.cwd();
let passed=0;
function file(p){const x=path.join(ROOT,p);assert.ok(fs.existsSync(x),'missing file: '+p);return fs.readFileSync(x,'utf8')}
function ok(name,fn){try{fn();passed++;console.log('ok '+passed+' - '+name)}catch(e){console.error('not ok - '+name);throw e}}
function scripts(html){const out=[];for(const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)){const a=m[1]||'',type=(a.match(/\btype=["']([^"']+)["']/i)||[])[1]||'';if(/\bsrc\s*=/.test(a)||type&&!/(?:javascript|ecmascript|module)/i.test(type))continue;const b=(m[2]||'').replace(/<\?(?:!=|=)?[\s\S]*?\?>/g,'null');if(b.trim())out.push(b)}return out}

const index=file('frontend/index.html');
const config=file('frontend/app-config.js');
const transport=file('frontend/cloud-run-transport.js');
const gateway=file('cloud-run-gateway/server.js');
const workflow=file('.github/workflows/cloud-run-gateway.yml');
const frontWorkflow=file('.github/workflows/frontend-validation.yml');
const v2CanaryWorkflow=file('.github/workflows/v2-canary.yml');
const v2CloudCanaryWorkflow=file('.github/workflows/v2-cloud-run-canary.yml');
const v2PromoteWorkflow=file('.github/workflows/v2-promote-production.yml');

ok('CR-7 repository layout is Cloud Run source-only',()=>{
  assert.ok(fs.existsSync(path.join(ROOT,'frontend')));
  assert.ok(!fs.existsSync(path.join(ROOT,'github-pages')));
  assert.deepEqual(fs.readdirSync(path.join(ROOT,'frontend')).sort(),['app-config.js','cloud-run-transport.js','index.html']);
});

ok('frontend runtime has no retired GitHub/GAS browser dependency',()=>{
  const all=index+'\n'+config+'\n'+transport;
  for(const token of ['sapa27.github.io','github-pages','github-gas-transport','APP_GITHUB_CONFIG','GAS_WEB_APP_URL','script.google.com','GAS_PARENT_ORIGIN'])assert.ok(!all.includes(token),'retired frontend token: '+token);
});

ok('Cloud Run frontend identity is canonical',()=>{
  assert.ok(index.includes('CANONICAL CLOUD RUN FRONTEND r331-v62'));
  assert.ok(index.includes('"hostMode":"cloud-run"'));
  assert.ok(index.includes('./cloud-run-transport.js?v=r331-v62-cloudrun-cr7-20260918'));
  assert.ok(config.includes('cloud-run-canonical-frontend-r331-v62-cr8-gas-response-20260918'));
  assert.ok(config.includes('APP_RUNTIME_CONFIG'));
  assert.ok(config.includes('gas-direct-json-v1'));
});

ok('frontend JavaScript syntax',()=>{
  new vm.Script(config,{filename:'app-config.js'});
  new vm.Script(transport,{filename:'cloud-run-transport.js'});
  scripts(index).forEach((s,i)=>new vm.Script(s,{filename:'index#'+(i+1)}));
});

ok('critical application surfaces remain present',()=>{
  for(const id of ['dashboard','search','petitioner','meeting','committee-meeting','track','report','people','budget','admin'])assert.ok(index.includes('tpl-page-'+id),'missing '+id);
  for(const marker of ['ลำดับเรื่อง','จัดการเรื่องพิจารณา','ประวัติการประชุม','หนังสือติดตามมติ'])assert.ok(index.includes(marker),'missing UI marker '+marker);
});

ok('CR-5 mobile Meeting protections remain',()=>{
  assert.ok(index.includes('id="app-mobile-compact-cr5"'));
  assert.ok(index.includes('route.meeting.bootstrap-background:'));
  assert.ok(index.includes('forceFresh:!1,assetStamp:'));
  assert.ok(!index.includes('forceFresh:/^Scripts_Page_Meeting'));
});

ok('CR-6 data-loading fixes remain',()=>{
  assert.ok(index.includes('function expandAssetList(list)'));
  assert.ok(index.includes('loadActualFiles(core,"core")'));
  assert.ok(!index.includes('safePartial("bundle:appCore")'));
  assert.ok(transport.includes('wire==="apiRouter"'));
  assert.ok(transport.includes('write=isWriteMethod(I.method),read=isReadMethod(I.method)'));
  assert.ok(transport.includes('EPOCH++'));
  assert.ok(transport.includes('epoch===EPOCH'));
  assert.ok(transport.includes('stale-while-revalidate'));
});

ok('browser transport is Cloud Run only',()=>{
  assert.ok(transport.includes('gas-direct-json-v1'));
  assert.ok(transport.includes('u+"/api/router"'));
  assert.ok(transport.includes('credentials:"omit"'));
  assert.ok(transport.includes('cache:"no-store"'));
  assert.ok(!transport.includes('parentOrigin'));
  assert.ok(!transport.includes('rpcToken'));
  assert.ok(!transport.includes('rpcVersion'));
});

ok('gateway is direct-only and contains no legacy GitHub RPC',()=>{
  new vm.Script(gateway,{filename:'server.js'});
  assert.ok(gateway.includes("REV='cr8-gas-canonical-response-r340'"));
  assert.ok(gateway.includes("GAS_RESPONSE_CONTRACT='gas-direct-json-v1'"));
  assert.ok(gateway.includes("transport:'gas-direct-json'"));
  assert.ok(gateway.includes('validateGasEnvelope'));
  assert.ok(gateway.includes('out.envelope'));
  assert.ok(!gateway.includes('return{ok:true,result:value'));
  assert.ok(gateway.includes("gasTransport:'direct-json-primary'"));
  assert.ok(gateway.includes('responseContract:GAS_RESPONSE_CONTRACT'));
  assert.ok(gateway.includes('legacyFallbackEnabled:false'));
  assert.ok(gateway.includes('sourceSha:sourceSha(env)'));
  for(const token of ['sapa27.github.io','github-pages-rpc','GAS_PARENT_ORIGIN','legacyRpc','legacyJsonp','github-rpc'])assert.ok(!gateway.includes(token),'retired gateway token: '+token);
});

ok('GAS owns the application response envelope',()=>{
  assert.ok(transport.includes('X-GAS-Response-Contract'));
  assert.ok(transport.includes('x.transportOk!==true'));
  assert.ok(transport.includes('return x.result'));
  const rpcStart=transport.indexOf('function cloudRpc('),rpcEnd=transport.indexOf('function rpc(',rpcStart);const rpcBlock=transport.slice(rpcStart,rpcEnd);
  assert.ok(rpcStart>=0&&rpcEnd>rpcStart);
  assert.ok(!rpcBlock.includes('x.ok!==true'));
  assert.ok(gateway.includes("'X-GAS-Response-Contract':GAS_RESPONSE_CONTRACT"));
  assert.ok(gateway.includes('return send(res,200,out.envelope,headers)'));
});

ok('production deploy is gated by direct-only canary',()=>{
  assert.ok(workflow.includes('cp -R frontend cloud-run-gateway/public'));
  assert.ok(workflow.includes("'frontend/**'"));
  assert.ok(!workflow.includes("'github-pages/**'"));
  assert.ok(workflow.includes('Deploy CR-8 GAS-canonical canary'));
  assert.ok(workflow.includes('Require direct GAS transport on canary'));
  assert.ok(workflow.includes('Promote CR-8 GAS-canonical to production'));
  assert.ok(workflow.includes('Remove CR-8 canary'));
  assert.ok(!workflow.includes('sapa27.github.io'));
  assert.ok(!workflow.includes('github-pages-rpc'));
  assert.ok(frontWorkflow.includes('node .github/tests/regression.mjs --frontend-only'));
});

ok('all deployment gates require live GAS upstream',()=>{
  for(const [name,wf] of [['cr7',workflow],['v2-canary',v2CanaryWorkflow],['v2-cloud-canary',v2CloudCanaryWorkflow],['v2-promote',v2PromoteWorkflow]]){
    assert.ok(wf.includes('/upstream-health'),name+' missing upstream probe');
    assert.ok(wf.includes('APP_SOURCE_SHA='),name+' missing source SHA deployment attestation');
    assert.ok(wf.includes('sourceSha'),name+' missing source SHA verification');
    assert.ok(wf.includes('u.upstream?.checked!==true'),name+' missing checked=true gate');
    assert.ok(wf.includes('u.upstream?.ok!==true'),name+' missing upstream ok gate');
    assert.ok(wf.includes('u.upstream?.transport!==\"gas-direct-json\"'),name+' missing direct-json transport gate');
    assert.ok(!/upstream-health[^\n]*\|\|\s*echo/.test(wf),name+' upstream probe must fail closed');
  }
});

ok('interaction paths avoid blocking work on tap',()=>{
  assert.ok(index.includes('function scheduleRoutePrefetchCurrent(el)'));
  assert.ok(index.includes('requestIdleCallback'));
  assert.ok(!index.includes('document.addEventListener("pointerdown",function(ev){prefetchRouteFromElementCurrent'));
  assert.ok(index.includes('data-app-thai-date-ready'));
  assert.ok(index.includes('input.setAttribute("inputmode", "numeric")'));
  assert.ok(index.includes('var registeredNow=callRegistered(targetPage)'));
  assert.ok(index.includes('var directNow=callGlobal()'));
  assert.ok(index.includes('feedbackObserver = null'));
  assert.ok(index.includes('stopFeedbackObserver()'));
});

ok('frontend performance cache policy remains bounded',()=>{
  for(const token of ['REQUEST_TIMEOUT_MS:45000','WRITE_REQUEST_TIMEOUT_MS:120000','AI_DOCUMENT_TIMEOUT_MS:300000','RPC_READ_CACHE_MAX_ENTRIES:96','apiGetDashboardBundle:180000','apiGetMeetingLookupOptions:300000'])assert.ok(config.includes(token),token);
});

console.log('# '+passed+' CR-7 regression groups passed');
