(function(root, doc) {
  "use strict";
  if (!root || !doc) return;

  var FALLBACK_LOGO = "https://upload.wikimedia.org/wikipedia/commons/9/9a/Seal_of_the_Parliament_of_Thailand.svg";
  var RELEASE_STAMP = "commission-v1.2-github-pages-gas-direct-2026-07-14-r114";
  var ASSET_STAMP = "asset-manifest-commission-v1.2-github-pages-gas-direct-2026-07-14-r114";
  var TRANSPORT_MODE = "github-pages-phase-c-inner-source-window-bridge-r114";
  var DEFAULT_GAS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzt3p-NLOg8QpmnB_Bj03Rds6H9SlNevnbcOAqzm1vzuAFXPtXhYVlDUTblCclmjSAm/exec";

  var includeCache = Object.create(null);
  var includeInFlight = Object.create(null);
  var apiInFlight = Object.create(null);
  var readCache = Object.create(null);
  var cacheEpoch = 0;
  var loginPending = Object.create(null);
  var bridgePending = Object.create(null);
  var jsonpPending = Object.create(null);
  var metrics = { calls: 0, cacheHits: 0, cacheWrites: 0, dedupeHits: 0, errors: 0, last: [] };

  var bridgeFrame = null;
  var bridgeClientWindow = null;
  var bridgeClientOrigin = "";
  var bridgeReady = false;
  var bridgeInFlight = null;
  var bridgeReadyTimer = 0;
  var bridgeGeneration = 0;

  function text(value) { return value == null ? "" : String(value); }
  function isObject(value) { return !!value && typeof value === "object" && !Array.isArray(value); }
  function config(name, fallback) {
    var current = root.APP_CONFIG || {};
    return current[name] == null || current[name] === "" ? fallback : current[name];
  }
  function normalizeUrl(value) { return text(value).trim().replace(/\s+/g, ""); }
  function makeError(message, code, method) {
    var error = new Error(message);
    error.code = code || "GITHUB_GAS_BRIDGE_ERROR";
    error.errorCode = error.code;
    error.method = method || "";
    error.transportMode = TRANSPORT_MODE;
    return error;
  }
  function gasWebAppUrl() {
    var value = normalizeUrl(root.GAS_WEB_APP_URL || config("gasWebAppUrl", "") || DEFAULT_GAS_WEB_APP_URL);
    if (!value || value === "PUT_GAS_WEB_APP_URL_HERE") {
      throw makeError("ยังไม่ได้ตั้งค่า GAS Web App URL", "GAS_WEB_APP_URL_REQUIRED");
    }
    if (!/^https:\/\/script\.google\.com\/macros\/s\/.+\/exec$/i.test(value)) {
      throw makeError("GAS Web App URL ไม่ถูกต้อง ต้องลงท้ายด้วย /exec", "GAS_WEB_APP_URL_INVALID");
    }
    return value;
  }
  function withQuery(url, params) {
    var output = new URL(url, root.location && root.location.href || undefined);
    Object.keys(params || {}).forEach(function(key) {
      output.searchParams.set(key, params[key]);
    });
    return output.href;
  }
  function requestId(method) {
    return "gh_" + text(method || "api").replace(/[^A-Za-z0-9_-]/g, "_") + "_" + Date.now() + "_" + Math.random().toString(36).slice(2);
  }
  function isTrustedBridgeReadyEvent(event, data) {
    var origin = text(event && event.origin || "");
    if (origin === "null") {
      return !!(event && event.source) && text(data && data.stamp || "") === RELEASE_STAMP;
    }
    try {
      var host = new URL(origin).hostname.toLowerCase();
      var googleHost = host === "script.google.com" || host === "script.googleusercontent.com" || /\.googleusercontent\.com$/.test(host);
      return googleHost && text(data && data.stamp || "") === RELEASE_STAMP;
    } catch (_) {
      return false;
    }
  }
  function isWriteMethod(method) {
    method = text(method).trim();
    if (!method) return false;
    return /^api(?:[A-Za-z0-9_]*?)(?:Save|Delete|Update|Create|Import|Extract|Upload|Issue|Process|Cleanup|Generate|Send|Patch|Approve|Reject|Submit|Queue|Migrate|Revoke|Refresh|Start)(?:[A-Z_]|$)/.test(method);
  }
  function isReadMethod(method) {
    method = text(method).trim();
    return !!method && /^api[A-Za-z0-9_]+$/.test(method) && !/^api(Login|Logout)$/i.test(method) && !isWriteMethod(method);
  }
  function isPublicJsonpMethod(method) {
    return /^(apiGetRouteContract|apiGetPhase0ContractGate|apiGetPhase1Contract|apiGetPhase2Contract)$/i.test(text(method).trim());
  }
  function isAuthOrBootstrapMethod(method) {
    return /^(apiLogin|apiLogout|apiSessionResume|apiSessionCheck|apiVerifySession|apiBootstrap|apiIssueActionToken|apiGetRouteContract|apiGetPhase0ContractGate|apiGetPhase1Contract|apiGetPhase2Contract|apiGetClientDataContract)$/i.test(text(method).trim());
  }
  function stableClone(value) {
    if (Array.isArray(value)) return value.map(stableClone);
    if (!isObject(value)) return value;
    var output = {};
    Object.keys(value).sort().forEach(function(key) {
      if (/^(token|_token|authToken|csrf|csrfToken|_csrf|_csrfToken|actionToken|csrfActionToken|_actionToken|password|pass|pwd)$/i.test(key)) return;
      if (/^(_|nonce|at|source|clientContext)$/i.test(key)) return;
      output[key] = stableClone(value[key]);
    });
    return output;
  }
  function stableKey(method, payload) {
    try { return method + "|" + JSON.stringify(stableClone(payload || {})); }
    catch (_) { return method + "|" + Date.now(); }
  }
  function cloneJson(value) {
    try { return value == null ? value : JSON.parse(JSON.stringify(value)); }
    catch (_) { return value; }
  }
  function recordMetric(item) {
    try {
      item = item || {};
      item.at = item.at || new Date().toISOString();
      if (item.kind === "call") metrics.calls += 1;
      if (item.cacheHit) metrics.cacheHits += 1;
      if (item.cacheWrite) metrics.cacheWrites += 1;
      if (item.dedupeHit) metrics.dedupeHits += 1;
      if (item.error) metrics.errors += 1;
      metrics.last.push(item);
      if (metrics.last.length > 40) metrics.last.shift();
    } catch (_) {}
  }
  function wantsFresh(payload) {
    payload = isObject(payload) ? payload : {};
    return payload.forceFresh === true || payload.noCache === true || payload.bypassCache === true || Number(payload.cacheTtlSeconds) === 0;
  }
  function cacheSafe(method) { return isReadMethod(method) && !isAuthOrBootstrapMethod(method); }
  function cacheTtl(payload) {
    var seconds = Number(payload && payload.cacheTtlSeconds);
    if (isFinite(seconds) && seconds > 0) return Math.max(5000, Math.min(seconds * 1000, Number(config("clientReadCacheMaxTtlMs", 120000)) || 120000));
    return Number(config("clientReadCacheTtlMs", 60000)) || 60000;
  }
  function getCached(method, payload) {
    if (!config("clientReadResponseCacheEnabled", true) || wantsFresh(payload) || !cacheSafe(method)) return null;
    var hit = readCache[stableKey(method, payload)];
    if (hit && hit.expiresAt > Date.now()) {
      recordMetric({ kind: "cache", method: method, cacheHit: true, transport: TRANSPORT_MODE });
      return cloneJson(hit.value);
    }
    return null;
  }
  function putCached(method, payload, value) {
    if (!config("clientReadResponseCacheEnabled", true) || wantsFresh(payload) || !cacheSafe(method) || !isObject(value) || value.ok === false) return;
    var ttl = cacheTtl(payload);
    readCache[stableKey(method, payload)] = {
      value: cloneJson(value),
      expiresAt: Date.now() + ttl,
      staleUntil: Date.now() + (Number(config("clientReadStaleIfErrorMs", 600000)) || 600000)
    };
    recordMetric({ kind: "cache", method: method, cacheWrite: true, ttlMs: ttl, transport: TRANSPORT_MODE });
  }
  function staleCached(method, payload) {
    var hit = readCache[stableKey(method, payload)];
    return hit && hit.staleUntil > Date.now() ? cloneJson(hit.value) : null;
  }
  function invalidateCache(reason, method) {
    apiInFlight = Object.create(null);
    readCache = Object.create(null);
    cacheEpoch += 1;
    root.__APP_CLIENT_API_CACHE_EPOCH__ = cacheEpoch;
    recordMetric({ kind: "cache-invalidate", reason: reason || "write", method: method || "", cacheEpoch: cacheEpoch });
    return true;
  }

  function bridgeUrl() {
    return withQuery(gasWebAppUrl(), {
      __githubBridgeClient: "1",
      parentOrigin: root.location && root.location.origin || "",
      r: RELEASE_STAMP
    });
  }
  function clearBridgeReadyState(removeFrame) {
    bridgeReady = false;
    bridgeClientWindow = null;
    bridgeClientOrigin = "";
    if (bridgeReadyTimer) {
      root.clearTimeout(bridgeReadyTimer);
      bridgeReadyTimer = 0;
    }
    bridgeInFlight = null;
    if (removeFrame && bridgeFrame) {
      try { bridgeFrame.parentNode && bridgeFrame.parentNode.removeChild(bridgeFrame); } catch (_) {}
      bridgeFrame = null;
    }
  }
  function ensureBridge() {
    if (bridgeReady && bridgeClientWindow && bridgeClientOrigin) {
      return Promise.resolve({ frame: bridgeFrame, sourceWindow: bridgeClientWindow, sourceOrigin: bridgeClientOrigin, generation: bridgeGeneration });
    }
    if (bridgeInFlight) return bridgeInFlight;

    bridgeInFlight = new Promise(function(resolve, reject) {
      var readyTimeoutMs = Math.max(8000, Math.min(Number(config("bridgeReadyTimeoutMs", 30000)) || 30000, 45000));
      function failReady() {
        bridgeReadyTimer = 0;
        bridgeInFlight = null;
        reject(makeError("GAS bridge ไม่ส่ง READY จาก iframe ชั้นที่มี google.script.run", "GAS_BRIDGE_INNER_READY_TIMEOUT"));
      }
      root.__APP_R114_BRIDGE_READY_RESOLVE__ = function() {
        if (!bridgeReady || !bridgeClientWindow || !bridgeClientOrigin) return;
        if (bridgeReadyTimer) root.clearTimeout(bridgeReadyTimer);
        bridgeReadyTimer = 0;
        bridgeInFlight = null;
        resolve({ frame: bridgeFrame, sourceWindow: bridgeClientWindow, sourceOrigin: bridgeClientOrigin, generation: bridgeGeneration });
      };
      bridgeReadyTimer = root.setTimeout(failReady, readyTimeoutMs);
      try {
        bridgeFrame = doc.getElementById("app-gas-direct-bridge");
        if (!bridgeFrame) {
          bridgeFrame = doc.createElement("iframe");
          bridgeFrame.id = "app-gas-direct-bridge";
          bridgeFrame.name = "app-gas-direct-bridge";
          bridgeFrame.title = "GAS Authenticated API Bridge";
          bridgeFrame.setAttribute("aria-hidden", "true");
          bridgeFrame.style.cssText = "position:absolute;width:1px;height:1px;left:-9999px;top:-9999px;border:0;opacity:0;pointer-events:none;";
          (doc.body || doc.documentElement).appendChild(bridgeFrame);
        }
        var expected = bridgeUrl();
        if (bridgeFrame.src !== expected) {
          bridgeGeneration += 1;
          bridgeFrame.src = expected;
        }
      } catch (error) {
        if (bridgeReadyTimer) root.clearTimeout(bridgeReadyTimer);
        bridgeReadyTimer = 0;
        bridgeInFlight = null;
        reject(error);
      }
    });
    return bridgeInFlight;
  }
  function sendToInnerBridge(message) {
    if (!bridgeReady || !bridgeClientWindow || !bridgeClientOrigin) return false;
    try {
      bridgeClientWindow.postMessage(message, bridgeClientOrigin === "null" ? "*" : bridgeClientOrigin);
      return true;
    } catch (_) {
      return false;
    }
  }

  root.addEventListener("message", function(event) {
    var data = event && event.data;
    if (typeof data === "string") {
      try { data = JSON.parse(data); } catch (_) { return; }
    }
    if (!isObject(data) || data.__gasIframeTransport !== true && data.__gasIframeTransport !== "true") return;

    if (data.type === "GAS_LOGIN_POST_RESPONSE") {
      var loginId = text(data.requestId || data.id || "");
      var loginRequest = loginId && loginPending[loginId];
      if (!loginRequest) return;
      delete loginPending[loginId];
      root.clearTimeout(loginRequest.timer);
      try { loginRequest.cleanup(); } catch (_) {}
      var loginResult = data.result || { ok: false, error: "empty login response", errorCode: "GITHUB_LOGIN_POST_EMPTY_RESPONSE" };
      if (isObject(loginResult)) {
        loginResult.method = loginResult.method || "apiLogin";
        loginResult.transport = loginResult.transport || "github-login-post";
        loginResult.releaseStamp = loginResult.releaseStamp || RELEASE_STAMP;
      }
      loginRequest.resolve(loginResult);
      return;
    }

    if (data.type === "GAS_IFRAME_TRANSPORT_READY") {
      if (!event.source || !isTrustedBridgeReadyEvent(event, data)) return;
      bridgeClientWindow = event.source;
      bridgeClientOrigin = event.origin;
      bridgeReady = true;
      root.__APP_GAS_INNER_BRIDGE_ORIGIN__ = bridgeClientOrigin;
      root.__APP_GAS_INNER_BRIDGE_READY_AT__ = new Date().toISOString();
      if (typeof root.__APP_R114_BRIDGE_READY_RESOLVE__ === "function") {
        var readyResolver = root.__APP_R114_BRIDGE_READY_RESOLVE__;
        root.__APP_R114_BRIDGE_READY_RESOLVE__ = null;
        readyResolver();
      }
      return;
    }

    if (data.type === "GAS_IFRAME_TRANSPORT_RESPONSE") {
      if (!bridgeClientWindow || event.source !== bridgeClientWindow || event.origin !== bridgeClientOrigin) return;
      var responseId = text(data.requestId || data.id || "");
      var pending = responseId && bridgePending[responseId];
      if (!pending) return;
      delete bridgePending[responseId];
      root.clearTimeout(pending.timer);
      var result = data.result || { ok: false, error: "empty GAS bridge response", errorCode: "GAS_BRIDGE_EMPTY_RESPONSE" };
      if (isObject(result)) {
        result.method = result.method || data.method || pending.method;
        result.transport = result.transport || TRANSPORT_MODE;
        result.releaseStamp = result.releaseStamp || RELEASE_STAMP;
        result.meta = Object.assign({}, isObject(result.meta) ? result.meta : {}, {
          githubGasDirect: true,
          phaseCAuthenticatedBridge: true,
          innerSourceWindowCaptured: true,
          bridgeOrigin: bridgeClientOrigin,
          releaseStamp: RELEASE_STAMP
        });
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
  }
  function runLoginPost(method, payload, options) {
    method = text(method).trim();
    if (!/^apiLogin$/i.test(method)) return runBridge(method, payload, options);
    payload = isObject(payload) ? Object.assign({}, payload) : {};
    return new Promise(function(resolve, reject) {
      var id = requestId("apiLoginPost");
      var timeoutMs = Math.max(12000, Math.min(Number(options && (options.loginTimeoutMs || options.timeoutMs || options.clientTimeoutMs) || config("loginPostTimeoutMs", 45000)) || 45000, 65000));
      var iframe = null;
      var form = null;
      function cleanup() {
        try { form && form.parentNode && form.parentNode.removeChild(form); } catch (_) {}
        try { iframe && iframe.parentNode && iframe.parentNode.removeChild(iframe); } catch (_) {}
      }
      var timer = root.setTimeout(function() {
        delete loginPending[id];
        cleanup();
        reject(makeError("GAS Login POST timeout", "GITHUB_LOGIN_POST_TIMEOUT", "apiLogin"));
      }, timeoutMs);
      loginPending[id] = { resolve: resolve, reject: reject, timer: timer, cleanup: cleanup };
      try {
        payload.__loginPostRequestId = id;
        payload.__loginPostParentOrigin = root.location && root.location.origin || "";
        iframe = doc.createElement("iframe");
        iframe.name = "app-gas-login-post-" + id.replace(/[^A-Za-z0-9_-]/g, "_");
        iframe.id = iframe.name;
        iframe.title = "GAS Login POST";
        iframe.setAttribute("aria-hidden", "true");
        iframe.style.cssText = "position:absolute;width:1px;height:1px;left:-9999px;top:-9999px;border:0;opacity:0;pointer-events:none;";
        form = doc.createElement("form");
        form.method = "POST";
        form.target = iframe.name;
        form.action = withQuery(gasWebAppUrl(), {
          __githubLoginPost: "1",
          requestId: id,
          parentOrigin: root.location && root.location.origin || "",
          r: RELEASE_STAMP
        });
        form.style.cssText = "display:none;position:absolute;left:-9999px;top:-9999px;";
        hiddenField(form, "payload", JSON.stringify(payload));
        if (payload.username != null) hiddenField(form, "username", payload.username);
        if (payload.email != null) hiddenField(form, "email", payload.email);
        if (payload.password != null) hiddenField(form, "password", payload.password);
        (doc.body || doc.documentElement).appendChild(iframe);
        (doc.body || doc.documentElement).appendChild(form);
        form.submit();
      } catch (error) {
        delete loginPending[id];
        root.clearTimeout(timer);
        cleanup();
        reject(error);
      }
    });
  }

  function runBridge(method, payload, options) {
    method = text(method).trim();
    if (!method) return Promise.reject(makeError("method required", "METHOD_REQUIRED"));
    payload = isObject(payload) ? Object.assign({}, payload) : (payload == null ? {} : { value: payload });
    payload.__authTransportOwner = payload.__authTransportOwner || "AppApiMiddlewarePipeline";
    payload.__bridgeTransport = TRANSPORT_MODE;
    payload.clientContext = isObject(payload.clientContext) ? Object.assign({}, payload.clientContext) : {};
    payload.clientContext.transport = TRANSPORT_MODE;
    payload.clientContext.bridgeOnly = true;
    payload.clientContext.releaseStamp = RELEASE_STAMP;

    return ensureBridge().then(function() {
      return new Promise(function(resolve, reject) {
        var id = requestId(method);
        var timeoutMs = Math.max(10000, Math.min(Number(options && (options.timeoutMs || options.clientTimeoutMs) || config("apiTimeoutMs", 110000)) || 110000, 120000));
        var timer = root.setTimeout(function() {
          delete bridgePending[id];
          reject(makeError("GAS inner bridge timeout: " + method, "GAS_INNER_BRIDGE_TIMEOUT", method));
        }, timeoutMs);
        bridgePending[id] = { resolve: resolve, reject: reject, timer: timer, method: method };
        var sent = sendToInnerBridge({
          __gasIframeTransport: true,
          type: "GAS_IFRAME_TRANSPORT_REQUEST",
          requestId: id,
          method: method,
          payload: payload,
          bridge: TRANSPORT_MODE,
          releaseStamp: RELEASE_STAMP
        });
        if (!sent) {
          delete bridgePending[id];
          root.clearTimeout(timer);
          clearBridgeReadyState(true);
          reject(makeError("ไม่สามารถส่งคำขอไปยัง iframe ชั้นที่มี google.script.run", "GAS_INNER_BRIDGE_SEND_FAILED", method));
        }
      });
    });
  }

  function stripSensitiveJsonpFields(payload) {
    payload = isObject(payload) ? Object.assign({}, payload) : {};
    ["token", "_token", "authToken", "nextToken", "csrfToken", "csrf", "_csrf", "_csrfToken", "actionToken", "csrfActionToken", "_actionToken", "password", "pass", "pwd"].forEach(function(key) {
      delete payload[key];
    });
    if (isObject(payload.clientContext)) {
      payload.clientContext = Object.assign({}, payload.clientContext);
      ["token", "authToken", "csrf", "csrfToken"].forEach(function(key) { delete payload.clientContext[key]; });
    }
    return payload;
  }
  function runJsonp(method, payload, options) {
    method = text(method).trim();
    if (!isPublicJsonpMethod(method)) {
      return Promise.reject(makeError("Phase C ไม่อนุญาต authenticated JSONP: " + method, "AUTHENTICATED_JSONP_FORBIDDEN", method));
    }
    payload = stripSensitiveJsonpFields(payload);
    return new Promise(function(resolve, reject) {
      var id = requestId(method + "Jsonp");
      var callbackName = "__APP_GITHUB_JSONP_CB_" + id.replace(/[^A-Za-z0-9_$]/g, "_");
      var callbackExpression = "window." + callbackName;
      var timeoutMs = Math.max(5000, Math.min(Number(options && (options.timeoutMs || options.clientTimeoutMs) || config("jsonpReadTimeoutMs", 15000)) || 15000, 30000));
      var script = null;
      function cleanup() {
        try { script && script.parentNode && script.parentNode.removeChild(script); } catch (_) {}
        try { delete root[callbackName]; } catch (_) { root[callbackName] = undefined; }
        delete jsonpPending[id];
      }
      var timer = root.setTimeout(function() {
        cleanup();
        reject(makeError("GAS public JSONP timeout: " + method, "GITHUB_JSONP_READ_TIMEOUT", method));
      }, timeoutMs);
      jsonpPending[id] = { method: method, timer: timer };
      root[callbackName] = function(result) {
        root.clearTimeout(timer);
        cleanup();
        resolve(result || { ok: false, error: "empty JSONP response", errorCode: "GITHUB_JSONP_EMPTY_RESPONSE" });
      };
      try {
        var url = new URL(gasWebAppUrl());
        url.searchParams.set("__githubJsonpApi", "1");
        url.searchParams.set("method", method);
        url.searchParams.set("requestId", id);
        url.searchParams.set("callback", callbackExpression);
        url.searchParams.set("cb", callbackExpression);
        url.searchParams.set("parentOrigin", root.location && root.location.origin || "");
        url.searchParams.set("r", RELEASE_STAMP);
        url.searchParams.set("payload", encodeURIComponent(JSON.stringify(payload)));
        url.searchParams.set("githubPublicJsonpRead", "1");
        script = doc.createElement("script");
        script.async = true;
        script.defer = true;
        script.charset = "utf-8";
        script.src = url.href;
        script.onerror = function() {
          root.clearTimeout(timer);
          cleanup();
          reject(makeError("GAS public JSONP failed: " + method, "GITHUB_JSONP_READ_FAILED", method));
        };
        (doc.head || doc.documentElement).appendChild(script);
      } catch (error) {
        root.clearTimeout(timer);
        cleanup();
        reject(error);
      }
    });
  }

  function runWithPolicy(method, payload, options) {
    var cached = getCached(method, payload);
    if (cached) return Promise.resolve(cached);
    var key = stableKey(method, payload);
    var isWrite = isWriteMethod(method);
    var isLogin = /^apiLogin$/i.test(method);
    if (!isWrite && apiInFlight[key]) {
      recordMetric({ kind: "call", method: method, dedupeHit: true, transport: TRANSPORT_MODE });
      return apiInFlight[key];
    }

    var invoker = isLogin ? runLoginPost : (isPublicJsonpMethod(method) ? runJsonp : runBridge);
    var promise = invoker(method, payload, options).then(function(result) {
      recordMetric({ kind: "call", method: method, transport: isLogin ? "github-login-post" : (isPublicJsonpMethod(method) ? "github-public-jsonp" : TRANSPORT_MODE), error: isObject(result) && result.ok === false });
      if (isWrite && isObject(result) && result.ok !== false) invalidateCache("write-success", method);
      else putCached(method, payload, result);
      return result;
    }, function(error) {
      recordMetric({ kind: "call", method: method, transport: TRANSPORT_MODE, error: true, message: error && error.message || String(error || "") });
      if (!isWrite) {
        var stale = staleCached(method, payload);
        if (stale) {
          stale.meta = Object.assign({}, isObject(stale.meta) ? stale.meta : {}, { staleIfError: true, staleReason: error && error.message || String(error || "") });
          return stale;
        }
      }
      throw error;
    });
    if (!isWrite) {
      apiInFlight[key] = promise.then(function(value) { delete apiInFlight[key]; return value; }, function(error) { delete apiInFlight[key]; throw error; });
      return apiInFlight[key];
    }
    return promise;
  }

  function withAssetStamp(url) {
    return url + (url.indexOf("?") >= 0 ? "&" : "?") + "v=" + encodeURIComponent(ASSET_STAMP);
  }
  function bundleFiles(name) {
    var key = text(name).replace(/^bundle:/i, "");
    var manifest = root.APP_CONFIG && root.APP_CONFIG.assetManifest || {};
    var bundles = manifest.bundles || {};
    var bundle = bundles[key] || bundles["page" + key.charAt(0).toUpperCase() + key.slice(1)] || null;
    return bundle && Array.isArray(bundle.files) ? bundle.files : [];
  }
  function assetUrls(file) {
    file = text(file).trim().replace(/\.html$/i, "");
    var bases = config("localAssetBaseCandidates", ["./partials/", "partials/", "../partials/"]);
    if (!Array.isArray(bases)) bases = text(bases).split(",");
    return bases.map(function(base) {
      base = text(base).trim() || "./partials/";
      return base.replace(/\/?$/, "/") + file + ".html";
    });
  }
  function fetchFile(file) {
    file = text(file).trim().replace(/\.html$/i, "");
    if (includeCache[file]) return Promise.resolve(includeCache[file]);
    if (includeInFlight[file]) return includeInFlight[file];
    var urls = assetUrls(file);
    function attempt(index) {
      if (index >= urls.length) throw makeError("ไม่พบ partial: " + file, "PARTIAL_NOT_FOUND", file);
      return fetch(withAssetStamp(urls[index]), { credentials: "same-origin", cache: "no-cache" }).then(function(response) {
        if (!response.ok) throw new Error("HTTP " + response.status);
        return response.text();
      }).catch(function() { return attempt(index + 1); });
    }
    includeInFlight[file] = attempt(0).then(function(html) {
      includeCache[file] = html;
      delete includeInFlight[file];
      return html;
    }, function(error) {
      delete includeInFlight[file];
      throw error;
    });
    return includeInFlight[file];
  }
  function localInclude(name) {
    name = text(name).trim();
    var files = /^bundle:/i.test(name) ? bundleFiles(name) : [name];
    if (!files.length) return Promise.reject(makeError("ไม่พบ bundle/asset: " + name, "ASSET_NOT_FOUND", name));
    return Promise.all(files.map(fetchFile)).then(function(parts) {
      return { ok: true, data: { name: name, html: parts.join("\n"), loadedAt: new Date().toISOString(), local: true }, msg: "โหลด partial จาก GitHub Pages สำเร็จ" };
    });
  }
  function apiEnvelope(fn, args) {
    var method = text(fn).trim();
    var payload = args;
    if (method === "apiRouter" && isObject(args)) {
      method = text(args.method || args.action || "").trim();
      payload = args.payload || args.params || args.data || {};
    }
    return { method: method, payload: payload == null ? {} : payload };
  }
  function safeLogoUrl(value) {
    value = normalizeUrl(value);
    return !value || /^data:image\//i.test(value) || /^https?:\/\//i.test(value);
  }
  function setLogo(value, source) {
    value = normalizeUrl(value || FALLBACK_LOGO);
    if (!safeLogoUrl(value)) value = FALLBACK_LOGO;
    root.APP_CONFIG = root.APP_CONFIG || {};
    root.APP_CONFIG.logoUrl = value;
    root.APP_LOGO = root.APP_LOGO || {};
    root.APP_LOGO.active = value;
    root.APP_LOGO.svg = value;
    root.APP_LOGO.png96 = value;
    root.APP_LOGO.png192 = value;
    root.APP_LOGO.png512 = value;
    root.DEFAULT_LOGO = value;
    root.LOGO_URL = value;
    root.currentLogoUrl = value;
    try {
      var nodes = doc.querySelectorAll('[data-logo="parliament"],#login-logo-img,#side-logo-img,#mobile-topbar-logo,#summary-logo-img,#ps-ai-print-logo,#report-logo-img,.print-logo-img');
      Array.prototype.forEach.call(nodes, function(image) {
        if (!image || !image.setAttribute) return;
        image.onerror = function() { image.onerror = null; image.setAttribute("src", FALLBACK_LOGO); };
        image.style.display = "";
        image.style.visibility = "visible";
        if (image.getAttribute("src") !== value) image.setAttribute("src", value);
        image.dataset.logoSource = source || "github-direct";
      });
    } catch (_) {}
    return true;
  }
  function loadPublicConfig() {
    return Promise.resolve({ ok: true, releaseStamp: RELEASE_STAMP, assetStamp: ASSET_STAMP, transport: TRANSPORT_MODE, logoUrl: config("logoUrl", FALLBACK_LOGO) }).then(function(result) {
      setLogo(result.logoUrl, "app-config");
      return result;
    });
  }
  function runtimeOwnerStatus() {
    var errors = [];
    try { gasWebAppUrl(); } catch (error) { errors.push(error.code || "GAS_WEB_APP_URL_INVALID"); }
    return {
      ok: !errors.length,
      host: text(root.location && root.location.hostname || ""),
      expectedOwner: "github-pages-gas-direct",
      actualOwner: "github-pages/github-gas-transport.js::phase-c-inner-source-window",
      transportMode: TRANSPORT_MODE,
      releaseStamp: RELEASE_STAMP,
      errors: errors
    };
  }
  function assertRuntimeOwner(context) {
    var status = runtimeOwnerStatus();
    if (status.ok) return status;
    var error = makeError("Runtime/Transport สำหรับ GitHub Pages + GAS Direct ยังไม่พร้อม", "APP_RUNTIME_OWNER_MISMATCH", context || "runtime-owner");
    error.runtimeHealth = status;
    throw error;
  }

  root.AppTransport = root.AppTransport || {};
  root.AppTransport.__owner = "github-pages/github-gas-transport.js::phase-c-inner-source-window-r114";
  root.AppTransport.__githubPagesGasDirect = true;
  root.AppTransport.__authenticatedReadBridgeOnly = true;
  root.AppTransport.__authenticatedJsonpDisabled = true;
  root.AppTransport.__innerBridgeSourceCaptured = true;
  root.AppTransport.__perRequestApiPostDisabled = true;
  root.AppTransport.transportMode = TRANSPORT_MODE;
  root.AppTransport.run = function(fn, args, options) {
    var request = apiEnvelope(fn, args || {});
    if (/^getDeferredInclude$/i.test(request.method)) {
      var name = request.payload && (request.payload.name || request.payload.partial || request.payload.file) || "";
      return localInclude(name);
    }
    assertRuntimeOwner("api:" + request.method);
    return runWithPolicy(request.method, request.payload || {}, options || {});
  };
  root.AppTransport.phase2Status = function() {
    return {
      ok: runtimeOwnerStatus().ok,
      stamp: RELEASE_STAMP,
      phase: "GitHub Pages + GAS Direct Phase C",
      transportMode: TRANSPORT_MODE,
      authenticatedReadBridgeOnly: true,
      authenticatedJsonpDisabled: true,
      innerBridgeSourceCaptured: !!bridgeClientWindow,
      bridgeReady: bridgeReady,
      bridgeOrigin: bridgeClientOrigin,
      bridgeGeneration: bridgeGeneration,
      perRequestApiPostDisabled: true,
      clientReadCacheEntries: Object.keys(readCache).length,
      inFlight: Object.keys(apiInFlight).length,
      metrics: Object.assign({}, metrics)
    };
  };
  root.AppTransport.phase1Status = root.AppTransport.phase2Status;
  root.AppTransport.phase0Status = root.AppTransport.phase2Status;
  root.AppTransport.runtimeOwnerStatus = runtimeOwnerStatus;
  root.AppTransport.assertRuntimeOwner = assertRuntimeOwner;
  root.AppTransport.bridgeClientState = function() {
    return {
      ready: bridgeReady,
      innerSourceWindowCaptured: !!bridgeClientWindow,
      sourceOrigin: bridgeClientOrigin,
      generation: bridgeGeneration,
      mode: TRANSPORT_MODE,
      gasWebAppUrl: normalizeUrl(root.GAS_WEB_APP_URL || config("gasWebAppUrl", "") || DEFAULT_GAS_WEB_APP_URL)
    };
  };
  root.AppTransport.clientCacheStatus = function() {
    return { ok: true, cacheEntries: Object.keys(readCache).length, inFlight: Object.keys(apiInFlight).length, cacheEpoch: cacheEpoch, metrics: Object.assign({}, metrics) };
  };
  root.AppTransport.clearApiCache = function(reason) {
    invalidateCache(reason || "manual-clear", "__manual__");
    return true;
  };
  root.AppTransport.setGasWebAppUrl = function(value) {
    value = normalizeUrl(value || "");
    if (!value) return "";
    root.GAS_WEB_APP_URL = value;
    root.APP_CONFIG = root.APP_CONFIG || {};
    root.APP_CONFIG.gasWebAppUrl = value;
    try { root.localStorage && root.localStorage.setItem("GITHUB_GAS_WEB_APP_URL", value); } catch (_) {}
    clearBridgeReadyState(true);
    return value;
  };
  root.AppTransport.setLogoUrl = function(value) { return setLogo(value, "manual"); };
  root.AppTransport.ping = function() { return runBridge("apiGithubBridgePing", { at: new Date().toISOString(), transportMode: TRANSPORT_MODE }, { timeoutMs: 30000 }); };
  root.AppTransport.loadPublicConfig = loadPublicConfig;
  root.AppTransport.invalidateClientApiCache = invalidateCache;
  root.AppTransport.vercelProxyEnabled = function() { return false; };
  root.AppTransport.ensureBridgeClient = ensureBridge;
  root.AppTransport.runGasDirectBridge = runBridge;
  root.AppTransport.runAuthenticatedBridge = runBridge;
  root.AppTransport.runAuthenticatedPostMessageBridge = runBridge;
  root.AppTransport.runApiPost = runBridge;
  root.AppTransport.runJsonpApi = runJsonp;
  root.AppTransport.runLoginPost = runLoginPost;

  try { setLogo(config("logoUrl", FALLBACK_LOGO), "app-config"); } catch (_) {}
  if (doc.readyState === "loading") {
    doc.addEventListener("DOMContentLoaded", function() { setLogo(config("logoUrl", FALLBACK_LOGO), "app-config-dom"); }, { once: true });
  } else {
    setLogo(config("logoUrl", FALLBACK_LOGO), "app-config-dom");
  }
})(window, document);
