(function (root, doc) {
  "use strict";
  if (!root || !doc) return;

  var OWNER = "github-pages/github-gas-transport.js::gas-iframe-bridge-r148-compat";
  var MODE = "github-pages-gas-iframe-bridge-r148-compat";
  var pending = Object.create(null);
  var inFlight = Object.create(null);
  var assetCache = Object.create(null);
  var assetInFlight = Object.create(null);
  var seq = 0;
  var iframe = null;
  var readyPromise = null;
  var readySource = null;
  var nonce = "";
  var bridgeState = "idle";
  var bridgeOrigin = "";
  var lastError = "";
  var metrics = { calls: 0, bridgeCalls: 0, ready: 0, errors: 0, localAssets: 0, dedupeHits: 0 };

  function text(v) { return v == null ? "" : String(v); }
  function isObject(v) { return !!v && typeof v === "object" && !Array.isArray(v); }
  function cfg(name, fallback) {
    var c = root.APP_CONFIG || {};
    return c[name] == null || c[name] === "" ? fallback : c[name];
  }
  function cleanGasUrl(v) {
    v = text(v).trim();
    return /^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec(?:[?#].*)?$/i.test(v) ? v.replace(/[?#].*$/, "") : "";
  }
  function gasUrl() { return cleanGasUrl(cfg("gasWebAppUrl", root.GAS_WEB_APP_URL || "")); }
  function err(message, code) {
    var e = new Error(text(message || "GAS bridge error"));
    e.code = text(code || "GAS_BRIDGE_ERROR");
    e.errorCode = e.code;
    e.transportMode = MODE;
    return e;
  }
  function trusted(event, data) {
    var origin = text(event && event.origin).toLowerCase();
    if (origin === "https://script.google.com" || /^https:\/\/(?:[a-z0-9-]+\.)*script\.googleusercontent\.com$/.test(origin)) return true;
    return origin === "null" && data && text(data.nonce) === nonce;
  }
  function randomNonce() {
    var bytes = new Uint8Array(24);
    try { root.crypto.getRandomValues(bytes); }
    catch (_) { for (var i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256); }
    return Array.prototype.map.call(bytes, function (b) { return ("0" + b.toString(16)).slice(-2); }).join("");
  }
  function bridgeUrl() {
    var gas = gasUrl();
    if (!gas) throw err("ยังไม่ได้กำหนด GAS Web App URL", "GITHUB_GAS_URL_NOT_CONFIGURED");
    return gas + "?__githubBridgeClient=1&parentOrigin=" + encodeURIComponent(root.location.origin) +
      "&bridgeNonce=" + encodeURIComponent(nonce) + "&nonce=" + encodeURIComponent(nonce);
  }
  function clearPending(id, error) {
    var p = pending[id];
    if (!p) return;
    delete pending[id];
    if (p.timer) root.clearTimeout(p.timer);
    if (error) p.reject(error);
  }
  function onMessage(event) {
    var data = event && event.data;
    if (typeof data === "string") {
      try { data = JSON.parse(data); } catch (_) { return; }
    }
    if (!isObject(data) || text(data.nonce) !== nonce || !trusted(event, data)) return;
    if (data.type === "GAS_IFRAME_TRANSPORT_READY") {
      readySource = event.source || (iframe && iframe.contentWindow) || null;
      bridgeOrigin = text(event.origin || "");
      bridgeState = "ready";
      metrics.ready += 1;
      if (readyPromise && readyPromise._resolve) readyPromise._resolve(true);
      return;
    }
    if (data.type !== "GAS_IFRAME_TRANSPORT_RESPONSE") return;
    var id = text(data.requestId || data.id);
    var p = pending[id];
    if (!p) return;
    delete pending[id];
    if (p.timer) root.clearTimeout(p.timer);
    var result = data.result == null ? { ok: false, error: "empty GAS result" } : data.result;
    p.resolve(result);
  }
  root.addEventListener("message", onMessage, false);

  function ensureBridge() {
    if (bridgeState === "ready" && readySource) return Promise.resolve(true);
    if (readyPromise) return readyPromise;
    nonce = randomNonce();
    bridgeState = "loading";
    lastError = "";
    var resolveReady, rejectReady;
    readyPromise = new Promise(function (resolve, reject) { resolveReady = resolve; rejectReady = reject; });
    readyPromise._resolve = function (value) {
      var r = resolveReady;
      readyPromise = null;
      if (r) r(value);
    };
    readyPromise._reject = function (error) {
      var r = rejectReady;
      readyPromise = null;
      if (r) r(error);
    };
    var timer = root.setTimeout(function () {
      if (bridgeState === "ready") return;
      bridgeState = "timeout";
      lastError = "GAS iframe bridge ไม่ตอบ READY";
      var p = readyPromise;
      if (p && p._reject) p._reject(err(lastError, "GAS_BRIDGE_READY_TIMEOUT"));
    }, Math.max(5000, Number(cfg("bridgeTimeoutMs", 12000)) || 12000));
    readyPromise.then(function () { root.clearTimeout(timer); }, function () { root.clearTimeout(timer); });

    iframe = doc.createElement("iframe");
    iframe.id = "app-gas-r148-bridge";
    iframe.title = "GAS API Bridge";
    iframe.setAttribute("aria-hidden", "true");
    iframe.setAttribute("referrerpolicy", "no-referrer");
    iframe.style.cssText = "position:fixed;width:1px;height:1px;left:-10000px;top:-10000px;border:0;opacity:0;pointer-events:none";
    iframe.onload = function () {
      if (bridgeState !== "ready") {
        try { iframe.contentWindow.postMessage({ type: "GAS_BRIDGE_READY_PROBE", nonce: nonce }, "*"); } catch (_) {}
      }
    };
    iframe.onerror = function () { lastError = "โหลด GAS iframe ไม่สำเร็จ"; bridgeState = "load-error"; };
    try { iframe.src = bridgeUrl(); }
    catch (e) { if (readyPromise && readyPromise._reject) readyPromise._reject(e); return readyPromise; }
    (doc.body || doc.documentElement).appendChild(iframe);
    return readyPromise;
  }

  function normalizeRequest(fn, args) {
    var method = text(fn).trim();
    var payload = args == null ? {} : args;
    if (method === "apiRouter" && isObject(args)) {
      method = text(args.method || args.action || "").trim();
      payload = args.payload || args.params || args.data || {};
    }
    return { method: method, payload: payload == null ? {} : payload };
  }
  function bridgeRun(method, payload, options) {
    options = options || {};
    return ensureBridge().then(function () {
      return new Promise(function (resolve, reject) {
        var id = "gh_" + Date.now().toString(36) + "_" + (++seq).toString(36);
        var timeoutMs = Math.max(10000, Number(options.timeoutMs || cfg("requestTimeoutMs", 90000)) || 90000);
        pending[id] = {
          resolve: resolve,
          reject: reject,
          timer: root.setTimeout(function () {
            metrics.errors += 1;
            clearPending(id, err("GAS request timeout: " + method, "GAS_BRIDGE_REQUEST_TIMEOUT"));
          }, timeoutMs)
        };
        var target = readySource || (iframe && iframe.contentWindow);
        if (!target || typeof target.postMessage !== "function") {
          clearPending(id, err("GAS bridge window unavailable", "GAS_BRIDGE_WINDOW_UNAVAILABLE"));
          return;
        }
        metrics.bridgeCalls += 1;
        try {
          target.postMessage({
            __gasIframeTransport: true,
            type: "GAS_IFRAME_TRANSPORT_REQUEST",
            bridge: "verified-session-bridge",
            nonce: nonce,
            requestId: id,
            id: id,
            method: method,
            payload: payload
          }, "*");
        } catch (e) { clearPending(id, e); }
      });
    });
  }

  function assetUrls(file) {
    var bases = cfg("localAssetBaseCandidates", ["./partials/", "partials/"]);
    if (!Array.isArray(bases)) bases = text(bases).split(",");
    return bases.map(function (base) { return (text(base).trim() || "./partials/").replace(/\/?$/, "/") + file + ".html"; });
  }
  function fetchAsset(file) {
    file = text(file).trim().replace(/\.html$/i, "");
    if (!file) return Promise.reject(err("asset name required", "ASSET_NAME_REQUIRED"));
    if (assetCache[file]) return Promise.resolve(assetCache[file]);
    if (assetInFlight[file]) return assetInFlight[file];
    var urls = assetUrls(file);
    function attempt(i) {
      if (i >= urls.length) return Promise.reject(err("ไม่พบ partial: " + file, "ASSET_NOT_FOUND"));
      return fetch(urls[i], { credentials: "same-origin", cache: "no-cache" }).then(function (r) {
        if (!r.ok) return attempt(i + 1);
        return r.text();
      }, function () { return attempt(i + 1); });
    }
    assetInFlight[file] = attempt(0).then(function (html) {
      delete assetInFlight[file]; assetCache[file] = html; metrics.localAssets += 1; return html;
    }, function (e) { delete assetInFlight[file]; throw e; });
    return assetInFlight[file];
  }
  function bundleFiles(name) {
    var key = text(name).replace(/^bundle:/i, "");
    var bundles = root.APP_CONFIG && root.APP_CONFIG.assetManifest && root.APP_CONFIG.assetManifest.bundles || {};
    var b = bundles[key] || null;
    return b && Array.isArray(b.files) ? b.files : [];
  }
  function localInclude(name) {
    name = text(name).trim();
    var files = /^bundle:/i.test(name) ? bundleFiles(name) : [name];
    if (!files.length) return Promise.reject(err("ไม่พบ bundle/asset: " + name, "ASSET_NOT_FOUND"));
    return Promise.all(files.map(fetchAsset)).then(function (parts) {
      return { ok: true, data: { name: name, html: parts.join("\n"), loadedAt: new Date().toISOString(), local: true }, msg: "โหลด partial จาก GitHub Pages สำเร็จ" };
    });
  }
  function applyLogo(url, source) {
    url = text(url || cfg("logoUrl", cfg("fallbackLogoUrl", ""))).trim();
    if (!url) return false;
    try {
      Array.prototype.forEach.call(doc.querySelectorAll('[data-logo="parliament"],#login-logo-img,#side-logo-img,#mobile-topbar-logo,#summary-logo-img,#ps-ai-print-logo,#report-logo-img,.print-logo-img'), function (img) {
        if (!img || !img.setAttribute) return;
        img.setAttribute("src", url); img.style.display = ""; img.style.visibility = "visible";
        if (img.classList) img.classList.add("logo-loaded"); if (img.dataset) img.dataset.logoSource = source || "github-pages";
      });
    } catch (_) {}
    return true;
  }
  function run(fn, args, options) {
    metrics.calls += 1;
    var req = normalizeRequest(fn, args);
    if (!req.method) return Promise.reject(err("method required", "METHOD_REQUIRED"));
    if (req.method === "getDeferredInclude") {
      var name = req.payload && (req.payload.name || req.payload.partial || req.payload.file) || "";
      if (name) return localInclude(name).catch(function () { return bridgeRun(req.method, req.payload, options); });
    }
    var write = /^api(?:Save|Delete|Update|Create|Import|Extract|Upload|Issue|Process|Cleanup|Generate|Send|Patch|Approve|Reject|Submit|Queue|Migrate|Revoke|Refresh)/i.test(req.method);
    var key = write ? "" : req.method + "|" + JSON.stringify(req.payload || {});
    if (key && inFlight[key]) { metrics.dedupeHits += 1; return inFlight[key]; }
    var p = bridgeRun(req.method, req.payload, options);
    if (key) {
      inFlight[key] = p.then(function (v) { delete inFlight[key]; return v; }, function (e) { delete inFlight[key]; throw e; });
      return inFlight[key];
    }
    return p;
  }
  function status() {
    return {
      ok: !!gasUrl(), owner: OWNER, transportMode: MODE, mode: MODE,
      gasWebAppUrlConfigured: !!gasUrl(), parentOrigin: root.location.origin,
      bridge: { state: bridgeState, ready: bridgeState === "ready", origin: bridgeOrigin, lastError: lastError, pending: Object.keys(pending).length },
      metrics: Object.assign({}, metrics)
    };
  }

  root.AppTransport = root.AppTransport || {};
  root.AppTransport.__owner = OWNER;
  root.AppTransport.__vercelApiProxyOnly = false;
  root.AppTransport.__githubPagesGasDirect = true;
  root.AppTransport.__gasDirectWhenHostedInGas = false;
  root.AppTransport.__legacyTransportRemoved = false;
  root.AppTransport.__staticGasDirectDisabled = false;
  root.AppTransport.__singleTransportPathPhase2 = true;
  root.AppTransport.transportMode = MODE;
  root.AppTransport.mode = MODE;
  root.AppTransport.run = run;
  root.AppTransport.runGasDirectBridge = function (fn, args, options) { var r = normalizeRequest(fn, args); return bridgeRun(r.method, r.payload, options); };
  root.AppTransport.runVercelProxy = root.AppTransport.runGasDirectBridge;
  root.AppTransport.runJsonpApi = root.AppTransport.runGasDirectBridge;
  root.AppTransport.runLoginPost = root.AppTransport.runGasDirectBridge;
  root.AppTransport.ensureBridgeClient = ensureBridge;
  root.AppTransport.warmAuthBridge = function () { return ensureBridge().then(function () { return true; }, function () { return false; }); };
  root.AppTransport.bridgeClientState = function () { return status().bridge; };
  root.AppTransport.vercelProxyEnabled = function () { return false; };
  root.AppTransport.loadPublicConfig = function () { applyLogo(cfg("logoUrl", ""), "github-pages-config"); return Promise.resolve({ ok: true, logoUrl: cfg("logoUrl", ""), gasWebAppUrlConfigured: !!gasUrl(), transportMode: MODE }); };
  root.AppTransport.runtimeOwnerStatus = status;
  root.AppTransport.assertRuntimeOwner = function () { var s = status(); if (!s.ok) throw err("GitHub Pages GAS transport ไม่พร้อม", "APP_RUNTIME_OWNER_MISMATCH"); return s; };
  root.AppTransport.releaseStatus = function () { return { ok: true, expectedStamp: text(cfg("releaseStamp", "")), clientStamp: text(cfg("releaseStamp", "")), assetStamp: text(cfg("assetStamp", "")), mismatch: [], warnings: [] }; };
  root.AppTransport.phase2Status = status;
  root.AppTransport.phase1Status = status;
  root.AppTransport.phase0Status = status;
  root.AppTransport.clientCacheStatus = function () { return { ok: true, owner: OWNER, readResponseCache: false, cacheEntries: 0, inFlight: Object.keys(inFlight).length, metrics: Object.assign({}, metrics) }; };
  root.AppTransport.clearApiCache = function () { inFlight = Object.create(null); assetCache = Object.create(null); assetInFlight = Object.create(null); return true; };
  root.AppTransport.invalidateClientApiCache = root.AppTransport.clearApiCache;
  root.AppTransport.setGasWebAppUrl = function (url) { url = cleanGasUrl(url); if (!url) return gasUrl(); root.APP_CONFIG.gasWebAppUrl = url; root.GAS_WEB_APP_URL = url; return url; };
  root.AppTransport.setLogoUrl = function (url) { root.APP_CONFIG.logoUrl = text(url).trim(); applyLogo(root.APP_CONFIG.logoUrl, "manual"); return root.APP_CONFIG.logoUrl; };
  root.AppTransport.ping = function () { return run("apiGithubBridgePing", { at: Date.now() }, { timeoutMs: 15000 }); };
  root.AppTransport.status = status;

  try { applyLogo(cfg("logoUrl", ""), "github-pages-config"); } catch (_) {}
  root.setTimeout(function () { root.AppTransport.warmAuthBridge(); }, 0);
})(window, document);
