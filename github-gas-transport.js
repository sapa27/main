/* GitHub Pages <-> Google Apps Script transport bridge.
 * Current mode: GAS named-request iframe first.
 * No form POST transport. No JSONP for apiLogin/password payloads.
 */
(function(root, doc) {
  'use strict';
  if (!root || !doc) return;

  var manifest = (root.APP_CONFIG && root.APP_CONFIG.assetManifest) || root.__APP_ASSET_MANIFEST__ || {};
  var cache = Object.create(null);
  var pending = Object.create(null);
  var seq = 0;
  var state = {
    mode: 'gas-named-iframe-request',
    lastGasUrl: '',
    lastRequestId: '',
    lastRequestMethod: '',
    lastRequestStartedAt: '',
    lastIframeLoaded: false,
    lastResponseAt: '',
    lastError: ''
  };

  function text(v) { return v == null ? '' : String(v); }
  function isObj(v) { return !!v && typeof v === 'object' && !Array.isArray(v); }
  function safeName(name) { return /^[A-Za-z0-9_\-]+$/.test(text(name)); }
  function cfg(name, fallback) {
    var c = root.APP_CONFIG || {};
    return c[name] == null || c[name] === '' ? fallback : c[name];
  }
  function normalizeUrl(url) {
    url = text(url).trim();
    return url ? url.replace(/\s+/g, '') : '';
  }
  function resolveGasUrl() {
    var url = text(root.GAS_WEB_APP_URL || (root.APP_CONFIG && root.APP_CONFIG.gasWebAppUrl) || '');
    try { url = url || text(root.localStorage && root.localStorage.getItem('GAS_WEB_APP_URL') || ''); } catch (_) {}
    return normalizeUrl(url);
  }
  function isLikelyGasExecUrl(url) {
    return /^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_\-]+\/exec(?:[?#].*)?$/i.test(text(url).trim());
  }
  function bridgeError(message, code, method) {
    var err = new Error(message);
    err.code = code || 'GAS_BRIDGE_ERROR';
    err.errorCode = err.code;
    err.method = method || '';
    err.transportMode = state.mode;
    state.lastError = message;
    return err;
  }
  function localBase() { return text(cfg('localAssetBase', './partials/')); }
  function bundleFiles(name) {
    var key = text(name).replace(/^bundle:/i, '');
    var b = manifest && manifest.bundles && manifest.bundles[key];
    return b && Array.isArray(b.files) ? b.files.slice() : [];
  }
  function fileUrl(file) {
    var base = localBase();
    if (base && base.charAt(base.length - 1) !== '/') base += '/';
    return base + encodeURIComponent(file) + '.html';
  }
  function fetchFile(file) {
    file = text(file).trim();
    if (!safeName(file)) return Promise.reject(bridgeError('ไม่อนุญาตให้โหลด asset: ' + file, 'ASSET_NAME_REJECTED'));
    if (Object.prototype.hasOwnProperty.call(cache, file)) return Promise.resolve(cache[file]);
    return fetch(fileUrl(file), { credentials: 'same-origin', cache: 'no-store' }).then(function(resp) {
      if (!resp.ok) throw bridgeError('โหลด asset ไม่สำเร็จ: ' + file + ' (' + resp.status + ')', 'ASSET_LOAD_FAILED');
      return resp.text();
    }).then(function(html) {
      cache[file] = html;
      return html;
    });
  }
  function localInclude(name) {
    name = text(name).trim();
    var files = /^bundle:/i.test(name) ? bundleFiles(name) : [name];
    if (!files.length) return Promise.reject(bridgeError('ไม่พบ bundle/asset: ' + name, 'ASSET_NOT_FOUND'));
    return Promise.all(files.map(fetchFile)).then(function(parts) {
      return {
        ok: true,
        data: { name: name, html: parts.join('\n'), loadedAt: new Date().toISOString(), local: true },
        msg: 'โหลด partial จาก GitHub สำเร็จ'
      };
    });
  }
  function apiEnvelope(fn, args) {
    var method = text(fn).trim();
    var payload = args;
    if (method === 'apiRouter' && isObj(args)) {
      method = text(args.method || args.action || '').trim();
      payload = args.payload || args.params || args.data || {};
    }
    return { method: method, payload: payload == null ? {} : payload };
  }
  function parseMessage(data) {
    if (typeof data === 'string') {
      try { return JSON.parse(data); } catch (_) { return null; }
    }
    return data && typeof data === 'object' ? data : null;
  }
  function isBridgeMessage(data) {
    return !!data && (data.__gasIframeTransport === true || data.__gasIframeTransport === 'true' || data.bridge === 'named-request' || data.bridge === 'client-only');
  }
  function cleanupPending(id) {
    var item = pending[id];
    if (!item) return;
    delete pending[id];
    try { item.timer && clearTimeout(item.timer); } catch (_) {}
    try { item.removeTimer && clearTimeout(item.removeTimer); } catch (_) {}
    try { item.handler && root.removeEventListener('message', item.handler); } catch (_) {}
    try { item.iframe && item.iframe.parentNode && item.iframe.parentNode.removeChild(item.iframe); } catch (_) {}
  }
  function namedRequestSrc(url) {
    return url + (url.indexOf('?') >= 0 ? '&' : '?') +
      '__githubBridgeNamedRequest=1' +
      '&parentOrigin=*' +
      '&originHint=' + encodeURIComponent(root.location && root.location.origin || '') +
      '&bridge=named-request' +
      '&_=' + Date.now();
  }
  function runGasViaNamedIframe(method, payload) {
    if (!method) return Promise.reject(bridgeError('method required', 'METHOD_REQUIRED', method));
    var url = resolveGasUrl();
    if (!url) return Promise.reject(bridgeError('ยังไม่ได้ตั้งค่า GAS Web App URL ใน app-config.js', 'GAS_URL_MISSING', method));
    if (!isLikelyGasExecUrl(url)) return Promise.reject(bridgeError('GAS Web App URL ไม่ถูกต้อง ต้องเป็น URL จาก Deploy > Web app ที่ลงท้ายด้วย /exec', 'GAS_URL_INVALID', method));
    var timeoutMs = Number(cfg('apiTimeoutMs', 90000)) || 90000;
    return new Promise(function(resolve, reject) {
      var id = 'gasn_' + Date.now() + '_' + (++seq) + '_' + Math.floor(Math.random() * 1e6);
      var iframe = doc.createElement('iframe');
      var req = {
        __gasIframeTransport: true,
        bridge: 'named-request',
        type: 'GAS_IFRAME_NAMED_REQUEST',
        requestId: id,
        method: method,
        payload: payload == null ? {} : payload,
        createdAt: new Date().toISOString()
      };
      state.lastGasUrl = url;
      state.lastRequestId = id;
      state.lastRequestMethod = method;
      state.lastRequestStartedAt = req.createdAt;
      state.lastIframeLoaded = false;
      state.lastResponseAt = '';
      state.lastError = '';
      function finish(ok, value) {
        cleanupPending(id);
        if (ok) resolve(value); else reject(value);
      }
      var handler = function(event) {
        var data = parseMessage(event && event.data);
        if (!data || data.requestId !== id || !isBridgeMessage(data)) return;
        if (data.type === 'GAS_IFRAME_TRANSPORT_READY' || data.type === 'GAS_BRIDGE_READY') return;
        if (data.type !== 'GAS_IFRAME_TRANSPORT_RESPONSE' && data.type !== 'GAS_BRIDGE_API_RESPONSE') return;
        state.lastResponseAt = new Date().toISOString();
        var result = data.result || { ok: false, error: 'empty response', errorCode: 'EMPTY_BRIDGE_RESPONSE', source: 'github.namedRequest' };
        finish(true, result);
      };
      var timer = setTimeout(function() {
        finish(false, bridgeError('GAS API timeout: ' + method + ' — named-request iframe โหลดแล้วแต่ GAS ไม่ส่งผลกลับมา ให้ตรวจว่า deploy ล่าสุดมี __githubBridgeNamedRequest และ apiGithubBridgeCall และไม่มี doGet ซ้ำ', 'GAS_API_TIMEOUT', method));
      }, timeoutMs);
      var encodedRequest = encodeURIComponent(JSON.stringify(req));
      iframe.name = 'GAS_BRIDGE_NAMED_REQUEST:' + JSON.stringify(req);
      iframe.style.cssText = 'position:absolute;width:1px;height:1px;left:-9999px;top:-9999px;border:0;opacity:0;pointer-events:none;';
      iframe.setAttribute('aria-hidden', 'true');
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      iframe.addEventListener('load', function() { state.lastIframeLoaded = true; });
      pending[id] = { iframe: iframe, handler: handler, timer: timer };
      root.addEventListener('message', handler);
      iframe.src = namedRequestSrc(url) + '#GAS_BRIDGE_NAMED_REQUEST=' + encodedRequest;
      (doc.body || doc.documentElement).appendChild(iframe);
    });
  }
  function setLogo(url, source) {
    url = text(url).trim();
    if (!url) return false;
    source = source || 'github-config';
    root.APP_CONFIG = root.APP_CONFIG || {};
    root.APP_LOGO = root.APP_LOGO || {};
    root.APP_CONFIG.logoUrl = url;
    root.APP_LOGO.active = url;
    root.APP_LOGO.svg = url;
    root.APP_LOGO.png96 = url;
    root.APP_LOGO.png192 = url;
    root.APP_LOGO.png512 = url;
    root.APP_LOGO.source = source;
    root.DEFAULT_LOGO = url;
    root.LOGO_URL = url;
    root.currentLogoUrl = url;
    root.__SAFE_LOGO_URL__ = url;
    root.__APP_PARLIAMENT_LOGO__ = url;
    if (!/^data:image\/svg\+xml/i.test(url) || !/default/i.test(source)) {
      try { root.localStorage && root.localStorage.setItem('APP_LOGO_URL', url); } catch (_) {}
    }
    try {
      var nodes = doc.querySelectorAll('[data-logo="parliament"],#login-logo-img,#side-logo-img,#mobile-topbar-logo,#summary-logo-img,#ps-ai-print-logo,#report-logo-img,.print-logo-img');
      Array.prototype.forEach.call(nodes, function(img) {
        if (!img || !img.setAttribute) return;
        img.style.display = '';
        img.setAttribute('loading', img.id === 'login-logo-img' ? 'eager' : (img.getAttribute('loading') || 'eager'));
        img.setAttribute('decoding', img.id === 'login-logo-img' ? 'sync' : (img.getAttribute('decoding') || 'async'));
        try { img.fetchPriority = img.id === 'login-logo-img' ? 'high' : 'auto'; } catch (_) {}
        if (img.getAttribute('src') !== url) img.setAttribute('src', url);
        img.dataset.logoSource = source;
        img.classList && img.classList.add('logo-loaded');
      });
    } catch (_) {}
    try { root.updateLogos && root.updateLogos(url); } catch (_) {}
    try { root.patchParliamentLogo && root.patchParliamentLogo(); } catch (_) {}
    return true;
  }
  function preloadLogo(url) {
    url = text(url).trim();
    if (!url || /^data:/i.test(url)) return;
    try {
      var link = doc.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = url;
      (doc.head || doc.documentElement).appendChild(link);
    } catch (_) {}
  }
  function loadPublicConfig() {
    var url = resolveGasUrl();
    if (!url || !isLikelyGasExecUrl(url)) return Promise.resolve(null);
    return new Promise(function(resolve) {
      var cb = '__githubGasPublicConfig_' + Date.now() + '_' + (++seq);
      var done = false;
      var script = doc.createElement('script');
      var timer = setTimeout(function() {
        if (done) return;
        done = true;
        try { delete root[cb]; } catch (_) { root[cb] = void 0; }
        try { script.parentNode && script.parentNode.removeChild(script); } catch (_) {}
        resolve(null);
      }, Number(cfg('publicConfigTimeoutMs', 5000)) || 5000);
      root[cb] = function(data) {
        if (done) return;
        done = true;
        clearTimeout(timer);
        try { script.parentNode && script.parentNode.removeChild(script); } catch (_) {}
        try { delete root[cb]; } catch (_) { root[cb] = void 0; }
        if (data && data.ok) {
          var logo = text(data.logoUrl || (data.appLogo && (data.appLogo.active || data.appLogo.svg)) || '');
          if (logo) { preloadLogo(logo); setLogo(logo, 'gas-public-config'); }
        }
        resolve(data || null);
      };
      script.onerror = function() {
        if (done) return;
        done = true;
        clearTimeout(timer);
        try { delete root[cb]; } catch (_) { root[cb] = void 0; }
        resolve(null);
      };
      script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + '__githubPublicConfig=1&callback=' + encodeURIComponent(cb) + '&_=' + Date.now();
      (doc.head || doc.documentElement).appendChild(script);
    });
  }

  root.AppTransport = root.AppTransport || {};
  root.AppTransport.__githubGasBridge = true;
  root.AppTransport.transportMode = state.mode;
  root.AppTransport.bridgeClientState = function() {
    return {
      mode: state.mode,
      url: state.lastGasUrl || resolveGasUrl(),
      lastRequestId: state.lastRequestId,
      lastRequestMethod: state.lastRequestMethod,
      lastRequestStartedAt: state.lastRequestStartedAt,
      lastIframeLoaded: !!state.lastIframeLoaded,
      lastResponseAt: state.lastResponseAt,
      lastError: state.lastError
    };
  };
  root.AppTransport.run = function(fn, args) {
    var req = apiEnvelope(fn, args || {});
    if (/^getDeferredInclude$/i.test(req.method)) {
      var name = req.payload && (req.payload.name || req.payload.partial || req.payload.file) || '';
      return localInclude(name);
    }
    return runGasViaNamedIframe(req.method, req.payload || {});
  };
  root.AppTransport.setGasWebAppUrl = function(url) {
    root.GAS_WEB_APP_URL = normalizeUrl(url);
    root.APP_CONFIG = root.APP_CONFIG || {};
    root.APP_CONFIG.gasWebAppUrl = root.GAS_WEB_APP_URL;
    try { root.localStorage && root.localStorage.setItem('GAS_WEB_APP_URL', root.GAS_WEB_APP_URL); } catch (_) {}
    loadPublicConfig();
    return root.GAS_WEB_APP_URL;
  };
  root.AppTransport.setLogoUrl = function(url) { preloadLogo(url); return setLogo(url, 'manual'); };
  root.AppTransport.ping = function() { return runGasViaNamedIframe('apiGithubBridgePing', { at: new Date().toISOString(), transportMode: state.mode }); };
  root.AppTransport.ensureBridgeClient = function() { return Promise.resolve(root.AppTransport.bridgeClientState()); };

  try { preloadLogo(cfg('logoUrl', '')); setLogo(cfg('logoUrl', ''), 'app-config'); } catch (_) {}
  loadPublicConfig();
  if (doc.readyState === 'loading') {
    doc.addEventListener('DOMContentLoaded', function(){ preloadLogo(cfg('logoUrl', '')); setLogo(cfg('logoUrl', ''), 'app-config-dom'); }, { once: true });
  } else {
    preloadLogo(cfg('logoUrl', ''));
    setLogo(cfg('logoUrl', ''), 'app-config-dom');
  }
})(typeof window !== 'undefined' ? window : globalThis, typeof document !== 'undefined' ? document : null);
