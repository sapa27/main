(function (w, d) {
  "use strict";
  if (!w || !d) return;

  var OWNER = "github-pages/github-gas-transport.js::canonical";
  var MODE = "github-pages-gas-router-messagechannel-first";
  var DEFAULT_BRIDGE_VERSION = "github-pages-bridge-v2-mc2";

  var pending = Object.create(null);
  var postPending = Object.create(null);
  var inFlight = Object.create(null);

  var frame = null;
  var readyPromise = null;
  var bridgePort = null;
  var nonce = "";
  var protocol = "";
  var state = "idle";
  var bridgeOrigin = "";
  var bridgeChannel = "";
  var lastError = "";
  var sequence = 0;
  var postSequence = 0;
  var expectedBridgeVersion = DEFAULT_BRIDGE_VERSION;

  var metrics = {
    calls: 0,
    bridgeCalls: 0,
    readyTransfers: 0,
    portAcks: 0,
    portReady: 0,
    readyFailures: 0,
    postCalls: 0,
    postResults: 0,
    postFallbacks: 0,
    errors: 0,
    dedupeHits: 0,
    wardenInboundWindowCalls: 0
  };

  function text(value) { return value == null ? "" : String(value); }
  function isObject(value) { return !!value && typeof value === "object" && !Array.isArray(value); }
  function configValue(key, fallback) {
    var a = w.APP_GITHUB_CONFIG || {};
    var b = w.APP_CONFIG || {};
    var value = a[key];
    if (value == null || value === "") value = b[key];
    return value == null || value === "" ? fallback : value;
  }
  function gasUrl() {
    var value = text(configValue("GAS_WEB_APP_URL", configValue("gasWebAppUrl", w.GAS_WEB_APP_URL || ""))).trim();
    return /^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec(?:[?#].*)?$/i.test(value)
      ? value.replace(/[?#].*$/, "")
      : "";
  }
  function makeError(message, code) {
    var error = new Error(text(message || "GAS transport error"));
    error.code = text(code || "GAS_TRANSPORT_ERROR");
    error.errorCode = error.code;
    error.transportMode = MODE;
    return error;
  }
  function randomNonce() {
    var bytes = new Uint8Array(24);
    try { w.crypto.getRandomValues(bytes); }
    catch (_ignored) {
      for (var i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256);
    }
    return Array.prototype.map.call(bytes, function (value) {
      return ("0" + value.toString(16)).slice(-2);
    }).join("");
  }
  function trustedGoogleOrigin(value) {
    value = text(value).trim().toLowerCase();
    if (!value) return false;
    try {
      var url = new URL(value);
      var host = text(url.hostname).toLowerCase();
      if (url.protocol !== "https:") return false;
      return host === "script.google.com" ||
        host === "script.googleusercontent.com" ||
        host.endsWith(".script.googleusercontent.com") ||
        host.endsWith("-script.googleusercontent.com");
    } catch (_ignored) {
      return false;
    }
  }
  function trustedBridgeEvent(event, data) {
    var origin = text(event && event.origin).toLowerCase();
    if (trustedGoogleOrigin(origin)) return true;
    return origin === "null" && !!data && text(data.nonce) === nonce && text(data.bridgeVersion) === expectedBridgeVersion;
  }
  function trustedPostEvent(event, data, record) {
    var origin = text(event && event.origin).toLowerCase();
    return !!record && text(data && data.nonce) === text(record.nonce) &&
      (trustedGoogleOrigin(origin) || origin === "null");
  }
  function parseData(value) {
    if (typeof value === "string") {
      try { return JSON.parse(value); } catch (_ignored) { return null; }
    }
    return isObject(value) ? value : null;
  }
  function bridgeUrl() {
    var gas = gasUrl();
    if (!gas) throw makeError("ยังไม่ได้กำหนด GAS Web App URL", "GITHUB_GAS_URL_NOT_CONFIGURED");
    expectedBridgeVersion = text(configValue("BRIDGE_VERSION", DEFAULT_BRIDGE_VERSION)) || DEFAULT_BRIDGE_VERSION;
    return gas + "?mode=github-bridge&__githubBridgeClient=1" +
      "&parentOrigin=" + encodeURIComponent(w.location.origin) +
      "&nonce=" + encodeURIComponent(nonce) +
      "&bridgeNonce=" + encodeURIComponent(nonce) +
      "&bridgeVersion=" + encodeURIComponent(expectedBridgeVersion);
  }

  function cleanupPending(id, error) {
    var record = pending[id];
    if (!record) return;
    delete pending[id];
    if (record.timer) w.clearTimeout(record.timer);
    if (error) record.reject(error);
  }
  function cleanupPost(id, error) {
    var record = postPending[id];
    if (!record) return;
    delete postPending[id];
    if (record.timer) w.clearTimeout(record.timer);
    try { if (record.form && record.form.parentNode) record.form.parentNode.removeChild(record.form); } catch (_ignoredForm) {}
    try { if (record.frame && record.frame.parentNode) record.frame.parentNode.removeChild(record.frame); } catch (_ignoredFrame) {}
    if (error) record.reject(error);
  }
  function closeBridgePort() {
    if (!bridgePort) return;
    try { bridgePort.onmessage = null; } catch (_ignoredMessage) {}
    try { bridgePort.onmessageerror = null; } catch (_ignoredMessageError) {}
    try { bridgePort.close(); } catch (_ignoredClose) {}
    bridgePort = null;
    bridgeChannel = "";
  }
  function rejectReady(error) {
    if (!readyPromise || !readyPromise._reject) return;
    var reject = readyPromise._reject;
    if (readyPromise._timer) w.clearTimeout(readyPromise._timer);
    readyPromise = null;
    state = "error";
    metrics.errors++;
    reject(error);
  }
  function resolveReady() {
    if (!readyPromise || !readyPromise._resolve) return;
    var resolve = readyPromise._resolve;
    if (readyPromise._timer) w.clearTimeout(readyPromise._timer);
    readyPromise = null;
    state = "ready";
    lastError = "";
    protocol = "v2-message-port";
    bridgeChannel = "message-port";
    metrics.portReady++;
    resolve(true);
  }
  function handleBridgeResult(data) {
    data = data || {};
    if (data.type !== "GAS_BRIDGE_RESULT" || text(data.nonce) !== nonce) return;
    var id = text(data.id);
    var record = pending[id];
    if (!record) return;
    delete pending[id];
    if (record.timer) w.clearTimeout(record.timer);
    if (data.ok) record.resolve(data.result);
    else {
      metrics.errors++;
      record.reject(makeError(data.error && (data.error.message || data.error) || "GAS bridge request failed",
        data.error && (data.error.code || data.error.errorCode) || "GAS_BRIDGE_REQUEST_FAILED"));
    }
  }
  function handlePortMessage(event) {
    var data = parseData(event && event.data);
    if (!data || text(data.nonce) !== nonce) return;
    if (text(data.bridgeVersion) !== expectedBridgeVersion) {
      lastError = "GAS Bridge version ไม่ตรง: " + text(data.bridgeVersion || "unknown") + " (ต้องเป็น " + expectedBridgeVersion + ")";
      rejectReady(makeError(lastError, "GAS_BRIDGE_VERSION_MISMATCH"));
      return;
    }
    if (data.type === "GAS_BRIDGE_READY") {
      resolveReady();
      return;
    }
    if (data.type === "GAS_BRIDGE_RESULT") {
      handleBridgeResult(data);
    }
  }
  function attachPort(port, eventOrigin) {
    closeBridgePort();
    bridgePort = port || null;
    if (!bridgePort) return false;
    bridgeOrigin = text(eventOrigin) === "null" ? "opaque-apps-script-sandbox" : text(eventOrigin);
    bridgeChannel = "message-port";
    bridgePort.onmessage = handlePortMessage;
    bridgePort.onmessageerror = function () {
      lastError = "GAS MessagePort message error";
      metrics.errors++;
    };
    try { if (bridgePort.start) bridgePort.start(); } catch (_ignoredStart) {}
    return true;
  }
  function handleWindowMessage(event) {
    var data = parseData(event && event.data);
    if (!data) return;

    if (data.type === "GAS_POST_RESULT") {
      var postId = text(data.id);
      var postRecord = postPending[postId];
      if (!trustedPostEvent(event, data, postRecord)) return;
      delete postPending[postId];
      if (postRecord.timer) w.clearTimeout(postRecord.timer);
      try { if (postRecord.form && postRecord.form.parentNode) postRecord.form.parentNode.removeChild(postRecord.form); } catch (_ignoredForm) {}
      try { if (postRecord.frame && postRecord.frame.parentNode) postRecord.frame.parentNode.removeChild(postRecord.frame); } catch (_ignoredFrame) {}
      metrics.postResults++;
      if (data.ok) postRecord.resolve(data.result);
      else postRecord.reject(makeError(data.error && (data.error.message || data.error) || "GAS POST request failed",
        data.error && (data.error.code || data.error.errorCode) || "GAS_POST_REQUEST_FAILED"));
      return;
    }

    /* Old deployments may still emit GAS_POST_READY. Do not reply to the GAS iframe.
       A GitHub -> googleusercontent postMessage is exactly the path Google Warden drops. */
    if (data.type === "GAS_POST_READY") return;

    if (text(data.nonce) !== nonce || !trustedBridgeEvent(event, data)) return;
    if (data.type === "GAS_BRIDGE_ERROR") {
      lastError = text(data.message || data.code || "GAS_BRIDGE_ERROR");
      if (data.requestedOrigin || data.configuredOrigins) {
        lastError += " — requested: " + text(data.requestedOrigin || w.location.origin) +
          "; configured: " + (Array.isArray(data.configuredOrigins) ? data.configuredOrigins.join(", ") : text(data.configuredOrigins || "(ไม่มีค่า)"));
      }
      rejectReady(makeError(lastError, text(data.code || "GAS_BRIDGE_ERROR")));
      return;
    }
    if (data.type !== "GAS_BRIDGE_READY") return;
    if (text(data.bridgeVersion) !== expectedBridgeVersion) {
      lastError = "GAS Bridge version ไม่ตรง: " + text(data.bridgeVersion || "unknown") + " (ต้องเป็น " + expectedBridgeVersion + ")";
      rejectReady(makeError(lastError, "GAS_BRIDGE_VERSION_MISMATCH"));
      return;
    }
    var transferredPort = event.ports && event.ports[0] || null;
    if (!transferredPort) {
      lastError = "GAS_BRIDGE_MESSAGE_PORT_MISSING";
      return;
    }
    metrics.readyTransfers++;
    if (!attachPort(transferredPort, event.origin)) {
      lastError = "GAS_BRIDGE_MESSAGE_PORT_ATTACH_FAILED";
      return;
    }
    state = "port-handshake";
    try {
      bridgePort.postMessage({
        type: "GAS_BRIDGE_PORT_ACK",
        nonce: nonce,
        bridgeVersion: expectedBridgeVersion
      });
      metrics.portAcks++;
      bridgePort.postMessage({
        type: "GAS_BRIDGE_READY_PROBE",
        nonce: nonce,
        bridgeVersion: expectedBridgeVersion
      });
    } catch (error) {
      lastError = "ส่ง MessagePort handshake ไม่สำเร็จ";
      rejectReady(makeError(lastError + ": " + text(error && error.message || error), "GAS_BRIDGE_PORT_HANDSHAKE_FAILED"));
    }
  }
  w.addEventListener("message", handleWindowMessage, false);

  function ensureBridge() {
    if (state === "ready" && bridgePort) return Promise.resolve(true);
    if (readyPromise) return readyPromise;

    nonce = randomNonce();
    protocol = "";
    state = "loading";
    lastError = "";
    bridgeOrigin = "";
    closeBridgePort();

    var resolveReadyPromise, rejectReadyPromise;
    readyPromise = new Promise(function (resolve, reject) {
      resolveReadyPromise = resolve;
      rejectReadyPromise = reject;
    });
    readyPromise._resolve = resolveReadyPromise;
    readyPromise._reject = rejectReadyPromise;

    var timeoutMs = Math.max(5000, Number(configValue("BRIDGE_TIMEOUT_MS", configValue("bridgeTimeoutMs", 15000))) || 15000);
    readyPromise._timer = w.setTimeout(function () {
      if (state === "ready") return;
      metrics.readyFailures++;
      state = "loaded-no-ready";
      lastError = bridgePort
        ? "GAS MessagePort ถูกส่งมาแต่ handshake ไม่สำเร็จ"
        : "GAS Bridge ไม่ส่ง MessagePort READY";
      rejectReady(makeError(lastError, bridgePort ? "GAS_BRIDGE_PORT_READY_TIMEOUT" : "GAS_BRIDGE_READY_TIMEOUT"));
    }, timeoutMs);

    try { if (frame && frame.parentNode) frame.parentNode.removeChild(frame); } catch (_ignoredFrame) {}
    frame = d.createElement("iframe");
    frame.id = "app-gas-github-bridge";
    frame.title = "GAS API Bridge";
    frame.setAttribute("aria-hidden", "true");
    frame.setAttribute("referrerpolicy", "no-referrer");
    frame.style.cssText = "position:fixed;width:1px;height:1px;left:-10000px;top:-10000px;border:0;opacity:0;pointer-events:none";
    frame.onload = function () {
      if (state !== "ready" && state !== "port-handshake") state = "loaded-awaiting-port";
      /* Deliberately do not send any window message into the GAS iframe here.
         Google Apps Script Warden drops messages from sapa27.github.io to the
         googleusercontent sandbox. The GAS bridge must initiate MessageChannel. */
    };
    frame.onerror = function () {
      state = "load-error";
      lastError = "โหลด GAS iframe ไม่สำเร็จ";
    };
    try { frame.src = bridgeUrl(); }
    catch (error) {
      rejectReady(error);
      return readyPromise || Promise.reject(error);
    }
    (d.body || d.documentElement).appendChild(frame);
    return readyPromise;
  }

  function normalizeInvocation(fn, args) {
    fn = text(fn).trim();
    args = args == null ? {} : args;
    if (fn === "apiRouter" || fn === "apiLogin" || fn === "apiSessionResume" || fn === "apiSessionCheck" || fn === "apiLogout" || fn === "getDeferredInclude") {
      return { fn: fn, args: args, original: fn };
    }
    return { fn: "apiRouter", args: { method: fn, payload: args }, original: fn };
  }

  function bridgeRun(fn, args, options) {
    options = options || {};
    var invocation = normalizeInvocation(fn, args);
    return ensureBridge().then(function () {
      return new Promise(function (resolve, reject) {
        if (!bridgePort || state !== "ready") {
          reject(makeError("GAS MessagePort unavailable", "GAS_BRIDGE_PORT_UNAVAILABLE"));
          return;
        }
        var id = "gh_" + Date.now().toString(36) + "_" + (++sequence).toString(36);
        var timeoutMs = Math.max(10000, Number(options.timeoutMs || configValue("REQUEST_TIMEOUT_MS", configValue("requestTimeoutMs", 90000))) || 90000);
        pending[id] = {
          resolve: resolve,
          reject: reject,
          timer: w.setTimeout(function () {
            metrics.errors++;
            cleanupPending(id, makeError("GAS request timeout: " + invocation.original, "GAS_BRIDGE_REQUEST_TIMEOUT"));
          }, timeoutMs)
        };
        metrics.bridgeCalls++;
        try {
          bridgePort.postMessage({
            type: "GAS_BRIDGE_CALL",
            nonce: nonce,
            bridgeVersion: expectedBridgeVersion,
            id: id,
            fn: invocation.fn,
            args: invocation.args
          });
        } catch (error) {
          cleanupPending(id, error);
        }
      });
    });
  }

  function appendField(form, name, value) {
    var input = d.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = text(value);
    form.appendChild(input);
  }
  function postRun(fn, args, options) {
    options = options || {};
    var gas = gasUrl();
    if (!gas) return Promise.reject(makeError("ยังไม่ได้กำหนด GAS Web App URL", "GITHUB_GAS_URL_NOT_CONFIGURED"));
    var invocation = normalizeInvocation(fn, args);
    var id = "ghp_" + Date.now().toString(36) + "_" + (++postSequence).toString(36);
    var requestNonce = randomNonce();
    var timeoutMs = Math.max(10000, Number(options.timeoutMs || configValue("API_POST_FALLBACK_TIMEOUT_MS", 20000)) || 20000);
    var argsJson;
    try { argsJson = JSON.stringify(invocation.args); }
    catch (_serializeError) {
      return Promise.reject(makeError("ไม่สามารถแปลง API payload เป็น JSON", "GITHUB_POST_PAYLOAD_SERIALIZE_FAILED"));
    }
    metrics.postCalls++;
    return new Promise(function (resolve, reject) {
      var frameName = "app_gas_post_" + id.replace(/[^A-Za-z0-9_]/g, "_");
      var resultFrame = d.createElement("iframe");
      var form = d.createElement("form");
      resultFrame.name = frameName;
      resultFrame.title = "GAS API POST";
      resultFrame.setAttribute("aria-hidden", "true");
      resultFrame.setAttribute("referrerpolicy", "no-referrer");
      resultFrame.style.cssText = "position:fixed;width:1px;height:1px;left:-10000px;top:-10000px;border:0;opacity:0;pointer-events:none";
      form.method = "POST";
      form.action = gas;
      form.target = frameName;
      form.acceptCharset = "UTF-8";
      form.style.display = "none";
      appendField(form, "mode", "github-api-post");
      appendField(form, "parentOrigin", w.location.origin);
      appendField(form, "nonce", requestNonce);
      appendField(form, "id", id);
      appendField(form, "fn", invocation.fn);
      appendField(form, "args", argsJson);
      postPending[id] = {
        resolve: resolve,
        reject: reject,
        frame: resultFrame,
        form: form,
        nonce: requestNonce,
        timer: w.setTimeout(function () {
          cleanupPost(id, makeError("GAS POST request timeout: " + invocation.original, "GAS_POST_REQUEST_TIMEOUT"));
        }, timeoutMs)
      };
      (d.body || d.documentElement).appendChild(resultFrame);
      (d.body || d.documentElement).appendChild(form);
      try { form.submit(); }
      catch (error) { cleanupPost(id, error); }
    });
  }

  function canFallback(error) {
    var code = text(error && (error.code || error.errorCode));
    return code === "GAS_BRIDGE_READY_TIMEOUT" ||
      code === "GAS_BRIDGE_PORT_READY_TIMEOUT" ||
      code === "GAS_BRIDGE_ERROR" ||
      code === "GAS_BRIDGE_VERSION_MISMATCH" ||
      code === "GAS_BRIDGE_PORT_UNAVAILABLE" ||
      code === "GAS_BRIDGE_MESSAGE_CHANNEL_UNAVAILABLE" ||
      code === "GITHUB_PAGES_ORIGIN_NOT_ALLOWED";
  }
  function remoteRun(fn, args, options) {
    return bridgeRun(fn, args, options).catch(function (bridgeError) {
      if (!canFallback(bridgeError)) throw bridgeError;
      metrics.postFallbacks++;
      return postRun(fn, args, options).catch(function (postError) {
        var error = makeError(
          "ไม่สามารถเชื่อมต่อ GAS ได้ — Bridge: " + text(bridgeError && bridgeError.message || bridgeError) +
          " — POST: " + text(postError && postError.message || postError),
          /^api(Login|SessionResume|SessionCheck|Logout)$/i.test(text(fn)) ? "GAS_AUTH_TRANSPORT_UNAVAILABLE" : "GAS_API_TRANSPORT_UNAVAILABLE"
        );
        error.bridgeError = bridgeError;
        error.postError = postError;
        throw error;
      });
    });
  }
  function run(fn, args, options) {
    metrics.calls++;
    fn = text(fn).trim();
    if (!fn) return Promise.reject(makeError("method required", "METHOD_REQUIRED"));
    var write = /^api(?:Save|Delete|Update|Create|Import|Extract|Upload|Issue|Process|Cleanup|Generate|Send|Patch|Approve|Reject|Submit|Queue|Migrate|Revoke|Refresh)/i.test(fn);
    var key = write ? "" : fn + "|" + JSON.stringify(args == null ? {} : args);
    if (key && inFlight[key]) {
      metrics.dedupeHits++;
      return inFlight[key];
    }
    var request = remoteRun(fn, args, options);
    if (!key) return request;
    inFlight[key] = request.then(function (value) {
      delete inFlight[key];
      return value;
    }, function (error) {
      delete inFlight[key];
      throw error;
    });
    return inFlight[key];
  }

  function resetBridge() {
    Object.keys(pending).forEach(function (id) { cleanupPending(id, makeError("Bridge reset", "GAS_BRIDGE_RESET")); });
    Object.keys(postPending).forEach(function (id) { cleanupPost(id, makeError("POST reset", "GAS_POST_RESET")); });
    closeBridgePort();
    try { if (frame && frame.parentNode) frame.parentNode.removeChild(frame); } catch (_ignoredFrame) {}
    frame = null;
    readyPromise = null;
    nonce = "";
    protocol = "";
    state = "idle";
    bridgeOrigin = "";
    bridgeChannel = "";
    lastError = "";
    return true;
  }
  function status() {
    return {
      ok: !!gasUrl(),
      owner: OWNER,
      mode: MODE,
      transportMode: MODE,
      gasWebAppUrlConfigured: !!gasUrl(),
      parentOrigin: w.location.origin,
      protocol: protocol || "pending",
      bridgeLoadState: state,
      bridge: {
        state: state,
        ready: state === "ready" && !!bridgePort,
        protocol: protocol,
        origin: bridgeOrigin,
        channel: bridgeChannel,
        portReady: !!bridgePort,
        lastError: lastError
      },
      expectedBridgeVersion: expectedBridgeVersion,
      pending: Object.keys(pending).length + Object.keys(postPending).length,
      metrics: Object.assign({}, metrics)
    };
  }
  function applyLogo() {
    var url = text(configValue("logoUrl", configValue("fallbackLogoUrl", ""))).trim();
    if (!url) return false;
    try {
      Array.prototype.forEach.call(d.querySelectorAll('[data-logo="parliament"],#login-logo-img,#side-logo-img,#mobile-topbar-logo,.print-logo-img'), function (image) {
        image.setAttribute("src", url);
        image.style.display = "";
        image.style.visibility = "visible";
      });
    } catch (_ignored) {}
    return true;
  }

  w.AppTransport = w.AppTransport || {};
  var api = w.AppTransport;
  api.__owner = OWNER;
  api.mode = MODE;
  api.transportMode = MODE;
  api.run = run;
  api.runGasDirectBridge = bridgeRun;
  api.runVercelProxy = bridgeRun;
  api.runJsonpApi = bridgeRun;
  api.runLoginPost = function (fn, args, options) { return postRun(fn, args, options); };
  api.ensureBridgeClient = ensureBridge;
  api.warmAuthBridge = function () { return ensureBridge().then(function () { return true; }, function () { return false; }); };
  api.bridgeClientState = function () { return status().bridge; };
  api.resetBridge = resetBridge;
  api.clearApiCache = function () { inFlight = Object.create(null); return true; };
  api.invalidateClientApiCache = api.clearApiCache;
  api.loadPublicConfig = function () { applyLogo(); return Promise.resolve({ ok: true, gasWebAppUrlConfigured: !!gasUrl(), transportMode: MODE }); };
  api.runtimeOwnerStatus = status;
  api.assertRuntimeOwner = function () {
    var current = status();
    if (!current.ok) throw makeError("GitHub Pages GAS transport ไม่พร้อม", "APP_RUNTIME_OWNER_MISMATCH");
    return current;
  };
  api.releaseStatus = function () { return { ok: true, transportMode: MODE, expectedBridgeVersion: expectedBridgeVersion, mismatch: [], warnings: [] }; };
  api.phase2Status = status;
  api.phase1Status = status;
  api.phase0Status = status;
  api.clientCacheStatus = function () { return { ok: true, owner: OWNER, readResponseCache: false, inFlight: Object.keys(inFlight).length, metrics: Object.assign({}, metrics) }; };
  api.setGasWebAppUrl = function (url) {
    url = text(url).trim();
    if (!/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec(?:[?#].*)?$/i.test(url)) return gasUrl();
    url = url.replace(/[?#].*$/, "");
    w.APP_CONFIG = w.APP_CONFIG || {};
    w.APP_CONFIG.gasWebAppUrl = url;
    w.GAS_WEB_APP_URL = url;
    resetBridge();
    return url;
  };
  api.ping = function () { return run("apiGithubBridgePing", { at: Date.now() }, { timeoutMs: 15000 }); };
  api.status = status;

  try { applyLogo(); } catch (_ignoredLogo) {}
  w.setTimeout(function () { api.warmAuthBridge(); }, 0);
})(window, document);
