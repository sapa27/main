/* Production compatibility bootstrap: canonical permission, SafeDOM, Thai date, auth facade, assets, and deferred runtime map. */
(function(root,doc){
  "use strict";
  if(!root) return;
  root.__VERCEL_MIGRATION_CONFIG__=root.__VERCEL_MIGRATION_CONFIG__||{};
  var OWNER="github-pages/runtime-bootstrap-r265";
  function text(v){return v==null?"":String(v)}
  function fn(v){return typeof v==="function"}

  /* Canonical permission contract. */
  var rank={Viewer:1,Staff:2,Admin:3};
  var aliases={dash:"dashboard",personnel:"people",committee:"committee-meeting",committeemeeting:"committee-meeting",committee_meeting:"committee-meeting",tracking:"track"};
  var roles={
    Viewer:{pages:["dashboard","search"],deniedApiGroups:["admin-users","admin-budget","budget","personnel","petitioners"],allowWrites:false},
    Staff:{pages:["dashboard","meeting","committee-meeting","search","track","report","people","petitioner","budget"],deniedApiGroups:["admin-users","admin-budget"],allowWrites:true},
    Admin:{pages:["*"],deniedApiGroups:[],allowWrites:true}
  };
  var apiGroups={budget:"Staff",personnel:"Staff",petitioners:"Staff","admin-users":"Admin","admin-budget":"Admin","admin-diagnostics":"Admin","admin-release":"Admin","admin-go-live":"Admin","admin-maintenance-final":"Admin"};
  var deferredRoles={Scripts_Page_Dashboard:"Viewer",Runtime_01_Request_Lifecycle:"Viewer",Runtime_02_Date_Time:"Viewer",Runtime_03_Table_UI:"Viewer",Runtime_04_Thailand_Location:"Staff",Runtime_05_Status_Aging:"Viewer",Runtime_08_AI_Bridge:"Viewer",Runtime_09_QA_Regression:"Admin","Scripts_Page_ReportTrack::search":"Viewer","Scripts_Page_ReportTrack::reporttrack-common":"Viewer","Scripts_Page_ReportTrack::print":"Viewer",Scripts_Page_Meeting:"Staff","Scripts_Page_Meeting::meeting-common":"Staff","Scripts_Page_Meeting::meeting":"Staff","Scripts_Page_Meeting::committee":"Staff","Scripts_Page_ReportTrack::track":"Staff","Scripts_Page_ReportTrack::report":"Staff",Scripts_Page_Petitioner:"Staff",Scripts_Page_People:"Staff",Scripts_Page_Budget:"Staff",Scripts_Page_Admin:"Admin"};
  var bundleRoles={appCritical:"Viewer",appCore:"Viewer",runtimeDateTable:"Viewer",runtimeThailandLocation:"Staff",runtimeStatusAging:"Viewer",runtimeAiBridge:"Viewer",runtimeQaRegression:"Admin",pageDashboard:"Viewer",pageMeeting:"Staff",pageCommitteeMeeting:"Staff",pageTrackReport:"Staff",pagePetitioner:"Staff",pagePeople:"Staff",pageBudget:"Staff",pageAdmin:"Admin",pageAiPrint:"Viewer"};
  function normalizeRole(role){var raw=text(role).trim(),key=raw.toLowerCase();if(/^(admin|administrator|owner|superadmin|super-admin)$/.test(key)||/ผู้ดูแล|แอดมิน/.test(raw))return"Admin";if(/^(staff|officer|user|editor|operator)$/.test(key)||/เจ้าหน้าที่|เลขานุการ|ปฏิบัติการ/.test(raw))return"Staff";return"Viewer"}
  function normalizePage(page){var key=text(page).trim().toLowerCase().replace(/^#?\/?/,"");return aliases[key]||key||"dashboard"}
  function canPage(role,page){role=normalizeRole(role);page=normalizePage(page);var p=roles[role]||roles.Viewer,ps=p.pages||[];return ps.indexOf("*")>=0||ps.indexOf(page)>=0}
  function roleRank(role){return rank[normalizeRole(role)]||1}
  function canApi(role,method,meta){meta=meta||{};if(meta.public===true)return true;role=normalizeRole(role);var group=text(meta.group||meta.domain).trim().toLowerCase(),policy=roles[role]||roles.Viewer;if((policy.deniedApiGroups||[]).indexOf(group)>=0)return false;if(meta.write===true&&policy.allowWrites!==true)return false;var required=normalizeRole(meta.minRole||(meta.write===true?"Staff":"Viewer")),groupRequired=apiGroups[group]||"Viewer";if(roleRank(groupRequired)>roleRank(required))required=normalizeRole(groupRequired);return roleRank(role)>=roleRank(required)}
  var permissionRaw={stamp:"permission-matrix-p0-2026-07-30-r212",owner:"Code_02_Platform_Permissions.APP_PERMISSION_MATRIX",defaultRole:"Viewer",roles:roles,pageAliases:aliases,apiGroupMinimumRole:apiGroups,deferredAssetMinimumRole:deferredRoles,bundleMinimumRole:bundleRoles};
  root.__APP_PERMISSION_MATRIX__=permissionRaw;
  root.AppPermissionMatrix=Object.freeze({stamp:permissionRaw.stamp,owner:OWNER+".permission",raw:permissionRaw,normalizeRole:normalizeRole,normalizePage:normalizePage,canPage:canPage,canApi:canApi,allowedPages:function(role){return((roles[normalizeRole(role)]||roles.Viewer).pages||[]).slice()},rank:roleRank});

  /* Canonical SafeDOM bootstrap required by Core Runtime. */
  var Safe=root.AppSafeHtml=root.AppSafeHtml||{};
  function byId(target){return target&&target.nodeType?target:(doc&&target?doc.getElementById(text(target)):null)}
  function escapeHtml(v){return text(v).replace(/[&<>"']/g,function(ch){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]||ch})}
  function sanitizeHtml(html){return text(html).replace(/<\s*(script|iframe|object|embed|base)\b[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi,"").replace(/<\s*(script|iframe|object|embed|base)\b[^>]*\/?\s*>/gi,"").replace(/\s(?:on[a-z0-9_:-]+|srcdoc)\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi,"").replace(/((?:href|src|xlink:href|formaction)\s*=\s*['"])\s*(?:javascript|vbscript|data\s*:\s*text\/html)[\s\S]*?(['"])/gi,"$1#$2")}
  function setText(target,value){var el=byId(target);if(el)el.textContent=text(value);return el}
  function setHtml(target,html){var el=byId(target);if(!el)return null;var tpl=doc.createElement("template");tpl.innerHTML=sanitizeHtml(html);var frag=(tpl.content||tpl).cloneNode(true);if(fn(el.replaceChildren))el.replaceChildren(frag);else{while(el.firstChild)el.removeChild(el.firstChild);el.appendChild(frag)}return el}
  Safe.owner=Safe.owner||OWNER+".safehtml";Safe.__bootstrapCompat=true;Safe.byId=Safe.byId||byId;Safe.escapeHtml=Safe.escapeHtml||escapeHtml;Safe.esc=Safe.esc||Safe.escapeHtml;Safe.sanitizeHtml=Safe.sanitizeHtml||sanitizeHtml;Safe.setText=Safe.setText||setText;Safe.setSanitizedHtml=Safe.setSanitizedHtml||setHtml;Safe.setHtml=Safe.setHtml||Safe.setSanitizedHtml;Safe.setTrustedHtml=Safe.setTrustedHtml||Safe.setSanitizedHtml;Safe.setTrustedTemplate=Safe.setTrustedTemplate||Safe.setTrustedHtml;root.safeSetInnerHTML=root.safeSetInnerHTML||function(target,html){return Safe.setSanitizedHtml(target,html)};

  /* Canonical Thai date contract. */
  var Format=root.AppFormat=root.AppFormat||{};Format.text=Format.text||text;Format.escapeHtml=Format.escapeHtml||escapeHtml;Format.pad2=Format.pad2||function(v){var s=String(Math.abs(Number(v)||0));return s.length<2?"0"+s:s};
  Format.normalizeThaiYear=Format.normalizeThaiYear||function(v){var y=Number(text(v).replace(/[^0-9]/g,""))||0;return y?y>=3600&&y<=3700?y-1086:y>=3000&&y<=3200?y-543:y<2400?y+543:y:0};
  Format.safeThaiDateText=Format.safeThaiDateText||function(day,month,year){day=Number(day);month=Number(month);year=Format.normalizeThaiYear(year);return day>=1&&day<=31&&month>=1&&month<=12&&year?Format.pad2(day)+"/"+Format.pad2(month)+"/"+year:""};
  Format.formatThaiDateObject=Format.formatThaiDateObject||function(value){return value&&Object.prototype.toString.call(value)==="[object Date]"&&!isNaN(value.getTime())?Format.safeThaiDateText(value.getDate(),value.getMonth()+1,value.getFullYear()):""};
  Format.canonicalThaiDateText=Format.canonicalThaiDateText||function(value,options){options=options||{};if(value==null)return"";if(Object.prototype.toString.call(value)==="[object Date]"&&!isNaN(value.getTime()))return Format.formatThaiDateObject(value);if(typeof value==="number"&&isFinite(value)&&value>20000&&value<90000)return Format.formatThaiDateObject(new Date(Math.round(864e5*(value-25569))));var raw=text(value).replace(/^'+/,"").replace(/[\u00A0\u200B-\u200D\uFEFF]/g,"").trim();if(!raw)return"";if(options.rejectIdentifierLike!==false&&(/^(?:CASE|MAIN|ROW)[_-]/i.test(raw)||/^\d+\s*\/\s*25\d{2}$/.test(raw)||raw==="-"||raw==="/"))return"";var m=raw.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.]((?:19|20|25|30|31|36)\d{2})$/);if(m)return Format.safeThaiDateText(m[1],m[2],m[3]);m=raw.match(/^((?:19|20|25|30|31|36)\d{2})[-\/](\d{1,2})[-\/](\d{1,2})(?:[T\s].*)?$/);if(m)return Format.safeThaiDateText(m[3],m[2],m[1]);if(/GMT|T\d{2}:\d{2}:\d{2}/i.test(raw)){var d=new Date(raw);if(!isNaN(d.getTime()))return Format.formatThaiDateObject(d)}if(fn(options.fallback))try{var c=text(options.fallback(raw)).trim(),p=c.match(/^(\d{1,2})\/(\d{1,2})\/((?:19|20|25|30|31|36)\d{2})$/);if(p)return Format.safeThaiDateText(p[1],p[2],p[3])}catch(_e){}return options.preserveUnknown===true?raw:""};
  Format.__thaiDateContractOwner="Index:AppFormat.canonical-thai-date-r153";

  /* Missing auth facade required directly by Meeting/Budget page runtimes. */
  function authSnapshot(){var s=root.AppStore,get=function(path,def){try{return s&&fn(s.get)?s.get(path,def):def}catch(_e){return def}},token=text(get("auth.token","")).trim(),status=text(get("auth.status","")).trim().toLowerCase(),user=get("auth.user",null),loginOk=get("auth.loginOk",false)===true||get("auth.bootstrapOk",false)===true;return{token:token,status:status,user:user,role:normalizeRole(get("auth.role",user&&(user.role||user.userRole||user.accessRole)||"")),authenticated:!!token&&(status==="authenticated"||loginOk||!!user)}}
  root.AppAuthState=Object.assign(root.AppAuthState||{},{owner:OWNER+".auth",snapshot:authSnapshot,isAuthenticated:function(){return authSnapshot().authenticated}});
  root.isAuthenticated=function(){return root.AppAuthState.isAuthenticated()};

  /* Canonical external assets used by on-demand page controls. */
  root.APP_EXTERNAL_ASSETS=Object.assign({},root.APP_EXTERNAL_ASSETS||{}, {
    bootstrap:{styles:[],scripts:["https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"]},
    xlsx:{styles:[],scripts:["https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"]}
  });

  /* Canonical asset/deferred map — keep bundle names so GAS can return one coherent bundle. */
  var bundles={appCritical:{files:["Scripts_Critical_Login_Runtime"]},appCore:{files:["Scripts_Core_Runtime","Runtime_01_Request_Lifecycle"]},runtimeDateTable:{files:["Runtime_02_Date_Time","Runtime_03_Table_UI"]},runtimeThailandLocation:{minRole:"staff",files:["Runtime_04_Thailand_Location"]},runtimeStatusAging:{files:["Runtime_05_Status_Aging"]},runtimeAiBridge:{files:["Runtime_08_AI_Bridge"]},runtimeQaRegression:{minRole:"admin",files:["Runtime_09_QA_Regression"]},pageDashboard:{files:["Scripts_Page_Dashboard"]},pageMeeting:{minRole:"staff",files:["Scripts_Page_Meeting::meeting-common","Scripts_Page_Meeting::meeting"]},pageCommitteeMeeting:{minRole:"staff",files:["Scripts_Page_Meeting::meeting-common","Scripts_Page_Meeting::committee"]},pageTrackReport:{minRole:"staff",files:["Scripts_Page_ReportTrack::reporttrack-common"]},pagePetitioner:{minRole:"staff",files:["Scripts_Page_Petitioner"]},pagePeople:{minRole:"staff",files:["Scripts_Page_People"]},pageBudget:{minRole:"staff",files:["Scripts_Page_Budget"]},pageAdmin:{minRole:"admin",files:["Scripts_Page_Admin"]},pageAiPrint:{files:["Scripts_Page_ReportTrack::print"]}};
  var chunks={dashboard:["Scripts_Page_Dashboard"],search:["bundle:runtimeDateTable","Runtime_05_Status_Aging","Scripts_Page_ReportTrack::reporttrack-common"],petitioner:["bundle:runtimeDateTable","Runtime_04_Thailand_Location","Scripts_Page_Petitioner"],meeting:["bundle:runtimeDateTable","Scripts_Page_Meeting::meeting-common","Scripts_Page_Meeting::meeting"],"committee-meeting":["bundle:runtimeDateTable","Scripts_Page_Meeting::meeting-common","Scripts_Page_Meeting::committee"],track:["bundle:runtimeDateTable","Runtime_05_Status_Aging","Scripts_Page_ReportTrack::reporttrack-common"],report:["bundle:runtimeDateTable","Runtime_05_Status_Aging","Scripts_Page_ReportTrack::reporttrack-common"],people:["bundle:runtimeDateTable","Scripts_Page_People"],personnel:["bundle:runtimeDateTable","Scripts_Page_People"],budget:["bundle:runtimeDateTable","Runtime_04_Thailand_Location","Runtime_05_Status_Aging","Scripts_Page_Budget"],admin:["bundle:runtimeDateTable","Scripts_Page_Admin"],ai:["Runtime_08_AI_Bridge"],print:["Scripts_Page_ReportTrack::print"]};
  root.__APP_ASSET_MANIFEST__={stamp:"asset-manifest-r265-github-coherent",sourceOwner:"gas-backend/Code_03_Platform_Assets",bundles:bundles,chunks:chunks,templates:{},upfrontScripts:[],externalGroups:["bootstrap","xlsx"]};
  function lock(name,value,accept){try{Object.defineProperty(root,name,{configurable:false,enumerable:false,get:function(){return value},set:function(next){if(!accept||accept(next))value=next}})}catch(_e){root[name]=value}}
  lock("__APP_CORE_RUNTIME_FILES__",["Scripts_Core_Runtime","Runtime_01_Request_Lifecycle"],function(next){return Array.isArray(next)&&next.indexOf("Scripts_Core_Runtime")>=0&&next.indexOf("Runtime_01_Request_Lifecycle")>=0});
  lock("__APP_DEFERRED_SCRIPTS__",chunks,function(next){return!!(next&&next.dashboard&&next.search&&next.meeting&&next["committee-meeting"]&&next.budget)});
  try{root.__APP_DEFERRED_TEMPLATES__=root.__APP_DEFERRED_TEMPLATES__||{}}catch(_e){}

  /* Single UI owners for Dashboard refresh and committee agenda. Save/Delete remain page-owned and exactly-once. */
  function currentPage(){try{return normalizePage(root.AppStore&&fn(root.AppStore.get)?root.AppStore.get("ui.currentPage",""):"")}catch(_e){return""}}
  var dashboardRefreshInFlight=false;
  function setDashBusy(button,on){
    if(!button)return;
    try{
      button.disabled=!!on;
      button.setAttribute("aria-busy",on?"true":"false");
      if(on){button.dataset.r265Label=button.innerHTML;button.innerHTML='<i class="fas fa-spinner fa-spin me-1"></i>กำลังรีเฟรช';}
      else if(button.dataset.r265Label){button.innerHTML=button.dataset.r265Label;delete button.dataset.r265Label;}
    }catch(_e){}
  }
  function dashboardRefreshOwner(ev){
    var button=ev&&ev.target&&ev.target.closest?ev.target.closest("#dash-refresh-btn"):null;
    if(!button||currentPage()!=="dashboard")return;
    try{ev.preventDefault();ev.stopPropagation();ev.stopImmediatePropagation&&ev.stopImmediatePropagation()}catch(_e){}
    if(dashboardRefreshInFlight)return;
    dashboardRefreshInFlight=true;setDashBusy(button,true);
    try{
      var dash=root.AppDashboard||{},task=null;
      if(fn(dash.refresh))task=dash.refresh({source:"r265-dashboard-refresh",forceFresh:true,noCache:true});
      else if(root.AppLifecycle&&fn(root.AppLifecycle.refresh))task=root.AppLifecycle.refresh("dashboard",{source:"r265-dashboard-refresh",forceFresh:true,noCache:true});
      else if(fn(root.loadDash))task=root.loadDash({source:"r265-dashboard-refresh",forceFresh:true,noCache:true});
      Promise.resolve(task).catch(function(err){
        if(root.AppRuntime&&fn(root.AppRuntime.handleError))root.AppRuntime.handleError(err,"รีเฟรช Dashboard ไม่สำเร็จ");
      }).finally(function(){dashboardRefreshInFlight=false;setDashBusy(button,false)});
    }catch(err){
      dashboardRefreshInFlight=false;setDashBusy(button,false);
      if(root.AppRuntime&&fn(root.AppRuntime.handleError))root.AppRuntime.handleError(err,"รีเฟรช Dashboard ไม่สำเร็จ");
    }
  }
  function showDashboardRouteLoading(){
    if(currentPage()!=="dashboard")return;
    var page=doc&&doc.getElementById("p-dash");if(!page)return;
    try{
      page.setAttribute("aria-busy","true");
      var note=doc.getElementById("dash-r265-route-loading");
      if(!note){
        note=doc.createElement("div");note.id="dash-r265-route-loading";note.className="alert alert-light border d-flex align-items-center gap-2 py-2 px-3 mb-3";
        note.setAttribute("role","status");note.setAttribute("aria-live","polite");
        note.innerHTML='<span class="spinner-border spinner-border-sm" aria-hidden="true"></span><span>กำลังโหลดข้อมูล Dashboard…</span>';
        page.insertBefore(note,page.firstChild||null);
      }
    }catch(_e){}
  }
  function clearDashboardRouteLoading(){
    var note=doc&&doc.getElementById("dash-r265-route-loading"),page=doc&&doc.getElementById("p-dash");
    try{note&&note.parentNode&&note.parentNode.removeChild(note);page&&page.removeAttribute("aria-busy")}catch(_e){}
  }
  function agendaOwner(ev){
    var btn=ev&&ev.target&&ev.target.closest?ev.target.closest('#committee-agenda-accordion .accordion-button[data-bs-target^="#committee-agenda-"],#committee-agenda-accordion [aria-controls^="committee-agenda-"]'):null;
    if(!btn||currentPage()!=="committee-meeting")return;
    var selector=text(btn.getAttribute("data-bs-target")||("#"+text(btn.getAttribute("aria-controls"))));
    if(selector.indexOf("#committee-agenda-")!==0)return;
    var panel=doc.querySelector(selector);if(!panel)return;
    try{ev.preventDefault();ev.stopPropagation();ev.stopImmediatePropagation&&ev.stopImmediatePropagation()}catch(_e){}
    try{
      var scope=panel.closest("#committee-agenda-accordion")||doc,wasOpen=panel.classList.contains("show");
      Array.prototype.forEach.call(scope.querySelectorAll('.accordion-collapse[id^="committee-agenda-"]'),function(p){
        var open=p===panel?!wasOpen:false;
        p.classList.toggle("show",open);p.classList.toggle("collapse",true);p.style.display=open?"block":"none";
        var b=scope.querySelector('[data-bs-target="#'+p.id+'"],[aria-controls="'+p.id+'"]');
        if(b){b.classList.toggle("collapsed",!open);b.setAttribute("aria-expanded",open?"true":"false");}
      });
      try{doc.dispatchEvent(new CustomEvent("committee:agenda-toggle",{detail:{id:panel.id,open:!wasOpen,source:"r265-single-owner"}}))}catch(_evt){}
    }catch(err){
      if(root.AppRuntime&&fn(root.AppRuntime.recordWarning))root.AppRuntime.recordWarning("r265.committee.agenda",err);
    }
  }
  if(doc){
    doc.addEventListener("click",dashboardRefreshOwner,true);
    doc.addEventListener("click",agendaOwner,true);
    doc.addEventListener("app:page-changing",function(ev){var to=normalizePage(ev&&ev.detail&&ev.detail.to||"");if(to==="dashboard")setTimeout(showDashboardRouteLoading,0)},false);
    doc.addEventListener("app:page-activated",function(ev){var id=normalizePage(ev&&ev.detail&&(ev.detail.id||ev.detail.pageId)||"");if(id==="dashboard")clearDashboardRouteLoading()},false);
    try{doc.documentElement.setAttribute("data-runtime-bootstrap","r265");doc.documentElement.setAttribute("data-safe-html-bootstrap","r265");doc.documentElement.setAttribute("data-thai-date-contract","r153");doc.documentElement.setAttribute("data-auth-facade","r265");doc.documentElement.setAttribute("data-dashboard-ui-owner","r265");doc.documentElement.setAttribute("data-committee-agenda-owner","r265");doc.documentElement.setAttribute("data-permission-matrix-stamp",permissionRaw.stamp)}catch(_e){}
  }
  root.__APP_RUNTIME_DEPENDENCY_MAP__={ok:true,owner:OWNER,stamp:"r265",core:root.__APP_CORE_RUNTIME_FILES__.slice(),pages:Object.keys(chunks),authFacade:true,externalAssets:true};
})(typeof window!=="undefined"?window:globalThis,typeof document!=="undefined"?document:null);
