'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const workflow=fs.readFileSync(path.join(__dirname,'../../.github/workflows/cloud-run-gateway.yml'),'utf8');
const workerBlock=workflow.match(/cat > "\$tmp_edge\/worker\.mjs" <<'EDGE_WORKER'\n([\s\S]*?)\n\s+EDGE_WORKER/)[1].replace(/^          /gm,'');
function worker(fetchImpl){const c={Request,Response,Headers,URL,crypto:require('node:crypto').webcrypto,fetch:fetchImpl};vm.createContext(c);vm.runInContext(workerBlock.replace('export default','worker ='),c);return c.worker;}
test('LINE webhook stop returns OK without reading body or forwarding upstream',async()=>{let calls=0;const w=worker(()=>{calls++;throw Error('unexpected upstream')});const r=await w.fetch(new Request('https://staff.example/line/webhook',{method:'POST',body:'invalid-json'}),{});assert.equal(r.status,200);assert.equal(await r.text(),'OK');assert.equal(r.headers.get('cache-control'),'no-store');assert.equal(calls,0)});
for(const [route,method] of [['/api/router','POST'],['/version','GET'],['/line/webhook','GET'],['/line/webhook/','POST']])test(method+' '+route+' retains existing proxy behavior',async()=>{let observed;const w=worker(async(url,init)=>{observed={url,init};return new Response('upstream',{status:202})});const request=new Request('https://staff.example'+route,method==='POST'?{method,body:'unchanged-payload'}:{method});const r=await w.fetch(request,{CLOUD_RUN_ORIGIN:'https://gateway.example'});assert.equal(observed.url,'https://gateway.example'+route);assert.equal(observed.init.method,method);if(method==='POST')assert.equal(observed.init.body,request.body);assert.equal(r.status,202);assert.equal(r.headers.get('x-p0f-edge'),'cloudflare-workers-dev')});
test('gateway redirect origin is rewritten without changing path or query',async()=>{const w=worker(async()=>new Response(null,{status:302,headers:{Location:'https://gateway.example/path?q=1'}}));const r=await w.fetch(new Request('https://staff.example/'),{CLOUD_RUN_ORIGIN:'https://gateway.example'});assert.equal(r.headers.get('location'),'https://staff.example/path?q=1')});
test('all deploy commands keep zero minimum and LINE AI disabled',()=>{const lines=workflow.split('\n').filter(l=>l.includes('gcloud run deploy'));assert.equal(lines.length,2);for(const line of lines){assert.match(line,/--min-instances 0\b/);assert.doesNotMatch(line,/--min-instances [1-9]/)}assert.match(workflow,/LINE_QA_AI_ENABLED: N/);assert.equal((workflow.match(/naturalLanguage\?\.enabled===false/g)||[]).length,2);assert.doesNotMatch(workflow,/LINE_QA_AI_ENABLED must be Y/)});
const gateName='Require authenticated canary session before promotion';const gate=workflow.slice(workflow.indexOf('- name: '+gateName),workflow.indexOf('- name: Promote CR-8 GAS-canonical'));const probeSource=gate.match(/node <<'NODE'\n([\s\S]*?)\n\s+NODE/)[1].replace(/^          /gm,'').replace(/main\(\)\.catch\([\s\S]*$/,'');
function probe(responses,env={}){let calls=[],logs=[];const c={process:{env:{CANARY_URL:'https://canary.example',PUBLIC_APP_ORIGIN:'https://staff.example',E2E_SMOKE_USERNAME:'fixture-user',E2E_SMOKE_PASSWORD:'fixture-password',...env}},AbortSignal,console:{log:s=>logs.push(s)},fetch:async(url,init)=>{calls.push({url,init});return {status:200,json:async()=>responses.shift()}}};vm.createContext(c);vm.runInContext(probeSource,c);return {run:()=>c.main(),calls,logs};}
test('authenticated canary gate precedes production promotion',()=>{assert(workflow.indexOf('- name: '+gateName)>0);assert(workflow.indexOf('- name: '+gateName)<workflow.indexOf('- name: Promote CR-8 GAS-canonical'));assert.match(gate,/CANARY_URL/);assert.doesNotMatch(gate,/CLOUD_RUN_ORIGIN.*api\/router/)});
test('failed application login stops canary gate without credential or response leakage',async()=>{const p=probe([{transportOk:true,result:{ok:false,error:'sensitive-error-detail'}}]);await assert.rejects(p.run(),/CANARY_LOGIN_APPLICATION_FAILED/);assert.equal(p.calls.length,1);assert.doesNotMatch(p.logs.join('\n'),/fixture-password|fixture-user|sensitive-error-detail/)});
test('successful login must still pass authenticated session',async()=>{const p=probe([{transportOk:true,result:{ok:true,data:{token:'fixture-token',user:{role:'staff'}}}},{transportOk:true,result:{ok:false}}]);await assert.rejects(p.run(),/CANARY_SESSION_APPLICATION_FAILED/);assert.equal(p.calls.length,2);assert.doesNotMatch(p.logs.join('\n'),/fixture-token/)});
test('login and positive session evidence allow promotion gate',async()=>{const p=probe([{transportOk:true,result:{ok:true,data:{token:'fixture-token',csrfToken:'fixture-csrf',user:{role:'staff'}}}},{transportOk:true,result:{ok:true,data:{authenticated:true}}}]);await p.run();assert.equal(p.calls.length,2);assert.equal(JSON.parse(p.calls[1].init.body).payload.token,'fixture-token');assert.doesNotMatch(p.logs.join('\n'),/fixture-token|fixture-csrf|fixture-password/)});
test('missing test credentials stop before network access',async()=>{const p=probe([],{E2E_SMOKE_PASSWORD:''});await assert.rejects(p.run(),/CANARY_AUTH_CREDENTIALS_MISSING/);assert.equal(p.calls.length,0)});
for(const [error,expected] of [
 ['username หรือ password ไม่ถูกต้อง หรือบัญชีถูกระงับ','INVALID_CREDENTIALS_OR_INACTIVE_ACCOUNT'],
 ['Users schema ต้องมีคอลัมน์ passwordHash สำหรับ Production Current','USERS_SCHEMA_INVALID'],
 ['PASSWORD_PEPPER unavailable: private-detail','PASSWORD_PEPPER_UNAVAILABLE'],
 ['พยายามเข้าสู่ระบบมากเกินไป กรุณาลองใหม่อีกครั้งภายใน 5 นาที','LOGIN_RATE_LIMITED'],
 ['arbitrary-sensitive-error-fixture','UNCLASSIFIED_LOGIN_FAILURE']
])test('canary login emits only fixed category '+expected,async()=>{const p=probe([{transportOk:true,result:{ok:false,error}}]);await assert.rejects(p.run(),/CANARY_LOGIN_APPLICATION_FAILED/);const metadata=JSON.parse(p.logs[0].slice('Canary login gate: '.length));assert.equal(metadata.failureClass,expected);assert(!p.logs.join('\n').includes(error));});


test('public API throttling uses Cloudflare client IP and ignores caller-controlled identifiers',async()=>{
 let calls=0,keys=[];const w=worker(async()=>{calls++;return new Response('upstream',{status:202})});
 const limiter={limit:async({key})=>{keys.push(key);return {success:false}}};
 for(const token of ['one','two']){
  const req=new Request('https://staff.example/api/anti',{method:'POST',headers:{Origin:'https://sapa27.github.io','CF-Connecting-IP':'192.0.2.1','X-Forwarded-For':'198.51.100.9'},body:JSON.stringify({action:'search',payload:{clientToken:token}})});
  const r=await w.fetch(req,{PUBLIC_API_RATE_LIMITER:limiter});
  assert.equal(r.status,200);assert.equal(r.headers.get('x-gas-response-contract'),'anti-public-json-v1');
  assert.equal(r.headers.get('access-control-allow-origin'),'https://sapa27.github.io');
  const b=await r.json();assert.equal(b.ok,false);assert.equal(b.code,'RATE_LIMITED');assert.equal(b.retryAfterSeconds,60);
 }
 assert.equal(calls,0);assert.deepEqual(keys,['anti:192.0.2.1','anti:192.0.2.1']);
});
test('public API limiter fails closed without binding, IP, or a successful limiter service',async()=>{
 let calls=0;const w=worker(async()=>{calls++;return new Response('bad')});
 for(const env of [{},{PUBLIC_API_RATE_LIMITER:{limit:async()=>{throw Error('service unavailable')}}}]){
  const r=await w.fetch(new Request('https://staff.example/api/anti',{method:'POST',headers:{'CF-Connecting-IP':'192.0.2.2',Origin:'https://unlisted.example'}}),env);
  assert.equal((await r.json()).code,'RATE_LIMIT_UNAVAILABLE');assert.equal(r.headers.get('access-control-allow-origin'),null);
 }
 const missingIp=await w.fetch(new Request('https://staff.example/api/anti',{method:'POST'}),{PUBLIC_API_RATE_LIMITER:{limit:()=>{throw Error('must not run')}}});
 assert.equal((await missingIp.json()).code,'RATE_LIMIT_UNAVAILABLE');assert.equal(calls,0);
});
test('allowed public API requests retain their original body and preflight does not consume quota',async()=>{
 let calls=0,checks=0,observed;const w=worker(async(url,init)=>{calls++;observed=init;return new Response('ok')});
 const env={CLOUD_RUN_ORIGIN:'https://gateway.example',PUBLIC_API_RATE_LIMITER:{limit:async()=>{checks++;return {success:true}}}};
 const req=new Request('https://staff.example/api/anti',{method:'POST',headers:{'CF-Connecting-IP':'192.0.2.3'},body:'unchanged-public-body'});
 await w.fetch(req,env);assert.equal(observed.body,req.body);assert.equal(checks,1);
 await w.fetch(new Request('https://staff.example/api/anti',{method:'OPTIONS'}),env);assert.equal(checks,1);assert.equal(calls,2);
 assert.match(workflow,/ratelimits:\[\{name:"PUBLIC_API_RATE_LIMITER",namespace_id:"27032026",simple:\{limit:60,period:60\}\}\]/);
});
