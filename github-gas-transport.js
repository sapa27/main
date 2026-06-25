/* GitHub Pages <-> Google Apps Script transport bridge.
 * - Loads deferred page/runtime partials from local GitHub files.
 * - Calls GAS APIs through hidden iframe POST + postMessage, avoiding CORS and keeping credentials out of URL query strings.
 */
(function(root, doc) {
  'use strict';
  if (!root || !doc) return;
  var cfg = root.APP_CONFIG || {};
  var manifest = cfg.assetManifest || root.__APP_ASSET_MANIFEST__ || {};
  var cache = Object.create(null);
  var pending = Object.create(null);
  var seq = 0;
  function text(v) { return v == null ? '' : String(v); }
  function isObj(v) { return !!v && typeof v === 'object' && !Array.isArray(v); }
  function safeName(name) { return /^[A-Za-z0-9_\-]+$/.test(text(name)); }
  function localBase() { return text((root.APP_CONFIG || {}).localAssetBase || './partials/'); }
  function resolveGasUrl() {
    var url = text(root.GAS_WEB_APP_URL || (root.APP_CONFIG && root.APP_CONFIG.gasWebAppUrl) || '');
    try { url = url || text(root.localStorage && root.localStorage.getItem('GAS_WEB_APP_URL') || ''); } catch (_) {}
    return url.trim();
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
    if (!safeName(file)) return Promise.reject(new Error('ไม่อนุญาตให้โหลด asset: ' + file));
    if (Object.prototype.hasOwnProperty.call(cache, file)) return Promise.resolve(cache[file]);
    return fetch(fileUrl(file), { credentials: 'same-origin', cache: 'no-cache' }).then(function(resp) {
      if (!resp.ok) throw new Error('โหลด asset ไม่สำเร็จ: ' + file + ' (' + resp.status + ')');
      return resp.text();
    }).then(function(html) {
      cache[file] = html;
      return html;
    });
  }
  function localInclude(name) {
    name = text(name).trim();
    var files = /^bundle:/i.test(name) ? bundleFiles(name) : [name];
    if (!files.length) return Promise.reject(new Error('ไม่พบ bundle/asset: ' + name));
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
  function runGas(method, payload) {
    var url = resolveGasUrl();
    if (!url) return Promise.reject(new Error('ยังไม่ได้ตั้งค่า GAS_WEB_APP_URL ใน app-config.js หรือ localStorage'));
    if (!method) return Promise.reject(new Error('method required'));
    var id = 'gaspm_' + Date.now() + '_' + (++seq) + '_' + Math.floor(Math.random() * 1e6);
    var timeoutMs = Number((root.APP_CONFIG && root.APP_CONFIG.apiTimeoutMs) || 90000) || 90000;
    return new Promise(function(resolve, reject) {
      var iframe = doc.createElement('iframe');
      var form = doc.createElement('form');
      iframe.name = id;
      iframe.style.cssText = 'position:absolute;width:1px;height:1px;left:-9999px;top:-9999px;border:0;opacity:0;';
      iframe.setAttribute('aria-hidden', 'true');
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
        if (!data || data.requestId !== id || data.__gasIframeTransport !== true) return;
        var result = data.result || { ok: false, error: 'empty response', errorCode: 'EMPTY_BRIDGE_RESPONSE' };
        cleanup(id);
        resolve(result);
      };
      var timer = setTimeout(function() {
        cleanup(id);
        reject(new Error('GAS API timeout: ' + method));
      }, timeoutMs);
      pending[id] = { iframe: iframe, form: form, handler: handler, timer: timer };
      root.addEventListener('message', handler);
      (doc.body || doc.documentElement).appendChild(iframe);
      (doc.body || doc.documentElement).appendChild(form);
      try { form.submit(); } catch (e) { cleanup(id); reject(e); }
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
    root.GAS_WEB_APP_URL = text(url).trim();
    root.APP_CONFIG = root.APP_CONFIG || {};
    root.APP_CONFIG.gasWebAppUrl = root.GAS_WEB_APP_URL;
    try { root.localStorage && root.localStorage.setItem('GAS_WEB_APP_URL', root.GAS_WEB_APP_URL); } catch (_) {}
    return root.GAS_WEB_APP_URL;
  };
})(typeof window !== 'undefined' ? window : globalThis, typeof document !== 'undefined' ? document : null);
