/* Production compatibility bootstrap: canonical permission, safe DOM, Thai date, and deferred runtime dependency map. */
(function(root,doc){
  "use strict";
  if(!root) return;
  root.__VERCEL_MIGRATION_CONFIG__ = root.__VERCEL_MIGRATION_CONFIG__ || {};

  var BOOT_OWNER = "github-pages/runtime-bootstrap-r263";
  var rank = {Viewer:1,Staff:2,Admin:3};
  function text(v){ return v == null ? "" : String(v); }
  function normalizeRole(role){
    var raw=text(role).trim(), key=raw.toLowerCase();
    if(/^(admin|administrator|owner|superadmin|super-admin)$/.test(key)||/ผู้ดูแล|แอดมิน/.test(raw)) return "Admin";
    if(/^(staff|officer|user|editor|operator)$/.test(key)||/เจ้าหน้าที่|เลขานุการ|ปฏิบัติการ/.test(raw)) return "Staff";
    return "Viewer";
  }
  var pageAliases={dash:"dashboard",personnel:"people",committee:"committee-meeting",committeemeeting:"committee-meeting",committee_meeting:"committee-meeting",tracking:"track"};
  function normalizePage(page){ var k=text(page).trim().toLowerCase().replace(/^#?\/?/,""); return pageAliases[k]||k||"dashboard"; }
  var roles={
    Viewer:{pages:["dashboard","search"],allowWrites:false},
    Staff:{pages:["dashboard","meeting","committee-meeting","search","track","report","people","petitioner","budget"],allowWrites:true},
    Admin:{pages:["*"],allowWrites:true}
  };
  var deferredAssetMinimumRole={
    Scripts_Page_Dashboard:"Viewer",Runtime_01_Request_Lifecycle:"Viewer",Runtime_02_Date_Time:"Viewer",Runtime_03_Table_UI:"Viewer",
    Runtime_04_Thailand_Location:"Staff",Runtime_05_Status_Aging:"Viewer",Runtime_08_AI_Bridge:"Viewer",Runtime_09_QA_Regression:"Admin",
    "Scripts_Page_ReportTrack::search":"Viewer","Scripts_Page_ReportTrack::reporttrack-common":"Viewer","Scripts_Page_ReportTrack::print":"Viewer",
    Scripts_Page_Meeting:"Staff","Scripts_Page_Meeting::meeting-common":"Staff","Scripts_Page_Meeting::meeting":"Staff","Scripts_Page_Meeting::committee":"Staff",
    "Scripts_Page_ReportTrack::track":"Staff","Scripts_Page_ReportTrack::report":"Staff",Scripts_Page_Petitioner:"Staff",Scripts_Page_People:"Staff",Scripts_Page_Budget:"Staff",Scripts_Page_Admin:"Admin"
  };
  var bundleMinimumRole={appCritical:"Viewer",appCore:"Viewer",runtimeDateTable:"Viewer",runtimeThailandLocation:"Staff",runtimeStatusAging:"Viewer",runtimeAiBridge:"Viewer",runtimeQaRegression:"Admin",pageDashboard:"Viewer",pageMeeting:"Staff",pageCommitteeMeeting:"Staff",pageTrackReport:"Staff",pagePetitioner:"Staff",pagePeople:"Staff",pageBudget:"Staff",pageAdmin:"Admin",pageAiPrint:"Viewer"};
  function canPage(role,page){ role=normalizeRole(role); page=normalizePage(page); var p=roles[role]||roles.Viewer, pages=p.pages||[]; return pages.indexOf("*")>=0||pages.indexOf(page)>=0; }
  function allowedPages(role){ var p=roles[normalizeRole(role)]||roles.Viewer; return (p.pages||[]).slice(); }
  var permissionRaw={stamp:"permission-matrix-p0-2026-07-30-r212",owner:"Code_02_Platform_Permissions.APP_PERMISSION_MATRIX",defaultRole:"Viewer",roles:roles,pageAliases:pageAliases,deferredAssetMinimumRole:deferredAssetMinimumRole,bundleMinimumRole:bundleMinimumRole};
  root.__APP_PERMISSION_MATRIX__=permissionRaw;
  root.AppPermissionMatrix=Object.freeze({stamp:permissionRaw.stamp,owner:BOOT_OWNER+".permission",raw:permissionRaw,normalizeRole:normalizeRole,normalizePage:normalizePage,canPage:canPage,allowedPages:allowedPages,rank:function(role){return rank[normalizeRole(role)]||1;}});

  var Safe=root.AppSafeHtml=root.AppSafeHtml||{};
  function byId(target){return target&&target.nodeType?target:(doc&&target?doc.getElementById(text(target)):null);}
  function escapeHtml(v){return text(v).replace(/[&<>"']/g,function(ch){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]||ch;});}
  function sanitizeHtml(html){return text(html)
    .replace(/<\s*(script|iframe|object|embed|base)\b[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi,"")
    .replace(/<\s*(script|iframe|object|embed|base)\b[^>]*\/?\s*>/gi,"")
    .replace(/\s(?:on[a-z0-9_:-]+|srcdoc)\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi,"")
    .replace(/((?:href|src|xlink:href|formaction)\s*=\s*['"])\s*(?:javascript|vbscript|data\s*:\s*text\/html)[\s\S]*?(['"])/gi,"$1#$2");}
  function setText(target,value){var el=byId(target);if(el)el.textContent=text(value);return el;}
  function setSanitizedHtml(target,html){var el=byId(target);if(!el)return null;var tpl=doc.createElement("template");tpl.innerHTML=sanitizeHtml(html);var frag=(tpl.content||tpl).cloneNode(true);if(typeof el.replaceChildren==="function")el.replaceChildren(frag);else{while(el.firstChild)el.removeChild(el.firstChild);el.appendChild(frag);}return el;}
  Safe.owner=Safe.owner||BOOT_OWNER+".safehtml";Safe.__bootstrapCompat=true;Safe.byId=Safe.byId||byId;Safe.escapeHtml=Safe.escapeHtml||escapeHtml;Safe.esc=Safe.esc||Safe.escapeHtml;Safe.sanitizeHtml=Safe.sanitizeHtml||sanitizeHtml;Safe.setText=Safe.setText||setText;Safe.setSanitizedHtml=Safe.setSanitizedHtml||setSanitizedHtml;Safe.setHtml=Safe.setHtml||Safe.setSanitizedHtml;Safe.setTrustedHtml=Safe.setTrustedHtml||function(target,html){return Safe.setSanitizedHtml(target,html);};Safe.setTrustedTemplate=Safe.setTrustedTemplate||Safe.setTrustedHtml;
  root.safeSetInnerHTML=root.safeSetInnerHTML||function(target,html){return Safe.setSanitizedHtml(target,html);};

  /* Canonical Thai date contract from gas-backend/Index.html. */
  var Format=root.AppFormat=root.AppFormat||{};
  Format.text=Format.text||text;
  Format.escapeHtml=Format.escapeHtml||escapeHtml;
  Format.pad2=Format.pad2||function(v){var s=String(Math.abs(Number(v)||0));return s.length<2?"0"+s:s;};
  Format.normalizeThaiYear=Format.normalizeThaiYear||function(v){var y=Number(String(v==null?"":v).replace(/[^0-9]/g,""))||0;return y?y>=3600&&y<=3700?y-1086:y>=3000&&y<=3200?y-543:y<2400?y+543:y:0;};
  Format.safeThaiDateText=Format.safeThaiDateText||function(day,month,year){day=Number(day);month=Number(month);year=Format.normalizeThaiYear(year);return day>=1&&day<=31&&month>=1&&month<=12&&year?Format.pad2(day)+"/"+Format.pad2(month)+"/"+String(year):"";};
  Format.formatThaiDateObject=Format.formatThaiDateObject||function(value){return value&&Object.prototype.toString.call(value)==="[object Date]"&&!isNaN(value.getTime())?Format.safeThaiDateText(value.getDate(),value.getMonth()+1,value.getFullYear()):"";};
  Format.canonicalThaiDateText=Format.canonicalThaiDateText||function(value,options){
    options=options||{};
    if(value==null)return"";
    if(Object.prototype.toString.call(value)==="[object Date]"&&!isNaN(value.getTime()))return Format.formatThaiDateObject(value);
    if(typeof value==="number"&&isFinite(value)&&value>20000&&value<90000)return Format.formatThaiDateObject(new Date(Math.round(864e5*(value-25569))));
    var raw=String(value==null?"":value).replace(/^'+/,"").replace(/[\u00A0\u200B-\u200D\uFEFF]/g,"").trim();
    if(!raw)return"";
    if(options.rejectIdentifierLike!==false&&(/^(?:CASE|MAIN|ROW)[_-]/i.test(raw)||/^\d+\s*\/\s*25\d{2}$/.test(raw)||raw==="-"||raw==="/"))return"";
    var dmy=raw.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.]((?:19|20|25|30|31|36)\d{2})$/);
    if(dmy)return Format.safeThaiDateText(dmy[1],dmy[2],dmy[3]);
    var iso=raw.match(/^((?:19|20|25|30|31|36)\d{2})[-\/](\d{1,2})[-\/](\d{1,2})(?:[T\s].*)?$/);
    if(iso)return Format.safeThaiDateText(iso[3],iso[2],iso[1]);
    if(/GMT|T\d{2}:\d{2}:\d{2}/i.test(raw)){var parsed=new Date(raw);if(!isNaN(parsed.getTime()))return Format.formatThaiDateObject(parsed);}
    if(typeof options.fallback==="function")try{var converted=String(options.fallback(raw)||"").trim(),parts=converted.match(/^(\d{1,2})\/(\d{1,2})\/((?:19|20|25|30|31|36)\d{2})$/);if(parts)return Format.safeThaiDateText(parts[1],parts[2],parts[3]);}catch(_fallbackError){try{root.console&&root.console.warn&&root.console.warn("format.canonicalThaiDateText.fallback",_fallbackError);}catch(_ignore){}}
    return options.preserveUnknown===true?raw:"";
  };
  Format.__thaiDateContractOwner="Index:AppFormat.canonical-thai-date-r153";

  var bundles={
    appCritical:{files:["Scripts_Critical_Login_Runtime"]},
    appCore:{files:["Scripts_Core_Runtime","Runtime_01_Request_Lifecycle"]},
    runtimeDateTable:{files:["Runtime_02_Date_Time","Runtime_03_Table_UI"]},
    runtimeThailandLocation:{minRole:"staff",files:["Runtime_04_Thailand_Location"]},
    runtimeStatusAging:{files:["Runtime_05_Status_Aging"]},
    runtimeAiBridge:{files:["Runtime_08_AI_Bridge"]},
    runtimeQaRegression:{minRole:"admin",files:["Runtime_09_QA_Regression"]},
    pageDashboard:{files:["Scripts_Page_Dashboard"]},
    pageMeeting:{minRole:"staff",files:["Scripts_Page_Meeting::meeting-common","Scripts_Page_Meeting::meeting"]},
    pageCommitteeMeeting:{minRole:"staff",files:["Scripts_Page_Meeting::meeting-common","Scripts_Page_Meeting::committee"]},
    pageTrackReport:{minRole:"staff",files:["Scripts_Page_ReportTrack::reporttrack-common"]},
    pagePetitioner:{minRole:"staff",files:["Scripts_Page_Petitioner"]},
    pagePeople:{minRole:"staff",files:["Scripts_Page_People"]},
    pageBudget:{minRole:"staff",files:["Scripts_Page_Budget"]},
    pageAdmin:{minRole:"admin",files:["Scripts_Page_Admin"]},
    pageAiPrint:{files:["Scripts_Page_ReportTrack::print"]}
  };
  var chunks={
    dashboard:["Scripts_Page_Dashboard"],
    search:["Runtime_02_Date_Time","Runtime_03_Table_UI","Runtime_05_Status_Aging","Scripts_Page_ReportTrack::reporttrack-common"],
    petitioner:["Runtime_02_Date_Time","Runtime_03_Table_UI","Runtime_04_Thailand_Location","Scripts_Page_Petitioner"],
    meeting:["Runtime_02_Date_Time","Runtime_03_Table_UI","Scripts_Page_Meeting::meeting-common","Scripts_Page_Meeting::meeting"],
    "committee-meeting":["Runtime_02_Date_Time","Runtime_03_Table_UI","Scripts_Page_Meeting::meeting-common","Scripts_Page_Meeting::committee"],
    track:["Runtime_02_Date_Time","Runtime_03_Table_UI","Runtime_05_Status_Aging","Scripts_Page_ReportTrack::reporttrack-common"],
    report:["Runtime_02_Date_Time","Runtime_03_Table_UI","Runtime_05_Status_Aging","Scripts_Page_ReportTrack::reporttrack-common"],
    people:["Runtime_02_Date_Time","Runtime_03_Table_UI","Scripts_Page_People"],
    personnel:["Runtime_02_Date_Time","Runtime_03_Table_UI","Scripts_Page_People"],
    budget:["Runtime_02_Date_Time","Runtime_03_Table_UI","Runtime_04_Thailand_Location","Runtime_05_Status_Aging","Scripts_Page_Budget"],
    admin:["Runtime_02_Date_Time","Runtime_03_Table_UI","Scripts_Page_Admin"],
    ai:["Runtime_08_AI_Bridge"],
    print:["Scripts_Page_ReportTrack::print"]
  };
  var manifest={stamp:"asset-manifest-r263-github-coherent",sourceOwner:"gas-backend/Code_03_Platform_Assets",bundles:bundles,chunks:chunks,templates:{},upfrontScripts:[]};
  root.__APP_ASSET_MANIFEST__=manifest;

  function lockRuntimeMap(name,value){
    try{Object.defineProperty(root,name,{configurable:false,enumerable:false,get:function(){return value;},set:function(next){
      if(name==="__APP_CORE_RUNTIME_FILES__"&&Array.isArray(next)&&next.indexOf("Runtime_01_Request_Lifecycle")>=0)value=next.slice();
      if(name==="__APP_DEFERRED_SCRIPTS__"&&next&&next.dashboard&&next.search&&next.meeting&&next.budget)value=next;
    }});}catch(_e){root[name]=value;}
  }
  lockRuntimeMap("__APP_CORE_RUNTIME_FILES__",["Scripts_Core_Runtime","Runtime_01_Request_Lifecycle"]);
  lockRuntimeMap("__APP_DEFERRED_SCRIPTS__",chunks);
  try{root.__APP_DEFERRED_TEMPLATES__=root.__APP_DEFERRED_TEMPLATES__||{};}catch(_e){}
  root.__APP_RUNTIME_DEPENDENCY_MAP__={ok:true,owner:BOOT_OWNER,stamp:"r263",core:root.__APP_CORE_RUNTIME_FILES__.slice(),pages:Object.keys(chunks)};
  try{if(doc&&doc.documentElement){doc.documentElement.setAttribute("data-runtime-bootstrap","r263");doc.documentElement.setAttribute("data-safe-html-bootstrap","r263");doc.documentElement.setAttribute("data-thai-date-contract","r153");doc.documentElement.setAttribute("data-permission-matrix-stamp",permissionRaw.stamp);}}catch(_e){}
})(typeof window!=="undefined"?window:globalThis,typeof document!=="undefined"?document:null);