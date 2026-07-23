/*==========================================================================
 * Code_32_Domain_Budget.gs — Budget Domain / DTO / Cache / Reports
 * Deminified in-place for maintainability. API contract unchanged.
 *========================================================================== */
var __APP_GLOBAL__ = typeof __APP_GLOBAL__ != "undefined" && __APP_GLOBAL__ || typeof globalThis != "undefined" && globalThis || this || {
}, AppDomain = __APP_GLOBAL__.AppDomain = __APP_GLOBAL__.AppDomain || {
}, BudgetDomain = __APP_GLOBAL__.BudgetDomain = __APP_GLOBAL__.BudgetDomain || {
}, BUDGET_DOMAIN_DTO_REFACTOR_STAMP = "budget-domain-dto-no-envelope-refactor-2026-06-15";
BudgetDomain.dto = function(data, meta) {
  return _b32O_({
    domain: "budget", contractOwner: "Code_32_Domain_Budget", stamp: BUDGET_DOMAIN_DTO_REFACTOR_STAMP
}, data || {
}, {
    meta: _b32O_({
      dtoOnly: !0
}, meta || {
})
})
};
var PHASE5_BUDGET_DOMAIN_OWNER_STAMP = "phase5-domain-owner-cleanup-current", PHASE4_BUDGET_SINGLE_OWNER_STAMP = "phase4-budget-single-domain-owner-2026-07-04-r1";

/* --------------------------------------------------------------------------
 * 1. Domain ownership / platform helpers
 * -------------------------------------------------------------------------- */
function _budgetDomainOwnerContractPhase5_() {
  return {
    ok: !0, owner: "BudgetDomain", codeOwner: "Code_32_Domain_Budget", stamp: PHASE5_BUDGET_DOMAIN_OWNER_STAMP, phase4Stamp: PHASE4_BUDGET_SINGLE_OWNER_STAMP,
    apiFacadeMode: "thin-api-to-domain-owner", sourceOfTruth: "BudgetImports", dashboardBudgetOwner: "BudgetDomain.getDashboardSummaryForDashboard",
    readOwner: "BudgetDomain", writeOwner: "BudgetDomain", apiNamesPreserved: !0, uiDomChanged: !1, businessLogicChanged: !1, noNewFiles: !0
}
}
var PHASE10_BUDGET_DOMAIN_PHYSICAL_STAMP = "c5-budget-domain-physical-owner-lock-current";
function _budgetDomainPhysicalSectionPhase10_(name, purpose, api, helperPrefixes, sourceSheets, writes) {
  return {
    name: String(name || ""), purpose: String(purpose || ""), owner: "Code_32_Domain_Budget.gs:BudgetDomain", api: api || [], helperPrefixes: helperPrefixes || [],
    sourceSheets: sourceSheets || [], writes: writes || [], stamp: PHASE10_BUDGET_DOMAIN_PHYSICAL_STAMP, uiDomChanged: !1, businessLogicChanged: !1,
    apiNamesPreserved: !0
}
}
var _B32WAPIS = ["apiBudgetSaveImport", "apiBudgetDeleteImport", "apiSaveSalarySettings", "apiBudgetAdminSaveYearSettingsRows"];
var _B32FY = ["fy", "FY", "fiscalYear", "budgetFy", "budgetYear", "year", "ปีงบประมาณ", "ปีงบ"], _B32ENTRY = ["entryType", "type", "category",
"ประเภทรายการ", "ประเภทรายการงบประมาณ", "ประเภท"], _B32REM = ["remain", "balance", "remaining", "คงเหลือ", "งบประมาณคงเหลือ"], _B32BUD = ["budget",
"totalBudget", "amountBudget", "budgetAmount", "annualBudget", "annualCommitment", "monthlyBudget", "วงเงินงบประมาณ", "งบประมาณ", "งบประมาณที่ได้รับ",
"งบประมาณรวม", "จำนวนงบประมาณ"];
var _B32R1 = ["amount", "totalAmount", "supportCost", "meetingAllowance", "seminarCost", "foreignTripCost", "foreignGuestCost"], _B32R2 = ["paymentDate",
"paidDate", "date", "วันที่จ่าย", "วันที่เบิกจ่าย", "createdAt", "updatedAt"], _B32R3 = ["seminarSubDistrict", "seminarSubdistrict", "ตำบลสัมมนา",
"ตำบล/แขวง"], _B32R4 = ["subcommitteeName", "ชื่อคณะอนุกรรมาธิการ", "คณะอนุกรรมาธิการ"], _B32R5 = ["fy", "fiscalYear", "budgetFy", "budgetYear",
"ปีงบประมาณ"], _B32R6 = ["seminarTitle", "ชื่อโครงการสัมมนา", "projectName"], _B32R7 = ["detail", "details", "description", "รายละเอียด"], _B32R8 = ["seminarLocationsJson",
"seminarLocationsJSON"], _B32R9 = ["seminarProvince", "จังหวัดสัมมนา", "จังหวัด"], _B32R10 = ["seminarDistrict", "อำเภอสัมมนา", "อำเภอ/เขต"],
_B32R11 = ["seminarDate", "semDate", "วันที่จัดสัมมนา"], _B32R12 = ["seminarSubDistrict", "seminarSubdistrict"], _B32R13 = ["seminarLocations",
"seminarLocationsText"], _B32R14 = ["visitLocationsJson", "visitLocationsJSON"], _B32R15 = ["seminarPlace", "สถานที่สัมมนา", "สถานที่"], _B32R16 = ["category",
"type", "entryType", "ประเภท"], _B32R17 = ["visitSubDistrict", "visitSubdistrict"], _B32R18 = ["visitLocations", "visitLocationsText"], _B32R19 = ["seminarItemsJson",
"seminarItemsJSON"], _B32R20 = ["supportType", "ประเภทรายการส่งเสริม"], _B32R21 = ["budget", "budgetimports", "dashboard"];
function _b32W_(label, e, meta) {
  try {
    _appIsFnName_("_recordWarning_") ? _recordWarning_(label, e, meta): _b32W_(label, e, meta)
}
  catch(_) {
}
}
function _b32A_(v) {
  return Array.isArray(v) ? v: []
}
function _b32O_() {
  return Object.assign.apply(Object, arguments)
}
function _b32H_(o, k) {
  return Object.prototype.hasOwnProperty.call(o, k)
}
function _b32N_(v) {
  return _budgetToNumber_(v)
}
function _b32FY_(v) {
  return _normalizeBudgetFyValue_(v)
}
BudgetDomain.PHYSICAL = {
  owner: "Code_32_Domain_Budget", stamp: PHASE10_BUDGET_DOMAIN_PHYSICAL_STAMP, clusters:  {
    readModel: _budgetDomainPhysicalSectionPhase10_("read", "summary/dashboard/list/type/fy", ["apiBudgetGetSummary", "apiBudgetGetTypeSummaryByFY",
    "apiBudgetListByFY", "apiBudgetListByFYFast", "apiBudgetGetFiscalYears"], ["_budget", "_dashboardBudget"], ["BudgetImports", "BudgetYearSettingsItems"],
    []), writeModel: _budgetDomainPhysicalSectionPhase10_("write", "import/salary/year-settings", _B32WAPIS, ["_budgetFast", "_budgetEdit"], ["BudgetImports",
    "BudgetYearSettingsItems", "BudgetSalarySettings"], _B32WAPIS), salary: _budgetDomainPhysicalSectionPhase10_("salary", "personnel compensation",
    ["apiGetSalarySettings", "apiSaveSalarySettings"], ["_salary", "_budgetPeople", "_calculatePersonnelSalary"], ["People", "BudgetSalarySettings"],
    ["apiSaveSalarySettings"]), admin: _budgetDomainPhysicalSectionPhase10_("admin", "budget settings", ["apiBudgetAdminListYearSettingsAll",
    "apiBudgetAdminSaveYearSettingsRows", "apiBudgetGetFiscalYears"], ["_budgetAdmin", "_budgetFy"], ["BudgetYearSettings", "BudgetYearSettingsItems"],
    ["apiBudgetAdminSaveYearSettingsRows"])
}, rules:  {
    uiDomChanged: !1, businessLogicChanged: !1, apiNamesPreserved: !0, noRouteRenamed: !0, noNewFiles: !0, physicalCleanupOnly: !0
}
};
function _budgetDomainPhysicalContractPhase10_() {
  return {
    ok: !0, owner: "Code_32_Domain_Budget", stamp: PHASE10_BUDGET_DOMAIN_PHYSICAL_STAMP, physical: BudgetDomain.PHYSICAL, rules: BudgetDomain.PHYSICAL.rules
}
}
var BUDGET_READ_MODEL_LOCK = "budget-read-model-current";
AppDomain.Repositories = AppDomain.Repositories || {
}, AppDomain.Repositories.BudgetRepository = {
  buildSummary: function(fyValue) {
    if(fyValue = String(fyValue || ""), _appIsFnName_("_buildBudgetSummaryFromSheet_"))return _buildBudgetSummaryFromSheet_(fyValue);
    if(typeof getBudgetSummaryByFY == "function") {
      var res = getBudgetSummaryByFY({
        fy: fyValue
}), data = res && res.data && typeof res.data == "object" ? res.data: res;
      return data && _b32A_(data.rows)
}
    return[]
}
}, AppDomain.BudgetSalaryRules = AppDomain.BudgetSalaryRules || {
}, AppDomain.BudgetSalaryRules.normalizePersonnelPosition = function(value) {
  var v = String(value || "").replace(/\s+/g, " ").trim();
  return v ? /(คณะอนุกรรมาธิการ|อนุกรรมาธิการ|คณะกรรมาธิการ)\s*\d*/.test(v) && ! /(ที่ปรึกษา|ผู้ชำนาญการ|นักวิชาการ|เลขานุการ)/.test(v) ? "": /ที่ปรึกษา/.test(v) ? "ที่ปรึกษา": /ผู้ชำนาญการ/.test(v) ? "ผู้ชำนาญการ": /นักวิชาการ/.test(v) ? "นักวิชาการ": /เลขานุการ/.test(v) ? "เลขานุการ": v: ""
}, AppDomain.BudgetSalaryRules.isSalaryRelevantPosition = function(value) {
  var v = String(value || "").replace(/\s+/g, " ").trim();
  return ! ! v && /(ที่ปรึกษา|ผู้ชำนาญการ|นักวิชาการ|เลขานุการ)/.test(v)
}, AppDomain.BudgetSalaryRules.salaryKeyMap = function() {
  return {
    ที่ปรึกษา:  {
      g: "ADV_G", n: "ADV"
}, ผู้ชำนาญการ:  {
      g: "EXP_G", n: "EXP"
}, นักวิชาการ:  {
      g: "ACA_G", n: "ACA"
}, เลขานุการ:  {
      g: "SEC_G", n: "SEC"
}
}
}, AppDomain.BudgetSalaryRules.resolveIsGovFlag = function(row) {
  row = row || {
};
  var gov = String(row.isGov || "").trim();
  if(gov === "ใช่")return"g";
  if(gov === "ไม่ใช่")return"n";
  var t = String(row.personnelType || "").trim();
  return t === "ใช่" ? "g": "n"
}, AppDomain.BudgetAgingRules = AppDomain.BudgetAgingRules || {
}, AppDomain.BudgetAgingRules.businessDaysSince = function(startDate, endDate, holidays) {
  var s = new Date(startDate || ""), e = endDate ? new Date(endDate): new Date;
  if(isNaN(s.getTime()) || isNaN(e.getTime()))return 0;
  s.setHours(0, 0, 0, 0), e.setHours(0, 0, 0, 0);
  var holidaySet = {
};
  (holidays || []).forEach(function(h) {
    holidaySet[String(h || "")] = !0
});
  var count = 0, cur = new Date(s.getTime());
  for(cur.setDate(cur.getDate() + 1);
  cur <= e;
) {
    var day = cur.getDay(), iso = Utilities.formatDate(cur, Session.getScriptTimeZone(), "yyyy-MM-dd");
    day === 0 || day === 6 || holidaySet[iso] || count++, cur.setDate(cur.getDate() + 1)
}
  return count
};
var _DASHBOARD_BUDGET_CACHE_TTL_ = 180;
function _currentBudgetFyString_() {
  try {
    return String(_currentFiscalYearThai_(new Date))
}
  catch(_e) {
    var d = new Date;
    return String(d.getMonth() >= 9 ? d.getFullYear() + 544: d.getFullYear() + 543)
}
}
function _bAuthErrorResult_(e, route) {
  var msg = String(e && e.message ? e.message: e || "ไม่พบ token การใช้งาน");
  return(msg.indexOf("token") > - 1 || msg.indexOf("session") > - 1 || msg.indexOf("สิทธิ") > - 1) && (msg = "session หมดอายุหรือไม่พบ token การใช้งาน กรุณาเข้าสู่ระบบใหม่"),
  err_(msg, {
    rows: [], data: [], items: [], records: [], authRequired: !0, route: String(route || ""), source: "budget-auth-guard"
})
}
function _bSafeReq_(payload, role, route) {
  return safeDomainRequest_(payload, role || "viewer", route, _bAuthErrorResult_)
}

/* --------------------------------------------------------------------------
 * 2. Repository and sheet/data-service reads
 * -------------------------------------------------------------------------- */
function _budgetRepository_(name) {
  var aliasMap;
  return getCanonicalRepository_({
    BudgetImports: "budget.imports", BudgetSummary: "budget.summary", BudgetYearSettingsItems: "budget.yearSettingsItems", SalarySettings: "budget.salarySettings",
    Personnel_Staff: "people.personnelStaff"
}
  [String(name || "").trim()] || String(name || "").trim())
}
function _budgetRows_(name, includeDeleted) {
  try {
    var repo = _budgetRepository_(name);
    return includeDeleted === !0 ? repo.listAll(): repo.listActive()
}
  catch(_repoErr) {
    return readSheetObjectsCached_(String(name || ""), {
      includeDeleted: includeDeleted === !0
})
}
}
function _budgetDataServiceRows_(sheetName, fields, opts) {
  opts = opts || {
};
  fields = _b32A_(fields);
  var name = String(sheetName || "").trim(), cacheBypass = _budgetCachePolicyBypass_(opts) || opts.forceFresh === !0 || opts.noCache === !0 || opts.bypassCache === !0 || opts.bypassRequestCache === !0 || opts.reload === !0,
  projectedRows = null, projectedOk = !1;
  function fullRead(reason) {
    var rows = [];
    try {
      rows = _budgetRows_(name, opts.includeDeleted === !0) || []
}
    catch(_fullErr) {
      _b32W_("budget.dataService.fullRead", _fullErr, {
        sheetName: name, reason: reason || "fallback"
}), rows = []
}
    if(rows && rows.length)try {
      rows.__budgetFallbackFullRead = !0, rows.__budgetFallbackReason = String(reason || "")
}
    catch(_tagErr) {
}
    return rows || []
}
  try {
    if(_appIsFnName_("_appDataServiceRead_")) {
      projectedRows = _appDataServiceRead_(name, fields, _b32O_({
}, opts, {
        owner: "budget.domain", ttl: cacheBypass ? 0: (opts.ttl || 240), forceFresh: cacheBypass || opts.forceFresh === !0, noCache: cacheBypass || opts.noCache === !0,
        bypassCache: cacheBypass || opts.bypassCache === !0, bypassRequestCache: cacheBypass || opts.bypassRequestCache === !0, includeDeleted: opts.includeDeleted === !0,
        requireCanonical: opts.requireCanonical === !0
})) || [];
      projectedOk = !0
}
    else if(fields.length && typeof readSheetProjectedObjectsCached_ == "function") {
      projectedRows = (cacheBypass ? []: readSheetProjectedObjectsCached_(name, fields, {
        includeDeleted: opts.includeDeleted === !0, requireCanonical: opts.requireCanonical === !0, ttl: opts.ttl || 240
})) || [];
      projectedOk = !0
}
}
  catch(_projectErr) {
    _b32W_("budget.dataService.projectedRead", _projectErr, {
      sheetName: name, fields: fields.length
}), projectedRows = null, projectedOk = !1
}
  if(projectedOk && Array.isArray(projectedRows) && projectedRows.length)return projectedRows;
  var coreSheets = {
    BudgetImports: !0, BudgetSummary: !0, BudgetYearSettingsItems: !0, BudgetYearSettings: !0, SalaryPayments: !0, Personnel_Staff: !0,
    SalarySettings: !0, BudgetSalarySettings: !0
};
  if(projectedOk && Array.isArray(projectedRows) && ! projectedRows.length && coreSheets[name] && opts.allowEmpty !== !0)return fullRead("projected-empty-core-budget-sheet");
  if(projectedOk)return projectedRows || [];
  return fullRead("projected-unavailable")
}

/* --------------------------------------------------------------------------
 * 3. Dashboard budget helpers and workflow summary
 * -------------------------------------------------------------------------- */
function _dashboardBudgetEmpty_(fy) {
  return {
    fy: String(fy || ""), totalBudget: 0, totalPaid: 0, totalRemain: 0, plans: [], byPlan: [], rows: [], details: []
}
}
function _dashboardBudgetStatusSummaryByFY_(fy) {
  var rows = _dashboardBudgetStatusSummaryRows_(fy), summary = {
    refund:  {
      total: 0, pending: 0, completed: 0
}, report:  {
      total: 0, pending: 0, completed: 0
}
};
  return rows.forEach(function(r) {
    r = r || {
}, summary.refund.total += 1, summary.report.total += 1, _budgetStatusDone_(r.refundStatus, "refund") ? summary.refund.completed += 1: summary.refund.pending += 1,
    _budgetStatusDone_(r.reportStatus, "report") ? summary.report.completed += 1: summary.report.pending += 1
}), summary
}
function _dashboardBudgetWorkflowSummaryHasData_(summary) {
  summary = summary || {
};
  var refund = summary.refund || summary.refundSummary || summary.return || summary.returns || {
}, report = summary.report || summary.reportSummary || summary.expenseReport || {
};
  return ! ! (Number(refund.total || 0) || Number(report.total || 0) || Number(summary.refundTotal || 0) || Number(summary.reportTotal || 0))
}
function _applyDashboardBudgetStatusSummary_(payload, fy) {
  payload = payload && typeof payload === "object" ? payload: _dashboardBudgetEmpty_(fy);
  var existing = payload.statusSummary || payload.workflow || payload.budgetWorkflow || payload.workflowSummary || {
}, generated = _dashboardBudgetStatusSummaryByFY_(fy || payload.fy || ""), summary = _dashboardBudgetWorkflowSummaryHasData_(existing) ? existing: generated,
  existingRows = _b32A_(payload.workflowRows && payload.workflowRows.length ? payload.workflowRows: payload.statusRows && payload.statusRows.length ? payload.statusRows: []),
  generatedRows = _dashboardBudgetStatusSummaryRows_(fy || payload.fy || "");
  payload.statusSummary = summary;
  payload.workflow = summary;
  payload.budgetWorkflow = summary;
  payload.workflowSummary = summary;
  payload.workflowRows = existingRows.length ? existingRows: generatedRows;
  payload.statusRows = payload.workflowRows;
  return payload
}
function _dashboardBudgetHasData_(payload) {
  payload = _budgetReadModelData_(payload || {});
  var seg = payload.segments || {}, overview = payload.overviewSection || seg.overview || {}, workflow = payload.workflowSection || seg.workflow || {}, reportSeg = payload.reportSection || seg.report || {};
  var rows = Array.isArray(payload.byPlan) ? payload.byPlan : Array.isArray(payload.plans) ? payload.plans : Array.isArray(payload.rows) ? payload.rows : Array.isArray(payload.details) ? payload.details : Array.isArray(overview.rows) ? overview.rows : [];
  var statusSummary = payload.statusSummary || payload.workflow || payload.budgetWorkflow || payload.workflowSummary || workflow.summary || {};
  var refund = statusSummary.refund || statusSummary.refundSummary || {};
  var report = statusSummary.report || statusSummary.reportSummary || {};
  var totals = payload.grandTotals || payload.totals || overview.totals || {};
  var all = totals.all || totals || {};
  return !!(rows.length ||
    Number(payload.totalBudget || payload.totalPaid || payload.totalExpense || payload.totalRemain || payload.totalRemaining || 0) ||
    Number(all.budget || all.totalBudget || all.spent || all.totalPaid || all.remain || all.totalRemain || 0) ||
    Number(overview.totalBudget || overview.totalPaid || overview.totalRemain || 0) ||
    Number(refund.total || report.total || statusSummary.refundTotal || statusSummary.reportTotal || 0) ||
    (Array.isArray(payload.workflowRows) && payload.workflowRows.length) ||
    (Array.isArray(payload.statusRows) && payload.statusRows.length) ||
    (Array.isArray(workflow.rows) && workflow.rows.length) ||
    (Array.isArray(reportSeg.rows) && reportSeg.rows.length));
}
function _budgetFyHasRecordedData_(fy) {
  if(! (fy = _b32FY_(fy)))return !1;
  try {
    if(_budgetLiteRows_("BudgetSummary").some(function(r) {
      return _b32FY_(r && r.fy) === fy
}))return !0
}
  catch(_e1) {
    _b32W_("ec", _e1)
}
  try {
    if(_budgetLiteRows_("BudgetYearSettingsItems").some(function(r) {
      return _b32FY_(r && r.fy) === fy
}))return !0
}
  catch(_e3) {
    _b32W_("ec", _e3)
}
  try {
    if(_budgetLiteRows_("BudgetImports").some(function(r) {
      return _budgetRowFyLite_(r) === fy
}))return !0
}
  catch(_e4) {
    _b32W_("ec", _e4)
}
  return !1
}
function _budgetCollectFiscalYears_(includeCurrent, warningPrefix) {
  var years = [];
  function add2(value) {
    var fy = _b32FY_(value);
    fy && years.indexOf(fy) < 0 && years.push(fy)
}
  function read(sheetName, pick) {
    try {
      (_budgetLiteRows_(sheetName) || []).forEach(function(row) {
        add2(pick ? pick(row || {
}): row && row.fy)
})
}
    catch(e) {
      _b32W_(String(warningPrefix || "budget.fiscalYears") + "." + String(sheetName || "sheet"), e)
}
}
  return read("BudgetYearSettingsItems", function(row) {
    return row && (row.fy || row.fiscalYear || row.budgetFy || row.budgetYear || row.year || row.ปีงบประมาณ || row.ปีงบ)
}), read("BudgetSummary", function(row) {
    return row && (row.fy || row.fiscalYear || row.budgetFy || row.budgetYear || row.year || row.ปีงบประมาณ || row.ปีงบ)
}), read("BudgetImports", function(row) {
    return _budgetRowFyLite_(row)
}), includeCurrent && add2(_currentBudgetFyString_()), years.filter(Boolean).sort(function(a, b) {
    return Number(b || 0) - Number(a || 0)
})
}
function _latestAvailableBudgetFy_() {
  var years = _budgetCollectFiscalYears_(! 1, "budget.latestFy");
  return years.length ? years[0]: _currentBudgetFyString_() || ""
}
function _resolveBudgetDefaultFiscalYear_() {
  var currentFy = _currentBudgetFyString_(), preferred;
  return _b32FY_(_latestAvailableBudgetFy_()) || currentFy
}
function _budgetFyCandidatesFromData_() {
  return _budgetCollectFiscalYears_(! 0, "budget.dashboardFyCandidates")
}
function _budgetImportCanonicalFields_() {
  return["id", "ID", "เลขที่", "fy", "FY", "fiscalYear", "budgetFy", "budgetYear", "year", "ปีงบประมาณ", "ปีงบ", "entryType", "category", "type",
  "item", "itemName", "topic", "name", "label", "ประเภทรายการ", "ประเภทรายการงบประมาณ", "ประเภท", "รายการ", "ชื่อรายการ", "รายการงบประมาณ", "หัวข้อ",
  "ชื่อเรื่อง", "committeeType", "committeeName", "roundNo", "คณะ", "ชื่อคณะ", "ครั้งที่", "startDate", "endDate", "activityDate", "seminarDate",
  "date", "createdAt", "updatedAt", "วันที่", "วันเดือนปี", "วันที่ดำเนินการ", "วันที่เริ่ม", "วันที่สิ้นสุด", "meetingAllowance", "snackCost",
  "lunchCost", "travelCost", "receptionCost", "seminarCost", "foreignTripCost", "foreignGuestCost", "supportCost", "spent", "expense", "paid",
  "paidAmount", "actualAmount", "expenseAmount", "disbursement", "disbursed", "usedBudget", "usedAmount", "รายจ่าย", "รายจ่ายรวม", "จำนวนรายจ่าย",
  "เบิกจ่าย", "ยอดเบิกจ่าย", "amount", "totalAmount", "rowAmount", "จำนวนเงิน", "ยอดรวม", "รวมเป็นเงิน", "ค่าใช้จ่าย", "ค่าใช้จ่ายรวม", "committeeResponsible",
  "staffResponsible", "note", "remark", "refundStatus", "refundDate", "reportStatus", "reportDate", "สถานะคืนเงิน", "สถานะการคืนเงิน", "วันที่คืนเงิน",
  "วันคืนเงิน", "สถานะรายงาน", "สถานะรายงานค่าใช้จ่าย", "วันที่รายงาน", "วันรายงาน", "payloadJson", "payloadJSON", "extra", "payload", "visitLocations",
  "seminarLocations", "countriesText", "subcommitteeName", "seminarTitle", "supportType", "detail", "guestCountry", "visitPlace", "visitProvince",
  "visitDistrict", "visitSubDistrict", "seminarPlace", "seminarProvince", "seminarDistrict", "seminarSubDistrict", "seminarItemsJson", "extraJson",
  "visitLocationsJson", "visitLocationsJSON", "seminarLocationsJson", "seminarLocationsJSON", "countriesJson", "countriesJSON", "visitLocationsText",
  "seminarLocationsText", "isDeleted", "deleted", "deletedAt"]
}
function _budgetProjectedFields_(sheetName) {
  return sheetName = String(sheetName || "").trim(), sheetName === "BudgetImports" ? _budgetImportCanonicalFields_(): sheetName === "BudgetTypeSummary" ? _budgetFastTypeSummaryFields_("BudgetTypeSummary"): sheetName === "BudgetSummary" ? ["id",
  "ID", "fy", "FY", "fiscalYear", "budgetFy", "budgetYear", "year", "ปีงบประมาณ", "ปีงบ", "planGroup", "plan", "category", "item", "name", "label",
  "title", "description", "แผนงาน", "หมวด", "หมวดงบประมาณ", "รายการ", "ชื่อรายการ", "รายการงบประมาณ", "budget", "totalBudget", "amountBudget",
  "budgetAmount", "annualBudget", "annualCommitment", "monthlyBudget", "วงเงินงบประมาณ", "งบประมาณ", "งบประมาณที่ได้รับ", "งบประมาณรวม", "จำนวนงบประมาณ",
  "spent", "spentAmount", "expense", "expenseAmount", "totalExpense", "totalSpent", "totalPaid", "used", "usedAmount", "paid", "paidAmount", "actualAmount",
  "disbursement", "disbursed", "usedBudget", "personnelExpense", "staffExpense", "ytdExpense", "salaryExpense", "compensationExpense", "allowanceExpense",
  "currentMonthlyExpense", "monthlyRateTotal", "รายจ่าย", "รายจ่ายรวม", "จำนวนรายจ่าย", "ยอดใช้จ่าย", "ค่าใช้จ่าย", "ค่าใช้จ่ายรวม", "เบิกจ่าย",
  "ยอดเบิกจ่าย", "ค่าตอบแทน", "ค่าตอบแทนรวม", "เงินเดือน", "เงินเดือนรวม", "ค่าตอบแทนรายเดือน", "amount", "totalAmount", "rowAmount", "จำนวนเงิน",
  "ยอดรวม", "รวมเป็นเงิน", "รวม", "remain", "balance", "remaining", "คงเหลือ", "งบประมาณคงเหลือ", "updatedAt", "isDeleted", "deleted", "deletedAt"]: sheetName === "BudgetYearSettingsItems" || sheetName === "BudgetYearSettings" ? ["fy",
  "FY", "fiscalYear", "budgetFy", "budgetYear", "year", "ปีงบประมาณ", "ปีงบ", "category", "item", "budget", "amount", "remark", "active", "planGroup",
  "plan", "sortNo", "updatedAt", "isDeleted", "deleted", "deletedAt"]: sheetName === "SalarySettings" ? ["fy", "FY", "fiscalYear", "Key", "key",
  "Value", "value", "UpdatedAt", "updatedAt", "isDeleted", "deletedAt"]: sheetName === "SalaryPayments" ? ["id", "ID", "fy", "FY", "fiscalYear",
  "budgetFy", "budgetYear", "year", "ปีงบประมาณ", "ปีงบ", "personId", "personName", "name", "fullName", "ชื่อ-สกุล", "position", "role", "title",
  "ตำแหน่ง", "monthlyRate", "monthlySalary", "salary", "salaryAmount", "rate", "months", "monthCount", "จำนวนเดือน", "amount", "totalAmount",
  "paidAmount", "expense", "spent", "รายจ่าย", "ยอดเบิกจ่าย", "จำนวนเงิน", "เงินเดือน", "ค่าตอบแทน", "paymentDate", "paidDate", "date", "วันที่จ่าย",
  "วันที่เบิกจ่าย", "createdAt", "updatedAt", "isDeleted", "deleted", "deletedAt"]: sheetName === "Personnel_Staff" ? ["id", "ID", "รหัส", "ลำดับ",
  "เลขที่", "รหัสบุคลากร", "name", "fullName", "ชื่อ-สกุล", "ชื่อสกุล", "ชื่อ - สกุล", "ชื่อ-นามสกุล", "ชื่อ", "ชื่อบุคลากร", "ชื่อและสกุล", "position",
  "role", "title", "personnelType", "ตำแหน่ง", "ตำแหน่งในคณะ", "ตำแหน่งงาน", "ประเภทบุคลากร", "ประเภท", "สถานภาพ", "phone", "startDate", "workStartDate",
  "appointedDate", "วันที่เริ่ม", "วันเริ่ม", "วันที่เริ่มดำรงตำแหน่ง", "วันเริ่มดำรงตำแหน่ง", "วันที่แต่งตั้ง", "วันแต่งตั้ง", "วันเริ่มทำหน้าที่",
  "วันเริ่ม-สิ้นสุด", "วันเริ่ม - สิ้นสุด", "endDate", "workEndDate", "retireDate", "วันที่สิ้นสุด", "วันสิ้นสุด", "วันที่พ้นตำแหน่ง", "วันพ้นตำแหน่ง",
  "วันสิ้นสุดตำแหน่ง", "status", "workStatus", "activeStatus", "สถานะ", "สถานะการดำรงตำแหน่ง", "isGov", "ข้าราชการ", "เป็นข้าราชการ", "สถานะข้าราชการ",
  "salary", "monthlySalary", "compensation", "amount", "rate", "monthlyRate", "allowance", "เงินเดือน", "ค่าตอบแทน", "ค่าตอบแทนรายเดือน", "จำนวนเงิน",
  "createdAt", "updatedAt", "isDeleted", "deleted", "deletedAt"]: []
}
function _budgetLiteRows_(sheetName) {
  var fields = _budgetProjectedFields_(sheetName);
  if(fields.length)try {
    return _budgetDataServiceRows_(String(sheetName || ""), fields, {
      includeDeleted: !1, requireCanonical: !1, ttl: 240
}) || []
}
  catch(_projectedErr) {
    _b32W_("budget.liteRows.projected", _projectedErr, {
      sheetName
})
}
  try {
    return _budgetRows_(sheetName, !1) || []
}
  catch(_e3) {
    _b32W_("budget.liteRows.directRead", _e3, {
      sheetName
})
}
  return[]
}
function _budgetRowFyLite_(row) {
  var rowFy = _b32FY_((row = row || {
}).fy || row.fiscalYear || row.budgetFy || row.budgetYear || row.ปีงบประมาณ || row.ปีงบ);
  if(rowFy)return rowFy;
  var extra = {
};
  try {
    extra = _appIsFnName_("_budgetParsePayloadExtra_") ? _budgetParsePayloadExtra_(row, []):  {
}
}
  catch(_e) {
    extra = {
}
}
  if(rowFy = _b32FY_(extra.fy || extra.fiscalYear || extra.budgetFy || extra.budgetYear || extra.ปีงบประมาณ))return rowFy;
  var baseDate, d = _budgetParseDate_(row.activityDate || row.meetingDate || row.seminarDate || row.travelStartDate || row.travelEndDate || row.startDate || row.endDate || row.createdAt || row.วันที่ || row.วันที่จัดกิจกรรม || extra.activityDate || extra.meetingDate || extra.semDate || extra.seminarDate || extra.travelStartDate || extra.travelEndDate || extra.startDate || extra.endDate || "");
  return d ? String(d.getMonth() >= 9 ? d.getFullYear() + 544: d.getFullYear() + 543): ""
}
function _dashboardBudgetStatusSummaryRows_(fy) {
  var target = _b32FY_(fy), cacheStamp = "1";
  try {
    cacheStamp = _appIsFnName_("_entityCacheStamp_") ? _entityCacheStamp_("budgetimports"): "1"
}
  catch(_verErr) {
    cacheStamp = "1"
}
  var cacheKey = "dashboard_budget_status_current_r77_" + String(target || "all") + "_" + cacheStamp;
  try {
    var cached = _AppScriptCache_().get(cacheKey);
    if(cached) {
      var parsed = JSON.parse(cached);
      if(Array.isArray(parsed) && parsed.length)return parsed
}
}
  catch(_cacheErr) {
    _b32W_("ec", _cacheErr)
}
  var rows = [];
  function pick(row, keys) {
    row = row || {
};
    var raw = row.__raw && typeof row.__raw == "object" ? row.__raw:  {
};
    var extra = {
};
    try {
      extra = _appIsFnName_("_budgetParsePayloadExtra_") ? _budgetParsePayloadExtra_(row, []):  {
}
}
    catch(_extraErr) {
      extra = {
}
}
    for(var i = 0;
    i < keys.length;
    i++) {
      var k = keys[i], v = row[k];
      if(v != null && String(v).trim() !== "")return v;
      v = raw[k];
      if(v != null && String(v).trim() !== "")return v;
      v = extra[k];
      if(v != null && String(v).trim() !== "")return v
}
    return""
}
  try {
    var raw = _budgetLiteRows_("BudgetImports") || [];
    if(! raw.length)raw = _budgetRows_("BudgetImports", !1) || [];
    var matched = raw.filter(function(r) {
      var rowFy = _budgetRowFyLite_(r);
      return ! target || rowFy === target
});
    if(target && raw.length && ! matched.length)matched = raw;
    rows = matched.map(function(r) {
      r = r || {
};
      var rowFy = _budgetRowFyLite_(r) || target || "", refund = pick(r, ["refundStatus", "refund_status", "returnStatus", "return_status", "refund",
      "return", "สถานะคืนเงิน", "สถานะการคืนเงิน", "การคืนเงิน", "สถานะการคืน", "สถานะยืมเงิน"]), report = pick(r, ["reportStatus", "report_status",
      "expenseReportStatus", "expense_report_status", "report", "expenseReport", "reportExpenseStatus", "expenseReport", "สถานะรายงาน", "สถานะรายงานค่าใช้จ่าย",
      "รายงานค่าใช้จ่าย", "สถานะส่งรายงาน", "สถานะส่งรายงานค่าใช้จ่าย"]);
      return {
        fy: rowFy, refundStatus: String(refund || "ยังไม่คืนเงิน"), reportStatus: String(report || "ยังไม่รายงาน"), __dashboardWorkflowFyFallbackAll:  ! ! (target && rowFy !== target)
}
}).filter(function(r) {
      return r && String(r.refundStatus || r.reportStatus || "").trim()
})
}
  catch(_e) {
    _b32W_("budget.dashboardStatus.rows", _e, {
      fy: target
}), rows = []
}
  try {
    rows.length && safeCachePut_(_AppScriptCache_(), cacheKey, rows, 120)
}
  catch(_putErr) {
    _b32W_("budget.dashboardStatus.cachePut", _putErr, {
      cacheKey
})
}
  return _b32A_(rows)
}
function _budgetStatusDone_(status, kind) {
  var st = String(status || "").trim();
  return ! ! st && st.indexOf("ยังไม่") === - 1 && (kind === "refund" && st.indexOf("ไม่มีการยืมเงิน") !== - 1 || st.indexOf("แล้ว") !== - 1 || st.indexOf("เสร็จ") !== - 1 || st.indexOf("ครบ") !== - 1)
}
function _dashboardBudgetCacheKey_(fy) {
  var cacheStamp = "na";
  return _appIsFnName_("_entityCacheStamp_") && (cacheStamp = [_entityCacheStamp_("budgetsummary"), _entityCacheStamp_("budgetyearsettingsitems"),
  _entityCacheStamp_("budgetimports"), _entityCacheStamp_("salarysettings"), BUDGET_CACHE_POLICY_STAMP].join("_")), "dashboard_budget_current_r77_" + String(fy || "") + "_" + cacheStamp
}
function _dashboardBudgetFromSummarySheet_(fy) {
  var rows = _budgetDataServiceRows_("BudgetSummary", _budgetProjectedFields_("BudgetSummary"), {
    includeDeleted: !1, requireCanonical: !1, ttl: 240, owner: "budget.summary"
});
  Array.isArray(rows) && rows.length || (rows = _budgetRows_("BudgetSummary", !1));
  var targetFy = _b32FY_(fy) || _currentBudgetFyString_(), plans = [], totalBudget = 0, totalPaid = 0, totalRemain = 0;
  if((_b32A_(rows)).forEach(function(row) {
    if(row = row || {
}, ! targetFy || String(row.fy || "").trim() === targetFy) {
      var budget = Number(row.budget || 0) || 0, spent = Number(row.spent || 0) || 0, remain = Number(row.remain != null && row.remain !== "" ? row.remain: budget - spent) || 0,
      plan = String(row.planGroup || row.plan || row.category || "").trim() || "-";
      plans.push({
        plan, budget, spent, remain, item: String(row.item || "").trim()
}), totalBudget += budget, totalPaid += spent, totalRemain += remain
}
}), ! plans.length)try {
    var direct = getBudgetSummaryByFY({
      fy: targetFy, fast: !0, includeSpent: !0
}), directRows = direct && direct.data && direct.data.rows || direct.rows || [];
    Array.isArray(directRows) && directRows.length && directRows.forEach(function(row) {
      row = row || {
};
      var budget = Number(row.budget || 0) || 0, spent = Number(row.spent || 0) || 0, remain = Number(row.remain != null && row.remain !== "" ? row.remain: budget - spent) || 0,
      plan = String(row.planGroup || row.plan || row.category || row.item || "").trim() || "-";
      plans.push({
        plan, budget, spent, remain, item: String(row.item || "").trim()
}), totalBudget += budget, totalPaid += spent, totalRemain += remain
})
}
  catch(_directErr) {
    _b32W_("ec", _directErr)
}
  if(! plans.length)return null;
  plans.sort(function(a, b) {
    return String(a.plan || "").localeCompare(String(b.plan || ""), "th") || String(a.item || "").localeCompare(String(b.item || ""), "th")
});
  var normalizedPlans = plans.map(function(row) {
    return {
      plan: row.plan, label: row.plan, item: row.item || row.plan, budget: row.budget, spent: row.spent, remain: row.remain
}
});
  return {
    fy: targetFy, totalBudget, totalPaid, totalRemain, plans: normalizedPlans, byPlan: normalizedPlans
}
}
function _budgetCanonicalPayloadFy_(payload) {
  return _b32FY_((payload = payload || {
}).fy || payload.fiscalYear || payload.year || payload.budgetFy || payload.budgetYear || payload.defaultBudgetFY || payload.defaultFy || payload.selectedFiscalYear || payload.currentFy || payload.ปีงบประมาณ || payload.ปีงบ || "")
}
function _budgetSummaryRowsFromSettingsOnly_(fyValue) {
  fyValue = _b32FY_(fyValue);
  try {
    var settings = getBudgetYearSettingsMatrix(fyValue), rows = settings && settings.data && settings.data.rows || settings.rows || [];
    return _normalizeBudgetSummaryRows_(rows = (_b32A_(rows)).map(function(r) {
      r = r || {
};
      var budget = Number(r.budget || r.amount || 0) || 0;
      return {
        fy: fyValue, planGroup: String(r.planGroup || r.category || r.plan || "").trim(), category: String(r.category || r.planGroup || r.plan || "").trim(),
        item: String(r.item || r.name || "").trim(), budget, spent: 0, remain: budget
}
}).filter(function(row) {
      return row.planGroup || row.item || row.budget
}), fyValue)
}
  catch(_e) {
    return _b32W_("budget.summary.settingsOnly", _e, {
      fy: fyValue
}), []
}
}

/* --------------------------------------------------------------------------
 * 4. Budget summary read model and canonical rows
 * -------------------------------------------------------------------------- */
function getBudgetSummaryByFY(fy) {
  var payload = fy && typeof fy == "object" && ! Array.isArray(fy) ? fy:  {
    fy: fy
}, dto = _budgetReadModelBuildSummaryDto_(payload, {
    source: "BudgetReadModel.centralDTO.getBudgetSummaryByFY.r76", dataSource: "centralBudgetDTO", contractStamp: "budget-summary-central-dto-current-r76"
});
  return ok_(dto, "โหลดสรุปงบประมาณสำเร็จ")
}
function _budgetImportCostAmountLite_(row) {
  row = row || {
};
  var warnings = [], ex = _appIsFnName_("_budgetNormalizeImportCostPayload_") ? _budgetNormalizeImportCostPayload_(row, warnings):  {
}, direct = _budgetCanonicalExpenseAmount_(row, ex);
  return direct || _budgetComponentTotal_(ex, !1) + _budgetResolveSupportCostAmount_(row, ex, warnings)
}
function _budgetSummaryRowsFromImportsLite_(fyValue) {
  var settings = _budgetSummaryRowsFromSettingsOnly_(fyValue = _b32FY_(fyValue) || _currentBudgetFyString_()), map = {
}, warnings = [];
  function makeKey(planGroup, item) {
    return String(planGroup || "").trim() + "||" + String(item || "").trim()
}
  (_b32A_(settings)).forEach(function(r) {
    if(! _budgetIsActivityLeakRow_(r)) {
      var k = makeKey(r.planGroup || r.category, r.item);
      map[k] || (map[k] = _b32O_({
}, r, {
        spent: 0, remain: Number(r.budget || 0) || 0
}))
}
});
  var hasSettings = Object.keys(map).length > 0, importRows = _budgetLiteRows_("BudgetImports") || [], matched = 0;
  importRows.forEach(function(row) {
    if(_budgetRowFyLite_(row = row || {
}) === fyValue) {
      var ex = _budgetNormalizeImportCostPayload_(row, warnings), allocated = {
}, rowAmount = _b32N_(ex.rowAmount || row.totalAmount || row.amount), components = _budgetCostComponentsForRow_(row, ex, warnings), componentTotal = components.reduce(function(sum,
      component) {
        return sum + _b32N_(component && component.amount)
}, 0);
      if(componentTotal && rowAmount && rowAmount > componentTotal + .01 && warnings.push("ยอดรวมมากกว่ายอดแยกหมวด " + String(row.id || row.topic || row.entryType || "") + ": total=" + rowAmount + ", components=" + componentTotal),
      ! componentTotal && rowAmount) {
        for(var category = String(row.category || row.planGroup || "").trim(), item = String(row.item || ex.supportType || row.entryType || "").trim(),
        exactKeys = [category + "||" + item, category + "||" + String(row.entryType || "").trim(), String(row.entryType || "").trim() + "||" + item],
        ek = 0;
        ek < exactKeys.length;
        ek++)if(map[exactKeys[ek]]) {
          if(! _budgetCanAllocateRowAmountToSummaryKey_(exactKeys[ek])) {
            warnings.push("ไม่ใช้ totalAmount ลงหมวดรายจ่ายแบบ component: " + exactKeys[ek]);
            continue
}
          map[exactKeys[ek]].spent = _b32N_(map[exactKeys[ek]].spent) + rowAmount, map[exactKeys[ek]].remain = _b32N_(map[exactKeys[ek]].budget) - _b32N_(map[exactKeys[ek]].spent),
          allocated.rowAmount = !0, matched++;
          break
}
}
      components.forEach(function(component) {
        if(! allocated[component.field]) {
          var key = _budgetChooseBestSummaryKey_(map, component, row, ex);
          if(! key || ! map[key])return warnings.push("ไม่พบหมวดงบประมาณสำหรับ " + component.field), void 0;
          map[key].spent = _b32N_(map[key].spent) + _b32N_(component.amount), map[key].remain = _b32N_(map[key].budget) - _b32N_(map[key].spent),
          allocated[component.field] = !0, matched++
}
})
}
});
  var staffExpenseInfo = {
    amount: 0, status: "ok-fast", warnings: []
};
  try {
    staffExpenseInfo = _calculatePersonnelSalaryExpenseDetailed_(fyValue);
    var staffAmount = _b32N_(staffExpenseInfo.amount), staffTouched = !1;
    if(Object.keys(map).forEach(function(k) {
      var keyText = String(k || "").toLowerCase();
      if(keyText.indexOf("บุคลากร") > - 1 || keyText.indexOf("ค่าตอบแทน") > - 1 || keyText.indexOf("ผู้ปฏิบัติงาน") > - 1) {
        var existingAmount = _budgetCanonicalExpenseAmount_(map[k], map[k].extra || {
}), effectiveAmount = staffAmount > 0 ? staffAmount: existingAmount;
        map[k].spent = effectiveAmount, map[k].spentAmount = effectiveAmount, map[k].expense = effectiveAmount, map[k].expenseAmount = effectiveAmount,
        map[k].totalPaid = effectiveAmount, map[k].totalSpent = effectiveAmount, map[k].personnelExpense = effectiveAmount, map[k].staffExpense = effectiveAmount,
        map[k].remain = _b32N_(map[k].budget) - effectiveAmount, map[k].balance = map[k].remain, map[k].isPersonnelCompensation = !0, staffTouched = !0
}
}), ! staffTouched && staffAmount > 0) {
      var staffKey = "แผนงานบุคลากรภาครัฐ||" + _budgetPersonnelCompensationLabel_();
      map[staffKey] = {
        fy: fyValue, planGroup: "แผนงานบุคลากรภาครัฐ", category: "แผนงานบุคลากรภาครัฐ", item: _budgetPersonnelCompensationLabel_(), budget: 0,
        spent: staffAmount, spentAmount: staffAmount, expense: staffAmount, expenseAmount: staffAmount, totalPaid: staffAmount, totalSpent: staffAmount,
        personnelExpense: staffAmount, staffExpense: staffAmount, remain:  - staffAmount, balance:  - staffAmount, isPersonnelCompensation: !0
}
}
    warnings = warnings.concat(staffExpenseInfo.warnings || [])
}
  catch(_staffFastErr) {
    warnings.push("คำนวณค่าตอบแทนบุคลากรไม่สำเร็จ: " + String(_staffFastErr && _staffFastErr.message ? _staffFastErr.message: _staffFastErr)),
    staffExpenseInfo = {
      amount: 0, status: "error", warnings: []
}
}
  var rows = _normalizeBudgetSummaryRows_(Object.keys(map).map(function(k) {
    return map[k]
}), fyValue);
  rows.length || hasSettings || (rows = (importRows || []).filter(function(row) {
    return _budgetRowFyLite_(row) === fyValue
}).slice(0, 50).map(function(r) {
    var ex = _budgetNormalizeImportCostPayload_(r, []), amount = _budgetImportCostAmountLite_(r), label = String(r.item || r.category || r.entryType || ex.supportType || "รายการงบประมาณ").trim();
    return/^การประชุมคณะกรรมาธิการ$|^การประชุมคณะอนุกรรมาธิการ$|^การศึกษาดูงานในประเทศ$/.test(label) && (label = "รายการงบประมาณ"), {
      fy: fyValue, planGroup: label, category: label, item: label, budget: 0, spent: amount, expense: amount, remain:  - amount, balance:  - amount
}
})), rows = _budgetApplyStrictComponentSpentToRows_(rows, fyValue, warnings);
  try {
    rows._meta = _budgetSetLastSummaryMeta_({
      fy: fyValue, warnings: warnings.filter(function(v, i, a) {
        return v && a.indexOf(v) === i
}), staffExpenseStatus: staffExpenseInfo.status || "ok-fast", staffExpense: _b32N_(staffExpenseInfo.amount), allocationMode: "strict-component-totals-no-personnel-reconciled",
      matchedImports: matched, totalsReconciled: !0
})
}
  catch(_e) {
    _b32W_("ec", _e)
}
  return rows
}
var __LAST_BUDGET_SUMMARY_META__ = null;
function _budgetToNumber_(value) {
  if(value == null || value === "")return 0;
  if(typeof value == "number")return isFinite(value) ? value: 0;
  var raw = String(value).trim();
  if(! raw)return 0;
  var thaiDigits = {
    "๐": "0", "๑": "1", "๒": "2", "๓": "3", "๔": "4", "๕": "5", "๖": "6", "๗": "7", "๘": "8", "๙": "9"
};
  raw = raw.replace(/[๐-๙]/g, function(ch) {
    return thaiDigits[ch] || ch
}).replace(/,/g, "").replace(/[()]/g, function(ch) {
    return ch === "(" ? "-": ""
});
  var cleaned = raw.replace(/[^0-9.\-]/g, "");
  if(! cleaned || cleaned === "-" || cleaned === "." || cleaned === "-.")return 0;
  var parts = cleaned.split(".");
  parts.length > 2 && (cleaned = parts.shift() + "." + parts.join(""));
  var n = Number(cleaned);
  return isFinite(n) ? n: 0
}
function _budgetNormalizedLookupKey_(value) {
  return String(value || "").replace(/[\s_\-()（）]/g, "").toLowerCase()
}
function _budgetNormalizedKeyMap_(source) {
  var out = {
};
  return Object.keys(source || {
}).forEach(function(key) {
    out[_budgetNormalizedLookupKey_(key)] = key
}), out
}
function _budgetCostFieldNames_(includeSupport) {
  var fields = ["meetingAllowance", "snackCost", "lunchCost", "travelCost", "receptionCost", "seminarCost", "foreignTripCost", "foreignGuestCost"];
  return includeSupport ? fields.concat(["supportCost"]): fields
}
function _budgetCanonicalExpenseAmount_(row, extra) {
  row = row || {
}, extra = extra || {
};
  var aliases = ["spent", "spentAmount", "expense", "expenseAmount", "totalExpense", "totalSpent", "totalPaid", "used", "usedAmount", "paid",
  "paidAmount", "actualAmount", "disbursement", "disbursed", "usedBudget", "personnelExpense", "staffExpense", "currentMonthlyExpense", "monthlyRateTotal",
  "รายจ่าย", "รายจ่ายรวม", "จำนวนรายจ่าย", "ค่าใช้จ่าย", "ค่าใช้จ่ายรวม", "เบิกจ่าย", "ยอดเบิกจ่าย", "amount", "totalAmount", "rowAmount", "จำนวนเงิน",
  "ยอดรวม", "รวมเป็นเงิน", "รวม"], sources = [row, extra, row.extra && typeof row.extra == "object" ? row.extra:  {
}], best = 0, seen = !1;
  function read(src2, k2) {
    return src2 && _b32H_(src2, k2) && src2[k2] != null && String(src2[k2]).trim() !== "" ? src2[k2]: null
}
  for(var maps = sources.map(_budgetNormalizedKeyMap_), i = 0;
  i < aliases.length;
  i++)for(var sIdx = 0;
  sIdx < sources.length;
  sIdx++) {
    var src = sources[sIdx] || {
}, k = aliases[i], v = read(src, k), nk, real, n;
    if(v == null && (nk = _budgetNormalizedLookupKey_(k), real = maps[sIdx][nk], real && (v = read(src, real))), v != null) {
      if(n = _b32N_(v), seen = !0, n > 0)return n;
      best = n
}
}
  return seen ? best: 0
}
function _budgetComponentTotal_(extra, includeSupport) {
  return extra = extra || {
}, _budgetCostFieldNames_(includeSupport).reduce(function(sum, key) {
    return sum + _b32N_(extra[key])
}, 0)
}
function _budgetReadRowField_(row, aliases) {
  row = row || {
}, aliases = Array.isArray(aliases) ? aliases: [aliases];
  var sources = [row];
  row.extra && typeof row.extra == "object" && ! Array.isArray(row.extra) && sources.push(row.extra);
  for(var sIdx = 0;
  sIdx < sources.length;
  sIdx++) {
    for(var src = sources[sIdx] || {
}, i = 0;
    i < aliases.length;
    i++) {
      var k = aliases[i];
      if(_b32H_(src, k) && src[k] != null && src[k] !== "")return src[k]
}
    var norm = {
};
    Object.keys(src).forEach(function(k2) {
      norm[_budgetNormalizedLookupKey_(k2)] = k2
});
    for(var j = 0;
    j < aliases.length;
    j++) {
      var nk = String(aliases[j] || "").replace(/[\s_\-()（）]/g, "").toLowerCase();
      if(norm[nk] && src[norm[nk]] != null && src[norm[nk]] !== "")return src[norm[nk]]
}
}
  return""
}
function _budgetParseJsonObject_(raw, warnings, label) {
  if(raw && typeof raw == "object" && ! Array.isArray(raw))return _b32O_({
}, raw);
  var text = String(raw == null ? "": raw).trim();
  if(! text)return {
};
  try {
    var parsed = JSON.parse(text);
    return parsed && typeof parsed == "object" && ! Array.isArray(parsed) ? parsed:  {
}
}
  catch(e) {
    warnings && warnings.push("parse-failed:" + String(label || "payload"));
    try {
      typeof logAudit_ == "function" && logAudit_("budget.payload.parse.failed", {
        label: label || "", error: e && e.message || String(e)
})
}
    catch(_auditErr) {
      _b32W_("ec", _auditErr)
}
    return {
}
}
}
function _budgetParsePayloadExtra_(row, warnings) {
  warnings = warnings || [];
  var extra = {
}, rawExtra = _budgetReadRowField_(row = row || {
}, ["extra", "Extra", "extraJson", "extraJSON", "ExtraJson", "ExtraJSON"]);
  rawExtra && typeof rawExtra == "object" && ! Array.isArray(rawExtra) ? extra = _b32O_(extra, rawExtra): rawExtra && (extra = _b32O_(extra, _budgetParseJsonObject_(rawExtra,
  warnings, "extra")));
  var rawPayload = _budgetReadRowField_(row, ["payloadJson", "payloadJSON", "payloadjson", "PayloadJson", "PayloadJSON"]);
  if(rawPayload && (extra = _b32O_(extra, _budgetParseJsonObject_(rawPayload, warnings, "payloadJson"))), ! Array.isArray(extra.seminarItems)) {
    var rawSeminarItems = _budgetReadRowField_(row, ["seminarItems", "seminarItemsJson", "seminarItemsJSON", "SeminarItemsJson", "SeminarItemsJSON"]);
    if(rawSeminarItems && typeof rawSeminarItems == "object")extra.seminarItems = _b32A_(rawSeminarItems);
    else if(String(rawSeminarItems || "").trim())try {
      var parsedSeminarItems = JSON.parse(String(rawSeminarItems || "[]"));
      extra.seminarItems = _b32A_(parsedSeminarItems)
}
    catch(_seminarItemsErr) {
      extra.seminarItems = [], warnings.push("parse-failed:seminarItems")
}
    else extra.seminarItems = []
}
  ["visitLocations", "seminarLocations", "countries"].forEach(function(key) {
    if(! Array.isArray(extra[key])) {
      var raw = _budgetReadRowField_(row, [key + "JSON", key + "Json", key + "Text", key]);
      if(String(raw || "").trim().charAt(0) === "[")try {
        extra[key] = JSON.parse(String(raw))
}
      catch(_e) {
        extra[key] = [], warnings.push("parse-failed:" + key)
}
      else extra[key] = raw ? String(raw).split(",").map(function(x) {
        return String(x || "").trim()
}).filter(Boolean): []
}
});
  var explicitSeminarLocs = [_budgetReadRowField_(row, _B32R15), _budgetReadRowField_(row, _B32R9), _budgetReadRowField_(row, _B32R10), _budgetReadRowField_(row,
  _B32R3)].map(function(x) {
    return String(x || "").trim()
});
  if(Array.isArray(extra.seminarLocations) && extra.seminarLocations.length || ! explicitSeminarLocs.some(Boolean) || (extra.seminarLocations = explicitSeminarLocs.filter(Boolean)),
  Array.isArray(extra.seminarItems) && extra.seminarItems.length && (extra.seminarItems = extra.seminarItems.map(function(item) {
    return(item = item && typeof item == "object" ? _b32O_({
}, item):  {
}).date || (item.date = item.seminarDate || item.semDate || ""), item.title || (item.title = item.seminarTitle || item.projectName || item.topic || item.name || ""),
    item.place || (item.place = item.seminarPlace || item.location || ""), item.province || (item.province = item.seminarProvince || ""), item.district || (item.district = item.seminarDistrict || ""),
    item.subDistrict || (item.subDistrict = item.seminarSubDistrict || item.seminarSubdistrict || item.subdistrict || ""), item.cost != null && item.cost !== "" || (item.cost = item.seminarCost || item.amount || item.totalAmount || 0),
    item
}), ! Array.isArray(extra.seminarLocations) || ! extra.seminarLocations.length)) {
    var firstSeminar = extra.seminarItems.filter(function(item) {
      return item && (item.place || item.province || item.district || item.subDistrict)
})[0] || {
}, fromFirst = [firstSeminar.place, firstSeminar.province, firstSeminar.district, firstSeminar.subDistrict].map(function(x) {
      return String(x || "").trim()
}).filter(Boolean);
    fromFirst.length && (extra.seminarLocations = fromFirst)
}
  return extra.countriesText || (extra.countriesText = _budgetReadRowField_(row, ["countriesText", "ประเทศ"])), extra.semDate || (extra.semDate = _budgetReadRowField_(row,
  _B32R11)), extra.roundNo || (extra.roundNo = _budgetReadRowField_(row, ["roundNo", "ครั้งที่"])), extra
}
function _budgetNormalizeImportCostPayload_(row, warnings) {
  var extra = _budgetParsePayloadExtra_(row = row || {
}, warnings || []);
  return _budgetCostFieldNames_(! 0).forEach(function(k) {
    var v = extra[k];
    v != null && v !== "" || (v = _budgetReadRowField_(row, [k])), extra[k] = _b32N_(v)
}), extra.foodCost = _b32N_(extra.snackCost) + _b32N_(extra.lunchCost), extra.rowAmount = _budgetCanonicalExpenseAmount_(row, extra), extra.supportType || (extra.supportType = _budgetReadRowField_(row,
  ["supportType", "ประเภทรายการส่งเสริม", "item"])), extra = _budgetApplySupportOnlyCostRule_(row, extra, warnings || [])
}
function _budgetRowClassificationText_(row, extra) {
  return row = row || {
}, extra = extra || {
}, String([row.entryType, row.category, row.item, row.topic, row.planGroup, row.committeeType, extra.supportType, extra.category, extra.item,
  extra.entryType, extra.topic].filter(function(v) {
    return v != null && String(v).trim() !== ""
}).join(" ")).replace(/\s+/g, " ").trim()
}
function _budgetIsSupportCostClassifiedRow_(row, extra) {
  var text, compact = _budgetRowClassificationText_(row, extra).replace(/\s+/g, "");
  if(! compact)return !1;
  if(_budgetIsSupportEntryTypeRow_(row, extra))return !0;
  var exactSupportItem = "ค่าใช้จ่ายในการส่งเสริมและสนับสนุนการทำงานของคณะกรรมาธิการสภาผู้แทนราษฎร".replace(/\s+/g, "");
  return compact.indexOf(exactSupportItem) > - 1 || compact.indexOf("ส่งเสริม") > - 1 && compact.indexOf("สนับสนุน") > - 1
}
function _budgetIsSupportEntryTypeRow_(row, extra) {
  row = row || {
}, extra = extra || {
};
  var primary = String(row.entryType || row.category || extra.entryType || extra.category || "").replace(/\s+/g, "");
  return primary.indexOf("ส่งเสริมและสนับสนุนการดำเนินงาน") > - 1 || primary.indexOf("ส่งเสริม") > - 1 && primary.indexOf("สนับสนุน") > - 1
}
function _budgetResolveSupportOnlyAmount_(row, extra, existing) {
  return extra = extra || {
}, existing = existing || {
}, _b32N_((row = row || {
}).supportCost) || _b32N_(extra.supportCost) || _budgetCanonicalExpenseAmount_(row, extra) || _budgetNonSupportComponentTotal_(extra) || _b32N_(existing.supportCost) || _budgetCanonicalExpenseAmount_(existing,
  {
})
}
function _budgetApplySupportOnlyCostRule_(row, extra, warnings) {
  if(! _budgetIsSupportEntryTypeRow_(row = row || {
}, extra = extra || {
}))return extra;
  var nonSupportTotal = _budgetNonSupportComponentTotal_(extra);
  return _budgetCostFieldNames_(! 1).concat(["foodCost"]).forEach(function(k) {
    extra[k] = 0
}), extra.supportCost = _b32N_(_budgetResolveSupportOnlyAmount_(row, extra)), warnings && nonSupportTotal && warnings.push("support-only: ย้ายยอดรวมรายการส่งเสริมฯ ไป supportCost และไม่นับ component อื่น"),
  extra
}
function _budgetNonSupportComponentTotal_(extra) {
  return _budgetComponentTotal_(extra, !1)
}
function _budgetResolveSupportCostAmount_(row, extra, warnings) {
  row = row || {
};
  var amount = _b32N_((extra = extra || {
}).supportCost != null && extra.supportCost !== "" ? extra.supportCost: row.supportCost);
  if(! amount)return 0;
  if(_budgetIsSupportCostClassifiedRow_(row, extra))return amount;
  var otherTotal = _budgetNonSupportComponentTotal_(extra), rowAmount = _b32N_(extra.rowAmount || row.totalAmount || row.amount);
  return warnings && (otherTotal || rowAmount) && warnings.push("ไม่รวม supportCost เพราะรายการไม่ใช่หมวดส่งเสริมฯ: " + String(row.id || row.entryType || row.item || row.topic || "") + " supportCost=" + amount),
  0
}

/* --------------------------------------------------------------------------
 * 5. Import DTO normalization and cost allocation
 * -------------------------------------------------------------------------- */
function _budgetNormalizeImportDto_(input, existing) {
  input = _normalizeBudgetClassification_(input || {
}), existing = existing || {
};
  var warnings = [], ex = _b32O_({
}, input.extra || {
});
  if(_budgetCostFieldNames_(! 0).forEach(function(k) {
    var raw = ex[k];
    raw != null && raw !== "" || (raw = input[k]), raw != null && raw !== "" || ! existing || (raw = existing[k]), ex[k] = _b32N_(raw)
}), ex.foodCost = _b32N_(ex.snackCost) + _b32N_(ex.lunchCost), ex.rowAmount = _b32N_(input.totalAmount || input.amount || existing.totalAmount || existing.amount || ex.totalAmount || ex.amount),
  ex.supportType || (ex.supportType = input.supportType || input.item || existing.item || ""), _budgetIsSupportEntryTypeRow_(input, ex)) {
    var supportOnlyAmount = _b32N_(_budgetResolveSupportOnlyAmount_(input, ex, existing));
    _budgetCostFieldNames_(! 1).concat(["foodCost"]).forEach(function(k) {
      input[k] = 0, ex[k] = 0
}), input.supportCost = supportOnlyAmount, input.amount = supportOnlyAmount, input.totalAmount = supportOnlyAmount, ex.supportCost = supportOnlyAmount,
    ex.rowAmount = supportOnlyAmount, warnings.push("support-only: ยอดรายการส่งเสริมฯ ถูกล็อกไว้ที่ supportCost เท่านั้น")
}
  var supportInputAmount = _budgetResolveSupportCostAmount_(input, _b32O_({
}, ex, {
    supportCost: input.supportCost != null && input.supportCost !== "" ? input.supportCost: ex.supportCost
}), warnings);
  _budgetIsSupportCostClassifiedRow_(input, ex) || (supportInputAmount = 0), ex.supportCost = supportInputAmount;
  var componentAmount = _budgetComponentTotal_(ex, !1) + _b32N_(supportInputAmount), inputAmount = _budgetCanonicalExpenseAmount_(input, ex),
  amount = componentAmount || inputAmount;
  input.amount = amount, input.totalAmount = amount, ex.totalAmount = amount, ex.amount = amount, ex.serverAmountSource = componentAmount ? "server-components": "input-amount-default",
  ex.serverNormalized = !0;
  var visitLocs = Array.isArray(ex.visitLocations || input.visitLocations) ? ex.visitLocations || input.visitLocations: [], seminarLocs = Array.isArray(ex.seminarLocations || input.seminarLocations) ? ex.seminarLocations || input.seminarLocations: [];
  if((! seminarLocs || ! seminarLocs.length) && Array.isArray(ex.seminarItems) && ex.seminarItems.length) {
    var firstSeminarLoc = (ex.seminarItems || []).filter(function(item) {
      return item && (item.place || item.province || item.district || item.subDistrict || item.subdistrict)
})[0] || {
};
    (seminarLocs = [firstSeminarLoc.place, firstSeminarLoc.province, firstSeminarLoc.district, firstSeminarLoc.subDistrict || firstSeminarLoc.subdistrict].map(function(x) {
      return String(x || "").trim()
}).filter(Boolean)).length && (ex.seminarLocations = seminarLocs)
}
  return {
    input, extra: ex, amount, supportCost: supportInputAmount, visitLocations: visitLocs, seminarLocations: seminarLocs, warnings, contractStamp: "budget-import-dto-current"
}
}
function _budgetCostComponentsForRow_(row, extra, warnings) {
  var supportAmount = _budgetResolveSupportCostAmount_(row = row || {
}, extra = extra || {
}, warnings || null), comps;
  return[{
    field: "meetingAllowance", amount: _b32N_(extra.meetingAllowance), keywords: ["ค่าเบี้ยประชุม", "เบี้ยประชุมกรรมาธิการ"]
}, {
    field: "foodCost", amount: _b32N_(extra.foodCost), keywords: ["ค่าอาหาร", "อาหารเลี้ยงรับรอง"]
}, {
    field: "travelCost", amount: _b32N_(extra.travelCost), keywords: ["เบี้ยเลี้ยง", "ค่าเช่าที่พัก", "ค่าที่พัก", "ค่าพาหนะ"]
}, {
    field: "foreignGuestCost", amount: _b32N_(extra.foreignGuestCost), keywords: ["รับรองแขกต่างประเทศ", "แขกต่างประเทศ"]
}, {
    field: "foreignTripCost", amount: _b32N_(extra.foreignTripCost), keywords: ["ศึกษาดูงานต่างประเทศ", "เดินทางไปศึกษาดูงานต่างประเทศ", "ต่างประเทศ"]
}, {
    field: "receptionCost", amount: _b32N_(extra.receptionCost), keywords: ["เดินทางภายในประเทศ", "ปฏิบัติหน้าที่ภายในประเทศ", "ค่ารับรอง", "ภายในประเทศ"]
}, {
    field: "seminarCost", amount: _b32N_(extra.seminarCost), keywords: ["สัมมนา"]
}, {
    field: "supportCost", amount: supportAmount, keywords: ["ส่งเสริม", "สนับสนุน"]
}].filter(function(c) {
    return _b32N_(c.amount) !== 0
})
}
function _budgetExplicitSummaryNeedles_(field) {
  var map = {
    meetingAllowance: ["ค่าเบี้ยประชุมกรรมาธิการ", "เบี้ยประชุมกรรมาธิการ"], travelCost: ["ค่าเบี้ยเลี้ยง ค่าเช่าที่พักและค่าพาหนะ", "เบี้ยเลี้ยง",
    "ค่าเช่าที่พัก", "ค่าพาหนะ"], foodCost: ["ค่าอาหารเลี้ยงรับรองคณะกรรมาธิการสภาผู้แทนราษฎร", "ค่าอาหารเลี้ยงรับรอง", "ค่าอาหาร"], supportCost: ["ค่าใช้จ่ายในการส่งเสริมและสนับสนุนการทำงานของคณะกรรมาธิการสภาผู้แทนราษฎร",
    "ส่งเสริมและสนับสนุน"], seminarCost: ["ค่าใช้จ่ายในการจัดสัมมนาของคณะกรรมาธิการสามัญสภาผู้แทนราษฎร", "จัดสัมมนา", "สัมมนา"], foreignGuestCost: ["ค่าใช้จ่ายเพื่อรับรองแขกต่างประเทศของคณะกรรมาธิการสภาผู้แทนราษฎร",
    "รับรองแขกต่างประเทศ", "แขกต่างประเทศ"], receptionCost: ["ค่าใช้จ่ายในการเดินทางเพื่อปฏิบัติหน้าที่ภายในประเทศของคณะกรรมาธิการ (ค่ารับรอง)",
    "ค่าใช้จ่ายในการเดินทางเพื่อปฏิบัติหน้าที่ภายในประเทศ", "เดินทางเพื่อปฏิบัติหน้าที่ภายในประเทศ", "เดินทางภายในประเทศ", "ปฏิบัติหน้าที่ภายในประเทศ",
    "ค่ารับรอง"], foreignTripCost: ["ค่าใช้จ่ายในการเดินทางไปศึกษาดูงานและเจรจาธุรกิจในต่างประเทศ", "ศึกษาดูงานและเจรจาธุรกิจในต่างประเทศ", "เดินทางไปศึกษาดูงาน",
    "ต่างประเทศ"]
  };
  return map[field] || [];
}
function _budgetFindExplicitSummaryKey_(summaryMap, field) {
  var needles = _budgetExplicitSummaryNeedles_(field).map(function(v) {
    return String(v || "").replace(/\s+/g, "").toLowerCase()
}).filter(Boolean);
  if(! needles.length)return"";
  for(var keys = Object.keys(summaryMap || {
}), i = 0;
  i < needles.length;
  i++)for(var k = 0;
  k < keys.length;
  k++) {
    var text = String(keys[k] || "").replace(/\s+/g, "").toLowerCase();
    if(text.indexOf(needles[i]) !== - 1 || needles[i].indexOf(text) !== - 1)return keys[k]
}
  return""
}
function _budgetStrictComponentFieldForSummaryKey_(summaryKey) {
  var keyText = String(summaryKey || "").replace(/\s+/g, "").toLowerCase();
  if(! keyText)return"";
  for(var fields = ["meetingAllowance", "travelCost", "foodCost", "supportCost", "seminarCost", "foreignGuestCost", "receptionCost", "foreignTripCost"],
  i = 0;
  i < fields.length;
  i++)for(var needles = _budgetExplicitSummaryNeedles_(fields[i]).map(function(v) {
    return String(v || "").replace(/\s+/g, "").toLowerCase()
}).filter(Boolean), j = 0;
  j < needles.length;
  j++)if(keyText.indexOf(needles[j]) !== - 1 || needles[j].indexOf(keyText) !== - 1)return fields[i];
  return""
}
function _budgetCanAllocateRowAmountToSummaryKey_(summaryKey) {
  return ! _budgetStrictComponentFieldForSummaryKey_(summaryKey)
}
function _budgetIsActivityLeakRow_(row) {
  row = row || {
};
  var text = ((row.planGroup || "") + " " + (row.category || "") + " " + (row.item || "") + " " + (row.plan || "")).replace(/\s+/g, " ").trim();
  if(! text)return !1;
  var compact = text.replace(/\s+/g, ""), activityOnly = ["การประชุมคณะกรรมาธิการ", "การประชุมคณะอนุกรรมาธิการ", "การศึกษาดูงานในประเทศ", "การจัดสัมมนา",
  "การรับรองแขกต่างประเทศ"].some(function(label) {
    return compact === label.replace(/\s+/g, "") || compact.indexOf(label.replace(/\s+/g, "")) === 0
}), hasBudgetKeyword = /(ค่าใช้จ่าย|ค่าเบี้ย|ค่าอาหาร|ค่าพาหนะ|ค่าเช่า|คงเหลือ|งบประมาณ|รายจ่าย|รับรองแขกต่างประเทศ|ส่งเสริม|สนับสนุน|สัมมนา|ต่างประเทศ)/.test(text);
  return activityOnly && ! hasBudgetKeyword
}
function _budgetSummaryKeyScore_(summaryKey, component, row, extra) {
  var keyText = String(summaryKey || "").toLowerCase();
  if(! keyText || keyText.indexOf("ค่าตอบแทนผู้ปฏิบัติงาน") > - 1 || keyText.indexOf("ผู้ปฏิบัติงานให้คณะกรรมาธิการ") > - 1)return - 1;
  var score = 0;
  (component.keywords || []).forEach(function(word) {
    word && keyText.indexOf(String(word).toLowerCase()) > - 1 && (score += 10)
});
  var item = String(row.item || row.entryType || extra.supportType || "").trim().toLowerCase(), category = String(row.category || row.planGroup || "").trim().toLowerCase();
  return item && keyText.indexOf(item) > - 1 && (score += 5), category && keyText.indexOf(category) > - 1 && (score += 3), component.field === "foreignTripCost" && keyText.indexOf("ต่างประเทศ") === - 1 && (score = - 1),
  component.field === "receptionCost" && keyText.indexOf("ต่างประเทศ") > - 1 && (score = - 1), component.field === "seminarCost" && keyText.indexOf("สัมมนา") === - 1 && (score = - 1),
  component.field === "supportCost" && keyText.indexOf("ส่งเสริม") === - 1 && keyText.indexOf("สนับสนุน") === - 1 && (score = - 1), score
}
function _budgetChooseBestSummaryKey_(summaryMap, component, row, extra) {
  var explicitKey = _budgetFindExplicitSummaryKey_(summaryMap, component && component.field);
  if(explicitKey)return explicitKey;
  var bestKey = "", bestScore = 0;
  return Object.keys(summaryMap || {
}).forEach(function(k) {
    var score = _budgetSummaryKeyScore_(k, component, row || {
}, extra || {
});
    score > bestScore && (bestScore = score, bestKey = k)
}), bestKey
}
function _budgetSetLastSummaryMeta_(meta) {
  return __LAST_BUDGET_SUMMARY_META__ = meta || null, meta
}
function _budgetFiscalYearRange_(targetFy) {
  var fy = Number(_b32FY_(targetFy)), ad = fy - 543;
  return ! fy || isNaN(ad) ? null:  {
    fy: String(fy), start: new Date(ad - 1, 9, 1), end: new Date(ad, 8, 30, 23, 59, 59)
}
}
function _budgetMonthOverlapCount_(startDate, endDate, rangeStart, rangeEnd) {
  if(! rangeStart || ! rangeEnd)return 0;
  var s = startDate && startDate > rangeStart ? startDate: rangeStart, e = endDate && endDate < rangeEnd ? endDate: rangeEnd;
  if(e < s)return 0;
  var count = 12 * (e.getFullYear() - s.getFullYear()) + (e.getMonth() - s.getMonth()) + 1;
  return count < 0 ? 0: Math.min(12, count)
}
function _budgetPeopleNormalizeKey_(key) {
  return String(key == null ? "": key).replace(/[\u200B-\u200D\uFEFF]/g, "").replace(/[\s\n\r\t\-–—_()（）\[\]{}:：\/\\.]+/g, "").toLowerCase()
}
function _budgetPeopleFirstValue_(row, keys) {
  row = row || {
}, keys = _b32A_(keys);
  for(var norm = null, i = 0;
  i < keys.length;
  i++) {
    var k = keys[i];
    if(row[k] !== void 0 && row[k] !== null && String(row[k]).trim() !== "")return row[k];
    norm || (norm = {
}, Object.keys(row || {
}).forEach(function(key) {
      var nk = _budgetPeopleNormalizeKey_(key);
      ! nk || norm[nk] !== void 0 && String(norm[nk] == null ? "": norm[nk]).trim() !== "" || (norm[nk] = row[key])
}));
    var nk2 = _budgetPeopleNormalizeKey_(k);
    if(nk2 && norm[nk2] !== void 0 && norm[nk2] !== null && String(norm[nk2]).trim() !== "")return norm[nk2]
}
  return""
}
function _budgetParsePersonnelDate_(value) {
  if(value == null || value === "")return null;
  if(Object.prototype.toString.call(value) === "[object Date]" && ! isNaN(value.getTime())) {
    var y = value.getFullYear();
    return y > 2400 ? new Date(y - 543, value.getMonth(), value.getDate()): value
}
  var raw = String(value || "").trim(), m, d, y;
  if(! raw)return null;
  if(/^\d{5,6}(?:\.\d+)?$/.test(raw)) {
    var n = Number(raw);
    if(n > 3e4 && n < 7e4)return d = new Date(Math.round((n - 25569) * 86400 * 1e3)), isNaN(d.getTime()) ? null: new Date(d.getFullYear(), d.getMonth(),
    d.getDate())
}
  return(m = raw.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)) ? (y = Number(m[1]), y > 2400 && (y -= 543), d = new Date(y, Number(m[2]) - 1, Number(m[3])),
  isNaN(d.getTime()) ? null: d): (m = raw.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})$/)) ? (y = Number(m[3]), y < 100 && (y += 2500), y > 2400 && (y -= 543),
  d = new Date(y, Number(m[2]) - 1, Number(m[1])), isNaN(d.getTime()) ? null: d): (d = new Date(raw), isNaN(d.getTime()) ? null: (y = d.getFullYear(),
  y > 2400 ? new Date(y - 543, d.getMonth(), d.getDate()): d))
}
function _budgetNormalizePersonnelStaffForSalary_(row, idx) {
  row = row || {
};
  function first(s) {
    var ks = String(s || "").split("|");
    if(typeof _budgetPeopleFirstValue_ == "function")return _budgetPeopleFirstValue_(row, ks);
    for(var i = 0;
    i < ks.length;
    i++)if(row[ks[i]] != null && String(row[ks[i]]).trim() !== "")return row[ks[i]];
    var map = {
};
    Object.keys(row).forEach(function(k) {
      map[String(k).replace(/[\s_\-()（）]/g, "").toLowerCase()] = k
});
    for(var j = 0;
    j < ks.length;
    j++) {
      var real = map[String(ks[j]).replace(/[\s_\-()（）]/g, "").toLowerCase()];
      if(real && row[real] != null && String(row[real]).trim() !== "")return row[real]
}
    return""
}
  var rawStart = first("startDate|workStartDate|appointedDate|วันที่เริ่ม|วันเริ่ม|วันที่เริ่มดำรงตำแหน่ง|วันเริ่มดำรงตำแหน่ง|วันที่แต่งตั้ง|วันแต่งตั้ง|วันเริ่มทำหน้าที่|วันเริ่ม-สิ้นสุด|วันเริ่ม - สิ้นสุด"),
  rawEnd = first("endDate|workEndDate|retireDate|วันที่สิ้นสุด|วันสิ้นสุด|วันที่พ้นตำแหน่ง|วันพ้นตำแหน่ง|วันสิ้นสุดตำแหน่ง");
  if(rawStart && ! rawEnd && ! /^\s*\d{4}-\d{1,2}-\d{1,2}\s*$/.test(String(rawStart)) && /\s+(?:-|–|—|ถึง)\s+/.test(String(rawStart))) {
    var ps = String(rawStart).split(/\s+(?:-|–|—|ถึง)\s+/);
    rawStart = ps[0] || rawStart, rawEnd = ps.slice(1).join(" ").trim()
}
  var salary = first("salaryAmount|monthlySalary|salary|salaryBaht|compensation|amount|rate|monthlyRate|allowance|เงินเดือน (บาท)|เงินเดือน|เงินเดือนบาท|ค่าตอบแทน|ค่าตอบแทนรายเดือน|จำนวนเงิน"),
  fy = String(first("fy|fiscalYear|FiscalYear|budgetFy|budgetYear|ปีงบประมาณ|ปีงบ|ปี") || "").replace(/[^0-9]/g, "");
  return {
    id: String(first("id|ID|รหัส|ลำดับ|เลขที่|รหัสบุคลากร") || "S-" + (Number(idx || 0) + 1)), name: String(first("name|fullName|ชื่อ-สกุล|ชื่อสกุล|ชื่อ - สกุล|ชื่อ-นามสกุล|ชื่อ|ชื่อบุคลากร|ชื่อและสกุล") || ""),
    position: String(first("position|role|title|personnelType|ตำแหน่ง|ตำแหน่งในคณะ|ตำแหน่งงาน|ประเภทบุคลากร|ประเภท|สถานภาพ|Position") || ""),
    personnelType: String(first("personnelType|ประเภทบุคลากร|ประเภท|สถานภาพ") || ""), isGov: String(first("isGov|ข้าราชการ|เป็นข้าราชการ|สถานะข้าราชการ") || ""),
    status: String(first("status|workStatus|activeStatus|สถานะ|สถานะการดำรงตำแหน่ง|Status") || "ดำรงตำแหน่ง"), startDate: _budgetParsePersonnelDate_(rawStart),
    endDate: _budgetParsePersonnelDate_(rawEnd), fy, salaryAmount: salary, monthlySalary: salary, salary, compensation: salary, __raw: row
}
}
function _budgetReadPersonnelStaffRowsForSalary_() {
  var source = "", rawRows = [];
  function readOnce(label, reader) {
    if(! (rawRows.length || typeof reader != "function"))try {
      var candidate = reader();
      Array.isArray(candidate) && candidate.length && (rawRows = candidate, source = label)
}
    catch(err) {
      _b32W_("budget.personnel." + label, err)
}
}
  readOnce("budget-dataservice", function() {
    return typeof _budgetDataServiceRows_ == "function" ? _budgetDataServiceRows_("Personnel_Staff", _budgetProjectedFields_("Personnel_Staff"),
    {
      includeDeleted: !1, requireCanonical: !1, ttl: 300
}): []
}), readOnce("people-direct", function() {
    return typeof _readPeopleSheetRowsDirect_ == "function" ? _readPeopleSheetRowsDirect_("Personnel_Staff"): []
}), readOnce("people-domain", function() {
    return typeof _Domain_getPersonnelStaffs == "function" ? _Domain_getPersonnelStaffs(): []
}), readOnce("readObjects", function() {
    return typeof _readObjects_ == "function" ? _readObjects_("Personnel_Staff"): []
});
  var seen = {
}, out = [];
  return(_b32A_(rawRows)).forEach(function(raw, idx) {
    if(raw) {
      var row = raw;
      try {
        source === "people-domain" && typeof normalizePersonnelStaffRow_ == "function" && (row = normalizePersonnelStaffRow_(raw))
}
      catch(_normalizeErr) {
        row = raw
}
      if(row = _budgetNormalizePersonnelStaffForSalary_(row, idx), ! ! (String(row.name || "").trim() || String(row.position || "").trim())) {
        var key = String(row.id || "").trim() || [String(row.name || "").replace(/\s+/g, " ").trim(), String(row.position || "").replace(/\s+/g,
        " ").trim(), String(row.startDate || ""), idx].join("|");
        seen[key] || (seen[key] = !0, row.__salarySource = source || "Personnel_Staff", out.push(row))
}
}
}), out
}
function calculatePersonnelSalaryObligation_(staffRows, salarySettingsRows, targetFy, asOfDate) {
  var warnings = [], range = _budgetFiscalYearRange_(targetFy);
  if(! range)return {
    monthlyBudget: 0, monthlyRateTotal: 0, currentMonthlyExpense: 0, ytdExpense: 0, annualCommitment: 0, amount: 0, status: "error", warnings: ["ปีงบประมาณไม่ถูกต้อง"]
};
  var rows = _b32A_(staffRows), salaryRows = _b32A_(salarySettingsRows), requestedFy = _b32FY_(targetFy), targetSalaryFy = requestedFy || _latestSalarySettingsFy_(salaryRows),
  rates = {
};
  function applyRate(key, value, overwrite) {
    key = String(key || "").trim().toUpperCase();
    var numberValue = _b32N_(value);
    ! key || numberValue <= 0 || (overwrite || ! rates[key]) && (rates[key] = numberValue)
}
  salaryRows.forEach(function(row) {
    var rowFy = _b32FY_(row && row.fy);
    (! rowFy || ! targetSalaryFy || rowFy === targetSalaryFy) && applyRate(row && (row.Key || row.key), row && (row.Value || row.value), !0)
});
  try {
    var resolvedSettings = typeof getSalarySettings == "function" ? getSalarySettings(requestedFy || targetSalaryFy) || {
}:  {
}, settingsMap = {
      BUDGET: resolvedSettings.budget, ADV: resolvedSettings.adv, ADV_G: resolvedSettings.adv_g, EXP: resolvedSettings.exp, EXP_G: resolvedSettings.exp_g,
      ACA: resolvedSettings.aca, ACA_G: resolvedSettings.aca_g, SEC: resolvedSettings.sec, SEC_G: resolvedSettings.sec_g
};
    Object.keys(settingsMap).forEach(function(key) {
      applyRate(key, settingsMap[key], !1)
}), resolvedSettings.fy && (targetSalaryFy = String(resolvedSettings.fy)), resolvedSettings.fy && String(resolvedSettings.fy) !== String(requestedFy || "") && warnings.push("ใช้อัตราค่าตอบแทนปีงบประมาณ " + String(resolvedSettings.fy) + " แทนปี " + String(requestedFy || targetFy))
}
  catch(settingsErr) {
    warnings.push("อ่านอัตราค่าตอบแทนสำรองไม่สำเร็จ: " + String(settingsErr && settingsErr.message || settingsErr))
}
  Object.keys(rates).some(function(key) {
    return Number(rates[key] || 0) > 0
}) || warnings.push("ไม่พบข้อมูล SalarySettings/BudgetSalarySettings ที่มีอัตรามากกว่า 0");
  function rowSalary(row) {
    row = row || {
};
    for(var raw = row.__raw && typeof row.__raw == "object" ? row.__raw:  {
}, keys = ["salaryAmount", "monthlySalary", "salary", "salaryBaht", "compensation", "amount", "rate", "monthlyRate", "allowance", "เงินเดือน (บาท)",
    "เงินเดือน", "เงินเดือนบาท", "ค่าตอบแทน", "ค่าตอบแทนรายเดือน", "จำนวนเงิน"], i = 0;
    i < keys.length;
    i += 1) {
      var value = row[keys[i]];
      if(value != null && String(value).trim() !== "" && _b32N_(value) > 0 || (value = raw[keys[i]], value != null && String(value).trim() !== "" && _b32N_(value) > 0))return _b32N_(value)
}
    return 0
}
  var keyMap = _salaryKeyMap_(), today = asOfDate || new Date, anchor = today < range.start ? range.start: today > range.end ? range.end: today,
  ytdEnd = anchor, monthStart = new Date(anchor.getFullYear(), anchor.getMonth(), 1), monthEnd = new Date(anchor.getFullYear(), anchor.getMonth() + 1,
  0, 23, 59, 59, 999), monthlyBudget = _b32N_(rates.BUDGET), currentMonthlyExpense = 0, ytdExpense = 0, annualCommitment = 0, relevantCount = 0,
  usedSheetSalary = 0;
  rows.forEach(function(row) {
    row = row || {
};
    var status = String(row.status || "").trim().toLowerCase();
    if(! (status && /พ้น|สิ้นสุด|ลาออก|ยกเลิก|เสียชีวิต|inactive|deleted/.test(status))) {
      var rowFy = _b32FY_(row.fy || ""), start = _budgetParsePersonnelDate_(row.startDate || row.วันที่เริ่มดำรงตำแหน่ง || row.วันที่แต่งตั้ง || "") || range.start,
      end = _budgetParsePersonnelDate_(row.endDate || row.วันที่พ้นตำแหน่ง || "") || range.end;
      if(! (rowFy && rowFy !== String(targetFy) && end < range.start) && ! (end < range.start || start > range.end)) {
        var rawPosition = row.position || row.role || row.personnelType || "", position = _normalizePersonnelPosition_(rawPosition);
        if(! (! position || ! AppDomain.BudgetSalaryRules.isSalaryRelevantPosition(rawPosition || position))) {
          relevantCount += 1;
          var mapped = keyMap[position], isGov = _resolveIsGovFlag_(row), salaryKey = mapped ? String(mapped[isGov] || mapped.n || mapped.g || "").trim().toUpperCase(): "",
          alternateKey = mapped ? String((isGov === "g" ? mapped.n: mapped.g) || mapped.n || mapped.g || "").trim().toUpperCase(): "", rate = _b32N_(salaryKey && rates[salaryKey] || alternateKey && rates[alternateKey] || 0);
          if(rate || (rate = rowSalary(row), rate > 0 && (usedSheetSalary += 1)), ! rate) {
            warnings.push("ไม่พบอัตราค่าตอบแทนสำหรับ " + String(position || rawPosition));
            return
}
          var ytdMonths = _budgetMonthOverlapCount_(start, end, range.start, ytdEnd), annualMonths = _budgetMonthOverlapCount_(start, end, range.start,
          range.end);
          _budgetMonthOverlapCount_(start, end, monthStart, monthEnd) > 0 && (currentMonthlyExpense += rate), ytdExpense += rate * ytdMonths,
          annualCommitment += rate * annualMonths
}
}
}
}), ! currentMonthlyExpense && relevantCount && warnings.push("คำนวณค่าบุคลากรรายเดือนได้ 0 ทั้งที่มีข้อมูลบุคลากร"), warnings = warnings.filter(function(value,
  index, arr) {
    return value && arr.indexOf(value) === index
}).slice(0, 20);
  var statusText = warnings.length ? currentMonthlyExpense || ytdExpense ? "partial": "missing": "ok";
  return {
    monthlyBudget: monthlyBudget || annualCommitment, monthlyRateTotal: currentMonthlyExpense, currentMonthlyExpense, ytdExpense, annualCommitment,
    amount: ytdExpense || currentMonthlyExpense, status: statusText, warnings, staffCount: rows.length, relevantCount, usedSheetSalary, resolvedRateFiscalYear: targetSalaryFy,
    requestedFiscalYear: requestedFy || String(targetFy || "")
}
}
function _calculatePersonnelSalaryExpenseDetailed_(targetFy) {
  var r = _calculatePersonnelSalaryExpenseDetailedFull_(targetFy) || {
};
  return r.amount = _b32N_(r.amount || r.ytdExpense || r.currentMonthlyExpense || 0), r.budget = _b32N_(r.budget || r.annualCommitment || 0),
  r.ytdExpense = _b32N_(r.ytdExpense || r.amount || 0), r.currentMonthlyExpense = _b32N_(r.currentMonthlyExpense || r.monthlyRateTotal || 0),
  r.monthlyRateTotal = _b32N_(r.monthlyRateTotal || r.currentMonthlyExpense || 0), r.annualCommitment = _b32N_(r.annualCommitment || r.budget || 0),
  r.warnings = _b32A_(r.warnings), r.status = String(r.status || "ok"), r.source = String(r.source || "BudgetPersonnelExpenseReadModel"), r
}
function _buildBudgetSummaryFromSheet_(fyValue) {
  fyValue = String(fyValue || "");
  var warnings = [], settings = getBudgetYearSettingsMatrix(fyValue), imports = listBudgetImportRecordsByFY(fyValue);
  if(! settings || ! settings.ok)throw new Error(settings && (settings.msg || settings.error) || "โหลดการตั้งค่างบประมาณไม่สำเร็จ");
  var settingsRows = settings.data && settings.data.rows || settings.rows || [], importRows = imports && imports.data && imports.data.rows || imports.rows || [],
  summaryMap = {
};
  function addSpentToSummary(key, amount, allocated, fieldName) {
    return key = String(key || ""), fieldName = String(fieldName || "rowAmount"), amount = _b32N_(amount), ! ! (key && amount && summaryMap[key]) && (! allocated || ! allocated[fieldName]) && (summaryMap[key].spent += amount,
    summaryMap[key].remain = _b32N_(summaryMap[key].budget) - _b32N_(summaryMap[key].spent), allocated && (allocated[fieldName] = !0), !0)
}
  settingsRows.forEach(function(r) {
    r = r || {
};
    var plan = String(r.planGroup || r.category || r.plan || "").trim(), item = String(r.item || "").trim(), key;
    summaryMap[plan + "||" + item] = {
      fy: fyValue, planGroup: plan, category: plan, item, budget: _b32N_(r.budget), spent: 0, remain: _b32N_(r.budget)
}
}), importRows.forEach(function(r) {
    var ex = _budgetNormalizeImportCostPayload_(r = r || {
}, warnings), rowAmount = _b32N_(ex.rowAmount || r.totalAmount || r.amount), category = String(r.category || r.planGroup || "").trim(), item = String(r.item || ex.supportType || r.entryType || "").trim(),
    allocated = {
}, components = _budgetCostComponentsForRow_(r, ex, warnings), componentTotal = components.reduce(function(sum, component) {
      return sum + _b32N_(component && component.amount)
}, 0);
    if(componentTotal && rowAmount && rowAmount > componentTotal + .01 && warnings.push("ยอดรวมมากกว่ายอดแยกหมวด " + String(r.id || r.topic || r.entryType || "") + ": total=" + rowAmount + ", components=" + componentTotal),
    ! componentTotal)for(var exactKeys = [category + "||" + item, category + "||" + String(r.entryType || "").trim(), String(r.entryType || "").trim() + "||" + item],
    ek = 0;
    ek < exactKeys.length;
    ek++)if(_budgetCanAllocateRowAmountToSummaryKey_(exactKeys[ek])) {
      if(addSpentToSummary(exactKeys[ek], rowAmount, allocated, "rowAmount"))return
}
    else warnings.push("ไม่ใช้ totalAmount ลงหมวดรายจ่ายแบบ component: " + exactKeys[ek]);
    components.forEach(function(component) {
      if(! allocated[component.field]) {
        var bestKey = _budgetChooseBestSummaryKey_(summaryMap, component, r, ex);
        bestKey ? addSpentToSummary(bestKey, component.amount, allocated, component.field): warnings.push("ไม่พบหมวดงบประมาณสำหรับ " + component.field + " ในรายการ " + String(r.id || r.topic || r.entryType || ""))
}
})
});
  var staffExpenseInfo = _calculatePersonnelSalaryExpenseDetailed_(fyValue), staffAmount = _b32N_(staffExpenseInfo.amount), staffTouched = !1;
  Object.keys(summaryMap).forEach(function(k) {
    var keyText = String(k || "").toLowerCase();
    if(keyText.indexOf("บุคลากร") > - 1 || keyText.indexOf("ค่าตอบแทน") > - 1 || keyText.indexOf("ผู้ปฏิบัติงาน") > - 1) {
      var existingAmount = _budgetCanonicalExpenseAmount_(summaryMap[k], summaryMap[k].extra || {
}), effectiveAmount = staffAmount > 0 ? staffAmount: existingAmount;
      summaryMap[k].spent = effectiveAmount, summaryMap[k].spentAmount = effectiveAmount, summaryMap[k].expense = effectiveAmount, summaryMap[k].expenseAmount = effectiveAmount,
      summaryMap[k].totalPaid = effectiveAmount, summaryMap[k].totalSpent = effectiveAmount, summaryMap[k].personnelExpense = effectiveAmount,
      summaryMap[k].staffExpense = effectiveAmount, summaryMap[k].remain = _b32N_(summaryMap[k].budget) - effectiveAmount, summaryMap[k].balance = summaryMap[k].remain,
      summaryMap[k].isPersonnelCompensation = !0, staffTouched = !0
}
}), ! staffTouched && staffAmount > 0 && (summaryMap["แผนงานบุคลากรภาครัฐ||" + _budgetPersonnelCompensationLabel_()] = {
    fy: fyValue, planGroup: "แผนงานบุคลากรภาครัฐ", category: "แผนงานบุคลากรภาครัฐ", item: _budgetPersonnelCompensationLabel_(), budget: 0, spent: staffAmount,
    spentAmount: staffAmount, expense: staffAmount, expenseAmount: staffAmount, totalPaid: staffAmount, totalSpent: staffAmount, personnelExpense: staffAmount,
    staffExpense: staffAmount, remain:  - staffAmount, balance:  - staffAmount, isPersonnelCompensation: !0
}), warnings = warnings.concat(staffExpenseInfo.warnings || []);
  var normalizedRows = _normalizeBudgetSummaryRows_(Object.keys(summaryMap).map(function(k) {
    return summaryMap[k]
}), fyValue);
  ! (normalizedRows = _budgetApplyStrictComponentSpentToRows_(normalizedRows, fyValue, warnings)).length && Array.isArray(importRows) && importRows.length && (normalizedRows = importRows.map(function(r) {
    var amount = _b32N_((r = r || {
}).amount || r.totalAmount), label = String(r.entryType || r.topic || r.committeeType || "รายการงบประมาณ").trim();
    return {
      fy: fyValue, planGroup: label, category: label, item: String(r.topic || label).trim(), budget: amount, spent: amount, expense: amount, remain: 0,
      balance: 0
}
}));
  var meta = _budgetSetLastSummaryMeta_({
    fy: fyValue, warnings: warnings.filter(function(v, i, a) {
      return v && a.indexOf(v) === i
}), staffExpenseStatus: staffExpenseInfo.status || "unknown", staffExpense: _b32N_(staffExpenseInfo.amount), allocationMode: "exact-first-component-single-allocation"
});
  try {
    normalizedRows._meta = meta
}
  catch(_eMeta) {
    _b32W_("ec", _eMeta)
}
  return normalizedRows
}
function _normalizeBudgetSummaryRows_(rows, fyValue) {
  function pickMoney(row, keys) {
    row = row || {
};
    var sources = [row], extra = row.extra;
    try {
      extra && typeof extra == "object" && ! Array.isArray(extra) ? sources.push(extra): String(extra || row.extraJson || row.payloadJson || "").trim().charAt(0) === "{" && sources.push(JSON.parse(String(extra || row.extraJson || row.payloadJson || "{}")))
}
    catch(_extraErr) {
      _appIgnore_(_extraErr, "c6.C32:1252")
}
    for(var best = 0, seen = !1, i = 0;
    i < keys.length;
    i++)for(var sIdx = 0;
    sIdx < sources.length;
    sIdx++) {
      var src = sources[sIdx] || {
}, k = keys[i], v = null;
      if(src[k] != null && String(src[k]).trim() !== "")v = src[k];
      else {
        for(var nk = _budgetNormalizedLookupKey_(k), real = "", ks = Object.keys(src), n = 0;
        n < ks.length;
        n++)if(String(ks[n] || "").replace(/[\s_\-()（）]/g, "").toLowerCase() === nk) {
          real = ks[n];
          break
}
        real && src[real] != null && String(src[real]).trim() !== "" && (v = src[real])
}
      if(v != null) {
        var num = _b32N_(v);
        if(seen = !0, num > 0)return num;
        best = num
}
}
    return seen ? best: 0
}
  function pickRemain(row, budget, spent) {
    row = row || {
};
    for(var keys = _B32REM, i = 0;
    i < keys.length;
    i++) {
      var k = keys[i];
      if(row[k] != null && String(row[k]).trim() !== "")return _b32N_(row[k])
}
    return budget - spent
}
  return rows = _b32A_(rows), fyValue = String(fyValue || ""), rows.filter(function(r) {
    return ! _budgetIsActivityLeakRow_(r || {
})
}).map(function(r) {
    r = r || {
};
    var planGroup = String(r.planGroup || r.category || r.plan || r.แผนงาน || r.หมวด || r.หมวดงบประมาณ || "").trim(), item = String(r.item || r.plan || r.name || r.label || r.title || r.รายการ || r.ชื่อรายการ || r.รายการงบประมาณ || "").trim(),
    isPersonnel = _budgetIsPersonnelBudgetRow_({
      planGroup, category: planGroup, item, label: item, name: item
}), budget = pickMoney(r, _B32BUD), spent = isPersonnel ? pickMoney(r, ["personnelExpense", "staffExpense", "ytdExpense", "salaryExpense",
    "compensationExpense", "allowanceExpense", "currentMonthlyExpense", "monthlyRateTotal", "ค่าตอบแทน", "ค่าตอบแทนรวม", "เงินเดือน", "เงินเดือนรวม",
    "ค่าตอบแทนรายเดือน", "spent", "spentAmount", "expense", "expenseAmount", "totalExpense", "totalSpent", "totalPaid", "รายจ่าย", "รายจ่ายรวม",
    "จำนวนรายจ่าย"]): pickMoney(r, ["spent", "spentAmount", "expense", "expenseAmount", "totalExpense", "totalSpent", "totalPaid", "used", "usedAmount",
    "paid", "paidAmount", "actualAmount", "disbursement", "disbursed", "usedBudget", "ยอดใช้จ่าย", "รายจ่าย", "รายจ่ายรวม", "จำนวนรายจ่าย", "ค่าใช้จ่าย",
    "ค่าใช้จ่ายรวม", "เบิกจ่าย", "ยอดเบิกจ่าย", "totalAmount", "amount", "rowAmount", "จำนวนเงิน", "ยอดรวม", "รวมเป็นเงิน", "รวม"]), remain = pickRemain(r,
    budget, spent);
    return {
      id: String(r.id || fyValue + "|" + planGroup + "|" + item), fy: fyValue, planGroup, category: planGroup, item, budget, totalBudget: budget,
      spent, spentAmount: spent, expense: spent, expenseAmount: spent, totalPaid: spent, totalSpent: spent, personnelExpense: isPersonnel ? spent: 0,
      staffExpense: isPersonnel ? spent: 0, remain, balance: remain, isPersonnelCompensation: isPersonnel || r.isPersonnelCompensation === !0
}
})
}
function _budgetPersonnelCompensationLabel_() {
  return"ค่าตอบแทนผู้ปฏิบัติงานให้คณะกรรมาธิการประจำสภาผู้แทนราษฎร"
}
function _calculatePersonnelSalaryExpenseDetailedFull_(targetFy) {
  var m;
  try {
    m = _budgetPersonnelExpenseReadModel_(targetFy) || {
}
}
  catch(e) {
    m = {
      amount: 0, budget: 0, currentMonthlyExpense: 0, ytdExpense: 0, annualCommitment: 0, monthlyRateTotal: 0, status: "error", source: "BudgetPersonnelExpenseReadModel",
      warnings: [String(e && e.message || e)]
}
}
  m.amount = _b32N_(m.amount || m.ytdExpense || m.currentMonthlyExpense || 0), m.ytdExpense = _b32N_(m.ytdExpense || m.amount), m.currentMonthlyExpense = _b32N_(m.currentMonthlyExpense || m.monthlyRateTotal),
  m.monthlyRateTotal = _b32N_(m.monthlyRateTotal || m.currentMonthlyExpense), m.budget = _b32N_(m.budget || m.annualCommitment), m.annualCommitment = _b32N_(m.annualCommitment || m.budget),
  m.status = String(m.status || (m.amount > 0 ? "ok": "missing")), m.source = String(m.source || "BudgetPersonnelExpenseReadModel"), m.warnings = _b32A_(m.warnings);
  try {
    m.warnings.length && typeof logAudit_ == "function" && logAudit_("budget.personnelExpense.readModel.warning", {
      fy: targetFy, status: m.status, source: m.source, amount: m.amount, budget: m.budget, warnings: m.warnings.slice(0, 10)
})
}
  catch(e2) {
    _b32W_("budget.personnelExpense.audit", e2)
}
  return m
}
function _budgetIsPersonnelBudgetRow_(row) {
  row = row || {
};
  var text = String([row.planGroup, row.category, row.plan, row.item, row.label, row.name].filter(function(v) {
    return v != null && String(v).trim() !== ""
}).join(" ")).replace(/\s+/g, " ").trim();
  if(! text)return !1;
  var compact = text.replace(/\s+/g, "");
  return compact.indexOf("แผนงานบุคลากรภาครัฐ") !== - 1 || compact.indexOf("บุคลากรภาครัฐ") !== - 1 || compact.indexOf("ค่าตอบแทนผู้ปฏิบัติงาน") !== - 1 || compact.indexOf("ผู้ปฏิบัติงานให้คณะกรรมาธิการ") !== - 1
}
function _budgetActualComponentSpentByField_(fyValue, warnings) {
  fyValue = _b32FY_(fyValue) || _currentBudgetFyString_(), warnings = warnings || [];
  var sums = {
    meetingAllowance: 0, travelCost: 0, foodCost: 0, supportCost: 0, seminarCost: 0, foreignGuestCost: 0, receptionCost: 0, foreignTripCost: 0
}, rows = [];
  try {
    rows = _budgetLiteRows_("BudgetImports") || []
}
  catch(_liteErr) {
    _recordWarning_("core.budget.summary.liteRows", _liteErr), rows = []
}
  if(! Array.isArray(rows) || ! rows.length)try {
    var full = listBudgetImportRecordsByFY(fyValue);
    rows = full && full.data && full.data.rows || full.rows || []
}
  catch(_fullErr) {
    _recordWarning_("core.budget.summary.fullRows", _fullErr), rows = []
}
  return(_b32A_(rows)).forEach(function(row) {
    var ex, comps;
    _budgetRowFyLite_(row = row || {
}) !== fyValue && _b32FY_(row.fy) !== fyValue || row.isDeleted === !0 || String(row.isDeleted || "").toLowerCase() === "true" || String(row.deletedAt || "").trim() || _budgetCostComponentsForRow_(row,
    _budgetNormalizeImportCostPayload_(row, warnings), warnings).forEach(function(component) {
      var field = String(component && component.field || "");
      _b32H_(sums, field) && (sums[field] += _b32N_(component.amount))
})
}), sums
}
function _budgetApplyStrictComponentSpentToRows_(rows, fyValue, warnings) {
  if(! (rows = _b32A_(rows)).length)return rows;
  var sums = _budgetActualComponentSpentByField_(fyValue, warnings = warnings || []), touched = {
};
  return rows.forEach(function(row) {
    if(row = row || {
}, ! _budgetIsPersonnelBudgetRow_(row)) {
      var key, field = _budgetStrictComponentFieldForSummaryKey_(((row.planGroup || row.category || row.plan || "") + "||" + (row.item || row.label || row.name || "")).trim());
      if(field && _b32H_(sums, field)) {
        var spent = _b32N_(sums[field]);
        row.spent = spent, row.expense = spent, row.remain = _b32N_(row.budget) - spent, row.balance = row.remain, touched[field] = !0
}
}
}), touched.supportCost && _b32N_(sums.supportCost) === 0 && warnings.push("ปรับรายจ่าย supportCost เป็น 0 จาก field จริงของ BudgetImports"),
  rows
}
function _budgetDeriveGrandTotalsFromRows_(rows) {
  rows = _b32A_(rows);
  var totals = {
    all:  {
      budget: 0, spent: 0, remain: 0
}, noPersonnel:  {
      budget: 0, spent: 0, remain: 0
}
};
  return rows.forEach(function(r) {
    var budget = _b32N_((r = r || {
}).budget), spent = _b32N_(r.spent != null ? r.spent: r.expense), remain = _b32N_(r.remain != null ? r.remain: budget - spent);
    totals.all.budget += budget, totals.all.spent += spent, totals.all.remain += remain, _budgetIsPersonnelBudgetRow_(r) || (totals.noPersonnel.budget += budget,
    totals.noPersonnel.spent += spent, totals.noPersonnel.remain += remain)
}), totals.all.remain = totals.all.budget - totals.all.spent, totals.noPersonnel.remain = totals.noPersonnel.budget - totals.noPersonnel.spent,
  totals
}
function _computeBudgetSummaryGrandTotals_(rows) {
  return _budgetDeriveGrandTotalsFromRows_(rows)
}
function _budgetSummaryByFyRequestCached_(fy, options) {
  options = _b32O_({
}, options || {
}, {
    fy
});
  var cacheKey = JSON.stringify({
    fy: _b32FY_(fy), fast: options.fast === !0 || String(options.fast || "").toLowerCase() === "true", includeSpent: options.includeSpent === !0 || String(options.includeSpent || "").toLowerCase() === "true",
    limit: Number(options.limit || 0), page: Number(options.page || 1)
});
  try {
    if(! _budgetCachePolicyBypass_(options) && _appIsFnName_("_requestScopeGet_")) {
      var hit = _requestScopeGet_("budgetSummaryByFy", cacheKey);
      if(hit)return hit
}
}
  catch(_requestHitErr) {
    _b32W_("budget.summary.requestScope.hit", _requestHitErr, {
      fy
})
}
  var res = getBudgetSummaryByFY(options);
  try {
    ! _budgetCachePolicyBypass_(options) && _appIsFnName_("_requestScopePut_") && _requestScopePut_("budgetSummaryByFy", cacheKey, res)
}
  catch(_requestPutErr) {
    _b32W_("budget.summary.requestScope.put", _requestPutErr, {
      fy
})
}
  return res
}

/* --------------------------------------------------------------------------
 * 6. Central Budget DTO / Overview / Workflow / Report segments
 * -------------------------------------------------------------------------- */
function _budgetReadModelData_(res) {
  var cur = res, guard = 0;
  function isObj(v) { return v && typeof v === "object" && !Array.isArray(v); }
  function hasBudgetShape(v) {
    return isObj(v) && (Array.isArray(v.rows) || Array.isArray(v.byPlan) || Array.isArray(v.plans) ||
      Array.isArray(v.workflowRows) || Array.isArray(v.statusRows) || v.totalBudget != null ||
      v.totalPaid != null || v.totalRemain != null || v.totalRemaining != null || v.grandTotals ||
      v.totals || v.overviewSection || v.workflowSection || v.reportSection || v.segments ||
      v.statusSummary || v.workflowSummary || v.budgetWorkflow);
  }
  while (isObj(cur) && guard++ < 10) {
    if (hasBudgetShape(cur)) break;
    if (isObj(cur.budgetStats)) { cur = cur.budgetStats; continue; }
    if (isObj(cur.dashboardBudget)) { cur = cur.dashboardBudget; continue; }
    if (isObj(cur.budget)) { cur = cur.budget; continue; }
    if (isObj(cur.dashboardDto) && isObj(cur.dashboardDto.budgetStats)) { cur = cur.dashboardDto.budgetStats; continue; }
    if (isObj(cur.dto) && isObj(cur.dto.budgetStats)) { cur = cur.dto.budgetStats; continue; }
    if (isObj(cur.result)) { cur = cur.result; continue; }
    if (isObj(cur.payload)) { cur = cur.payload; continue; }
    if (isObj(cur.value)) { cur = cur.value; continue; }
    if (isObj(cur.body)) { cur = cur.body; continue; }
    if (isObj(cur.data)) { cur = cur.data; continue; }
    break;
  }
  return isObj(cur) ? cur : {};
}
function _budgetReadModelRows_(data) {
  data = data || {
};
  return Array.isArray(data.rows) ? data.rows: Array.isArray(data.items) ? data.items: Array.isArray(data.records) ? data.records: _b32A_(data.data)
}
function _budgetReadModelWorkflowRows_(data) {
  data = data || {};
  function arr(v) {
    return Array.isArray(v) ? v : [];
  }
  var sources = [
    data.workflowRows,
    data.statusRows,
    data.workflowSection && data.workflowSection.rows,
    data.segments && data.segments.workflow && data.segments.workflow.rows,
    data.budgetWorkflowRows,
    data.importRows,
    data.details,
    data.items,
    data.records,
    data.rows,
    data.data
  ];
  for (var i = 0; i < sources.length; i += 1) {
    var rows = arr(sources[i]);
    if (rows.length) return _b32A_(rows).filter(function(row) {
      if (!row || typeof row !== "object") return false;
      if (_budgetNoWaitDeleted_(row)) return false;
      return true;
    });
  }
  return [];
}
function _budgetReadModelPickWorkflowStatus_(row, kind) {
  row = row || {};
  var keys = kind === "refund" ? [
    "refundStatus", "refund_status", "returnStatus", "return_status",
    "borrowReturnStatus", "moneyReturnStatus", "loanReturnStatus",
    "สถานะคืนเงิน", "สถานะการคืนเงิน", "การคืนเงิน", "คืนเงิน", "สถานะยืมเงิน"
  ] : [
    "reportStatus", "report_status", "expenseReportStatus", "expense_report_status",
    "expenseStatus", "reportSubmitStatus",
    "สถานะรายงาน", "สถานะรายงานค่าใช้จ่าย", "รายงานค่าใช้จ่าย", "การรายงาน", "รายงาน"
  ];
  for (var i = 0; i < keys.length; i += 1) {
    var key = keys[i];
    if (row[key] != null && String(row[key]).trim() !== "") return row[key];
  }
  return "";
}
function _budgetReadModelWorkflowSummaryFromRows_(rows) {
  var summary = {
    refund: { total: 0, pending: 0, completed: 0 },
    report: { total: 0, pending: 0, completed: 0 }
  };
  _b32A_(rows).forEach(function(r) {
    r = r || {};
    var refundValue = _budgetReadModelPickWorkflowStatus_(r, "refund");
    var reportValue = _budgetReadModelPickWorkflowStatus_(r, "report");
    // Rows without explicit status still count as workflow records, but they are
    // treated as pending only after write/read normalization fails to provide a
    // concrete status. This keeps the workflow visible without falsely marking
    // a row as completed.
    summary.refund.total += 1;
    summary.report.total += 1;
    _budgetStatusDone_(refundValue, "refund") ? summary.refund.completed += 1 : summary.refund.pending += 1;
    _budgetStatusDone_(reportValue, "report") ? summary.report.completed += 1 : summary.report.pending += 1;
  });
  return summary;
}
function _budgetReadModelFindPersonnelRow_(rows) {
  rows = _b32A_(rows);
  for(var i = 0;
  i < rows.length;
  i += 1)if(_budgetIsPersonnelCompensationTypeRow_(rows[i]) || _budgetIsPersonnelBudgetRow_(rows[i]))return rows[i];
  return null
}
function _budgetReadModelTotalsHaveData_(totals, data) {
  data = data || {
};
  totals = totals || {
};
  var all = totals.all || totals || {
};
  return ! ! (Number(all.budget || all.totalBudget || data.totalBudget || 0) || Number(all.spent || all.totalPaid || data.totalPaid || 0) || Number(all.remain || all.totalRemain || data.totalRemain || 0))
}
function _budgetReadModelOverviewRows_(dto) {
  dto = dto || {
};
  var rows = _budgetReadModelRows_(dto);
  return rows.filter(function(r) {
    r = r || {
};
    return ! ! (String(r.planGroup || r.plan || r.category || r.item || r.label || "").trim() || Number(r.budget || r.totalBudget || r.spent || r.totalPaid || r.remain || r.totalRemain || 0))
})
}
function _budgetReadModelReportRows_(dto) {
  dto = dto || {
};
  var rows = _budgetReadModelRows_(dto);
  return rows.filter(function(r) {
    r = r || {
};
    return ! ! (String(r.item || r.topic || r.name || r.label || r.category || r.planGroup || "").trim() || Number(r.spent || r.expense || r.totalPaid || r.budget || r.totalBudget || r.remain || 0))
})
}
function _budgetReadModelHasOverview_(dto) {
  dto = dto || {
};
  var totals = dto.grandTotals || dto.totals || {
};
  return ! ! (_budgetReadModelOverviewRows_(dto).length || _budgetReadModelTotalsHaveData_(totals, dto))
}
function _budgetReadModelHasWorkflow_(dto) {
  dto = dto || {
};
  var workflowSummary = dto.statusSummary || dto.workflow || dto.budgetWorkflow || dto.workflowSummary || {
}, workflowRows = _budgetReadModelWorkflowRows_(dto);
  return ! ! (workflowRows.length || _dashboardBudgetWorkflowSummaryHasData_(workflowSummary))
}
function _budgetReadModelHasReport_(dto) {
  dto = dto || {
};
  return ! ! (_budgetReadModelReportRows_(dto).length || Number(dto.totalRecords || 0))
}
function _budgetReadModelSegments_(dto) {
  dto = dto || {
};
  var totals = dto.grandTotals || dto.totals || {
}, overviewRows = _budgetReadModelOverviewRows_(dto), workflowRows = _budgetReadModelWorkflowRows_(dto), reportRows = _budgetReadModelReportRows_(dto),
  workflowSummary = dto.statusSummary || dto.workflow || dto.budgetWorkflow || dto.workflowSummary || {
};
  return {
    overview:  {
      kind: "overview", hasData: _budgetReadModelHasOverview_(dto), rows: overviewRows, totals: totals, totalBudget: Number((totals.all || totals || {
}).budget || (totals.all || totals || {
}).totalBudget || dto.totalBudget || 0) || 0, totalPaid: Number((totals.all || totals || {
}).spent || (totals.all || totals || {
}).totalPaid || dto.totalPaid || 0) || 0, totalRemain: Number((totals.all || totals || {
}).remain || (totals.all || totals || {
}).totalRemain || dto.totalRemain || 0) || 0
}, workflow:  {
      kind: "workflow", hasData: _budgetReadModelHasWorkflow_(dto), rows: workflowRows, summary: workflowSummary
}, report:  {
      kind: "report", hasData: _budgetReadModelHasReport_(dto), rows: reportRows, totalRecords: Number(dto.totalRecords || reportRows.length || 0) || 0
}
}
}
function _budgetReadModelDataCompleteness_(dto) {
  dto = dto || {
};
  var segments = _budgetReadModelSegments_(dto);
  return {
    overview: segments.overview.hasData, workflow: segments.workflow.hasData, report: segments.report.hasData, overviewRows: segments.overview.rows.length,
    workflowRows: segments.workflow.rows.length, reportRows: segments.report.rows.length, owner: "BudgetReadModel.segmentCompleteness.r77"
}
}
function _budgetReadModelBuildSummaryDto_(payload, opts) {
  payload = payload || {
};
  opts = opts || {
};
  var requestedFy = _b32FY_(_budgetCanonicalPayloadFy_(payload) || payload.fy || payload.fiscalYear || payload.year) || _budgetNoWaitNormalizeFy_(payload),
  fy = _b32FY_(opts.fy || requestedFy) || requestedFy, allRows = opts.rows ? _b32A_(opts.rows): _budgetNoWaitSummaryRows_(fy, payload), fallbackFy = "";
  opts.ensurePersonnel === !1 || (allRows = _budgetNoWaitEnsurePersonnelRow_(allRows, fy));
  if(! allRows.length && payload.strictFy !== !0 && payload.exactFy !== !0) {
    try {
      fallbackFy = _latestAvailableBudgetFy_() || _resolveBudgetDefaultFiscalYear_() || ""
}
    catch(_dtoFyErr) {
      fallbackFy = ""
}
    fallbackFy = _b32FY_(fallbackFy);
    if(fallbackFy && fallbackFy !== fy) {
      var fallbackRows = opts.rows ? _b32A_(opts.rows): _budgetNoWaitSummaryRows_(fallbackFy, payload);
      opts.ensurePersonnel === !1 || (fallbackRows = _budgetNoWaitEnsurePersonnelRow_(fallbackRows, fallbackFy));
      if(fallbackRows.length) {
        fy = fallbackFy;
        allRows = fallbackRows
}
}
}
  var limit = Number(payload.limit || payload.pageSize || opts.limit || 20) || 20, paged = _budgetNoWaitPaged_(allRows, payload, limit, 500),
  grandTotals = opts.grandTotals || _budgetNoWaitTotals_(allRows), pageTotals = opts.pageTotals || _budgetNoWaitTotals_(paged.rows), workflowRows = opts.workflowRows && opts.workflowRows.length ? _b32A_(opts.workflowRows): _dashboardBudgetStatusSummaryRows_(fy),
  workflowSummary = opts.statusSummary || opts.workflow || opts.budgetWorkflow || opts.workflowSummary || {
};
  _dashboardBudgetWorkflowSummaryHasData_(workflowSummary) || (workflowSummary = _budgetReadModelWorkflowSummaryFromRows_(workflowRows));
  var personnelExpenseRow = opts.personnelExpenseRow || _budgetReadModelFindPersonnelRow_(allRows), dto = {
    rows: paged.rows, data: paged.rows, items: paged.rows, records: paged.rows, fy: fy, fiscalYear: fy, requestedFy: requestedFy, resolvedFy: fy,
    fallbackFyUsed:  ! ! (requestedFy && fy !== requestedFy), totalRecords: paged.totalRecords, total: paged.totalRecords, totalPages: paged.totalPages,
    page: paged.page, limit: paged.limit, pageSize: paged.limit, grandTotals: grandTotals, totals: grandTotals, pageTotals: pageTotals, statusSummary: workflowSummary,
    workflow: workflowSummary, budgetWorkflow: workflowSummary, workflowSummary: workflowSummary, workflowRows: workflowRows, statusRows: workflowRows,
    personnelExpenseRow: personnelExpenseRow, includePersonnelCompensation: opts.includePersonnelCompensation !== !1, sourceOfTruth: opts.sourceOfTruth || "BudgetImports",
    editSource: opts.editSource || "BudgetImports", loadOk: !0, contractStamp: opts.contractStamp || "budget-summary-central-dto-r77"
};
  dto.segments = _budgetReadModelSegments_(dto);
  dto.overviewSection = dto.segments.overview;
  dto.workflowSection = dto.segments.workflow;
  dto.reportSection = dto.segments.report;
  var completeness = _budgetReadModelDataCompleteness_(dto);
  dto.dataCompleteness = completeness;
  dto.meta = _b32O_({
}, opts.meta || {
}, {
    fy: fy, requestedFy: requestedFy, resolvedFy: fy, fallbackFyUsed: dto.fallbackFyUsed, source: opts.source || "BudgetReadModel.centralDTO.r77",
    sourceOfTruth: dto.sourceOfTruth, dataSource: opts.dataSource || "centralBudgetDTO", readModelOwner: "Code_32_Domain_Budget.BudgetReadModel.centralDTO",
    segmentOwner: "BudgetReadModel.overviewWorkflowReport.r77", fast: !0, cacheHit: !1, warnings: [], noWait: !0, personnelExpenseIncluded:  ! ! personnelExpenseRow,
    personnelExpenseSource: personnelExpenseRow && personnelExpenseRow.__budgetPersonnelExpenseSource || "", overviewRows: completeness.overviewRows,
    workflowRows: workflowRows.length, reportRows: completeness.reportRows, dataCompleteness: completeness
});
  return dto
}
function _budgetReadModelDashboardPayload_(res, fy, startedAt, sourceMeta) {
  var data = _budgetReadModelData_(res), rows = _budgetReadModelRows_(data), totals = data.grandTotals || data.totals || {
}, all = totals.all || totals || {
}, plans = rows.map(function(r) {
    return r = r || {
}, {
      fy: String(r.fy || fy || data.fy || ""), plan: String(r.planGroup || r.plan || r.category || "").trim() || "-", label: String(r.planGroup || r.plan || r.category || "").trim() || "-",
      item: String(r.item || r.planGroup || r.plan || r.category || "").trim() || "-", budget: _b32N_(r.budget != null ? r.budget: r.totalBudget),
      spent: _b32N_(r.spent != null ? r.spent: r.expense != null ? r.expense: r.totalPaid != null ? r.totalPaid: r.totalSpent), remain: _b32N_(r.remain != null ? r.remain: r.balance != null ? r.balance: _b32N_(r.budget != null ? r.budget: r.totalBudget) - _b32N_(r.spent != null ? r.spent: r.expense != null ? r.expense: r.totalPaid))
}
}), workflowRows = _budgetReadModelWorkflowRows_(data), workflowSummary = data.statusSummary || data.workflow || data.budgetWorkflow || data.workflowSummary || {
};
  _dashboardBudgetWorkflowSummaryHasData_(workflowSummary) || (workflowSummary = _budgetReadModelWorkflowSummaryFromRows_(workflowRows));
  var payload = {
    fy: String(data.fy || data.resolvedFy || fy || ""), requestedFy: String(data.requestedFy || fy || ""), resolvedFy: String(data.resolvedFy || data.fy || fy || ""),
    fallbackFyUsed: data.fallbackFyUsed === !0, totalBudget: _b32N_(all.budget != null ? all.budget: all.totalBudget != null ? all.totalBudget: data.totalBudget),
    totalPaid: _b32N_(all.spent != null ? all.spent: all.totalPaid != null ? all.totalPaid: data.totalPaid), totalRemain: _b32N_(all.remain != null ? all.remain: all.totalRemain != null ? all.totalRemain: data.totalRemain != null ? data.totalRemain: 0),
    plans: plans, byPlan: plans, rows: plans, details: plans, totals: totals, statusSummary: workflowSummary, workflow: workflowSummary, budgetWorkflow: workflowSummary,
    workflowSummary: workflowSummary, workflowRows: workflowRows, statusRows: workflowRows, meta: _b32O_({
}, data.meta || {
}, sourceMeta || {
}, {
      source: "BudgetReadModel.centralDTO.dashboardPayload.r77", readModelOwner: "Code_32_Domain_Budget.BudgetReadModel.centralDTO", dashboardBudgetOwner: "BudgetReadModel.centralDTO",
      phaseESeparateBudgetHydration: !0, cacheEmptySkipped:  ! plans.length && ! _b32N_(all.budget || all.spent || all.remain), durationMs: Math.max(0,
      Date.now() - Number(startedAt || Date.now()))
})
};
  payload.segments = _budgetReadModelSegments_(_b32O_({
}, data, {
    rows: plans, grandTotals: totals, statusSummary: workflowSummary, workflowRows: workflowRows
}));
  payload.overviewSection = payload.segments.overview;
  payload.workflowSection = payload.segments.workflow;
  payload.reportSection = payload.segments.report;
  payload.meta.dataCompleteness = _budgetReadModelDataCompleteness_(_b32O_({
}, data, {
    rows: plans, grandTotals: totals, statusSummary: workflowSummary, workflowRows: workflowRows
}));
  payload.meta.segmentOwner = "BudgetReadModel.dashboardPayload.overviewWorkflowReport.r77";
  return ! payload.totalRemain && (payload.totalBudget || payload.totalPaid) && (payload.totalRemain = payload.totalBudget - payload.totalPaid),
  _applyDashboardBudgetStatusSummary_(payload, payload.fy || fy || "")
}
function _budgetSummaryResultHasDataPhaseE_(res) {
  try {
    var data = _budgetReadModelData_(res), comp = _budgetReadModelDataCompleteness_(data);
    return ! ! (comp.overview || comp.workflow || comp.report)
}
  catch(_phaseEHasDataErr) {
    return !1
}
}
function _budgetDashboardPayloadFromSummaryResultPhaseE_(res, fy, startedAt, sourceMeta) {
  return _budgetReadModelDashboardPayload_(res, fy, startedAt, sourceMeta)
}
function _budgetGetDashboardSummaryForDashboardPhaseE_(payload) {
  var auth = _bSafeReq_(payload || {
}, "viewer", "apiBudgetGetSummary");
  if(! auth.ok)return auth.result;
  payload = auth.payload || {
};
  var startedAt = Date.now(), policy = _budgetCachePolicy_(payload, "dashboard"), explicitFy = _b32FY_(payload.fy || payload.fiscalYear || payload.year),
  seenFy = {
}, candidateYears = (explicitFy ? [explicitFy]: _budgetFyCandidatesFromData_() || []).filter(function(fy2) {
    return fy2 = _b32FY_(fy2), ! (! fy2 || seenFy[fy2]) && (seenFy[fy2] = !0, !0)
}), cache = _AppScriptCache_();
  candidateYears.length || (candidateYears = [_latestAvailableBudgetFy_() || _currentBudgetFyString_()].filter(Boolean));
  for(var ci = 0;
  ci < candidateYears.length;
  ci += 1) {
    var fy = _b32FY_(candidateYears[ci]), cacheKey = _dashboardBudgetCacheKey_(fy), canUseCache = policy.allowRead;
    if(canUseCache)try {
      var cached = cache.get(cacheKey);
      if(cached) {
        var parsed = _applyDashboardBudgetStatusSummary_(JSON.parse(cached), fy);
        if(_dashboardBudgetHasData_(parsed) && _budgetCachePolicyCanStoreSummary_(parsed, payload, "dashboard"))return parsed.meta = _budgetCachePolicyMeta_(_b32O_({
}, parsed.meta || {
}, {
          cacheHit: !0, cacheStatus: "hit", dataSource: "dashboardBudgetCache.cachePolicy.r77", source: "BudgetDomain.getDashboardSummaryForDashboard.cachePolicy.r77.cache",
          readModelOwner: "Code_32_Domain_Budget.BudgetDomain", phaseESeparateBudgetHydration: !0, durationMs: Math.max(0, Date.now() - startedAt),
          rowsRead: 0
}), policy, {
          status: "hit"
}), ok_(parsed, "โหลดสรุปงบประมาณ Dashboard จาก cache สำเร็จ")
}
}
    catch(_cacheReadErr) {
      _b32W_("budget.dashboard.cachePolicy.cache.read", _cacheReadErr, {
        fy
})
}
    var summaryPayload = _b32O_({
}, payload, {
      fy, fiscalYear: fy, year: fy, includeWorkflow: !0, limit: Math.max(100, Math.min(Number(payload.limit || payload.pageSize || 500) || 500,
      500)), pageSize: Math.max(100, Math.min(Number(payload.limit || payload.pageSize || 500) || 500, 500)), cacheTtlSeconds: policy.ttlSeconds,
      source: String(payload.source || "dashboard-budget-hydration-cachePolicy-r76")
}), summaryRes = BudgetDomain && typeof 
/* --------------------------------------------------------------------------
 * 8. BudgetDomain facade methods
 * -------------------------------------------------------------------------- */
BudgetDomain.getSummary == "function" ? BudgetDomain.getSummary(summaryPayload): _budgetGetSummaryDomainOwnerPhase5_(summaryPayload),
    dashboardPayload = _budgetDashboardPayloadFromSummaryResultPhaseE_(summaryRes, fy, startedAt, {
      summaryOk: (summaryRes && summaryRes.ok) !== !1, summarySource: summaryRes && summaryRes.meta && summaryRes.meta.source || summaryRes && summaryRes.data && summaryRes.data.meta && summaryRes.data.meta.source || "BudgetDomain.getSummary",
      cachePolicyStamp: BUDGET_CACHE_POLICY_STAMP
});
    if(_dashboardBudgetHasData_(dashboardPayload)) {
      try {
        _budgetCachePolicyCanStoreSummary_(dashboardPayload, payload, "dashboard") && safeCachePut_(cache, cacheKey, dashboardPayload, policy.ttlSeconds)
}
      catch(_cacheWriteErr) {
        _b32W_("budget.dashboard.cachePolicy.cache.write", _cacheWriteErr, {
          fy
})
}
      dashboardPayload.meta = _budgetCachePolicyMeta_(dashboardPayload.meta || {
}, policy, {
        status: "fresh"
});
      return ok_(dashboardPayload, "โหลดสรุปงบประมาณ Dashboard สำเร็จ")
}
}
  var emptyFy = candidateYears[0] || _latestAvailableBudgetFy_() || _currentBudgetFyString_(), empty = _applyDashboardBudgetStatusSummary_(_dashboardBudgetEmpty_(emptyFy),
  emptyFy);
  return empty.generatedAt = new Date().toISOString(), empty.meta = _budgetCachePolicyMeta_(_b32O_({
}, empty.meta || {
}, {
    dataSource: "dashboardBudgetEmpty.cachePolicy.r77", cacheHit: !1, cacheEmptySkipped: !0, rowsRead: 0, durationMs: Math.max(0, Date.now() - startedAt),
    degraded: !1, source: "BudgetDomain.getDashboardSummaryForDashboard.cachePolicy.r77.empty", readModelOwner: "Code_32_Domain_Budget.BudgetDomain",
    phaseESeparateBudgetHydration: !0
}), policy, {
    status: "empty-not-cached"
}), ok_(empty, "ยังไม่มีข้อมูลงบประมาณสำหรับปีที่เลือก")
}
function _getDashboardBudgetByPlanCurrentFYImpl_(payload) {
  try {
    return _budgetGetDashboardSummaryForDashboardPhaseE_(payload || {
})
}
  catch(e) {
    _b32W_("budget.dashboard.phaseE.degraded", e);
    var fy = _appIsFnName_("_currentBudgetFyString_") ? _currentBudgetFyString_(): "", defaultSummary = _applyDashboardBudgetStatusSummary_(_dashboardBudgetEmpty_(fy),
    fy);
    return defaultSummary.degraded = !0, defaultSummary.errorCode = "DASHBOARD_BUDGET_DEGRADED", defaultSummary.generatedAt = new Date().toISOString(),
    defaultSummary.meta = _b32O_({
}, defaultSummary.meta || {
}, {
      dataSource: "dashboardBudgetDegraded.phaseE", cacheHit: !1, cacheEmptySkipped: !0, rowsRead: 0, durationMs: 0, degraded: !0, source: "BudgetDomain.getDashboardSummaryForDashboard.phaseE.degraded",
      readModelOwner: "Code_32_Domain_Budget.BudgetDomain", phaseESeparateBudgetHydration: !0
}), ok_(defaultSummary, "โหลดสรุปงบประมาณแดชบอร์ดแบบจำกัด")
}
}
function getDashboardBudgetByPlanCurrentFY() {
  return _getDashboardBudgetByPlanCurrentFYImpl_()
}
function _normalizePersonnelPosition_(value) {
  return AppDomain.BudgetSalaryRules && AppDomain.BudgetSalaryRules.normalizePersonnelPosition ? AppDomain.BudgetSalaryRules.normalizePersonnelPosition(value): String(value || "").trim()
}
function _salaryKeyMap_() {
  return AppDomain.BudgetSalaryRules && AppDomain.BudgetSalaryRules.salaryKeyMap ? AppDomain.BudgetSalaryRules.salaryKeyMap():  {
}
}
function _resolveIsGovFlag_(row) {
  return AppDomain.BudgetSalaryRules && AppDomain.BudgetSalaryRules.resolveIsGovFlag ? AppDomain.BudgetSalaryRules.resolveIsGovFlag(row): "n"
}
function _normalizeBudgetFyValue_(fy) {
  var s = String(fy || "").replace(/[^0-9]/g, "");
  return/^\d{4}$/.test(s) ? s: ""
}
function _latestSalarySettingsFy_(rows) {
  var years = [];
  return(_b32A_(rows)).forEach(function(r) {
    var fy = _b32FY_(r && r.fy);
    fy && years.indexOf(fy) === - 1 && years.push(fy)
}), years.sort(function(a, b) {
    return Number(b || 0) - Number(a || 0)
}), years[0] || String(_currentFiscalYearThai_(new Date))
}
function _salarySettingsRowsDirect_() {
  var collected = [], dataServiceRead = {
};
  function appendRows(sheetName, sourceName, rows) {
    (_b32A_(rows)).forEach(function(row) {
      ! row || typeof row != "object" || collected.push(_b32O_({
}, row, {
        __salarySettingsSheet: sheetName, __salarySettingsSource: sourceName
}))
})
}
  function readDataService(sheetName) {
    try {
      var rows = typeof _budgetDataServiceRows_ == "function" ? _budgetDataServiceRows_(sheetName, _budgetProjectedFields_("SalarySettings"),
      {
        includeDeleted: !1, requireCanonical: !1, ttl: 300
}) || []: [];
      Array.isArray(rows) && rows.length && (appendRows(sheetName, "DataService", rows), dataServiceRead[sheetName] = !0)
}
    catch(err) {
      _b32W_("budget.salarySettings." + sheetName, err)
}
}
  function readDirect(sheetName) {
    if(! dataServiceRead[sheetName])try {
      var rows = typeof _readObjects_ == "function" ? _readObjects_(sheetName): [];
      appendRows(sheetName, "direct", rows)
}
    catch(err) {
      _b32W_("budget.salarySettings.direct." + sheetName, err)
}
}
  readDataService("SalarySettings"), readDataService("BudgetSalarySettings"), readDirect("SalarySettings"), readDirect("BudgetSalarySettings");
  var byKey = {
};
  return collected.forEach(function(row, index) {
    var fy = _b32FY_(row && row.fy), key = String(row && (row.Key || row.key) || "").trim().toUpperCase();
    if(key) {
      var composite = String(fy || "*") + "|" + key, value = _b32N_(row && (row.Value != null ? row.Value: row.value)), current = byKey[composite];
      (! current || _b32N_(current.Value != null ? current.Value: current.value) <= 0 && value > 0) && (byKey[composite] = _b32O_({
}, row, {
        fy: fy || row.fy || "", Key: key, Value: value, __salarySettingsOrder: index
}))
}
}), Object.keys(byKey).map(function(key) {
    return byKey[key]
}).sort(function(a, b) {
    var fyDiff = Number(b.fy || 0) - Number(a.fy || 0);
    return fyDiff || String(a.Key || "").localeCompare(String(b.Key || ""))
})
}
function getSalarySettings(fy) {
  try {
    let collect2 = function(targetFy2) {
      var s = {
};
      return rows.forEach(function(row) {
        var rowFy = _b32FY_(row && row.fy);
        if(! targetFy2 || ! rowFy || rowFy === targetFy2) {
          var rawKey = String(row && (row.Key || row.key) || "").trim().toUpperCase();
          if(rawKey) {
            var val = Number(row && (row.Value || row.value) || 0) || 0;
            (val || s[rawKey] == null) && (s[rawKey] = val)
}
}
}), s
}, hasAny2 = function(fyVal) {
      return rows.some(function(row) {
        return _b32FY_(row && row.fy) === fyVal
})
};
    var collect = collect2, hasAny = hasAny2, rows = _salarySettingsRowsDirect_(), explicitFy = _b32FY_(fy), currentFy = _currentBudgetFyString_(),
    targetFy = explicitFy || (hasAny2(currentFy) ? currentFy: _latestSalarySettingsFy_(rows)), primary = collect2(targetFy), fallbackFy = _latestSalarySettingsFy_(rows.filter(function(row) {
      return Number(row && (row.Value || row.value) || 0) > 0
})), fallback = collect2(fallbackFy);
    return["BUDGET", "ADV", "ADV_G", "EXP", "EXP_G", "ACA", "ACA_G", "SEC", "SEC_G"].forEach(function(k) {
      ! primary[k] && fallback[k] && (primary[k] = fallback[k])
}), {
      fy: targetFy || fallbackFy || String(fy || ""), budget: primary.BUDGET || 0, adv: primary.ADV || 0, adv_g: primary.ADV_G || 0, exp: primary.EXP || 0,
      exp_g: primary.EXP_G || 0, aca: primary.ACA || 0, aca_g: primary.ACA_G || 0, sec: primary.SEC || 0, sec_g: primary.SEC_G || 0
}
}
  catch(e) {
    return {
      fy: String(fy || ""), budget: 0, adv: 0, adv_g: 0, exp: 0, exp_g: 0, aca: 0, aca_g: 0, sec: 0, sec_g: 0
}
}
}
function saveSalarySettings(payload) {
  return domainWrite_("saveSalarySettings", payload, function(input) {
    var ss = getSpreadsheet_(), sh = ss.getSheetByName("SalarySettings"), schema = ["fy", "Key", "Value", "UpdatedAt", "isDeleted", "deletedAt"];
    sh || (sh = ss.insertSheet("SalarySettings"), AppRepository.setRangeValues("SalarySettings", 1, 1, [schema], {
      invalidate: !1
}), sh.setFrozenRows(1));
    var matrix = typeof getSheetMatrixCached_ == "function" ? getSheetMatrixCached_(sh, schema.length, {
      allowFullMatrix: !1
}): getSheetMatrix_(sh, schema.length, {
      allowFullMatrix: !1
}), header = matrix.length ? matrix[0].map(function(h) {
      return String(h || "").trim()
}): schema.slice();
    header.indexOf("fy") !== - 1 && header.indexOf("Key") !== - 1 && header.indexOf("Value") !== - 1 || (header = schema.slice(), AppRepository.clearSheetContents("SalarySettings"),
    AppRepository.setRangeValues("SalarySettings", 1, 1, [header], {
      invalidate: !1
}), sh.setFrozenRows(1), matrix = [header]);
    var idx = {
};
    header.forEach(function(h, i2) {
      idx[h] = i2
});
    for(var fy = _b32FY_(input && input.fy) || String(_currentFiscalYearThai_(new Date)), keyMap = {
      budget: "BUDGET", adv: "ADV", adv_g: "ADV_G", exp: "EXP", exp_g: "EXP_G", aca: "ACA", aca_g: "ACA_G", sec: "SEC", sec_g: "SEC_G"
}, keep = [header], i = 1;
    i < matrix.length;
    i++) {
      var row = matrix[i], rowFy;
      _b32FY_(row[idx.fy]) !== fy && keep.push(row)
}
    var now = new Date;
    return Object.keys(keyMap).forEach(function(k) {
      if(input[k] !== void 0 && input[k] !== null && input[k] !== "") {
        var row2 = new Array(header.length).fill("");
        row2[idx.fy] = fy, row2[idx.Key] = keyMap[k], row2[idx.Value] = Number(String(input[k]).replace(/,/g, "")) || 0, idx.UpdatedAt != null && (row2[idx.UpdatedAt] = now),
        idx.isDeleted != null && (row2[idx.isDeleted] = !1), idx.deletedAt != null && (row2[idx.deletedAt] = ""), keep.push(row2)
}
}), AppRepository.clearSheetContents("SalarySettings"), AppRepository.setRangeValues("SalarySettings", 1, 1, keep, {
      invalidate: !1
}), invalidateSheetCache_("SalarySettings"), ok_(getSalarySettings(fy), "บันทึกการตั้งค่าเงินเดือนสำเร็จ")
})
}

/* --------------------------------------------------------------------------
 * 10. Budget administration / year settings / salary settings
 * -------------------------------------------------------------------------- */
function apiBudgetAdminListYearSettingsAll(payload) {
  var auth = _bSafeReq_(payload, "admin", "apiBudgetAdminListYearSettingsAll");
  if(! auth.ok)return auth.result;
  payload = auth.payload;
  var rows = _budgetDataServiceRows_("BudgetYearSettingsItems", [], {
    includeDeleted: !1, requireCanonical: !1
}) || [];
  return(rows = (_b32A_(rows)).map(function(row, idx) {
    return row = row || {
}, {
      fy: String(row.fy || row.fiscalYear || row.budgetFy || row.ปีงบประมาณ || "").replace(/[^0-9]/g, ""), category: String(row.category || row.planGroup || row.plan || row.แผนงาน || row.หมวด || "").trim(),
      planGroup: String(row.planGroup || row.category || row.plan || row.แผนงาน || row.หมวด || "").trim(), item: String(row.item || row.name || row.label || row.รายการ || row.ชื่อรายการ || "").trim(),
      budget: Number(String(row.budget || row.amount || row.totalBudget || row.วงเงิน || row.งบประมาณ || "0").replace(/,/g, "")) || 0, remark: String(row.remark || row.note || row.หมายเหตุ || "").trim(),
      order: Number(row.order || row.sortOrder || row.ลำดับ || idx + 1) || idx + 1
}
}).filter(function(row) {
    return row.fy || row.category || row.item || row.budget
})).sort(function(a, b) {
    return Number(b.fy || 0) - Number(a.fy || 0) || Number(a.order || 0) - Number(b.order || 0) || String(a.category + a.item).localeCompare(String(b.category + b.item),
    "th")
}), ok_({
    rows, data: rows, totalRecords: rows.length
}, "โหลดรายการตั้งค่างบประมาณสำเร็จ")
}
function apiBudgetAdminSaveYearSettingsRows(payload) {
  return writeGateway_("apiBudgetAdminSaveYearSettingsRows", payload || {
}, function(input) {
    return budgetAdminSaveYearSettingsRows(input || {
})
}, "บันทึกตั้งค่าปีงบประมาณสำเร็จ", "บันทึกตั้งค่าปีงบประมาณไม่สำเร็จ")
}
function budgetAdminSaveYearSettingsRows(payload) {
  try {
    requireAuth_(payload, "admin"), payload = payload || {
};
    var fy = String(payload.fy || "").trim();
    if(! fy)throw new Error("ไม่พบปีงบประมาณ");
    return _withScriptLock_(1e4, function() {
      getCanonicalHeaderAudit_("BudgetYearSettingsItems");
      for(var sh = getSheet_("BudgetYearSettingsItems"), existing = typeof getSheetMatrixCached_ == "function" ? getSheetMatrixCached_(sh, (SHEET_SCHEMAS.BudgetYearSettingsItems || []).length,
      {
        allowFullMatrix: !1
}): getSheetMatrix_(sh, (SHEET_SCHEMAS.BudgetYearSettingsItems || []).length, {
        allowFullMatrix: !1
}), header = existing.length ? existing[0]: SHEET_SCHEMAS.BudgetYearSettingsItems.slice(), preserved = [], i = 1;
      i < existing.length;
      i++)String(existing[i][0] || "") !== fy && preserved.push(existing[i]);
      var rows = _b32A_(payload.rows), now = new Date, prepared = rows.map(function(r, idx) {
        var category = String(r.category || "").trim(), planGroup = category.indexOf("บุคลากร") !== - 1 ? "แผนงานบุคลากรภาครัฐ": "แผนงานยุทธศาสตร์เพื่อสนับสนุนด้านการปรับสมดุลและพัฒนาระบบการบริหารจัดการภาครัฐ";
        return[fy, category, String(r.item || "").trim(), Number(r.budget || 0), String(r.remark || "").trim(), "Y", planGroup, idx + 1, now,
        !1, ""]
}), finalRows = [header].concat(preserved, prepared);
      AppRepository.clearSheetContents("BudgetYearSettingsItems"), AppRepository.setRangeValues("BudgetYearSettingsItems", 1, 1, finalRows, {
        invalidate: !1
}), invalidateSheetCache_("BudgetYearSettingsItems");
      var cacheInvalidation = _appIsFnName_("_invalidateBudgetDerivedCaches_") ? _invalidateBudgetDerivedCaches_("budgetAdminSaveYearSettingsRows"):  {
};
      return _appIsFnName_("_invalidateAdminDerivedCaches_") && (cacheInvalidation.admin = _invalidateAdminDerivedCaches_("budgetAdminSaveYearSettingsRows")),
      _safeAudit_("budgetAdminSaveYearSettingsRows", {
        fy, rows: prepared.length, source: "batch.current.rebuild"
}), ok_({
        fy, rows: prepared.length, cacheInvalidation: cacheInvalidation || {
}
}, "บันทึกตั้งค่าปีงบประมาณสำเร็จ")
})
}
  catch(e) {
    return _safeAudit_("budgetAdminSaveYearSettingsRows.error", {
      message: String(e && e.message || e)
}), err_(e.message || String(e))
}
}
function getBudgetYearSettingsMatrix(fy) {
  try {
    var rowsAll = _budgetRows_("BudgetYearSettingsItems", !1), targetFy = _b32FY_(fy) || _currentBudgetFyString_(), normalize = function(row,
    overrideFy) {
      return row = row || {
}, {
        fy: String(overrideFy || row.fy || "").trim(), planGroup: String(row.planGroup || row.category || "").trim(), item: String(row.item || "").trim(),
        budget: Number(row.budget || 0) || 0
}
}, rows = rowsAll.filter(function(row) {
      return String(row && row.fy || "").trim() === targetFy
}).map(function(row) {
      return normalize(row)
});
    if(! rows.length) {
      var prevFy = String(Number(targetFy) - 1), prevRows = rowsAll.filter(function(row) {
        return String(row && row.fy || "").trim() === prevFy
}).map(function(row) {
        return normalize(row, targetFy)
});
      prevRows.length && (rows = prevRows)
}
    return ok_({
      rows
})
}
  catch(e) {
    return err_(e.message, {
      rows: []
})
}
}
function _getBudgetImportRepository_() {
  return getCanonicalRepository_("budget.imports")
}
function _budgetImportExtraPayload_(row) {
  var warnings = [], extra = _budgetParsePayloadExtra_(row = row || {
}, warnings);
  return Array.isArray(extra.visitLocations) || (extra.visitLocations = []), Array.isArray(extra.seminarLocations) || (extra.seminarLocations = []),
  Array.isArray(extra.countries) || (extra.countries = []), extra.countriesText || (extra.countriesText = row.countriesText || ""), extra.semDate || (extra.semDate = row.seminarDate || ""),
  extra.roundNo || (extra.roundNo = row.roundNo || ""), warnings.length && (extra._warnings = warnings), extra
}
function _mapBudgetImportListRow_(row) {
  var extra = _budgetImportExtraPayload_(row = row || {
}), rowFy = String(row.fy || "").replace(/[^\d]/g, "");
  return _budgetImportDto_({
    id: String(row.id || ""), fy: rowFy, entryType: String(row.entryType || ""), committeeType: String(row.committeeType || ""), startDate: _bFormatDate(row.startDate),
    endDate: _bFormatDate(row.endDate), activityDate: _bFormatDate(row.activityDate), seminarDate: _bFormatDate(row.seminarDate), committeeName: String(row.committeeName || ""),
    roundNo: String(row.roundNo || ""), topic: String(row.topic || ""), amount: Number(row.amount != null && row.amount !== "" ? row.amount: row.totalAmount) || 0,
    committeeResponsible: String(row.committeeResponsible || ""), staffResponsible: String(row.staffResponsible || ""), note: String(row.note || ""),
    refundStatus: String(row.refundStatus || "ยังไม่คืนเงิน"), refundDate: _bFormatDate(row.refundDate || extra.refundDate || ""), reportStatus: String(row.reportStatus || "ยังไม่รายงาน"),
    reportDate: _bFormatDate(row.reportDate || extra.reportDate || ""), totalAmount: Number(row.totalAmount != null && row.totalAmount !== "" ? row.totalAmount: row.amount) || 0,
    meetingAllowance: Number(row.meetingAllowance || 0), snackCost: Number(row.snackCost || 0), lunchCost: Number(row.lunchCost || 0), travelCost: Number(row.travelCost || 0),
    receptionCost: Number(row.receptionCost || 0), seminarCost: Number(row.seminarCost || 0), foreignTripCost: Number(row.foreignTripCost || 0),
    foreignGuestCost: Number(row.foreignGuestCost || 0), supportCost: _budgetResolveSupportCostAmount_(row, extra), visitLocations: String(row.visitLocations || row.visitLocationsText || ""),
    seminarLocations: String(row.seminarLocations || row.seminarLocationsText || ""), countriesText: String(row.countriesText || ""), category: String(row.category || ""),
    item: String(row.item || ""), extra, refundAgingDays: _budgetAgingDays_(row, extra, "refund"), reportAgingDays: _budgetAgingDays_(row, extra,
    "report")
})
}
function _mapBudgetImportListRowLite_(row) {
  var extra = _budgetParsePayloadExtra_(row = row || {
}, []), rowFy = _budgetRowFyLite_(row);
  return _budgetImportDto_({
    id: String(row.id || ""), fy: rowFy, entryType: String(row.entryType || row.category || row.ประเภท || ""), committeeType: String(row.committeeType || ""),
    startDate: _bFormatDate(row.startDate || row.activityDate || ""), endDate: _bFormatDate(row.endDate || row.activityDate || ""), activityDate: _bFormatDate(row.activityDate || row.startDate || ""),
    seminarDate: _bFormatDate(row.seminarDate || extra.semDate || ""), committeeName: String(row.committeeName || ""), roundNo: String(row.roundNo || extra.roundNo || ""),
    topic: String(row.topic || row.item || ""), amount: _b32N_(row.amount || row.totalAmount || extra.rowAmount), committeeResponsible: String(row.committeeResponsible || ""),
    staffResponsible: String(row.staffResponsible || ""), note: String(row.note || ""), refundStatus: String(row.refundStatus || "ยังไม่คืนเงิน"),
    refundDate: _bFormatDate(row.refundDate || extra.refundDate || ""), reportStatus: String(row.reportStatus || "ยังไม่รายงาน"), reportDate: _bFormatDate(row.reportDate || extra.reportDate || ""),
    totalAmount: _b32N_(row.totalAmount || row.amount || extra.rowAmount), meetingAllowance: _b32N_(row.meetingAllowance || extra.meetingAllowance),
    snackCost: _b32N_(row.snackCost || extra.snackCost), lunchCost: _b32N_(row.lunchCost || extra.lunchCost), travelCost: _b32N_(row.travelCost || extra.travelCost),
    receptionCost: _b32N_(row.receptionCost || extra.receptionCost), seminarCost: _b32N_(row.seminarCost || extra.seminarCost), foreignTripCost: _b32N_(row.foreignTripCost || extra.foreignTripCost),
    foreignGuestCost: _b32N_(row.foreignGuestCost || extra.foreignGuestCost), supportCost: _budgetResolveSupportCostAmount_(row, extra), visitLocations: String(row.visitLocations || row.visitLocationsText || ""),
    seminarLocations: String(row.seminarLocations || row.seminarLocationsText || ""), countriesText: String(row.countriesText || extra.countriesText || ""),
    category: String(row.category || ""), item: String(row.item || extra.supportType || ""), extra, refundAgingDays: _budgetAgingDays_(row, extra,
    "refund"), reportAgingDays: _budgetAgingDays_(row, extra, "report")
})
}
function _mapBudgetImportListRowFastLite_(row) {
  row = row || {
};
  var warnings = [], extra = {
};
  try {
    extra = _budgetParsePayloadExtra_(row, warnings)
}
  catch(_extraErr) {
    extra = {
}
}
  var rowFy = _budgetRowFyLite_(row) || _budgetRowFiscalYearForList_(row), startDate = row.startDate || row.activityDate || extra.startDate || extra.activityDate || "",
  endDate = row.endDate || row.activityDate || extra.endDate || extra.activityDate || "", activityDate = row.activityDate || row.startDate || extra.activityDate || extra.startDate || "";
  return _budgetImportDto_({
    id: String(row.id || row.ID || ""), fy: rowFy, entryType: String(row.entryType || row.category || row.ประเภท || extra.entryType || extra.category || ""),
    committeeType: String(row.committeeType || extra.committeeType || ""), startDate: _bFormatDate(startDate || ""), endDate: _bFormatDate(endDate || ""),
    activityDate: _bFormatDate(activityDate || ""), seminarDate: _bFormatDate(row.seminarDate || extra.semDate || extra.seminarDate || ""), committeeName: String(row.committeeName || extra.committeeName || ""),
    roundNo: String(row.roundNo || extra.roundNo || ""), topic: String(row.topic || row.item || extra.topic || ""), amount: _b32N_(row.amount || row.totalAmount || extra.rowAmount),
    committeeResponsible: String(row.committeeResponsible || extra.committeeResponsible || ""), staffResponsible: String(row.staffResponsible || extra.staffResponsible || ""),
    note: String(row.note || extra.note || ""), refundStatus: String(row.refundStatus || extra.refundStatus || "ยังไม่คืนเงิน"), refundDate: _bFormatDate(row.refundDate || extra.refundDate || ""),
    reportStatus: String(row.reportStatus || extra.reportStatus || "ยังไม่รายงาน"), reportDate: _bFormatDate(row.reportDate || extra.reportDate || ""),
    totalAmount: _b32N_(row.totalAmount || row.amount || extra.rowAmount), meetingAllowance: _b32N_(row.meetingAllowance || extra.meetingAllowance),
    snackCost: _b32N_(row.snackCost || extra.snackCost), lunchCost: _b32N_(row.lunchCost || extra.lunchCost), travelCost: _b32N_(row.travelCost || extra.travelCost),
    receptionCost: _b32N_(row.receptionCost || extra.receptionCost), seminarCost: _b32N_(row.seminarCost || extra.seminarCost), foreignTripCost: _b32N_(row.foreignTripCost || extra.foreignTripCost),
    foreignGuestCost: _b32N_(row.foreignGuestCost || extra.foreignGuestCost), supportCost: _budgetResolveSupportCostAmount_(row, extra), visitLocations: String(row.visitLocations || row.visitLocationsText || extra.visitLocationsText || ""),
    seminarLocations: String(row.seminarLocations || row.seminarLocationsText || extra.seminarLocationsText || ""), countriesText: String(row.countriesText || extra.countriesText || ""),
    category: String(row.category || extra.category || ""), item: String(row.item || extra.supportType || ""), extra, refundAgingDays: row.refundAgingDays || "",
    reportAgingDays: row.reportAgingDays || "", fastLite: !0
})
}
function _budgetDirectSheetObjects_(sheetName, options) {
  sheetName = String(sheetName || "").trim();
  var ttl = (options = options || {
}).forceFresh === !0 ? 0: options.ttl != null ? options.ttl: 240, fields = sheetName === "BudgetImports" ? _budgetImportCanonicalFields_(): _budgetProjectedFields_(sheetName);
  return typeof readRepositoryRows_ == "function" ? readRepositoryRows_(sheetName, fields, {
    includeDeleted: !1, requireCanonical: !1, ttl, forceFresh: options.forceFresh === !0 || options.noCache === !0 || options.bypassCache === !0 || options.bypassRequestCache === !0,
    owner: "budget." + sheetName
}) || []: _budgetDataServiceRows_(sheetName, fields, {
    includeDeleted: !1, requireCanonical: !1, ttl, forceFresh: options.forceFresh === !0 || options.noCache === !0 || options.bypassCache === !0 || options.bypassRequestCache === !0,
    noCache: options.noCache === !0, bypassCache: options.bypassCache === !0, bypassRequestCache: options.bypassRequestCache === !0
}) || []
}
function _budgetListImportRowsRobust_(options) {
  options = options || {
};
  var bypass = _budgetCachePolicyBypass_(options) || options.forceFresh === !0 || options.noCache === !0 || options.bypassCache === !0 || options.bypassRequestCache === !0,
  cacheStamp, cacheKey = "budgetimports:active:current:r77:" + (_appIsFnName_("_entityCacheStamp_") ? _entityCacheStamp_("budgetimports"): "1");
  if(! bypass)try {
    var hit = _AppScriptCache_().get(cacheKey);
    if(hit)return JSON.parse(hit) || []
}
  catch(_cacheReadErr) {
    _b32W_("ec", _cacheReadErr)
}
  var rows = [];
  try {
    rows = _budgetDirectSheetObjects_("BudgetImports", {
      forceFresh: bypass, noCache: bypass, bypassCache: bypass, bypassRequestCache: bypass, ttl: bypass ? 0: 240
})
}
  catch(_directErr) {
    _recordWarning_("core.budget.import.directRows", _directErr), rows = []
}
  rows = (_b32A_(rows)).filter(function(row) {
    var del = String((row || {
}).isDeleted || (row || {
}).deleted || "").trim().toLowerCase();
    return ! (del === "true" || del === "1" || del === "deleted" || del === "ลบ")
});
  if(! bypass)try {
    safeCachePut_(_AppScriptCache_(), cacheKey, rows, 240)
}
  catch(_cachePutErr) {
    _b32W_("ec", _cachePutErr)
}
  return rows
}
function _budgetTypeSummaryHeaderKey_(value) {
  return String(value == null ? "": value).replace(/[\s\n\r\t_\-–—()（）\[\]{}:：/\\.]+/g, "").toLowerCase()
}
function _budgetTypeSummaryPick_(row, keys) {
  return typeof AppBackendCore != "undefined" && AppBackendCore.pickNormalized ? AppBackendCore.pickNormalized(row || {
}, keys, ""): ""
}
function _budgetTypeSummaryOwnerPolicy_() {
  return {
    contractStamp: "budget-single-source-type-summary-current", owner: "BudgetImports", sourceOfTruth: "BudgetImports", readOwner: "BudgetImports",
    writeOwner: "BudgetImports", editOwner: "BudgetImports", materializedSheet: "BudgetTypeSummary_current", readModelRole: "cache/report-only",
    materializedRole: "cache/report-read-model-only", readPath: "BudgetImports/direct-aggregate -> optional cache metadata only", archivedReadPathDisabled: !0,
    readModelFirst: !1, materializedFirst: !1, includePersonnelCompensation: !1, detailReadOwner: "BudgetImports", rebuildSource: "BudgetImports",
    liveImportDefaultAllowed: !0, liveImportDirectRead: !0, boundedDetailCache: !1, maxDetailScanRows: 1800, strictFiscalYear: !0, readThroughRefreshOnMiss: !1,
    mutationRefresh: !1, deferredReadModelRefresh: !0, preserveOtherFiscalYears: !0, replaceStrategy: "single-source-of-truth; BudgetImports is the only runtime read/write/edit source; BudgetTypeSummary remains cache/report model only",
    publicBridgeApi: "apiBudgetGetTypeSummaryByFY"
}
}
function _budgetGetOptionalSheet_(sheetName) {
  try {
    return getSpreadsheet_().getSheetByName(String(sheetName || ""))
}
  catch(_e) {
    return _b32W_("observed.catch", _e, {
      file: "C32"
}), null
}
}
function _budgetTypeSummaryFyFromRow_(row) {
  row = row || {
};
  var fy = String(_budgetTypeSummaryPick_(row, _B32FY) || "").replace(/[^0-9]/g, "");
  if(fy)return fy;
  try {
    fy = (_appIsFnName_("_budgetRowFiscalYearForList_") ? _budgetRowFiscalYearForList_(row): "") || ""
}
  catch(_fyListErr) {
    fy = ""
}
  if(fy)return String(fy).replace(/[^0-9]/g, "");
  try {
    fy = (_appIsFnName_("_budgetRowFyLite_") ? _budgetRowFyLite_(row): "") || ""
}
  catch(_fyLiteErr) {
    fy = ""
}
  return String(fy || "").replace(/[^0-9]/g, "")
}
function _budgetTypeSummaryImportSourceRows_(fy, options) {
  options = options || {
}, fy = String(fy || "").replace(/[^0-9]/g, "") || _budgetNoWaitNormalizeFy_({
});
  var raw = [], ttl = options.forceFresh === !0 ? 0: Math.max(60, Math.min(Number(options.ttl || 240) || 240, 600));
  try {
    raw = _budgetDirectSheetObjects_("BudgetImports", {
      forceFresh: options.forceFresh === !0, ttl
}) || []
}
  catch(_directErr) {
    try {
      raw = _budgetNoWaitReadRows_("BudgetImports", _budgetImportCanonicalFields_(), ttl) || []
}
    catch(_readErr) {
      _b32W_("budget.typeSummary.importSourceRows", _readErr, {
        fy, sourceOfTruth: "BudgetImports"
}), raw = []
}
}
  return(_b32A_(raw)).filter(function(r) {
    if(! r || _budgetNoWaitDeleted_(r))return !1;
    var rowFy = _budgetTypeSummaryFyFromRow_(r);
    return ! fy || rowFy === fy
}).map(function(r) {
    return _budgetFastTypeDto_(r, fy)
})
}
function _budgetRowFiscalYearForList_(row) {
  var extra = (row = row || {
}).extra || {
};
  if(typeof extra == "string")try {
    extra = JSON.parse(extra) || {
}
}
  catch(_extraJsonErr) {
    extra = {
}
}
  var rowFy = _b32FY_(row.fy || row.FY || row.fiscalYear || row.budgetFy || row.budgetYear || row.year || row.ปีงบประมาณ || row.ปีงบ || extra.fy || extra.FY || extra.fiscalYear || extra.budgetFy || extra.budgetYear || extra.year || extra.ปีงบประมาณ || extra.ปีงบ);
  if(rowFy)return rowFy;
  for(var dateFields = ["activityDate", "startDate", "endDate", "seminarDate", "date", "meetingDate", "travelDate", "travelStartDate", "travelEndDate",
  "visitDate", "refundDate", "reportDate", "paidDate", "paymentDate", "createdAt", "updatedAt", "วันที่", "วันเดือนปี", "วันที่ประชุม", "วันที่เดินทาง",
  "วันที่เริ่ม", "วันที่สิ้นสุด", "วันคืนเงิน", "วันรายงาน"], i = 0;
  i < dateFields.length;
  i++) {
    var key = dateFields[i], baseDate, d = _budgetParseDate_(row[key] || extra[key] || "" || "");
    if(d)return String(d.getMonth() >= 9 ? d.getFullYear() + 544: d.getFullYear() + 543)
}
  return""
}
function listBudgetImportRecordsByFY(fy) {
  try {
    var payload = fy && typeof fy == "object" && ! Array.isArray(fy) ? fy:  {
      fy
}, targetFy = String(payload.fy || "").replace(/[^\d]/g, "") || _resolveBudgetDefaultFiscalYear_(), page = Math.max(1, Number(payload.page || 1) || 1),
    requestedLimit = Math.max(0, Math.min(Number(payload.limit || payload.pageSize || 0) || 0, 5e3)), liteMode = payload.lite === !0 || String(payload.lite || "").toLowerCase() === "true",
    fastMode = payload.fast === !0 || String(payload.fast || "").toLowerCase() === "true" || liteMode, cacheStamp, cacheKey = ["budgetListByFY:current",
    _appIsFnName_("_entityCacheStamp_") ? _entityCacheStamp_("budgetimports"): "", targetFy, page, requestedLimit || 0, liteMode ? "lite": "full",
    fastMode ? "fast": "normal"].join(":");
    if(payload.forceFresh !== !0 && _appIsFnName_("_cacheGetJson_")) {
      var cachedList = _cacheGetJson_(cacheKey);
      if(cachedList && Array.isArray(cachedList.rows))return cachedList.cached = !0, cachedList.cacheStatus = "hit", cachedList.cacheKey = cacheKey,
      cachedList.source = String(cachedList.source || "") + ":cache-hit", ok_(cachedList, "โหลดรายการงบประมาณสำเร็จ")
}
    var allRows = fastMode ? _budgetDirectSheetObjects_("BudgetImports", payload || {
}): _budgetListImportRowsRobust_(payload || {
}), rows = (_b32A_(allRows)).filter(function(row) {
      row = row || {
};
      var del = String(row.isDeleted || row.deleted || "").trim().toLowerCase();
      return ! (del === "true" || del === "1" || del === "deleted" || del === "ลบ" || targetFy && _budgetRowFiscalYearForList_(row) !== targetFy)
}).sort(function(a, b) {
      return String(b && (b.activityDate || b.startDate || b.createdAt) || "").localeCompare(String(a && (a.activityDate || a.startDate || a.createdAt) || "")) || String(b && b.id || "").localeCompare(String(a && a.id || ""))
}), totalRecords = rows.length, limit = requestedLimit || totalRecords, start = requestedLimit ? (page - 1) * limit: 0, pageRows, result = {
      rows: (requestedLimit ? rows.slice(start, start + limit): rows).map(fastMode ? _mapBudgetImportListRowFastLite_: liteMode ? _mapBudgetImportListRowLite_: _mapBudgetImportListRow_),
      totalRecords, page, limit, pageSize: limit, totalPages: limit ? Math.max(1, Math.ceil(totalRecords / limit)): 1, isPaged:  ! ! requestedLimit,
      serverPaged:  ! ! requestedLimit, lite: liteMode, fast: fastMode, fy: targetFy, source: fastMode ? "BudgetImports/current-direct-page": "BudgetImports/current-repository-page",
      cached: !1, cacheStatus: "miss", cacheKey, contractStamp: "budget-list-dto-current"
};
    return _appIsFnName_("_cachePutJson_") && _cachePutJson_(cacheKey, result, Math.max(30, Math.min(Number(payload.cacheTtlSeconds || 90) || 90,
    300))), ok_(result, "โหลดรายการงบประมาณสำเร็จ")
}
  catch(e) {
    return err_(e && e.message ? e.message: String(e), {
      rows: [], totalRecords: 0, page: 1, limit: 0, totalPages: 1, serverPaged: !1
})
}
}
function _budgetAfterTypeSummaryMutation_(record, reason) {
  var fy = _budgetTypeSummaryFyFromRow_(record = record || {
}) || _budgetNoWaitNormalizeFy_(record), refresh = null, warning = "", dirtyMarker = null;
  try {
    _appIsFnName_("_AppCacheInvalidateDomain_") && (_AppCacheInvalidateDomain_("budget"), _AppCacheInvalidateDomain_("budgetimports"), _AppCacheInvalidateDomain_("dashboard"))
}
  catch(_cacheErr) {
    _b32W_("budget.singleSource.cacheInvalidate", _cacheErr, {
      fy, reason
})
}
  try {
    dirtyMarker = _appIsFnName_("_budgetMarkTypeSummaryDirty_") ? _budgetMarkTypeSummaryDirty_(_b32O_({
}, record, {
      fy
}), reason || "budget-mutation"): null
}
  catch(_dirtyErr) {
    warning = String(_dirtyErr && _dirtyErr.message || _dirtyErr), _b32W_("budget.singleSource.dirtyMarker", _dirtyErr, {
      fy, reason
})
}
  try {
    var explicitRefresh;
    (record.syncReadModelRefresh === !0 || record.forceReadModelRefresh === !0 || record.refreshReadModelNow === !0) && fy && _appIsFnName_("_budgetRefreshTypeSummaryReadModel_") && (refresh = _budgetRefreshTypeSummaryReadModel_(_b32O_({
}, record, {
      fy, fiscalYear: fy, forceFresh: !0, singleSourceExplicitRefresh: !0
})))
}
  catch(_refreshErr) {
    warning = String(_refreshErr && _refreshErr.message || _refreshErr), _b32W_("budget.singleSource.explicitReadModelRefresh", _refreshErr, {
      fy, reason
})
}
  return {
    fy, dirty:  ! refresh, refresh, warning, dirtyMarker, owner: "BudgetImports", sourceOfTruth: "BudgetImports", materializedSheet: "BudgetTypeSummary_current",
    readModelRole: "cache/report-read-model-only", reason: String(reason || "budget-mutation"), deferredReadModelRefresh:  ! refresh
}
}
function budgetUnifiedListByFY(fy) {
  return listBudgetImportRecordsByFY(fy)
}
function _budgetFastWriteSchemaGate_(p, op) {
  p = p || {
};
  var operation = String(op || "write"), mustEnsure = operation === "saveImport" || p.ensureSchema === !0 || p.schemaRepair === !0 || p.forceSchemaEnsure === !0 || p.ensureHeaders === !0,
  before = null, after = null, added = [];
  try {
    before = typeof getCanonicalHeaderAudit_ == "function" ? getCanonicalHeaderAudit_("BudgetImports"):  {
      missing: []
};
    var missing = before && Array.isArray(before.missing) ? before.missing.slice(): [];
    if(mustEnsure && missing.length) {
      for(var sh = getSheet_("BudgetImports"), width = Math.max(1, Number(sh.getLastColumn && sh.getLastColumn()) || 1), current = sh.getRange(1,
      1, 1, width).getValues()[0] || [], headers = current.map(function(v) {
        return String(v == null ? "": v).trim()
});
      headers.length && ! headers[headers.length - 1];
)headers.pop();
      var normalizedExisting = {
};
      headers.forEach(function(h) {
        h && (normalizedExisting[String(h).replace(/[\s_\-()（）]/g, "").toLowerCase()] = !0)
});
      var required = typeof BUDGET_IMPORT_SCHEMA != "undefined" && Array.isArray(BUDGET_IMPORT_SCHEMA) ? BUDGET_IMPORT_SCHEMA.slice(): missing.slice();
      if(required.forEach(function(h) {
        if(h = String(h || "").trim(), ! ! h) {
          var nk = h.replace(/[\s_\-()（）]/g, "").toLowerCase();
          normalizedExisting[nk] || (headers.push(h), normalizedExisting[nk] = !0, added.push(h))
}
}), added.length) {
        sh.getRange(1, 1, 1, headers.length).setValues([headers]);
        try {
          sh.setFrozenRows(1)
}
        catch(_freezeErr) {
}
        typeof invalidateSheetCache_ == "function" && invalidateSheetCache_("BudgetImports"), typeof AppRepository != "undefined" && AppRepository && typeof AppRepository.flush == "function" && AppRepository.flush()
}
}
    after = typeof getCanonicalHeaderAudit_ == "function" ? getCanonicalHeaderAudit_("BudgetImports"):  {
      missing: []
};
    var remaining = after && Array.isArray(after.missing) ? after.missing.slice(): [];
    return remaining.length ?  {
      ok: !1, operation, sheet: "BudgetImports", ensured: added.length > 0, added, missing: remaining, error: "ชีต BudgetImports ขาดหัวตารางสำคัญ: " + remaining.join(", ")
}:  {
      ok: !0, operation, sheet: "BudgetImports", ensured: added.length > 0, added, missing: []
}
}
  catch(e) {
    return _b32W_("budget.schema.ensure." + operation, e, {
      sheet: "BudgetImports"
}), {
      ok: !1, operation, sheet: "BudgetImports", ensured: added.length > 0, added, missing: after && after.missing || before && before.missing || [],
      error: String(e && e.message || e || "ตรวจ schema งบประมาณไม่สำเร็จ")
}
}
}
function _budgetFastVerifyWrite_(p, id) {
  p = p || {
};
  var verifyRequested = p.verifyWrite === !0 || p.strictWriteVerify === !0 || p.forceWriteVerify === !0, targetId = String(id || "").trim();
  if(! verifyRequested)return {
    ok: !0, verified: !1, skipped: !0, id: targetId, source: "BudgetImports/repository-read"
};
  if(! targetId)return {
    ok: !1, verified: !1, id: "", error: "WRITE_VERIFY_ID_REQUIRED", source: "BudgetImports/direct-fresh-key-index"
};
  try {
    typeof SpreadsheetApp != "undefined" && SpreadsheetApp.flush ? SpreadsheetApp.flush(): typeof AppRepository != "undefined" && AppRepository && typeof AppRepository.flush == "function" && AppRepository.flush();
    var row = findSheetObjectByKey_("BudgetImports", "id", targetId, {
      includeDeleted: !0, requireCanonical: !0, bypassRequestCache: !0, forceFresh: !0, partitionBatchSize: 500
});
    return row ?  {
      ok: !0, verified: !0, row, rowNumber: Number(row._rowNumber || 0) || 0, id: targetId, source: "BudgetImports/direct-fresh-key-index",
      cacheBypassed: !0
}:  {
      ok: !1, verified: !1, id: targetId, error: "WRITE_VERIFY_NOT_FOUND", source: "BudgetImports/direct-fresh-key-index", cacheBypassed: !0
}
}
  catch(e) {
    return _b32W_("budget.save.verifyReadBack.direct", e, {
      id: targetId, sheet: "BudgetImports"
}), {
      ok: !1, verified: !1, id: targetId, error: String(e && e.message || e), source: "BudgetImports/direct-fresh-key-index", cacheBypassed: !0
}
}
}
function budgetUnifiedDeleteImport(id) {
  return domainWrite_("budgetUnifiedDeleteImport", {
    id
}, function(input) {
    var schemaGate = _budgetFastWriteSchemaGate_(input, "deleteImport");
    if(schemaGate && schemaGate.ok === !1)return err_("ตรวจ schema งบประมาณไม่สำเร็จ", schemaGate);
    var repo = _getBudgetImportRepository_(), existing = repo.findByKey(input.id, {
      includeDeleted: !0, requireCanonical: !0
}), deleted = repo.softDelete(input.id), cacheInvalidation = _appIsFnName_("_invalidateBudgetDerivedCaches_") ? _invalidateBudgetDerivedCaches_("budgetUnifiedDeleteImport"):  {
}, typeSummaryRefresh = deleted ? _budgetAfterTypeSummaryMutation_(existing || {
      id: input.id, fy: _budgetNoWaitNormalizeFy_({
})
}, "deleteImport"): null;
    return deleted ? ok_({
      id: input.id, fy: typeSummaryRefresh && typeSummaryRefresh.fy, cacheInvalidation: cacheInvalidation || {
}, typeSummaryRefresh
}, "ลบรายการงบประมาณสำเร็จ"): err_("ไม่พบรหัสรายการ")
})
}
function budgetUnifiedUpdateStatuses(id, refundStatus, reportStatus, statusPayload) {
  var request = id && typeof id == "object" ? _b32O_({
}, id): _b32O_({
}, statusPayload || {
}, {
    id, refundStatus, reportStatus
});
  return domainWrite_("budgetUnifiedUpdateStatuses", request, function(input) {
    var schemaGate = _budgetFastWriteSchemaGate_(input, "updateStatuses");
    if(schemaGate && schemaGate.ok === !1)return err_("ตรวจ schema งบประมาณไม่สำเร็จ", schemaGate);
    var repo = _getBudgetImportRepository_(), existing = repo.findByKey(input.id, {
      includeDeleted: !0, requireCanonical: !0
});
    if(! existing)return err_("ไม่พบรายการ");
    var patch = {
};
    input.refundStatus && (patch.refundStatus = input.refundStatus), input.refundDate && (patch.refundDate = _budgetDateToIso_(input.refundDate) || input.refundDate),
    input.reportStatus && (patch.reportStatus = input.reportStatus), input.reportDate && (patch.reportDate = _budgetDateToIso_(input.reportDate) || input.reportDate);
    var mergedStatusRecord = _b32O_({
}, existing, patch);
    _withBudgetStatusFreeze_(mergedStatusRecord, existing), repo.upsert(input.id, mergedStatusRecord);
    var cacheInvalidation = _appIsFnName_("_invalidateBudgetDerivedCaches_") ? _invalidateBudgetDerivedCaches_("budgetUnifiedUpdateStatuses"):  {
}, typeSummaryRefresh = _budgetAfterTypeSummaryMutation_(mergedStatusRecord, "updateStatuses");
    return ok_({
      id: input.id, fy: typeSummaryRefresh && typeSummaryRefresh.fy, refundStatus: patch.refundStatus || existing.refundStatus || "", reportStatus: patch.reportStatus || existing.reportStatus || "",
      cacheInvalidation: cacheInvalidation || {
}, typeSummaryRefresh
}, "อัปเดตสถานะสำเร็จ")
})
}
function _normalizeBudgetClassification_(input) {
  input = input || {
};
  var entry = String(input.entryType || input.category || "").trim(), supportType = String(input.extra && input.extra.supportType || input.supportType || "").trim(),
  aliases = {
    การศึกษาดูงานในประเทศและจัดสัมมนา: "การศึกษาดูงานในประเทศและการจัดสัมมนา", จัดสัมมนา: "การจัดสัมมนา", การเดินทางศึกษาดูงานต่างประเทศ: "การศึกษาดูงานต่างประเทศ",
    ส่งเสริมและสนับสนุนการดำเนินการ: "ส่งเสริมและสนับสนุนการดำเนินงาน"
};
  entry = aliases[entry] || entry, supportType = aliases[supportType] || supportType, input.entryType = entry, input.category = input.category || entry,
  input.extra = input.extra && typeof input.extra == "object" && ! Array.isArray(input.extra) ? input.extra:  {
}, supportType && (input.extra.supportType = supportType);
  var effective = supportType || entry;
  return input.item || (input.item = effective), input.fy || (input.fy = _currentFiscalYearThai_(new Date)), input.fy = _b32FY_(input.fy) || String(input.fy || ""),
  input
}
function _budgetDateParseMeta_(value) {
  if(_appIsFnName_("_systemDateParseMetaForAudit_"))try {
    return _systemDateParseMetaForAudit_(value)
}
  catch(_budgetDateOwnerErr) {
    _b32W_("budget.dateParse.platformOwnerFailed", _budgetDateOwnerErr)
}
  if(value == null || value === "")return {
    valid: !0, empty: !0, date: null, reason: "empty"
};
  if(Object.prototype.toString.call(value) === "[object Date]" && ! isNaN(value.getTime()))return {
    valid: !0, date: value, reason: "date-object"
};
  var raw = String(value || "").trim(), parsed = new Date(raw);
  return isNaN(parsed.getTime()) ?  {
    valid: !1, date: null, reason: "unparseable"
}:  {
    valid: !0, date: parsed, reason: "date-parse"
}
}
function _budgetParseDate_(value) {
  var meta = _budgetDateParseMeta_(value);
  return meta && meta.valid ? meta.date: null
}
function _budgetDateToIso_(value) {
  var meta = _budgetDateParseMeta_(value);
  return meta && meta.valid && meta.date ? Utilities.formatDate(meta.date, Session.getScriptTimeZone(), "yyyy-MM-dd"): ""
}
function _budgetValidateInputDates_(input) {
  input = input || {
};
  var invalid = [];
  return["startDate", "endDate", "activityDate", "seminarDate", "refundDate", "reportDate"].forEach(function(field) {
    var value = input[field];
    if(value != null && String(value).trim() !== "") {
      var meta = _budgetDateParseMeta_(value);
      meta && meta.valid || invalid.push(field + "=" + String(value) + " (" + String(meta && meta.reason || "invalid") + ")")
}
}), invalid
}
function _budgetHolidayKeyMap_() {
  var map = {
};
  try {
    var rows;
    readSheetObjects_("SystemSettings", {
      includeDeleted: !1
}).forEach(function(r) {
      var key = String(r.key || r.name || "").trim(), val = String(r.value || r.date || "").trim(), active = String(r.active == null ? "Y": r.active).trim().toUpperCase();
      if(active !== "N" && active !== "FALSE" && active !== "0") {
        if(/^(thaiHoliday|holiday|systemHoliday)/i.test(key)) {
          addHolidayKey(val);
          try {
            var parsed = JSON.parse(val);
            Array.isArray(parsed) && parsed.forEach(addHolidayKey)
}
          catch(_json) {
            _b32W_("budget.holiday.parse", _json, {
              key
})
}
}
        add(key), add(val)
}
      function addHolidayKey(v) {
        v = String(v || "").trim(), (/^\d{4}-\d{2}-\d{2}$/.test(v) || /^\d{2}-\d{2}$/.test(v)) && (map[v] = !0)
}
})
}
  catch(_e) {
    _b32W_("budget.holiday.load", _e)
}
  return map
}
function _budgetIsThaiPublicHoliday_(d) {
  if(! d || Object.prototype.toString.call(d) !== "[object Date]" || isNaN(d.getTime()))return !1;
  var yyyy = d.getFullYear(), key = String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"), map = _budgetHolidayKeyMap_();
  return ! (! map[yyyy + "-" + key] && ! map[key])
}
function _budgetBusinessDaysSince_(dateText, endDate) {
  var s = _budgetParseDate_(dateText), e = _budgetParseDate_(endDate || new Date) || new Date;
  if(! s || isNaN(s.getTime()) || ! e || isNaN(e.getTime()))return 0;
  s.setHours(0, 0, 0, 0), e.setHours(0, 0, 0, 0);
  var count = 0, cur = new Date(s.getTime());
  for(cur.setDate(cur.getDate() + 1);
  cur <= e;
) {
    var day = cur.getDay();
    day === 0 || day === 6 || _budgetIsThaiPublicHoliday_(cur) || count++, cur.setDate(cur.getDate() + 1)
}
  return count
}
function _budgetAgingBaseDate_(row) {
  row = row || {
};
  var entry = String(row.entryType || "").trim();
  return entry === "การประชุมคณะกรรมาธิการ" || entry === "การประชุมคณะอนุกรรมาธิการ" ? row.activityDate || row.startDate || row.endDate || "": row.endDate || row.activityDate || row.startDate || ""
}
function _budgetAgingEndDate_(row, extra, kind) {
  row = row || {
}, extra = extra || {
};
  var status = String(kind === "report" ? row.reportStatus: row.refundStatus || "").trim(), explicit, explicitIso = _budgetDateToIso_((kind === "report" ? row.reportDate || extra.reportDate || "": row.refundDate || extra.refundDate || "") || ""),
  done;
  return explicitIso || _budgetStatusDone_(status, kind) && (extra[kind + "StatusFrozenAt"] || row.updatedAt) || new Date
}
function _budgetCanonicalText_(value) {
  return String(value == null ? "": value).replace(/[​-‍\uFEFF]/g, "").replace(/\s+/g, " ").trim()
}
function _budgetCanonicalAmount_(row) {
  var value = (row = row || {
}).amount;
  value != null && value !== "" || (value = row.totalAmount), value = String(value == null ? "": value).replace(/,/g, "").trim();
  var n = Number(value || 0);
  return isFinite(n) ? n: 0
}
function _budgetCanonicalImportBase_(row) {
  var amount = _budgetCanonicalAmount_(row = row || {
}), category, item;
  return {
    amount, totalAmount: amount, category: _budgetCanonicalText_(row.category || row.item || row.entryType || ""), item: _budgetCanonicalText_(row.item || row.category || row.entryType || ""),
    fy: _budgetCanonicalText_(row.fy || row.fiscalYear || ""), entryType: _budgetCanonicalText_(row.entryType || row.type || ""), schemaStamp: "domain-schema-budget-current"
}
}
function _budgetStatusDto_(row, extra, kind) {
  row = row || {
}, extra = extra || {
};
  var status = String(kind === "report" ? row.reportStatus: row.refundStatus || "").trim() || (kind === "report" ? "ยังไม่รายงาน": "ยังไม่คืนเงิน"),
  done = _budgetStatusDone_(status, kind), days = Number(_budgetAgingDays_(row, extra, kind) || 0) || 0, threshold = kind === "report" ? 15: 1,
  overdue = ! done && days > threshold, state;
  return {
    status, label: status, done, days, threshold, overdue, state: done ? "done": overdue ? "overdue": "pending", badgeClass: done ? "bg-success": overdue ? "bg-danger": "bg-warning text-dark",
    textClass: overdue ? "text-danger fw-bold": "text-muted", rowClass: overdue ? "table-danger": done ? "table-success": ""
}
}
function _budgetImportDto_(mappedRow) {
  var extra = (mappedRow = mappedRow || {
}).extra || {
}, canonical = _budgetCanonicalImportBase_(mappedRow), statusRow = _b32O_({
}, mappedRow, canonical), refund = _budgetStatusDto_(statusRow, extra, "refund"), report = _budgetStatusDto_(statusRow, extra, "report");
  return _b32O_({
}, mappedRow, canonical, {
    refundStatusLabel: refund.label, refundDone: refund.done, refundAgingDays: refund.days, refundAgingState: refund.state, refundBadgeClass: refund.badgeClass,
    refundTextClass: refund.textClass, refundRowClass: refund.rowClass, reportStatusLabel: report.label, reportDone: report.done, reportAgingDays: report.days,
    reportAgingState: report.state, reportBadgeClass: report.badgeClass, reportTextClass: report.textClass, reportRowClass: report.rowClass, agingState: report.overdue || refund.overdue ? "overdue": report.done && refund.done ? "done": "pending",
    rowClass: report.overdue || refund.overdue ? "table-danger": report.done && refund.done ? "table-success": "", canonicalCategoryKey: _budgetCanonicalText_(canonical.category).toLowerCase(),
    canonicalItemLabel: canonical.item || canonical.category, schemaStamp: canonical.schemaStamp, contractStamp: "budget-import-dto-current"
})
}
function _budgetAgingDays_(row, extra, kind) {
  row = row || {
}, extra = extra || {
};
  var explicit = kind === "report" ? row.reportDate || extra.reportDate || "": row.refundDate || extra.refundDate || "";
  if(_budgetDateToIso_(explicit || ""))return _budgetBusinessDaysSince_(_budgetAgingBaseDate_(row), explicit);
  var daysKey = kind + "StatusFrozenDays";
  return extra[daysKey] != null && extra[daysKey] !== "" ? Number(extra[daysKey] || 0): _budgetBusinessDaysSince_(_budgetAgingBaseDate_(row),
  _budgetAgingEndDate_(row, extra, kind))
}
function _withBudgetStatusFreeze_(record, existing) {
  record = record || {
}, existing = existing || {
};
  var ex = {
};
  try {
    ex = record.payloadJson || record.payloadJSON ? JSON.parse(record.payloadJson || record.payloadJSON):  {
}
}
  catch(_e) {
    ex = {
}
}
  var oldEx = {
};
  try {
    oldEx = existing.payloadJson || existing.payloadJSON ? JSON.parse(existing.payloadJson || existing.payloadJSON):  {
}
}
  catch(_e2) {
    oldEx = {
}
}
  return[{
    kind: "refund", statusKey: "refundStatus", doneWord: "คืนเงินแล้ว"
}, {
    kind: "report", statusKey: "reportStatus", doneWord: "รายงานแล้ว"
}].forEach(function(cfg) {
    var dateKey = cfg.kind + "StatusFrozenAt", daysKey = cfg.kind + "StatusFrozenDays", status = String(record[cfg.statusKey] || "").trim(), done;
    if(status.indexOf(cfg.doneWord) !== - 1 || status.indexOf("แล้ว") !== - 1 && status.indexOf("ยังไม่") === - 1 || cfg.kind === "refund" && status.indexOf("ไม่มีการยืมเงิน") !== - 1) {
      var explicitDoneDate, explicitIso = _budgetDateToIso_((cfg.kind === "refund" ? record.refundDate: record.reportDate) || "");
      ex[dateKey] = explicitIso || oldEx[dateKey] || ex[dateKey] || Utilities.formatDate(new Date, Session.getScriptTimeZone(), "yyyy-MM-dd"),
      ex[daysKey] = explicitIso || oldEx[daysKey] == null || oldEx[daysKey] === "" ? _budgetBusinessDaysSince_(_budgetAgingBaseDate_(record),
      ex[dateKey]): Number(oldEx[daysKey] || 0)
}
}), record.payloadJson = JSON.stringify(ex), record.payloadJSON = record.payloadJson, record
}
function _ensureBudgetImportExtendedFormHeaders_() {
  var fields = ["subcommitteeName", "seminarTitle", "supportType", "detail", "guestCountry", "visitPlace", "visitProvince", "visitDistrict", "visitSubDistrict",
  "visitSubdistrict", "visitLocationsText", "visitLocationsJson", "visitLocationsJSON", "seminarPlace", "seminarProvince", "seminarDistrict",
  "seminarSubDistrict", "seminarSubdistrict", "seminarLocationsText", "seminarLocationsJson", "seminarLocationsJSON", "seminarItemsJson", "countriesJson",
  "countriesJSON", "payloadJson", "payloadJSON", "extraJson", "budget-entry-type", "budget-common-staff-resp", "budget-committee-type", "budget-start-date",
  "budget-end-date", "budget-activity-date", "budget-committee-name", "budget-subcommittee-name", "budget-topic", "budget-seminar-title", "budget-total-amount",
  "budget-committee-responsible", "budget-note", "budget-common-refund-status", "budget-common-refund-date", "budget-common-report-status", "budget-common-report-date",
  "budget-round-no", "budget-seminar-date", "budget-visit-place", "budget-visit-province", "budget-visit-district", "budget-visit-subdistrict",
  "budget-seminar-place", "budget-seminar-province", "budget-seminar-district", "budget-seminar-subdistrict", "budget-countries-text", "budget-meeting-allowance",
  "budget-snack-cost", "budget-lunch-cost", "budget-travel-cost", "budget-reception-cost", "budget-seminar-cost", "budget-foreign-trip-cost",
  "budget-foreign-guest-cost", "budget-support-cost", "budget-support-type", "entryType", "staffResponsible", "committeeType", "startDate", "endDate",
  "activityDate", "committeeName", "topic", "amount", "totalAmount", "committeeResponsible", "note", "refundStatus", "refundDate", "reportStatus",
  "reportDate", "roundNo", "seminarDate", "meetingAllowance", "snackCost", "lunchCost", "travelCost", "receptionCost", "seminarCost", "foreignTripCost",
  "foreignGuestCost", "supportCost"], seen = {
}, added = [];
  try {
    fields.forEach(function(h) {
      if((h = String(h || "").trim()) && ! seen[h]) {
        seen[h] = !0;
        try {
          ensureHeaderColumn_("BudgetImports", h), added.push(h)
}
        catch(_e) {
          _b32W_("budget.extendedHeaders." + h, _e)
}
}
})
}
  catch(_outer) {
    _b32W_("budget.extendedHeaders", _outer)
}
  return added
}
function budgetUnifiedSaveImport(payload) {
  var BUDGET_FAST_SAVE_PATH_ENABLED = !0;
  return domainWrite_("budgetUnifiedSaveImport", payload, function(input) {
    var schemaGate = _budgetFastWriteSchemaGate_(input = _normalizeBudgetClassification_(input || {
}), "saveImport");
    if(schemaGate && schemaGate.ok === !1)return err_("ตรวจ schema งบประมาณไม่สำเร็จ", schemaGate);
    var repo = _getBudgetImportRepository_(), isNew = ! input.id, id = String(input.id || "BI-" + Date.now()).trim(), existing = isNew ? null: repo.findByKey(id,
    {
      includeDeleted: !0, requireCanonical: !0
});
    if(! isNew && ! existing)return err_("ไม่พบ ID");
    var now = _bFormatDate(new Date), invalidDates = _budgetValidateInputDates_(input);
    if(invalidDates.length)return err_("รูปแบบวันที่ไม่ถูกต้อง: " + invalidDates.join(", "));
    var dto = _budgetNormalizeImportDto_(input, existing || {
});
    input = dto.input;
    var ex = dto.extra, budgetNote = String(input.note != null && input.note !== "" ? input.note: input.remark != null && input.remark !== "" ? input.remark: ex.note != null && ex.note !== "" ? ex.note: existing && existing.note || "");
    ex.note = budgetNote;
    var amount = dto.amount, supportInputAmount = dto.supportCost, visitLocs = dto.visitLocations, seminarLocs = dto.seminarLocations, record = _b32O_({
}, existing || {
}, {
      id, fy: input.fy || existing && existing.fy || "", entryType: input.entryType || existing && existing.entryType || "", committeeType: input.committeeType || existing && existing.committeeType || "",
      startDate: _budgetDateToIso_(input.startDate || input.activityDate) || existing && existing.startDate || "", endDate: _budgetDateToIso_(input.endDate || input.activityDate) || existing && existing.endDate || "",
      activityDate: _budgetDateToIso_(input.activityDate || input.startDate) || existing && existing.activityDate || "", seminarDate: _budgetDateToIso_(ex.semDate || input.seminarDate) || existing && existing.seminarDate || "",
      committeeName: input.committeeName || existing && existing.committeeName || "", roundNo: ex.roundNo || input.roundNo || existing && existing.roundNo || "",
      topic: input.topic || existing && existing.topic || "", visitLocations: visitLocs.join(", "), seminarLocations: seminarLocs.join(", "),
      countriesText: ex.countriesText || input.countriesText || existing && existing.countriesText || "", meetingAllowance: Number(ex.meetingAllowance || 0),
      snackCost: Number(ex.snackCost || 0), lunchCost: Number(ex.lunchCost || 0), travelCost: Number(ex.travelCost || 0), receptionCost: Number(ex.receptionCost || 0),
      seminarCost: Number(ex.seminarCost || 0), foreignTripCost: Number(ex.foreignTripCost || 0), foreignGuestCost: Number(ex.foreignGuestCost || 0),
      amount, committeeResponsible: input.committeeResponsible || existing && existing.committeeResponsible || "", staffResponsible: input.staffResponsible || existing && existing.staffResponsible || "",
      note: budgetNote, createdAt: existing && existing.createdAt || now, updatedAt: now, refundStatus: input.refundStatus || existing && existing.refundStatus || "ยังไม่คืนเงิน",
      refundDate: _budgetDateToIso_(input.refundDate || ex.refundDate || "") || existing && existing.refundDate || "", reportStatus: input.reportStatus || existing && existing.reportStatus || "ยังไม่รายงาน",
      reportDate: _budgetDateToIso_(input.reportDate || ex.reportDate || "") || existing && existing.reportDate || "", subcommitteeName: input.subcommitteeName || ex.subcommitteeName || input.committeeName || existing && existing.subcommitteeName || "",
      seminarTitle: input.seminarTitle || ex.seminarTitle || input.topic || existing && existing.seminarTitle || "", supportType: ex.supportType || input.supportType || input.item || existing && existing.supportType || "",
      detail: input.detail || ex.detail || budgetNote || existing && existing.detail || "", guestCountry: input.guestCountry || ex.guestCountry || ex.countriesText || input.countriesText || existing && existing.guestCountry || "",
      visitPlace: visitLocs[0] || input.visitPlace || ex.visitPlace || existing && existing.visitPlace || "", visitProvince: visitLocs[1] || input.visitProvince || ex.visitProvince || existing && existing.visitProvince || "",
      visitDistrict: visitLocs[2] || input.visitDistrict || ex.visitDistrict || existing && existing.visitDistrict || "", visitSubDistrict: visitLocs[3] || input.visitSubDistrict || ex.visitSubDistrict || ex.visitSubdistrict || existing && existing.visitSubDistrict || "",
      seminarPlace: seminarLocs[0] || input.seminarPlace || ex.seminarPlace || existing && existing.seminarPlace || "", seminarProvince: seminarLocs[1] || input.seminarProvince || ex.seminarProvince || existing && existing.seminarProvince || "",
      seminarDistrict: seminarLocs[2] || input.seminarDistrict || ex.seminarDistrict || existing && existing.seminarDistrict || "", seminarSubDistrict: seminarLocs[3] || input.seminarSubDistrict || ex.seminarSubDistrict || ex.seminarSubdistrict || existing && existing.seminarSubDistrict || "",
      seminarItemsJson: JSON.stringify(ex.seminarItems || input.seminarItems || []), extraJson: JSON.stringify(ex || {
}), visitLocationsJson: JSON.stringify(visitLocs), visitLocationsJSON: JSON.stringify(visitLocs), seminarLocationsJson: JSON.stringify(seminarLocs),
      seminarLocationsJSON: JSON.stringify(seminarLocs), countriesJson: JSON.stringify(ex.countries || (ex.countriesText ? [ex.countriesText]: [])),
      countriesJSON: JSON.stringify(ex.countries || (ex.countriesText ? [ex.countriesText]: [])), totalAmount: amount, payloadJson: JSON.stringify(_b32O_({
}, ex, {
        contractStamp: dto.contractStamp, contractWarnings: dto.warnings || [], serverOwnedBusinessRules: !0
})), payloadJSON: JSON.stringify(_b32O_({
}, ex, {
        contractStamp: dto.contractStamp, contractWarnings: dto.warnings || [], serverOwnedBusinessRules: !0
})), category: input.category || existing && existing.category || "", item: input.item || existing && existing.item || "", supportCost: supportInputAmount,
      visitLocationsText: input.visitLocationsText || visitLocs.join(", "), seminarLocationsText: input.seminarLocationsText || seminarLocs.join(", "),
      isDeleted: !1, deletedAt: ""
});
    try {
      var passthrough = _b32O_({
}, input || {
}, ex || {
});
      Object.keys(passthrough).forEach(function(k) {
        if((k = String(k || "").trim()) && ! /^(token|csrfToken|actionToken|clientContext|extra|payload|data)$/i.test(k)) {
          var v = passthrough[k];
          if(v != null) {
            if(typeof v == "object")try {
              v = JSON.stringify(v)
}
            catch(_jsonPass) {
              v = String(v)
}
            record[k] !== void 0 && record[k] !== "" && String(k).indexOf("budget-") !== 0 || (record[k] = v)
}
}
})
}
    catch(_passErr) {
      _b32W_("budget.save.passThroughFields", _passErr, {
        id
})
}
    _withBudgetStatusFreeze_(record, existing || {
});
    var upsertResult = repo.upsert(id, record), writeVerify = _budgetFastVerifyWrite_(input, id);
    if(writeVerify && writeVerify.ok === !1)return err_("บันทึกไม่สำเร็จ: ตรวจยืนยันข้อมูลหลังเขียนลงชีต BudgetImports ไม่ผ่าน", {
      id, sheet: "BudgetImports", sourceOfTruth: "BudgetImports", writeVerified: !1, verify: writeVerify
});
    var cacheInvalidation = _appIsFnName_("_invalidateBudgetDerivedCaches_") ? _invalidateBudgetDerivedCaches_("budgetUnifiedSaveImport"):  {
}, typeSummaryRefresh = _budgetAfterTypeSummaryMutation_(record, isNew ? "saveImport:new": "saveImport:update");
    return ok_({
      id, fy: typeSummaryRefresh && typeSummaryRefresh.fy, isNew, writeVerified:  ! (! writeVerify || ! writeVerify.verified), verifySkipped:  ! (! writeVerify || ! writeVerify.skipped),
      sheet: "BudgetImports", mode: upsertResult && upsertResult.mode || "", cacheInvalidation: cacheInvalidation || {
}, typeSummaryRefresh
}, isNew ? "เพิ่มรายการงบประมาณสำเร็จ": "อัปเดตรายการงบประมาณสำเร็จ")
})
}
function apiGetSalarySettings(payload) {
  var auth = _bSafeReq_(payload, "viewer", "apiGetSalarySettings");
  return auth.ok ? (payload = auth.payload, ok_(getSalarySettings(payload.fy || payload.year || ""), "โหลดข้อมูลอัตราค่าตอบแทนสำเร็จ")): auth.result
}
function apiSaveSalarySettings(payload) {
  return writeGateway_("apiSaveSalarySettings", payload || {
}, function(input) {
    return requireAuth_(input || {
}, "admin"), saveSalarySettings(input || {
})
}, "บันทึกอัตราค่าตอบแทนสำเร็จ", "บันทึกอัตราค่าตอบแทนไม่สำเร็จ")
}
function _budgetCanonicalCacheRead_(key) {
  try {
    if(_appIsFnName_("_AppScriptCache_")) {
      var raw = _AppScriptCache_().get(String(key || ""));
      if(raw)return JSON.parse(raw)
}
}
  catch(_cacheReadErr) {
    _b32W_("budget.canonical.cache.read", _cacheReadErr)
}
  return null
}
function _budgetCanonicalCacheWrite_(key, value, ttl) {
  try {
    var policy = _budgetCachePolicy_({
      cacheTtlSeconds: ttl
}, "canonical");
    _appIsFnName_("_AppScriptCache_") && safeCachePut_(_AppScriptCache_(), String(key || ""), value, policy.ttlSeconds)
}
  catch(_cacheWriteErr) {
    _b32W_("budget.canonical.cache.write", _cacheWriteErr)
}
  return value
}
function _budgetCanonicalEntityStamp_(name) {
  try {
    return _appIsFnName_("_entityCacheStamp_") ? _entityCacheStamp_(String(name || "budgetimports")): "1"
}
  catch(_verErr) {
    return"1"
}
}
function _budgetCanonicalRowsFromSheet_(sheetName, ttl) {
  var fields;
  return _budgetNoWaitReadRows_(sheetName = String(sheetName || "").trim(), _appIsFnName_("_budgetProjectedFields_") ? _budgetProjectedFields_(sheetName): [],
  ttl === 0 ? 0: ttl || 240)
}
function _budgetBudgetSummaryRowToDto_(r, fy) {
  r = r || {
};
  var pick = typeof AppBackendCore != "undefined" && AppBackendCore.makePickNormalized ? AppBackendCore.makePickNormalized(r, ""): function(keys) {
    return _budgetTypeSummaryPick_(r, keys)
};
  function money(keys) {
    return _b32N_(pick(keys))
}
  function moneyPositive(keys) {
    return _budgetPickFirstPositiveMoney_(r, keys)
}
  var budget = money(_B32BUD), spent = moneyPositive(["personnelExpense", "staffExpense", "ytdExpense", "salaryExpense", "compensationExpense",
  "allowanceExpense", "currentMonthlyExpense", "monthlyRateTotal", "ค่าตอบแทน", "ค่าตอบแทนรวม", "เงินเดือน", "เงินเดือนรวม", "ค่าตอบแทนรายเดือน",
  "spent", "spentAmount", "expense", "expenseAmount", "totalExpense", "totalSpent", "totalPaid", "used", "usedAmount", "paid", "paidAmount", "actualAmount",
  "disbursement", "disbursed", "usedBudget", "รายจ่าย", "รายจ่ายรวม", "จำนวนรายจ่าย", "ยอดใช้จ่าย", "ค่าใช้จ่าย", "ค่าใช้จ่ายรวม", "เบิกจ่าย",
  "ยอดเบิกจ่าย", "amount", "totalAmount", "rowAmount", "จำนวนเงิน", "ยอดรวม", "รวมเป็นเงิน", "รวม"]), remainRaw = pick(_B32REM), remain = remainRaw !== "" ? _b32N_(remainRaw): budget - spent,
  planGroup = String(pick(["planGroup", "plan", "category", "แผนงาน", "หมวด", "หมวดงบประมาณ"]) || "แผนงานงบประมาณ").trim() || "แผนงานงบประมาณ",
  item = String(pick(["item", "name", "label", "title", "รายการ", "ชื่อรายการ", "รายการงบประมาณ"]) || "-").trim() || "-", isPersonnel = _budgetIsPersonnelBudgetRow_({
    planGroup, category: planGroup, item, label: item, name: item
});
  return {
    id: String(pick(["id", "ID"]) || ""), fy: String(fy || pick(_B32FY) || ""), planGroup, category: planGroup, item, budget, totalBudget: budget,
    spent, spentAmount: spent, expense: spent, expenseAmount: spent, totalPaid: spent, totalSpent: spent, personnelExpense: isPersonnel ? spent: 0,
    staffExpense: isPersonnel ? spent: 0, remain, balance: remain, isPersonnelCompensation: isPersonnel
}
}
function _budgetCanonicalSummaryRows_(fy, options) {
  options = options || {
};
  fy = _b32FY_(fy) || String(fy || "").replace(/[^0-9]/g, "") || _currentBudgetFyString_();
  var cacheBypass = _budgetCachePolicyBypass_(options) || options.forceFresh === !0 || options.noCache === !0 || options.bypassCache === !0 || options.bypassRequestCache === !0 || options.reload === !0,
  cacheStamp = _budgetCanonicalEntityStamp_("budgetimports") + "|" + _budgetCanonicalEntityStamp_("budgetsummary") + "|" + _budgetCanonicalEntityStamp_("budgetyearsettingsitems") + "|" + _budgetCanonicalEntityStamp_("personnel_staff") + "|" + _budgetCanonicalEntityStamp_("salarypayments") + "|" + _budgetCanonicalEntityStamp_("salarysettings") + "|" + _budgetCanonicalEntityStamp_("budgetsalarysettings") + "|budget-personnel-summary-row-current-v13-r77",
  cacheKey = "budget:canonical:summary:personnel-summary-row-current-v12:" + fy + ":" + cacheStamp, cached = cacheBypass ? null: _budgetCanonicalCacheRead_(cacheKey);
  if(cached && Array.isArray(cached.rows))return _budgetNoWaitEnsurePersonnelRow_(cached.rows, fy);
  var rows = [];
  try {
    rows = (typeof _budgetSummaryRowsFromImportsLite_ == "function" ? _budgetSummaryRowsFromImportsLite_(fy): []) || []
}
  catch(_importsSummaryErr) {
    _b32W_("budget.canonical.summary.imports", _importsSummaryErr, {
      fy
}), rows = []
}
  if(! Array.isArray(rows) || ! rows.length)try {
    rows = _budgetCanonicalRowsFromSheet_("BudgetSummary", 0).filter(function(r) {
      if(! r || _budgetNoWaitDeleted_(r))return !1;
      var rowFy = _b32FY_(_budgetTypeSummaryPick_(r, _B32FY));
      return ! fy || ! rowFy || rowFy === fy
}).map(function(r) {
      return _budgetBudgetSummaryRowToDto_(r, fy)
}).filter(function(r) {
      return r.planGroup || r.item || r.budget || r.spent || r.remain
})
}
  catch(_matSummaryErr) {
    _b32W_("budget.canonical.summary.materialized", _matSummaryErr, {
      fy
}), rows = []
}
  if(! Array.isArray(rows) || ! rows.length)try {
    rows = (typeof _budgetSummaryRowsFromSettingsOnly_ == "function" ? _budgetSummaryRowsFromSettingsOnly_(fy): []) || []
}
  catch(_settingsErr) {
    _b32W_("budget.canonical.summary.settings", _settingsErr, {
      fy
}), rows = []
}
  return rows = _budgetNoWaitEnsurePersonnelRow_(_b32A_(rows), fy), _budgetCanonicalCacheWrite_(cacheKey, {
    rows
}, 180).rows
}
function _budgetFastTypeSummaryFields_(sheetName) {
  var common = ["id", "ID", "fy", "FY", "fiscalYear", "budgetFy", "budgetYear", "year", "ปีงบประมาณ", "ปีงบ", "entryType", "type", "category",
  "item", "itemName", "topic", "name", "label", "ประเภทรายการ", "ประเภทรายการงบประมาณ", "ประเภท", "รายการ", "ชื่อรายการ", "รายการงบประมาณ", "หัวข้อ",
  "ชื่อเรื่อง", "committeeType", "committeeName", "roundNo", "คณะ", "ชื่อคณะ", "ครั้งที่", "startDate", "endDate", "activityDate", "seminarDate",
  "date", "createdAt", "updatedAt", "วันที่", "วันเดือนปี", "วันที่ดำเนินการ", "วันที่เริ่ม", "วันที่สิ้นสุด", "meetingAllowance", "snackCost",
  "lunchCost", "travelCost", "receptionCost", "seminarCost", "foreignTripCost", "foreignGuestCost", "supportCost", "spent", "expense", "paid",
  "paidAmount", "actualAmount", "expenseAmount", "disbursement", "disbursed", "usedBudget", "usedAmount", "รายจ่าย", "รายจ่ายรวม", "จำนวนรายจ่าย",
  "เบิกจ่าย", "ยอดเบิกจ่าย", "amount", "totalAmount", "rowAmount", "จำนวนเงิน", "ยอดรวม", "รวมเป็นเงิน", "ค่าใช้จ่าย", "ค่าใช้จ่ายรวม", "committeeResponsible",
  "staffResponsible", "note", "remark", "refundStatus", "refundDate", "reportStatus", "reportDate", "สถานะคืนเงิน", "สถานะการคืนเงิน", "วันที่คืนเงิน",
  "วันคืนเงิน", "สถานะรายงาน", "สถานะรายงานค่าใช้จ่าย", "วันที่รายงาน", "วันรายงาน", "payloadJson", "payloadJSON", "extraJson", "extraJSON", "extra",
  "seminarItemsJson", "seminarItemsJSON", "subcommitteeName", "seminarTitle", "supportType", "detail", "guestCountry", "visitLocations", "seminarLocations",
  "countriesText", "visitLocationsText", "seminarLocationsText", "visitLocationsJson", "visitLocationsJSON", "seminarLocationsJson", "seminarLocationsJSON",
  "countriesJson", "countriesJSON", "seminarPlace", "seminarProvince", "seminarDistrict", "seminarSubDistrict", "seminarSubdistrict", "visitPlace",
  "visitProvince", "visitDistrict", "visitSubDistrict", "visitSubdistrict", "isDeleted", "deleted", "deletedAt"];
  return(sheetName = String(sheetName || "").trim()) === "BudgetTypeSummary" ? common.concat(["sourceRow", "source", "updatedAt"]): common
}
function _budgetFastNormalizeKey_(v) {
  try {
    if(_appIsFnName_("_budgetTypeSummaryHeaderKey_"))return _budgetTypeSummaryHeaderKey_(v)
}
  catch(_e) {
    _b32W_("budget.obs.observed", _e)
}
  return String(v == null ? "": v).trim().toLowerCase().replace(/\s+/g, "")
}
function _budgetFastPick_(row, keys) {
  return _appIsFnName_("_budgetTypeSummaryPick_") ? _budgetTypeSummaryPick_(row, keys): (function() {
    keys = Array.isArray(keys) ? keys: [keys];
    for(var i = 0;
    i < keys.length;
    i++)if(row && row[keys[i]] != null && String(row[keys[i]]).trim() !== "")return row[keys[i]];
    return""
})()
}
function _budgetPickFirstPositiveMoney_(row, keys) {
  row = row || {
}, keys = Array.isArray(keys) ? keys: [keys];
  var sources = [row];
  try {
    row.extra && typeof row.extra == "object" && ! Array.isArray(row.extra) && sources.push(row.extra), String(row.extraJson || row.payloadJson || "").trim().charAt(0) === "{" && sources.push(JSON.parse(String(row.extraJson || row.payloadJson || "{}")))
}
  catch(_moneyExtraErr) {
    _b32W_("budget.money.extra.parse", _moneyExtraErr)
}
  for(var maps = sources.map(_budgetNormalizedKeyMap_), best = 0, seen = !1, i = 0;
  i < keys.length;
  i++)for(var sIdx = 0;
  sIdx < sources.length;
  sIdx++) {
    var src = sources[sIdx] || {
}, k = keys[i], v = src[k], real;
    if((v == null || String(v).trim() === "") && (real = maps[sIdx][_budgetNormalizedLookupKey_(k)]) && (v = src[real]), v != null && String(v).trim() !== "") {
      var n = _b32N_(v);
      if(seen = !0, n > 0)return n;
      best = n
}
}
  return seen ? best: 0
}
function _budgetFastTypeDto_(row, fy) {
  row = row || {
};
  var rowFy = String(_budgetFastPick_(row, _B32FY) || "").replace(/[^0-9]/g, "");
  if(! rowFy)try {
    rowFy = (_appIsFnName_("_budgetRowFyLite_") ? _budgetRowFyLite_(row): "") || ""
}
  catch(_fyErr) {
    rowFy = ""
}
  var entryType = String(_budgetFastPick_(row, _B32ENTRY) || "").trim(), item = String(_budgetFastPick_(row, ["item", "itemName", "topic", "name",
  "label", "รายการ", "ชื่อรายการ", "รายการงบประมาณ", "หัวข้อ", "ชื่อเรื่อง"]) || "").trim(), moneyFields = ["personnelExpense", "staffExpense",
  "ytdExpense", "salaryExpense", "compensationExpense", "allowanceExpense", "currentMonthlyExpense", "monthlyRateTotal", "totalPaid", "totalSpent",
  "spent", "spentAmount", "expense", "expenseAmount", "totalExpense", "paid", "paidAmount", "actualAmount", "disbursement", "disbursed", "usedBudget",
  "usedAmount", "รายจ่าย", "รายจ่ายรวม", "จำนวนรายจ่าย", "ค่าใช้จ่าย", "ค่าใช้จ่ายรวม", "เบิกจ่าย", "ยอดเบิกจ่าย", "amount", "totalAmount", "rowAmount",
  "จำนวนเงิน", "ยอดรวม", "รวมเป็นเงิน", "ค่าตอบแทน", "ค่าตอบแทนรายเดือน"], amount = _budgetPickFirstPositiveMoney_(row, moneyFields), totalAmount = _budgetPickFirstPositiveMoney_(row,
  ["totalAmount", "amount"].concat(moneyFields));
  ! totalAmount && amount && (totalAmount = amount);
  var activityDate = _budgetFastPick_(row, ["activityDate", "startDate", "date", "createdAt", "updatedAt", "วันที่", "วันเดือนปี", "วันที่ดำเนินการ",
  "วันที่เริ่ม"]) || "", warnings = [], extra = {
};
  try {
    extra = (_appIsFnName_("_budgetParsePayloadExtra_") ? _budgetParsePayloadExtra_(row, warnings):  {
}) || {
}
}
  catch(_extraErr) {
    extra = {
}
}
  var seminarLocs = _b32A_(extra.seminarLocations);
  seminarLocs.length || (seminarLocs = [_budgetFastPick_(row, ["seminarPlace"]), _budgetFastPick_(row, ["seminarProvince"]), _budgetFastPick_(row,
  ["seminarDistrict"]), _budgetFastPick_(row, _B32R12)].map(function(x) {
    return String(x || "").trim()
}).filter(Boolean));
  var visitLocs = _b32A_(extra.visitLocations), out;
  return visitLocs.length || (visitLocs = [_budgetFastPick_(row, ["visitPlace"]), _budgetFastPick_(row, ["visitProvince"]), _budgetFastPick_(row,
  ["visitDistrict"]), _budgetFastPick_(row, _B32R17)].map(function(x) {
    return String(x || "").trim()
}).filter(Boolean)), {
    id: String(_budgetFastPick_(row, ["id", "ID", "เลขที่"]) || ""), fy: String(rowFy || fy || ""), fiscalYear: String(rowFy || fy || ""), entryType,
    type: entryType, category: String(_budgetFastPick_(row, _B32R16) || entryType || "").trim(), item, topic: String(_budgetFastPick_(row, ["topic",
    "item", "รายการ", "ชื่อเรื่อง"]) || item || "").trim(), committeeType: String(_budgetFastPick_(row, ["committeeType", "คณะ"]) || ""), committeeName: String(_budgetFastPick_(row,
    ["committeeName", "ชื่อคณะ"]) || ""), subcommitteeName: String(_budgetFastPick_(row, _B32R4) || extra.subcommitteeName || ""), roundNo: String(_budgetFastPick_(row,
    ["roundNo", "ครั้งที่"]) || ""), seminarTitle: String(_budgetFastPick_(row, _B32R6) || extra.seminarTitle || ""), supportType: String(_budgetFastPick_(row,
    _B32R20) || extra.supportType || ""), detail: String(_budgetFastPick_(row, _B32R7) || extra.detail || ""), guestCountry: String(_budgetFastPick_(row,
    ["guestCountry", "ประเทศของแขก"]) || extra.guestCountry || extra.countriesText || ""), startDate: _bFormatDate(_budgetFastPick_(row, ["startDate",
    "activityDate", "date", "วันที่เริ่ม", "วันที่"]) || ""), endDate: _bFormatDate(_budgetFastPick_(row, ["endDate", "วันที่สิ้นสุด"]) || ""),
    activityDate: _bFormatDate(activityDate || ""), seminarDate: _bFormatDate(_budgetFastPick_(row, ["seminarDate"]) || ""), meetingAllowance: _b32N_(_budgetFastPick_(row,
    ["meetingAllowance"])), snackCost: _b32N_(_budgetFastPick_(row, ["snackCost"])), lunchCost: _b32N_(_budgetFastPick_(row, ["lunchCost"])),
    travelCost: _b32N_(_budgetFastPick_(row, ["travelCost"])), receptionCost: _b32N_(_budgetFastPick_(row, ["receptionCost"])), seminarCost: _b32N_(_budgetFastPick_(row,
    ["seminarCost"])), foreignTripCost: _b32N_(_budgetFastPick_(row, ["foreignTripCost"])), foreignGuestCost: _b32N_(_budgetFastPick_(row, ["foreignGuestCost"])),
    supportCost: _appIsFnName_("_budgetResolveSupportCostAmount_") ? _budgetResolveSupportCostAmount_(row, extra): _b32N_(_budgetFastPick_(row,
    ["supportCost"])), amount, totalAmount, committeeResponsible: String(_budgetFastPick_(row, ["committeeResponsible"]) || ""), staffResponsible: String(_budgetFastPick_(row,
    ["staffResponsible"]) || ""), note: String(_budgetFastPick_(row, ["note", "remark"]) || ""), refundStatus: String(_budgetFastPick_(row, ["refundStatus",
    "สถานะการคืนเงิน"]) || "ยังไม่คืนเงิน"), refundDate: _bFormatDate(_budgetFastPick_(row, ["refundDate", "วันคืนเงิน"]) || ""), reportStatus: String(_budgetFastPick_(row,
    ["reportStatus", "สถานะรายงาน"]) || "ยังไม่รายงาน"), reportDate: _bFormatDate(_budgetFastPick_(row, ["reportDate", "วันรายงาน"]) || ""), visitLocations: String(_budgetFastPick_(row,
    _B32R18) || visitLocs.join(", ") || ""), seminarLocations: String(_budgetFastPick_(row, _B32R13) || seminarLocs.join(", ") || ""), countriesText: String(_budgetFastPick_(row,
    ["countriesText"]) || extra.countriesText || ""), visitPlace: String(_budgetFastPick_(row, ["visitPlace"]) || visitLocs[0] || ""), visitProvince: String(_budgetFastPick_(row,
    ["visitProvince"]) || visitLocs[1] || ""), visitDistrict: String(_budgetFastPick_(row, ["visitDistrict"]) || visitLocs[2] || ""), visitSubDistrict: String(_budgetFastPick_(row,
    _B32R17) || visitLocs[3] || ""), seminarPlace: String(_budgetFastPick_(row, ["seminarPlace"]) || seminarLocs[0] || ""), seminarProvince: String(_budgetFastPick_(row,
    ["seminarProvince"]) || seminarLocs[1] || ""), seminarDistrict: String(_budgetFastPick_(row, ["seminarDistrict"]) || seminarLocs[2] || ""),
    seminarSubDistrict: String(_budgetFastPick_(row, _B32R12) || seminarLocs[3] || ""), seminarItemsJson: String(_budgetFastPick_(row, _B32R19) || ""),
    visitLocationsJson: String(_budgetFastPick_(row, _B32R14) || ""), seminarLocationsJson: String(_budgetFastPick_(row, _B32R8) || ""), countriesJson: String(_budgetFastPick_(row,
    ["countriesJson", "countriesJSON"]) || ""), payloadJson: String(_budgetFastPick_(row, ["payloadJson", "payloadJSON"]) || ""), extraJson: String(_budgetFastPick_(row,
    ["extraJson", "extraJSON"]) || ""), extra, isDeleted: !1
}
}
function _budgetFastReadWindowObjects_(sheetName, fields, opts) {
  opts = opts || {
}, sheetName = String(sheetName || "").trim();
  var sh = _appIsFnName_("_budgetGetOptionalSheet_") ? _budgetGetOptionalSheet_(sheetName): null;
  if(! sh)return {
    rows: [], scannedRows: 0, lastRow: 0, source: sheetName + "/missing"
};
  var lastRow = Math.max(Number(sh.getLastRow && sh.getLastRow()) || 0, 1), width = Math.max(Number(sh.getLastColumn && sh.getLastColumn()) || 0,
  1);
  if(lastRow < 2)return {
    rows: [], scannedRows: 0, lastRow, source: sheetName + "/empty"
};
  var headers = AppRepository.getRangeValues(sheetName, 1, 1, 1, width)[0] || [], byKey = {
};
  headers.forEach(function(h, i) {
    var raw = String(h || "").trim();
    raw && (byKey[raw] = i, byKey[_budgetFastNormalizeKey_(raw)] = i)
});
  var cols = [];
  if((_b32A_(fields)).forEach(function(f) {
    var k = _b32H_(byKey, f) ? byKey[f]: byKey[_budgetFastNormalizeKey_(f)];
    (k === 0 || k > 0) && cols.indexOf(k) < 0 && cols.push(k)
}), ! cols.length)return {
    rows: [], scannedRows: 0, lastRow, source: sheetName + "/no-columns"
};
  cols.sort(function(a, b) {
    return a - b
});
  for(var minCol = cols[0], maxCol = cols[cols.length - 1], batchSize = Math.max(50, Math.min(Number(opts.batchSize || 350) || 350, 700)), maxScanRows = Math.max(batchSize,
  Math.min(Number(opts.maxScanRows || 1400) || 1400, 3e3)), desired = Math.max(1, Number(opts.desired || 200) || 200), started = new Date().getTime(),
  deadlineMs = Math.max(700, Math.min(Number(opts.deadlineMs || 2600) || 2600, 5e3)), out = [], scanned = 0, end = lastRow;
  end >= 2 && scanned < maxScanRows && out.length < desired && ! (new Date().getTime() - started > deadlineMs);
) {
    var n = Math.min(batchSize, end - 1, maxScanRows - scanned), start = end - n + 1, values = AppRepository.getRangeValues(sheetName, start,
    minCol + 1, n, maxCol - minCol + 1);
    scanned += values.length;
    for(var r = values.length - 1;
    r >= 0;
    r--) {
      var arr = values[r], obj = {
};
      if((_b32A_(fields)).forEach(function(f) {
        var idx = _b32H_(byKey, f) ? byKey[f]: byKey[_budgetFastNormalizeKey_(f)];
        obj[f] = (idx === 0 || idx > 0) && idx >= minCol && idx <= maxCol ? arr[idx - minCol]: ""
}), out.push(obj), out.length >= desired)break
}
    end = start - 1
}
  try {
    _appIsFnName_("_requestScopeNoteRowsRead_") && _requestScopeNoteRowsRead_(sheetName, scanned)
}
  catch(_n) {
    _b32W_("budget.rowsRead.note", _n)
}
  return {
    rows: out, scannedRows: scanned, lastRow, source: sheetName + "/window-reverse"
}
}
function _budgetCanonicalImportRowsByFy_(fy, options) {
  options = options || {
}, fy = String(fy || "").replace(/[^0-9]/g, "");
  var cacheBypass = _budgetCachePolicyBypass_(options) || options.forceFresh === !0 || options.noCache === !0 || options.bypassCache === !0 || options.bypassRequestCache === !0 || options.reload === !0,
  requestedLimit = Math.max(1, Math.min(Number(options.limit || options.pageSize || options.limitTarget || 240) || 240, 1e3)), requestedPage = Math.max(1,
  Number(options.page || 1) || 1), desired = Math.max(1, Math.min(Number(options.desired || options.limitTarget || requestedPage * requestedLimit) || 240,
  1e3)), cacheStamp = _budgetCanonicalEntityStamp_("budgetimports"), cacheKey = "budget:type:imports:window:current:" + fy + ":" + desired + ":" + cacheStamp,
  cached = cacheBypass ? null: _budgetCanonicalCacheRead_(cacheKey);
  if(cached && Array.isArray(cached.rows))return cached.rows;
  var fields = _budgetFastTypeSummaryFields_("BudgetImports"), rows = [], scanned = 0, cursorDesired = desired;
  try {
    var pack = _budgetFastReadWindowObjects_("BudgetImports", fields, {
      desired: Math.max(3 * desired, 360), batchSize: 450, maxScanRows: 1800, deadlineMs: 2800
});
    scanned = pack.scannedRows || 0, rows = (pack.rows || []).filter(function(row) {
      if(! row || _budgetNoWaitDeleted_(row))return !1;
      var rowFy = String(_budgetFastPick_(row, _B32FY) || "").replace(/[^0-9]/g, "");
      if(! rowFy)try {
        rowFy = (_appIsFnName_("_budgetRowFyLite_") ? _budgetRowFyLite_(row): "") || ""
}
      catch(_rfe) {
        rowFy = ""
}
      return ! fy || rowFy === fy
}).slice(0, cursorDesired)
}
  catch(_readErr) {
    _b32W_("budget.type.imports.window", _readErr, {
      fy
}), rows = []
}
  return rows.__budgetScannedRows = scanned, rows.__budgetSource = "BudgetImports/window-reverse", _budgetCanonicalCacheWrite_(cacheKey, {
    rows
}, Number(options.ttl || 600) || 600).rows
}
function _budgetCanonicalTypeRows_(payload) {
  payload = payload || {
};
  var fy = _budgetNoWaitNormalizeFy_(payload), limit = Math.max(10, Math.min(Number(payload.limit || payload.pageSize || 20) || 20, 100)), maxRows = Math.max(limit,
  Math.min(Number(payload.maxRows || payload.totalTarget || 800) || 800, 1e3)), cacheStamp = _budgetCanonicalEntityStamp_("budgetimports"), cacheBypass = payload.forceFresh === !0 || payload.noCache === !0 || payload.bypassCache === !0 || payload.reload === !0,
  cacheKey = "budget:canonical:type:budgetimports-v10:" + fy + ":" + maxRows + ":" + cacheStamp, cached = cacheBypass ? null: _budgetCanonicalCacheRead_(cacheKey);
  if(cached && Array.isArray(cached.rows))return cached.rows;
  var rows = [];
  try {
    if(payload.noWait === !0 || payload.fast === !0 || payload.lite === !0) {
      var rawWindow = _budgetCanonicalImportRowsByFy_(fy, {
        page: 1, limit: maxRows, pageSize: maxRows, desired: maxRows, forceFresh: cacheBypass, ttl: Math.max(60, Math.min(Number(payload.cacheTtlSeconds || 300) || 300,
        600)), deadlineMs: Math.max(1500, Math.min(Number(payload.deadlineMs || 5e3) || 5e3, 8e3))
}) || [];
      rows = (_b32A_(rawWindow)).map(function(r) {
        return _budgetFastTypeDto_(r, fy)
}), rows.__budgetSource = rawWindow.__budgetSource || "BudgetImports/window-reverse-source-of-truth", rows.__budgetScannedRows = rawWindow.__budgetScannedRows || rows.length,
      rows.__budgetDirty = rawWindow.__budgetDirty === !0
}
    else rows = _budgetTypeSummaryImportSourceRows_(fy, {
      forceFresh: cacheBypass, ttl: Math.max(60, Math.min(Number(payload.cacheTtlSeconds || 300) || 300, 600))
}) || [], rows = _b32A_(rows), rows.forEach(function(r) {
      r && (r.__budgetCanonicalSource = "BudgetImports/direct-source-of-truth")
}), rows.__budgetSource = "BudgetImports/direct-source-of-truth", rows.__budgetScannedRows = rows.length, rows.__budgetDirty = !1
}
  catch(err) {
    _b32W_("budget.typeSummary.directBudgetImports", err, {
      fy
}), rows = [], rows.__budgetSource = "BudgetImports/error-fallback-empty", rows.__budgetScannedRows = 0, rows.__budgetDirty = !1
}
  return rows.__budgetMaterializedRequired = !1, rows.__budgetMaterializedHit = !1, rows.__budgetDirectSource = !0, rows.__budgetPolicy = _budgetTypeSummaryOwnerPolicy_(),
  _budgetCanonicalCacheWrite_(cacheKey, {
    rows
}, cacheBypass ? 0: 300).rows
}
function _budgetNoWaitNormalizeFy_(payload) {
  payload = payload || {
};
  var fy = "";
  try {
    fy = (_appIsFnName_("_budgetCanonicalPayloadFy_") ? _budgetCanonicalPayloadFy_(payload): "") || ""
}
  catch(_fyErr) {
    fy = ""
}
  if(! fy)try {
    fy = (_appIsFnName_("_resolveBudgetDefaultFiscalYear_") ? _resolveBudgetDefaultFiscalYear_(): "") || ""
}
  catch(_defaultErr) {
    fy = ""
}
  if(! fy) {
    var d = new Date;
    fy = String(d.getMonth() >= 9 ? d.getFullYear() + 544: d.getFullYear() + 543)
}
  return String(fy || "").replace(/[^0-9]/g, "")
}
function _budgetNoWaitDeleted_(row) {
  row = row || {
};
  var v = String(row.isDeleted || row.deleted || row.deletedAt || "").trim().toLowerCase();
  return v === "true" || v === "1" || v === "deleted" || v === "ลบ"
}
function _budgetNoWaitReadRows_(sheetName, fields, ttl) {
  sheetName = String(sheetName || "").trim();
  try {
    var useFields = fields || [];
    return useFields && useFields.length || ! _appIsFnName_("_budgetProjectedFields_") || (useFields = _budgetProjectedFields_(sheetName)), _budgetDataServiceRows_(sheetName,
    useFields || [], {
      includeDeleted: !1, requireCanonical: !1, ttl: ttl === 0 ? 0: ttl || 240, forceFresh: ttl === 0, noCache: ttl === 0, bypassCache: ttl === 0,
      bypassRequestCache: ttl === 0
}) || []
}
  catch(e) {
    _b32W_("budget.nowait.projected." + sheetName, e)
}
  try {
    return(_appIsFnName_("_budgetRows_") ? _budgetRows_(sheetName, !1): []) || []
}
  catch(e2) {
    _b32W_("budget.nowait.rows." + sheetName, e2)
}
  return[]
}
function _budgetNoWaitImportRows_(fy, options) {
  return _budgetCanonicalImportRowsByFy_(fy, options || {
})
}
function _budgetNoWaitMapImportRows_(rows) {
  return(rows = _b32A_(rows)).map(function(row) {
    try {
      return _appIsFnName_("_mapBudgetImportListRowFastLite_") ? _mapBudgetImportListRowFastLite_(row): row
}
    catch(_mapErr) {
      return row || {
}
}
})
}
function _budgetNoWaitPersonnelLabel_() {
  return _appIsFnName_("_budgetPersonnelCompensationLabel_") ? _budgetPersonnelCompensationLabel_(): "ค่าตอบแทนผู้ปฏิบัติงานให้คณะกรรมาธิการประจำสภาผู้แทนราษฎร"
}
function _budgetPersonnelFiscalYtdPeriod_(fy, asOfDate) {
  fy = _b32FY_(fy) || String(fy || "").replace(/[^0-9]/g, "") || _currentBudgetFyString_();
  var range = _budgetFiscalYearRange_(fy), today = asOfDate || new Date;
  if(! range)return {
    fy, start: null, end: today, monthsElapsed: 0, valid: !1
};
  var anchor = today < range.start ? range.start: today > range.end ? range.end: today;
  return anchor = new Date(anchor.getFullYear(), anchor.getMonth(), anchor.getDate(), 23, 59, 59, 999), {
    fy, start: range.start, end: anchor, fiscalEnd: range.end, monthsElapsed: _budgetMonthOverlapCount_(range.start, anchor, range.start, anchor),
    valid: !0, contractStamp: "budget-personnel-salary-summary-fiscal-ytd-current"
}
}
function _budgetPersonnelExpenseReadModel_(fy) {
  fy = _b32FY_(fy) || String(fy || "").replace(/[^0-9]/g, "") || _currentBudgetFyString_();
  var stamp = [_budgetCanonicalEntityStamp_("salarypayments"), _budgetCanonicalEntityStamp_("personnel_staff"), _budgetCanonicalEntityStamp_("budgetsalarysettings"),
  _budgetCanonicalEntityStamp_("salarysettings")].join("|"), cacheKey = "budget:personnel-expense:fy-v13:" + fy + ":" + stamp, cached = _budgetCanonicalCacheRead_(cacheKey);
  if(cached && cached.result && typeof cached.result == "object" && _b32N_(cached.result.amount || cached.result.ytdExpense || cached.result.currentMonthlyExpense) > 0)return cached.result;
  var period = _budgetPersonnelFiscalYtdPeriod_(fy, new Date), warnings = [], payTotal = 0, payMonthly = 0, payCount = 0, payInferredCount = 0;
  function pick(r, ks) {
    r = r || {
};
    for(var raw = r.__raw && typeof r.__raw == "object" ? r.__raw:  {
}, i = 0;
    i < ks.length;
    i++) {
      var k = ks[i], v = r[k];
      if(v != null && String(v).trim() !== "" || (v = raw[k], v != null && String(v).trim() !== ""))return v
}
    return""
}
  function num(r, ks) {
    return _b32N_(pick(r, ks))
}
  function dateValue(r, ks) {
    return _budgetParsePersonnelDate_(pick(r, ks))
}
  function rowWithinFiscalYtd(r) {
    var rowFy = _b32FY_(pick(r, _B32FY)), paidDate = dateValue(r, _B32R2);
    return paidDate && period.valid ? paidDate >= period.start && paidDate <= period.end: rowFy ? rowFy === fy: !0
}
  function inferredMonths(r) {
    if(! period.valid)return 0;
    var start = dateValue(r, ["startDate", "workStartDate", "appointedDate", "วันที่เริ่ม", "วันเริ่ม", "วันที่เริ่มดำรงตำแหน่ง", "วันเริ่มดำรงตำแหน่ง",
    "วันที่แต่งตั้ง", "วันแต่งตั้ง", "วันเริ่มทำหน้าที่"]) || period.start, end = dateValue(r, ["endDate", "workEndDate", "retireDate", "วันที่สิ้นสุด",
    "วันสิ้นสุด", "วันที่พ้นตำแหน่ง", "วันพ้นตำแหน่ง", "วันสิ้นสุดตำแหน่ง"]) || period.end;
    return _budgetMonthOverlapCount_(start, end, period.start, period.end)
}
  function addPay(rows) {
    (_b32A_(rows)).forEach(function(r) {
      if(! (! r || _budgetNoWaitDeleted_(r) || ! rowWithinFiscalYtd(r))) {
        var paidDate = dateValue(r, _B32R2), rate = num(r, ["monthlyRate", "monthlySalary", "salary", "salaryAmount", "rate", "เงินเดือน", "ค่าตอบแทน",
        "ค่าตอบแทนรายเดือน"]), explicitMonths = num(r, ["months", "monthCount", "จำนวนเดือน"]), amountField = num(r, ["amount", "totalAmount",
        "paidAmount", "expense", "spent", "รายจ่าย", "ยอดเบิกจ่าย", "จำนวนเงิน", "ยอดรวม", "รวมเป็นเงิน"]), months = paidDate ? 1: explicitMonths || inferredMonths(r),
        amount2 = amountField > 0 ? amountField: rate > 0 ? rate * Math.max(1, months || 1): 0;
        ! paidDate && ! explicitMonths && rate > 0 && amountField > 0 && amountField <= rate * 1.01 && months > 1 && (amount2 = rate * months),
        amount2 > 0 && (payTotal += amount2, payCount++, ! paidDate && months > 1 && payInferredCount++), rate > 0 && (! paidDate || period.valid && paidDate.getFullYear() === period.end.getFullYear() && paidDate.getMonth() === period.end.getMonth()) && (payMonthly += rate)
}
})
}
  var salaryPayments = [];
  try {
    salaryPayments = _budgetDataServiceRows_("SalaryPayments", _budgetProjectedFields_("SalaryPayments"), {
      includeDeleted: !1, requireCanonical: !1, ttl: 300
}) || []
}
  catch(e1) {
    warnings.push("SalaryPayments DataService: " + String(e1 && e1.message || e1))
}
  if(! salaryPayments.length)try {
    salaryPayments = typeof _budgetCanonicalRowsFromSheet_ == "function" ? _budgetCanonicalRowsFromSheet_("SalaryPayments", 300) || []: []
}
  catch(e2) {
    warnings.push("SalaryPayments direct: " + String(e2 && e2.message || e2))
}
  addPay(salaryPayments);
  var calc = {
};
  try {
    calc = calculatePersonnelSalaryObligation_(_budgetReadPersonnelStaffRowsForSalary_(), _salarySettingsRowsDirect_(), fy, period.valid ? period.end: new Date) || {
}
}
  catch(e3) {
    warnings.push("Personnel_Staff+SalarySettings: " + String(e3 && e3.message || e3))
}
  var amount = payTotal > 0 ? payTotal: _b32N_(calc.ytdExpense || calc.amount || calc.currentMonthlyExpense || 0), budget = _b32N_(calc.annualCommitment || calc.budget || calc.monthlyBudget || 0),
  monthly = _b32N_(calc.currentMonthlyExpense || calc.monthlyRateTotal || payMonthly || 0);
  ! amount && Number(calc.relevantCount || 0) > 0 && warnings.push("พบข้อมูลบุคลากรที่เกี่ยวข้อง แต่ยอดรายจ่ายค่าตอบแทนเป็น 0"), warnings = warnings.concat(calc.warnings || []).filter(function(v,
  i, a) {
    return v && a.indexOf(v) === i
}).slice(0, 20);
  var result = {
    amount: _b32N_(amount), spent: _b32N_(amount), expense: _b32N_(amount), currentMonthlyExpense: monthly, monthlyRateTotal: monthly, ytdExpense: _b32N_(amount),
    annualCommitment: budget, budget, count: Number(calc.relevantCount || 0), staffCount: Number(calc.staffCount || 0), paymentCount: payCount,
    inferredPaymentRows: payInferredCount, fiscalYtdStart: period.start ? period.start.toISOString(): "", fiscalYtdEnd: period.end ? period.end.toISOString(): "",
    fiscalYtdMonths: Number(period.monthsElapsed || 0), status: amount > 0 ? "production-fiscal-ytd-read-model": "missing", source: payTotal > 0 ? "SalaryPayments fiscal-ytd": amount > 0 ? "Personnel_Staff+SalarySettings fiscal-ytd": "empty",
    contractStamp: "budget-personnel-salary-summary-fiscal-ytd-v10", warnings
};
  return _budgetCanonicalCacheWrite_(cacheKey, {
    result
}, 300), result
}
function _budgetIsPersonnelCompensationTypeRow_(row) {
  if((row = row || {
}).isPersonnelCompensation === !0)return !0;
  var txt = String([row.planGroup, row.category, row.item, row.label, row.name, row.entryType, row.type, row.topic, row.description].join(" ")).replace(/[\u00A0\u200B-\u200D\uFEFF]/g,
  " ").replace(/\s+/g, "").trim();
  return txt.indexOf("ค่าตอบแทนผู้ปฏิบัติงาน") > - 1 || txt.indexOf("ผู้ปฏิบัติงานให้คณะกรรมาธิการ") > - 1
}
function _budgetNoWaitEnsurePersonnelRow_(rows, fy) {
  rows = Array.isArray(rows) ? rows.slice(): [], fy = _b32FY_(fy) || String(fy || "").replace(/[^0-9]/g, "") || _currentBudgetFyString_();
  var label = _budgetNoWaitPersonnelLabel_(), budgetKeys = "budget|totalBudget|amountBudget|budgetAmount|annualBudget|annualCommitment|monthlyBudget|วงเงินงบประมาณ|งบประมาณ|งบประมาณที่ได้รับ|งบประมาณรวม|จำนวนงบประมาณ".split("|"),
  expenseKeys = "personnelExpense|staffExpense|ytdExpense|salaryExpense|compensationExpense|allowanceExpense|currentMonthlyExpense|monthlyRateTotal|ค่าตอบแทน|ค่าตอบแทนรวม|เงินเดือน|เงินเดือนรวม|ค่าตอบแทนรายเดือน|totalPaid|totalSpent|spent|spentAmount|expense|expenseAmount|รายจ่าย|รายจ่ายรวม|จำนวนรายจ่าย|amount|totalAmount".split("|");
  function isPersonnel(row2) {
    return _budgetIsPersonnelBudgetRow_(row2 || {
}) || _budgetIsPersonnelCompensationTypeRow_(row2 || {
})
}
  function pick(row2, keys) {
    row2 = row2 || {
};
    for(var extra = row2.extra && typeof row2.extra == "object" ? row2.extra:  {
}, i = 0;
    i < keys.length;
    i += 1) {
      var key = keys[i];
      if(row2[key] != null && String(row2[key]).trim() !== "")return row2[key];
      if(extra[key] != null && String(extra[key]).trim() !== "")return extra[key]
}
    try {
      var v = _budgetTypeSummaryPick_(row2, keys);
      if(v != null && String(v).trim() !== "" || (v = _budgetTypeSummaryPick_(extra, keys), v != null && String(v).trim() !== ""))return v
}
    catch(_pickErr) {
      _b32W_("budget.personnel.pick", _pickErr)
}
    return""
}
  function positive(row2, keys) {
    for(var best = 0, i = 0;
    i < keys.length;
    i += 1) {
      var n = _b32N_(pick(row2, [keys[i]]));
      n > best && (best = n)
}
    return best
}
  function maxPositive(values) {
    var best = 0;
    return(_b32A_(values)).forEach(function(value) {
      var n = _b32N_(value);
      n > best && (best = n)
}), best
}
  var existingPersonnelRows = rows.filter(isPersonnel), nonPersonnelRows = rows.filter(function(row2) {
    return ! isPersonnel(row2)
}), existing = existingPersonnelRows[0] || {
}, model = {
}, detailed = {
}, settings = {
}, materialized = {
};
  try {
    model = _budgetPersonnelExpenseReadModel_(fy) || {
}
}
  catch(modelErr) {
    _b32W_("budget.personnel.readModel", modelErr, {
      fy
})
}
  try {
    detailed = typeof _calculatePersonnelSalaryExpenseDetailedFull_ == "function" ? _calculatePersonnelSalaryExpenseDetailedFull_(fy) || {
}:  {
}
}
  catch(detailErr) {
    _b32W_("budget.personnel.detailed", detailErr, {
      fy
})
}
  try {
    settings = typeof getSalarySettings == "function" ? getSalarySettings(fy) || {
}:  {
}
}
  catch(settingsErr) {
    _b32W_("budget.personnel.settings", settingsErr, {
      fy
})
}
  try {
    var materializedRows = typeof _budgetCanonicalRowsFromSheet_ == "function" ? _budgetCanonicalRowsFromSheet_("BudgetSummary", 0) || []: [];
    (_b32A_(materializedRows)).some(function(row2) {
      if(! row2 || ! isPersonnel(row2))return !1;
      var rowFy = _b32FY_(pick(row2, _B32FY));
      return fy && rowFy && rowFy !== fy ?  !1: (materialized = row2, !0)
})
}
  catch(materializedErr) {
    _b32W_("budget.personnel.materialized", materializedErr, {
      fy
})
}
  var amount = maxPositive([model.ytdExpense, model.amount, detailed.ytdExpense, detailed.amount, model.currentMonthlyExpense, detailed.currentMonthlyExpense,
  positive(existing, expenseKeys), positive(materialized, expenseKeys)]), budget = maxPositive([model.budget, model.annualCommitment, detailed.budget,
  detailed.annualCommitment, settings.budget, positive(existing, budgetKeys), positive(materialized, budgetKeys)]), currentMonthlyExpense = maxPositive([model.currentMonthlyExpense,
  detailed.currentMonthlyExpense, model.monthlyRateTotal, detailed.monthlyRateTotal]), annualCommitment = maxPositive([model.annualCommitment,
  detailed.annualCommitment, budget]), remain = budget - amount, source = String(model.source || detailed.source || (positive(existing, expenseKeys) > 0 ? "existing-summary-row": "") || (positive(materialized,
  expenseKeys) > 0 ? "BudgetSummary": "") || "Personnel_Staff+SalarySettings"), row = _b32O_({
}, existing, {
    id: String(existing.id || fy + "|personnel-compensation"), fy, fiscalYear: fy, planGroup: "แผนงานบุคลากรภาครัฐ", category: "แผนงานบุคลากรภาครัฐ",
    item: label, name: label, label, entryType: label, type: label, budget, totalBudget: budget, spent: amount, spentAmount: amount, expense: amount,
    expenseAmount: amount, totalPaid: amount, totalSpent: amount, personnelExpense: amount, staffExpense: amount, ytdExpense: amount, currentMonthlyExpense,
    monthlyRateTotal: maxPositive([model.monthlyRateTotal, detailed.monthlyRateTotal, currentMonthlyExpense]), annualCommitment, amount, totalAmount: amount,
    remain, balance: remain, isPersonnelCompensation: !0, synthetic: !0, readOnly: !0, canEdit: !1, canDelete: !1, __budgetPersonnelExpenseSource: source,
    __budgetPersonnelExpenseContract: "budget-personnel-summary-row-current-v13-r77"
});
  return nonPersonnelRows.unshift(row), nonPersonnelRows
}
function _budgetNoWaitSummaryRows_(fy, options) {
  return _budgetCanonicalSummaryRows_(fy, options || {
})
}
function _budgetNoWaitTotals_(rows) {
  try {
    if(_appIsFnName_("_computeBudgetSummaryGrandTotals_"))return _computeBudgetSummaryGrandTotals_(rows || [])
}
  catch(_tErr) {
    _b32W_("budget.grandTotals.compute", _tErr)
}
  var totals = {
    all:  {
      budget: 0, spent: 0, remain: 0
}, noPersonnel:  {
      budget: 0, spent: 0, remain: 0
}
};
  function money(row, keys) {
    row = row || {
};
    for(var i = 0;
    i < keys.length;
    i++) {
      var k = keys[i];
      if(row[k] != null && String(row[k]).trim() !== "")return Number(String(row[k]).replace(/,/g, "")) || 0
}
    return 0
}
  return(_b32A_(rows)).forEach(function(r) {
    var textForSpent = String([r && r.planGroup, r && r.category, r && r.item].join(" ")).replace(/\s+/g, ""), spentKeys = textForSpent.indexOf("บุคลากรภาครัฐ") > - 1 || textForSpent.indexOf("ค่าตอบแทนผู้ปฏิบัติงาน") > - 1 || textForSpent.indexOf("ผู้ปฏิบัติงานให้คณะกรรมาธิการ") > - 1 ? ["personnelExpense",
    "staffExpense", "ytdExpense", "salaryExpense", "compensationExpense", "allowanceExpense", "currentMonthlyExpense", "monthlyRateTotal", "spent",
    "spentAmount", "expense", "expenseAmount", "รายจ่าย", "รายจ่ายรวม", "จำนวนรายจ่าย"]: ["spent", "spentAmount", "expense", "expenseAmount",
    "totalExpense", "totalSpent", "totalPaid", "used", "usedAmount", "paid", "paidAmount", "actualAmount", "disbursement", "disbursed", "usedBudget",
    "รายจ่าย", "รายจ่ายรวม", "จำนวนรายจ่าย", "ค่าใช้จ่าย", "ค่าใช้จ่ายรวม", "เบิกจ่าย", "ยอดเบิกจ่าย", "totalAmount", "amount", "rowAmount"],
    b = Number(r && r.budget || 0) || 0, s = money(r, spentKeys), rm = Number(r && (r.remain != null ? r.remain: r.balance));
    isFinite(rm) || (rm = b - s), totals.all.budget += b, totals.all.spent += s, totals.all.remain += rm;
    var text = String([r && r.planGroup, r && r.category, r && r.item].join(" ")).replace(/\s+/g, "");
    text.indexOf("บุคลากรภาครัฐ") < 0 && text.indexOf("ค่าตอบแทนผู้ปฏิบัติงาน") < 0 && text.indexOf("ผู้ปฏิบัติงานให้คณะกรรมาธิการ") < 0 && (totals.noPersonnel.budget += b,
    totals.noPersonnel.spent += s, totals.noPersonnel.remain += rm)
}), totals
}
function _budgetNoWaitPaged_(rows, payload, defaultLimit, maxLimit) {
  rows = _b32A_(rows);
  var page = Math.max(1, Number(payload && payload.page || 1) || 1), limit = Math.max(1, Math.min(Number(payload && (payload.limit || payload.pageSize) || defaultLimit) || defaultLimit,
  maxLimit || 1e3)), start = (page - 1) * limit;
  return {
    page, limit, totalRecords: rows.length, rows: rows.slice(start, start + limit), totalPages: Math.max(1, Math.ceil(rows.length / limit))
}
}
function _budgetHotPathBypass_(payload) {
  return(payload = payload || {
}).forceFresh === !0 || payload.forceRefresh === !0 || payload.noCache === !0 || payload.bypassCache === !0 || payload.reload === !0 || payload.afterWrite === !0
}
function _budgetRowsCacheKey_(payload, scope) {
  var fy = _budgetNoWaitNormalizeFy_(payload = payload || {
}), typeFilter = String(payload.type || payload.typeFilter || payload.category || "").trim();
  typeFilter === "ทั้งหมด" && (typeFilter = "");
  var raw = {
    scope: String(scope || "typeRows"), fy, type: typeFilter, strictFy: !0, stampBudgetImports: _appIsFnName_("_budgetCanonicalEntityStamp_") ? _budgetCanonicalEntityStamp_("budgetimports"): "1",
    stampBudgetTypeSummary: _appIsFnName_("_budgetCanonicalEntityStamp_") ? _budgetCanonicalEntityStamp_("budgettypesummary"): "1", policy: "core-budget-type-summary-no-personnel-v11-cached"
};
  try {
    return"budget:core:" + String(scope || "typeRows") + ":" + fy + ":" + _buildDigestHex_(JSON.stringify(raw))
}
  catch(_e) {
    return"budget:core:" + String(scope || "typeRows") + ":" + fy + ":" + String(typeFilter || "all")
}
}
function _budgetCacheReadRows_(key) {
  try {
    var hit = _appIsFnName_("_budgetCanonicalCacheRead_") ? _budgetCanonicalCacheRead_(key): _appIsFnName_("_AppCacheGetJson_") ? _AppCacheGetJson_(key): null,
    rows = hit && Array.isArray(hit.rows) ? hit.rows: null;
    return rows ? (rows.__budgetSource = String(hit.source || "core-hot-cache"), rows.__budgetScannedRows = Number(hit.scannedRows || rows.length) || rows.length,
    rows.__budgetCacheHit = !0, rows.__budgetPerformanceCache = !0, rows): null
}
  catch(_e) {
    return _b32W_("observed.catch", _e, {
      file: "C32"
}), null
}
}
function _budgetCacheWriteRows_(key, rows, ttl, source) {
  rows = _b32A_(rows);
  try {
    var policy = _budgetCachePolicy_({
      cacheTtlSeconds: ttl
}, "rows"), data = {
      rows, source: String(source || "core-hot-cache-store"), scannedRows: Number(rows.__budgetScannedRows || rows.length) || rows.length, cachedAt: new Date().toISOString(),
      corePerformance: !0, cachePolicyStamp: BUDGET_CACHE_POLICY_STAMP
};
    _appIsFnName_("_budgetCanonicalCacheWrite_") ? _budgetCanonicalCacheWrite_(key, data, policy.ttlSeconds): _appIsFnName_("_AppCachePutJson_") && _AppCachePutJson_(key,
    data, policy.ttlSeconds)
}
  catch(_e) {
    _b32W_("budget.obs.observed", _e)
}
  return rows.__budgetCacheHit = !1, rows.__budgetPerformanceCache = !0, rows
}
function _budgetNoWaitTypeRows_(payload) {
  payload = payload || {
};
  var typeFilter = String(payload.type || payload.typeFilter || payload.category || "").trim();
  typeFilter === "ทั้งหมด" && (typeFilter = "");
  function normalizeText(v) {
    return String(v == null ? "": v).replace(/[\s\u00A0\u200B-\u200D\uFEFF]/g, "").trim()
}
  function isPersonnelRow(row) {
    if(row = row && typeof row == "object" ? row:  {
}, row.isPersonnelCompensation === !0)return !0;
    var text = [row.planGroup, row.plan, row.category, row.entryType, row.type, row.item, row.topic, row.label, row.name, row.description].map(normalizeText).join("|");
    return text.indexOf("แผนงานบุคลากรภาครัฐ") > - 1 || text.indexOf("บุคลากรภาครัฐ") > - 1 || text.indexOf("ค่าตอบแทนผู้ปฏิบัติงาน") > - 1 || text.indexOf("ผู้ปฏิบัติงานให้คณะกรรมาธิการ") > - 1
}
  function typeText(row) {
    return row = row || {
}, [row.entryType, row.type, row.category, row.planGroup, row.item, row.topic, row.label, row.name, row.supportType, row.expenseType, row.description].map(normalizeText).join("|")
}
  function includeType(row) {
    return ! typeFilter || typeText(row).indexOf(normalizeText(typeFilter)) > - 1
}
  function finalize(inputRows, source) {
    var rows2 = (_b32A_(inputRows)).filter(function(row) {
      return ! isPersonnelRow(row)
});
    return rows2 = rows2.map(function(row, idx) {
      return row = row && typeof row == "object" ? row:  {
}, row.__budgetSource = row.__budgetSource || source || "BudgetImports", row.__budgetScannedRows = row.__budgetScannedRows || rows2.length,
      row.__budgetRowNo = idx + 1, row
}), rows2.__budgetSource = source || inputRows && inputRows.__budgetSource || "BudgetImports", rows2.__budgetScannedRows = inputRows && inputRows.__budgetScannedRows || rows2.length,
    rows2.__budgetCacheHit = ! ! (inputRows && inputRows.__budgetCacheHit), typeFilter ? rows2.filter(includeType): rows2
}
  var coreKey = typeof _budgetRowsCacheKey_ == "function" ? _budgetRowsCacheKey_(_b32O_({
}, payload, {
    includePersonnelCompensation: !1
}), "typeRows-no-personnel-v11"): "", cacheAllowed = coreKey && (typeof _budgetHotPathBypass_ != "function" || ! _budgetHotPathBypass_(payload));
  if(cacheAllowed) {
    var cached = typeof _budgetCacheReadRows_ == "function" ? _budgetCacheReadRows_(coreKey): null;
    if(cached)return finalize(cached, "BudgetImports-cache")
}
  var rows = typeof _budgetCanonicalTypeRows_ == "function" ? _budgetCanonicalTypeRows_(payload): [];
  return rows = finalize(rows, "BudgetImports"), cacheAllowed && typeof _budgetCacheWriteRows_ == "function" && (rows = _budgetCacheWriteRows_(coreKey,
  rows, 300) || rows), rows
}
function apiBudgetGetFiscalYears(payload) {
  return BudgetDomain.getFiscalYears(payload || {
})
}
function _apiBudgetListByFYUnifiedCore_(payload, options) {
  var apiName, auth = _bSafeReq_(payload, "viewer", (options = options || {
}).apiName || "apiBudgetListByFY");
  if(! auth.ok)return auth.result;
  payload = auth.payload || {
}, options.fast === !0 && (payload.lite = !0, payload.fast = !0);
  var fy = _budgetNoWaitNormalizeFy_(payload), page = Math.max(1, Number(payload.page || 1) || 1), defaultLimit = options.fast === !0 ? 300: 50,
  requestedLimit = Math.max(1, Math.min(Number(payload.limit || payload.pageSize || defaultLimit) || defaultLimit, 1e3)), desired = Math.max(requestedLimit,
  Math.min(page * requestedLimit, 1e3)), mapped = _budgetNoWaitMapImportRows_(_budgetNoWaitImportRows_(fy, {
    ttl: 180, page, limit: requestedLimit, desired, limitTarget: desired
})), paged = _budgetNoWaitPaged_(mapped, payload, Number(payload.limit || payload.pageSize || (options.fast === !0 ? 300: mapped.length || 50)) || defaultLimit,
  1e3);
  return ok_({
    rows: paged.rows, data: paged.rows, items: paged.rows, records: paged.rows, fy, totalRecords: paged.totalRecords, total: paged.totalRecords,
    page: paged.page, limit: paged.limit, pageSize: paged.limit, totalPages: paged.totalPages, isPaged: !0, serverPaged: !0, lite: payload.lite === !0,
    fast: options.fast === !0, source: options.fast === !0 ? "BudgetImports/no-wait-fast-list-current": "BudgetImports/no-wait-canonical-list-current",
    sourceOfTruth: "BudgetImports", editSource: "BudgetImports", cacheHit: !1, loadOk: !0, contractStamp: "budget-list-no-wait-current"
}, "โหลดรายการงบประมาณสำเร็จ")
}
function apiBudgetListByFY(payload) {
  return _appIsFnName_("_withHotApiTelemetry_") ? _withHotApiTelemetry_("apiBudgetListByFY", payload || {
}, "budget.list", function(p) {
    return BudgetDomain.listByFY(p || {
})
}): BudgetDomain.listByFY(payload || {
})
}
function apiBudgetListByFYFast(payload) {
  return _appIsFnName_("_withHotApiTelemetry_") ? _withHotApiTelemetry_("apiBudgetListByFYFast", payload || {
}, "budget.list.fast", function(p) {
    return BudgetDomain.listByFYFast(p || {
})
}): BudgetDomain.listByFYFast(payload || {
})
}
function _budgetTypeKeyForSummary_(row) {
  var extra = (row = row || {
}).extra || {
}, text = String(_budgetTypeSummaryPick_(row, ["entryType", "ประเภทรายการ", "ประเภทรายการงบประมาณ", "ประเภท", "category", "item", "รายการ",
  "itemName"]) || extra.entryType || extra.category || extra.supportType || "").trim(), compact = text.replace(/\s+/g, ""), committeeType = String(_budgetTypeSummaryPick_(row,
  ["committeeType"]) || extra.committeeType || "").trim();
  return compact.indexOf("ค่าตอบแทนผู้ปฏิบัติงาน") > - 1 || compact.indexOf("ผู้ปฏิบัติงานให้คณะกรรมาธิการ") > - 1 || compact.indexOf("บุคลากรภาครัฐ") > - 1 ? _budgetNoWaitPersonnelLabel_(): compact.indexOf("การประชุมคณะอนุกรรมาธิการ") > - 1 || committeeType.indexOf("อนุ") > - 1 ? "การประชุมคณะอนุกรรมาธิการ": compact.indexOf("การประชุมคณะกรรมาธิการ") > - 1 || compact.indexOf("เบี้ยประชุม") > - 1 || Number(row.meetingAllowance || 0) > 0 ? "การประชุมคณะกรรมาธิการ": compact.indexOf("ศึกษาดูงานในประเทศและการจัดสัมมนา") > - 1 ? "การศึกษาดูงานในประเทศและการจัดสัมมนา": compact.indexOf("ศึกษาดูงานในประเทศ") > - 1 ? "การศึกษาดูงานในประเทศ": compact.indexOf("การจัดสัมมนา") > - 1 || compact.indexOf("สัมมนา") > - 1 || Number(row.seminarCost || 0) > 0 ? "การจัดสัมมนา": compact.indexOf("ศึกษาดูงานต่างประเทศ") > - 1 || compact.indexOf("ต่างประเทศ") > - 1 && compact.indexOf("รับรอง") === - 1 || Number(row.foreignTripCost || 0) > 0 ? "การศึกษาดูงานต่างประเทศ": compact.indexOf("รับรองแขกต่างประเทศ") > - 1 || compact.indexOf("รับรอง") > - 1 || Number(row.foreignGuestCost || 0) > 0 ? "การรับรองแขกต่างประเทศ": compact.indexOf("ส่งเสริม") > - 1 && compact.indexOf("สนับสนุน") > - 1 || Number(row.supportCost || 0) > 0 ? "ค่าใช้จ่ายในการส่งเสริมและสนับสนุนการทำงานของคณะกรรมาธิการ": text || "อื่น ๆ"
}
function _budgetAggregateTypeSummaryRows_(rows) {
  var totals = {
    records: 0, totalAmount: 0, byType:  {
}
};
  return(_b32A_(rows)).forEach(function(row) {
    row = row || {
};
    var type = _budgetTypeKeyForSummary_(row);
    totals.byType[type] || (totals.byType[type] = {
      type, records: 0, totalAmount: 0, supportCost: 0, meetingAllowance: 0, travelCost: 0, seminarCost: 0, foreignTripCost: 0, foreignGuestCost: 0,
      personnelExpense: 0
});
    var bucket = totals.byType[type];
    bucket.records += 1, totals.records += 1;
    var isPersonnelRow = _appIsFnName_("_budgetIsPersonnelCompensationTypeRow_") && _budgetIsPersonnelCompensationTypeRow_(row), totalAmount = _b32N_(isPersonnelRow ? row.personnelExpense || row.staffExpense || row.ytdExpense || row.salaryExpense || row.compensationExpense || row.allowanceExpense || row.currentMonthlyExpense || row.monthlyRateTotal || row.totalPaid || row.totalSpent || row.spent || row.expense || 0: row.totalAmount || row.amount || row.spent || row.expense || row.personnelExpense || row.staffExpense || 0);
    bucket.totalAmount += totalAmount, totals.totalAmount += totalAmount, isPersonnelRow && (bucket.personnelExpense += totalAmount), ["supportCost",
    "meetingAllowance", "travelCost", "seminarCost", "foreignTripCost", "foreignGuestCost"].forEach(function(key) {
      bucket[key] += _b32N_(row[key] || 0)
})
}), totals.byTypeRows = Object.keys(totals.byType).sort(function(a, b) {
    return a.localeCompare(b, "th")
}).map(function(type) {
    return totals.byType[type]
}), totals
}
function _budgetTypeSummaryDirtyKey_(fy) {
  return"budget:core:type-summary:dirty:" + (fy = String(fy || "").replace(/[^0-9]/g, ""))
}
function _budgetMarkTypeSummaryDirty_(payload, reason) {
  payload = payload || {
};
  var fy = "";
  try {
    fy = _budgetNoWaitNormalizeFy_(payload) || _budgetCanonicalPayloadFy_(payload) || ""
}
  catch(_e) {
    fy = ""
}
  var marker = {
    ok: !0, dirty: !0, fy: fy = String(fy || "").replace(/[^0-9]/g, ""), reason: String(reason || "budget-write"), markedAt: new Date().toISOString(),
    owner: "Code_32_Domain_Budget:fast-save-dirty-marker-current", sourceOfTruth: "BudgetImports", readModelRefresh: "deferred"
};
  if(! fy)return marker;
  try {
    _appIsFnName_("_AppCachePutJson_") && _AppCachePutJson_(_budgetTypeSummaryDirtyKey_(fy), marker, 21600)
}
  catch(_cacheErr) {
    marker.cacheError = String(_cacheErr && _cacheErr.message || _cacheErr)
}
  return marker
}
function _budgetReadTypeSummaryDirty_(fy) {
  if(! (fy = String(fy || "").replace(/[^0-9]/g, "")))return {
    ok: !0, dirty: !1, fy: ""
};
  try {
    var hit = _appIsFnName_("_AppCacheGetJson_") ? _AppCacheGetJson_(_budgetTypeSummaryDirtyKey_(fy)): null;
    if(hit && hit.dirty)return _b32O_({
      ok: !0, dirty: !0, fy
}, hit)
}
  catch(_cacheErr) {
    return {
      ok: !1, dirty: !1, fy, error: String(_cacheErr && _cacheErr.message || _cacheErr)
}
}
  return {
    ok: !0, dirty: !1, fy
}
}
function _budgetClearTypeSummaryDirty_(fy) {
  var res = {
    ok: !0, cleared: !1, fy: fy = String(fy || "").replace(/[^0-9]/g, "")
};
  if(! fy)return res;
  try {
    _appIsFnName_("_AppCachePutJson_") && (_AppCachePutJson_(_budgetTypeSummaryDirtyKey_(fy), {
      ok: !0, dirty: !1, fy, clearedAt: new Date().toISOString(), owner: "Code_32_Domain_Budget:fast-save-dirty-marker-current"
}, 5), res.cleared = !0)
}
  catch(_cacheErr) {
    res.ok = !1, res.error = String(_cacheErr && _cacheErr.message || _cacheErr)
}
  return res
}
function _budgetShouldRefreshReadModelNow_(payload) {
  return(payload = payload || {
}).syncReadModelRefresh === !0 || payload.forceReadModelRefresh === !0 || payload.refreshReadModelNow === !0
}
function _budgetRefreshReadModelAfterWrite_(payload, reason) {
  payload = payload || {
};
  var fy = "";
  try {
    fy = _budgetNoWaitNormalizeFy_(payload) || _budgetCanonicalPayloadFy_(payload) || ""
}
  catch(_e) {
    fy = ""
}
  var res = {
    ok: !0, reason: String(reason || "budget-write"), fy, invalidatedAt: new Date().toISOString()
};
  try {
    _appIsFnName_("_AppCacheInvalidateDomain_") && (res.budgetCache = _AppCacheInvalidateDomain_("budget"), res.budgetImportsCache = _AppCacheInvalidateDomain_("budgetimports"))
}
  catch(_cacheErr) {
    res.cacheError = String(_cacheErr && _cacheErr.message || _cacheErr)
}
  try {
    fy && _appIsFnName_("_budgetRefreshTypeSummaryReadModel_") && (res.readModel = _budgetRefreshTypeSummaryReadModel_(_b32O_({
}, payload, {
      fy, forceFresh: !0, afterWrite: !0
})))
}
  catch(_rmErr) {
    res.readModelError = String(_rmErr && _rmErr.message || _rmErr)
}
  try {
    typeof AppDataService != "undefined" && AppDataService && AppDataService.refreshSummarySnapshotsAfterInvalidation && (res.summarySnapshots = AppDataService.refreshSummarySnapshotsAfterInvalidation("BudgetImports",
    reason || "budget-write", _b32O_({
}, payload, {
      fy, fiscalYear: fy, forceFresh: !0, refreshSnapshots: !0
})))
}
  catch(_snapshotErr) {
    res.summarySnapshotError = String(_snapshotErr && _snapshotErr.message || _snapshotErr)
}
  return res
}
function _budgetGetTypeSummaryByFYCore_(payload) {
  var auth = _bSafeReq_(payload, "viewer", "apiBudgetGetTypeSummaryByFY");
  if(! auth.ok)return auth.result;
  var fy = _budgetNoWaitNormalizeFy_(payload = auth.payload || {
}), limit = Math.max(10, Math.min(Number(payload.limit || payload.pageSize || 20) || 20, 100)), page = Math.max(1, Number(payload.page || 1) || 1);
  payload = _b32O_({
}, payload, {
    fy, fiscalYear: fy, year: fy, limit, pageSize: limit, page, noWait: !0, strictFy: !0, preferCache: payload.forceFresh !== !0, allowReadThrough: !1,
    sourceOfTruth: "BudgetImports", readFromBudgetImports: !0, materializedFirst: !1, readModelFirst: !1, materializedOnly: !1, readModelOnly: !1,
    maxRows: Math.max(limit, Math.min(Number(payload.maxRows || payload.totalTarget || 800) || 800, 1e3))
});
  var started = new Date().getTime(), dirtyMarkerState = _appIsFnName_("_budgetReadTypeSummaryDirty_") ? _budgetReadTypeSummaryDirty_(fy):  {
    ok: !0, dirty: !1, fy
}, allRows = _budgetNoWaitTypeRows_(payload);
  allRows = _b32A_(allRows);
  var paged = _budgetNoWaitPaged_(allRows, payload, limit, 100), totals = {
};
  try {
    totals = _appIsFnName_("_budgetAggregateTypeSummaryRows_") ? _budgetAggregateTypeSummaryRows_(allRows):  {
}
}
  catch(_aggErr) {
    totals = {
}, _b32W_("budget.singleSource.aggregate", _aggErr, {
      fy
})
}
  var elapsed = new Date().getTime() - started, source = String(allRows && allRows.__budgetSource || "BudgetImports/direct-source-of-truth"),
  data = {
    fy, fiscalYear: fy, explicitFy:  ! ! _budgetCanonicalPayloadFy_(payload), strictFy: !0, type: String(payload.type || payload.typeFilter || "ทั้งหมด") || "ทั้งหมด",
    rows: paged.rows, data: paged.rows, items: paged.rows, records: paged.rows, totals, totalRecords: paged.totalRecords, total: paged.totalRecords,
    totalPages: paged.totalPages, page: paged.page, pageSize: paged.limit, limit: paged.limit, isPaged: !0, rowsRead: paged.rows.length, scannedRows: allRows && allRows.__budgetScannedRows || allRows.length,
    partial: paged.totalRecords > paged.rows.length, lite: !0, fast: !0, aggregated: !0, serverPaged: !0, source, sourceOfTruth: "BudgetImports",
    readOwner: "BudgetImports", writeOwner: "BudgetImports", editOwner: "BudgetImports", cacheHit:  ! (! allRows || ! allRows.__budgetCacheHit),
    corePerformance: !0, degraded: !1, materializedRequired: !1, materializedHit: !1, readModelHit: !1, readModelCacheHit: !1, readModelRows: 0,
    readModelUpdatedAt: "", readThroughRefresh: !1, liveDefault: !0, loadOk: !0, elapsedMs: elapsed, policy: _budgetTypeSummaryOwnerPolicy_(),
    dirtyMarker: dirtyMarkerState, readModelBypassed: !0, includePersonnelCompensation: !1, meta:  {
      fy, strictFy: !0, serverPaged: !0, rowsRead: paged.rows.length, scannedRows: allRows && allRows.__budgetScannedRows || allRows.length,
      materializedFirst: !1, readModelFirst: !1, readModelHit: !1, materializedRequired: !1, displaySource: "BudgetImports", noWait: !0,
      windowed: !1, noAnyFyReadPath: !0, noDeadPath: !0, liveDefault: !0, elapsedMs: elapsed, corePerformance: !0, cacheHit:  ! (! allRows || ! allRows.__budgetCacheHit),
      includePersonnelCompensation: !1
}, contractStamp: "budget-type-summary-single-source-current"
};
  return ok_(data, "โหลดข้อมูลสรุปแยกแต่ละประเภทสำเร็จจาก BudgetImports")
}
function apiBudgetGetTypeSummaryByFY(payload) {
  return _appIsFnName_("_withHotApiTelemetry_") ? _withHotApiTelemetry_("apiBudgetGetTypeSummaryByFY", payload || {
}, "budget.typeSummary", function(p) {
    return BudgetDomain.getTypeSummary(p || {
})
}): BudgetDomain.getTypeSummary(payload || {
})
}
function _budgetEditNormalizeKey_(value) {
  return String(value == null ? "": value).trim()
}
function _budgetEditRecordId_(row) {
  return _budgetEditNormalizeKey_(_budgetTypeSummaryPick_(row = row || {
}, ["id", "ID", "importId", "recordId", "budgetId", "uuid", "_id", "เลขที่"]) || "")
}
function _budgetEditMergeJsonPayload_(row) {
  row = row || {
};
  var extra = {
};
  try {
    extra = (_appIsFnName_("_budgetImportExtraPayload_") ? _budgetImportExtraPayload_(row): _budgetParsePayloadExtra_(row, [])) || {
}
}
  catch(_extraErr) {
    extra = {
}
}
  return extra && typeof extra == "object" && ! Array.isArray(extra) ? extra:  {
}
}
function _budgetEditFirst_(row, keys, extra) {
  var v = _appIsFnName_("_budgetTypeSummaryPick_") ? _budgetTypeSummaryPick_(row, keys): "";
  if(v != null && String(v).trim() !== "")return v;
  extra = extra || {
}, keys = Array.isArray(keys) ? keys: [keys];
  for(var i = 0;
  i < keys.length;
  i++) {
    var k = keys[i];
    if(extra[k] != null && String(extra[k]).trim() !== "")return extra[k]
}
  return""
}
function _budgetEditLocations_(row, prefix, extra) {
  extra = extra || {
};
  var key = prefix === "visit" ? "visitLocations": "seminarLocations", list = Array.isArray(extra[key]) ? extra[key]: [];
  if(! list.length) {
    var raw = _budgetEditFirst_(row, [key, key + "Text", key + "Json", key + "JSON"], extra);
    if(String(raw || "").trim().charAt(0) === "[")try {
      var parsed = JSON.parse(String(raw));
      Array.isArray(parsed) && (list = parsed)
}
    catch(_parseLocErr) {
      list = []
}
    else raw && (list = String(raw).split(",").map(function(x) {
      return String(x || "").trim()
}).filter(Boolean))
}
  if(list.length && typeof list[0] == "object") {
    var first = list[0] || {
};
    return {
      text: list.map(function(x) {
        return typeof x == "string" ? x: [x.place || x.location || x.name || "", x.subDistrict || x.subdistrict || x.tambon || "", x.district || x.amphoe || "",
        x.province || ""].filter(Boolean).join(", ")
}).filter(Boolean).join(", "), place: first.place || first.location || first.name || "", province: first.province || "", district: first.district || first.amphoe || "",
      subDistrict: first.subDistrict || first.subdistrict || first.tambon || ""
}
}
  return {
    text: list.join(", "), place: list[0] || "", province: list[1] || "", district: list[2] || "", subDistrict: list[3] || ""
}
}
function _budgetMapImportRowForEdit_(row) {
  row = row || {
};
  var dto = {
};
  try {
    dto = (_appIsFnName_("_mapBudgetImportListRow_") ? _mapBudgetImportListRow_(row): _budgetFastTypeDto_(row, _budgetTypeSummaryFyFromRow_(row))) || {
}
}
  catch(_mapErr) {
    try {
      dto = _budgetFastTypeDto_(row, _budgetTypeSummaryFyFromRow_(row)) || {
}
}
    catch(_fastErr) {
      dto = {
}
}
}
  var extra = _budgetEditMergeJsonPayload_(row), visit = _budgetEditLocations_(row, "visit", extra), seminar = _budgetEditLocations_(row, "seminar",
  extra), rawId = _budgetEditRecordId_(row) || String(dto.id || ""), fy = _budgetTypeSummaryFyFromRow_(row) || String(dto.fy || dto.fiscalYear || "").replace(/[^0-9]/g,
  ""), supportCost = _appIsFnName_("_budgetResolveSupportCostAmount_") ? _budgetResolveSupportCostAmount_(row, extra): _b32N_(_budgetEditFirst_(row,
  ["supportCost"], extra));
  return _b32O_(dto, {
    id: rawId || String(dto.id || ""), importId: rawId || String(dto.id || ""), recordId: rawId || String(dto.id || ""), rawId, fy, fiscalYear: fy,
    entryType: String(_budgetEditFirst_(row, _B32ENTRY, extra) || dto.entryType || dto.category || ""), category: String(_budgetEditFirst_(row,
    _B32R16, extra) || dto.category || dto.entryType || ""), item: String(_budgetEditFirst_(row, ["item", "itemName", "topic", "name", "label",
    "รายการ", "ชื่อรายการ", "รายการงบประมาณ"], extra) || dto.item || ""), committeeType: String(_budgetEditFirst_(row, ["committeeType", "คณะ"],
    extra) || dto.committeeType || ""), committeeName: String(_budgetEditFirst_(row, ["committeeName", "ชื่อคณะ"], extra) || dto.committeeName || ""),
    subcommitteeName: String(_budgetEditFirst_(row, _B32R4, extra) || dto.subcommitteeName || dto.committeeName || ""), roundNo: String(_budgetEditFirst_(row,
    ["roundNo", "ครั้งที่"], extra) || dto.roundNo || ""), topic: String(_budgetEditFirst_(row, ["topic", "name", "label", "หัวข้อ", "ชื่อเรื่อง"],
    extra) || dto.topic || dto.item || ""), seminarTitle: String(_budgetEditFirst_(row, _B32R6, extra) || dto.seminarTitle || dto.topic || ""),
    supportType: String(_budgetEditFirst_(row, _B32R20, extra) || dto.supportType || dto.item || ""), detail: String(_budgetEditFirst_(row, _B32R7,
    extra) || dto.detail || dto.note || ""), guestCountry: String(_budgetEditFirst_(row, ["guestCountry", "ประเทศของแขก"], extra) || dto.guestCountry || dto.countriesText || extra.countriesText || ""),
    startDate: _bFormatDate(_budgetEditFirst_(row, ["startDate", "วันที่เริ่ม"], extra) || dto.startDate || ""), endDate: _bFormatDate(_budgetEditFirst_(row,
    ["endDate", "วันที่สิ้นสุด"], extra) || dto.endDate || ""), activityDate: _bFormatDate(_budgetEditFirst_(row, ["activityDate", "date", "วันที่",
    "วันเดือนปี", "วันที่ดำเนินการ"], extra) || dto.activityDate || ""), seminarDate: _bFormatDate(_budgetEditFirst_(row, _B32R11, extra) || dto.seminarDate || extra.semDate || ""),
    committeeResponsible: String(_budgetEditFirst_(row, ["committeeResponsible", "responsibleCommittee", "committeeOwner", "กรรมาธิการรับผิดชอบ"],
    extra) || dto.committeeResponsible || ""), staffResponsible: String(_budgetEditFirst_(row, ["staffResponsible", "responsibleStaff", "operationOfficer",
    "officer", "เจ้าหน้าที่รับผิดชอบ", "เจ้าหน้าที่"], extra) || dto.staffResponsible || ""), note: String(_budgetEditFirst_(row, ["note", "remark",
    "remarks", "หมายเหตุ"], extra) || dto.note || ""), refundStatus: String(_budgetEditFirst_(row, ["refundStatus", "สถานะคืนเงิน", "สถานะการคืนเงิน"],
    extra) || dto.refundStatus || "ยังไม่คืนเงิน"), refundDate: _bFormatDate(_budgetEditFirst_(row, ["refundDate", "วันที่คืนเงิน", "วันคืนเงิน"],
    extra) || dto.refundDate || ""), reportStatus: String(_budgetEditFirst_(row, ["reportStatus", "สถานะรายงาน", "สถานะรายงานค่าใช้จ่าย"], extra) || dto.reportStatus || "ยังไม่รายงาน"),
    reportDate: _bFormatDate(_budgetEditFirst_(row, ["reportDate", "วันที่รายงาน", "วันรายงาน"], extra) || dto.reportDate || ""), meetingAllowance: _b32N_(_budgetEditFirst_(row,
    ["meetingAllowance", "ค่าเบี้ยประชุม"], extra) || dto.meetingAllowance), snackCost: _b32N_(_budgetEditFirst_(row, ["snackCost", "ค่าอาหารว่าง"],
    extra) || dto.snackCost), lunchCost: _b32N_(_budgetEditFirst_(row, ["lunchCost", "ค่าอาหารกลางวัน"], extra) || dto.lunchCost), travelCost: _b32N_(_budgetEditFirst_(row,
    ["travelCost", "ค่าเดินทาง", "ค่าใช้จ่ายเดินทาง"], extra) || dto.travelCost), receptionCost: _b32N_(_budgetEditFirst_(row, ["receptionCost",
    "ค่ารับรอง"], extra) || dto.receptionCost), seminarCost: _b32N_(_budgetEditFirst_(row, ["seminarCost", "ค่าใช้จ่ายสัมมนา"], extra) || dto.seminarCost),
    foreignTripCost: _b32N_(_budgetEditFirst_(row, ["foreignTripCost", "foreignStudyCost"], extra) || dto.foreignTripCost), foreignGuestCost: _b32N_(_budgetEditFirst_(row,
    ["foreignGuestCost", "guestCost"], extra) || dto.foreignGuestCost), supportCost, amount: _b32N_(_budgetEditFirst_(row, ["amount", "totalAmount",
    "rowAmount", "จำนวนเงิน", "ยอดรวม", "รวมเป็นเงิน"], extra) || dto.amount || dto.totalAmount || supportCost), totalAmount: _b32N_(_budgetEditFirst_(row,
    ["totalAmount", "amount", "rowAmount", "จำนวนเงิน", "ยอดรวม", "รวมเป็นเงิน"], extra) || dto.totalAmount || dto.amount || supportCost), visitLocations: String(_budgetEditFirst_(row,
    _B32R18, extra) || dto.visitLocations || visit.text || ""), visitPlace: String(_budgetEditFirst_(row, ["visitPlace", "สถานที่ศึกษาดูงาน",
    "สถานที่"], extra) || dto.visitPlace || visit.place || ""), visitProvince: String(_budgetEditFirst_(row, ["visitProvince", "จังหวัด"], extra) || dto.visitProvince || visit.province || ""),
    visitDistrict: String(_budgetEditFirst_(row, ["visitDistrict", "อำเภอ", "อำเภอ/เขต"], extra) || dto.visitDistrict || visit.district || ""),
    visitSubDistrict: String(_budgetEditFirst_(row, ["visitSubDistrict", "visitSubdistrict", "ตำบล", "ตำบล/แขวง"], extra) || dto.visitSubDistrict || visit.subDistrict || ""),
    seminarLocations: String(_budgetEditFirst_(row, _B32R13, extra) || dto.seminarLocations || seminar.text || ""), seminarPlace: String(_budgetEditFirst_(row,
    _B32R15, extra) || dto.seminarPlace || seminar.place || ""), seminarProvince: String(_budgetEditFirst_(row, _B32R9, extra) || dto.seminarProvince || seminar.province || ""),
    seminarDistrict: String(_budgetEditFirst_(row, _B32R10, extra) || dto.seminarDistrict || seminar.district || ""), seminarSubDistrict: String(_budgetEditFirst_(row,
    _B32R3, extra) || dto.seminarSubDistrict || seminar.subDistrict || ""), countriesText: String(_budgetEditFirst_(row, ["countriesText", "ประเทศ",
    "ประเทศที่เดินทางไป"], extra) || dto.countriesText || extra.countriesText || ""), seminarItemsJson: String(_budgetEditFirst_(row, _B32R19,
    extra) || dto.seminarItemsJson || ""), visitLocationsJson: String(_budgetEditFirst_(row, _B32R14, extra) || dto.visitLocationsJson || ""),
    seminarLocationsJson: String(_budgetEditFirst_(row, _B32R8, extra) || dto.seminarLocationsJson || ""), countriesJson: String(_budgetEditFirst_(row,
    ["countriesJson", "countriesJSON"], extra) || dto.countriesJson || ""), payloadJson: String(_budgetEditFirst_(row, ["payloadJson", "payloadJSON"],
    extra) || dto.payloadJson || ""), extraJson: String(_budgetEditFirst_(row, ["extraJson", "extraJSON"], extra) || dto.extraJson || ""), extra,
    _raw: row, source: "BudgetImports/edit-direct"
}), ! dto.supportCost && String(dto.entryType || "").replace(/\s+/g, "").indexOf("ส่งเสริม") > - 1 && (dto.supportCost = dto.amount || dto.totalAmount || 0),
  dto
}
function _budgetEditScoreCandidate_(candidate, wanted) {
  candidate = candidate || {
};
  var score = 0, id = _budgetEditRecordId_(wanted = wanted || {
});
  id && _budgetEditRecordId_(candidate) === id && (score += 1e3);
  var fy = String(_budgetEditFirst_(wanted, _B32R5, {
}) || "").replace(/[^0-9]/g, "");
  fy && _budgetTypeSummaryFyFromRow_(candidate) === fy && (score += 80), ["entryType", "category", "item", "topic", "roundNo", "committeeName",
  "subcommitteeName", "activityDate", "startDate", "endDate"].forEach(function(k) {
    var a = String(_budgetEditFirst_(candidate, [k], {
}) || "").trim(), b = String(_budgetEditFirst_(wanted, [k], {
}) || "").trim();
    a && b && a === b && (score += 12)
});
  var ca = _b32N_(_budgetEditFirst_(candidate, _B32R1, {
})), wa = _b32N_(_budgetEditFirst_(wanted, _B32R1, {
}));
  return ca && wa && Math.abs(ca - wa) < .01 && (score += 30), score
}
function _budgetFindImportRecordForEdit_(payload) {
  var base = (payload = payload || {
}).baseRecord || payload.record || payload.row || payload.data || payload || {
}, id = _budgetEditNormalizeKey_(payload.id || payload.importId || payload.recordId || payload.budgetId || payload.rowId || _budgetEditRecordId_(base)),
  fy = String(payload.fy || payload.fiscalYear || payload.budgetFy || payload.budgetYear || _budgetEditFirst_(base, _B32R5, {
}) || "").replace(/[^0-9]/g, ""), row = null, source = "";
  if(id && id.indexOf("row-") !== 0)try {
    var repo = _getBudgetImportRepository_ && _getBudgetImportRepository_();
    repo && _appIsFn_(repo.findByKey) && (row = repo.findByKey(id, {
      includeDeleted: !1, requireCanonical: !1
}) || null), row && (source = "BudgetImports/repository-key")
}
  catch(_repoErr) {
    _b32W_("budget.edit.find.repo", _repoErr, {
      id
})
}
  if(! row) {
    var rows = [];
    try {
      rows = _budgetDirectSheetObjects_("BudgetImports", {
        forceFresh: payload.forceFresh === !0 || payload.noCache === !0, ttl: payload.forceFresh === !0 || payload.noCache === !0 ? 0: 120
}) || []
}
    catch(_directErr) {
      try {
        rows = _budgetListImportRowsRobust_(payload || {
}) || []
}
      catch(_robustErr) {
        rows = []
}
}
    if(rows = (_b32A_(rows)).filter(function(r) {
      return r && ! _budgetNoWaitDeleted_(r) && (! fy || _budgetTypeSummaryFyFromRow_(r) === fy)
}), id && id.indexOf("row-") !== 0 && (row = rows.filter(function(r) {
      return _budgetEditRecordId_(r) === id
})[0] || null) && (source = "BudgetImports/direct-key"), ! row && base && typeof base == "object") {
      var best = null, bestScore = 0;
      rows.forEach(function(r) {
        var sc = _budgetEditScoreCandidate_(r, base);
        sc > bestScore && (bestScore = sc, best = r)
}), best && (bestScore >= 40 || fy && bestScore >= 30) && (source = "BudgetImports/direct-signature", (row = best).__budgetEditMatchScore = bestScore)
}
}
  if(! row)return null;
  var dto = _budgetMapImportRowForEdit_(row);
  return dto.__budgetEditSource = source || "BudgetImports", dto.__budgetEditMatchScore = row.__budgetEditMatchScore || 0, dto
}
function apiBudgetGetImportForEdit(payload) {
  var auth = _bSafeReq_(payload, "viewer", "apiBudgetGetImportForEdit");
  if(! auth.ok)return auth.result;
  payload = auth.payload || {
};
  try {
    var record = _budgetFindImportRecordForEdit_(payload);
    return record ? ok_({
      record, row: record, data: record, id: record.id, fy: record.fy, fiscalYear: record.fiscalYear, source: record.__budgetEditSource || "BudgetImports/edit-direct",
      matchScore: record.__budgetEditMatchScore || 0, contractStamp: "budget-import-edit-direct-current"
}, "โหลดรายการงบประมาณสำหรับแก้ไขสำเร็จ"): err_("ไม่พบรายการงบประมาณสำหรับแก้ไข", {
      record: null, row: null, data: null, source: "BudgetImports/edit-direct", requestedId: String(payload && payload.id || "")
})
}
  catch(e) {
    return err_(e && e.message ? e.message: String(e), {
      record: null, row: null, data: null, source: "BudgetImports/edit-direct"
})
}
}
function apiBudgetSaveImport(payload) {
  return BudgetDomain.saveImport(payload || {
})
}
function apiBudgetDeleteImport(payload) {
  return BudgetDomain.deleteImport(payload || {
})
}
var BUDGET_HOT_READ_MODEL_STAMP = "budget-summary-central-dto-r77";
var BUDGET_CACHE_POLICY_STAMP = "budget-cache-policy-single-owner-r77";

/* --------------------------------------------------------------------------
 * 7. Single Budget cache policy
 * -------------------------------------------------------------------------- */
function _budgetCachePolicyBypass_(payload) {
  payload = payload || {
};
  return payload.forceFresh === !0 || payload.forceRefresh === !0 || payload.noCache === !0 || payload.bypassCache === !0 || payload.__snapshotRefreshAfterInvalidation === !0 || payload.__budgetBackendCacheBypass === !0
}
function _budgetCachePolicyNumber_(value, fallback, min, max) {
  var n = Number(value);
  return isFinite(n) && n > 0 ? Math.max(Number(min || 1), Math.min(n, Number(max || 900))): Number(fallback || 60)
}
function _budgetCachePolicyScopeDefaults_(scope) {
  scope = String(scope || "summary").toLowerCase();
  if(scope.indexOf("dashboard") !== - 1)return {
    ttl: 60, max: 180, stale: 600, requireWorkflow: !0, requireOverview: !0
};
  if(scope.indexOf("workflow") !== - 1 || scope.indexOf("status") !== - 1)return {
    ttl: 60, max: 180, stale: 600, requireWorkflow: !0
};
  if(scope.indexOf("report") !== - 1)return {
    ttl: 90, max: 180, stale: 600, requireReport: !0
};
  if(scope.indexOf("rows") !== - 1 || scope.indexOf("canonical") !== - 1)return {
    ttl: 120, max: 300, stale: 600
};
  if(scope.indexOf("snapshot") !== - 1)return {
    ttl: 120, max: 180, stale: 600
};
  return {
    ttl: 90, max: 180, stale: 600
}
}
function _budgetCachePolicy_(payload, scope) {
  payload = payload || {
};
  var d = _budgetCachePolicyScopeDefaults_(scope), manual = _budgetCachePolicyBypass_(payload), ttl = _budgetCachePolicyNumber_(payload.cacheTtlSeconds,
  d.ttl, 15, d.max), snapshotTtl = _budgetCachePolicyNumber_(payload.snapshotTtlSeconds || payload.cacheTtlSeconds, d.ttl, 15, d.max), requireWorkflow = ! ! (d.requireWorkflow || payload.includeWorkflow === !0 || payload.__phaseEBudgetHydration === !0),
  requireReport = ! ! (d.requireReport || payload.includeReport === !0), requireOverview = ! ! d.requireOverview;
  return {
    owner: "Code_32_Domain_Budget.BudgetCachePolicy.r77", stamp: BUDGET_CACHE_POLICY_STAMP, scope: String(scope || "summary"), manualRefresh: manual,
    allowRead:  ! manual, allowWrite:  ! manual, ttlSeconds: ttl, snapshotTtlSeconds: snapshotTtl, staleTtlSeconds: _budgetCachePolicyNumber_(payload.staleTtlSeconds,
    d.stale, 60, 900), requireWorkflow: requireWorkflow, requireReport: requireReport, requireOverview: requireOverview
}
}
function _budgetCachePolicyTtl_(payload, scope, fallback) {
  var p = _budgetCachePolicy_(payload || {
}, scope);
  return _budgetCachePolicyNumber_(fallback || p.ttlSeconds, p.ttlSeconds, 15, 900)
}
function _budgetCachePolicyCompleteness_(res) {
  var data = _budgetReadModelData_(res), comp = data && data.meta && data.meta.dataCompleteness ? data.meta.dataCompleteness: _budgetReadModelDataCompleteness_(data);
  return comp || {
}
}
function _budgetCachePolicyCanStoreSummary_(res, payload, scope) {
  try {
    var policy = _budgetCachePolicy_(payload || {
}, scope || "summary");
    if(! res || res.ok === !1 || ! _budgetSummaryResultHasDataPhaseE_(res))return !1;
    var comp = _budgetCachePolicyCompleteness_(res);
    if(policy.requireOverview && comp.overview !== !0)return !1;
    if(policy.requireWorkflow && comp.workflow !== !0)return !1;
    if(policy.requireReport && comp.report !== !0)return !1;
    return !0
}
  catch(_budgetPolicyStoreErr) {
    _b32W_("budget.cachePolicy.canStore", _budgetPolicyStoreErr, {
      scope: String(scope || "")
});
    return !1
}
}
function _budgetCachePolicyMeta_(meta, policy, cacheInfo) {
  return _b32O_({
}, meta || {
}, {
    cachePolicyOwner: policy && policy.owner || "Code_32_Domain_Budget.BudgetCachePolicy.r77", cachePolicyStamp: BUDGET_CACHE_POLICY_STAMP, cacheScope: policy && policy.scope || "summary",
    cacheTtlSeconds: policy && policy.ttlSeconds, cacheManualRefresh:  ! ! (policy && policy.manualRefresh), cacheStatus: cacheInfo && cacheInfo.status || meta && meta.cacheStatus || ""
})
}
function _budgetHotSummaryCacheKey_(payload) {
  payload = payload || {
};
  var scope = {
    fy: String(payload.fy || payload.fiscalYear || payload.year || "").replace(/[^0-9]/g, ""), fast: payload.fast === !0 ? 1: 0, includeSpent: payload.includeSpent === !1 ? 0: 1,
    includeWorkflow: payload.includeWorkflow === !0 || payload.__phaseEBudgetHydration === !0 ? 1: 0, includeReport: payload.includeReport === !0 ? 1: 0,
    budgetStamp: _appIsFnName_("_entityCacheStamp_") ? String(_entityCacheStamp_("budget") || "1"): "1", importsStamp: _appIsFnName_("_entityCacheStamp_") ? String(_entityCacheStamp_("budgetimports") || "1"): "1",
    model: BUDGET_HOT_READ_MODEL_STAMP, policy: BUDGET_CACHE_POLICY_STAMP
}, seed = JSON.stringify(scope);
  return"budget_summary_hot_read_model_" + (_appIsFnName_("_buildDigestHex_") ? _buildDigestHex_(seed): Utilities.base64EncodeWebSafe(seed).substring(0,
  80))
}
function _budgetHotAttachMeta_(res, payload, started, cacheInfo) {
  res = res && typeof res == "object" ? res:  {
    ok: !1, data:  {
}
};
  var data = res.data && typeof res.data == "object" && ! Array.isArray(res.data) ? res.data: res, rows = Array.isArray(data.rows) ? data.rows: _b32A_(data.items),
  meta = _b32O_({
}, data.meta || res.meta || {
}, {
    method: "apiBudgetGetSummary", readModel: BUDGET_HOT_READ_MODEL_STAMP, readModelOwner: "Code_32_Domain_Budget.budgetSummaryReadModelOverlay",
    durationMs: Math.max(0, Date.now() - Number(started || Date.now())), rowsRead: Number(data.rowsRead || res.rowsRead || rows.length || 0) || 0,
    rowsReturned: rows.length, cacheHit:  ! ! (cacheInfo && cacheInfo.hit), cacheStatus: cacheInfo && cacheInfo.status || "bypass", cacheKey: cacheInfo && cacheInfo.key || "",
    source: "apiBudgetGetSummary.readModelOverlay", backendCacheBypass: _budgetCachePolicyBypass_(payload) || payload.__budgetBackendCacheBypass === !0,
    snapshotReadBypassed: _budgetCachePolicyBypass_(payload) || payload.__budgetBackendCacheBypass === !0
});
  return data.meta = meta, data.readModel = BUDGET_HOT_READ_MODEL_STAMP, data.cacheHit = meta.cacheHit, data.cacheStatus = meta.cacheStatus, data.durationMs = meta.durationMs,
  data.rowsRead = meta.rowsRead, data.rowsReturned = meta.rowsReturned, res.meta = _b32O_({
}, res.meta || {
}, meta), res.readModel = BUDGET_HOT_READ_MODEL_STAMP, res.cacheHit = meta.cacheHit, res.cacheStatus = meta.cacheStatus, res.durationMs = meta.durationMs,
  res.rowsRead = meta.rowsRead, res.rowsReturned = meta.rowsReturned, res
}
function _budgetSummaryReadThrough_(payload, builder) {
  payload = payload || {
};
  var started = Date.now(), policy = _budgetCachePolicy_(payload, "summary"), allowCache = policy.allowRead, key = _budgetHotSummaryCacheKey_(payload),
  cacheInfo = {
    key: key, status: allowCache ? "miss": "bypass", hit: !1, policy: BUDGET_CACHE_POLICY_STAMP, owner: policy.owner
};
  if(allowCache && _appIsFnName_("_cacheGetJson_"))try {
    var hit = _cacheGetJson_(key);
    if(hit && typeof hit == "object" && _budgetCachePolicyCanStoreSummary_(hit, payload, "summary"))return cacheInfo.status = "hit", cacheInfo.hit = !0,
    _budgetHotAttachMeta_(hit, payload, started, cacheInfo);
    hit && typeof hit == "object" && (cacheInfo.status = "skip-incomplete-hit")
}
  catch(cacheErr) {
    cacheInfo.status = "read-error", _b32W_("budget.summary.cachePolicy.cacheGet", cacheErr)
}
  var res = _budgetHotAttachMeta_(builder(payload || {
}), payload, started, cacheInfo);
  try {
    var data = res && res.data && typeof res.data == "object" ? res.data: res;
    if(data && typeof data == "object")data.meta = _budgetCachePolicyMeta_(data.meta || res.meta || {
}, policy, cacheInfo)
}
  catch(_policyMetaErr) {
}
  if(policy.allowWrite && res && res.ok !== !1 && _budgetCachePolicyCanStoreSummary_(res, payload, "summary") && _appIsFnName_("_cachePutJson_"))try {
    _cachePutJson_(key, res, policy.ttlSeconds)
}
  catch(cachePutErr) {
    _b32W_("budget.summary.cachePolicy.cachePut", cachePutErr)
}
  return res
}

/* --------------------------------------------------------------------------
 * 9. Public API facade — Summary / FY / List / Save / Delete
 * -------------------------------------------------------------------------- */
function apiBudgetGetSummary(payload) {
  if(payload = payload || {
}, payload && payload.__phaseEBudgetHydration && ! payload.__phaseOBudgetDashboardOwnerBypass)try {
    var dashPayload = _b32O_({
}, payload, {
      __phaseOBudgetDashboardOwnerBypass: !0, forceFresh: payload.forceFresh === !0, noCache: payload.noCache === !0, bypassCache: payload.bypassCache === !0,
      cacheTtlSeconds: Number(payload.cacheTtlSeconds || 600) || 600, snapshotTtlSeconds: Number(payload.snapshotTtlSeconds || 600) || 600
});
    return BudgetDomain && typeof BudgetDomain.getDashboardSummaryForDashboard == "function" ? BudgetDomain.getDashboardSummaryForDashboard(dashPayload): ok_(_budgetDashboardEmptyPayloadPhaseE_("phase4-budget-domain-owner-unavailable"),
    "ข้ามการโหลดงบประมาณ: BudgetDomain ยังไม่พร้อม")
}
  catch(_dashBudgetErr) {
    _b32W_("budget.summary.phaseO.dashboardHydration", _dashBudgetErr)
}
  var started = Date.now(), backendBypass = _budgetCachePolicyBypass_(payload), fy = String(payload.fy || payload.fiscalYear || payload.year || "").replace(/[^0-9]/g,
  "");
  if(! fy && _appIsFnName_("_resolveBudgetDefaultFiscalYear_"))try {
    fy = String(_resolveBudgetDefaultFiscalYear_() || "").replace(/[^0-9]/g, "")
}
  catch(_fyErr) {
    fy = ""
}
  var snapshotPolicy = _budgetCachePolicy_(payload, "snapshot"), canUseSnapshot = snapshotPolicy.allowRead && ! backendBypass;
  if(canUseSnapshot && _appIsFnName_("_performanceReadSnapshot_"))try {
    var snap = _performanceReadSnapshot_("budgetsummary", fy || "default");
    if(snap && snap.ok && snap.data)return _budgetHotAttachMeta_({
      ok: !0, data: snap.data, msg: "โหลดสรุปงบประมาณจาก summary snapshot สำเร็จ", source: "BudgetSummarySnapshot.v2"
}, payload, started, {
      key: snap.meta && snap.meta.cacheKey || "", status: "summary-snapshot-hit", hit: !0
})
}
  catch(_budgetSnapshotReadErr) {
    _b32W_("budget.summarySnapshot.read", _budgetSnapshotReadErr)
}
  return _budgetSummaryReadThrough_(_b32O_({
}, payload || {
}, {
    __budgetBackendCacheBypass: backendBypass, forceFresh: payload.forceFresh === !0 || backendBypass, noCache: payload.noCache === !0 || backendBypass,
    bypassCache: payload.bypassCache === !0 || backendBypass, bypassRequestCache: payload.bypassRequestCache === !0 || backendBypass
}), function(p) {
    var res = BudgetDomain.getSummary(p || {
});
    try {
      (p && p.__snapshotRefreshAfterInvalidation) !== !0 && _appIsFnName_("_performanceWriteSnapshot_") && res && res.ok !== !1 && _budgetCachePolicyCanStoreSummary_(res,
      p, "snapshot") && _performanceWriteSnapshot_("budgetsummary", fy || "default", res.data !== void 0 ? res.data: res, {
        source: "apiBudgetGetSummary.direct-refresh.cachePolicy.r77", ttlSeconds: snapshotPolicy.snapshotTtlSeconds, phaseEEmptySnapshotGuard: _budgetCachePolicyCanStoreSummary_(res,
        p, "snapshot"), cachePolicyStamp: BUDGET_CACHE_POLICY_STAMP
})
}
    catch(_budgetSnapshotWriteErr) {
      _b32W_("budget.summarySnapshot.write", _budgetSnapshotWriteErr)
}
    return res
})
}
function apiBudgetGetSubcommitteeOptions(payload) {
  var auth = _bSafeReq_(payload, "viewer", "apiBudgetGetSubcommitteeOptions");
  return auth.ok ? (payload = auth.payload, _normalizeOkEnvelope_(typeof _Domain_budgetUnifiedSubcommitteeOptions == "function" ? _Domain_budgetUnifiedSubcommitteeOptions(payload): [],
  "โหลดรายการคณะอนุกรรมาธิการสำเร็จ", "โหลดรายการคณะอนุกรรมาธิการไม่สำเร็จ")): auth.result
}
function _budgetRefreshTypeSummaryReadModel_(payload) {
  if(typeof AppDataService != "undefined" && AppDataService && AppDataService.refreshBudgetTypeSummary)return AppDataService.refreshBudgetTypeSummary(payload || {
});
  throw new Error("APP_DATA_SERVICE_UNAVAILABLE: budget type summary read model")
}
function _budgetGetFiscalYearsDomainOwnerPhase5_(payload) {
  var auth = _bSafeReq_(payload, "viewer", "apiBudgetGetFiscalYears");
  if(! auth.ok)return auth.result;
  payload = auth.payload;
  var d = new Date, currentFy = String(d.getMonth() >= 9 ? d.getFullYear() + 544: d.getFullYear() + 543), yearsMap = {
};
  function addFiscalYearOption(fy2) {
    (fy2 = _b32FY_(fy2)) && (yearsMap[fy2] = !0)
}
  for(var fy = 2569;
  fy <= 2576;
  fy++)addFiscalYearOption(fy);
  addFiscalYearOption(currentFy);
  var defaultFy = currentFy;
  try {
    addFiscalYearOption(defaultFy = _resolveBudgetDefaultFiscalYear_() || currentFy)
}
  catch(_e) {
    _b32W_("budget.fiscalYears.defaultFy", _e)
}
  var years = Object.keys(yearsMap).sort(function(a, b) {
    return Number(a) - Number(b)
});
  return ok_({
    years, currentFy: defaultFy, calendarCurrentFy: currentFy, defaultFy, source: "fixed-range-fast"
}, "โหลดตัวเลือกปีงบประมาณสำเร็จ")
}
function _budgetSaveImportDomainOwnerPhase5_(payload) {
  return writeGateway_("apiBudgetSaveImport", payload || {
}, function(input) {
    var auth = _bSafeReq_(input, "staff", "apiBudgetSaveImport");
    if(! auth.ok)return auth.result;
    input = auth.payload;
    var _syncReadModelRefresh = _appIsFnName_("_budgetShouldRefreshReadModelNow_") ? _budgetShouldRefreshReadModelNow_(input):  ! (! input || input.syncReadModelRefresh !== !0 && input.forceReadModelRefresh !== !0 && input.refreshReadModelNow !== !0),
    _fastUiSave = ! input || input.skipReadModelRefresh === !0 || input.uiFastSave === !0 || input.fastSave === !0 || ! _syncReadModelRefresh;
    if(input && input.__budgetCriticalPathDryRun === !0)return ok_({
      dryRun: !0, writeAuthOk: !0, csrfVerifiedByRouter: !0, method: "apiBudgetSaveImport", fy: _budgetCanonicalPayloadFy_(input) || "",
      id: String(input.id || input.importId || input.recordId || ""), entryType: String(input.entryType || input.category || ""), staffResponsible: String(input.staffResponsible || ""),
      fastUiSave:  ! ! _fastUiSave, owner: "Code_32_Domain_Budget:budget-critical-path-current"
}, "ตรวจ Budget write path สำเร็จโดยไม่เขียนข้อมูลจริง");
    auditEvent_("budget", {
      route: "apiBudgetSaveImport", fy: _budgetCanonicalPayloadFy_(input) || ""
});
    var _res = _normalizeOkEnvelope_(budgetUnifiedSaveImport(input), "บันทึกรายการงบประมาณสำเร็จ", "บันทึกรายการงบประมาณไม่สำเร็จ");
    try {
      if(_res && _res.ok !== !1)if(_fastUiSave) {
        try {
          typeof AppRepository != "undefined" && AppRepository.afterWrite ? AppRepository.afterWrite(_B32R21): _appIsFnName_("_AppCacheInvalidateDomain_") && (_AppCacheInvalidateDomain_("budget"),
          _AppCacheInvalidateDomain_("budgetimports"), _AppCacheInvalidateDomain_("dashboard"))
}
        catch(_cacheErr) {
          _b32W_("budget.cache.invalidate.fastSave", _cacheErr)
}
        _res.dirtyMarker = _appIsFnName_("_budgetMarkTypeSummaryDirty_") ? _budgetMarkTypeSummaryDirty_(input, "apiBudgetSaveImport"): null, _res.readModelRefresh = {
          ok: !0, skipped: !0, reason: "ui-fast-save-deferred-refresh", fy: _budgetCanonicalPayloadFy_(input) || "", dirtyMarker:  ! ! _res.dirtyMarker
}
}
      else _res.readModelRefresh = _budgetRefreshReadModelAfterWrite_(input, "apiBudgetSaveImport")
}
    catch(_corecoreErr) {
      _res && typeof _res == "object" && (_res.readModelError = String(_corecoreErr && _corecoreErr.message || _corecoreErr))
}
    return _res
}, "บันทึกรายการงบประมาณสำเร็จ", "บันทึกรายการงบประมาณไม่สำเร็จ")
}
function _budgetDeleteImportDomainOwnerPhase5_(payload) {
  return writeGateway_("apiBudgetDeleteImport", payload || {
}, function(input) {
    var auth = _bSafeReq_(input, "staff", "apiBudgetDeleteImport");
    if(! auth.ok)return auth.result;
    input = auth.payload;
    var _del = _normalizeOkEnvelope_(budgetUnifiedDeleteImport(input.id || input.importId || ""), "ลบรายการงบประมาณสำเร็จ", "ลบรายการงบประมาณไม่สำเร็จ");
    try {
      if(_del && _del.ok !== !1)if(_appIsFnName_("_budgetShouldRefreshReadModelNow_") && _budgetShouldRefreshReadModelNow_(input))_del.readModelRefresh = _budgetRefreshReadModelAfterWrite_(input,
      "apiBudgetDeleteImport");
      else {
        try {
          typeof AppRepository != "undefined" && AppRepository.afterWrite ? AppRepository.afterWrite(_B32R21): _appIsFnName_("_AppCacheInvalidateDomain_") && (_AppCacheInvalidateDomain_("budget"),
          _AppCacheInvalidateDomain_("budgetimports"), _AppCacheInvalidateDomain_("dashboard"))
}
        catch(_cacheErr) {
          _b32W_("budget.cache.invalidate.delete", _cacheErr)
}
        _del.dirtyMarker = _appIsFnName_("_budgetMarkTypeSummaryDirty_") ? _budgetMarkTypeSummaryDirty_(input, "apiBudgetDeleteImport"): null,
        _del.readModelRefresh = {
          ok: !0, skipped: !0, reason: "ui-fast-delete-deferred-refresh", fy: _budgetCanonicalPayloadFy_(input) || "", dirtyMarker:  ! ! _del.dirtyMarker
}
}
}
    catch(_corecoreErr) {
      _del && typeof _del == "object" && (_del.readModelError = String(_corecoreErr && _corecoreErr.message || _corecoreErr))
}
    return _del
}, "ลบรายการงบประมาณสำเร็จ", "ลบรายการงบประมาณไม่สำเร็จ")
}
function _budgetGetSummaryDomainOwnerPhase5_(payload) {
  var auth = _bSafeReq_(payload, "viewer", "apiBudgetGetSummary");
  if(! auth.ok)return auth.result;
  payload = auth.payload || {
};
  var dto = _budgetReadModelBuildSummaryDto_(payload, {
    source: "BudgetReadModel.centralDTO.BudgetDomain.getSummary.r76", dataSource: "centralBudgetDTO+r76", contractStamp: "budget-summary-central-dto-current-r76",
    includePersonnelCompensation: !0
});
  return ok_(dto, "โหลดสรุปงบประมาณสำเร็จ")
}
BudgetDomain.OWNER_CONTRACT_PHASE5 = _budgetDomainOwnerContractPhase5_(), BudgetDomain.getFiscalYears = function(payload) {
  return _budgetGetFiscalYearsDomainOwnerPhase5_(payload || {
})
}, BudgetDomain.listByFY = function(payload) {
  return _apiBudgetListByFYUnifiedCore_(payload || {
}, {
    apiName: "apiBudgetListByFY", fast: !1
})
}, BudgetDomain.listByFYFast = function(payload) {
  return _apiBudgetListByFYUnifiedCore_(payload || {
}, {
    apiName: "apiBudgetListByFYFast", fast: !0
})
}, BudgetDomain.getSummary = function(payload) {
  return _budgetGetSummaryDomainOwnerPhase5_(payload || {
})
}, BudgetDomain.getDashboardSummaryForDashboard = function(payload) {
  return _budgetGetDashboardSummaryForDashboardPhaseE_(payload || {
})
}, BudgetDomain.saveImport = function(payload) {
  return _budgetSaveImportDomainOwnerPhase5_(payload || {
})
}, BudgetDomain.deleteImport = function(payload) {
  return _budgetDeleteImportDomainOwnerPhase5_(payload || {
})
}, BudgetDomain.VERSION = "budget-domain-production-single-owner-current", BudgetDomain.SERVICE_FACADE_PHASE5 = {
  owner: "Code_32_Domain_Budget:BudgetService.ProductionOwner", Import:  {
    source: "BudgetImports", list: function(payload) {
      return typeof apiBudgetListByFYFast == "function" ? apiBudgetListByFYFast(payload || {
}):  {
        ok: !1, error: "BUDGET_IMPORT_LIST_UNAVAILABLE"
}
}
}, Summary:  {
    source: "BudgetSummary/BudgetImports", get: function(payload) {
      return BudgetDomain.getSummary(payload || {
})
}
}, TypeSummary:  {
    source: "BudgetImports", excludePersonnelCompensation: !0, includePersonnelCompensation: !1, get: function(payload) {
      return BudgetDomain.getTypeSummary(payload || {
})
}
}, FiscalYear:  {
    source: "BudgetImports+settings"
}, status: function() {
    return {
      ok: !0, owner: this.owner, sourceOfTruth: "BudgetImports", uiDomChanged: !1, businessLogicChanged: !1
}
}
}, BudgetDomain.Services = BudgetDomain.SERVICE_FACADE_PHASE5, BudgetDomain.normalizeTypeSummary = function(res) {
  var data = res && res.data && typeof res.data == "object" ? res.data: res;
  if(data && typeof data == "object") {
    var rows = Array.isArray(data.rows) ? data.rows: Array.isArray(data.data) ? data.data: _b32A_(data.items);
    data.rows = rows, data.data = rows, data.items = rows, data.records = rows, data.totalRecords = Number(data.totalRecords || data.total || rows.length) || 0,
    data.total = data.totalRecords, data.page = Number(data.page || 1) || 1, data.limit = Number(data.limit || data.pageSize || 20) || 20, data.pageSize = data.limit,
    data.totalPages = Number(data.totalPages || Math.max(1, Math.ceil(data.totalRecords / data.limit))) || 1, data.owner = "BudgetDomain.getTypeSummary",
    data.domainOwner = "BudgetDomain", data.sourceOfTruth = "BudgetImports", data.serverPaged = !0, data.materializedFirst = !1, data.readModelFirst = !1
}
  return res
}, BudgetDomain.getTypeSummary = function(payload) {
  (payload = payload || {
}).sourceOfTruth = "BudgetImports", payload.materializedFirst = !1, payload.readModelFirst = !1, payload.readFromBudgetImports = !0, payload.page = Math.max(1,
  Number(payload.page || 1) || 1), payload.limit = Math.max(1, Math.min(Number(payload.limit || payload.pageSize || 20) || 20, 100)), payload.pageSize = payload.limit,
  payload.serverPaged = !0;
  var res = _budgetGetTypeSummaryByFYCore_(payload);
  return BudgetDomain.normalizeTypeSummary(res)
}, BudgetDomain.status = function() {
  return {
    ok: !0, owner: "BudgetDomain", version: BudgetDomain.VERSION || "budget-domain-production-single-owner-current", physical: BudgetDomain.PHYSICAL,
    phase5: BudgetDomain.OWNER_CONTRACT_PHASE5 || _budgetDomainOwnerContractPhase5_(), stamp: PHASE10_BUDGET_DOMAIN_PHYSICAL_STAMP, uiDomChanged: !1,
    businessLogicChanged: !1, apiNamesPreserved: !0
}
};
