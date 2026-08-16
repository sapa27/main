(function(w,d){
  "use strict";
  if(!w||!d)return;
  if(w.__APP_GITHUB_RPC_REQUIRED__)return;
  w.__APP_GITHUB_RPC_REQUIRED__=true;
  w.__APP_GITHUB_BRIDGE_TRANSPORT__=true;
  w.__APP_HOST_MODE__="github-pages";

  var OWNER="github-pages/github-gas-transport.js::canonical-rpc-required";
  var MODE="github-pages-gas-router-rpc-required";
  var RPC_VERSION="github-pages-rpc-v1";
  var pending=Object.create(null),inFlight=Object.create(null),seq=0,healthPromise=null;
  var health={state:"unknown",ok:false,serverVersion:"",allowedOrigin:false,lastError:""};
  var metrics={calls:0,healthChecks:0,posts:0,polls:0,pendingPolls:0,completed:0,failed:0,dedupeHits:0};

  function text(v){return v==null?"":String(v)}
  function cfg(k,f){var a=w.APP_GITHUB_CONFIG||{},b=w.APP_CONFIG||{},v=a[k];if(v==null||v==="")v=b[k];return v==null||v===""?f:v}
  function err(raw,code){var x=raw&&typeof raw==="object"?raw:{message:text(raw)},e=new Error(text(x.message||"GAS RPC request failed"));e.code=text(x.code||code||"GAS_RPC_FAILED");e.errorCode=e.code;e.transportMode=MODE;return e}
  function gas(){var v=text(cfg("GAS_WEB_APP_URL",cfg("gasWebAppUrl",w.GAS_WEB_APP_URL||""))).trim();return /^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec(?:[?#].*)?$/i.test(v)?v.replace(/[?#].*$/,""):""}
  function requireGas(){var g=gas();if(!g)throw err("ยังไม่ได้กำหนด GAS Web App URL","GITHUB_GAS_URL_NOT_CONFIGURED");return g}
  function cap(prefix){var b=new Uint8Array(24);try{w.crypto.getRandomValues(b)}catch(_){for(var i=0;i<b.length;i++)b[i]=Math.floor(Math.random()*256)}return text(prefix||"rpc")+"_"+Array.prototype.map.call(b,function(x){return("0"+x.toString(16)).slice(-2)}).join("")}
  function cb(){seq++;return "__ghRpcCb_"+Date.now().toString(36)+"_"+seq.toString(36)+"_"+Math.random().toString(36).slice(2,10)}
  function build(mode,fields){var q=["mode="+encodeURIComponent(mode)];Object.keys(fields||{}).forEach(function(k){q.push(encodeURIComponent(k)+"="+encodeURIComponent(text(fields[k])))});q.push("_ts="+Date.now().toString(36));return requireGas()+"?"+q.join("&")}

  function jsonp(mode,fields,timeoutMs){return new Promise(function(resolve,reject){
    var name=cb(),done=false,sc=d.createElement("script"),tm;fields=Object.assign({},fields||{},{callback:name});
    function clean(){if(tm)w.clearTimeout(tm);try{delete w[name]}catch(_){w[name]=void 0}try{sc&&sc.parentNode&&sc.parentNode.removeChild(sc)}catch(_){}}
    function finish(ok,v){if(done)return;done=true;clean();ok?resolve(v||{}):reject(v instanceof Error?v:err(v,"GAS_RPC_JSONP_FAILED"))}
    w[name]=function(v){finish(true,v||{})};sc.async=true;sc.referrerPolicy="no-referrer";
    sc.onerror=function(){finish(false,{code:"GAS_RPC_JSONP_LOAD_FAILED",message:"ไม่สามารถโหลด RPC response จาก GAS ได้ — ตรวจว่า /exec เป็น deployment รุ่นปัจจุบัน"})};
    sc.onload=function(){w.setTimeout(function(){if(!done)finish(false,{code:"GAS_RPC_JSONP_NO_CALLBACK",message:"GAS deployment ยังไม่รองรับ github-pages-rpc-v1 หรือยังชี้ไป version เก่า"})},0)};
    tm=w.setTimeout(function(){finish(false,{code:"GAS_RPC_JSONP_TIMEOUT",message:"GAS RPC health/result timeout"})},Math.max(2500,Number(timeoutMs||5000)));
    sc.src=build(mode,fields);(d.head||d.documentElement).appendChild(sc);
  })}

  function healthCheck(force){
    if(healthPromise&&!force)return healthPromise;
    if(health.ok&&!force)return Promise.resolve(health);
    metrics.healthChecks++;health.state="checking";health.lastError="";
    healthPromise=jsonp("github-rpc-health",{parentOrigin:w.location.origin,rpcVersion:RPC_VERSION},Number(cfg("RPC_HEALTH_TIMEOUT_MS",4500))).then(function(x){
      health.serverVersion=text(x&&x.transportVersion);health.allowedOrigin=!!(x&&x.allowedOrigin);
      if(health.serverVersion!==RPC_VERSION)throw err({code:"GAS_RPC_VERSION_MISMATCH",message:"GAS RPC version ไม่ตรง: "+(health.serverVersion||"unknown")+" (ต้องเป็น "+RPC_VERSION+")"});
      if(!health.allowedOrigin)throw err({code:"GITHUB_PAGES_ORIGIN_NOT_ALLOWED",message:"GITHUB_PAGES_ORIGIN ไม่อนุญาต "+w.location.origin});
      if(x.bridgeRequired!==false)throw err({code:"GAS_RPC_HEALTH_CONTRACT_INVALID",message:"GAS RPC health contract ไม่ถูกต้อง"});
      health.state="ready";health.ok=true;health.lastError="";return health;
    }).catch(function(e){health.state="error";health.ok=false;health.lastError=text(e&&e.message||e);throw e}).then(function(v){healthPromise=null;return v},function(e){healthPromise=null;throw e});
    return healthPromise;
  }

  function invocation(fn,args){fn=text(fn).trim();args=args==null?{}:args;if(fn==="apiRouter"||fn==="apiLogin"||fn==="apiSessionResume"||fn==="apiSessionCheck"||fn==="apiLogout"||fn==="getDeferredInclude")return{fn:fn,args:args,original:fn};return{fn:"apiRouter",args:{method:fn,payload:args},original:fn}}
  function postBody(rec,I){
    var fields={mode:"github-rpc",parentOrigin:w.location.origin,rpcVersion:RPC_VERSION,rpcId:rec.id,rpcToken:rec.token,rpcFunction:I.fn,rpcPayload:JSON.stringify(I.args==null?{}:I.args)},params=new URLSearchParams();
    Object.keys(fields).forEach(function(k){params.append(k,fields[k])});metrics.posts++;
    if(w.fetch){try{return w.fetch(requireGas(),{method:"POST",mode:"no-cors",credentials:"omit",cache:"no-store",redirect:"follow",referrerPolicy:"no-referrer",body:params}).then(function(){rec.postSettled=true;return true},function(e){rec.postError=text(e&&e.message||e);return formPost(fields,rec)})}catch(e){rec.postError=text(e&&e.message||e)}}
    return formPost(fields,rec);
  }
  function formPost(fields,rec){return new Promise(function(resolve){
    var name="ghrpc_"+rec.id.replace(/[^A-Za-z0-9_]/g,"_"),fr=d.createElement("iframe"),fm=d.createElement("form"),submitted=false,done=false;
    fr.name=name;fr.title="GAS RPC POST";fr.setAttribute("aria-hidden","true");fr.style.cssText="position:fixed;width:1px;height:1px;left:-10000px;top:-10000px;border:0;opacity:0;pointer-events:none";
    fm.method="POST";fm.action=requireGas();fm.target=name;fm.style.display="none";
    Object.keys(fields).forEach(function(k){var z=d.createElement("textarea");z.name=k;z.value=text(fields[k]);fm.appendChild(z)});
    function finish(){if(done||!submitted)return;done=true;rec.postSettled=true;w.setTimeout(function(){try{fm.remove()}catch(_){}try{fr.remove()}catch(_){}},0);resolve(true)}
    fr.onload=finish;(d.body||d.documentElement).appendChild(fr);(d.body||d.documentElement).appendChild(fm);submitted=true;try{fm.submit()}catch(e){rec.postError=text(e&&e.message||e);finish()}w.setTimeout(finish,Math.max(2500,Number(cfg("RPC_POST_SIGNAL_GRACE_MS",3500))));
  })}
  function pollDelay(n){var lo=Math.max(250,Number(cfg("RPC_RESULT_POLL_MIN_MS",450))),hi=Math.max(lo,Number(cfg("RPC_RESULT_POLL_MAX_MS",2200)));return Math.min(hi,lo+Math.max(0,n-1)*220)}
  function poll(rec,n){n=Number(n||0)||0;if(Date.now()>=rec.deadline)return Promise.reject(err({code:"GAS_RPC_REQUEST_TIMEOUT",message:"GAS RPC request timeout: "+rec.original}));metrics.polls++;return jsonp("github-rpc-result",{parentOrigin:w.location.origin,rpcVersion:RPC_VERSION,rpcId:rec.id,rpcToken:rec.token},Math.min(12000,Math.max(3000,rec.deadline-Date.now()))).then(function(x){if(x&&x.pending===true){metrics.pendingPolls++;return new Promise(function(r){w.setTimeout(r,pollDelay(n+1))}).then(function(){return poll(rec,n+1)})}if(!x||x.transportOk===false||x.ok===false)throw err(x&&x.error||{code:"GAS_RPC_RESULT_FAILED",message:"GAS RPC result failed"});return x.result})}
  function rpcRun(fn,args,opt){opt=opt||{};var I=invocation(fn,args),rec={id:cap("req"),token:cap("tok"),original:I.original,deadline:Date.now()+Math.max(10000,Number(opt.timeoutMs||cfg("REQUEST_TIMEOUT_MS",90000))||90000),postSettled:false,postError:""};pending[rec.id]=rec;var signal;try{signal=postBody(rec,I)}catch(e){delete pending[rec.id];return Promise.reject(e)}var grace=new Promise(function(r){w.setTimeout(r,Math.max(500,Number(cfg("RPC_POST_SIGNAL_GRACE_MS",3500))))});return Promise.race([Promise.resolve(signal),grace]).then(function(){return poll(rec,0)}).then(function(v){metrics.completed++;delete pending[rec.id];return v},function(e){metrics.failed++;delete pending[rec.id];throw e})}
  function remote(fn,args,opt){return healthCheck(false).then(function(){return rpcRun(fn,args,opt)})}
  function run(fn,args,opt){metrics.calls++;fn=text(fn).trim();if(!fn)return Promise.reject(err("method required","METHOD_REQUIRED"));var write=/^api(?:Save|Delete|Update|Create|Import|Extract|Upload|Issue|Process|Cleanup|Generate|Send|Patch|Approve|Reject|Submit|Queue|Migrate|Revoke|Refresh)/i.test(fn),key=write?"":fn+"|"+JSON.stringify(args==null?{}:args);if(key&&inFlight[key]){metrics.dedupeHits++;return inFlight[key]}var p=remote(fn,args,opt);if(!key)return p;inFlight[key]=p.then(function(v){delete inFlight[key];return v},function(e){delete inFlight[key];throw e});return inFlight[key]}
  function reset(){healthPromise=null;health={state:"unknown",ok:false,serverVersion:"",allowedOrigin:false,lastError:""};pending=Object.create(null);inFlight=Object.create(null);return true}
  function status(){return{ok:!!gas()&&health.ok,owner:OWNER,mode:MODE,transportMode:MODE,activeTransport:"rpc",gasWebAppUrlConfigured:!!gas(),parentOrigin:w.location.origin,rpc:{state:health.state,ready:health.ok,version:RPC_VERSION,serverVersion:health.serverVersion,allowedOrigin:health.allowedOrigin,lastError:health.lastError,pending:Object.keys(pending).length,metrics:Object.assign({},metrics)},legacy:{disabled:true,reason:"GOOGLE_WARDEN_DROPS_GITHUB_POSTMESSAGE"},bridgeRequired:false,bridgeLoadState:"retired-rpc-required",bridge:{state:"retired-rpc-required",ready:false,protocol:"none",origin:"",channel:"none",lastError:""},pending:Object.keys(pending).length,metrics:Object.assign({},metrics)}}
  function logo(){var u=text(cfg("logoUrl",cfg("fallbackLogoUrl",""))).trim();if(!u)return false;try{Array.prototype.forEach.call(d.querySelectorAll('[data-logo="parliament"],#login-logo-img,#side-logo-img,#mobile-topbar-logo,.print-logo-img'),function(i){i.setAttribute("src",u);i.style.display="";i.style.visibility="visible"})}catch(_){}return true}

  w.AppTransport=w.AppTransport||{};var A=w.AppTransport;
  A.__owner=OWNER;A.mode=MODE;A.transportMode=MODE;A.run=run;A.probe=function(){return healthCheck(true)};A.runGasDirectBridge=remote;A.runVercelProxy=remote;A.runJsonpApi=remote;A.runLoginPost=function(fn,args,opt){return remote(fn,args,opt)};A.ensureBridgeClient=function(){return healthCheck(false).then(function(){return true})};A.warmAuthBridge=function(){return A.ensureBridgeClient().then(function(){return true},function(){return false})};A.bridgeClientState=function(){return status().bridge};A.resetBridge=reset;A.reset=reset;A.clearApiCache=function(){inFlight=Object.create(null);return true};A.invalidateClientApiCache=A.clearApiCache;A.loadPublicConfig=function(){logo();return Promise.resolve({ok:true,gasWebAppUrlConfigured:!!gas(),transportMode:MODE,rpcVersion:RPC_VERSION})};A.runtimeOwnerStatus=status;A.assertRuntimeOwner=function(){var s=status();if(!s.gasWebAppUrlConfigured)throw err("GitHub Pages GAS transport ไม่พร้อม","APP_RUNTIME_OWNER_MISMATCH");return s};A.releaseStatus=function(){var s=status();return{ok:s.ok,transportMode:MODE,rpcVersion:RPC_VERSION,activeTransport:"rpc",mismatch:[],warnings:s.rpc.lastError?[s.rpc.lastError]:[]}};A.phase2Status=status;A.phase1Status=status;A.phase0Status=status;A.clientCacheStatus=function(){return{ok:true,owner:OWNER,readResponseCache:false,inFlight:Object.keys(inFlight).length,metrics:Object.assign({},metrics)}};A.setGasWebAppUrl=function(u){u=text(u).trim();if(!/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec(?:[?#].*)?$/i.test(u))return gas();u=u.replace(/[?#].*$/,"");w.APP_CONFIG=w.APP_CONFIG||{};w.APP_CONFIG.gasWebAppUrl=u;w.GAS_WEB_APP_URL=u;reset();return u};A.ping=function(){return run("apiSessionCheck",{},{timeoutMs:15000})};A.status=status;
  try{logo()}catch(_){}
})(window,document);
