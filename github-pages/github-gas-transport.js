(function (w, d) {
  "use strict";
  if (!w || !d) return;
  if (w.__APP_GITHUB_RPC_TRANSPORT_CURRENT__) return;
  w.__APP_GITHUB_RPC_TRANSPORT_CURRENT__ = true;
  w.__APP_GITHUB_BRIDGE_TRANSPORT__ = true; /* compatibility guard only */
  w.__APP_HOST_MODE__ = "github-pages";

  var OWNER = "github-pages/github-gas-transport.js::canonical-rpc";
  var MODE = "github-pages-gas-router-rpc";
  var config = w.APP_GITHUB_CONFIG || {};
  var RPC_VERSION = String(config.RPC_VERSION || "github-pages-rpc-v1");
  var pending = Object.create(null);
  var inFlight = Object.create(null);
  var sequence = 0;
  var healthPromise = null;
  var health = { ok: false, checked: false, serverVersion: "", allowedOrigin: false, error: "" };
  var metrics = { calls: 0, posts: 0, polls: 0, pendingPolls: 0, completed: 0, failed: 0, healthChecks: 0, postSignals: 0, dedupeHits: 0 };

  function text(value) { return value == null ? "" : String(value); }
  function cfg(key, fallback) {
    var a = w.APP_GITHUB_CONFIG || {}, b = w.APP_CONFIG || {}, value = a[key];
    if (value == null || value === "") value = b[key];
    return value == null || value === "" ? fallback : value;
  }
  function normalizeGasUrl(value) {
    value = text(value).trim();
    if (!/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec(?:[?#].*)?$/i.test(value)) return "";
    return value.replace(/[?#].*$/, "");
  }
  function gasUrl() {
    var value = normalizeGasUrl(cfg("GAS_WEB_APP_URL", cfg("gasWebAppUrl", w.GAS_WEB_APP_URL || "")));
    if (!value) throw createError({ code: "GITHUB_GAS_URL_NOT_CONFIGURED", message: "ยังไม่ได้กำหนด GAS Web App URL" });
    return value;
  }
  function createError(raw, fallbackCode) {
    var info = raw && typeof raw === "object" ? raw : { message: text(raw) };
    var error = new Error(text(info.message || "GAS RPC request failed"));
    error.code = text(info.code || fallbackCode || "GAS_RPC_FAILED");
    error.errorCode = error.code;
    error.transportMode = MODE;
    if (info.detail) error.detail = info.detail;
    return error;
  }
  function randomCapability(prefix) {
    var bytes = new Uint8Array(24);
    try { w.crypto.getRandomValues(bytes); }
    catch (_e) { for (var i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256); }
    var hex = Array.prototype.map.call(bytes, function (b) { return ("0" + b.toString(16)).slice(-2); }).join("");
    return text(prefix || "rpc") + "_" + hex;
  }
  function callbackName() {
    sequence += 1;
    return "__ghRpcCb_" + Date.now().toString(36) + "_" + sequence.toString(36) + "_" + Math.random().toString(36).slice(2, 10);
  }
  function buildUrl(mode, fields) {
    var query = ["mode=" + encodeURIComponent(mode)];
    Object.keys(fields || {}).forEach(function (key) { query.push(encodeURIComponent(key) + "=" + encodeURIComponent(text(fields[key]))); });
    query.push("_ts=" + Date.now().toString(36));
    return gasUrl() + "?" + query.join("&");
  }
  function jsonp(mode, fields, timeoutMs) {
    return new Promise(function (resolve, reject) {
      var cb = callbackName(), done = false, script = d.createElement("script"), timer;
      fields = Object.assign({}, fields || {}, { callback: cb });
      function cleanup() {
        if (timer) w.clearTimeout(timer);
        try { delete w[cb]; } catch (_deleteErr) { w[cb] = undefined; }
        try { if (script && script.parentNode) script.parentNode.removeChild(script); } catch (_removeErr) {}
      }
      function finish(ok, value) {
        if (done) return;
        done = true; cleanup();
        if (ok) resolve(value); else reject(value instanceof Error ? value : createError(value, "GAS_RPC_JSONP_FAILED"));
      }
      w[cb] = function (payload) { finish(true, payload || {}); };
      script.async = true;
      script.referrerPolicy = "no-referrer";
      script.onerror = function () { finish(false, { code: "GAS_RPC_JSONP_LOAD_FAILED", message: "ไม่สามารถโหลดผลตอบกลับจาก GAS ได้" }); };
      script.onload = function () {
        w.setTimeout(function () {
          if (!done) finish(false, { code: "GAS_RPC_JSONP_NO_CALLBACK", message: "GAS ตอบกลับแต่ไม่ใช่ RPC รุ่นปัจจุบัน — ตรวจว่า Deploy GAS เป็น New version แล้ว" });
        }, 0);
      };
      timer = w.setTimeout(function () { finish(false, { code: "GAS_RPC_JSONP_TIMEOUT", message: "GAS RPC JSONP timeout" }); }, Math.max(3000, Number(timeoutMs || 10000)));
      script.src = buildUrl(mode, fields);
      (d.head || d.documentElement).appendChild(script);
    });
  }

  function ensureHealth(force) {
    if (healthPromise && !force) return healthPromise;
    if (health.ok && health.allowedOrigin && health.serverVersion === RPC_VERSION && !force) return Promise.resolve(health);
    metrics.healthChecks += 1;
    healthPromise = jsonp("github-rpc-health", { parentOrigin: w.location.origin, rpcVersion: RPC_VERSION }, Number(cfg("HEALTH_TIMEOUT_MS", 10000))).then(function (data) {
      var serverVersion = text(data.transportVersion);
      health.checked = true;
      health.serverVersion = serverVersion;
      health.allowedOrigin = data.allowedOrigin === true;
      health.error = "";
      if (serverVersion !== RPC_VERSION) throw createError({ code: "GAS_RPC_VERSION_MISMATCH", message: "GAS transport version ไม่ตรง: " + (serverVersion || "unknown") + " (ต้องเป็น " + RPC_VERSION + ")" });
      if (!health.allowedOrigin) throw createError({ code: "GITHUB_PAGES_ORIGIN_NOT_ALLOWED", message: "GITHUB_PAGES_ORIGIN ไม่ตรงกับ " + w.location.origin });
      if (data.bridgeRequired !== false) throw createError({ code: "GAS_RPC_HEALTH_CONTRACT_INVALID", message: "GAS RPC health contract ไม่ถูกต้อง" });
      health.ok = true;
      return health;
    }).catch(function (error) {
      health.ok = false; health.checked = true; health.error = text(error && (error.message || error.code) || error);
      throw error;
    }).then(function (value) { healthPromise = null; return value; }, function (error) { healthPromise = null; throw error; });
    return healthPromise;
  }

  function normalizeInvocation(fn, args) {
    fn = text(fn).trim(); args = args == null ? {} : args;
    if (fn === "apiRouter" || fn === "apiLogin" || fn === "apiSessionResume" || fn === "apiSessionCheck" || fn === "apiLogout" || fn === "getDeferredInclude") return { fn: fn, args: args, original: fn };
    return { fn: "apiRouter", args: { method: fn, payload: args }, original: fn };
  }
  function postFields(rec, invocation) {
    var fields = {
      mode: "github-rpc",
      parentOrigin: w.location.origin,
      rpcVersion: RPC_VERSION,
      rpcId: rec.rpcId,
      rpcToken: rec.rpcToken,
      rpcFunction: invocation.fn,
      rpcPayload: JSON.stringify(invocation.args == null ? {} : invocation.args)
    };
    var params = new URLSearchParams();
    Object.keys(fields).forEach(function (key) { params.append(key, fields[key]); });
    metrics.posts += 1;
    rec.postMode = "fetch-no-cors";
    if (w.fetch) {
      return w.fetch(gasUrl(), {
        method: "POST", mode: "no-cors", credentials: "omit", cache: "no-store", redirect: "follow", referrerPolicy: "no-referrer", body: params
      }).then(function () { metrics.postSignals += 1; rec.postSettled = true; return true; }, function (error) {
        rec.postError = text(error && error.message || error); return false;
      });
    }
    rec.postMode = "hidden-form";
    return new Promise(function (resolve) {
      var frame = d.createElement("iframe"), form = d.createElement("form"), frameName = "ghrpc_" + rec.rpcId.replace(/[^A-Za-z0-9_]/g, "_");
      frame.name = frameName; frame.title = "GAS RPC POST"; frame.style.display = "none"; frame.setAttribute("aria-hidden", "true");
      form.method = "POST"; form.action = gasUrl(); form.target = frameName; form.style.display = "none";
      Object.keys(fields).forEach(function (key) { var input = d.createElement("textarea"); input.name = key; input.value = fields[key]; form.appendChild(input); });
      var submitted = false, done = false;
      function complete() {
        if (done || !submitted) return; done = true; metrics.postSignals += 1; rec.postSettled = true;
        w.setTimeout(function () { try { if (form.parentNode) form.parentNode.removeChild(form); } catch (_) {} try { if (frame.parentNode) frame.parentNode.removeChild(frame); } catch (_) {} }, 0);
        resolve(true);
      }
      frame.onload = complete;
      (d.body || d.documentElement).appendChild(frame); (d.body || d.documentElement).appendChild(form); submitted = true;
      try { form.submit(); } catch (error) { rec.postError = text(error && error.message || error); complete(); }
      w.setTimeout(complete, Math.max(3000, Number(cfg("POST_SIGNAL_GRACE_MS", 3500))));
    });
  }
  function pollDelay(attempt) {
    var min = Math.max(250, Number(cfg("RESULT_POLL_MIN_MS", 450))), max = Math.max(min, Number(cfg("RESULT_POLL_MAX_MS", 2200)));
    return Math.min(max, min + Math.max(0, attempt - 1) * 220);
  }
  function pollResult(rec, attempt) {
    attempt = Number(attempt || 0) || 0;
    if (Date.now() >= rec.deadline) return Promise.reject(createError({ code: "GAS_RPC_REQUEST_TIMEOUT", message: "GAS request timeout: " + rec.original }));
    metrics.polls += 1;
    return jsonp("github-rpc-result", { parentOrigin: w.location.origin, rpcVersion: RPC_VERSION, rpcId: rec.rpcId, rpcToken: rec.rpcToken }, Math.min(12000, Math.max(4000, rec.deadline - Date.now()))).then(function (data) {
      if (data && data.pending === true) {
        metrics.pendingPolls += 1;
        return new Promise(function (resolve) { w.setTimeout(resolve, pollDelay(attempt + 1)); }).then(function () { return pollResult(rec, attempt + 1); });
      }
      if (!data || data.transportOk === false || data.ok === false) throw createError(data && data.error || { code: "GAS_RPC_RESULT_FAILED", message: "GAS RPC result failed" });
      return data.result;
    });
  }
  function startRpc(invocation, options) {
    options = options || {};
    var rpcId = randomCapability("req"), rpcToken = randomCapability("tok"), timeoutMs = Math.max(10000, Number(options.timeoutMs || cfg("RESULT_TIMEOUT_MS", cfg("REQUEST_TIMEOUT_MS", 90000))) || 90000);
    var rec = { rpcId: rpcId, rpcToken: rpcToken, original: invocation.original, startedAt: Date.now(), deadline: Date.now() + timeoutMs, postSettled: false, postError: "", postMode: "" };
    pending[rpcId] = rec;
    var postSignal;
    try { postSignal = postFields(rec, invocation); }
    catch (error) { delete pending[rpcId]; return Promise.reject(error); }
    var grace = new Promise(function (resolve) { w.setTimeout(resolve, Math.max(500, Number(cfg("POST_SIGNAL_GRACE_MS", 3500)))); });
    return Promise.race([Promise.resolve(postSignal), grace]).then(function () { return pollResult(rec, 0); }).then(function (value) {
      metrics.completed += 1; delete pending[rpcId]; return value;
    }, function (error) {
      metrics.failed += 1; delete pending[rpcId]; throw error;
    });
  }
  function remoteRun(fn, args, options) {
    var invocation = normalizeInvocation(fn, args);
    return ensureHealth(false).then(function () { return startRpc(invocation, options); });
  }
  function run(fn, args, options) {
    metrics.calls += 1; fn = text(fn).trim();
    if (!fn) return Promise.reject(createError({ code: "METHOD_REQUIRED", message: "method required" }));
    var write = /^api(?:Save|Delete|Update|Create|Import|Extract|Upload|Issue|Process|Cleanup|Generate|Send|Patch|Approve|Reject|Submit|Queue|Migrate|Revoke|Refresh)/i.test(fn);
    var key = write ? "" : fn + "|" + JSON.stringify(args == null ? {} : args);
    if (key && inFlight[key]) { metrics.dedupeHits += 1; return inFlight[key]; }
    var request = remoteRun(fn, args, options);
    if (!key) return request;
    inFlight[key] = request.then(function (value) { delete inFlight[key]; return value; }, function (error) { delete inFlight[key]; throw error; });
    return inFlight[key];
  }
  function reset() {
    healthPromise = null; health = { ok: false, checked: false, serverVersion: "", allowedOrigin: false, error: "" };
    Object.keys(pending).forEach(function (id) { delete pending[id]; });
    inFlight = Object.create(null);
    return true;
  }
  function status() {
    return {
      ok: health.ok === true && health.allowedOrigin === true && health.serverVersion === RPC_VERSION,
      owner: OWNER,
      mode: MODE,
      transportMode: MODE,
      configured: !!normalizeGasUrl(cfg("GAS_WEB_APP_URL", cfg("gasWebAppUrl", w.GAS_WEB_APP_URL || ""))),
      gasWebAppUrlConfigured: !!normalizeGasUrl(cfg("GAS_WEB_APP_URL", cfg("gasWebAppUrl", w.GAS_WEB_APP_URL || ""))),
      parentOrigin: w.location.origin,
      transportVersion: RPC_VERSION,
      serverVersion: health.serverVersion,
      healthChecked: health.checked,
      allowedOrigin: health.allowedOrigin,
      healthError: health.error,
      activeRequests: Object.keys(pending).length,
      bridgeRequired: false,
      bridgeLoadState: "retired-rpc",
      bridge: { state: "retired-rpc", ready: false, protocol: "none", origin: "", channel: "none", portReady: false, lastError: "" },
      ingress: "POST(no-cors/form)",
      egress: "capability-JSONP",
      pending: Object.keys(pending).length,
      metrics: Object.assign({}, metrics)
    };
  }
  function applyLogo() {
    var url = text(cfg("logoUrl", cfg("fallbackLogoUrl", ""))).trim(); if (!url) return false;
    try { Array.prototype.forEach.call(d.querySelectorAll('[data-logo="parliament"],#login-logo-img,#side-logo-img,#mobile-topbar-logo,.print-logo-img'), function (image) { image.setAttribute("src", url); image.style.display = ""; image.style.visibility = "visible"; }); } catch (_) {}
    return true;
  }

  w.AppTransport = w.AppTransport || {};
  var api = w.AppTransport;
  api.__owner = OWNER;
  api.mode = MODE;
  api.transportMode = MODE;
  api.run = run;
  api.probe = function () { return ensureHealth(true); };
  api.runGasDirectBridge = run;
  api.runVercelProxy = run;
  api.runJsonpApi = run;
  api.runLoginPost = function (fn, args, options) { return run(fn, args, options); };
  api.ensureBridgeClient = function () { return ensureHealth(false).then(function () { return true; }); };
  api.warmAuthBridge = function () { return ensureHealth(false).then(function () { return true; }, function () { return false; }); };
  api.bridgeClientState = function () { return status().bridge; };
  api.reset = reset;
  api.resetBridge = reset;
  api.clearApiCache = function () { inFlight = Object.create(null); return true; };
  api.invalidateClientApiCache = api.clearApiCache;
  api.loadPublicConfig = function () { applyLogo(); return Promise.resolve({ ok: true, gasWebAppUrlConfigured: status().gasWebAppUrlConfigured, transportMode: MODE }); };
  api.runtimeOwnerStatus = status;
  api.assertRuntimeOwner = function () { var current = status(); if (!current.configured) throw createError({ code: "APP_RUNTIME_OWNER_MISMATCH", message: "GitHub Pages GAS transport ไม่พร้อม" }); return current; };
  api.releaseStatus = function () { return { ok: true, transportMode: MODE, transportVersion: RPC_VERSION, bridgeRequired: false, mismatch: [], warnings: [] }; };
  api.phase2Status = status; api.phase1Status = status; api.phase0Status = status;
  api.clientCacheStatus = function () { return { ok: true, owner: OWNER, readResponseCache: false, inFlight: Object.keys(inFlight).length, metrics: Object.assign({}, metrics) }; };
  api.setGasWebAppUrl = function (url) {
    url = text(url).trim(); if (!/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec(?:[?#].*)?$/i.test(url)) return normalizeGasUrl(cfg("GAS_WEB_APP_URL", ""));
    url = url.replace(/[?#].*$/, ""); w.APP_CONFIG = w.APP_CONFIG || {}; w.APP_CONFIG.gasWebAppUrl = url; w.GAS_WEB_APP_URL = url; reset(); return url;
  };
  api.ping = api.probe;
  api.status = status;
  try { applyLogo(); } catch (_) {}
  w.setTimeout(function () { ensureHealth(false).catch(function () {}); }, 0);
})(window, document);
