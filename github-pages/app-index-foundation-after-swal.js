// GENERATED from gas-backend/Index.html post-swal-foundation. Do not edit directly.
(function(root){function safeAlertFire(a,b,c){var opts=a&&typeof a=="object"?a:{title:a,text:b,icon:c},title=String(opts.title||opts.icon||"แจ้งเตือน"),text=String(opts.text||opts.html||"");try{alert(text?title+`
`+text.replace(/<[^>]*>/g," "):title)}catch(_e){__appObserve(_e,"ec")}return Promise.resolve({isConfirmed:!0,isDenied:!1,isDismissed:!1,value:opts.inputValue||null})}function sanitizeHtmlWithDom(html){var blockedTags={script:1,iframe:1,object:1,embed:1,link:1,meta:1,base:1},safe=document.createElement("template");safe.innerHTML=String(html||"");var nodes=safe.content.querySelectorAll("*");return Array.prototype.slice.call(nodes).forEach(function(node){var tag=String(node.tagName||"").toLowerCase();if(blockedTags[tag])return node.remove(),void 0;Array.prototype.slice.call(node.attributes||[]).forEach(function(attr){var name=String(attr.name||"").toLowerCase(),value=String(attr.value||"");return/^on/i.test(name)||name==="srcdoc"||name==="formaction"||name==="xlink:href"?(node.removeAttribute(attr.name),void 0):name!=="href"&&name!=="src"||!/^(javascript|vbscript|data\s*:\s*text\/html)/i.test(value.trim())?(name==="style"&&/(expression\s*\(|javascript\s*:|url\s*\(\s*['"]?\s*javascript:)/i.test(value)&&node.removeAttribute(attr.name),void 0):(node.setAttribute(attr.name,"#"),void 0)})}),safe.innerHTML}function sanitizeSwalOptions(input){var opts=input&&typeof input=="object"?Object.assign({},input):input;return opts&&typeof opts=="object"&&opts.html&&(opts.html=sanitizeHtmlWithDom(opts.html)),opts&&typeof opts=="object"&&opts.trustedHtml&&delete opts.trustedHtml,opts}function sanitizeSwalArgs(args){return(args=Array.prototype.slice.call(args||[])).length===1?args[0]=sanitizeSwalOptions(args[0]):args.length>1&&typeof args[1]=="string"&&(args[1]=sanitizeHtmlWithDom(args[1])),args}function installSafeSwalGuard(){if(!root.Swal||typeof root.Swal.fire!="function"||root.Swal.__appSafeGuarded)return!1;var originalFire=root.Swal.fire.bind(root.Swal);return root.Swal.fire=function(){return originalFire.apply(root.Swal,sanitizeSwalArgs(arguments))},root.Swal.__appSafeGuarded=!0,!0}function safeDelay(fn,ms,label){var run=typeof fn=="function"?fn:function(){},kit=root.AppIndexKit||root.AppProductionFinal;return kit&&typeof kit.delay=="function"?kit.delay(label||"critical.swal.guard",run,ms||0):root.setTimeout(run,ms||0)}root.__swalSafeGuardInstalled||(root.__swalSafeGuardInstalled=!0,root.Swal?(typeof root.Swal.fire!="function"&&(root.Swal.fire=safeAlertFire),typeof root.Swal.close!="function"&&(root.Swal.close=function(){}),typeof root.Swal.showLoading!="function"&&(root.Swal.showLoading=function(){})):root.Swal={__safeAlert:!0,fire:safeAlertFire,close:function(){},showLoading:function(){}},root.__sanitizeHtmlWithDom=sanitizeHtmlWithDom,root.__sanitizeSwalOptions=sanitizeSwalOptions,root.__sanitizeSwalArgs=sanitizeSwalArgs,root.appSwalFire=function(){installSafeSwalGuard();var args=sanitizeSwalArgs(arguments),fire;return(root.Swal&&typeof root.Swal.fire=="function"?root.Swal.fire:safeAlertFire).apply(root.Swal||null,args)},root.appSwalFire.__criticalSwalFacade=!0,root.appSwalFire.__appEarlyFacade=!0,installSafeSwalGuard(),safeDelay(installSafeSwalGuard,0,"critical.swal.ready0"),safeDelay(installSafeSwalGuard,800,"critical.swal.ready800"),document.readyState==="loading"?document.addEventListener("DOMContentLoaded",installSafeSwalGuard,{once:!0}):safeDelay(installSafeSwalGuard,0,"critical.swal.domready"),root.addEventListener&&root.addEventListener("load",installSafeSwalGuard,{once:!0}))})(window);;
window.APP_LOGO=window.APP_LOGO||(function(root) {
  var cfg = root.APP_CONFIG || {};
  var fallback = String(cfg.fallbackLogoUrl || cfg.logoUrl || "");
  var active = String(cfg.logoUrl || fallback);
  return {
    svg: fallback,
    png96: fallback,
    png192: fallback,
    png512: fallback,
    inline: "",
    active: active,
    source: "github-static-app-config"
  };
})(window)||{};window.APP_PWA_MANIFEST=window.APP_PWA_MANIFEST||{name:'ระบบบริหารจัดการเรื่องพิจารณา',short_name:'Committee App',start_url:'./',display:'standalone',background_color:'#001e3c',theme_color:'#001e3c',icons:[{src:window.APP_LOGO.png192,sizes:'192x192',type:'image/png'},{src:window.APP_LOGO.png512,sizes:'512x512',type:'image/png'}]};try{var manifestJson=JSON.stringify(window.APP_PWA_MANIFEST),manifestHref='data:application/manifest+json;charset=utf-8,'+encodeURIComponent(manifestJson),manifestLink=document.createElement('link');manifestLink.rel='manifest',manifestLink.href=manifestHref,document.head.appendChild(manifestLink)}catch(_e){typeof __appObserve==='function'&&__appObserve(_e,'ec')};
window.AppBoot&&window.AppBoot.setFlag("__APP_ASSET_POLICY_CURRENT__",{buildTag:"asset-manifest-current",assetMode:"pinned-cdn-on-demand",pinExactBuilds:!0,allowFloatingMajorBuild:!1,criticalPreload:["logo","vue","sweetalert2"],onDemandExternalGroups:["bootstrap","xlsx"],policy:{crossorigin:"anonymous",referrerPolicy:"no-referrer"}},{owner:"Index.asset-hardening"}),window.APP_EXTERNAL_ASSETS=window.APP_EXTERNAL_ASSETS||{bootstrap:{buildTag:"5.3.0",onDemand:!0,scripts:["https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"]},xlsx:{buildTag:"0.18.5",onDemand:!0,scripts:["https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"]}};;
window.DEFAULT_LOGO=window.DEFAULT_LOGO||(window.APP_LOGO&&(window.APP_LOGO.active||window.APP_LOGO.svg))||'';window.LOGO_URL=String((window.APP_CONFIG || {}).logoUrl || "")||window.DEFAULT_LOGO;window.currentLogoUrl=window.LOGO_URL||window.DEFAULT_LOGO;window.__SAFE_LOGO_URL__=window.currentLogoUrl||window.DEFAULT_LOGO;;
(function(root){function logoSrc(){var logo=root.APP_LOGO||{};return String(root.currentLogoUrl||root.LOGO_URL||root.__SAFE_LOGO_URL__||logo.active||logo.png96||logo.svg||"")}var __parliamentLogo=logoSrc();function schedule(){try{root.patchParliamentLogo()}catch(_e){__appObserve(_e,"ec")}}function logoDelay(ms){return root.AppProductionFinal&&typeof root.AppProductionFinal.delay=="function"?root.AppProductionFinal.delay("logo.patch.retry",schedule,ms):root.setTimeout(schedule,ms)}root.AppBoot.setFlag("__APP_PARLIAMENT_LOGO__",__parliamentLogo,{owner:"Index.logo"}),root.patchParliamentLogo=root.patchParliamentLogo||function(){var src=logoSrc();if(!src)return!1;var nodes=document.querySelectorAll('[data-logo="parliament"],#login-logo-img,#side-logo-img,#mobile-topbar-logo,.print-logo-img');return Array.prototype.forEach.call(nodes,function(img){img&&img.setAttribute&&(img.getAttribute("src")!==src&&img.setAttribute("src",src),img.onerror=function(){this&&this.getAttribute("src")!==src&&this.setAttribute("src",src)})}),!0},document.readyState==="loading"?document.addEventListener("DOMContentLoaded",schedule,{once:!0}):schedule(),[250,1e3].forEach(function(ms){logoDelay(ms)})})(window);;
window.__APP_BOOTSTRAP__=(function(root) {
  var cfg = root.APP_CONFIG || {};
  var release = String(cfg.releaseStamp || "commission-v1.2-gas-hosted-production-2026-07-13-r94");
  var assetManifest = cfg.assetManifest || {};
  return {
    ok: true,
    page: "/dashboard",
    requestedPage: "/dashboard",
    session: null,
    user: null,
    source: "github-pages-static-bootstrap",
    generatedAt: "build-time",
    authenticated: false,
    username: "",
    displayName: "",
    role: "",
    csrfToken: "",
    authBootstrapMode: "vercel-api-proxy",
    sessionRestoreSupported: true,
    sessionResumeMode: "sessionStorage-opaque-resume-handle",
    loginRouteContract: "router-login-renders-form-current-critical-runtime",
    criticalRuntimeContract: "critical-login-runtime-production-current",
    runtimeAuthContract: "runtime-auth-production-current",
    logoUrl: String(cfg.logoUrl || cfg.fallbackLogoUrl || ""),
    defaultRoute: "/dashboard",
    appStamp: "github-pages-static-" + release,
    assetStamp: String(assetManifest.stamp || cfg.assetStamp || "asset-manifest-commission-v1.2-gas-hosted-production-2026-07-13-r94"),
    baseUrl: "",
    uiMode: "vue3",
    enabledVuePages: ["/login", "/dashboard", "/meeting", "/search", "/track", "/report", "/people", "/petitioner", "/budget", "/admin"],
    terminology: cfg.terminology || {},
    printStandard: cfg.printStandard || {}
  };
})(window);
window.__APP_ASSET_MANIFEST__=(function(root) {
  var cfg = root.APP_CONFIG || {};
  return cfg.assetManifest || {
    stamp: cfg.assetStamp || "",
    bundles: {},
    upfrontScripts: [],
    chunks: {},
    templates: {},
    externalGroups: [],
    externalAssets: {}
  };
})(window);
