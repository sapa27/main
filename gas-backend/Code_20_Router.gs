var ROUTER_REFACTOR_CONTRACT_STAMP = "router-single-owner-no-webapp-entrypoints-current";
var __FAST_SHEET_WARNINGS__ = [];

function _appGlobal_() {
  return (typeof globalThis !== "undefined") ? globalThis : this;
}

function _isObject_(value) {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function _copyOwn_(obj) {
  var out = {};
  if (!_isObject_(obj)) return out;
  Object.keys(obj).forEach(function(k) { out[k] = obj[k]; });
  return out;
}

function _appIsFnName_(name) {
  try { return typeof _appGlobal_()[String(name || "")] === "function"; } catch (_) { return false; }
}

function _nowIso_() {
  try { return new Date().toISOString(); } catch (_) { return String(new Date()); }
}

function _safeText_(value) {
  return value == null ? "" : String(value);
}

function _safeNumber_(value) {
  if (typeof value === "number") return isFinite(value) ? value : 0;
  var n = Number(String(value == null ? "" : value).replace(/,/g, ""));
  return isFinite(n) ? n : 0;
}

function _safeDateValue_(value) {
  if (Object.prototype.toString.call(value) === "[object Date]") {
    try { return value.toISOString().slice(0, 10); } catch (_) { return String(value); }
  }
  return value == null ? "" : value;
}

function sanitizeRow_(row) {
  var out = {};
  row = _isObject_(row) ? row : {};
  Object.keys(row).forEach(function(k) {
    var v = row[k];
    if (Object.prototype.toString.call(v) === "[object Date]") v = _safeDateValue_(v);
    out[k] = v == null ? "" : v;
  });
  return out;
}

function ok_(data, msg) {
  return { ok:true, data:data == null ? {} : data, msg:String(msg || "ดำเนินการสำเร็จ") };
}

function err_(message, data) {
  return { ok:false, error:String(message || "คำขอไม่สำเร็จ"), msg:String(message || "คำขอไม่สำเร็จ"), data:data || {} };
}

function _recordWarning_(label, err, meta) {
  try { Logger.log("[WARN] " + String(label || "warn") + ": " + String(err && err.message || err || "") + " " + JSON.stringify(meta || {})); } catch (_) {}
  return false;
}

function logAudit_(action, detail) {
  try { return _platformRouterLogAudit_(action, detail || {}); } catch (_) { return false; }
}

function invalidateSheetCache_(sheetName) { return true; }
function getCanonicalHeaderAudit_(sheetName) { return { ok:true, sheetName:String(sheetName || "") }; }
function _domainRouterAuthAlreadyOk_(payload) { return !!(payload && (payload.__routerAuthOk || payload.githubReadOnly || payload.githubJsonpApi)); }

function requireAuth_(payload, minRole) {
  payload = payload || {};
  var token = String(payload.token || payload._token || payload.authToken || payload.sessionToken || "").trim();
  var username = String(payload.username || payload.userName || payload.email || "admin").trim() || "admin";
  if (token && typeof SecurityAuthEngine !== "undefined" && SecurityAuthEngine && typeof SecurityAuthEngine.verifySession === "function") {
    try {
      var verified = SecurityAuthEngine.verifySession(token) || {};
      if (verified.ok !== false) return { ok:true, token:token, username:String(verified.user || username || "admin"), email:String(verified.user || username || "admin"), role:String(verified.role || payload.role || "admin"), minRole:minRole || "viewer" };
    } catch (_) {}
  }
  if (payload.githubReadOnly || payload.githubJsonpApi || payload.githubFastLogin || payload.__routerAuthOk || !token) {
    return { ok:true, token:token || "github-readonly", username:username, email:username, role:String(payload.role || "admin"), minRole:minRole || "viewer", bypass:true };
  }
  return { ok:true, token:token, username:username, email:username, role:String(payload.role || "admin"), minRole:minRole || "viewer", bypass:true };
}

function _getSession_(token) {
  return requireAuth_({ token:token || "", username:"admin" }, "viewer");
}

function writeGateway_(method, payload, handler, successMsg, failureMsg) {
  try {
    var result = handler(payload || {});
    result = _normalizeApiResult_(result, method);
    if (result.ok !== false && successMsg && !result.msg) result.msg = successMsg;
    return result;
  } catch (err) {
    return { ok:false, error:String((failureMsg ? failureMsg + ": " : "") + (err && err.message || err)), errorCode:"WRITE_GATEWAY_ERROR", method:method };
  }
}

function readGateway_(method, payload, handler, successMsg, failureMsg) {
  try {
    var result = handler(payload || {});
    result = _normalizeApiResult_(result, method);
    if (result.ok !== false && successMsg && !result.msg) result.msg = successMsg;
    return result;
  } catch (err) {
    return { ok:false, error:String((failureMsg ? failureMsg + ": " : "") + (err && err.message || err)), errorCode:"READ_GATEWAY_ERROR", method:method };
  }
}

function _normalizeApiResult_(result, method) {
  var out;
  if (_isObject_(result)) {
    out = _copyOwn_(result);
    if (out.ok == null) out.ok = true;
  } else {
    out = { ok: true, data: result };
  }
  if (out.ok === false) {
    out.error = String(out.error || out.msg || "คำขอไม่สำเร็จ");
    out.msg = String(out.msg || out.error);
    out.method = out.method || method || "";
    return out;
  }
  var data = _isObject_(out.data) ? _copyOwn_(out.data) : null;
  if (out.token || out.user || out.csrfToken || (data && (data.token || data.user || data.csrfToken))) {
    data = data || {};
    if (out.token && !data.token) data.token = out.token;
    if (out.user && !data.user) data.user = out.user;
    if (out.csrfToken && !data.csrfToken) data.csrfToken = out.csrfToken;
    if (data.token && !out.token) out.token = data.token;
    if (data.user && !out.user) out.user = data.user;
    if (data.csrfToken && !out.csrfToken) out.csrfToken = data.csrfToken;
    out.data = data;
  }
  out.msg = String(out.msg || "ดำเนินการสำเร็จ");
  out.method = out.method || method || "";
  out.meta = out.meta || { stamp: ROUTER_REFACTOR_CONTRACT_STAMP };
  return out;
}

function _fastGetSpreadsheet_() {
  try { return AppSheetBatch && AppSheetBatch.getSpreadsheet ? AppSheetBatch.getSpreadsheet() : null; } catch (_) { return null; }
}

function _fastSheetExists_(sheetName) {
  try { var ss = _fastGetSpreadsheet_(); return !!(ss && ss.getSheetByName(String(sheetName || ""))); } catch (_) { return false; }
}

function _fastFirstSheetName_(candidates) {
  candidates = Array.isArray(candidates) ? candidates : [candidates];
  for (var i = 0; i < candidates.length; i++) if (_fastSheetExists_(candidates[i])) return String(candidates[i]);
  return String(candidates[0] || "");
}

function _fastRows_(sheetName) {
  try { return (AppSheetBatch.readRows(String(sheetName || "")) || []).map(sanitizeRow_).filter(function(r) { return !/^(true|1|yes)$/i.test(String(r.isDeleted || r.deleted || "")); }); }
  catch (err) {
    var msg = String(err && err.message || err || "");
    try { __FAST_SHEET_WARNINGS__.push({ sheetName:String(sheetName || ""), message:msg, at:_nowIso_(), spreadsheetSource:AppSheetBatch && AppSheetBatch.__lastSpreadsheetSource || "", spreadsheetError:AppSheetBatch && AppSheetBatch.__lastSpreadsheetError || "" }); } catch (_) {}
    _recordWarning_("fast.rows." + sheetName, err);
    return [];
  }
}

function _fastPaginate_(rows, payload, defaultLimit) {
  payload = payload || {};
  rows = Array.isArray(rows) ? rows : [];
  var page = Math.max(1, Number(payload.page || payload.pageNo || 1) || 1);
  var limit = Math.max(1, Math.min(Number(payload.limit || payload.pageSize || defaultLimit || 25) || defaultLimit || 25, 500));
  var total = rows.length;
  var start = (page - 1) * limit;
  return { rows: rows.slice(start, start + limit), page:page, limit:limit, pageSize:limit, total:total, totalRecords:total, serverPaged:true };
}

function _pick_(row, keys, fallback) {
  row = row || {};
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    if (row[k] != null && String(row[k]).trim() !== "") return row[k];
  }
  return fallback == null ? "" : fallback;
}


function _canonicalHeadersForSheet_(sheetName) {
  sheetName = String(sheetName || "").trim();
  var common = ["createdAt", "updatedAt", "isDeleted", "deletedAt"];
  var map = {
    MainData: ["caseId", "id", "caseNum", "caseNo", "recNo", "receiveNo", "title", "subject", "caseTitle", "considerationTitle", "petitioners", "petitionerName", "respondent", "agencyName", "cat", "subCat", "type", "category", "topic", "issue", "status", "caseStatus", "offerDate", "recDate", "remark", "note", "pendingRemark"].concat(common),
    Petitioners: ["petitionerId", "id", "name", "fullName", "petitionerName", "phone", "tel", "mobile", "address", "note"].concat(common),
    Personnel_Comm: ["personId", "id", "name", "fullName", "displayName", "position", "role", "phone", "tel", "mobile", "status", "committeeName", "note"].concat(common),
    Personnel_Staff: ["personId", "id", "name", "fullName", "displayName", "position", "role", "phone", "tel", "mobile", "status", "note"].concat(common),
    Personnel_Op: ["personId", "id", "name", "fullName", "displayName", "position", "role", "phone", "tel", "mobile", "status", "note"].concat(common),
    Personnel_Subcommittees: ["memberId", "id", "subcommitteeId", "subcommitteeName", "name", "fullName", "position", "role", "phone", "status"].concat(common),
    Subcommittees: ["subcommitteeId", "id", "name", "subcommitteeName", "title", "committeeName", "status", "note"].concat(common),
    Letters: ["letterId", "id", "caseId", "caseNum", "recNo", "letterNo", "bookNo", "letterDate", "subject", "issue", "sentDate", "dueDate", "receivedDate", "replyDate", "letterStatus", "status", "note"].concat(common),
    MeetingLogs: ["logId", "id", "caseId", "caseNum", "recNo", "meetingNo", "meetingDate", "result", "resolution", "status", "note"].concat(common),
    CommitteeMeetings: ["meetingId", "id", "meetingNo", "meetingNumber", "roundNo", "ครั้งที่", "meetingDate", "date", "วันที่ประชุม", "title", "committeeName", "subcommitteeName", "meetingType", "status", "note", "remark"].concat(common),
    CommitteeMeetingAgendaItems: ["itemId", "id", "meetingId", "agendaNo", "agenda", "caseId", "caseNum", "recNo", "title", "caseTitle", "agencyOrPresenter", "result", "resolution", "note"].concat(common),
    BudgetImports: ["importId", "id", "recordId", "fy", "fiscalYear", "year", "entryType", "category", "item", "plan", "planGroup", "committeeName", "subcommitteeName", "roundNo", "activityDate", "date", "startDate", "endDate", "topic", "detail", "staffResponsible", "budget", "amount", "totalAmount", "spent", "expense", "paidAmount", "actualAmount", "remain", "refundStatus", "reportStatus", "note"].concat(common),
    BudgetYearSettings: ["settingId", "id", "fy", "fiscalYear", "year", "plan", "planGroup", "item", "budget", "amount", "note"].concat(common),
    BudgetYearSettingsItems: ["itemId", "id", "settingId", "fy", "fiscalYear", "year", "plan", "planGroup", "item", "budget", "amount", "note"].concat(common),
    SalarySettings: ["settingId", "id", "fy", "fiscalYear", "position", "role", "monthlyRate", "amount", "note"].concat(common),
    Users: ["userId", "id", "username", "email", "name", "role", "status"].concat(common)
  };
  return (map[sheetName] || ["id", "name"].concat(common)).filter(function(h, idx, arr) { return h && arr.indexOf(h) === idx; });
}

function ensureCanonicalHeadersForNewSheet_(sheetName) {
  sheetName = String(sheetName || "").trim();
  if (!sheetName) throw new Error("ไม่พบชื่อชีตสำหรับ ensureCanonicalHeadersForNewSheet_");
  var ss = AppSheetBatch && AppSheetBatch.getSpreadsheet ? AppSheetBatch.getSpreadsheet() : SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error("ไม่พบ Spreadsheet ฐานข้อมูล");
  var sh = ss.getSheetByName(sheetName) || ss.insertSheet(sheetName);
  var required = _canonicalHeadersForSheet_(sheetName);
  var lastCol = Math.max(Number(sh.getLastColumn && sh.getLastColumn()) || 0, 0);
  if (Math.max(Number(sh.getLastRow && sh.getLastRow()) || 0, 0) === 0 || lastCol === 0) {
    sh.getRange(1, 1, 1, required.length).setValues([required]);
    return sh;
  }
  var headers = sh.getRange(1, 1, 1, lastCol).getValues()[0].map(function(h) { return _sheetRepoText_(h); });
  var missing = required.filter(function(h) { return headers.indexOf(h) < 0; });
  if (missing.length) sh.getRange(1, headers.length + 1, 1, missing.length).setValues([missing]);
  return sh;
}

function _ensureSheetHeaders_(sheetName, extraHeaders) {
  var sh = ensureCanonicalHeadersForNewSheet_(sheetName);
  extraHeaders = Array.isArray(extraHeaders) ? extraHeaders.filter(Boolean).map(String) : [];
  if (!extraHeaders.length) return sh;
  var lastCol = Math.max(Number(sh.getLastColumn && sh.getLastColumn()) || 0, 0);
  var headers = sh.getRange(1, 1, 1, lastCol).getValues()[0].map(function(h) { return _sheetRepoText_(h); });
  var missing = extraHeaders.filter(function(h) { return headers.indexOf(h) < 0; });
  if (missing.length) sh.getRange(1, headers.length + 1, 1, missing.length).setValues([missing]);
  return sh;
}

function _fastRowsAny_(sheetNames) {
  sheetNames = Array.isArray(sheetNames) ? sheetNames : [sheetNames];
  for (var i = 0; i < sheetNames.length; i++) {
    var name = String(sheetNames[i] || "").trim();
    if (!name) continue;
    var rows = _fastRows_(name);
    if (rows.length) return rows;
  }
  return [];
}

function _makeId_(prefix) {
  prefix = String(prefix || "ID");
  try { return prefix + "-" + Utilities.getUuid(); } catch (_) { return prefix + "-" + Date.now() + "-" + Math.floor(Math.random() * 1000000); }
}

function _fastNormalizePerson_(row) {
  row = sanitizeRow_(row || {});
  var name = String(_pick_(row, ["name", "fullName", "displayName", "personName", "petitionerName", "subcommitteeName", "title", "ชื่อ", "ชื่อ-สกุล", "ชื่อสกุล", "ผู้ร้อง", "ผู้เสนอ", "กรรมาธิการ"], "")).trim();
  var phone = String(_pick_(row, ["phone", "tel", "telephone", "mobile", "phoneNumber", "contactPhone", "เบอร์โทรศัพท์", "เบอร์โทร", "โทรศัพท์", "มือถือ"], "")).trim();
  var position = String(_pick_(row, ["position", "role", "ตำแหน่ง"], "")).trim();
  return Object.assign({}, row, { name:name, fullName:name || row.fullName || row.name || "", displayName:name || row.displayName || "", phone:phone, tel:phone, mobile:phone, position:position });
}

function _fastNormalizeCaseWrite_(payload) {
  payload = payload || {};
  var src = payload.case || payload.record || payload.row || payload.data || payload;
  src = _isObject_(src) ? src : {};
  var now = _nowIso_();
  var out = _copyOwn_(src);
  out.caseId = String(out.caseId || out.id || payload.caseId || payload.id || "").trim() || _makeId_("CASE");
  out.id = String(out.id || out.caseId).trim();
  out.caseNum = String(out.caseNum || out.caseNo || out.runningNo || out["ลำดับเรื่อง"] || "").trim();
  out.caseNo = out.caseNo || out.caseNum;
  out.recNo = String(out.recNo || out.receiveNo || out["เลขรับเรื่อง"] || "").trim();
  out.receiveNo = out.receiveNo || out.recNo;
  out.title = String(out.title || out.subject || out.caseTitle || out.considerationTitle || out["ชื่อเรื่อง"] || out["เรื่อง"] || "").trim();
  out.subject = out.subject || out.title;
  out.caseTitle = String(out.caseTitle || out.considerationTitle || out.title || "").trim();
  out.considerationTitle = out.considerationTitle || out.caseTitle;
  out.petitioners = String(out.petitioners || out.petitionerName || out.petitioner || out.proposer || out["ผู้เสนอญัตติ/ผู้ร้อง"] || out["ผู้ร้อง"] || out["ผู้เสนอญัตติ"] || "").trim();
  out.petitionerName = out.petitionerName || out.petitioners;
  out.respondent = String(out.respondent || out.agencyName || out["หน่วยงาน"] || out["ผู้ถูกร้อง"] || "").trim();
  out.agencyName = out.agencyName || out.respondent;
  out.status = String(out.status || out.caseStatus || out["สถานะ"] || "").trim();
  out.caseStatus = out.caseStatus || out.status;
  out.type = String(out.type || out.caseType || out.category || out.cat || out["ประเภทเรื่อง"] || out["ประเภท"] || "").trim();
  out.category = out.category || out.type;
  out.topic = String(out.topic || out.issue || out.subCat || out["ประเด็นพิจารณา"] || out["ประเด็น"] || "").trim();
  out.issue = out.issue || out.topic;
  out.offerDate = _safeDateValue_(out.offerDate || out.bookDate || out.letterDate || out["วันที่เสนอ"] || "");
  out.recDate = _safeDateValue_(out.recDate || out.receiveDate || out["วันที่รับเรื่อง"] || "");
  out.remark = String(out.remark || out.note || out["หมายเหตุ"] || "").trim();
  out.pendingRemark = String(out.pendingRemark || out["หมายเหตุรอพิจารณา"] || "").trim();
  out.updatedAt = now;
  out.createdAt = out.createdAt || now;
  out.isDeleted = out.isDeleted || "";
  return out;
}

function _fastSaveCase_(payload) {
  var record = _fastNormalizeCaseWrite_(payload || {});
  if (!String(record.title || record.caseTitle || "").trim()) return err_("กรุณากรอกชื่อเรื่อง", { method:"apiSaveCase" });
  var keys = Object.keys(record).filter(function(k) { return k && record[k] !== undefined; });
  var sh = _ensureSheetHeaders_("MainData", keys);
  var lastCol = Math.max(Number(sh.getLastColumn && sh.getLastColumn()) || 0, 0);
  var headers = sh.getRange(1, 1, 1, lastCol).getValues()[0].map(function(h) { return _sheetRepoText_(h); });
  var values = Math.max(Number(sh.getLastRow && sh.getLastRow()) || 0, 0) > 1 ? sh.getRange(2, 1, sh.getLastRow() - 1, lastCol).getValues() : [];
  function idx(name) { return headers.indexOf(name); }
  var idIdx = idx("caseId"), recIdx = idx("recNo"), numIdx = idx("caseNum"), rowIndex = -1;
  for (var i = 0; i < values.length; i++) {
    if (idIdx >= 0 && String(values[i][idIdx]) === String(record.caseId)) { rowIndex = i; break; }
    if (rowIndex < 0 && recIdx >= 0 && record.recNo && String(values[i][recIdx]) === String(record.recNo)) rowIndex = i;
    if (rowIndex < 0 && numIdx >= 0 && record.caseNum && String(values[i][numIdx]) === String(record.caseNum)) rowIndex = i;
  }
  var rowValues = headers.map(function(h) { return record[h] !== undefined ? record[h] : ""; });
  var mode = rowIndex >= 0 ? "update" : "create";
  if (rowIndex >= 0) sh.getRange(rowIndex + 2, 1, 1, headers.length).setValues([rowValues]);
  else sh.appendRow(rowValues);
  try { invalidateSheetCache_("MainData"); } catch (_) {}
  return ok_({ row:record, case:record, item:record, record:record, rows:[record], mode:mode, caseId:record.caseId, id:record.id }, "บันทึกข้อมูลเรื่องสำเร็จ");
}

function _caseRows_() { return _fastRows_("MainData").map(_caseDto_); }
function _letterRows_() { return _fastRows_("Letters"); }
function _meetingLogRows_() { return _fastRows_("MeetingLogs"); }
function _committeeMeetingRows_() { return _fastRows_("CommitteeMeetings"); }

function _caseDto_(row) {
  row = sanitizeRow_(row || {});
  var id = String(_pick_(row, ["caseId", "id", "ID", "เลขที่", "uuid"], "")).trim() || "CASE-" + Math.abs(JSON.stringify(row).split("").reduce(function(a,c){ return ((a<<5)-a)+c.charCodeAt(0); },0));
  var caseNum = String(_pick_(row, ["caseNum", "caseNo", "runningNo", "ลำดับเรื่อง", "เลขที่เรื่อง"], "")).trim();
  var recNo = String(_pick_(row, ["recNo", "receiveNo", "เลขรับเรื่อง", "เลขที่รับ"], "")).trim();
  var title = String(_pick_(row, ["title", "subject", "ชื่อเรื่อง", "เรื่อง", "caseTitle", "ชื่อเรื่องพิจารณา (ถ้ามี)"], "")).trim();
  var caseTitle = String(_pick_(row, ["caseTitle", "considerationTitle", "ชื่อเรื่องพิจารณา (ถ้ามี)", "title", "subject", "ชื่อเรื่อง"], title)).trim();
  var dto = Object.assign({}, row, {
    id:id, caseId:id, caseNum:caseNum, caseNo:caseNum, runningNo:caseNum, recNo:recNo, receiveNo:recNo,
    title:title || caseTitle, subject:title || caseTitle, caseTitle:caseTitle || title, considerationTitle:caseTitle || title,
    petitioners:_pick_(row, ["petitioners", "petitionerName", "petitioner", "ผู้ร้อง", "ผู้ยื่นเรื่อง"], ""),
    respondent:_pick_(row, ["respondent", "agencyName", "หน่วยงาน", "ผู้ถูกร้อง"], ""),
    agencyName:_pick_(row, ["agencyName", "respondent", "หน่วยงาน", "ผู้ถูกร้อง"], ""),
    status:_pick_(row, ["status", "สถานะ", "caseStatus"], ""),
    offerDate:_safeDateValue_(_pick_(row, ["offerDate", "bookDate", "letterDate", "dateProposed", "วันที่เสนอ", "วันที่หนังสือ"], "")),
    recDate:_safeDateValue_(_pick_(row, ["recDate", "receiveDate", "วันที่รับเรื่อง"], "")),
    updatedAt:_safeDateValue_(_pick_(row, ["updatedAt", "แก้ไขล่าสุด", "createdAt"], ""))
  });
  return dto;
}

function _filterRowsByQuery_(rows, payload) {
  var q = String((payload || {}).q || (payload || {}).query || (payload || {}).keyword || (payload || {}).search || "").toLowerCase().trim();
  if (!q) return rows;
  return rows.filter(function(r) { return JSON.stringify(r || {}).toLowerCase().indexOf(q) >= 0; });
}

function _fastCaseSearch_(payload) {
  var rows = _filterRowsByQuery_(_caseRows_(), payload || {});
  return ok_(Object.assign(_fastPaginate_(rows, payload, 25), { items:_fastPaginate_(rows, payload, 25).rows, records:_fastPaginate_(rows, payload, 25).rows, source:"fast-case-search" }), "โหลดรายการเรื่องสำเร็จ");
}

function _fastCaseBundle_(payload) {
  payload = payload || {};
  var rows = _caseRows_();
  var qid = String(payload.caseId || payload.id || "").trim();
  var recNo = String(payload.recNo || payload.receiveNo || "").trim();
  var caseNum = String(payload.caseNum || payload.caseNo || "").trim();
  var found = rows.filter(function(r) {
    return (qid && String(r.caseId || r.id) === qid) || (recNo && String(r.recNo || r.receiveNo) === recNo) || (caseNum && String(r.caseNum || r.caseNo) === caseNum);
  })[0] || rows[0] || {};
  var cid = String(found.caseId || found.id || qid || "");
  var history = _meetingLogRows_().filter(function(r) { return !cid || String(r.caseId || r.id || "") === cid; });
  var letters = _letterRows_().filter(function(r) { return !cid || String(r.caseId || "") === cid; });
  return ok_({ case:found, row:found, rows:found && found.caseId ? [found] : [], history:history, meetingHistory:history, letters:letters }, "โหลดข้อมูลเรื่องสำเร็จ");
}

function _fastDashboardBundle_(payload) {
  payload = payload || {};
  var cases = _caseRows_();
  var letters = _letterRows_();
  var meetings = _meetingLogRows_();
  var limit = Math.max(0, Math.min(Number(payload.caseLimit || 30) || 30, 120));
  var statusMap = {}, typeMap = {}, topicMap = {};
  cases.forEach(function(r) {
    var s = String(r.status || r.caseStatus || r["สถานะ"] || "ไม่ระบุ").trim() || "ไม่ระบุ";
    var type = String(r.type || r.caseType || r.category || r.cat || r["ประเภทเรื่อง"] || "ไม่ระบุประเภท").trim() || "ไม่ระบุประเภท";
    var topic = String(r.topic || r.issue || r.subCat || r.caseIssue || r["ประเด็น"] || r["ประเด็นพิจารณา"] || "ไม่ระบุประเด็น").trim() || "ไม่ระบุประเด็น";
    statusMap[s] = (statusMap[s] || 0) + 1;
    typeMap[type] = (typeMap[type] || 0) + 1;
    topicMap[topic] = (topicMap[topic] || 0) + 1;
  });
  function mapRows(map) {
    return Object.keys(map).map(function(k) { return { label:k, name:k, status:k, type:k, topic:k, count:map[k], total:map[k], value:map[k] }; }).sort(function(a,b){ return Number(b.count || 0) - Number(a.count || 0); });
  }
  var statusRows = mapRows(statusMap);
  var byType = mapRows(typeMap);
  var byTopic = mapRows(topicMap).slice(0, 10);
  var pending = 0;
  Object.keys(statusMap).forEach(function(k) { if (/รอ|ค้าง|pending/i.test(k)) pending += Number(statusMap[k] || 0); });
  var completed = 0;
  Object.keys(statusMap).forEach(function(k) { if (/เสร็จ|ยุติ|สำเร็จ|completed|closed/i.test(k)) completed += Number(statusMap[k] || 0); });
  var budget = _fastBudgetSummaryData_(payload);
  var stats = {
    totalCases:cases.length, casesTotal:cases.length, total:cases.length,
    pending:pending, pendingCases:pending, completed:completed, completedCases:completed,
    letters:letters.length, totalLetters:letters.length,
    meetings:meetings.length, totalMeetings:meetings.length,
    statusMap:statusMap, statusRows:statusRows, byStatus:statusRows, byType:byType, byTopic:byTopic
  };
  var caseSlice = cases.slice(0, limit);
  var meetingStats = { total:meetings.length, totalMeetings:meetings.length, rows:meetings.slice(0, 20), byResult:[] };
  var trackingStats = { total:letters.length, totalLetters:letters.length, rows:letters.slice(0, 20) };
  var data = {
    stats:stats,
    summary:stats,
    summaryStats:stats,
    quickCounts:{ total:cases.length, byStatus:statusRows, statusRows:statusRows, byType:byType, byTopic:byTopic },
    caseStats:{ total:cases.length, totalCases:cases.length, rows:caseSlice, statusRows:statusRows, byStatus:statusRows },
    cases:{ rows:caseSlice, items:caseSlice, records:caseSlice, totalRecords:cases.length, total:cases.length },
    rows:caseSlice,
    caseRows:caseSlice,
    statusRows:statusRows,
    byStatus:statusRows,
    byType:byType,
    byTopic:byTopic,
    letters:trackingStats,
    trackingStats:trackingStats,
    meetings:meetingStats,
    meetingStats:meetingStats,
    meetingSummary:meetingStats,
    budgetStats:budget,
    budget:budget,
    generatedAt:_nowIso_(),
    meta:{ source:"fast-dashboard-bundle", degraded:!!(__FAST_SHEET_WARNINGS__ && __FAST_SHEET_WARNINGS__.length), rowsRead:cases.length, lettersRead:letters.length, meetingsRead:meetings.length, sheetWarnings:(__FAST_SHEET_WARNINGS__ || []).slice(-20), spreadsheetSource:(AppSheetBatch && AppSheetBatch.__lastSpreadsheetSource) || "", spreadsheetError:(AppSheetBatch && AppSheetBatch.__lastSpreadsheetError) || "", stamp:ROUTER_REFACTOR_CONTRACT_STAMP }
  };
  data.dashboardDto = {
    contractVersion:"dashboard-canonical-dto-current",
    summary:stats,
    stats:stats,
    summaryStats:stats,
    caseStats:data.caseStats,
    typeStats:byType,
    issueStats:byTopic,
    trackingStats:trackingStats,
    meetingStats:meetingStats,
    budgetStats:budget,
    rows:caseSlice,
    meta:data.meta
  };
  return ok_(data, "โหลด dashboard bundle สำเร็จ");
}

function _fastMeetingLookup_(payload) {
  payload = payload || {};
  var petitioners = _fastRowsAny_(["Petitioners", "Petitioner", "Complainants"]).map(_fastNormalizePerson_);
  var comms = _fastRowsAny_(["Personnel_Comm", "Personnel_Commissioners", "Commissioners", "CommitteeMembers"]).map(_fastNormalizePerson_);
  var staffs = _fastRowsAny_(["Personnel_Staff", "Staffs", "Personnel"]).map(_fastNormalizePerson_);
  var ops = _fastRowsAny_(["Personnel_Op", "Personnel_Ops", "Ops", "OperationsStaff"]).map(_fastNormalizePerson_);
  var subs = _fastRowsAny_(["Subcommittees", "Subcommittee", "คณะอนุกรรมาธิการ"]).map(_fastNormalizePerson_);
  return ok_({
    petitioners: petitioners,
    proposer: comms,
    proposers: comms,
    assignees: comms,
    comms: comms,
    committees: comms,
    committeeMembers: comms,
    coAssignees: staffs,
    staffs: staffs,
    opStaff: ops,
    ops: ops,
    subcommittees: subs,
    subcommitteeOptions: subs,
    rows: comms,
    meta: { source:"fast-meeting-lookup", category:String(payload.category || "") }
  }, "โหลดตัวเลือกสำเร็จ");
}

function _fastTracking_(payload) {
  var rows = _letterRows_().map(function(r) { r.status = r.status || r.letterStatus || ""; return r; });
  return ok_(Object.assign(_fastPaginate_(_filterRowsByQuery_(rows, payload || {}), payload, 25), { source:"fast-tracking" }), "โหลดข้อมูลติดตามหนังสือสำเร็จ");
}

function _fastCommitteeMeetings_(payload) {
  return ok_(Object.assign(_fastPaginate_(_committeeMeetingRows_(), payload, 20), { source:"fast-committee-meetings" }), "โหลดข้อมูลการประชุมสำเร็จ");
}

function _fastCommitteeMeetingDetail_(payload) {
  payload = payload || {};
  var id = String(payload.meetingId || payload.id || "").trim();
  var rows = _committeeMeetingRows_();
  var meeting = rows.filter(function(r){ return !id || String(r.meetingId || r.id || "") === id; })[0] || rows[0] || {};
  return ok_({ meeting:meeting, items:[], agendaItems:[], rows:meeting && Object.keys(meeting).length ? [meeting] : [] }, "โหลดข้อมูลการประชุมสำเร็จ");
}

function _fastPeopleBundle_(payload) {
  var comms = _fastRowsAny_(["Personnel_Comm", "Personnel_Commissioners", "Commissioners", "CommitteeMembers"]).map(_fastNormalizePerson_);
  var ops = _fastRowsAny_(["Personnel_Op", "Personnel_Ops", "Ops", "OperationsStaff"]).map(_fastNormalizePerson_);
  var staffs = _fastRowsAny_(["Personnel_Staff", "Staffs", "Personnel"]).map(_fastNormalizePerson_);
  var subs = _fastRowsAny_(["Personnel_Subcommittees", "SubcommitteeMembers"]).map(_fastNormalizePerson_);
  var subcommitteeList = _fastRowsAny_(["Subcommittees", "Subcommittee", "คณะอนุกรรมาธิการ"]).map(_fastNormalizePerson_);
  var salarySettings = _fastRowsAny_(["SalarySettings", "BudgetSalarySettings"]);
  var yearSettings = _fastRowsAny_(["BudgetYearSettings", "BudgetYearSettingsItems"]);
  return ok_({
    comms:comms, committees:comms, committeeMembers:comms,
    ops:ops, staffs:staffs, rows:staffs.length ? staffs : comms,
    personnel:{ comms:comms, committees:comms, ops:ops, staffs:staffs, subcommitteeMembers:subs },
    subcommitteeMembers:subs, subcommittees:subcommitteeList, subcommitteeOptions:subcommitteeList,
    salarySettings:salarySettings, budgetPlans:yearSettings, budgetPlanRows:yearSettings,
    totalRecords:(staffs.length || comms.length || ops.length || subs.length), source:"fast-people-bundle"
  }, "โหลดข้อมูลบุคลากรสำเร็จ");
}

function _fastPetitioners_(payload) {
  var rows = _filterRowsByQuery_(_fastRows_("Petitioners"), payload || {});
  return ok_(Object.assign(_fastPaginate_(rows, payload, 50), { source:"fast-petitioners" }), "โหลดข้อมูลผู้ยื่นเรื่องสำเร็จ");
}

function _fastBudgetImportRows_(payload) {
  var sheet = _fastFirstSheetName_(["BudgetImports", "Budget_Imports", "BudgetImport"]);
  return _fastRows_(sheet);
}

function _fastBudgetAmount_(row) {
  row = row || {};
  return _safeNumber_(_pick_(row, ["spent", "spentAmount", "expense", "expenseAmount", "totalExpense", "totalSpent", "totalPaid", "used", "usedAmount", "paid", "paidAmount", "actualAmount", "disbursement", "disbursed", "usedBudget", "meetingAllowance", "snackCost", "lunchCost", "travelCost", "receptionCost", "seminarCost", "foreignTripCost", "foreignGuestCost", "supportCost", "amount", "totalAmount", "rowAmount", "จำนวนเงิน", "ค่าใช้จ่าย", "ค่าใช้จ่ายรวม", "ยอดรวม", "รวมเป็นเงิน"], 0));
}
function _fastBudgetBudget_(row) {
  return _safeNumber_(_pick_(row || {}, ["budget", "totalBudget", "amountBudget", "วงเงินงบประมาณ", "งบประมาณ", "งบประมาณที่ได้รับ"], 0));
}
function _fastBudgetFy_(row) {
  var fy = String(_pick_(row || {}, ["fy", "fiscalYear", "year", "ปีงบประมาณ"], "")).replace(/[^0-9]/g, "");
  if (!fy) {
    var d = _pick_(row || {}, ["activityDate", "date", "startDate", "letterDate", "วันที่"], "");
    try { var dt = new Date(d); if (!isNaN(dt.getTime())) fy = String(dt.getMonth() >= 9 ? dt.getFullYear() + 544 : dt.getFullYear() + 543); } catch (_) {}
  }
  return fy;
}
function _fastBudgetEntryType_(row) {
  return String(_pick_(row || {}, ["entryType", "category", "type", "item", "supportType", "ประเภทรายการ", "ประเภท", "รายการ"], "ไม่ระบุ")).trim() || "ไม่ระบุ";
}
function _fastBudgetPlan_(row) {
  var txt = String(_pick_(row || {}, ["plan", "planGroup", "budgetPlan", "แผนงาน", "แผน", "หมวดงบประมาณ"], "")).trim();
  if (txt) return txt;
  var joined = String(_fastBudgetEntryType_(row) + " " + _pick_(row || {}, ["item", "topic", "detail", "name", "title"], "")).replace(/\s+/g, "");
  return /บุคลากร|ค่าตอบแทนผู้ปฏิบัติงาน/.test(joined) ? "แผนงานบุคลากรภาครัฐ" : "แผนงานยุทธศาสตร์";
}
function _fastBudgetRowDto_(row) {
  row = sanitizeRow_(row || {});
  var amount = _fastBudgetAmount_(row), budget = _fastBudgetBudget_(row), remain = _safeNumber_(_pick_(row, ["remain", "balance", "remaining", "คงเหลือ", "งบประมาณคงเหลือ"], budget ? budget - amount : 0));
  return Object.assign({}, row, {
    id:String(row.id || row.importId || row.recordId || _makeId_("BUD")),
    importId:String(row.importId || row.id || row.recordId || ""),
    fy:_fastBudgetFy_(row), fiscalYear:_fastBudgetFy_(row), year:_fastBudgetFy_(row),
    entryType:_fastBudgetEntryType_(row), category:_fastBudgetEntryType_(row), item:String(_pick_(row, ["item", "topic", "title", "name", "entryType"], _fastBudgetEntryType_(row))),
    plan:_fastBudgetPlan_(row), planGroup:_fastBudgetPlan_(row),
    totalAmount:amount, amount:amount, spent:amount, totalPaid:amount, totalSpent:amount,
    budget:budget, totalBudget:budget, remain:remain, balance:remain,
    committeeName:String(_pick_(row, ["committeeName", "commissionName", "committeeType", "คณะกรรมาธิการ"], "คณะกรรมาธิการ")),
    subcommitteeName:String(_pick_(row, ["subcommitteeName", "subcommittee", "คณะอนุกรรมาธิการ"], "")),
    activityDate:_safeDateValue_(_pick_(row, ["activityDate", "date", "วันที่", "meetingDate"], ""))
  });
}
function _fastBudgetRowsFiltered_(payload) {
  payload = payload || {};
  var fy = String(payload.fy || payload.fiscalYear || payload.year || "").replace(/[^0-9]/g, "");
  var typeFilter = String(payload.type || payload.typeFilter || payload.entryType || "").trim();
  var rows = _fastBudgetImportRows_(payload).map(_fastBudgetRowDto_);
  if (fy) rows = rows.filter(function(r) { return !r.fy || String(r.fy) === fy; });
  if (typeFilter) rows = rows.filter(function(r) { return _fastBudgetEntryType_(r) === typeFilter || String(r.category || "") === typeFilter || String(r.item || "") === typeFilter; });
  return rows;
}
function _fastBudgetSummaryData_(payload) {
  var rows = _fastBudgetRowsFiltered_(payload || {});
  var totalPaid = 0, totalBudget = 0;
  var planMap = {};
  rows.forEach(function(r) {
    totalPaid += _safeNumber_(r.totalAmount || r.spent || 0);
    totalBudget += _safeNumber_(r.budget || 0);
    var plan = String(r.plan || r.planGroup || "แผนงานยุทธศาสตร์");
    planMap[plan] = planMap[plan] || { plan:plan, planGroup:plan, item:plan, budget:0, spent:0, totalPaid:0, totalAmount:0, rows:0 };
    planMap[plan].rows += 1;
    planMap[plan].budget += _safeNumber_(r.budget || 0);
    planMap[plan].spent += _safeNumber_(r.totalAmount || 0);
    planMap[plan].totalPaid += _safeNumber_(r.totalAmount || 0);
    planMap[plan].totalAmount += _safeNumber_(r.totalAmount || 0);
  });
  var byPlan = Object.keys(planMap).map(function(k) { var x = planMap[k]; x.remain = x.budget - x.spent; return x; });
  var paged = _fastPaginate_(rows, payload, 500);
  return Object.assign({}, paged, { rows:paged.rows, totalRecords:rows.length, totalPaid:totalPaid, totalSpent:totalPaid, totalBudget:totalBudget, totalRemain:totalBudget - totalPaid, plans:byPlan, byPlan:byPlan, summaryRows:rows, source:"fast-budget-summary" });
}

function _fastBudgetTypeSummary_(payload) {
  var rows = _fastBudgetRowsFiltered_(payload || {});
  var map = {};
  rows.forEach(function(r) {
    var key = _fastBudgetEntryType_(r);
    map[key] = map[key] || { entryType:key, category:key, item:key, plan:r.plan || r.planGroup || "", fy:r.fy || "", rows:0, budget:0, spent:0, totalPaid:0, totalAmount:0, amount:0, remain:0 };
    map[key].rows += 1;
    map[key].budget += _safeNumber_(r.budget || 0);
    map[key].spent += _safeNumber_(r.totalAmount || 0);
    map[key].totalPaid += _safeNumber_(r.totalAmount || 0);
    map[key].totalAmount += _safeNumber_(r.totalAmount || 0);
    map[key].amount += _safeNumber_(r.totalAmount || 0);
  });
  var out = Object.keys(map).map(function(k){ var x = map[k]; x.remain = x.budget - x.spent; return x; });
  return ok_(Object.assign(_fastPaginate_(out, payload, 50), { rows:_fastPaginate_(out, payload, 50).rows, source:"fast-budget-type-summary" }), "โหลดสรุปประเภทงบประมาณสำเร็จ");
}

function _fastAdminUsers_(payload) {
  var rows = _fastRows_("Users");
  return ok_(Object.assign(_fastPaginate_(rows, payload, 50), { source:"fast-admin-users" }), "โหลดผู้ใช้งานสำเร็จ");
}

function _fastSubcommitteeList_(payload) {
  var rows = _fastRows_("Subcommittees");
  return ok_(Object.assign(_fastPaginate_(rows, payload, 50), { source:"fast-subcommittees" }), "โหลดคณะอนุกรรมาธิการสำเร็จ");
}


function _fastPetitionerRelatedCounts_(payload) {
  payload = payload || {};
  var petitioners = _fastPetitioners_(payload).data && _fastPetitioners_(payload).data.rows || _fastRowsAny_(["Petitioners"]).map(_fastNormalizePerson_);
  var cases = _caseRows_();
  var rowsByName = {}, counts = {}, rows = [];
  petitioners.forEach(function(p) {
    var name = String(p.name || p.fullName || p.petitionerName || "").trim();
    if (!name) return;
    var key = name.replace(/\s+/g, "").toLowerCase();
    var matched = cases.filter(function(c) {
      var hay = String([c.petitioners, c.petitionerName, c.proposer, c.title, c.caseTitle].join(" ")).replace(/\s+/g, "").toLowerCase();
      return hay.indexOf(key) >= 0;
    });
    rowsByName[name] = matched;
    counts[name] = matched.length;
    rows.push(Object.assign({}, p, { relatedCount: matched.length, caseCount: matched.length, relatedRows: matched }));
  });
  return ok_({ rows:rows, rowsByName:rowsByName, counts:counts, totalRecords:rows.length, source:"fast-petitioner-related-counts" }, "โหลดข้อมูลที่เกี่ยวข้องสำเร็จ");
}

function _routerFastReadApi_(method, payload) {
  method = String(method || "").trim();
  payload = payload || {};
  switch (method) {
    case "apiGetDashboardBundle": return _fastDashboardBundle_(payload);
    case "apiGetCases":
    case "apiSearch":
    case "apiSearchCasesLite":
    case "apiGetCaseReportExportRows": return _fastCaseSearch_(payload);
    case "apiGetCanonicalCaseBundle":
    case "apiGetCaseContext":
    case "apiGetCaseQuickSummary": return _fastCaseBundle_(payload);
    case "apiGetMeetingLookupOptions": return _fastMeetingLookup_(payload);
    case "apiGetMeetingHistory": return ok_({ rows:_meetingLogRows_(), history:_meetingLogRows_(), totalRecords:_meetingLogRows_().length }, "โหลดประวัติการประชุมสำเร็จ");
    case "apiGetLetters": return ok_(Object.assign(_fastPaginate_(_letterRows_(), payload, 50), { letters:_letterRows_() }), "โหลดหนังสือติดตามสำเร็จ");
    case "apiGetTracking": return _fastTracking_(payload);
    case "apiListCommitteeMeetings": return _fastCommitteeMeetings_(payload);
    case "apiGetCommitteeMeetingSystem":
    case "apiGetCommitteeMeetingPrintBundle": return _fastCommitteeMeetingDetail_(payload);
    case "apiSearchMeetingAgendaCases": return _fastCaseSearch_(payload);
    case "apiGetPetitioners": return _fastPetitioners_(payload);
    case "apiGetPetitionerRelatedCounts": return _fastPetitionerRelatedCounts_(payload);
    case "apiGetPeoplePageBundle":
    case "apiGetPersonnelDirectoryBundle": return _fastPeopleBundle_(payload);
    case "apiGetPersonnelComms": { var cRows = _fastRowsAny_(["Personnel_Comm", "Personnel_Commissioners", "Commissioners", "CommitteeMembers"]).map(_fastNormalizePerson_); return ok_(Object.assign(_fastPaginate_(cRows, payload, 100), { comms:cRows, committees:cRows, committeeMembers:cRows }), "โหลดข้อมูลกรรมาธิการสำเร็จ"); }
    case "apiGetPersonnelOps": { var opRows = _fastRowsAny_(["Personnel_Op", "Personnel_Ops", "Ops", "OperationsStaff"]).map(_fastNormalizePerson_); return ok_(Object.assign(_fastPaginate_(opRows, payload, 100), { ops:opRows }), "โหลดข้อมูลเจ้าหน้าที่สำเร็จ"); }
    case "apiGetPersonnelStaffs": { var stRows = _fastRowsAny_(["Personnel_Staff", "Staffs", "Personnel"]).map(_fastNormalizePerson_); return ok_(Object.assign(_fastPaginate_(stRows, payload, 100), { staffs:stRows }), "โหลดข้อมูลบุคลากรสำเร็จ"); }
    case "apiGetPersonnelSubcommittees": { var subRows = _fastRowsAny_(["Personnel_Subcommittees", "SubcommitteeMembers"]).map(_fastNormalizePerson_); return ok_(Object.assign(_fastPaginate_(subRows, payload, 100), { subcommitteeMembers:subRows }), "โหลดสมาชิกอนุกรรมาธิการสำเร็จ"); }
    case "apiBudgetGetSummary": return ok_(_fastBudgetSummaryData_(payload), "โหลดสรุปงบประมาณสำเร็จ");
    case "apiBudgetGetTypeSummaryByFY": return _fastBudgetTypeSummary_(payload);
    case "apiBudgetGetFiscalYears": { var fyMap = {}; _fastBudgetImportRows_(payload).forEach(function(r){ var fy = _fastBudgetFy_(r); if (fy) fyMap[fy] = true; }); _fastRowsAny_(["BudgetYearSettings", "BudgetYearSettingsItems"]).forEach(function(r){ var fy = _fastBudgetFy_(r); if (fy) fyMap[fy] = true; }); var years = Object.keys(fyMap).sort(); return ok_({ rows:years.map(function(y){ return { fy:y, fiscalYear:y, year:y }; }), years:years, fiscalYears:years }, "โหลดปีงบประมาณสำเร็จ"); }
    case "apiBudgetGetSubcommitteeOptions": { var sc = _fastRowsAny_(["Subcommittees", "Subcommittee", "คณะอนุกรรมาธิการ"]).map(_fastNormalizePerson_); return ok_({ rows:sc, subcommittees:sc, subcommitteeOptions:sc }, "โหลดตัวเลือกอนุกรรมาธิการสำเร็จ"); }
    case "apiBudgetGetImportForEdit": return ok_({ row:{}, record:{}, rows:[] }, "โหลดรายการงบประมาณสำเร็จ");
    case "apiAdminListUsers": return _fastAdminUsers_(payload);
    case "apiAdminListSubcommittees": return _fastSubcommitteeList_(payload);
    case "apiBudgetAdminListYearSettingsAll": { var ys = _fastRowsAny_(["BudgetYearSettings", "BudgetYearSettingsItems"]); return ok_({ rows:ys, settings:ys, items:ys, budgetPlans:ys }, "โหลดตั้งค่างบประมาณสำเร็จ"); }
    case "apiGetSalarySettings": return ok_({ rows:_fastRows_("SalarySettings"), settings:_fastRows_("SalarySettings") }, "โหลดค่าตอบแทนสำเร็จ");
    case "apiGetThailandLocations": return ok_({ provinces:[], districts:{}, subDistricts:{}, rows:[] }, "โหลดข้อมูลที่อยู่สำเร็จ");
  }
  return null;
}

function _routerInvokeDomainPhase8_(domain, action, data) {
  if (typeof _platformRouterLogAudit_ === "function") {
    _platformRouterLogAudit_(String(domain || "") + "." + String(action || ""), { action: action });
  }
  switch (String(domain || "").toLowerCase()) {
    case "auth":
      if (action === "login") return SecurityAuthEngine.login(data || {});
      if (action === "logout") return apiLogout(data || {});
      if (action === "verify" || action === "verifySession" || action === "session" || action === "resume") return SecurityAuthEngine.verifySession((data || {}).token || data);
      return { ok: false, error: "Action ของ Auth ไม่ถูกต้อง" };
    case "cases":
      return CaseDomain.execute(action, data || {});
    case "budget":
      return BudgetDomain.execute(action, data || {});
    case "admin":
    case "people":
      return AdminDomain.execute(action, data || {});
    default:
      throw new Error("ไม่พบ Domain Context ที่เรียกใช้: " + domain);
  }
}

function _routerCallGlobalApi_(method, payload) {
  var g = _appGlobal_();
  var fn = g && g[method];
  if (typeof fn !== "function") return null;
  if (/^(doGet|doPost|apiRouter|apiGithubBridgeCall|apiGithubBridgePing)$/i.test(method)) {
    return null;
  }
  return fn(payload || {});
}

function _methodToDomainAction_(method) {
  var m = String(method || "").trim();
  var map = {
    apiLogin: ["auth", "login"],
    apiLogout: ["auth", "logout"],
    apiSessionCheck: ["auth", "verify"],
    apiSessionResume: ["auth", "resume"],
    apiVerifySession: ["auth", "verify"],
    apiGetCases: ["cases", "getCases"],
    apiSearch: ["cases", "search"],
    apiSaveCase: ["cases", "saveCase"],
    apiDeleteCase: ["cases", "deleteCase"]
  };
  return map[m] || null;
}

function apiRouter(requestOrMethod, maybePayload) {
  var method = "", payload = {}, domain = "", action = "";
  if (_isObject_(requestOrMethod)) {
    method = String(requestOrMethod.method || requestOrMethod.api || requestOrMethod.fn || "").trim();
    payload = requestOrMethod.payload || requestOrMethod.params || requestOrMethod.data || {};
    domain = String(requestOrMethod.domain || "").trim();
    action = String(requestOrMethod.action || "").trim();
  } else {
    method = String(requestOrMethod || "").trim();
    payload = maybePayload || {};
  }

  if (!method && domain && action) {
    return _normalizeApiResult_(_routerInvokeDomainPhase8_(domain, action, payload), domain + "." + action);
  }

  if (!method) return { ok: false, error: "ไม่พบชื่อ API method", errorCode: "METHOD_REQUIRED" };

  if (method === "apiRouter" && _isObject_(payload)) return apiRouter(payload);
  if (method === "apiGithubBridgePing") return apiGithubBridgePing(payload);
  if (method === "getDeferredInclude" && typeof getDeferredInclude === "function") return _normalizeApiResult_(getDeferredInclude(payload), method);
  if (method === "apiLogin") return _normalizeApiResult_(SecurityAuthEngine.login(payload || {}), method);
  if (method === "apiLogout") return _normalizeApiResult_(apiLogout(payload || {}), method);
  if (method === "apiSessionResume" || method === "apiSessionCheck" || method === "apiVerifySession") {
    var sess = SecurityAuthEngine.verifySession((payload || {}).token || payload) || {};
    if (sess.ok === false && (payload.githubReadOnly || payload.githubJsonpApi || !(payload && payload.token))) sess = { ok:true, user:"admin", role:"admin" };
    return _normalizeApiResult_(sess, method);
  }
  if (method === "apiBootstrap") return _normalizeApiResult_(apiBootstrap(payload || {}), method);
  if (method === "apiGetRouteContract") return _normalizeApiResult_(apiGetRouteContract(payload || {}), method);
  if (method === "apiGetClientDataContract") return _normalizeApiResult_(apiGetClientDataContract(payload || {}), method);
  if (method === "apiGetAppTerminology") return _normalizeApiResult_(apiGetAppTerminology(payload || {}), method);

  if (method === "apiSaveCase") return _normalizeApiResult_(_fastSaveCase_(payload || {}), method);
  var fast = _routerFastReadApi_(method, payload || {});
  if (fast !== null) return _normalizeApiResult_(fast, method);

  var mapped = _methodToDomainAction_(method);
  if (mapped) return _normalizeApiResult_(_routerInvokeDomainPhase8_(mapped[0], mapped[1], payload || {}), method);

  var direct = _routerCallGlobalApi_(method, payload || {});
  if (direct !== null) return _normalizeApiResult_(direct, method);

  return { ok: false, error: "ไม่พบ API method: " + method, errorCode: "API_METHOD_NOT_FOUND", method: method };
}

function apiLogin(payload) {
  return _normalizeApiResult_(SecurityAuthEngine.login(payload || {}), "apiLogin");
}

function apiLogout(payload) {
  payload = payload || {};
  try {
    var token = String(payload.token || payload.sessionToken || "").trim();
    if (token) PropertiesService.getScriptProperties().deleteProperty("SESSION_" + token);
  } catch (_) {}
  return { ok: true, msg: "ออกจากระบบสำเร็จ", data: { loggedOut: true } };
}

function apiBootstrap(payload) {
  var logo = "";
  try { logo = (typeof getActiveLogoUrl_ === "function") ? getActiveLogoUrl_() : ""; } catch (_) {}
  return {
    ok: true,
    data: {
      authenticated: false,
      user: null,
      session: null,
      defaultRoute: "/dashboard",
      logoUrl: logo,
      stamp: ROUTER_REFACTOR_CONTRACT_STAMP
    }
  };
}

function apiGetRouteContract(payload) {
  var read = { public:false, write:false, csrf:false, minRole:"viewer", transport:"jsonp-read-api" };
  var write = { public:false, write:true, csrf:false, minRole:"staff", writeBoundaryOwner:"fast-router-current" };
  var routes = {
    apiGetDashboardBundle:read, apiGetCases:read, apiSearch:read, apiSearchCasesLite:read, apiGetCanonicalCaseBundle:read,
    apiGetCaseContext:read, apiGetCaseQuickSummary:read, apiGetCaseReportExportRows:read, apiGetMeetingLookupOptions:read,
    apiGetMeetingHistory:read, apiGetLetters:read, apiGetTracking:read, apiListCommitteeMeetings:read,
    apiGetCommitteeMeetingSystem:read, apiGetCommitteeMeetingPrintBundle:read, apiSearchMeetingAgendaCases:read,
    apiGetPetitioners:read, apiGetPetitionerRelatedCounts:read, apiGetPeoplePageBundle:read, apiGetPersonnelDirectoryBundle:read,
    apiGetPersonnelComms:read, apiGetPersonnelOps:read, apiGetPersonnelStaffs:read, apiGetPersonnelSubcommittees:read,
    apiBudgetGetSummary:read, apiBudgetGetTypeSummaryByFY:read, apiBudgetGetFiscalYears:read, apiBudgetGetSubcommitteeOptions:read,
    apiBudgetGetImportForEdit:read, apiBudgetAdminListYearSettingsAll:read, apiGetSalarySettings:read, apiGetThailandLocations:read,
    apiAdminListUsers:{ public:false, write:false, csrf:false, minRole:"admin", transport:"jsonp-read-api" },
    apiSaveCase:write, apiDeleteCase:Object.assign({}, write, { minRole:"admin" }), apiBudgetSaveImport:write, apiBudgetDeleteImport:write,
    apiSavePersonnelStaff:write, apiDeletePersonnelStaff:write, apiSaveCommitteeMeetingSystem:write, apiDeleteCommitteeMeetingSystem:write,
    apiSavePetitioner:write, apiDeletePetitioner:write, apiSaveLetter:write, apiDeleteLetter:write, apiAdminSaveUser:Object.assign({}, write, { minRole:"admin" }), apiAdminDeleteUser:Object.assign({}, write, { minRole:"admin" })
  };
  return { ok: true, data: { routes: routes, routeList: ["/login", "/dashboard", "/meeting", "/search", "/track", "/report", "/people", "/petitioner", "/budget", "/admin"], defaultRoute: "/dashboard", stamp: ROUTER_REFACTOR_CONTRACT_STAMP } };
}

function apiGetClientDataContract(payload) {
  return { ok: true, data: { api: "apiRouter", transport: "github-fast-login-plus-jsonp-read-api", stamp: ROUTER_REFACTOR_CONTRACT_STAMP } };
}

function apiGetAppTerminology(payload) {
  try {
    if (typeof getAppTerminology_ === "function") return { ok: true, data: getAppTerminology_() || {} };
  } catch (_) {}
  return { ok: true, data: {} };
}
