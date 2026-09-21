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
const meetingController=file('frontend/meeting-controller.html');
const gateway=file('cloud-run-gateway/server.js');
const workflow=file('.github/workflows/cloud-run-gateway.yml');
const frontWorkflow=file('.github/workflows/frontend-validation.yml');
const v2CanaryWorkflow=file('.github/workflows/v2-canary.yml');
const v2CloudCanaryWorkflow=file('.github/workflows/v2-cloud-run-canary.yml');
const v2PromoteWorkflow=file('.github/workflows/v2-promote-production.yml');

ok('CR-7 repository layout is Cloud Run source-only',()=>{
  assert.ok(fs.existsSync(path.join(ROOT,'frontend')));
  assert.ok(!fs.existsSync(path.join(ROOT,'github-pages')));
  assert.deepEqual(fs.readdirSync(path.join(ROOT,'frontend')).sort(),['app-config.js','cloud-run-transport.js','index.html','meeting-controller.html']);
});

ok('frontend runtime has no retired GitHub/GAS browser dependency',()=>{
  const all=index+'\n'+config+'\n'+transport+'\n'+meetingController;
  for(const token of ['sapa27.github.io','github-pages','github-gas-transport','APP_GITHUB_CONFIG','GAS_WEB_APP_URL','script.google.com','GAS_PARENT_ORIGIN'])assert.ok(!all.includes(token),'retired frontend token: '+token);
});

ok('Cloud Run frontend identity is canonical',()=>{
  assert.ok(index.includes('CANONICAL CLOUD RUN FRONTEND r331-v62'));
  assert.ok(index.includes('TRANSPORT gas-direct-json-v1'));
  assert.ok(index.includes('"hostMode":"cloud-run"'));
  assert.ok(index.includes('./cloud-run-transport.js?v=r331-v62-cloudrun-cr8-20260918'));
  assert.ok(config.includes('cloud-run-canonical-frontend-r331-v62-cr8.13-authenticated-deferred-handoff-20260920'));
  assert.ok(config.includes('APP_RUNTIME_CONFIG'));
  assert.ok(config.includes('gas-direct-json-v1'));
});

ok('frontend JavaScript syntax',()=>{
  new vm.Script(config,{filename:'app-config.js'});
  new vm.Script(transport,{filename:'cloud-run-transport.js'});
  scripts(index).forEach((s,i)=>new vm.Script(s,{filename:'index#'+(i+1)}));
  scripts(meetingController).forEach((s,i)=>new vm.Script(s,{filename:'meeting-controller#'+(i+1)}));
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

ok('application APIs use canonical GAS apiRouter wire',()=>{
  assert.ok(transport.includes('function directGasFunction(fn)'));
  assert.ok(transport.includes('function gasWire(I)'));
  assert.ok(transport.includes('wire:"apiRouter",wirePayload:{method:I.method,payload:I.payload==null?{}:I.payload},routed:true'));
  assert.ok(transport.includes('var I=invocation(f,a),G=gasWire(I)'));
  assert.ok(transport.includes('method:G.wire,payload:G.wirePayload'));
  assert.ok(transport.includes('routedThroughApiRouter:G.routed'));
  assert.ok(transport.includes('__APP_GAS_ROUTER_WIRE_CURRENT__="gas-router-wire-r350"'));
  for(const direct of ['apiRouter','apiLogin','apiSessionResume','apiSessionCheck','apiLogout','getDeferredInclude'])assert.ok(transport.includes(direct),'missing direct GAS transport function '+direct);
  assert.ok(transport.includes('function appResultCacheable(v)'));
  assert.ok(transport.includes('epoch===EPOCH&&appResultCacheable(v)'));
  assert.ok(transport.includes('read&&key&&epoch===EPOCH&&appResultCacheable(v)'));
  assert.ok(config.includes('CR-8.13 Authenticated Deferred Handoff'));
  assert.ok(config.includes('current-quality-gate-r353'));
  const wireStart=transport.indexOf('function invocation(fn,a)');
  const wireEnd=transport.indexOf('function isReadMethod(fn)',wireStart);
  assert.ok(wireStart>=0&&wireEnd>wireStart,'router wire helpers missing');
  const ctx={t:v=>v==null?'':String(v)};
  vm.runInNewContext(transport.slice(wireStart,wireEnd),ctx);
  let I=ctx.invocation('apiGetDashboardBundle',{token:'t',forceFresh:true}),G=ctx.gasWire(I);
  assert.equal(I.method,'apiGetDashboardBundle');
  assert.equal(G.wire,'apiRouter');
  assert.equal(G.routed,true);
  assert.equal(G.wirePayload.method,'apiGetDashboardBundle');
  assert.equal(G.wirePayload.payload.forceFresh,true);
  I=ctx.invocation('apiLogin',{username:'u'});G=ctx.gasWire(I);
  assert.equal(G.wire,'apiLogin');
  assert.equal(G.routed,false);
  I=ctx.invocation('apiRouter',{method:'apiSearchCasesLite',payload:{query:'x'}});G=ctx.gasWire(I);
  assert.equal(I.method,'apiSearchCasesLite');
  assert.equal(G.wire,'apiRouter');
  assert.equal(G.routed,false);
  assert.equal(G.wirePayload.method,'apiSearchCasesLite');
});

{
  const state=Object.create(null);
  const store={
    get:(k,d)=>Object.prototype.hasOwnProperty.call(state,k)?state[k]:d,
    set:(k,v)=>(state[k]=v,v),
    assign:map=>(Object.assign(state,map),Object.assign({},state))
  };
  const root2={
    AppSecurity:{setSessionTokens(token,csrf){store.set('auth.token',String(token||''));store.set('auth.csrfToken',String(csrf||''));return {token:!!token,csrf:!!csrf}}},
    __APP_ASSET_STAMP__:'fixture-r353'
  };
  const doc={documentElement:{classList:{remove(){}},setAttribute(){}},body:{classList:{add(){}}},dispatchEvent(){}};
  const commitStart=index.indexOf('function commitLoginSuccessCrit(data2)');
  const commitEnd=index.indexOf('function hydrateContractAfterLoginCrit',commitStart);
  assert.ok(commitStart>=0&&commitEnd>commitStart,'login commit function missing');
  const loginCtx={
    root2,store,doc,
    txt:v=>v==null?'':String(v),
    unlockLoginLocksCrit(){},
    normRoleCrit:v=>String(v||'Viewer'),
    saveResume(){return true},
    updateRoleBadgeCrit(){},
    id(){return null},
    shell(){},
    __appObserve(){},
    CustomEvent:function(name,init){this.type=name;this.detail=init&&init.detail}
  };
  vm.runInNewContext(index.slice(commitStart,commitEnd),loginCtx);
  loginCtx.commitLoginSuccessCrit({token:'fixture-login-token',csrfToken:'fixture-csrf',user:{role:'Admin',name:'Fixture'}});
  assert.equal(store.get('auth.token',''),'fixture-login-token');
  assert.equal(store.get('auth.csrfToken',''),'fixture-csrf');

  const reqStart=index.indexOf('function deferredRequestPayloadCurrent(name)');
  const reqEnd=index.indexOf('function fetchPartialHtml(n)',reqStart);
  assert.ok(reqStart>=0&&reqEnd>reqStart,'deferred authenticated request helper missing');
  const reqCtx={root2,store,txt:v=>v==null?'':String(v),__appObserve(){}};
  vm.runInNewContext(index.slice(reqStart,reqEnd),reqCtx);
  const deferred=reqCtx.deferredRequestPayloadCurrent('Scripts_Page_Dashboard');
  assert.equal(deferred.token,'fixture-login-token');
  assert.equal(deferred._token,'fixture-login-token');
  assert.equal(deferred.authToken,'fixture-login-token');
  assert.equal(deferred.csrfToken,'fixture-csrf');

  const raw=[];
  const apiRoot={
    __authToken:'',
    __csrfToken:'',
    AppSessionResume:null
  };
  const apiCtx={
    root2:apiRoot,store,
    txt:v=>v==null?'':String(v),
    data:p=>p==null?{}:Array.isArray(p)?p.slice():typeof p==='object'?Object.assign({},p):{value:p},
    ctx:()=>({fixture:true}),
    __appIsFn:v=>typeof v==='function',
    RT:{rawRun:async(method,payload)=>{raw.push({method,payload});return {ok:true,data:{}}}},
    Promise,Object,Array
  };
  const baseStart=index.indexOf('function base(m,p,options)');
  const baseEnd=index.indexOf('function saveResume',baseStart);
  assert.ok(baseStart>=0&&baseEnd>baseStart,'critical API base missing');
  vm.runInNewContext(index.slice(baseStart,baseEnd),apiCtx);
  await apiCtx.base('getDeferredInclude',{name:'Scripts_Page_Dashboard'});
  await apiCtx.base('apiGetDashboardBundle',{source:'fixture-r353'});
  ok('login token is committed before Dashboard asset and business requests',()=>{
    assert.equal(raw[0].method,'getDeferredInclude');
    assert.equal(raw[0].payload.token,'fixture-login-token');
    assert.equal(raw[1].method,'apiRouter');
    assert.equal(raw[1].payload.method,'apiGetDashboardBundle');
    assert.equal(raw[1].payload.payload.token,'fixture-login-token');
  });

  store.set('auth.token','');
  store.set('auth.csrfToken','');
  assert.throws(()=>reqCtx.deferredRequestPayloadCurrent('Scripts_Page_Dashboard'),e=>e.code==='DASHBOARD_AUTH_TOKEN_NOT_READY');
  ok('Dashboard deferred asset fails fast before GAS when auth token is not ready',()=>{
    assert.equal(root2.__APP_DEFERRED_AUTH_HANDOFF_CURRENT__.tokenReady,false);
    assert.equal(root2.__APP_DEFERRED_AUTH_HANDOFF_CURRENT__.dashboard,true);
  });
}

ok('auth session and deferred assets bypass the application router',()=>{
  assert.ok(index.includes('__APP_DIRECT_BOOTSTRAP_TRANSPORT_CURRENT__="direct-bootstrap-r349"'));
  assert.ok(index.includes('directTransportMethod=/^(apiLogin|apiLogout|apiSessionResume|apiSessionCheck|getDeferredInclude)$/i.test(a)'));
  const baseStart=index.indexOf('function base(m,p,options)');
  const baseEnd=index.indexOf('function saveResume',baseStart);
  assert.ok(baseStart>=0&&baseEnd>baseStart,'critical API base missing');
  const baseBlock=index.slice(baseStart,baseEnd);
  assert.ok(baseBlock.includes('directTransportMethod?RT.rawRun(a,q,options)'));
  assert.ok(baseBlock.includes('RT.rawRun("apiRouter",{method:a,payload:q},options)'));
  assert.ok(baseBlock.includes('q.token=t'),'direct deferred load must receive authenticated token');
  assert.ok(index.includes('function deferredRequestPayloadCurrent(name)'));
  assert.ok(index.includes('deferred-auth-handoff-r353'));
  assert.ok(index.includes('DASHBOARD_AUTH_TOKEN_NOT_READY'));
  assert.ok(index.includes('root2.AppApi.call("getDeferredInclude",requestPayload)'));
  assert.ok(gateway.includes('read:+env.GAS_READ_TIMEOUT_MS||75000'));
  assert.ok(config.includes('REQUEST_TIMEOUT_MS:60000'));
  assert.ok(config.includes('apiGetDashboardBundle:70000'));
});

ok('gateway is direct-only and contains no legacy GitHub RPC',()=>{
  new vm.Script(gateway,{filename:'server.js'});
  assert.ok(gateway.includes("REV='cr8.14-anti-public-gateway'"));
  assert.ok(gateway.includes("GAS_RESPONSE_CONTRACT='gas-direct-json-v1'"));
  assert.ok(gateway.includes("ANTI_RESPONSE_CONTRACT='anti-public-json-v1'"));
  assert.ok(gateway.includes("transport:'gas-direct-json'"));
  assert.ok(gateway.includes('validateGasEnvelope'));
  assert.ok(gateway.includes('out.envelope'));
  assert.ok(!gateway.includes('return{ok:true,result:value'));
  assert.ok(gateway.includes("gasTransport:'direct-json-primary'"));
  assert.ok(gateway.includes('responseContract:GAS_RESPONSE_CONTRACT'));
  assert.ok(gateway.includes('legacyFallbackEnabled:false'));
  assert.ok(gateway.includes('sourceSha:sourceSha(env)'));
  assert.ok(gateway.includes("u.pathname==='/api/anti'"));
  assert.ok(gateway.includes("action!=='dashboard'&&action!=='search'"));
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
  assert.ok(workflow.includes("grep -q 'cr8.13-authenticated-deferred-handoff'"));
  assert.ok(workflow.includes("grep -q 'repairMeetingCanonicalMountCurrent'"));
  assert.ok(workflow.includes('test -f cloud-run-gateway/public/meeting-controller.html'));
  assert.ok(workflow.includes('meeting-controller.html" -o "$tmp_dir/meeting-controller.html"'));
  assert.ok(workflow.includes("grep -q 'CR-8.3 Cloud Run static Meeting controller'"));
  assert.ok(workflow.includes("grep -q 'fetchStaticMeetingController'"));
  assert.ok(workflow.includes('for attempt in 1 2 3; do'));
  assert.ok(workflow.includes('Production upstream health failed after 3 attempts'));
  assert.ok(!workflow.includes('upstream health degraded'));
  assert.ok(workflow.includes('ANTI_PUBLIC_ORIGIN: https://sapa27.github.io'));
  assert.ok(workflow.includes('ANTI_GAS_WEB_APP_URL: https://script.google.com/macros/s/AKfycbz2X5BGdO5Up1f2wcTp_Joy_R4zXbhn8CpSWLnN74VayxaiVr8jiAqrHnaoNpd-jHvc9Q/exec'));
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

ok('Meeting controller code is served by Cloud Run, not fetched from GAS',()=>{
  assert.ok(meetingController.includes('CR-8.3 Cloud Run static Meeting controller'));
  assert.ok(meetingController.includes('window.initMeetingPage'));
  assert.ok(meetingController.includes('AppPages.register("meeting"'));
  assert.ok(!meetingController.includes('data-app-fragment="committee"'));
  for(const token of ['script.google.com','google.script.run','parentOrigin','getDeferredInclude'])assert.ok(!meetingController.includes(token),'retired/static controller dependency '+token);
  assert.ok(index.includes('function isStaticMeetingPartial(n)'));
  assert.ok(index.includes('function fetchStaticMeetingController()'));
  assert.ok(index.includes('./meeting-controller.html?v='));
  assert.ok(index.includes('loaded[STATIC_MEETING_KEY]'));
  const fetchStart=index.indexOf('function fetchPartialHtml(n)');
  const fetchEnd=index.indexOf('function prefetchPartial(n)',fetchStart);
  const fetchBlock=index.slice(fetchStart,fetchEnd);
  assert.ok(fetchBlock.indexOf('isStaticMeetingPartial(n)')>=0);
  assert.ok(fetchBlock.indexOf('isStaticMeetingPartial(n)')<fetchBlock.indexOf('AppApi.call("getDeferredInclude"'),'Meeting must resolve locally before GAS deferred include');
});

ok('Meeting controller opens before shared deferred runtime',()=>{
  assert.ok(index.includes('function warmMeetingSharedAssets(list)'));
  const loadStart=index.indexOf('function loadPage(p)');
  const loadEnd=index.indexOf('function assertExternalAsset',loadStart);
  const loadBlock=index.slice(loadStart,loadEnd);
  assert.ok(loadBlock.includes('if(n==="meeting")return ensureCore()'));
  assert.ok(loadBlock.includes('safePartial("Scripts_Page_Meeting::meeting-common")'));
  assert.ok(loadBlock.includes('warmMeetingSharedAssets(list);return!0'));
  assert.ok(loadBlock.indexOf('safePartial("Scripts_Page_Meeting::meeting-common")')<loadBlock.indexOf('warmMeetingSharedAssets(list)'));
  assert.ok(index.includes('meeting.shared.load.degraded'));
});

ok('Meeting canonical lifecycle recovers mobile activation race',()=>{
  assert.ok(index.includes('critical-bootstrap-lifecycle-compatible-r342'));
  assert.ok(index.includes('a.__canonicalLifecycle=!0'));
  assert.ok(index.includes('function ensureCanonicalPageControllerCurrent(id)'));
  assert.ok(index.includes('function meetingInteractiveReadyCurrent(id)'));
  assert.ok(index.includes('function repairMeetingCanonicalMountCurrent(id,generation)'));
  assert.ok(index.includes('router-meeting-canonical-recovery'));
  assert.ok(index.includes('var adapter=ensureCanonicalPageControllerCurrent(id)'));
  assert.ok(index.includes('force:id==="meeting"'));
  assert.ok(index.includes('reload:id==="meeting"?!1:void 0'));
  assert.ok(index.includes('meetingPageInitialized==="1"'));
  assert.ok(index.includes('result===!1&&id==="meeting"&&!isPageOperational(id)?repairMeetingCanonicalMountCurrent(id,generation)'));
  const bridgeStart=index.indexOf('function ensureCanonicalPageControllerCurrent(id)');
  const bridgeEnd=index.indexOf('function pageControllerReadyCurrent',bridgeStart);
  assert.ok(bridgeStart>=0&&bridgeEnd>bridgeStart,'canonical controller bridge missing');
  const bridge=index.slice(bridgeStart,bridgeEnd);
  const adapter={mount(){return true},reload(){return true},dispose(){return true}};
  const ctx={
    canonicalPageId:v=>String(v||''),
    __appIsFn:v=>typeof v==='function',
    __appObserve:()=>false,
    window:{
      AppPages:{get:()=>adapter},
      AppLifecycle:{
        getPage:()=>adapter,
        registerPage:(id,a)=>{a.__canonicalLifecycle=true;return a}
      }
    }
  };
  vm.runInNewContext(bridge,ctx);
  assert.equal(ctx.ensureCanonicalPageControllerCurrent('meeting'),adapter);
  assert.equal(adapter.__canonicalLifecycle,true,'legacy/bootstrap Meeting adapter must be promoted into canonical lifecycle');
  const opStart=index.indexOf('function isPageOperational(id)');
  const opEnd=index.indexOf('function waitForPageOperational',opStart);
  const op=index.slice(opStart,opEnd);
  assert.ok(!op.includes('initMeetingPage'),'operational check must still have one lifecycle owner');
  assert.ok(!op.includes('meetingPageInitialized'),'DOM must not become an independent lifecycle owner');
});

ok('Dashboard critical-first controller accepts canonical data before Core',()=>{
  assert.ok(index.includes('function patchDashboardControllerContractCurrent(n,h)'));
  assert.ok(index.includes('dashboard-critical-first-r347'));
  assert.ok(index.includes('Object.prototype.hasOwnProperty.call(res,"ok")'));
  assert.ok(index.includes('root.AppApi&&__appIsFn(root.AppApi.call)?root.AppApi.call(method,payload'));
  assert.ok(index.includes('dashboard.controller.contract.notMatched'));
  const fetchStart=index.indexOf('function fetchPartialHtml(n)');
  const fetchEnd=index.indexOf('function prefetchPartial(n)',fetchStart);
  const fetchBlock=index.slice(fetchStart,fetchEnd);
  assert.ok(fetchBlock.includes('h=patchDashboardControllerContractCurrent(n,h)'));
  assert.ok(config.includes('CR-8.13 Authenticated Deferred Handoff'));
  assert.ok(config.includes('current-quality-gate-r353'));
  assert.ok(transport.includes('return x.result'),'GAS application envelope must remain transport-owned and unchanged');
});

ok('Dashboard controller and data recovery are bounded after login',()=>{
  assert.ok(index.includes('function dashboardControllerReadyCrit()'));
  assert.ok(index.includes('function waitDashboardAuthTokenCrit(timeoutMs)'));
  assert.ok(index.includes('function recoverDashboardRuntimeCrit(reason)'));
  assert.ok(index.includes('dashboard-runtime-recovery-r345'));
  assert.ok(index.includes('dashboard-data-recovery-r345'));
  assert.ok(index.includes('dashboard.dataRecovery.current'));
  assert.ok(index.includes('dashboard.dataRecovery.criticalFirst'));
  assert.ok(index.includes('DASHBOARD_CONTROLLER_NOT_READY'));
  assert.ok(index.includes('var delays=[0,1200,3500,7000]'));
  assert.ok(index.includes('var state=root2.__APP_DASHBOARD_DATA_RECOVERY_CURRENT__,delays=[1600,4000,9000]'));
  assert.ok(index.includes('state.attempt>=delays.length'));
  const loadStart=index.indexOf('function loadPage(p)');
  const loadEnd=index.indexOf('function assertExternalAsset',loadStart);
  const loadBlock=index.slice(loadStart,loadEnd);
  const dashboardStart=loadBlock.indexOf('if(n==="dashboard")');
  const genericPos=loadBlock.indexOf('return Promise.all([ensureCore()');
  const dashboardBlock=loadBlock.slice(dashboardStart,genericPos);
  assert.ok(dashboardStart>=0&&genericPos>dashboardStart,'Dashboard critical-first branch missing');
  assert.ok(dashboardBlock.includes('safePartial("Scripts_Page_Dashboard")'));
  assert.ok(!dashboardBlock.includes('ensureCore()'),'Dashboard controller must not wait for Core');
  const authStart=index.indexOf('function loadAuthenticatedRuntimeCrit(reason)');
  const authEnd=index.indexOf('function activateRecoveredDashboardCrit',authStart);
  const authBlock=index.slice(authStart,authEnd);
  assert.ok(authBlock.includes('safePartial("Scripts_Page_Dashboard")'));
  assert.ok(!authBlock.includes('ensureCore()'),'login Dashboard runtime must not block on Core');
  const activateStart=index.indexOf('function activateRecoveredDashboardCrit(reason)');
  const activateEnd=index.indexOf('function recoverDashboardRuntimeCrit',activateStart);
  const activateBlock=index.slice(activateStart,activateEnd);
  assert.ok(activateBlock.includes('P.get("dashboard")'));
  assert.ok(activateBlock.includes('a.mount({source:reason||"dashboard-critical-first-r347"'));
  assert.ok(activateBlock.includes('directMount:!0'));
  assert.ok(!index.includes('setInterval(function(){recoverDashboardRuntimeCrit'),'Dashboard recovery must not poll forever');
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
  for(const token of ['REQUEST_TIMEOUT_MS:60000','WRITE_REQUEST_TIMEOUT_MS:120000','AI_DOCUMENT_TIMEOUT_MS:300000','RPC_READ_CACHE_MAX_ENTRIES:96','apiGetDashboardBundle:70000','apiGetDashboardBundle:180000','apiGetMeetingLookupOptions:300000'])assert.ok(config.includes(token),token);
});

// Exercise the public transport entry point used by the critical/runtime API facades.
{
  const calls=[];
  const w={
    location:{origin:'https://test-canary.run.app'},
    APP_RUNTIME_CONFIG:{CLOUD_RUN_GATEWAY_URL:'https://test-production.run.app/'},
    setTimeout,clearTimeout,
    fetch:async(url,options)=>{
      calls.push({url,body:JSON.parse(options.body)});
      return {ok:true,headers:{get:()=> 'gas-direct-json-v1'},text:async()=>JSON.stringify({transportOk:true,result:{ok:true,data:{html:'<script>/* fixture */</script>'}}})};
    }
  };
  vm.runInNewContext(transport,{window:w,document:{dispatchEvent(){}},CustomEvent:function(){},Promise,Date});
  await w.AppTransport.run('apiRouter',{method:'getDeferredInclude',payload:{name:'Scripts_Page_Dashboard',token:'fixture-only'}});
  ok('wrapped deferred assets reach the direct GAS function on the current Cloud Run origin',()=>{
    assert.equal(calls[0].url,'https://test-canary.run.app/api/router');
    assert.deepEqual(calls[0].body.payload,{name:'Scripts_Page_Dashboard',token:'fixture-only'});
    assert.equal(calls[0].body.method,'getDeferredInclude');
  });
  await w.AppTransport.run('apiRouter',{method:'apiSessionCheck',payload:{token:'fixture-only'}});
  await w.AppTransport.run('apiGetDashboardBundle',{token:'fixture-only'});
  await w.AppTransport.run('apiRouter',{method:'apiSaveCase',payload:{caseNo:'fixture-only',token:'fixture-only'}});
  ok('auth calls remain direct and business reads/writes preserve the GAS router payload',()=>{
    assert.equal(calls[1].body.method,'apiSessionCheck');
    assert.equal(calls[2].body.method,'apiRouter');
    assert.equal(calls[2].body.payload.method,'apiGetDashboardBundle');
    assert.equal(calls[3].body.method,'apiRouter');
    assert.equal(calls[3].body.payload.method,'apiSaveCase');
    assert.equal(calls[3].body.timeoutMs,120000);
  });
}

{
  const ctx={txt:v=>v==null?'':String(v),htmlCache:{},inflight:{},RT:{recordWarning(){}},deferredStatusCurrent(){},isStaticMeetingPartial:()=>false,patchDashboardControllerContractCurrent:(_n,h)=>h,__appObserve(){}};
  let attempts=0;
  ctx.store={get:(k,d)=>k==='auth.token'?'fixture-token':d};
  ctx.root2={__APP_ASSET_STAMP__:'fixture-r353',AppApi:{call:async()=> ++attempts===1?{unexpected:true}:{data:{html:'<script>/* recovered */</script>'}}}};
  const start=index.indexOf('function deferredHtmlCurrent('),end=index.indexOf('function prefetchPartial(',start);
  vm.runInNewContext(index.slice(start,end),ctx);
  await assert.rejects(ctx.fetchPartialHtml('Scripts_Page_Dashboard'),e=>e.code==='DEFERRED_INCLUDE_INVALID_HTML');
  assert.equal(await ctx.fetchPartialHtml('Scripts_Page_Dashboard'),'<script>/* recovered */</script>');
  ok('invalid deferred responses cannot mark a controller loaded or poison its retry',()=>{
    assert.equal(attempts,2);
    assert.deepEqual(Object.keys(ctx.inflight),[]);
    assert.throws(()=>ctx.deferredHtmlCurrent({ok:false,data:{code:'ASSET_DENIED'}},'fixture'),e=>e.code==='ASSET_DENIED');
    assert.equal(ctx.deferredHtmlCurrent({result:{data:{html:'<script>/* nested */</script>'}}},'fixture'),'<script>/* nested */</script>');
  });
}

// Keep the real strict-mode closure: extracting helper declarations on their own
// would hide a helper accidentally scoped inside the initialization block.
{
  const calls=[];
  const w={
    __APP_CRITICAL_LOGIN_RUNTIME_READY__:true,
    AppRuntime:{recordWarning(){}},
    AppApi:{call:async(method,payload)=>{calls.push([method,payload.name]);return {html:'<script>/* dashboard fixture */</script>'}}},
    fetch:async url=>{calls.push(['static',url]);return {ok:true,text:async()=>'<script>window.initMeetingPage=function(){};AppPages.register("meeting",{});</script>'}},
    document:{documentElement:{setAttribute(){}}}
  };
  const critical=scripts(index).find(s=>s.includes('function fetchPartialHtml(n)'));
  const instrumented=critical.replace('function ns(name,seed)', 'htmlCache={};inflight={};loaded={};doc=root2.document;RT=root2.AppRuntime;store={get:function(k,d){return k==="auth.token"?"fixture-token":d}};root2.scopeTest={fetchPartialHtml:fetchPartialHtml,invalidatePartial:function(n){return invalidatePartial(n)}};function ns(name,seed)');
  vm.runInNewContext(instrumented,{window:w,document:w.document,__appIsFn:v=>typeof v==='function',__appObserve(){}});
  assert.equal(await w.scopeTest.fetchPartialHtml('Scripts_Page_Dashboard'),'<script>/* dashboard fixture */</script>');
  assert.ok((await w.scopeTest.fetchPartialHtml('Scripts_Page_Meeting::meeting')).includes('window.initMeetingPage'));
  w.scopeTest.invalidatePartial('Scripts_Page_Dashboard');
  await w.scopeTest.fetchPartialHtml('Scripts_Page_Dashboard');
  ok('strict-mode deferred loader can access both asset transports and invalidate its cache',()=>{
    assert.deepEqual(calls.map(c=>c[0]),['getDeferredInclude','static','getDeferredInclude']);
  });
}

ok('early warning reporting terminates and excludes request secrets',()=>{
  const messages=[],attrs={};
  const root={console:{warn:(...args)=>messages.push(args)},document:{documentElement:{setAttribute:(k,v)=>{attrs[k]=v}}}};
  const context={root,window:root};
  vm.runInNewContext(scripts(index)[0],context);
  root.AppRuntime.recordWarning('deferred.fetch',{code:'GAS_UPSTREAM_TIMEOUT',message:'fixture-private-value'},{partial:'Scripts_Page_Dashboard',token:'fixture-private-value'});
  root.__appObserve(new ReferenceError('missingController is not defined'),'deferred.execute');
  assert.equal(messages.length,2,'one report per warning, without recursive calls');
  assert.equal(JSON.parse(attrs['data-app-runtime-warning']).hint,'missingController is not defined');
  assert.ok(!JSON.stringify(messages).includes('fixture-private-value'));
  root.AppRuntime.recordWarning=root.__appObserve;
  root.__appObserve(new Error('DASHBOARD_CONTROLLER_NOT_READY'),'dashboard.runtime.recovery');
  assert.equal(messages.length,3,'observe fallback must also be non-recursive');
});

ok('Meeting canonical adapter is registered with the active lifecycle owner',()=>{
  const source=index.slice(index.indexOf('function ensureCanonicalPageControllerCurrent(id){'),index.indexOf('function pageControllerReadyCurrent(id)'));
  const adapter={__canonicalLifecycle:true,mount(){return true},reload(){return true},dispose(){return true}};
  let active=null,registrations=0;
  const window={AppPages:{get:()=>adapter},AppLifecycle:{getPage:()=>active,registerPage(id,value){assert.equal(id,'meeting');registrations++;return active=value}}};
  const ctx={window,canonicalPageId:id=>id,__appIsFn:v=>typeof v==='function',__appObserve(){}};
  vm.runInNewContext(source,ctx);
  assert.equal(ctx.ensureCanonicalPageControllerCurrent('meeting'),adapter);
  assert.equal(active,adapter,'canonical AppPages adapter must not bypass lifecycle registration');
  ctx.ensureCanonicalPageControllerCurrent('meeting');
  assert.equal(registrations,1,'do not remount or register an active adapter twice');
  active=null;
  ctx.ensureCanonicalPageControllerCurrent('meeting');
  assert.equal(registrations,2,'recover after lifecycle registry replacement');
  window.AppLifecycle.registerPage=()=>null;
  active=null;
  assert.equal(ctx.ensureCanonicalPageControllerCurrent('meeting'),null,'do not report readiness when lifecycle registration fails');
});

ok('Meeting tab changes retain the correct save target without runtime errors',()=>{
  // Execute the entire strict-mode owner so block-scope regressions are observable.
  const source=meetingController.match(/<script id="meeting-page-runtime-owner-p3"[^>]*>([\s\S]*?)<\/script>/)[1];
  const state={},nodes=new Map(),tabs=[],panes=[],warnings=[];
  function node(id){
    const attrs={},classes=new Set();
    return {id,dataset:{},style:{},value:'',textContent:'',
      classList:{add(...xs){xs.forEach(x=>classes.add(x))},remove(...xs){xs.forEach(x=>classes.delete(x))},contains:x=>classes.has(x),toggle(x,on){if(on===undefined)on=!classes.has(x);on?classes.add(x):classes.delete(x);return on}},
      getAttribute:k=>attrs[k]??null,setAttribute(k,v){attrs[k]=String(v)},removeAttribute(k){delete attrs[k]},
      addEventListener(){},querySelectorAll(){return []},appendChild(){}
    };
  }
  for(const name of ['case-data','meeting-history','letter-tracking']){
    const tab=node('tab-'+name),pane=node('content-'+name);
    tab.setAttribute('data-bs-target','#'+pane.id);
    nodes.set(tab.id,tab);nodes.set(pane.id,pane);tabs.push(tab);panes.push(pane);
  }
  nodes.set('meeting-uiux-stability-style',node('meeting-uiux-stability-style'));
  const document={readyState:'loading',documentElement:node('html'),getElementById:id=>nodes.get(id)||null,
    querySelector:s=>s.startsWith('#')?nodes.get(s.slice(1))||null:null,
    querySelectorAll:s=>s==='#meeting-tabs .nav-link'?tabs:s.includes('.tab-pane')?panes:[],
    addEventListener(){},dispatchEvent(){},createElement:node
  };
  const kit={byId:document.getElementById,text:v=>v==null?'':String(v),esc:v=>String(v),storeGet:(k,d)=>state[k]??d,storeSet:(k,v)=>(state[k]=v),
    apiRunner(){throw new Error('tab selection must not write or request unrelated data')},setHtml(){},clearNode(){},createEl:node,createBadge:node
  };
  const window={document,AppRuntimeModules:{requirePageKit:()=>kit},AppStore:{get:kit.storeGet,set:kit.storeSet},isAuthenticated:()=>true};
  vm.runInNewContext(source,{window,document,Promise,setTimeout(){},__appIsFn:x=>typeof x==='function',__appObserve:(err,topic)=>warnings.push({topic,message:err.message})});
  for(const [mode,position] of [['case',0],['history',1],['letter',2],['case',0],['letter',2]]){
    window.meetingSetMode(mode);
    assert.deepEqual(warnings,[],'tab switching must not swallow a missing-helper exception');
    const target='#'+panes[position].id;
    assert.equal(document.documentElement.getAttribute('data-meeting-save-target'),target);
    assert.equal(window.__meetingActiveSaveTarget,target);
    assert.equal(window.__meetingActiveSaveMode,mode);
    assert.equal(state.meeting.mode,mode);
    for(let i=0;i<panes.length;i++){
      assert.equal(panes[i].getAttribute('aria-hidden'),i===position?'false':'true');
      assert.equal(panes[i].style.display,i===position?'':'none');
      assert.equal(tabs[i].getAttribute('aria-selected'),i===position?'true':'false');
    }
  }
  assert.equal(window.meetingRememberSaveTarget_,undefined,'the helper must remain private to the Meeting owner');
});

console.log('# '+passed+' CR-7 regression groups passed');
