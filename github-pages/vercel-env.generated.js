/* Compatibility bootstrap loaded before app-config/transport/runtime. */
window.__VERCEL_MIGRATION_CONFIG__ = window.__VERCEL_MIGRATION_CONFIG__ || {};
(function(root){
  "use strict";
  if(!root || root.AppPermissionMatrix) return;

  var raw = {
    stamp: "permission-matrix-p0-2026-07-30-r212",
    owner: "Code_02_Platform_Permissions.APP_PERMISSION_MATRIX",
    defaultRole: "Viewer",
    roles: {
      Viewer: { pages: ["dashboard","search"], deniedApiGroups: ["admin-users","admin-budget","budget","personnel","petitioners"], allowWrites: false },
      Staff: { pages: ["dashboard","meeting","committee-meeting","search","track","report","people","petitioner","budget"], deniedApiGroups: ["admin-users","admin-budget"], allowWrites: true },
      Admin: { pages: ["*"], deniedApiGroups: [], allowWrites: true }
    },
    pageAliases: {
      dash: "dashboard",
      personnel: "people",
      committee: "committee-meeting",
      committeemeeting: "committee-meeting",
      committee_meeting: "committee-meeting",
      tracking: "track"
    },
    apiGroupMinimumRole: {
      budget: "Staff",
      personnel: "Staff",
      petitioners: "Staff",
      "admin-users": "Admin",
      "admin-budget": "Admin",
      "admin-diagnostics": "Admin",
      "admin-release": "Admin",
      "admin-go-live": "Admin",
      "admin-maintenance-final": "Admin"
    },
    deferredAssetMinimumRole: {
      Scripts_Page_Dashboard: "Viewer",
      Runtime_01_Request_Lifecycle: "Viewer",
      Runtime_02_Date_Time: "Viewer",
      Runtime_03_Table_UI: "Viewer",
      Runtime_04_Thailand_Location: "Staff",
      Runtime_05_Status_Aging: "Viewer",
      Runtime_08_AI_Bridge: "Viewer",
      Runtime_09_QA_Regression: "Admin",
      "Scripts_Page_ReportTrack::search": "Viewer",
      "Scripts_Page_ReportTrack::reporttrack-common": "Viewer",
      "Scripts_Page_ReportTrack::print": "Viewer",
      Scripts_Page_Meeting: "Staff",
      "Scripts_Page_Meeting::meeting-common": "Staff",
      "Scripts_Page_Meeting::meeting": "Staff",
      "Scripts_Page_Meeting::committee": "Staff",
      "Scripts_Page_ReportTrack::track": "Staff",
      "Scripts_Page_ReportTrack::report": "Staff",
      Scripts_Page_Petitioner: "Staff",
      Scripts_Page_People: "Staff",
      Scripts_Page_Budget: "Staff",
      Scripts_Page_Admin: "Admin"
    },
    bundleMinimumRole: {
      appCritical: "Viewer",
      appCore: "Viewer",
      runtimeDateTable: "Viewer",
      runtimeThailandLocation: "Staff",
      runtimeStatusAging: "Viewer",
      runtimeAiBridge: "Viewer",
      runtimeQaRegression: "Admin",
      pageDashboard: "Viewer",
      pageMeeting: "Staff",
      pageCommitteeMeeting: "Staff",
      pageTrackReport: "Staff",
      pagePetitioner: "Staff",
      pagePeople: "Staff",
      pageBudget: "Staff",
      pageAdmin: "Admin",
      pageAiPrint: "Viewer"
    }
  };

  function deepFreeze(value){
    if(!value || typeof value !== "object" || Object.isFrozen(value)) return value;
    Object.keys(value).forEach(function(key){ deepFreeze(value[key]); });
    return Object.freeze(value);
  }

  raw = deepFreeze(raw);
  var aliases = raw.pageAliases || {};
  var roles = raw.roles || {};

  function normalizeRole(role){
    var value = String(role == null ? "" : role).trim();
    var key = value.toLowerCase();
    var map = {
      admin:"Admin", administrator:"Admin", owner:"Admin", superadmin:"Admin", "super-admin":"Admin",
      "ผู้ดูแล":"Admin", "ผู้ดูแลระบบ":"Admin", "แอดมิน":"Admin",
      staff:"Staff", officer:"Staff", user:"Staff", editor:"Staff", operator:"Staff",
      "เจ้าหน้าที่":"Staff", "เจ้าหน้าที่ฝ่ายเลขานุการ":"Staff", "เจ้าหน้าที่ฝ่ายปฏิบัติการ":"Staff", "เลขานุการ":"Staff",
      viewer:"Viewer", view:"Viewer", readonly:"Viewer", "read-only":"Viewer", guest:"Viewer",
      "ผู้ดู":"Viewer", "ผู้อ่าน":"Viewer", "อ่านอย่างเดียว":"Viewer"
    };
    if(map[key]) return map[key];
    if(/admin/i.test(value) || /ผู้ดูแล|แอดมิน/.test(value)) return "Admin";
    if(/staff|officer|editor|operator|เจ้าหน้าที่|เลขานุการ|ปฏิบัติการ/i.test(value)) return "Staff";
    return "Viewer";
  }

  function normalizePage(page){
    var key = String(page == null ? "" : page).trim().toLowerCase().replace(/^#?\/?/, "");
    return aliases[key] || key || "dashboard";
  }

  function canPage(role,page){
    role = normalizeRole(role);
    page = normalizePage(page);
    var policy = roles[role] || roles.Viewer || {pages:["dashboard","search"]};
    var pages = Array.isArray(policy.pages) ? policy.pages : [];
    return pages.indexOf("*") >= 0 || pages.indexOf(page) >= 0;
  }

  function allowedPages(role){
    role = normalizeRole(role);
    var policy = roles[role] || roles.Viewer || {pages:[]};
    return Array.isArray(policy.pages) ? policy.pages.slice() : [];
  }

  root.__APP_PERMISSION_MATRIX__ = raw;
  root.AppPermissionMatrix = Object.freeze({
    stamp: String(raw.stamp || "permission-matrix-r212"),
    owner: "Index.AppPermissionMatrix.readOnly",
    raw: raw,
    normalizeRole: normalizeRole,
    normalizePage: normalizePage,
    canPage: canPage,
    allowedPages: allowedPages
  });
  try {
    document.documentElement.setAttribute("data-permission-matrix-stamp", root.AppPermissionMatrix.stamp);
  } catch(_e) {}
})(typeof window !== "undefined" ? window : globalThis);

/* P0 bootstrap contract: Core Runtime requires a complete AppSafeHtml facade. */
(function(root,doc){
  "use strict";
  if(!root || !doc) return;
  var Safe = root.AppSafeHtml = root.AppSafeHtml || {};
  var OWNER = "Index.AppSafeHtml.bootstrap-compat-r261";

  function text(value){ return value == null ? "" : String(value); }
  function byId(target){
    return target && target.nodeType ? target : (target ? doc.getElementById(text(target)) : null);
  }
  function escapeHtml(value){
    return text(value).replace(/[&<>"']/g,function(ch){
      return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch] || ch;
    });
  }
  function sanitizeHtml(html){
    return text(html)
      .replace(/<\s*(script|iframe|object|embed|base)\b[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi,"")
      .replace(/<\s*(script|iframe|object|embed|base)\b[^>]*\/?\s*>/gi,"")
      .replace(/\s(?:on[a-z0-9_:-]+|srcdoc)\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi,"")
      .replace(/((?:href|src|xlink:href|formaction)\s*=\s*['"])\s*(?:javascript|vbscript|data\s*:\s*text\/html)[\s\S]*?(['"])/gi,"$1#$2");
  }
  function setText(target,value){
    var el = byId(target);
    if(el) el.textContent = text(value);
    return el;
  }
  function setSanitizedHtml(target,html){
    var el = byId(target);
    if(!el) return null;
    var tpl = doc.createElement("template");
    tpl.innerHTML = sanitizeHtml(html);
    var fragment = (tpl.content || tpl).cloneNode(true);
    if(typeof el.replaceChildren === "function") el.replaceChildren(fragment);
    else {
      while(el.firstChild) el.removeChild(el.firstChild);
      el.appendChild(fragment);
    }
    return el;
  }
  function setTrustedHtml(target,html,options){
    return setSanitizedHtml(target,html,options);
  }

  Safe.owner = Safe.owner || OWNER;
  Safe.__bootstrapCompat = true;
  Safe.byId = Safe.byId || byId;
  Safe.escapeHtml = Safe.escapeHtml || escapeHtml;
  Safe.sanitizeHtml = Safe.sanitizeHtml || sanitizeHtml;
  Safe.setText = Safe.setText || setText;
  Safe.setSanitizedHtml = Safe.setSanitizedHtml || setSanitizedHtml;
  Safe.setHtml = Safe.setHtml || Safe.setSanitizedHtml;
  Safe.setTrustedHtml = Safe.setTrustedHtml || setTrustedHtml;

  root.safeSetInnerHTML = root.safeSetInnerHTML || function(target,html,options){
    return Safe.setSanitizedHtml(target,html,options || {moduleName:OWNER});
  };
  try {
    doc.documentElement.setAttribute("data-safe-html-bootstrap","r261");
  } catch(_e) {}
})(typeof window !== "undefined" ? window : globalThis, document);
