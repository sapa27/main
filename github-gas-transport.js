/* GitHub Pages <-> Google Apps Script transport bridge.
 * Single transport path: hidden GAS HtmlService bridge iframe + postMessage + google.script.run.
 * No form POST callback fallback.
 */
(function(root, doc) {
  'use strict';
  if (!root || !doc) return;

  var FALLBACK_LOGO = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22128%22%20height%3D%22128%22%20viewBox%3D%220%200%20128%20128%22%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20rx%3D%2224%22%20fill%3D%22%23f8fafc%22/%3E%3Ccircle%20cx%3D%2264%22%20cy%3D%2248%22%20r%3D%2226%22%20fill%3D%22%23d4af37%22/%3E%3Cpath%20d%3D%22M28%20100h72M40%2088h48M48%2074h32%22%20stroke%3D%22%23334155%22%20stroke-width%3D%227%22%20stroke-linecap%3D%22round%22/%3E%3Ctext%20x%3D%2264%22%20y%3D%2255%22%20text-anchor%3D%22middle%22%20font-family%3D%22Sarabun%2C%20Arial%22%20font-size%3D%2218%22%20fill%3D%22%23334155%22%3E%E0%B8%AA%E0%B8%A0%E0%B8%B2%3C/text%3E%3C/svg%3E';
  var manifest = (root.APP_CONFIG && root.APP_CONFIG.assetManifest) || root.__APP_ASSET_MANIFEST__ || {};
  var cache = Object.create(null);
  var pending = Object.create(null);
  var seq = 0;
  var bridgeClient = { iframe: null, ready: false, loaded: false, assumedReady: false, promise: null, url: '' };

  function text(v) { return v == null ? '' : String(v); }
  function isObj(v) { return !!v && typeof v === 'object' && !Array.isArray(v); }
  function safeName(name) { return /^[A-Za-z0-9_\-]+$/.test(text(name)); }
  function cfg(name, fallback) { var c = root.APP_CONFIG || {}; return c[name] == null || c[name] === '' ? fallback : c[name]; }
  function normalizeUrl(url) { url = text(url).trim(); return url ? url.replace(/\s+/g, '') : ''; }
  function isSafeLogoUrl(url) { url = normalizeUrl(url); return !url || /^data:image\//i.test(url) || /^https?:\/\//i.test(url); }
  function markBadLogo(url) { try { url = normalizeUrl(url); if (url && url !== FALLBACK_LOGO) { root.localStorage && root.localStorage.setItem('APP_BAD_LOGO_URL', url); root.localStorage && root.localStorage.removeItem('APP_LOGO_URL'); } } catch (_) {} }
  function isBadLogo(url) { try { return normalizeUrl(url) && normalizeUrl(url) === normalizeUrl(root.localStorage && root.localStorage.getItem('APP_BAD_LOGO_URL') || ''); } catch (_) { return false; } }
  function resolveGasUrl() {
    var url = text(root.GAS_WEB_APP_URL || (root.APP_CONFIG && root.APP_CONFIG.gasWebAppUrl) || '');
    try { url = url || text(root.localStorage && root.localStorage.getItem('GAS_WEB_APP_URL') || ''); } catch (_) {}
    return normalizeUrl(url);
  }
  function isLikelyGasExecUrl(url) { return /^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_\-]+\/exec(?:[?#].*)?$/i.test(text(url).trim()); }
  function bridgeError(message, code, method) { var err = new Error(message); err.code = code || 'GAS_BRIDGE_ERROR'; err.errorCode = err.code; err.method = method || ''; err.transportMode = 'gas-bridge-client-only'; return err; }
  function localBase() { return text(cfg('localAssetBase', './partials/')); }
  function bundleFiles(name) { var key = text(name).replace(/^bundle:/i, ''); var b = manifest && manifest.bundles && manifest.bundles[key]; return b && Array.isArray(b.files) ? b.files.slice() : []; }
  function fileUrl(file) { var base = localBase(); if (base && base.charAt(base.length - 1) !== '/') base += '/'; return base + encodeURIComponent(file) + '.html'; }
  function fetchFile(file) {
    file = text(file).trim();
    if (!safeName(file)) return Promise.reject(bridgeError('ไม่อนุญาตให้โหลด asset: ' + file, 'ASSET_NAME_REJECTED'));
    if (Object.prototype.hasOwnProperty.call(cache, file)) return Promise.resolve(cache[file]);
    return fetch(fileUrl(file), { credentials: 'same-origin', cache: 'no-store' }).then(function(resp) {
      if (!resp.ok) throw bridgeError('โหลด asset ไม่สำเร็จ: ' + file + ' (' + resp.status + ')', 'ASSET_LOAD_FAILED');
      return resp.text();
    }).then(function(html) { cache[file] = html; return html; });
  }
  function localInclude(name) {
    name = text(name).trim();
    var files = /^bundle:/i.test(name) ? bundleFiles(name) : [name];
    if (!files.length) return Promise.reject(bridgeError('ไม่พบ bundle/asset: ' + name, 'ASSET_NOT_FOUND'));
    return Promise.all(files.map(fetchFile)).then(function(parts) { return { ok: true, data: { name: name, html: parts.join('\n'), loadedAt: new Date().toISOString(), local: true }, msg: 'โหลด partial จาก GitHub สำเร็จ' }; });
  }
  function apiEnvelope(fn, args) {
    var method = text(fn).trim(); var payload = args;
    if (method === 'apiRouter' && isObj(args)) { method = text(args.method || args.action || '').trim(); payload = args.payload || args.params || args.data || {}; }
    return { method: method, payload: payload == null ? {} : payload };
  }
  function cleanupPending(id) { var item = pending[id]; if (!item) return; delete pending[id]; try { item.timer && clearTimeout(item.timer); } catch (_) {} try { item.sender && clearInterval(item.sender); } catch (_) {} try { item.handler && root.removeEventListener('message', item.handler); } catch (_) {} }
  function bridgeClientSrc(url) {
    return url + (url.indexOf('?') >= 0 ? '&' : '?') +
      '__githubBridgeClient=1' +
      '&__githubBridgeNamedRequest=1' +
      '&parentOrigin=*' +
      '&originHint=' + encodeURIComponent(root.location && root.location.origin || '') +
      '&bridge=client-only' +
      '&_=' + Date.now();
  }
  function parseMessage(data) { if (typeof data === 'string') { try { return JSON.parse(data); } catch (_) { return null; } } return data && typeof data === 'object' ? data : null; }
  function isBridgeMessage(data) { return !!data && (data.__gasIframeTransport === true || data.__gasIframeTransport === 'true' || data.bridge === 'client-only' || data.bridge === 'named-request'); }
  function sendReadyProbe(iframe) { try { if (iframe && iframe.contentWindow) iframe.contentWindow.postMessage({ __gasIframeTransport: true, type: 'GAS_IFRAME_TRANSPORT_PING_READY', bridge: 'client-only', at: new Date().toISOString() }, '*'); } catch (_) {} }

  function ensureBridgeClient() {
    var url = resolveGasUrl();
    if (!url) return Promise.reject(bridgeError('ยังไม่ได้ตั้งค่า GAS Web App URL ใน app-config.js', 'GAS_URL_MISSING'));
    if (!isLikelyGasExecUrl(url)) return Promise.reject(bridgeError('GAS Web App URL ไม่ถูกต้อง ต้องเป็น URL จาก Deploy > Web app ที่ลงท้ายด้วย /exec', 'GAS_URL_INVALID'));
    if ((bridgeClient.ready || bridgeClient.assumedReady) && bridgeClient.iframe && bridgeClient.url === url) return Promise.resolve(bridgeClient.iframe);
    if (bridgeClient.promise && bridgeClient.url === url) return bridgeClient.promise;
    bridgeClient.ready = false; bridgeClient.loaded = false; bridgeClient.assumedReady = false; bridgeClient.url = url;
    try { bridgeClient.iframe && bridgeClient.iframe.parentNode && bridgeClient.iframe.parentNode.removeChild(bridgeClient.iframe); } catch (_) {}
    bridgeClient.promise = new Promise(function(resolve, reject) {
      var iframe = doc.createElement('iframe'); var readyTimer = null; var loadGraceTimer = null; var probeTimer = null; var settled = false;
      function finish(ok, value) { if (settled) return; settled = true; try { readyTimer && clearTimeout(readyTimer); } catch (_) {} try { loadGraceTimer && clearTimeout(loadGraceTimer); } catch (_) {} try { probeTimer && clearInterval(probeTimer); } catch (_) {} try { root.removeEventListener('message', onReady); } catch (_) {} if (ok) resolve(value); else reject(value); }
      function acceptReady(data) { return isBridgeMessage(data) && (data.type === 'GAS_IFRAME_TRANSPORT_READY' || data.type === 'GAS_BRIDGE_READY' || data.ready === true || (data.ok === true && /ready/i.test(text(data.type || data.source || '')))); }
      function onReady(event) { var data = parseMessage(event && event.data); if (!acceptReady(data)) return; bridgeClient.ready = true; bridgeClient.assumedReady = false; finish(true, iframe); }
      iframe.name = 'gas_bridge_client_' + Date.now() + '_' + Math.floor(Math.random() * 1e6);
      iframe.style.cssText = 'position:absolute;width:1px;height:1px;left:-9999px;top:-9999px;border:0;opacity:0;pointer-events:none;';
      iframe.setAttribute('aria-hidden', 'true'); iframe.referrerPolicy = 'no-referrer-when-downgrade';
      iframe.addEventListener('load', function() { bridgeClient.loaded = true; sendReadyProbe(iframe); loadGraceTimer = setTimeout(function() { if (settled || bridgeClient.ready) return; bridgeClient.assumedReady = true; finish(true, iframe); }, Number(cfg('bridgeLoadGraceMs', 1000)) || 1000); });
      iframe.src = bridgeClientSrc(url); bridgeClient.iframe = iframe; root.addEventListener('message', onReady); probeTimer = setInterval(function() { sendReadyProbe(iframe); }, 350);
      readyTimer = setTimeout(function() { bridgeClient.ready = false; bridgeClient.assumedReady = false; bridgeClient.promise = null; finish(false, bridgeError('GAS bridge client ไม่พร้อมใช้งาน — iframe ไม่โหลดหรือไม่ได้ deploy GAS backend ที่มี __githubBridgeClient/__githubBridgeNamedRequest', 'GAS_BRIDGE_CLIENT_NOT_READY')); }, Number(cfg('bridgeReadyTimeoutMs', 30000)) || 30000);
      (doc.body || doc.documentElement).appendChild(iframe);
    });
    return bridgeClient.promise;
  }


  function runFastLoginJsonp(payload) {
    if (cfg('fastLoginJsonp', true) === false) return runGasViaClient('apiLogin', payload || {});
    var url = resolveGasUrl();
    if (!url) return Promise.reject(bridgeError('ยังไม่ได้ตั้งค่า GAS Web App URL ใน app-config.js', 'GAS_URL_MISSING', 'apiLogin'));
    if (!isLikelyGasExecUrl(url)) return Promise.reject(bridgeError('GAS Web App URL ไม่ถูกต้อง ต้องเป็น URL จาก Deploy > Web app ที่ลงท้ายด้วย /exec', 'GAS_URL_INVALID', 'apiLogin'));
    return new Promise(function(resolve, reject) {
      var cb = '__githubFastLogin_' + Date.now() + '_' + (++seq) + '_' + Math.floor(Math.random() * 1e6);
      var done = false;
      var script = doc.createElement('script');
      var username = '';
      try { payload = payload || {}; username = text(payload.username || payload.user || payload.userId || payload.email || '').trim(); } catch (_) {}
      function cleanup() { try { clearTimeout(timer); } catch (_) {} try { delete root[cb]; } catch (_) { root[cb] = void 0; } try { script.parentNode && script.parentNode.removeChild(script); } catch (_) {} }
      function finish(ok, value) { if (done) return; done = true; cleanup(); if (ok) resolve(value); else reject(value); }
      var timer = setTimeout(function() { finish(false, bridgeError('GAS API timeout: apiLogin — fast-login JSONP ไม่ได้รับผลกลับจาก GAS ให้ตรวจว่า deploy ล่าสุดมี __githubFastLogin และ apiLogin', 'GAS_FAST_LOGIN_TIMEOUT', 'apiLogin')); }, Number(cfg('fastLoginTimeoutMs', 15000)) || 15000);
      root[cb] = function(result) { result = result || { ok:false, error:'empty fast-login response', errorCode:'EMPTY_FAST_LOGIN_RESPONSE' }; finish(true, result); };
      script.onerror = function() { finish(false, bridgeError('GAS API error: apiLogin — โหลด fast-login JSONP ไม่สำเร็จ ให้ตรวจ URL /exec และ permission Anyone', 'GAS_FAST_LOGIN_LOAD_FAILED', 'apiLogin')); };
      script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + '__githubFastLogin=1&callback=' + encodeURIComponent(cb) + '&username=' + encodeURIComponent(username || 'admin') + '&_=' + Date.now();
      (doc.head || doc.documentElement).appendChild(script);
    });
  }

  function runGasViaClient(method, payload) {
    if (!method) return Promise.reject(bridgeError('method required', 'METHOD_REQUIRED', method));
    var timeoutMs = Number(cfg('apiTimeoutMs', 90000)) || 90000;
    return ensureBridgeClient().then(function(iframe) {
      return new Promise(function(resolve, reject) {
        var id = 'gasc_' + Date.now() + '_' + (++seq) + '_' + Math.floor(Math.random() * 1e6);
        var done = false;
        function message() { return { __gasIframeTransport: true, type: 'GAS_IFRAME_TRANSPORT_REQUEST', bridge: 'client-only', requestId: id, method: method, payload: payload == null ? {} : payload, at: new Date().toISOString() }; }
        var handler = function(event) {
          var data = parseMessage(event && event.data);
          if (!data || data.requestId !== id) return;
          if (!isBridgeMessage(data) && data.type !== 'GAS_IFRAME_TRANSPORT_RESPONSE') return;
          done = true;
          var result = data.result || { ok: false, error: 'empty response', errorCode: 'EMPTY_BRIDGE_RESPONSE' };
          cleanupPending(id); resolve(result);
        };
        var send = function() { try { iframe.contentWindow && iframe.contentWindow.postMessage(message(), '*'); } catch (_) {} };
        var timer = setTimeout(function() { cleanupPending(id); reject(bridgeError('GAS API timeout: ' + method + ' — bridge iframe โหลดแล้วแต่ยังไม่ได้รับผลกลับจาก GAS ให้ตรวจว่า deploy ล่าสุดมี apiGithubBridgeCall และไม่มี doGet ซ้ำ', 'GAS_API_TIMEOUT', method)); }, timeoutMs);
        var sender = setInterval(function() { if (!done) send(); }, 450);
        pending[id] = { handler: handler, timer: timer, sender: sender };
        root.addEventListener('message', handler);
        send(); setTimeout(send, 80); setTimeout(send, 250); setTimeout(send, 900); setTimeout(send, 1800); setTimeout(send, 3200);
      });
    });
  }

  function applyImageAttrs(img) { try { img.setAttribute('loading', img.id === 'login-logo-img' ? 'eager' : 'lazy'); img.setAttribute('decoding', img.id === 'login-logo-img' ? 'sync' : 'async'); img.setAttribute('fetchpriority', img.id === 'login-logo-img' ? 'high' : 'auto'); } catch (_) {} }
  function setLogo(url, source) {
    url = normalizeUrl(url || FALLBACK_LOGO);
    if (!isSafeLogoUrl(url) || isBadLogo(url)) url = FALLBACK_LOGO;
    root.APP_CONFIG = root.APP_CONFIG || {}; root.APP_CONFIG.logoUrl = url;
    root.APP_LOGO = root.APP_LOGO || {}; root.APP_LOGO.active = url; root.APP_LOGO.svg = url; root.APP_LOGO.png96 = url; root.APP_LOGO.png192 = url; root.APP_LOGO.png512 = url;
    root.DEFAULT_LOGO = url; root.LOGO_URL = url; root.currentLogoUrl = url; root.__SAFE_LOGO_URL__ = url; root.__APP_PARLIAMENT_LOGO__ = url;
    try { if (url !== FALLBACK_LOGO) root.localStorage && root.localStorage.setItem('APP_LOGO_URL', url); } catch (_) {}
    try {
      var nodes = doc.querySelectorAll('[data-logo="parliament"],#login-logo-img,#side-logo-img,#mobile-topbar-logo,#summary-logo-img,#ps-ai-print-logo,#report-logo-img,.print-logo-img');
      Array.prototype.forEach.call(nodes, function(img) {
        if (!img || !img.setAttribute) return;
        applyImageAttrs(img);
        img.onerror = function() { try { var bad = img.getAttribute('src') || url; markBadLogo(bad); img.onerror = null; img.setAttribute('src', FALLBACK_LOGO); } catch (_) {} };
        img.style.display = '';
        if (img.getAttribute('src') !== url) img.setAttribute('src', url);
        img.dataset.logoSource = source || 'github-config';
      });
    } catch (_) {}
    try { root.updateLogos && root.updateLogos(url); } catch (_) {}
    try { root.patchParliamentLogo && root.patchParliamentLogo(); } catch (_) {}
    return true;
  }

  function loadPublicConfig() {
    var url = resolveGasUrl();
    if (!url || !isLikelyGasExecUrl(url)) return Promise.resolve(null);
    return new Promise(function(resolve) {
      var cb = '__githubGasPublicConfig_' + Date.now() + '_' + (++seq); var done = false; var script = doc.createElement('script');
      var timer = setTimeout(function() { if (done) return; done = true; try { delete root[cb]; } catch (_) { root[cb] = void 0; } try { script.parentNode && script.parentNode.removeChild(script); } catch (_) {} resolve(null); }, Number(cfg('publicConfigTimeoutMs', 4000)) || 4000);
      root[cb] = function(data) { if (done) return; done = true; clearTimeout(timer); try { script.parentNode && script.parentNode.removeChild(script); } catch (_) {} try { delete root[cb]; } catch (_) { root[cb] = void 0; } if (data && data.ok) { var logo = text(data.logoUrl || (data.appLogo && (data.appLogo.active || data.appLogo.svg)) || ''); logo && !isBadLogo(logo) && setLogo(logo, 'gas-public-config'); } resolve(data || null); };
      script.onerror = function() { if (done) return; done = true; clearTimeout(timer); try { delete root[cb]; } catch (_) { root[cb] = void 0; } resolve(null); };
      script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + '__githubPublicConfig=1&callback=' + encodeURIComponent(cb) + '&_=' + Date.now();
      (doc.head || doc.documentElement).appendChild(script);
    });
  }

  root.AppTransport = root.AppTransport || {};
  root.AppTransport.__githubGasBridge = true;
  root.AppTransport.transportMode = 'github-fast-login-plus-gas-bridge';
  root.AppTransport.bridgeClientState = function() { return { ready: !!bridgeClient.ready, loaded: !!bridgeClient.loaded, assumedReady: !!bridgeClient.assumedReady, url: bridgeClient.url || resolveGasUrl(), mode: 'github-fast-login-plus-gas-bridge' }; };
  root.AppTransport.run = function(fn, args) { var req = apiEnvelope(fn, args || {}); if (/^getDeferredInclude$/i.test(req.method)) { var name = req.payload && (req.payload.name || req.payload.partial || req.payload.file) || ''; return localInclude(name); } if (/^apiLogin$/i.test(req.method)) return runFastLoginJsonp(req.payload || {}); return runGasViaClient(req.method, req.payload || {}); };
  root.AppTransport.setGasWebAppUrl = function(url) { root.GAS_WEB_APP_URL = normalizeUrl(url); root.APP_CONFIG = root.APP_CONFIG || {}; root.APP_CONFIG.gasWebAppUrl = root.GAS_WEB_APP_URL; try { root.localStorage && root.localStorage.setItem('GAS_WEB_APP_URL', root.GAS_WEB_APP_URL); } catch (_) {} bridgeClient.ready = false; bridgeClient.loaded = false; bridgeClient.assumedReady = false; bridgeClient.promise = null; loadPublicConfig(); return root.GAS_WEB_APP_URL; };
  root.AppTransport.setLogoUrl = function(url) { return setLogo(url, 'manual'); };
  root.AppTransport.ping = function() { return runGasViaClient('apiGithubBridgePing', { at: new Date().toISOString(), transportMode: 'github-fast-login-plus-gas-bridge' }); };
  root.AppTransport.ensureBridgeClient = ensureBridgeClient;
  root.AppTransport.loadPublicConfig = loadPublicConfig;

  try { setLogo(cfg('logoUrl', FALLBACK_LOGO), 'app-config'); } catch (_) {}
  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', function(){ setLogo(cfg('logoUrl', FALLBACK_LOGO), 'app-config-dom'); loadPublicConfig(); }, { once: true });
  else { setLogo(cfg('logoUrl', FALLBACK_LOGO), 'app-config-dom'); loadPublicConfig(); }
})(typeof window !== 'undefined' ? window : globalThis, typeof document !== 'undefined' ? document : null);
