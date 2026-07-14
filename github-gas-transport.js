(function(root, doc) {
  "use strict";
  if (!root || !doc) return;

  var FALLBACK_LOGO = "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22128%22%20height%3D%22128%22%20viewBox%3D%220%200%20128%20128%22%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20rx%3D%2224%22%20fill%3D%22%23f8fafc%22/%3E%3Ccircle%20cx%3D%2264%22%20cy%3D%2248%22%20r%3D%2226%22%20fill%3D%22%23d4af37%22/%3E%3Cpath%20d%3D%22M28%20100h72M40%2088h48M48%2074h32%22%20stroke%3D%22%23334155%22%20stroke-width%3D%227%22%20stroke-linecap%3D%22round%22/%3E%3Ctext%20x%3D%2264%22%20y%3D%2255%22%20text-anchor%3D%22middle%22%20font-family%3D%22Sarabun%2C%20Arial%22%20font-size%3D%2218%22%20fill%3D%22%23334155%22%3E%E0%B8%AA%E0%B8%A0%E0%B8%B2%3C/text%3E%3C/svg%3E";
  var PHASE_RELEASE_STAMP = "commission-v1.2-github-pages-gas-direct-2026-07-14-r104";
  var PHASE_ASSET_STAMP = "asset-manifest-commission-v1.2-github-pages-gas-direct-2026-07-14-r104";
  var PHASE_TRANSPORT_MODE = "github-pages-gas-direct-iframe-bridge";
  var DEFAULT_GAS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzt3p-NLOg8QpmnB_Bj03Rds6H9SlNevnbcOAqzm1vzuAFXPtXhYVlDUTblCclmjSAm/exec";
  var cache = Object.create(null);
  var assetInFlight = Object.create(null);
  var apiInFlight = Object.create(null);
  var apiReadCache = Object.create(null);
  var apiCacheEpoch = 0;
  var apiMetrics = { calls: 0, cacheHits: 0, cacheWrites: 0, dedupeHits: 0, errors: 0, last: [] };
  var bridgeFrame = null;
  var bridgeReady = false;
  var bridgeInFlight = null;
  var bridgePending = Object.create(null);
  var loginPostPending = Object.create(null);
  var apiPostPending = Object.create(null);
  var jsonpPending = Object.create(null);

  function text(v) { return v == null ? "" : String(v); }
  function isObj(v) { return !!v && typeof v === "object" && !Array.isArray(v); }
  function cfg(name, fallback) {
    var c = root.APP_CONFIG || {};
    return c[name] == null || c[name] === "" ? fallback : c[name];
  }
  function normalizeUrl(url) { return text(url).trim().replace(/\s+/g, ""); }
  function bridgeError(message, code, method) {
    var err = new Error(message);
    err.code = code || "GITHUB_GAS_DIRECT_ERROR";
    err.errorCode = err.code;
    err.method = method || "";
    err.transportMode = PHASE_TRANSPORT_MODE;
    return err;
  }
  function gasWebAppUrl() {
    var url = normalizeUrl(root.GAS_WEB_APP_URL || cfg("gasWebAppUrl", "") || DEFAULT_GAS_WEB_APP_URL || "");
    if (!url || url === "PUT_GAS_WEB_APP_URL_HERE") {
      throw bridgeError("ยังไม่ได้ตั้งค่า GAS Web App URL สำหรับ GitHub Pages ให้แก้ github-pages/app-config.js ค่า gasWebAppUrl เป็น URL ที่ลงท้าย /exec", "GAS_WEB_APP_URL_REQUIRED");
    }
    if (!/^https:\/\/script\.google\.com\/macros\/s\//i.test(url)) {
      throw bridgeError("GAS Web App URL ไม่ถูกต้อง ต้องเป็น https://script.google.com/macros/s/.../exec", "GAS_WEB_APP_URL_INVALID");
    }
    return url;
  }
  function gasOrigin() {
    try { return new URL(gasWebAppUrl()).origin; } catch (_) { return "https://script.google.com"; }
  }
  function gasBridgeTargetOrigins() {
    var origins = [gasOrigin(), "https://script.googleusercontent.com"];
    var seen = Object.create(null);
    return origins.filter(function(origin) {
      origin = text(origin).trim();
      if (!/^https:\/\//i.test(origin) || seen[origin]) return false;
      seen[origin] = true;
      return true;
    });
  }
  function postToBridgeFrame(message) {
    var win = bridgeFrame && bridgeFrame.contentWindow;
    if (!win) return false;
    var sent = false;
    gasBridgeTargetOrigins().forEach(function(origin) {
      try { win.postMessage(message, origin); sent = true; } catch (_) {}
    });
    return sent;
  }
  function withQuery(url, params) {
    var u = new URL(url, root.location && root.location.href || undefined);
    Object.keys(params || {}).forEach(function(k) { u.searchParams.set(k, params[k]); });
    return u.href;
  }
  function requestId(method) { return "gh_" + text(method || "api") + "_" + Date.now() + "_" + Math.random().toString(36).slice(2); }
  function recordApiMetric(item) {
    try {
      item = item || {}; item.at = item.at || new Date().toISOString();
      apiMetrics.calls += item.kind === "call" ? 1 : 0;
      apiMetrics.cacheHits += item.cacheHit ? 1 : 0;
      apiMetrics.cacheWrites += item.cacheWrite ? 1 : 0;
      apiMetrics.dedupeHits += item.dedupeHit ? 1 : 0;
      apiMetrics.errors += item.error ? 1 : 0;
      apiMetrics.last.push(item); if (apiMetrics.last.length > 30) apiMetrics.last.shift();
    } catch (_) {}
  }
  function isWriteApiMethod(method) {
    method = text(method).trim();
    return !!method && (/^api(?:Save|Delete|Update|Create|Import|Extract|Upload|Issue|Process|Cleanup|Generate|Send|Patch|Approve|Reject|Submit|Queue|Migrate|Revoke|Refresh)/i.test(method) || /^api(?:Admin)?(?:Save|Delete|Update|Create)/i.test(method) || /^apiBudget(?:Save|Delete|Import)/i.test(method));
  }
  function isReadApiMethod(method) {
    method = text(method).trim();
    return !!method && !/^api(Login|Logout)$/i.test(method) && !isWriteApiMethod(method) && (/^(apiGet|apiList|apiSearch|apiBootstrap|apiSessionCheck|apiSessionResume|apiVerifySession|apiBudgetGet|apiBudgetList|apiBudgetAdminList|apiAdminList|apiCheckDuplicateCase)/i.test(method) || method === "apiRouter");
  }
  function isAuthOrBootstrapMethod(method) {
    return /^(apiLogin|apiLogout|apiSessionResume|apiSessionCheck|apiVerifySession|apiBootstrap|apiIssueActionToken|apiGetRouteContract|apiGetPhase0ContractGate|apiGetPhase1Contract|apiGetPhase2Contract|apiGetClientDataContract)$/i.test(text(method).trim());
  }
  function isCacheSafeReadMethod(method) { return isReadApiMethod(method) && !isAuthOrBootstrapMethod(method); }
  function payloadWantsFresh(payload) {
    payload = isObj(payload) ? payload : {};
    return payload.forceFresh === true || payload.noCache === true || payload.bypassCache === true || Number(payload.cacheTtlSeconds) === 0;
  }
  function stableClone(value) {
    if (Array.isArray(value)) return value.map(stableClone);
    if (!isObj(value)) return value;
    var out = {};
    Object.keys(value).sort().forEach(function(k) {
      if (/^(token|_token|authToken|csrf|csrfToken|_csrf|_csrfToken|actionToken|csrfActionToken|_actionToken|password|pass|pwd)$/i.test(k)) return;
      if (/^(_|nonce|at|source|clientContext)$/i.test(k)) return;
      out[k] = stableClone(value[k]);
    });
    return out;
  }
  function stableKey(method, payload) { try { return method + "|" + JSON.stringify(stableClone(payload || {})); } catch (_) { return method + "|" + Date.now(); } }
  function cloneJson(value) { try { return value == null ? value : JSON.parse(JSON.stringify(value)); } catch (_) { return value; } }
  function readCacheTtlMs(payload) {
    var ttl = Number(payload && payload.cacheTtlSeconds);
    if (isFinite(ttl) && ttl > 0) return Math.max(5000, Math.min(ttl * 1000, Number(cfg("clientReadCacheMaxTtlMs", 120000)) || 120000));
    return Number(cfg("clientReadCacheTtlMs", 60000)) || 60000;
  }
  function invalidateClientApiCache(reason, method) {
    apiInFlight = Object.create(null);
    apiReadCache = Object.create(null);
    apiCacheEpoch += 1;
    root.__APP_CLIENT_API_CACHE_EPOCH__ = apiCacheEpoch;
    recordApiMetric({ kind: "cache-invalidate", method: text(method || ""), transport: "github-gas-direct", reason: text(reason || "write"), cacheEpoch: apiCacheEpoch });
    return true;
  }
  function getCachedRead(method, payload) {
    if (!cfg("clientReadResponseCacheEnabled", true) || payloadWantsFresh(payload) || !isCacheSafeReadMethod(method)) return null;
    var key = stableKey(method, payload), hit = apiReadCache[key], now = Date.now();
    if (hit && hit.expiresAt > now) { recordApiMetric({ kind: "cache", method: method, cacheHit: true, transport: "github-gas-direct" }); return cloneJson(hit.value); }
    return null;
  }
  function putCachedRead(method, payload, value) {
    if (!cfg("clientReadResponseCacheEnabled", true) || payloadWantsFresh(payload) || !isCacheSafeReadMethod(method) || !isObj(value) || value.ok === false) return;
    var key = stableKey(method, payload), ttl = readCacheTtlMs(payload);
    apiReadCache[key] = { value: cloneJson(value), expiresAt: Date.now() + ttl, staleUntil: Date.now() + (Number(cfg("clientReadStaleIfErrorMs", 600000)) || 600000) };
    recordApiMetric({ kind: "cache", method: method, cacheWrite: true, transport: "github-gas-direct", ttlMs: ttl });
  }
  function staleRead(method, payload) {
    var hit = apiReadCache[stableKey(method, payload)];
    return hit && hit.staleUntil > Date.now() ? cloneJson(hit.value) : null;
  }

  function bridgeUrl() {
    return withQuery(gasWebAppUrl(), { __githubBridgeClient: "1", parentOrigin: root.location.origin, r: PHASE_RELEASE_STAMP });
  }
  function ensureBridge() {
    if (bridgeReady && bridgeFrame && bridgeFrame.contentWindow) return Promise.resolve(bridgeFrame);
    if (bridgeInFlight) return bridgeInFlight;
    bridgeInFlight = new Promise(function(resolve, reject) {
      var timeoutMs = Number(cfg("bridgeReadyTimeoutMs", cfg("apiTimeoutMs", 110000))) || 30000;
      timeoutMs = Math.max(8000, Math.min(timeoutMs, 30000));
      var timer = setTimeout(function() {
        bridgeInFlight = null;
        reject(bridgeError("GAS bridge ยังไม่พร้อมใช้งาน ให้ตรวจ GAS_WEB_APP_URL และการ Deploy Web App แบบ Anyone", "GAS_BRIDGE_READY_TIMEOUT"));
      }, timeoutMs);
      function done(frame) { clearTimeout(timer); bridgeReady = true; bridgeInFlight = null; resolve(frame); }
      try {
        bridgeFrame = doc.getElementById("app-gas-direct-bridge");
        if (!bridgeFrame) {
          bridgeFrame = doc.createElement("iframe");
          bridgeFrame.id = "app-gas-direct-bridge";
          bridgeFrame.title = "GAS Direct Bridge";
          bridgeFrame.setAttribute("aria-hidden", "true");
          bridgeFrame.style.cssText = "position:absolute;width:1px;height:1px;left:-9999px;top:-9999px;border:0;opacity:0;pointer-events:none;";
          (doc.body || doc.documentElement).appendChild(bridgeFrame);
        }
        bridgeFrame.onload = function() { setTimeout(function(){ if (!bridgeReady) probeBridge(); }, 20); };
        if (bridgeFrame.src !== bridgeUrl()) bridgeFrame.src = bridgeUrl();
        function probeBridge() {
          postToBridgeFrame({ type: "GAS_IFRAME_TRANSPORT_PING_READY", __gasIframeTransport: true });
        }
        var probes = [40, 120, 300, 700, 1500, 3000];
        probes.forEach(function(ms) { setTimeout(function(){ if (!bridgeReady) probeBridge(); }, ms); });
        if (bridgeReady) done(bridgeFrame);
        else {
          var prev = root.__APP_GAS_DIRECT_BRIDGE_READY_CALLBACKS__ || [];
          prev.push(done);
          root.__APP_GAS_DIRECT_BRIDGE_READY_CALLBACKS__ = prev;
        }
      } catch (err) {
        clearTimeout(timer); bridgeInFlight = null; reject(err);
      }
    });
    return bridgeInFlight;
  }
  root.addEventListener("message", function(ev) {
    var data = ev && ev.data;
    if (typeof data === "string") { try { data = JSON.parse(data); } catch (_) { return; } }
    if (!isObj(data) || data.__gasIframeTransport !== true && data.__gasIframeTransport !== "true") return;
    if (data.type === "GAS_LOGIN_POST_RESPONSE") {
      var loginId = text(data.requestId || data.id || "");
      var loginPending = loginId && loginPostPending[loginId];
      if (!loginPending) return;
      delete loginPostPending[loginId];
      clearTimeout(loginPending.timer);
      try { loginPending.cleanup && loginPending.cleanup(); } catch (_) {}
      var loginResult = data.result || { ok: false, error: "empty login response", errorCode: "GITHUB_LOGIN_POST_EMPTY_RESPONSE" };
      if (isObj(loginResult)) {
        loginResult.method = loginResult.method || "apiLogin";
        loginResult.transport = loginResult.transport || "github-login-post";
        loginResult.releaseStamp = loginResult.releaseStamp || PHASE_RELEASE_STAMP;
        loginResult.meta = Object.assign({}, isObj(loginResult.meta) ? loginResult.meta : {}, { githubGasDirect: true, loginPost: true, transport: loginResult.transport, releaseStamp: PHASE_RELEASE_STAMP });
      }
      loginPending.resolve(loginResult);
      return;
    }
    if (data.type === "GAS_API_POST_RESPONSE") {
      var apiId = text(data.requestId || data.id || "");
      var apiPending = apiId && apiPostPending[apiId];
      if (!apiPending) return;
      delete apiPostPending[apiId];
      clearTimeout(apiPending.timer);
      try { apiPending.cleanup && apiPending.cleanup(); } catch (_) {}
      var apiResult = data.result || { ok: false, error: "empty api response", errorCode: "GITHUB_API_POST_EMPTY_RESPONSE" };
      if (isObj(apiResult)) {
        apiResult.method = apiResult.method || data.method || apiPending.method;
        apiResult.transport = apiResult.transport || "github-api-post";
        apiResult.releaseStamp = apiResult.releaseStamp || PHASE_RELEASE_STAMP;
        apiResult.meta = Object.assign({}, isObj(apiResult.meta) ? apiResult.meta : {}, { githubGasDirect: true, apiPost: true, transport: apiResult.transport, releaseStamp: PHASE_RELEASE_STAMP });
      }
      apiPending.resolve(apiResult);
      return;
    }
    if (data.type === "GAS_IFRAME_TRANSPORT_READY") {
      bridgeReady = true;
      var callbacks = root.__APP_GAS_DIRECT_BRIDGE_READY_CALLBACKS__ || [];
      root.__APP_GAS_DIRECT_BRIDGE_READY_CALLBACKS__ = [];
      callbacks.forEach(function(fn) { try { fn(bridgeFrame); } catch (_) {} });
      return;
    }
    if (data.type === "GAS_IFRAME_TRANSPORT_RESPONSE") {
      var id = text(data.requestId || data.id || "");
      var pending = id && bridgePending[id];
      if (!pending) return;
      delete bridgePending[id];
      clearTimeout(pending.timer);
      var result = data.result || { ok: false, error: "empty GAS bridge response", errorCode: "GAS_BRIDGE_EMPTY_RESPONSE" };
      if (isObj(result)) {
        result.method = result.method || data.method || pending.method;
        result.transport = result.transport || "github-gas-direct-bridge";
        result.releaseStamp = result.releaseStamp || PHASE_RELEASE_STAMP;
        result.meta = Object.assign({}, isObj(result.meta) ? result.meta : {}, { githubGasDirect: true, transport: result.transport, releaseStamp: PHASE_RELEASE_STAMP });
      }
      pending.resolve(result);
    }
  });
  function hiddenField(form, name, value) {
    var input = doc.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value == null ? "" : String(value);
    form.appendChild(input);
    return input;
  }
  function runLoginPostApi(method, payload, options) {
    method = text(method).trim();
    if (!/^apiLogin$/i.test(method)) return runBridgeApi(method, payload, options);
    payload = isObj(payload) ? Object.assign({}, payload) : {};
    return new Promise(function(resolve, reject) {
      var id = requestId("apiLoginPost");
      var timeoutMs = Number(options && (options.loginTimeoutMs || options.timeoutMs || options.clientTimeoutMs) || cfg("loginPostTimeoutMs", 45000)) || 45000;
      timeoutMs = Math.max(12000, Math.min(timeoutMs, 65000));
      var iframe = null, form = null;
      function cleanup() {
        try { form && form.parentNode && form.parentNode.removeChild(form); } catch (_) {}
        try { iframe && iframe.parentNode && iframe.parentNode.removeChild(iframe); } catch (_) {}
      }
      var timer = setTimeout(function() {
        delete loginPostPending[id];
        cleanup();
        reject(bridgeError("GAS Login POST timeout: apiLogin", "GITHUB_LOGIN_POST_TIMEOUT", "apiLogin"));
      }, timeoutMs);
      loginPostPending[id] = { resolve: resolve, reject: reject, timer: timer, method: "apiLogin", cleanup: cleanup };
      try {
        payload.__loginPostRequestId = id;
        payload.__loginPostParentOrigin = root.location && root.location.origin || "";
        iframe = doc.createElement("iframe");
        iframe.name = "app-gas-login-post-" + id.replace(/[^a-z0-9_-]/ig, "_");
        iframe.id = iframe.name;
        iframe.title = "GAS Login POST";
        iframe.setAttribute("aria-hidden", "true");
        iframe.style.cssText = "position:absolute;width:1px;height:1px;left:-9999px;top:-9999px;border:0;opacity:0;pointer-events:none;";
        form = doc.createElement("form");
        form.method = "POST";
        form.target = iframe.name;
        form.action = withQuery(gasWebAppUrl(), { __githubLoginPost: "1", requestId: id, parentOrigin: root.location && root.location.origin || "", r: PHASE_RELEASE_STAMP });
        form.style.cssText = "display:none;position:absolute;left:-9999px;top:-9999px;";
        hiddenField(form, "payload", JSON.stringify(payload));
        if (payload.username != null) hiddenField(form, "username", payload.username);
        if (payload.email != null) hiddenField(form, "email", payload.email);
        if (payload.password != null) hiddenField(form, "password", payload.password);
        (doc.body || doc.documentElement).appendChild(iframe);
        (doc.body || doc.documentElement).appendChild(form);
        form.submit();
      } catch (err) {
        delete loginPostPending[id];
        clearTimeout(timer);
        cleanup();
        reject(err);
      }
    });
  }
  function runApiPost(method, payload, options) {
    method = text(method).trim();
    if (!method) return Promise.reject(bridgeError("method required", "METHOD_REQUIRED"));
    payload = isObj(payload) ? Object.assign({}, payload) : (payload == null ? {} : { value: payload });
    return new Promise(function(resolve, reject) {
      var id = requestId(method + "Post");
      var isWrite = isWriteApiMethod(method);
      var timeoutMs = Number(options && (options.timeoutMs || options.clientTimeoutMs) || (isWrite ? cfg("writePostTimeoutMs", 110000) : cfg("readPostTimeoutMs", cfg("apiTimeoutMs", 110000)))) || 110000;
      timeoutMs = Math.max(15000, Math.min(timeoutMs, 120000));
      var iframe = null, form = null;
      function cleanup() {
        try { form && form.parentNode && form.parentNode.removeChild(form); } catch (_) {}
        try { iframe && iframe.parentNode && iframe.parentNode.removeChild(iframe); } catch (_) {}
      }
      var timer = setTimeout(function() {
        delete apiPostPending[id];
        cleanup();
        reject(bridgeError("GAS API POST timeout: " + method, "GITHUB_API_POST_TIMEOUT", method));
      }, timeoutMs);
      apiPostPending[id] = { resolve: resolve, reject: reject, timer: timer, method: method, cleanup: cleanup };
      try {
        var envelope = { method: method, payload: payload, requestId: id, bridge: "github-api-post-r104", releaseStamp: PHASE_RELEASE_STAMP };
        iframe = doc.createElement("iframe");
        iframe.name = "app-gas-api-post-" + id.replace(/[^a-z0-9_-]/ig, "_");
        iframe.id = iframe.name;
        iframe.title = "GAS API POST";
        iframe.setAttribute("aria-hidden", "true");
        iframe.style.cssText = "position:absolute;width:1px;height:1px;left:-9999px;top:-9999px;border:0;opacity:0;pointer-events:none;";
        form = doc.createElement("form");
        form.method = "POST";
        form.target = iframe.name;
        form.action = withQuery(gasWebAppUrl(), { __githubApiPost: "1", method: method, requestId: id, parentOrigin: root.location && root.location.origin || "", r: PHASE_RELEASE_STAMP });
        form.style.cssText = "display:none;position:absolute;left:-9999px;top:-9999px;";
        hiddenField(form, "method", method);
        hiddenField(form, "payload", JSON.stringify(envelope));
        hiddenField(form, "data", JSON.stringify(envelope));
        (doc.body || doc.documentElement).appendChild(iframe);
        (doc.body || doc.documentElement).appendChild(form);
        form.submit();
      } catch (err) {
        delete apiPostPending[id];
        clearTimeout(timer);
        cleanup();
        reject(err);
      }
    });
  }

  function jsonpCallbackName(id) {
    return "__APP_GITHUB_JSONP_CB_" + id.replace(/[^A-Za-z0-9_$]/g, "_");
  }
  function runJsonpApi(method, payload, options) {
    method = text(method).trim();
    if (!method) return Promise.reject(bridgeError("method required", "METHOD_REQUIRED"));
    payload = isObj(payload) ? Object.assign({}, payload) : (payload == null ? {} : { value: payload });
    return new Promise(function(resolve, reject) {
      var id = requestId(method + "Jsonp");
      var cb = jsonpCallbackName(id);
      var timeoutMs = Number(options && (options.timeoutMs || options.clientTimeoutMs) || cfg("jsonpReadTimeoutMs", cfg("apiTimeoutMs", 110000))) || 110000;
      timeoutMs = Math.max(12000, Math.min(timeoutMs, 120000));
      var script = null;
      function cleanup() {
        try { script && script.parentNode && script.parentNode.removeChild(script); } catch (_) {}
        try { delete root[cb]; } catch (_) { root[cb] = undefined; }
        delete jsonpPending[id];
      }
      var timer = setTimeout(function() {
        cleanup();
        reject(bridgeError("GAS JSONP read timeout: " + method, "GITHUB_JSONP_READ_TIMEOUT", method));
      }, timeoutMs);
      jsonpPending[id] = { method: method, timer: timer };
      root[cb] = function(result) {
        clearTimeout(timer);
        cleanup();
        result = result || { ok: false, error: "empty JSONP response", errorCode: "GITHUB_JSONP_EMPTY_RESPONSE" };
        if (isObj(result)) {
          result.method = result.method || method;
          result.transport = result.transport || "github-jsonp-read";
          result.releaseStamp = result.releaseStamp || PHASE_RELEASE_STAMP;
          result.meta = Object.assign({}, isObj(result.meta) ? result.meta : {}, { githubGasDirect: true, jsonpRead: true, transport: result.transport, releaseStamp: PHASE_RELEASE_STAMP });
        }
        resolve(result);
      };
      try {
        var u = new URL(gasWebAppUrl());
        u.searchParams.set("__githubJsonpApi", "1");
        u.searchParams.set("method", method);
        u.searchParams.set("requestId", id);
        u.searchParams.set("callback", cb);
        u.searchParams.set("parentOrigin", root.location && root.location.origin || "");
        u.searchParams.set("r", PHASE_RELEASE_STAMP);
        u.searchParams.set("payload", encodeURIComponent(JSON.stringify(payload || {})));
        script = doc.createElement("script");
        script.async = true;
        script.defer = true;
        script.src = u.href;
        script.onerror = function() {
          clearTimeout(timer);
          cleanup();
          reject(bridgeError("GAS JSONP read failed: " + method, "GITHUB_JSONP_READ_FAILED", method));
        };
        (doc.head || doc.documentElement).appendChild(script);
      } catch (err) {
        clearTimeout(timer);
        cleanup();
        reject(err);
      }
    });
  }
  function runReadApi(method, payload, options) {
    if (cfg("readJsonpApi", true) !== false && isReadApiMethod(method)) {
      return runJsonpApi(method, payload, options).then(function(result) {
        if (isObj(result) && result.ok === false && /JSONP_API_FAILED|JSONP_READ_API_DISABLED|JSONP_API_NOT_ALLOWED/i.test(text(result.errorCode || result.code || ""))) {
          return runBridgeApi(method, payload, options);
        }
        return result;
      }, function(err) {
        return runBridgeApi(method, payload, options).catch(function() { throw err; });
      });
    }
    return runBridgeApi(method, payload, options);
  }

  function runBridgeApi(method, payload, options) {
    method = text(method).trim();
    if (!method) return Promise.reject(bridgeError("method required", "METHOD_REQUIRED"));
    return ensureBridge().then(function(frame) {
      return new Promise(function(resolve, reject) {
        var id = requestId(method);
        var timeoutMs = Math.max(10000, Math.min(Number(options && (options.timeoutMs || options.clientTimeoutMs) || cfg("apiTimeoutMs", 110000)) || 110000, 120000));
        var timer = setTimeout(function() { delete bridgePending[id]; reject(bridgeError("GAS Direct bridge timeout: " + method, "GAS_DIRECT_BRIDGE_TIMEOUT", method)); }, timeoutMs);
        bridgePending[id] = { resolve: resolve, reject: reject, timer: timer, method: method };
        try {
          postToBridgeFrame({
            __gasIframeTransport: true,
            type: "GAS_IFRAME_TRANSPORT_REQUEST",
            requestId: id,
            method: method,
            payload: payload == null ? {} : payload,
            bridge: "github-pages-gas-direct-r104",
            releaseStamp: PHASE_RELEASE_STAMP
          });
        } catch (err) {
          delete bridgePending[id]; clearTimeout(timer); reject(err);
        }
      });
    });
  }
  function runWithPolicy(method, payload, options) {
    var cached = getCachedRead(method, payload);
    if (cached) return Promise.resolve(cached);
    var key = stableKey(method, payload), isWrite = isWriteApiMethod(method), isLogin = /^apiLogin$/i.test(method);
    if (!isWrite && apiInFlight[key]) { recordApiMetric({ kind: "call", method: method, dedupeHit: true, transport: "github-gas-direct-bridge" }); return apiInFlight[key]; }

    // R102: login still uses POST iframe because it carries the password safely.
    // Post-login data APIs use the GAS iframe bridge. Apps Script HtmlService frames
    // normally run on script.googleusercontent.com after redirect, so bridge messages
    // are posted to both the script.google.com URL and the googleusercontent origin.
    var apiInvoker = isLogin ? runLoginPostApi : (isWrite ? runBridgeApi : runReadApi);
    var p = apiInvoker(method, payload, options).then(function(result) {
      recordApiMetric({ kind: "call", method: method, transport: isLogin ? "github-login-post" : (isWrite ? "github-gas-direct-bridge" : "github-jsonp-read"), error: isObj(result) && result.ok === false });
      if (isLogin && isObj(result) && result.ok !== false) {
        try { ensureBridge().catch(function(_){}); } catch (_) {}
      }
      if (isWrite && isObj(result) && result.ok !== false) invalidateClientApiCache("write-success", method);
      else putCachedRead(method, payload, result);
      return result;
    }, function(err) {
      recordApiMetric({ kind: "call", method: method, transport: isLogin ? "github-login-post" : (isWrite ? "github-gas-direct-bridge" : "github-jsonp-read"), error: true, message: err && err.message || String(err || "") });
      if (!isWrite) {
        var stale = staleRead(method, payload);
        if (stale) {
          stale.meta = Object.assign({}, isObj(stale.meta) ? stale.meta : {}, { staleIfError: true, staleReason: err && err.message || String(err || "") });
          return stale;
        }
      }
      throw err;
    });
    if (!isWrite) apiInFlight[key] = p.then(function(v){ delete apiInFlight[key]; return v; }, function(e){ delete apiInFlight[key]; throw e; });
    return !isWrite ? apiInFlight[key] : p;
  }

  function withAssetStamp(url) {
    var stamp = encodeURIComponent(PHASE_ASSET_STAMP);
    return url + (url.indexOf("?") >= 0 ? "&" : "?") + "v=" + stamp;
  }
  function bundleFiles(name) {
    var key = text(name).replace(/^bundle:/i, "");
    var manifest = root.APP_CONFIG && root.APP_CONFIG.assetManifest || {};
    var bundles = manifest.bundles || {};
    var b = bundles[key] || bundles["page" + key.charAt(0).toUpperCase() + key.slice(1)] || null;
    return b && Array.isArray(b.files) ? b.files : [];
  }
  function assetUrls(file) {
    file = text(file).trim().replace(/\.html$/i, "");
    var bases = cfg("localAssetBaseCandidates", ["./partials/", "partials/", "../partials/"]);
    if (!Array.isArray(bases)) bases = text(bases).split(",");
    return bases.map(function(base){ base = text(base).trim() || "./partials/"; return base.replace(/\/?$/, "/") + file + ".html"; });
  }
  function fetchFile(file) {
    file = text(file).trim().replace(/\.html$/i, "");
    if (!file) return Promise.reject(bridgeError("asset name required", "ASSET_NAME_REQUIRED"));
    if (cache[file]) return Promise.resolve(cache[file]);
    if (assetInFlight[file]) return assetInFlight[file];
    var urls = assetUrls(file);
    function tryAt(i) {
      if (i >= urls.length) return Promise.reject(bridgeError("ไม่พบ partial: " + file, "ASSET_NOT_FOUND"));
      return fetch(withAssetStamp(urls[i]), { credentials: "same-origin", cache: "no-cache" }).then(function(resp) {
        return resp.ok ? resp.text().then(function(html){ cache[file] = html; return html; }) : tryAt(i + 1);
      }, function(){ return tryAt(i + 1); });
    }
    assetInFlight[file] = tryAt(0).then(function(html){ delete assetInFlight[file]; return html; }, function(err){ delete assetInFlight[file]; throw err; });
    return assetInFlight[file];
  }
  function localInclude(name) {
    name = text(name).trim();
    var files = /^bundle:/i.test(name) ? bundleFiles(name) : [name];
    if (!files.length) return Promise.reject(bridgeError("ไม่พบ bundle/asset: " + name, "ASSET_NOT_FOUND"));
    return Promise.all(files.map(fetchFile)).then(function(parts) {
      return { ok: true, data: { name: name, html: parts.join("\n"), loadedAt: new Date().toISOString(), local: true }, msg: "โหลด partial จาก GitHub Pages สำเร็จ" };
    });
  }
  function apiEnvelope(fn, args) {
    var method = text(fn).trim(), payload = args;
    if (method === "apiRouter" && isObj(args)) { method = text(args.method || args.action || "").trim(); payload = args.payload || args.params || args.data || {}; }
    return { method: method, payload: payload == null ? {} : payload };
  }
  function isSafeLogoUrl(url) { url = normalizeUrl(url); return !url || /^data:image\//i.test(url) || /^https?:\/\//i.test(url); }
  function setLogo(url, source) {
    url = normalizeUrl(url || FALLBACK_LOGO);
    if (!isSafeLogoUrl(url)) url = FALLBACK_LOGO;
    root.APP_CONFIG = root.APP_CONFIG || {}; root.APP_CONFIG.logoUrl = url;
    root.APP_LOGO = root.APP_LOGO || {}; root.APP_LOGO.active = url; root.APP_LOGO.svg = url; root.APP_LOGO.png96 = url; root.APP_LOGO.png192 = url; root.APP_LOGO.png512 = url;
    root.DEFAULT_LOGO = url; root.LOGO_URL = url; root.currentLogoUrl = url; root.__SAFE_LOGO_URL__ = url; root.__APP_PARLIAMENT_LOGO__ = url;
    try {
      var nodes = doc.querySelectorAll('[data-logo="parliament"],#login-logo-img,#side-logo-img,#mobile-topbar-logo,#summary-logo-img,#ps-ai-print-logo,#report-logo-img,.print-logo-img');
      Array.prototype.forEach.call(nodes, function(img){
        if (!img || !img.setAttribute) return;
        img.onerror = function(){ img.onerror = null; img.setAttribute("src", FALLBACK_LOGO); };
        img.style.display = ""; img.style.visibility = "visible"; if (img.classList) img.classList.add("logo-loaded");
        if (img.getAttribute("src") !== url) img.setAttribute("src", url);
        img.dataset.logoSource = source || "github-direct";
      });
    } catch (_) {}
    return true;
  }
  function loadPublicConfig() {
    return Promise.resolve({ ok: true, releaseStamp: PHASE_RELEASE_STAMP, assetStamp: PHASE_ASSET_STAMP, transport: "github-gas-direct", logoUrl: cfg("logoUrl", FALLBACK_LOGO) }).then(function(data){ setLogo(data.logoUrl, "github-direct-config"); return data; });
  }
  function releaseStatus() {
    return { ok: true, expectedStamp: PHASE_RELEASE_STAMP, clientStamp: PHASE_RELEASE_STAMP, configStamp: cfg("releaseStamp", PHASE_RELEASE_STAMP), assetStamp: PHASE_ASSET_STAMP, mismatch: [], warnings: [] };
  }
  function runtimeOwnerStatus() {
    var errors = [];
    try { gasWebAppUrl(); } catch (err) { errors.push(err.code || "GAS_WEB_APP_URL_INVALID"); }
    return { ok: !errors.length, host: text(root.location && root.location.hostname || ""), expectedOwner: "github-pages-gas-direct", actualOwner: "github-pages/github-gas-transport.js::github-pages-gas-direct", transportMode: PHASE_TRANSPORT_MODE, release: releaseStatus(), errors: errors };
  }
  function assertRuntimeOwner(context) {
    var status = runtimeOwnerStatus();
    if (status.ok) return status;
    var err = bridgeError("Runtime/Transport สำหรับ GitHub Pages + GAS Direct ยังไม่พร้อม: กรุณาตั้งค่า GAS Web App URL", "APP_RUNTIME_OWNER_MISMATCH", context || "runtime-owner");
    err.runtimeHealth = status;
    throw err;
  }

  root.AppTransport = root.AppTransport || {};
  root.AppTransport.__owner = "github-pages/github-gas-transport.js::github-pages-gas-direct";
  root.AppTransport.__githubPagesGasDirect = true;
  root.AppTransport.__vercelApiProxyOnly = false;
  root.AppTransport.__gasDirectWhenHostedInGas = false;
  root.AppTransport.__legacyTransportRemoved = false;
  root.AppTransport.__staticGasDirectDisabled = false;
  root.AppTransport.__singleTransportPathPhase2 = true;
  root.AppTransport.__clientReadResponseCacheEnabled = true;
  root.AppTransport.transportMode = PHASE_TRANSPORT_MODE;
  root.AppTransport.bridgeClientState = function(){ return { ready: bridgeReady, loaded: !!bridgeFrame, assumedReady: false, removed: false, mode: PHASE_TRANSPORT_MODE, gasWebAppUrl: normalizeUrl(root.GAS_WEB_APP_URL || cfg("gasWebAppUrl", "") || DEFAULT_GAS_WEB_APP_URL || "") }; };
  root.AppTransport.phase2Status = function(){ return { ok: runtimeOwnerStatus().ok, stamp: PHASE_RELEASE_STAMP, phase: "GitHub Pages + GAS Direct", release: releaseStatus(), transportMode: PHASE_TRANSPORT_MODE, githubPagesGasDirect: true, vercelApiProxyEnabled: false, legacyTransportRemoved: false, gasDirectAvailable: true, clientReadResponseCacheEnabled: true, clientReadCacheEntries: Object.keys(apiReadCache).length, inFlight: Object.keys(apiInFlight).length, assetCacheEntries: Object.keys(cache).length, bridge: root.AppTransport.bridgeClientState(), metrics: Object.assign({}, apiMetrics) }; };
  root.AppTransport.phase1Status = root.AppTransport.phase2Status;
  root.AppTransport.phase0Status = root.AppTransport.phase2Status;
  root.AppTransport.releaseStatus = releaseStatus;
  root.AppTransport.runtimeOwnerStatus = runtimeOwnerStatus;
  root.AppTransport.assertRuntimeOwner = assertRuntimeOwner;
  root.AppTransport.clientCacheStatus = function(){ return { ok: true, owner: "github-pages-gas-direct-cache", readResponseCache: true, cacheEntries: Object.keys(apiReadCache).length, inFlight: Object.keys(apiInFlight).length, cacheEpoch: apiCacheEpoch, metrics: Object.assign({}, apiMetrics) }; };
  root.AppTransport.clearApiCache = function(reason){ invalidateClientApiCache(reason || "manual-clear", "__manual__"); apiMetrics.cacheHits = 0; apiMetrics.cacheWrites = 0; apiMetrics.dedupeHits = 0; apiMetrics.last = []; return true; };
  root.AppTransport.run = function(fn, args, options){
    var req = apiEnvelope(fn, args || {});
    if (/^getDeferredInclude$/i.test(req.method)) {
      var name = req.payload && (req.payload.name || req.payload.partial || req.payload.file) || "";
      return localInclude(name);
    }
    assertRuntimeOwner("api:" + text(req.method || ""));
    return runWithPolicy(req.method, req.payload || {}, options || {});
  };
  root.AppTransport.setGasWebAppUrl = function(url){
    url = normalizeUrl(url || "");
    if (!url) return "";
    root.GAS_WEB_APP_URL = url; root.APP_CONFIG = root.APP_CONFIG || {}; root.APP_CONFIG.gasWebAppUrl = url;
    try { root.localStorage && root.localStorage.setItem("GITHUB_GAS_WEB_APP_URL", url); } catch (_) {}
    bridgeReady = false; bridgeInFlight = null; bridgeFrame && (bridgeFrame.src = bridgeUrl());
    return url;
  };
  root.AppTransport.setLogoUrl = function(url){ return setLogo(url, "manual"); };
  root.AppTransport.ping = function(){ return runBridgeApi("apiGithubBridgePing", { at: new Date().toISOString(), transportMode: PHASE_TRANSPORT_MODE }); };
  root.AppTransport.loadPublicConfig = loadPublicConfig;
  root.AppTransport.invalidateClientApiCache = invalidateClientApiCache;
  root.AppTransport.vercelProxyEnabled = function(){ return false; };
  root.AppTransport.ensureBridgeClient = ensureBridge;
  root.AppTransport.runGasDirectBridge = runBridgeApi;
  root.AppTransport.runJsonpApi = runJsonpApi;
  root.AppTransport.runLoginPost = runLoginPostApi;

  try { setLogo(cfg("logoUrl", FALLBACK_LOGO), "app-config"); } catch (_) {}
  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", function(){ setLogo(cfg("logoUrl", FALLBACK_LOGO), "app-config-dom"); }, { once: true });
  else { setLogo(cfg("logoUrl", FALLBACK_LOGO), "app-config-dom"); }
})(window, document);
