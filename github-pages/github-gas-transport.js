(function(root, doc) {
    "use strict"; 
    if (!root || !doc)return; 
    var FALLBACK_LOGO = "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22128%22%20height%3D%22128%22%20viewBox%3D%220%200%20128%20128%22%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20rx%3D%2224%22%20fill%3D%22%23f8fafc%22/%3E%3Ccircle%20cx%3D%2264%22%20cy%3D%2248%22%20r%3D%2226%22%20fill%3D%22%23d4af37%22/%3E%3Cpath%20d%3D%22M28%20100h72M40%2088h48M48%2074h32%22%20stroke%3D%22%23334155%22%20stroke-width%3D%227%22%20stroke-linecap%3D%22round%22/%3E%3Ctext%20x%3D%2264%22%20y%3D%2255%22%20text-anchor%3D%22middle%22%20font-family%3D%22Sarabun%2C%20Arial%22%20font-size%3D%2218%22%20fill%3D%22%23334155%22%3E%E0%B8%AA%E0%B8%A0%E0%B8%B2%3C/text%3E%3C/svg%3E",
    PHASE_RELEASE_STAMP = "commission-v1.2-gas-hosted-production-2026-07-13-r94",
    PHASE_ASSET_STAMP = "asset-manifest-commission-v1.2-gas-hosted-production-2026-07-13-r94",
    PHASE_TRANSPORT_MODE = "production-vercel-proxy-only-no-jsonp-no-bridge-no-login-iframe",
    manifest = root.APP_CONFIG && root.APP_CONFIG.assetManifest || root.__APP_ASSET_MANIFEST__ || {
    }
    ,
    cache = Object.create(null),
    assetInFlight = Object.create(null),
    publicConfigInFlight = null,
    apiInFlight = Object.create(null),
    apiReadCache = Object.create(null),
    apiMetrics = {
      calls: 0,
      cacheHits: 0,
      cacheWrites: 0,
      dedupeHits: 0,
      vercelProxyCalls: 0,
      errors: 0,
      last: []
    }
    ,
    apiCacheEpoch = 0,
    lastPublicConfig = null,
    lastReleaseMismatch = null; 
    function text(v) {
      return v == null ? "": String(v)
    }
    function isObj(v) {
      return!!v && typeof v == "object" && !Array.isArray(v)
    }
    function safeName(name) {
      return /^[A-Za-z0-9_\-]+$/.test(text(name))
    }
    function cfg(name, fallback) {
      var c = root.APP_CONFIG || {
      }
      ; 
      return c[name] == null || c[name] === "" ? fallback: c[name]
    }
    function cfgList(name) {
      var value = cfg(name, []); 
      return Array.isArray(value) ? value.map(text).filter(Boolean): text(value).split(",").map(function(x) {
          return x.trim()
        }
      ).filter(Boolean)
    }
    function normalizeUrl(url) {
      return url = text(url).trim(),
      url ? url.replace(/\s+/g, ""): ""
    }
    function isGoogleHostedFrontend() {
      var host = text(root.location && root.location.hostname || "").toLowerCase();
      return /(^|\.)script\.google\.com$|(^|\.)script\.googleusercontent\.com$|(^|\.)docs\.google\.com$|(^|\.)googleusercontent\.com$/.test(host)
    }
    function sameOriginProxyUrl(name, fallback) {
      var raw = text(cfg(name, fallback || "")).trim() || fallback || "",
      resolved;
      if (isGoogleHostedFrontend())throw bridgeError("กำลังเปิดระบบจาก GAS backend URL ซึ่งไม่มี Vercel /api proxy กรุณาเปิดระบบจาก Vercel Production URL",
          "VERCEL_FRONTEND_REQUIRED", name);
      try {
        resolved = new URL(raw, root.location && root.location.href || "./")
      } 
      catch (_) {
        throw bridgeError("Vercel proxy URL ไม่ถูกต้อง: " + raw, "VERCEL_PROXY_URL_INVALID", name)
      }
      if (!/^https?:$/.test(resolved.protocol))throw bridgeError("Vercel proxy URL ต้องใช้ http หรือ https เท่านั้น",
          "VERCEL_PROXY_URL_INVALID", name);
      return resolved.href
    }
    function vercelApiProxyUrl() {
      return sameOriginProxyUrl("vercelApiProxyUrl", "/api/gas")
    }
    function vercelLoginProxyUrl() {
      return sameOriginProxyUrl("vercelLoginProxyUrl", "/api/login")
    }
    function vercelPublicConfigProxyUrl() {
      return sameOriginProxyUrl("vercelPublicConfigProxyUrl", "/api/public-config")
    }
    function isSafeLogoUrl(url) {
      return url = normalizeUrl(url),
      !url || /^data:image\//i.test(url) || /^https?:\/\//i.test(url)
    }
    function markBadLogo(url) {
      try {
        url = normalizeUrl(url),
        url && url !== FALLBACK_LOGO &&(root.localStorage && root.localStorage.setItem("APP_BAD_LOGO_URL",
            url), root.localStorage && root.localStorage.removeItem("APP_LOGO_URL"))
      } 
      catch (_) {
      }
    }
    function isBadLogo(url) {
      try {
        return normalizeUrl(url) && normalizeUrl(url) === normalizeUrl(root.localStorage && root.localStorage.getItem("APP_BAD_LOGO_URL") || "")
      } 
      catch (_) {
        return!1
      }
    }
    function bridgeError(message, code, method) {
      var err = new Error(message); 
      return err.code = code || "VERCEL_PROXY_TRANSPORT_ERROR",
      err.errorCode = err.code,
      err.method = method || "",
      err.transportMode = PHASE_TRANSPORT_MODE,
      err
    }
    function vercelProxyEnabled() {
      return!0
    }
    function gasDirectAvailable() {
      return!1
    }
    function runGasDirectTransport(method, payload, options) {
      return Promise.reject(bridgeError("Production Vercel static frontend ปิด GAS direct transport แล้ว ให้เรียกผ่าน /api/gas หรือ /api/login เท่านั้น",
          "STATIC_GAS_DIRECT_DISABLED", method))
    }
    function payloadWantsFresh(payload) {
      return payload = isObj(payload) ? payload: {
      }
      ,
      payload.forceFresh === !0 || payload.noCache === !0 || payload.bypassCache === !0 || Number(payload.cacheTtlSeconds) === 0
    }
    function isWriteApiMethod(method) {
      return method = text(method).trim(),
      method ? !!(/^api(?:Save|Delete|Update|Create|Import|Extract|Upload|Issue|Process|Cleanup|Generate|Send|Patch|Approve|Reject|Submit|Queue|Migrate|Revoke|Refresh)/i.test(method) || /^api(?:Admin)?(?:Save|Delete|Update|Create)/i.test(method) || /^apiBudget(?:Save|Delete|Import)/i.test(method)): !1
    }
    function isReadApiMethod(method) {
      return method = text(method).trim(),
      !method || /^api(Login|Logout)$/i.test(method) || isWriteApiMethod(method) ? !1: /^(apiGet|apiList|apiSearch|apiBootstrap|apiSessionCheck|apiSessionResume|apiVerifySession|apiBudgetGet|apiBudgetList|apiBudgetAdminList|apiAdminList|apiCheckDuplicateCase)/i.test(method) || method === "apiRouter"
    }
    function stableClone(value) {
      if (Array.isArray(value))return value.map(stableClone); 
      if (!isObj(value))return value; 
      var out = {
      }
      ; 
      return Object.keys(value).sort().forEach(function(k) {
          /^(token|_token|authToken|csrf|csrfToken|_csrf|_csrfToken|actionToken|csrfActionToken|_actionToken|password|pass|pwd)$/i.test(k) || /^(_|nonce|at|source|clientContext)$/i.test(k) ||(out[k] = stableClone(value[k]))
        }
      ),
      out
    }
    function stableKey(method, payload) {
      try {
        return method + "|" + JSON.stringify(stableClone(payload || {
            }
          ))
      } 
      catch (_) {
        return method + "|" + Date.now()
      }
    }
    function recordApiMetric(item) {
      try {
        item = item || {
        }
        ,
        item.at = item.at || new Date().toISOString(),
        apiMetrics.calls += item.kind === "call" ? 1: 0,
        apiMetrics.cacheHits += item.cacheHit ? 1: 0,
        apiMetrics.cacheWrites += item.cacheWrite ? 1: 0,
        apiMetrics.dedupeHits += item.dedupeHit ? 1: 0,
        apiMetrics.vercelProxyCalls += /^vercel/i.test(String(item.transport || "")) && item.kind === "call" ? 1: 0,
        apiMetrics.errors += item.error ? 1: 0,
        apiMetrics.last.push(item),
        apiMetrics.last.length > 30 && apiMetrics.last.shift()
      } 
      catch (_) {
      }
    }
    function invalidateClientApiCache(reason, method) {
      try {
        apiInFlight = Object.create(null),
        apiReadCache = Object.create(null),
        apiCacheEpoch += 1,
        root.__APP_CLIENT_API_CACHE_EPOCH__ = apiCacheEpoch,
        recordApiMetric({
            kind: "cache-invalidate",
            method: text(method || ""),
            transport: "vercel-api-proxy",
            reason: text(reason || "write"),
            cacheEpoch: apiCacheEpoch
          }
        )
      } 
      catch (_) {
      }
      return!0
    }
    function isAuthOrBootstrapMethod(method) {
      return /^(apiLogin|apiLogout|apiSessionResume|apiSessionCheck|apiVerifySession|apiBootstrap|apiIssueActionToken|apiGetRouteContract|apiGetPhase0ContractGate|apiGetPhase1Contract|apiGetPhase2Contract|apiGetClientDataContract)$/i.test(text(method).trim())
    }
    function isCacheSafeReadMethod(method) {
      return method = text(method).trim(),
      isReadApiMethod(method) && !isAuthOrBootstrapMethod(method)
    }
    function annotateResult(result, meta) {
      try {
        if (!isObj(result))return result; 
        var out = Object.assign({
          }
          , result); 
        return out.meta = Object.assign({
          }
          , isObj(result.meta) ? result.meta: {
          }
          , meta || {
          }
        ),
        isObj(out.data) &&(out.data = Object.assign({
            }
            , out.data, {
              meta: Object.assign({
                }
                , isObj(out.data.meta) ? out.data.meta: {
                }
                , meta || {
                }
              )
            }
          )),
        out
      } 
      catch (_) {
        return result
      }
    }
    function fetchJsonWithTimeout(url, options, timeoutMs, method) {
      if (typeof fetch != "function")return Promise.reject(bridgeError("browser fetch ไม่พร้อมใช้งานสำหรับ Vercel proxy",
          "FETCH_NOT_AVAILABLE", method)); 
      var ctrl = null,
      timer = null; 
      try {
        ctrl = typeof AbortController != "undefined" ? new AbortController: null
      } 
      catch (_) {
        ctrl = null
      }
      return options = options || {
      }
      ,
      ctrl &&(options.signal = ctrl.signal),
      timer = setTimeout(function() {
          try {
            ctrl && ctrl.abort()
          } 
          catch (_) {
          }
        }
        , Number(timeoutMs || 45e3) || 45e3),
      fetch(url, options).then(function(resp) {
          return resp.text().then(function(raw) {
              var data = null; 
              try {
                data = raw ? JSON.parse(raw): {
                }
              } 
              catch (_) {
                var preview = String(raw || "").slice(0, 300),
                googleHtml = /<html|<!doctype/i.test(preview) && /google|accounts\.google|workspace|เอกสารเวิร์ดโปรเซสเซอร์|สเปรดชีตผ่านเว็บ/i.test(String(resp && resp.url || "") + " " + preview);
                data = {
                  ok: !1,
                  error: googleHtml ? "ปลายทางส่งหน้า Google HTML แทน JSON: กรุณาเปิดระบบจาก Vercel URL และตรวจ GAS Web App /exec access": "Vercel proxy response ไม่ใช่ JSON",
                  errorCode: googleHtml ? "GAS_DEPLOYMENT_ACCESS_OR_URL_INVALID": "VERCEL_PROXY_RESPONSE_NOT_JSON",
                  rawPreview: preview,
                  responseUrl: resp && resp.url || "",
                  contentType: resp && resp.headers && resp.headers.get ? resp.headers.get("content-type") || "": "",
                  method
                }
              }
              return!resp.ok && data && data.ok !== !1 &&(data.ok = !1, data.error = data.error || "Vercel proxy HTTP error " + resp.status,
                data.errorCode = data.errorCode || "VERCEL_PROXY_HTTP_ERROR"),
              data || {
                ok: !1,
                error: "empty Vercel proxy response",
                errorCode: "VERCEL_PROXY_EMPTY_RESPONSE",
                method
              }
            }
          )
        }
        , function(err) {
          var code = err && err.name === "AbortError" ? "VERCEL_PROXY_TIMEOUT": "VERCEL_PROXY_FETCH_FAILED"; 
          throw bridgeError((code === "VERCEL_PROXY_TIMEOUT" ? "Vercel API proxy timeout: browser รอเกินกำหนดโดยไม่ได้รับผลจาก proxy กรุณาตรวจ network/proxy และ GAS write duration": "Vercel API proxy fetch failed") + ": " +(err && err.message || err),
            code, method)
        }
      ).then(function(data) {
          try {
            clearTimeout(timer)
          } 
          catch (_) {
          }
          return data
        }
        , function(err) {
          try {
            clearTimeout(timer)
          } 
          catch (_) {
          }
          throw err
        }
      )
    }
    function proxyClientTimeoutMs(method, options) {
      var isWrite = isWriteApiMethod(method),
      fallback = isWrite ? cfg("vercelWriteProxyClientTimeoutMs", cfg("vercelApiProxyTimeoutMs", 110e3)): cfg("vercelReadProxyClientTimeoutMs", cfg("vercelApiProxyTimeoutMs", 80e3)),
      raw = Number(options && (options.clientTimeoutMs || options.timeoutMs) || fallback || 80e3) || 80e3; 
      return Math.max(10e3, Math.min(raw, 120e3))
    }
    function proxyServerTimeoutMs(method, options) {
      var isWrite = isWriteApiMethod(method),
      fallback = isWrite ? cfg("vercelWriteProxyServerTimeoutMs", cfg("vercelProxyServerTimeoutMs", 50e3)): cfg("vercelReadProxyServerTimeoutMs", cfg("vercelProxyServerTimeoutMs", 45e3)),
      raw = Number(options && (options.proxyTimeoutMs || options.gasTimeoutMs || options.serverTimeoutMs) || fallback || 52e3) || 52e3; 
      return Math.max(5e3, Math.min(raw, 54e3))
    }
    function runVercelApiProxy(method, payload, options) {
      if (method = text(method).trim(), !method)return Promise.reject(bridgeError("method required",
          "METHOD_REQUIRED", method)); 
      var url = vercelApiProxyUrl(),
      clientTimeoutMs = proxyClientTimeoutMs(method, options || {}),
      serverTimeoutMs = proxyServerTimeoutMs(method, options || {}),
      body = {
        method,
        payload: payload == null ? {
        }
        : payload,
        timeoutMs: serverTimeoutMs,
        releaseStamp: PHASE_RELEASE_STAMP,
        source: "vercel-client-proxy-phaseN"
      }
      ; 
      return fetchJsonWithTimeout(url, {
          method: "POST",
          credentials: "same-origin",
          cache: "no-store",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            Accept: "application/json",
            "X-Production-Vercel-Proxy": PHASE_RELEASE_STAMP,
            "X-Client-Proxy-Timeout-Ms": String(clientTimeoutMs),
            "X-GAS-Proxy-Timeout-Ms": String(serverTimeoutMs)
          }
          ,
          body: JSON.stringify(body)
        }
        , clientTimeoutMs, method).then(function(result) {
          return result = isObj(result) ? result: {
            ok: !1,
            error: "empty Vercel proxy response",
            errorCode: "VERCEL_PROXY_EMPTY_RESPONSE",
            method
          }
          ,
          result.method = result.method || method,
          result.transport = result.transport || "vercel-api-proxy",
          result.releaseStamp = result.releaseStamp || PHASE_RELEASE_STAMP,
          result.meta = Object.assign({
            }
            , isObj(result.meta) ? result.meta: {
            }
            , {
              clientVercelProxy: !0,
              productionCurrent: !0,
              clientTimeoutMs: clientTimeoutMs,
              proxyServerTimeoutMs: serverTimeoutMs,
              legacyTransportRemoved: !0,
              releaseStamp: PHASE_RELEASE_STAMP,
              transport: result.transport || "vercel-api-proxy"
            }
          ),
          result
        }
      )
    }
    function runVercelLoginProxy(payload) {
      payload = isObj(payload) ? payload: {
      }
      ; 
      var username = text(payload.username || payload.user || payload.userId || payload.email || "").trim(),
      password = text(payload.password || payload.pass || payload.pwd || "").trim(); 
      if (!username)return Promise.reject(bridgeError("กรุณาระบุ username ก่อนเข้าสู่ระบบ", "USERNAME_REQUIRED",
          "apiLogin")); 
      if (!password)return Promise.reject(bridgeError("กรุณาระบุ password ก่อนเข้าสู่ระบบ", "PASSWORD_REQUIRED",
          "apiLogin")); 
      var url = vercelLoginProxyUrl(),
      timeoutMs = Number(cfg("vercelLoginProxyTimeoutMs", 3e4)) || 3e4; 
      return fetchJsonWithTimeout(url, {
          method: "POST",
          credentials: "same-origin",
          cache: "no-store",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            Accept: "application/json",
            "X-Production-Vercel-Proxy": PHASE_RELEASE_STAMP
          }
          ,
          body: JSON.stringify({
              method: "apiLogin",
              payload,
              releaseStamp: PHASE_RELEASE_STAMP,
              source: "vercel-login-proxy-phaseN"
            }
          )
        }
        , timeoutMs, "apiLogin").then(function(result) {
          return result = isObj(result) ? result: {
            ok: !1,
            error: "empty login proxy response",
            errorCode: "VERCEL_LOGIN_PROXY_EMPTY_RESPONSE",
            method: "apiLogin"
          }
          ,
          result.method = result.method || "apiLogin",
          result.transport = result.transport || "vercel-login-proxy",
          result.releaseStamp = result.releaseStamp || PHASE_RELEASE_STAMP,
          result.meta = Object.assign({
            }
            , isObj(result.meta) ? result.meta: {
            }
            , {
              clientVercelProxy: !0,
              productionCurrent: !0,
              loginProxy: !0,
              legacyTransportRemoved: !0,
              releaseStamp: PHASE_RELEASE_STAMP
            }
          ),
          result
        }
      )
    }
    function loadPublicConfig() {
      if (publicConfigInFlight)return publicConfigInFlight; 
      var url = vercelPublicConfigProxyUrl(); 
      return publicConfigInFlight = fetchJsonWithTimeout(url, {
          method: "GET",
          credentials: "same-origin",
          cache: "no-store",
          headers: {
            Accept: "application/json",
            "X-Production-Vercel-Proxy": PHASE_RELEASE_STAMP
          }
        }
        , Number(cfg("vercelPublicConfigProxyTimeoutMs", cfg("publicConfigTimeoutMs", 8e3))) || 8e3,
        "__publicConfig").then(function(data) {
          if (data && data.ok) {
            lastPublicConfig = data; 
            var logo = text(data.logoUrl || data.appLogo &&(data.appLogo.active || data.appLogo.svg) || ""); 
            logo && !isBadLogo(logo) && setLogo(logo, "vercel-public-config-proxy"); 
            try {
              var rel = releaseStatus(); 
              rel.ok || recordApiMetric({
                  kind: "release-mismatch",
                  method: "__vercelPublicConfig",
                  transport: "vercel-public-config-proxy",
                  error: !0,
                  message: JSON.stringify(rel.mismatch)
                }
              )
            } 
            catch (_) {
            }
          }
          return data || null
        }
        , function(err) {
          return recordApiMetric({
              kind: "call",
              method: "__vercelPublicConfig",
              transport: "vercel-public-config-proxy",
              error: !0,
              message: err && err.message || String(err || "")
            }
          ),
          null
        }
      ).then(function(v) {
          return publicConfigInFlight = null,
          v
        }
        , function(e) {
          throw publicConfigInFlight = null,
          e
        }
      )
    }
    function cloneJson(value) {
      try {
        return value == null ? value: JSON.parse(JSON.stringify(value))
      } 
      catch (_) {
        return value
      }
    }
    function readCacheTtlMs(payload) {
      var ttl = Number(payload && payload.cacheTtlSeconds);
      if (isFinite(ttl) && ttl > 0)return Math.max(5000, Math.min(ttl * 1000, Number(cfg("clientReadCacheMaxTtlMs", 120000)) || 120000)); 
      return Number(cfg("clientReadCacheTtlMs", 60000)) || 60000
    }
    function readStaleIfErrorMs(payload) {
      var ttl = Number(cfg("clientReadStaleIfErrorMs", 600000)) || 600000;
      return Math.max(0, Math.min(ttl, 1800000))
    }
    function readRetryCount(method, payload) {
      if (payloadWantsFresh(payload))return 1; 
      return Math.max(0, Math.min(Number(cfg("clientReadRetryCount", 1)) || 0, 2))
    }
    function isTransientCode(code) {
      return /(?:TIMEOUT|FETCH|NETWORK|FAILED|ABORT|TEMPORARY|RESPONSE_NOT_JSON|RETURNED_HTML|HTTP_ERROR|502|503|504)/i.test(text(code))
    }
    function isTransientResult(result) {
      if (!isObj(result) || result.ok !== !1)return !1; 
      var code = text(result.errorCode || result.code || result.status || result.httpStatus || result.error || "");
      return isTransientCode(code)
    }
    function isTransientError(err) {
      var code = text(err && (err.errorCode || err.code || err.name || err.message) || err || "");
      return isTransientCode(code)
    }
    function waitMs(ms) {
      return new Promise(function(resolve) {
        setTimeout(resolve, Math.max(0, Number(ms) || 0))
      })
    }
    function runVercelApiProxyReadWithRetry(method, payload, options, retries) {
      var attempt = 0;
      function once() {
        return runVercelApiProxy(method, payload || {
          }
          , options || {
          }
        ).then(function(result) {
            if (attempt < retries && isTransientResult(result)) {
              attempt += 1;
              recordApiMetric({
                  kind: "retry",
                  method: method,
                  transport: "vercel-api-proxy",
                  attempt: attempt,
                  errorCode: text(result.errorCode || result.code || result.error || "")
                }
              );
              return waitMs(Number(cfg("clientReadRetryDelayMs", 350)) || 350).then(once)
            }
            return result
          }
          , function(err) {
            if (attempt < retries && isTransientError(err)) {
              attempt += 1;
              recordApiMetric({
                  kind: "retry",
                  method: method,
                  transport: "vercel-api-proxy",
                  attempt: attempt,
                  error: !0,
                  message: err && err.message || String(err || "")
                }
              );
              return waitMs(Number(cfg("clientReadRetryDelayMs", 350)) || 350).then(once)
            }
            throw err
          }
        )
      }
      return once()
    }
    function runReadWithPolicy(method, payload, options) {
      method = text(method).trim(); 
      payload = isObj(payload) ? payload: {
      }
      ;
      options = options || {
      }
      ;
      var transport = "vercel-api-proxy",
      wantsFresh = payloadWantsFresh(payload),
      cacheAllowed = cfg("clientApiCacheEnabled", cfg("clientReadResponseCacheEnabled", !0)) !== !1 && isCacheSafeReadMethod(method),
      canReadCache = cacheAllowed && !wantsFresh,
      dedupe = cfg("clientInFlightDedupe", !0) !== !1 && isCacheSafeReadMethod(method),
      key = stableKey(method, payload || {
        }
      ),
      cacheKey = apiCacheEpoch + "|" + key,
      now = Date.now ? Date.now(): + new Date,
      cached = apiReadCache[cacheKey] || null,
      started = now; 
      if (canReadCache && cached && cached.expiresAt > now) {
        recordApiMetric({
            kind: "cache",
            method,
            transport,
            cacheHit: !0,
            cacheEpoch: apiCacheEpoch
          }
        );
        return Promise.resolve(annotateResult(cloneJson(cached.result), {
              clientDurationMs: 0,
              clientCacheHit: !0,
              clientReadResponseCache: !0,
              clientCacheEpoch: apiCacheEpoch,
              transport,
              releaseStamp: PHASE_RELEASE_STAMP
            }
          ))
      }
      if (dedupe && apiInFlight[key])return recordApiMetric({
          kind: "dedupe",
          method,
          transport,
          dedupeHit: !0,
          clientReadResponseCache: cacheAllowed
        }
      ),
      apiInFlight[key].then(function(result) {
          return annotateResult(result, {
              clientDedupeHit: !0,
              clientInFlightOnly: !0,
              clientReadResponseCache: cacheAllowed,
              transport,
              releaseStamp: PHASE_RELEASE_STAMP
            }
          )
        }
      ); 
      function useStale(failed, err) {
        var t = Date.now ? Date.now(): + new Date;
        if (cached && cached.staleUntil > t) {
          recordApiMetric({
              kind: "stale-if-error",
              method,
              transport,
              cacheHit: !0,
              error: !!err || !!(failed && failed.ok === !1),
              message: err && err.message || failed && (failed.error || failed.errorCode) || "read failed"
            }
          );
          return annotateResult(cloneJson(cached.result), {
              clientCacheHit: !0,
              clientStaleIfError: !0,
              clientStaleAgeMs: Math.max(0, t - Number(cached.fetchedAt || t)),
              originalErrorCode: err && (err.errorCode || err.code) || failed && (failed.errorCode || failed.code) || "",
              originalError: err && err.message || failed && failed.error || "",
              transport,
              releaseStamp: PHASE_RELEASE_STAMP
            }
          )
        }
        if (err)throw err; 
        return failed
      }
      var promise = runVercelApiProxyReadWithRetry(method, payload || {
        }
        , options || {
        }
        , readRetryCount(method, payload)).then(function(result) {
          var durationMs = Math.max(0, (Date.now ? Date.now(): + new Date) - started),
          annotated;
          if (isTransientResult(result))return useStale(result, null); 
          annotated = annotateResult(result, {
              clientDurationMs: durationMs,
              clientCacheHit: !1,
              clientReadResponseCache: cacheAllowed,
              clientInFlightOnly: !0,
              transport,
              releaseStamp: PHASE_RELEASE_STAMP
            }
          );
          if (cacheAllowed && result && result.ok !== !1) {
            var writtenAt = Date.now ? Date.now(): + new Date,
            ttlMs = readCacheTtlMs(payload),
            staleMs = readStaleIfErrorMs(payload); 
            apiReadCache[cacheKey] = {
              result: cloneJson(annotated),
              fetchedAt: writtenAt,
              expiresAt: writtenAt + ttlMs,
              staleUntil: writtenAt + ttlMs + staleMs,
              method: method,
              cacheEpoch: apiCacheEpoch
            };
            recordApiMetric({
                kind: "cache-write",
                method,
                transport,
                cacheWrite: !0,
                ttlMs: ttlMs,
                staleIfErrorMs: staleMs,
                cacheEpoch: apiCacheEpoch
              }
            )
          }
          return recordApiMetric({
              kind: "call",
              method,
              transport,
              durationMs
            }
          ),
          annotated
        }
        , function(err) {
          var stale = useStale(null, err); 
          if (stale)return stale; 
          throw recordApiMetric({
              kind: "call",
              method,
              transport,
              error: !0,
              message: err && err.message || String(err || ""),
              durationMs: Math.max(0, (Date.now ? Date.now(): + new Date) - started)
            }
          ),
          err
        }
      ); 
      return dedupe &&(apiInFlight[key] = promise, promise.then(function() {
            delete apiInFlight[key]
          }
          , function() {
            delete apiInFlight[key]
          }
        )),
      promise
    }
    function runWriteWithPolicy(method, payload, options) {
      return method = text(method).trim(),
      invalidateClientApiCache("before-write", method),
      runVercelApiProxy(method, payload || {
        }
        , options || {
        }
      ).then(function(result) {
          return invalidateClientApiCache(result && result.ok !== !1 ? "after-write-ok": "after-write-rejected",
            method),
          annotateResult(result, {
              clientCacheInvalidated: !0,
              cacheEpoch: apiCacheEpoch,
              productionWriteCacheInvalidation: !0,
              transport: "vercel-api-proxy",
              releaseStamp: PHASE_RELEASE_STAMP
            }
          )
        }
        , function(err) {
          throw invalidateClientApiCache("after-write-error", method),
          err
        }
      )
    }
    function localBase() {
      return text(cfg("localAssetBase", "./partials/"))
    }
    function bundleFiles(name) {
      var key = text(name).replace(/^bundle:/i, ""),
      b = manifest && manifest.bundles && manifest.bundles[key]; 
      return b && Array.isArray(b.files) ? b.files.slice(): []
    }
    function uniquePush(list, value) {
      value = text(value).trim(),
      value && list.indexOf(value) < 0 && list.push(value)
    }
    function ensureSlash(value) {
      return value = text(value).trim(),
      value && value.charAt(value.length - 1) !== "/" ? value + "/": value
    }
    function scriptDirectory() {
      try {
        for (var scripts = doc.querySelectorAll("script[src]"), i = scripts.length - 1; 
          i >= 0; 
          i--) {
          var src = scripts[i].getAttribute("src") || ""; 
          if (/github-gas-transport\.js/i.test(src))return new URL(".", scripts[i].src || src).href
        }
      } 
      catch (_) {
      }
      try {
        return new URL(".", root.location && root.location.href || doc.baseURI || "./").href
      } 
      catch (_) {
        return "./"
      }
    }
    function pageDirectories() {
      var out = []; 
      try {
        var u = new URL(root.location && root.location.href || doc.baseURI || "./"),
        parts = u.pathname.split("/"); 
        for (/\/$/.test(u.pathname) || parts.pop(); 
          parts.length > 0; 
        ) {
          var path = parts.join("/"); 
          if (path ||(path = "/"), path.charAt(0) !== "/" &&(path = "/" + path), path.charAt(path.length - 1) !== "/" &&(path += "/"),
            uniquePush(out, u.origin + path), path === "/")break; 
          parts.pop()
        }
      } 
      catch (_) {
      }
      return out
    }
    function assetBaseCandidates() {
      var c = [],
      conf = root.APP_CONFIG || {
      }
      ,
      arr = Array.isArray(conf.localAssetBaseCandidates) ? conf.localAssetBaseCandidates: []; 
      uniquePush(c, localBase()),
      arr.forEach(function(x) {
          uniquePush(c, x)
        }
      ); 
      try {
        uniquePush(c, new URL("./partials/", scriptDirectory()).href)
      } 
      catch (_) {
      }
      try {
        uniquePush(c, new URL("../partials/", scriptDirectory()).href)
      } 
      catch (_) {
      }
      return pageDirectories().forEach(function(d) {
          try {
            uniquePush(c, new URL("partials/", d).href)
          } 
          catch (_) {
          }
        }
      ),
      uniquePush(c, "./partials/"),
      uniquePush(c, "partials/"),
      uniquePush(c, "../partials/"),
      c
    }
    function fileUrlFromBase(base, file) {
      return ensureSlash(base) + encodeURIComponent(file) + ".html"
    }
    function inlinePartialMap() {
      if (cfg("inlinePartialsEnabled", !1) !== !0)return null; 
      var map = root.__APP_INLINE_PARTIALS__ || root.APP_CONFIG && root.APP_CONFIG.inlinePartials || null; 
      return map && typeof map == "object" ? map: null
    }
    function withAssetStamp(url) {
      var m = root.APP_CONFIG && root.APP_CONFIG.assetManifest || root.__APP_ASSET_MANIFEST__ || manifest || {
      }
      ,
      boot = root.__APP_BOOTSTRAP__ || {
      }
      ,
      release = root.APP_CONFIG && root.APP_CONFIG.releaseManifest || {
      }
      ,
      stamp = text(m && m.stamp || cfg("assetStamp", "") || boot.assetStamp || release.cacheBustVersion || release.stamp || PHASE_ASSET_STAMP); 
      return stamp ? url +(url.indexOf("?") >= 0 ? "&": "?") + "v=" + encodeURIComponent(stamp): url
    }
    function getInlinePartial(file) {
      file = text(file).trim(); 
      var map = inlinePartialMap(); 
      return!map || !safeName(file) ? null: Object.prototype.hasOwnProperty.call(map, file) ? text(map[file]): Object.prototype.hasOwnProperty.call(map,
        file + ".html") ? text(map[file + ".html"]): null
    }
    function fetchFile(file) {
      if (file = text(file).trim(), !safeName(file))return Promise.reject(bridgeError("ไม่อนุญาตให้โหลด asset: " + file,
          "ASSET_NAME_REJECTED")); 
      if (Object.prototype.hasOwnProperty.call(cache, file))return Promise.resolve(cache[file]); 
      if (assetInFlight[file])return assetInFlight[file]; 
      var inline = getInlinePartial(file); 
      if (inline != null && inline !== "") {
        cache[file] = inline; 
        try {
          root.__APP_ASSET_BASE_RESOLVED__ = root.__APP_ASSET_BASE_RESOLVED__ || {
          }
          ,
          root.__APP_ASSET_BASE_RESOLVED__[file] = "index.inline.__APP_INLINE_PARTIALS__"
        } 
        catch (_) {
        }
        return Promise.resolve(inline)
      }
      var urls = assetBaseCandidates().map(function(base) {
          return fileUrlFromBase(base, file)
        }
      ),
      tried = []; 
      function tryAt(i) {
        if (i >= urls.length) {
          var err = bridgeError("โหลด asset ไม่สำเร็จ: " + file + " \u2014 ตรวจไม่พบไฟล์ใน partials paths: " + tried.join(", "),
            "ASSET_LOAD_FAILED"); 
          err.triedUrls = tried.slice(); 
          try {
            root.__APP_ASSET_LAST_404S__ = root.__APP_ASSET_LAST_404S__ || {
            }
            ,
            root.__APP_ASSET_LAST_404S__[file] = tried.slice()
          } 
          catch (_) {
          }
          throw err
        }
        var url = urls[i]; 
        return tried.push(url),
        fetch(withAssetStamp(url), {
            credentials: "same-origin",
            cache: "force-cache"
          }
        ).then(function(resp) {
            return resp.ok ? resp.text().then(function(html) {
                cache[file] = html; 
                try {
                  root.__APP_ASSET_BASE_RESOLVED__ = root.__APP_ASSET_BASE_RESOLVED__ || {
                  }
                  ,
                  root.__APP_ASSET_BASE_RESOLVED__[file] = url
                } 
                catch (_) {
                }
                return html
              }
            ): tryAt(i + 1)
          }
          , function() {
            return tryAt(i + 1)
          }
        )
      }
      return assetInFlight[file] = tryAt(0).then(function(html) {
          return delete assetInFlight[file],
          html
        }
        , function(err) {
          throw delete assetInFlight[file],
          err
        }
      )
    }
    function localInclude(name) {
      name = text(name).trim(); 
      var files = /^bundle:/i.test(name) ? bundleFiles(name): [name]; 
      return files.length ? Promise.all(files.map(fetchFile)).then(function(parts) {
          return {
            ok: !0,
            data: {
              name,
              html: parts.join(`
                `),
              loadedAt: new Date().toISOString(),
              local: !0
            }
            ,
            msg: "โหลด partial จาก Vercel static สำเร็จ"
          }
        }
      ): Promise.reject(bridgeError("ไม่พบ bundle/asset: " + name, "ASSET_NOT_FOUND"))
    }
    function apiEnvelope(fn, args) {
      var method = text(fn).trim(),
      payload = args; 
      return method === "apiRouter" && isObj(args) &&(method = text(args.method || args.action || "").trim(),
        payload = args.payload || args.params || args.data || {
        }
      ),
      {
        method,
        payload: payload == null ? {
        }
        : payload
      }
    }
    function applyImageAttrs(img) {
      try {
        img.setAttribute("loading", img.id === "login-logo-img" ? "eager": "lazy"),
        img.setAttribute("decoding", img.id === "login-logo-img" ? "sync": "async"),
        img.setAttribute("fetchpriority", img.id === "login-logo-img" ? "high": "auto")
      } 
      catch (_) {
      }
    }
    function setLogo(url, source) {
      url = normalizeUrl(url || FALLBACK_LOGO),
      (!isSafeLogoUrl(url) || isBadLogo(url)) &&(url = FALLBACK_LOGO),
      root.APP_CONFIG = root.APP_CONFIG || {
      }
      ,
      root.APP_CONFIG.logoUrl = url,
      root.APP_LOGO = root.APP_LOGO || {
      }
      ,
      root.APP_LOGO.active = url,
      root.APP_LOGO.svg = url,
      root.APP_LOGO.png96 = url,
      root.APP_LOGO.png192 = url,
      root.APP_LOGO.png512 = url,
      root.DEFAULT_LOGO = url,
      root.LOGO_URL = url,
      root.currentLogoUrl = url,
      root.__SAFE_LOGO_URL__ = url,
      root.__APP_PARLIAMENT_LOGO__ = url; 
      try {
        url !== FALLBACK_LOGO && root.localStorage && root.localStorage.setItem("APP_LOGO_URL", url)
      } 
      catch (_) {
      }
      try {
        var nodes = doc.querySelectorAll('[data-logo="parliament"],#login-logo-img,#side-logo-img,#mobile-topbar-logo,#summary-logo-img,#ps-ai-print-logo,#report-logo-img,.print-logo-img'); 
        Array.prototype.forEach.call(nodes, function(img) {
            !img || !img.setAttribute ||(applyImageAttrs(img), img.onerror = function() {
                try {
                  var bad = img.getAttribute("src") || url; 
                  markBadLogo(bad),
                  img.onerror = null,
                  img.setAttribute("src", FALLBACK_LOGO)
                } 
                catch (_) {
                }
              }
              , img.style.display = "", img.style.visibility = "visible", img.classList && img.classList.add("logo-loaded"), img.getAttribute("src") !== url && img.setAttribute("src", url),
              img.dataset.logoSource = source || "app-config")
          }
        )
      } 
      catch (_) {
      }
      try {
        root.updateLogos && root.updateLogos(url)
      } 
      catch (_) {
      }
      try {
        root.patchParliamentLogo && root.patchParliamentLogo()
      } 
      catch (_) {
      }
      return!0
    }
    function releaseStatus() {
      var configStamp = text(cfg("releaseStamp", PHASE_RELEASE_STAMP) || PHASE_RELEASE_STAMP),
      manifestObj = root.APP_CONFIG && root.APP_CONFIG.assetManifest || root.__APP_ASSET_MANIFEST__ || {
      }
      ,
      assetStamp = text(manifestObj && manifestObj.stamp || cfg("assetStamp", PHASE_ASSET_STAMP)),
      publicStamp = text(lastPublicConfig &&(lastPublicConfig.backendReleaseStamp || lastPublicConfig.upstreamReleaseStamp || lastPublicConfig.releaseStamp || lastPublicConfig.stamp) || ""),
      backendAssetStamp = text(lastPublicConfig &&(lastPublicConfig.backendAssetStamp || lastPublicConfig.upstreamAssetStamp || lastPublicConfig.assetStamp) || ""),
      mismatch = [],
      warnings = []; 
      configStamp && configStamp !== PHASE_RELEASE_STAMP && mismatch.push({
          field: "client-config-releaseStamp",
          expected: PHASE_RELEASE_STAMP,
          actual: configStamp
        }
      );
      publicStamp && publicStamp !== PHASE_RELEASE_STAMP && warnings.push({
          field: "backend-public-releaseStamp",
          expected: PHASE_RELEASE_STAMP,
          actual: publicStamp,
          severity: "warning",
          reason: "frontend-and-gas-deployments-may-be-rolled-out-independently"
        }
      );
      backendAssetStamp && assetStamp && backendAssetStamp !== assetStamp && warnings.push({
          field: "backend-assetStamp",
          expected: assetStamp,
          actual: backendAssetStamp,
          severity: "warning",
          reason: "backend-public-config-asset-stamp-does-not-control-vercel-static-assets"
        }
      );
      lastReleaseMismatch = mismatch.length ? mismatch: null;
      return {
        ok: !mismatch.length,
        expectedStamp: PHASE_RELEASE_STAMP,
        clientStamp: PHASE_RELEASE_STAMP,
        configStamp: configStamp,
        assetStamp: assetStamp,
        backendReleaseStamp: publicStamp,
        backendAssetStamp: backendAssetStamp,
        mismatch: mismatch,
        warnings: warnings
      }
    }
    root.AppTransport = root.AppTransport || {
    }
    ,
    root.AppTransport.__vercelApiProxyOnly = !0,
    root.AppTransport.__gasDirectWhenHostedInGas = !1,
    root.AppTransport.__legacyTransportRemoved = !0,
    root.AppTransport.__staticGasDirectDisabled = !0,
    root.AppTransport.__singleTransportPathPhase2 = !0,
    root.AppTransport.__clientCacheSingleOwner = "backend-router-cache",
    root.AppTransport.__clientInFlightOwner = "AppTransport.inFlightOnly",
    root.AppTransport.__clientReadResponseCacheDisabled = !1,
    root.AppTransport.__clientReadResponseCacheEnabled = !0,
    root.AppTransport.__sessionStorageReadCacheDisabled = !0,
    root.AppTransport.transportMode = PHASE_TRANSPORT_MODE,
    root.AppTransport.bridgeClientState = function() {
      return {
        ready: !1,
        loaded: !1,
        assumedReady: !1,
        removed: !0,
        mode: PHASE_TRANSPORT_MODE
      }
    }
    ,
    root.AppTransport.phase2Status = function() {
      var release = releaseStatus(); 
      return {
        ok: release.ok,
        stamp: PHASE_RELEASE_STAMP,
        phase: "Production current Remove Legacy Transport",
        release,
        releaseMismatch: release.mismatch,
        transportMode: PHASE_TRANSPORT_MODE,
        vercelApiProxyEnabled: !0,
        hostingTarget: cfg("hostingTarget", "vercel-api-proxy"),
        legacyTransportRemoved: !0,
        jsonpRemoved: !0,
        hiddenBridgeRemoved: !0,
        loginPostIframeRemoved: !0,
        gasDirectAvailable: gasDirectAvailable(),
        fastLoginJsonpDisabled: !0,
        allowAssumedBridgeReady: !1,
        securityHardening: cfg("securityHardening", !0) !== !1,
        contractFinalCleanup: cfg("contractGateEnabled", !0) !== !1,
        runtimeSlimmingEnabled: cfg("runtimeSlimmingEnabled", !0) !== !1,
        writeSchemaUnification: cfg("writeSchemaUnification", !0) !== !1,
        vercelStaticFrontendReady: cfg("vercelStaticFrontendReady", !0) !== !1,
        legacyTransportRemoved: cfg("legacyTransportRemoved", !0) !== !1,
        releaseGate: cfg("releaseGate", "tools/phaseN_legacy_transport_gate.py"),
        syncTool: cfg("syncTool", "tools/phaseN_legacy_transport_gate.py"),
        singleSourceRoot: cfg("canonicalPartialRoot", "gas-backend"),
        generatedMirrorPolicy: cfg("generatedMirrorPolicy", "edit-gas-backend-run-sync-do-not-edit-generated-mirrors"),
        clientApiCacheEnabled: cfg("clientApiCacheEnabled", !0) !== !1,
        clientReadResponseCacheEnabled: !0,
        clientReadCacheEntries: Object.keys(apiReadCache).length,
        clientInFlightDedupe: cfg("clientInFlightDedupe", !0) !== !1,
        clientCacheOwner: "backend-router-cache",
        clientInFlightOwner: "AppTransport.inFlightOnly",
        sessionStorageReadCache: !1,
        cacheEntries: Object.keys(apiReadCache).length,
        inFlight: Object.keys(apiInFlight).length,
        assetCacheEntries: Object.keys(cache).length,
        assetInFlight: Object.keys(assetInFlight).length,
        publicConfigInFlight: !!publicConfigInFlight,
        cacheEpoch: apiCacheEpoch,
        metrics: Object.assign({
          }
          , apiMetrics),
        bridge: root.AppTransport.bridgeClientState(),
        proxy: {
          enabled: !0,
          apiUrl: vercelApiProxyUrl(),
          loginUrl: vercelLoginProxyUrl(),
          publicConfigUrl: vercelPublicConfigProxyUrl()
        }
      }
    };
    function runtimeOwnerStatus() {
      var release = releaseStatus(), errors = [], mode = text(root.AppTransport && root.AppTransport.transportMode || "");
      root.AppTransport && root.AppTransport.__vercelApiProxyOnly === !0 || errors.push("VERCEL_PROXY_OWNER_FLAG_MISSING");
      root.AppTransport && root.AppTransport.__gasHostedDirect === !0 && errors.push("GAS_DIRECT_OWNER_ACTIVE_ON_VERCEL");
      /^production-vercel-proxy-only/.test(mode) || errors.push("VERCEL_PROXY_MODE_MISMATCH");
      isGoogleHostedFrontend() && errors.push("VERCEL_TRANSPORT_LOADED_ON_GOOGLE_HOST");
      if (!release.ok) errors.push("CLIENT_RELEASE_STAMP_MISMATCH");
      return {
        ok: !errors.length,
        host: text(root.location && root.location.hostname || ""),
        expectedOwner: "vercel-api-proxy",
        actualOwner: text(root.AppTransport && root.AppTransport.__owner || "github-pages/github-gas-transport.js::vercel-api-proxy"),
        transportMode: mode,
        release: release,
        errors: errors
      }
    }
    function assertRuntimeOwner(context) {
      var status = runtimeOwnerStatus();
      if (status.ok)return status;
      var err = bridgeError("Runtime/Transport ไม่ตรงกับ host หรือ release ปัจจุบัน กรุณารีเฟรชหน้าเว็บหลัง deploy ล่าสุด", "APP_RUNTIME_OWNER_MISMATCH", context || "runtime-owner");
      err.runtimeHealth = status;
      throw err
    }
    root.AppTransport.releaseStatus = releaseStatus,
    root.AppTransport.runtimeOwnerStatus = runtimeOwnerStatus,
    root.AppTransport.assertRuntimeOwner = assertRuntimeOwner,
    root.AppTransport.clientCacheStatus = function() {
      return {
        ok: !0,
        owner: "backend-router-cache",
        inFlightOwner: "AppTransport.inFlightOnly",
        readResponseCache: !1,
        sessionStorageReadCache: !1,
        cacheEntries: Object.keys(apiReadCache).length,
        inFlight: Object.keys(apiInFlight).length,
        cacheEpoch: apiCacheEpoch,
        metrics: Object.assign({
          }, apiMetrics)
      }
    },
    root.AppTransport.phase1Status = root.AppTransport.phase2Status,
    root.AppTransport.phase0Status = root.AppTransport.phase2Status,
    root.AppTransport.clearApiCache = function(reason) {
      return invalidateClientApiCache(reason || "manual-clear", "__manual__"),
      apiMetrics.cacheHits = 0,
      apiMetrics.cacheWrites = 0,
      apiMetrics.dedupeHits = 0,
      apiMetrics.last = [],
      !0
    }
    ,
    root.AppTransport.run = function(fn, args, options) {
      assertRuntimeOwner("api:" + text(fn || ""));
      var req = apiEnvelope(fn, args || {
        }
      ); 
      if (/^getDeferredInclude$/i.test(req.method)) {
        var name = req.payload &&(req.payload.name || req.payload.partial || req.payload.file) || ""; 
        return localInclude(name)
      }
      return /^apiLogin$/i.test(req.method) ? runVercelLoginProxy(req.payload || {
        }
      ): isWriteApiMethod(req.method) ? runWriteWithPolicy(req.method, req.payload || {
        }
        , options || {
        }
      ): isReadApiMethod(req.method) ? runReadWithPolicy(req.method, req.payload || {
        }
        , options || {
        }
      ): runVercelApiProxy(req.method, req.payload || {
        }
        , options || {
        }
      )
    }
    ,
    root.AppTransport.setGasWebAppUrl = function() {
      return ""
    }
    ,
    root.AppTransport.setLogoUrl = function(url) {
      return setLogo(url, "manual")
    }
    ,
    root.AppTransport.ping = function() {
      return runVercelApiProxy("apiGetRouteContract", {
          at: new Date().toISOString(),
          transportMode: "vercel-api-proxy-only-ping",
          productionCurrent: !0
        }
      )
    }
    ,
    root.AppTransport.loadPublicConfig = loadPublicConfig,
    root.AppTransport.runVercelApiProxy = runVercelApiProxy,
    root.AppTransport.runVercelLoginProxy = runVercelLoginProxy,
    root.AppTransport.invalidateClientApiCache = invalidateClientApiCache,
    root.AppTransport.vercelProxyEnabled = vercelProxyEnabled,
    root.AppTransport.ensureBridgeClient = function() {
      return Promise.reject(bridgeError("Production current: legacy hidden GAS bridge transport ถูกถอดออกจาก Vercel runtime แล้ว ให้เรียกผ่าน /api/gas เท่านั้น",
          "LEGACY_TRANSPORT_REMOVED"))
    }
    ; 
    try {
      setLogo(cfg("logoUrl", FALLBACK_LOGO), "app-config")
    } 
    catch (_) {
    }
    doc.readyState === "loading" ? doc.addEventListener("DOMContentLoaded", function() {
        setLogo(cfg("logoUrl", FALLBACK_LOGO), "app-config-dom"),
        loadPublicConfig()
      }
      , {
        once: !0
      }
    ): (setLogo(cfg("logoUrl", FALLBACK_LOGO), "app-config-dom"), loadPublicConfig())
  }
)(typeof window != "undefined" ? window: globalThis, typeof document != "undefined" ? document: null);
