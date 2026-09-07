#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';

const ROOT = process.cwd();
const RPC_REV = 'r330';
const RELEASE = 'commission-v1.3.1-production-2026-09-06';
const ASSET = 'asset-manifest-v1.3.1';
const QUALITY = 'current-quality-gate';
const RPC = 'github-pages-rpc-r330';
const BACKEND_DIR = path.join(ROOT,'gas-backend');

function resolveMode(){
  const args=process.argv.slice(2);
  const allowed=new Set(['--full','--frontend-only']);
  const unknown=args.filter(arg=>!allowed.has(arg));
  assert.deepEqual(unknown,[],`unknown regression argument(s): ${unknown.join(', ')}`);
  assert.ok(!(args.includes('--full')&&args.includes('--frontend-only')),'choose only one regression mode');
  if(args.includes('--full'))return 'full';
  if(args.includes('--frontend-only'))return 'frontend-only';
  return fs.existsSync(BACKEND_DIR)?'full':'frontend-only';
}

const MODE = resolveMode();
const FULL = MODE === 'full';
let passed = 0;
console.log(`# regression mode: ${MODE}`);

function file(rel){const p=path.join(ROOT,rel);assert.ok(fs.existsSync(p),`missing file: ${rel}`);return fs.readFileSync(p,'utf8');}
function ok(name,fn){try{fn();passed++;console.log(`ok ${passed} - ${name}`)}catch(e){console.error(`not ok - ${name}`);throw e}}
function stripNonRevision(text){return text.replace(/(?:sha256|sha384|sha512)-[A-Za-z0-9+/=]+/gi,'<HASH>').replace(/https?:\/\/[^\s\"'<>`]+/gi,'<URL>').replaceAll(RPC,'<RPC_PROTOCOL>')}
function jsSyntax(src,label){new vm.Script(src,{filename:label})}
function htmlScripts(html){const out=[];const re=/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi;let m;while((m=re.exec(html))){const attrs=m[1]||'',type=(attrs.match(/\btype=[\"']([^\"']+)[\"']/i)||[])[1]||'';if(type&&!/(?:javascript|ecmascript|module)/i.test(type))continue;const body=m[2].replace(/<\?(?:!=|=)?[\s\S]*?\?>/g,'null');if(body.trim())out.push(body)}return out}
function scriptById(html,id){const safe=id.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');const m=new RegExp('<script\\b[^>]*\\bid=[\"\']'+safe+'[\"\'][^>]*>([\\s\\S]*?)<\\/script\\s*>','i').exec(html);assert.ok(m,`missing script owner: ${id}`);return m[1].replace(/\s+/g,' ').trim()}
function scriptContaining(html,token){const re=/<script\b[^>]*>([\s\S]*?)<\/script\s*>/gi;let m;while((m=re.exec(html)))if(m[1].includes(token))return m[1].replace(/\s+/g,' ').trim();assert.fail(`missing script containing: ${token}`)}
function normalizeHostTemplate(text){return text.replace(/<\?(?:!=|=)?[\s\S]*?\?>/g,'<HOST_VALUE>').replace(/https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/9\/9a\/Seal_of_the_Parliament_of_Thailand\.svg/g,'<HOST_VALUE>').replace(/\s+/g,' ').trim()}
function extractNamedFunctionSource(source,name){
  const escaped=name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const match=new RegExp('^function\\s+'+escaped+'\\s*\\(','m').exec(source);
  assert.ok(match,`missing function source: ${name}`);
  const brace=source.indexOf('{',match.index+match[0].length);
  assert.ok(brace>=0,`missing function body: ${name}`);
  let depth=0,state='code',quote='',i=brace;
  for(;i<source.length;i++){
    const c=source[i],n=source[i+1]||'';
    if(state==='code'){
      if(c==='"'||c==="'"||c==='`'){state='string';quote=c}
      else if(c==='/'&&n==='/'){state='line-comment';i++}
      else if(c==='/'&&n==='*'){state='block-comment';i++}
      else if(c==='{')depth++;
      else if(c==='}'&&--depth===0)return source.slice(match.index,i+1);
    }else if(state==='string'){
      if(c==='\\')i++;
      else if(c===quote)state='code';
    }else if(state==='line-comment'){
      if(c==='\n')state='code';
    }else if(state==='block-comment'&&c==='*'&&n==='/'){state='code';i++}
  }
  assert.fail(`unbalanced function body: ${name}`);
}
function backendGsSources(){
  if(!FULL)return [];
  return fs.readdirSync(BACKEND_DIR).filter(name=>name.endsWith('.gs')).sort().map(name=>({name,rel:`gas-backend/${name}`,source:file(`gas-backend/${name}`)}));
}
function topLevelFunctionInventory(files){
  const rows=[];
  for(const entry of files){
    const matches=[...entry.source.matchAll(/^function\s+([A-Za-z_$][\w$]*)\s*\(/gm)];
    for(let i=0;i<matches.length;i++){
      const match=matches[i],end=i+1<matches.length?matches[i+1].index:entry.source.length;
      rows.push({name:match[1],file:entry.name,line:entry.source.slice(0,match.index).split('\n').length,source:entry.source.slice(match.index,end)});
    }
  }
  return rows;
}
function normalizeFunctionBody(source){
  const brace=source.indexOf('{');
  return source.slice(brace+1,-1).replace(/\/\*[\s\S]*?\*\//g,'').replace(/\/\/[^\n]*/g,'').replace(/\s+/g,'');
}
function staticRouteSurface(routerSource){
  const required=['_routerBatch_','_routerRoutesFrom_','_routerCoreRouteTuples_','_routerCoreRoutes_','_routerAdminRoutes_','_routerAiRoutes_'];
  const sandbox={};vm.createContext(sandbox);
  vm.runInContext(required.map(name=>extractNamedFunctionSource(routerSource,name)).join('\n'),sandbox,{filename:'Code_20_Router.static-route-surface.js'});
  const sources=[['core',sandbox._routerCoreRoutes_()],['admin',sandbox._routerAdminRoutes_()],['ai',sandbox._routerAiRoutes_()]];
  const routes=Object.create(null),duplicates=[];
  for(const [sourceName,map] of sources){
    for(const [method,meta] of Object.entries(map||{})){
      if(routes[method])duplicates.push({method,sources:[routes[method].source,sourceName]});
      routes[method]={source:sourceName,meta:Object.assign({},meta||{})};
    }
  }
  return {routes,duplicates,sourceCounts:Object.fromEntries(sources.map(([name,map])=>[name,Object.keys(map||{}).length]))};
}
function staticTopLevelCallGraph(files){
  const sourceByName=Object.create(null),fileByName=Object.create(null);
  for(const row of topLevelFunctionInventory(files)){
    sourceByName[row.name]=row.source;
    fileByName[row.name]=row.file;
  }
  const ownerNames=new Set(Object.keys(sourceByName)),graph=Object.create(null);
  for(const [name,source] of Object.entries(sourceByName)){
    const found=[];
    for(const match of source.matchAll(/(?<![.\w$])([A-Za-z_$][\w$]*)\s*\(/g)){
      const called=match[1];
      if(called!==name&&ownerNames.has(called)&&!found.includes(called))found.push(called);
    }
    graph[name]=found;
  }
  return {graph,sourceByName,fileByName};
}
function staticCallPath(graph,start,target,maxDepth=12){
  const queue=[[start,[start]]],seen=new Set();
  while(queue.length){
    const [name,path]=queue.shift();
    if(seen.has(name)||path.length>maxDepth)continue;
    seen.add(name);
    for(const called of graph[name]||[]){
      const next=path.concat(called);
      if(called===target)return next;
      if(!seen.has(called))queue.push([called,next]);
    }
  }
  return null;
}
function quotedList(body,key){
  const safe=key.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const match=new RegExp(safe+'\\s*:\\s*\\[([^\\]]*)\\]').exec(body);
  return match?[...match[1].matchAll(/"([^"]+)"/g)].map(m=>m[1]):[];
}
function quotedScalar(body,key){
  const safe=key.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const match=new RegExp(safe+'\\s*:\\s*"([^"]+)"').exec(body);
  return match?match[1]:'';
}
function staticDataContract(coreSource){
  const start=coreSource.indexOf('var APP_DATA_CONTRACT_CURRENT = Object.freeze({');
  const end=coreSource.indexOf('function _platformDataContractMethod_',start);
  assert.ok(start>=0&&end>start,'APP_DATA_CONTRACT_CURRENT source block missing');
  const block=coreSource.slice(start,end),entities=Object.create(null),methods=Object.create(null);
  const entityRe=/^\s*(?:"([^"]+)"|([A-Za-z_$][\w$-]*))\s*:\s*Object\.freeze\(\{\s*pages:\s*\[([^\]]*)\],\s*stampEntities:/gm;
  for(const m of block.matchAll(entityRe)){
    const name=m[1]||m[2];
    entities[name]={pages:[...m[3].matchAll(/"([^"]+)"/g)].map(x=>x[1])};
  }
  const methodRe=/^\s*(api[A-Za-z0-9_$]+):\s*Object\.freeze\(\{([^\n]+)\}\),?/gm;
  for(const m of block.matchAll(methodRe)){
    const body=m[2];
    methods[m[1]]={
      write:/\bwrite:\s*true\b/.test(body),
      domain:quotedScalar(body,'domain'),
      cacheEntity:quotedScalar(body,'cacheEntity'),
      mutationEntity:quotedScalar(body,'mutationEntity'),
      invalidates:quotedList(body,'invalidates'),
      pages:quotedList(body,'pages')
    };
  }
  return {entities,methods,block};
}
function staticCacheLedgerContract(coreSource){
  const sandbox={};vm.createContext(sandbox);
  vm.runInContext([extractNamedFunctionSource(coreSource,'_cacheLedgerCanonicalDomain_'),extractNamedFunctionSource(coreSource,'_cacheLedgerProfiles_')].join('\n'),sandbox,{filename:'Code_00_PlatformCore.static-cache-ledger.js'});
  return {canonical:sandbox._cacheLedgerCanonicalDomain_,profiles:sandbox._cacheLedgerProfiles_()};
}

const RELEASE_FINGERPRINT_RE=/release-sha256-[0-9a-f]{64}/g;
const FRONTEND_FINGERPRINT_RE=/frontend-sha256-[0-9a-f]{64}/g;
const MODULE_MANIFEST_RE=/modules-sha256-[0-9a-f]{64}/g;
const MODULE_DIGEST_RE=/mod-sha256-[0-9a-f]{64}/g;
function productionReleaseFiles(){
  const roots=['gas-backend','github-pages'],rows=[];
  function walk(abs,rel){
    for(const name of fs.readdirSync(abs).sort()){
      const nextAbs=path.join(abs,name),nextRel=path.posix.join(rel,name),stat=fs.statSync(nextAbs);
      if(stat.isDirectory())walk(nextAbs,nextRel);else if(stat.isFile())rows.push(nextRel);
    }
  }
  for(const rel of roots){const abs=path.join(ROOT,rel);if(fs.existsSync(abs))walk(abs,rel)}
  return rows;
}
function productionSourceFingerprint(){
  assert.ok(FULL,'full source fingerprint requires gas-backend');
  const hash=crypto.createHash('sha256');
  for(const rel of productionReleaseFiles()){
    let text=fs.readFileSync(path.join(ROOT,rel),'utf8').replace(/\r\n/g,'\n').replace(RELEASE_FINGERPRINT_RE,'release-sha256-<SELF>');
    hash.update(rel);hash.update('\0');hash.update(text);hash.update('\0');
  }
  return 'release-sha256-'+hash.digest('hex');
}
function frontendSourceFingerprint(){
  const hash=crypto.createHash('sha256');
  for(const rel of productionReleaseFiles().filter(rel=>rel.startsWith('github-pages/'))){
    let text=fs.readFileSync(path.join(ROOT,rel),'utf8').replace(/\r\n/g,'\n')
      .replace(RELEASE_FINGERPRINT_RE,'release-sha256-<RELEASE>')
      .replace(FRONTEND_FINGERPRINT_RE,'frontend-sha256-<SELF>')
      .replace(MODULE_MANIFEST_RE,'modules-sha256-<BACKEND>');
    hash.update(rel);hash.update('\0');hash.update(text);hash.update('\0');
  }
  return 'frontend-sha256-'+hash.digest('hex');
}
function normalizedModuleSource(text){
  return text.replace(/\r\n/g,'\n')
    .replace(RELEASE_FINGERPRINT_RE,'release-sha256-<RELEASE>')
    .replace(MODULE_MANIFEST_RE,'modules-sha256-<MANIFEST>')
    .replace(MODULE_DIGEST_RE,'mod-sha256-<SELF>');
}
function backendModuleFingerprint(){
  assert.ok(FULL,'backend module fingerprint requires gas-backend');
  const rows=[];
  for(const entry of backendGsSources()){
    const re=new RegExp('\\["'+entry.name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'"\\]\\s*=\\s*"(mod-sha256-[0-9a-f]{64})"');
    const match=re.exec(entry.source);
    assert.ok(match,`module digest registration missing: ${entry.name}`);
    const actual='mod-sha256-'+crypto.createHash('sha256').update(normalizedModuleSource(entry.source)).digest('hex');
    assert.equal(match[1],actual,`module source digest drift: ${entry.name}`);
    rows.push(entry.name+'='+actual);
  }
  return 'modules-sha256-'+crypto.createHash('sha256').update(rows.join('\n')).digest('hex');
}
function configuredSourceFingerprint(text){return (text.match(/SOURCE_FINGERPRINT="([^"]+)"/)||[])[1]||''}
function configuredFrontendFingerprint(text){return (text.match(/FRONTEND_SOURCE_FINGERPRINT="([^"]+)"/)||[])[1]||''}
function configuredBackendModuleFingerprint(text){return (text.match(/BACKEND_MODULE_FINGERPRINT="([^"]+)"/)||[])[1]||''}

const index=file('github-pages/index.html');
const runtime=file('github-pages/app-critical-runtime.js');
const config=scriptById(index,'app-release-config-current');
const transport=file('github-pages/github-gas-transport.js');
const workflow=file('.github/workflows/pages.yml');

ok('single production release converges across public Pages files',()=>{
  assert.ok(index.includes('sri-required-r330'));
  assert.ok(index.includes('host-pinned-integrity-exempt-r330'));
  assert.ok(config.includes(RELEASE));assert.ok(config.includes(ASSET));assert.ok(config.includes(QUALITY));assert.ok(config.includes(RPC));
  assert.ok(config.includes('version:"1.3.1"'));
  assert.ok(!index.includes('CANONICAL GITHUB FRONTEND')&&!index.includes('PRODUCTION RELEASE FINGERPRINT'),'release metadata must not be duplicated in marker comments');
  assert.ok(!index.includes('clientRelease:"1.3.1"'),'dual-host contract must not duplicate the canonical release version');
  assert.ok(transport.includes('github-pages/github-gas-transport.js::rpc-r330::canonical-read-cache'));
});

ok('release-phase version debt is removed while RPC protocol remains explicit',()=>{
  const sources=[['index',index],['runtime',runtime],['config',config],['transport',transport],['workflow',workflow]];
  const phasePattern=/\bP[012](?:-[A-Z])?\b|\bp[012](?:[a-z]|-)[a-z0-9-]*\b|r331-v62|v62/gi;
  const stale=[];
  for(const [name,text] of sources)for(const token of text.match(phasePattern)||[])stale.push(`${name}:${token}`);
  assert.deepEqual(stale,[],'public release sources still contain historical phase/release markers');
  assert.ok(config.includes(RPC),'stable RPC protocol must remain explicit and independent of the release id');
});

ok('production source contains no historical phase/release markers',()=>{
  const phasePattern=/\bP[012](?:-[A-Z])?\b|\bp[012](?:[a-z]|-)[a-z0-9-]*\b|r331-v62|v62/gi;
  const stale=[];
  for(const rel of productionReleaseFiles()){
    const text=fs.readFileSync(path.join(ROOT,rel),'utf8');
    for(const token of text.match(phasePattern)||[])stale.push(`${rel}:${token}`);
  }
  assert.deepEqual(stale,[],'production source still contains historical phase/release markers');
  const retiredInternalPhaseLabels=['phase1FirstPaint','phase1LazyHydration','phase1-summary-kpi-first-paint','phase5-summary-kpi-first-paint','summary-kpi-payload-phase5','phaseF-dashboard-status-read-model-current'];
  const retiredHits=[];
  for(const rel of productionReleaseFiles()){
    const text=fs.readFileSync(path.join(ROOT,rel),'utf8');
    for(const token of retiredInternalPhaseLabels)if(text.includes(token))retiredHits.push(`${rel}:${token}`);
  }
  assert.deepEqual(retiredHits,[],'retired internal phase labels returned after canonical migration');
  const oldNumericRevisions=[];
  for(const rel of productionReleaseFiles()){
    const text=fs.readFileSync(path.join(ROOT,rel),'utf8');
    for(const token of text.match(/\br(?!330\b)\d{2,4}\b/g)||[])oldNumericRevisions.push(`${rel}:${token}`);
  }
  assert.deepEqual(oldNumericRevisions,[],'non-protocol numeric revision markers remain in production source');
});

ok('GAS endpoint is canonical /exec URL',()=>{
  const m=/GAS_URL=\"([^\"]+)\"/.exec(config);assert.ok(m&&/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(m[1]));
  assert.ok(index.includes('id="app-release-config-current"'));
  assert.ok(index.includes('./app-critical-runtime.js?v=1.3.1'));
  assert.ok(index.includes('./github-gas-transport.js?v=1.3.1'))
});

ok('SRI integrity preserved',()=>{
  assert.ok(index.includes('sha512-r22gChDnGvBylk90+2e/ycr3RVrDi8DIOkIGNhJlKfuyQM4tIRAI062MaV8sfjQKYVGjOBaZBOA87z+IhZE9DA=='));
  assert.ok(!index.includes('sha512-r330gCh'));
});

ok('RPC transport is fetch-only',()=>{
  assert.ok(transport.includes('w.AppTransport.run=run'));assert.ok(transport.includes('method:"POST",mode:"no-cors"'));
  for(const forbidden of ['MessageChannel','legacyRemote','runGasDirectBridge','runVercelProxy','runJsonpApi','createElement("form")','createElement("iframe")','warmAuthBridge','ensureBridgeClient','RPC_POST_SIGNAL_GRACE'])assert.ok(!transport.includes(forbidden),`retired token: ${forbidden}`)
});

ok('RPC ingress rejection and dashboard retry fail-fast are bounded',()=>{
  assert.ok(config.includes('RPC_READ_SERVER_OBSERVE_TIMEOUT_MS:12000'),'read RPC observe timeout must be explicit');
  for(const token of ['GAS_RPC_POST_NOT_OBSERVED','function unobservedReadError(rec)','rec.write||rec.serverObserved'])assert.ok(transport.includes(token),`read fail-fast missing: ${token}`);
  assert.ok(index.includes('lastSettledErrorCode=""'),'dashboard autostart must remember terminal transport failure');
  assert.ok(index.includes('deterministicError(lastSettledErrorCode)'),'empty-dashboard retry must stop on deterministic transport failures');
  if(FULL){
    const core=file('gas-backend/Code_00_PlatformCore.gs'),dashboard=file('gas-backend/Scripts_Page_Dashboard.html');
    for(const token of ['_githubRpcStoreRejectedEnvelope_','GITHUB_PAGES_ORIGIN_NOT_ALLOWED','GITHUB_RPC_CAPABILITY_INVALID','GITHUB_RPC_VERSION_MISMATCH'])assert.ok(core.includes(token),`backend reject envelope missing: ${token}`);
    assert.ok(dashboard.includes('v.code || v.errorCode || v.dashboardErrorCode'),'dashboard must preserve transport Error.code');
    assert.ok(dashboard.includes('dashboardDeterministicTransportError'),'dashboard deterministic retry guard missing');
    assert.ok(dashboard.includes('GAS_RPC_POST_NOT_OBSERVED'),'dashboard must suppress retry for unobserved POST');
  }
});

ok('frontend JavaScript syntax',()=>{jsSyntax(config,'index.html#app-release-config-current');jsSyntax(runtime,'app-critical-runtime.js');jsSyntax(transport,'github-gas-transport.js');htmlScripts(index).forEach((s,i)=>jsSyntax(s,`index.html#${i+1}`))});

ok('workflow separates deterministic regression from live GAS release attestation',()=>{
  assert.ok(workflow.includes('Run production automated regression suite (static, contract-aware)'));
  assert.ok(workflow.includes('gas_attestation:'));
  assert.ok(workflow.includes('Attest live GAS release before Pages deploy'));
  assert.ok(workflow.includes('needs: [regression, gas_attestation]'));
  assert.ok(workflow.includes("health.sourceFingerprint !== expectedFingerprint"));
  assert.ok(workflow.includes("payload.sourceFingerprint !== expectedFingerprint"));
  const regressionBlock=(workflow.match(/\n  regression:\n([\s\S]*?)(?=\n  gas_attestation:)/)||[])[1]||'';
  assert.ok(regressionBlock,'regression job block missing');
  for(const networkToken of ['github-rpc-health','apiSessionCheck','fetch(gas','script.google.com'])assert.ok(!regressionBlock.includes(networkToken),`static regression must not depend on live network: ${networkToken}`);
  assert.ok(workflow.includes('actions/checkout@v4'));assert.ok(workflow.includes('actions/configure-pages@v5'));assert.ok(workflow.includes('actions/upload-pages-artifact@v3'));assert.ok(workflow.includes('actions/deploy-pages@v4'));assert.ok(workflow.includes('workflow_dispatch:'));
});

ok('regression mode contract matches repository scope',()=>{
  if(FULL){
    assert.ok(fs.existsSync(BACKEND_DIR),'--full requires gas-backend source');
    for(const rel of ['gas-backend/appsscript.json','gas-backend/Code_20_Router.gs','gas-backend/Index.html'])assert.ok(fs.existsSync(path.join(ROOT,rel)),`full mode missing backend entrypoint: ${rel}`);
  }
});

ok('Pages deployment publishes frontend directory only',()=>{
  assert.ok(/actions\/upload-pages-artifact@v3[\s\S]*?with:\s*[\s\S]*?path:\s*\.\/github-pages(?:\s|$)/.test(workflow),'Pages artifact must be restricted to ./github-pages');
});

ok('tracking domain has one canonical source owner',()=>{
  if(!FULL)return;
  const rel='gas-backend/Code_31B_Domain_Tracking.gs';
  const source=file(rel);
  const bytes=Buffer.from(source,'utf8');
  assert.ok(bytes.length<90000,`${rel} unexpectedly exceeds canonical size budget`);
  const names=[...source.matchAll(/^function\s+([A-Za-z_$][\w$]*)\s*\(/gm)].map(m=>m[1]);
  const counts=new Map();
  for(const name of names)counts.set(name,(counts.get(name)||0)+1);
  const duplicates=[...counts].filter(([,count])=>count>1).map(([name,count])=>`${name}:${count}`);
  assert.deepEqual(duplicates,[],'duplicate top-level tracking function owner(s)');
  if(bytes.length%2===0){
    const half=bytes.length/2;
    assert.ok(!bytes.subarray(0,half).equals(bytes.subarray(half)),'tracking source must not be duplicated byte-for-byte');
  }
  for(const owner of ['_getTrackingCore_','_Domain_getLetters','deleteLetter','saveLetter','apiGetLetters','apiSaveLetter','apiDeleteLetter','_getTrackingMaterializedCore_']){
    assert.equal(counts.get(owner),1,`canonical tracking owner missing or duplicated: ${owner}`);
  }
});

ok('backend GAS source syntax remains valid',()=>{
  if(!FULL)return;
  for(const entry of backendGsSources())jsSyntax(entry.source,entry.rel);
});

ok('backend canonical owner source audit is derived from actual GAS source',()=>{
  if(!FULL)return;
  const files=backendGsSources(),functions=topLevelFunctionInventory(files),byName=new Map();
  for(const fn of functions){const list=byName.get(fn.name)||[];list.push(`${fn.file}:${fn.line}`);byName.set(fn.name,list)}
  const duplicateOwners=[...byName.entries()].filter(([,owners])=>owners.length>1).map(([name,owners])=>({name,owners}));
  assert.deepEqual(duplicateOwners,[],'duplicate top-level GAS function owner(s)');

  const bodyGroups=new Map();
  for(const fn of functions){
    const normalized=normalizeFunctionBody(fn.source);
    if(normalized.length<80)continue;
    const list=bodyGroups.get(normalized)||[];list.push(`${fn.name}@${fn.file}:${fn.line}`);bodyGroups.set(normalized,list);
  }
  const duplicateBodies=[...bodyGroups.values()].filter(owners=>owners.length>1);
  assert.deepEqual(duplicateBodies,[],'actionable exact duplicate GAS function body group(s)');

  const revisionOwners=functions.filter(fn=>/(?:^|_)(?:r\d{2,3}|v\d+|legacy|old|deprecated)(?:_|$)/i.test(fn.name)).map(fn=>`${fn.name}@${fn.file}:${fn.line}`);
  assert.deepEqual(revisionOwners,[],'revision/legacy implementation owner(s) must not coexist');

  const retiredAliases=['apiGetCases','apiBudgetListByFYFast'];
  const retiredDeclared=retiredAliases.filter(name=>byName.has(name));
  assert.deepEqual(retiredDeclared,[],'retired API alias declaration(s) returned');

  const quality=file('gas-backend/Code_06_Platform_QualityGates.gs');
  assert.ok(quality.includes('sourceAuditMode: "ci-source-derived"'));
  assert.ok(quality.includes('sourceAuditOwner: ".github/tests/regression.mjs"'));
  assert.ok(!quality.includes('serverTopLevelDuplicateFunctionCount: 0'),'runtime quality gate must not publish hard-coded source audit counts');
  assert.ok(quality.includes('automatedRegressionSuite: !0'));
  console.log(`# backend source audit: ${files.length} GS files, ${functions.length} unique top-level function owners, duplicate owners=0, duplicate bodies=0, revision owners=0, retired aliases=0`);
});

ok('backend router handler permission and write-CSRF contracts have static parity',()=>{
  if(!FULL)return;
  const router=file('gas-backend/Code_20_Router.gs'),quality=file('gas-backend/Code_06_Platform_QualityGates.gs');
  const files=backendGsSources(),functions=topLevelFunctionInventory(files),byName=new Map();
  for(const fn of functions){const list=byName.get(fn.name)||[];list.push(fn);byName.set(fn.name,list)}
  const surface=staticRouteSurface(router),routeEntries=Object.entries(surface.routes),routeNames=routeEntries.map(([name])=>name).sort();
  assert.deepEqual(surface.duplicates,[],'route is declared by multiple canonical route-source owners');

  const expectedRouteCount=Number((quality.match(/expectedRouteCount:\s*(\d+)/)||[])[1]||0);
  const expectedWriteRouteCount=Number((quality.match(/expectedWriteRouteCount:\s*(\d+)/)||[])[1]||0);
  assert.equal(routeNames.length,expectedRouteCount,'static router count drift vs quality contract');

  const missingHandlers=routeNames.filter(name=>(byName.get(name)||[]).length!==1).map(name=>({name,owners:(byName.get(name)||[]).map(fn=>`${fn.file}:${fn.line}`)}));
  assert.deepEqual(missingHandlers,[],'route ↔ top-level handler owner parity failed');

  const writes=routeEntries.filter(([,route])=>route.meta.write===true),writeWithoutCsrf=writes.filter(([,route])=>route.meta.csrf!==true).map(([name])=>name),publicWrites=routeEntries.filter(([,route])=>route.meta.public===true&&route.meta.write===true).map(([name])=>name),missingRole=routeEntries.filter(([,route])=>!String(route.meta.minRole||'').trim()).map(([name])=>name);
  assert.equal(writes.length,expectedWriteRouteCount,'static write-route count drift vs quality contract');
  assert.deepEqual(writeWithoutCsrf,[],'write route without CSRF contract');
  assert.deepEqual(publicWrites,[],'public write route is forbidden');
  assert.deepEqual(missingRole,[],'route without explicit minimum role');

  const retiredAliases=['apiGetCases','apiBudgetListByFYFast'];
  assert.deepEqual(routeNames.filter(name=>retiredAliases.includes(name)),[],'retired API alias returned to active route surface');
  const apiOwners=functions.filter(fn=>/^api[A-Z]/.test(fn.name)).map(fn=>fn.name).sort();
  const allowedUnrouted=new Set(['apiRouter']);
  const unexpectedUnrouted=apiOwners.filter(name=>!surface.routes[name]&&!allowedUnrouted.has(name));
  assert.deepEqual(unexpectedUnrouted,[],'new unrouted api* facade bypasses canonical route registry');

  const permission=file('gas-backend/Code_02_Platform_Permissions.gs');
  assert.ok(permission.includes('APP_PERMISSION_MATRIX'),'canonical permission matrix missing');
  assert.ok(router.includes('AppBackendMiddleware.requirePermission'),'router permission middleware missing');
  assert.ok(router.includes('AppBackendMiddleware.requireCsrf'),'router CSRF middleware missing');
  assert.ok(router.includes('_permissionRequiredRoleForApi_'),'router ↔ permission matrix role resolution missing');
  console.log(`# backend route audit: routes=${routeNames.length}, handlers=${routeNames.length}, writes=${writes.length}, csrfWrites=${writes.length}, publicWrites=0, routeSources=${JSON.stringify(surface.sourceCounts)}`);
});

ok('release readiness, transport and deployment boundary are canonical',()=>{
  assert.ok(workflow.match(/if: github\.event_name != 'pull_request' && github\.ref == 'refs\/heads\/main'/g)?.length>=3,'all live/deploy jobs must be main-only');
  assert.ok(!workflow.includes("if: github.event_name != 'pull_request'\n"),'unscoped deploy guard remains');
  if(!FULL)return;
  const core=file('gas-backend/Code_00_PlatformCore.gs'),router=file('gas-backend/Code_20_Router.gs'),auth=file('gas-backend/Code_10_Security_Auth.gs'),manifest=file('gas-backend/appsscript.json');
  const surface=staticRouteSurface(router),routeNames=new Set(Object.keys(surface.routes));
  const policy=(core.match(/var APP_RELEASE_POLICY_CURRENT = Object\.freeze\(\{([\s\S]*?)\n\}\);\nfunction _safeScriptProp_/ )||[])[1]||'';
  assert.ok(policy,'release policy source block missing');
  const requiredMatch=/requiredRoutes:\s*Object\.freeze\(\[([\s\S]*?)\]\)/.exec(policy);
  const required=requiredMatch?[...requiredMatch[1].matchAll(/"([^"]+)"/g)].map(m=>m[1]):[];
  assert.ok(required.length>=6,'release policy route set unexpectedly small');
  assert.deepEqual(required.filter(name=>!routeNames.has(name)),[],'release readiness requires a route not present in canonical Router');
  assert.ok(routeNames.has('apiGetReleaseReadiness'),'canonical release readiness route missing');
  assert.ok(!/apiGetPhase[0-9]|apiGetPhase4QaGate/.test(core+router),'retired phase API remains');
  for(const token of ['github-bridge','github-api-post','legacyBridgeAvailable','APP_GITHUB_BRIDGE_VERSION','XFrameOptionsMode.ALLOWALL'])assert.ok(!core.includes(token),`retired legacy transport remains: ${token}`);
  assert.ok(core.includes('transportMode: "api-router-fetch-only"'),'backend release transport mode must be fetch-only');
  assert.ok(core.includes('ContentService.createTextOutput("/**/" + callback + "("'),'GAS JSONP producer must match the workflow/browser callback framing contract');
  assert.ok(workflow.includes("const prefix = '/**/'+callback+'('")&&workflow.includes("prefix='/**/'+resultCallback+'('")&&workflow.includes("prefix='/**/'+callback+'('") ,'workflow JSONP parser framing drift');
  assert.ok(core.includes('backendModuleAttestation: _backendRuntimeModuleAttestation_()'),'GAS health must attest loaded backend modules');
  assert.ok(core.includes('frontendSourceFingerprint: APP_DEPLOY_RELEASE.frontendSourceFingerprint'),'GAS health must bind the expected frontend source fingerprint');
  assert.ok(core.includes('release.backendModules'),'release readiness must block on backend module attestation');
  assert.ok(!manifest.includes('userinfo.email'),'unused userinfo.email OAuth scope remains');
  const defaultRounds=Number((auth.match(/_SECURE_PASSWORD_ROUNDS_\s*=\s*(\d+)/)||[])[1]||0);
  assert.ok(defaultRounds>=7200,'new password hashes must use hardened default rounds');
});

ok('all write routes converge on the canonical root write gateway and recovery ledger',()=>{
  if(!FULL)return;
  const router=file('gas-backend/Code_20_Router.gs'),core=file('gas-backend/Code_00_PlatformCore.gs'),repo=file('gas-backend/Code_01_Platform_SheetRepo.gs'),budgetFacade=file('gas-backend/Code_36_Domain_Budget_Facade.gs');
  const surface=staticRouteSurface(router),writes=Object.entries(surface.routes).filter(([,route])=>route.meta.write===true).map(([name])=>name).sort();
  const callGraph=staticTopLevelCallGraph(backendGsSources()),missingGateway=[];
  for(const method of writes){
    if(method==='apiBudgetSaveImport'||method==='apiBudgetDeleteImport')continue;
    const path=staticCallPath(callGraph.graph,method,'writeGateway_');
    if(!path)missingGateway.push({method,file:callGraph.fileByName[method]||'',calls:callGraph.graph[method]||[]});
  }
  assert.deepEqual(missingGateway,[],'write route without a static path to canonical writeGateway_');
  for(const [method,member,owner] of [
    ['apiBudgetSaveImport','BudgetDomain.saveImport','_budgetSaveImportDomainOwner_'],
    ['apiBudgetDeleteImport','BudgetDomain.deleteImport','_budgetDeleteImportDomainOwner_']
  ]){
    assert.ok((callGraph.sourceByName[method]||'').includes(member),`${method} must delegate through ${member}`);
    assert.ok(new RegExp(member.replace('.','\\.')+'\\s*=\\s*function[\\s\\S]{0,180}'+owner).test(budgetFacade),`${member} must resolve to ${owner}`);
    assert.ok(staticCallPath(callGraph.graph,owner,'writeGateway_'),`${owner} must enter canonical writeGateway_`);
  }
  const gateway=extractNamedFunctionSource(core,'writeGateway_'),domainWrite=extractNamedFunctionSource(core,'domainWrite_'),flush=extractNamedFunctionSource(core,'_cacheLedgerFlush_');
  assert.ok(gateway.includes('_writeGatewayResetInvalidationQueue_(writeName)'),'root write must start with a fresh invalidation ledger');
  assert.ok(gateway.includes('_writeGatewayInvalidateAfterWrite_(writeName, payload, normalized)'),'successful root write must flush cache invalidation');
  assert.ok(gateway.includes('failed-result-after-repository-mutation'),'failed-result mutation recovery missing');
  assert.ok(gateway.includes('exception-after-repository-mutation'),'exception mutation recovery missing');
  assert.ok(domainWrite.includes('if (!_writeGatewayIsActive_())')&&domainWrite.includes('writeGateway_(name, payload, handler'),'domainWrite_ must join or create the root gateway');
  assert.ok(domainWrite.includes('domainWriteJoinedRoot = !0'),'nested domain write join metadata missing');
  assert.ok(flush.includes('_bumpEntityCacheStamps_(allStampKeys)'),'ledger must batch durable cache generation bumps');
  assert.ok(flush.includes('_requestScopeReset_'),'ledger must clear request-scope reads after mutation');
  assert.ok(repo.includes('_writeGatewayShouldDeferInvalidation_')&&repo.includes('_writeGatewayQueueInvalidationDomain_'),'repository invalidation must defer into the active root write ledger');
  assert.ok(repo.includes('AppRepository.setRangeValues')&&repo.includes('AppRepository.invalidateDomain(String(options && options.domain || sheetName || "").toLowerCase())'),'canonical repository setRangeValues mutation must invalidate unless explicitly deferred by caller');
  console.log(`# write-gateway audit: writes=${writes.length}, canonicalGateway=${writes.length}, rootFlush=1, failedMutationRecovery=2`);
});

ok('write invalidation contracts close over backend cache domains and frontend refresh dependencies',()=>{
  if(!FULL)return;
  const router=file('gas-backend/Code_20_Router.gs'),core=file('gas-backend/Code_00_PlatformCore.gs'),lifecycle=file('gas-backend/Runtime_01_Request_Lifecycle.html');
  const surface=staticRouteSurface(router),writeRoutes=Object.entries(surface.routes).filter(([,route])=>route.meta.write===true).map(([name])=>name).sort();
  const contract=staticDataContract(core),writeMethods=Object.entries(contract.methods).filter(([,spec])=>spec.write).map(([name])=>name).sort(),ledger=staticCacheLedgerContract(core),issues=[];
  assert.deepEqual(writeMethods,writeRoutes,'write route set must exactly equal APP_DATA_CONTRACT_CURRENT write method set');
  for(const method of writeMethods){
    const spec=contract.methods[method];
    if(!spec.cacheEntity||!contract.entities[spec.cacheEntity])issues.push({method,code:'CACHE_ENTITY_MISSING',cacheEntity:spec.cacheEntity});
    if(!spec.mutationEntity)issues.push({method,code:'MUTATION_ENTITY_MISSING'});
    if(!spec.invalidates.length)issues.push({method,code:'INVALIDATION_SET_EMPTY'});
    if(!spec.pages.length)issues.push({method,code:'AFFECTED_PAGES_EMPTY'});
    const expectedPages=[];
    for(const entity of spec.invalidates){
      const entitySpec=contract.entities[entity];
      if(!entitySpec){issues.push({method,code:'INVALIDATION_ENTITY_UNKNOWN',entity});continue;}
      for(const page of entitySpec.pages||[])if(!expectedPages.includes(page))expectedPages.push(page);
      const canonical=ledger.canonical(entity);
      if(!ledger.profiles[canonical])issues.push({method,code:'CACHE_LEDGER_PROFILE_MISSING',entity,canonical});
    }
    const missingPages=expectedPages.filter(page=>!spec.pages.includes(page));
    if(missingPages.length)issues.push({method,code:'FRONTEND_REFRESH_DEPENDENCY_GAP',missingPages,actualPages:spec.pages,invalidates:spec.invalidates});
  }
  assert.deepEqual(issues,[],'write cache invalidation / frontend refresh contract drift');
  for(const token of ['var EVENT_NAME = "app:data:mutated"','function mutationSpec(methodName)','function clearPageCaches(detail)','function scheduleMutationRefresh(detail)','forceFresh: true, noCache: true, bypassCache: true','root.AppMutationCoordinator = mutationApi'])assert.ok(lifecycle.includes(token),`mutation coordinator contract missing: ${token}`);
  assert.ok(lifecycle.includes('var contract = mutationSpec(method);'),'successful API result must resolve exact mutation contract');
  assert.ok(lifecycle.includes('detail.affectedPages.indexOf(page) < 0'),'only dependency-affected active pages should auto-refresh');
  assert.ok(index.includes('"Runtime_01_Request_Lifecycle"'),'GitHub appCore must load the canonical mutation coordinator from GAS assets');
  console.log(`# cache-refresh audit: writeContracts=${writeMethods.length}, invalidationProfiles=closed, frontendDependencyGaps=0`);
});

ok('explicit no-invalidate repository writes preserve mutation recovery signals',()=>{
  if(!FULL)return;
  const tracking=file('gas-backend/Code_31B_Domain_Tracking.gs'),meeting=file('gas-backend/Code_31_Domain_Meeting.gs'),budget=file('gas-backend/Code_35_Domain_Budget_Admin.gs'),budgetRead=file('gas-backend/Code_34_Domain_Budget_ReadModels.gs'),people=file('gas-backend/Code_33_Domain_People.gs');
  const letterHeaders=extractNamedFunctionSource(tracking,'_letterSaveEnsureHeadersD_'),letterPersist=extractNamedFunctionSource(tracking,'_letterSavePersistD_'),meetingPersist=extractNamedFunctionSource(meeting,'_meetingSavePersistD_'),meetingFallback=extractNamedFunctionSource(meeting,'_meetingDeleteSheetFallback_'),budgetSchema=extractNamedFunctionSource(budget,'_budgetFastWriteSchemaGate_'),salarySave=extractNamedFunctionSource(budgetRead,'saveSalarySettings'),peopleHeaders=extractNamedFunctionSource(people,'_peopleEnsureHeadersForDirectWrite_'),peopleUpsert=extractNamedFunctionSource(people,'_peopleUpsertResilient_');
  assert.ok(letterHeaders.includes('invalidate: !1')&&letterHeaders.includes('invalidateSheetCache_("Letters")'),'Letters header mutation must queue invalidation before later steps can fail');
  assert.ok(letterPersist.includes('invalidate: !1')&&letterPersist.includes('_letterSaveInvalidateE_'),'Letters row mutation must reconcile caches explicitly');
  assert.ok(meetingPersist.includes('invalidate: !1')&&meetingPersist.includes('_meetingSaveInvalidateD_'),'Meeting row mutation must reconcile caches explicitly');
  assert.ok(meetingFallback.includes('invalidate: !1')&&meetingFallback.includes('invalidateSheetCache_("MeetingLogs")'),'Meeting fallback mutation must signal the ledger after each suppressed direct write');
  assert.ok(budgetSchema.includes('invalidate: !1')&&budgetSchema.includes('invalidateSheetCache_("BudgetImports")'),'Budget schema repair must reconcile caches explicitly');
  assert.ok(salarySave.includes('invalidate: !1')&&salarySave.includes('invalidateSheetCache_("SalarySettings")'),'SalarySettings schema/data mutation must signal invalidation before later steps can fail');
  assert.ok(peopleHeaders.includes('invalidate: !1')&&peopleHeaders.includes('invalidateSheetCache_(sheetName)'),'People header mutation must queue invalidation before later steps can fail');
  assert.ok(peopleUpsert.includes('invalidate: !1')&&peopleUpsert.includes('invalidateSheetCache_(sheetName)'),'People resilient direct write must reconcile caches explicitly');
});


ok('read paths honor canonical fresh mode and generation-stamped dependencies',()=>{
  const transportFresh = [
    'function freshRequest(a,opt)',
    'a.forceFresh===true',
    'a.noCache===true',
    'a.bypassCache===true',
    'a.bypassRequestCache===true',
    'mode==="fresh"',
    'mode==="afterwrite"',
    'if(key&&read&&!fresh)',
    'if(read&&!fresh)cacheSet(key,fn,v)'
  ];
  for(const token of transportFresh)assert.ok(transport.includes(token),`client fresh-cache bypass missing: ${token}`);
  if(!FULL)return;
  const cache=file('gas-backend/Code_05_Repository_Cache_Performance.gs'),
        search=file('gas-backend/Code_31D_Domain_Case_ReadModels.gs'),
        dashboard=file('gas-backend/Code_31C_Domain_Dashboard.gs'),
        meeting=file('gas-backend/Code_31_Domain_Meeting.gs'),
        tracking=file('gas-backend/Code_31B_Domain_Tracking.gs'),
        people=file('gas-backend/Code_33_Domain_People.gs'),
        budget=file('gas-backend/Code_36_Domain_Budget_Facade.gs');
  const sheetCache=extractNamedFunctionSource(cache,'cachedSheetObjects_'),
        sheetFingerprint=extractNamedFunctionSource(cache,'_sheetCacheGenerationFingerprint_'),
        caseScope=extractNamedFunctionSource(search,'_caseSearchIndexScope_'),
        caseRead=extractNamedFunctionSource(search,'_caseSearchReadMaterializedIndex_'),
        dashAllowed=extractNamedFunctionSource(dashboard,'_dashboardBundleCacheAllowedD_'),
        meetingRead=extractNamedFunctionSource(meeting,'_meetingReadThrough_'),
        trackingRead=extractNamedFunctionSource(tracking,'_trackingReadMaterializedIndex_'),
        peopleKey=extractNamedFunctionSource(people,'_peoplePageBundleCacheKey_'),
        peopleCache=extractNamedFunctionSource(people,'_peopleBundleTryCacheD_'),
        budgetKey=extractNamedFunctionSource(budget,'_budgetHotSummaryCacheKey_');
  assert.ok(sheetCache.includes('_appCacheNormalizeRequest_')&&/bypass\s*=\s*_appIsFnName_\("_appCacheBypassRequested_"\)\s*\?\s*_appCacheBypassRequested_\(normalized\)/.test(sheetCache),'sheet-object cache must honor canonical cache request mode');
  assert.ok(sheetCache.includes('if (!bypass)')&&sheetCache.includes('_sheetCacheGenerationFingerprint_'),'sheet-object cache must bypass both reads/writes and use generation key');
  assert.ok(sheetFingerprint.includes('_sheetEntityCacheKeys_')&&sheetFingerprint.includes('_entityCacheStamp_'),'sheet cache generation fingerprint must derive from source entity stamps');
  assert.ok(cache.includes('AppDataService.readSheetModel = AppDataService.readSheetModel || function')&&cache.includes('cacheGeneration: generation')&&cache.includes('return !bypass && AppDataService.cachePut'),'readSheetModel must be generation-stamped and avoid writes in fresh mode');
  assert.ok(cache.includes('AppDataService.readCaseSearchModel = AppDataService.readCaseSearchModel || function')&&cache.includes('meetingLogsStamp: payload.includeMeetingHistory'),'case search read model must include MeetingLogs generation');
  assert.ok(/meetingLogsStamp\s*:/.test(caseScope)&&caseScope.includes('_entityCacheStamp_("meetinglogs")'),'materialized case-search key must include MeetingLogs generation');
  assert.ok(caseRead.includes('_appCacheBypassRequested_'),'case search hot read must honor canonical fresh mode');
  assert.ok(dashAllowed.includes('_appCacheBypassRequested_'),'dashboard cache must honor canonical fresh mode');
  assert.ok(meetingRead.includes('_appCacheBypassRequested_'),'meeting read cache must honor canonical fresh mode');
  assert.ok(trackingRead.includes('_appCacheBypassRequested_'),'tracking read cache must honor canonical fresh mode');
  assert.ok(peopleKey.includes('"salarypayments"')&&peopleKey.includes('"personnel"'),'people bundle key must include salary/payment dependency generations');
  assert.ok(peopleCache.includes('_appCacheBypassRequested_'),'people bundle cache must honor canonical fresh mode');
  assert.ok(/SalaryPayments:\s*\[\s*"salarypayments"/m.test(cache),'SalaryPayments sheet invalidation must bump salarypayments generation');
  assert.ok(budgetKey.includes('_entityCacheStamp_("budget")')&&budgetKey.includes('_entityCacheStamp_("budgetimports")'),'budget hot key must stay generation-stamped');
  console.log('# read-cache audit: Dashboard/Search/Meeting/Tracking/People/Budget fresh-mode parity=closed, source-stamp gaps=0');
});

ok('async reads enforce latest-request-wins and reject transport-empty responses',()=>{
  if(!FULL)return;
  const lifecycle=file('gas-backend/Runtime_01_Request_Lifecycle.html'),
        dashboard=file('gas-backend/Scripts_Page_Dashboard.html'),
        meeting=file('gas-backend/Scripts_Page_Meeting.html'),
        report=file('gas-backend/Scripts_Page_ReportTrack.html'),
        petitioner=file('gas-backend/Scripts_Page_Petitioner.html'),
        people=file('gas-backend/Scripts_Page_People.html'),
        budget=file('gas-backend/Scripts_Page_Budget.html');
  assert.ok(lifecycle.includes('var dedupKey = !write && !latestOnly && method ? requestKey(method, payload) : "";'),'latest-only reads must not reuse an older same-payload in-flight request');
  assert.ok(lifecycle.includes('emptyResponsesRejected: 0')&&lifecycle.includes('function emptyReadResponse(value)')&&lifecycle.includes('EMPTY_READ_RESPONSE_REJECTED'),'request lifecycle must reject opt-in transport-empty read responses');
  for(const token of ['delete cloned.rejectEmptyResponse','delete cloned.requireResponse','delete cloned.emptyResponseContract'])assert.ok(lifecycle.includes(token),`client-only admission control leaked toward server: ${token}`);
  assert.ok(lifecycle.includes('isStaleError: isStaleError'),'canonical stale classifier must be exported for page consumers/diagnostics');
  assert.ok(dashboard.includes('requestLane: "dashboard-main"')&&dashboard.includes('rejectEmptyResponse: !0')&&dashboard.includes('if (token !== state.loadToken)\n                return state.data || !1;'),'Dashboard stale completion must be non-destructive');
  assert.ok(report.includes('latestOnly: !prefetch')&&report.includes('requestLane: "report" === mode ? "report-main" : "search-main"'),'Search/Report main reads must use separate latest-only lanes');
  assert.ok(report.includes('var fetchBaseKey = cacheBaseKey;')&&report.includes('if (state.pageCacheBaseKey === fetchBaseKey) state.pageCache[String(entry.page)] = entry;'),'stale Search/Report prefetch must not poison the new query page cache');
  assert.ok(meeting.includes('__meetingEditCaseRequestSeq')&&meeting.includes('function editRequestIsCurrent()'),'Meeting case editor must suppress older case hydration');
  assert.ok(meeting.includes('__meetingRelatedRequestSeq')&&meeting.includes('function relatedRequestIsCurrent()'),'Meeting related history/letter bundle must suppress older case rendering');
  assert.ok(meeting.includes('requestLane: "committee-meeting-list"')&&meeting.includes('requestSeq !== listState.requestSeq'),'Committee meeting list stale errors must not overwrite the current list');
  assert.ok(meeting.includes('__committeeMeetingEditSeq')&&meeting.includes('__committeeMeetingSummarySeq'),'Committee meeting edit/summary reads must have latest-request guards');
  assert.ok(petitioner.includes('requestLane:"petitioner-list"')&&petitioner.includes('requestSeq!==window.__petitionerLoadSeq||err&&'),'Petitioner stale failures must be non-destructive');
  assert.ok(people.includes('state.requestSeqByTab=state.requestSeqByTab||{}')&&people.includes('requestLane:"people-"+tab'),'People force-refresh must not be overwritten by an older per-tab response');
  assert.ok(people.includes('state.inFlightByTab[tab]===request&&(state.inFlightByTab[tab]=null)'),'old People finally handlers must not clear a newer in-flight request');
  assert.ok(budget.includes('budgetState._summaryRequestSeq=summaryRequestSeq')&&budget.includes('requestLane:"budget-summary"'),'Budget summary must have a canonical latest-only request lane');
  assert.ok(budget.includes('budgetState._summaryPromise===summaryRequest&&(budgetState._summaryPromise=null)'),'old Budget summary finally handlers must not clear a newer request');
  for(const [name,html] of [['Dashboard',dashboard],['Meeting',meeting],['ReportTrack',report],['Petitioner',petitioner],['People',people],['Budget',budget]])
    htmlScripts(html).forEach((body,i)=>jsSyntax(body,`gas-backend/Scripts_Page_${name}.html#${i+1}`));
  console.log('# async-read audit: critical lanes=Dashboard/Search/Report/Meeting/Petitioner/People/Budget, stale UI overwrite gaps=0, transport-empty admission=guarded');
});

ok('session/auth and route transitions suppress obsolete request contexts',()=>{
  if(!FULL)return;
  const lifecycle=file('gas-backend/Runtime_01_Request_Lifecycle.html'),
        critical=file('gas-backend/Scripts_Critical_Login_Runtime.html'),
        gasIndex=file('gas-backend/Index.html');
  for(const token of [
    'var contextEpoch = { auth: 0, route: 0 }',
    'function contextSnapshot()',
    'function bumpContext(kind, reason)',
    'function assertRequestContext(method, captured, write)',
    'clearInFlightForContextChange()',
    'contextStaleSuppressed: 0',
    'authContextBumps: 0',
    'routeContextBumps: 0',
    'doc.addEventListener("app:user-changed"',
    'doc.addEventListener("app:page-changing"',
    'assertRequestContext(method, requestContext, write)',
    'bumpContext: bumpContext',
    'contextSnapshot: contextSnapshot'
  ])assert.ok(lifecycle.includes(token),`lifecycle context guard missing: ${token}`);
  assert.ok(lifecycle.includes('Object.keys(inFlight).forEach(function (key) { delete inFlight[key]; })'),'auth/route context changes must invalidate single-flight reuse');
  assert.ok(lifecycle.includes('Object.keys(laneEpoch).forEach(function (lane)'),'auth/route context changes must invalidate latest-only lanes');
  assert.ok(critical.includes('bumpContext("auth","login-attempt")'),'explicit login must fence requests from the prior auth context before apiLogin');
  assert.ok(critical.includes('bumpContext("auth","session-resume-attempt")'),'session resume must fence requests from the prior auth context before apiSessionResume');
  assert.ok(critical.includes('bumpContext("auth","logout-clear-auth")'),'logout must fence authenticated requests before local auth state is cleared');
  assert.ok(gasIndex.includes('function runPageActivation(id,generation)')&&gasIndex.includes('if(!activationIsCurrent(id,generation))return Promise.resolve(!1)'),'route activation must be generation-bound');
  assert.ok(gasIndex.includes('app:page-changing')&&gasIndex.includes('generation:generation'),'route transitions must publish generation context before page activation');
  console.log('# session-route context audit: auth epoch=login/resume/logout, route epoch=page-changing, in-flight reuse reset=guarded, activation generation=guarded');
});

ok('production end-to-end production reliability / performance gate is release-blocking and non-destructive',()=>{
  const measurement=scriptById(index,'app-production-measurement-gate-current');
  if(FULL){
    const gasIndex=file('gas-backend/Index.html');
    assert.equal(measurement,scriptById(gasIndex,'app-production-measurement-gate-current'),'production measurement owner must remain exact dual-host parity');
  }
  for(const token of [
    'CRITICAL_E2E_STEPS = Object.freeze(["login","dashboard","search","editor","meeting","tracking","save","refresh","logout"])',
    '"critical-e2e": 1','"session-resume-to-dashboard": 3','"logout-to-login": 3',
    'prepareProductionE2E','PREPARE_PRODUCTION_E2E','productionReliabilityStatus','productionMethodStarted(method,input)','productionMethodSucceeded(method,input,response)',
    'isFreshInput(input)','critical-e2e-timeout','login-dashboard-timeout','route-transition-timeout','resume-dashboard-timeout','logout-login-timeout',
    'noCredentialLogging:true','noPayloadLogging:true'
  ])assert.ok(measurement.includes(token),`client production gate missing: ${token}`);
  assert.ok(measurement.includes('method==="apiSaveCase"||method==="apiSaveMeetingLog"||method==="apiSaveLetter"'),'critical journey must observe a canonical production save without generating one');
  assert.ok(measurement.includes('CRITICAL_E2E_STEPS[criticalStep]==="refresh"&&isFreshInput(input)'),'production save must be followed by a verified fresh read');
  assert.ok(!measurement.includes('password:'),'production evidence must never embed credentials');
  if(FULL){
    const core=file('gas-backend/Code_00_PlatformCore.gs'), quality=file('gas-backend/Code_06_Platform_QualityGates.gs');
    for(const token of [
      '"critical-e2e": 1','"session-resume-to-dashboard": 3','"logout-to-login": 3',
      'requiredJourneys: Object.freeze(["login-to-dashboard", "route-transition", "critical-e2e", "session-resume-to-dashboard", "logout-to-login"])',
      'journeyBudgets: Object.freeze({ "login-to-dashboard": 30000, "route-transition": 3000, "critical-e2e": 0, "session-resume-to-dashboard": 30000, "logout-to-login": 5000 })',
      'plan.journeyBudgets && plan.journeyBudgets[name]'
    ])assert.ok(core.includes(token),`server release gate missing: ${token}`);
    for(const token of ['endToEndProductionReliabilityGate: !0','criticalJourneySequenceAudit: !0','journeyTimeoutAdmissionAudit: !0','postDeploySmokeGate: !0','production-e2e-reliability-performance-contract'])
      assert.ok(quality.includes(token),`production quality contract missing: ${token}`);
  }
  for(const token of ['production_smoke:','needs: deploy','page_url: ${{ steps.deployment.outputs.page_url }}','Post-deploy dual-host release / performance smoke','pageMaxMs>8000','health.ms>20000','rpcRoundTripMs>45000'])
    assert.ok(workflow.includes(token),`post-deploy CI smoke missing: ${token}`);
  console.log('# production gate: critical flow=9 ordered steps, observed writes only, fresh-after-write required, resume/logout timed, post-deploy Pages+GAS smoke enabled');
});

ok('immutable release fingerprint and dual-deploy attestation remain source-derived',()=>{
  const configured=configuredSourceFingerprint(config), frontendConfigured=configuredFrontendFingerprint(config), backendModulesConfigured=configuredBackendModuleFingerprint(config);
  assert.match(configured,/^release-sha256-[0-9a-f]{64}$/,'release source fingerprint format');
  assert.match(frontendConfigured,/^frontend-sha256-[0-9a-f]{64}$/,'frontend source fingerprint format');
  assert.match(backendModulesConfigured,/^modules-sha256-[0-9a-f]{64}$/,'backend module fingerprint format');
  assert.equal(frontendConfigured,frontendSourceFingerprint(),'frontend fingerprint must be source-derived even in frontend-only mode');
  assert.ok(config.includes('sourceFingerprint:SOURCE_FINGERPRINT'));
  for(const token of ['gas_attestation:','needs: [regression, gas_attestation]','health.releaseStamp !== expectedRelease','health.sourceFingerprint !== expectedFingerprint','health.frontendSourceFingerprint !== expectedFrontend','payload.releaseStamp !== expectedRelease || payload.sourceFingerprint !== expectedFingerprint || payload.frontendSourceFingerprint !== expectedFrontend','deployedFingerprint!==expectedFingerprint','deployed index.html SHA-256 mismatch','deployed critical runtime SHA-256 mismatch','deployed transport SHA-256 mismatch'])assert.ok(workflow.includes(token),`workflow attestation missing: ${token}`);
  if(FULL){
    const core=file('gas-backend/Code_00_PlatformCore.gs'),gasIndex=file('gas-backend/Index.html'),quality=file('gas-backend/Code_06_Platform_QualityGates.gs');
    const coreFingerprint=(core.match(/sourceFingerprint:\s*"([^"]+)"/)||[])[1]||'';
    const derived=productionSourceFingerprint();
    assert.equal(configured,derived,'committed production fingerprint must equal deterministic production source SHA-256');
    assert.equal(coreFingerprint,derived,'GAS release fingerprint must equal frontend release fingerprint');
    const moduleDerived=backendModuleFingerprint();
    const coreModule=(core.match(/APP_BACKEND_MODULE_MANIFEST_FINGERPRINT = "([^"]+)"/)||[])[1]||'';
    assert.equal(backendModulesConfigured,moduleDerived,'frontend backend-module fingerprint must match all GAS modules');
    assert.equal(coreModule,moduleDerived,'GAS backend-module manifest fingerprint drift');
    for(const token of ['releaseStamp: APP_DEPLOY_RELEASE.stamp','sourceFingerprint: APP_DEPLOY_RELEASE.sourceFingerprint','frontendSourceFingerprint: APP_DEPLOY_RELEASE.frontendSourceFingerprint','immutableReleaseFingerprintAudit: !0','dualDeployAttestationAudit: !0','liveGasReleaseMatchRequiredBeforePagesDeploy: !0','productionSmokeReleaseMatchRequired: !0'])assert.ok(core.includes(token)||quality.includes(token),`backend attestation contract missing: ${token}`);
  }
  console.log('# production release fingerprint: '+configured);
});

ok('dual-host release and reliability owners stay aligned',()=>{
  if(!FULL)return;
  const gasIndex=file('gas-backend/Index.html');
  assert.ok(index.includes('id="app-dual-host-release-contract-current"'));
  assert.ok(gasIndex.includes('id="app-dual-host-release-contract-current"'));
  for(const id of [
    'app-meeting-status-normalizer-compat-current','app-route-loading-controller-current','app-critical-foundation-consumer',
    'login-after-logout-no-refresh-fix-currentStamp','app-production-measurement-gate-current','app-production-quality-gate-f5-r330',
    'app-upfront-runtime-owner-r330','app-login-dashboard-autostart-current','app-meeting-deferred-compat-current',
    'app-session-resume-persist-current','app-session-resume-boot-isolation-current','app-track-filter-fast-dispatch-current','app-ai-chat-search-current'
  ])assert.equal(scriptById(gasIndex,id),scriptById(index,id),`dual-host owner drift: ${id}`);
  assert.equal(scriptContaining(gasIndex,'function startVueBootstrap()'),scriptContaining(index,'function startVueBootstrap()'),'dual-host Vue/navigation bootstrap drift');
  for(const id of ['tpl-page-track','tpl-page-report','tpl-page-meeting','tpl-page-people','tpl-page-petitioner','tpl-page-budget','tpl-page-admin'])
    assert.equal(normalizeHostTemplate(scriptById(gasIndex,id)),normalizeHostTemplate(scriptById(index,id)),`dual-host template drift: ${id}`);
  assert.equal(normalizeHostTemplate(scriptById(gasIndex,'tpl-vue3-root')),normalizeHostTemplate(scriptById(index,'tpl-vue3-root')),'dual-host shell template drift');
  assert.equal(normalizeHostTemplate(scriptById(gasIndex,'tpl-page-search')),normalizeHostTemplate(scriptById(index,'tpl-page-search')),'dual-host search template drift');
  assert.ok(gasIndex.includes('__APP_EAGER_DASHBOARD_PRELOAD__=true'));
  assert.ok(gasIndex.includes('id="app-page-loading-state"'));
  assert.ok(gasIndex.includes('dashboard.transientEmptyRetry'));
  assert.ok(gasIndex.includes('__APP_SESSION_RESUME_BOOT_ISOLATION_CURRENT__="r330"'));
  assert.ok(!gasIndex.includes('./github-gas-transport.js'));
  assert.ok(!gasIndex.includes('id="github-commissioner-proposer-owner-current"'));
  assert.ok(!gasIndex.includes('id="github-ai-duplicate-model-fallback-current"'));
  htmlScripts(gasIndex).forEach((body,i)=>jsSyntax(body,`gas-backend/Index.html#${i+1}`));
});

ok('client permission fallbacks and page aliases delegate to the canonical permission matrix',()=>{
  assert.ok(runtime.includes('function normalizePageCrit(v){try{return root2.AppPermissionMatrix&&__appIsFn(root2.AppPermissionMatrix.normalizePage)?root2.AppPermissionMatrix.normalizePage(v)'),'critical runtime canonical page normalizer missing');
  assert.ok(runtime.includes('if(!canPageCrit(navKey,role))return void 0;'),'critical navigation must delegate permission decisions to AppPermissionMatrix.canPage');
  for(const forbidden of ['role==="Viewer"&&navKey','role==="Staff"&&navKey','navKey!=="budget"','p==="personnel"&&(p="people")','(p=txt(p).toLowerCase())==="dash"'])assert.ok(!runtime.includes(forbidden),`hard-coded client permission/page fallback remains: ${forbidden}`);
  assert.ok(runtime.includes('function listFor(p){var a;return p=normalizePageCrit(p),canPageCrit(p,resolveNavRoleCrit())'),'deferred asset lookup must use canonical page normalization');
  assert.ok(runtime.includes('function loadPage(p){var n=normalizePageCrit(p);if(!canPageCrit(n,resolveNavRoleCrit()))'),'deferred page loader must use canonical page normalization');
  const matrixMatch=index.match(/window\.__APP_PERMISSION_MATRIX__=(\{[^\n]+\});/);
  assert.ok(matrixMatch,'GitHub embedded permission matrix missing');
  const frontendMatrix=JSON.parse(matrixMatch[1]);
  assert.equal(frontendMatrix.stamp,'permission-matrix-current');
  assert.deepEqual(frontendMatrix.roles.Viewer.pages,['dashboard','search'],'Viewer page contract drift');
  assert.ok(!frontendMatrix.roles.Viewer.pages.includes('budget'),'Viewer must not receive budget page access');
  assert.ok(frontendMatrix.roles.Staff.pages.includes('budget')&&!frontendMatrix.roles.Staff.pages.includes('admin'),'Staff boundary drift');
  assert.deepEqual(frontendMatrix.pageAliases,{dash:'dashboard',personnel:'people',committee:'committee-meeting',committeemeeting:'committee-meeting',committee_meeting:'committee-meeting',tracking:'track'},'client page aliases drift');
  if(FULL){
    const permission=file('gas-backend/Code_02_Platform_Permissions.gs'),gasCritical=file('gas-backend/Scripts_Critical_Login_Runtime.html'),quality=file('gas-backend/Code_06_Platform_QualityGates.gs');
    assert.ok(permission.includes('stamp: "permission-matrix-current"'),'backend permission matrix stamp drift');
    for(const token of ['pages: ["dashboard", "search"]','budget: "Staff"','"admin-users": "Admin"','dash: "dashboard"','personnel: "people"'])assert.ok(permission.includes(token),`backend canonical permission contract missing: ${token}`);
    assert.ok(gasCritical.includes('if(!canPageCrit(navKey,role))return void 0;'),'GAS critical runtime permission fallback drift');
    assert.ok(gasCritical.includes('function loadPage(p){var n=normalizePageCrit(p);if(!canPageCrit(n,resolveNavRoleCrit()))'),'GAS deferred loader page alias drift');
    for(const forbidden of ['role==="Viewer"&&navKey','role==="Staff"&&navKey','navKey!=="budget"'])assert.ok(!gasCritical.includes(forbidden),`GAS hard-coded permission branch remains: ${forbidden}`);
    for(const token of ['canonicalPermissionFallbackAudit: !0','clientPageAliasCanonicalAudit: !0','permissionMatrixDualHostParityAudit: !0','legacyPermissionBranchCount: 0','critical-runtime-canonical-delegation'])assert.ok(quality.includes(token),`permission quality contract missing: ${token}`);
  }
});

ok('CSP/PWA and dead-metadata/navigation consolidation stay canonical',()=>{
  const cspToken='data-app-csp="production-compatible-baseline"';
  assert.ok(index.includes(cspToken),'GitHub CSP baseline missing');
  for(const token of ["script-src 'self' 'unsafe-inline' 'unsafe-eval'","https://script.google.com","object-src 'none'","base-uri 'self'","upgrade-insecure-requests"])assert.ok(index.includes(token),`GitHub CSP compatibility token missing: ${token}`);
  assert.ok(index.includes("sizes:'any',type:'image/svg+xml',purpose:'any maskable'"),'GitHub PWA icon must declare the actual SVG MIME type');
  for(const dead of ['png96','png192','png512','__APP_UPFRONT_INCLUDED_SCRIPTS__','data-nav="dash"','data-nav="personnel"'])assert.ok(!index.includes(dead),`dead GitHub alias remains: ${dead}`);
  const bootMatch=index.match(/window\.__APP_BOOTSTRAP__=(\{[^\n]+\});/);assert.ok(bootMatch,'minimal GitHub bootstrap missing');
  const boot=JSON.parse(bootMatch[1]);assert.deepEqual(Object.keys(boot).sort(),['appStamp','assetStamp','defaultRoute','page','sourceFingerprint'].sort(),'GitHub bootstrap metadata regrew');
  assert.equal(boot.appStamp,RELEASE);assert.equal(boot.assetStamp,ASSET);
  const manifestMatch=index.match(/window\.__APP_ASSET_MANIFEST__=(\{[^\n]+\});/);assert.ok(manifestMatch,'GitHub asset manifest missing');
  const manifest=JSON.parse(manifestMatch[1]);assert.deepEqual(Object.keys(manifest).sort(),['assetPolicy','bundles','chunks','stamp'].sort(),'GitHub asset manifest dead metadata regrew');
  assert.equal(manifest.stamp,ASSET);assert.ok(!Object.hasOwn(manifest.chunks,'personnel'),'personnel chunk alias must remain canonicalized to people');
  assert.deepEqual(Object.keys(manifest.assetPolicy).sort(),['contractFingerprint','stamp'],'GitHub manifest must not duplicate the full AppAssetPolicy registry');
  assert.ok(index.includes('function canonicalPageId(id){var m=window.AppPermissionMatrix,p=m&&__appIsFn(m.normalizePage)?m.normalizePage(id)'),'inline page canonicalization must delegate to AppPermissionMatrix');
  assert.ok(index.includes("publish('__APP_DEFERRED_SCRIPTS__',(window.__APP_ASSET_MANIFEST__&&window.__APP_ASSET_MANIFEST__.chunks)||{}"),'deferred-map duplicate fallback must remain removed');
  if(FULL){
    const gasIndex=file('gas-backend/Index.html'),assets=file('gas-backend/Code_03_Platform_Assets.gs'),quality=file('gas-backend/Code_06_Platform_QualityGates.gs');
    assert.ok(gasIndex.includes(cspToken),'GAS CSP baseline missing');
    assert.ok(gasIndex.includes("sizes:'any',type:'image/svg+xml',purpose:'any maskable'"),'GAS PWA SVG MIME contract missing');
    for(const dead of ['png96','png192','png512','__APP_UPFRONT_INCLUDED_SCRIPTS__','data-nav="dash"','data-nav="personnel"'])assert.ok(!gasIndex.includes(dead),`dead GAS Index alias remains: ${dead}`);
    const assetManifestSource=extractNamedFunctionSource(assets,'getAppAssetManifest_');assert.ok(assetManifestSource.includes('assetPolicy: { stamp: String(policy.stamp || ""), contractFingerprint: String(policy.contractFingerprint || "") }'),'server manifest must carry only the asset-policy attestation reference');
    for(const dead of ['sourceOwner:', 'upfrontScripts:', 'templates:', 'externalGroups:', 'externalAssets:', 'personnel: ['])assert.ok(!assetManifestSource.includes(dead),`dead server asset-manifest metadata remains: ${dead}`);
    const logoSource=extractNamedFunctionSource(assets,'getAppLogoConfig_');for(const dead of ['png96','png192','png512','svg:','inline:','source:'])assert.ok(!logoSource.includes(dead),`dead logo metadata remains: ${dead}`);assert.ok(logoSource.includes('return { active: active };'),'server logo config must expose one canonical active owner');
    for(const token of ['cspCompatibilityAudit: !0','pwaManifestMimeAudit: !0','deadBootstrapMetadataPrunedAudit: !0','deadAssetManifestMetadataPrunedAudit: !0','canonicalNavigationAliasAudit: !0','redundantLogoAliasCount: 0'])assert.ok(quality.includes(token),`production quality contract missing: ${token}`);
  }
});

ok('artifact performance budgets',()=>{
  assert.ok(Buffer.byteLength(index,'utf8')<=460000,'index.html exceeds production 460 KB budget');
  assert.ok(Buffer.byteLength(runtime,'utf8')<=95000,'critical runtime exceeds 95 KB budget');
  assert.ok(Buffer.byteLength(transport,'utf8')<=15000,'transport exceeds 15 KB budget');
  assert.ok(Buffer.byteLength(config,'utf8')<=3000,'inline release config exceeds 3 KB budget');
  const blocks=htmlScripts(index);
  assert.ok(blocks.length<=55,'too many executable inline script blocks');
  assert.ok(Math.max(...blocks.map(x=>Buffer.byteLength(x,'utf8')))<=60000,'single inline script exceeds production 60 KB budget');
});

ok('production preserves canonical external runtime order and file count',()=>{
  assert.ok(index.includes('<script id="app-release-config-current">'),'release config must execute before transport');
  const configPos=index.indexOf('id="app-release-config-current"'), transportPos=index.indexOf('src="./github-gas-transport.js?v=1.3.1"'), foundationPos=index.indexOf('id="app-critical-foundation-consumer"'), runtimePos=index.indexOf('src="./app-critical-runtime.js?v=1.3.1"'), logoutPos=index.indexOf('id="login-after-logout-no-refresh-fix-currentStamp"');
  assert.ok(configPos>=0&&transportPos>configPos&&foundationPos>transportPos&&runtimePos>foundationPos&&logoutPos>runtimePos,'critical runtime execution order drift');
  assert.equal((runtime.match(/__APP_CRITICAL_LOGIN_RUNTIME_READY__/g)||[]).length,2,'external critical runtime owner marker count drift');
  assert.ok(runtime.includes('if(!root2.__APP_CRITICAL_LOGIN_RUNTIME_READY__){root2.__APP_CRITICAL_LOGIN_RUNTIME_READY__=!0'),'external critical runtime owner guard missing');
  assert.ok(runtime.includes('logoutExecute'),'external critical runtime appears incomplete');
  assert.ok(!index.includes('root2.__APP_CRITICAL_LOGIN_RUNTIME_READY__'),'critical runtime body must not remain inline in Index');
  if(FULL){const quality=file('gas-backend/Code_06_Platform_QualityGates.gs');for(const token of ['githubCriticalRuntimeExternalizedAudit: !0','githubIndexGodHtmlReductionAudit: !0','externalRuntimeExecutionOrderPreservedAudit: !0'])assert.ok(quality.includes(token),`external-runtime quality contract missing: ${token}`)}
});

ok('browser security primitives are constrained',()=>{
  for(const [label,text] of [['index',index],['runtime',runtime],['transport',transport],['config',config]]){
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
  assert.ok(index.includes('function settle(){cancelIdle();if(active)return;idleTimer=setTimeout(function(){if(!active)done()},600)}'));
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
  assert.ok(transport.includes('GAS_RPC_POST_FAILED'));
  assert.ok(transport.includes('GAS_RPC_RESULT_TIMEOUT'));
  assert.ok(transport.includes('GAS_RPC_WRITE_UNCONFIRMED'));
  assert.ok(transport.includes('Promise.race([result,postFail])'));
  assert.ok(transport.includes('app:transport:rpc-trace'));
  assert.ok(transport.includes('failureKind'));
  assert.ok(transport.includes('serverObserved'));
  assert.ok(!transport.includes('LAST_TRACE=Object.assign({},rec'));
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

ok('repository remains minimal and deployment-safe',()=>{
  const publicFiles=fs.readdirSync(path.join(ROOT,'github-pages')).sort();
  assert.deepEqual(publicFiles,['app-critical-runtime.js','github-gas-transport.js','index.html']);
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


ok('search edit journey keeps meeting status normalizer available',()=>{
  assert.ok(index.includes('id="app-meeting-status-normalizer-compat-current"'));
  assert.ok(index.includes('w.normalizeMeetingStatusValue=function'));
  assert.ok(index.includes('__APP_MEETING_STATUS_NORMALIZER_COMPAT_CURRENT__="r330-open-editor"'));
  assert.ok(index.includes('/^กมธ\\.\\s*พิจารณา$/'));
});

ok('deferred meeting compatibility remains available',()=>{
  assert.ok(index.includes('id="app-meeting-deferred-compat-current"'));
  assert.ok(index.includes('w.__Scripts_Page_Meeting_setVal=function'));
  assert.ok(index.includes('w.__APP_MEETING_DEFERRED_COMPAT_CURRENT__="r330"'));
});

ok('session resume is persisted from normalized login responses',()=>{
  assert.ok(index.includes('id="app-session-resume-persist-current"'));
  assert.ok(index.includes('__sessionResumePersistCurrent'));
  assert.ok(index.includes('resume.save(data)'));
  assert.ok(index.includes('/^api(?:Login|SessionResume)$/i'));
  assert.ok(index.includes('id="app-session-resume-boot-isolation-current"'));
  assert.ok(index.includes('__sessionResumeBootIsolationCurrent'));
  assert.ok(index.includes('session.resume.bootMainUi.background'));
  assert.ok(index.includes('w.__APP_SESSION_RESUME_IN_FLIGHT__'));
});

ok('session resume survives login-route reloads unless logout is explicit',()=>{
  assert.ok(runtime.includes('/(?:\\?|&)_logout=/.test(location.search||"")||root2.__APP_LOGGED_OUT_LOCK__||criticalReadyHasActiveSession()'));
  assert.ok(runtime.includes('(/(?:\\?|&)_logout=/.test(location.search||"")||root2.__APP_LOGGED_OUT_LOCK__)&&(clearResume(),clearFields()'));
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

ok('tracking filters dispatch without reloading deferred page assets',()=>{
  assert.ok(index.includes('id="app-track-filter-fast-dispatch-current"'));
  assert.ok(index.includes('pages.dispatchAction("filterTrack",target,ev'));
  assert.ok(index.includes('track-filter-fast-dispatch-r330'));
  assert.ok(index.includes('ev.stopImmediatePropagation()'));
});

ok('login starts the Dashboard data controller automatically',()=>{
  assert.ok(index.includes('id="app-login-dashboard-autostart-current"'));
  assert.ok(index.includes('__APP_LOGIN_DASHBOARD_AUTOSTART_CURRENT__="current"'));
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
  assert.ok(config.includes(RELEASE));
  assert.ok(config.includes(ASSET))
});

console.log(`# ${passed} regression groups passed (production v1.3.1, RPC r330 protocol)`);
