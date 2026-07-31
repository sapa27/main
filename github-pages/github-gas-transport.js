(function (root, doc) {
  "use strict";
  if (!root || !doc) return;

  var RELEASE_STAMP = String((root.APP_CONFIG || {}).releaseStamp || "commission-v1.2-gas-hosted-production-2026-07-17-r148");
  var ASSET_STAMP = String((root.APP_CONFIG || {}).assetStamp || "asset-manifest-commission-v1.2-gas-hosted-production-2026-07-17-r148");
  var OWNER = "github-pages/github-gas-transport.js::vercel-api-proxy-only";
  var MODE = "vercel-api-proxy-only";
  var assetCache = Object.create(null);
  var assetInFlight = Object.create(null);
  var apiInFlight = Object.create(null);
  var readCache = Object.create(null);
  var cacheEpoch = 0;
  var metrics = { calls: 0, cacheHits: 0, cacheWrites: 0, dedupeHits: 0, errors: 0, last: [] };

  function text(value) {
    return value == null ? "" : String(value);
  }

  function isObject(value) {
    return !!value && typeof value === "object" && !Array.isArray(value);
  }

  function config(name, fallback) {
    var cfg = root.APP_CONFIG || {};
    return cfg[name] == null || cfg[name] === "" ? fallback : cfg[name];
  }

  function transportError(message, code, method, detail) {
    var err = new Error(message);
    err.code = code || "VERCEL_PROXY_ERROR";
    err.errorCode = err.code;
    err.method = method || "";
    err.transportMode = MODE;
    if (detail) err.detail = detail;
    return err;
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
      if (metrics.last.length > 30) metrics.last.shift();
    } catch (_) {}
  }

  function requestId(method) {
    return "vx_" + text(method || "api") + "_" + Date.now() + "_" + Math.random().toString(36).slice(2);
  }

  function normalizeEndpoint(value, fallback) {
    value = text(value || fallback).trim();
    if (!value) return fallback;
    try {
      var url = new URL(value, root.location && root.location.origin || undefined);
      if (root.location && url.origin !== root.location.origin) {
        throw transportError("Vercel proxy endpoint ต้องเป็น same-origin", "VERCEL_PROXY_CROSS_ORIGIN_BLOCKED");
      }
      return url.pathname + url.search;
    } catch (err) {
      if (err && err.code) throw err;
      return fallback;
    }
  }

  function endpointFor(method) {
    return /^apiLogin$/i.test(text(method).trim())
      ? normalizeEndpoint(config("vercelLoginProxyUrl", "/api/login"), "/api/login")
      : normalizeEndpoint(config("vercelApiProxyUrl", "/api/gas"), "/api/gas");
  }

  function isWriteMethod(method) {
    method = text(method).trim();
    return !!method && (/^api(?:Save|Delete|Update|Create|Import|Extract|Upload|Issue|Process|Cleanup|Generate|Send|Patch|Approve|Reject|Submit|Queue|Migrate|Revoke|Refresh)/i.test(method) || /^api(?:Admin)?(?:Save|Delete|Update|Create)/i.test(method) || /^apiBudget(?:Save|Delete|Import)/i.test(method));
  }

  function isReadMethod(method) {
    method = text(method).trim();
    return !!method && !/^api(Login|Logout)$/i.test(method) && !isWriteMethod(method);
  }

  function isCacheSafeRead(method) {
    return isReadMethod(method) && !/^(apiSessionResume|apiSessionCheck|apiVerifySession|apiBootstrap|apiIssueActionToken|apiGetRouteContract|apiGetPhase0ContractGate|apiGetPhase1Contract|apiGetPhase2Contract|apiGetClientDataContract)$/i.test(text(method).trim());
  }

  function stableClone(value) {
    if (Array.isArray(value)) return value.map(stableClone);
    if (!isObject(value)) return value;
    var out = {};
    Object.keys(value).sort().forEach(function (key) {
      if (/^(token|_token|authToken|csrf|csrfToken|_csrf|_csrfToken|actionToken|csrfActionToken|_actionToken|password|pass|pwd)$/i.test(key)) return;
      if (/^(_|nonce|at|source|clientContext)$/i.test(key)) return;
      out[key] = stableClone(value[key]);
    });
    return out;
  }

  function stableKey(method, payload) {
    try {
      return method + "|" + JSON.stringify(stableClone(payload || {}));
    } catch (_) {
      return method + "|" + Date.now();
    }
  }

  function cloneJson(value) {
    try {
      return value == null ? value : JSON.parse(JSON.stringify(value));
    } catch (_) {
      return value;
    }
  }

  function wantsFresh(payload) {
    payload = isObject(payload) ? payload : {};
    return payload.forceFresh === true || payload.noCache === true || payload.bypassCache === true || Number(payload.cacheTtlSeconds) === 0;
  }

  function readTtlMs(payload) {
    var requested = Number(payload && payload.cacheTtlSeconds);
    var max = Number(config("clientReadCacheMaxTtlMs", 120000)) || 120000;
    if (isFinite(requested) && requested > 0) return Math.max(5000, Math.min(requested * 1000, max));
    return Number(config("clientReadCacheTtlMs", 60000)) || 60000;
  }

  function cachedRead(method, payload) {
    if (config("clientReadResponseCacheEnabled", true) === false || wantsFresh(payload) || !isCacheSafeRead(method)) return null;
    var hit = readCache[stableKey(method, payload)];
    if (hit && hit.expiresAt > Date.now()) {
      recordMetric({ kind: "cache", method: method, cacheHit: true, transport: MODE });
      return cloneJson(hit.value);
    }
    return null;
  }

  function putReadCache(method, payload, value) {
    if (config("clientReadResponseCacheEnabled", true) === false || wantsFresh(payload) || !isCacheSafeRead(method) || !isObject(value) || value.ok === false) return;
    var now = Date.now();
    var ttl = readTtlMs(payload);
    readCache[stableKey(method, payload)] = {
      value: cloneJson(value),
      expiresAt: now + ttl,
      staleUntil: now + (Number(config("clientReadStaleIfErrorMs", 600000)) || 600000)
    };
    recordMetric({ kind: "cache", method: method, cacheWrite: true, transport: MODE, ttlMs: ttl });
  }

  function staleRead(method, payload) {
    var hit = readCache[stableKey(method, payload)];
    return hit && hit.staleUntil > Date.now() ? cloneJson(hit.value) : null;
  }

  function invalidateCache(reason, method) {
    apiInFlight = Object.create(null);
    readCache = Object.create(null);
    cacheEpoch += 1;
    root.__APP_CLIENT_API_CACHE_EPOCH__ = cacheEpoch;
    recordMetric({ kind: "cache-invalidate", method: text(method), reason: text(reason || "write"), transport: MODE, cacheEpoch: cacheEpoch });
    return true;
  }

  function timeoutFor(method, options) {
    options = options || {};
    var value;
    if (/^apiLogin$/i.test(method)) value = options.loginTimeoutMs || options.timeoutMs || options.clientTimeoutMs || config("vercelLoginProxyTimeoutMs", 59000);
    else if (isWriteMethod(method)) value = options.timeoutMs || options.clientTimeoutMs || config("vercelWriteProxyClientTimeoutMs", 59000);
    else value = options.timeoutMs || options.clientTimeoutMs || config("vercelReadProxyClientTimeoutMs", 59000);
    value = Number(value) || 59000;
    return Math.max(5000, Math.min(value, 59000));
  }

  function serverTimeoutFor(method) {
    if (/^apiLogin$/i.test(method)) return Math.max(1000, Math.min(Number(config("vercelLoginProxyServerTimeoutMs", 50000)) || 50000, 55000));
    if (isWriteMethod(method)) return Math.max(1000, Math.min(Number(config("vercelWriteProxyServerTimeoutMs", 55000)) || 55000, 55000));
    return Math.max(1000, Math.min(Number(config("vercelReadProxyServerTimeoutMs", 50000)) || 50000, 55000));
  }

  function parseResponse(response, raw, method, id, started) {
    var result;
    try {
      result = raw ? JSON.parse(raw) : {};
    } catch (_) {
      throw transportError(
        "Vercel proxy response ไม่ใช่ JSON: " + method,
        "VERCEL_PROXY_RESPONSE_NOT_JSON",
        method,
        { httpStatus: response.status, rawPreview: text(raw).slice(0, 300) }
      );
    }
    if (!isObject(result)) result = { ok: false, error: "Vercel proxy response empty", errorCode: "VERCEL_PROXY_RESPONSE_EMPTY" };
    result.method = result.method || method;
    result.requestId = result.requestId || id;
    result.transport = result.transport || "vercel-api-proxy";
    result.releaseStamp = result.releaseStamp || RELEASE_STAMP;
    result.meta = Object.assign({}, isObject(result.meta) ? result.meta : {}, {
      browserVercelProxy: true,
      transportOwner: OWNER,
      httpStatus: response.status,
      durationMs: Date.now() - started,
      releaseStamp: RELEASE_STAMP
    });
    if (!response.ok && result.ok !== false) {
      result.ok = false;
      result.error = result.error || "Vercel proxy HTTP error " + response.status;
      result.errorCode = result.errorCode || "VERCEL_PROXY_HTTP_ERROR";
    }
    return result;
  }

  function runProxy(method, payload, options) {
    method = text(method).trim();
    if (!method) return Promise.reject(transportError("method required", "METHOD_REQUIRED"));
    payload = isObject(payload) ? Object.assign({}, payload) : (payload == null ? {} : { value: payload });
    var id = requestId(method);
    var started = Date.now();
    var controller = new AbortController();
    var timeoutMs = timeoutFor(method, options);
    var timer = root.setTimeout(function () {
      try { controller.abort(); } catch (_) {}
    }, timeoutMs);
    var body = {
      method: method,
      payload: payload,
      requestId: id,
      bridge: "vercel-api-proxy-only",
      source: "vercel-static-frontend",
      releaseStamp: RELEASE_STAMP,
      timeoutMs: serverTimeoutFor(method)
    };

    return fetch(endpointFor(method), {
      method: "POST",
      credentials: "same-origin",
      cache: "no-store",
      redirect: "follow",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Accept": "application/json, text/plain, */*",
        "X-App-Release": RELEASE_STAMP,
        "X-App-Request-Id": id
      },
      body: JSON.stringify(body),
      signal: controller.signal
    }).then(function (response) {
      return response.text().then(function (raw) {
        return parseResponse(response, raw, method, id, started);
      });
    }).catch(function (err) {
      if (err && err.name === "AbortError") {
        throw transportError(
          "Vercel proxy timeout: " + method,
          "VERCEL_PROXY_CLIENT_TIMEOUT",
          method,
          { timeoutMs: timeoutMs, durationMs: Date.now() - started }
        );
      }
      if (err && err.code) throw err;
      throw transportError(
        "เชื่อมต่อ Vercel proxy ไม่สำเร็จ: " + text(err && err.message || err),
        "VERCEL_PROXY_FETCH_FAILED",
        method,
        { durationMs: Date.now() - started }
      );
    }).finally(function () {
      root.clearTimeout(timer);
    });
  }

  function runWithPolicy(method, payload, options) {
    var hit = cachedRead(method, payload);
    if (hit) return Promise.resolve(hit);
    var key = stableKey(method, payload);
    var write = isWriteMethod(method);
    if (!write && apiInFlight[key]) {
      recordMetric({ kind: "call", method: method, dedupeHit: true, transport: MODE });
      return apiInFlight[key];
    }
    var promise = runProxy(method, payload, options).then(function (result) {
      recordMetric({ kind: "call", method: method, transport: MODE, error: isObject(result) && result.ok === false });
      if (write && isObject(result) && result.ok !== false) invalidateCache("write-success", method);
      else putReadCache(method, payload, result);
      return result;
    }, function (err) {
      recordMetric({ kind: "call", method: method, transport: MODE, error: true, message: text(err && err.message || err) });
      if (!write) {
        var stale = staleRead(method, payload);
        if (stale) {
          stale.meta = Object.assign({}, isObject(stale.meta) ? stale.meta : {}, { staleIfError: true, staleReason: text(err && err.message || err) });
          return stale;
        }
      }
      throw err;
    });
    if (!write) {
      apiInFlight[key] = promise.then(function (value) {
        delete apiInFlight[key];
        return value;
      }, function (err) {
        delete apiInFlight[key];
        throw err;
      });
      return apiInFlight[key];
    }
    return promise;
  }

  function withAssetStamp(url) {
    return url + (url.indexOf("?") >= 0 ? "&" : "?") + "v=" + encodeURIComponent(ASSET_STAMP);
  }

  function assetUrls(file) {
    file = text(file).trim().replace(/\.html$/i, "");
    var bases = config("localAssetBaseCandidates", ["./partials/", "partials/", "../partials/"]);
    if (!Array.isArray(bases)) bases = text(bases).split(",");
    return bases.map(function (base) {
      base = text(base).trim() || "./partials/";
      return base.replace(/\/?$/, "/") + file + ".html";
    });
  }

  function fetchAsset(file) {
    file = text(file).trim().replace(/\.html$/i, "");
    if (!file) return Promise.reject(transportError("asset name required", "ASSET_NAME_REQUIRED"));
    if (assetCache[file]) return Promise.resolve(assetCache[file]);
    if (assetInFlight[file]) return assetInFlight[file];
    var urls = assetUrls(file);
    function attempt(index) {
      if (index >= urls.length) return Promise.reject(transportError("ไม่พบ partial: " + file, "ASSET_NOT_FOUND"));
      return fetch(withAssetStamp(urls[index]), { credentials: "same-origin", cache: "no-cache" }).then(function (response) {
        if (!response.ok) return attempt(index + 1);
        return response.text().then(function (html) {
          assetCache[file] = html;
          return html;
        });
      }, function () {
        return attempt(index + 1);
      });
    }
    assetInFlight[file] = attempt(0).then(function (html) {
      delete assetInFlight[file];
      return html;
    }, function (err) {
      delete assetInFlight[file];
      throw err;
    });
    return assetInFlight[file];
  }

  function bundleFiles(name) {
    var key = text(name).replace(/^bundle:/i, "");
    var manifest = root.APP_CONFIG && root.APP_CONFIG.assetManifest || {};
    var bundles = manifest.bundles || {};
    var bundle = bundles[key] || bundles["page" + key.charAt(0).toUpperCase() + key.slice(1)] || null;
    return bundle && Array.isArray(bundle.files) ? bundle.files : [];
  }

  function localInclude(name) {
    name = text(name).trim();
    var files = /^bundle:/i.test(name) ? bundleFiles(name) : [name];
    if (!files.length) return Promise.reject(transportError("ไม่พบ bundle/asset: " + name, "ASSET_NOT_FOUND"));
    return Promise.all(files.map(fetchAsset)).then(function (parts) {
      return { ok: true, data: { name: name, html: parts.join("\n"), loadedAt: new Date().toISOString(), local: true }, msg: "โหลด partial จาก Vercel static assets สำเร็จ" };
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

  function applyLogo(url, source) {
    url = text(url || config("logoUrl", config("fallbackLogoUrl", ""))).trim();
    if (!url) return false;
    try {
      var nodes = doc.querySelectorAll('[data-logo="parliament"],#login-logo-img,#side-logo-img,#mobile-topbar-logo,#summary-logo-img,#ps-ai-print-logo,#report-logo-img,.print-logo-img');
      Array.prototype.forEach.call(nodes, function (img) {
        if (!img || !img.setAttribute) return;
        img.setAttribute("src", url);
        img.style.display = "";
        img.style.visibility = "visible";
        if (img.classList) img.classList.add("logo-loaded");
        if (img.dataset) img.dataset.logoSource = source || "vercel-app-config";
      });
    } catch (_) {}
    return true;
  }

  function loadPublicConfig() {
    var endpoint = normalizeEndpoint(config("vercelPublicConfigProxyUrl", "/api/public-config"), "/api/public-config");
    var timeoutMs = Math.max(2000, Math.min(Number(config("publicConfigTimeoutMs", 10000)) || 10000, 15000));
    var controller = new AbortController();
    var timer = root.setTimeout(function () { try { controller.abort(); } catch (_) {} }, timeoutMs);
    return fetch(endpoint, { method: "GET", credentials: "same-origin", cache: "no-store", headers: { "Accept": "application/json" }, signal: controller.signal }).then(function (response) {
      return response.text().then(function (raw) {
        var data;
        try { data = raw ? JSON.parse(raw) : {}; }
        catch (_) { throw transportError("Public config response ไม่ใช่ JSON", "VERCEL_PUBLIC_CONFIG_NOT_JSON"); }
        if (data && data.logoUrl) {
          root.APP_CONFIG.logoUrl = data.logoUrl;
          applyLogo(data.logoUrl, "vercel-public-config");
        } else {
          applyLogo(config("logoUrl", ""), "app-config");
        }
        return data;
      });
    }).catch(function (err) {
      applyLogo(config("logoUrl", ""), "app-config-fallback");
      if (err && err.name === "AbortError") throw transportError("Public config timeout", "VERCEL_PUBLIC_CONFIG_TIMEOUT");
      throw err;
    }).finally(function () {
      root.clearTimeout(timer);
    });
  }

  function runtimeOwnerStatus() {
    var cfg = root.APP_CONFIG || {};
    var errors = [];
    if (cfg.vercelApiProxyEnabled !== true) errors.push("VERCEL_API_PROXY_DISABLED");
    if (cfg.loginViaVercelProxy !== true) errors.push("VERCEL_LOGIN_PROXY_DISABLED");
    if (!text(cfg.vercelApiProxyUrl || "/api/gas")) errors.push("VERCEL_API_PROXY_URL_MISSING");
    if (!text(cfg.vercelLoginProxyUrl || "/api/login")) errors.push("VERCEL_LOGIN_PROXY_URL_MISSING");
    return {
      ok: !errors.length,
      host: text(root.location && root.location.hostname || ""),
      expectedOwner: "vercel-api-proxy-only",
      actualOwner: OWNER,
      transportMode: MODE,
      errors: errors,
      release: {
        ok: true,
        expectedStamp: RELEASE_STAMP,
        clientStamp: RELEASE_STAMP,
        configStamp: text(cfg.releaseStamp || RELEASE_STAMP),
        assetStamp: ASSET_STAMP,
        mismatch: [],
        warnings: []
      }
    };
  }

  function assertRuntimeOwner(context) {
    var status = runtimeOwnerStatus();
    if (status.ok) return status;
    var err = transportError("Runtime/Transport ของ Vercel ยังไม่พร้อม: " + status.errors.join(", "), "APP_RUNTIME_OWNER_MISMATCH", context || "runtime-owner");
    err.runtimeHealth = status;
    throw err;
  }

  root.AppTransport = root.AppTransport || {};
  root.AppTransport.__owner = OWNER;
  root.AppTransport.__vercelApiProxyOnly = true;
  root.AppTransport.__githubPagesGasDirect = false;
  root.AppTransport.__vercelApiProxyOnly = true;
  root.AppTransport.__gasDirectWhenHostedInGas = false;
  root.AppTransport.__legacyTransportRemoved = true;
  root.AppTransport.__staticGasDirectDisabled = true;
  root.AppTransport.__singleTransportPathPhase2 = true;
  root.AppTransport.transportMode = MODE;
  root.AppTransport.run = function (fn, args, options) {
    var request = apiEnvelope(fn, args || {});
    if (/^getDeferredInclude$/i.test(request.method)) {
      var name = request.payload && (request.payload.name || request.payload.partial || request.payload.file) || "";
      return localInclude(name);
    }
    assertRuntimeOwner("api:" + text(request.method));
    return runWithPolicy(request.method, request.payload || {}, options || {});
  };
  root.AppTransport.runVercelProxy = runProxy;
  root.AppTransport.runGasDirectBridge = runProxy;
  root.AppTransport.runJsonpApi = runProxy;
  root.AppTransport.runLoginPost = runProxy;
  root.AppTransport.ensureBridgeClient = function () { return Promise.resolve(null); };
  root.AppTransport.bridgeClientState = function () { return { ready: false, loaded: false, removed: true, mode: MODE, gasWebAppUrl: "" }; };
  root.AppTransport.vercelProxyEnabled = function () { return true; };
  root.AppTransport.loadPublicConfig = loadPublicConfig;
  root.AppTransport.runtimeOwnerStatus = runtimeOwnerStatus;
  root.AppTransport.assertRuntimeOwner = assertRuntimeOwner;
  root.AppTransport.releaseStatus = function () { return runtimeOwnerStatus().release; };
  root.AppTransport.phase2Status = function () {
    var status = runtimeOwnerStatus();
    return {
      ok: status.ok,
      stamp: RELEASE_STAMP,
      phase: "Vercel API Proxy",
      release: status.release,
      transportMode: MODE,
      githubPagesGasDirect: false,
      vercelApiProxyEnabled: true,
      legacyTransportRemoved: true,
      gasDirectAvailable: false,
      clientReadResponseCacheEnabled: true,
      clientReadCacheEntries: Object.keys(readCache).length,
      inFlight: Object.keys(apiInFlight).length,
      assetCacheEntries: Object.keys(assetCache).length,
      bridge: root.AppTransport.bridgeClientState(),
      metrics: Object.assign({}, metrics)
    };
  };
  root.AppTransport.phase1Status = root.AppTransport.phase2Status;
  root.AppTransport.phase0Status = root.AppTransport.phase2Status;
  root.AppTransport.clientCacheStatus = function () {
    return { ok: true, owner: "vercel-proxy-read-cache", readResponseCache: true, cacheEntries: Object.keys(readCache).length, inFlight: Object.keys(apiInFlight).length, cacheEpoch: cacheEpoch, metrics: Object.assign({}, metrics) };
  };
  root.AppTransport.clearApiCache = function (reason) {
    invalidateCache(reason || "manual-clear", "__manual__");
    metrics.cacheHits = 0;
    metrics.cacheWrites = 0;
    metrics.dedupeHits = 0;
    metrics.last = [];
    return true;
  };
  root.AppTransport.invalidateClientApiCache = invalidateCache;
  root.AppTransport.setGasWebAppUrl = function () {
    root.GAS_WEB_APP_URL = "";
    return "";
  };
  root.AppTransport.setLogoUrl = function (url) {
    root.APP_CONFIG = root.APP_CONFIG || {};
    root.APP_CONFIG.logoUrl = text(url).trim();
    return applyLogo(root.APP_CONFIG.logoUrl, "manual");
  };
  root.AppTransport.ping = loadPublicConfig;

  try { applyLogo(config("logoUrl", ""), "app-config"); } catch (_) {}
  if (doc.readyState === "loading") {
    doc.addEventListener("DOMContentLoaded", function () { applyLogo(config("logoUrl", ""), "app-config-dom"); }, { once: true });
  }
})(window, document);
