#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT = process.cwd();
const REV = 'r330';
const RELEASE = 'commission-v1.2-p2b-perf-transport-tuning-2026-08-24-r330';
const ASSET = 'asset-manifest-r330-perf-transport-tuning';
const QUALITY = 'current-quality-gate-r330';
const RPC = 'github-pages-rpc-r330';
let passed = 0;

function file(rel){const p=path.join(ROOT,rel);assert.ok(fs.existsSync(p),`missing file: ${rel}`);return fs.readFileSync(p,'utf8');}
function ok(name,fn){try{fn();passed++;console.log(`ok ${passed} - ${name}`)}catch(e){console.error(`not ok - ${name}`);throw e}}
function stripNonRevision(text){return text.replace(/(?:sha256|sha384|sha512)-[A-Za-z0-9+/=]+/gi,'<HASH>').replace(/https?:\/\/[^\s\"'<>`]+/gi,'<URL>').replaceAll(RPC,'<RPC_PROTOCOL>')}
function jsSyntax(src,label){new vm.Script(src,{filename:label})}
function htmlScripts(html){const out=[];const re=/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi;let m;while((m=re.exec(html))){const attrs=m[1]||'',type=(attrs.match(/\btype=[\"']([^\"']+)[\"']/i)||[])[1]||'';if(type&&!/(?:javascript|ecmascript|module)/i.test(type))continue;const body=m[2].replace(/<\?(?:!=|=)?[\s\S]*?\?>/g,'null');if(body.trim())out.push(body)}return out}

const index=file('github-pages/index.html');
const config=file('github-pages/app-config.js');
const transport=file('github-pages/github-gas-transport.js');
const workflow=file('.github/workflows/pages.yml');

ok('R330 application release converges across public Pages files',()=>{
  for(const [name,text] of [['index',index],['config',config],['transport',transport],['workflow',workflow]])assert.ok(text.toLowerCase().includes(REV),`missing ${REV} in ${name}`);
  assert.ok(index.includes('CANONICAL GITHUB FRONTEND r330'));
  assert.ok(index.includes('sri-required-r330'));
  assert.ok(index.includes('host-pinned-integrity-exempt-r330'));
  assert.ok(config.includes(RELEASE));assert.ok(config.includes(ASSET));assert.ok(config.includes(QUALITY));assert.ok(config.includes(RPC));
  assert.ok(transport.includes('github-gas-transport.js::rpc-r330'));
});

ok('single application revision with RPC protocol separated',()=>{
  const stale=[];
  for(const [name,text] of [['index',index],['config',config],['transport',transport],['workflow',workflow]]){
    for(const token of stripNonRevision(text).match(/r\d{2,3}/gi)||[])if(token.toLowerCase()!==REV)stale.push(`${name}:${token}`)
  }
  assert.deepEqual(stale,[])
});

ok('GAS endpoint is canonical /exec URL',()=>{
  const m=/GAS_URL=\"([^\"]+)\"/.exec(config);assert.ok(m&&/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(m[1]))
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
  assert.ok(workflow.includes('needs: regression'));assert.ok(workflow.includes('actions/checkout@v4'));assert.ok(workflow.includes('actions/configure-pages@v5'));assert.ok(workflow.includes('actions/upload-pages-artifact@v3'));assert.ok(workflow.includes('actions/deploy-pages@v4'));assert.ok(workflow.includes('workflow_dispatch:'));assert.ok(workflow.includes('Run R330 automated regression suite'))
});

ok('public repository does not contain GAS backend source',()=>{assert.ok(!fs.existsSync(path.join(ROOT,'gas-backend')))})


ok('artifact performance budgets',()=>{
  assert.ok(Buffer.byteLength(index,'utf8')<=540000,'index.html exceeds 540 KB budget');
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
  assert.ok(index.includes('function waitShell(id,start)'));
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
  assert.ok(config.includes('RPC_READ_CACHE_TTL_MS:15000'));
  assert.ok(transport.includes('function prewarm(){health(false)'));
  assert.ok(transport.includes('if(RH&&!force)return RH'));
  assert.ok(transport.includes('if(F[key])return F[key]'));
  assert.ok(transport.includes('function isReadMethod(fn)'));
  assert.ok(transport.includes('read=isReadMethod(fn)'));
  assert.ok(transport.includes('w[cb]=function(){}'));
  assert.ok(transport.includes('},30000)'));
  assert.ok(transport.includes('if(write)TTL=Object.create(null)'));
  assert.ok(transport.includes('rec.write?"บันทึกข้อมูลไม่ได้รับการยืนยัน'));
  assert.ok(transport.includes('getLastRpcTrace'));
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

ok('deferred meeting compatibility remains available',()=>{
  assert.ok(index.includes('id="app-meeting-deferred-compat-current"'));
  assert.ok(index.includes('w.__Scripts_Page_Meeting_setVal=function'));
  assert.ok(index.includes('w.__APP_MEETING_DEFERRED_COMPAT_CURRENT__="r330"'));
});

ok('AI chat uses the canonical permission-bound search API',()=>{
  assert.ok(index.includes('id="app-ai-chat-panel"'));
  assert.ok(index.includes('id="app-ai-chat-input"'));
  assert.ok(index.includes('AppAiChatSearch'));
  assert.ok(index.includes('apiSearchCasesLite'));
  assert.ok(index.includes('ตอบจากข้อมูลที่ค้นพบตามสิทธิ์ของคุณ'));
  assert.ok(!index.includes('AIza'));
  assert.ok(!index.includes('api.openai.com'));
});

console.log(`# ${passed} regression groups passed (frontend-only R330 mode)`);
