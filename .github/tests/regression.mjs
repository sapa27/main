#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT=process.cwd();
let passed=0;
function file(p){const x=path.join(ROOT,p);assert.ok(fs.existsSync(x),'missing file: '+p);return fs.readFileSync(x,'utf8')}
function ok(name,fn){try{fn();passed++;console.log('ok '+passed+' - '+name)}catch(e){console.error('not ok - '+name);throw e}}
async function okAsync(name,fn){try{await fn();passed++;console.log('ok '+passed+' - '+name)}catch(e){console.error('not ok - '+name);throw e}}
function scripts(html){const out=[];for(const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)){const a=m[1]||'',type=(a.match(/\btype=["']([^"']+)["']/i)||[])[1]||'';if(/\bsrc\s*=/.test(a)||type&&!/(?:javascript|ecmascript|module)/i.test(type))continue;const b=(m[2]||'').replace(/<\?(?:!=|=)?[\s\S]*?\?>/g,'null');if(b.trim())out.push(b)}return out}

const index=file('frontend/index.html');
const config=file('frontend/app-config.js');
const transport=file('frontend/cloud-run-transport.js');
const meetingController=file('frontend/meeting-controller.html');
const gateway=file('cloud-run-gateway/server.js');
const workflow=file('.github/workflows/cloud-run-gateway.yml');
const CANONICAL_GAS_ENV_REF='GAS_WEB_APP_URL: ${{ vars.GAS_WEB_APP_URL }}';
const CANDIDATE_GAS_ENV_REF='GAS_CANDIDATE_WEB_APP_URL: ${{ vars.GAS_WEB_APP_URL }}';
const ANTI_GAS_ENV_REF='ANTI_GAS_WEB_APP_URL: ${{ vars.ANTI_GAS_WEB_APP_URL }}';
const CLOUDFLARE_ACCOUNT_ENV_REF='CLOUDFLARE_ACCOUNT_ID: ${{ vars.CLOUDFLARE_ACCOUNT_ID }}';

ok('P0-F repository layout remains Cloud Run source-only',()=>{
  assert.ok(fs.existsSync(path.join(ROOT,'frontend')));
  assert.ok(!fs.existsSync(path.join(ROOT,'github-pages')));
  assert.deepEqual(fs.readdirSync(path.join(ROOT,'frontend')).sort(),['app-config.js','cloud-run-transport.js','index.html','meeting-controller.html','static-partials','static-partials-manifest.json']);
  assert.ok(fs.statSync(path.join(ROOT,'frontend','static-partials')).isDirectory());
  assert.ok(fs.existsSync(path.join(ROOT,'frontend','static-partials','Scripts_Core_Runtime.html')));
  assert.ok(fs.existsSync(path.join(ROOT,'frontend','static-partials','Scripts_Page_Dashboard.html')));
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

ok('Search Track Report deferred chunks include their explicit page owners',()=>{
  assert.ok(index.includes('"Scripts_Page_Search":"Viewer"'),'Search deferred owner role missing');
  assert.ok(index.includes('"Scripts_Page_Tracking":"Staff"'),'Tracking deferred owner role missing');
  assert.ok(index.includes('"Scripts_Page_Report":"Staff"'),'Report deferred owner role missing');
  assert.ok(index.includes('"search":["bundle:runtimeDateTable","Runtime_05_Status_Aging","Scripts_Page_ReportTrack::reporttrack-common","Scripts_Page_Search"]'),'Search chunk must load shared implementation then Search owner');
  assert.ok(index.includes('"track":["bundle:runtimeDateTable","Runtime_05_Status_Aging","Scripts_Page_ReportTrack::reporttrack-common","Scripts_Page_Tracking"]'),'Tracking chunk must load shared implementation then Tracking owner');
  assert.ok(index.includes('"report":["bundle:runtimeDateTable","Runtime_05_Status_Aging","Scripts_Page_ReportTrack::reporttrack-common","Scripts_Page_Report"]'),'Report chunk must load shared implementation then Report owner');
  assert.ok(index.includes('filterTrack:"track"'),'Tracking filter must remain page-owned by track');
  assert.ok(index.includes('loadReportData:"report"'),'Report load must remain page-owned by report');
  assert.ok(index.includes('searchAll:"search"'),'Search action must remain page-owned by search');
});

ok('R355 page controller cache rehydrates every routed controller',()=>{
  assert.ok(index.includes('function invalidatePageControllerCurrent(id)'),'generic routed-controller invalidation owner missing');
  assert.ok(index.includes('var controllerRequired=id!=="login",controllerReady=!controllerRequired||pageControllerReadyCurrent(id)'),'route cache must verify controller readiness for every page');
  assert.ok(index.includes('invalidatePageControllerCurrent(id)'),'stale prepared routes must invalidate their page controller assets');
});

await okAsync('P0 route preparation rehydrates every missing canonical page adapter before activation',async()=>{
  assert.ok(index.includes('function recoverPageControllerCurrent(id)'),'generic controller rehydrate owner missing');
  const prepStart=index.indexOf('function prepareRouteAssetsCurrent(target)');
  const prepEnd=index.indexOf('function disposeActivePageForLoginCurrent',prepStart);
  assert.ok(prepStart>=0&&prepEnd>prepStart,'route preparation source boundary missing');
  const prep=index.slice(prepStart,prepEnd);
  assert.ok(prep.includes('if(pageControllerReadyCurrent(id))return!0;'),'route preparation must accept only a registered canonical controller');
  assert.ok(prep.includes('return recoverPageControllerCurrent(id).then(function(recovered)'),'route preparation must own bounded controller rehydration');
  assert.ok(prep.includes('if(!recovered)throw new Error("ไม่พบ canonical page adapter หลังโหลดตัวควบคุม: "+id)'),'missing adapter must fail closed after the single recovery attempt');
  assert.ok(!prep.includes('(id==="meeting"||id==="committee-meeting")&&!pageControllerReadyCurrent(id)'),'controller verification must no longer be Meeting-only');

  const start=index.indexOf('function recoverPageControllerCurrent(id)');
  const end=index.indexOf('function pageScriptList(id)',start);
  assert.ok(start>=0&&end>start,'controller recovery helper source boundary missing');
  const source=index.slice(start,end);
  let ready=false,invalidations=0,loads=0;
  const ctx={
    Promise,
    canonicalPageId:v=>String(v||''),
    pageControllerReadyCurrent:()=>ready,
    invalidatePageControllerCurrent:()=>{invalidations++;return true},
    loadPageScriptsDirect:()=>Promise.resolve(false),
    __appIsFn:v=>typeof v==='function',
    window:{
      AppAssetLoader:{
        loadPageScripts(id){assert.equal(id,'search');loads++;ready=true;return Promise.resolve(true)}
      },
      AppRuntime:{recordWarning(){}}
    }
  };
  vm.runInNewContext(source,ctx);
  const recovered=await ctx.recoverPageControllerCurrent('search');
  assert.equal(recovered,true);
  assert.equal(invalidations,1,'missing adapter must invalidate stale controller cache exactly once');
  assert.equal(loads,1,'missing adapter must re-execute page scripts exactly once');
});

ok('R355 data pages force lifecycle reload after Vue DOM recreation',()=>{
  assert.ok(index.includes('var forceDomReload=/^(track|people|admin|budget)$/.test(id)'),'data-page remount set missing');
  assert.ok(index.includes('force:id==="meeting"||forceDomReload'),'data pages must force lifecycle activation after remount');
  assert.ok(index.includes('reload:id==="meeting"?!1:forceDomReload?!0:void 0'),'Track People Admin Budget must reload data-bound state after DOM recreation');
});

ok('R355 Meeting adapter can re-register after lifecycle registry reset',()=>{
  assert.ok(meetingController.includes('var existingMeetingAdapter ='),'Meeting adapter readiness must inspect the current AppPages registry');
  assert.ok(meetingController.includes('w.__meetingAppPageAdapterReady = 0;'),'stale Meeting ready flag must not block re-registration');
  assert.ok(meetingController.includes('w.AppPages.register("meeting", mod);\n    w.__meetingAppPageAdapterReady = 1;'),'Meeting ready flag must be committed only after registration');
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
  for(const state of ['bad-json','http-error','contract-error','gas-error','fetch-error'])assert.match(transport,new RegExp('resultState\\s*[=:]\\s*"'+state+'"'),'missing failure trace state '+state);
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
  await apiCtx.base('apiGetDashboardBundle',{source:'fixture-r470'});
  ok('login token is committed before authenticated Dashboard data requests',()=>{
    assert.equal(raw[0].method,'apiRouter');
    assert.equal(raw[0].payload.method,'apiGetDashboardBundle');
    assert.equal(raw[0].payload.payload.token,'fixture-login-token');
  });

  ok('Dashboard controller is a same-origin static asset and does not require an auth token',()=>{
    assert.ok(index.includes('"Scripts_Page_Dashboard":"./static-partials/Scripts_Page_Dashboard.html"'));
    assert.ok(!index.includes('root2.AppApi.call("getDeferredInclude"'));
  });
}

ok('auth session bypasses the application router while static assets bypass API transport entirely',()=>{
  assert.ok(index.includes('__APP_DIRECT_BOOTSTRAP_TRANSPORT_CURRENT__="direct-bootstrap-r349"'));
  assert.ok(index.includes('directTransportMethod=/^(apiLogin|apiLogout|apiSessionResume|apiSessionCheck)$/i.test(a)'));
  const baseStart=index.indexOf('function base(m,p,options)');
  const baseEnd=index.indexOf('function saveResume',baseStart);
  assert.ok(baseStart>=0&&baseEnd>baseStart,'critical API base missing');
  const baseBlock=index.slice(baseStart,baseEnd);
  assert.ok(baseBlock.includes('directTransportMethod?RT.rawRun(a,q,options)'));
  assert.ok(baseBlock.includes('RT.rawRun("apiRouter",{method:a,payload:q},options)'));
  assert.ok(baseBlock.includes('syncAuthPayloadCrit(q,q.__actionTokenIssued===!0)'),'canonical AppStore auth must be applied to every authenticated request');
  assert.ok(index.includes('function staticPartialUrlCurrent(name)'));
  assert.ok(index.includes('function fetchStaticPartialCurrent(name,url)'));
  assert.ok(!index.includes('root2.AppApi.call("getDeferredInclude",requestPayload)'));
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
  assert.ok(index.includes('readMethods: Object.freeze(["apiGetDashboardBundle", "apiSearchCasesLite", "apiGetCommitteeMeetingSystem", "apiGetTracking", "apiGetPeoplePageBundle", "apiGetPetitioners", "apiBudgetGetSummary"])'),'P7 canonical read probe list missing');
  assert.ok(index.includes('function baselinePayload(method)'),'P7 production baseline payload owner missing');
  assert.ok(index.includes('apiGetDashboardBundle: { phase1FirstPaint: false, hotPathMode: "performance-baseline-complete", includeBudgetSummary: true }'),'Dashboard baseline payload drifted');
  assert.ok(index.includes('apiSearchCasesLite: { page: 1, limit: 20, compactReadModel: true, includeMeetingHistory: false }'),'case-search baseline payload drifted');
  assert.ok(index.includes('apiGetCommitteeMeetingSystem: { page: 1, limit: 20 }'),'committee-meeting baseline payload drifted');
  assert.ok(index.includes('apiGetTracking: { page: 1, limit: 20 }'),'tracking baseline payload drifted');
  assert.ok(index.includes('apiGetPeoplePageBundle: { page: 1, limit: 100 }'),'people baseline payload drifted');
  assert.ok(index.includes('apiGetPetitioners: { page: 1, limit: 100 }'),'petitioner baseline payload drifted');
  assert.ok(index.includes('apiBudgetGetSummary: { page: 1, limit: 100, pageSize: 100 }'),'budget-summary baseline payload drifted');
  assert.ok(index.includes('source: "m10-dependency-performance-baseline-r330"'),'P7 baseline source marker missing');
  assert.ok(index.includes('return root.AppApi.call(method, payload, { moduleName: "ProductionMeasurementCurrent", preserveEnvelope: true'),'P7 read probes must use canonical AppApi');
  assert.ok(index.includes('payload.forceFresh = true; payload.noCache = true; payload.bypassCache = true; payload.cacheTtlSeconds = 0'),'cold P7 verification must bypass client/cache layers');
  assert.ok(index.includes('noPayloadLogging: true, noCredentialLogging: true'),'P7 evidence must never log payloads or credentials');
  assert.ok(workflow.includes('### P7 Read Data Pipeline Gate'),'P7 live read gate missing from production workflow');
  assert.ok(workflow.includes('for p7_method in apiGetDashboardBundle apiSearchCasesLite apiGetCommitteeMeetingSystem apiGetTracking apiGetPeoplePageBundle apiGetPetitioners apiBudgetGetSummary; do'),'P7 live read method set drifted');
  assert.ok(workflow.includes("source:'github-actions-p7-data-pipeline'"),'P7 live read source marker missing');
  assert.ok(workflow.includes("apiGetPetitioners:{page:1,limit:25}"),'P7 petitioner probe must mirror the production default page size');
  assert.ok(workflow.includes("P7 timing $p7_method HTTP $p7_code"),'P7 live read timing evidence missing');
  assert.ok(workflow.includes("x-gateway-duration-ms:"),'P7 gateway duration evidence missing');
  assert.ok(workflow.includes('P7 $p7_method read failed'),'P7 live read gate must fail closed');
  assert.ok(workflow.includes('Public edge → Cloud Run → GAS read contract: PASS'),'P7 deployment summary marker missing');
});

ok('Case status reason payload keeps rejection, closure, and pending reasons isolated',()=>{  const start=meetingController.indexOf('function Ge()');  const end=meetingController.indexOf('function meetingHistoryCommitteeType()',start);  assert.ok(start>=0&&end>start,'case payload builder missing');  const block=meetingController.slice(start,end);  assert.ok(block.includes('statusValue = normalizeMeetingStatusValue(T("meeting-status"))'),'case payload must normalize status once');  assert.ok(block.includes('"ยุติเรื่อง" === statusValue')&&block.includes('? closedReasonValue'),'closed reason must only belong to ended cases');  assert.ok(block.includes('"ไม่รับเรื่อง" === statusValue')&&block.includes('? rejectionReasonValue'),'rejection reason must only belong to rejected cases');  assert.ok(block.includes('"รอพิจารณา" === statusValue')&&block.includes('? pendingReasonValue'),'pending reason must only belong to pending cases');  assert.ok(block.includes('statusReason: statusReasonValue'),'statusReason must use the status-specific owner');  assert.ok(!block.includes('T("meeting-closedReason") || T("meeting-rejectionReason")'),'hidden stale reasons must never compete in the payload');});ok('Static page loading stays inside the page activation envelope and GAS data retries share one deadline',()=>{  assert.ok(index.includes('fetchStaticPartialCurrent'),'static page loader owner missing');  assert.ok(config.includes('pageScriptLoadTimeoutMs:55000'),'page script activation ceiling must remain bounded');  assert.ok(config.includes('pageActivationTimeoutMs:75000'),'page activation must remain above the page script ceiling');  assert.ok(gateway.includes('const budgetMs=timeout(effectiveMethod(method,payload),want,c);'),'gateway retry budget owner missing');  assert.ok(gateway.includes('const deadline=started+budgetMs;'),'gateway retry deadline owner missing');  assert.ok(gateway.includes('const remainingMs=deadline-Date.now();'),'each GAS data retry must consume the same total deadline');  assert.ok(gateway.includes("if(remainingMs<=0)throw fail('GAS upstream timeout','GAS_UPSTREAM_TIMEOUT',504);"),'retry deadline must fail closed');});ok('P8 write path classification timeout cache and retry contract is consistent',()=>{
  const writeMethods=[
    'apiSaveCase','apiDeleteCase','apiSavePetitioner','apiDeletePetitioner',
    'apiSavePersonnelComm','apiSavePersonnelOp','apiSavePersonnelStaff','apiSavePersonnelSubcommittee',
    'apiDeletePersonnelComm','apiDeletePersonnelOp','apiDeletePersonnelStaff','apiDeletePersonnelSubcommittee',
    'apiSaveCommitteeMeetingSystem','apiDeleteCommitteeMeetingSystem','apiSaveSalarySettings',
    'apiSaveMeetingLog','apiDeleteMeetingLog','apiSaveLetter','apiDeleteLetter','apiCleanupMeetingData',
    'apiBudgetSaveImport','apiBudgetDeleteImport','apiAdminSaveUser','apiAdminDeleteUser',
    'apiAdminSaveSubcommittee','apiAdminDeleteSubcommittee','apiBudgetAdminSaveYearSettingsRows'
  ];
  const declared=(index.match(/root2\.WRITE_API_METHODS=root2\.WRITE_API_METHODS\|\|\{([^}]+)\}/)||[])[1]||'';
  for(const method of writeMethods) assert.ok(declared.includes(method+':!0'),'frontend write registry missing '+method);
  assert.equal((declared.match(/:!0/g)||[]).length,writeMethods.length,'frontend write registry changed without updating the P8 contract');

  const gatewayWrite=/^api(?:(?!Get|List|Search|Check).)*(Save|Delete|Update|Queue|Process|Create|Migrate|Repair|Cleanup|Import)/;
  for(const method of writeMethods) assert.ok(gatewayWrite.test(method),'gateway write classifier would miss '+method);
  assert.ok(gateway.includes("const isWrite=m=>/^api(?:(?!Get|List|Search|Check).)*(Save|Delete|Update|Queue|Process|Create|Migrate|Repair|Cleanup|Import)/.test(txt(m));"),'gateway write classifier drifted');

  assert.ok(config.includes('WRITE_REQUEST_TIMEOUT_MS:120000'),'frontend write timeout must remain 120 seconds');
  assert.ok(gateway.includes('write:+env.GAS_WRITE_TIMEOUT_MS||120000'),'gateway write timeout must remain 120 seconds');
  assert.ok(transport.includes('var write=isWriteMethod(I.method),read=isReadMethod(I.method),key=write?"":cacheKey(I)'),'writes must never enter the read cache key path');
  assert.ok(transport.includes('W=Object.create(null)'),'P8 write single-flight registry missing');
  assert.ok(transport.includes('function writeStableValue(v)'),'P8 stable write fingerprint owner missing');
  assert.ok(transport.includes('function writeInflightKey(I)'),'P8 write fingerprint owner missing');
  assert.ok(transport.includes('skip={token:1,sessionToken:1,authToken:1,_token:1,csrf:1,csrfToken:1,_csrf:1,actionToken:1}'),'P8 write fingerprint must ignore rotating auth/action credentials');
  assert.ok(transport.includes('if(write&&writeKey&&W[writeKey]){emit("app:transport:write-deduped"'),'concurrent duplicate writes must share one in-flight request');
  assert.ok(transport.includes('writeKey&&delete W[writeKey]'),'P8 write single-flight key must be released on settle');
  assert.ok(transport.includes('writeInflight:Object.keys(W).length'),'P8 diagnostics must expose active write count without payload logging');
  assert.ok(transport.includes('dedupeKey=(read?"e"+EPOCH+"|":"")+(key||I.wire+"|"'),'read single-flight keys must be generation scoped after cache invalidation');
  assert.ok(transport.includes('EPOCH++;TTL=Object.create(null);emit("app:transport:cache-invalidated"'),'successful writes must invalidate client read cache without orphaning active requests');
  assert.ok(!transport.includes('EPOCH++;TTL=Object.create(null);F=Object.create(null);emit("app:transport:cache-invalidated"'),'successful writes must not drop in-flight request tracking');
  assert.ok(transport.includes('invalidateClientApiCache=function(){EPOCH++;TTL=Object.create(null);LAST_TRACE=null;return!0}'),'manual cache invalidation must advance generation without orphaning in-flight reads');
  assert.ok(!transport.includes('if(write&&cached)'),'writes must never be served from stale cache');

  const appStart=index.indexOf('Object.assign(appApi,{__criticalApi');
  const appEnd=index.indexOf('),root2.apiCall=root2.apiCall||function',appStart);
  assert.ok(appStart>=0&&appEnd>appStart,'P8 AppApi write/retry owner missing');
  const appBlock=index.slice(appStart,appEnd+1);
  assert.ok(appBlock.includes('rotationRetry=/SESSION_TOKEN_ROTATED_RETRY/i'),'P8 rotation retry path missing');
  assert.ok(appBlock.includes('if(rotationRetry&&!pub&&!q.__rotationRetried)'),'rotation replay must be bounded');
  assert.ok(appBlock.includes('if(authFail&&!pub&&!q.__authRecovered'),'auth recovery replay must be bounded');
  assert.ok(appBlock.includes('throw e}return n.data'),'non-auth write failures must fail closed instead of generic replay');

  const strictMethods=[
    'apiDeleteCase','apiDeletePetitioner','apiDeletePersonnelComm','apiDeletePersonnelOp',
    'apiDeletePersonnelStaff','apiDeletePersonnelSubcommittee','apiDeleteCommitteeMeetingSystem',
    'apiDeleteMeetingLog','apiDeleteLetter','apiCleanupMeetingData','apiBudgetDeleteImport',
    'apiAdminSaveUser','apiAdminDeleteUser','apiAdminSaveSubcommittee','apiAdminDeleteSubcommittee',
    'apiBudgetAdminSaveYearSettingsRows'
  ];
  const strictStart=index.indexOf('root2.requiresStrictActionToken=');
  const strictEnd=index.indexOf('root2.isWriteApiMethod=',strictStart);
  const strictBlock=index.slice(strictStart,strictEnd);
  for(const method of strictMethods){
    const isDelete=/^apiDelete/.test(method)||/^apiDeletePersonnel/.test(method)||method==='apiDeleteCommitteeMeetingSystem'||method==='apiDeleteMeetingLog'||method==='apiDeleteLetter';
    if(!isDelete) assert.ok(strictBlock.includes(method.replace(/^api/,''))||strictBlock.includes('apiAdmin(?:Save|Delete)')||strictBlock.includes('apiBudget(?:Delete|AdminSave)')||strictBlock.includes('apiCleanup'),'strict action-token classifier drifted near '+method);
  }
});

{
  let fetchCalls=0;
  let pendingResolve=null;
  const response=()=>({
    ok:true,
    status:200,
    headers:{get(name){
      name=String(name||'').toLowerCase();
      if(name==='x-gas-response-contract') return 'gas-direct-json-v1';
      if(name==='x-request-id') return 'p8-request-id';
      if(name==='x-gateway-duration-ms') return '3';
      return '';
    }},
    text:async()=>JSON.stringify({transportOk:true,result:{ok:true,data:{saved:true}}})
  });
  const windowFixture={
    APP_RUNTIME_CONFIG:{CLOUD_RUN_ALL_PRIMARY:true,WRITE_REQUEST_TIMEOUT_MS:120000,REQUEST_TIMEOUT_MS:60000},
    APP_CONFIG:{},
    location:{origin:'https://p8.example.test'},
    AbortController,
    setTimeout,
    clearTimeout,
    fetch(){
      fetchCalls++;
      if(pendingResolve!==null) throw new Error('unexpected second pending fetch');
      return new Promise(resolve=>{pendingResolve=()=>{pendingResolve=null;resolve(response())}});
    }
  };
  const documentFixture={dispatchEvent(){}};
  const transportCtx={
    window:windowFixture,document:documentFixture,AbortController,setTimeout,clearTimeout,
    CustomEvent:function(name,init){this.type=name;this.detail=init&&init.detail},
    Promise,Object,Array,JSON,Date,Error,String,Number,RegExp
  };
  vm.runInNewContext(transport,transportCtx,{filename:'cloud-run-transport-p8.js'});

  const first=windowFixture.AppTransport.run('apiSaveCase',{caseNo:'P8-1',title:'same',token:'token-a',csrfToken:'csrf-a'});
  const duplicate=windowFixture.AppTransport.run('apiSaveCase',{title:'same',caseNo:'P8-1',token:'token-b',csrfToken:'csrf-b'});
  assert.equal(fetchCalls,1,'same concurrent business write must issue exactly one POST even when auth tokens differ');
  assert.equal(windowFixture.AppTransport.getClientCacheStats().writeInflight,1);
  pendingResolve();
  const [firstResult,duplicateResult]=await Promise.all([first,duplicate]);
  assert.equal(firstResult.ok,true);
  assert.equal(duplicateResult.ok,true);
  assert.equal(windowFixture.AppTransport.getClientCacheStats().writeInflight,0,'write key must be released after success');

  const again=windowFixture.AppTransport.run('apiSaveCase',{caseNo:'P8-1',title:'same',token:'token-c',csrfToken:'csrf-c'});
  assert.equal(fetchCalls,2,'same write after prior settle must be allowed as a new operation');
  pendingResolve();
  await again;

  const left=windowFixture.AppTransport.run('apiSaveCase',{caseNo:'P8-2',title:'left',token:'token-d'});
  assert.equal(fetchCalls,3);
  const leftResolve=pendingResolve;
  pendingResolve=null;
  const right=windowFixture.AppTransport.run('apiSaveCase',{caseNo:'P8-3',title:'right',token:'token-d'});
  assert.equal(fetchCalls,4,'different concurrent business payloads must never be deduped');
  const rightResolve=pendingResolve;
  pendingResolve=null;
  leftResolve();
  rightResolve();
  await Promise.all([left,right]);

  let deleteResolveA=null;
  windowFixture.fetch=function(){
    fetchCalls++;
    return new Promise(resolve=>{deleteResolveA=()=>resolve(response())});
  };
  const del1=windowFixture.AppTransport.run('apiDeleteCase',{caseId:'P8-delete',actionToken:'action-a',token:'token-a',csrfToken:'csrf-a'});
  const del2=windowFixture.AppTransport.run('apiDeleteCase',{caseId:'P8-delete',actionToken:'action-b',token:'token-b',csrfToken:'csrf-b'});
  assert.equal(fetchCalls,5,'strict delete must dedupe the same concurrent business delete despite rotated action/auth tokens');
  deleteResolveA();
  await Promise.all([del1,del2]);
  assert.equal(windowFixture.AppTransport.getClientCacheStats().writeInflight,0);
  ok('P8 concurrent write single-flight prevents duplicate Save/Delete POSTs without blocking later writes',()=>{});
}

ok('P9 performance measurement and cache owners remain bounded and single-source',()=>{
  assert.equal((index.match(/id="app-production-measurement-gate-current"/g)||[]).length,1,'production measurement owner must be unique');
  assert.equal((index.match(/function runReadBaseline\(/g)||[]).length,1,'read-baseline runner must have one owner');
  assert.equal((index.match(/function baselinePayload\(/g)||[]).length,1,'baseline payload builder must have one owner');
  assert.ok(index.includes('apiLogin: Object.freeze({ cold: 3, warm: 5 })'),'login sample target drifted');
  for(const method of ['apiGetDashboardBundle','apiSearchCasesLite','apiGetCommitteeMeetingSystem','apiGetTracking','apiBudgetGetSummary']){
    assert.ok(index.includes(method+': Object.freeze({ cold: 10, warm: 20 })'),'read sample target drifted for '+method);
  }
  for(const budget of [
    '"login-to-dashboard": 30000','"route-transition": 3000','"route-search": 5000',
    '"case-editor-open": 12000','"route-track": 5000','"logout-to-login": 3000'
  ]) assert.ok(index.includes(budget),'journey budget drifted: '+budget);
  assert.ok(index.includes('minInpSamples: 20, inpP75Ms: 200'),'INP performance budget drifted');
  assert.ok(index.includes('clickToFeedbackP95Ms: 200'),'click-to-feedback budget drifted');
  assert.ok(index.includes('longTaskP95Ms: 200'),'long-task budget drifted');
  assert.ok(index.includes('confirmation !== "RUN_PERFORMANCE_BASELINE"'),'performance baseline must remain explicit and non-automatic');
  assert.ok(index.includes('noPayloadLogging: true, noCredentialLogging: true'),'performance evidence must not log credentials or payloads');

  assert.ok(config.includes('RPC_READ_CACHE_TTL_MS:60000'),'default read cache TTL drifted');
  assert.ok(config.includes('RPC_READ_STALE_TTL_MS:600000'),'stale read TTL drifted');
  assert.ok(config.includes('RPC_READ_CACHE_MAX_ENTRIES:96'),'read cache bound drifted');
  assert.ok(transport.includes('if(dedupeKey&&F[dedupeKey])return F[dedupeKey]'),'read in-flight dedupe owner missing');
  assert.ok(transport.includes('function pruneCache()'),'bounded cache pruning owner missing');
  assert.ok(transport.includes('Math.max(24,Math.min(256,Number(c("RPC_READ_CACHE_MAX_ENTRIES",96))||96))'),'cache size must remain hard bounded');
  assert.ok(transport.includes('meta.clientCache="stale-while-revalidate"'),'stale cache responses must remain explicitly marked');
  assert.ok(transport.includes('EPOCH++'),'write epoch invalidation missing');
});

ok('P10 UI runtime keeps unique DOM ids and canonical interaction owners',()=>{
  const templateMatches=[...index.matchAll(/<script\b[^>]*\bid="(tpl-page-[^"]+)"[^>]*>([\s\S]*?)<\/script\s*>/gi)];
  assert.equal(templateMatches.length,10,'expected exactly ten canonical page templates');
  const expectedTemplates=['dashboard','search','track','report','meeting','committee-meeting','people','petitioner','budget','admin'].map(x=>'tpl-page-'+x).sort();
  assert.deepEqual(templateMatches.map(x=>x[1]).sort(),expectedTemplates);
  for(const match of templateMatches){
    const ids=[...match[2].matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);
    const seen=new Set(),duplicates=[];
    ids.forEach(id=>seen.has(id)?duplicates.push(id):seen.add(id));
    assert.deepEqual(duplicates,[],'duplicate DOM id(s) inside '+match[1]+': '+duplicates.join(','));
  }

  const activeMarkup=index
    .replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi,'')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style\s*>/gi,'');
  const activeIds=[...activeMarkup.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);
  const activeSeen=new Set(),activeDuplicates=[];
  activeIds.forEach(id=>activeSeen.has(id)?activeDuplicates.push(id):activeSeen.add(id));
  assert.deepEqual(activeDuplicates,[],'duplicate id(s) in active document markup: '+activeDuplicates.join(','));

  assert.equal((index.match(/root2\.AppActionHub\.dispatch=function/g)||[]).length,1,'AppActionHub dispatch owner must be unique');
  assert.ok(index.includes('__APP_SINGLE_EVENT_DELEGATION__'),'canonical click delegation owner missing');
  assert.ok(index.includes('__APP_SINGLE_CHANGE_DELEGATION__'),'canonical change delegation owner missing');
  assert.ok(index.includes('data-mobile-nav-owner'),'mobile navigation owner marker missing');
  assert.ok(index.includes('__APP_SIDEBAR_NAV_CLICK_OWNER__'),'mobile/sidebar navigation click owner missing');
  assert.equal((index.match(/root2\.AppUi=root2\.AppUi\|\|/g)||[]).length,1,'critical AppUi facade owner must be unique');
  assert.ok(index.includes('AppPrint.printWithProfile'),'canonical print profile owner missing');
  assert.equal((meetingController.match(/AppPages\.register\("meeting"/g)||[]).length,1,'Meeting page registration owner must be unique');
  assert.equal((meetingController.match(/window\.initMeetingPage/g)||[]).length,1,'Meeting init owner must be unique');
  assert.ok(!index.includes('#login-error-msg,.app-page-load-failure{display:none'),'visible error surfaces must not regress to hidden UI');
  for(const marker of ['__APP_SINGLE_EVENT_DELEGATION__','__APP_SINGLE_CHANGE_DELEGATION__','data-mobile-nav-owner','__APP_SIDEBAR_NAV_CLICK_OWNER__','AppPrint.printWithProfile']){
    assert.ok(workflow.includes("grep -q '"+marker+"' \"$edge_index_tmp\""),'P10 public-edge owner probe missing '+marker);
  }
  assert.ok(workflow.includes('P10 canonical action/mobile/print owners at public edge: PASS'),'P10 deployment summary marker missing');
});

ok('production gate verifies routed Staff page owners from Cloud Run static assets',()=>{
  for(const spec of [
    'track|Scripts_Page_Tracking.html|register("track"',
    'search|Scripts_Page_Search.html|register("search"',
    'report|Scripts_Page_Report.html|register("report"',
    'petitioner|Scripts_Page_Petitioner.html|register("petitioner"',
    'people|Scripts_Page_People.html|register("people"',
    'budget|Scripts_Page_Budget.html|register("budget"'
  ]) assert.ok(workflow.includes(spec),'static page owner probe missing '+spec);
  assert.ok(workflow.includes('$edge_origin/static-partials/$static_asset'),'static page-owner endpoint missing');
  assert.ok(workflow.includes('P3 static $page_owner owner marker missing'),'static page-owner marker gate missing');
  assert.ok(workflow.includes("grep -q '<?!='"),'unresolved GAS-template guard missing');
  assert.ok(workflow.includes('Search / Track / Report / Petitioner / People / Budget static page owners from Cloud Run: PASS'),'page owner production summary marker missing');
});
ok('P11 production deployment quality gate fails closed',()=>{
  for(const name of ['CLOUDFLARE_ACCOUNT_ID','CLOUDFLARE_API_TOKEN','CF_WORKER_NAME','CF_WORKERS_SUBDOMAIN','E2E_SMOKE_USERNAME','E2E_SMOKE_PASSWORD']){
    assert.ok(workflow.includes(name),'required production gate variable missing '+name);
  }
  assert.ok(workflow.includes('Missing required production gate variable: $name'),'deployment prerequisite validation must fail closed');
  assert.ok(workflow.includes('P11 production gate failed: CLOUDFLARE_API_TOKEN is required'),'Cloudflare edge credential must fail closed');
  assert.ok(workflow.includes('P11 production gate failed: E2E_SMOKE_USERNAME is required'),'authenticated username must fail closed');
  assert.ok(workflow.includes('P11 production gate failed: E2E_SMOKE_PASSWORD is required'),'authenticated password must fail closed');
  assert.ok(!workflow.includes('Status: PENDING'),'production edge must never soft-pass as pending');
  assert.ok(!workflow.includes('P2 auth smoke: NOT CONFIGURED'),'authenticated smoke must never soft-pass as not configured');
  assert.ok(!workflow.includes('P3 login/session/Dashboard contract: NOT CONFIGURED'),'Dashboard contract gate must never soft-pass as not configured');
  assert.ok(workflow.includes('pull_request:'),'P11 validation must run on pull requests');
  assert.ok(workflow.includes("(github.event_name == 'workflow_dispatch' && inputs.deploy == true) || (github.event_name == 'push' && contains(github.event.head_commit.message, '[deploy-cloud-run]'))"),'deploy condition must remain restricted to explicit dispatch or deploy-marked push');
  assert.ok(!workflow.includes("github.event_name == 'pull_request' && inputs.deploy"),'pull requests must never enter the deploy path');
  assert.ok(workflow.includes('### P11 Production Deployment Quality Gate'),'P11 production summary missing');
  assert.ok(workflow.includes('Login → session → Dashboard → P7 reads: PASS'),'P11 authenticated chain summary missing');
  assert.ok(workflow.includes('### P8 Live Write/Delete Gate'),'P8 live write/delete production gate missing');
  assert.ok(workflow.includes('for(let i=1;i<=4;i++)'),'P8 must execute four sequential case saves to reproduce the reported 2-3 write failure window');
  assert.ok(workflow.includes("business('apiSaveCase'"),'P8 live apiSaveCase path missing');
  assert.ok(workflow.includes("rpc('apiIssueActionToken'"),'P8 strict delete action-token issuance missing');
  assert.ok(workflow.includes("rpc('apiDeleteCase'"),'P8 live apiDeleteCase path missing');
  assert.ok(workflow.includes("code==='SESSION_TOKEN_ROTATED_RETRY'"),'P8 live write gate must preserve bounded session-rotation retry');
  assert.ok(workflow.includes('Post-delete force-fresh search verification: PASS'),'P8 delete verification summary missing');
  assert.ok(workflow.includes('Logout → Login → Save → Delete cleanup: PASS'),'P8 re-login write regression summary missing');
  assert.ok(workflow.includes('Temporary test records remaining: 0'),'P8 cleanup invariant summary missing');
  const p8NodeMarker="GITHUB_RUN_ATTEMPT=\"$GITHUB_RUN_ATTEMPT\" node <<'NODE'";
  const p8NodeStart=workflow.indexOf(p8NodeMarker);
  assert.ok(p8NodeStart>=0,'P8 live write Node heredoc missing');
  const p8ScriptStart=workflow.indexOf("\n",p8NodeStart)+1;
  const p8ScriptEnd=workflow.indexOf("\n          NODE",p8ScriptStart);
  assert.ok(p8ScriptEnd>p8ScriptStart,'P8 live write Node heredoc terminator missing');
  const p8Script=workflow.slice(p8ScriptStart,p8ScriptEnd).split("\n").map(line=>line.startsWith("          ")?line.slice(10):line).join("\n");
  new vm.Script(p8Script,{filename:'p8-live-write-gate.js'});
  assert.ok(p8Script.includes('(async()=>{'),'P8 live write gate must use an async execution boundary');
  assert.ok(!workflow.includes('console.log(password)'),'P8 write gate must never log password');
  assert.ok(!workflow.includes('console.log(token)'),'P8 write gate must never log session token');
  assert.ok(!workflow.includes('console.log(csrf)'),'P8 write gate must never log CSRF token');
  assert.ok(!workflow.includes('echo "$E2E_SMOKE_PASSWORD"'),'password must never be echoed');
  assert.ok(!workflow.includes('cat "$auth_dir/login.body.json"'),'login response/token must never be printed');
});

ok('P12 production cleanup removes retired browser transport fallback',()=>{
  assert.ok(!index.includes('google.script.run'),'retired browser-to-GAS google.script.run fallback must be removed');
  assert.ok(!index.includes('AppTransport.run=root2.AppTransport.run||'),'critical runtime must not recreate a second AppTransport owner');
  assert.ok(index.includes('APP_CLOUD_RUN_TRANSPORT_REQUIRED'),'missing fail-closed Cloud Run transport ownership guard');
  const transportAsset=index.indexOf('<script src="./cloud-run-transport.js');
  const transportGuard=index.indexOf('APP_CLOUD_RUN_TRANSPORT_REQUIRED');
  assert.ok(transportAsset>=0&&transportGuard>transportAsset,'canonical Cloud Run transport must load before the fail-closed consumer');
  for(const token of ['script.google.com','github-pages','parentOrigin','rpcToken','rpcVersion','installErrorPopupSuppression','suppressVisibleErrorNode','app-login-dashboard-autostart-current']){
    assert.ok(!index.includes(token),'retired production frontend token returned: '+token);
  }
  assert.ok(gateway.includes('legacyFallbackEnabled:false'),'gateway must remain direct-only');
  assert.ok(workflow.includes("grep -q 'APP_CLOUD_RUN_TRANSPORT_REQUIRED' \"$edge_index_tmp\""),'P12 edge transport-owner guard missing');
  assert.ok(workflow.includes("if grep -q 'google.script.run' \"$edge_index_tmp\""),'P12 edge must fail if browser GAS fallback returns');
  assert.ok(workflow.includes('P12 direct-only frontend cleanup at public edge: PASS'),'P12 deployment summary marker missing');
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
  assert.ok(gateway.includes('function upstreamHealth(c)'),'upstream health retry owner missing');
  assert.ok(gateway.includes('GAS_DIRECT_HTTP_404'),'health retry must cover transient GAS 404');
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
  assert.ok(workflow.includes(CANDIDATE_GAS_ENV_REF),'canary must use the same canonical repository-owned GAS endpoint');
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
  assert.ok(workflow.includes(CLOUDFLARE_ACCOUNT_ENV_REF),'Cloudflare account id must be repository-owned configuration');
  assert.ok(workflow.includes('preferred_subdomain="${CF_WORKERS_SUBDOMAIN:-anti}"'));
  assert.ok(workflow.includes('candidate_subdomains=("$preferred_subdomain" "anti27" "sapa27-anti" "anti-sapa27")'));
  assert.ok(workflow.includes('P11 production gate failed: CLOUDFLARE_API_TOKEN is required'),'Cloudflare credentials must be required before production deploy');
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
  assert.ok(workflow.includes(ANTI_GAS_ENV_REF),'Anti GAS endpoint must be repository-owned configuration');
  assert.ok(!workflow.includes('github-pages-rpc'));
  assert.ok(workflow.includes('node .github/tests/regression.mjs --frontend-only'));
});

ok('P2 public edge POST gate and authenticated smoke are mandatory for production',()=>{
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
  assert.ok(workflow.includes("method:'apiLogin'"),'mandatory apiLogin smoke missing');
  assert.ok(workflow.includes("method:'apiSessionCheck'"),'authenticated apiSessionCheck smoke missing');
  assert.ok(workflow.includes("const session=candidates.find(x=>x.user||x.account||x.role||x.authenticated===true||x.valid===true)"),'authenticated session validity assertion missing');
  assert.ok(workflow.includes('P2 auth smoke: PASS'),'authenticated success log marker missing');
  assert.ok(!workflow.includes('P2 auth smoke: NOT CONFIGURED'),'P2 authenticated smoke must not soft-pass when unconfigured');
  assert.ok(workflow.includes('Authenticated apiLogin → apiSessionCheck: PASS'),'authenticated success summary missing');
  assert.ok(!workflow.includes('Authenticated apiLogin → apiSessionCheck: NOT CONFIGURED'),'authenticated P2 chain must not have an unconfigured success state');
  assert.ok(!workflow.includes('echo "$E2E_SMOKE_PASSWORD"'),'password must never be echoed');
  assert.ok(!workflow.includes('cat "$auth_dir/login.body.json"'),'login response/token must never be printed');
  const edgeDeploy=workflow.indexOf('Deploy P0-F-B1 Cloudflare workers.dev edge');
  const p2Gate=workflow.indexOf('# P2 mandatory E2E POST gate');
  const edgeConfig=workflow.indexOf('edge_config=""',p2Gate);
  assert.ok(edgeDeploy>=0&&p2Gate>edgeDeploy&&edgeConfig>p2Gate,'P2 POST gate must run inside the public edge verification step');
});

ok('P0 public edge locks deployed source SHA before later phase gates',()=>{
  assert.ok(workflow.includes('n.sourceSha!==sha'),'Workers network gate must compare runtime source SHA');
  assert.ok(workflow.includes('"$edge_network" "$GITHUB_SHA"'),'Workers network gate must use deployed GitHub SHA');
  assert.ok(workflow.includes('!n.cloudRun?.service||!n.cloudRun?.revision'),'Workers gate must require Cloud Run revision attestation');
  assert.ok(workflow.includes('P0 public edge source SHA attested: $GITHUB_SHA'),'P0 attestation marker missing');
  assert.ok(workflow.includes('Workers → Cloud Run source SHA: $GITHUB_SHA (MATCH)'),'P0 summary source lock missing');
  const sourceGate=workflow.indexOf('P0 public edge source SHA attested: $GITHUB_SHA');
  const p2Gate=workflow.indexOf('# P2 mandatory E2E POST gate');
  const p11Gate=workflow.indexOf('# P11 production gate: authenticated chain is mandatory');
  assert.ok(sourceGate>=0&&p2Gate>sourceGate&&p11Gate>p2Gate,'P0/P2/P11 deployment gate ordering drifted');
});

ok('all deployment gates require live GAS upstream',()=>{
  for(const [name,wf] of [['production',workflow]]){
    assert.ok(wf.includes(CANONICAL_GAS_ENV_REF),name+' must use the repository-owned GAS production endpoint');
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
  assert.ok(fetchBlock.includes('var staticUrl=staticPartialUrlCurrent(n)'),'non-Meeting controllers must also resolve locally');
  assert.ok(!fetchBlock.includes('AppApi.call("getDeferredInclude"'),'page-controller loader must never fall back to GAS');
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

ok('Route activation rehydrates missing canonical adapters before PAGE_ACTIVATION_FAILED',()=>{
  const start=index.indexOf('function runPageActivation(id,generation)');
  const end=index.indexOf('function createStaticPage',start);
  assert.ok(start>=0&&end>start,'runPageActivation source missing');
  const block=index.slice(start,end);
  assert.ok(block.includes('function activateCanonicalPageCurrent()'),'canonical activation helper missing');
  assert.ok(block.includes('if(ensureCanonicalPageControllerCurrent(id))return activateCanonicalPageCurrent()'),'ready adapter must activate directly');
  assert.ok(block.includes('return recoverPageControllerCurrent(id).then(function(recovered)'),'missing canonical adapter must use the existing recovery owner');
  assert.ok(block.includes('if(!recovered||!ensureCanonicalPageControllerCurrent(id))throw new Error("ไม่พบ canonical page adapter: "+id)'),'activation must fail closed after bounded recovery');
  assert.equal((block.match(/recoverPageControllerCurrent\(id\)/g)||[]).length,1,'route must have one controller recovery owner call');
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
  assert.ok(index.includes('reload:id==="meeting"?!1:forceDomReload?!0:void 0'),'Meeting must preserve mount-only recovery while data pages may request a reload');
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
  const staticFetchStart=index.indexOf('function fetchStaticPartialCurrent(name,url)');
  const staticFetchEnd=index.indexOf('function fetchPartialHtml(n)',staticFetchStart);
  const staticFetchBlock=index.slice(staticFetchStart,staticFetchEnd);
  assert.ok(staticFetchBlock.includes('h=patchDashboardControllerContractCurrent(name,h)'),'static Dashboard controller must retain the canonical contract patch before execution');
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

ok('P4 login and session resume complete after Dashboard controller and usable data settle',async()=>{
  const helperStart=index.indexOf('function dashboardOperationalDataReadyCrit(detail)');
  const gateStart=index.indexOf('function createDashboardInitialDataGateCrit(timeoutMs)',helperStart);
  const end=index.indexOf('function executeLogin(ev)',gateStart);
  assert.ok(helperStart>=0&&gateStart>helperStart&&end>gateStart,'P4 Dashboard bootstrap contract missing');
  const block=index.slice(helperStart,end);
  assert.ok(block.includes('dashboard-initial-data-gate-p4'),'P4 data gate stamp missing');
  assert.ok(block.includes('app:dashboard-load-settled'),'P4 must wait for the canonical Dashboard settled event');
  assert.ok(index.includes('function dashboardOperationalDataReadyCrit(detail)'),'P4 operational Dashboard readiness helper missing');
  assert.ok(index.includes('budget-degraded-operational'),'P4 must distinguish optional Budget degradation from fatal Dashboard failure');
  assert.ok(block.includes('__APP_DASHBOARD_OPERATIONAL_DATA_READY__'),'P4 operational Dashboard readiness marker missing');
  assert.ok(block.includes('DASHBOARD_DATA_NOT_READY'),'P4 unusable Dashboard data must still fail closed');
  assert.ok(block.includes('DASHBOARD_ACTIVATION_FAILED'),'P4 route activation failure must fail closed');
  assert.ok(block.includes('__APP_AUTH_RUNTIME_WARMUP_PROMISE__'),'P4 must still await canonical Dashboard runtime warmup');
  assert.ok(block.includes('dashboardState.controllerLoaded!==!0'),'P4 must verify canonical Dashboard controller readiness');
  assert.ok(block.includes('dashboardState.dataReady!==!0'),'P4 must verify canonical Dashboard data readiness');
  assert.ok(block.includes('"auth.dashboardDataReady":!0'),'P4 must commit explicit Dashboard data readiness');
  assert.ok(block.includes('operationalData:root2.__APP_DASHBOARD_OPERATIONAL_DATA_READY__===!0'),'P4 success event must disclose operational readiness');
  assert.ok(block.includes('degraded:root2.__APP_DASHBOARD_COMPLETE_DATA_READY__!==!0'),'P4 success event must preserve degraded-vs-complete state');
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
        if(mode==='budget-degraded'){
          root2.AppDashboard={__state:{data:{summaryStats:{total:5},meta:{dashboardSingleCompletePath:true,completeData:false,budgetWarningCode:'DASHBOARD_BUDGET_READ_FAILED',deferHydrationRequired:false}}}};
          setTimeout(()=>doc.dispatchEvent(new CustomEvent('app:dashboard-load-settled',{detail:{completeData:false,hasData:true,current:true,pageId:'dashboard',singleCompletePath:true,errorCode:''}})),0);
        }
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
  assert.equal(pass.root2.__APP_DASHBOARD_OPERATIONAL_DATA_READY__,true);
  assert.equal(pass.attrs['data-login-handoff'],'dashboard-ready');
  assert.ok(pass.doc.events.some(e=>e.type==='app:auth-dashboard-ready'&&e.detail.completeData===true&&e.detail.operationalData===true));

  const degraded=await runCase('budget-degraded');
  const degradedResult=await degraded.ctx.bootAfterLoginCrit({role:'Admin',name:'Fixture'});
  assert.equal(degradedResult.dashboardReady,true);
  assert.equal(degradedResult.dashboardDataReady,true);
  assert.equal(degradedResult.dashboardDataComplete,false);
  assert.equal(degradedResult.dashboardDataDegraded,true);
  assert.equal(degraded.root2.__APP_DASHBOARD_COMPLETE_DATA_READY__,false);
  assert.equal(degraded.root2.__APP_DASHBOARD_OPERATIONAL_DATA_READY__,true);
  assert.equal(degraded.store.get('auth.uiReady',false),true);
  assert.equal(degraded.attrs['data-login-handoff'],'dashboard-ready');
  assert.ok(degraded.doc.events.some(e=>e.type==='app:auth-dashboard-ready'&&e.detail.completeData===false&&e.detail.operationalData===true&&e.detail.degraded===true));

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
  assert.ok(workflow.includes('static-partials/Scripts_Page_Dashboard.html'),'P0 static Dashboard controller fetch missing');
  assert.ok(workflow.includes('static page owners from Cloud Run: PASS'),'P0 static page-owner gate missing');
  assert.ok(workflow.includes("method:'apiGetDashboardBundle'"),'P3 authenticated Dashboard data fetch missing');
  assert.ok(workflow.includes("P3 login/session/Dashboard contract: PASS"),'P3 success marker missing');
  assert.ok(!workflow.includes("P3 login/session/Dashboard contract: NOT CONFIGURED"),'P3 must fail closed instead of reporting unconfigured');
  assert.ok(workflow.includes("Scripts_Page_Dashboard static Cloud Run controller fetch: PASS"),'P0 static controller summary missing');
  assert.ok(workflow.includes("apiGetDashboardBundle authenticated data fetch: PASS"),'P3 data summary missing');
  assert.ok(workflow.includes("P3 static Dashboard controller fetch failed"),'P0 static controller gate must fail closed');
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

ok('P0/P1 production architecture keeps controllers static and browser data on one API ingress',()=>{
  assert.ok(index.includes('function staticPartialUrlCurrent(name)'));
  assert.ok(index.includes('function fetchStaticPartialCurrent(name,url)'));
  assert.ok(index.includes('"sourceOwner":"cloud-run-static"'));
  assert.ok(!index.includes('root2.AppApi.call("getDeferredInclude"'));
  assert.ok(transport.includes('u+"/api/router"'));
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
  ctx.root2={
    __APP_ASSET_STAMP__:'fixture-r470',
    fetch:async url=>{
      attempts++;
      if(attempts===1)return {ok:false,status:503,text:async()=>''};
      return {ok:true,status:200,text:async()=>'<script>/* recovered static dashboard */</script>'};
    }
  };
  const start=index.indexOf('function deferredHtmlCurrent('),end=index.indexOf('function prefetchPartial(',start);
  vm.runInNewContext(index.slice(start,end),ctx);
  assert.equal(ctx.staticPartialUrlCurrent('Scripts_Page_Dashboard'),'./static-partials/Scripts_Page_Dashboard.html');
  assert.equal(ctx.staticPartialUrlCurrent('Scripts_Page_ReportTrack::reporttrack-common'),'./static-partials/Scripts_Page_ReportTrack__reporttrack-common.html');
  assert.equal(ctx.staticPartialUrlCurrent('not-mapped'),'');
  await assert.rejects(ctx.fetchPartialHtml('Scripts_Page_Dashboard'),e=>e.code==='STATIC_PARTIAL_HTTP_503');
  assert.equal(await ctx.fetchPartialHtml('Scripts_Page_Dashboard'),'<script>/* recovered static dashboard */</script>');
  await assert.rejects(ctx.fetchPartialHtml('not-mapped'),e=>e.code==='STATIC_PARTIAL_NOT_MAPPED');
  ok('P0 static controller failures remain retryable and never fall back to GAS',()=>{
    assert.equal(attempts,2);
    assert.deepEqual(Object.keys(ctx.inflight),[]);
    assert.ok(!index.includes('root2.AppApi.call("getDeferredInclude"'));
    assert.ok(index.includes('"sourceOwner":"cloud-run-static"'));
  });
}
// Keep the real strict-mode closure: extracting helper declarations on their own
// would hide a helper accidentally scoped inside the initialization block.
{
  const calls=[];
  const w={
    __APP_CRITICAL_LOGIN_RUNTIME_READY__:true,
    AppRuntime:{recordWarning(){}},
    fetch:async url=>{
      calls.push(String(url));
      if(String(url).includes('meeting-controller.html'))return {ok:true,status:200,text:async()=>'<script>window.initMeetingPage=function(){};AppPages.register("meeting",{});</script>'};
      return {ok:true,status:200,text:async()=>'<script>/* dashboard static fixture */</script>'};
    },
    document:{documentElement:{setAttribute(){}}}
  };
  const critical=scripts(index).find(s=>s.includes('function fetchPartialHtml(n)'));
  const instrumented=critical.replace('function ns(name,seed)', 'htmlCache={};inflight={};loaded={};doc=root2.document;RT=root2.AppRuntime;store={get:function(k,d){return k==="auth.token"?"fixture-token":d}};root2.scopeTest={fetchPartialHtml:fetchPartialHtml,invalidatePartial:function(n){return invalidatePartial(n)}};function ns(name,seed)');
  vm.runInNewContext(instrumented,{window:w,document:w.document,__appIsFn:v=>typeof v==='function',__appObserve(){}});
  assert.equal(await w.scopeTest.fetchPartialHtml('Scripts_Page_Dashboard'),'<script>/* dashboard static fixture */</script>');
  assert.ok((await w.scopeTest.fetchPartialHtml('Scripts_Page_Meeting::meeting')).includes('window.initMeetingPage'));
  w.scopeTest.invalidatePartial('Scripts_Page_Dashboard');
  await w.scopeTest.fetchPartialHtml('Scripts_Page_Dashboard');
  ok('strict-mode controller loader uses same-origin static assets only',()=>{
    assert.equal(calls.length,3);
    assert.ok(calls[0].includes('/static-partials/Scripts_Page_Dashboard.html'));
    assert.ok(calls[1].includes('/meeting-controller.html'));
    assert.ok(calls[2].includes('/static-partials/Scripts_Page_Dashboard.html'));
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

ok('structured API failures retain their code and message for auth recovery',()=>{
  const ctx={txt:v=>v==null?'':String(v)};
  vm.runInNewContext(index.slice(index.indexOf('function env(r)'),index.indexOf('function applyTok(')),ctx);
  const result=ctx.env({ok:false,error:{code:'SESSION_EXPIRED',message:'Session expired'},requestId:'http_fixture'});
  assert.equal(result.errorCode,'SESSION_EXPIRED');
  assert.equal(result.error,'Session expired');
  assert.equal(result.requestId,'http_fixture');
  assert.equal(ctx.env({ok:false,message:'Login rejected',code:'AUTH_REQUIRED'}).msg,'Login rejected');
  assert.equal(ctx.env({ok:false,error:'Legacy failure',errorCode:'LEGACY_FAILURE'}).error,'Legacy failure');
});

ok('login form events and rebinding cannot unlock an outstanding login',()=>{
  const handlers={};let bindings=0;
  const button={disabled:false,dataset:{},removeAttribute(){},setAttribute(){}};
  const d={addEventListener:(name,fn)=>{handlers[name]=fn},getElementById:()=>button};
  const w={document:d,AppLogin:{init(){bindings++}},AppRuntime:{clearUiBlocks(){}}};
  const ctx={window:w,__appObserve(){}};
  vm.runInNewContext(scripts(index).find(s=>s.includes('__APP_LAL_CurrentStampS__')),ctx);
  w.__APP_LOGIN_IN_FLIGHT__=true;w.__APP_EXPLICIT_LOGIN_ATTEMPT__=true;button.disabled=true;
  const initialBindings=bindings;
  for(const event of ['pointerdown','input','keydown','click','submit'])handlers[event]({target:{id:'login-form',closest:()=>true}});
  assert.equal(w.__APP_LOGIN_IN_FLIGHT__,true);
  assert.equal(button.disabled,true);
  assert.equal(bindings,initialBindings);
  w.__APP_LOGIN_IN_FLIGHT__=false;w.__APP_EXPLICIT_LOGIN_ATTEMPT__=false;w.__APP_LOGGED_OUT_LOCK__=true;
  handlers.click({target:{closest:()=>true}});
  assert.equal(w.__APP_LOGGED_OUT_LOCK__,false,'a completed logout still permits a fresh login');
  assert.equal(button.disabled,false);
  const bindCtx={root2:{__APP_LOGIN_IN_FLIGHT__:true},scrubUrl(){throw new Error('must not reset busy form')}};
  vm.runInNewContext(index.slice(index.indexOf('function bindLogin(){'),index.indexOf('function installCriticalAuthOwnerCurrentStamp()')),bindCtx);
  bindCtx.bindLogin();
});

{
  let clears=0;
  const events=[];
  const w={location:{origin:'https://app.example.test'},AbortController,setTimeout:()=>1,clearTimeout(){clears++},
    fetch:async()=>({ok:true,status:200,headers:{get:()=>null},text:async()=>{throw new DOMException('body aborted','AbortError')}})};
  vm.runInNewContext(transport,{window:w,document:{dispatchEvent:e=>events.push(e)},CustomEvent:function(name,options){this.name=name;this.detail=options.detail},Promise,Date});
  await assert.rejects(w.AppTransport.run('apiSessionCheck',{}),e=>e.code==='CLOUD_RUN_TIMEOUT');
  ok('response body failures settle transport state and release the request timer',()=>{
    assert.equal(clears,1);
    assert.equal(w.AppTransport.getLastRpcTrace().resultState,'fetch-error');
    assert.equal(events.filter(e=>e.name==='app:transport:rpc-settled').length,1);
    assert.equal(w.AppTransport.getClientCacheStats().inflight,0);
  });
  w.fetch=async()=>({ok:false,status:503,headers:{get:()=>null},text:async()=>JSON.stringify({error:{code:'GAS_UPSTREAM_TIMEOUT',message:'upstream timeout'},traceId:'http_fixture'})});
  await assert.rejects(w.AppTransport.run('apiLogin',{}),e=>e.code==='GAS_UPSTREAM_TIMEOUT'&&e.requestId==='http_fixture');
  ok('failed API calls expose only safe correlation metadata',()=>{
    const trace=w.AppTransport.getLastRpcTrace();
    assert.equal(trace.requestId,'http_fixture');
    assert.equal(trace.httpStatus,503);
    assert.equal(trace.errorCode,'GAS_UPSTREAM_TIMEOUT');
    assert.equal('payload' in trace,false);
  });
  for (const status of [502, 504]) {
    let requests = 0;
    w.fetch = async () => {
      requests++;
      return {ok:false,status,headers:{get:()=>null},text:async()=>'<html>private upstream details</html>'};
    };
    await assert.rejects(w.AppTransport.run('apiLogin',{}),e=>
      e.code === 'CLOUD_RUN_HTTP_' + status && e.httpStatus === status &&
      !e.message.includes('private upstream details'));
    ok('HTML gateway ' + status + ' retains HTTP failure without retry or response leakage',()=>{
      const trace = w.AppTransport.getLastRpcTrace();
      assert.equal(trace.resultState,'http-error');
      assert.equal(trace.httpStatus,status);
      assert.equal(trace.errorCode,'CLOUD_RUN_HTTP_' + status);
      assert.equal(requests,1);
      assert.equal(w.AppTransport.getClientCacheStats().inflight,0);
      assert.ok(!JSON.stringify(events).includes('private upstream details'));
    });
  }
  w.fetch = async () => ({ok:true,status:200,headers:{get:()=>null},text:async()=>'<html>invalid success</html>'});
  await assert.rejects(w.AppTransport.run('apiSessionCheck',{}),e=>e.code==='CLOUD_RUN_BAD_JSON');
  ok('successful HTTP responses still require valid JSON',()=>{
    assert.equal(w.AppTransport.getLastRpcTrace().resultState,'bad-json');
  });
  let calls=0;
  w.fetch=async()=>({ok:++calls>1,json:async()=>({ok:calls>1})});
  await assert.rejects(w.AppTransport.health());
  assert.equal(await w.AppTransport.health(),true);
  ok('health recovers after an HTTP failure instead of reusing a rejected promise',()=>assert.equal(calls,2));
}

ok('Meeting failed initialization remains retryable and remount initializes new DOM',()=>{
  const start=meetingController.indexOf('(window.initMeetingPage = function (t) {');
  const end=meetingController.indexOf('    function S(t, n, i)',start);
  const chunk=meetingController.slice(start,end);
  const fn=chunk.slice(chunk.indexOf('function (t)'),chunk.lastIndexOf('}));')+1);
  const page={dataset:{}},document={documentElement:{dataset:{}}};
  const ctx={window:{},document,meetingRoot:{},meetingAuthReadyCanonical_:()=>true,
    meetingSearchEditFastPathSeed_:()=>null,meetingById:id=>id==='p-meeting'?page:null,
    Je:()=>false,H:()=>[],ze:()=>{throw new Error('binding failed')},__appObserve:()=>{}};
  vm.createContext(ctx);vm.runInContext('window.initMeetingPage='+fn+';',ctx);
  assert.throws(()=>ctx.window.initMeetingPage({force:true}),/binding failed/);
  assert.notEqual(page.dataset.meetingPageInitialized,'1');
  assert.notEqual(document.documentElement.dataset.meetingPageInitialized,'1');
  document.documentElement.dataset.meetingPageInitialized='1';
  ctx.ze=()=>{};
  ctx.updateMeetingIntegrityToolsVisibility_=()=>{throw new Error('new DOM initialization reached')};
  assert.throws(()=>ctx.window.initMeetingPage({force:true}),/new DOM initialization reached/);
  assert.notEqual(page.dataset.meetingPageInitialized,'1');
});

ok('Meeting status selection and edit round-trip use canonical option values',()=>{
  const select=index.match(/<select\b[^>]*id="meeting-status"[^>]*>([\s\S]*?)<\/select>/)[1];
  const options=[...select.matchAll(/<option(?:\s+value="([^"]*)")?>([^<]*)<\/option>/g)].map(m=>({value:m[1]??m[2],label:m[2]}));
  const start=meetingController.indexOf('function normalizeMeetingStatusValue(status)');
  const end=meetingController.indexOf('function showMeetingStatusField',start);
  const ctx={meetingText:v=>String(v??'')};
  vm.runInNewContext(meetingController.slice(start,end),ctx);
  for(const option of options){
    const normalized=ctx.normalizeMeetingStatusValue(option.value);
    assert.ok(options.some(o=>o.value===normalized),'selection cleared by normalization: '+option.label);
    assert.equal(normalized,option.value,'option must already use canonical API value');
  }
  for(const saved of ['กมธ.พิจารณา','กมธ. พิจารณา','คณะกรรมาธิการพิจารณา']){
    assert.ok(options.some(o=>o.value===ctx.normalizeMeetingStatusValue(saved)),'edit must select saved committee status');
  }
  assert.equal(options.find(o=>o.value==='กมธ. พิจารณา').label,'กมธ.พิจารณา','preserve displayed label');
});

console.log('# '+passed+' CR-7 regression groups passed');
