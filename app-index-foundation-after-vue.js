/* extracted from github-pages/index.html script #11 */
! function(root) {
var Boot = root.AppBoot || null;
function bootSet(name, value, meta) {
return Boot && Boot.setFlag ? (Boot.setFlag(name, value, meta || {
owner: "Index.thai-date-early-adapter"
}), Boot.exposeGlobal && Boot.exposeGlobal(name, Object.assign({
owner: "Index.thai-date-early-adapter", bridge: ! 0
}, meta || {
})), value): (root[name] = value, value)
}
function bootGet(name, defaultValue) {
try {
return Boot && Boot.getFlag ? Boot.getFlag(name, defaultValue): Object.prototype.hasOwnProperty.call(root, name) ? root[name]: defaultValue
}
catch(_e) {
return defaultValue
}
}
function enhance(scope) {
try {
var api = root.AppThaiDatePicker || root.AppDatePicker;
if(api && "function" == typeof api.enhance && api.enhance !== enhance)return api.enhance(scope || document);
var host = scope && scope.querySelectorAll ? scope: document;
return ! (! host ||! host.querySelectorAll) && (Array.prototype.forEach.call(host.querySelectorAll('input[data-thai-date],input.app-thai-date-input,input[placeholder*="วว/ดด/ปปปป"],input[placeholder*="วัน/เดือน/ปี"],input[type="date"]'), function(input) {
try {
input.classList.add("app-thai-date-input"), input.setAttribute("data-thai-date", "1"), input.getAttribute("placeholder") || input.setAttribute("placeholder", "วว/ดด/ปปปป")
}
catch(_e) {
"function" == typeof __appObserve && __appObserve(_e, "ec")
}
}), ! 0)
}
catch(_e) {
return"function" == typeof __appObserve && __appObserve(_e, "ec"), ! 1
}
}
bootGet("thaiDateEarlyAdapter", ! 1) || (bootSet("thaiDateEarlyAdapter", ! 0, {
owner: "Index.thai-date-early-adapter"
}), bootSet("__APP_THAI_DATE_EARLY_ADAPTER__", {
owner: "Index:thai-date-early-adapter-current", mode: "adapter-only-no-popover", adapterOnly: ! 0, canonicalTarget: "SCR:thai-date-canonical-single-owner-current", installedAt: Date.now()
}, {
owner: "Index:thai-date-early-adapter-current"
}), root.ScriptsUtils = root.ScriptsUtils || {
}, enhance.__thaiDateEarlyAdapter =! 0, enhance.__canonicalOwner = "Index:thai-date-early-adapter-current", enhance.__adapterOnly =! 0, root.enhanceThaiDateInputs = root.enhanceThaiDateInputs || enhance, root.applyThaiDateHints = root.applyThaiDateHints || root.enhanceThaiDateInputs, root.ScriptsUtils.enhanceThaiDateInputs = root.ScriptsUtils.enhanceThaiDateInputs || root.enhanceThaiDateInputs, root.ScriptsUtils.applyThaiDateHints = root.ScriptsUtils.applyThaiDateHints || root.applyThaiDateHints, bootSet("__APP_UNLOCK_UI__", bootGet("__APP_UNLOCK_UI__", function() {
try {
document.documentElement.classList.remove("app-page-switching", "app-template-loading"), document.body && document.body.classList.remove("app-page-switching", "app-template-loading", "app-ui-unblocking");
var ov = document.getElementById("sidebar-overlay");
ov && (ov.classList.remove("show"), ov.setAttribute("aria-hidden", "true"), ov.style.display = "none")
}
catch(_e) {
"function" == typeof __appObserve && __appObserve(_e, "ec")
}
return ! 0
}), {
owner: "Index.unlock-ui-early"
}))
}
(window);
;
/* extracted from github-pages/index.html script #12 */
! function(root, doc) {
"use strict";
var Boot = root.AppBoot || null;
function bootSet(name, value, meta) {
return Boot && Boot.setFlag ? (Boot.setFlag(name, value, meta || {
owner: "Index.vue-ready"
}), Boot.exposeGlobal && Boot.exposeGlobal(name, Object.assign({
owner: "Index.vue-ready", bridge: ! 0
}, meta || {
})), value): (root[name] = value, value)
}
function bootGet(name, defaultValue) {
try {
return Boot && Boot.getFlag ? Boot.getFlag(name, defaultValue): Object.prototype.hasOwnProperty.call(root, name) ? root[name]: defaultValue
}
catch(_e) {
return defaultValue
}
}
bootSet("__APP_VUE_READY__", bootGet("__APP_VUE_READY__", function() {
if(root.Vue)return Promise.resolve(! 0);
var urls = ["https://cdn.jsdelivr.net/npm/vue@3.5.13/dist/vue.global.prod.js", "https://unpkg.com/vue@3.5.13/dist/vue.global.prod.js"];
function loadAt(i) {
return root.Vue ? Promise.resolve(! 0): i >= urls.length ? Promise.resolve(! 1): new Promise(function(resolve) {
try {
var src = urls[i], existing = doc.querySelector('script[data-app-critical-lib="Vue"][src="' + src + '"]');
if(existing)return existing.addEventListener("load", function() {
resolve(!! root.Vue)
}, {
once: ! 0
}), existing.addEventListener("error", function() {
resolve(! 1)
}, {
once: ! 0
}), setTimeout(function() {
resolve(!! root.Vue)
}, 2500), void 0;
var el = doc.createElement("script");
el.src = src, el.async =! 1, el.crossOrigin = "anonymous", el.referrerPolicy = "no-referrer", el.setAttribute("data-app-critical-lib", "Vue"), el.setAttribute("data-app-asset-policy", "pinned-secondary"), el.onload = function() {
resolve(!! root.Vue)
}, el.onerror = function() {
resolve(! 1)
}, (doc.head || doc.documentElement).appendChild(el)
}
catch(e) {
"function" == typeof __appObserve && __appObserve(e, "ec"), resolve(! 1)
}
}).then(function(ok) {
return !! ok || loadAt(i + 1)
})
}
return loadAt(0)
}), {
owner: "Index.vue-ready"
})
}
(window, document);
