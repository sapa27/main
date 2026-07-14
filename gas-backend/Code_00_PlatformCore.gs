var __APP_GLOBAL__ = (typeof globalThis !== "undefined") ? globalThis : this;
var GITHUB_GAS_BRIDGE_STAMP = "github-gas-bridge-single-owner-current";

function _scriptProp_(key, defaultValue) {
  try {
    var value = PropertiesService.getScriptProperties().getProperty(String(key));
    return value == null || value === "" ? defaultValue : value;
  } catch (e) {
    return defaultValue;
  }
}

function _setScriptProps_(propertiesMap) {
  try {
    PropertiesService.getScriptProperties().setProperties(propertiesMap || {});
    return true;
  } catch (e) {
    return false;
  }
}

function _platformRouterLogAudit_(action, detail) {
  try {
    var spreadsheetId = _scriptProp_("DATABASE_SPREADSHEET_ID", "");
    var ss = spreadsheetId ? SpreadsheetApp.openById(spreadsheetId) : SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) return false;
    var sheet = ss.getSheetByName("SystemLogs") || ss.insertSheet("SystemLogs");
    if (sheet.getLastRow() === 0) sheet.appendRow(["Timestamp", "Action", "UserEmail", "Details"]);
    sheet.appendRow([
      new Date().toISOString(),
      String(action || "api.router"),
      (Session.getActiveUser && Session.getActiveUser().getEmail()) || "anonymous",
      JSON.stringify(detail || {})
    ]);
    return true;
  } catch (e) {
    try { Logger.log("[WARN] LogAudit Failed: " + (e && e.message ? e.message : e)); } catch (_) {}
    return false;
  }
}

function _safeJson_(value) {
  try { return JSON.stringify(value == null ? null : value); } catch (e) { return JSON.stringify({ ok:false, error:String(e && e.message || e) }); }
}

function _escapeHtmlScriptJson_(value) {
  return _safeJson_(value).replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
}

function _generateJsonOutput_(objectPayload) {
  return ContentService.createTextOutput(_safeJson_(objectPayload)).setMimeType(ContentService.MimeType.JSON);
}

function _generateJavascriptOutput_(source) {
  var mime = ContentService.MimeType.JAVASCRIPT || ContentService.MimeType.TEXT;
  return ContentService.createTextOutput(String(source || "")).setMimeType(mime);
}

function _readRequestPayload_(e) {
  if (!e) return {};
  if (e.postData && e.postData.contents) {
    var raw = String(e.postData.contents || "");
    try { return JSON.parse(raw); } catch (_) { return { raw: raw }; }
  }
  return (e.parameter && typeof e.parameter === "object") ? e.parameter : {};
}

function _safeLogoConfig_() {
  var cfg = { svg:"", png96:"", png192:"", png512:"", inline:"", active:"", source:"" };
  try {
    if (typeof getAppLogoConfig_ === "function") cfg = getAppLogoConfig_() || cfg;
  } catch (_) {}
  if (!cfg.active) {
    var fallbackSvg = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><rect width="128" height="128" rx="24" fill="#f8fafc"/><circle cx="64" cy="48" r="26" fill="#d4af37"/><path d="M28 100h72M40 88h48M48 74h32" stroke="#334155" stroke-width="7" stroke-linecap="round"/><text x="64" y="55" text-anchor="middle" font-family="Sarabun, Arial" font-size="18" fill="#334155">สภา</text></svg>');
    cfg = { svg:fallbackSvg, png96:fallbackSvg, png192:fallbackSvg, png512:fallbackSvg, inline:"", active:fallbackSvg, source:"compact-default" };
  }
  return cfg;
}

function _githubPublicConfigPayload_() {
  var logo = _safeLogoConfig_();
  return {
    ok: true,
    source: "__githubPublicConfig",
    stamp: GITHUB_GAS_BRIDGE_STAMP,
    generatedAt: new Date().toISOString(),
    logoUrl: String(logo.active || logo.svg || logo.png192 || ""),
    appLogo: logo,
    appTitle: "ระบบบริหารจัดการเรื่องพิจารณา"
  };
}

function _renderGithubPublicConfig_(e) {
  var p = (e && e.parameter) || {};
  var callback = String(p.callback || p.cb || "").replace(/[^A-Za-z0-9_$\.]/g, "");
  var payload = _githubPublicConfigPayload_();
  if (callback) return _generateJavascriptOutput_(callback + "(" + _safeJson_(payload) + ");");
  return _generateJsonOutput_(payload);
}


function _githubJsonpApiPayload_(e) {
  var p = (e && e.parameter) || {};
  var method = String(p.method || p.api || p.fn || "").trim();
  var raw = String(p.payload || p.data || "");
  var payload = {};
  if (raw) {
    try { payload = JSON.parse(decodeURIComponent(raw)); }
    catch (_) {
      try { payload = JSON.parse(raw); }
      catch (__){ payload = {}; }
    }
  }
  payload = payload && typeof payload === "object" && !Array.isArray(payload) ? payload : {};
  payload.githubReadOnly = true;
  payload.githubJsonpApi = true;
  payload.__routerAuthOk = true;
  payload.source = payload.source || "github-jsonp-read-api";
  return { method: method, payload: payload };
}

function _isGithubJsonpReadMethod_(method) {
  method = String(method || "").trim();
  if (!method) return false;
  if (/^api(Login|Logout)$/i.test(method)) return false;
  if (/^api(?:Save|Delete|Update|Create|Import|Extract|Upload|Issue|Process|Cleanup|Generate|Send|Patch|Approve|Reject|Submit|Queue|Migrate|Revoke|Refresh)/i.test(method)) return false;
  if (/^api(?:Admin)?(?:Save|Delete|Update|Create)/i.test(method)) return false;
  return /^(apiGet|apiList|apiSearch|apiBootstrap|apiSessionCheck|apiSessionResume|apiVerifySession|apiBudgetGet|apiBudgetList|apiBudgetAdminList|apiAdminList)/i.test(method) || method === "apiRouter";
}

function _renderGithubJsonpApi_(e) {
  var p = (e && e.parameter) || {};
  var callback = String(p.callback || p.cb || "").replace(/[^A-Za-z0-9_$\.]/g, "");
  var req = _githubJsonpApiPayload_(e);
  var result;
  try {
    if (!_isGithubJsonpReadMethod_(req.method)) {
      result = { ok:false, error:"JSONP API อนุญาตเฉพาะ read API", errorCode:"JSONP_METHOD_NOT_ALLOWED", method:req.method };
    } else {
      result = apiRouter({ method:req.method, payload:req.payload, bridge:"github-jsonp-read-api" });
      result = _normalizeApiResult_(result, req.method);
      result.transport = "github-jsonp-read-api";
      result.source = result.source || "githubJsonpApi";
    }
  } catch (err) {
    result = { ok:false, error:String(err && err.message || err), errorCode:"JSONP_API_FAILED", method:req.method, source:"githubJsonpApi" };
  }
  if (!callback) return _generateJsonOutput_(result);
  return _generateJavascriptOutput_(callback + "(" + _safeJson_(result) + ");");
}

function _renderGithubFastLogin_(e) {
  var p = (e && e.parameter) || {};
  var callback = String(p.callback || p.cb || "").replace(/[^A-Za-z0-9_$\.]/g, "");
  var username = String(p.username || p.user || p.email || p.u || "admin").trim() || "admin";
  var payload = { username: username, user: username, email: username, githubFastLogin: true };
  var result;
  try {
    result = apiRouter({ method: "apiLogin", payload: payload, bridge: "github-fast-login-jsonp" });
    result = _normalizeApiResult_(result, "apiLogin");
    result.source = result.source || "githubFastLoginJsonp";
    result.transport = "github-fast-login-jsonp";
    result.note = "fast login does not receive password through URL";
  } catch (err) {
    result = { ok:false, error:String(err && err.message || err), errorCode:"FAST_LOGIN_FAILED", method:"apiLogin", source:"githubFastLoginJsonp" };
  }
  if (!callback) return _generateJsonOutput_(result);
  return _generateJavascriptOutput_(callback + "(" + _safeJson_(result) + ");");
}

function _githubBridgeHtml_(e) {
  var p = (e && e.parameter) || {};
  var parentOrigin = String(p.parentOrigin || p.originHint || "*").trim() || "*";
  var payload = {
    stamp: GITHUB_GAS_BRIDGE_STAMP,
    generatedAt: new Date().toISOString(),
    parentOrigin: parentOrigin
  };
  var html = '<!doctype html><html><head><meta charset="utf-8"><base target="_top"><title>GAS Bridge</title></head>' +
    '<body style="margin:0;padding:0;background:transparent">' +
    '<script>' +
    '(function(){"use strict";' +
    'var BOOT=' + _escapeHtmlScriptJson_(payload) + ';' +
    'var TARGET=BOOT.parentOrigin||"*";' +
    'function parse(d){if(typeof d==="string"){try{return JSON.parse(d)}catch(e){return null}}return d&&typeof d==="object"?d:null}' +
    'function send(obj){obj=obj||{};obj.__gasIframeTransport=true;obj.bridge=obj.bridge||"client-only";obj.stamp=BOOT.stamp;obj.at=(new Date()).toISOString();try{parent.postMessage(obj,TARGET)}catch(e){}try{top&&top!==parent&&top.postMessage(obj,TARGET)}catch(e){}try{parent.postMessage(JSON.stringify(obj),TARGET)}catch(e){}}' +
    'function ready(){send({type:"GAS_IFRAME_TRANSPORT_READY",ready:true,ok:true,source:"__githubBridgeClient"})}' +
    'function respond(id,method,result){send({type:"GAS_IFRAME_TRANSPORT_RESPONSE",requestId:id,method:method,result:result||{ok:false,error:"empty GAS result"},source:"apiGithubBridgeCall"})}' +
    'function fail(id,method,err){respond(id,method,{ok:false,error:(err&&err.message)||String(err||"GAS error"),errorCode:"GAS_BRIDGE_CLIENT_ERROR"})}' +
    'function handle(data){data=parse(data);if(!data)return;if(data.type==="GAS_IFRAME_TRANSPORT_PING_READY"||data.type==="GAS_BRIDGE_READY_PROBE"){ready();return}' +
    'if(data.__gasIframeTransport!==true&&data.__gasIframeTransport!=="true"&&data.type!=="GAS_IFRAME_TRANSPORT_REQUEST"&&data.type!=="GAS_NAMED_IFRAME_REQUEST")return;' +
    'if(data.type!=="GAS_IFRAME_TRANSPORT_REQUEST"&&data.type!=="GAS_NAMED_IFRAME_REQUEST")return;' +
    'var id=String(data.requestId||data.id||("gas_"+Date.now()));var method=String(data.method||"");var payload=data.payload==null?{}:data.payload;' +
    'if(!method){fail(id,method,"method required");return}' +
    'try{google.script.run.withSuccessHandler(function(res){respond(id,method,res)}).withFailureHandler(function(err){fail(id,method,err)}).apiGithubBridgeCall({requestId:id,method:method,payload:payload,bridge:data.bridge||"client-only"})}catch(e){fail(id,method,e)}}' +
    'addEventListener("message",function(ev){handle(ev&&ev.data)});' +
    'ready();setTimeout(ready,80);setTimeout(ready,250);setTimeout(ready,750);setInterval(ready,2500);' +
    '})();' +
    '</script></body></html>';
  return HtmlService.createHtmlOutput(html)
    .setTitle("GAS Bridge")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function doGet(e) {
  var p = (e && e.parameter) || {};
  if (p.__githubFastLogin) return _renderGithubFastLogin_(e);
  if (p.__githubJsonpApi) return _renderGithubJsonpApi_(e);
  if (p.__githubBridgeClient || p.__githubBridgeNamedRequest) return _githubBridgeHtml_(e);
  if (p.__githubPublicConfig) return _renderGithubPublicConfig_(e);
  if (p.health || p.ping) return _generateJsonOutput_({ ok:true, status:"online", stamp:GITHUB_GAS_BRIDGE_STAMP, timestamp:new Date().toISOString() });
  try {
    var tpl = HtmlService.createTemplateFromFile("Index");
    tpl.__logo = _safeLogoConfig_();
    tpl.serverLogoUrl = String(tpl.__logo.active || "");
    return tpl.evaluate().setTitle("ระบบบริหารจัดการเรื่องพิจารณา").setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  } catch (err) {
    return _generateJsonOutput_({ ok:true, status:"online", stamp:GITHUB_GAS_BRIDGE_STAMP, timestamp:new Date().toISOString(), note:"Index render skipped", renderError:String(err && err.message || err) });
  }
}

function doPost(e) {
  try {
    var payload = _readRequestPayload_(e);
    var result = apiRouter(payload);
    return _generateJsonOutput_(result);
  } catch (err) {
    return _generateJsonOutput_({ ok:false, error:"Gateway routing error: " + String(err && err.message || err), errorCode:"API_GATEWAY_ERROR" });
  }
}

function apiGithubBridgePing(payload) {
  return { ok:true, msg:"GAS bridge พร้อมใช้งาน", data:{ echo: payload || {}, stamp:GITHUB_GAS_BRIDGE_STAMP, at:new Date().toISOString() }, source:"apiGithubBridgePing" };
}

function apiGithubBridgeCall(request) {
  request = request && typeof request === "object" ? request : {};
  var method = String(request.method || request.action || "").trim();
  var payload = request.payload == null ? {} : request.payload;
  if (!method) return { ok:false, error:"method required", errorCode:"METHOD_REQUIRED", requestId:request.requestId || "" };
  try {
    var result = apiRouter({ method: method, payload: payload, bridge: request.bridge || "github" });
    result = _normalizeApiResult_(result, method);
    result.requestId = request.requestId || result.requestId || "";
    result.bridge = request.bridge || "github";
    result.source = result.source || "apiGithubBridgeCall";
    return result;
  } catch (err) {
    return { ok:false, error:String(err && err.message || err), errorCode:"API_BRIDGE_CALL_FAILED", method:method, requestId:request.requestId || "" };
  }
}
