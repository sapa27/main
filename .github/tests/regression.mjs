#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT = process.cwd();
const FULL = !process.argv.includes('--frontend-only');
const REV = 'r330';
const REV_UP = 'R330';
const RELEASE = 'commission-v1.2-p2a-ci-regression-suite-2026-08-20-r330';
const ASSET = 'asset-manifest-r330-ci-regression-suite';
const QUALITY = 'current-quality-gate-r330';
const RPC = 'github-pages-rpc-r330';
let passed = 0;

function file(rel) {
  const p = path.join(ROOT, rel);
  assert.ok(fs.existsSync(p), `missing file: ${rel}`);
  return fs.readFileSync(p, 'utf8');
}
function ok(name, fn) {
  try { fn(); passed++; console.log(`ok ${passed} - ${name}`); }
  catch (e) { console.error(`not ok - ${name}`); throw e; }
}
async function okAsync(name, fn) {
  try { await fn(); passed++; console.log(`ok ${passed} - ${name}`); }
  catch (e) { console.error(`not ok - ${name}`); throw e; }
}
function contains(text, needle, label=needle) { assert.ok(text.includes(needle), `missing: ${label}`); }
function notContains(text, needle, label=needle) { assert.ok(!text.includes(needle), `forbidden: ${label}`); }
function count(text, re) { return [...text.matchAll(re)].length; }
function stripNonRevision(text) {
  return text
    .replace(/(?:sha256|sha384|sha512)-[A-Za-z0-9+/=]+/gi, '<HASH>')
    .replace(/https?:\/\/[^\s\"'<>`]+/gi, '<URL>');
}
function extractFunction(src, name) {
  const marker = `function ${name}(`;
  const start = src.indexOf(marker);
  assert.ok(start >= 0, `function not found: ${name}`);
  const tail = src.slice(start + marker.length);
  const next = /\nfunction [A-Za-z0-9_$]+\(/.exec(tail);
  return next ? src.slice(start, start + marker.length + next.index) : src.slice(start);
}

function jsSyntax(src, label) { new vm.Script(src, {filename: label}); }
function htmlScripts(html) {
  const out=[]; const re=/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi; let m;
  while ((m=re.exec(html))) {
    const attrs=m[1]||'', type=(attrs.match(/\btype=[\"']([^\"']+)[\"']/i)||[])[1]||'';
    if (type && !/(?:javascript|ecmascript|module)/i.test(type)) continue;
    let body=m[2].replace(/<\?(?:!=|=)?[\s\S]*?\?>/g,'null');
    if (body.trim()) out.push(body);
  }
  return out;
}

const index = file('github-pages/index.html');
const config = file('github-pages/app-config.js');
const transport = file('github-pages/github-gas-transport.js');
const workflow = file('.github/workflows/pages.yml');

ok('frontend release convergence', () => {
  for (const [name,text] of [['index',index],['config',config],['workflow',workflow]]) {
    assert.ok(text.toLowerCase().includes(REV), `missing: ${name} ${REV}`);
  }
  contains(index, RELEASE); contains(index, ASSET); contains(index, QUALITY);
  contains(index, 'app-config.js?v=r330'); contains(index, 'github-gas-transport.js?v=r330');
  contains(config, RELEASE); contains(config, ASSET); contains(config, RPC);
});

ok('single application revision in public deployment files', () => {
  const stale=[];
  for (const [name,text] of [['index',index],['config',config],['transport',transport],['workflow',workflow]]) {
    for (const token of stripNonRevision(text).match(/r\d{2,3}/gi)||[]) if (token.toLowerCase()!==REV) stale.push(`${name}:${token}`);
  }
  assert.deepEqual(stale, []);
});

ok('SRI integrity regression guard', () => {
  contains(index, 'sha512-r22gChDnGvBylk90+2e/ycr3RVrDi8DIOkIGNhJlKfuyQM4tIRAI062MaV8sfjQKYVGjOBaZBOA87z+IhZE9DA==', 'XLSX canonical SRI');
  notContains(index, 'sha512-r330gCh', 'release must not rewrite XLSX SRI');
  const executable = [...index.matchAll(/<script[^>]+src=[\"'][^\"']+[\"'][^>]*>/gi)].map(m=>m[0]).filter(t=>!/fonts\.google/i.test(t));
  for (const tag of executable) if (/cdn\.jsdelivr|unpkg|cdnjs/i.test(tag)) assert.match(tag, /\bintegrity=[\"'][^\"']+[\"']/i, `CDN script missing SRI: ${tag.slice(0,120)}`);
});

ok('transport is RPC fetch-only without retired bridge fallback', () => {
  contains(transport, 'w.AppTransport.run=run');
  contains(transport, 'method:"POST",mode:"no-cors"');
  for (const forbidden of ['MessageChannel','legacyRemote','runGasDirectBridge','runVercelProxy','runJsonpApi','createElement("form")','createElement("iframe")','warmAuthBridge','ensureBridgeClient','RPC_POST_SIGNAL_GRACE']) notContains(transport, forbidden);
});

ok('frontend JavaScript syntax', () => {
  jsSyntax(config, 'app-config.js'); jsSyntax(transport, 'github-gas-transport.js');
  htmlScripts(index).forEach((s,i)=>jsSyntax(s,`github-pages/index.html#${i+1}`));
});

await okAsync('transport behavior: health negotiation, RPC POST/result, and in-flight read dedupe', async () => {
  let fetchCount=0, healthCount=0, resultCount=0;
  const w={location:{origin:'https://example.github.io'},APP_GITHUB_CONFIG:{GAS_WEB_APP_URL:'https://script.google.com/macros/s/TEST_DEPLOYMENT/exec',RPC_VERSION:RPC,RPC_HEALTH_TIMEOUT_MS:4500,RPC_RESULT_POLL_MIN_MS:450,RPC_RESULT_POLL_MAX_MS:2200,REQUEST_TIMEOUT_MS:90000},APP_CONFIG:{},GAS_WEB_APP_URL:'',URLSearchParams,Promise,Date,Math,Uint8Array,Error,setTimeout,clearTimeout};
  w.window=w; w.globalThis=w; w.fetch=async()=>{fetchCount++;return {ok:true};};
  const d={documentElement:{},createElement:()=>({async:false,referrerPolicy:'',src:'',parentNode:null,onerror:null}),head:null};
  d.head={appendChild(sc){sc.parentNode=d.head; const u=new URL(sc.src); const cb=u.searchParams.get('callback'); const mode=u.searchParams.get('mode'); if(mode==='github-rpc-health'){healthCount++; queueMicrotask(()=>w[cb]({allowedOrigin:true,transportVersion:RPC}));} else if(mode==='github-rpc-result'){resultCount++; queueMicrotask(()=>w[cb]({transportOk:true,ok:true,result:{ok:true,value:42}}));} return sc;},removeChild(){}};
  const ctx={window:w,document:d,URL,URLSearchParams,Promise,Date,Math,Uint8Array,Error,setTimeout,clearTimeout,queueMicrotask,console}; vm.createContext(ctx); vm.runInContext(transport,ctx,{filename:'github-gas-transport.js'});
  const p1=w.AppTransport.run('apiGetDashboardBundle',{scope:'same'}); const p2=w.AppTransport.run('apiGetDashboardBundle',{scope:'same'});
  const [a,b]=await Promise.all([p1,p2]); assert.equal(a.value,42); assert.equal(b.value,42); assert.equal(healthCount,1); assert.equal(fetchCount,1); assert.equal(resultCount,1);
});

if (FULL) {
  const backend = path.join(ROOT,'gas-backend');
  assert.ok(fs.existsSync(backend), 'full regression requires gas-backend/');
  const gsFiles = fs.readdirSync(backend).filter(n=>n.endsWith('.gs')).sort();
  const htmlFiles = fs.readdirSync(backend).filter(n=>n.endsWith('.html')).sort();

  ok('GAS source inventory is canonical', () => {
    assert.equal(gsFiles.length, 21, 'unexpected .gs file count');
    assert.equal(htmlFiles.length, 16, 'unexpected GAS .html file count including Index');
    for (const retired of ['GitHub_Bridge.html','Runtime_09_QA_Regression.html']) assert.ok(!fs.existsSync(path.join(backend,retired)), `retired file returned: ${retired}`);
  });

  ok('GAS and HTML syntax', () => {
    for (const n of gsFiles) jsSyntax(file(`gas-backend/${n}`), n);
    for (const n of htmlFiles) htmlScripts(file(`gas-backend/${n}`)).forEach((s,i)=>jsSyntax(s,`${n}#${i+1}`));
  });

  ok('single application revision across full production source', () => {
    const files=[];
    for (const dir of ['gas-backend','github-pages']) for (const n of fs.readdirSync(path.join(ROOT,dir))) if (fs.statSync(path.join(ROOT,dir,n)).isFile()) files.push(path.join(dir,n));
    files.push('.github/workflows/pages.yml');
    const stale=[];
    for (const rel of files) for (const token of stripNonRevision(file(rel)).match(/r\d{2,3}/gi)||[]) if (token.toLowerCase()!==REV) stale.push(`${rel}:${token}`);
    assert.deepEqual(stale, []);
  });

  ok('quality gate declares automated CI and route contract', () => {
    const q=file('gas-backend/Code_06_Platform_QualityGates.gs');
    contains(q, 'automatedRegressionSuite: !0'); contains(q, 'ciRegressionOwner: ".github/tests/regression.mjs"');
    contains(q, 'expectedRouteCount: 102'); contains(q, 'expectedWriteRouteCount: 27'); contains(q, QUALITY);
  });

  ok('router registry behavior: 102 routes, 27 writes, zero duplicate/public writes, CSRF on every write', () => {
    const src=file('gas-backend/Code_20_Router.gs');
    const ctx={console}; ctx.globalThis=ctx; ctx._appIsFnName_=n=>typeof ctx[n]==='function'; vm.createContext(ctx); vm.runInContext(src,ctx,{filename:'Code_20_Router.gs'});
    const routes=ctx._apiRouteRegistry_();
    assert.equal(Object.keys(routes).length,102); assert.equal(Object.values(routes).filter(m=>m&&m.write).length,27);
    assert.equal(ctx._routerRouteSourceDuplicateReport_().duplicateCount,0);
    assert.deepEqual(Object.entries(routes).filter(([,m])=>m&&m.write&&m.public===true).map(([n])=>n),[]);
    assert.deepEqual(Object.entries(routes).filter(([,m])=>m&&m.write&&m.csrf!==true).map(([n])=>n),[]);
  });

  ok('Auth production-strict password and session security contract', () => {
    const src=file('gas-backend/Code_10_Security_Auth.gs');
    const fn=extractFunction(src,'validatePasswordPolicy_');
    const ctx={_authSecurityProfile_:()=>({minPasswordLength:12,passwordHashRequired:true})}; vm.createContext(ctx); vm.runInContext(fn,ctx);
    assert.throws(()=>ctx.validatePasswordPolicy_('short1'));
    assert.throws(()=>ctx.validatePasswordPolicy_('abcdefghijkl'));
    assert.equal(ctx.validatePasswordPolicy_('SecurePass123'),true);
    contains(src,'SESSION_HMAC_UNAVAILABLE'); contains(src,'SESSION_HMAC_SECRET_INVALID');
    contains(src,'rateLimitEnabled: !0'); contains(src,'sessionBindingStrict: !0'); contains(src,'plainPasswordAllowed: !1');
  });

  ok('Budget numeric and fiscal-period helpers preserve Thai financial rules', () => {
    const src=file('gas-backend/Code_32_Domain_Budget.gs');
    const code=[extractFunction(src,'_budgetToNumber_'),extractFunction(src,'_budgetFiscalYearRange_'),extractFunction(src,'_budgetMonthOverlapCount_')].join('\n');
    const ctx={_b32FY_:v=>String(v??'')}; vm.createContext(ctx); vm.runInContext(code,ctx);
    assert.equal(ctx._budgetToNumber_('๑,๒๓๔.๕๐'),1234.5);
    assert.equal(ctx._budgetToNumber_('(1,250.00)'),-1250);
    assert.equal(ctx._budgetToNumber_('ไม่มีข้อมูล'),0);
    const fy=ctx._budgetFiscalYearRange_('2569'); assert.equal(fy.start.getFullYear(),2025); assert.equal(fy.start.getMonth(),9); assert.equal(fy.end.getFullYear(),2026); assert.equal(fy.end.getMonth(),8);
    assert.equal(ctx._budgetMonthOverlapCount_(new Date(2025,9,1),new Date(2026,8,30),fy.start,fy.end),12);
    assert.equal(ctx._budgetMonthOverlapCount_(new Date(2026,0,1),new Date(2026,2,31),fy.start,fy.end),3);
  });

  ok('Case identity remains canonical on ลำดับเรื่อง/caseNum with no title-or-name fallback', () => {
    const src=file('gas-backend/Code_30_Domain_Cases.gs');
    contains(src,'CaseIdentity.primaryKey = "caseNum/ลำดับเรื่อง"');
    contains(src,'CaseIdentity.technicalIdentity = "caseId"');
    contains(src,'titleOrPetitionerFallback: !1');
    const fn=extractFunction(src,'_requireUniqueCaseBySequence_');
    contains(fn,'selectKeyField: "caseNum"'); contains(fn,'selectionMode: "primary-key-case-sequence"'); contains(fn,'selectionFallbackOnEmpty: !1');
  });

  ok('read-path policy rejects persistent Sheet writes on normal/force-fresh reads', () => {
    const src=file('gas-backend/Code_05_Repository_Cache_Performance.gs');
    const fn=extractFunction(src,'_persistentSummarySnapshotWriteContext_');
    const ctx={}; vm.createContext(ctx); vm.runInContext(fn,ctx);
    assert.equal(ctx._persistentSummarySnapshotWriteContext_({}), '');
    assert.equal(ctx._persistentSummarySnapshotWriteContext_({forceFresh:true,noCache:true,bypassCache:true}), '');
    assert.equal(ctx._persistentSummarySnapshotWriteContext_({afterWrite:true}), 'after-write');
    assert.equal(ctx._persistentSummarySnapshotWriteContext_({__snapshotRefreshAfterInvalidation:true}), 'snapshot-refresh-after-invalidation');
    contains(src,'persistentSheetWritesOnRead: !1'); contains(src,'documentLockOnNormalRead: !1');
  });

  ok('repository exact-key authoritative-empty guard behavior', () => {
    const src=file('gas-backend/Code_01_Platform_SheetRepo.gs');
    const code=[extractFunction(src,'_repositorySelectionNormalizeValue_'),extractFunction(src,'_repositorySelectionValues_'),extractFunction(src,'_repositoryProjectedSelectionSeed_')].join('\n');
    const ctx={APP_REPOSITORY_HOT_PATH_CURRENT:{maxSelectorValues:250}}; vm.createContext(ctx); vm.runInContext(code,ctx);
    assert.equal(ctx._repositoryProjectedSelectionSeed_({selectKeyField:'caseNum',selectKeyValues:['1'],selectionMode:'primary-key-case-sequence',selectionFallbackOnEmpty:true}).fallbackOnEmpty,false);
    assert.equal(ctx._repositoryProjectedSelectionSeed_({selectKeyField:'id',selectKeyValues:['X'],selectionMode:'technical-fk-legacy',selectionFallbackOnEmpty:true}).fallbackOnEmpty,false);
  });

  ok('Meeting parent read is bounded and chunks selectors at 200', () => {
    const src=file('gas-backend/Code_31_Domain_Meeting.gs');
    const code=[extractFunction(src,'_meetingHistoryUniqueMeetingIds_'),extractFunction(src,'_meetingHistoryReadCommitteeParentsByIds_')].join('\n');
    const calls=[];
    const ctx={_c30A_:Array.isArray,_meetingHistoryFields_:()=>['meetingId'],_s_:v=>String(v??''),isSoftDeletedRow_:()=>false,_caseDomainSharedRows_:(sheet,fields,opt)=>{calls.push({...opt});return (opt.selectKeyValues||[]).filter(x=>x!=='M2').map(x=>({meetingId:x,id:x}));}};
    vm.createContext(ctx); vm.runInContext(code,ctx);
    assert.equal(ctx._meetingHistoryReadCommitteeParentsByIds_([],false).length,0); assert.equal(calls.length,0);
    ctx._meetingHistoryReadCommitteeParentsByIds_(['M1','M2','M1'],false); assert.equal(calls[0].selectKeyField,'meetingId'); assert.equal(calls[0].selectionFallbackOnEmpty,false); assert.deepEqual(Array.from(calls[0].selectKeyValues),['M1','M2']); assert.equal(calls[1].selectKeyField,'id'); assert.deepEqual(Array.from(calls[1].selectKeyValues),['M2']);
    calls.length=0; ctx._caseDomainSharedRows_=(sheet,fields,opt)=>{calls.push({...opt});return (opt.selectKeyValues||[]).map(x=>({meetingId:x,id:x}));};
    ctx._meetingHistoryReadCommitteeParentsByIds_(Array.from({length:401},(_,i)=>`M${i+1}`),false); assert.deepEqual(calls.map(c=>c.selectKeyValues.length),[200,200,1]);
  });

  ok('P0-A/P0-B canonical single-pass and authoritative-empty contracts remain intact', () => {
    const search=file('gas-backend/Scripts_Page_ReportTrack.html');
    const meeting=file('gas-backend/Scripts_Page_Meeting.html');
    contains(search,'__singlePassEdit: !0'); contains(search,'__reuseCanonicalBundle: !0');
    contains(search,'authoritativeRelated = bundle.relatedLoadOk === !0');
    contains(meeting,'seed.__singlePassEdit === !0'); contains(meeting,'seed.__reuseCanonicalBundle === !0');
    contains(meeting,'authoritativeRelated = bundle.relatedLoadOk === !0');
  });

  ok('Meeting Search-Edit first paint suppresses case-list and lookup preload', () => {
    const s=file('gas-backend/Scripts_Page_Meeting.html');
    contains(s,'seed.__fromSearchEdit === !0'); contains(s,'seed.__singlePassEdit === !0'); contains(s,'seed.__reuseCanonicalBundle === !0');
    assert.match(s,/!searchEditFastPath\s*&&\s*S\(\s*["']page:meeting\.lookup-options["']/);
    assert.match(s,/!searchEditFastPath\s*&&\s*!1\s*!==\s*t\.reload[\s\S]{0,180}meetingRefreshCases/);
  });

  ok('People page has one canonical read owner and no legacy direct reads', () => {
    const s=file('gas-backend/Scripts_Page_People.html');
    assert.equal(count(s,/api\(["']apiGetPeoplePageBundle["']/g),1);
    for (const name of ['apiGetPersonnelStaffs','apiGetPersonnelOps','apiGetPersonnelComms','apiGetPersonnelDirectoryBundle']) assert.equal(count(s,new RegExp(`api\\(["']${name}["']`,'g')),0,`${name} legacy read returned`);
    contains(s,'DATA_OWNER="apiGetPeoplePageBundle"');
  });

  ok('deferred fragment cache behavior is release-immutable with explicit refresh', () => {
    const src=file('gas-backend/Code_03_Platform_Assets.gs');
    const code=[extractFunction(src,'_deferredAssetNameParts_'),extractFunction(src,'_deferredFragmentCacheKey_'),extractFunction(src,'_deferredFragmentCacheTtlSeconds_'),extractFunction(src,'_includeDeferredAssetHtml_')].join('\n');
    const mem=new Map(); let renders=0;
    const ctx={_assetManifestStamp_:()=>ASSET,_cacheGetLargeHtml_:k=>mem.get(k)||'',_cachePutLargeHtml_:(k,v)=>{mem.set(k,v);return true;},includeAppHtml_:n=>{renders++;return `<script data-app-fragment="meeting">${n}-${renders}</script>`;},_deferredAssetFragmentHtml_:(h)=>h};
    vm.createContext(ctx); vm.runInContext(code,ctx);
    const a=ctx._includeDeferredAssetHtml_('Scripts_Page_Meeting::meeting',{}); const b=ctx._includeDeferredAssetHtml_('Scripts_Page_Meeting::meeting',{}); assert.equal(a,b); assert.equal(renders,1); assert.equal(ctx._deferredFragmentCacheTtlSeconds_(),21600);
    const c=ctx._includeDeferredAssetHtml_('Scripts_Page_Meeting::meeting',{forceFresh:true}); assert.notEqual(c,b); assert.equal(renders,2);
  });

  ok('Dashboard Core Summary hot path remains eligible for normal aggregate reads', () => {
    const src=file('gas-backend/Code_31C_Domain_Dashboard.gs');
    const fn=extractFunction(src,'_dashboardCoreSummaryEligible_'); const ctx={}; vm.createContext(ctx); vm.runInContext(fn,ctx);
    assert.equal(ctx._dashboardCoreSummaryEligible_({}),true);
    assert.equal(ctx._dashboardCoreSummaryEligible_({includeCases:true}),false);
    assert.equal(ctx._dashboardCoreSummaryEligible_({includeMeetingRows:true}),false);
    assert.equal(ctx._dashboardCoreSummaryEligible_({forceLiveDashboardStats:true}),false);
  });

  ok('asset manifest references every deferred runtime HTML and no missing runtime file', () => {
    const assets=file('gas-backend/Code_03_Platform_Assets.gs');
    const runtime=htmlFiles.filter(n=>n!=='Index.html').map(n=>n.replace(/\.html$/,''));
    for (const base of runtime) assert.match(assets,new RegExp(`["']${base}(?:::[a-z0-9_-]+)?["']`,'i'),`manifest reference ${base}`);
    for (const m of assets.matchAll(/["']((?:Runtime_|Scripts_)[A-Za-z0-9_]+)(?:::[a-z0-9_-]+)?["']/gi)) assert.ok(fs.existsSync(path.join(backend,`${m[1]}.html`)),`manifest points to missing ${m[1]}.html`);
  });

  ok('OAuth scope minimization remains intact', () => {
    const app=JSON.parse(file('gas-backend/appsscript.json'));
    const scopes=app.oauthScopes||[]; assert.equal(scopes.length,3); assert.ok(!scopes.some(s=>/userinfo\.email/i.test(s)));
  });
}

console.log(`# ${passed} regression groups passed (${FULL?'full':'frontend-only'} mode)`);
