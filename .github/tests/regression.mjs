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
const CANONICAL_GAS_WEB_APP_URL='https://script.google.com/macros/s/AKfycbz73ISkoejp_JJOPEC1OfPenrej427rA897CL_-8wsM9oMm1zM-hHUZH3NjYuIfWF-d/exec';
const CANDIDATE_GAS_WEB_APP_URL='https://script.google.com/macros/s/AKfycbwqSbRql8u8qM_HiHcmYLiIVG-tCsqQtZGBNLAor-A0phnsstDm81_tjwnjJENXtZHT/exec';

ok('P0-F repository layout remains Cloud Run source-only',()=>{
  assert.ok(fs.existsSync(path.join(ROOT,'frontend')));
  assert.ok(!fs.existsSync(path.join(ROOT,'github-pages')));
  assert.deepEqual(fs.readdirSync(path.join(ROOT,'frontend')).sort(),['app-config.js','cloud-run-transport.js','index.html','meeting-controller.html']);
});

ok('frontend runtime has no retired GitHub/GAS browser dependency',()=>{
  const all=index+'\n'+config+'\n'+transport+'\n'+meetingController;
  for(const token of ['sapa27.github.io','github-pages','github-gas-transport','APP_GITHUB_CONFIG','GAS_WEB_APP_URL','script.google.com','GAS_PARENT_ORIGIN','.run.app'])assert.ok(!all.includes(token),'retired frontend token: '+token);
});

ok('P0-F frontend identity is canonical and edge-ready',()=>{
  assert.ok(index.includes('CANONICAL CLOUD RUN FRONTEND r331-v62'));
  assert.ok(index.includes('TRANSPORT gas-direct-json-v1'));
  assert.ok(index.includes('"hostMode":"cloud-run"'));
  assert.ok(index.includes('./cloud-run-transport.js?v=r331-v62-cloudrun-cr8-20260918'));
  assert.ok(config.includes('cloud-run-canonical-frontend-r331-v62-p0-f-edge-ready-20260922'));
  assert.ok(config.includes('p0-f-network-access-compatibility-r354'));
  assert.ok(config.includes('SAME_ORIGIN_TRANSPORT:!0'));
  assert.ok(!config.includes('.run.app'));
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

ok('browser transport is same-origin and edge-ready',()=>{
  assert.ok(transport.includes('gas-direct-json-v1'));
  assert.ok(transport.includes('return current||configured'));
  assert.ok(transport.includes('NETWORK_EDGE_UNREACHABLE'));
  assert.ok(transport.includes('diagnoseNetwork'));
  assert.ok(transport.includes('u+"/api/router"'));
  assert.ok(transport.includes('credentials:"omit"'));
  assert.ok(transport.includes('cache:"no-store"'));
  assert.ok(transport.includes('e.requestId=requestId'),'transport errors must carry the gateway request id');
  assert.ok(transport.includes('resultState:"response"'),'transport must record response trace before validating the envelope');
  for(const state of ['bad-json','http-error','contract-error','gas-error','fetch-error'])assert.ok(transport.includes('resultState="'+state+'"')||transport.includes('resultState:"'+state+'"'),'missing failure trace state '+state);
  assert.ok(transport.includes('getLastRpcTrace'),'transport trace getter must remain available');
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
  assert.ok(config.includes('P0-F Network Access Compatibility'));
  assert.ok(config.includes('p0-f-network-access-compatibility-r354'));
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

  store.set('auth.token','');
  store.set('auth.csrfToken','');
  loginCtx.commitLoginSuccessCrit({data:{sessionToken:'fixture-session-token',csrf:'fixture-csrf-session',user:{role:'Admin',name:'Fixture Session'}}});
  assert.equal(store.get('auth.token',''),'fixture-session-token');
  assert.equal(store.get('auth.csrfToken',''),'fixture-csrf-session');

  loginCtx.commitLoginSuccessCrit({token:'fixture-login-token',csrfToken:'fixture-csrf',user:{role:'Admin',name:'Fixture'}});

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
  const baseStart=index.indexOf('function data(p)');
  const baseEnd=index.indexOf('function saveResume',baseStart);
  assert.ok(baseStart>=0&&baseEnd>baseStart,'critical API auth helper block missing');
  apiCtx.saveResume=()=>true;
  apiCtx.__appObserve=()=>false;
  apiCtx.root2.AppSecurity={setSessionTokens(){}};
  apiCtx.root2.AppRouteContract={absorb(){}};
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
  assert.ok(baseBlock.includes('syncAuthPayloadCrit(q,q.__actionTokenIssued===!0)'),'canonical AppStore auth must be applied to every authenticated request');
  assert.ok(index.includes('function deferredRequestPayloadCurrent(name)'));
  assert.ok(index.includes('deferred-auth-handoff-r353'));
  assert.ok(index.includes('DASHBOARD_AUTH_TOKEN_NOT_READY'));
  assert.ok(index.includes('root2.AppApi.call("getDeferredInclude",requestPayload)'));
  assert.ok(gateway.includes('read:+env.GAS_READ_TIMEOUT_MS||75000'));
  assert.ok(config.includes('REQUEST_TIMEOUT_MS:60000'));
  assert.ok(config.includes('apiGetDashboardBundle:70000'));
});

ok('P6 rotated session auth remains stable across sequential and strict writes',async()=>{
  const helperStart=index.indexOf('function data(p)');
  const helperEnd=index.indexOf('function saveResume',helperStart);
  const rtStart=index.indexOf('RT.call=RT.call||function');
  const rtEnd=index.indexOf('root2.__APP_DIRECT_BOOTSTRAP_TRANSPORT_CURRENT__',rtStart);
  const appStart=index.indexOf('Object.assign(appApi,{__criticalApi',rtEnd);
  const appEnd=index.indexOf('),root2.apiCall=root2.apiCall||function',appStart);
  assert.ok(helperStart>=0&&helperEnd>helperStart&&rtStart>=0&&rtEnd>rtStart&&appStart>=0&&appEnd>appStart,'P6 canonical API blocks missing');

  const helperBlock=index.slice(helperStart,helperEnd);
  const rtBlock=index.slice(rtStart,rtEnd);
  const appBlock=index.slice(appStart,appEnd+1);
  assert.ok(helperBlock.includes('nextSessionToken'),'rotated session token aliases missing');
  assert.ok(helperBlock.includes('nextCsrfToken'),'rotated CSRF aliases missing');
  assert.ok(helperBlock.includes('resumeHandle'),'rotated resume handle capture missing');
  assert.ok(helperBlock.includes('syncAuthPayloadCrit'),'canonical auth payload owner missing');
  assert.ok(helperBlock.includes('resetActionAuthCrit'),'strict action-token reset owner missing');
  assert.ok(rtBlock.includes('syncAuthPayloadCrit(q,q.__actionTokenIssued===!0)'),'write middleware must refresh canonical auth before every write');
  assert.ok(appBlock.includes('rotationRetry=/SESSION_TOKEN_ROTATED_RETRY/i'),'rotation must have a distinct bounded retry path');
  assert.ok(appBlock.indexOf('if(rotationRetry&&!pub&&!q.__rotationRetried)')<appBlock.indexOf('if(authFail&&!pub&&!q.__authRecovered'),'rotation retry must occur before session-resume recovery');
  assert.ok(!index.includes('q.token=q.token||txt(store.get("auth.token",""))'),'stale caller token must not win over canonical auth');
  assert.ok(!index.includes('t&&!q.token&&(q.token=t)'),'base transport must not preserve a stale caller token');

  const state={'auth.token':'token-1','auth.csrfToken':'csrf-1'};
  const store={
    get:(k,d)=>Object.prototype.hasOwnProperty.call(state,k)?state[k]:d,
    set:(k,v)=>(state[k]=v,v),
    assign:o=>(Object.assign(state,o),o)
  };
  let resumeCount=0,caseWrites=0,deleteWrites=0,actionIssues=0,savedResume=null;
  const raw=[];
  const root2={
    __authToken:'',__csrfToken:'',
    AppSecurity:{setSessionTokens(token,csrf){if(token)store.set('auth.token',String(token));if(csrf)store.set('auth.csrfToken',String(csrf));return true}},
    AppRouteContract:{absorb(){}},
    AppTransport:{getLastRpcTrace(){return {requestId:'fixture-request-id'}}},
    AppRuntime:{handleAuthExpiry(){}},
    AppSessionResume:{tryResume:async()=>{resumeCount++;return true}},
    isWriteApiMethod:m=>m==='apiSaveCase'||m==='apiDeleteCase',
    requiresStrictActionToken:m=>m==='apiDeleteCase'
  };
  const ctx={
    root2,store,
    txt:v=>v==null?'':String(v),
    ctx:()=>({source:'p6-regression'}),
    __appIsFn:v=>typeof v==='function',
    __appObserve(){},
    saveResume:d=>{savedResume=d;return true},
    Promise,Object,Array,Error,Date,
    RT:{rawRun:async(method,payload)=>{
      const snap=JSON.parse(JSON.stringify(payload||{}));
      raw.push({method,payload:snap});
      const target=method==='apiRouter'?String(payload&&payload.method||''):method;
      const body=method==='apiRouter'&&payload&&payload.payload||payload||{};
      if(target==='apiSaveCase'){
        caseWrites++;
        if(caseWrites===1)return {ok:false,errorCode:'SESSION_TOKEN_ROTATED_RETRY',nextSessionToken:'token-2',nextCsrfToken:'csrf-2'};
        if(caseWrites===2)return {ok:true,data:{saved:true},nextSessionToken:'token-3',nextCsrfToken:'csrf-3',resumeHandle:'resume-3',resumeExpiresAt:'2099-01-01T00:00:00Z'};
        return {ok:true,data:{saved:true}};
      }
      if(target==='apiIssueActionToken'){
        actionIssues++;
        return {ok:true,data:{actionToken:'act-'+actionIssues}};
      }
      if(target==='apiDeleteCase'){
        deleteWrites++;
        if(deleteWrites===1)return {ok:false,errorCode:'SESSION_TOKEN_ROTATED_RETRY',nextSessionToken:'token-4',nextCsrfToken:'csrf-4'};
        return {ok:true,data:{deleted:true},nextSessionToken:'token-5',nextCsrfToken:'csrf-5'};
      }
      return {ok:true,data:{}};
    }}
  };
  vm.runInNewContext(helperBlock,ctx);
  vm.runInNewContext(rtBlock,ctx);
  ctx.appApi={};
  vm.runInNewContext(appBlock,ctx);

  const stale={caseNo:'fixture',token:'stale-token',sessionToken:'stale-session',_token:'stale-private',authToken:'stale-auth',csrfToken:'stale-csrf',csrf:'stale-csrf',_csrf:'stale-csrf'};
  const saved=await ctx.appApi.call('apiSaveCase',stale);
  assert.equal(saved.saved,true);
  const saveCalls=raw.filter(x=>x.method==='apiRouter'&&x.payload.method==='apiSaveCase');
  assert.equal(saveCalls.length,2);
  assert.equal(saveCalls[0].payload.payload.token,'token-1');
  assert.equal(saveCalls[0].payload.payload.sessionToken,'token-1');
  assert.equal(saveCalls[0].payload.payload._token,'token-1');
  assert.equal(saveCalls[0].payload.payload.authToken,'token-1');
  assert.equal(saveCalls[0].payload.payload.csrfToken,'csrf-1');
  assert.equal(saveCalls[1].payload.payload.token,'token-2');
  assert.equal(saveCalls[1].payload.payload.csrfToken,'csrf-2');
  assert.equal(resumeCount,0,'SESSION_TOKEN_ROTATED_RETRY must not invoke session resume');
  assert.equal(store.get('auth.token',''),'token-3');
  assert.equal(store.get('auth.csrfToken',''),'csrf-3');
  assert.equal(savedResume&&savedResume.resumeHandle,'resume-3');

  await ctx.appApi.call('apiSaveCase',{caseNo:'fixture-2',token:'old-token',csrfToken:'old-csrf'});
  const thirdSave=raw.filter(x=>x.method==='apiRouter'&&x.payload.method==='apiSaveCase')[2];
  assert.equal(thirdSave.payload.payload.token,'token-3','next sequential write must use the latest canonical token');
  assert.equal(thirdSave.payload.payload.csrfToken,'csrf-3','next sequential write must use the latest canonical CSRF');

  await ctx.appApi.call('apiDeleteCase',{caseId:'fixture-delete',token:'old-delete-token',csrfToken:'old-delete-csrf'});
  const issueCalls=raw.filter(x=>x.method==='apiRouter'&&x.payload.method==='apiIssueActionToken');
  const deleteCalls=raw.filter(x=>x.method==='apiRouter'&&x.payload.method==='apiDeleteCase');
  assert.equal(issueCalls.length,2,'strict write must issue a new action token after session rotation');
  assert.equal(deleteCalls.length,2);
  assert.equal(issueCalls[0].payload.payload.token,'token-3');
  assert.equal(deleteCalls[0].payload.payload.actionToken,'act-1');
  assert.equal(issueCalls[1].payload.payload.token,'token-4');
  assert.equal(issueCalls[1].payload.payload.csrfToken,'csrf-4');
  assert.equal(deleteCalls[1].payload.payload.token,'token-4');
  assert.equal(deleteCalls[1].payload.payload.actionToken,'act-2');
  assert.equal(deleteCalls[1].payload.payload.csrfToken,'act-2');
  assert.equal(store.get('auth.token',''),'token-5');
  assert.equal(store.get('auth.csrfToken',''),'csrf-5');
  assert.equal(resumeCount,0);
});

ok('P7 read-data pipeline uses the production baseline contract',()=>{
  assert.ok(index.includes('readMethods: Object.freeze(["apiGetDashboardBundle", "apiSearchCasesLite", "apiGetCommitteeMeetingSystem", "apiGetTracking", "apiBudgetGetSummary"])'),'P7 canonical read probe list missing');
  assert.ok(index.includes('function baselinePayload(method)'),'P7 production baseline payload owner missing');
  assert.ok(index.includes('apiGetDashboardBundle: { phase1FirstPaint: false, hotPathMode: "performance-baseline-complete", includeBudgetSummary: true }'),'Dashboard baseline payload drifted');
  assert.ok(index.includes('apiSearchCasesLite: { page: 1, limit: 20, compactReadModel: true, includeMeetingHistory: false }'),'case-search baseline payload drifted');
  assert.ok(index.includes('apiGetCommitteeMeetingSystem: { page: 1, limit: 20 }'),'committee-meeting baseline payload drifted');
  assert.ok(index.includes('apiGetTracking: { page: 1, limit: 20 }'),'tracking baseline payload drifted');
  assert.ok(index.includes('apiBudgetGetSummary: { page: 1, limit: 100, pageSize: 100 }'),'budget-summary baseline payload drifted');
  assert.ok(index.includes('source: "m10-dependency-performance-baseline-r330"'),'P7 baseline source marker missing');
  assert.ok(index.includes('return root.AppApi.call(method, payload, { moduleName: "ProductionMeasurementCurrent", preserveEnvelope: true'),'P7 read probes must use canonical AppApi');
  assert.ok(index.includes('payload.forceFresh = true; payload.noCache = true; payload.bypassCache = true; payload.cacheTtlSeconds = 0'),'cold P7 verification must bypass client/cache layers');
  assert.ok(index.includes('noPayloadLogging: true, noCredentialLogging: true'),'P7 evidence must never log payloads or credentials');
  assert.ok(workflow.includes('### P7 Read Data Pipeline Gate'),'P7 live read gate missing from production workflow');
  assert.ok(workflow.includes('for p7_method in apiGetDashboardBundle apiSearchCasesLite apiGetCommitteeMeetingSystem apiGetTracking apiBudgetGetSummary; do'),'P7 live read method set drifted');
  assert.ok(workflow.includes("source:'github-actions-p7-data-pipeline'"),'P7 live read source marker missing');
  assert.ok(workflow.includes('P7 $p7_method read failed'),'P7 live read gate must fail closed');
  assert.ok(workflow.includes('Public edge → Cloud Run → GAS read contract: PASS'),'P7 deployment summary marker missing');
});

ok('gateway is direct-only and contains no legacy GitHub RPC',()=>{
  new vm.Script(gateway,{filename:'server.js'});
  assert.ok(gateway.includes("REV='cr8.15-p0f-network-gate'"));
  assert.ok(gateway.includes("GAS_RESPONSE_CONTRACT='gas-direct-json-v1'"));
  assert.ok(gateway.includes("ANTI_RESPONSE_CONTRACT='anti-public-json-v1'"));
  assert.ok(gateway.includes("transport:'gas-direct-json'"));
  assert.ok(gateway.includes('validateGasEnvelope'));
  assert.ok(gateway.includes('out.envelope'));
  assert.ok(!gateway.includes('return{ok:true,result:value'));
  assert.ok(gateway.includes("gasTransport:'direct-json-primary'"));
  assert.ok(gateway.includes("u.pathname==='/network-health'"));
  assert.ok(gateway.includes('UPSTREAM_HEALTH_TIMEOUT_MS=30000'),'GAS health probe must use the 30s session-check budget');
  assert.ok(gateway.includes("directRpc('apiSessionCheck',{},UPSTREAM_HEALTH_TIMEOUT_MS,c)"),'upstream health must use the bounded health timeout constant');
  assert.ok(!gateway.includes("directRpc('apiSessionCheck',{},10000,c)"),'retired 10s GAS health timeout must not return');
  assert.ok(gateway.includes("gate:'P0-F'"));
  assert.ok(gateway.includes("sameOriginBrowser:true"));
  assert.ok(gateway.includes('PUBLIC_APP_ORIGIN'));
  assert.ok(gateway.includes('responseContract:GAS_RESPONSE_CONTRACT'));
  assert.ok(gateway.includes('legacyFallbackEnabled:false'));
  assert.ok(gateway.includes('sourceSha:sourceSha(env)'));
  assert.ok(gateway.includes("sourceSha:sourceSha(env),status:'reachable'"));
  assert.ok(gateway.includes("cloudRun:{service:txt(env.K_SERVICE),revision:txt(env.K_REVISION)}"));
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
  assert.ok(workflow.includes('GAS_CANDIDATE_WEB_APP_URL: '+CANDIDATE_GAS_WEB_APP_URL),'latest GAS candidate must remain recorded until it passes direct JSON');
  assert.ok(workflow.includes('Require direct GAS transport on canary'));
  assert.ok(workflow.includes('Promote CR-8 GAS-canonical to production'));
  assert.ok(workflow.includes('Remove CR-8 canary'));
  assert.ok(workflow.includes("grep -q 'p0-f-edge-ready-20260922'"));
  assert.ok(workflow.includes("grep -q 'p0-f-network-access-compatibility-r354'"));
  assert.ok(workflow.includes('/network-health'));
  assert.ok(workflow.includes('PUBLIC_APP_ORIGIN'));
  assert.ok(workflow.includes('P0-F-A Network Access Compatibility: PASS'));
  assert.ok(workflow.includes('Resolve P0-F-B1 workers.dev origin'));
  assert.ok(workflow.includes('Deploy P0-F-B1 Cloudflare workers.dev edge'));
  const cleanupStep=workflow.indexOf('Remove retired transport environment variables');
  const productionSmokeStep=workflow.indexOf('Smoke final CR-8 production');
  const edgeDeployStep=workflow.indexOf('Deploy P0-F-B1 Cloudflare workers.dev edge');
  assert.ok(cleanupStep>=0&&productionSmokeStep>cleanupStep&&edgeDeployStep>productionSmokeStep,'production must be mutated before final smoke, and edge deploy must follow the verified revision');
  assert.ok(workflow.includes('CF_WORKER_NAME'));
  assert.ok(workflow.includes('CF_WORKERS_SUBDOMAIN'));
  assert.ok(workflow.includes("vars.CF_WORKERS_SUBDOMAIN || 'anti27'"));
  assert.ok(workflow.includes("vars.CF_WORKER_NAME || 'sapa27'"));
  assert.ok(workflow.includes('Replacing personal workers.dev account subdomain with a neutral value'));
  assert.ok(workflow.includes('Selected neutral workers.dev subdomain'));
  assert.ok(workflow.includes('No neutral workers.dev candidate was available; attempting rollback'));
  assert.ok(workflow.includes("vars.CLOUDFLARE_ACCOUNT_ID || '459f501f62a887961945801d9d27e173'"));
  assert.ok(workflow.includes('preferred_subdomain="${CF_WORKERS_SUBDOMAIN:-anti}"'));
  assert.ok(workflow.includes('candidate_subdomains=("$preferred_subdomain" "anti27" "sapa27-anti" "anti-sapa27")'));
  assert.ok(workflow.includes('auto-generated if omitted'));
  assert.ok(workflow.includes('CLOUDFLARE_ACCOUNT_ID'));
  assert.ok(workflow.includes('CLOUDFLARE_API_TOKEN'));
  assert.ok(workflow.includes('workers/subdomain'));
  assert.ok(workflow.includes('wrangler@4.136.1'));
  assert.ok(workflow.includes('workers_dev:true'));
  assert.ok(workflow.includes('preview_urls:false'));
  assert.ok(workflow.includes('X-Forwarded-Host'));
  assert.ok(workflow.includes('X-Edge-Provider'));
  assert.ok(workflow.includes('cloudflare-workers-dev'));
  assert.ok(workflow.includes('network?.originMode!=="public-edge"'));
  assert.ok(workflow.includes('network?.edge?.provider!=="cloudflare"'));
  assert.ok(workflow.includes('P0-F-B1 Cloudflare Edge'));
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

ok('P2 public edge POST gate is mandatory and authenticated smoke is secret-gated',()=>{
  assert.ok(workflow.includes('E2E_SMOKE_USERNAME: ${{ secrets.E2E_SMOKE_USERNAME }}'),'P2 username must come from GitHub Secrets');
  assert.ok(workflow.includes('E2E_SMOKE_PASSWORD: ${{ secrets.E2E_SMOKE_PASSWORD }}'),'P2 password must come from GitHub Secrets');
  assert.ok(workflow.includes('p2_post_rpc()'),'P2 POST helper missing');
  assert.ok(workflow.includes('p2_post_rpc "direct-session-check"'),'direct apiSessionCheck edge gate missing');
  assert.ok(workflow.includes('p2_post_rpc "nested-router-session-check"'),'nested apiRouter edge gate missing');
  assert.ok(workflow.includes('{"method":"apiSessionCheck","payload":{},"timeoutMs":30000}'),'direct edge payload missing');
  assert.ok(workflow.includes('{"method":"apiRouter","payload":{"method":"apiSessionCheck","payload":{}},"timeoutMs":30000}'),'nested router edge payload missing');
  assert.ok(workflow.includes("get('x-gas-response-contract')!=='gas-direct-json-v1'"),'P2 must verify canonical GAS response contract');
  assert.ok(workflow.includes("get('x-p0f-edge')!=='cloudflare-workers-dev'"),'P2 must verify the public Cloudflare edge');
  assert.ok(workflow.includes('-H "Origin: $edge_origin"'),'P2 POSTs must reproduce the browser Origin contract');
  assert.ok(workflow.includes("get('access-control-allow-origin')!==process.env.P2_EDGE_ORIGIN"),'P2 must verify CORS reflects the public edge origin');
  assert.ok(workflow.includes("get('x-request-id')"),'P2 must capture requestId');
  assert.ok(workflow.includes('test "$http_code" = "200" || { echo "P2 $label POST failed'),'P2 public POST must fail closed');
  assert.ok(workflow.includes("method:'apiLogin'"),'secret-gated apiLogin smoke missing');
  assert.ok(workflow.includes("method:'apiSessionCheck'"),'authenticated apiSessionCheck smoke missing');
  assert.ok(workflow.includes("const session=candidates.find(x=>x.user||x.account||x.role||x.authenticated===true||x.valid===true)"),'authenticated session validity assertion missing');
  assert.ok(workflow.includes('P2 auth smoke: PASS'),'authenticated success log marker missing');
  assert.ok(workflow.includes('P2 auth smoke: NOT CONFIGURED'),'explicit unconfigured auth log marker missing');
  assert.ok(workflow.includes('Authenticated apiLogin → apiSessionCheck: PASS'),'authenticated success summary missing');
  assert.ok(workflow.includes('Authenticated apiLogin → apiSessionCheck: NOT CONFIGURED'),'explicit unconfigured auth state missing');
  assert.ok(!workflow.includes('echo "$E2E_SMOKE_PASSWORD"'),'password must never be echoed');
  assert.ok(!workflow.includes('cat "$auth_dir/login.body.json"'),'login response/token must never be printed');
  const edgeDeploy=workflow.indexOf('Deploy P0-F-B1 Cloudflare workers.dev edge');
  const p2Gate=workflow.indexOf('# P2 mandatory E2E POST gate');
  const edgeConfig=workflow.indexOf('edge_config=""',p2Gate);
  assert.ok(edgeDeploy>=0&&p2Gate>edgeDeploy&&edgeConfig>p2Gate,'P2 POST gate must run inside the public edge verification step');
});

ok('all deployment gates require live GAS upstream',()=>{
  for(const [name,wf] of [['cr7',workflow],['v2-canary',v2CanaryWorkflow],['v2-cloud-canary',v2CloudCanaryWorkflow],['v2-promote',v2PromoteWorkflow]]){
    assert.ok(wf.includes('GAS_WEB_APP_URL: '+CANONICAL_GAS_WEB_APP_URL),name+' points to stale GAS production endpoint');
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
  const integrityStart=meetingController.indexOf('meeting-integrity-tools');
  const integrityBlock=meetingController.slice(integrityStart,integrityStart+1200);
  assert.ok(integrityStart>=0,'Meeting integrity tools runtime missing');
  assert.ok(integrityBlock.includes('auth.user'),'Meeting integrity tools must resolve canonical auth.user');
  assert.ok(integrityBlock.includes('auth.role'),'Meeting integrity tools must resolve canonical auth.role');
  assert.ok(meetingController.includes('window.initMeetingPage'));
  assert.ok(meetingController.includes('AppPages.register("meeting"'));
  assert.ok(meetingController.includes('function meetingAuthReadyCanonical_()'));
  assert.ok(meetingController.includes('auth.status'));
  assert.ok(meetingController.includes('auth.loginOk'));
  assert.ok(meetingController.includes('auth.bootstrapOk'));
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

ok('Meeting integrity tools visibility follows canonical role and late auth hydration',()=>{
  const start=meetingController.indexOf('function meetingCurrentRoleCanonical_()');
  const end=meetingController.indexOf('function bindMeetingIntegrityVisibilityCurrent_()',start);
  assert.ok(start>=0&&end>start,'Meeting integrity role helpers missing');
  const state=Object.create(null);
  let hidden=true;
  const toolsEl={
    classList:{toggle(name,on){if(name==='d-none')hidden=!!on}},
    setAttribute(){}
  };
  const meetingRoot={
    currentUser:null,currentUserRole:'',userRole:'',currentRole:'',
    AppPermissionMatrix:{normalizeRole:v=>String(v||'Viewer')}
  };
  const ctx={
    meetingRoot,
    meetingStoreGet:(k,d)=>Object.prototype.hasOwnProperty.call(state,k)?state[k]:d,
    meetingText:v=>v==null?'':String(v),
    meetingById:id=>id==='meeting-integrity-tools'?toolsEl:null,
    __appIsFn:v=>typeof v==='function',
    __appObserve(){}
  };
  vm.runInNewContext(meetingController.slice(start,end),ctx);

  state['auth.user']={role:'Admin'};
  state['auth.role']='Admin';
  assert.equal(ctx.updateMeetingIntegrityToolsVisibility_(),true);
  assert.equal(hidden,false,'Admin must see Meeting integrity tools');

  state['auth.user']={role:'Staff'};
  state['auth.role']='Staff';
  assert.equal(ctx.updateMeetingIntegrityToolsVisibility_(),false);
  assert.equal(hidden,true,'Staff must not see Admin integrity tools');

  state['auth.user']={role:'Viewer'};
  state['auth.role']='Viewer';
  assert.equal(ctx.updateMeetingIntegrityToolsVisibility_(),false);
  assert.equal(hidden,true,'Viewer must not see Admin integrity tools');

  state['auth.user']=null;
  state['auth.role']='';
  assert.equal(ctx.updateMeetingIntegrityToolsVisibility_(),false);
  assert.equal(hidden,true,'Unknown role must fail closed');

  state['auth.role']='Admin';
  assert.equal(ctx.updateMeetingIntegrityToolsVisibility_(),true);
  assert.equal(hidden,false,'Late Admin role hydration must reveal the tools');
});

ok('Meeting UI never renders raw exception messages',()=>{
  assert.ok(meetingController.includes('function meetingPublicErrorText_(err, fallback)'),'Meeting public error helper missing');
  assert.ok(!meetingController.includes('text: err && err.message ? err.message : String(err || "")'),'Meeting SweetAlert must not render err.message directly');
  assert.ok(!meetingController.includes('meetingText(err && err.message ? err.message : err)'),'Meeting fallback popup must not render err.message directly');
  assert.ok(!meetingController.includes('"ลบประวัติการประชุมไม่สำเร็จ: " +'),'Meeting delete notice must not concatenate exception details');
  assert.ok(!meetingController.includes('msg ? "บันทึกข้อมูลไม่สำเร็จ : " + msg'),'Meeting save notice must not concatenate exception details');
});

ok('P1 sanitizers redact technical detail and retain safe diagnostic ids',()=>{
  const earlyStart=index.indexOf('function publicErrorTextEarly(v)');
  const earlyEnd=index.indexOf('function sanitizeSwalOptions',earlyStart);
  assert.ok(earlyStart>=0&&earlyEnd>earlyStart,'early public error sanitizer source missing');
  const earlyCtx={};
  vm.runInNewContext(index.slice(earlyStart,earlyEnd),earlyCtx);
  assert.equal(earlyCtx.publicErrorTextEarly('TypeError: controller is not a function'),'ระบบไม่สามารถดำเนินการได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง');
  assert.equal(earlyCtx.publicErrorTextEarly('เข้าสู่ระบบไม่สำเร็จ กรุณาตรวจสอบชื่อผู้ใช้และรหัสผ่าน'),'เข้าสู่ระบบไม่สำเร็จ กรุณาตรวจสอบชื่อผู้ใช้และรหัสผ่าน');
  assert.equal(earlyCtx.publicErrorTextEarly('https://internal.example.test/stack'),'ระบบไม่สามารถดำเนินการได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง');

  const diagStart=index.indexOf('RT.errorDiagnostic=RT.errorDiagnostic||function');
  const diagEnd=index.indexOf('RT.publicErrorNotice=',diagStart);
  assert.ok(diagStart>=0&&diagEnd>diagStart,'runtime diagnostic helper source missing');
  const diagCtx={RT:{},txt:v=>v==null?'':String(v)};
  vm.runInNewContext(index.slice(diagStart,diagEnd),diagCtx);
  const good=diagCtx.RT.errorDiagnostic({code:'GAS_DIRECT_FAILED',requestId:'http_abc123456'},'APP_RUNTIME_ERROR');
  assert.equal(good.code,'GAS_DIRECT_FAILED');
  assert.equal(good.requestId,'http_abc123456');
  const unsafe=diagCtx.RT.errorDiagnostic({code:'<script>',requestId:'<script>alert(1)</script>'},'APP_RUNTIME_ERROR');
  assert.equal(unsafe.code,'APP_RUNTIME_ERROR');
  assert.equal(unsafe.requestId,'');

  const errStart=transport.indexOf('function err(m,k,meta)');
  const errEnd=transport.indexOf('function networkErrorCode',errStart);
  assert.ok(errStart>=0&&errEnd>errStart,'transport error metadata helper missing');
  const errCtx={t:v=>v==null?'':String(v),Error};
  vm.runInNewContext(transport.slice(errStart,errEnd),errCtx);
  const transportErr=errCtx.err('GAS failed','GAS_DIRECT_FAILED',{requestId:'http_req123456',httpStatus:502});
  assert.equal(transportErr.code,'GAS_DIRECT_FAILED');
  assert.equal(transportErr.requestId,'http_req123456');
  assert.equal(transportErr.httpStatus,502);
});

ok('production error surfaces are sanitized, visible, and observable',()=>{
  assert.ok(index.includes('function publicErrorTextEarly(v)'),'early public error sanitizer missing');
  assert.ok(index.includes('function sanitizeSwalOptions(input)'),'SweetAlert option sanitizer missing');
  assert.ok(index.includes('function isErrorSwalArgsEarly(args)'),'early SweetAlert error detector missing');
  assert.ok(index.includes('var args = sanitizeSwalArgs(arguments); return ar(args) || originalFire.apply(root.Swal, args);'),'direct Swal.fire must sanitize then render');
  assert.ok(index.includes('root.appSwalFire = function () { installSafeSwalGuard(); return (root.Swal && __appIsFn(root.Swal.fire) ? root.Swal.fire : safeAlertFire).apply(root.Swal || null, arguments); }'),'appSwalFire must delegate to the single guarded sanitizer owner');
  assert.ok(index.includes('RT.errorDiagnostic=RT.errorDiagnostic||function'),'central error diagnostic owner missing');
  assert.ok(index.includes('RT.publicErrorNotice=RT.publicErrorNotice||function'),'public error notice owner missing');
  assert.ok(index.includes('root2.AppTransport&&__appIsFn(root2.AppTransport.getLastRpcTrace)?root2.AppTransport.getLastRpcTrace():null'),'business error path must read the last RPC trace');
  assert.ok(index.includes('rpcTrace&&rpcTrace.requestId&&(e.requestId=txt(rpcTrace.requestId))'),'business error must preserve requestId');
  assert.ok(!index.includes('suppressErrorSwalEarly'),'early SweetAlert suppression must be removed');
  assert.ok(!index.includes('RT.installErrorPopupSuppression'),'runtime popup suppression owner must be removed');
  assert.ok(!index.includes('__APP_ERROR_POPUP_SUPPRESSION_CURRENT__'),'runtime suppression state must be removed');
  assert.ok(!index.includes('app-error-box-suppression-current'),'global fail-closed ERR CSS must be removed');
  assert.ok(!index.includes('__appErrorSuppressed'),'suppressed SweetAlert marker must be removed');
  assert.ok(meetingController.includes('meeting.ui.hiddenErrorDetail'),'Meeting technical detail must remain diagnostic-only');
});

ok('Login failures are visible once, sanitized, and carry safe diagnostics',()=>{
  assert.ok(!index.includes('#login-error-msg,.app-page-load-failure{display:none'),'login error surface must not be hidden');
  assert.ok(index.includes('visibleLoginErr=RT&&__appIsFn(RT.publicErrorNotice)?RT.publicErrorNotice(e,m,"LOGIN_FAILED")'),'apiLogin failure must use the public notice owner');
  assert.ok(index.includes('bootCode=txt(e&&e.code||"DASHBOARD_BOOT_FAILED")'),'dashboard bootstrap must preserve a safe granular error code');
  assert.ok(index.includes('RT.publicErrorNotice(e,bootMsg,bootCode)'),'dashboard boot failure must use the public notice owner with the granular code');
  assert.ok(index.includes('RT.handleError&&RT.handleError(e,"เข้าสู่ระบบสำเร็จ แต่ไม่สามารถเปิดหน้าหลักได้ กรุณาลองใหม่อีกครั้ง",{source:"login.dashboard",code:bootCode})'),'authenticated Dashboard boot failure must render through the central visible error owner');
  assert.ok(index.includes('visibleLoginRecoveryErr=RT&&__appIsFn(RT.publicErrorNotice)?RT.publicErrorNotice(e,m,"LOGIN_RECOVERY_FAILED")'),'login recovery failure must use the public notice owner');
  assert.ok(index.includes('RT.handleError(e,m,{render:!1,source:"login.api",code:"LOGIN_FAILED"})'),'login inline error must log centrally without a duplicate banner');
  assert.ok(index.includes('RT.handleError(e,m,{render:!1,source:"login.recovery",code:"LOGIN_RECOVERY_FAILED"})'),'login recovery inline error must log centrally without a duplicate banner');
  assert.ok(!index.includes('err.textContent=bootMsg'),'raw dashboard boot error must not be shown');
  assert.ok(!index.includes('err.textContent=m,err.style.display="block"'),'raw login exception must not be shown');
});

ok('danger banners and Meeting errors render sanitized messages',()=>{
  const showBannerStart=index.indexOf('RT.showBanner=function(type,msg,ms,meta){');
  const showBannerEnd=index.indexOf('RT.publicErrorMessage=',showBannerStart);
  const showBannerBlock=index.slice(showBannerStart,showBannerEnd);
  assert.ok(showBannerBlock.includes('return banner(type,msg,ms,meta)'),'danger/error banners must route to the visible banner owner');
  assert.ok(!showBannerBlock.includes('ui.errorBanner.suppressed'),'danger banner suppression must be removed');
  const noticeStart=meetingController.indexOf('function oe(t, n) {');
  const noticeEnd=meetingController.indexOf('function se()',noticeStart);
  const noticeBlock=meetingController.slice(noticeStart,noticeEnd);
  assert.ok(noticeBlock.includes('meetingPublicErrorText_(null, rawNotice)'),'Meeting error notice must sanitize before rendering');
  assert.ok(noticeBlock.includes('"meeting.ui.errorNotice"'),'Meeting visible error must remain logged');
  assert.ok(noticeBlock.includes('uiSuppressed: !1'),'Meeting diagnostics must state that the notice is visible');
  assert.ok(noticeBlock.includes('appSwalFire({'),'Meeting error path must retain the standard popup owner');
  assert.ok(!noticeBlock.includes('meeting.ui.errorNotice.suppressed'),'Meeting suppression path must be removed');
  assert.ok(!noticeBlock.includes('return Promise.resolve(!1);'),'Meeting error branch must not exit before rendering');
});

ok('runtime and route failures use one visible sanitized error owner',()=>{
  assert.ok(index.includes('RT.handleError=function(e,m,o){'),'central runtime error handler missing');
  const handleStart=index.indexOf('RT.handleError=function(e,m,o){');
  const handleEnd=index.indexOf('root2.AppUi=',handleStart);
  const handleBlock=index.slice(handleStart,handleEnd);
  assert.ok(handleBlock.includes('"runtime.handleError"'),'runtime error diagnostics must remain logged');
  assert.ok(handleBlock.includes('RT.showBanner("danger"'),'runtime errors must render through the standard banner owner');
  assert.ok(handleBlock.includes('RT.errorDiagnostic(e,o.code)'),'runtime errors must classify safe errorCode/requestId metadata');
  assert.ok(!handleBlock.includes('runtime.handleError.suppressed'),'suppression diagnostic owner must be removed');
  const routeStart=index.indexOf('function showPageActivationFailure(id,error){');
  const routeEnd=index.indexOf('function routeTimeoutPromise',routeStart);
  const routeBlock=index.slice(routeStart,routeEnd);
  assert.ok(routeBlock.includes('window.AppRuntime.handleError(error,"ไม่สามารถเปิดหน้าที่เลือกได้ กรุณาลองใหม่อีกครั้ง"'),'route failure must become visible through the central owner');
  assert.ok(routeBlock.includes('code:"PAGE_ACTIVATION_FAILED"'),'route failure must have a stable public error code');
  assert.ok(routeBlock.includes('uiSuppressed:!1'),'route event must declare visible failure state');
  assert.ok(!routeBlock.includes('route.pageFailure.suppressed'),'route suppression owner must be removed');
});

ok('Meeting adapter retries bounded lifecycle timing races and preserves the root failure',()=>{
  const start=meetingController.indexOf('meetingSurfaceReadyCurrent_ = function ()');
  const end=meetingController.indexOf('w.AppPages.register("meeting", mod)',start);
  assert.ok(start>=0&&end>start,'Meeting resilient mount helper missing');
  const adapterBlock=meetingController.slice(start,end);
  assert.ok(adapterBlock.includes('maxAttempts = 12'),'Meeting mount retry must be bounded');
  assert.ok(adapterBlock.includes('MEETING_INIT_NOT_READY'),'Meeting mount must classify transient init readiness');
  assert.ok(adapterBlock.includes('MEETING_SURFACE_NOT_READY'),'Meeting mount must verify canonical DOM surface');
  assert.ok(adapterBlock.includes('__APP_MEETING_LAST_MOUNT_ERROR__'),'Meeting mount must preserve the root failure');
  assert.ok(adapterBlock.includes('Object.assign({}, o || {}, { force: !0 })'),'Meeting mount must force canonical initialization');
  assert.ok(index.includes('เปิดหน้า meeting ไม่สำเร็จ: '),'router may preserve the Meeting failure internally for diagnostics');
  assert.ok(index.includes('__APP_MEETING_LAST_MOUNT_ERROR__'),'router must retain the Meeting root failure for diagnostics');
  const routeStart=index.indexOf('function showPageActivationFailure(id,error){');
  const routeEnd=index.indexOf('function routeTimeoutPromise',routeStart);
  const routeBlock=index.slice(routeStart,routeEnd);
  assert.ok(!routeBlock.includes('เปิดหน้า meeting ไม่สำเร็จ'),'Meeting root failure must not be rendered in the ERR UI');
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

ok('Committee Meeting qualified fragment falls back to the legacy base asset without bypassing auth',()=>{
  assert.ok(index.includes('function loadCommitteeMeetingPageCurrent(list)'));
  assert.ok(index.includes('page.committeeMeeting.qualifiedFallback'));
  assert.ok(index.includes('COMMITTEE_MEETING_ADAPTER_NOT_REGISTERED'));
  const start=index.indexOf('function committeeMeetingAuthFailureCurrent(err)');
  const end=index.indexOf('function loadPage(p)',start);
  assert.ok(start>=0&&end>start,'Committee Meeting loader helpers missing');
  const block=index.slice(start,end);
  assert.ok(block.includes('safePartial("Scripts_Page_Meeting::meeting-common")'));
  assert.ok(block.includes('safePartial(qualified).then'));
  assert.ok(block.includes('qualifiedLoadedButAdapterMissing'));
  assert.ok(block.includes('COMMITTEE_MEETING_ADAPTER_NOT_REGISTERED_AFTER_QUALIFIED_FRAGMENT'));
  assert.ok(block.includes('function fallbackToBase(reason)'));
  assert.ok(block.includes('return loadPartial(base).then'));
  assert.ok(block.includes('if(committeeMeetingAuthFailureCurrent(reason))throw reason'),'auth errors must fail closed');
  assert.ok(block.indexOf('committeeMeetingAuthFailureCurrent(reason)')<block.indexOf('loadPartial(base)'),'authorization decision must precede fallback');
  assert.ok(block.indexOf('committeeMeetingControllerReadyCurrent()')<block.lastIndexOf('loadPartial(base)'),'qualified success must verify adapter before accepting the fragment');
  assert.ok(index.includes('if(n==="committee-meeting")return loadCommitteeMeetingPageCurrent(list)'));
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
  assert.ok(config.includes('P0-F Network Access Compatibility'));
  assert.ok(config.includes('p0-f-network-access-compatibility-r354'));
  assert.ok(transport.includes('return x.result'),'GAS application envelope must remain transport-owned and unchanged');
});

ok('Dashboard controller and data recovery are bounded after login',()=>{
  assert.ok(index.includes('function dashboardControllerReadyCrit()'));
  assert.ok(index.includes('function dashboardAuthTokenReadyCrit()'));
  assert.ok(!index.includes('function waitDashboardAuthTokenCrit(timeoutMs)'),'Dashboard boot must not poll for a token already committed synchronously');
  assert.ok(!index.includes('waitDashboardAuthTokenCrit(2600)'),'retired 2.6s auth-token race wait must not return');
  assert.ok(index.includes('function recoverDashboardRuntimeCrit(reason)'));
  assert.ok(index.includes('dashboard-runtime-recovery-r345'));
  assert.ok(index.includes('dashboard-data-recovery-p5'));
  assert.ok(index.includes('dashboard.dataRecovery.current'));
  assert.ok(index.includes('dashboard.dataRecovery.criticalFirst'));
  assert.ok(index.includes('inflight:null,generation:0,lastIncompleteAt:0'),'P5 recovery owner must expose one in-flight slot and generation');
  assert.ok(index.includes('if(state.timer||state.inflight||state.attempt>=delays.length)return'),'P5 must reject duplicate queued/in-flight Dashboard reloads');
  assert.ok(index.includes('generation!==state.generation'),'P5 stale recovery work must be ignored after a new bootstrap generation');
  assert.ok(index.includes('recoveryState.reset("login-dashboard-bootstrap")'),'every authenticated Dashboard bootstrap must reset the bounded recovery owner');
  assert.ok(index.includes('__APP_DASHBOARD_COMPLETE_DATA_READY__=!0'),'complete Dashboard data must set the canonical global readiness flag');
  assert.ok(index.includes('dataReadySource:"app:dashboard-load-settled"'),'settled-event owner must publish canonical data readiness state');
  assert.ok(index.includes('DASHBOARD_CONTROLLER_NOT_READY'));
  assert.ok(index.includes('var delays=[0,1200,3500,7000]'));
  assert.ok(index.includes('var state=root2.__APP_DASHBOARD_DATA_RECOVERY_CURRENT__,delays=[1600,4000,9000]'));
  assert.ok(index.includes('state.attempt>=delays.length'));
  assert.ok(index.includes('Object.assign(root2.__APP_DASHBOARD_CRITICAL_FIRST_CURRENT__||{},{stamp:"dashboard-critical-first-r347",controllerLoaded:!0'),'controller recovery must preserve existing Dashboard data readiness state');
  assert.ok(!index.includes('root2.__APP_DASHBOARD_CRITICAL_FIRST_CURRENT__={stamp:"dashboard-critical-first-r347",controllerLoaded:!0'),'controller recovery must not replace the canonical readiness object');
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

ok('P5 Dashboard recovery owner is single-flight and generation bounded',()=>{
  const start=index.indexOf('function installDashboardDataRecoveryCrit()');
  const end=index.indexOf('installDashboardDataRecoveryCrit();',start);
  assert.ok(start>=0&&end>start,'P5 recovery owner missing');
  const block=index.slice(start,end);
  assert.ok(block.includes('state.timer||state.inflight'),'duplicate recovery guard missing');
  assert.ok(block.includes('state.inflight=Promise.resolve(task)'),'recovery promise must have one canonical in-flight owner');
  assert.ok(block.includes('generation=state.generation'),'recovery attempt must capture its bootstrap generation');
  assert.ok(block.includes('if(generation===state.generation)state.inflight=null'),'stale generation must not clear a newer recovery');
  assert.ok(block.includes('root2.__APP_DASHBOARD_COMPLETE_DATA_READY__===!0'),'recovery must stop after complete data readiness');
  assert.ok(block.includes('state.reset=reset'),'recovery reset owner missing');
  assert.ok(!block.includes('if(state.timer)clearTimeout(state.timer);state.timer=setTimeout'),'old rescheduling pattern must not return');
});

ok('P4 login and session resume complete only after Dashboard controller and first complete data settle',async()=>{
  const helperStart=index.indexOf('function createDashboardInitialDataGateCrit(timeoutMs)');
  const end=index.indexOf('function executeLogin(ev)',helperStart);
  assert.ok(helperStart>=0&&end>helperStart,'P4 Dashboard bootstrap contract missing');
  const block=index.slice(helperStart,end);
  assert.ok(block.includes('dashboard-initial-data-gate-p4'),'P4 data gate stamp missing');
  assert.ok(block.includes('app:dashboard-load-settled'),'P4 must wait for the canonical Dashboard settled event');
  assert.ok(block.includes('detail.completeData===!0'),'P4 may not mark readiness for partial Dashboard data');
  assert.ok(block.includes('DASHBOARD_DATA_NOT_READY'),'P4 incomplete Dashboard data must fail closed');
  assert.ok(block.includes('DASHBOARD_ACTIVATION_FAILED'),'P4 route activation failure must fail closed');
  assert.ok(block.includes('__APP_AUTH_RUNTIME_WARMUP_PROMISE__'),'P4 must still await canonical Dashboard runtime warmup');
  assert.ok(block.includes('dashboardState.controllerLoaded!==!0'),'P4 must verify canonical Dashboard controller readiness');
  assert.ok(block.includes('dashboardState.dataReady!==!0'),'P4 must verify canonical Dashboard data readiness');
  assert.ok(block.includes('"auth.dashboardDataReady":!0'),'P4 must commit explicit Dashboard data readiness');
  assert.ok(block.includes('completeData:!0,source:"critical-login-runtime-p4"'),'P4 success event must declare complete data');
  assert.ok(!index.includes('app-login-dashboard-autostart-current'),'duplicate legacy Dashboard autostart owner must be removed');
  assert.ok(!index.includes('w.AppLoginDashboardAutostart'),'duplicate Dashboard bootstrap namespace must be removed');

  const resumeStart=index.indexOf('function tryResume(o)');
  const resumeEnd=index.indexOf('function manifest()',resumeStart);
  const resumeBlock=index.slice(resumeStart,resumeEnd);
  assert.ok(resumeBlock.includes('bootAfterLoginCrit(d.user)'),'session resume must use the same P4 Dashboard bootstrap owner');
  assert.ok(!resumeBlock.includes('boot=RT.bootMainUi(d.user)'),'session resume must not retain a second Dashboard boot path');
  assert.ok(resumeBlock.includes('bootstrapResume=/^(?:startup|critical-ready|vue-bootstrap-resume-current)$/i.test(resumeReason)'),'only startup session resume may enter the Dashboard bootstrap gate');
  assert.ok(resumeBlock.includes('if(!bootstrapResume)return!0'),'API token recovery must restore auth without rerouting to Dashboard');

  const makeStore=()=>{
    const m=new Map([['auth.token','fixture-token'],['auth.user',{role:'Admin',name:'Fixture'}]]);
    return {
      get:(k,d)=>m.has(k)?m.get(k):d,
      set:(k,v)=>{m.set(k,v);return v},
      assign:o=>{Object.entries(o).forEach(([k,v])=>m.set(k,v));return o},
      map:m
    };
  };
  function makeDoc(){
    const listeners=new Map(),events=[];
    return {
      events,
      addEventListener(name,fn){if(!listeners.has(name))listeners.set(name,new Set());listeners.get(name).add(fn)},
      removeEventListener(name,fn){listeners.get(name)?.delete(fn)},
      dispatchEvent(ev){events.push(ev);for(const fn of [...(listeners.get(ev.type)||[])])fn(ev);return true}
    };
  }
  async function runCase(mode){
    const store=makeStore(),attrs={},doc=makeDoc(),root2={__APP_AUTH_RUNTIME_WARMUP_PROMISE__:null,setTimeout,clearTimeout,APP_RUNTIME_CONFIG:{pageActivationTimeoutMs:75000}};
    const CustomEvent=function(name,init){this.type=name;this.detail=init&&init.detail||{}};
    const RT={
      bootMainUi(){
        const controllerReady=mode!=='warmup-fail';
        root2.__APP_DASHBOARD_CRITICAL_FIRST_CURRENT__={controllerLoaded:controllerReady};
        root2.__APP_AUTH_RUNTIME_WARMUP_PROMISE__=Promise.resolve(mode!=='warmup-fail');
        if(mode==='data-ready')setTimeout(()=>doc.dispatchEvent(new CustomEvent('app:dashboard-load-settled',{detail:{completeData:true,current:true,pageId:'dashboard'}})),0);
        if(mode==='activation-fail')setTimeout(()=>doc.dispatchEvent(new CustomEvent('app:page-activation-failed',{detail:{pageId:'dashboard'}})),0);
        return Promise.resolve({ok:true,shellShown:true,warmupPending:true});
      },
      recordWarning(){}
    };
    const ctx={
      root2,store,RT,doc,CustomEvent,
      shell(){},
      updateRoleBadgeCrit(){},
      id:()=>({setAttribute:(k,v)=>{attrs[k]=v}}),
      __appObserve(){return false},
      __appIsFn:v=>typeof v==='function',
      txt:v=>v==null?'':String(v),
      Promise,Date,Error,Object,Number,Math,setTimeout,clearTimeout
    };
    vm.runInNewContext(block,ctx);
    return {ctx,store,attrs,doc,root2};
  }

  const pass=await runCase('data-ready');
  const result=await pass.ctx.bootAfterLoginCrit({role:'Admin',name:'Fixture'});
  assert.equal(result.dashboardReady,true);
  assert.equal(result.dashboardDataReady,true);
  assert.equal(pass.store.get('auth.uiReady',false),true);
  assert.equal(pass.store.get('auth.dashboardReady',false),true);
  assert.equal(pass.store.get('auth.dashboardDataReady',false),true);
  assert.equal(pass.root2.__APP_DASHBOARD_COMPLETE_DATA_READY__,true);
  assert.equal(pass.attrs['data-login-handoff'],'dashboard-ready');
  assert.ok(pass.doc.events.some(e=>e.type==='app:auth-dashboard-ready'&&e.detail.completeData===true));

  const warmupFail=await runCase('warmup-fail');
  await assert.rejects(warmupFail.ctx.bootAfterLoginCrit({role:'Admin',name:'Fixture'}),e=>e.code==='DASHBOARD_BOOT_FAILED');
  assert.equal(warmupFail.store.get('auth.uiReady',true),false);
  assert.equal(warmupFail.store.get('auth.dashboardDataReady',true),false);
  assert.equal(warmupFail.attrs['data-login-handoff'],'dashboard-failed');

  const activationFail=await runCase('activation-fail');
  await assert.rejects(activationFail.ctx.bootAfterLoginCrit({role:'Admin',name:'Fixture'}),e=>e.code==='DASHBOARD_ACTIVATION_FAILED');
  assert.equal(activationFail.store.get('auth.uiReady',true),false);
  assert.equal(activationFail.store.get('auth.dashboardReady',true),false);
  assert.equal(activationFail.store.get('auth.dashboardDataReady',true),false);
});

ok('P3 authenticated edge gate reaches session, Dashboard controller, and Dashboard data',()=>{
  assert.ok(workflow.includes("method:'apiLogin'"),'P3 must start from authenticated login');
  assert.ok(workflow.includes("method:'apiSessionCheck'"),'P3 session verification missing');
  assert.ok(workflow.includes("method:'getDeferredInclude'"),'P3 authenticated Dashboard controller fetch missing');
  assert.ok(workflow.includes("name:'Scripts_Page_Dashboard'"),'P3 must fetch the canonical Dashboard controller');
  assert.ok(workflow.includes("method:'apiGetDashboardBundle'"),'P3 authenticated Dashboard data fetch missing');
  assert.ok(workflow.includes("P3 login/session/Dashboard contract: PASS"),'P3 success marker missing');
  assert.ok(workflow.includes("P3 login/session/Dashboard contract: NOT CONFIGURED"),'P3 unconfigured marker missing');
  assert.ok(workflow.includes("Scripts_Page_Dashboard authenticated controller fetch: PASS"),'P3 controller summary missing');
  assert.ok(workflow.includes("apiGetDashboardBundle authenticated data fetch: PASS"),'P3 data summary missing');
  assert.ok(workflow.includes("P3 Dashboard controller fetch failed"),'P3 controller gate must fail closed');
  assert.ok(workflow.includes("P3 Dashboard data fetch failed"),'P3 data gate must fail closed');
  assert.ok(workflow.includes("access-control-allow-origin"),'P3 authenticated calls must retain CORS verification');
  assert.ok(!workflow.includes('echo "$E2E_SMOKE_USERNAME"'),'P3 username must not be echoed');
  assert.ok(!workflow.includes('echo "$E2E_SMOKE_PASSWORD"'),'P3 password must not be echoed');
  assert.ok(!workflow.includes('cat "$auth_dir/dashboard-data.body.json"'),'P3 Dashboard response body must not be logged');
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
    location:{origin:'https://app.example.test'},
    APP_RUNTIME_CONFIG:{CLOUD_RUN_GATEWAY_URL:'https://should-not-be-used.run.app/'},
    setTimeout,clearTimeout,
    fetch:async(url,options={})=>{
      if(String(url).endsWith('/network-health'))return {ok:true,status:200,json:async()=>({ok:true,status:'reachable',network:{gate:'P0-F',sameOriginBrowser:true},upstream:{checked:false}})};
      calls.push({url,body:JSON.parse(options.body)});
      return {ok:true,headers:{get:()=> 'gas-direct-json-v1'},text:async()=>JSON.stringify({transportOk:true,result:{ok:true,data:{html:'<script>/* fixture */</script>'}}})};
    }
  };
  vm.runInNewContext(transport,{window:w,document:{dispatchEvent(){}},CustomEvent:function(){},Promise,Date});
  await w.AppTransport.run('apiRouter',{method:'getDeferredInclude',payload:{name:'Scripts_Page_Dashboard',token:'fixture-only'}});
  ok('wrapped deferred assets stay on the current public origin',()=>{
    assert.equal(calls[0].url,'https://app.example.test/api/router');
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
  const net=await w.AppTransport.diagnoseNetwork();
  ok('P0-F browser diagnostics use same-origin network-health',()=>{
    assert.equal(w.AppTransport.networkAccessGate,'P0-F');
    assert.equal(net.ok,true);
    assert.equal(net.network.gate,'P0-F');
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
