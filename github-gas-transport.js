/* GitHub Pages <-> Google Apps Script transport bridge v4.
 * - Loads deferred page/runtime partials from local GitHub files.
 * - Calls GAS APIs through hidden iframe POST + postMessage.
 * - Loads public GAS config/logo via JSONP for static GitHub Pages.
 */
(function(root, doc) {
  'use strict';
  if (!root || !doc) return;
  var manifest = (root.APP_CONFIG && root.APP_CONFIG.assetManifest) || root.__APP_ASSET_MANIFEST__ || {};
  var cache = Object.create(null);
  var pending = Object.create(null);
  var seq = 0;
  function text(v) { return v == null ? '' : String(v); }
  function isObj(v) { return !!v && typeof v === 'object' && !Array.isArray(v); }
  function safeName(name) { return /^[A-Za-z0-9_\-]+$/.test(text(name)); }
  function cfg(name, fallback) {
    var c = root.APP_CONFIG || {};
    return c[name] == null || c[name] === '' ? fallback : c[name];
  }
  function localBase() { return text(cfg('localAssetBase', './partials/')); }
  function resolveGasUrl() {
    var url = text(root.GAS_WEB_APP_URL || (root.APP_CONFIG && root.APP_CONFIG.gasWebAppUrl) || '');
    try { url = url || text(root.localStorage && root.localStorage.getItem('GAS_WEB_APP_URL') || ''); } catch (_) {}
    return url.trim();
  }
  function isLikelyGasExecUrl(url) {
    return /^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_\-]+\/exec(?:[?#].*)?$/i.test(text(url).trim());
  }
  function bridgeError(message, code, method) {
    var err = new Error(message);
    err.code = code || 'GAS_BRIDGE_ERROR';
    err.errorCode = err.code;
    err.method = method || '';
    return err;
  }
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
    return fetch(fileUrl(file), { credentials: 'same-origin', cache: 'no-cache' }).then(function(resp) {
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
    var method = text(fn).trim(), payload = args;
    if (method === 'apiRouter' && isObj(args)) {
      method = text(args.method || args.action || '').trim();
      payload = args.payload || args.params || args.data || {};
    }
    return { method: method, payload: payload == null ? {} : payload };
  }
  function cleanup(id) {
    var item = pending[id];
    if (!item) return;
    delete pending[id];
    try { root.removeEventListener('message', item.handler); } catch (_) {}
    try { item.timer && clearTimeout(item.timer); } catch (_) {}
    try { item.noMessageTimer && clearTimeout(item.noMessageTimer); } catch (_) {}
    try { item.form && item.form.parentNode && item.form.parentNode.removeChild(item.form); } catch (_) {}
    try { setTimeout(function(){ item.iframe && item.iframe.parentNode && item.iframe.parentNode.removeChild(item.iframe); }, 0); } catch (_) {}
  }
  function addField(form, name, value) {
    var input = doc.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = text(value);
    form.appendChild(input);
  }
  function normalizeUrl(url) {
    url = text(url).trim();
    if (!url) return '';
    return url.replace(/\s+/g, '');
  }
  function runGasViaForm(method, payload) {
    var url = normalizeUrl(resolveGasUrl());
    if (!url) return Promise.reject(bridgeError('ยังไม่ได้ตั้งค่า GAS Web App URL ใน app-config.js', 'GAS_URL_MISSING', method));
    if (!isLikelyGasExecUrl(url)) {
      return Promise.reject(bridgeError('GAS Web App URL ไม่ถูกต้อง ต้องเป็น URL จาก Deploy > Web app ที่ลงท้ายด้วย /exec', 'GAS_URL_INVALID', method));
    }
    if (!method) return Promise.reject(bridgeError('method required', 'METHOD_REQUIRED', method));
    var id = 'gaspm_' + Date.now() + '_' + (++seq) + '_' + Math.floor(Math.random() * 1e6);
    var timeoutMs = Number(cfg('apiTimeoutMs', 90000)) || 90000;
    return new Promise(function(resolve, reject) {
      var iframe = doc.createElement('iframe');
      var form = doc.createElement('form');
      var submittedAt = 0;
      iframe.name = id;
      iframe.id = id;
      iframe.style.cssText = 'position:absolute;width:1px;height:1px;left:-9999px;top:-9999px;border:0;opacity:0;';
      iframe.setAttribute('aria-hidden', 'true');
      iframe.addEventListener('load', function() {
        var item = pending[id];
        if (!item || !submittedAt || Date.now() - submittedAt < 1000) return;
        try { item.noMessageTimer && clearTimeout(item.noMessageTimer); } catch (_) {}
        item.noMessageTimer = setTimeout(function() {
          if (!pending[id]) return;
          cleanup(id);
          reject(bridgeError('GAS bridge โหลดหน้า response แล้ว แต่ไม่มี callback postMessage กลับมา: ' + method + ' — form POST transport ไม่ได้รับ callback; ให้ใช้ bridge client v6 หรือ deploy GAS backend v6 ใหม่', 'GAS_BRIDGE_NO_POSTMESSAGE', method));
        }, Number(cfg('bridgeNoMessageTimeoutMs', 30000)) || 30000);
      });
      form.method = 'POST';
      form.action = url;
      form.target = id;
      form.enctype = 'application/x-www-form-urlencoded';
      form.acceptCharset = 'UTF-8';
      form.style.display = 'none';
      addField(form, '__transport', 'iframe-postmessage');
      addField(form, 'requestId', id);
      addField(form, 'parentOrigin', root.location && root.location.origin || '*');
      addField(form, 'method', method);
      addField(form, 'payload', JSON.stringify(payload == null ? {} : payload));
      var handler = function(event) {
        var data = event && event.data;
        if (typeof data === 'string') {
          try { data = JSON.parse(data); } catch (_) {}
        }
        if (!data || data.requestId !== id) return;
        if (!(data.__gasIframeTransport === true || data.__gasIframeTransport === 'true' || data.type === 'GAS_IFRAME_TRANSPORT_RESPONSE')) return;
        var result = data.result || { ok: false, error: 'empty response', errorCode: 'EMPTY_BRIDGE_RESPONSE' };
        cleanup(id);
        resolve(result);
      };
      var timer = setTimeout(function() {
        cleanup(id);
        reject(bridgeError('GAS API timeout: ' + method + ' — ตรวจสอบว่าใช้ /exec URL, deploy GAS backend เวอร์ชันล่าสุด และ Web app เปิดสิทธิ์เป็น Anyone', 'GAS_API_TIMEOUT', method));
      }, timeoutMs);
      pending[id] = { iframe: iframe, form: form, handler: handler, timer: timer, noMessageTimer: null };
      root.addEventListener('message', handler);
      (doc.body || doc.documentElement).appendChild(iframe);
      (doc.body || doc.documentElement).appendChild(form);
      try { submittedAt = Date.now(); form.submit(); } catch (e) { cleanup(id); reject(e); }
    });
  }

  var bridgeClient = { iframe: null, ready: false, promise: null, url: '' };
  function bridgeClientSrc(url) {
    return url + (url.indexOf('?') >= 0 ? '&' : '?') + '__githubBridgeClient=1&parentOrigin=' + encodeURIComponent(root.location && root.location.origin || '*') + '&_=' + Date.now();
  }
  function ensureBridgeClient() {
    var url = normalizeUrl(resolveGasUrl());
    if (!url) return Promise.reject(bridgeError('ยังไม่ได้ตั้งค่า GAS Web App URL ใน app-config.js', 'GAS_URL_MISSING'));
    if (!isLikelyGasExecUrl(url)) {
      return Promise.reject(bridgeError('GAS Web App URL ไม่ถูกต้อง ต้องเป็น URL จาก Deploy > Web app ที่ลงท้ายด้วย /exec', 'GAS_URL_INVALID'));
    }
    if (bridgeClient.ready && bridgeClient.iframe && bridgeClient.url === url) return Promise.resolve(bridgeClient.iframe);
    if (bridgeClient.promise && bridgeClient.url === url) return bridgeClient.promise;
    bridgeClient.ready = false;
    bridgeClient.url = url;
    try { bridgeClient.iframe && bridgeClient.iframe.parentNode && bridgeClient.iframe.parentNode.removeChild(bridgeClient.iframe); } catch (_) {}
    bridgeClient.promise = new Promise(function(resolve, reject) {
      var iframe = doc.createElement('iframe');
      var timer, settled = false;
      function finish(ok, value) {
        if (settled) return;
        settled = true;
        try { clearTimeout(timer); } catch (_) {}
        try { root.removeEventListener('message', onReady); } catch (_) {}
        if (ok) resolve(value); else reject(value);
      }
      function onReady(event) {
        var data = event && event.data;
        if (typeof data === 'string') { try { data = JSON.parse(data); } catch (_) {} }
        if (!data || !(data.__gasIframeTransport === true || data.__gasIframeTransport === 'true')) return;
        if (data.type !== 'GAS_IFRAME_TRANSPORT_READY') return;
        bridgeClient.ready = true;
        finish(true, iframe);
      }
      iframe.name = 'gas_bridge_client_' + Date.now() + '_' + Math.floor(Math.random() * 1e6);
      iframe.style.cssText = 'position:absolute;width:1px;height:1px;left:-9999px;top:-9999px;border:0;opacity:0;';
      iframe.setAttribute('aria-hidden', 'true');
      iframe.src = bridgeClientSrc(url);
      bridgeClient.iframe = iframe;
      root.addEventListener('message', onReady);
      timer = setTimeout(function() {
        bridgeClient.ready = false;
        bridgeClient.promise = null;
        finish(false, bridgeError('GAS bridge client v6 ไม่ส่งสัญญาณ READY — ให้ deploy GAS backend v6 และตั้ง Web app เป็น Anyone', 'GAS_BRIDGE_CLIENT_NOT_READY'));
      }, Number(cfg('bridgeReadyTimeoutMs', 25000)) || 25000);
      (doc.body || doc.documentElement).appendChild(iframe);
    });
    return bridgeClient.promise;
  }
  function runGasViaClient(method, payload) {
    if (!method) return Promise.reject(bridgeError('method required', 'METHOD_REQUIRED', method));
    var timeoutMs = Number(cfg('apiTimeoutMs', 90000)) || 90000;
    return ensureBridgeClient().then(function(iframe) {
      return new Promise(function(resolve, reject) {
        var id = 'gasc_' + Date.now() + '_' + (++seq) + '_' + Math.floor(Math.random() * 1e6);
        var handler = function(event) {
          var data = event && event.data;
          if (typeof data === 'string') { try { data = JSON.parse(data); } catch (_) {} }
          if (!data || data.requestId !== id) return;
          if (!(data.__gasIframeTransport === true || data.__gasIframeTransport === 'true' || data.type === 'GAS_IFRAME_TRANSPORT_RESPONSE')) return;
          var result = data.result || { ok: false, error: 'empty response', errorCode: 'EMPTY_BRIDGE_RESPONSE' };
          try { root.removeEventListener('message', handler); } catch (_) {}
          try { clearTimeout(timer); } catch (_) {}
          delete pending[id];
          resolve(result);
        };
        var timer = setTimeout(function() {
          try { root.removeEventListener('message', handler); } catch (_) {}
          delete pending[id];
          reject(bridgeError('GAS API timeout: ' + method + ' — bridge client v6 โหลดแล้วแต่ backend ไม่ตอบกลับ', 'GAS_API_TIMEOUT', method));
        }, timeoutMs);
        pending[id] = { handler: handler, timer: timer };
        root.addEventListener('message', handler);
        try {
          iframe.contentWindow.postMessage({
            __gasIframeTransport: true,
            type: 'GAS_IFRAME_TRANSPORT_REQUEST',
            version: 'v6',
            requestId: id,
            method: method,
            payload: payload == null ? {} : payload
          }, '*');
        } catch (e) {
          try { root.removeEventListener('message', handler); } catch (_) {}
          try { clearTimeout(timer); } catch (_) {}
          delete pending[id];
          reject(e);
        }
      });
    });
  }
  function runGas(method, payload) {
    if (/^(1|true|yes)$/i.test(String(cfg('forceFormPostTransport', '')))) {
      return runGasViaForm(method, payload);
    }
    return runGasViaClient(method, payload).catch(function(err) {
      if (/^(1|true|yes)$/i.test(String(cfg('disableFormPostFallback', '')))) throw err;
      try { console.warn && console.warn('[GAS bridge] client transport failed; fallback to form POST', err); } catch (_) {}
      return runGasViaForm(method, payload);
    });
  }
  function setLogo(url, source) {
    url = text(url).trim();
    if (!url) return false;
    root.APP_CONFIG = root.APP_CONFIG || {};
    root.APP_CONFIG.logoUrl = root.APP_CONFIG.logoUrl || url;
    root.APP_LOGO = root.APP_LOGO || {};
    root.APP_LOGO.active = root.APP_LOGO.active || url;
    root.APP_LOGO.svg = root.APP_LOGO.svg || url;
    root.APP_LOGO.png96 = root.APP_LOGO.png96 || url;
    root.APP_LOGO.png192 = root.APP_LOGO.png192 || url;
    root.APP_LOGO.png512 = root.APP_LOGO.png512 || url;
    root.DEFAULT_LOGO = url;
    root.LOGO_URL = url;
    root.currentLogoUrl = url;
    root.__SAFE_LOGO_URL__ = url;
    root.__APP_PARLIAMENT_LOGO__ = url;
    try { root.localStorage && root.localStorage.setItem('APP_LOGO_URL', url); } catch (_) {}
    try {
      var nodes = doc.querySelectorAll('[data-logo="parliament"],#login-logo-img,#side-logo-img,#mobile-topbar-logo,#summary-logo-img,#ps-ai-print-logo,#report-logo-img,.print-logo-img');
      Array.prototype.forEach.call(nodes, function(img) {
        if (!img || !img.setAttribute) return;
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
    var url = normalizeUrl(resolveGasUrl());
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
      }, Number(cfg('publicConfigTimeoutMs', 8000)) || 8000);
      root[cb] = function(data) {
        if (done) return;
        done = true;
        clearTimeout(timer);
        try { script.parentNode && script.parentNode.removeChild(script); } catch (_) {}
        try { delete root[cb]; } catch (_) { root[cb] = void 0; }
        if (data && data.ok) {
          var logo = text(data.logoUrl || (data.appLogo && (data.appLogo.active || data.appLogo.svg)) || '');
          logo && setLogo(logo, 'gas-public-config');
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
  root.AppTransport.run = function(fn, args) {
    var req = apiEnvelope(fn, args || {});
    if (/^getDeferredInclude$/i.test(req.method)) {
      var name = req.payload && (req.payload.name || req.payload.partial || req.payload.file) || '';
      return localInclude(name);
    }
    return runGas(req.method, req.payload || {});
  };
  root.AppTransport.setGasWebAppUrl = function(url) {
    root.GAS_WEB_APP_URL = normalizeUrl(url);
    root.APP_CONFIG = root.APP_CONFIG || {};
    root.APP_CONFIG.gasWebAppUrl = root.GAS_WEB_APP_URL;
    try { root.localStorage && root.localStorage.setItem('GAS_WEB_APP_URL', root.GAS_WEB_APP_URL); } catch (_) {}
    loadPublicConfig();
    return root.GAS_WEB_APP_URL;
  };
  root.AppTransport.setLogoUrl = function(url) { return setLogo(url, 'manual'); };
  root.AppTransport.ping = function() { return runGas('apiGithubBridgePing', { at: new Date().toISOString() }); };
  try { setLogo(cfg('logoUrl', ''), 'app-config'); } catch (_) {}
  if (doc.readyState === 'loading') {
    doc.addEventListener('DOMContentLoaded', function(){ setLogo(cfg('logoUrl', ''), 'app-config-dom'); loadPublicConfig(); }, { once: true });
  } else {
    setLogo(cfg('logoUrl', ''), 'app-config-dom');
    loadPublicConfig();
  }
})(typeof window !== 'undefined' ? window : globalThis, typeof document !== 'undefined' ? document : null);
