(function(w,d){
  "use strict";
  if(!w||!d)return;
  var OWNER="github-pages/github-gas-transport.js::r259-dual-bridge-post-handshake";
  var MODE="github-pages-gas-router-bridge-first";
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
  function good(z){z=t(z).toLowerCase();return z==="https://script.google.com"||/^https:\/\/(?:[a-z0-9-]+\.)*script\.googleusercontent\.com$/.test(z)}
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
  function remote(fn,a,opt){return bridge(fn,a,opt).catch(function(be){if(!can(be))throw be;M.postFallbacks++;return post(fn,a,opt).catch(function(pe){var e=E("ไม่สามารถเชื่อมต่อ GAS ได้ — Bridge: "+t(be&&be.message||be)+" — POST: "+t(pe&&pe.message||pe),/^api(Login|SessionResume|SessionCheck|Logout)$/i.test(t(fn))?"GAS_AUTH_TRANSPORT_UNAVAILABLE":"GAS_API_TRANSPORT_UNAVAILABLE");e.bridgeError=be;e.postError=pe;throw e})})}
  function run(fn,a,opt){M.calls++;fn=t(fn).trim();if(!fn)return Promise.reject(E("method required","METHOD_REQUIRED"));var wr=/^api(?:Save|Delete|Update|Create|Import|Extract|Upload|Issue|Process|Cleanup|Generate|Send|Patch|Approve|Reject|Submit|Queue|Migrate|Revoke|Refresh)/i.test(fn),k=wr?"":fn+"|"+JSON.stringify(a==null?{}:a);if(k&&F[k]){M.dedupeHits++;return F[k]}var p=remote(fn,a,opt);if(!k)return p;F[k]=p.then(function(v){delete F[k];return v},function(e){delete F[k];throw e});return F[k]}
  function reset(){Object.keys(P).forEach(function(id){rm(id,E("Bridge reset","GAS_BRIDGE_RESET"))});Object.keys(PP).forEach(function(id){rpm(id,E("POST reset","GAS_POST_RESET"))});try{frame&&frame.remove()}catch(_){}frame=null;ready=null;source=null;nonce="";proto="";state="idle";origin="";channel="";last="";return true}
  function status(){return{ok:!!gas(),owner:OWNER,mode:MODE,transportMode:MODE,gasWebAppUrlConfigured:!!gas(),parentOrigin:w.location.origin,protocol:proto||"pending",bridgeLoadState:state,bridge:{state:state,ready:state==="ready",protocol:proto,origin:origin,channel:channel,lastError:last},expectedBridgeVersion:VER,pending:Object.keys(P).length+Object.keys(PP).length,metrics:Object.assign({},M)}}
  function logo(){var u=t(c("logoUrl",c("fallbackLogoUrl",""))).trim();if(!u)return false;try{Array.prototype.forEach.call(d.querySelectorAll('[data-logo="parliament"],#login-logo-img,#side-logo-img,#mobile-topbar-logo,.print-logo-img'),function(i){i.setAttribute("src",u);i.style.display="";i.style.visibility="visible"})}catch(_){}return true}
  w.AppTransport=w.AppTransport||{};var A=w.AppTransport;A.__owner=OWNER;A.mode=MODE;A.transportMode=MODE;A.run=run;A.runGasDirectBridge=bridge;A.runVercelProxy=bridge;A.runJsonpApi=bridge;A.runLoginPost=function(fn,a,opt){return post(fn,a,opt)};A.ensureBridgeClient=ensure;A.warmAuthBridge=function(){return ensure().then(function(){return true},function(){return false})};A.bridgeClientState=function(){return status().bridge};A.resetBridge=reset;A.clearApiCache=function(){F=Object.create(null);return true};A.invalidateClientApiCache=A.clearApiCache;A.loadPublicConfig=function(){logo();return Promise.resolve({ok:true,gasWebAppUrlConfigured:!!gas(),transportMode:MODE})};A.runtimeOwnerStatus=status;A.assertRuntimeOwner=function(){var s=status();if(!s.ok)throw E("GitHub Pages GAS transport ไม่พร้อม","APP_RUNTIME_OWNER_MISMATCH");return s};A.releaseStatus=function(){return{ok:true,transportMode:MODE,expectedBridgeVersion:VER,mismatch:[],warnings:[]}};A.phase2Status=status;A.phase1Status=status;A.phase0Status=status;A.clientCacheStatus=function(){return{ok:true,owner:OWNER,readResponseCache:false,inFlight:Object.keys(F).length,metrics:Object.assign({},M)}};A.setGasWebAppUrl=function(u){u=t(u).trim();if(!/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec(?:[?#].*)?$/i.test(u))return gas();u=u.replace(/[?#].*$/,"");w.APP_CONFIG=w.APP_CONFIG||{};w.APP_CONFIG.gasWebAppUrl=u;w.GAS_WEB_APP_URL=u;reset();return u};A.ping=function(){return run("apiGithubBridgePing",{at:Date.now()},{timeoutMs:15000})};A.status=status;try{logo()}catch(_){}w.setTimeout(function(){A.warmAuthBridge()},0)
})(window,document);
