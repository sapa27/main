(function (w, d) {
  "use strict";
  if (w.__GCP297_OWNER__) return;
  w.__GCP297_OWNER__ = true;

  var CATEGORY = "กรรมาธิการเสนอญัตติ";
  var OWNER = "github-pages/index.html::commissioner-proposer-owner-r297";
  var STORE_KEY = "meeting.lookup." + CATEGORY;
  var CACHE_MS = 60000;
  var state = {
    rows: [],
    allowed: Object.create(null),
    loaded: false,
    at: 0,
    pending: null,
    observers: Object.create(null)
  };

  function text(v) { return String(v == null ? "" : v).trim(); }
  function norm(v) { return text(v).replace(/[\s\u200B-\u200D\uFEFF]+/g, " ").toLowerCase(); }
  function isFn(v) { return typeof v === "function"; }
  function isCommissionerCategory() {
    var el = d.getElementById("meeting-cat");
    return !!el && text(el.value) === CATEGORY;
  }
  function rowName(row) {
    row = row || {};
    return text(row.name || row.fullName || row.displayName || row["ชื่อ-สกุล"] || row["ชื่อสกุล"] || row["ชื่อ"] || "");
  }
  function rowPhone(row) {
    row = row || {};
    return text(row.phone || row.tel || row.telephone || row.mobile || row.phoneNumber || row["เบอร์โทรศัพท์"] || row["โทรศัพท์"] || "");
  }
  function rowPosition(row) {
    row = row || {};
    return text(row.position || row.role || row["ตำแหน่ง"] || row["ตำแหน่งในคณะ"] || "");
  }
  function active(row) {
    row = row || {};
    if (row.isDeleted === true || text(row.isDeleted).toLowerCase() === "true" || text(row.deleted).toLowerCase() === "true") return false;
    var s = text(row.status || row["สถานะ"] || row["สถานะการดำรงตำแหน่ง"] || "").toLowerCase();
    return !s || s === "ดำรงตำแหน่ง" || s === "ใช้งาน" || s === "active" || s.indexOf("ดำรง") !== -1;
  }
  function arrayFrom(value) {
    var x = value;
    for (var i = 0; i < 7; i += 1) {
      if (Array.isArray(x)) return x;
      if (!x || typeof x !== "object") return [];
      var keys = ["rows", "items", "records", "list", "values", "comms", "personnelComms"];
      for (var k = 0; k < keys.length; k += 1) if (Array.isArray(x[keys[k]])) return x[keys[k]];
      if (Array.isArray(x.data)) return x.data;
      if (x.data && typeof x.data === "object") x = x.data;
      else if (x.result && typeof x.result === "object") x = x.result;
      else if (x.payload && typeof x.payload === "object") x = x.payload;
      else return [];
    }
    return [];
  }
  function normalizeRows(value) {
    var seen = Object.create(null), out = [];
    arrayFrom(value).forEach(function (row) {
      if (!row || !active(row)) return;
      var name = rowName(row), key = norm(name);
      if (!key || seen[key]) return;
      seen[key] = true;
      out.push(Object.assign({}, row, { name: name, phone: rowPhone(row), position: rowPosition(row) }));
    });
    return out;
  }
  function setAllowed(rows) {
    state.rows = Array.isArray(rows) ? rows.slice() : [];
    state.allowed = Object.create(null);
    state.rows.forEach(function (row) { var k = norm(rowName(row)); if (k) state.allowed[k] = row; });
    state.loaded = true;
    state.at = Date.now();
    seedMeetingStores(state.rows);
    applyUiInvariant();
    return state.rows;
  }
  function currentStoreValue(path, def) {
    try { return w.AppStore && isFn(w.AppStore.get) ? w.AppStore.get(path, def) : def; } catch (_) { return def; }
  }
  function setStoreValue(path, value) {
    try { if (w.AppStore && isFn(w.AppStore.set)) { w.AppStore.set(path, value); return true; } } catch (_) {}
    return false;
  }
  function seedMeetingStores(rows) {
    var old = currentStoreValue(STORE_KEY, {}) || {};
    var next = Object.assign({}, old, {
      proposer: rows.slice(),
      petitioners: [],
      assignees: rows.slice(),
      meta: Object.assign({}, old.meta || {}, {
        commissionerOnly: true,
        source: "apiGetPersonnelComms",
        owner: OWNER,
        stamp: "github-r297-commissioner-only"
      })
    });
    setStoreValue(STORE_KEY, next);
    setStoreValue("personnel.comms", rows.slice());
    return next;
  }
  function makeContext(base, method, payload) {
    return {
      method: method,
      payload: payload || {},
      optionsArg: base && base.optionsArg,
      timeoutArg: base && base.timeoutArg,
      transportOptions: {},
      finalPayload: null,
      rawResponse: null,
      envelope: null
    };
  }
  function personnelPayload(force) {
    return {
      page: 1,
      limit: 500,
      forceFresh: !!force,
      forceRefresh: !!force,
      noCache: !!force,
      bypassCache: !!force,
      cacheTtlSeconds: force ? 0 : 60,
      source: "github-r297-commissioner-proposer"
    };
  }
  function fetchWithOriginal(originalRun, pipeline, baseCtx, force) {
    var fresh = state.loaded && Date.now() - state.at < CACHE_MS;
    if (!force && fresh) return Promise.resolve(state.rows.slice());
    if (!force && state.pending) return state.pending;
    var task = Promise.resolve(
      originalRun.call(pipeline, makeContext(baseCtx, "apiGetPersonnelComms", personnelPayload(force)))
    ).then(normalizeRows).then(setAllowed);
    if (!force) {
      state.pending = task.then(function (rows) { state.pending = null; return rows; }, function (err) { state.pending = null; throw err; });
      return state.pending;
    }
    return task;
  }
  function queryRows(rows, query, limit) {
    var q = norm(query), max = Math.max(1, Math.min(Number(limit || 80) || 80, 500));
    return rows.filter(function (row) {
      if (!q) return true;
      return norm(rowName(row)).indexOf(q) !== -1 || norm(rowPhone(row)).indexOf(q) !== -1 || norm(rowPosition(row)).indexOf(q) !== -1;
    }).slice(0, max);
  }
  function lookupResult(rows, payload) {
    var filtered = queryRows(rows, payload && (payload.q || payload.query), payload && payload.limit);
    return {
      rows: filtered,
      items: filtered,
      records: filtered,
      key: "petitioners",
      type: "meeting",
      q: text(payload && (payload.q || payload.query)),
      scope: CATEGORY,
      limit: Number(payload && payload.limit || 80) || 80,
      cursor: "",
      nextCursor: "",
      totalRecords: filtered.length,
      contractStamp: "github-r297-commissioner-only"
    };
  }
  function bundleResult(base, rows) {
    var x = base && base.data && !Array.isArray(base.data) && typeof base.data === "object" ? base.data : base;
    x = x && typeof x === "object" && !Array.isArray(x) ? Object.assign({}, x) : {};
    x.proposer = rows.slice();
    x.petitioners = [];
    x.assignees = rows.slice();
    x.meta = Object.assign({}, x.meta || {}, { commissionerOnly: true, commissionerSource: "apiGetPersonnelComms", owner: OWNER });
    seedMeetingStores(rows);
    return x;
  }
  function targetSearch(ctx) {
    var p = ctx && ctx.payload || {};
    return ctx && text(ctx.method) === "apiSearchLookup" && text(p.type || "meeting") === "meeting" && text(p.key) === "petitioners" && text(p.scope || p.category) === CATEGORY;
  }
  function targetBundle(ctx) {
    var p = ctx && ctx.payload || {};
    return ctx && text(ctx.method) === "apiGetMeetingLookupOptions" && text(p.category || p.scope) === CATEGORY;
  }
  function patchPipeline() {
    var pipeline = w.AppApiMiddlewarePipeline;
    if (!pipeline || !isFn(pipeline.run) || pipeline.run.__gcp297) return false;
    var originalRun = pipeline.run;
    function run(ctx) {
      var self = this || pipeline;
      if (targetSearch(ctx)) {
        return fetchWithOriginal(originalRun, self, ctx, false).then(function (rows) {
          return lookupResult(rows, ctx.payload || {});
        }, function () {
          seedMeetingStores([]);
          return lookupResult([], ctx.payload || {});
        });
      }
      if (targetBundle(ctx)) {
        var basePromise = Promise.resolve(originalRun.call(self, ctx)).catch(function () { return {}; });
        return fetchWithOriginal(originalRun, self, ctx, false).then(function (rows) {
          return basePromise.then(function (base) { return bundleResult(base, rows); });
        }, function () {
          seedMeetingStores([]);
          return basePromise.then(function (base) { return bundleResult(base, []); });
        });
      }
      return originalRun.call(self, ctx);
    }
    run.__gcp297 = true;
    run.__owner = OWNER;
    run.__previous = originalRun;
    pipeline.run = run;
    return true;
  }
  function splitNames(v) {
    return text(v).split(/[,\n;]+/).map(function (s) { return text(s); }).filter(Boolean);
  }
  function sanitizeField() {
    if (!isCommissionerCategory() || !state.loaded) return true;
    var input = d.getElementById("meeting-petitioners");
    if (!input) return false;
    var current = splitNames(input.value), kept = [], seen = Object.create(null);
    current.forEach(function (name) {
      var key = norm(name), row = state.allowed[key];
      if (row && !seen[key]) { seen[key] = true; kept.push(rowName(row)); }
    });
    var next = kept.join(", ");
    if (text(input.value) !== next) input.value = next;
    if (!kept.length) {
      var phone = d.getElementById("meeting-petitionerPhone");
      if (phone) phone.value = "";
    }
    return true;
  }
  function inputMode() {
    var input = d.getElementById("meeting-petitioners");
    if (!input) return;
    if (!input.dataset.r297OriginalPlaceholder) input.dataset.r297OriginalPlaceholder = input.getAttribute("placeholder") || "";
    if (isCommissionerCategory()) {
      input.readOnly = true;
      input.setAttribute("aria-readonly", "true");
      input.setAttribute("placeholder", "เลือกชื่อกรรมาธิการจากฐานข้อมูล");
    } else {
      input.readOnly = false;
      input.removeAttribute("aria-readonly");
      input.setAttribute("placeholder", input.dataset.r297OriginalPlaceholder || "");
    }
  }
  function buttonMode() {
    var b = d.getElementById("meeting-add-petitioner-btn");
    if (!b) return;
    var locked = isCommissionerCategory();
    b.disabled = locked;
    b.setAttribute("aria-disabled", locked ? "true" : "false");
    b.title = locked ? "ประเภทกรรมาธิการเสนอญัตติให้เลือกจากฐานข้อมูลกรรมาธิการเท่านั้น" : "เพิ่มข้อมูลผู้ร้องเรียน";
  }
  function filterContainer(id) {
    if (!isCommissionerCategory() || !state.loaded) return;
    var host = d.getElementById(id);
    if (!host) return;
    Array.prototype.slice.call(host.querySelectorAll(".meeting-lookup-row")).forEach(function (row) {
      var box = row.querySelector("input[type=checkbox]"), name = text(row.getAttribute("data-name") || (box && box.value) || "");
      if (name && !state.allowed[norm(name)] && row.parentNode) row.parentNode.removeChild(row);
    });
  }
  function observeContainer(id) {
    var host = d.getElementById(id);
    if (!host || !w.MutationObserver || state.observers[id] && state.observers[id].host === host) return;
    if (state.observers[id] && state.observers[id].observer) try { state.observers[id].observer.disconnect(); } catch (_) {}
    var observer = new MutationObserver(function () { filterContainer(id); });
    observer.observe(host, { childList: true, subtree: true });
    state.observers[id] = { host: host, observer: observer };
  }
  function applyUiInvariant() {
    inputMode();
    buttonMode();
    sanitizeField();
    observeContainer("meeting-petitioner-selector");
    observeContainer("meeting-lookup-modal-list");
    filterContainer("meeting-petitioner-selector");
    filterContainer("meeting-lookup-modal-list");
  }
  function refreshCommissioners(force) {
    patchPipeline();
    applyUiInvariant();
    if (!isCommissionerCategory()) return Promise.resolve([]);
    if (!w.AppApi || !isFn(w.AppApi.call)) return Promise.resolve([]);
    var fresh = state.loaded && Date.now() - state.at < CACHE_MS;
    if (!force && fresh) return Promise.resolve(state.rows.slice());
    return Promise.resolve(w.AppApi.call("apiGetPersonnelComms", personnelPayload(!!force))).then(normalizeRows).then(setAllowed).catch(function (err) {
      state.loaded = true;
      state.rows = [];
      state.allowed = Object.create(null);
      seedMeetingStores([]);
      applyUiInvariant();
      try { w.AppRuntime && isFn(w.AppRuntime.recordWarning) && w.AppRuntime.recordWarning("github.r297.commissionerLookup", err, { owner: OWNER }); } catch (_) {}
      return [];
    });
  }
  function loadPetitionerPopup() {
    if (w.AppPetitionerOwner && isFn(w.AppPetitionerOwner.open)) return Promise.resolve(function () { return w.AppPetitionerOwner.open({ source: "github-r297" }); });
    if (isFn(w.openPetModal)) return Promise.resolve(function () { return w.openPetModal({ source: "github-r297" }); });
    var loader = w.AppAssetLoader && isFn(w.AppAssetLoader.loadPageScripts) ? function () { return w.AppAssetLoader.loadPageScripts("petitioner"); } : w.AppCritical && isFn(w.AppCritical.loadPageScripts) ? function () { return w.AppCritical.loadPageScripts("petitioner"); } : null;
    if (!loader) return Promise.reject(new Error("ไม่พบตัวโหลด popup ข้อมูลผู้ร้องเรียน"));
    return Promise.resolve(loader()).then(function () {
      if (w.AppPetitionerOwner && isFn(w.AppPetitionerOwner.open)) return function () { return w.AppPetitionerOwner.open({ source: "github-r297" }); };
      if (isFn(w.openPetModal)) return function () { return w.openPetModal({ source: "github-r297" }); };
      throw new Error("โหลด popup ข้อมูลผู้ร้องเรียนไม่สำเร็จ");
    });
  }

  d.addEventListener("change", function (ev) {
    var target = ev && ev.target;
    if (!target) return;
    if (target.id === "meeting-cat") {
      inputMode(); buttonMode();
      if (isCommissionerCategory()) refreshCommissioners(true).then(applyUiInvariant);
      else applyUiInvariant();
    } else if (target.id === "meeting-petitioners" && isCommissionerCategory()) {
      sanitizeField();
    }
  }, true);
  d.addEventListener("input", function (ev) {
    var target = ev && ev.target;
    if (target && target.id === "meeting-petitioners" && isCommissionerCategory()) sanitizeField();
  }, true);
  d.addEventListener("click", function (ev) {
    var target = ev && ev.target && ev.target.closest ? ev.target.closest("#meeting-add-petitioner-btn,#meeting-select-petitioner-btn,#meeting-lookup-modal-apply-btn") : null;
    if (!target) return;
    if (target.id === "meeting-add-petitioner-btn") {
      if (isCommissionerCategory()) {
        ev.preventDefault(); ev.stopPropagation(); if (ev.stopImmediatePropagation) ev.stopImmediatePropagation(); buttonMode(); return;
      }
      ev.preventDefault(); ev.stopPropagation(); if (ev.stopImmediatePropagation) ev.stopImmediatePropagation();
      target.disabled = true; target.setAttribute("aria-busy", "true");
      loadPetitionerPopup().then(function (open) { return open(); }).catch(function (err) {
        try { w.AppRuntime && isFn(w.AppRuntime.handleError) ? w.AppRuntime.handleError(err, "เปิด popup เพิ่มผู้ร้องเรียนไม่สำเร็จ") : w.appSwalFire && w.appSwalFire("ผิดพลาด", text(err && err.message || err), "error"); } catch (_) {}
      }).then(function () { target.removeAttribute("aria-busy"); buttonMode(); }, function () { target.removeAttribute("aria-busy"); buttonMode(); });
      return;
    }
    if (target.id === "meeting-select-petitioner-btn" && isCommissionerCategory()) {
      refreshCommissioners(false).then(function () { setTimeout(applyUiInvariant, 0); setTimeout(applyUiInvariant, 200); });
      return;
    }
    if (target.id === "meeting-lookup-modal-apply-btn" && isCommissionerCategory()) {
      setTimeout(sanitizeField, 0); setTimeout(sanitizeField, 100);
    }
  }, true);

  ["DOMContentLoaded", "app:main-ui-ready", "app:page-activated", "app:page:meeting:shown", "app:route:meeting", "app:page-scripts-loaded", "app:core-runtime-ready"].forEach(function (name) {
    try { d.addEventListener(name, function () { patchPipeline(); applyUiInvariant(); if (isCommissionerCategory()) refreshCommissioners(false); }, false); } catch (_) {}
  });
  [0, 100, 300, 800, 1600, 3000].forEach(function (ms) {
    setTimeout(function () { patchPipeline(); applyUiInvariant(); if (isCommissionerCategory()) refreshCommissioners(false); }, ms);
  });

  w.AppGitHubCommissionerProposerR297 = {
    owner: OWNER,
    category: CATEGORY,
    sourceApi: "apiGetPersonnelComms",
    status: function () { return { ok: true, owner: OWNER, loaded: state.loaded, count: state.rows.length, category: CATEGORY, pipelinePatched: !!(w.AppApiMiddlewarePipeline && w.AppApiMiddlewarePipeline.run && w.AppApiMiddlewarePipeline.run.__gcp297) }; },
    refresh: function () { return refreshCommissioners(true); },
    enforce: applyUiInvariant
  };
})(window, document);
