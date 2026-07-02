/* extracted from github-pages/index.html script #35 */
! function() {
"use strict";
var Boot = window.AppBoot || null;
function publish(name, value, meta) {
return Boot && Boot.setFlag ? (Boot.setFlag(name, value, meta || {
owner: "Index.appboot-migration"
}), Boot.exposeGlobal && Boot.exposeGlobal(name, Object.assign({
owner: "Index.appboot-migration", bridge: ! 0
}, meta || {
})), value): (window[name] = value, value)
}
var mountInstantShell = function() {
var host = document.getElementById("app"), tpl = document.getElementById("tpl-vue3-root");
if(! host ||! tpl || "1" === host.getAttribute("data-instant-shell") || host.childNodes.length)return ! 1;
try {
var range = document.createRange();
range.selectNode(host), host.appendChild(range.createContextualFragment(String(tpl.innerHTML || ""))), host.setAttribute("data-instant-shell", "1");
var token = "";
try {
token = String(window.AppStore && window.AppStore.get && window.AppStore.get("auth.token", "") || "")
}
catch(_tok) {
__appObserve(_tok, "ec")
}
var authenticated =!! token;
if(! authenticated)try {
"#/login" !== location.hash && history.replaceState(null, "", location.pathname + location.search.replace(/([?&])_logout=1(&|$)/, "$1").replace(/[?&]$/, "") + "#/login")
}
catch(_forceLoginHash) {
try {
location.hash = "#/login"
}
catch(_forceLoginHash2) {
"function" == typeof __appObserve && __appObserve(_forceLoginHash2, "ec")
}
}
var loginHost = host.querySelector(".vue3-login-host"), mainShell = host.querySelector(".vue3-main-shell"), loginPage = host.querySelector("#login-page"), mainContainer = host.querySelector("#main-container");
loginHost && (loginHost.style.display = authenticated ? "none": ""), mainShell && (mainShell.style.display = authenticated ? "": "none"), loginPage && (loginPage.style.display = authenticated ? "none": "flex"), mainContainer && (mainContainer.style.display = authenticated ? "block": "none");
var bootStatus = document.getElementById("app-boot-status");
bootStatus && bootStatus.parentNode && bootStatus.parentNode.removeChild(bootStatus);
try {
window.AppLogin && "function" == typeof window.AppLogin.init && window.AppLogin.init()
}
catch(_loginInit) {
__appObserve(_loginInit, "ec")
}
return ! 0
}
catch(_instantErr) {
return"function" == typeof __appObserve && __appObserve(_instantErr, "ec"), ! 1
}
};
publish("__APP_MOUNT_INSTANT_SHELL__", mountInstantShell, {
owner: "Index.instant-shell"
}), mountInstantShell()
}
();
;
/* extracted from github-pages/index.html script #36 */
(function(){'use strict';var Boot=window.AppBoot||null;function publish(name,value,meta){if(Boot&&Boot.setFlag){Boot.setFlag(name,value,meta||{owner:'Index.appboot-migration'});if(Boot.exposeGlobal)Boot.exposeGlobal(name,Object.assign({owner:'Index.appboot-migration',bridge:true},meta||{}));return value;}window[name]=value;return value;}publish('__APP_UPFRONT_INCLUDED_SCRIPTS__',(window.__APP_ASSET_MANIFEST__&&window.__APP_ASSET_MANIFEST__.upfrontScripts)||['Scripts_Critical_Login_Runtime'],{owner:'Index.include-map'});
publish('__APP_CORE_RUNTIME_FILES__',["Scripts_Core_Runtime"],{owner:'Index.include-map'});
publish('__APP_DEFERRED_SCRIPTS__',(window.__APP_ASSET_MANIFEST__&&window.__APP_ASSET_MANIFEST__.chunks)||{"dashboard":["Scripts_Page_Dashboard"],"search":["Scripts_Page_ReportTrack"],"petitioner":["Scripts_Page_Petitioner"],"meeting":["Scripts_Page_Meeting"],"committee-meeting":["Scripts_Page_Meeting"],"track":["Scripts_Page_ReportTrack"],"report":["Scripts_Page_ReportTrack"],"people":["Scripts_Page_People"],"personnel":["Scripts_Page_People"],"budget":["Scripts_Page_Budget"],"admin":["Scripts_Page_Admin"],"ai":["Scripts_Core_Runtime"],"print":["Scripts_Core_Runtime"]},{owner:'Index.include-map'});
publish('__APP_DEFERRED_TEMPLATES__',(window.__APP_ASSET_MANIFEST__&&window.__APP_ASSET_MANIFEST__.templates)||{},{owner:'Index.include-map'});})();
;
/* extracted from github-pages/index.html script #37 */
! function() {
"use strict";
var __logoutBoot = window.AppBoot || null;
function __bootSet(name, value, meta) {
return __logoutBoot && __logoutBoot.setFlag ? (__logoutBoot.setFlag(name, value, meta || {
owner: "Index.logout-click-bridge"
}), __logoutBoot.exposeGlobal && __logoutBoot.exposeGlobal(name, Object.assign({
owner: "Index.logout-click-bridge", bridge: ! 0
}, meta || {
})), value): (window[name] = value, value)
}
if(! (__logoutBoot && __logoutBoot.getFlag && __logoutBoot.getFlag("canonicalLogoutClickBridge"))) {
if(__logoutBoot && __logoutBoot.setFlag)__logoutBoot.setFlag("canonicalLogoutClickBridge", ! 0, {
owner: "Index.logout-click-bridge"
});
else {
if(window.__APP_CANONICAL_LOGOUT_CLICK_BRIDGE__)return;
__bootSet("__APP_CANONICAL_LOGOUT_CLICK_BRIDGE__", ! 0, {
owner: "Index.logout-click-bridge"
})
}
document.addEventListener("click", function(ev) {
var target;
if(ev && ev.target && ev.target.closest ? ev.target.closest('[data-action="logout"],#logout-btn,.logout-btn,[data-logout="1"]'): null) {
try {
ev.preventDefault(), ev.stopPropagation(), ev.stopImmediatePropagation && ev.stopImmediatePropagation()
}
catch(_e) {
__appObserve(_e, "ec")
}
try {
if(window.AppLogout && "function" == typeof window.AppLogout.execute)return window.AppLogout.execute();
if(window.AppAuth && "function" == typeof window.AppAuth.logout)return window.AppAuth.logout();
if("function" == typeof window.logout)return window.logout()
}
catch(err) {
try {
console.warn("canonical logout bridge failed", err)
}
catch(_warn) {
"function" == typeof __appObserve && __appObserve(_warn, "ec")
}
}
try {
__bootSet("__APP_SESSION_RESUME_DISABLED__", ! 0, {
owner: "Index.logout-state"
}), __bootSet("__APP_LOGGED_OUT_LOCK__", ! 0, {
owner: "Index.logout-state"
}), __bootSet("__APP_LOGOUT_IN_PROGRESS__", ! 1, {
owner: "Index.logout-state"
})
}
catch(_flag) {
__appObserve(_flag, "ec")
}
try {
window.AppSessionResume && "function" == typeof window.AppSessionResume.clear && window.AppSessionResume.clear()
}
catch(_resume) {
__appObserve(_resume, "ec")
}
try {
window.AppSecurity && "function" == typeof window.AppSecurity.clearBrowserAuthStorage && window.AppSecurity.clearBrowserAuthStorage()
}
catch(_sec) {
__appObserve(_sec, "ec")
}
try {
sessionStorage.removeItem("commission.system.sessionResume.currentStamp"), sessionStorage.removeItem("commission.system.session.currentStamp"), sessionStorage.removeItem("app.auth.resume")
}
catch(_storage) {
__appObserve(_storage, "ec")
}
try {
window.AppStore && "function" == typeof window.AppStore.assign && window.AppStore.assign({
"auth.token": "", "auth.csrfToken": "", "auth.user": null, "auth.role": "", "auth.name": "", "auth.status": "anonymous", "auth.loginOk": ! 1, "auth.bootstrapOk": ! 1, "auth.resumePending": ! 1, "auth.sessionRestored": ! 1
})
}
catch(_store) {
__appObserve(_store, "ec")
}
try {
var lp = document.getElementById("login-page"), mc = document.getElementById("main-container"), side = document.getElementById("side"), ov = document.getElementById("sidebar-overlay");
lp && (lp.style.display = "flex", lp.classList.remove("d-none"), lp.setAttribute("aria-hidden", "false")), mc && (mc.style.display = "none", mc.setAttribute("aria-hidden", "true")), side && (side.style.display = "none"), ov && (ov.classList.remove("show"), ov.style.display = "none", ov.setAttribute("aria-hidden", "true"))
}
catch(_dom) {
__appObserve(_dom, "ec")
}
try {
document.dispatchEvent(new CustomEvent("app:user-changed", {
detail: {
user: null, source: "canonical-logout-bridge-current"
}
}))
}
catch(_event) {
__appObserve(_event, "ec")
}
try {
location.hash = "#/login"
}
catch(_hash) {
__appObserve(_hash, "ec")
}
}
}, ! 0)
}
}
();
;
/* extracted from github-pages/index.html script #38 */
! function() {
"use strict";
var IndexKit = window.AppIndexKit || window.AppProductionFinal || {
}, AppBoot = window.AppBoot || null, vueReady;
function appBootSet(name, value, meta) {
return AppBoot && AppBoot.setFlag ? (AppBoot.setFlag(name, value, meta || {
owner: "Index.inlineBootstrap"
}), AppBoot.exposeGlobal && AppBoot.exposeGlobal(name, Object.assign({
owner: "Index.inlineBootstrap", bridge: ! 0
}, meta || {
})), value): (window[name] = value, value)
}
function appBootGet(name, defaultValue) {
try {
return AppBoot && AppBoot.getFlag ? AppBoot.getFlag(name, defaultValue): Object.prototype.hasOwnProperty.call(window, name) ? window[name]: defaultValue
}
catch(_e) {
return defaultValue
}
}
function normalizeNavRole(role) {
return IndexKit && __appIsFn(IndexKit.normalizeRole) ? IndexKit.normalizeRole(role): role ? String(role): "Viewer"
}
function readStoreValue(path, def) {
try {
return window.AppStore && __appIsFn(window.AppStore.get) ? window.AppStore.get(path, def): def
}
catch(_storeErr) {
__appObserve(_storeErr, "nav.role.store");
return def
}
}
function firstText(values) {
for(var i = 0; i < values.length; i ++ ) {
var v = values[i];
if(null != v && "" !== String(v).trim())return String(v).trim()
}
return""
}
function resolveCurrentRole() {
var role = "", user = null;
try {
if(window.AppCoreAuth && __appIsFn(window.AppCoreAuth.getCanonicalAuthUser))user = window.AppCoreAuth.getCanonicalAuthUser() || null
}
catch(_coreUserErr) {
__appObserve(_coreUserErr, "nav.role.coreUser")
}
try {
user || (user = readStoreValue("auth.user", null))
}
catch(_userErr) {
__appObserve(_userErr, "nav.role.user")
}
role = firstText([
user && (user.role || user.userRole || user.accessRole),
readStoreValue("auth.role", ""),
window.currentUser && (window.currentUser.role || window.currentUser.userRole || window.currentUser.accessRole),
window.currentUserRole,
window.userRole
]);
return normalizeNavRole(role || (appNavAuthenticated() ? "Staff": "Viewer"))
}
function appNavRole() {
return resolveCurrentRole()
}
function appNavAllowed(id, role) {
var k = String(id || "").toLowerCase();
role = normalizeNavRole(role || resolveCurrentRole());
if("Admin" === role)return ! 0;
if("Staff" === role)return"admin" !== k;
return"dash" === k || "dashboard" === k || "search" === k
}
function appNavAuthenticated() {
try {
if(window.AppStore && __appIsFn(window.AppStore.get)) {
if(window.AppStore.get("auth.token", ""))return ! 0;
if(! 0 === window.AppStore.get("auth.loginOk", ! 1) ||! 0 === window.AppStore.get("auth.bootstrapOk", ! 1))return ! 0;
if("authenticated" === String(window.AppStore.get("auth.status", "")))return ! 0
}
if(document.documentElement && document.documentElement.classList.contains("app-authenticated"))return ! 0;
return !! (window.AppCoreAuth && __appIsFn(window.AppCoreAuth.getCanonicalAuthUser) && window.AppCoreAuth.getCanonicalAuthUser())
}
catch(_e) {
__appObserve(_e, "nav.authenticated");
return ! 1
}
}
window.__APP_RESOLVE_CURRENT_ROLE__ = resolveCurrentRole;
window.resolveCurrentRole = resolveCurrentRole;
window.__APP_NAV1_ROLE_RESOLVER_OWNER__ = "Index.nav.resolveCurrentRole.readOnly.phase1";
function navRoleRawValue() {
var user = null;
try {
if(window.AppCoreAuth && __appIsFn(window.AppCoreAuth.getCanonicalAuthUser))user = window.AppCoreAuth.getCanonicalAuthUser() || null
}
catch(_coreRoleRawErr) {
__appObserve(_coreRoleRawErr, "nav2.role.raw.core")
}
try {
user || (user = readStoreValue("auth.user", null))
}
catch(_storeRoleRawErr) {
__appObserve(_storeRoleRawErr, "nav2.role.raw.store")
}
return firstText([
user && (user.role || user.userRole || user.accessRole),
readStoreValue("auth.role", ""),
window.currentUser && (window.currentUser.role || window.currentUser.userRole || window.currentUser.accessRole),
window.currentUserRole,
window.userRole
])
}
function navMenuMutationReady(role) {
var raw = firstText([role, navRoleRawValue()]);
var authenticated = appNavAuthenticated();
var ready = authenticated && !! raw;
try {
document.documentElement && document.documentElement.setAttribute("data-role-menu-ready", ready ? "1": "0")
}
catch(_readyAttrErr) {
__appObserve(_readyAttrErr, "nav2.menu.ready.attr")
}
return ready
}
function setNavVisible(el, on) {
if(! el)return;
el.style.display = on ? "": "none";
el.setAttribute("aria-hidden", on ? "false": "true");
el.classList && el.classList.toggle("d-none", ! on)
}
function applyPendingStaffMenuAccess(reason) {
try {
Array.prototype.slice.call(document.querySelectorAll("#side [data-nav]")).forEach(function(el) {
var k = String(el.getAttribute("data-nav") || "").toLowerCase();
setNavVisible(el, "admin" !== k)
});
var caseToggle = document.querySelector('#side [data-bs-target="#caseMenu"]'), caseMenu = document.getElementById("caseMenu");
setNavVisible(caseToggle, !0);
caseMenu && caseMenu.classList.add("show");
setNavVisible(document.getElementById("menu-admin"), !1);
document.documentElement && (document.documentElement.setAttribute("data-user-role", "staff-pending"), document.documentElement.setAttribute("data-role-menu-ready", "0"), document.documentElement.setAttribute("data-role-menu-pending", reason || "phase2-auth-role-pending"))
}
catch(_pendingMenuErr) {
__appObserve(_pendingMenuErr, "phase2.menu.pending")
}
return "Staff"
}
function applyNavMenuAccess(role, meta) {
meta = meta || {
};
if(! navMenuMutationReady(role) && ! meta.force) {
try {
window.AppRuntime && window.AppRuntime.recordWarning && window.AppRuntime.recordWarning("phase2.menuMutationPending", {
reason: meta.reason || "role-not-ready", authenticated: appNavAuthenticated(), role: role || navRoleRawValue() || ""
})
}
catch(_skipWarnErr) {
__appObserve(_skipWarnErr, "phase2.menu.skip.warn")
}
return appNavAuthenticated() ? applyPendingStaffMenuAccess(meta.reason || "role-not-ready"): normalizeNavRole(role || navRoleRawValue() || "Viewer")
}
var resolved = normalizeNavRole(role || navRoleRawValue() || (appNavAuthenticated() ? "Staff": "Viewer"));
var isAdmin = "Admin" === resolved, isStaff = "Staff" === resolved, isViewer = "Viewer" === resolved;
try {
Array.prototype.slice.call(document.querySelectorAll("#side [data-nav]")).forEach(function(el) {
var k = String(el.getAttribute("data-nav") || "").toLowerCase();
setNavVisible(el, isAdmin || isStaff && "admin" !== k || isViewer && ("dash" === k || "dashboard" === k || "search" === k))
});
var caseToggle = document.querySelector('#side [data-bs-target="#caseMenu"]'), caseMenu = document.getElementById("caseMenu");
setNavVisible(caseToggle, isAdmin || isStaff || isViewer);
caseMenu && (isAdmin || isStaff || isViewer ? caseMenu.classList.add("show"): caseMenu.classList.remove("show"));
setNavVisible(document.getElementById("menu-admin"), isAdmin);
document.documentElement && (document.documentElement.setAttribute("data-user-role", resolved.toLowerCase()), document.documentElement.setAttribute("data-role-menu-ready", "1"), document.documentElement.removeAttribute("data-role-menu-pending"))
}
catch(_applyMenuErr) {
__appObserve(_applyMenuErr, "nav2.menu.apply")
}
return resolved
}
window.__APP_NAV_MENU_MUTATION_READY__ = navMenuMutationReady;
window.__APP_APPLY_PENDING_STAFF_MENU_ACCESS__ = applyPendingStaffMenuAccess;
window.__APP_APPLY_ROLE_ACCESS_READY__ = applyNavMenuAccess;
window.__APP_NAV2_MENU_MUTATION_OWNER__ = "Index.nav.applyNavMenuAccess.readyGate.phase2";
function mobileSidebarEl() {
return document.getElementById("side")
}
function mobileSidebarOverlay() {
return document.getElementById("sidebar-overlay")
}
function setMobileSidebarOpen(open) {
var side = mobileSidebarEl(), overlay = mobileSidebarOverlay();
open =!! open;
try {
side && (side.classList.toggle("show", open), side.setAttribute("aria-hidden", open ? "false": "true"));
overlay && (overlay.classList.toggle("show", open), overlay.style.display = open ? "block": "none", overlay.setAttribute("aria-hidden", open ? "false": "true"));
document.body && document.body.classList.toggle("sidebar-open", open)
}
catch(_sideErr) {
__appObserve(_sideErr, "ec")
}
return open
}
function toggleMobileSubmenu(btn) {
var selector = btn && btn.getAttribute && (btn.getAttribute("data-bs-target") || btn.getAttribute("data-target") || btn.getAttribute("aria-controls") && ("#" + btn.getAttribute("aria-controls")));
if(! selector)return ! 1;
var panel = document.querySelector(selector);
if(! panel)return ! 1;
var open =! panel.classList.contains("show");
panel.classList.toggle("show", open);
btn.setAttribute("aria-expanded", open ? "true": "false");
return ! 0
}
window.toggleSidebar = function(force) {
var side = mobileSidebarEl(), open;
return side ? (open = "boolean" == typeof force ? force: ! side.classList.contains("show"), setMobileSidebarOpen(open)): ! 1
};
function bindSidebarNavClicks() {
if(appBootGet("__APP_SIDEBAR_NAV_CLICK_OWNER__", ! 1))return ! 0;
appBootSet("__APP_SIDEBAR_NAV_CLICK_OWNER__", ! 0, {
owner: "Index.sidebar-nav-production-rewrite"
});
var lastKey = "", lastAt = 0;
function now() {
return Date.now ? Date.now(): (new Date).getTime()
}
function once(ev, key) {
var t = now();
if(key && lastKey === key && t - lastAt < 420) {
try {
ev && ev.preventDefault && ev.preventDefault(), ev && ev.stopPropagation && ev.stopPropagation(), ev && ev.stopImmediatePropagation && ev.stopImmediatePropagation()
}
catch(_dup) {
__appObserve(_dup, "ec")
}
return ! 1
}
lastKey = key || "";
lastAt = t;
return ! 0
}
function stop(ev) {
try {
ev && ev.preventDefault && ev.preventDefault();
ev && ev.stopPropagation && ev.stopPropagation();
ev && ev.stopImmediatePropagation && ev.stopImmediatePropagation()
}
catch(_stop) {
__appObserve(_stop, "ec")
}
return ! 1
}
function openRoute(navId, link) {
navId = String(navId || "").trim();
if(! navId)return ! 1;
try {
if(! appNavAllowed(navId, appNavRole()))return ! 1;
if(! appNavAuthenticated())return forceLoginRoute("sidebar-nav-unauth")
}
catch(_auth) {
__appObserve(_auth, "ec")
}
try {
var result =! 1;
if(__appIsFn(window.nav))result = window.nav(navId, {
source: "sidebar-nav", target: link, closeSidebar: ! 0
});
if(result)return ! 0;
if(window.AppPages && __appIsFn(window.AppPages.activate)) {
window.AppPages.activate(navId, {
source: "sidebar-nav-fallback", target: link
});
try {
window.toggleSidebar && window.toggleSidebar(! 1)
}
catch(_side) {
__appObserve(_side, "ec")
}
return ! 0
}
if(window.AppVue3Bridge && window.AppVue3Bridge.router && __appIsFn(window.AppVue3Bridge.router.push)) {
var map = {
dash: "/dashboard", dashboard: "/dashboard", meeting: "/meeting", search: "/search", track: "/track", report: "/report", budget: "/budget", petitioner: "/petitioner", personnel: "/people", people: "/people", admin: "/admin", "committee-meeting": "/committee-meeting"
};
window.AppVue3Bridge.router.push(map[navId] || "/" + navId);
return ! 0
}
try {
location.hash = "#/" + navId
}
catch(_hash) {
__appObserve(_hash, "ec")
}
return ! 0
}
catch(err) {
try {
window.AppRuntime && window.AppRuntime.handleError && window.AppRuntime.handleError(err, "เปิดหน้าไม่สำเร็จ")
}
catch(_err) {
"function" == typeof __appObserve && __appObserve(_err, "ec")
}
return ! 1
}
}
function handle(ev) {
var raw = ev && ev.target && ev.target.closest ? ev.target: null;
if(! raw)return ! 0;
var sidebar = mobileSidebarEl();
var sideContains = sidebar && sidebar.contains(raw);
var sidebarAction = raw.closest('[data-action="toggleSidebar"],#sidebar-overlay,.mobile-menu-btn');
if(sidebarAction &&! raw.closest("#side .nav-link[data-nav]")) {
if(! once(ev, "sidebar:" + (sidebarAction.id || sidebarAction.className || "toggle")))return ! 1;
stop(ev);
window.toggleSidebar && window.toggleSidebar("sidebar-overlay" === sidebarAction.id ?! 1: void 0);
return ! 1
}
var menuToggle = raw.closest('#side [data-bs-target],#side [data-toggle-target],#side [aria-controls]');
if(menuToggle && sideContains &&! menuToggle.getAttribute("data-nav")) {
if(ev && ev.defaultPrevented && "collapse" === menuToggle.getAttribute("data-bs-toggle"))return ! 0;
if(! once(ev, "submenu:" + (menuToggle.getAttribute("data-bs-target") || menuToggle.getAttribute("aria-controls") || "caseMenu")))return ! 1;
stop(ev);
return toggleMobileSubmenu(menuToggle), ! 1
}
var link = raw.closest("#side .nav-link[data-nav]");
if(! link)return ! 0;
var navId = String(link.getAttribute("data-nav") || link.getAttribute("data-app-page") || "").trim();
if(! navId)return ! 0;
if(! once(ev, "nav:" + navId))return ! 1;
stop(ev);
return openRoute(navId, link), ! 1
}
document.addEventListener("click", handle, ! 0);
document.addEventListener("touchend", handle, {
capture: ! 0, passive: ! 1
});
document.addEventListener("pointerup", function(ev) {
try {
if(ev && ev.pointerType && "mouse" !== ev.pointerType)return handle(ev)
}
catch(_ptr) {
__appObserve(_ptr, "ec")
}
return ! 0
}, ! 0);
return ! 0
}
function forceLoginRoute(reason) {
try {
if(window.__APP_FORCE_LOGIN_VIEW__)return window.__APP_FORCE_LOGIN_VIEW__(reason || "nav-unauth")
}
catch(_v) {
__appObserve(_v, "ec")
}
try {
location.hash = "#/login"
}
catch(_h) {
__appObserve(_h, "ec")
}
return ! 1
}
function showVueUnavailableMode() {
try {
document.documentElement.classList.add("app-vue-error");
var note = document.getElementById("app-boot-status");
note && (note.textContent = "โหลดระบบไม่สำเร็จ กรุณาโหลดหน้าใหม่"), window.AppRuntime && window.AppRuntime.handleError && window.AppRuntime.handleError(new Error("Vue runtime unavailable"), "โหลดระบบไม่สำเร็จ")
}
catch(_vueUnavailableErr) {
"function" == typeof __appObserve && __appObserve(_vueUnavailableErr, "ec")
}
return ! 1
}
function startVueBootstrap() {
if(! window.Vue)return showVueUnavailableMode(), void 0;
function setTrustedRouteHtml(el, html) {
if(! el)return null;
if(window.AppProductionFinal && __appIsFn(window.AppProductionFinal.setTrustedHtml))return window.AppProductionFinal.setTrustedHtml(el, html || "", {
trusted: ! 0, moduleName: "Index.route"
});
if(window.ScriptsUtils && __appIsFn(window.ScriptsUtils.setHtml))return window.ScriptsUtils.setHtml(el, html || "", {
trusted: ! 0, moduleName: "Index.route"
});
el.textContent = "";
try {
var range = document.createRange();
range.selectNode(el), el.appendChild(range.createContextualFragment(String(html || "")))
}
catch(_htmlErr) {
el.textContent = ""
}
return el
}
var BOOT = Object.assign({
page: "/dashboard", defaultRoute: "/dashboard", baseUrl: ""
}, window.__APP_BOOTSTRAP__ || {
}), routeMap = {
login: "/login", dash: "/dashboard", dashboard: "/dashboard", search: "/search", petitioner: "/petitioner", meeting: "/meeting", "committee-meeting": "/committee-meeting", committeeMeeting: "/committee-meeting", committee: "/committee-meeting", people: "/people", personnel: "/people", budget: "/budget", track: "/track", report: "/report", admin: "/admin"
};
function routeFromNav(id) {
return routeMap[String(id || "").trim().toLowerCase()] || "/dashboard"
}
function navFromRoute(path) {
var inverse;
return {
"/dashboard": "dashboard", "/search": "search", "/petitioner": "petitioner", "/meeting": "meeting", "/committee-meeting": "committee-meeting", "/people": "personnel", "/budget": "budget", "/track": "track", "/report": "report", "/admin": "admin", "/login": "login"
}
[path = String(path || "").toLowerCase()] || "dashboard"
}
var bridgeState = Vue.reactive({
authenticated: ! 1, user: null, bootstrapping: ! 1, currentPath: "/login"
}), storeGet = IndexKit && __appIsFn(IndexKit.storeGet) ? IndexKit.storeGet: window.ScriptsUtils && window.ScriptsUtils.storeGet || function(path, defaultValue) {
try {
return window.AppStore && __appIsFn(window.AppStore.get) ? window.AppStore.get(path, defaultValue): defaultValue
}
catch(_e) {
return defaultValue
}
};
function syncStateFromStore() {
var token = String(storeGet("auth.token", "") || ""), user = storeGet("auth.user", null) || null, locked =! (! window.__APP_LOGOUT_IN_PROGRESS__ &&! window.__APP_LOGGED_OUT_LOCK__);
return bridgeState.authenticated =!! token &&! locked, bridgeState.user = bridgeState.authenticated ? user: null, bridgeState
}
function markSidebar(path) {
var navKey = navFromRoute(path);
Array.prototype.slice.call(document.querySelectorAll("#side .nav-link[data-nav]")).forEach(function(el) {
el && el.classList && el.classList.toggle("active", String(el.getAttribute("data-nav") || "").trim().toLowerCase() === String(navKey).toLowerCase())
})
}
function safeCall(fn) {
var result;
try {
result = "function" != typeof fn || fn()
}
catch(e) {
return releaseUiLock("safe-call-sync-error"), window.AppRuntime && window.AppRuntime.recordWarning && window.AppRuntime.recordWarning("page.lifecycle.sync", e), Promise.resolve(! 1)
}
return Promise.resolve(result).catch(function(e) {
return releaseUiLock("safe-call-async-error"), window.AppRuntime && window.AppRuntime.recordWarning && window.AppRuntime.recordWarning("page.lifecycle.async", e), ! 1
})
}
function setShellMode(authenticated) {
authenticated =!! authenticated;
try {
document.body.classList.add("app-ready"), document.documentElement.classList.toggle("app-authenticated", authenticated);
var loginHost = document.querySelector(".vue3-login-host"), mainShell = document.querySelector(".vue3-main-shell"), loginPage = document.getElementById("login-page"), mainContainer = document.getElementById("main-container"), side = document.getElementById("side"), overlay = document.getElementById("sidebar-overlay");
if(loginHost && (loginHost.style.display = authenticated ? "none": ""), mainShell && (mainShell.style.display = authenticated ? "": "none"), loginPage && (loginPage.style.display = authenticated ? "none": "flex"), mainContainer && (mainContainer.style.display = authenticated ? "block": "none"), side && (side.style.display = authenticated ? "": "none"), authenticated)try {
var target = routeState && routeState.path && "/login" !== routeState.path ? routeState.path: BOOT.defaultRoute || "/dashboard";
void 0 === currentPageComponent ||! currentPageComponent || void 0 === pageComponents ||! pageComponents || currentPageComponent.value && currentPageComponent.value !== LoginPage || (currentPageComponent.value = pageComponents[target] || pageComponents["/dashboard"], routeState.path = target, bridgeState.currentPath = target, markSidebar(target));
var bootNote = document.getElementById("app-boot-status");
bootNote && (bootNote.style.display = "none")
}
catch(_routeFillErr) {
__appObserve(_routeFillErr, "ec")
}
! authenticated && overlay && overlay.classList.remove("show")
}
catch(_shellModeErr) {
__appObserve(_shellModeErr, "ec")
}
return authenticated
}
function releaseUiLock(reason) {
try {
document.documentElement.classList.remove("app-page-switching", "app-template-loading"), document.body && document.body.classList.remove("app-page-switching", "app-template-loading", "app-ui-unblocking");
var overlay = document.getElementById("sidebar-overlay");
overlay && (overlay.classList.remove("show"), overlay.setAttribute("aria-hidden", "true"), overlay.style.display = "none"), window.AppRuntime && __appIsFn(window.AppRuntime.clearUiBlocks) && window.AppRuntime.clearUiBlocks(reason || "route-release", {
clearSectionOverlays: ! 0, closeLoadingSwal: ! 1, closeSidebar: ! 1
})
}
catch(_releaseErr) {
__appObserve(_releaseErr, "ec")
}
return ! 0
}
appBootSet("__APP_SET_SHELL_MODE__", setShellMode, {
owner: "Index.inlineBootstrap.shell-mode"
}), appBootSet("__APP_UNLOCK_UI__", releaseUiLock, {
owner: "Index.inlineBootstrap.unlock-ui"
});
var activationState = {
key: "", timer: null, running: null, unlockTimer: null
};
function schedulePageActivation(routeOrId, source) {
var pageId = canonicalPageId(String(routeOrId || "").replace(/^#?\/?/, "") || navFromRoute(routeState.path));
if("login" === pageId)return Promise.resolve(! 0);
var key = pageId;
if(activationState.key === key && activationState.running)return activationState.running;
if(activationState.timer) {
try {
clearTimeout(activationState.timer)
}
catch(_clearActErr) {
__appObserve(_clearActErr, "ec")
}
activationState.timer = null
}
if(activationState.unlockTimer) {
try {
window.AppRuntime && window.AppRuntime.cancelTimer ? window.AppRuntime.cancelTimer(activationState.unlockTimer): clearTimeout(activationState.unlockTimer)
}
catch(_clearUnlockErr) {
__appObserve(_clearUnlockErr, "ec")
}
activationState.unlockTimer = null
}
return activationState.key = key, activationState.unlockTimer = routeDelay("route.unlock-watchdog", function() {
releaseUiLock("route-watchdog:" + pageId)
}, 9e3), activationState.running = Promise.resolve().then(function() {
return activationState.timer = null, runPageActivation(pageId)
}).catch(function(err) {
return releaseUiLock("route-error:" + pageId), window.AppRuntime && window.AppRuntime.recordWarning && window.AppRuntime.recordWarning("route.activate", err), ! 1
}).finally(function() {
if(activationState.unlockTimer) {
try {
window.AppRuntime && window.AppRuntime.cancelTimer ? window.AppRuntime.cancelTimer(activationState.unlockTimer): clearTimeout(activationState.unlockTimer)
}
catch(_unlockFinallyErr) {
__appObserve(_unlockFinallyErr, "ec")
}
activationState.unlockTimer = null
}
releaseUiLock("route-finally:" + pageId), activationState.running = null
}), activationState.running
}
var deferredScriptMap = window.__APP_DEFERRED_SCRIPTS__ || {
}, deferredTemplateMap = window.__APP_DEFERRED_TEMPLATES__ || {
};
function canonicalPageId(id) {
return"dash" === (id = String(id || "").trim().toLowerCase()) ? "dashboard": "personnel" === id ? "people": "committeemeeting" === id || "committee" === id || "committee_meeting" === id ? "committee-meeting": id || "dashboard"
}
function pageDomId(id) {
return"dashboard" === (id = canonicalPageId(id)) ? "p-dash": "people" === id || "personnel" === id ? "p-personnel": "committee-meeting" === id ? "p-committee-meeting": "p-" + id
}
function routeDelay(label, fn, ms) {
var run = "function" == typeof fn ? fn: function() {
}, delayMs = Math.max(0, Number(ms || 0) || 0);
return window.AppRuntime && __appIsFn(window.AppRuntime.pageDelay) ? window.AppRuntime.pageDelay("route", label || "route.delay", run, delayMs): window.AppRuntime && __appIsFn(window.AppRuntime.delay) ? window.AppRuntime.delay(label || "route.delay", run, delayMs): setTimeout(run, delayMs)
}
function mountInlinePageTemplate(id, host) {
var inlineTpl = document.getElementById("tpl-page-" + id);
return ! (! inlineTpl ||! String(inlineTpl.innerHTML || "").trim()) && (host.classList.add("app-template-loading"), setTrustedRouteHtml(host, inlineTpl.innerHTML || ""), host.classList.remove("app-template-loading"), host.classList.add("app-template-loaded"), ! 0)
}
function waitForInlinePageTemplate(id, host, ms) {
var deadline = Date.now() + Math.max(800, Number(ms || 3500));
return new Promise(function(resolve) {
function tick() {
if(document.getElementById(pageDomId(id)))return resolve(! 0);
if(mountInlinePageTemplate(id, host))return resolve(! 0);
if(Date.now() >= deadline)return resolve(! 1);
try {
routeDelay("route.waitInlineTemplate", tick, 120)
}
catch(_waitErr) {
resolve(! 1)
}
}
tick()
})
}
function ensurePageTemplate(id) {
var domId = pageDomId(id = canonicalPageId(id));
if(document.getElementById(domId))return Promise.resolve(! 0);
var hostId = "deferred-page-host-" + id, host = document.getElementById(hostId);
if(! host)return Promise.resolve(! 1);
if(mountInlinePageTemplate(id, host))return Promise.resolve(! 0);
var tplName = deferredTemplateMap[id] || deferredTemplateMap[String(id || "").replace(/^dash$/, "dashboard")] || "";
return tplName && window.AppAssetLoader && __appIsFn(window.AppAssetLoader.mountPartial) ? (host.classList.add("app-template-loading"), Promise.race([window.AppAssetLoader.mountPartial(tplName, host), routeTimeoutPromise(5e3, "template:" + id)]).then(function(result) {
return result && result.timeout ? waitForInlinePageTemplate(id, host, 2500): (host.classList.remove("app-template-loading"), host.classList.add("app-template-loaded"), ! 0)
}).catch(function(err) {
return host.classList.remove("app-template-loading"), waitForInlinePageTemplate(id, host, 2500).then(function(ok) {
return ok || (setTrustedRouteHtml(host, '<div class="alert alert-warning">โหลดหน้าไม่สำเร็จ กรุณาลองใหม่</div>'), window.AppRuntime && window.AppRuntime.recordWarning && window.AppRuntime.recordWarning("route.template", err)), ok
})
})): waitForInlinePageTemplate(id, host, 3800)
}
function routeTimeoutPromise(ms, label) {
return new Promise(function(resolve) {
try {
routeDelay("route.timeout:" + String(label || "route-timeout"), function() {
resolve({
timeout: ! 0, label: label || "route-timeout"
})
}, Math.max(1e3, Number(ms || 8e3)))
}
catch(_timeoutErr) {
resolve({
timeout: ! 0, label: label || "route-timeout"
})
}
})
}
function pageScriptList(id) {
id = canonicalPageId(id);
var list = deferredScriptMap[id] || deferredScriptMap[String(id || "").replace(/^dash$/, "dashboard")] || [];
return Array.isArray(list) ? list.filter(function(f) {
return"Scripts_Core_Runtime" !== String(f || "")
}).slice(): []
}
function loadPageScriptsDirect(id) {
var list = pageScriptList(id = canonicalPageId(id));
if(! list.length)return Promise.resolve(! 0);
var loader = window.AppCritical && window.AppCritical.loadPartial || window.AppAssetLoader && window.AppAssetLoader.loadPartial;
return loader ? list.reduce(function(p, name) {
return p.then(function() {
return loader(name).catch(function(err) {
throw window.AppRuntime && window.AppRuntime.recordWarning && window.AppRuntime.recordWarning("route.directPageChunk." + id, err, {
partial: name
}), err
})
})
}, Promise.resolve(! 0)): Promise.resolve(! 1)
}
function ensurePageScripts(id) {
id = canonicalPageId(id);
function mark(status, detail) {
try {
window.__APP_PAGE_SCRIPT_STATUS__ = Object.assign(window.__APP_PAGE_SCRIPT_STATUS__ || {}, (function(){ var o = {}; o[id] = Object.assign({ status: status, at: (new Date).toISOString() }, detail || {}); return o; })())
}
catch(_markErr) {
__appObserve(_markErr, "route.pageScript.status")
}
}
function loadWithPrimaryOwner() {
return (window.AppCritical && __appIsFn(window.AppCritical.ensureCoreRuntime) ? window.AppCritical.ensureCoreRuntime(): Promise.resolve(! 0)).then(function() {
return window.AppAssetLoader && __appIsFn(window.AppAssetLoader.loadPageScripts) ? window.AppAssetLoader.loadPageScripts(id): loadPageScriptsDirect(id)
})
}
var load = loadWithPrimaryOwner().then(function(result) {
if(!1 === result) {
mark("primary-false", { fallback: "direct" });
return loadPageScriptsDirect(id)
}
return result
}).catch(function(firstErr) {
mark("primary-error", { error: String(firstErr && firstErr.message || firstErr), fallback: "direct" });
return loadPageScriptsDirect(id).catch(function(secondErr) {
secondErr.__firstPageScriptError = firstErr;
throw secondErr
})
});
return Promise.race([load, routeTimeoutPromise(45e3, "page-script-owner:" + id)]).then(function(result) {
if(result && result.timeout)throw new Error("โหลด page script ช้าเกินกำหนด: " + id);
mark("loaded", { ok: !1 !== result });
return ! 1 !== result
}).catch(function(err) {
mark("failed", { error: String(err && err.message || err) });
window.AppRuntime && window.AppRuntime.recordWarning && window.AppRuntime.recordWarning("route.pageScriptOwner." + id, err);
return ! 1
})
}
function runPageActivation(id) {
if(id = String(id || "").trim().toLowerCase(), syncStateFromStore(), ! bridgeState.authenticated)return safeApplyRoute("/login", ! 0, "activation-unauthenticated").catch(function() {
setShellMode(! 1)
}), Promise.resolve(! 1);
try {
var previousPage = window.AppStore && window.AppStore.get ? String(window.AppStore.get("ui.currentPage", "") || ""): "";
document.dispatchEvent(new CustomEvent("app:page-changing", {
detail: {
from: previousPage, to: id, source: "vue-bridge"
}
})), document.documentElement.classList.add("app-page-switching")
}
catch(_pageChangingErr) {
__appObserve(_pageChangingErr, "ec")
}
try {
window.AppStore && window.AppStore.set && window.AppStore.set("ui.currentPage", id)
}
catch(_e) {
__appObserve(_e, "ec")
}
var __reportTrackLazyLoad;
return setShellMode(! 0), markSidebar(routeFromNav(id)), ("search" === id || "report" === id || "track" === id ? ensurePageScripts(id).then(function() {
return ensurePageTemplate(id)
}): ensurePageTemplate(id).then(function() {
return ensurePageScripts(id)
})).then(function() {
function routeAltActivate() {
return"dashboard" === id || "dash" === id ? safeCall(function() {
return !! window.loadDash && window.loadDash({
forceFresh: ! 1, source: "route-safe-mode-current"
})
}): "search" === id ? safeCall(function() {
return window.closeSummary && window.closeSummary(), ! window.searchAll || window.searchAll()
}): "petitioner" === id ? safeCall(function() {
return window.closePetSummary && window.closePetSummary(), Promise.resolve(! window.loadPetitioners || window.loadPetitioners(! 1)).then(function() {
return ! window.renderPetitionerList || window.renderPetitionerList()
})
}): "meeting" === id ? safeCall(function() {
return ! window.initMeetingPage || window.initMeetingPage()
}): "committee-meeting" === id ? safeCall(function() {
return window.CommitteeMeetingSystem && window.CommitteeMeetingSystem.activate ? window.CommitteeMeetingSystem.activate({
source: "route"
}): ! window.CommitteeMeetingSystem ||! window.CommitteeMeetingSystem.reload || window.CommitteeMeetingSystem.reload()
}): "track" === id ? safeCall(function() {
return ! window.loadTrackData || window.loadTrackData()
}): "report" === id ? safeCall(function() {
return ! window.renderReport || window.renderReport()
}): "people" === id || "personnel" === id ? safeCall(function() {
return window.initPeoplePage ? window.initPeoplePage({
forceRefresh: ! 1
}): ! window.showPsTab || window.showPsTab("comm")
}): "budget" === id ? safeCall(function() {
return window.initBudgetPage ? window.initBudgetPage(): ! window.showBudgetTab || window.showBudgetTab("summary")
}): "admin" !== id || safeCall(function() {
return ! window.loadAdminData || window.loadAdminData()
})
}
return id = canonicalPageId(id), window.AppLifecycle && window.AppLifecycle.getPage && window.AppLifecycle.getPage(id) ? safeCall(function() {
return window.AppLifecycle.activate(id, {
source: "router"
})
}).then(function(result) {
return ! 1 === result ? routeAltActivate(): result
}).catch(function() {
return routeAltActivate()
}): routeAltActivate()
}).then(function(result) {
try {
document.dispatchEvent(new CustomEvent("app:page-activated", {
detail: {
id: id, pageId: id, source: "vue-bridge"
}
}))
}
catch(_activatedEvtErr) {
__appObserve(_activatedEvtErr, "ec")
}
return result
}).catch(function(e) {
window.AppRuntime && window.AppRuntime.recordWarning && window.AppRuntime.recordWarning("route.moduleLoadRouteAlt", e, {
pageId: id
});
try {
document.dispatchEvent(new CustomEvent("app:page-activated", {
detail: {
id: id, pageId: id, source: "vue-bridge-routeAlt", degraded: ! 0
}
}))
}
catch(_routeAltActivatedErr) {
__appObserve(_routeAltActivatedErr, "ec")
}
return ! 0
}).finally(function() {
releaseUiLock("route-activation-finally:" + id)
})
}
function createStaticPage(templateId, pageId) {
var tpl = document.getElementById(templateId), html = tpl ? String(tpl.innerHTML || ""): "", canonical = canonicalPageId(pageId), titleMap = {
dashboard: "Dashboard", search: "ค้นหาเรื่องพิจารณา", petitioner: "ข้อมูลผู้ร้องเรียน", meeting: "จัดการเรื่องพิจารณา", "committee-meeting": "การประชุมคณะกรรมาธิการ", track: "ระบบติดตามหนังสือ", report: "จัดพิมพ์รายงานเรื่องพิจารณา", people: "ระบบบริหารงานบุคคล", budget: "ระบบบริหารงบประมาณ", admin: "จัดการระบบ"
}, title;
html.trim() || (html = '<div id="deferred-page-host-' + canonical + '" class="app-deferred-page-host app-page-loading-shell" data-page="' + canonical + '" aria-live="polite"><section class="app-card app-route-loading-card"><div class="d-flex align-items-center gap-3"><span class="app-loading-spinner-sm" aria-hidden="true"></span><div><h5 class="mb-1">' + (titleMap[canonical] || "กำลังเปิดหน้า") + '</h5><div class="text-muted small">กำลังเตรียมข้อมูลและส่วนประกอบของหน้า กรุณารอสักครู่</div></div></div></section></div>');
return {
template: html, mounted: function() {
Vue.nextTick(function() {
Promise.resolve(schedulePageActivation(canonical, "mounted")).catch(function(err) {
return releaseUiLock("mounted-route-error:" + canonical), window.AppRuntime && window.AppRuntime.recordWarning && window.AppRuntime.recordWarning("route.mountedActivation", err, {
pageId: canonical
}), ! 1
}).finally(function() {
try {
window.scrollTo({
top: 0, behavior: "smooth"
})
}
catch(_scrollErr) {
__appObserve(_scrollErr, "route.mounted.scroll")
}
})
})
}
}
}
var LoginPage = {
template: '<div class="login-route" aria-hidden="true"></div>'
}, pageComponents = {
"/dashboard": createStaticPage("tpl-page-dashboard", "dashboard"), "/search": createStaticPage("tpl-page-search", "search"), "/petitioner": createStaticPage("tpl-page-petitioner", "petitioner"), "/meeting": createStaticPage("tpl-page-meeting", "meeting"), "/committee-meeting": createStaticPage("tpl-page-committee-meeting", "committee-meeting"), "/track": createStaticPage("tpl-page-track", "track"), "/report": createStaticPage("tpl-page-report", "report"), "/people": createStaticPage("tpl-page-people", "people"), "/budget": createStaticPage("tpl-page-budget", "budget"), "/admin": createStaticPage("tpl-page-admin", "admin")
}, routeState = Vue.reactive({
path: "/login"
}), afterRouteHooks = [], currentPageComponent = Vue.shallowRef(LoginPage);
function normalizeRouteTarget(target) {
return(target = String(target || "").trim()) || (target = BOOT.defaultRoute || "/dashboard"), "/" !== (target = target.replace(/^#/, "")).charAt(0) && (target = routeFromNav(target)), pageComponents[target] || "/login" === target ? target: BOOT.defaultRoute || "/dashboard"
}
function applyRoute(target, replace) {
target = normalizeRouteTarget(target), syncStateFromStore(), bridgeState.authenticated || "/login" === target || (target = "/login"), bridgeState.authenticated && "/login" === target && (target = BOOT.defaultRoute || "/dashboard"), routeState.path = target, bridgeState.currentPath = target, currentPageComponent.value = "/login" !== target ? pageComponents[target] || pageComponents["/dashboard"]: LoginPage, setShellMode("/login" !== target), markSidebar(target), afterRouteHooks.slice().forEach(function(fn) {
try {
fn(target, routeState.path)
}
catch(_hookErr) {
__appObserve(_hookErr, "ec")
}
});
try {
var hash = "#" + target;
location.hash !== hash && (replace && history && history.replaceState ? history.replaceState(null, "", location.pathname + location.search + hash): location.hash = hash)
}
catch(_hashErr) {
__appObserve(_hashErr, "ec")
}
return Vue.nextTick(function() {
if("/login" === target)try {
window.AppLogin && __appIsFn(window.AppLogin.init) && window.AppLogin.init()
}
catch(_loginBindErr) {
__appObserve(_loginBindErr, "ec")
}
else try {
Promise.resolve(schedulePageActivation(navFromRoute(target), "route")).catch(function(err) {
return releaseUiLock("route-nexttick-error:" + target), window.AppRuntime && window.AppRuntime.recordWarning && window.AppRuntime.recordWarning("route.nextTickActivation", err, {
target: target
}), ! 1
})
}
catch(_activateErr) {
__appObserve(_activateErr, "ec")
}
}), Promise.resolve(! 0)
}
function safeApplyRoute(target, replace, source) {
try {
return Promise.resolve(applyRoute(target, replace)).catch(function(err) {
return releaseUiLock("safe-apply-route:" + String(source || target || "")), window.AppRuntime && window.AppRuntime.recordWarning && window.AppRuntime.recordWarning("route.safeApplyRoute", err, {
target: target, source: source || ""
}), ! 1
})
}
catch(err) {
releaseUiLock("safe-apply-route-sync:" + String(source || target || ""));
try {
window.AppRuntime && window.AppRuntime.recordWarning && window.AppRuntime.recordWarning("route.safeApplyRoute.sync", err, {
target: target, source: source || ""
})
}
catch(_warn) {
__appObserve(_warn, "route.safeApply.warn")
}
return Promise.resolve(! 1)
}
}
function waitCoreForAuthenticatedRoute(source) {
try {
if(bridgeState.authenticated && window.AppCritical && __appIsFn(window.AppCritical.ensureCoreRuntime))return Promise.resolve(window.AppCritical.ensureCoreRuntime()).catch(function(err) {
try {
window.AppRuntime && window.AppRuntime.recordWarning && window.AppRuntime.recordWarning("route.ensureCoreBeforeApply", err, {
source: source || ""
})
}
catch(_warn) {
__appObserve(_warn, "route.ensureCore.warn")
}
return ! 0
})
}
catch(err) {
__appObserve(err, "route.ensureCore.sync")
}
return Promise.resolve(! 0)
}
var router = {
currentRoute: {
value: routeState
}, push: function(target) {
return safeApplyRoute(target, ! 1, "router.push")
}, replace: function(target) {
return safeApplyRoute(target, ! 0, "router.replace")
}, isReady: function() {
return Promise.resolve(! 0)
}, afterEach: function(fn) {
return"function" == typeof fn && afterRouteHooks.push(fn), function() {
var i = afterRouteHooks.indexOf(fn);
i >- 1 && afterRouteHooks.splice(i, 1)
}
}
};
function bootstrapFromSessionStorage() {
if(syncStateFromStore(), bridgeState.bootstrapping =! 1, bridgeState.authenticated)return Promise.resolve(! 0);
var explicitLogin = "#/login" === location.hash || /(?:\?|&)_(?:logout|login)=/.test(location.search || "") ||! 0 === appBootGet("__APP_LOGGED_OUT_LOCK__", ! 1);
if(! explicitLogin && window.AppSessionResume && __appIsFn(window.AppSessionResume.get) && __appIsFn(window.AppSessionResume.tryResume))try {
var rec = window.AppSessionResume.get();
if(rec && (rec.resumeHandle || rec.sessionResumeHandle))return window.AppSessionResume.tryResume({
reason: "vue-bootstrap-resume-current"
}).then(function() {
if(syncStateFromStore(), ! bridgeState.authenticated)try {
"#/login" !== location.hash && history.replaceState(null, "", location.pathname + location.search.replace(/([?&])_logout=1(&|$)/, "$1").replace(/[?&]$/, "") + "#/login")
}
catch(_resumeHashErr) {
try {
location.hash = "#/login"
}
catch(_resumeHashRouteAlt) {
"function" == typeof __appObserve && __appObserve(_resumeHashRouteAlt, "ec")
}
}
return !! bridgeState.authenticated
}).catch(function() {
return syncStateFromStore(), !! bridgeState.authenticated
})
}
catch(_resumeBootstrapErr) {
__appObserve(_resumeBootstrapErr, "ec")
}
if(! bridgeState.authenticated) {
if(explicitLogin)try {
window.AppSessionResume && __appIsFn(window.AppSessionResume.clear) && window.AppSessionResume.clear()
}
catch(_resumeClearErr) {
__appObserve(_resumeClearErr, "ec")
}
try {
"#/login" !== location.hash && history.replaceState(null, "", location.pathname + location.search.replace(/([?&])_logout=1(&|$)/, "$1").replace(/[?&]$/, "") + "#/login")
}
catch(_loginHashErr) {
try {
location.hash = "#/login"
}
catch(_loginHashRouteAlt) {
"function" == typeof __appObserve && __appObserve(_loginHashRouteAlt, "ec")
}
}
}
return Promise.resolve(!! bridgeState.authenticated)
}
router.afterEach(function(to) {
try {
window.AppAccessibility && window.AppAccessibility.onRouteChange && window.AppAccessibility.onRouteChange(to)
}
catch(_a11yRouteErr) {
__appObserve(_a11yRouteErr, "ec")
}
try {
window.AppUi && window.AppUi.enhance && window.AppUi.enhance(document)
}
catch(_uiRouteErr) {
__appObserve(_uiRouteErr, "ec")
}
}), window.AppVue3Bridge = window.AppVue3Bridge || {
}, window.AppVue3Bridge.router = router, window.AppVue3Bridge.state = bridgeState, window.AppVue3Bridge.syncState = syncStateFromStore, window.AppVue3Bridge.activatePage = runPageActivation, appBootSet("__APP_MARK_MAIN_SHELL_READY__", function(source) {
try {
if(syncStateFromStore(), setShellMode(bridgeState.authenticated), bridgeState.authenticated) {
var target = routeState.path && "/login" !== routeState.path ? routeState.path: BOOT.defaultRoute || "/dashboard";
waitCoreForAuthenticatedRoute(source || "shell-ready").then(function() {
return safeApplyRoute(target, ! 0, source || "shell-ready")
})
}
}
catch(_markShellErr) {
__appObserve(_markShellErr, "ec")
}
return ! 0
}, {
owner: "Index.inlineBootstrap.shell-ready"
}), appBootSet("__APP_FORCE_LOGIN_VIEW__", function(reason) {
try {
window.AppStore && __appIsFn(window.AppStore.assign) && window.AppStore.assign({
"auth.token": "", "auth.csrfToken": "", "auth.user": null, "auth.role": "", "auth.name": "", "auth.status": "anonymous", "auth.loginOk": ! 1, "auth.bootstrapOk": ! 1, "auth.bootstrapPending": ! 1
}), bridgeState.authenticated =! 1, bridgeState.user = null, routeState.path = "/login", bridgeState.currentPath = "/login", currentPageComponent.value = LoginPage, setShellMode(! 1);
try {
["u_name", "u_pass", "u_user", "login-username", "login-password"].forEach(function(id) {
var el = document.getElementById(id);
el && (el.value = "", el.defaultValue = "", el.setAttribute("value", ""))
})
}
catch(_clearLoginErr) {
__appObserve(_clearLoginErr, "ec")
}
try {
Array.prototype.forEach.call(document.querySelectorAll(".modal-backdrop,.offcanvas-backdrop,.swal2-container"), function(el) {
el && el.parentNode && el.parentNode.removeChild(el)
}), document.body && document.body.classList.remove("modal-open", "swal2-shown", "swal2-height-auto", "sidebar-open"), document.body && (document.body.style.overflow = "", document.body.style.paddingRight = "");
var ov = document.getElementById("sidebar-overlay");
ov && (ov.classList.remove("show"), ov.style.display = "none", ov.setAttribute("aria-hidden", "true"));
var btn = document.getElementById("btn-login-action");
btn && (btn.disabled =! 1, btn.removeAttribute("disabled"), btn.setAttribute("aria-busy", "false"), btn.textContent = btn.dataset.defaultText || "เข้าสู่ระบบ")
}
catch(_loginSurfaceErr) {
__appObserve(_loginSurfaceErr, "ec")
}
try {
"#/login" !== location.hash && history.replaceState(null, "", location.pathname + location.search.replace(/([?&])_logout=1(&|$)/, "$1").replace(/[?&]$/, "") + "#/login")
}
catch(_hashLoginErr) {
try {
location.hash = "#/login"
}
catch(_hashRouteAltErr) {
"function" == typeof __appObserve && __appObserve(_hashRouteAltErr, "ec")
}
}
Vue.nextTick(function() {
try {
window.AppLogin && __appIsFn(window.AppLogin.init) && window.AppLogin.init()
}
catch(_bindLoginErr) {
__appObserve(_bindLoginErr, "ec")
}
})
}
catch(_forceLoginErr) {
__appObserve(_forceLoginErr, "ec")
}
return ! 0
}, {
owner: "Index.inlineBootstrap.force-login"
}), window.nav = function(id, opts) {
try {
var _now = Date.now ? Date.now(): 0, _preserveLoading =! (! opts ||! opts.preserveLoadingSwal) ||!! (window.__APP_PRESERVE_LOADING_SWAL_UNTIL && _now < Number(window.__APP_PRESERVE_LOADING_SWAL_UNTIL || 0));
window.AppRuntime && window.AppRuntime.clearUiBlocks && window.AppRuntime.clearUiBlocks("nav", {
closeLoadingSwal: ! _preserveLoading, closeSidebar: ! 0, clearSectionOverlays: ! 0
})
}
catch(_navUnblockErr) {
__appObserve(_navUnblockErr, "ec")
}
try {
window.toggleSidebar && window.toggleSidebar(! 1)
}
catch(_navSidebarErr) {
__appObserve(_navSidebarErr, "ec")
}
if(! appNavAllowed(id, appNavRole()))return ! 1;
try {
appNavAuthenticated() && applyNavMenuAccess(resolveCurrentRole(), {
reason: "nav-click"
})
}
catch(_nav2NavApplyErr) {
__appObserve(_nav2NavApplyErr, "nav2.nav.apply")
}
var target = routeFromNav(id);
return routeState.path !== target ? safeApplyRoute(target, ! 1, "nav:" + id): (Vue.nextTick(function() {
Promise.resolve(runPageActivation(id)).catch(function(err) {
return releaseUiLock("nav-same-route-error:" + id), window.AppRuntime && window.AppRuntime.recordWarning && window.AppRuntime.recordWarning("route.navSameRouteActivation", err, {
pageId: id
}), ! 1
})
}), ! 0)
}, window.addEventListener("hashchange", function() {
safeApplyRoute(location.hash || "/login", ! 0, "hashchange")
}), document.addEventListener("app:user-changed", function(e) {
try {
syncStateFromStore();
try {
bridgeState.authenticated && applyNavMenuAccess(resolveCurrentRole(), {
reason: "app:user-changed"
})
}
catch(_nav2ApplyErr) {
__appObserve(_nav2ApplyErr, "nav2.userChanged.apply")
}
var target = bridgeState.authenticated ? BOOT.defaultRoute || "/dashboard": "/login";
waitCoreForAuthenticatedRoute("app:user-changed").then(function() {
return safeApplyRoute(target, ! 0, "app:user-changed")
})
}
catch(err) {
releaseUiLock("user-changed-route-error");
try {
window.AppRuntime && window.AppRuntime.recordWarning && window.AppRuntime.recordWarning("route.userChanged", err, {
detail: e && e.detail || null
})
}
catch(_warn) {
__appObserve(_warn, "route.userChanged.warn")
}
}
});
var AppRoot = {
template: "#tpl-vue3-root", setup: function() {
return Vue.onMounted(function() {
bootstrapFromSessionStorage().then(function(authenticated) {
var initial;
return safeApplyRoute(authenticated ? location.hash && "#/login" !== location.hash ? location.hash: BOOT.defaultRoute || BOOT.page || "/dashboard": "/login", ! 0, "bootstrap-initial")
}).catch(function(err) {
try {
window.AppRuntime && window.AppRuntime.recordWarning && window.AppRuntime.recordWarning("route.bootstrapFromSession", err)
}
catch(_warn) {
__appObserve(_warn, "route.bootstrap.warn")
}
safeApplyRoute("/login", ! 0, "bootstrap-fallback").catch(function() {
showVueUnavailableMode()
})
})
}), {
state: bridgeState
}
}
}, RouterViewRenderer = {
name: "RouterViewRenderer", setup: function() {
return function() {
return Vue.h(currentPageComponent.value || (bridgeState.authenticated ? pageComponents["/dashboard"]: LoginPage))
}
}
};
try {
var mountHost = document.getElementById("app");
mountHost && mountHost.removeAttribute("data-instant-shell"), Vue.createApp(AppRoot).component("router-view", RouterViewRenderer).mount("#app"), Vue.nextTick(function() {
try {
window.AppLogin && __appIsFn(window.AppLogin.init) && window.AppLogin.init()
}
catch(_loginBindErr) {
__appObserve(_loginBindErr, "ec")
}
});
var bootStatus = document.getElementById("app-boot-status");
bootStatus && bootStatus.parentNode && bootStatus.parentNode.removeChild(bootStatus)
}
catch(bootError) {
document.documentElement.classList.add("app-vue-error");
try {
window.AppRuntime && window.AppRuntime.handleError && window.AppRuntime.handleError(bootError, "โหลดระบบไม่สำเร็จ")
}
catch(_e4) {
"function" == typeof __appObserve && __appObserve(_e4, "ec")
}
showVueUnavailableMode()
}
}
bindSidebarNavClicks(), (window.__APP_VUE_READY__ && __appIsFn(window.__APP_VUE_READY__) ? window.__APP_VUE_READY__(): Promise.resolve(!! window.Vue)).then(function(ok) {
ok && window.Vue ? startVueBootstrap(): showVueUnavailableMode()
}).catch(function() {
showVueUnavailableMode()
})
}
();
