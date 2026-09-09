#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT = process.cwd();
const GAS_BACKEND_DIR = path.join(ROOT,'gas-backend');
const requestedModes = process.argv.slice(2).filter(arg=>arg==='--full'||arg==='--frontend-only');
assert.ok(requestedModes.length<=1,'choose exactly one regression mode: --full or --frontend-only');
const MODE = requestedModes[0] ? requestedModes[0].slice(2) : (fs.existsSync(GAS_BACKEND_DIR)?'full':'frontend-only');
for(const arg of process.argv.slice(2))assert.ok(arg==='--full'||arg==='--frontend-only',`unknown regression option: ${arg}`);
const REV = 'r331';
const RPC_REV = 'r330';
const RELEASE = 'commission-v1.2-reliability-loading-cache-session-2026-09-02-r331-v62';
const ASSET = 'asset-manifest-r331-v62-reliability';
const QUALITY = 'current-quality-gate-r330';
const RPC = 'github-pages-rpc-r330';
let passed = 0;

function file(rel){const p=path.join(ROOT,rel);assert.ok(fs.existsSync(p),`missing file: ${rel}`);return fs.readFileSync(p,'utf8');}
function ok(name,fn){try{fn();passed++;console.log(`ok ${passed} - ${name}`)}catch(e){console.error(`not ok - ${name}`);throw e}}
async function okAsync(name,fn){try{await fn();passed++;console.log(`ok ${passed} - ${name}`)}catch(e){console.error(`not ok - ${name}`);throw e}}
function stripNonRevision(text){return text.replace(/(?:sha256|sha384|sha512)-[A-Za-z0-9+/=]+/gi,'<HASH>').replace(/https?:\/\/[^\s\"'<>`]+/gi,'<URL>').replaceAll(RPC,'<RPC_PROTOCOL>')}
function jsSyntax(src,label){new vm.Script(src,{filename:label})}
function htmlScripts(html){const out=[];const re=/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi;let m;while((m=re.exec(html))){const attrs=m[1]||'',type=(attrs.match(/\btype=[\"']([^\"']+)[\"']/i)||[])[1]||'';if(type&&!/(?:javascript|ecmascript|module)/i.test(type))continue;const body=m[2].replace(/<\?(?:!=|=)?[\s\S]*?\?>/g,'null');if(body.trim())out.push(body)}return out}

const index=file('github-pages/index.html');
const config=file('github-pages/app-config.js');
const transport=file('github-pages/github-gas-transport.js');
const workflow=file('.github/workflows/pages.yml');

ok('R331/v62 frontend release converges across public Pages files',()=>{
  for(const [name,text] of [['index',index],['config',config],['transport',transport],['workflow',workflow]])assert.ok(text.toLowerCase().includes(REV),`missing ${REV} in ${name}`);
  assert.ok(index.includes('CANONICAL GITHUB FRONTEND r331-v62; ASSET BUILD r331-v62; GAS RPC PROTOCOL r330'));
  assert.ok(index.includes('sri-required-r330'));
  assert.ok(index.includes('host-pinned-integrity-exempt-r330'));
  assert.ok(config.includes(RELEASE));assert.ok(config.includes(ASSET));assert.ok(config.includes(QUALITY));assert.ok(config.includes(RPC));
  assert.ok(transport.includes('github-gas-transport.js::frontend-r331-v62::rpc-r330'));
});

ok('frontend revision is separated from the stable RPC protocol',()=>{
  const stale=[];
  for(const [name,text] of [['index',index],['config',config],['transport',transport],['workflow',workflow]]){
    for(const token of stripNonRevision(text).match(/r\d{2,3}/gi)||[])if(![REV,RPC_REV].includes(token.toLowerCase()))stale.push(`${name}:${token}`)
  }
  assert.deepEqual(stale,[])
});

ok('GAS endpoint is canonical /exec URL',()=>{
  const m=/GAS_URL=\"([^\"]+)\"/.exec(config);assert.ok(m&&/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(m[1]));
  assert.ok(index.includes('./app-config.js?v=r331-v62-reliability'));
  assert.ok(index.includes('./github-gas-transport.js?v=r331-v62-reliability'))
});

ok('P2 deployment alignment preserves the current production GAS deployment',()=>{
  const current='https://script.google.com/macros/s/AKfycbydxvhw8UPUZhL3GnZ0EFDZGHAXKOsJgkCT_J_LD0wQtoupZ9Dv9HNrhHZZr5cJsjhu/exec';
  const retired='AKfycbzPGoqp2zsH_9kYrcJhtcI0I4GeBjHR1Xv2ptDu507j_fvAbJBoVTWSHF-0SI0e0rLV';
  const m=/GAS_URL=\"([^\"]+)\"/.exec(config);
  assert.equal(m&&m[1],current,'release candidate would switch away from the current production GAS endpoint');
  assert.ok(!config.includes(retired),'retired GAS deployment returned to app-config');
});

ok('SRI integrity preserved',()=>{
  assert.ok(index.includes('sha512-r22gChDnGvBylk90+2e/ycr3RVrDi8DIOkIGNhJlKfuyQM4tIRAI062MaV8sfjQKYVGjOBaZBOA87z+IhZE9DA=='));
  assert.ok(!index.includes('sha512-r330gCh'));
});

ok('RPC transport is fetch-only',()=>{
  assert.ok(transport.includes('w.AppTransport.run=run'));assert.ok(transport.includes('method:"POST",mode:"no-cors"'));
  for(const forbidden of ['MessageChannel','legacyRemote','runGasDirectBridge','runVercelProxy','runJsonpApi','createElement("form")','createElement("iframe")','warmAuthBridge','ensureBridgeClient','RPC_POST_SIGNAL_GRACE'])assert.ok(!transport.includes(forbidden),`retired token: ${forbidden}`)
});

ok('frontend JavaScript syntax',()=>{jsSyntax(config,'app-config.js');jsSyntax(transport,'github-gas-transport.js');htmlScripts(index).forEach((s,i)=>jsSyntax(s,`index.html#${i+1}`))});

ok('workflow gates regression before deployment',()=>{
  assert.ok(workflow.includes('needs: regression'));assert.ok(workflow.includes('actions/checkout@v4'));assert.ok(workflow.includes('actions/configure-pages@v5'));assert.ok(workflow.includes('actions/upload-pages-artifact@v3'));assert.ok(workflow.includes('actions/deploy-pages@v4'));assert.ok(workflow.includes('workflow_dispatch:'));assert.ok(workflow.includes('Run R331/v62 automated regression suite'));
  assert.ok(workflow.includes('if [ -d gas-backend ]; then'));
  assert.ok(workflow.includes('node .github/tests/regression.mjs --full'));
  assert.ok(workflow.includes('node .github/tests/regression.mjs --frontend-only'));
  assert.ok(workflow.includes('async function fetchHealth()'));assert.ok(workflow.includes('attempt <= 3'));assert.ok(workflow.includes('AbortSignal.timeout(45000)'));assert.ok(workflow.includes('Validate deployed Pages release surface'));assert.ok(workflow.includes('PAGES_URL: ${{ steps.deployment.outputs.page_url }}'));assert.ok(workflow.includes('app:route-settled'))
});

ok(`repository layout matches ${MODE} regression mode`,()=>{
  const hasGasBackend=fs.existsSync(GAS_BACKEND_DIR);
  if(MODE==='full')assert.ok(hasGasBackend,'--full regression requires gas-backend source');
  else assert.ok(!hasGasBackend,'--frontend-only regression must not contain gas-backend source');
})


function scriptBlockById(html,id){
  const esc=id.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const m=new RegExp('<script\\b[^>]*\\bid=["\\\']'+esc+'["\\\'][^>]*>[\\s\\S]*?<\\/script\\s*>','i').exec(html);
  return m?m[0]:'';
}
function scriptIds(html){return [...html.matchAll(/<script\b[^>]*\bid=["']([^"']+)["']/gi)].map(m=>m[1]);}

ok('P1-C shared runtime source-of-truth has no GitHub-only compatibility owners',()=>{
  const retired=[
    'app-meeting-status-normalizer-compat-current',
    'github-commissioner-proposer-owner-current',
    'github-ai-duplicate-model-fallback-current',
    'app-meeting-deferred-compat-current',
    'app-session-resume-persist-current',
    'app-session-resume-boot-isolation-current',
    'app-track-filter-fast-dispatch-current'
  ];
  for(const id of retired)assert.ok(!index.includes('id="'+id+'"'),'retired GitHub-only owner returned: '+id);
  if(MODE==='full'){
    const gasIndex=file('gas-backend/Index.html');
    const critical=file('gas-backend/Scripts_Critical_Login_Runtime.html');
    const gasOnly='app-gas-iframe-durable-resume-current';
    const expected=new Set([...scriptIds(gasIndex),...scriptIds(critical).filter(id=>id!==gasOnly)]);
    const actual=new Set(scriptIds(index));
    assert.deepEqual([...actual].sort(),[...expected].sort(),'GitHub script-owner inventory drifted from canonical GAS owners');
    const routeId='app-route-loading-controller-current';
    assert.equal(scriptBlockById(index,routeId),scriptBlockById(gasIndex,routeId),'route-loading owner differs between GAS and GitHub');
    const gasOnlyBlock=scriptBlockById(critical,gasOnly);
    assert.ok(gasOnlyBlock,'canonical GAS-only critical owner missing');
    const criticalProjection=critical.replace(gasOnlyBlock,'').trim();
    assert.ok(index.includes(criticalProjection),'GitHub appCritical projection is stale relative to canonical critical source');
    assert.ok(critical.includes('session.resume.bootMainUi.background'));
    assert.ok(critical.includes('source:"tryResume-canonical-r331"'));
    assert.ok(!critical.includes('waitForMainShellReadyCrit'));
  }
});

ok('P1-D release/build provenance is single-owner and matches canonical backend release',()=>{
  const ctx={};ctx.window=ctx;ctx.globalThis=ctx;
  vm.createContext(ctx);new vm.Script(config,{filename:'app-config.js'}).runInContext(ctx);
  const p=ctx.APP_BUILD_PROVENANCE;
  assert.ok(p&&Object.isFrozen(p),'APP_BUILD_PROVENANCE must be a frozen single owner');
  assert.equal(p.releaseStamp,RELEASE);assert.equal(p.assetStamp,ASSET);assert.equal(p.qualityGate,QUALITY);assert.equal(p.rpcProtocolVersion,RPC);
  assert.equal(p.frontendRevision,'r331-v62');assert.equal(p.sourceFingerprint,'gas-backend-single-source-r331-v62');
  assert.equal(p.buildName,'V1.2 Reliability Loading Cache Session r331 / v62');
  assert.equal(p.hostArtifact,'github-pages-canonical-projection-r331-v62');
  assert.equal(ctx.APP_CONFIG.releaseStamp,p.releaseStamp);assert.equal(ctx.APP_CONFIG.sourceFingerprint,p.sourceFingerprint);assert.equal(ctx.APP_CONFIG.rpcVersion,RPC);
  assert.equal(ctx.APP_DEPLOY_RELEASE.stamp,p.releaseStamp);assert.equal(ctx.APP_DEPLOY_RELEASE.assetStamp,p.assetStamp);assert.equal(ctx.APP_DEPLOY_RELEASE.sourceFingerprint,p.sourceFingerprint);assert.equal(ctx.APP_DEPLOY_RELEASE.rpcVersion,RPC);
  const configTag='<script src="./app-config.js?v=r331-v62-reliability"></script>';
  assert.equal(index.split(configTag).length-1,1,'app-config must load exactly once');
  assert.ok(index.indexOf(configTag)<index.indexOf('window.__APP_BOOTSTRAP__='),'provenance owner must load before bootstrap');
  const bootScript=htmlScripts(index).find(x=>x.includes('window.__APP_BOOTSTRAP__=')&&x.includes('window.__APP_ASSET_MANIFEST__='));
  assert.ok(bootScript,'bootstrap/asset manifest script missing');
  const bootCtx={APP_BUILD_PROVENANCE:p};bootCtx.window=bootCtx;bootCtx.globalThis=bootCtx;
  vm.createContext(bootCtx);new vm.Script(bootScript,{filename:'index.provenance-bootstrap.js'}).runInContext(bootCtx);
  assert.equal(bootCtx.__APP_BOOTSTRAP__.appStamp,p.releaseStamp);
  assert.equal(bootCtx.__APP_BOOTSTRAP__.assetStamp,p.assetStamp);
  assert.equal(bootCtx.__APP_BOOTSTRAP__.sourceFingerprint,p.sourceFingerprint);
  assert.equal(bootCtx.__APP_BOOTSTRAP__.contractStamp,p.qualityGate);
  assert.equal(bootCtx.__APP_BOOTSTRAP__.buildName,p.buildName);
  assert.equal(bootCtx.__APP_BOOTSTRAP__.source,p.hostArtifact);
  assert.equal(bootCtx.__APP_ASSET_MANIFEST__.stamp,p.assetStamp);
  for(const stale of ['github-pages-generated-r330','commission-v1.2-p2a-ci-regression-suite-2026-08-20-r330','asset-manifest-r330-ci-regression-suite','ci-regression-suite-r330','V1.2 P2-A CI Regression Suite r330'])assert.ok(!index.includes(stale),'stale build provenance returned: '+stale);
  if(MODE==='full'){
    const core=file('gas-backend/Code_00_PlatformCore.gs');
    function field(name){const m=new RegExp('\\b'+name+':\\s*"([^"]+)"').exec(core);assert.ok(m,'canonical backend release field missing: '+name);return m[1]}
    assert.equal(p.releaseStamp,field('stamp'));assert.equal(p.assetStamp,field('assetStamp'));assert.equal(p.sourceFingerprint,field('sourceFingerprint'));assert.equal(p.buildName,field('buildName'));assert.equal(p.releaseDate,field('releaseDate'));assert.equal(p.qualityGate,field('contractStamp'));
    const rpcMatch=/APP_GITHUB_RPC_TRANSPORT_CURRENT\s*=\s*Object\.freeze\(\{[\s\S]*?version:\s*"([^"]+)"/.exec(core);assert.ok(rpcMatch,'canonical backend RPC version missing');assert.equal(p.rpcProtocolVersion,rpcMatch[1]);
  }
 });

await okAsync('P1-E stale session-resume results cannot overwrite a newer auth transition',async()=>{
  const source=MODE==='full'?file('gas-backend/Scripts_Critical_Login_Runtime.html'):index;
  const start=source.indexOf('function authEpochCrit()');
  const end=source.indexOf('function manifest()',start);
  assert.ok(start>=0&&end>start,'auth epoch / tryResume source boundary missing');
  const snippet=source.slice(start,end);
  assert.ok(snippet.includes('session.resume.staleIgnored'));
  assert.ok(source.includes('bumpAuthEpochCrit("explicit-login-attempt")'));
  assert.ok(source.includes('root2.__APP_LOGIN_IN_FLIGHT__||root2.__APP_EXPLICIT_LOGIN_ATTEMPT__?Promise.resolve(!1)'));
  let resolveResume=null,commits=[];
  const state={};
  const ctx={
    root2:null,store:{set:(k,v)=>{state[k]=v},get:(k,d)=>Object.prototype.hasOwnProperty.call(state,k)?state[k]:d},
    getResume:()=>({resumeHandle:'resume-old'}),ctx:()=>({}),txt:v=>v==null?'':String(v),__appObserve:()=>false,
    hydrateContractAfterLoginCrit:()=>Promise.resolve(true),
    RT:{setAuthenticatedUser:(user,token)=>{commits.push({user,token});return true},bootMainUi:()=>true,recordWarning:()=>false}
  };
  ctx.root2=ctx;ctx.AppApi={call:()=>new Promise(resolve=>{resolveResume=resolve})};
  vm.runInNewContext(snippet,ctx);
  const pending=ctx.tryResume({reason:'regression-stale-resume'});
  ctx.bumpAuthEpochCrit('explicit-login-attempt');
  ctx.__APP_LOGIN_IN_FLIGHT__=true;
  resolveResume({token:'stale-token',user:{id:'old-user'}});
  assert.equal(await pending,false,'stale resume must resolve false after auth epoch changes');
  assert.equal(commits.length,0,'stale resume must not commit an authenticated user');
  ctx.__APP_LOGIN_IN_FLIGHT__=false;ctx.__APP_EXPLICIT_LOGIN_ATTEMPT__=false;
  ctx.AppApi.call=()=>Promise.resolve({token:'fresh-token',user:{id:'fresh-user'}});
  assert.equal(await ctx.tryResume({reason:'regression-fresh-resume'}),true,'current-epoch resume should still succeed');
  assert.equal(commits.length,1);assert.equal(commits[0].token,'fresh-token');
});

ok('P1-E route operational status requires a mounted canonical lifecycle controller',()=>{
  const start=index.indexOf('function isPageOperational(id)');
  const end=index.indexOf('function showPageActivationFailure',start);
  assert.ok(start>=0&&end>start,'route operational source boundary missing');
  const snippet=index.slice(start,end);
  let adapter=null;
  const ctx={window:{AppLifecycle:{getPage:()=>adapter}},canonicalPageId:v=>String(v||''),pageHasRenderableContent:()=>true,__appIsFn:v=>typeof v==='function',__appObserve:()=>false};
  vm.runInNewContext(snippet,ctx);
  assert.equal(ctx.isPageOperational('meeting'),false,'HTML shell alone must not count as an operational page');
  adapter={__canonicalLifecycle:true,__mounted:false,mount(){},reload(){},dispose(){}};
  assert.equal(ctx.isPageOperational('meeting'),false,'unmounted controller must not count as operational');
  adapter.__mounted=true;
  assert.equal(ctx.isPageOperational('meeting'),true,'mounted canonical controller + DOM should be operational');
  assert.ok(index.includes('disposeActivePageForLoginCurrent("commit-route-login")'),'login route must dispose the active page lifecycle');
  assert.ok(index.includes('window.__APP_ROUTE_ACTIVATION_GENERATION__=generation'),'route generation must be published for request scoping');
  assert.ok(index.includes('"auth.resumePending":!1,"auth.sessionRestored":!1,"auth.reauthRequired":!1'),'forced login must clear transitional auth state');
  assert.ok(index.includes('sessionStorage.removeItem("commission.system.sessionResume.current")'),'fallback logout must clear the actual canonical resume key');
});

ok('P1-E route loading ignores stale request completions from an older generation',()=>{
  const block=scriptBlockById(index,'app-route-loading-controller-current');
  assert.ok(block.includes('r331-v62.2-route-generation-data-ready'));
  const body=block.replace(/^<script\b[^>]*>/i,'').replace(/<\/script\s*>$/i,'');
  const listeners=Object.create(null),loading={hidden:true,setAttribute(){},removeAttribute(){}},host={querySelector:()=>({}),getClientRects:()=>[1]};
  const doc={
    documentElement:{toggleAttribute(){}},
    getElementById(id){return id==='app-page-loading-state'?loading:/^p-(?:dash|dashboard|meeting)$/.test(id)?host:null},
    querySelector(){return null},
    addEventListener(name,fn){(listeners[name]||(listeners[name]=[])).push(fn)}
  };
  const ctx={document:doc,setTimeout,clearTimeout,Date,Object,String,Number,isFinite};ctx.window=ctx;
  vm.runInNewContext(body,ctx);
  function emit(name,detail){for(const fn of listeners[name]||[])fn({type:name,detail:detail||{}})}
  emit('app:page-changing',{to:'dashboard',generation:1});
  emit('app:request:start',{requestId:'old',pageId:'dashboard',routeGeneration:1});
  emit('app:page-changing',{to:'meeting',generation:2});
  emit('app:request:start',{requestId:'current',pageId:'meeting',routeGeneration:2});
  emit('app:request:end',{requestId:'old',pageId:'dashboard',routeGeneration:1});
  assert.equal(ctx.AppPageLoading.status().activeRequests,1,'old request end must not decrement the current route request count');
  emit('app:page-activated',{pageId:'dashboard',generation:1});
  assert.equal(ctx.AppPageLoading.status().activatedGeneration,0,'stale activation must be ignored');
  emit('app:page-activated',{pageId:'meeting',generation:2});
  assert.equal(ctx.AppPageLoading.status().activatedGeneration,2);
  emit('app:request:end',{requestId:'current',pageId:'meeting',routeGeneration:2});
  assert.equal(ctx.AppPageLoading.status().activeRequests,0);
  if(MODE==='full'){
    const lifecycle=file('gas-backend/Runtime_01_Request_Lifecycle.html');
    assert.ok(lifecycle.includes('function routeSnapshot()'));
    assert.ok(lifecycle.includes('pageId: route.pageId, routeGeneration: route.routeGeneration'));
    assert.ok(lifecycle.includes('pageId: entry && entry.pageId || "", routeGeneration: entry && Number(entry.routeGeneration || 0) || 0'));
  }
});


function p2MeasurementHarness(){
  const measurementBlock=scriptBlockById(index,'app-production-measurement-gate-current');
  const qualityBlock=scriptBlockById(index,'app-production-quality-gate-f5-r330');
  assert.ok(measurementBlock&&qualityBlock,'P2 measurement/quality blocks missing');
  const listeners=Object.create(null),store=new Map();
  const doc={
    documentElement:{},
    addEventListener(name,fn){(listeners[name]||(listeners[name]=[])).push(fn)},
    dispatchEvent(event){for(const fn of listeners[event.type]||[])fn(event);return true}
  };
  class CE{constructor(type,opts){this.type=type;this.detail=opts&&opts.detail||{}}}
  const originalCall=function(method){return Promise.resolve({ok:true,perf:{durationMs:5},data:{ok:true}})};
  const ctx={
    document:doc,CustomEvent:CE,Date,Math,Object,Array,String,Number,JSON,Promise,isFinite,
    setTimeout,clearTimeout,performance:{now:()=>Date.now(),getEntriesByType:()=>[]},navigator:{},innerWidth:1280,innerHeight:720,devicePixelRatio:1,
    sessionStorage:{getItem:key=>store.has(key)?store.get(key):null,setItem:(key,value)=>store.set(key,String(value)),removeItem:key=>store.delete(key)},
    AppRuntime:{isFn:v=>typeof v==='function',nowIso:()=>new Date().toISOString()},
    AppApi:{call:originalCall},
    __APP_BOOTSTRAP__:{sourceFingerprint:'gas-backend-single-source-r331-v62'}
  };
  ctx.window=ctx;ctx.globalThis=ctx;
  vm.createContext(ctx);
  for(const [label,block] of [['measurement',measurementBlock],['quality',qualityBlock]]){
    const body=block.replace(/^<script\b[^>]*>/i,'').replace(/<\/script\s*>$/i,'');
    new vm.Script(body,{filename:'p2-'+label+'.js'}).runInContext(ctx);
  }
  function emit(type,detail){doc.dispatchEvent(new CE(type,{detail:detail||{}}))}
  return {ctx,emit,store};
}

await okAsync('P2 route performance journey settles on data readiness, not shell activation',async()=>{
  const block=scriptBlockById(index,'app-route-loading-controller-current');
  assert.ok(block.includes('function emitSettled(source)'));
  assert.ok(block.includes('app:route-settled'));
  const body=block.replace(/^<script\b[^>]*>/i,'').replace(/<\/script\s*>$/i,'');
  const listeners=Object.create(null),settled=[],loading={hidden:true,setAttribute(){},removeAttribute(){}},host={querySelector:()=>({}),getClientRects:()=>[1]};
  const doc={documentElement:{toggleAttribute(){}},getElementById(id){return id==='app-page-loading-state'?loading:/^p-(?:search|track)$/.test(id)?host:null},querySelector(){return null},addEventListener(name,fn){(listeners[name]||(listeners[name]=[])).push(fn)},dispatchEvent(ev){if(ev.type==='app:route-settled')settled.push(ev.detail);for(const fn of listeners[ev.type]||[])fn(ev);return true}};
  class CE{constructor(type,opts){this.type=type;this.detail=opts&&opts.detail||{}}}
  const ctx={document:doc,CustomEvent:CE,setTimeout,clearTimeout,Date,Object,String,Number,isFinite};ctx.window=ctx;
  vm.runInNewContext(body,ctx);
  const emit=(name,detail)=>{for(const fn of listeners[name]||[])fn({type:name,detail:detail||{}})};
  emit('app:page-changing',{to:'search',generation:41});
  emit('app:page-activated',{pageId:'search',generation:41});
  assert.equal(settled.length,0,'data route must not settle at page activation alone');
  emit('app:request:start',{requestId:'search-1',pageId:'search',routeGeneration:41});
  emit('app:request:end',{requestId:'search-1',pageId:'search',routeGeneration:41});
  await new Promise(resolve=>setTimeout(resolve,650));
  assert.equal(settled.length,1,'data route must settle after active requests become idle');
  assert.equal(settled[0].pageId,'search');assert.equal(settled[0].generation,41);
  assert.equal(ctx.AppPageLoading.status().settledGeneration,41);
});

ok('P2 production approval requires complete measurement, journey and UX evidence',()=>{
  const {ctx,emit}=p2MeasurementHarness();
  const measurement=ctx.AppProductionMeasurement.status();
  assert.equal(measurement.implementationReady,true,'measurement wrapper should be installed');
  assert.equal(measurement.evidenceReady,false,'empty production evidence must not be release-ready');
  for(let i=0;i<5;i++){
    const requestId='mutation-'+i;
    emit('app:data:mutated',{requestId,method:'apiSaveCase'});
    emit('app:mutation:refresh-scheduled',{requestId,method:'apiSaveCase',pageId:'meeting'});
    emit('app:mutation:refresh-complete',{requestId,method:'apiSaveCase',pageId:'meeting',ok:true});
  }
  ctx.AppProductionQualityGate.recordConcurrentWriteScenario({ok:true,lostUpdates:false,duplicateRows:false,staleAfterWrite:false});
  const quality=ctx.AppProductionQualityGate.status();
  assert.equal(quality.mutationReady,true);assert.equal(quality.concurrentWriteReady,true);
  assert.equal(quality.measurementReady,false,'mutation evidence must not bypass performance evidence');
  assert.equal(quality.productionApproved,false,'production approval must remain false until measurement evidence is complete');
});

await okAsync('P2 overlapping journeys attribute each API call to every active journey owner',async()=>{
  const {ctx}=p2MeasurementHarness();
  const a=ctx.AppProductionMeasurement.startJourney('route-transition',{source:'regression'});
  const b=ctx.AppProductionMeasurement.startJourney('route-track',{source:'regression'});
  await ctx.AppApi.call('apiGetTracking',{},{});
  const rowA=ctx.AppProductionMeasurement.endJourney(a,{event:'done'});
  const rowB=ctx.AppProductionMeasurement.endJourney(b,{event:'done'});
  assert.equal(rowA.apiCallCount,1,'generic route journey must own the API sample');
  assert.equal(rowB.apiCallCount,1,'specific route journey must own the same API sample');
  assert.deepEqual(Array.from(rowA.methods),['apiGetTracking']);assert.deepEqual(Array.from(rowB.methods),['apiGetTracking']);
});

ok('P2 required E2E journey contract covers Login Dashboard Search Editor Tracking Logout',()=>{
  const journeys=['login-to-dashboard','route-transition','route-search','case-editor-open','route-track','logout-to-login'];
  for(const name of journeys)assert.ok(index.includes('"'+name+'"'),`client P2 journey missing: ${name}`);
  assert.ok(index.includes('journeyBudgets: Object.freeze'));assert.ok(index.includes('duplicateRequestIdCount'));assert.ok(index.includes('duplicateFree'));
  assert.ok(index.includes('"case-editor-open": 12000'));
  assert.ok(index.includes('app:auth-login-start'));assert.ok(index.includes('app:auth-login-failed'));
  assert.ok(index.includes('app:auth-logout-start'));assert.ok(index.includes('app:auth-logout-complete'));
  assert.ok(index.includes('app:route-settled'));
  if(MODE==='full'){
    const core=file('gas-backend/Code_00_PlatformCore.gs'),reportTrack=file('gas-backend/Scripts_Page_ReportTrack.html');
    for(const name of journeys)assert.ok(core.includes('"'+name+'"'),`server P2 journey missing: ${name}`);
    for(const marker of ['app:case-editor-open-start','app:case-editor-opened','app:case-editor-open-failed'])assert.ok(reportTrack.includes(marker),`case-editor telemetry missing: ${marker}`);
    assert.ok(core.includes('"case-editor-open": "caseEditorOpen"'));
    assert.ok(core.includes('caseEditorOpen: 12000'));assert.ok(core.includes('journey-duplicate-request:'));assert.ok(core.includes('duplicateRequestIdCount'));
    assert.ok(core.includes('stamp: "p2-end-to-end-production-reliability-r331-v62"'));
  } else {
    for(const marker of ['app:case-editor-open-start','app:case-editor-opened','app:case-editor-open-failed'])assert.ok(index.includes(marker),`projected case-editor telemetry missing: ${marker}`);
  }
});

await okAsync('P2 simulated canonical E2E flow emits every required journey without false approval',async()=>{
  const {ctx,emit}=p2MeasurementHarness();
  emit('app:auth-login-start',{source:'regression'});
  emit('app:auth-login-success',{source:'regression'});
  emit('app:dashboard-load-settled',{source:'regression'});
  emit('app:page-changing',{to:'search',generation:2});
  emit('app:page-activated',{pageId:'search',generation:2});
  emit('app:route-settled',{pageId:'search',generation:2});
  emit('app:case-editor-open-start',{source:'regression'});
  emit('app:page-changing',{to:'meeting',generation:3});
  emit('app:page-activated',{pageId:'meeting',generation:3});
  emit('app:route-settled',{pageId:'meeting',generation:3});
  emit('app:case-editor-opened',{source:'regression'});
  emit('app:page-changing',{to:'track',generation:4});
  emit('app:page-activated',{pageId:'track',generation:4});
  emit('app:route-settled',{pageId:'track',generation:4});
  emit('app:auth-logout-start',{source:'regression'});
  emit('app:auth-logout-complete',{source:'regression'});
  const snap=ctx.AppProductionMeasurement.snapshot();
  const names=Array.from(snap.journeys).map(row=>row.name);
  for(const name of ['login-to-dashboard','route-search','case-editor-open','route-track','logout-to-login'])assert.ok(names.includes(name),'simulated E2E missing '+name);
  assert.ok(names.filter(name=>name==='route-transition').length>=3,'generic route transition must cover Search Meeting Tracking');
  assert.equal(ctx.AppProductionMeasurement.status().evidenceReady,false,'one simulated flow must not satisfy real production sample/UX baselines');
  assert.equal(ctx.AppProductionQualityGate.status().productionApproved,false,'simulated flow must never self-approve production');
});

ok('P2 deployed Pages smoke runs after deployment and verifies the production artifact',()=>{
  const deployPos=workflow.indexOf('uses: actions/deploy-pages@v4');
  const smokePos=workflow.indexOf('Validate deployed Pages release surface');
  assert.ok(deployPos>=0&&smokePos>deployPos,'post-deploy smoke must execute after Pages deployment');
  for(const marker of ['gas-backend-single-source-r331-v62','app-production-measurement-gate-current','app-production-quality-gate-f5-r330','app:route-settled'])assert.ok(workflow.includes(marker));
  assert.ok(workflow.includes('attempt<=5')||workflow.includes('attempt<=5;')||workflow.includes('attempt<=5; attempt++')||workflow.includes('attempt<=5; attempt++'));
  assert.ok(workflow.includes("cache:'no-store'"));
});

ok('artifact performance budgets',()=>{
  assert.ok(Buffer.byteLength(index,'utf8')<=545000,'index.html exceeds 545 KB budget');
  assert.ok(Buffer.byteLength(transport,'utf8')<=12000,'transport exceeds 12 KB budget');
  assert.ok(Buffer.byteLength(config,'utf8')<=3000,'config exceeds 3 KB budget');
  const blocks=htmlScripts(index);
  assert.ok(blocks.length<=50,'too many executable inline script blocks');
  assert.ok(Math.max(...blocks.map(x=>Buffer.byteLength(x,'utf8')))<=100000,'single inline script exceeds 100 KB');
});

ok('browser security primitives are constrained',()=>{
  for(const [label,text] of [['index',index],['transport',transport],['config',config]]){
    assert.ok(!/\beval\s*\(/.test(text),label+' contains eval');
    assert.ok(!/new\s+Function\b/.test(text),label+' contains new Function');
    assert.ok(!/document\.write\b/.test(text),label+' contains document.write');
  }
  assert.ok(index.includes('app-shared-utility-sanitizer-owner-current'));
  assert.ok(index.includes('sanitizeSwalOptions'));
  assert.ok(index.includes('data-app-asset-policy="sri-required-r330"'));
  const remoteTags=[...index.matchAll(/<(script|link)\b([^>]*(?:src|href)="https?:\/\/[^"]+"[^>]*)>/gi)]
    .filter(m=>m[1].toLowerCase()==='script'||/rel="stylesheet"/i.test(m[2]));
  for(const m of remoteTags)assert.ok(/\bintegrity="/i.test(m[2])||/data-app-integrity-exempt="true"/i.test(m[2]),'remote executable asset lacks integrity policy');
});

ok('accessibility and no-blank loading contract',()=>{
  assert.equal((index.match(/<button\b(?![^>]*\btype\s*=)/gi)||[]).length,0,'button without explicit type');
  assert.equal((index.match(/<img\b(?![^>]*\balt\s*=)/gi)||[]).length,0,'image without alt');
  assert.ok(index.includes('id="main"'));
  assert.ok(index.includes('id="app-live-region"'));
  assert.ok(index.includes('id="app-page-loading-state"'));
  assert.ok(index.includes('role="status"'));
  assert.ok(index.includes('กำลังโหลดข้อมูล'));
  assert.ok(index.includes('กรุณารอสักครู่'));
  assert.ok(index.includes('app:page-changing'));
  assert.ok(index.includes('app:page-activated'));
  assert.ok(index.includes('app:page-activation-failed'));
  assert.ok(index.includes('app:request:start'));
  assert.ok(index.includes('app:request:end'));
  assert.ok(index.includes('app:data:rendered'));
  assert.ok(index.includes('app:dashboard-load-settled'));
  assert.ok(index.includes('app:transport:stale-served'));
  assert.ok(index.includes('data-app-route-loading'));
  assert.ok(index.includes('function waitShell(id,start)'));
  assert.ok(index.includes('function settle(){cancelIdle();if(active)return;idleTimer=setTimeout(function(){if(!active)done("idle-after-data")},600)}'));
  assert.ok(index.includes('app:route-settled'));
  assert.ok(index.includes('r331-v62.2-route-generation-data-ready'));
  assert.ok(index.includes('requests=Object.create(null)'));
  assert.ok(index.includes('function currentEvent(ev)'));
  assert.ok(index.includes('if(dataPage.test(route))set(true)'));
  assert.ok(!index.includes('if(!active)done()},true);["app:data:rendered"'));
  assert.ok(index.includes('host.getClientRects().length'));
});

ok('canonical page and role surfaces remain complete',()=>{
  for(const id of ['dashboard','search','petitioner','meeting','committee-meeting','track','report','people','budget','admin']){
    assert.ok(index.includes('tpl-page-'+id),'missing page template: '+id);
  }
  assert.ok(index.includes('AppPermissionMatrix'));
  assert.ok(index.includes('data-role-menu="admin"'));
  assert.ok(index.includes('data-role-menu="admin,staff"'));
  assert.ok(index.includes('data-role-menu="all"'));
});

ok('RPC reliability performance and cache rules',()=>{
  assert.ok(config.includes('RPC_RESULT_POLL_MIN_MS:250'));
  assert.ok(config.includes('RPC_RESULT_POLL_MAX_MS:1200'));
  assert.ok(config.includes('RPC_RESULT_JSONP_TIMEOUT_MS:30000'));
  assert.ok(config.includes('RPC_READ_CACHE_TTL_MS:60000'));
  assert.ok(config.includes('RPC_READ_STALE_TTL_MS:300000'));
  assert.ok(config.includes('apiGetDashboardBundle:180000'));
  assert.ok(config.includes('apiGetTracking:300000'));
  assert.ok(transport.includes('function prewarm(){health(false)'));
  assert.ok(transport.includes('if(RH&&!force)return RH'));
  assert.ok(transport.includes('if(key&&F[key])return F[key]'));
  assert.ok(transport.includes('stale-while-revalidate'));
  assert.ok(transport.includes('app:transport:cache-updated'));
  assert.ok(transport.includes('function sessionError(e)'));
  assert.ok(transport.includes('function isReadMethod(fn)'));
  assert.ok(transport.includes('read=isReadMethod(fn)'));
  assert.ok(transport.includes('w[cb]=function(){}'));
  assert.ok(transport.includes('},600000)'));
  assert.ok(transport.includes('if(write){TTL=Object.create(null)'));
  assert.ok(transport.includes('rec.write?"บันทึกข้อมูลไม่ได้รับการยืนยัน'));
  assert.ok(transport.includes('getLastRpcTrace'));
});

await okAsync('RPC POST/result handshake fails fast without discarding an earlier result',async()=>{
  assert.ok(transport.includes('Promise.race(['),'RPC must race result polling against POST failure');
  assert.ok(transport.includes('resultState="post-failed"'));
  assert.ok(transport.includes('GAS_RPC_POST_FAILED'));
  assert.ok(transport.includes('GAS_RPC_WRITE_POST_UNCONFIRMED'));
  assert.ok(!transport.includes('rec.postPromise=post(rec,I).catch(function(e)'),'POST failure must not be swallowed');
  const start=transport.indexOf('function rpc(fn,a,opt)');
  const end=transport.indexOf('\nfunction ttlMs(',start);
  assert.ok(start>=0&&end>start,'rpc source boundary missing');
  const rpcSource=transport.slice(start,end);
  function harness({write=false,postPromise,pollPromise}){
    let seq=0;
    const ctx={
      Promise,Date,Math,Number,Object,
      LAST_TRACE:null,
      w:{setTimeout:fn=>{fn();return 1}},
      c:(k,f)=>f,
      invocation:(fn,a)=>({fn,args:a||{},orig:fn}),
      isWriteMethod:()=>write,
      capability:()=>`cap_${++seq}`,
      post:()=>postPromise,
      poll:()=>pollPromise,
      err:(message,code)=>Object.assign(new Error(message),{code}),
      t:v=>v==null?'':String(v)
    };
    return {rpc:vm.runInNewContext('('+rpcSource+')',ctx),ctx};
  }
  {
    const {rpc,ctx}=harness({postPromise:Promise.reject(new Error('network down')),pollPromise:new Promise(()=>{})});
    await assert.rejects(rpc('apiGetDashboardBundle',{},{}),e=>e&&e.code==='GAS_RPC_POST_FAILED');
    assert.equal(ctx.LAST_TRACE.resultState,'post-failed');
  }
  {
    const {rpc}=harness({postPromise:new Promise(()=>{}),pollPromise:Promise.resolve({ok:'result-first'})});
    assert.deepEqual(await rpc('apiGetDashboardBundle',{},{}),{ok:'result-first'});
  }
  {
    const timeout=Object.assign(new Error('request timeout'),{code:'GAS_RPC_REQUEST_TIMEOUT'});
    const {rpc}=harness({postPromise:Promise.resolve(true),pollPromise:Promise.reject(timeout)});
    await assert.rejects(rpc('apiGetDashboardBundle',{},{}),e=>e===timeout);
  }
  {
    const {rpc,ctx}=harness({write:true,postPromise:Promise.reject(new Error('write network down')),pollPromise:new Promise(()=>{})});
    await assert.rejects(rpc('apiSaveCase',{},{}),e=>e&&e.code==='GAS_RPC_WRITE_POST_UNCONFIRMED'&&/unconfirmed/i.test(e.message));
    assert.equal(ctx.LAST_TRACE.write,true);
    assert.equal(ctx.LAST_TRACE.resultState,'post-failed');
  }
});

ok('write API classifier follows canonical mutation contract',()=>{
  assert.ok(transport.includes('function isWriteMethod(fn)'));
  assert.ok(transport.includes('w.WRITE_API_METHODS&&w.WRITE_API_METHODS[fn]'));
  assert.ok(transport.includes('w.AppRouteContract&&typeof w.AppRouteContract.isWrite==="function"'));
  assert.ok(transport.includes('write=isWriteMethod(I.orig)'));
  assert.ok(transport.includes('var write=isWriteMethod(fn),read=isReadMethod(fn)'));
  assert.ok(!transport.includes('write=/^api(?:Save|Delete|Update|Create|Import|Extract|Upload|Issue|Process|Cleanup|Generate|Send|Patch|Approve|Reject|Submit|Queue|Migrate|Revoke|Refresh)'));
  const fm=/root2\.WRITE_API_METHODS=root2\.WRITE_API_METHODS\|\|\{([^}]*)\}/.exec(index);
  assert.ok(fm,'canonical frontend WRITE_API_METHODS map missing');
  const frontendWrites=[...fm[1].matchAll(/\b(api[A-Za-z0-9_]+):!0/g)].map(m=>m[1]).sort();
  assert.equal(frontendWrites.length,27,'unexpected canonical write-route count');
  const p0bMethods=['apiBudgetSaveImport','apiBudgetDeleteImport','apiAdminSaveUser','apiAdminDeleteUser','apiAdminSaveSubcommittee','apiAdminDeleteSubcommittee','apiBudgetAdminSaveYearSettingsRows'];
  for(const method of p0bMethods)assert.ok(frontendWrites.includes(method),`missing P0-B write route: ${method}`);
  const classifierStart=transport.indexOf('function isWriteMethod(fn)');
  const classifierEnd=transport.indexOf('\nfunction t(',classifierStart);
  assert.ok(classifierStart>=0&&classifierEnd>classifierStart,'write classifier source boundary missing');
  const classifier=vm.runInNewContext('('+transport.slice(classifierStart,classifierEnd)+')',{
    w:{WRITE_API_METHODS:Object.fromEntries(frontendWrites.map(method=>[method,true])),AppRouteContract:{isWrite:()=>false}},
    t:v=>v==null?'':String(v)
  });
  for(const method of frontendWrites)assert.equal(classifier(method),true,`canonical write misclassified: ${method}`);
  for(const method of ['apiGetDashboardBundle','apiGetTracking','apiSearchCasesLite','apiAdminListUsers','apiBudgetGetSummary'])assert.equal(classifier(method),false,`read route misclassified as write: ${method}`);
  const fallbackClassifier=vm.runInNewContext('('+transport.slice(classifierStart,classifierEnd)+')',{w:{},t:v=>v==null?'':String(v)});
  for(const method of p0bMethods)assert.equal(fallbackClassifier(method),true,`P0-B fallback misclassified: ${method}`);
  if(MODE==='full'){
    const core=file('gas-backend/Code_00_PlatformCore.gs');
    const backendWrites=[...core.matchAll(/\b(api[A-Za-z0-9_]+): Object\.freeze\(\{ write: true,/g)].map(m=>m[1]).sort();
    assert.deepEqual(frontendWrites,backendWrites,'frontend/backend write contracts drifted');
  }
});

ok('RPC capability and origin boundary',()=>{
  assert.ok(transport.includes('parentOrigin'));
  assert.ok(transport.includes('rpcToken'));
  assert.ok(transport.includes('rpcVersion'));
  assert.ok(transport.includes('credentials:"omit"'));
  assert.ok(transport.includes('referrerPolicy:"no-referrer"'));
  assert.ok(transport.includes('cache:"no-store"'));
  assert.ok(!/localStorage\s*\.\s*setItem\s*\([^,]*(?:password|csrf|token)/i.test(index));
});

ok('data identity and operational feedback markers',()=>{
  assert.ok(index.includes('ลำดับเรื่อง'));
  assert.ok(index.includes('เปิดหน้าไม่สำเร็จ'));
  assert.ok(index.includes('โหลดหน้านี้อีกครั้ง'));
  assert.ok(index.includes('data-auto-dismiss-ms'));
  assert.ok(index.includes('app-production-measurement-gate-current'));
  assert.ok(index.includes('recordMetric'));
  assert.ok(index.includes('recordWarning'));
});

ok('tracking backend has a single canonical owner without duplicated global definitions',()=>{
  if(MODE!=='full')return;
  const tracking=file('gas-backend/Code_31B_Domain_Tracking.gs');
  const lines=tracking.split(/\r?\n/);
  assert.ok(lines.length<=1700,`tracking backend unexpectedly expanded to ${lines.length} lines`);
  const names=[...tracking.matchAll(/^\s*function\s+([A-Za-z0-9_$]+)\s*\(/gm)].map(m=>m[1]);
  assert.ok(names.length>=70,'tracking backend function inventory unexpectedly small');
  const duplicates=[...new Set(names.filter((name,i)=>names.indexOf(name)!==i))].sort();
  assert.deepEqual(duplicates,[],'duplicate tracking global function owners detected');
  const half=Math.floor(lines.length/2);
  if(lines.length%2===0&&half>100){
    const a=lines.slice(0,half).join('\n');
    const b=lines.slice(half).join('\n');
    assert.notEqual(a,b,'tracking backend appears to contain an exact duplicated half');
  }
  for(const fn of ['_getTrackingCore_','apiGetLetters','apiSaveLetter','apiDeleteLetter','_getTrackingMaterializedCore_']){
    assert.equal(names.filter(name=>name===fn).length,1,`tracking canonical owner count mismatch: ${fn}`);
  }
});

ok('Thai holiday settings are parsed without an undefined add() owner',()=>{
  if(MODE!=='full')return;
  const core=file('gas-backend/Code_00_PlatformCore.gs');
  const auth=file('gas-backend/Code_10_Security_Auth.gs');
  const budget=file('gas-backend/Code_35_Domain_Budget_Admin.gs');
  assert.ok(!/\badd\s*\(\s*key\s*\)\s*,\s*_appAddDateKey_\s*\(\s*map\s*,\s*val\s*\)/.test(auth),'undefined add(key) call remains in holiday loader');
  assert.ok(auth.includes('_appAddDateKey_(map, key), _appAddDateKey_(map, val);'),'holiday loader must use the canonical date-key helper for key and value');
  assert.ok(auth.includes('if (/^\\s*\\[/.test(val)) try {'),'auth holiday loader must JSON-parse only array-shaped values');
  assert.ok(budget.includes('if (/^\\s*\\[/.test(val)) try {'),'budget holiday loader must JSON-parse only array-shaped values');
  const helperStart=core.indexOf('function _appAddDateKey_(map, value)');
  const helperEnd=core.indexOf('\nfunction _appIsFn_(',helperStart);
  const holidayStart=auth.indexOf('function _getThaiHolidayKeys_()');
  const holidayEnd=auth.indexOf('\nfunction apiBootstrap(',holidayStart);
  assert.ok(helperStart>=0&&helperEnd>helperStart,'_appAddDateKey_ source boundary missing');
  assert.ok(holidayStart>=0&&holidayEnd>holidayStart,'_getThaiHolidayKeys_ source boundary missing');
  const warnings=[];
  const rows=[
    {key:'2026-12-10',value:'',active:'Y'},
    {key:'thaiHoliday.special',value:'2026-09-11',active:'Y'},
    {key:'holidayArray',value:'["2026-10-13","12-05"]',active:'Y'},
    {key:'systemHoliday.disabled',value:'2026-12-31',active:'N'},
    {key:'otherSetting',value:'not-a-date',active:'Y'}
  ];
  const ctx={Object,Array,String,JSON,readSheetObjects_:(sheet,opt)=>{assert.equal(sheet,'SystemSettings');assert.equal(opt&&opt.includeDeleted,false);return rows;},_recordWarning_:(kind,error)=>warnings.push([kind,String(error&&error.message||error)])};
  vm.runInNewContext(core.slice(helperStart,helperEnd)+'\n'+auth.slice(holidayStart,holidayEnd),ctx);
  assert.deepEqual(Array.from(ctx._getThaiHolidayKeys_()),['12-05','2026-09-11','2026-10-13','2026-12-10']);
  assert.deepEqual(warnings,[],'valid holiday settings should not emit warnings');
  const budgetStart=budget.indexOf('function _budgetHolidayKeyMap_()');
  const budgetEnd=budget.indexOf('\nfunction _budgetBusinessDaysSince_(',budgetStart);
  assert.ok(budgetStart>=0&&budgetEnd>budgetStart,'budget holiday source boundary missing');
  const budgetWarnings=[];
  const budgetCtx={Object,Array,String,JSON,Date,isNaN,readSheetObjects_:(sheet,opt)=>{assert.equal(sheet,'SystemSettings');assert.equal(opt&&opt.includeDeleted,false);return rows;},_b32W_:(kind,error)=>budgetWarnings.push([kind,String(error&&error.message||error)])};
  vm.runInNewContext(core.slice(helperStart,helperEnd)+'\n'+budget.slice(budgetStart,budgetEnd),budgetCtx);
  assert.equal(budgetCtx._budgetIsThaiPublicHoliday_(new Date(2026,8,11)),true,'scalar configured holiday must be recognized');
  assert.equal(budgetCtx._budgetIsThaiPublicHoliday_(new Date(2026,9,13)),true,'JSON-array configured holiday must be recognized');
  assert.equal(budgetCtx._budgetIsThaiPublicHoliday_(new Date(2026,11,10)),true,'date-key configured holiday must be recognized');
  assert.equal(budgetCtx._budgetIsThaiPublicHoliday_(new Date(2026,11,31)),false,'inactive holiday must not be recognized');
  assert.deepEqual(budgetWarnings,[],'valid budget holiday settings should not emit warnings');
});

ok('repository remains minimal and deployment-safe',()=>{
  const publicFiles=fs.readdirSync(path.join(ROOT,'github-pages')).sort();
  assert.deepEqual(publicFiles,['app-config.js','github-gas-transport.js','index.html']);
  assert.ok(workflow.includes('concurrency:'));
  assert.ok(workflow.includes('cancel-in-progress: true'));
  assert.ok(workflow.includes('permissions:'));
  assert.ok(workflow.includes('id-token: write'));
});

ok('retired frontend code stays removed',()=>{
  for(const token of ['waitForMainShellReadyCrit','mainShellReadyCrit','hasAuthenticatedSessionCrit'])assert.ok(!index.includes(token),`dead frontend token: ${token}`);
  assert.ok(!index.includes('missingJourneyRefs=[],deferredTemplates=[],i,j,id,source'));
  assert.ok(!index.includes('var hasOwn = Object.prototype.hasOwnProperty'));
  assert.ok(!index.includes('function navFromRoute(path){var inverse;'));
});


ok('meeting status normalization is owned by the canonical deferred Meeting module',()=>{
  assert.ok(!index.includes('id="app-meeting-status-normalizer-compat-current"'),'legacy GitHub-only meeting normalizer must stay retired');
  if(MODE==='full'){
    const meeting=file('gas-backend/Scripts_Page_Meeting.html');
    assert.ok(meeting.includes('function normalizeMeetingStatusValue(status)'));
    assert.ok(meeting.includes('"รอการพิจารณา": "รอพิจารณา"'));
    assert.ok(meeting.includes('"กมธ.พิจารณา": "กมธ. พิจารณา"'));
  } else {
    assert.ok(index.includes('Scripts_Page_Meeting::meeting-common'));
    assert.ok(index.includes('Scripts_Page_Meeting::meeting'));
  }
});

ok('meeting field setter compatibility is owned by the canonical deferred Meeting module',()=>{
  assert.ok(!index.includes('id="app-meeting-deferred-compat-current"'),'legacy GitHub-only meeting setter must stay retired');
  if(MODE==='full'){
    const meeting=file('gas-backend/Scripts_Page_Meeting.html');
    assert.ok(meeting.includes('function __Scripts_Page_Meeting_setVal(id, value)'));
    assert.ok(meeting.includes('function __Scripts_Page_Meeting_setVal(id, val)'));
  } else {
    assert.ok(index.includes('Scripts_Page_Meeting::meeting-common'));
  }
});

ok('session resume persistence and boot isolation are canonical critical-runtime behavior',()=>{
  assert.ok(!index.includes('id="app-session-resume-persist-current"'),'legacy session-persist patch must stay retired');
  assert.ok(!index.includes('id="app-session-resume-boot-isolation-current"'),'legacy resume boot wrapper must stay retired');
  assert.ok(index.includes('function saveResume(d)'));
  assert.ok(index.includes('try{saveResume(data2||{})}'));
  assert.ok(index.includes('session.resume.bootMainUi.background'));
  assert.ok(index.includes('source:"tryResume-canonical-r331"'));
  assert.ok(index.includes('root2.__APP_SESSION_RESUME_IN_FLIGHT__'));
});

ok('session resume survives login-route reloads unless logout is explicit',()=>{
  assert.ok(index.includes('/(?:\\?|&)_logout=/.test(location.search||"")||root2.__APP_LOGGED_OUT_LOCK__||criticalReadyHasActiveSession()'));
  assert.ok(index.includes('(/(?:\\?|&)_logout=/.test(location.search||"")||root2.__APP_LOGGED_OUT_LOCK__)&&(clearResume(),clearFields()'));
  assert.ok(index.includes('var explicitLogout=/(?:\\?|&)_logout=/.test(location.search||"")||appBootGet("__APP_LOGGED_OUT_LOCK__",!1)===!0;if(!explicitLogout&&'));
  assert.ok(index.includes('if(explicitLogout)try{window.AppSessionResume'));
  assert.ok(!index.includes('location.hash==="#/login"||/(?:\\?|&)_(?:logout|login)=/'));
  assert.ok(!index.includes('var explicitLogin=location.hash==="#/login"'));
  assert.ok(!index.includes('if(explicitLogin)try{window.AppSessionResume'));
});

ok('expired GAS sessions recover to login without a data-error modal',()=>{
  assert.ok(index.includes('function ae(v){return/SESSION_EXPIRED|AUTH_REQUIRED|UNAUTHORIZED|เซสชันหมดอายุ|ยังไม่ได้เข้าสู่ระบบ/i'));
  assert.ok(index.includes('root.__APP_FORCE_LOGIN_VIEW__("session-expired-r330")'));
  assert.ok(index.includes('Promise.resolve({isDismissed:!0})'));
});

ok('tracking filters are dispatched by the canonical ReportTrack owner',()=>{
  assert.ok(!index.includes('id="app-track-filter-fast-dispatch-current"'),'legacy GitHub-only track dispatch patch must stay retired');
  if(MODE==='full'){
    const reportTrack=file('gas-backend/Scripts_Page_ReportTrack.html');
    assert.ok(reportTrack.includes('(root.filterTrack = function (ctx)'));
    assert.ok(reportTrack.includes('root.AppPages.registerActions("track"'));
    assert.ok(reportTrack.includes('filterTrack: function (ctx)'));
  } else {
    assert.ok(index.includes('Scripts_Page_ReportTrack::reporttrack-common'));
  }
});

ok('login starts the Dashboard data controller automatically',()=>{
  assert.ok(index.includes('id="app-login-dashboard-autostart-current"'));
  assert.ok(index.includes('__APP_LOGIN_DASHBOARD_AUTOSTART_CURRENT__="r331-v62.2"'));
  assert.ok(index.includes('AppRouteAssetPrefetchCurrent.prepare("/dashboard")'));
  assert.ok(index.includes('AppVue3Bridge.activatePage("dashboard")'));
  assert.ok(index.includes('app:auth-login-success'));
  assert.ok(index.includes('app:core-runtime-ready'));
  assert.ok(index.includes('function suspiciousEmpty()'));
  assert.ok(index.includes('dashboard.transientEmptyRetry'));
  assert.ok(index.includes('app:dashboard-load-settled'));
  assert.ok(index.includes('emptyRetry++'));
});

ok('AI chat uses the canonical permission-bound search API',()=>{
  assert.ok(index.includes('id="app-ai-chat-panel"'));
  assert.ok(index.includes('id="app-ai-chat-input"'));
  assert.ok(index.includes('AppAiChatSearch'));
  assert.ok(index.includes('apiSearchCasesLite'));
  assert.ok(index.includes('normalizeQuery'));
  assert.ok(index.includes('ai-chat-natural-language-search-r330-summary-intent'));
  assert.ok(index.includes('__APP_AI_CHAT_SEARCH_CURRENT__="r330-summary-intent"'));
  assert.ok(index.includes('function totalFrom(value,rows)'));
  assert.ok(index.includes('function intent(question)'));
  assert.ok(index.includes('kind==="countAll"?1:80'));
  assert.ok(index.includes('มีเรื่องพิจารณาทั้งหมด'));
  assert.ok(index.includes('รอพิจารณา'));
  assert.ok(index.includes('ตอบจากข้อมูลที่ค้นพบตามสิทธิ์ของคุณ'));
  assert.ok(!index.includes('AIza'));
  assert.ok(!index.includes('api.openai.com'));
});

ok('AI PDF extraction has a dedicated long-running timeout',()=>{
  assert.ok(config.includes('AI_DOCUMENT_TIMEOUT_MS:300000'));
  assert.ok(transport.includes('if(fn==="apiRouter"){var nested='));
  assert.ok(transport.includes('aiDocument=/^apiExtract(?:Tracking|Document|MeetingAgenda)Pdf$'));
  assert.ok(transport.includes('c("AI_DOCUMENT_TIMEOUT_MS",300000)'));
  assert.ok(config.includes('commission-v1.2-reliability-loading-cache-session-2026-09-02-r331-v62'));
  assert.ok(config.includes('asset-manifest-r331-v62-reliability'))
});

console.log(`# ${passed} regression groups passed (${MODE} repository mode; frontend r331/v62, RPC r330 mode)`);
