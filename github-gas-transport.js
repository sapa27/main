(function(root, doc) {
  "use strict";
  if (!root || !doc) return;

  var FALLBACK_LOGO = "https://upload.wikimedia.org/wikipedia/commons/9/9a/Seal_of_the_Parliament_of_Thailand.svg";
  var RELEASE_STAMP = "commission-v1.2-github-pages-gas-direct-2026-07-16-r130";
  var ASSET_STAMP = "asset-manifest-commission-v1.2-github-pages-gas-direct-2026-07-16-r130";
  var TRANSPORT_MODE = "github-pages-phase-c-authenticated-post-fallback-r130";
  var DEFAULT_GAS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyQZcetvUPxA8OI_vWGiBV2fRT3G3Gkqpho443kX79GQMFJ3eSbL2RDSYYg7S10J4c/exec";

  var includeCache = Object.create(null);
  var includeInFlight = Object.create(null);
  var apiInFlight = Object.create(null);
  var readCache = Object.create(null);
  var cacheEpoch = 0;
  var loginPending = Object.create(null);
  var apiPostPending = Object.create(null);
  var bridgePending = Object.create(null);
  var jsonpPending = Object.create(null);
  var metrics = { calls: 0, cacheHits: 0, cacheWrites: 0, dedupeHits: 0, errors: 0, last: [] };

  var bridgeFrame = null;
  var bridgeClientWindow = null;
  var bridgeClientOrigin = "";
  var bridgeServerStamp = "";
  var bridgeNonce = "";
  var bridgeReady = false;
  var bridgeVerified = false;
  var bridgeInFlight = null;
  var bridgeReadyResolve = null;
  var bridgeReadyReject = null;
  var bridgeReadyTimer = 0;
  var bridgeGeneration = 0;
  var bridgeLastVerifiedAt = 0;
  var bridgeVerifyRequestId = "";
  var lastAuthScope = "anonymous";
  var transportCallSequence = 0;
  var lastTransportSuccessSequence = 0;
  var lastTransportErrorSequence = 0;
  var lastTransportSuccessAt = 0;
  var lastTransportErrorAt = 0;
  var AUTH_TRANSPORT_STORAGE_KEY = "APP_GAS_AUTH_TRANSPORT_R130";
  var preferredAuthenticatedTransport = "";
  var preferredAuthenticatedTransportUntil = 0;

  function safeSessionGet(key) {
    try { return root.sessionStorage ? text(root.sessionStorage.getItem(key) || "") : ""; } catch (_) { return ""; }
  }
  function safeSessionSet(key, value) {
    try { if (root.sessionStorage) root.sessionStorage.setItem(key, text(value || "")); } catch (_) {}
  }
  function loadAuthenticatedTransportPreference() {
    var raw = safeSessionGet(AUTH_TRANSPORT_STORAGE_KEY);
    if (!raw) return;
    try {
      var parsed = JSON.parse(raw);
      var mode = text(parsed && parsed.mode || "");
      var until = Number(parsed && parsed.until || 0) || 0;
      if ((mode === "post" || mode === "bridge") && until > Date.now()) {
        preferredAuthenticatedTransport = mode;
        preferredAuthenticatedTransportUntil = until;
      }
    } catch (_) {}
  }
  function setAuthenticatedTransportPreference(mode, reason, ttlMs) {
    mode = mode === "bridge" ? "bridge" : "post";
    var ttl = Math.max(60000, Math.min(Number(ttlMs || config("authenticatedTransportPreferenceTtlMs", 900000)) || 900000, 3600000));
    preferredAuthenticatedTransport = mode;
    preferredAuthenticatedTransportUntil = Date.now() + ttl;
    safeSessionSet(AUTH_TRANSPORT_STORAGE_KEY, JSON.stringify({ mode: mode, until: preferredAuthenticatedTransportUntil, reason: text(reason || ""), releaseStamp: RELEASE_STAMP }));
    recordMetric({ kind: "auth-transport-preference", mode: mode, reason: reason || "", until: new Date(preferredAuthenticatedTransportUntil).toISOString() });
    return mode;
  }
  function currentAuthenticatedTransportPreference() {
    if (!preferredAuthenticatedTransport || preferredAuthenticatedTransportUntil <= Date.now()) {
      preferredAuthenticatedTransport = "";
      preferredAuthenticatedTransportUntil = 0;
      return "";
    }
    return preferredAuthenticatedTransport;
  }
  function isBridgeTransportFailure(error) {
    var value = text(error && (error.code || error.errorCode || error.message) || error || "");
    return /GAS_(?:BRIDGE|VERIFIED)|READY|PING|FRAME_LOAD|postMessage|timeout/i.test(value);
  }

  loadAuthenticatedTransportPreference();

  function dispatchTransportStatus(type, detail) {
    try {
      doc.dispatchEvent(new CustomEvent(type, { detail: Object.assign({
        transport: TRANSPORT_MODE,
        releaseStamp: RELEASE_STAMP,
        at: new Date().toISOString()
      }, detail || {}) }));
    } catch (_) {}
  }

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
    var trusted = normalizeUrl(config("trustedGasWebAppUrl", DEFAULT_GAS_WEB_APP_URL) || DEFAULT_GAS_WEB_APP_URL);
    if (!value || value === "PUT_GAS_WEB_APP_URL_HERE") {
      throw makeError("ยังไม่ได้ตั้งค่า GAS Web App URL", "GAS_WEB_APP_URL_REQUIRED");
    }
    if (!/^https:\/\/script\.google\.com\/macros\/s\/.+\/exec$/i.test(value)) {
      throw makeError("GAS Web App URL ไม่ถูกต้อง ต้องลงท้ายด้วย /exec", "GAS_WEB_APP_URL_INVALID");
    }
    if (config("allowRuntimeGasUrlOverride", false) !== true && trusted && value !== trusted) {
      throw makeError("GAS Web App URL ไม่ตรงกับ deployment ที่กำหนดใน app-config.js", "GAS_WEB_APP_URL_UNTRUSTED");
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
  function isTrustedGoogleMessageOrigin(origin) {
    origin = text(origin || "");
    if (origin === "null") return true;
    try {
      var host = new URL(origin).hostname.toLowerCase();
      return host === "script.google.com" || host === "script.googleusercontent.com" || /\.googleusercontent\.com$/.test(host);
    } catch (_) {
      return false;
    }
  }
  function isTrustedBridgeEvent(event, data) {
    if (!event || !event.source || !isObject(data)) return false;
    if (!isTrustedGoogleMessageOrigin(event.origin)) return false;
    if (!bridgeNonce || text(data.nonce || "") !== bridgeNonce) return false;
    return true;
  }
  function isWriteMethod(method) {
    method = text(method).trim();
    if (!method) return false;
    if (/^(apiAiAssistantStartJob|apiAiAssistantAsk|apiAiAssistantGetJob|apiAiAssistantSummarizeCase|apiGenerateExecutiveSummary|apiGenerateBudgetTrendSummary)$/i.test(method)) return false;
    try {
      if (root.AppRouteContract && typeof root.AppRouteContract.isWrite === "function" && root.AppRouteContract.loaded) {
        return !!root.AppRouteContract.isWrite(method);
      }
      if (typeof root.isWriteApiMethod === "function") return !!root.isWriteApiMethod(method);
    } catch (_) {}
    return /^api(?:[A-Za-z0-9_]*?)(?:Save|Delete|Update|Create|Import|Extract|Upload|Issue|Process|Cleanup|Generate|Send|Patch|Approve|Reject|Submit|Queue|Migrate|Revoke|Refresh)(?:[A-Z_]|$)/.test(method);
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
  function hashText(value) {
    var input = text(value || "");
    var hash = 2166136261;
    for (var i = 0; i < input.length; i += 1) {
      hash ^= input.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(36);
  }
  function authScopeForPayload(payload) {
    payload = isObject(payload) ? payload : {};
    var token = text(payload.token || payload._token || payload.authToken || "");
    if (!token) {
      try { token = text(root.AppStore && root.AppStore.get && root.AppStore.get("auth.token", "") || ""); } catch (_) {}
    }
    if (!token) return "anonymous";
    return "auth-" + hashText(token);
  }
  function stableKey(method, payload) {
    try { return authScopeForPayload(payload) + "|" + method + "|" + JSON.stringify(stableClone(payload || {})); }
    catch (_) { return authScopeForPayload(payload) + "|" + method + "|" + Date.now(); }
  }
  function syncAuthScope(payload, reason) {
    var next = authScopeForPayload(payload);
    if (next !== lastAuthScope) {
      readCache = Object.create(null);
      apiInFlight = Object.create(null);
      cacheEpoch += 1;
      lastAuthScope = next;
      root.__APP_CLIENT_API_CACHE_EPOCH__ = cacheEpoch;
      recordMetric({ kind: "auth-scope-change", reason: reason || "request", authScope: next, cacheEpoch: cacheEpoch });
    }
    return next;
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
  function cacheSafe(method) {
    method = text(method).trim();
    if (!isReadMethod(method) || isAuthOrBootstrapMethod(method)) return false;
    // Cache only collection/summary reads. Record-scoped reads must remain fresh,
    // otherwise a previous case can appear under the newly selected case.
    if (/(?:GetCase|CaseDetail|MeetingHistory|Tracking|Followup|Letter|Record|ById|ByCase|Edit|Manage)/i.test(method)) return false;
    return /(?:List|Search|Summary|Options|Types|Statuses|Dashboard|Overview|Workflow|Fiscal|Committee)/i.test(method);
  }
  function cacheTtl(payload) {
    var seconds = Number(payload && payload.cacheTtlSeconds);
    if (isFinite(seconds) && seconds > 0) return Math.max(5000, Math.min(seconds * 1000, Number(config("clientReadCacheMaxTtlMs", 120000)) || 120000));
    return Number(config("clientReadCacheTtlMs", 60000)) || 60000;
  }
  function pruneReadCache() {
    var now = Date.now();
    Object.keys(readCache).forEach(function(key) {
      var item = readCache[key];
      if (!item || Number(item.staleUntil || item.expiresAt || 0) <= now) delete readCache[key];
    });
    var keys = Object.keys(readCache);
    var maxEntries = Math.max(20, Math.min(Number(config("clientReadCacheMaxEntries", 120)) || 120, 500));
    if (keys.length <= maxEntries) return;
    keys.sort(function(a, b) { return Number(readCache[a] && readCache[a].storedAt || 0) - Number(readCache[b] && readCache[b].storedAt || 0); });
    keys.slice(0, keys.length - maxEntries).forEach(function(key) { delete readCache[key]; });
  }
  function getCached(method, payload) {
    if (!config("clientReadResponseCacheEnabled", true) || wantsFresh(payload) || !cacheSafe(method)) return null;
    var hit = readCache[stableKey(method, payload)];
    if (hit && hit.expiresAt > Date.now()) {
      recordMetric({ kind: "cache", method: method, cacheHit: true, transport: TRANSPORT_MODE });
      return cloneJson(hit.value);
    }
    if (hit && Number(hit.staleUntil || 0) <= Date.now()) delete readCache[stableKey(method, payload)];
    return null;
  }
  function putCached(method, payload, value) {
    if (!config("clientReadResponseCacheEnabled", true) || wantsFresh(payload) || !cacheSafe(method) || !isObject(value) || value.ok === false) return;
    var ttl = cacheTtl(payload);
    readCache[stableKey(method, payload)] = {
      value: cloneJson(value),
      storedAt: Date.now(),
      expiresAt: Date.now() + ttl,
      staleUntil: Date.now() + (Number(config("clientReadStaleIfErrorMs", 600000)) || 600000)
    };
    pruneReadCache();
    recordMetric({ kind: "cache", method: method, cacheWrite: true, ttlMs: ttl, transport: TRANSPORT_MODE });
  }
  function staleCached(method, payload) {
    var key = stableKey(method, payload);
    var hit = readCache[key];
    if (hit && hit.staleUntil > Date.now()) return cloneJson(hit.value);
    if (hit) delete readCache[key];
    return null;
  }
  function invalidateCache(reason, method) {
    apiInFlight = Object.create(null);
    readCache = Object.create(null);
    cacheEpoch += 1;
    root.__APP_CLIENT_API_CACHE_EPOCH__ = cacheEpoch;
    recordMetric({ kind: "cache-invalidate", reason: reason || "write", method: method || "", cacheEpoch: cacheEpoch });
    return true;
  }

  function newBridgeNonce() {
    return "br_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2) + "_" + Math.random().toString(36).slice(2);
  }
  function bridgeUrl() {
    return withQuery(gasWebAppUrl(), {
      __githubBridgeClient: "1",
      parentOrigin: root.location && root.location.origin || "",
      bridgeNonce: bridgeNonce,
      r: RELEASE_STAMP
    });
  }
  function rejectBridgeReady(error) {
    if (bridgeVerifyRequestId && bridgePending[bridgeVerifyRequestId]) {
      var verifyPending = bridgePending[bridgeVerifyRequestId];
      if (verifyPending.timer) root.clearTimeout(verifyPending.timer);
      delete bridgePending[bridgeVerifyRequestId];
    }
    bridgeVerifyRequestId = "";
    var reject = bridgeReadyReject;
    bridgeReadyResolve = null;
    bridgeReadyReject = null;
    bridgeInFlight = null;
    if (bridgeReadyTimer) {
      root.clearTimeout(bridgeReadyTimer);
      bridgeReadyTimer = 0;
    }
    if (typeof reject === "function") reject(error);
  }
  function resolveBridgeReady() {
    if (!bridgeReady || !bridgeVerified || !bridgeClientWindow || !bridgeClientOrigin) return false;
    var resolve = bridgeReadyResolve;
    bridgeReadyResolve = null;
    bridgeReadyReject = null;
    bridgeInFlight = null;
    if (bridgeReadyTimer) {
      root.clearTimeout(bridgeReadyTimer);
      bridgeReadyTimer = 0;
    }
    if (typeof resolve === "function") {
      resolve({ frame: bridgeFrame, sourceWindow: bridgeClientWindow, sourceOrigin: bridgeClientOrigin, generation: bridgeGeneration,
      verifiedAt: bridgeLastVerifiedAt ? new Date(bridgeLastVerifiedAt).toISOString() : "", nonce: bridgeNonce });
    }
    return true;
  }
  function clearBridgeReadyState(removeFrame) {
    bridgeReady = false;
    bridgeVerified = false;
    bridgeClientWindow = null;
    bridgeClientOrigin = "";
    bridgeServerStamp = "";
    bridgeLastVerifiedAt = 0;
    bridgeVerifyRequestId = "";
    bridgeNonce = "";
    if (bridgeReadyTimer) {
      root.clearTimeout(bridgeReadyTimer);
      bridgeReadyTimer = 0;
    }
    bridgeReadyResolve = null;
    bridgeReadyReject = null;
    bridgeInFlight = null;
    Object.keys(bridgePending).forEach(function(id) {
      var pending = bridgePending[id];
      if (pending && pending.timer) root.clearTimeout(pending.timer);
      if (pending && typeof pending.reject === "function") pending.reject(makeError("GAS bridge ถูกรีเซ็ต", "GAS_BRIDGE_RESET", pending.method));
      delete bridgePending[id];
    });
    if (removeFrame && bridgeFrame) {
      try { bridgeFrame.parentNode && bridgeFrame.parentNode.removeChild(bridgeFrame); } catch (_) {}
      bridgeFrame = null;
    }
  }
  function postToBridgeWindow(message) {
    if (!bridgeClientWindow || !bridgeClientOrigin || !bridgeNonce) return false;
    message = Object.assign({}, message || {}, { nonce: bridgeNonce, releaseStamp: bridgeServerStamp || RELEASE_STAMP, clientReleaseStamp: RELEASE_STAMP });
    try {
      bridgeClientWindow.postMessage(message, bridgeClientOrigin === "null" ? "*" : bridgeClientOrigin);
      return true;
    } catch (_) {
      return false;
    }
  }
  function verifyBridgeCandidate() {
    if (bridgeVerified) return resolveBridgeReady();
    if (bridgeVerifyRequestId && bridgePending[bridgeVerifyRequestId]) return true;
    if (!bridgeClientWindow || !bridgeClientOrigin || !bridgeNonce) return false;
    var id = requestId("bridgeVerify");
    bridgeVerifyRequestId = id;
    var timer = root.setTimeout(function() {
      var pending = bridgePending[id];
      delete bridgePending[id];
      bridgeVerifyRequestId = "";
      if (pending && typeof pending.reject === "function") pending.reject(makeError("GAS bridge verification timeout", "GAS_BRIDGE_VERIFY_TIMEOUT", "apiGithubBridgePing"));
      rejectBridgeReady(makeError("GAS bridge READY แต่ ping ไม่ตอบกลับ", "GAS_BRIDGE_VERIFY_TIMEOUT"));
    }, Math.max(4000, Math.min(Number(config("bridgeVerifyTimeoutMs", 10000)) || 10000, 15000)));
    bridgePending[id] = {
      method: "apiGithubBridgePing",
      timer: timer,
      probe: true,
      resolve: function(result) {
        bridgeVerifyRequestId = "";
        if (isObject(result) && result.ok === false) {
          rejectBridgeReady(makeError(text(result.error || result.msg || "GAS bridge ping failed"), text(result.errorCode || "GAS_BRIDGE_VERIFY_FAILED"), "apiGithubBridgePing"));
          return;
        }
        bridgeVerified = true;
        bridgeReady = true;
        bridgeLastVerifiedAt = Date.now();
        resolveBridgeReady();
      },
      reject: function(error) {
        bridgeVerifyRequestId = "";
        rejectBridgeReady(error);
      }
    };
    if (!postToBridgeWindow({
      __gasIframeTransport: true,
      type: "GAS_IFRAME_TRANSPORT_REQUEST",
      requestId: id,
      method: "apiGithubBridgePing",
      payload: { at: new Date().toISOString(), transportMode: TRANSPORT_MODE },
      bridge: TRANSPORT_MODE
    })) {
      root.clearTimeout(timer);
      delete bridgePending[id];
      bridgeVerifyRequestId = "";
      rejectBridgeReady(makeError("ส่ง bridge verification ไม่สำเร็จ", "GAS_BRIDGE_VERIFY_SEND_FAILED"));
      return false;
    }
    return true;
  }
  function ensureBridge() {
    if (bridgeReady && bridgeVerified && bridgeClientWindow && bridgeClientOrigin) {
      return Promise.resolve({ frame: bridgeFrame, sourceWindow: bridgeClientWindow, sourceOrigin: bridgeClientOrigin, generation: bridgeGeneration,
      verifiedAt: bridgeLastVerifiedAt ? new Date(bridgeLastVerifiedAt).toISOString() : "", nonce: bridgeNonce });
    }
    if (bridgeInFlight) return bridgeInFlight;
    bridgeInFlight = new Promise(function(resolve, reject) {
      bridgeReadyResolve = resolve;
      bridgeReadyReject = reject;
      var readyTimeoutMs = Math.max(8000, Math.min(Number(config("bridgeReadyTimeoutMs", 22000)) || 22000, 45000));
      bridgeReadyTimer = root.setTimeout(function() {
        rejectBridgeReady(makeError("GAS bridge ไม่ผ่าน READY + ping handshake", "GAS_BRIDGE_VERIFIED_READY_TIMEOUT"));
      }, readyTimeoutMs);
      try {
        bridgeReady = false;
        bridgeVerified = false;
        bridgeClientWindow = null;
        bridgeClientOrigin = "";
        bridgeNonce = newBridgeNonce();
        bridgeGeneration += 1;
        bridgeFrame = doc.getElementById("app-gas-direct-bridge");
        if (bridgeFrame) {
          try { bridgeFrame.parentNode && bridgeFrame.parentNode.removeChild(bridgeFrame); } catch (_) {}
        }
        bridgeFrame = doc.createElement("iframe");
        bridgeFrame.id = "app-gas-direct-bridge";
        bridgeFrame.name = "app-gas-direct-bridge-" + bridgeGeneration;
        bridgeFrame.title = "GAS Authenticated API Bridge";
        bridgeFrame.setAttribute("aria-hidden", "true");
        bridgeFrame.style.cssText = "position:fixed;width:1px;height:1px;left:-10000px;top:-10000px;border:0;opacity:0;pointer-events:none;";
        bridgeFrame.onerror = function () {
          if (!bridgeReady || !bridgeVerified) {
            rejectBridgeReady(makeError("โหลด GAS bridge ไม่สำเร็จ", "GAS_BRIDGE_FRAME_LOAD_FAILED"));
          }
        };
        bridgeFrame.src = bridgeUrl();
        (doc.body || doc.documentElement).appendChild(bridgeFrame);
      } catch (error) {
        rejectBridgeReady(error);
      }
    });
    return bridgeInFlight;
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
      if (!isTrustedGoogleMessageOrigin(event && event.origin)) return;
      if (loginRequest.sourceWindow && event && event.source !== loginRequest.sourceWindow) return;
      var responseNonce = text(data.nonce || "");
      if (responseNonce && loginRequest.nonce && responseNonce !== loginRequest.nonce) return;
      var responseStamp = text(data.stamp || data.releaseStamp || "");
      delete loginPending[loginId];
      root.clearTimeout(loginRequest.timer);
      try { loginRequest.cleanup(); } catch (_) {}
      var loginResult = data.result || { ok: false, error: "empty login response", errorCode: "GITHUB_LOGIN_POST_EMPTY_RESPONSE" };
      if (isObject(loginResult)) {
        loginResult.method = loginResult.method || "apiLogin";
        loginResult.transport = loginResult.transport || "github-login-post";
        loginResult.releaseStamp = loginResult.releaseStamp || responseStamp || RELEASE_STAMP;
        loginResult.meta = Object.assign({}, isObject(loginResult.meta) ? loginResult.meta : {}, {
          callbackNoncePresent: !!responseNonce,
          callbackReleaseStamp: responseStamp,
          frontendReleaseStamp: RELEASE_STAMP,
          crossReleaseCallback: !!responseStamp && responseStamp !== RELEASE_STAMP
        });
      }
      loginRequest.resolve(loginResult);
      return;
    }

    if (data.type === "GAS_API_POST_RESPONSE") {
      var apiPostId = text(data.requestId || data.id || "");
      var apiPostRequest = apiPostId && apiPostPending[apiPostId];
      if (!apiPostRequest) return;
      if (!isTrustedGoogleMessageOrigin(event && event.origin)) return;
      if (apiPostRequest.sourceWindow && event && event.source !== apiPostRequest.sourceWindow) return;
      var apiPostNonce = text(data.nonce || "");
      if (!apiPostNonce || apiPostNonce !== apiPostRequest.nonce) return;
      delete apiPostPending[apiPostId];
      root.clearTimeout(apiPostRequest.timer);
      try { apiPostRequest.cleanup(); } catch (_) {}
      var apiPostResult = data.result || { ok: false, error: "empty authenticated POST response", errorCode: "GITHUB_API_POST_EMPTY_RESPONSE" };
      if (isObject(apiPostResult)) {
        apiPostResult.method = apiPostResult.method || data.method || apiPostRequest.method;
        apiPostResult.transport = apiPostResult.transport || "github-authenticated-postmessage-post";
        apiPostResult.releaseStamp = apiPostResult.releaseStamp || text(data.releaseStamp || data.stamp || RELEASE_STAMP);
        apiPostResult.meta = Object.assign({}, isObject(apiPostResult.meta) ? apiPostResult.meta : {}, {
          phaseCAuthenticatedBridge: true,
          authenticatedPostFallback: true,
          requestNonceVerified: true,
          frontendReleaseStamp: RELEASE_STAMP
        });
      }
      apiPostRequest.resolve(apiPostResult);
      return;
    }

    if (data.type === "GAS_IFRAME_TRANSPORT_READY") {
      if (!isTrustedBridgeEvent(event, data)) return;
      if (bridgeClientWindow && event.source !== bridgeClientWindow) return;
      bridgeClientWindow = event.source;
      bridgeClientOrigin = text(event.origin || "null");
      bridgeServerStamp = text(data.stamp || data.releaseStamp || RELEASE_STAMP) || RELEASE_STAMP;
      root.__APP_GAS_INNER_BRIDGE_ORIGIN__ = bridgeClientOrigin;
      root.__APP_GAS_INNER_BRIDGE_SERVER_STAMP__ = bridgeServerStamp;
      root.__APP_GAS_INNER_BRIDGE_READY_AT__ = new Date().toISOString();
      verifyBridgeCandidate();
      return;
    }

    if (data.type === "GAS_IFRAME_TRANSPORT_RESPONSE") {
      if (!isTrustedBridgeEvent(event, data)) return;
      if (!bridgeClientWindow || event.source !== bridgeClientWindow || text(event.origin || "null") !== bridgeClientOrigin) return;
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
          verifiedSessionBridge: true,
          bridgeOrigin: bridgeClientOrigin,
          bridgeGeneration: bridgeGeneration,
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
      var loginNonce = newBridgeNonce();
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
      loginPending[id] = { resolve: resolve, reject: reject, timer: timer, cleanup: cleanup, nonce: loginNonce };
      try {
        payload.__loginPostRequestId = id;
        payload.__loginPostParentOrigin = root.location && root.location.origin || "";
        payload.__loginPostNonce = loginNonce;
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
          loginNonce: loginNonce,
          r: RELEASE_STAMP
        });
        form.style.cssText = "display:none;position:absolute;left:-9999px;top:-9999px;";
        hiddenField(form, "payload", JSON.stringify(payload));
        hiddenField(form, "loginNonce", loginNonce);
        if (payload.username != null) hiddenField(form, "username", payload.username);
        if (payload.email != null) hiddenField(form, "email", payload.email);
        if (payload.password != null) hiddenField(form, "password", payload.password);
        (doc.body || doc.documentElement).appendChild(iframe);
        if (loginPending[id]) loginPending[id].sourceWindow = iframe.contentWindow || null;
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

  function runApiPost(method, payload, options) {
    method = text(method).trim();
    if (!method) return Promise.reject(makeError("method required", "METHOD_REQUIRED"));
    payload = isObject(payload) ? Object.assign({}, payload) : (payload == null ? {} : { value: payload });
    options = options || {};
    return new Promise(function(resolve, reject) {
      var id = requestId(method + "Post");
      var apiNonce = newBridgeNonce();
      var timeoutMs = Math.max(12000, Math.min(Number(options.timeoutMs || options.clientTimeoutMs || config("dataApiPostTimeoutMs", config("apiTimeoutMs", 60000))) || 60000, 90000));
      var iframe = null;
      var form = null;
      function cleanup() {
        try { form && form.parentNode && form.parentNode.removeChild(form); } catch (_) {}
        try { iframe && iframe.parentNode && iframe.parentNode.removeChild(iframe); } catch (_) {}
      }
      var timer = root.setTimeout(function() {
        delete apiPostPending[id];
        cleanup();
        reject(makeError("GAS authenticated POST timeout: " + method, "GITHUB_API_POST_TIMEOUT", method));
      }, timeoutMs);
      apiPostPending[id] = { resolve: resolve, reject: reject, timer: timer, cleanup: cleanup, nonce: apiNonce, method: method };
      try {
        var parentOrigin = root.location && root.location.origin || "";
        var envelope = {
          requestId: id,
          method: method,
          payload: payload,
          parentOrigin: parentOrigin,
          apiNonce: apiNonce,
          releaseStamp: RELEASE_STAMP
        };
        iframe = doc.createElement("iframe");
        iframe.name = "app-gas-api-post-" + id.replace(/[^A-Za-z0-9_-]/g, "_");
        iframe.id = iframe.name;
        iframe.title = "GAS Authenticated API POST";
        iframe.setAttribute("aria-hidden", "true");
        iframe.style.cssText = "position:absolute;width:1px;height:1px;left:-9999px;top:-9999px;border:0;opacity:0;pointer-events:none;";
        form = doc.createElement("form");
        form.method = "POST";
        form.target = iframe.name;
        form.action = withQuery(gasWebAppUrl(), {
          __githubApiPost: "1",
          requestId: id,
          method: method,
          parentOrigin: parentOrigin,
          apiNonce: apiNonce,
          r: RELEASE_STAMP
        });
        form.style.cssText = "display:none;position:absolute;left:-9999px;top:-9999px;";
        hiddenField(form, "payload", JSON.stringify(envelope));
        hiddenField(form, "apiNonce", apiNonce);
        (doc.body || doc.documentElement).appendChild(iframe);
        if (apiPostPending[id]) apiPostPending[id].sourceWindow = iframe.contentWindow || null;
        (doc.body || doc.documentElement).appendChild(form);
        form.submit();
      } catch (error) {
        delete apiPostPending[id];
        root.clearTimeout(timer);
        cleanup();
        reject(error);
      }
    });
  }

  function runLogin(method, payload, options) {
    method = text(method).trim();
    payload = isObject(payload) ? Object.assign({}, payload) : {};
    options = options || {};
    var bridgeOptions = Object.assign({}, options, {
      timeoutMs: Math.max(15000, Math.min(Number(options.loginBridgeTimeoutMs || options.timeoutMs || config("loginBridgeTimeoutMs", 30000)) || 30000, 60000))
    });
    var postFirst = config("loginBridgeFirst", false) !== true || currentAuthenticatedTransportPreference() === "post";

    function decorate(result, mode, fallbackError) {
      if (isObject(result)) {
        result.transport = result.transport || (mode === "post" ? "github-login-post" : "github-login-verified-bridge");
        result.meta = Object.assign({}, isObject(result.meta) ? result.meta : {}, {
          loginBridgeFirst: !postFirst,
          loginPostFirst: postFirst,
          loginPostFallback: mode === "post" && !postFirst,
          loginBridgeFallback: mode === "bridge" && postFirst,
          fallbackErrorCode: text(fallbackError && (fallbackError.code || fallbackError.errorCode) || ""),
          fallbackErrorMessage: text(fallbackError && fallbackError.message || fallbackError || "")
        });
      }
      if (!isObject(result) || result.ok !== false) setAuthenticatedTransportPreference(mode, "login-success-" + mode);
      return result;
    }

    if (postFirst) {
      return runLoginPost(method, payload, options).then(function(result) {
        return decorate(result, "post", null);
      }).catch(function(postError) {
        return runBridge(method, payload, bridgeOptions).then(function(result) {
          return decorate(result, "bridge", postError);
        });
      });
    }

    return runBridge(method, payload, bridgeOptions).then(function(result) {
      return decorate(result, "bridge", null);
    }).catch(function(bridgeError) {
      if (config("loginPostFallbackEnabled", true) !== true) throw bridgeError;
      return runLoginPost(method, payload, options).then(function(result) {
        return decorate(result, "post", bridgeError);
      });
    });
  }

  function runBridgeAttempt(method, payload, options, attempt) {
    return ensureBridge().then(function() {
      return new Promise(function(resolve, reject) {
        var id = requestId(method);
        var timeoutMs = Math.max(10000, Math.min(Number(options && (options.timeoutMs || options.clientTimeoutMs) || config("bridgeRequestTimeoutMs", config("apiTimeoutMs", 45000))) || 45000, 90000));
        var timer = root.setTimeout(function() {
          delete bridgePending[id];
          reject(makeError("GAS verified bridge timeout: " + method, "GAS_VERIFIED_BRIDGE_TIMEOUT", method));
        }, timeoutMs);
        bridgePending[id] = { resolve: resolve, reject: reject, timer: timer, method: method, probe: false };
        if (!postToBridgeWindow({
          __gasIframeTransport: true,
          type: "GAS_IFRAME_TRANSPORT_REQUEST",
          requestId: id,
          method: method,
          payload: payload,
          bridge: TRANSPORT_MODE
        })) {
          delete bridgePending[id];
          root.clearTimeout(timer);
          reject(makeError("ไม่สามารถส่งคำขอไปยัง verified GAS bridge", "GAS_VERIFIED_BRIDGE_SEND_FAILED", method));
        }
      });
    }).catch(function(error) {
      var retryable = /GAS_(?:BRIDGE|VERIFIED)|timeout|postMessage|READY|PING/i.test(text(error && (error.code || error.message) || error));
      if (retryable && attempt < Math.max(0, Math.min(Number(config("bridgeRetryCount", 1)) || 1, 2))) {
        clearBridgeReadyState(true);
        return runBridgeAttempt(method, payload, options, attempt + 1);
      }
      throw error;
    });
  }
  function runBridge(method, payload, options) {
    method = text(method).trim();
    if (!method) return Promise.reject(makeError("method required", "METHOD_REQUIRED"));
    payload = isObject(payload) ? Object.assign({}, payload) : (payload == null ? {} : { value: payload });
    return runBridgeAttempt(method, payload, options || {}, 0);
  }

  function runAuthenticated(method, payload, options) {
    options = options || {};
    var postEnabled = config("authenticatedPostFallbackEnabled", true) === true && config("dataApiPostBridgeEnabled", true) === true;
    var preference = currentAuthenticatedTransportPreference();
    var postFirst = postEnabled && (preference === "post" || config("authenticatedDataPostFirst", false) === true);

    function usePost(fallbackError) {
      return runApiPost(method, payload, options).then(function(result) {
        if (!isObject(result) || result.ok !== false) setAuthenticatedTransportPreference("post", fallbackError ? "bridge-fallback-success" : "post-success");
        if (isObject(result) && fallbackError) {
          result.meta = Object.assign({}, isObject(result.meta) ? result.meta : {}, {
            bridgeFallbackErrorCode: text(fallbackError && (fallbackError.code || fallbackError.errorCode) || ""),
            bridgeFallbackErrorMessage: text(fallbackError && fallbackError.message || fallbackError || "")
          });
        }
        return result;
      });
    }

    function useBridge(fallbackError) {
      return runBridge(method, payload, options).then(function(result) {
        if (!isObject(result) || result.ok !== false) setAuthenticatedTransportPreference("bridge", fallbackError ? "post-fallback-success" : "bridge-success");
        if (isObject(result) && fallbackError) {
          result.meta = Object.assign({}, isObject(result.meta) ? result.meta : {}, {
            postFallbackErrorCode: text(fallbackError && (fallbackError.code || fallbackError.errorCode) || ""),
            postFallbackErrorMessage: text(fallbackError && fallbackError.message || fallbackError || "")
          });
        }
        return result;
      });
    }

    if (postFirst) {
      return usePost(null).catch(function(postError) {
        return useBridge(postError);
      });
    }
    return useBridge(null).catch(function(bridgeError) {
      if (!postEnabled || !isBridgeTransportFailure(bridgeError)) throw bridgeError;
      return usePost(bridgeError);
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
    syncAuthScope(payload, "before:" + method);
    var cached = getCached(method, payload);
    if (cached) return Promise.resolve(cached);
    var key = stableKey(method, payload);
    var isWrite = isWriteMethod(method);
    var isLogin = /^apiLogin$/i.test(method);
    var isAuthTransition = /^(apiLogin|apiLogout|apiSessionResume)$/i.test(method);
    if (!isWrite && !isAuthTransition && apiInFlight[key]) {
      recordMetric({ kind: "call", method: method, dedupeHit: true, transport: TRANSPORT_MODE });
      return apiInFlight[key];
    }

    var callSequence = ++transportCallSequence;
    var invoker = isLogin ? runLogin : (isPublicJsonpMethod(method) ? runJsonp : runAuthenticated);
    var promise = invoker(method, payload, options).then(function(result) {
      var completedAt = Date.now();
      lastTransportSuccessSequence = Math.max(lastTransportSuccessSequence, callSequence);
      lastTransportSuccessAt = completedAt;
      recordMetric({ kind: "call", method: method, transport: isObject(result) && result.transport || (isLogin ? "github-login-verified-bridge" : (isPublicJsonpMethod(method) ? "github-public-jsonp" : TRANSPORT_MODE)), error: isObject(result) && result.ok === false });
      if (!lastTransportErrorSequence || callSequence >= lastTransportErrorSequence) {
        dispatchTransportStatus("app:transport-recovered", {
          method: method,
          callSequence: callSequence,
          resultOk: !(isObject(result) && result.ok === false),
          recoveredAfterError: lastTransportErrorSequence > 0 && callSequence >= lastTransportErrorSequence
        });
      }
      if (isAuthTransition && isObject(result) && result.ok !== false) {
        invalidateCache("auth-transition-success", method);
        lastAuthScope = /^apiLogout$/i.test(method) ? "anonymous" : authScopeForPayload(result && (result.data || result) || payload);
      } else if (isWrite && isObject(result) && result.ok !== false) {
        invalidateCache("write-success", method);
      } else {
        putCached(method, payload, result);
      }
      return result;
    }, function(error) {
      recordMetric({ kind: "call", method: method, transport: TRANSPORT_MODE, error: true, message: error && error.message || String(error || "") });
      var errorCode = text(error && (error.code || error.errorCode) || "");
      var mayUseStale = isBridgeTransportFailure(error) && !/AUTH|SESSION|TOKEN|CSRF|PERMISSION|FORBIDDEN|INVALID/i.test(errorCode);
      if (!isWrite && !isAuthTransition && mayUseStale && cacheSafe(method)) {
        var stale = staleCached(method, payload);
        if (stale) {
          stale.meta = Object.assign({}, isObject(stale.meta) ? stale.meta : {}, { staleIfError: true, staleReason: error && error.message || String(error || ""), authScope: authScopeForPayload(payload) });
          return stale;
        }
      }
      var staleTransportError = callSequence < lastTransportSuccessSequence;
      try { error.staleTransportError = staleTransportError; } catch (_) {}
      if (!staleTransportError) {
        lastTransportErrorSequence = Math.max(lastTransportErrorSequence, callSequence);
        lastTransportErrorAt = Date.now();
        dispatchTransportStatus("app:transport-error", {
          method: method,
          code: text(error && (error.code || error.errorCode) || "TRANSPORT_ERROR"),
          message: text(error && error.message || error),
          callSequence: callSequence
        });
      }
      throw error;
    });
    if (!isWrite && !isAuthTransition) {
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
      actualOwner: "github-pages/github-gas-transport.js::authenticated-post-fallback",
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
  root.AppTransport.__owner = "github-pages/github-gas-transport.js::authenticated-post-fallback-r130";
  root.AppTransport.__githubPagesGasDirect = true;
  root.AppTransport.__authenticatedReadBridgeOnly = false;
  root.AppTransport.__authenticatedJsonpDisabled = true;
  root.AppTransport.__innerBridgeSourceCaptured = true;
  root.AppTransport.__perRequestApiPostDisabled = false;
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
      authenticatedReadBridgeOnly: false,
      authenticatedPostFallbackEnabled: true,
      authenticatedTransportPreference: currentAuthenticatedTransportPreference(),
      authenticatedTransportPreferenceUntil: preferredAuthenticatedTransportUntil ? new Date(preferredAuthenticatedTransportUntil).toISOString() : "",
      authenticatedJsonpDisabled: true,
      innerBridgeSourceCaptured: !!bridgeClientWindow,
      bridgeVerified: bridgeVerified,
      bridgeLastVerifiedAt: bridgeLastVerifiedAt ? new Date(bridgeLastVerifiedAt).toISOString() : "",
      bridgeReady: bridgeReady,
      bridgeOrigin: bridgeClientOrigin,
      bridgeGeneration: bridgeGeneration,
      bridgeNonceBound: !!bridgeNonce,
      bridgePingVerified: bridgeVerified,
      authScope: lastAuthScope,
      cacheEpoch: cacheEpoch,
      perRequestApiPostDisabled: false,
      clientReadCacheEntries: Object.keys(readCache).length,
      inFlight: Object.keys(apiInFlight).length,
      metrics: Object.assign({}, metrics),
      transportCallSequence: transportCallSequence,
      lastTransportSuccessSequence: lastTransportSuccessSequence,
      lastTransportErrorSequence: lastTransportErrorSequence,
      lastTransportSuccessAt: lastTransportSuccessAt ? new Date(lastTransportSuccessAt).toISOString() : "",
      lastTransportErrorAt: lastTransportErrorAt ? new Date(lastTransportErrorAt).toISOString() : ""
    };
  };
  root.AppTransport.phase1Status = root.AppTransport.phase2Status;
  root.AppTransport.phase0Status = root.AppTransport.phase2Status;
  root.AppTransport.runtimeOwnerStatus = runtimeOwnerStatus;
  root.AppTransport.assertRuntimeOwner = assertRuntimeOwner;
  root.AppTransport.bridgeClientState = function() {
    return {
      ready: bridgeReady,
      verified: bridgeVerified,
      innerSourceWindowCaptured: !!bridgeClientWindow,
      sourceOrigin: bridgeClientOrigin,
      generation: bridgeGeneration,
      verifiedAt: bridgeLastVerifiedAt ? new Date(bridgeLastVerifiedAt).toISOString() : "",
      mode: TRANSPORT_MODE,
      gasWebAppUrl: normalizeUrl(root.GAS_WEB_APP_URL || config("gasWebAppUrl", "") || DEFAULT_GAS_WEB_APP_URL)
    };
  };
  root.AppTransport.clientCacheStatus = function() {
    return { ok: true, authScope: lastAuthScope, cacheEntries: Object.keys(readCache).length, inFlight: Object.keys(apiInFlight).length, cacheEpoch: cacheEpoch, metrics: Object.assign({}, metrics) };
  };
  root.AppTransport.clearApiCache = function(reason) {
    invalidateCache(reason || "manual-clear", "__manual__");
    return true;
  };
  root.AppTransport.setGasWebAppUrl = function(value) {
    value = normalizeUrl(value || "");
    if (!value) return "";
    var trusted = normalizeUrl(config("trustedGasWebAppUrl", DEFAULT_GAS_WEB_APP_URL) || DEFAULT_GAS_WEB_APP_URL);
    if (config("allowRuntimeGasUrlOverride", false) !== true && value !== trusted) {
      throw makeError("ไม่อนุญาตให้เปลี่ยน GAS deployment ระหว่าง runtime", "GAS_WEB_APP_URL_OVERRIDE_DISABLED");
    }
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
  root.AppTransport.runAuthenticatedBridge = runAuthenticated;
  root.AppTransport.runAuthenticatedPostMessageBridge = runAuthenticated;
  root.AppTransport.runApiPost = runApiPost;
  root.AppTransport.runJsonpApi = runJsonp;
  root.AppTransport.runLogin = runLogin;
  root.AppTransport.runLoginPost = runLoginPost;

  try { setLogo(config("logoUrl", FALLBACK_LOGO), "app-config"); } catch (_) {}
  if (doc.readyState === "loading") {
    doc.addEventListener("DOMContentLoaded", function() { setLogo(config("logoUrl", FALLBACK_LOGO), "app-config-dom"); }, { once: true });
  } else {
    setLogo(config("logoUrl", FALLBACK_LOGO), "app-config-dom");
  }
})(window, document);
