(function(w,d){
  "use strict";
  if(!w||!d)return;
  var OWNER="github-pages/github-gas-transport.js::canonical-hybrid";
  var MODE="github-pages-gas-router-rpc-primary";
  var P=Object.create(null),PP=Object.create(null),F=Object.create(null);
  var frame=null,ready=null,source=null,nonce="",proto="",state="idle",origin="",channel="",last="";
  var seq=0,pseq=0,VER="github-pages-bridge-v2";
  var M={calls:0,bridgeCalls:0,ready:0,v2Ready:0,legacyReady:0,readyFailures:0,postCalls:0,postReady:0,postReadyAcks:0,postResults:0,postFallbacks:0,errors:0,dedupeHits:0};
  function t(v){return v==null?"":String(v)}
  function o(v){return!!v&&typeof v==="object"&&!Array.isArray(v)}
  function c(k,f){var a=w.APP_GITHUB_CONFIG||{},b=w.APP_CONFIG||{},v=a[k];if(v==null||v==="")v=b[k];return v==null||v===""?f:v}
  function gas(){var v=t(c("GAS_WEB_APP_URL",c("gasWebAppUrl",w.GAS_WEB_APP_URL||""))).trim();return /^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec(?:[?#].*)?$/i.test(v)?v.replace(/[?#].*$/,""):""}
  function E(m,k){var e=new Error(t(m||"GAS transport error"));e.code=t(k||"GAS_TRANSPORT_ERROR");e.errorCode=e.code;e.transportMode=MODE;return e}
  function N(){var b=new Uint8Array(24);try{w.crypto.getRandomValues(b)}catch(_){for(var i=0;i<b.length;i++)b[i]=Math.floor(Math.random()*256)}return Array.prototype.map.call(b,function(x){return("0"+x.toString(16)).slice(-2)}).join("")}
  function good(z){
    z=t(z).trim().toLowerCase();
    if(!z)return false;
    try{
      var u=new URL(z),h=t(u.hostname).toLowerCase();
      if(u.protocol!=="https:")return false;
      return h==="script.google.com"||h==="script.googleusercontent.com"||h.endsWith(".script.googleusercontent.com")||h.endsWith("-script.googleusercontent.com");
    }catch(_){return false}
  }
  function bridgeTrusted(ev,x){var z=t(ev&&ev.origin).toLowerCase();return good(z)||(z==="null"&&x&&t(x.nonce)===nonce)}
  function postTrusted(ev,x,pr){var z=t(ev&&ev.origin).toLowerCase();return !!pr&&t(x&&x.nonce)===t(pr.nonce)&&(good(z)||z==="null")}
  function url(){var g=gas();if(!g)throw E("ยังไม่ได้กำหนด GAS Web App URL","GITHUB_GAS_URL_NOT_CONFIGURED");VER=t(c("BRIDGE_VERSION",VER))||VER;return g+"?mode=github-bridge&__githubBridgeClient=1&parentOrigin="+encodeURIComponent(w.location.origin)+"&nonce="+encodeURIComponent(nonce)+"&bridgeNonce="+encodeURIComponent(nonce)+"&bridgeVersion="+encodeURIComponent(VER)}
  function rm(id,e){var r=P[id];if(!r)return;delete P[id];if(r.timer)w.clearTimeout(r.timer);if(e)r.reject(e)}
  function rpm(id,e){var r=PP[id];if(!r)return;delete PP[id];if(r.timer)w.clearTimeout(r.timer);try{r.form&&r.form.remove()}catch(_){}try{r.frame&&r.frame.remove()}catch(_){}if(e)r.reject(e)}
  function okReady(ev,x,p){proto=p;source=ev.source||(frame&&frame.contentWindow)||null;origin=t(ev.origin||"");channel=t(x.channel||(p==="v2"?"window-postmessage":"legacy-iframe"));state="ready";last="";M.ready++;p==="v2"?M.v2Ready++:M.legacyReady++;if(ready&&ready._r)ready._r(true)}
  function parseData(v){if(typeof v==="string"){try{return JSON.parse(v)}catch(_){return null}}return o(v)?v:null}
  function msg(ev){
    var x=parseData(ev&&ev.data);if(!x)return;
    if(x.type==="GAS_POST_READY"){
      var pr0=PP[t(x.id)];if(!postTrusted(ev,x,pr0))return;
      M.postReady++;
      var target=ev.source;
      if(target&&typeof target.postMessage==="function"){
        try{target.postMessage({type:"GAS_POST_RESULT_REQUEST",transportVersion:"github-postmessage-v2",nonce:pr0.nonce,id:t(x.id)},"*");M.postReadyAcks++}catch(_e){M.errors++}
      }
      return;
    }
    if(x.type==="GAS_POST_RESULT"){
      var pid=t(x.id),pr=PP[pid];if(!postTrusted(ev,x,pr))return;
      delete PP[pid];if(pr.timer)w.clearTimeout(pr.timer);try{pr.form&&pr.form.remove()}catch(_){}try{pr.frame&&pr.frame.remove()}catch(_){}M.postResults++;
      if(x.ok)pr.resolve(x.result);else pr.reject(E(x.error&&(x.error.message||x.error)||"GAS POST request failed",x.error&&(x.error.code||x.error.errorCode)||"GAS_POST_REQUEST_FAILED"));
      return;
    }
    if(t(x.nonce)!==nonce||!bridgeTrusted(ev,x))return;
    if(x.type==="GAS_BRIDGE_ERROR"){
      last=t(x.message||x.code||"GAS_BRIDGE_ERROR");
      if(x.requestedOrigin||x.configuredOrigins)last+=" — requested: "+t(x.requestedOrigin||w.location.origin)+"; configured: "+(Array.isArray(x.configuredOrigins)?x.configuredOrigins.join(", "):t(x.configuredOrigins||"(ไม่มีค่า)"));
      state="error";M.errors++;if(ready&&ready._j)ready._j(E(last,t(x.code||"GAS_BRIDGE_ERROR")));return;
    }
    if(x.type==="GAS_BRIDGE_READY"){
      if(x.bridgeVersion&&t(x.bridgeVersion)!==VER){last="GAS Bridge version ไม่ตรง: "+t(x.bridgeVersion)+" (ต้องเป็น "+VER+")";state="version-mismatch";if(ready&&ready._j)ready._j(E(last,"GAS_BRIDGE_VERSION_MISMATCH"));return}
      okReady(ev,x,"v2");return;
    }
    if(x.type==="GAS_IFRAME_TRANSPORT_READY"){okReady(ev,x,"legacy");return}
    if(x.type==="GAS_BRIDGE_RESULT"){
      var r=P[t(x.id)];if(!r)return;delete P[t(x.id)];if(r.timer)w.clearTimeout(r.timer);if(x.ok)r.resolve(x.result);else r.reject(E(x.error&&(x.error.message||x.error)||"GAS bridge request failed",x.error&&(x.error.code||x.error.errorCode)||"GAS_BRIDGE_REQUEST_FAILED"));return;
    }
    if(x.type==="GAS_IFRAME_TRANSPORT_RESPONSE"){
      var id=t(x.requestId||x.id),q=P[id];if(!q)return;delete P[id];if(q.timer)w.clearTimeout(q.timer);q.resolve(x.result==null?{ok:false,error:"empty GAS result"}:x.result);return;
    }
  }
  w.addEventListener("message",msg,false);
  function ensure(){
    if(state==="ready"&&source)return Promise.resolve(true);if(ready)return ready;
    nonce=N();proto="";state="loading";last="";var R,J;
    ready=new Promise(function(r,j){R=r;J=j});
    ready._r=function(v){var r=R;ready=null;if(r)r(v)};ready._j=function(e){var j=J;ready=null;if(j)j(e)};
    var ms=Math.max(5000,Number(c("BRIDGE_TIMEOUT_MS",c("bridgeTimeoutMs",12000)))||12000);
    var tm=w.setTimeout(function(){if(state==="ready")return;M.readyFailures++;state="loaded-no-ready";last="GAS Bridge ไม่ตอบ READY ทั้ง protocol v2 และ legacy";if(ready&&ready._j)ready._j(E(last,"GAS_BRIDGE_READY_TIMEOUT"))},ms);
    ready.then(function(){w.clearTimeout(tm)},function(){w.clearTimeout(tm)});
    try{frame&&frame.remove()}catch(_){}
    frame=d.createElement("iframe");frame.id="app-gas-github-bridge";frame.title="GAS API Bridge";frame.setAttribute("aria-hidden","true");frame.setAttribute("referrerpolicy","no-referrer");frame.style.cssText="position:fixed;width:1px;height:1px;left:-10000px;top:-10000px;border:0;opacity:0;pointer-events:none";
    frame.onload=function(){if(state!=="ready")state="loaded-no-ready";try{frame.contentWindow.postMessage({type:"GAS_BRIDGE_READY_PROBE",nonce:nonce},"*")}catch(_){}try{frame.contentWindow.postMessage({type:"GAS_IFRAME_TRANSPORT_PING_READY",nonce:nonce},"*")}catch(_){}};
    frame.onerror=function(){state="load-error";last="โหลด GAS iframe ไม่สำเร็จ"};
    try{frame.src=url()}catch(e){if(ready&&ready._j)ready._j(e);return ready}
    (d.body||d.documentElement).appendChild(frame);return ready;
  }
  function inv(fn,a){fn=t(fn).trim();a=a==null?{}:a;if(fn==="apiRouter"||fn==="apiLogin"||fn==="apiSessionResume"||fn==="apiSessionCheck"||fn==="apiLogout"||fn==="getDeferredInclude")return{fn:fn,args:a,orig:fn};return{fn:"apiRouter",args:{method:fn,payload:a},orig:fn}}
  function bridge(fn,a,opt){opt=opt||{};var I=inv(fn,a);return ensure().then(function(){return new Promise(function(resolve,reject){var id="gh_"+Date.now().toString(36)+"_"+(++seq).toString(36),ms=Math.max(10000,Number(opt.timeoutMs||c("REQUEST_TIMEOUT_MS",c("requestTimeoutMs",90000)))||90000);P[id]={resolve:resolve,reject:reject,timer:w.setTimeout(function(){M.errors++;rm(id,E("GAS request timeout: "+I.orig,"GAS_BRIDGE_REQUEST_TIMEOUT"))},ms)};var q=source||(frame&&frame.contentWindow);if(!q||typeof q.postMessage!=="function"){rm(id,E("GAS bridge window unavailable","GAS_BRIDGE_WINDOW_UNAVAILABLE"));return}M.bridgeCalls++;try{if(proto==="v2")q.postMessage({type:"GAS_BRIDGE_CALL",nonce:nonce,id:id,fn:I.fn,args:I.args},"*");else{var m=I.fn==="apiRouter"&&o(I.args)?t(I.args.method||"apiRouter"):I.fn,p=I.fn==="apiRouter"&&o(I.args)?I.args.payload||{}:I.args;q.postMessage({__gasIframeTransport:true,type:"GAS_IFRAME_TRANSPORT_REQUEST",bridge:"verified-session-bridge",nonce:nonce,requestId:id,id:id,method:m,payload:p},"*")}}catch(e){rm(id,e)}})})}
  function field(f,n,v){var i=d.createElement("input");i.type="hidden";i.name=n;i.value=t(v);f.appendChild(i)}
  function post(fn,a,opt){
    opt=opt||{};var g=gas();if(!g)return Promise.reject(E("ยังไม่ได้กำหนด GAS Web App URL","GITHUB_GAS_URL_NOT_CONFIGURED"));
    var I=inv(fn,a),id="ghp_"+Date.now().toString(36)+"_"+(++pseq).toString(36),nn=N(),ms=Math.max(10000,Number(opt.timeoutMs||c("API_POST_FALLBACK_TIMEOUT_MS",20000))||20000),js;
    try{js=JSON.stringify(I.args)}catch(_){return Promise.reject(E("ไม่สามารถแปลง API payload เป็น JSON","GITHUB_POST_PAYLOAD_SERIALIZE_FAILED"))}
    M.postCalls++;
    return new Promise(function(resolve,reject){var name="app_gas_post_"+id,fr=d.createElement("iframe"),fm=d.createElement("form");fr.name=name;fr.title="GAS API POST";fr.setAttribute("aria-hidden","true");fr.style.cssText="position:fixed;width:1px;height:1px;left:-10000px;top:-10000px;border:0;opacity:0;pointer-events:none";fm.method="POST";fm.action=g;fm.target=name;fm.style.display="none";field(fm,"mode","github-api-post");field(fm,"parentOrigin",w.location.origin);field(fm,"nonce",nn);field(fm,"id",id);field(fm,"fn",I.fn);field(fm,"args",js);PP[id]={resolve:resolve,reject:reject,frame:fr,form:fm,nonce:nn,timer:w.setTimeout(function(){rpm(id,E("GAS POST request timeout: "+I.orig,"GAS_POST_REQUEST_TIMEOUT"))},ms)};(d.body||d.documentElement).appendChild(fr);(d.body||d.documentElement).appendChild(fm);try{fm.submit()}catch(e){rpm(id,e)}})
  }
  function can(e){var k=t(e&&(e.code||e.errorCode));return k==="GAS_BRIDGE_READY_TIMEOUT"||k==="GAS_BRIDGE_ERROR"||k==="GAS_BRIDGE_VERSION_MISMATCH"||k==="GAS_BRIDGE_WINDOW_UNAVAILABLE"||k==="GITHUB_PAGES_ORIGIN_NOT_ALLOWED"}
  /* RPC primary. Legacy bridge/POST is used only when health negotiation proves the deployed GAS is still pre-RPC. */
  var RPC_VER="github-pages-rpc-v1",RH=null,RHS="unknown",RHE="",RHV="",RHA=false,RQ=Object.create(null),RC=0;
  var RM={healthChecks:0,healthReady:0,healthFallbacks:0,rpcCalls:0,rpcPosts:0,rpcPolls:0,rpcPending:0,rpcCompleted:0,rpcErrors:0};
  function rcb(){RC++;return "__ghRpcCb_"+Date.now().toString(36)+"_"+RC.toString(36)+"_"+Math.random().toString(36).slice(2,10)}
  function rcap(p){return t(p||"rpc")+"_"+N()}
  function rurl(mode,obj){var g=gas();if(!g)throw E("ยังไม่ได้กำหนด GAS Web App URL","GITHUB_GAS_URL_NOT_CONFIGURED");var q=["mode="+encodeURIComponent(mode)];Object.keys(obj||{}).forEach(function(k){q.push(encodeURIComponent(k)+"="+encodeURIComponent(t(obj[k])))});q.push("_ts="+Date.now().toString(36));return g+"?"+q.join("&")}
  function rjsonp(mode,obj,ms){return new Promise(function(resolve,reject){var cb=rcb(),done=false,sc=d.createElement("script"),tm;obj=Object.assign({},obj||{},{callback:cb});function clean(){if(tm)w.clearTimeout(tm);try{delete w[cb]}catch(_){w[cb]=void 0}try{sc&&sc.parentNode&&sc.parentNode.removeChild(sc)}catch(_){}}function fin(ok,v){if(done)return;done=true;clean();ok?resolve(v):reject(v instanceof Error?v:E(v&&v.message||v,v&&v.code||"GAS_RPC_JSONP_FAILED"))}w[cb]=function(x){fin(true,x||{})};sc.async=true;sc.referrerPolicy="no-referrer";sc.onerror=function(){fin(false,{code:"GAS_RPC_JSONP_LOAD_FAILED",message:"GAS RPC endpoint ยังไม่พร้อม"})};sc.onload=function(){w.setTimeout(function(){if(!done)fin(false,{code:"GAS_RPC_JSONP_NO_CALLBACK",message:"GAS deployment ยังไม่รองรับ RPC รุ่นปัจจุบัน"})},0)};tm=w.setTimeout(function(){fin(false,{code:"GAS_RPC_JSONP_TIMEOUT",message:"GAS RPC health/result timeout"})},Math.max(2500,Number(ms||5000)));sc.src=rurl(mode,obj);(d.head||d.documentElement).appendChild(sc)})}
  function rpcHealth(force){if(RH&&!force)return RH;if(RHS==="ready"&&!force)return Promise.resolve({ok:true,transportVersion:RHV,allowedOrigin:RHA});RM.healthChecks++;RHS="checking";RHE="";RH=rjsonp("github-rpc-health",{parentOrigin:w.location.origin,rpcVersion:RPC_VER},Number(c("RPC_HEALTH_TIMEOUT_MS",4500))).then(function(x){RHV=t(x&&x.transportVersion);RHA=!!(x&&x.allowedOrigin);if(!RHA){var oe=E("GitHub Pages origin ไม่ได้รับอนุญาต","GITHUB_PAGES_ORIGIN_NOT_ALLOWED");oe.rpcHealth=x;throw oe}if(RHV!==RPC_VER){var ve=E("GAS RPC version ไม่ตรง: "+(RHV||"unknown")+" (ต้องเป็น "+RPC_VER+")","GAS_RPC_VERSION_MISMATCH");ve.rpcHealth=x;throw ve}if(x.bridgeRequired!==false)throw E("GAS RPC health contract ไม่ถูกต้อง","GAS_RPC_HEALTH_CONTRACT_INVALID");RHS="ready";RHE="";RM.healthReady++;return x},function(e){RHS="unsupported";RHE=t(e&&e.message||e);throw e}).then(function(x){RH=null;return x},function(e){RH=null;throw e});return RH}
  function rpost(rec,I){var params=new URLSearchParams();params.append("mode","github-rpc");params.append("parentOrigin",w.location.origin);params.append("rpcVersion",RPC_VER);params.append("rpcId",rec.id);params.append("rpcToken",rec.token);params.append("rpcFunction",I.fn);params.append("rpcPayload",JSON.stringify(I.args==null?{}:I.args));RM.rpcPosts++;if(w.fetch){try{return w.fetch(gas(),{method:"POST",mode:"no-cors",credentials:"omit",cache:"no-store",redirect:"follow",referrerPolicy:"no-referrer",body:params}).then(function(){rec.postSettled=true;return true},function(e){rec.postError=t(e&&e.message||e);return false})}catch(e){rec.postError=t(e&&e.message||e);return Promise.resolve(false)}}return new Promise(function(resolve){var name="app_gas_rpc_"+rec.id.replace(/[^A-Za-z0-9_]/g,"_"),fr=d.createElement("iframe"),fm=d.createElement("form"),submitted=false,done=false;fr.name=name;fr.title="GAS RPC POST";fr.setAttribute("aria-hidden","true");fr.style.cssText="position:fixed;width:1px;height:1px;left:-10000px;top:-10000px;border:0;opacity:0;pointer-events:none";fm.method="POST";fm.action=gas();fm.target=name;fm.style.display="none";function rf(n,v){var z=d.createElement("textarea");z.name=n;z.value=t(v);fm.appendChild(z)}for(var pair of params.entries())rf(pair[0],pair[1]);function donef(){if(done||!submitted)return;done=true;rec.postSettled=true;w.setTimeout(function(){try{fm.remove()}catch(_){}try{fr.remove()}catch(_){}},0);resolve(true)}fr.onload=donef;(d.body||d.documentElement).appendChild(fr);(d.body||d.documentElement).appendChild(fm);submitted=true;try{fm.submit()}catch(e){rec.postError=t(e&&e.message||e);donef()}w.setTimeout(donef,Math.max(2500,Number(c("RPC_POST_SIGNAL_GRACE_MS",3500))))})}
  function rdelay(n){var lo=Math.max(250,Number(c("RPC_RESULT_POLL_MIN_MS",450))),hi=Math.max(lo,Number(c("RPC_RESULT_POLL_MAX_MS",2200)));return Math.min(hi,lo+Math.max(0,n-1)*220)}
  function rpoll(rec,n){n=Number(n||0)||0;if(Date.now()>=rec.deadline)return Promise.reject(E("GAS RPC request timeout: "+rec.orig,"GAS_RPC_REQUEST_TIMEOUT"));RM.rpcPolls++;return rjsonp("github-rpc-result",{parentOrigin:w.location.origin,rpcVersion:RPC_VER,rpcId:rec.id,rpcToken:rec.token},Math.min(12000,Math.max(3000,rec.deadline-Date.now()))).then(function(x){if(x&&x.pending===true){RM.rpcPending++;return new Promise(function(r){w.setTimeout(r,rdelay(n+1))}).then(function(){return rpoll(rec,n+1)})}if(!x||x.transportOk===false||x.ok===false)throw E(x&&x.error&&(x.error.message||x.error)||"GAS RPC result failed",x&&x.error&&(x.error.code||x.error.errorCode)||"GAS_RPC_RESULT_FAILED");return x.result})}
  function rpcRun(fn,a,opt){opt=opt||{};var I=inv(fn,a),id=rcap("req"),token=rcap("tok"),ms=Math.max(10000,Number(opt.timeoutMs||c("REQUEST_TIMEOUT_MS",c("requestTimeoutMs",90000)))||90000),rec={id:id,token:token,orig:I.orig,deadline:Date.now()+ms,postSettled:false,postError:""};RQ[id]=rec;RM.rpcCalls++;var signal;try{signal=rpost(rec,I)}catch(e){delete RQ[id];return Promise.reject(e)}var grace=new Promise(function(r){w.setTimeout(r,Math.max(500,Number(c("RPC_POST_SIGNAL_GRACE_MS",3500))))});return Promise.race([Promise.resolve(signal),grace]).then(function(){return rpoll(rec,0)}).then(function(v){delete RQ[id];RM.rpcCompleted++;return v},function(e){delete RQ[id];RM.rpcErrors++;throw e})}
  function rpcCanFallbackHealth(e){var k=t(e&&(e.code||e.errorCode));if(k==="GITHUB_PAGES_ORIGIN_NOT_ALLOWED"||k==="GITHUB_GAS_URL_NOT_CONFIGURED")return false;return true}
  function legacyRemote(fn,a,opt){return bridge(fn,a,opt).catch(function(be){if(!can(be))throw be;M.postFallbacks++;return post(fn,a,opt).catch(function(pe){var e=E("ไม่สามารถเชื่อมต่อ GAS ได้ — Bridge: "+t(be&&be.message||be)+" — POST: "+t(pe&&pe.message||pe),/^api(Login|SessionResume|SessionCheck|Logout)$/i.test(t(fn))?"GAS_AUTH_TRANSPORT_UNAVAILABLE":"GAS_API_TRANSPORT_UNAVAILABLE");e.bridgeError=be;e.postError=pe;throw e})})}
  function remote(fn,a,opt){return rpcHealth(false).then(function(){return rpcRun(fn,a,opt)},function(he){if(c("RPC_LEGACY_FALLBACK",true)!==false&&rpcCanFallbackHealth(he)){RM.healthFallbacks++;return legacyRemote(fn,a,opt)}throw he})}
  function run(fn,a,opt){M.calls++;fn=t(fn).trim();if(!fn)return Promise.reject(E("method required","METHOD_REQUIRED"));var wr=/^api(?:Save|Delete|Update|Create|Import|Extract|Upload|Issue|Process|Cleanup|Generate|Send|Patch|Approve|Reject|Submit|Queue|Migrate|Revoke|Refresh)/i.test(fn),k=wr?"":fn+"|"+JSON.stringify(a==null?{}:a);if(k&&F[k]){M.dedupeHits++;return F[k]}var p=remote(fn,a,opt);if(!k)return p;F[k]=p.then(function(v){delete F[k];return v},function(e){delete F[k];throw e});return F[k]}
  function reset(){Object.keys(P).forEach(function(id){rm(id,E("Bridge reset","GAS_BRIDGE_RESET"))});Object.keys(PP).forEach(function(id){rpm(id,E("POST reset","GAS_POST_RESET"))});try{frame&&frame.remove()}catch(_){}frame=null;ready=null;source=null;nonce="";proto="";state="idle";origin="";channel="";last="";return true}
  function legacyStatus(){return{ok:!!gas(),owner:OWNER,mode:"legacy-bridge-post",transportMode:"legacy-bridge-post",gasWebAppUrlConfigured:!!gas(),parentOrigin:w.location.origin,protocol:proto||"pending",bridgeLoadState:state,bridge:{state:state,ready:state==="ready",protocol:proto,origin:origin,channel:channel,lastError:last},expectedBridgeVersion:VER,pending:Object.keys(P).length+Object.keys(PP).length,metrics:Object.assign({},M)}}
  function hybridStatus(){var l=legacyStatus(),active=RHS==="ready"?"rpc":(RHS==="unsupported"?"legacy":"negotiating");return{ok:!!gas(),owner:OWNER,mode:MODE,transportMode:MODE,activeTransport:active,gasWebAppUrlConfigured:!!gas(),parentOrigin:w.location.origin,rpc:{state:RHS,ready:RHS==="ready",version:RPC_VER,serverVersion:RHV,allowedOrigin:RHA,lastError:RHE,pending:Object.keys(RQ).length,metrics:Object.assign({},RM)},legacy:l,bridgeRequired:RHS!=="ready",bridgeLoadState:RHS==="ready"?"retired-by-rpc":l.bridgeLoadState,bridge:RHS==="ready"?{state:"retired-by-rpc",ready:false,protocol:"none",origin:"",channel:"none",lastError:""}:l.bridge,expectedBridgeVersion:VER,pending:Object.keys(RQ).length+l.pending,metrics:{rpc:Object.assign({},RM),legacy:Object.assign({},M)}}}
  function resetAll(){RHS="unknown";RHE="";RHV="";RHA=false;RH=null;Object.keys(RQ).forEach(function(k){delete RQ[k]});reset();return true}
  function logo(){var u=t(c("logoUrl",c("fallbackLogoUrl",""))).trim();if(!u)return false;try{Array.prototype.forEach.call(d.querySelectorAll('[data-logo="parliament"],#login-logo-img,#side-logo-img,#mobile-topbar-logo,.print-logo-img'),function(i){i.setAttribute("src",u);i.style.display="";i.style.visibility="visible"})}catch(_){}return true}
  w.AppTransport=w.AppTransport||{};var A=w.AppTransport;A.__owner=OWNER;A.mode=MODE;A.transportMode=MODE;A.run=run;A.probe=function(){return rpcHealth(true)};A.runGasDirectBridge=remote;A.runVercelProxy=remote;A.runJsonpApi=remote;A.runLoginPost=function(fn,a,opt){return remote(fn,a,opt)};A.ensureBridgeClient=function(){return rpcHealth(false).then(function(){return true},function(e){if(rpcCanFallbackHealth(e))return ensure();throw e})};A.warmAuthBridge=function(){return A.ensureBridgeClient().then(function(){return true},function(){return false})};A.bridgeClientState=function(){return hybridStatus().bridge};A.resetBridge=resetAll;A.reset=resetAll;A.clearApiCache=function(){F=Object.create(null);return true};A.invalidateClientApiCache=A.clearApiCache;A.loadPublicConfig=function(){logo();return Promise.resolve({ok:true,gasWebAppUrlConfigured:!!gas(),transportMode:MODE,rpcVersion:RPC_VER})};A.runtimeOwnerStatus=hybridStatus;A.assertRuntimeOwner=function(){var s=hybridStatus();if(!s.ok)throw E("GitHub Pages GAS transport ไม่พร้อม","APP_RUNTIME_OWNER_MISMATCH");return s};A.releaseStatus=function(){var s=hybridStatus();return{ok:true,transportMode:MODE,rpcVersion:RPC_VER,activeTransport:s.activeTransport,expectedBridgeVersion:VER,mismatch:[],warnings:s.rpc.lastError?[s.rpc.lastError]:[]}};A.phase2Status=hybridStatus;A.phase1Status=hybridStatus;A.phase0Status=hybridStatus;A.clientCacheStatus=function(){return{ok:true,owner:OWNER,readResponseCache:false,inFlight:Object.keys(F).length,metrics:hybridStatus().metrics}};A.setGasWebAppUrl=function(u){u=t(u).trim();if(!/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec(?:[?#].*)?$/i.test(u))return gas();u=u.replace(/[?#].*$/,"");w.APP_CONFIG=w.APP_CONFIG||{};w.APP_CONFIG.gasWebAppUrl=u;w.GAS_WEB_APP_URL=u;resetAll();return u};A.ping=function(){return run("apiSessionCheck",{},{timeoutMs:15000})};A.status=hybridStatus;try{logo()}catch(_){}
})(window,document);