var __APP_GLOBAL__ = (typeof __APP_GLOBAL__ !== 'undefined' && __APP_GLOBAL__) || (typeof globalThis !== 'undefined' && globalThis) || this || {};
var AppDomain = __APP_GLOBAL__.AppDomain = __APP_GLOBAL__.AppDomain || {};
var CaseDomain = __APP_GLOBAL__.CaseDomain = __APP_GLOBAL__.CaseDomain || {};
var TrackingDomain = __APP_GLOBAL__.TrackingDomain = __APP_GLOBAL__.TrackingDomain || {};
var MeetingDomain = __APP_GLOBAL__.MeetingDomain = __APP_GLOBAL__.MeetingDomain || {};
var DashboardDomain = __APP_GLOBAL__.DashboardDomain = __APP_GLOBAL__.DashboardDomain || {};
var CASE_DOMAIN_DTO_REFACTOR_STAMP = 'case-domain-dto-no-envelope-refactor-2026-06-15';
CaseDomain.dto = function(data, meta) {
  return Object.assign({
    domain: 'cases', contractOwner: 'Code_30_Domain_Cases', stamp: CASE_DOMAIN_DTO_REFACTOR_STAMP
  }, data || {
  }, {
    meta: Object.assign({
      dtoOnly: true
    }, meta || {
    })
  });
};

var PHASE5_CASE_DOMAIN_OWNER_STAMP = 'phase5-domain-owner-cleanup-current';
function _caseDomainOwnerContractPhase5_(name, sourceOfTruth, readOwner, writeOwner) {
  return {
    ok: !0,
    owner: String(name || ''),
    codeOwner: 'Code_30_Domain_Cases',
    stamp: PHASE5_CASE_DOMAIN_OWNER_STAMP,
    sourceOfTruth: Array.isArray(sourceOfTruth) ? sourceOfTruth.slice(): [],
    readOwner: String(readOwner || ''),
    writeOwner: String(writeOwner || ''),
    apiFacadeMode: 'thin-api-to-domain-owner',
    apiNamesPreserved: !0,
    uiDomChanged: !1,
    businessLogicChanged: !1,
    noNewFiles: !0
  };
}
var PHASE3_DOMAIN_BOUNDARY_STAMP = 'c5-case-tracking-meeting-domain-owner-current';
function _domainBoundaryPhase3_(name, purpose, apis, helpersPrefix, writes) {
  return {
    name: String(name || ''), purpose: String(purpose || ''), owner: 'Code_30_Domain_Cases', stamp: PHASE3_DOMAIN_BOUNDARY_STAMP, api: Array.isArray(apis) ? apis.slice(): [], helpersPrefix: String(helpersPrefix || ''), writes: Array.isArray(writes) ? writes.slice(): [], uiDomChanged: ! 1, businessLogicChanged: ! 1
  }
}
CaseDomain.BOUNDARY = _domainBoundaryPhase3_('CaseDomain', 'เรื่องพิจารณา: read model, search, save/delete, report facets, canonical DTO', ['apiSaveCase', 'apiDeleteCase', 'apiSearch', 'apiGetCaseContext', 'apiSearchCasesLite', 'apiGetCaseReportExportRows', 'apiGetCases', 'apiGetCasesBundle', 'apiGetCaseReportOptions'], '_case', ['apiSaveCase', 'apiDeleteCase']);
TrackingDomain.BOUNDARY = _domainBoundaryPhase3_('TrackingDomain', 'ระบบติดตามหนังสือและหนังสือที่เกี่ยวข้อง: server paging, letter read/write, status counters', ['apiGetTracking', 'apiGetLetters', 'apiSaveLetter', 'apiDeleteLetter', 'apiGetAllLettersWithCaseInfo'], '_tracking', ['apiSaveLetter', 'apiDeleteLetter']);
MeetingDomain.BOUNDARY = _domainBoundaryPhase3_('MeetingDomain', 'ประวัติการประชุมและระบบประชุมคณะกรรมาธิการ/อนุกรรมาธิการ: lookup, history, agenda, print bundle', ['apiGetMeetingLookupOptions', 'apiGetMeetingHistory', 'apiSaveMeetingLog', 'apiDeleteMeetingLog', 'apiListCommitteeMeetings', 'apiGetCommitteeMeetingSystem', 'apiGetCommitteeMeetingSystemSpec', 'apiSearchMeetingAgendaCases', 'apiGetCommitteeMeetingPrintBundle', 'apiSaveCommitteeMeetingSystem', 'apiDeleteCommitteeMeetingSystem'], '_committeeMeeting', ['apiSaveMeetingLog', 'apiDeleteMeetingLog', 'apiSaveCommitteeMeetingSystem', 'apiDeleteCommitteeMeetingSystem']);
var PHASE10_DOMAIN_PHYSICAL_STAMP = 'c5-domain-physical-owner-lock-current';
function _domainPhysicalSectionPhase10_(name, owner, purpose, apiPrefix, helperPrefixes, sourceSheets, writes) {
  return {
    name: String(name || ''), owner: String(owner || ''), purpose: String(purpose || ''), apiPrefix: String(apiPrefix || 'api'), helperPrefixes: Array.isArray(helperPrefixes) ? helperPrefixes.slice(): [], sourceSheets: Array.isArray(sourceSheets) ? sourceSheets.slice(): [], writes: Array.isArray(writes) ? writes.slice(): [], stamp: PHASE10_DOMAIN_PHYSICAL_STAMP, uiDomChanged: ! 1, businessLogicChanged: ! 1, apiNamesPreserved: ! 0
  };
}
CaseDomain.PHYSICAL = _domainPhysicalSectionPhase10_('Case physical cluster', 'Code_30_Domain_Cases.gs:CaseDomain', 'เรื่องพิจารณา: DTO, canonical identity, search/report read model, save/delete facade', 'api', ['_case', '_Domain_getCase', '_dashboardCase'], ['MainData', 'MeetingLogs', 'Letters'], ['apiSaveCase', 'apiDeleteCase']);
TrackingDomain.PHYSICAL = _domainPhysicalSectionPhase10_('Tracking physical cluster', 'Code_30_Domain_Cases.gs:TrackingDomain', 'ระบบติดตามหนังสือ: letters, server paging, status counter, case map read model', 'api', ['_tracking', '_letter', '_meetingLetters'], ['Letters', 'MainData'], ['apiSaveLetter', 'apiDeleteLetter']);
MeetingDomain.PHYSICAL = _domainPhysicalSectionPhase10_('Meeting physical cluster', 'Code_30_Domain_Cases.gs:MeetingDomain', 'ระบบประชุม: lookup/history/system agenda/print bundle', 'api', ['_meeting', '_committeeMeeting'], ['MeetingLogs', 'CommitteeMeetings', 'CommitteeMeetingAgendaItems'], ['apiSaveMeetingLog', 'apiDeleteMeetingLog', 'apiSaveCommitteeMeetingSystem', 'apiDeleteCommitteeMeetingSystem']);
function _domainPhysicalContractPhase10_() {
  return {
    ok: ! 0, stamp: PHASE10_DOMAIN_PHYSICAL_STAMP, owner: 'Code_30_Domain_Cases', physical: {
      cases: CaseDomain.PHYSICAL, tracking: TrackingDomain.PHYSICAL, meeting: MeetingDomain.PHYSICAL
    }, rules: {
      uiDomChanged: ! 1, businessLogicChanged: ! 1, apiNamesPreserved: ! 0, noRouteRenamed: ! 0, noNewFiles: ! 0, physicalCleanupOnly: ! 0
    }
  }
};
function _domainBoundaryContractPhase3_() {
  return {
    ok: ! 0, stamp: PHASE3_DOMAIN_BOUNDARY_STAMP, owner: 'Code_30_Domain_Cases', domains: {
      cases: CaseDomain.BOUNDARY, tracking: TrackingDomain.BOUNDARY, meeting: MeetingDomain.BOUNDARY
    }, physical: _domainPhysicalContractPhase10_(), rules: {
      routerFacadeOnly: ! 0, uiDomChanged: ! 1, businessLogicChanged: ! 1, apiNamesPreserved: ! 0, noNewFiles: ! 0, productionPhysicalCleanup: ! 0
    }
  }
};

CaseDomain.OWNER_CONTRACT_PHASE5 = _caseDomainOwnerContractPhase5_('CaseDomain', ['MainData', 'MeetingLogs', 'Letters'], 'CaseDomain.searchCases / CaseDomain.getReportOptions / CaseDomain.getReportExportRows / CaseDomain.quickSummary', 'apiSaveCase / apiDeleteCase');
DashboardDomain.OWNER_CONTRACT_PHASE5 = _caseDomainOwnerContractPhase5_('DashboardDomain', ['MainData', 'BudgetImports', 'MeetingLogs', 'Letters'], 'DashboardDomain.getBundle', 'read-only');
TrackingDomain.OWNER_CONTRACT_PHASE5 = _caseDomainOwnerContractPhase5_('TrackingDomain', ['Letters', 'MainData'], 'TrackingDomain.getTracking / TrackingDomain.getLetters', 'TrackingDomain.saveLetter / TrackingDomain.deleteLetter');
MeetingDomain.OWNER_CONTRACT_PHASE5 = _caseDomainOwnerContractPhase5_('MeetingDomain', ['MeetingLogs', 'CommitteeMeetings', 'CommitteeMeetingAgendaItems', 'MainData'], 'MeetingDomain.getHistory / MeetingDomain.listMeetings / MeetingDomain.getSystem', 'MeetingDomain.saveLog / MeetingDomain.saveSystem');
// ===== DOMAIN PHYSICAL: CASE READ MODEL / RECEIVE DATE CONTRACT =====
var CASE_READ_MODEL_LOCK_ID = "case-read-model-current", CASE_RECEIVE_DATE_CANONICAL_KEYS_current = ["recDate", "receiveDate", "recDateText", "receiveDateText", "วันที่รับเรื่อง"];
function _caseBundleHasValue_(value) {
  return null != value && "" !== String(value).trim()
}
function _caseBundleMergeNonEmpty_() {
  for(var merged = {
  }, i = 0;
  i < arguments.length;
  i += 1) {
    var row = arguments[i] || {
    };
    Object.keys(row).forEach(function(key) {
      var value = row[key];
      _caseBundleHasValue_(value) ? merged[key] = value: Object.prototype.hasOwnProperty.call(merged, key) || (merged[key] = value)
    })
  }
  return sanitizeRow_(merged)
}
function getCanonicalCaseBundleImpl_(payload) {
  payload = payload || {
  };
  var aliases = _resolveCaseIdentityAliases_(payload), seed = aliases.case || null, rows = Array.isArray(aliases.rows) ? aliases.rows.slice(): [];
  if(seed && rows.every(function(r) {
    return String(r.caseId || "").trim() !== String(seed.caseId || "").trim()
  }) && rows.unshift(seed), (rows = _dedupeLatestRowsBy_(rows, function(r) {
    return String(r.caseId || r.caseNum || r.recNo || "").trim()
  })).sort(function(a, b) {
    var av = String(a && (a.updatedAt || a.createdAt) || ""), bv = String(b && (b.updatedAt || b.createdAt) || "");
    return av === bv ? String(b && b.caseId || "").localeCompare(String(a && a.caseId || ""), "th"): av > bv ?- 1: 1
  }), rows.length || seed) {
    var mergeSources = [payload].concat(rows.slice().reverse());
    seed && mergeSources.push(seed), seed = _caseBundleMergeNonEmpty_.apply(null, mergeSources)
  }
  var history = _Domain_getMeetingHistory(Object.assign({
  }, payload, {
    caseId: String(seed && seed.caseId || payload.caseId || payload.id || "").trim(), caseNum: String(seed && seed.caseNum || payload.caseNum || "").trim(), recNo: String(seed && seed.recNo || payload.recNo || "").trim(), title: String(seed && (seed.title || seed.caseTitle) || payload.title || payload.caseTitle || "").trim(), petitioners: String(seed && (seed.petitioners || seed.petitionerName) || payload.petitioners || "").trim()
  })), letters = _Domain_getLetters(Object.assign({
  }, payload, {
    caseId: String(seed && seed.caseId || payload.caseId || payload.id || "").trim(), caseNum: String(seed && seed.caseNum || payload.caseNum || "").trim(), recNo: String(seed && seed.recNo || payload.recNo || "").trim(), title: String(seed && (seed.title || seed.caseTitle) || payload.title || payload.caseTitle || "").trim(), petitioners: String(seed && (seed.petitioners || seed.petitionerName) || payload.petitioners || "").trim()
  }));
  return {
    case: seed, rawCase: seed, aliases: aliases.ids || [], relatedCases: rows, matchKey: _caseIdentityKey_(seed || payload || {
    }), history: Array.isArray(history) ? history: [], letters: Array.isArray(letters) ? letters: [], counts: {
      aliases: (aliases.ids || []).length, relatedCases: rows.length, history: Array.isArray(history) ? history.length: 0, letters: Array.isArray(letters) ? letters.length: 0
    }, resolvedAt: (new Date).toISOString()
  }
}
function _Domain_getCaseContext(payload) {
  var bundle = getCanonicalCaseBundleImpl_(payload = payload || {
  }), seed = bundle.case || {
  };
  return ok_({
    case: seed || null, aliases: bundle.aliases || [], relatedCases: bundle.relatedCases || [], matchKey: bundle.matchKey, historyCount: Number(bundle.counts && bundle.counts.history || 0), letterCount: Number(bundle.counts && bundle.counts.letters || 0), historyPreview: Array.isArray(bundle.history) ? bundle.history.slice(0, 5): [], letterPreview: Array.isArray(bundle.letters) ? bundle.letters.slice(0, 5): [], resolvedAt: bundle.resolvedAt || (new Date).toISOString()
  }, "โหลดบริบทข้อมูลเรื่องสำเร็จ")
}
function _Domain_getCanonicalCaseBundle(payload) {
  return ok_(getCanonicalCaseBundleImpl_(payload || {
  }), "โหลดชุดข้อมูลเรื่องแบบ canonical สำเร็จ")
}
function _getCaseIdentityHealthReport_(limit) {
  limit = Number(limit || 200) || 200;
  var cases = [];
  try {
    cases = _dedupeLatestRowsBy_(_listMainDataRows_(! 1), _caseIdentityKey_)
  }
  catch(_e) {
    _recordWarning_("ec", _e), cases = []
  }
  var sliced = cases.slice(0, limit), byAlias = {
  };
  sliced.forEach(function(r) {
    var key = _normalizedText_(r && (r.title || r.caseTitle) || "") + "||" + _normalizedText_(r && (r.petitioners || r.petitionerName) || "");
    key && "||" !== key && (byAlias[key] = byAlias[key] || [], byAlias[key].push(r))
  });
  var aliasCollisions = Object.keys(byAlias).filter(function(k) {
    return(byAlias[k] || []).length > 1
  }).map(function(k) {
    var group = byAlias[k] || [];
    return {
      aliasKey: k, count: group.length, caseIds: group.map(function(x) {
        return String(x.caseId || "").trim()
      }).filter(Boolean), caseNums: group.map(function(x) {
        return String(x.caseNum || "").trim()
      }).filter(Boolean), titles: group.map(function(x) {
        return String(x.title || x.caseTitle || "").trim()
      }).filter(Boolean).slice(0, 3)
    }
  }), missingCaseIds = sliced.filter(function(r) {
    return ! String(r && r.caseId || "").trim()
  }).slice(0, 50).map(function(r) {
    return {
      caseNum: String(r.caseNum || "").trim(), recNo: String(r.recNo || "").trim(), title: String(r.title || r.caseTitle || "").trim()
    }
  }), sampledBundles, failedBundles = sliced.slice(0, Math.min(25, sliced.length)).map(function(r) {
    try {
      var bundle = getCanonicalCaseBundleImpl_({
        caseId: String(r.caseId || "").trim(), caseNum: String(r.caseNum || "").trim(), recNo: String(r.recNo || "").trim(), title: String(r.title || r.caseTitle || "").trim(), petitioners: String(r.petitioners || r.petitionerName || "").trim()
      });
      return {
        ok: ! (! bundle ||! bundle.case), caseId: String(r.caseId || "").trim(), relatedCases: Number(bundle && bundle.counts && bundle.counts.relatedCases || 0), history: Number(bundle && bundle.counts && bundle.counts.history || 0), letters: Number(bundle && bundle.counts && bundle.counts.letters || 0)
      }
    }
    catch(e) {
      return _recordWarning_("ec", e), {
        ok: ! 1, caseId: String(r.caseId || "").trim(), error: e && e.message || String(e)
      }
    }
  }).filter(function(x) {
    return ! x.ok
  }), report = {
    generatedAt: (new Date).toISOString(), scannedCases: sliced.length, aliasCollisionCount: aliasCollisions.length, aliasCollisions: aliasCollisions.slice(0, 20), missingCaseIdCount: missingCaseIds.length, missingCaseIds: missingCaseIds, bundleFailures: failedBundles.length, bundleFailureCases: failedBundles.slice(0, 20), ok: 0 === aliasCollisions.length && 0 === missingCaseIds.length && 0 === failedBundles.length
  };
  return ok_(report, report.ok ? "สถานะ identity ของเรื่องอยู่ในเกณฑ์ดี": "พบประเด็นด้าน identity/canonical ของเรื่อง")
}
function getCaseIdentityHealthReport(limit) {
  return _getCaseIdentityHealthReport_(Number(limit || 200) || 200)
}
function _caseManualNumericText_(value) {
  if(null == value)return"";
  if(_caseValueLooksLikeDate_(value))return"";
  var raw = String(value).replace(/^'+/, "").replace(/[​-‍﻿]/g, "").trim();
  if(! raw || "-" === raw || _caseValueLooksLikeDate_(raw) || _caseLooksLikeInternalId_(raw))return"";
  if(/^\d+$/.test(raw))return raw;
  var decimal = raw.match(/^(\d+)\.0+$/);
  return decimal ? decimal[1]: ""
}
function _caseReferenceTextColumnNames_() {
  return["caseNum", "caseNo", "runningNo", "ลำดับเรื่อง", "recNo", "receiveNo", "receivedNo", "เลขรับเรื่อง", "เลขที่รับเรื่อง", "รับเรื่องเลขที่"]
}
function _caseEnsureMainDataReferenceTextColumns_() {
  try {
    var exec = _appIsFnName_("_executionState_") ? _executionState_(): "undefined" != typeof AppInfra && AppInfra ? AppInfra: {
    };
    if(exec.__caseReferenceTextColumnsEnsured)return {
      ok: ! 0, cached: ! 0
    };
    if("function" != typeof getSheet_ ||! _appIsFnName_("_sheetHeaders_"))return {
      ok: ! 1, skipped: ! 0, reason: "sheet helpers unavailable"
    };
    var sh = getSheet_("MainData"), headers = _sheetHeaders_("MainData"), names = _caseReferenceTextColumnNames_(), rowCount = Math.max(2, Number(sh.getMaxRows && sh.getMaxRows()) || Number(sh.getLastRow && sh.getLastRow()) || 2), formatted = [];
    return names.forEach(function(name) {
      var idx = headers.indexOf(name);
      if(! (idx < 0))try {
        AppRepository.setRangeNumberFormat("MainData", 1, idx + 1, rowCount, 1, "@"), formatted.push(name)
      }
      catch(e) {
        _appIsFnName_("_recordWarning_") && _recordWarning_("case.referenceTextColumnFormat." + name, e)
      }
    }), exec.__caseReferenceTextColumnsEnsured =! 0, {
      ok: ! 0, formatted: formatted, rowCount: rowCount
    }
  }
  catch(e) {
    return _appIsFnName_("_recordWarning_") && _recordWarning_("case.ensureReferenceTextColumns", e), {
      ok: ! 1, error: String(e && e.message || e)
    }
  }
}
function _caseReceiveNoFromDateValue_(value) {
  if(null == value)return"";
  if("[object Date]" === Object.prototype.toString.call(value) &&! isNaN(value.getTime())) {
    var y = value.getFullYear(), thaiYear = y > 2400 ? y: y + 543;
    return String(value.getMonth() + 1) + "/" + String(thaiYear)
  }
  var raw = String(value).replace(/^'+/, "").replace(/[​-‍﻿]/g, "").trim();
  if(! raw)return"";
  var dateLike = raw.match(/^1[\/\-](\d{1,2})[\/\-]((?:19|20|25)\d{2})$/);
  if(dateLike) {
    var m = Number(dateLike[1]);
    if(m >= 1 && m <= 12)return String(m) + "/" + dateLike[2]
  }
  if(/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s/i.test(raw) || /GMT[+-]\d{4}|เวลาอินโดจีน/i.test(raw)) {
    var parsed = new Date(raw);
    if(parsed &&! isNaN(parsed.getTime())) {
      var py = parsed.getFullYear();
      return String(parsed.getMonth() + 1) + "/" + String(py > 2400 ? py: py + 543)
    }
  }
  return""
}
function _caseManualReceiveNoText_(value) {
  if(null == value)return"";
  var recovered = _caseReceiveNoFromDateValue_(value);
  if(recovered)return recovered;
  var raw = String(value).replace(/^'+/, "").replace(/[​-‍﻿]/g, "").trim();
  if(! raw || "-" === raw || "/" === raw || _caseValueLooksLikeDate_(raw) || _caseLooksLikeInternalId_(raw))return"";
  if(/^\d+$/.test(raw))return raw;
  var decimal = raw.match(/^(\d+)\.0+$/);
  if(decimal)return decimal[1];
  var slash = raw.match(/^(\d+)\s*\/\s*((?:19|20|25)?\d{2})$/);
  if(slash)return slash[1] + "/" + slash[2];
  var dashYear = raw.match(/^(\d+)\s*[\-–—]\s*((?:19|20|25)?\d{2})$/);
  return dashYear ? dashYear[1] + "/" + dashYear[2]: ""
}
function _caseManualReceiveNoForSheet_(value) {
  var normalized = _caseManualReceiveNoText_(value);
  return normalized ? normalized.indexOf("/") >- 1 ? "'" + normalized: normalized: ""
}
function _extractRunningNumber_(value, referenceDate, explicitYear) {
  return _caseManualNumericText_(value)
}
function _caseLooksLikeInternalId_(value) {
  var raw = String(null == value ? "": value).trim();
  return/^CASE[_-]/i.test(raw) || /^MAIN-\d+/i.test(raw) || /^ROW-\d+/i.test(raw)
}
function _caseValueLooksLikeDate_(value) {
  if("[object Date]" === Object.prototype.toString.call(value) &&! isNaN(value.getTime()))return ! 0;
  var raw = String(null == value ? "": value).trim();
  return !! raw && (/^\d{4}-\d{1,2}-\d{1,2}/.test(raw) || /^\d{1,2}\/\d{1,2}\/(?:19|20|25)\d{2}$/.test(raw) || /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s/i.test(raw) || /GMT[+-]\d{4}|เวลาอินโดจีน/i.test(raw) || /^\d{1,2}\s*(ม\.?ค\.?|ก\.?พ\.?|มี\.?ค\.?|เม\.?ย\.?|พ\.?ค\.?|มิ\.?ย\.?|ก\.?ค\.?|ส\.?ค\.?|ก\.?ย\.?|ต\.?ค\.?|พ\.?ย\.?|ธ\.?ค\.?|มกราคม|กุมภาพันธ์|มีนาคม|เมษายน|พฤษภาคม|มิถุนายน|กรกฎาคม|สิงหาคม|กันยายน|ตุลาคม|พฤศจิกายน|ธันวาคม)\s*(?:19|20|25)\d{2}$/i.test(raw))
}
function _normalizeReceiveNo_(caseNum, recNo, recDate, offerDate) {
  return _caseManualReceiveNoText_(recNo)
}
// ===== DOMAIN PHYSICAL: CASE REPOSITORY PROJECTIONS =====
function _caseDomainSharedRows_(sheetName, fields, opts) {
  return opts = opts || {
  }, fields = Array.isArray(fields) ? fields: [], _appIsFnName_("_appDataServiceRead_") ? _appDataServiceRead_(sheetName, fields, Object.assign({
    owner: "cases.domain", ttl: 180
  }, opts)) || []: fields.length && "function" == typeof readSheetProjectedObjectsCached_ ? readSheetProjectedObjectsCached_(sheetName, fields, {
    includeDeleted: ! 0 === opts.includeDeleted, requireCanonical: ! 0 === opts.requireCanonical, ttl: opts.ttl || 180
  }) || []: "function" == typeof readSheetObjectsCached_ ? readSheetObjectsCached_(sheetName, {
    includeDeleted: ! 0 === opts.includeDeleted, requireCanonical: ! 0 === opts.requireCanonical
  }) || []: readSheetObjects_(sheetName, {
    includeDeleted: ! 0 === opts.includeDeleted, requireCanonical: ! 0 === opts.requireCanonical
  }) || []
}
function _caseEnsureMainDataPendingRemarkColumn_() {
  try {
    var sh = getSheet_("MainData"), info = _sheetHeaders_("MainData", {
      includeMeta: ! 0, forceFresh: ! 0
    }), headers = info && info.rawHeaders || [], map = _canonicalHeaderIndexMap_("MainData", headers);
    if(void 0 !== map.pendingRemark)return ! 0;
    var targetCol = 0;
    for(var i = 0; i < headers.length; i ++ ) {
      if(! String(headers[i] || "").trim()) {
        targetCol = i + 1;
        break
      }
    }
    targetCol || (targetCol = Math.max(Number(sh.getLastColumn && sh.getLastColumn()) || headers.length || 1, headers.length) + 1);
    sh.getRange(1, targetCol).setValue("pendingRemark");
    _appIsFnName_("invalidateSheetCache_") && invalidateSheetCache_("MainData");
    _appIsFnName_("_recordWarning_") && _recordWarning_("cases.pendingRemarkColumn.created", {
      column: targetCol, header: "pendingRemark"
    });
    return ! 0
  }
  catch(e) {
    _appIsFnName_("_recordWarning_") && _recordWarning_("cases.pendingRemarkColumn.ensure.failed", e);
    return ! 1
  }
}
function _caseDomainMainDataProjectedRows_(includeDeleted) {
  return _caseDomainSharedRows_("MainData", ["caseId", "id", "cat", "subCat", "recNo", "receiveNo", "offerDate", "recDate", "title", "petitioners", "petitionerName", "petitioner", "status", "assignees", "owner", "responsibleCommissioners", "responsibleComm", "committeeOwner", "responsibleCommittee", "staffs", "secretariatOfficer", "operationOfficer", "opStaff", "operator", "responsibleOfficer", "operationStaff", "staff", "officer", "respondent", "agencyName", "accusedAgency", "accused", "agency", "coAssignees", "coAssignee", "coOwners", "coResponsible", "caseNum", "caseNo", "runningNo", "remark", "pendingRemark", "pendingNote", "waitRemark", "waitingRemark", "considerationPendingRemark", "caseTitle", "closedReason", "rejectionReason", "petitionerPhone", "subject", "caseType", "topic", "subcommittee", "dueDate", "createdAt", "updatedAt", "meetingStatus", "isDeleted", "deletedAt", "keySummary"], {
    includeDeleted: ! 0 === includeDeleted, ttl: 180
  })
}
function _caseDomainLettersProjectedRows_(includeDeleted) {
  return _caseDomainSharedRows_("Letters", ["letterId", "caseId", "letterNo", "bookNo", "letterDate", "agency", "subject", "issue", "dueDate", "extendDate", "remark", "letterStatus", "status", "repliesJSON", "opStaff", "officer", "createdAt", "updatedAt", "isDeleted", "deletedAt"], {
    includeDeleted: ! 0 === includeDeleted, ttl: 180
  })
}
function _getMainDataRepository_() {
  return getCanonicalRepository_("cases.mainData")
}
function _listMainDataRows_(includeDeleted) {
  try {
    return _caseDomainMainDataProjectedRows_(! 0 === includeDeleted)
  }
  catch(_projectedErr) {
    throw _recordWarning_("ec", _projectedErr), new Error("CASE_MAIN_DATA_PROJECTED_READER_FAILED: " + String(_projectedErr && _projectedErr.message || _projectedErr))
  }
}
function _casePick_(row, keys) {
  row = row || {
  }, keys = Array.isArray(keys) ? keys: [];
  for(var i = 0;
  i < keys.length;
  i ++ ) {
    var key = keys[i];
    if(void 0 !== row[key] && null !== row[key] && "" !== String(row[key]).trim())return row[key]
  }
  return""
}
function _caseCanonicalFields_(row) {
  var title, cat, subCat, assignees;
  return row = row || {
  }, {
    title: String(_casePick_(row, ["title", "subject", "caseSubject", "เรื่อง", "ชื่อเรื่อง", "เรื่องร้องเรียน"]) || "").trim(), cat: String(_casePick_(row, ["cat", "caseType", "category", "ประเภทเรื่อง", "ประเภท"]) || "").trim(), subCat: String(_casePick_(row, ["subCat", "subCategory", "issue", "topic", "topicName", "considerIssue", "caseIssue", "ประเด็นพิจารณา", "ประเด็น"]) || "").trim(), assignees: String(_casePick_(row, ["assignees", "owner", "responsibleCommissioners", "responsibleComm", "committeeOwner", "responsibleCommittee", "กมธ.รับผิดชอบ", "กมธ. รับผิดชอบ", "กรรมาธิการรับผิดชอบ", "คณะกรรมาธิการรับผิดชอบ", "ผู้รับผิดชอบ", "ผู้รับผิดชอบหลัก"]) || "").trim()
  }
}
// ===== DOMAIN PHYSICAL: CASE DTO NORMALIZATION =====
function _caseNormalizeInputDto_(input) {
  (input = Object.assign({
  }, input || {
  })).id = input.id || input.caseId || "", input.caseId = input.caseId || input.id || "";
  var schema = _caseCanonicalFields_(input);
  input.title = schema.title, input.caseTitle = String(_casePick_(input, ["caseTitle", "title", "subject", "เรื่อง"]) || schema.title || "").trim(), input.subject = String(input.subject || schema.title || "").trim(), input.cat = schema.cat || input.cat || "", input.caseType = input.caseType || schema.cat || "", input.subCat = schema.subCat || input.subCat || "", input.subCategory = input.subCategory || input.subCat || "", input.issue = input.issue || input.subCat || "", input.topic = input.subCat || input.topic || "", input.assignees = schema.assignees || input.assignees || "", input.owner = input.owner || input.assignees || "", input.responsibleCommissioners = input.responsibleCommissioners || input.assignees || "", input.petitioner = String(_casePick_(input, ["petitioner", "petitioners", "petitionerName", "ผู้ร้อง", "ผู้เสนอญัตติ", "ผู้เสนอญัตติ/ผู้ร้อง"]) || "").trim(), input.petitioners = String(_casePick_(input, ["petitioners", "petitioner", "petitionerName", "ผู้ร้อง", "ผู้เสนอญัตติ", "ผู้เสนอญัตติ/ผู้ร้อง"]) || "").trim(), input.keySummary = String(_casePick_(input, ["keySummary", "summary", "สรุปสาระสำคัญของเรื่อง", "สรุปสาระสำคัญ", "สาระสำคัญ"]) || "").trim(), input.remark = String(_casePick_(input, ["remark", "note", "หมายเหตุ"]) || "").trim(), input.pendingRemark = String(_casePick_(input, ["pendingRemark", "pendingNote", "waitRemark", "waitingRemark", "considerationPendingRemark", "หมายเหตุรอพิจารณา", "หมายเหตุรอการพิจารณา"]) || "").trim(), input.pendingNote = input.pendingRemark, input.rejectionReason = String(_casePick_(input, ["rejectionReason", "rejectReason", "notAcceptedReason", "เหตุผล (ไม่รับเรื่อง)", "เหตุผลไม่รับเรื่อง"]) || "").trim(), input.petitionerPhone = _appPhoneForDisplay_(_casePick_(input, ["petitionerPhone", "petitionerTel", "petitionerTelephone", "petitionerMobile", "petitionerContactPhone", "proposerPhone", "proposerTel", "proposerTelephone", "proposerMobile", "complainantPhone", "complainantTel", "complainantTelephone", "complainantMobile", "phone", "tel", "telephone", "mobile", "contactPhone", "phoneNumber", "เบอร์โทรศัพท์ผู้เสนอญัตติ/ผู้ร้อง", "เบอร์โทรผู้เสนอญัตติ/ผู้ร้อง", "โทรศัพท์ผู้เสนอญัตติ/ผู้ร้อง", "เบอร์โทรศัพท์ผู้ร้อง", "เบอร์โทรผู้ร้อง", "โทรศัพท์ผู้ร้อง", "เบอร์โทรศัพท์ผู้เสนอ", "เบอร์โทรผู้เสนอ", "โทรศัพท์ผู้เสนอ", "เบอร์โทรศัพท์", "เบอร์โทร", "โทรศัพท์", "หมายเลขโทรศัพท์", "มือถือ"]) || "");
  var rawStatus = String(_casePick_(input, ["status", "caseStatus", "processStatus", "currentStatus", "สถานะ", "สถานะเรื่อง"]) || "เรื่องเข้าใหม่").trim();
  input.statusRaw = rawStatus, input.status = "undefined" != typeof AppBackendCore && AppBackendCore && "function" == typeof AppBackendCore.normalizeCaseStatus ? AppBackendCore.normalizeCaseStatus(rawStatus, {
    defaultStatus: "เรื่องเข้าใหม่", strict: true
  }): _caseNormalizeStatusForDisplay_(rawStatus);
  var caseNumRaw = _casePick_(input, ["caseNum", "caseNo", "runningNo", "orderNo", "seq", "no", "ลำดับเรื่อง", "ลำดับ", "ลำดับที่"]) || "";
  _caseValueLooksLikeDate_(caseNumRaw) && (caseNumRaw = ""), input.caseNum = _extractRunningNumber_(caseNumRaw, input.offerDate || input.recDate || input.createdAt, input.fy || input.fiscalYear || input.budgetYear), input.caseNo = input.caseNum, input.runningNo = input.caseNum, input["ลำดับเรื่อง"] = input.caseNum;
  var recNoRaw = _casePick_(input, ["recNo", "receiveNo", "receivedNo", "เลขรับเรื่อง", "เลขที่รับเรื่อง", "รับเรื่องเลขที่"]) || "";
  return input.recNo = _normalizeReceiveNo_(input.caseNum, recNoRaw, input.recDate, input.offerDate), input.receiveNo = input.recNo, input["เลขรับเรื่อง"] = input.recNo, input
}
function _caseNormalizeStatusForDisplay_(status) {
  if("undefined" != typeof AppBackendCore && AppBackendCore && "function" == typeof AppBackendCore.normalizeCaseStatus)return AppBackendCore.normalizeCaseStatus(status, {
    defaultStatus: "เรื่องเข้าใหม่"
  });
  if(! (status = String(status || "").trim()))return"เรื่องเข้าใหม่";
  return"รับเรื่อง" === status || "ได้รับเรื่อง" === status || "เรื่องใหม่" === status ? "เรื่องเข้าใหม่": "อยู่ระหว่างดำเนินการ" === status || "รอติดตาม" === status || "รอการพิจารณา" === status ? "รอพิจารณา": status
}
function _caseCanonicalDto_(row) {
  var schema = _caseCanonicalFields_(row = row || {
  }), title = schema.title, cat = schema.cat, subCat = schema.subCat, assignees = schema.assignees, statusRaw = String(row.status || row.caseStatus || "เรื่องเข้าใหม่").trim(), statusForReason = _caseNormalizeStatusForDisplay_(statusRaw), offerDateCanonical = String(_casePick_(row, ["offerDate", "bookDate", "letterDate", "dateProposed", "proposalDate", "proposeDate", "proposedDate", "submittedDate", "submitDate", "dateSubmitted", "วันที่หนังสือ", "วันที่เสนอ", "วันที่เสนอเรื่อง", "วันเดือนปีที่เสนอ", "วันที่ยื่น", "วันที่ยื่นเรื่อง"]) || "").trim(), rawClosedReason = String(_casePick_(row, ["closedReason", "closeReason", "terminateReason", "stopReason", "endReason", "caseCloseReason", "caseEndReason", "statusReason", "decisionReason", "reason", "เหตุผล", "เหตุผลยุติเรื่อง", "เหตุผลการยุติเรื่อง"]) || "").trim(), rawRejectionReason = String(_casePick_(row, ["rejectionReason", "rejectReason", "notAcceptedReason", "notReceiveReason", "notAcceptReason", "caseRejectReason", "statusReason", "decisionReason", "reason", "เหตุผล", "เหตุผล (ไม่รับเรื่อง)", "เหตุผลไม่รับเรื่อง", "เหตุผลการไม่รับเรื่อง"]) || "").trim(), closedReasonForDto = rawClosedReason || rawRejectionReason || "", rejectionReasonForDto = rawRejectionReason || rawClosedReason || "";
  return Object.assign({
  }, row, {
    caseId: String(row.caseId || row.id || "").trim(), id: String(row.id || row.caseId || "").trim(), caseNum: _caseManualNumericText_(_casePick_(row, ["caseNum", "caseNo", "runningNo", "orderNo", "seq", "no", "ลำดับเรื่อง", "ลำดับ", "ลำดับที่"]) || ""), caseNo: _caseManualNumericText_(_casePick_(row, ["caseNo", "caseNum", "runningNo", "orderNo", "seq", "no", "ลำดับเรื่อง", "ลำดับ", "ลำดับที่"]) || ""), recNo: _caseManualReceiveNoText_((_appIsFnName_("_caseSearchReceiveNoText_") ? _caseSearchReceiveNoText_(row): "") || _casePick_(row, ["recNo", "receiveNo", "receivedNo", "เลขรับเรื่อง", "เลขรับ", "เลขรับที่", "ทะเบียนรับ"]) || ""), title: title, caseTitle: String(_casePick_(row, ["caseTitle", "considerationTitle", "caseConsiderationTitle", "ชื่อเรื่องพิจารณา (ถ้ามี)", "ชื่อเรื่องพิจารณา", "เรื่องพิจารณา"]) || row.caseTitle || title || "").trim(), subject: String(row.subject || title || "").trim(), cat: cat, caseType: String(row.caseType || cat || "").trim(), petitioners: String(_casePick_(row, ["petitioners", "petitioner", "petitionerName", "ผู้ร้อง", "ผู้เสนอญัตติ", "ผู้เสนอญัตติ/ผู้ร้อง"]) || "").trim(), petitionerPhone: _appPhoneForDisplay_(_casePick_(row, ["petitionerPhone", "petitionerTel", "petitionerTelephone", "petitionerMobile", "petitionerContactPhone", "proposerPhone", "proposerTel", "proposerTelephone", "proposerMobile", "complainantPhone", "complainantTel", "complainantTelephone", "complainantMobile", "phone", "tel", "telephone", "mobile", "contactPhone", "phoneNumber", "เบอร์โทรศัพท์ผู้เสนอญัตติ/ผู้ร้อง", "เบอร์โทรผู้เสนอญัตติ/ผู้ร้อง", "โทรศัพท์ผู้เสนอญัตติ/ผู้ร้อง", "เบอร์โทรศัพท์ผู้ร้อง", "เบอร์โทรผู้ร้อง", "โทรศัพท์ผู้ร้อง", "เบอร์โทรศัพท์ผู้เสนอ", "เบอร์โทรผู้เสนอ", "โทรศัพท์ผู้เสนอ", "เบอร์โทรศัพท์", "เบอร์โทร", "โทรศัพท์", "หมายเลขโทรศัพท์", "มือถือ"]) || ""), respondent: String(_casePick_(row, ["respondent", "agencyName", "accusedAgency", "accused", "agency", "หน่วยงาน / ผู้ถูกร้อง", "หน่วยงาน/ผู้ถูกร้อง", "ผู้ถูกร้อง", "หน่วยงาน"]) || "").trim(), sentAgency: String(_casePick_(row, ["sentAgency", "sendToAgency", "sentToAgency", "forwardedAgency", "forwardAgency", "forwardToAgency", "sentAgencyName", "หน่วยงานที่ส่ง", "ส่งให้หน่วยงาน", "ส่งหน่วยงาน", "หน่วยงานที่เกี่ยวข้อง"]) || "").trim(), sendToAgency: String(_casePick_(row, ["sentAgency", "sendToAgency", "sentToAgency", "forwardedAgency", "forwardAgency", "forwardToAgency", "sentAgencyName", "หน่วยงานที่ส่ง", "ส่งให้หน่วยงาน", "ส่งหน่วยงาน", "หน่วยงานที่เกี่ยวข้อง"]) || "").trim(), subCat: subCat, subCategory: subCat, issue: subCat, topic: subCat, assignees: assignees, owner: assignees, responsibleCommissioners: assignees, staffs: String(_casePick_(row, ["staffs", "secretariatOfficer", "operationOfficer", "opStaff", "operator", "responsibleOfficer", "operationStaff", "staff", "officer", "เจ้าหน้าที่ฝ่ายเลขานุการ", "เจ้าหน้าที่ฝ่ายเลขานุการ"]) || "").trim(), coAssignees: String(_casePick_(row, ["coAssignees", "coAssignee", "coOwners", "coResponsible", "ผู้รับผิดชอบร่วม", "ผู้ร่วมรับผิดชอบ"]) || "").trim(), status: statusForReason, statusRaw: statusRaw, offerDate: offerDateCanonical, dateProposed: offerDateCanonical, bookDate: offerDateCanonical, closedReason: closedReasonForDto, rejectionReason: rejectionReasonForDto, rejectReason: rejectionReasonForDto, notAcceptedReason: rejectionReasonForDto, "เหตุผล (ไม่รับเรื่อง)": rejectionReasonForDto, schemaStamp: "domain-schema-cases-current", contractStamp: "case-dto-current"
  })
}
function _casePlainIdentityKey_(value) {
  return String(null == value ? "": value).replace(/^'+/, "").trim()
}
function _caseTitlePetitionerIdentityKey_(title, petitioner) {
  return title = _normalizedText_(title || ""), petitioner = _normalizedText_(petitioner || ""), title ? title + "|" + petitioner: ""
}
function _caseBuildSaveLookupIndex_() {
  var cacheKey = "case.saveLookupIndex.current." + (_appIsFnName_("_entityCacheStamp_") ? _entityCacheStamp_("maindata"): "1"), hit = _appIsFnName_("_requestScopeGet_") ? _requestScopeGet_("caseSaveLookupIndex", cacheKey): null;
  if(hit)return hit;
  var rows = [];
  try {
    rows = _appIsFnName_("_caseDomainMainDataProjectedRows_") ? _caseDomainMainDataProjectedRows_(! 0): _getMainDataRepository_().list({
      includeDeleted: ! 0, requireCanonical: ! 0
    })
  }
  catch(_idxProjectedErr) {
    rows = _getMainDataRepository_().list({
      includeDeleted: ! 0, requireCanonical: ! 0
    })
  }
  var idx = {
    byId: {
    }, byCaseNum: {
    }, byRecNo: {
    }, byTitlePetitioner: {
    }, rowsRead: (rows = Array.isArray(rows) ? rows: []).length, generatedAt: (new Date).toISOString(), source: "case-keyed-index-current"
  };
  function caseIndexPut_(map, key, row) {
    if(key = _casePlainIdentityKey_(key)) {
      var current = map[key];
      (! current || _rowFreshnessScore_(row).localeCompare(_rowFreshnessScore_(current)) > 0) && (map[key] = row)
    }
  }
  return rows.forEach(function(row) {
    row = row || {
    }, caseIndexPut_(idx.byId, row.caseId || row.id, row), caseIndexPut_(idx.byCaseNum, _caseManualNumericText_(row.caseNum || row.caseNo || row.runningNo || row["ลำดับเรื่อง"] || ""), row), caseIndexPut_(idx.byRecNo, _caseManualReceiveNoText_(row.recNo || row.receiveNo || row["เลขรับเรื่อง"] || ""), row), caseIndexPut_(idx.byTitlePetitioner, _caseTitlePetitionerIdentityKey_(row.title || row.caseTitle || "", row.petitioners || row.petitionerName || ""), row)
  }), _appIsFnName_("_requestScopePut_") && (idx = _requestScopePut_("caseSaveLookupIndex", cacheKey, idx)), idx
}
function _caseFindExistingFromIndex_(input) {
  input = input || {
  };
  var idx = _caseBuildSaveLookupIndex_(), id = _casePlainIdentityKey_(input.id || input.caseId || "");
  if(id && idx.byId[id])return idx.byId[id];
  var caseNum = _caseManualNumericText_(input.caseNum || input.caseNo || input.runningNo || input["ลำดับเรื่อง"] || "");
  if(caseNum && idx.byCaseNum[caseNum])return idx.byCaseNum[caseNum];
  var recNo = _caseManualReceiveNoText_(input.recNo || input.receiveNo || input["เลขรับเรื่อง"] || "");
  if(recNo && idx.byRecNo[recNo])return idx.byRecNo[recNo];
  var titleKey = _caseTitlePetitionerIdentityKey_(input.title || input.caseTitle || "", input.petitioner || input.petitioners || "");
  return titleKey && idx.byTitlePetitioner[titleKey] ? idx.byTitlePetitioner[titleKey]: null
}
function _findExistingCaseRecord_(input) {
  input = input || {
  };
  var targetId = String(input.id || input.caseId || "").trim();
  if(targetId)try {
    var byId = _getMainDataRepository_().findByKey(targetId, {
      includeDeleted: ! 0, requireCanonical: ! 0
    });
    if(byId)return byId
  }
  catch(_findByIdErr) {
    _recordWarning_("cases.findExisting.byId", _findByIdErr)
  }
  try {
    var indexed = _appIsFnName_("_caseFindExistingFromIndex_") ? _caseFindExistingFromIndex_(input): null;
    if(indexed)return indexed
  }
  catch(_caseIndexErr) {
    _recordWarning_("cases.findExisting.keyedIndex", _caseIndexErr)
  }
  var rows = _getMainDataRepository_().listActive(), targetCaseNum = _caseManualNumericText_(input.caseNum || input.caseNo || input.runningNo || input["ลำดับเรื่อง"] || ""), targetRecNo = _caseManualReceiveNoText_(input.recNo || input.receiveNo || input["เลขรับเรื่อง"] || ""), targetTitle = _normalizedText_(input.title || input.caseTitle || ""), targetPetitioner = _normalizedText_(input.petitioner || input.petitioners || ""), matches = (Array.isArray(rows) ? rows: []).filter(function(row) {
    if(row = row || {
    }, targetId && String(row.caseId || "").trim() === targetId)return ! 0;
    if(targetCaseNum && _caseManualNumericText_(row.caseNum || row.caseNo || row.runningNo || row["ลำดับเรื่อง"] || "") === targetCaseNum)return ! 0;
    if(targetRecNo && _caseManualReceiveNoText_(row.recNo || row.receiveNo || row["เลขรับเรื่อง"] || "") === targetRecNo)return ! 0;
    if(targetTitle && _normalizedText_(row.title || row.caseTitle || "") === targetTitle) {
      var rowPetitioner = _normalizedText_(row.petitioners || row.petitionerName || "");
      return ! targetPetitioner || rowPetitioner === targetPetitioner
    }
    return ! 1
  });
  return matches.length ? (matches.sort(function(a, b) {
    return _rowFreshnessScore_(b).localeCompare(_rowFreshnessScore_(a))
  }), matches[0] || null): null
}
function _buildCaseCanonicalRecord_(input, existing, now) {
  input = input || {
  }, existing = existing || {
  }, now = now || (new Date).toISOString();
  var resolvedId = String(existing.caseId || input.id || input.caseId || "CASE_" + Date.now() + "_" + Math.floor(9e3 * Math.random() + 1e3)).trim(), schema = _caseCanonicalFields_(Object.assign({
  }, existing, input)), title = String(input.title || input.caseTitle || schema.title || existing.title || existing.caseTitle || "").trim(), cat = String(schema.cat || input.cat || input.caseType || existing.cat || existing.caseType || "").trim(), subCat = String(schema.subCat || input.subCat || existing.subCat || existing.topic || "").trim(), assignees = String(schema.assignees || input.assignees || existing.assignees || "").trim(), receiveNoForSheet = _caseManualReceiveNoForSheet_(input.recNo || input.receiveNo || existing.recNo || existing.receiveNo || existing["เลขรับเรื่อง"] || ""), statusForReason = _caseNormalizeStatusForDisplay_(String(input.status || existing.status || "เรื่องเข้าใหม่").trim()), incomingClosedReason = String(void 0 !== input.closedReason ? input.closedReason: existing.closedReason || "").trim(), incomingRejectionReason = String(input.rejectionReason || input.rejectReason || input.notAcceptedReason || input["เหตุผล (ไม่รับเรื่อง)"] || existing.rejectionReason || existing.rejectReason || existing.notAcceptedReason || existing["เหตุผล (ไม่รับเรื่อง)"] || "").trim();
  return"ไม่รับเรื่อง" === statusForReason ? (incomingRejectionReason = incomingRejectionReason || incomingClosedReason, incomingClosedReason = ""): "ยุติเรื่อง" === statusForReason ? (incomingClosedReason = incomingClosedReason || incomingRejectionReason, incomingRejectionReason = ""): (incomingClosedReason = "", incomingRejectionReason = ""), Object.assign({
  }, existing, {
    caseId: resolvedId, caseNum: _caseManualNumericText_(input.caseNum || input.caseNo || existing.caseNum || ""), recNo: receiveNoForSheet, receiveNo: receiveNoForSheet, "เลขรับเรื่อง": receiveNoForSheet, title: title, petitioners: String(input.petitioner || input.petitioners || existing.petitioners || "").trim(), respondent: String(_casePick_(Object.assign({
    }, existing, input), ["respondent", "agencyName", "accusedAgency", "accused", "agency", "หน่วยงาน / ผู้ถูกร้อง", "หน่วยงาน/ผู้ถูกร้อง", "ผู้ถูกร้อง", "หน่วยงาน"]) || "").trim(), assignees: assignees, staffs: String(_casePick_(Object.assign({
    }, existing, input), ["staffs", "secretariatOfficer", "operationOfficer", "opStaff", "operator", "responsibleOfficer", "operationStaff", "staff", "officer", "เจ้าหน้าที่ฝ่ายเลขานุการ", "เจ้าหน้าที่ฝ่ายเลขานุการ"]) || "").trim(), coAssignees: String(_casePick_(Object.assign({
    }, existing, input), ["coAssignees", "coAssignee", "coOwners", "coResponsible", "ผู้รับผิดชอบร่วม", "ผู้ร่วมรับผิดชอบ"]) || "").trim(), offerDate: input.offerDate || existing.offerDate || "", recDate: input.recDate || existing.recDate || "", dueDate: input.dueDate || existing.dueDate || "", status: statusForReason, caseTitle: String(input.caseTitle || title || existing.caseTitle || "").trim(), subCat: subCat, subCategory: subCat, issue: subCat, remark: String(void 0 !== input.remark ? input.remark: existing.remark || "").trim(), pendingRemark: String(void 0 !== input.pendingRemark ? input.pendingRemark: existing.pendingRemark || existing.pendingNote || existing.waitRemark || existing.waitingRemark || existing.considerationPendingRemark || existing["หมายเหตุรอพิจารณา"] || existing["หมายเหตุรอการพิจารณา"] || "").trim(), pendingNote: String(void 0 !== input.pendingRemark ? input.pendingRemark: existing.pendingNote || existing.pendingRemark || "").trim(), keySummary: String(input.keySummary || input.summary || existing.keySummary || "").trim(), agencyName: String(input.agencyName || existing.agencyName || "").trim(), closedReason: incomingClosedReason, rejectionReason: incomingRejectionReason, cat: cat, subcommittee: String(input.subcommittee || existing.subcommittee || "").trim(), owner: assignees, responsibleCommissioners: assignees, petitionerPhone: _appPhoneForSheet_(input.petitionerPhone || existing.petitionerPhone || ""), meetingStatus: String(input.meetingStatus || existing.meetingStatus || "").trim(), subject: String(input.subject || title || existing.subject || "").trim(), caseType: cat, topic: subCat, schemaStamp: "domain-schema-cases-current", createdAt: existing.createdAt || now, updatedAt: now, isDeleted: ! 1, deletedAt: ""
  })
}
function _applyCaseAiSummaryIfNeeded_(caseId, record, isNew) {
  if(! isNew)return"";
  record = record || {
  };
  var title = String(record.title || record.caseTitle || "").trim();
  if(! _getGeminiKey_() ||! title)return"";
  try {
    var aiSummary = _generateCaseSummary_(title, record.petitioners || "", record.respondent || "");
    return aiSummary &&! String(record.keySummary || "").trim() && _getMainDataRepository_().upsert(caseId, {
      caseId: caseId, keySummary: aiSummary
    }), aiSummary || ""
  }
  catch(_aiErr) {
    return _recordWarning_("ec", _aiErr), ""
  }
}
function _caseNormalizeComparableText_(value) {
  return String(null == value ? "": value).replace(/\s+/g, " ").trim()
}
function _caseValidateIndependentFields_(input) {
  var caseNum = _caseManualNumericText_((input = input || {
  }).caseNum || input.caseNo || ""), recNo = _caseManualReceiveNoText_(input.recNo || input.receiveNo || ""), keySummary = _caseNormalizeComparableText_(input.keySummary || input.summary || ""), remark = _caseNormalizeComparableText_(input.remark || input.note || "");
  if(keySummary && remark && keySummary === remark)throw new Error("สรุปสาระสำคัญของเรื่อง และหมายเหตุ ต้องเป็นคนละรายการ ห้ามคัดลอกข้อความเดียวกัน");
  return ! 0
}
// ===== DOMAIN PHYSICAL: CASE WRITE API FACADES =====
function apiSaveCase(payload) {
  return writeGateway_("apiSaveCase", payload || {
  }, function(inputPayload) {
    _appIsFnName_("_domainRouterAuthAlreadyOk_") && _domainRouterAuthAlreadyOk_(inputPayload) || requireAuth_(inputPayload, "staff");
    var sess = _getSession_(inputPayload.token || inputPayload._token), c = _caseNormalizeInputDto_(inputPayload.case || inputPayload || {
    });
    _caseValidateIndependentFields_(c);
    var title = String(c.title || c.caseTitle || "").trim();
    if(! title)throw new Error("กรุณากรอกชื่อเรื่อง");
    _caseEnsureMainDataPendingRemarkColumn_();
    var repo = _getMainDataRepository_(), existing = _findExistingCaseRecord_(c), now, record = _buildCaseCanonicalRecord_(c, existing, (new Date).toISOString());
    _caseEnsureMainDataReferenceTextColumns_();
    var saved = repo.upsert(record.caseId, record);
    invalidateSheetCache_("MainData");
    var derivedInvalidation = _appIsFnName_("_invalidateCaseDerivedCaches_") ? _invalidateCaseDerivedCaches_("apiSaveCase"): {
    }, aiSummary = "";
    ! inputPayload ||! 0 !== inputPayload.enableAiSummary &&! 0 !== inputPayload.generateAiSummary &&! 0 !== inputPayload.aiSummaryRequested || (aiSummary = _applyCaseAiSummaryIfNeeded_(record.caseId, record, saved && "create" === saved.mode)), logAudit_("apiSaveCase", {
      caseId: record.caseId, mode: saved && saved.mode || (existing ? "update": "create"), title: title, user: sess ? sess.username || sess.email: "unknown"
    });
    var dto = _caseCanonicalDto_(record);
    return ok_(Object.assign({
    }, dto, {
      aiSummary: aiSummary || "", cacheInvalidation: derivedInvalidation || {
      }
    }), "บันทึกข้อมูลเรื่องสำเร็จ")
  }, "บันทึกข้อมูลเรื่องสำเร็จ", "บันทึกข้อมูลเรื่องไม่สำเร็จ")
}
function apiDeleteCase(payload) {
  return writeGateway_("apiDeleteCase", payload || {
  }, function(input) {
    _appIsFnName_("_domainRouterAuthAlreadyOk_") && _domainRouterAuthAlreadyOk_(input) || requireAuth_(input, "admin");
    var sess = _getSession_(input.token || input._token), caseId = String(input.caseId || "").trim();
    if(! caseId)throw new Error("ไม่พบ caseId");
    getCanonicalHeaderAudit_("MainData");
    if(! softDeleteSheetObjectByKey_("MainData", "caseId", caseId))throw new Error("ไม่พบเรื่อง: " + caseId);
    invalidateSheetCache_("MainData");
    var derivedInvalidation = _appIsFnName_("_invalidateCaseDerivedCaches_") ? _invalidateCaseDerivedCaches_("apiDeleteCase"): {
    };
    logAudit_("apiDeleteCase", {
      caseId: caseId, user: sess ? sess.username: "unknown"
    });
    return ok_({
      deleted: ! 0, caseId: caseId, cacheInvalidation: derivedInvalidation || {
      }
    }, "ลบข้อมูลเรื่องสำเร็จ")
  }, "ลบข้อมูลเรื่องสำเร็จ", "ลบข้อมูลเรื่องไม่สำเร็จ")
}
function apiSearch(payload) {
  payload = payload || {
  };
  try {
    _appIsFnName_("_domainRouterAuthAlreadyOk_") && _domainRouterAuthAlreadyOk_(payload) || requireAuth_(payload, "viewer");
    var q = String(payload.q || payload.query || payload.keyword || "").trim().toLowerCase(), type = String(payload.type || "all").toLowerCase().trim() || "all", limit = Math.max(1, Math.min(Number(payload.limit || payload.pageSize || 25) || 25, 100)), sourceRows = _appIsFnName_("_caseReadMainDataRowsForSearch_") ? _caseReadMainDataRowsForSearch_(_caseSearchProjectedFields_(), {
      forceFresh: ! 0, noCache: ! 0, bypassCache: ! 0, cacheTtlSeconds: 0, source: "apiSearch.displaySafeDefaultValue"
    }): _caseDomainMainDataProjectedRows_(! 1), cases = (Array.isArray(sourceRows) ? sourceRows: []).map(function(r) {
      var dto = _caseCanonicalDto_(r || {
      });
      _appIsFnName_("_caseSearchEnsureReceiveNo_") && (dto = _caseSearchEnsureReceiveNo_(dto));
      var caseNum = _caseManualNumericText_(dto.caseNum || dto.caseNo || dto.runningNo || dto["ลำดับเรื่อง"] || ""), recNo = _caseManualReceiveNoText_(dto.recNo || dto.receiveNo || dto["เลขรับเรื่อง"] || ""), title = String(dto.title || dto.subject || "").trim(), caseTitle = String(dto.caseTitle || dto.considerationTitle || dto["ชื่อเรื่องพิจารณา (ถ้ามี)"] || "").trim();
      return {
        id: dto.caseId || dto.id || "", caseId: dto.caseId || dto.id || "", type: "case", typeLabel: "เรื่องพิจารณา", caseNum: caseNum, caseNo: caseNum, runningNo: caseNum, "ลำดับเรื่อง": caseNum, recNo: recNo, receiveNo: recNo, "เลขรับเรื่อง": recNo, title: title || caseTitle || "", subject: title || caseTitle || "", caseTitle: caseTitle || title || "", considerationTitle: caseTitle || "", "ชื่อเรื่องพิจารณา (ถ้ามี)": caseTitle || title || "", detail: dto.petitioners || dto.petitionerName || dto.petitioner || "", petitioners: dto.petitioners || dto.petitionerName || dto.petitioner || "", respondent: dto.respondent || dto.agencyName || "", agencyName: dto.agencyName || dto.respondent || "", status: dto.status || "", offerDate: dto.offerDate || dto.bookDate || dto.letterDate || dto.dateProposed || "", dateProposed: dto.dateProposed || dto.offerDate || "", bookDate: dto.bookDate || dto.offerDate || "", closedReason: dto.closedReason || "", rejectionReason: dto.rejectionReason || "", rejectReason: dto.rejectReason || dto.rejectionReason || "", notAcceptedReason: dto.notAcceptedReason || dto.rejectionReason || "", "เหตุผล (ไม่รับเรื่อง)": dto["เหตุผล (ไม่รับเรื่อง)"] || dto.rejectionReason || "", cat: dto.cat || dto.caseType || "", caseType: dto.caseType || dto.cat || "", subCat: dto.subCat || "", assignees: dto.assignees || "", owner: dto.owner || dto.assignees || "", staffs: dto.staffs || dto.opStaff || "", coAssignees: dto.coAssignees || "", updatedAt: dto.updatedAt || dto.createdAt || ""
      }
    }), letters = _caseDomainLettersProjectedRows_(! 1).map(function(r) {
      return {
        id: r.letterId || "", type: "letter", typeLabel: "หนังสือ", title: r.subject || r.issue || "", detail: r.agency || "", status: r.letterStatus || r.status || "", updatedAt: r.updatedAt || r.createdAt || ""
      }
    }), all = cases.concat(letters);
    return"all" !== type && (all = all.filter(function(r) {
      return r.type === type
    })), q && (all = all.filter(function(r) {
      return[r.title, r.detail, r.typeLabel, r.status].some(function(v) {
        return - 1 !== String(v || "").toLowerCase().indexOf(q)
      })
    })), all.sort(function(a, b) {
      return String(b.updatedAt || "").localeCompare(String(a.updatedAt || ""))
    }), ok_(all.slice(0, limit).map(sanitizeRow_), "ค้นหาข้อมูลสำเร็จ")
  }
  catch(e) {
    return _recordWarning_("ec", e), err_(e.message || String(e), {
      rows: [], data: [], totalRecords: 0, technicalDebtFix: "apiSearch-projected-reader"
    })
  }
}
function apiGetCaseContext(payload) {
  return payload = requireDomainRequest_(payload, "viewer"), normalizeResult_(_Domain_getCaseContext(payload), "โหลดบริบทข้อมูลเรื่องสำเร็จ", "โหลดบริบทข้อมูลเรื่องไม่สำเร็จ")
}
// ===== DOMAIN PHYSICAL: LETTER/TRACKING NORMALIZATION =====
function _letterIsDateLikeValue_(value) {
  if(null == value || "" === value)return ! 1;
  if(value instanceof Date &&! isNaN(value.getTime()))return ! 0;
  var raw = String(value || "").trim();
  if(! raw)return ! 1;
  if(/^\d{4}-\d{1,2}-\d{1,2}(?:[T\s]|$)/.test(raw))return ! 0;
  if(/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s/i.test(raw) || /GMT[+-]\d{4}|เวลาอินโดจีน/i.test(raw)) {
    var parsed = new Date(raw);
    return ! isNaN(parsed.getTime())
  }
  return ! 1
}
function _formatLetterNoFromDateValue_(value) {
  function toLetterNoFromParts(day, year) {
    var d = Number(day || 0), y = Number(year || 0);
    return d && y ? String(d) + "/" + String(y >= 2400 ? y: y + 543): ""
  }
  if(value instanceof Date &&! isNaN(value.getTime()))return toLetterNoFromParts(value.getDate(), value.getFullYear());
  var raw = String(null == value ? "": value).trim();
  if(! raw)return"";
  var isoMatch = raw.match(/^(\d{4})-(\d{1,2})-(\d{1,2})(?:[T\s]|$)/);
  if(isoMatch)return toLetterNoFromParts(isoMatch[3], isoMatch[1]);
  var parsed = new Date(raw);
  return isNaN(parsed.getTime()) ? "": toLetterNoFromParts(parsed.getDate(), parsed.getFullYear())
}
function _normalizeLetterNumberDisplay_(value) {
  if(null == value)return"";
  var textValue = String(value || "").trim();
  return textValue || value instanceof Date ? /^\d{1,5}\s*\/\s*\d{2,4}$/.test(textValue) ? textValue.replace(/\s*\/\s*/, "/"): _letterIsDateLikeValue_(value) && _formatLetterNoFromDateValue_(value) || textValue: ""
}
function _normalizeLetterDateFromFields_(letterDate, letterNo, bookNo) {
  var normalized = normalizeDateOutput_(letterDate || "");
  return normalized || (_letterIsDateLikeValue_(letterNo) ? normalizeDateOutput_(letterNo || ""): _letterIsDateLikeValue_(bookNo) ? normalizeDateOutput_(bookNo || ""): "")
}
function _normalizeLetterStatusCanonical_(status) {
  var s = String(null == status ? "": status).replace(/\s+/g, " ").trim();
  return s ? "ได้รับตอบกลับแล้ว" === s || "ตอบรับแล้ว" === s || "ได้รับแล้ว" === s ? "ได้รับแล้ว": s: "ยังไม่ได้รับ"
}
function _isReceivedLetterStatusCanonical_(status) {
  return"ได้รับแล้ว" === _normalizeLetterStatusCanonical_(status)
}
function _normalizeLetterRow_(row) {
  var rawLetterNo = (row = row || {
  }).letterNo || row.bookNo || "", rawBookNo = row.bookNo || row.letterNo || "", letterNoWasDate = _letterIsDateLikeValue_(row.letterNo || ""), bookNoWasDate = _letterIsDateLikeValue_(row.bookNo || "");
  return sanitizeRow_({
    letterId: String(row.letterId || ""), caseId: String(row.caseId || "").trim(), letterNo: _normalizeLetterNumberDisplay_(rawLetterNo), letterNoRaw: String(null == rawLetterNo ? "": rawLetterNo), letterNoSchemaIssue: letterNoWasDate || bookNoWasDate ? "date-like-letter-number": "", letterDate: _normalizeLetterDateFromFields_(row.letterDate || "", row.letterNo || "", row.bookNo || ""), agency: String(row.agency || ""), subject: String(row.subject || ""), issue: String(row.issue || ""), dueDate: normalizeDateOutput_(row.dueDate || ""), extendDate: normalizeDateOutput_(row.extendDate || ""), remark: String(row.remark || ""), letterStatus: _normalizeLetterStatusCanonical_(row.letterStatus || row.status || ""), repliesJSON: String(row.repliesJSON || row.repliesJson || "[]"), opStaff: String(row.opStaff || row.officer || ""), bookNo: _normalizeLetterNumberDisplay_(rawBookNo), bookNoRaw: String(null == rawBookNo ? "": rawBookNo), officer: String(row.officer || row.opStaff || "")
  })
}
function _meetingHistoryTypeText_(row) {
  row = row || {
  };
  var raw = String(row.committeeType || row.meetingType || row.type || row.meetingGroup || row["ประเภทการประชุม"] || "").replace(/\s+/g, " ").trim(), sub = String(row.subcommitteeName || row.subcommittee || row.subCommitteeName || row["คณะอนุกรรมาธิการ"] || "").replace(/\s+/g, " ").trim();
  if(/อนุกรรมาธิการ/.test(raw) || sub)return"คณะอนุกรรมาธิการ";
  if(/กรรมาธิการ/.test(raw))return"คณะกรรมาธิการ";
  return"คณะกรรมาธิการ"
}
function _normalizeMeetingLogRow_(row) {
  row = row || {
  };
  var meetingDateText = _committeeMeetingDateText_(row.date || row.meetingDate || row.dateRaw || row["วันที่ประชุม"] || ""), meetingTypeText = _meetingHistoryTypeText_(row), subcommitteeName = String(row.subcommitteeName || row.subcommittee || row.subCommitteeName || row["คณะอนุกรรมาธิการ"] || "").replace(/\s+/g, " ").trim();
  return sanitizeRow_({
    logId: String(row.logId || ""), caseId: String(row.caseId || "").trim(), round: String(row.round || ""), date: meetingDateText, meetingDate: meetingDateText, dateRaw: meetingDateText, "วันที่ประชุม": meetingDateText, meetingType: meetingTypeText, committeeType: meetingTypeText, "ประเภทการประชุม": meetingTypeText, subcommitteeName: "คณะอนุกรรมาธิการ" === meetingTypeText ? subcommitteeName: "", meetingGroup: "คณะอนุกรรมาธิการ" === meetingTypeText ? subcommitteeName || "คณะอนุกรรมาธิการ": "คณะกรรมาธิการ", note: String(row.note || ""), title: String(row.title || ""), location: String(row.location || ""), attendees: String(row.attendees || ""), summary: String(row.summary || ""), result: String(row.result || "")
  })
}
function _normalizeIdentityTextSafe_(value) {
  if(_appIsFnName_("_normalizeIdentityText_"))try {
    return _normalizeIdentityText_(value || "")
  }
  catch(_e) {
    _recordWarning_("ec", _e)
  }
  return String(null == value ? "": value).replace(/\s+/g, " ").replace(/[\u200B-\u200D\uFEFF]/g, "").trim().toLowerCase()
}
function _safeCaseIdentityKey_(row) {
  row = row || {
  };
  var primary = String(row.caseId || "").trim();
  return primary || [String(row.caseNum || "").trim(), String(row.recNo || "").trim(), _normalizeIdentityTextSafe_(row.title || row.caseTitle || ""), _normalizeIdentityTextSafe_(row.petitioners || row.petitionerName || "")].join("|")
}
function _safeMeetingLogIdentityKey_(row) {
  row = row || {
  };
  var caseId = String(row.caseId || "").trim(), caseNum = String(row.caseNum || row.caseNo || "").trim(), recNo = String(row.recNo || row.receiveNo || "").trim(), title = _normalizeIdentityTextSafe_(row.title || row.caseTitle || row.considerationTitle || row.subject || ""), caseKey = caseId || [caseNum, recNo, title].join("|"), round = String(row.round || row.meetingRound || row.meetingNo || row.relatedMeetingNo || row.roundNo || row["ครั้งที่"] || row["ครั้งที่ประชุม"] || "").replace(/^ครั้งที่\s*/i, "").replace(/^ครั้งประชุม\s*/i, "").replace(/\s+/g, " ").trim(), date = _committeeMeetingDateText_(row.date || row.meetingDate || row.relatedMeetingDate || row.dateRaw || row["วันที่ประชุม"] || ""), meetingType = _meetingHistoryTypeText_(row), subcommitteeName = "คณะอนุกรรมาธิการ" === meetingType ? _normalizeIdentityTextSafe_(row.subcommitteeName || row.subcommittee || row.subCommitteeName || row["คณะอนุกรรมาธิการ"] || row.meetingGroup || ""): "";
  return[caseKey, round, date, meetingType, subcommitteeName].join("|")
}
function _safeLetterIdentityKey_(row) {
  return row = row || {
  }, _appIsFnName_("_letterIdentityKey_") ? _letterIdentityKey_(row): [String(row.letterId || "").trim(), String(row.caseId || "").trim(), String(row.letterNo || row.bookNo || "").trim(), normalizeDateOutput_(row.letterDate || ""), _normalizeIdentityTextSafe_(row.subject || row.issue || "")].join("|")
}
function _safeDedupeLatestRowsBy_(rows, keyFn) {
  if(rows = Array.isArray(rows) ? rows.slice(): [], _appIsFnName_("_dedupeLatestRowsBy_"))try {
    return _dedupeLatestRowsBy_(rows, keyFn)
  }
  catch(_e) {
    _recordWarning_("ec", _e)
  }
  var map = {
  };
  return rows.forEach(function(row) {
    if(row) {
      var key = "";
      try {
        key = String(("function" == typeof keyFn ? keyFn(row): "") || "")
      }
      catch(_eKey) {
        _recordWarning_("ec", _eKey), key = ""
      }
      key || (key = String(row.id || row.caseId || row.logId || row.letterId || JSON.stringify(row)));
      var current = map[key], rowStamp, curStamp;
      if(! current)return map[key] = row, void 0;
      String(row.updatedAt || row.modifiedAt || row.timestamp || row.createdAt || "") >= String(current.updatedAt || current.modifiedAt || current.timestamp || current.createdAt || "") && (map[key] = row)
    }
  }), Object.keys(map).map(function(key) {
    return map[key]
  })
}
function _safeResolveCaseIdentityAliases_(payload) {
  if(payload = payload || {
  }, _appIsFnName_("_resolveCaseIdentityAliases_"))try {
    var resolved = _resolveCaseIdentityAliases_(payload) || {
    };
    if(resolved && "object" == typeof resolved)return resolved
  }
  catch(_e) {
    _recordWarning_("ec", _e)
  }
  var seedCase = null;
  try {
    seedCase = _findCaseByIdentity_(payload)
  }
  catch(_eFind) {
    _recordWarning_("ec", _eFind), seedCase = null
  }
  var ids = [], seedId = String(payload && (payload.caseId || payload.id) || "").trim();
  return seedId && ids.push(seedId), seedCase && String(seedCase.caseId || "").trim() && ids.push(String(seedCase.caseId || "").trim()), {
    ids: ids = ids.filter(Boolean).filter(function(v, i, arr) {
      return arr.indexOf(v) === i
    }), case: seedCase || {
      caseId: seedId, caseNum: String(payload.caseNum || "").trim(), recNo: String(payload.recNo || "").trim(), title: String(payload.title || payload.caseTitle || "").trim(), caseTitle: String(payload.caseTitle || payload.title || "").trim(), petitioners: String(payload.petitioners || payload.petitionerName || "").trim()
    }, rows: seedCase ? [seedCase]: []
  }
}
function _assertCaseExistsSafe_(payloadOrCaseId, sourceName) {
  var payload = payloadOrCaseId && "object" == typeof payloadOrCaseId ? payloadOrCaseId: {
    caseId: payloadOrCaseId
  };
  if(_appIsFnName_("_assertCaseExists_"))try {
    return _assertCaseExists_(payload, sourceName)
  }
  catch(_eAssert) {
    _recordWarning_("ec", _eAssert)
  }
  var found = null;
  try {
    found = _findCaseByIdentity_(payload)
  }
  catch(_eFind) {
    _recordWarning_("meeting.caseAssert.find", _eFind), found = null
  }
  if(! found)throw new Error("ไม่พบข้อมูลเรื่องพิจารณา");
  return found
}
function _meetingLettersProjectedFields_(name) {
  return"MainData" === (name = String(name || "").trim()) ? ["caseId", "caseNum", "recNo", "title", "caseTitle", "subject", "petitioners", "petitionerName", "status", "updatedAt", "createdAt", "isDeleted", "deletedAt"]: "MeetingLogs" === name ? ["logId", "meetingId", "caseId", "round", "date", "meetingDate", "title", "location", "attendees", "summary", "result", "note", "committeeType", "subcommitteeId", "subcommitteeName", "meetingGroup", "caseNum", "recNo", "updatedAt", "createdAt", "isDeleted", "deletedAt"]: "Letters" === name ? ["letterId", "caseId", "letterNo", "bookNo", "agency", "subject", "issue", "letterStatus", "status", "officer", "opStaff", "letterDate", "dueDate", "extendDate", "repliesJSON", "repliesJson", "updatedAt", "createdAt", "isDeleted", "deletedAt"]: []
}
function _meetingLettersRows_(name, includeDeleted) {
  var fields = _meetingLettersProjectedFields_(name = String(name || "").trim());
  if(! fields.length)throw new Error("MEETING_LETTERS_PROJECTED_READER_UNAVAILABLE: " + name);
  try {
    return _caseDomainSharedRows_(name, fields, {
      includeDeleted: ! 0 === includeDeleted, ttl: 120, requireCanonical: ! 1
    }) || []
  }
  catch(_projectedErr) {
    throw _recordWarning_("ec", _projectedErr), new Error("MEETING_LETTERS_PROJECTED_READER_FAILED: " + name + ": " + String(_projectedErr && _projectedErr.message ? _projectedErr.message: _projectedErr))
  }
}
// ===== DOMAIN PHYSICAL: TRACKING READ MODEL / SERVER PAGING =====
function _trackingProjectedFields_() {
  return {
    letters: ["letterId", "caseId", "letterNo", "bookNo", "agency", "subject", "issue", "letterStatus", "status", "officer", "opStaff", "letterDate", "dueDate", "extendDate", "repliesJSON", "repliesJson", "updatedAt", "isDeleted", "deletedAt"], cases: ["caseId", "caseNum", "recNo", "title", "caseTitle", "status", "updatedAt", "isDeleted", "deletedAt"]
  }
}
function TrackingRepository_() {
  var fields = _trackingProjectedFields_();
  function projected(sheetName, selectedFields, ttl) {
    try {
      return _caseDomainSharedRows_(sheetName, selectedFields, {
        includeDeleted: ! 1, ttl: ttl || 120
      }) || []
    }
    catch(_projectedErr) {
      throw _recordWarning_("ec", _projectedErr), new Error("TRACKING_PROJECTED_READER_FAILED: " + String(sheetName || "") + ": " + String(_projectedErr && _projectedErr.message ? _projectedErr.message: _projectedErr))
    }
  }
  return {
    repositoryOwner: ! 0, strictErrorMode: ! 0, listLetters: function() {
      return projected("Letters", fields.letters, 120)
    }, listCases: function() {
      return projected("MainData", fields.cases, 120)
    }, searchIndex: function(lettersRows, caseMap) {
      return _getLettersSearchIndex_(lettersRows, caseMap)
    }
  }
}
function _trackingReadLettersRows_() {
  return TrackingRepository_().listLetters()
}
function _meetingHistoryProjectedRows_() {
  var out = [];
  function push(row) {
    row = row || {
    };
    try {
      if(_appIsFnName_("isSoftDeletedRow_") && isSoftDeletedRow_(row))return
    }
    catch(_e) {
      _appIgnore_(_e, "c6.C30:769")
    }
    out.push(row)
  }
  try {
    (_caseDomainSharedRows_("MeetingLogs", ["caseId", "round", "meetingRound", "meetingNo", "relatedMeetingNo", "date", "meetingDate", "relatedMeetingDate", "วันที่ประชุม", "note", "logId", "meetingId", "title", "caseTitle", "considerationTitle", "subject", "location", "attendees", "summary", "result", "committeeType", "meetingType", "ประเภทการประชุม", "subcommitteeId", "subcommitteeName", "subcommittee", "คณะอนุกรรมาธิการ", "meetingGroup", "caseNum", "caseNo", "recNo", "receiveNo", "updatedAt", "isDeleted", "deletedAt"], {
      includeDeleted: ! 1, ttl: 120
    }) || []).forEach(push)
  }
  catch(_logErr) {
    _appIsFnName_("_recordWarning_") && _recordWarning_("meetingHistory.logs.read", _logErr)
  }
  try {
    var meetings = _caseDomainSharedRows_("CommitteeMeetings", ["meetingId", "id", "meetingNo", "meetingNumber", "no", "roundNo", "ครั้งที่", "ครั้งประชุม", "การประชุมครั้งที่", "meetingDate", "date", "วันที่ประชุม", "วันประชุม", "title", "status", "note", "committeeType", "meetingType", "ประเภทการประชุม", "subcommitteeId", "subcommitteeName", "subcommittee", "คณะอนุกรรมาธิการ", "meetingGroup", "updatedAt", "isDeleted", "deletedAt"], {
      includeDeleted: ! 1, ttl: 120
    }) || [], byId = {
    };
    meetings.forEach(function(m) {
      m = m || {
      };
      var id = String(m.meetingId || "").trim();
      id && (byId[id] = m)
    }), (_caseDomainSharedRows_("CommitteeMeetingAgendaItems", ["itemId", "id", "meetingId", "agendaNo", "seq", "agenda", "title", "เรื่อง", "ชื่อเรื่อง", "เรื่องพิจารณา", "considerationTitle", "relatedMeetingNo", "relatedMeetingDate", "caseId", "caseNum", "caseNo", "recNo", "receiveNo", "caseTitle", "agencyOrPresenter", "หน่วยงาน", "ผู้เสนอ", "result", "ผลการประชุม", "มติ", "note", "committeeType", "meetingType", "ประเภทการประชุม", "subcommitteeId", "subcommitteeName", "subcommittee", "คณะอนุกรรมาธิการ", "meetingGroup", "updatedAt", "isDeleted", "deletedAt"], {
      includeDeleted: ! 1, ttl: 120
    }) || []).forEach(function(item) {
      item = item || {
      };
      try {
        if(_appIsFnName_("isSoftDeletedRow_") && isSoftDeletedRow_(item))return
      }
      catch(_delErr) {
      _appIgnore_(_delErr, "c6.C30:799")
    }
      var meeting = byId[String(item.meetingId || "").trim()] || {
      }, caseId = String(item.caseId || "").trim(), caseNum = String(item.caseNum || item.caseNo || "").trim(), recNo = String(item.recNo || item.receiveNo || "").trim(), title = String(item.caseTitle || item.considerationTitle || item.title || item["ชื่อเรื่อง"] || item["เรื่อง"] || item["เรื่องพิจารณา"] || "").trim();
      if(caseId || caseNum || recNo || title) {
        var sub = String(item.subcommitteeName || item.subcommittee || item["คณะอนุกรรมาธิการ"] || meeting.subcommitteeName || meeting.subcommittee || meeting["คณะอนุกรรมาธิการ"] || item.meetingGroup || meeting.meetingGroup || "").trim(), ctype = String(item.committeeType || item.meetingType || item["ประเภทการประชุม"] || meeting.committeeType || meeting.meetingType || meeting["ประเภทการประชุม"] || "").trim(), meetingTitleTypeProbe = String(meeting.title || meeting["ชื่อการประชุม"] || "").trim();
        /อนุกรรมาธิการ/.test([ctype, sub, meetingTitleTypeProbe].join(" ")) || sub ? ctype = "คณะอนุกรรมาธิการ": ctype = "คณะกรรมาธิการ";
        var round = String(item.relatedMeetingNo || item.meetingNo || item.roundNo || item["ครั้งที่"] || meeting.meetingNo || meeting.meetingNumber || meeting.roundNo || meeting["ครั้งที่"] || "").trim(), date = item.relatedMeetingDate || item.meetingDate || item.date || item["วันที่ประชุม"] || meeting.meetingDate || meeting.date || meeting["วันที่ประชุม"] || "";
        push({
          logId: "CMI-" + String(item.itemId || item.id || item.meetingId || caseId || caseNum || recNo || title).replace(/[^A-Za-z0-9_-]/g, "").slice(0, 60), meetingId: item.meetingId || "", caseId: caseId, caseNum: caseNum, caseNo: caseNum, recNo: recNo, receiveNo: recNo, round: round, meetingNo: round, date: date, meetingDate: date, title: title || meeting.title || "", caseTitle: title || "", considerationTitle: title || "", note: item.result || item["ผลการประชุม"] || item["มติ"] || item.note || item.agencyOrPresenter || meeting.note || "", summary: [String(item.agendaNo || item.agenda || "").trim() ? "วาระ " + String(item.agendaNo || item.agenda).trim(): "", item.agencyOrPresenter || item["หน่วยงาน"] || item["ผู้เสนอ"] || ""].filter(function(v) {
            return String(v || "").trim()
          }).join(" / "), result: item.result || item["ผลการประชุม"] || item["มติ"] || item.note || "", committeeType: ctype, meetingType: ctype, "ประเภทการประชุม": ctype, subcommitteeId: item.subcommitteeId || meeting.subcommitteeId || "", subcommitteeName: "คณะอนุกรรมาธิการ" === ctype ? sub: "", meetingGroup: "คณะอนุกรรมาธิการ" === ctype ? sub || "คณะอนุกรรมาธิการ": "คณะกรรมาธิการ", updatedAt: item.updatedAt || meeting.updatedAt || ""
        })
      }
    })
  }
  catch(_agendaErr) {
    _appIsFnName_("_recordWarning_") && _recordWarning_("meetingHistory.agenda.read", _agendaErr)
  }
  var seen = {
  };
  return out.filter(function(r) {
    var k = [r.logId, r.caseId, r.caseNum, r.recNo, r.round, r.date, r.note, r.committeeType, r.subcommitteeName].join("|");
    return ! seen[k] && (seen[k] = 1, ! 0)
  })
}
function _trackingNormalizeLetterNo_(value) {
  return _appIsFnName_("_normalizeLetterNumberDisplay_") ? _normalizeLetterNumberDisplay_(value): String(null == value ? "": value).trim()
}
function _trackingNormalizeStatus_(status) {
  if(_appIsFnName_("_normalizeLetterStatusCanonical_"))return _normalizeLetterStatusCanonical_(status);
  var s = String(null == status ? "": status).replace(/\s+/g, " ").trim();
  return s ? "ได้รับตอบกลับแล้ว" === s || "ตอบรับแล้ว" === s ? "ได้รับแล้ว": s: "ยังไม่ได้รับ"
}
function _trackingIsReceived_(status) {
  return _appIsFnName_("_isReceivedLetterStatusCanonical_") ? _isReceivedLetterStatusCanonical_(status): "ได้รับแล้ว" === _trackingNormalizeStatus_(status)
}
function _trackingQueryCacheKey_(payload) {
  payload = payload || {
  };
  var todayKey = Utilities.formatDate(new Date, Session.getScriptTimeZone() || "Asia/Bangkok", "yyyy-MM-dd"), raw = {
    query: String(payload.query || payload.search || ""), filterType: String(payload.filterType || payload.type || "all"), status: String(payload.status || ""), opStaff: String(payload.opStaff || payload.staff || ""), agency: String(payload.agency || payload.agencyFilter || payload.agencyName || ""), caseId: String(payload.caseId || ""), sortBy: String(payload.sortBy || "sequence"), sortDir: String(payload.sortDir || "asc"), page: Math.max(1, Number(payload.page || 1) || 1), limit: Math.max(1, Math.min(Number(payload.limit || 25) || 25, 25)), date: todayKey, release: String((_appIsFnName_("_appRelease_") && _appRelease_() || {
    }).assetStamp || (_appIsFnName_("_appRelease_") && _appRelease_() || {
    }).stamp || "")
  };
  return"tracking_query_status_filter_v8_" + (_appIsFnName_("_entityCacheStamp_") ? _entityCacheStamp_("letters"): "1") + "_" + (_appIsFnName_("_entityCacheStamp_") ? _entityCacheStamp_("maindata"): "1") + "_" + _hashPassword_(JSON.stringify(raw)).substring(0, 24)
}
function _trackingCaseMapCacheKey_() {
  return"tracking_case_map_current_" + (_appIsFnName_("_entityCacheStamp_") ? _entityCacheStamp_("maindata"): "1")
}
function _trackingBuildCaseMap_(cases, guardShouldYield, guardMarkPartial) {
  var caseMap = {
  };
  cases = Array.isArray(cases) ? cases: [];
  for(var caseIndex = 0;
  caseIndex < cases.length;
  caseIndex ++ ) {
    if("function" == typeof guardShouldYield && guardShouldYield(650)) {
      "function" == typeof guardMarkPartial && guardMarkPartial({
        stage: "case-map", processedCases: caseIndex, totalCases: cases.length
      });
      break
    }
    var r = cases[caseIndex];
    r &&! isSoftDeletedRow_(r) && (caseMap[String(r.caseId || "")] = {
      caseNum: String(r.caseNum || ""), recNo: String(r.recNo || ""), title: String(r.title || r.caseTitle || ""), status: String(r.status || "")
    })
  }
  return caseMap
}
function _trackingGetCaseMap_(trackingRepo, guardShouldYield, guardMarkPartial, forceFresh) {
  var key = _trackingCaseMapCacheKey_(), requestHit = _requestScopeGet_("trackingCaseMap", key);
  if(requestHit && "object" == typeof requestHit)return requestHit;
  if(! 0 !== forceFresh && _appIsFnName_("_cacheGetJson_")) {
    var cached = _cacheGetJson_(key);
    if(cached && cached.map && "object" == typeof cached.map)return _requestScopePut_("trackingCaseMap", key, cached.map)
  }
  var map = _trackingBuildCaseMap_(trackingRepo.listCases(), guardShouldYield, guardMarkPartial);
  if(_appIsFnName_("_cachePutJson_"))try {
    _cachePutJson_(key, {
      map: map
    }, 180)
  }
  catch(_cacheErr) {
    _recordWarning_("ec", _cacheErr)
  }
  return _requestScopePut_("trackingCaseMap", key, map)
}
function _trackingEmptyResult_(payload, message, code) {
  payload = payload || {
  };
  var limit = Math.max(1, Math.min(Number(payload.limit || 25) || 25, 25)), page;
  return {
    rows: [], data: [], page: Math.max(1, Number(payload.page || 1) || 1), limit: limit, totalRecords: 0, totalPages: 1, generatedAt: (new Date).toISOString(), cached: ! 1, cacheStatus: "safe-empty", serverPaged: ! 0, serverFiltered: ! 0, statusCounts: {
      all: 0, received: 0, overdue: 0, notdue: 0
    }, maxPageSize: 25, contract: "tracking-server-paged-current", dataQuality: {
      letterNoSchemaIssues: 0
    }, filterType: String(payload.filterType || payload.type || "all"), sortBy: String(payload.sortBy || "sequence"), sortDir: String(payload.sortDir || "asc"), warning: String(message || ""), errorCode: String(code || "")
  }
}
function _trackingParseReplies_(row) {
  try {
    var raw = String(row && (row.repliesJSON || row.repliesJson) || "[]").trim();
    return raw && "[" === raw.charAt(0) ? JSON.parse(raw): []
  }
  catch(_e) {
    return _recordWarning_("ec", _e), []
  }
}
function _trackingDateOnly_(value) {
  if(! value)return null;
  try {
    var d = new Date(value);
    return isNaN(d.getTime()) ? null: (d.getFullYear() > 2400 && (d = new Date(d.getFullYear() - 543, d.getMonth(), d.getDate())), d.setHours(0, 0, 0, 0), d)
  }
  catch(_e) {
    return _appIsFnName_("_recordWarning_") && _recordWarning_("observed.catch", _e, {
      file: "C30"
    }), null
  }
}
function _trackingDueDateOnly_(value) {
  if(! value && 0 !== value)return null;
  try {
    if(value instanceof Date) {
      var direct = new Date(value.getFullYear(), value.getMonth(), value.getDate());
      return direct.setHours(0, 0, 0, 0), direct
    }
    var text = String(null == value ? "": value).replace(/[\u200B-\u200D\uFEFF]/g, "").trim();
    if(! text)return null;
    var m = text.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    if(m) {
      var y = Number(m[1]);
      y > 2400 && (y -= 543);
      var d1 = new Date(y, Number(m[2]) - 1, Number(m[3]));
      if(! isNaN(d1.getTime()))return d1.setHours(0, 0, 0, 0), d1
    }
    if(m = text.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})$/)) {
      var yy = Number(m[3]);
      yy < 100 && (yy += 2500), yy > 2400 && (yy -= 543);
      var d2 = new Date(yy, Number(m[2]) - 1, Number(m[1]));
      if(! isNaN(d2.getTime()))return d2.setHours(0, 0, 0, 0), d2
    }
    var d = new Date(text);
    return isNaN(d.getTime()) ? null: (d.getFullYear() > 2400 && (d = new Date(d.getFullYear() - 543, d.getMonth(), d.getDate())), d.setHours(0, 0, 0, 0), d)
  }
  catch(_dueErr) {
    return _recordWarning_("tracking.dueDateOnly", _dueErr), null
  }
}
function _trackingReceivedFreezeDate_(normalized, replies, today) {
  normalized = normalized || {
  }, replies = Array.isArray(replies) ? replies: [];
  for(var i = 0;
  i < replies.length;
  i ++ ) {
    var rd = _trackingDateOnly_(replies[i] && (replies[i].date || replies[i].replyDate || replies[i].receivedDate));
    if(rd)return rd
  }
  return _trackingDateOnly_(normalized.receivedDate || normalized.replyDate || normalized.statusUpdatedAt || normalized.updatedAt || normalized.modifiedAt) || _trackingDateOnly_(today) || null
}
function _trackingSequenceNumber_(value) {
  var text = _trackingNormalizeLetterNo_(value), m = String(text || "").match(/\d+/);
  return m ? Number(m[0]): Number.MAX_SAFE_INTEGER
}
function _trackingBuildStatusCounts_(items) {
  var counts = {
    all: 0, received: 0, overdue: 0, notdue: 0
  };
  return(Array.isArray(items) ? items: []).forEach(function(item) {
    counts.all += 1;
    var key = String(item && item.filterKey || "notdue");
    counts[key] || (counts[key] = 0), counts[key] += 1
  }), counts
}
function _trackingApplyServerFilters_(items, filters) {
  var matchedLetterIds = (filters = filters || {
  }).matchedLetterIds || null, query = String(filters.query || ""), statusFilter = String(filters.statusFilter || ""), staffFilter = String(filters.staffFilter || "").toLowerCase(), agencyFilter = String(filters.agencyFilter || "").toLowerCase(), caseIdFilter = String(filters.caseIdFilter || "");
  return(Array.isArray(items) ? items: []).filter(function(item) {
    return ! (! item || isSoftDeletedRow_(item)) && ((! caseIdFilter || String(item.caseId || "") === caseIdFilter) && ((! statusFilter || String(item.letterStatus || "") === statusFilter || String(item.status || "") === statusFilter) && ((! staffFilter ||- 1 !== String(item.opStaff || item.officer || "").toLowerCase().indexOf(staffFilter)) && ((! agencyFilter ||- 1 !== String(item.agency || "").toLowerCase().indexOf(agencyFilter)) &&! (query && matchedLetterIds &&! matchedLetterIds[String(item.letterId || "")])))))
  })
}
function _trackingGuardAdapters_(guard) {
  function shouldYield(bufferMs) {
    return !! guard && (_appIsFn_(guard.shouldYield) ? guard.shouldYield(bufferMs): !! _appIsFn_(guard.timeLeftMs) && guard.timeLeftMs() <= Math.max(Number(bufferMs || 0) || 0, 1500))
  }
  function markPartial(detail) {
    if(guard)if(_appIsFn_(guard.markPartial))try {
      guard.markPartial(detail || {
      })
    }
    catch(_markErr) {
      _recordWarning_("tracking.guard.markPartial", _markErr)
    }
    else if(_appIsFn_(guard.check))try {
      guard.check("partial", detail || {
      })
    }
    catch(_checkErr) {
      _recordWarning_("tracking.guard.checkPartial", _checkErr)
    }
  }
  return {
    shouldYield: shouldYield, markPartial: markPartial
  }
}
function _trackingBuildQueryMatchMap_(query, letterIndex) {
  if(! (query = String(query || "").trim().toLowerCase()))return null;
  var matchedLetterIds = {
  }, queryTokens = query.split(/[^0-9a-zA-Zก-๙]+/).map(function(x) {
    return String(x || "").trim()
  }).filter(Boolean);
  return(letterIndex || []).forEach(function(entry) {
    if(entry) {
      var hit =- 1 !== String(entry.text || "").indexOf(query);
      if(! hit && queryTokens.length) {
        var tokenMap = {
        };
        (entry.tokens || []).forEach(function(t) {
          tokenMap[t] = 1
        }), hit = queryTokens.every(function(t) {
          return tokenMap[t] ||- 1 !== String(entry.text || "").indexOf(t)
        })
      }
      hit && (matchedLetterIds[String(entry.letterId || "")] = 1)
    }
  }), matchedLetterIds
}
function _trackingNormalizeRowsForServerPage_(rows, caseMap, today, guardApi) {
  var normalizedItems = [];
  rows = Array.isArray(rows) ? rows: [];
  for(var rowIndex = 0;
  rowIndex < rows.length;
  rowIndex ++ ) {
    if(guardApi && guardApi.shouldYield && guardApi.shouldYield(650)) {
      guardApi.markPartial && guardApi.markPartial({
        stage: "normalize-letters", processedRows: rowIndex, totalRows: rows.length
      });
      break
    }
    var r = rows[rowIndex] || {
    }, normalized = _appIsFnName_("_normalizeLetterRow_") ? _normalizeLetterRow_(r): r, due = _trackingDueDateOnly_(normalized.extendDate || normalized.dueDate), daysLeft = due ? Math.round((due - today)/864e5): null, letterStatus = _trackingNormalizeStatus_(normalized.letterStatus || normalized.status || ""), received = _trackingIsReceived_(letterStatus), repliesParsed = _trackingParseReplies_(normalized), receivedFreezeDate = received ? _trackingReceivedFreezeDate_(normalized, repliesParsed, today): null;
    received && due && receivedFreezeDate && (daysLeft = Math.round((due - receivedFreezeDate)/864e5));
    var filterKey = received ? "received": due && daysLeft <= 0 ? "overdue": "notdue", caseInfo = (caseMap || {
    })[String(normalized.caseId || "")] || {
      caseNum: "-", recNo: "", title: "-", status: ""
    };
    normalizedItems.push(sanitizeRow_({
      letterId: normalized.letterId || "", caseId: normalized.caseId || "", caseNum: caseInfo.caseNum, recNo: caseInfo.recNo, caseTitle: caseInfo.title, title: caseInfo.title, caseStatus: caseInfo.status, letterNo: _trackingNormalizeLetterNo_(normalized.letterNo || normalized.bookNo || ""), bookNo: _trackingNormalizeLetterNo_(normalized.bookNo || normalized.letterNo || ""), letterNoRaw: normalized.letterNoRaw || "", letterNoSchemaIssue: normalized.letterNoSchemaIssue || "", agency: normalized.agency || "", subject: normalized.subject || normalized.title || "", issue: normalized.issue || "", daysLeft: null === daysLeft ? "": daysLeft, frozenDaysLeft: received && null !== daysLeft ? daysLeft: "", stoppedDayCount: received, receivedDate: receivedFreezeDate ? Utilities.formatDate(receivedFreezeDate, Session.getScriptTimeZone() || "Asia/Bangkok", "yyyy-MM-dd"): "", status: letterStatus, letterStatus: letterStatus, filterKey: filterKey, officer: normalized.officer || normalized.opStaff || "", opStaff: normalized.opStaff || normalized.officer || "", letterDate: normalized.letterDate || "", dueDate: normalized.dueDate || "", extendDate: normalized.extendDate || "", repliesJSON: normalized.repliesJSON || "[]", replies: repliesParsed
    }))
  }
  return normalizedItems
}
function _trackingSortServerItems_(items, sortBy, sortDir) {
  return(items = Array.isArray(items) ? items: []).sort(function(a, b) {
    var av, bv;
    if("caseNum" === sortBy || "sequence" === sortBy || "seq" === sortBy)return(av = _trackingSequenceNumber_(a && (a.caseNum || a.recNo || a.letterNo))) === (bv = _trackingSequenceNumber_(b && (b.caseNum || b.recNo || b.letterNo))) ? String(a.caseNum || a.letterNo || "").localeCompare(String(b.caseNum || b.letterNo || ""), "th", {
      numeric: ! 0, sensitivity: "base"
    }): "desc" === sortDir ? bv - av: av - bv;
    if(av = a && a[sortBy], bv = b && b[sortBy], "daysLeft" === sortBy ? (av = Number("" === av || null == av ? 999999: av), bv = Number("" === bv || null == bv ? 999999: bv)): "letterDate" === sortBy || "dueDate" === sortBy || "extendDate" === sortBy ? (av = av ? new Date(av).getTime(): 0, bv = bv ? new Date(bv).getTime(): 0): (av = String(null == av ? "": av).toLowerCase(), bv = String(null == bv ? "": bv).toLowerCase()), av === bv)return 0;
    var cmp = av > bv ? 1: - 1;
    return"desc" === sortDir ?- cmp: cmp
  }), items
}
function _trackingPaginateServerItems_(items, payload) {
  var trackingPayload = Object.assign({
  }, payload, {
    limit: Math.max(1, Math.min(Number(payload.limit || 25) || 25, 25)), page: Math.max(1, Number(payload.page || 1) || 1)
  });
  return _appIsFnName_("_paginateArrayResult_") ? _paginateArrayResult_(items.map(sanitizeRow_), trackingPayload, 25, 25, {
    source: "tracking-core-server-filtered"
  }): {
    rows: items.map(sanitizeRow_).slice(0, 25), totalRecords: items.length, page: 1, limit: Math.min(items.length, 25), totalPages: Math.max(1, Math.ceil(items.length/25))
  }
}
function _trackingRequestOptions_(payload) {
  payload = payload || {
  };
  var query = String(payload.query || payload.search || "").trim().toLowerCase(), rawType = String(payload.filterType || payload.type || payload.statusType || "all").replace(/[ ​-‍﻿]/g, " ").trim().toLowerCase(), compact = rawType.replace(/[\s_\-\/]+/g, ""), thai = String(payload.filterType || payload.type || "").replace(/\s+/g, ""), typeFilter = "all";
  rawType && "all" !== compact && "หนังสือทั้งหมด" !== thai ? "received" === compact || "done" === compact || "reply" === compact || "replied" === compact || thai.indexOf("ตอบรับ") >- 1 || thai.indexOf("ได้รับแล้ว") >- 1 ? typeFilter = "received": "overdue" === compact || "due" === compact || "late" === compact || "expired" === compact || "ครบเลยกำหนด" === compact || thai.indexOf("เลยกำหนด") >- 1 || thai.indexOf("ครบกำหนด") >- 1 ? typeFilter = "overdue": ("notdue" === compact || "notyetdue" === compact || "pending" === compact || "soon" === compact || "ยังไม่ครบกำหนด" === compact || "ไม่ครบกำหนด" === compact || thai.indexOf("ไม่ครบกำหนด") >- 1) && (typeFilter = "notdue"): typeFilter = "all";
  var sortBy = String(payload.sortBy || "sequence").trim(), allowedSorts;
  return {
    sequence: ! 0, seq: ! 0, caseNum: ! 0, letterNo: ! 0, letterDate: ! 0, dueDate: ! 0, extendDate: ! 0, daysLeft: ! 0, agency: ! 0, opStaff: ! 0, status: ! 0, letterStatus: ! 0
  }
  [sortBy] || (sortBy = "sequence"), {
    query: query, typeFilter: typeFilter, statusFilter: String(payload.status || "").trim(), staffFilter: String(payload.opStaff || payload.staff || "").trim().toLowerCase(), agencyFilter: String(payload.agency || payload.agencyFilter || payload.agencyName || "").trim().toLowerCase(), caseIdFilter: String(payload.caseId || "").trim(), sortBy: sortBy, sortDir: "desc" === String(payload.sortDir || "asc").trim().toLowerCase() ? "desc": "asc"
  }
}
function _trackingReadCachedPage_(cacheKey) {
  if(! _appIsFnName_("_cacheGetJson_"))return null;
  var cachedTracking = _cacheGetJson_(cacheKey);
  return cachedTracking && Array.isArray(cachedTracking.rows) &&! 0 === cachedTracking.serverPaged &&! 0 === cachedTracking.serverFiltered && "tracking-server-paged-current" === cachedTracking.contract && cachedTracking.rows.length <= 25 && Number(cachedTracking.limit || 25) <= 25 ? (cachedTracking.cached =! 0, cachedTracking.cacheStatus = "hit", cachedTracking): null
}
function _trackingBuildServerPageData_(payload, guardApi) {
  var opts = _trackingRequestOptions_(payload = payload || {
  }), trackingRepo = TrackingRepository_(), rows = trackingRepo.listLetters(), caseMap = _trackingGetCaseMap_(trackingRepo, guardApi && guardApi.shouldYield, guardApi && guardApi.markPartial, ! 0 === payload.forceFresh), today = new Date;
  today.setHours(0, 0, 0, 0);
  var matchedLetterIds = _trackingBuildQueryMatchMap_(opts.query, trackingRepo.searchIndex(rows, caseMap)), normalizedItems = _trackingNormalizeRowsForServerPage_(rows, caseMap, today, guardApi || {
  }), baseItems = _trackingApplyServerFilters_(normalizedItems, {
    query: opts.query, matchedLetterIds: matchedLetterIds, statusFilter: opts.statusFilter, staffFilter: opts.staffFilter, agencyFilter: opts.agencyFilter, caseIdFilter: opts.caseIdFilter
  }), statusCounts = _trackingBuildStatusCounts_(baseItems), items = baseItems.filter(function(item) {
    return ! opts.typeFilter || "all" === opts.typeFilter || String(item.filterKey || "") === opts.typeFilter
  });
  return items = _trackingSortServerItems_(items, opts.sortBy, opts.sortDir), {
    opts: opts, rows: rows, normalizedItems: normalizedItems, baseItems: baseItems, items: items, paged: _trackingPaginateServerItems_(items, payload), statusCounts: statusCounts
  }
}
function _trackingBuildServerOutput_(payload, result, cacheKey, guard) {
  var opts = (result = result || {
  }).opts || _trackingRequestOptions_(payload || {
  }), baseItems = Array.isArray(result.baseItems) ? result.baseItems: [], paged = result.paged || {
  }, generatedAt = (new Date).toISOString(), out = Object.assign({
  }, paged, {
    generatedAt: generatedAt, cached: ! 1, cacheStatus: "miss", serverPaged: ! 0, serverFiltered: ! 0, statusCounts: result.statusCounts || _trackingBuildStatusCounts_(baseItems), maxPageSize: 25, contract: "tracking-server-paged-current", contractEnvelope: "rows-totalRecords-page-limit-meta-current", meta: {
      source: "tracking-core-server-filtered", generatedAt: generatedAt, filterType: opts.typeFilter || "all", sortBy: opts.sortBy, sortDir: opts.sortDir
    }, dataQuality: {
      letterNoSchemaIssues: baseItems.filter(function(x) {
        return ! (! x ||! x.letterNoSchemaIssue)
      }).length
    }, filterType: opts.typeFilter || "all", sortBy: opts.sortBy, sortDir: opts.sortDir, partial: !! (guard && guard.report && guard.report().yielded), warning: guard && guard.report && guard.report().yielded ? "PARTIAL_RESULT_TIMEOUT_GUARD": ""
  });
  return guard && _appIsFnName_("_executionGuardAttachMeta_") && (out = _executionGuardAttachMeta_(out, guard, {
    rowsRead: (result.rows || []).length, normalizedRows: (result.normalizedItems || []).length
  })), _appIsFnName_("_noteResponseBudget_") && (out.responseBudget = _noteResponseBudget_("apiGetTracking", out)), out
}
function _getTrackingCore_(payload) {
  payload = payload || {
  };
  var guard = "function" == typeof createExecutionGuard_ ? createExecutionGuard_({
    label: "_getTrackingCore_", route: "apiGetTracking", maxMs: Number(payload.hardLimitMs || 28e3) || 28e3, warningMs: Number(payload.softLimitMs || 24e3) || 24e3
  }): null, guardApi = _trackingGuardAdapters_(guard);
  try {
    var cacheTtlSeconds = Math.max(10, Math.min(Number(payload.cacheTtlSeconds || 45) || 45, 180)), cacheKey = _trackingQueryCacheKey_(payload);
    if(! 0 !== payload.forceFresh) {
      var cachedTracking = _trackingReadCachedPage_(cacheKey);
      if(cachedTracking)return ok_(cachedTracking, "โหลดข้อมูลติดตามหนังสือสำเร็จ")
    }
    var pageData, out = _trackingBuildServerOutput_(payload, _trackingBuildServerPageData_(payload, guardApi), cacheKey, guard);
    return _appIsFnName_("_cachePutJson_") && _cachePutJson_(cacheKey, out, cacheTtlSeconds), ok_(out, "โหลดข้อมูลติดตามหนังสือสำเร็จ")
  }
  catch(e) {
    _recordWarning_("ec", e);
    var userMessage = _appIsFnName_("_aiUserFacingError_") ? _aiUserFacingError_(e): e && e.message ? e.message: String(e);
    try {
      "function" == typeof logAudit_ && logAudit_("tracking.strict_error", {
        message: String(userMessage || "").substring(0, 240)
      })
    }
    catch(_auditErr) {
      _recordWarning_("ec", _auditErr)
    }
    var empty = _trackingEmptyResult_(payload, userMessage, "TRACKING_PROJECTED_READER_REQUIRED");
    return empty.partial =! 0, empty.cacheStatus = "error", empty.strictErrorMode =! 0, err_("โหลดข้อมูลติดตามหนังสือไม่สำเร็จ: " + userMessage, empty)
  }
}
// ===== DOMAIN PHYSICAL: TRACKING API DOMAIN FACADES =====
function _Domain_getLetters(caseId) {
  try {
    getCanonicalHeaderAudit_("Letters");
    var aliases = _safeResolveCaseIdentityAliases_(caseId), idMap = {
    };
    if((aliases.ids || []).forEach(function(id) {
      idMap[String(id)] =! 0
    }), ! Object.keys(idMap).length && caseId && "object" == typeof caseId) {
      var rawCaseId = String(caseId.caseId || caseId.id || "").trim();
      rawCaseId && (idMap[rawCaseId] =! 0)
    }
    var targetTitle = _normalizeIdentityTextSafe_(aliases.case && (aliases.case.title || aliases.case.caseTitle) || caseId && (caseId.title || caseId.caseTitle) || ""), allLetters = _trackingReadLettersRows_(), rows = allLetters.filter(function(r) {
      return !! idMap[String(r.caseId || "")] &&! isSoftDeletedRow_(r)
    });
    return ! rows.length && targetTitle && (rows = allLetters.filter(function(r) {
      if(! r || isSoftDeletedRow_(r))return ! 1;
      var titleHit = _normalizeIdentityTextSafe_(r.subject || r.issue || "") || "";
      return !! titleHit && (titleHit.indexOf(targetTitle) >- 1 || targetTitle.indexOf(titleHit) >- 1)
    })), Object.keys(idMap).length || rows.length ? (rows = _safeDedupeLatestRowsBy_(rows, _safeLetterIdentityKey_)).map(function(r) {
      var normalized = _normalizeLetterRow_(r), parsedReplies = [];
      try {
        var repliesJson = normalized.repliesJSON || "[]";
        repliesJson && String(repliesJson).trim().startsWith("[") && (parsedReplies = JSON.parse(repliesJson))
      }
      catch(e) {
        _recordWarning_("ec", e)
      }
      return normalized.replies = parsedReplies, normalized
    }).sort(function(a, b) {
      var av = String(a.letterDate || a.dueDate || ""), bv = String(b.letterDate || b.dueDate || "");
      return av === bv ? String(b.letterId || "").localeCompare(String(a.letterId || ""), "th"): av > bv ?- 1: 1
    }): []
  }
  catch(e) {
    throw _recordWarning_("ec", e), logAudit_("letters.strict_error", {
      error: String(e && e.message ? e.message: e)
    }), e
  }
}
function _Domain_getMeetingHistory(caseId) {
  try {
    var aliases = _safeResolveCaseIdentityAliases_(caseId), idMap = {
    };
    if((aliases.ids || []).forEach(function(id) {
      idMap[String(id)] =! 0
    }), ! Object.keys(idMap).length && caseId && "object" == typeof caseId) {
      var rawCaseId = String(caseId.caseId || caseId.id || "").trim();
      rawCaseId && (idMap[rawCaseId] =! 0)
    }
    var targetTitle = _normalizeIdentityTextSafe_(aliases.case && (aliases.case.title || aliases.case.caseTitle) || caseId && (caseId.title || caseId.caseTitle) || ""), allLogs = _meetingHistoryProjectedRows_(), rows = allLogs.filter(function(r) {
      return !! idMap[String(r.caseId || "")] &&! isSoftDeletedRow_(r)
    });
    if(! rows.length && targetTitle && (rows = allLogs.filter(function(r) {
      if(! r || isSoftDeletedRow_(r))return ! 1;
      var rowTitle = _normalizeIdentityTextSafe_(r.title || r.caseTitle || r.summary || r.note || "");
      return !! rowTitle && (rowTitle.indexOf(targetTitle) >- 1 || targetTitle.indexOf(rowTitle) >- 1)
    })), ! rows.length && aliases && aliases.case) {
      var caseNum = _normalizeIdentityTextSafe_(aliases.case.caseNum || caseId && caseId.caseNum || ""), recNo = _normalizeIdentityTextSafe_(aliases.case.recNo || caseId && caseId.recNo || "");
      rows = allLogs.filter(function(r) {
        if(! r || isSoftDeletedRow_(r))return ! 1;
        var rowCaseNum = _normalizeIdentityTextSafe_(r.caseNum || ""), rowRecNo = _normalizeIdentityTextSafe_(r.recNo || "");
        return !! caseNum && rowCaseNum === caseNum ||!! recNo && rowRecNo === recNo
      })
    }
    return Object.keys(idMap).length || rows.length ? (rows = _safeDedupeLatestRowsBy_(rows, _safeMeetingLogIdentityKey_)).map(function(r) {
      return _normalizeMeetingLogRow_(r)
    }).sort(function(a, b) {
      var av = String(a.dateRaw || ""), bv = String(b.dateRaw || "");
      return av === bv ? String(a.round || "").localeCompare(String(b.round || ""), "th"): av > bv ?- 1: 1
    }): []
  }
  catch(e) {
    throw _recordWarning_("ec", e), logAudit_("meeting_history.strict_error", {
      error: String(e && e.message ? e.message: e)
    }), e
  }
}
function deleteLetter(payload) {
  var input;
  return domainWrite_("deleteLetter", payload && "object" == typeof payload ? payload: {
    letterId: payload
  }, function(req) {
    var letterId = String(_payloadValue_(req, ["letterId", "id"]) || "").trim();
    if(! letterId)throw new Error("ไม่พบรหัสหนังสือติดตามที่ต้องการลบ");
    var res = getCanonicalRepository_("letters.main").softDelete(letterId, {
      isDeleted: ! 0, deletedAt: (new Date).toISOString(), updatedAt: (new Date).toISOString()
    }), cacheInvalidation = _appIsFnName_("_invalidateLettersDerivedCaches_") ? _invalidateLettersDerivedCaches_("deleteLetter"): {
    };
    return ok_({
      letterId: letterId, cacheInvalidation: cacheInvalidation, result: res
    }, "ลบหนังสือติดตามสำเร็จ")
  })
}
function _fetchAllLettersWithCaseInfoImpl_(payload) {
  payload = payload || {
  };
  var allCases = _safeDedupeLatestRowsBy_(_meetingLettersRows_("MainData", ! 1), _safeCaseIdentityKey_), caseMap = {
  };
  allCases.forEach(function(row) {
    if(row &&! isSoftDeletedRow_(row)) {
      var id = String(row.caseId || "").trim();
      id && (caseMap[id] = row)
    }
  });
  var letters = _safeDedupeLatestRowsBy_(_meetingLettersRows_("Letters", ! 1), _safeLetterIdentityKey_).filter(function(row) {
    return row &&! isSoftDeletedRow_(row)
  }).map(function(row) {
    var normalized = _normalizeLetterRow_(row), owner = caseMap[String(normalized.caseId || "").trim()] || _findCaseByIdentity_({
      caseId: normalized.caseId, title: normalized.subject, caseTitle: normalized.issue
    });
    owner && (normalized.caseNum = String(owner.caseNum || ""), normalized.recNo = String(owner.recNo || ""), normalized.caseTitle = String(owner.caseTitle || owner.title || ""), normalized.title = String(owner.title || owner.caseTitle || ""), normalized.petitioners = String(owner.petitioners || owner.petitionerName || ""), normalized.assignees = String(owner.assignees || ""), normalized.status = String(owner.status || ""));
    try {
      var repliesJson = normalized.repliesJSON || "[]";
      normalized.replies = repliesJson && "[" === String(repliesJson).trim().charAt(0) ? JSON.parse(repliesJson): []
    }
    catch(_e) {
      _recordWarning_("ec", _e), normalized.replies = []
    }
    return normalized
  }), filterType = String(payload.filterType || payload.type || "all").trim();
  if("received" === filterType)letters = letters.filter(function(row) {
    return"ได้รับแล้ว" === String(row.letterStatus || "").trim() || "ได้รับตอบกลับแล้ว" === String(row.letterStatus || "").trim()
  });
  else if("overdue" === filterType || "notdue" === filterType) {
    var today = new Date;
    today.setHours(0, 0, 0, 0), letters = letters.filter(function(row) {
      var status = String(row.letterStatus || "").trim();
      if("ได้รับแล้ว" === status || "ได้รับตอบกลับแล้ว" === status)return ! 1;
      var target = row.extendDate || row.dueDate;
      if(! target)return"notdue" === filterType;
      var d = _trackingDueDateOnly_(target);
      return d ? "overdue" === filterType ? today >= d: today < d: "notdue" === filterType
    })
  }
  return letters.sort(function(a, b) {
    var av = String(a.letterDate || a.dueDate || ""), bv = String(b.letterDate || b.dueDate || "");
    return av === bv ? String(a.caseNum || "").localeCompare(String(b.caseNum || ""), "th"): av > bv ?- 1: 1
  }), ok_(letters, "โหลดหนังสือติดตามพร้อมข้อมูลเรื่องสำเร็จ")
}
function saveMeetingLog(p) {
  return domainWrite_("saveMeetingLog", p, function(input) {
    ["committeeType", "subcommitteeId", "subcommitteeName", "meetingGroup"].forEach(function(h) {
      _appIsFnName_("ensureHeaderColumn_") && ensureHeaderColumn_("MeetingLogs", h)
    }), getCanonicalHeaderAudit_("MeetingLogs");
    var caseId = String(input.caseId || "").trim();
    if(! caseId)return err_("ไม่พบ caseId");
    if(_assertCaseExistsSafe_({
      caseId: caseId, caseNum: input.caseNum, recNo: input.recNo, title: input.title, caseTitle: input.caseTitle, petitioners: input.petitioners
    }, "MeetingLogs"), ! String(input.round || input.newRound || "").trim() &&! String(input.date || input.newDate || "").trim() &&! String(input.note || input.newNote || "").trim())return err_("กรุณากรอกข้อมูลประวัติการประชุม");
    var logId = String(input.logId || input.currentLogId || "LOG-" + Date.now()).trim(), caseInfo = _safeResolveCaseIdentityAliases_({
      caseId: caseId
    }).case || {
    }, committeeType = String(input.committeeType || input.meetingGroup || input.committeeKind || "คณะกรรมาธิการ").trim() || "คณะกรรมาธิการ", subcommitteeId = String(input.subcommitteeId || "").trim(), subcommitteeName = String(input.subcommitteeName || input.subcommittee || input.meetingGroup || "").trim();
    if("คณะอนุกรรมาธิการ" !== committeeType)subcommitteeId = "", subcommitteeName = "";
    else if(! subcommitteeName && subcommitteeId && (subcommitteeName = subcommitteeId), ! subcommitteeId && subcommitteeName && (subcommitteeId = subcommitteeName), ! subcommitteeName)return err_("กรุณาเลือกคณะอนุกรรมาธิการ");
    var patch = {
      caseId: caseId, caseNum: String(input.caseNum || caseInfo.caseNum || "").trim(), caseNo: String(input.caseNo || caseInfo.caseNo || "").trim(), recNo: String(input.recNo || input.receiveNo || caseInfo.recNo || caseInfo.receiveNo || "").trim(), receiveNo: String(input.receiveNo || input.recNo || caseInfo.receiveNo || caseInfo.recNo || "").trim(), round: String(input.round || input.newRound || "").trim(), date: String(input.date || input.newDate || "").trim(), note: String(input.note || input.newNote || "").trim(), title: String(input.title || caseInfo.title || caseInfo.caseTitle || "").trim(), meetingId: String(input.meetingId || "").trim(), meetingDate: String(input.date || input.newDate || "").trim(), result: String(input.result || input.note || input.newNote || "").trim(), summary: String(input.summary || "").trim(), committeeType: committeeType, subcommitteeId: subcommitteeId, subcommitteeName: subcommitteeName, meetingGroup: "คณะอนุกรรมาธิการ" === committeeType ? subcommitteeName: committeeType, logId: logId, updatedAt: (new Date).toISOString(), isDeleted: ! 1, deletedAt: ""
    }, repo = getCanonicalRepository_("meeting.logs"), existing = null;
    if(String(input.logId || input.currentLogId || "").trim() && (existing = repo.findByKey(logId, {
      includeDeleted: ! 0, requireCanonical: ! 0
    })), ! existing) {
      var existingLogs = _meetingLettersRows_("MeetingLogs", ! 0).filter(function(r) {
        return ! (! r || isSoftDeletedRow_(r)) && (String(r.caseId || "") === caseId && String(r.round || "").trim() === String(patch.round || "").trim() && String(r.date || r.meetingDate || "").trim() === String(patch.date || "").trim())
      }).sort(function(a, b) {
        return _rowFreshnessScore_(b).localeCompare(_rowFreshnessScore_(a))
      });
      existingLogs.length && (existing = existingLogs[0], logId = String(existing.logId || logId), patch.logId = logId)
    }
    var result = repo.upsert(logId, patch), cacheInvalidation = _appIsFnName_("_invalidateMeetingDerivedCaches_") ? _invalidateMeetingDerivedCaches_("saveMeetingLog"): {
    };
    return ok_({
      logId: logId, caseId: caseId, cacheInvalidation: cacheInvalidation || {
      }, mode: result.mode
    }, "update" === result.mode ? "อัปเดตประวัติการประชุมสำเร็จ": "บันทึกประวัติการประชุมสำเร็จ")
  })
}
function deleteMeetingLog(payload) {
  var input;
  return domainWrite_("deleteMeetingLog", payload && "object" == typeof payload ? payload: {
    logId: payload
  }, function(req) {
    var logId = String(_payloadValue_(req, ["logId", "id", "rowId", "meetingLogId"]) || "").trim();
    if(! logId)throw new Error("ไม่พบรหัสประวัติการประชุมที่ต้องการลบ");
    var now = (new Date).toISOString(), repo = getCanonicalRepository_("meeting.logs"), res = null;
    try {
      res = repo.softDelete(logId, {
        isDeleted: ! 0, deletedAt: now, updatedAt: now
      })
    }
    catch(_repoDeleteErr) {
      _appIsFnName_("_recordWarning_") && _recordWarning_("meeting.delete.repo", _repoDeleteErr, {
        logId: logId
      })
    }
    var okDeleted =! (! res ||! 1 === res.ok &&! res.deleted &&! res.mode);
    if(! okDeleted)try {
      var sh = "undefined" != typeof AppRepository && AppRepository.getSheet ? AppRepository.getSheet("MeetingLogs"): "function" == typeof getSheet_ ? getSheet_("MeetingLogs"): null;
      if(sh) {
        function readMeetingLogMatrix_() {
          return"undefined" != typeof AppRepository && AppRepository.readMatrix ? AppRepository.readMatrix("MeetingLogs"): "function" == typeof getSheetMatrix_ ? getSheetMatrix_(sh): []
        }
        var values = readMeetingLogMatrix_();
        if(values.length > 1) {
          var head = values[0].map(function(h) {
            return String(h || "").trim()
          });
          function col(names) {
            for(var i = 0;
            i < names.length;
            i ++ ) {
              var j = head.indexOf(names[i]);
              if(j >= 0)return j
            }
            return - 1
          }
          var cLog = col(["logId", "id", "rowId", "meetingLogId"]), cCase = col(["caseId"]), cRound = col(["round", "meetingNo", "ครั้งที่"]), cDate = col(["date", "meetingDate", "วันที่ประชุม"]), cDel = col(["isDeleted"]);
          cDel < 0 && _appIsFnName_("ensureHeaderColumn_") && (ensureHeaderColumn_("MeetingLogs", "isDeleted"), values = readMeetingLogMatrix_(), cDel = (head = values[0].map(function(h) {
            return String(h || "").trim()
          })).indexOf("isDeleted"));
          var cDeletedAt = col(["deletedAt"]);
          cDeletedAt < 0 && _appIsFnName_("ensureHeaderColumn_") && (ensureHeaderColumn_("MeetingLogs", "deletedAt"), values = readMeetingLogMatrix_(), cDeletedAt = (head = values[0].map(function(h) {
            return String(h || "").trim()
          })).indexOf("deletedAt"));
          var cUpdated = col(["updatedAt"]);
          cUpdated < 0 && _appIsFnName_("ensureHeaderColumn_") && (ensureHeaderColumn_("MeetingLogs", "updatedAt"), values = readMeetingLogMatrix_(), cUpdated = (head = values[0].map(function(h) {
            return String(h || "").trim()
          })).indexOf("updatedAt"));
          for(var caseId = String(req.caseId || "").trim(), r = 1;
          r < values.length;
          r ++ ) {
            var row = values[r], match = cLog >= 0 && String(row[cLog] || "").trim() === logId;
            if(! match && caseId && String(logId || "").indexOf("LOG-") < 0 && (match = cCase >= 0 && String(row[cCase] || "").trim() === caseId && (cRound >= 0 && String(row[cRound] || "").trim() === logId || cDate >= 0 && String(row[cDate] || "").trim() === logId)), match) {
              cDel >= 0 && AppRepository.setCellValue("MeetingLogs", r + 1, cDel + 1, ! 0, {
                invalidate: ! 1
              }), cDeletedAt >= 0 && AppRepository.setCellValue("MeetingLogs", r + 1, cDeletedAt + 1, now, {
                invalidate: ! 1
              }), cUpdated >= 0 && AppRepository.setCellValue("MeetingLogs", r + 1, cUpdated + 1, now, {
                invalidate: ! 1
              }), okDeleted =! 0, res = {
                ok: ! 0, mode: "softDeleteFallback", row: r + 1
              };
              break
            }
          }
        }
      }
    }
    catch(_fallbackDeleteErr) {
      _appIsFnName_("_recordWarning_") && _recordWarning_("meeting.delete.sheetFallback", _fallbackDeleteErr, {
        logId: logId
      })
    }
    if(! okDeleted)throw new Error("ไม่พบข้อมูลประวัติการประชุมที่ต้องการลบ");
    var cacheInvalidation = _appIsFnName_("_invalidateMeetingDerivedCaches_") ? _invalidateMeetingDerivedCaches_("deleteMeetingLog"): {
    };
    return ok_({
      logId: logId, cacheInvalidation: cacheInvalidation, result: res
    }, "ลบประวัติการประชุมสำเร็จ")
  })
}
function saveLetter(p) {
  return domainWrite_("saveLetter", p, function(input) {
    getCanonicalHeaderAudit_("Letters");
    var caseId = String(input.caseId || "").trim();
    if(! caseId)return err_("ไม่พบ caseId");
    _assertCaseExistsSafe_({
      caseId: caseId, caseNum: input.caseNum, recNo: input.recNo, title: input.title, caseTitle: input.caseTitle, petitioners: input.petitioners
    }, "Letters");
    var now = (new Date).toISOString(), letterId = String(input.letterId || "LTR-" + Date.now()).trim(), incomingLetterNo = input.letterNo || input.bookNo || "", incomingBookNo = input.bookNo || input.letterNo || "", normalizedLetterDate = _normalizeLetterDateFromFields_(input.letterDate || "", input.letterNo || "", input.bookNo || ""), row = {
      letterId: letterId, caseId: caseId, letterNo: _normalizeLetterNumberDisplay_(incomingLetterNo), letterDate: normalizedLetterDate, agency: String(input.agency || "").trim(), subject: String(input.subject || "").trim(), issue: String(input.issue || "").trim(), dueDate: input.dueDate || "", extendDate: input.extendDate || "", remark: String(input.remark || "").trim(), letterStatus: _normalizeLetterStatusCanonical_(input.letterStatus || "ยังไม่ได้รับ"), repliesJSON: _safeJsonStringify_(Array.isArray(input.replies) ? input.replies: []), opStaff: String(input.opStaff || "").trim(), bookNo: _normalizeLetterNumberDisplay_(incomingBookNo), officer: String(input.officer || input.opStaff || "").trim(), updatedAt: now, isDeleted: ! 1, deletedAt: ""
    }, repo = getCanonicalRepository_("letters.main"), existing = null;
    if(String(input.letterId || "").trim() && (existing = repo.findByKey(letterId, {
      includeDeleted: ! 0, requireCanonical: ! 0
    })), ! existing) {
      var existingLetters = _meetingLettersRows_("Letters", ! 0).filter(function(r) {
        return ! (! r || isSoftDeletedRow_(r)) && (String(r.caseId || "") === caseId && String(r.letterNo || r.bookNo || "").trim() === String(row.letterNo || row.bookNo || "").trim() && String(r.agency || "").trim() === String(row.agency || "").trim())
      }).sort(function(a, b) {
        return _rowFreshnessScore_(b).localeCompare(_rowFreshnessScore_(a))
      });
      existingLetters.length && (existing = existingLetters[0], letterId = String(existing.letterId || letterId), row.letterId = letterId)
    }
    var result = repo.upsert(letterId, row), cacheInvalidation = _appIsFnName_("_invalidateLettersDerivedCaches_") ? _invalidateLettersDerivedCaches_("saveLetter"): {
    };
    return ok_({
      letterId: letterId, caseId: caseId, cacheInvalidation: cacheInvalidation || {
      }, mode: result.mode
    }, "update" === result.mode ? "อัปเดตหนังสือติดตามสำเร็จ": "บันทึกหนังสือติดตามสำเร็จ")
  })
}
MeetingDomain.getLookupOptions = function(payload) {
  try {
    return payload = requireDomainRequest_(payload, "viewer"), ok_(_Domain_getMeetingLookupOptions(payload), "โหลดข้อมูลตัวเลือกการประชุมสำเร็จ")
  }
  catch(e) {
    return _appIsFnName_("_recordWarning_") && _recordWarning_("cases.meetingLookup.auth", e), err_("ไม่สามารถโหลดข้อมูลตัวเลือกการประชุมได้: ไม่พบ token การใช้งาน กรุณาเข้าสู่ระบบใหม่แล้วลองอีกครั้ง", {
      authRequired: ! 0, route: "apiGetMeetingLookupOptions", error: String(e && e.message || e)
    })
  }
}, MeetingDomain.getHistory = function(payload) {
  payload = payload || {
  };
  var perfToken = _appIsFnName_("_appApiPerfStart_") ? _appApiPerfStart_("apiGetMeetingHistory", payload): null;
  _appIsFnName_("_domainRouterAuthAlreadyOk_") && _domainRouterAuthAlreadyOk_(payload) || requireAuth_(payload, "viewer");
  var rows = _Domain_getMeetingHistory(payload), data = _paginateArrayResult_(rows, payload, 20, 250, {
    source: "getMeetingHistory", pageFacade: "AppPageKit.rowsFrom-publicBridge", domainOwner: "MeetingDomain.getHistory"
  });
  return _appIsFnName_("_appApiPerfEnd_") && (data = _appApiPerfEnd_(perfToken, "ok", data, {
    rowsRead: Array.isArray(rows) ? rows.length: 0
  })), ok_(data, "โหลดประวัติการประชุมสำเร็จ")
}, MeetingDomain.saveLog = function(payload) {
  try {
    return payload = requireDomainRequest_(payload, "staff"), normalizeResult_(saveMeetingLog(payload), "บันทึกประวัติการประชุมสำเร็จ", "บันทึกประวัติการประชุมไม่สำเร็จ")
  }
  catch(e) {
    return _appIsFnName_("_recordWarning_") && _recordWarning_("cases.saveMeetingLog.auth", e), err_("ไม่สามารถบันทึกประวัติการประชุมได้: ไม่พบ token การใช้งาน กรุณาเข้าสู่ระบบใหม่แล้วลองอีกครั้ง", {
      authRequired: ! 0, route: "apiSaveMeetingLog", error: String(e && e.message || e)
    })
  }
}, MeetingDomain.deleteLog = function(payload) {
  payload = requireDomainRequest_(payload, "staff");
  var logId = _payloadValue_(payload, ["logId", "id", "meetingLogId", "currentLogId"]);
  return logId ? (payload.logId = logId, payload.id = logId, normalizeResult_(deleteMeetingLog(payload), "ลบประวัติการประชุมสำเร็จ", "ลบประวัติการประชุมไม่สำเร็จ")): err_("ลบประวัติการประชุมไม่สำเร็จ: ไม่พบรหัสรายการประชุม", {
    route: "apiDeleteMeetingLog"
  })
}, TrackingDomain.getLetters = function(payload) {
  payload = requireDomainRequest_(payload, "viewer");
  var rows = _Domain_getLetters(payload);
  return ok_(_paginateArrayResult_(rows, payload, 20, 250, {
    source: "getLetters", domainOwner: "TrackingDomain.getLetters"
  }), "โหลดข้อมูลหนังสือสำเร็จ")
}, TrackingDomain.saveLetter = function(payload) {
  return payload = requireDomainRequest_(payload, "staff"), auditEvent_("letters", {
    route: "apiSaveLetter", caseId: payload.caseId || ""
  }), _normalizeOkEnvelope_(saveLetter(payload), "บันทึกหนังสือติดตามสำเร็จ", "บันทึกหนังสือติดตามไม่สำเร็จ")
}, TrackingDomain.deleteLetter = function(payload) {
  return payload = requireDomainRequest_(payload, "staff"), _normalizeOkEnvelope_(deleteLetter(payload.letterId || payload.id || ""), "ลบหนังสือติดตามสำเร็จ", "ลบหนังสือติดตามไม่สำเร็จ")
};
function apiGetMeetingLookupOptions(payload) {
  return MeetingDomain.getLookupOptions(payload || {
  })
}
function apiGetMeetingHistory(payload) {
  return MeetingDomain.getHistory(payload || {
  })
}
function apiSaveMeetingLog(payload) {
  return writeGateway_("apiSaveMeetingLog", payload || {
  }, function(input) {
    return MeetingDomain.saveLog(input || {
    })
  }, "บันทึกประวัติการประชุมสำเร็จ", "บันทึกประวัติการประชุมไม่สำเร็จ")
}
function apiDeleteMeetingLog(payload) {
  return writeGateway_("apiDeleteMeetingLog", payload || {
  }, function(input) {
    return MeetingDomain.deleteLog(input || {
    })
  }, "ลบประวัติการประชุมสำเร็จ", "ลบประวัติการประชุมไม่สำเร็จ")
}
function apiGetLetters(payload) {
  return TrackingDomain.getLetters(payload || {
  })
}
function apiSaveLetter(payload) {
  return writeGateway_("apiSaveLetter", payload || {
  }, function(input) {
    return TrackingDomain.saveLetter(input || {
    })
  }, "บันทึกหนังสือติดตามสำเร็จ", "บันทึกหนังสือติดตามไม่สำเร็จ")
}
function apiDeleteLetter(payload) {
  return writeGateway_("apiDeleteLetter", payload || {
  }, function(input) {
    return TrackingDomain.deleteLetter(input || {
    })
  }, "ลบหนังสือติดตามสำเร็จ", "ลบหนังสือติดตามไม่สำเร็จ")
}
// ===== DOMAIN PHYSICAL: MEETING DATA AUDIT / DEDUPE =====
function _meetingDuplicateRowMeta_(sheetName) {
  var sh = getSheet_(sheetName), data = getSheetMatrix_(sh);
  if(! data || data.length <= 1)return[];
  var headers = (data[0] || []).map(function(v) {
    return String(v || "").trim()
  });
  return data.slice(1).map(function(row, idx) {
    var obj = {
    };
    return headers.forEach(function(h, i) {
      h && (obj[h] = row[i])
    }), obj._sheetName = sheetName, obj._rowNumber = idx + 2, obj._rowValues = row, obj
  }).filter(function(row) {
    return ! isSoftDeletedRow_(row)
  })
}
function _meetingDuplicateBusinessKey_(sheetName, row) {
  return row = row || {
  }, "MainData" === sheetName ? [String(row.caseId || "").trim(), String(row.caseNum || "").trim(), String(row.recNo || "").trim(), _normalizedText_(row.title || row.caseTitle || row.subject || ""), _normalizedText_(row.petitioners || row.petitionerName || "")].join("|"): "MeetingLogs" === sheetName ? [String(row.caseId || "").trim(), String(row.round || "").trim(), normalizeDateOutput_(row.meetingDate || row.date || ""), _normalizedText_(row.title || ""), _normalizedText_(row.result || row.note || row.summary || "")].join("|"): "Letters" === sheetName ? [String(row.caseId || "").trim(), String(row.letterNo || row.bookNo || "").trim(), normalizeDateOutput_(row.letterDate || ""), _normalizedText_(row.agency || ""), _normalizedText_(row.subject || row.issue || "")].join("|"): ""
}
function _meetingDuplicatePrimaryKey_(sheetName, row) {
  return row = row || {
  }, "MainData" === sheetName ? String(row.caseId || "").trim(): "MeetingLogs" === sheetName ? String(row.logId || row.meetingId || "").trim(): "Letters" === sheetName ? String(row.letterId || "").trim(): ""
}
function _meetingDuplicateSheetReport_(sheetName) {
  var rows = _meetingDuplicateRowMeta_(sheetName), primaryGroups = {
  }, businessGroups = {
  };
  function buildDuplicateItems(map, kind) {
    return Object.keys(map).filter(function(key) {
      return key && map[key] && map[key].length > 1
    }).map(function(key) {
      var items = map[key].slice().sort(function(a, b) {
        return _rowFreshnessScore_(b).localeCompare(_rowFreshnessScore_(a))
      }), keep = items[0] || null, remove = items.slice(1);
      return {
        type: kind, key: key, count: items.length, keepRowNumber: keep ? keep._rowNumber: 0, removeRowNumbers: remove.map(function(row) {
          return row._rowNumber
        }), keepId: keep ? _meetingDuplicatePrimaryKey_(sheetName, keep): "", ids: items.map(function(row) {
          return _meetingDuplicatePrimaryKey_(sheetName, row)
        })
      }
    })
  }
  rows.forEach(function(row) {
    var primaryKey = _meetingDuplicatePrimaryKey_(sheetName, row), businessKey = _meetingDuplicateBusinessKey_(sheetName, row);
    primaryKey && (primaryGroups[primaryKey] || (primaryGroups[primaryKey] = []), primaryGroups[primaryKey].push(row)), businessKey && (businessGroups[businessKey] || (businessGroups[businessKey] = []), businessGroups[businessKey].push(row))
  });
  var primaryDuplicates = buildDuplicateItems(primaryGroups, "primary"), businessDuplicates = buildDuplicateItems(businessGroups, "business").filter(function(item) {
    return ! primaryGroups[item.key] || primaryGroups[item.key].length <= 1
  }), duplicateItems = primaryDuplicates.concat(businessDuplicates);
  return {
    sheetName: sheetName, totalRows: rows.length, duplicateGroups: duplicateItems.length, duplicates: duplicateItems.reduce(function(sum, item) {
      return sum + Math.max(0, Number(item.count || 0) - 1)
    }, 0), items: duplicateItems
  }
}
function _meetingDuplicateAuditReport_() {
  return {
    generatedAt: (new Date).toISOString(), cases: _meetingDuplicateSheetReport_("MainData"), meetingLogs: _meetingDuplicateSheetReport_("MeetingLogs"), letters: _meetingDuplicateSheetReport_("Letters")
  }
}
function _meetingDuplicateAuditCsv_(audit) {
  audit = audit || _meetingDuplicateAuditReport_();
  var rows = [["sheet", "duplicateType", "key", "count", "keepRowNumber", "removeRowNumbers", "ids"]];
  return["cases", "meetingLogs", "letters"].forEach(function(section) {
    var report = audit[section] || {
    }, items;
    (Array.isArray(report.items) ? report.items: []).forEach(function(item) {
      rows.push([String(report.sheetName || section), String(item.type || ""), String(item.key || ""), Number(item.count || 0), Number(item.keepRowNumber || 0), String((item.removeRowNumbers || []).join("|")), String((item.ids || []).join("|"))])
    })
  }), rows.map(function(row) {
    return row.map(function(cell) {
      var value = String(null == cell ? "": cell);
      return/[",\n]/.test(value) ? '"' + value.replace(/"/g, '""') + '"': value
    }).join(",")
  }).join("\n")
}
function _softDeleteSheetRowsByNumber_(sheetName, rowNumbers, patchObj) {
  if(! (rowNumbers = Array.isArray(rowNumbers) ? rowNumbers.slice(): []).length)return 0;
  var sh = getSheet_(sheetName), audit = getCanonicalHeaderAudit_(sheetName);
  if(audit.missing.length)throw new Error("ชีต " + sheetName + " ยังไม่เป็น canonical: " + audit.missing.join(", "));
  var data = getSheetMatrix_(sh);
  if(data.length <= 1)return 0;
  var map = _headerMap_(data[0].map(function(v) {
    return String(v || "").trim()
  })), patch = Object.assign({
    isDeleted: ! 0, deletedAt: (new Date).toISOString(), updatedAt: (new Date).toISOString()
  }, patchObj || {
  }), touched = 0;
  return rowNumbers.forEach(function(rowNumber) {
    var rowIndex = Number(rowNumber || 0) - 1;
    rowIndex < 1 || rowIndex >= data.length || (Object.keys(patch).forEach(function(key) {
      void 0 !== map[key] && (data[rowIndex][map[key]] = patch[key])
    }), touched ++ )
  }), touched && (AppRepository.setRangeValues(sheetName, 2, 1, data.slice(1), {
    invalidate: ! 1
  }), invalidateSheetCache_(sheetName)), touched
}
function apiAuditMeetingData(payload) {
  return payload = requireDomainRequest_(payload, "admin"), ok_(_meetingDuplicateAuditReport_(), "ตรวจสอบข้อมูลซ้ำสำเร็จ")
}
function apiExportMeetingDuplicateAuditCsv(payload) {
  payload = requireDomainRequest_(payload, "admin");
  var audit = _meetingDuplicateAuditReport_();
  return ok_({
    fileName: "meeting_duplicate_audit_" + Utilities.formatDate(new Date, Session.getScriptTimeZone(), "yyyyMMdd_HHmmss") + ".csv", csv: _meetingDuplicateAuditCsv_(audit), audit: audit
  }, "สร้างไฟล์รายงานข้อมูลซ้ำสำเร็จ")
}
function apiCleanupMeetingData(payload) {
  return writeGateway_("apiCleanupMeetingData", payload || {
  }, function(input) {
    input = requireDomainRequest_(input, "admin");
    var audit = _meetingDuplicateAuditReport_(), result = {
      cases: 0, meetingLogs: 0, letters: 0, generatedAt: (new Date).toISOString()
    };
    [ {
      section: "cases", sheetName: "MainData"
    }, {
      section: "meetingLogs", sheetName: "MeetingLogs"
    }, {
      section: "letters", sheetName: "Letters"
    }
    ].forEach(function(entry) {
      var report = audit[entry.section] || {
      }, rowNumbers = [];
      (report.items || []).forEach(function(item) {
        rowNumbers = rowNumbers.concat(item.removeRowNumbers || [])
      });
      result[entry.section] = _softDeleteSheetRowsByNumber_(entry.sheetName, rowNumbers, {
        remark: "duplicate-cleanup", note: "duplicate-cleanup"
      })
    });
    _appIsFnName_("_invalidateMeetingDerivedCaches_") && _invalidateMeetingDerivedCaches_("cleanupDuplicates");
    _appIsFnName_("_invalidateLettersDerivedCaches_") && _invalidateLettersDerivedCaches_("cleanupDuplicates");
    return ok_(result, "รวมข้อมูลซ้ำสำเร็จ")
  }, "รวมข้อมูลซ้ำสำเร็จ", "รวมข้อมูลซ้ำไม่สำเร็จ")
}
function _Domain__getDashboardStatsRaw_(payload) {
  return _appIsFnName_("_dashboardStatsDirect_") ? _dashboardStatsDirect_(payload || {
  }): {
    total: 0, totalMeetings: 0, meetingItemTotal: 0, meetings: {
      total: 0, totalMeetings: 0, totalItems: 0
    }, statusRows: [], byType: [], byTopic: [], meta: {
      source: "dashboard-owner-code21-unavailable"
    }
  }
}
"function" == typeof _Domain_getCanonicalCaseBundle && (AppDomain.getCanonicalCaseBundle = _Domain_getCanonicalCaseBundle), AppDomain.CasesService = AppDomain.CasesService || {
  cleanOwner: ! 0, getBundle: function(payload) {
    return _Domain_getCanonicalCaseBundle(payload || {
    })
  }, getContext: function(payload) {
    return _Domain_getCaseContext(payload || {
    })
  }, findExisting: function(payload) {
    return _findExistingCaseRecord_(payload || {
    })
  }, repository: function() {
    return _getMainDataRepository_()
  }
}, "function" == typeof _Domain_getCaseIdentityHealthReport && (AppDomain.getCaseIdentityHealthReport = _Domain_getCaseIdentityHealthReport), "function" == typeof _Domain_getLetters && (AppDomain.getLetters = _Domain_getLetters), "function" == typeof _Domain_getMeetingHistory && (AppDomain.getMeetingHistory = _Domain_getMeetingHistory), AppDomain.getDashboardStatsRaw = _Domain__getDashboardStatsRaw_;
var _LOOKUP_BUNDLE_CACHE_TTL_ = 600;
function getLookupBundle_(type, query, scope, limit) {
  var normalizedType;
  if("meeting" === _normalizeLookupText_(type || "meeting")) {
    var base = _getMeetingLookupBundle_(scope);
    return limit = Math.max(20, Math.min(Number(limit || 120) || 120, 300)), {
      petitioners: _filterLookupRows_(base.petitioners, query, limit), proposer: _filterLookupRows_(base.proposer, query, limit), assignees: _filterLookupRows_(base.assignees, query, limit), coAssignees: _filterLookupRows_(base.coAssignees, query, limit), staffs: _filterLookupRows_(base.staffs, query, limit), opStaff: _filterLookupRows_(base.opStaff, query, limit), subcommittees: _filterLookupRows_(base.subcommittees, query, limit), bundles: {
        petitioners: _filterLookupRows_(base.bundles.petitioners, query, limit), comms: _filterLookupRows_(base.bundles.comms, query, limit), staffs: _filterLookupRows_(base.bundles.staffs, query, limit), ops: _filterLookupRows_(base.bundles.ops, query, limit), subcommittees: _filterLookupRows_(base.bundles.subcommittees, query, limit)
      }
    }
  }
  return {
    rows: []
  }
}
function _normalizeLookupContractPayload_(payload) {
  payload = payload || {
  };
  var limit = Math.max(1, Math.min(Number(payload.limit || 80) || 80, 300)), page = Math.max(1, Number(payload.page || 1) || 1), cursor = String(payload.cursor || "").trim();
  return {
    type: String(payload.type || "meeting").trim() || "meeting", key: String(payload.key || payload.kind || payload.target || "").trim(), q: String(payload.q || payload.query || payload.keyword || "").trim(), scope: String(payload.scope || payload.category || payload.group || "").trim(), limit: limit, page: page, cursor: cursor, offset: cursor && /^\d+$/.test(cursor) ? Number(cursor): (page - 1) * limit, contractStamp: "lookup-contract-current"
  }
}
function apiSearchLookup(payload) {
  payload = payload || {
  };
  var boundary = _routerAuthorizedEntry_("apiSearchLookup", payload, "viewer");
  if(! boundary.ok)return boundary.result;
  var bundle = getLookupBundle_((payload = _normalizeLookupContractPayload_(payload)).type, payload.q, payload.scope, Math.max(payload.limit + payload.offset + 1, payload.limit)), rows = payload.key && (bundle[payload.key] || (bundle.bundles || {
  })[payload.key]) || [];
  rows.length || payload.key || Object.keys(bundle || {
  }).forEach(function(k) {
    Array.isArray(bundle[k]) && (rows = rows.concat(bundle[k]))
  });
  var sliced = (rows = Array.isArray(rows) ? rows: []).slice(payload.offset, payload.offset + payload.limit), nextOffset = payload.offset + sliced.length;
  return {
    ok: ! 0, data: {
      rows: sliced, items: sliced, records: sliced, key: payload.key, type: payload.type, q: payload.q, scope: payload.scope, limit: payload.limit, cursor: payload.cursor, nextCursor: nextOffset < rows.length ? String(nextOffset): "", totalRecords: rows.length, contractStamp: payload.contractStamp
    }
  }
}
function _normalizeLookupText_(value) {
  return String(value || "").trim()
}
function _normalizeLookupQuery_(value) {
  return _normalizeLookupText_(value).toLowerCase()
}
function _activeLookupNameRows_(rows, source) {
  return(Array.isArray(rows) ? rows: []).map(function(r) {
    return {
      name: _normalizeLookupText_(r && (r.name || r.fullName) || ""), phone: _normalizeLookupText_(r && (r.phone || r.tel) || "").replace(/'/g, ""), position: _normalizeLookupText_(r && r.position || ""), status: _normalizeLookupText_(r && r.status || ""), source: _normalizeLookupText_(source || "")
    }
  }).filter(function(x) {
    return !! x.name && (! x.status || ("ดำรงตำแหน่ง" === x.status || "ใช้งาน" === x.status || "active" === x.status.toLowerCase()))
  })
}
function _distinctLookupRowsByName_(rows) {
  var map = {
  };
  return(Array.isArray(rows) ? rows: []).forEach(function(x) {
    var key = _normalizeLookupQuery_((x = x || {
    }).name);
    if(key) {
      if(! map[key])return map[key] = {
        name: _normalizeLookupText_(x.name), phone: _normalizeLookupText_(x.phone), position: _normalizeLookupText_(x.position), source: _normalizeLookupText_(x.source)
      }, void 0;
      ! map[key].phone && x.phone && (map[key].phone = _normalizeLookupText_(x.phone)), ! map[key].position && x.position && (map[key].position = _normalizeLookupText_(x.position)), ! map[key].source && x.source && (map[key].source = _normalizeLookupText_(x.source))
    }
  }), Object.keys(map).map(function(key) {
    return map[key]
  }).sort(function(a, b) {
    return String(a.name || "").localeCompare(String(b.name || ""), "th")
  })
}
function _filterLookupRows_(rows, query, limit) {
  var q = _normalizeLookupQuery_(query), out = Array.isArray(rows) ? rows.slice(): [];
  return q && (out = out.filter(function(x) {
    return - 1 !== _normalizeLookupQuery_(x.name).indexOf(q) ||- 1 !== _normalizeLookupQuery_(x.phone).indexOf(q) ||- 1 !== _normalizeLookupQuery_(x.position).indexOf(q) ||- 1 !== _normalizeLookupQuery_(x.source).indexOf(q)
  })), out.slice(0, Math.max(1, Number(limit || 120) || 120))
}
function _meetingLookupBundleCacheKey_(category) {
  var cacheTokens = [_appIsFnName_("_entityCacheStamp_") ? _entityCacheStamp_("petitioners"): "na", _appIsFnName_("_entityCacheStamp_") ? _entityCacheStamp_("personnel_comm"): "na", _appIsFnName_("_entityCacheStamp_") ? _entityCacheStamp_("personnel_staff"): "na", _appIsFnName_("_entityCacheStamp_") ? _entityCacheStamp_("personnel_op"): "na", _appIsFnName_("_entityCacheStamp_") ? _entityCacheStamp_("subcommittees"): "na"].join("_");
  return"meeting_lookup_bundle_current_" + _normalizeLookupText_(category || "all") + "_" + cacheTokens
}
function _getMeetingLookupBundle_(category) {
  var cache = _AppScriptCache_(), cacheKey = _meetingLookupBundleCacheKey_(category);
  try {
    var cached = cache.get(cacheKey);
    if(cached)return JSON.parse(cached)
  }
  catch(_cacheReadErr) {
    _recordWarning_("ec", _cacheReadErr)
  }
  var petitioners = _distinctLookupRowsByName_(_Domain_getPetitioners().map(function(x) {
    return {
      name: _normalizeLookupText_(x && x.name), phone: _normalizeLookupText_(x && x.phone), position: "", source: "petitioners"
    }
  })), comms = _distinctLookupRowsByName_(_activeLookupNameRows_(_Domain_getPersonnelComms(), "comms")), staffs = _distinctLookupRowsByName_(_activeLookupNameRows_(_Domain_getPersonnelStaffs(), "staffs")), ops = _distinctLookupRowsByName_(_activeLookupNameRows_(_Domain_getPersonnelOps(), "ops")), subcommittees = _distinctLookupRowsByName_(_caseDomainSharedRows_("Subcommittees", [], {
    includeDeleted: ! 1
  }).map(function(x) {
    return {
      name: _normalizeLookupText_(x && x.name), phone: "", position: "subcommittee", source: "subcommittees"
    }
  }).filter(function(x) {
    return x.name
  })), proposer, bundle = {
    petitioners: petitioners, proposer: "กรรมาธิการเสนอญัตติ" === String(category || "").trim() ? comms: petitioners, assignees: comms, coAssignees: staffs, staffs: ops, opStaff: ops, subcommittees: subcommittees, bundles: {
      petitioners: petitioners, comms: comms, staffs: staffs, ops: ops, subcommittees: subcommittees
    }
  };
  try {
    safeCachePut_(cache, cacheKey, bundle, _LOOKUP_BUNDLE_CACHE_TTL_)
  }
  catch(_cacheWriteErr) {
    _recordWarning_("ec", _cacheWriteErr)
  }
  return bundle
}
function _Domain_getMeetingLookupOptions(payload) {
  var category = _normalizeLookupText_((payload = payload || {
  }).category || payload.cat), query = _normalizeLookupText_(payload.query || payload.q), limit = Math.max(20, Math.min(Number(payload.limit || 120) || 120, 300)), result = getLookupBundle_("meeting", query, category, limit);
  return result.meta = {
    category: category, query: _normalizeLookupQuery_(query), limit: limit, generatedAt: (new Date).toISOString(), cacheTtlSec: _LOOKUP_BUNDLE_CACHE_TTL_
  }, Object.keys(result).forEach(function(key) {
    Array.isArray(result[key]) && (result[key] = result[key].slice(0, limit))
  }), result
}
var THAILAND_LOCATION_SHEET_NAME_ = "ThailandLocations", THAILAND_LOCATION_INDEX_ = null;
function _getThailandLocationFlatRows_() {
  var cacheKey = "th_loc_flat_current|" + _entityCacheStamp_("thailandlocations"), cache = _AppScriptCache_();
  try {
    var cached = cache.get(cacheKey);
    if(cached)return JSON.parse(cached)
  }
  catch(_cacheReadErr) {
    _recordWarning_("ec", _cacheReadErr)
  }
  var sh = getSheet_(THAILAND_LOCATION_SHEET_NAME_), data = getSheetMatrix_(sh, 4), rows = [];
  if(data.length > 1)for(var headerMap = _headerMap_((data[0] || []).map(function(v) {
    return String(v || "").trim()
  })), cProvince = headerMap.province, cDistrict = headerMap.district, cSubDistrict = headerMap.subDistrict >- 1 ? headerMap.subDistrict: headerMap.subdistrict, cZip = headerMap.zip >- 1 ? headerMap.zip: headerMap.postalCode, i = 1;
  i < data.length;
  i ++ ) {
    var province = String(cProvince >- 1 ? data[i][cProvince]: "").trim(), district = String(cDistrict >- 1 ? data[i][cDistrict]: "").trim(), subDistrict = String(cSubDistrict >- 1 ? data[i][cSubDistrict]: "").trim(), zip = String(cZip >- 1 ? data[i][cZip]: "").trim();
    province && district && subDistrict && rows.push({
      province: province, district: district, subDistrict: subDistrict, zip: zip
    })
  }
  try {
    safeCachePut_(cache, cacheKey, rows, 21600)
  }
  catch(_cacheWriteErr) {
    _recordWarning_("ec", _cacheWriteErr)
  }
  return rows
}
function _thailandLocationTree_() {
  var rows = _getThailandLocationFlatRows_();
  if(! rows.length)return[];
  var provinceMap = {
  };
  return rows.forEach(function(row) {
    var province = provinceMap[row.province];
    province || (province = provinceMap[row.province] = {
      name: row.province, districts: []
    });
    for(var district = null, i = 0;
    i < province.districts.length;
    i ++ )if(String(province.districts[i].name || "") === row.district) {
      district = province.districts[i];
      break
    }
    district || (district = {
      name: row.district, subDistricts: []
    }, province.districts.push(district)), district.subDistricts.push({
      name: row.subDistrict, zip: row.zip
    })
  }), Object.keys(provinceMap).map(function(key) {
    return provinceMap[key]
  })
}
function _buildThailandLocationIndex_() {
  if(THAILAND_LOCATION_INDEX_)return THAILAND_LOCATION_INDEX_;
  var tree = _thailandLocationTree_(), index = {
    provinces: {
    }, districts: {
    }, subDistricts: {
    }, postalCodeMap: {
    }
  };
  return(Array.isArray(tree) ? tree: []).forEach(function(province) {
    var provinceName = String(province && province.name || "").trim();
    provinceName && (index.provinces[provinceName] = province, (Array.isArray(province && province.districts) ? province.districts: []).forEach(function(district) {
      var districtName = String(district && district.name || "").trim();
      if(districtName) {
        var districtKey = provinceName + "|" + districtName;
        index.districts[districtKey] = district, (Array.isArray(district && district.subDistricts) ? district.subDistricts: []).forEach(function(subDistrict) {
          var subName = String(subDistrict && subDistrict.name || "").trim();
          if(subName) {
            var subKey = districtKey + "|" + subName;
            index.subDistricts[subKey] = subDistrict, index.postalCodeMap[subKey] = String(subDistrict && subDistrict.zip || "").trim()
          }
        })
      }
    }))
  }), THAILAND_LOCATION_INDEX_ = index, index
}
function _thailandLocationRowsFromIndex_(payload) {
  payload = payload || {
  };
  var province = String(payload.province || "").trim(), district = String(payload.district || "").trim(), subDistrict = String(payload.subDistrict || payload.subdistrict || "").trim(), index = _buildThailandLocationIndex_();
  if(province &&! district &&! subDistrict && index.provinces[province])return[index.provinces[province]];
  if(province && district &&! subDistrict) {
    var districtKey = province + "|" + district;
    if(index.districts[districtKey])return[ {
      name: province, districts: [index.districts[districtKey]]
    }
    ]
  }
  if(province && district && subDistrict) {
    var subKey = province + "|" + district + "|" + subDistrict;
    if(index.subDistricts[subKey])return[ {
      name: province, districts: [ {
        name: district, subDistricts: [index.subDistricts[subKey]]
      }
      ]
    }
    ]
  }
  return null
}
function _thailandLocationCacheKey_(payload) {
  return payload = payload || {
  }, "th_loc_current|" + [String(payload.province || ""), String(payload.district || ""), String(payload.subDistrict || payload.subdistrict || ""), String(payload.query || payload.q || ""), payload.summaryOnly ? "1": "0", _entityCacheStamp_("thailandlocations")].join("|")
}
function _thailandLocationSummary_(rows) {
  return(rows = Array.isArray(rows) ? rows: []).map(function(p) {
    var districts = Array.isArray(p && p.districts) ? p.districts: [], subDistrictCount = districts.reduce(function(total, district) {
      return total + (Array.isArray(district && district.subDistricts) ? district.subDistricts.length: 0)
    }, 0);
    return {
      name: String(p && p.name || ""), districtCount: districts.length, subDistrictCount: subDistrictCount
    }
  })
}
function _thailandLocationFilter_(payload) {
  payload = payload || {
  };
  var province = String(payload.province || "").trim(), district = String(payload.district || "").trim(), subDistrict = String(payload.subDistrict || payload.subdistrict || "").trim(), query = String(payload.query || payload.q || "").trim().toLowerCase(), rows = _thailandLocationRowsFromIndex_(payload) || _thailandLocationTree_();
  return province && (rows = rows.filter(function(p) {
    return String(p && p.name || "") === province
  })), district && (rows = rows.map(function(p) {
    var districts = (Array.isArray(p && p.districts) ? p.districts: []).filter(function(d) {
      return String(d && d.name || "") === district
    });
    return {
      name: String(p && p.name || ""), districts: districts
    }
  }).filter(function(p) {
    return p.districts.length
  })), subDistrict && (rows = rows.map(function(p) {
    var districts = (Array.isArray(p && p.districts) ? p.districts: []).map(function(d) {
      var subs = (Array.isArray(d && d.subDistricts) ? d.subDistricts: []).filter(function(s) {
        return String(s && s.name || "") === subDistrict
      });
      return {
        name: String(d && d.name || ""), subDistricts: subs
      }
    }).filter(function(d) {
      return d.subDistricts.length
    });
    return {
      name: String(p && p.name || ""), districts: districts
    }
  }).filter(function(p) {
    return p.districts.length
  })), query && (rows = rows.map(function(p) {
    var provinceName = String(p && p.name || ""), districts = (Array.isArray(p && p.districts) ? p.districts: []).map(function(d) {
      var districtName = String(d && d.name || ""), subs = (Array.isArray(d && d.subDistricts) ? d.subDistricts: []).filter(function(s) {
        return - 1 !== [provinceName, districtName, String(s && s.name || ""), String(s && s.zip || "")].join(" ").toLowerCase().indexOf(query)
      });
      return - 1 === districtName.toLowerCase().indexOf(query) || subs.length || (subs = Array.isArray(d && d.subDistricts) ? d.subDistricts: []), {
        name: districtName, subDistricts: subs
      }
    }).filter(function(d) {
      return d.subDistricts.length ||- 1 !== d.name.toLowerCase().indexOf(query)
    });
    return - 1 === provinceName.toLowerCase().indexOf(query) || districts.length || (districts = Array.isArray(p && p.districts) ? p.districts: []), {
      name: provinceName, districts: districts
    }
  }).filter(function(p) {
    return p.districts.length ||- 1 !== p.name.toLowerCase().indexOf(query)
  })), rows
}
function _Domain_getThailandLocations(payload) {
  payload = payload || {
  };
  var cache = _AppScriptCache_(), cacheKey = _thailandLocationCacheKey_(payload);
  try {
    var cached = cache.get(cacheKey);
    if(cached)return ok_(JSON.parse(cached), "โหลดข้อมูลจังหวัด/อำเภอสำเร็จ")
  }
  catch(_cacheReadErr) {
    _recordWarning_("ec", _cacheReadErr)
  }
  var rows = _thailandLocationFilter_(payload), summaryOnly =!! payload.summaryOnly, province = String(payload.province || "").trim(), result;
  result = summaryOnly ? {
    provinces: _thailandLocationSummary_(rows), totalProvinces: rows.length
  }
  : {
    rows: rows, provinces: rows, totalProvinces: rows.length, province: province || "", districtOptions: rows[0] && Array.isArray(rows[0].districts) ? rows[0].districts.map(function(d) {
      return String(d && d.name || "")
    }): [], subDistrictOptions: rows[0] && rows[0].districts && rows[0].districts[0] && Array.isArray(rows[0].districts[0].subDistricts) ? rows[0].districts[0].subDistricts.map(function(s) {
      return {
        name: String(s && s.name || ""), zip: String(s && s.zip || "")
      }
    }): []
  };
  try {
    safeCachePut_(cache, cacheKey, result, 1800)
  }
  catch(_cacheWriteErr) {
    _recordWarning_("ec", _cacheWriteErr)
  }
  return ok_(result, province &&! rows.length ? "ไม่พบข้อมูลจังหวัด": "โหลดข้อมูลจังหวัด/อำเภอสำเร็จ")
}
function _normalizeSearchText_(value) {
  return String(null == value ? "": value).toLowerCase().replace(/\s+/g, " ").trim()
}
function _caseSearchPickReceiveAlias_(row, keys) {
  row = row || {
  }, keys = Array.isArray(keys) ? keys: [];
  for(var i = 0;
  i < keys.length;
  i ++ ) {
    var key, value = row[keys[i]];
    if(null != value && "" !== String(value).trim() &&! _caseLooksLikeInternalId_(value))return value
  }
  return""
}
function _caseSearchCleanReceiveCandidate_(value) {
  return _caseManualReceiveNoText_(value)
}
function _caseSearchReceiveAliasKeys_() {
  return["recNo", "receiveNo", "receivedNo", "receive_no", "caseReceiveNo", "caseRecNo", "receiptNo", "receiveNumber", "registrationNo", "registrationNumber", "receiveRegistrationNo", "receiveCode", "receiveBookNo", "bookReceiveNo", "petitionReceiveNo", "complaintReceiveNo", "documentReceiveNo", "canonicalReceiveNo", "receiveNoDisplay", "displayReceiveNo", "เลขรับเรื่อง", "เลขที่รับเรื่อง", "รับเรื่องเลขที่", "เลขรับเรื่องพิจารณา", "เลขรับที่", "เลขรับคำร้อง", "เลขรับหนังสือ", "เลขทะเบียนรับ", "ทะเบียนรับ", "ทะเบียนหนังสือรับ", "เลขหนังสือรับ", "รับเลขที่", "รับที่", "เลขรับ"]
}
function _caseSearchReceiveNoCandidateFromAnyKey_(row) {
  row = row || {
  };
  var best = "";
  return Object.keys(row).forEach(function(key) {
    if(! best ||! /^\d+\s*[\/\-–—]\s*25\d{2}$/.test(best)) {
      var normalizedKey = String(key || "").replace(/[\s_\-–—()（）\[\]{}:：/\.]+/g, "").toLowerCase(), isReceiveKey;
      if(("recno" === normalizedKey ||- 1 !== normalizedKey.indexOf("receive") ||- 1 !== normalizedKey.indexOf("receipt") ||- 1 !== normalizedKey.indexOf("registration") ||- 1 !== String(key).indexOf("เลขรับ") ||- 1 !== String(key).indexOf("ทะเบียนรับ") ||- 1 !== String(key).indexOf("รับเลข")) &&! /date|วันที่|วันรับ|receiveddate|receivedat/i.test(normalizedKey)) {
        var candidate = _caseSearchCleanReceiveCandidate_(row[key]);
        candidate && (! best || /^\d+\s*[\/\-–—]\s*25\d{2}$/.test(candidate) || /^\d+$/.test(candidate) &&! /^\d+$/.test(best)) && (best = candidate)
      }
    }
  }), best
}
function _caseSearchReceiveNoText_(row) {
  var recRaw = _caseSearchCleanReceiveCandidate_((row = row || {
  }).recNo), aliasRaw = "", raw;
  return recRaw || (aliasRaw = _caseSearchCleanReceiveCandidate_(_caseSearchPickReceiveAlias_(row, _caseSearchReceiveAliasKeys_()))), _caseManualReceiveNoText_(recRaw || aliasRaw || _caseSearchReceiveNoCandidateFromAnyKey_(row))
}
function _caseSearchReceiveDateAliasKeys_() {
  return["MainData.recDate", "MainData/recDate", "MainData_recDate", "mainData.recDate", "mainData/recDate", "mainData_recDate", "recDate", "rec_date", "rec date", "receiveDate", "receive_date", "receive date", "receiptDate", "receipt_date", "registrationDate", "registration_date", "caseReceiveDate", "caseRecDate", "petitionReceiveDate", "complaintReceiveDate", "documentReceiveDate", "receiveAt", "receivedAt", "receiveOn", "receivedOn", "recDateText", "receiveDateText", "receiveDateDisplay", "วันที่รับเรื่อง", "วันที่รับเรื่อง (พ.ศ.)", "วันที่รับเรื่อง(พ.ศ.)", "วันเดือนปีที่รับเรื่อง", "วันเดือนปีรับเรื่อง", "วันที่รับ", "วันรับเรื่อง", "วันรับ", "รับเรื่องวันที่", "วันที่ลงรับ", "วันที่ลงทะเบียนรับ", "วันที่รับคำร้อง", "วันที่รับหนังสือ", "วันเดือนปีที่รับ", "วันเดือนปีรับ", "รับวันที่", "วันที่รับเรื่องร้องเรียน", "วันรับคำร้อง", "วันรับหนังสือ"]
}
function _caseSearchReceiveDateCandidateFromAnyKey_(source) {
  source = source || {
  };
  var best = "";
  return Object.keys(source).forEach(function(key) {
    if(! best) {
      var rawKey = String(key || ""), normalizedKey = _caseSearchFieldKey_(rawKey), thaiDateKey =- 1 !== rawKey.indexOf("วัน") ||- 1 !== rawKey.indexOf("วันที่"), thaiReceiveKey =- 1 !== rawKey.indexOf("รับ") ||- 1 !== rawKey.indexOf("ลงรับ") ||- 1 !== rawKey.indexOf("ทะเบียนรับ"), enReceiveDateKey = /^(maindata)?(recdate|receivedate|receiveddate|receiptdate|registrationdate|datereceived|datereceive|receivedat|receiveat|receivedon|receiveon|casereceivedate|caserecdate|petitionreceivedate|complaintreceivedate|documentreceivedate)$/i.test(normalizedKey), excluded;
      if(! (/offer|propose|submit|book|letter|due|deadline|extend|delete|deleted|update|updated|create|created|meeting|reply|response|closed|close|refund|report|status/i.test(normalizedKey) ||- 1 !== rawKey.indexOf("เสนอ") ||- 1 !== rawKey.indexOf("หนังสือ") &&- 1 === rawKey.indexOf("รับหนังสือ") ||- 1 !== rawKey.indexOf("ครบกำหนด") ||- 1 !== rawKey.indexOf("ประชุม") ||- 1 !== rawKey.indexOf("แก้ไข") ||- 1 !== rawKey.indexOf("สร้าง") ||- 1 !== rawKey.indexOf("ลบ") ||- 1 !== rawKey.indexOf("สถานะ")) && (enReceiveDateKey || thaiDateKey && thaiReceiveKey)) {
        var text = _caseSearchReceiveDateText_(source[key]);
        text && (best = text)
      }
    }
  }), best
}
function _caseSearchFieldKey_(value) {
  return String(null == value ? "": value).replace(/[\u00A0\u200B-\u200D\uFEFF]/g, "").replace(/[\s\n\r\t\-–—_()（）\[\]{}:：\/\.]+/g, "").toLowerCase()
}
function _caseSearchPickField_(source, keys) {
  source = source || {
  }, keys = Array.isArray(keys) ? keys: [];
  for(var i = 0;
  i < keys.length;
  i ++ ) {
    var key = keys[i];
    if(Object.prototype.hasOwnProperty.call(source, key) && void 0 !== source[key] && null !== source[key] && "" !== String(source[key]).trim())return source[key]
  }
  var dict = {
  };
  Object.keys(source).forEach(function(key) {
    var nk = _caseSearchFieldKey_(key);
    nk &&! Object.prototype.hasOwnProperty.call(dict, nk) && (dict[nk] = source[key])
  });
  for(var j = 0;
  j < keys.length;
  j ++ ) {
    var nkey = _caseSearchFieldKey_(keys[j]);
    if(nkey && void 0 !== dict[nkey] && null !== dict[nkey] && "" !== String(dict[nkey]).trim())return dict[nkey]
  }
  return""
}
function _caseSearchReceiveDateText_(value) {
  if(null == value)return"";
  var pad2 = _appIsFnName_("_appSharedPad2_") ? _appSharedPad2_: function(n) {
    return String(n).padStart(2, "0")
  };
  function cleanText(v) {
    return String(null == v ? "": v).replace(/^'+/, "").replace(/[\u00A0\u200B-\u200D\uFEFF]/g, "").trim()
  }
  function normalizeThaiYear(y) {
    y = Number(String(null == y ? "": y).replace(/[^0-9]/g, "")) || 0;
    if(! y)return 0;
    if(y >= 3600 && y <= 3700)return y - 1086;
    if(y >= 3000 && y <= 3200)return y - 543;
    if(y < 2400)return y + 543;
    return y
  }
  function validDayMonth(d, m) {
    d = Number(d);
    m = Number(m);
    return d >= 1 && d <= 31 && m >= 1 && m <= 12
  }
  function safeDateText(day, month, year) {
    if(! validDayMonth(day, month))return"";
    year = normalizeThaiYear(year);
    return year ? pad2(Number(day)) + "/" + pad2(Number(month)) + "/" + String(year): ""
  }
  function formatDateObject(d) {
    if(! d || isNaN(d.getTime()))return"";
    var tz = "undefined" != typeof Session && Session.getScriptTimeZone && Session.getScriptTimeZone() || "Asia/Bangkok";
    try {
      if("undefined" != typeof Utilities && Utilities.formatDate)return safeDateText(Utilities.formatDate(d, tz, "dd"), Utilities.formatDate(d, tz, "MM"), Utilities.formatDate(d, tz, "yyyy"))
    }
    catch(_fmtErr) {
      _appIgnore_(_fmtErr, "c6.C30:2134")
    }
    return safeDateText(d.getDate(), d.getMonth() + 1, d.getFullYear())
  }
  function rejectNonDateText(text) {
    return ! text || "-" === text || "/" === text || /^CASE[_-]/i.test(text) || /^MAIN-\d+/i.test(text) || /^ROW-\d+/i.test(text) || /^\d+\s*\/\s*25\d{2}$/.test(text)
  }
  if("[object Date]" === Object.prototype.toString.call(value) &&! isNaN(value.getTime()))return formatDateObject(value);
  if("number" == typeof value && isFinite(value) && value > 2e4 && value < 9e4)return formatDateObject(new Date(Math.round(864e5 * (value - 25569))));
  var raw = cleanText(value);
  if(rejectNonDateText(raw))return"";
  var dmy = raw.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.]((?:19|20|25|30|31|36)\d{2})$/);
  if(dmy)return safeDateText(dmy[1], dmy[2], dmy[3]);
  var iso = raw.match(/^((?:19|20|25|30|31|36)\d{2})[-\/](\d{1,2})[-\/](\d{1,2})(?:[T\s].*)?$/);
  if(iso)return safeDateText(iso[3], iso[2], iso[1]);
  if(/GMT|T\d{2}:\d{2}:\d{2}/i.test(raw)) {
    var d = new Date(raw);
    if(! isNaN(d.getTime()))return formatDateObject(d)
  }
  if(_appIsFnName_("_appThaiDateText_")) {
    try {
      var converted = cleanText(_appThaiDateText_(raw)), parts = converted.match(/^(\d{1,2})\/(\d{1,2})\/((?:19|20|25|30|31|36)\d{2})$/);
      if(parts)return safeDateText(parts[1], parts[2], parts[3])
    }
    catch(_err) {
      _appIgnore_(_err, "c6.C30:2158")
    }
  }
  return""
}
function _caseSearchMainDataObject_(row) {
  var raw = (row = row || {
  }).raw && "object" == typeof row.raw ? row.raw: row.__raw && "object" == typeof row.__raw ? row.__raw: {
  };
  return row.MainData && "object" == typeof row.MainData &&! Array.isArray(row.MainData) ? row.MainData: row.mainData && "object" == typeof row.mainData &&! Array.isArray(row.mainData) ? row.mainData: row.MainData && "object" == typeof row.MainData &&! Array.isArray(row.MainData) ? row.MainData: row.mainData && "object" == typeof row.mainData &&! Array.isArray(row.mainData) ? row.mainData: raw.MainData && "object" == typeof raw.MainData &&! Array.isArray(raw.MainData) ? raw.MainData: raw.mainData && "object" == typeof raw.mainData &&! Array.isArray(raw.mainData) ? raw.mainData: {
  }
}
function _caseSearchIdentityTextKey_(value) {
  return(value = String(null == value ? "": value).replace(/^'+/, "").trim()) ? _appIsFnName_("_normalizedText_") ? _normalizedText_(value): value.replace(/[\u00A0\u200B-\u200D\uFEFF]/g, "").replace(/\s+/g, " ").trim().toLowerCase(): ""
}
function _caseSearchTitlePetitionerDateKey_(title, petitioner) {
  return title = _caseSearchIdentityTextKey_(title), petitioner = _caseSearchIdentityTextKey_(petitioner), title ? title + "|" + petitioner: ""
}
function _caseSearchIdentityKeysForMainDataRecDate_(row) {
  row = row || {
  };
  var keys = [], seen = {
  };
  function addCaseIdentityKey_(prefix, value) {
    var key = (value = String(null == value ? "": value).replace(/^'+/, "").trim()) ? prefix + ":" + value: "";
    return key &&! seen[key] && (seen[key] = 1, keys.push(key)), value
  }
  function firstValue(list) {
    return _caseSearchPickField_(row, list) || ""
  }
  var title = firstValue(["title", "subject", "caseSubject", "caseName", "name", "เรื่อง", "ชื่อเรื่อง", "หัวข้อเรื่อง"]), consideration = firstValue(["caseTitle", "considerationTitle", "caseConsiderationTitle", "titleConsider", "considerTitle", "ชื่อเรื่องพิจารณา (ถ้ามี)", "ชื่อเรื่องพิจารณา", "เรื่องพิจารณา"]), petitioners = firstValue(["petitioners", "petitioner", "petitionerName", "requester", "complainant", "proposer", "motionProposer", "ผู้เสนอญัตติ/ผู้ร้อง", "ผู้ร้อง", "ผู้เสนอญัตติ"]), caseId = addCaseIdentityKey_("caseId", firstValue(["caseId", "id", "uid", "rowId", "_id"])), caseNum = addCaseIdentityKey_("caseNum", firstValue(["caseNum", "caseNo", "runningNo", "ลำดับเรื่อง"])), recNo = addCaseIdentityKey_("recNo", firstValue(["recNo", "receiveNo", "เลขรับเรื่อง"]));
  if(caseNum && recNo) {
    var pair = "caseNumRecNo:" + caseNum + "|" + recNo;
    seen[pair] || (seen[pair] = 1, keys.push(pair))
  }
  var tp = _caseSearchTitlePetitionerDateKey_(title || consideration, petitioners);
  if(tp && tp.indexOf("|") > 0 && tp.split("|")[1]) {
    var tpKey = "titlePetitioner:" + tp;
    seen[tpKey] || (seen[tpKey] = 1, keys.push(tpKey))
  }
  return keys
}
function _caseSearchMainDataRecDateIndex_() {
  var cacheNs = "MainData.recDate.owner", cached = _appIsFnName_("_requestScopeGet_") ? _requestScopeGet_("caseSearchMainDataRecDateIndex", cacheNs): null;
  if(cached && "object" == typeof cached)return cached;
  var map = {
  };
  function addKey(prefix, value, text) {
    return(value = String(null == value ? "": value).replace(/^'+/, "").trim()) && text &&! map[prefix + ":" + value] && (map[prefix + ":" + value] = text), value
  }
  function addDirectKey(key, text) {
    key && text &&! map[key] && (map[key] = text)
  }
  try {
    var fields = ["caseId", "id", "uid", "rowId", "_id", "caseNum", "caseNo", "runningNo", "ลำดับเรื่อง", "recNo", "receiveNo", "เลขรับเรื่อง", "title", "subject", "caseSubject", "caseName", "name", "เรื่อง", "ชื่อเรื่อง", "หัวข้อเรื่อง", "caseTitle", "considerationTitle", "caseConsiderationTitle", "titleConsider", "considerTitle", "ชื่อเรื่องพิจารณา (ถ้ามี)", "ชื่อเรื่องพิจารณา", "เรื่องพิจารณา", "petitioners", "petitioner", "petitionerName", "requester", "complainant", "proposer", "motionProposer", "ผู้เสนอญัตติ/ผู้ร้อง", "ผู้ร้อง", "ผู้เสนอญัตติ", "isDeleted"].concat(_caseSearchReceiveDateAliasKeys_()), rows = "function" == typeof readSheetProjectedObjectsCached_ ? readSheetProjectedObjectsCached_("MainData", fields, {
      includeDeleted: ! 1, requireCanonical: ! 1, ttl: 180, batchSize: 500
    }): [];
    (Array.isArray(rows) ? rows: []).forEach(function(row) {
      var text = _caseSearchReceiveDateText_(_caseSearchPickField_(row = row || {
      }, _caseSearchReceiveDateAliasKeys_())) || _caseSearchReceiveDateCandidateFromAnyKey_(row);
      if(text) {
        var dateIndexCaseId = addKey("caseId", _caseSearchPickField_(row, ["caseId", "id", "uid", "rowId", "_id"]), text), dateIndexCaseNum = addKey("caseNum", _caseSearchPickField_(row, ["caseNum", "caseNo", "runningNo", "ลำดับเรื่อง"]), text), dateIndexRecNo = addKey("recNo", _caseSearchPickField_(row, ["recNo", "receiveNo", "เลขรับเรื่อง"]), text);
        dateIndexCaseNum && dateIndexRecNo && addDirectKey("caseNumRecNo:" + dateIndexCaseNum + "|" + dateIndexRecNo, text);
        var dateIndexTitle = _caseSearchPickField_(row, ["title", "subject", "caseSubject", "caseName", "name", "เรื่อง", "ชื่อเรื่อง", "หัวข้อเรื่อง"]), dateIndexConsideration = _caseSearchPickField_(row, ["caseTitle", "considerationTitle", "caseConsiderationTitle", "titleConsider", "considerTitle", "ชื่อเรื่องพิจารณา (ถ้ามี)", "ชื่อเรื่องพิจารณา", "เรื่องพิจารณา"]), dateIndexPetitioners, titlePetitionerKey = _caseSearchTitlePetitionerDateKey_(dateIndexTitle || dateIndexConsideration, _caseSearchPickField_(row, ["petitioners", "petitioner", "petitionerName", "requester", "complainant", "proposer", "motionProposer", "ผู้เสนอญัตติ/ผู้ร้อง", "ผู้ร้อง", "ผู้เสนอญัตติ"]));
        titlePetitionerKey && titlePetitionerKey.indexOf("|") > 0 && titlePetitionerKey.split("|")[1] && addKey("titlePetitioner", titlePetitionerKey, text)
      }
    })
  }
  catch(e) {
    _appIsFnName_("_recordWarning_") && _recordWarning_("case.search.maindata.recDate.index.owner", e)
  }
  return _appIsFnName_("_requestScopePut_") && _requestScopePut_("caseSearchMainDataRecDateIndex", cacheNs, map), map
}
function _caseSearchReceiveDateValueFromRow_(row) {
  row = row || {
  };
  var keys = _caseSearchReceiveDateAliasKeys_();
  function read(source) {
    var value = _caseSearchPickField_(source = source || {
    }, keys);
    return"" !== value && null != value ? value: _caseSearchReceiveDateCandidateFromAnyKey_(source)
  }
  var rawObj = row.raw && "object" == typeof row.raw ? row.raw: row.__raw && "object" == typeof row.__raw ? row.__raw: {
  }, value = read(row), main, data;
  if("" !== value && _caseSearchReceiveDateText_(value))return value;
  if("" !== (value = read(rawObj)) && _caseSearchReceiveDateText_(value))return value;
  if("" !== (value = read(_caseSearchMainDataObject_(row))) && _caseSearchReceiveDateText_(value))return value;
  if("" !== (value = read(row.data && "object" == typeof row.data &&! Array.isArray(row.data) ? row.data: {
  })) && _caseSearchReceiveDateText_(value))return value;
  for(var idx = _caseSearchMainDataRecDateIndex_(), identityKeys = _caseSearchIdentityKeysForMainDataRecDate_(row), i = 0;
  i < identityKeys.length;
  i ++ )if(idx && idx[identityKeys[i]])return idx[identityKeys[i]];
  return""
}
function _caseSearchReceiveDateTextFromRow_(row) {
  return _caseSearchReceiveDateText_(_caseSearchReceiveDateValueFromRow_(row || {
  }))
}
function _caseSearchEnsureReceiveNo_(row) {
  row = row || {
  };
  var out = Object.assign({
  }, row), receiveNo = _caseSearchReceiveNoText_(out), receiveDateText = _caseSearchReceiveDateTextFromRow_(out), caseNum = _caseManualNumericText_(_casePick_(out, ["caseNum", "caseNo", "runningNo", "orderNo", "seq", "no", "ลำดับเรื่อง", "ลำดับ", "ลำดับที่"]) || ""), title = String(_casePick_(out, ["title", "subject", "caseSubject", "เรื่อง", "ชื่อเรื่อง", "เรื่องร้องเรียน"]) || "").trim(), consideration = String(_casePick_(out, ["considerationTitle", "caseConsiderationTitle", "caseTitle", "ชื่อเรื่องพิจารณา (ถ้ามี)", "ชื่อเรื่องพิจารณา", "เรื่องพิจารณา"]) || "").trim(), petitioners = String(_casePick_(out, ["petitioners", "petitionerName", "petitioner", "requester", "complainant", "proposer", "motionProposer", "ผู้เสนอญัตติ/ผู้ร้อง", "ผู้เสนอญัตติ", "ผู้ร้อง"]) || "").trim(), respondent = String(_casePick_(out, ["respondent", "agencyName", "accusedAgency", "accused", "agency", "หน่วยงาน / ผู้ถูกร้อง", "หน่วยงาน/ผู้ถูกร้อง", "ผู้ถูกร้อง", "หน่วยงาน"]) || "").trim();
  return caseNum ? (out.caseNum = caseNum, out.caseNo = caseNum, out.runningNo = caseNum, out["ลำดับเรื่อง"] = caseNum): (out.caseNum = "", out.caseNo = "", out.runningNo = "", out["ลำดับเรื่อง"] = ""), receiveNo ? (out.receiveNo = receiveNo, out.recNo = receiveNo, out.receiveNoDisplay = receiveNo, out.canonicalReceiveNo = receiveNo, out["เลขรับเรื่อง"] = receiveNo): (out.receiveNo = "", out.recNo = "", out.receiveNoDisplay = "", out.canonicalReceiveNo = "", out["เลขรับเรื่อง"] = ""), receiveDateText ? (out.recDate = receiveDateText, out.receiveDate = receiveDateText, out.recDateText = receiveDateText, out.receiveDateText = receiveDateText, out["วันที่รับเรื่อง"] = receiveDateText): (out.recDate = out.recDate || "", out.receiveDate = out.receiveDate || "", out.recDateText = out.recDateText || "", out.receiveDateText = out.receiveDateText || "", out["วันที่รับเรื่อง"] = out["วันที่รับเรื่อง"] || ""), title && (out.title = title, out.subject = out.subject || title, out["ชื่อเรื่อง"] = title), consideration && (out.caseTitle = consideration, out.considerationTitle = consideration, out["ชื่อเรื่องพิจารณา (ถ้ามี)"] = consideration), petitioners && (out.petitioners = petitioners, out.petitionerName = out.petitionerName || petitioners, out["ผู้เสนอญัตติ/ผู้ร้อง"] = petitioners), respondent && (out.respondent = respondent, out.agencyName = out.agencyName || respondent), out.type = "case", out.typeLabel = "เรื่องพิจารณา", out
}
function _caseSearchCompactProjectedFields_() {
  return["caseId", "cat", "subCat", "recNo", "offerDate", "recDate", "title", "petitioners", "status", "assignees", "staffs", "respondent", "coAssignees", "caseNum", "remark", "pendingRemark", "pendingNote", "caseTitle", "agencyName", "closedReason", "rejectionReason", "petitionerPhone", "subject", "caseType", "topic", "subcommittee", "owner", "dueDate", "createdAt", "updatedAt", "meetingStatus", "isDeleted", "deletedAt", "keySummary", "sentAgency"]
}
function _caseSearchProjectedFields_() {
  return["caseId", "id", "cat", "caseType", "subCat", "subCategory", "issue", "topic", "recNo", "receiveNo", "เลขรับเรื่อง", "เลขที่รับเรื่อง", "รับเรื่องเลขที่", "เลขรับเรื่องพิจารณา", "เลขรับที่", "เลขรับคำร้อง", "เลขรับหนังสือ", "เลขทะเบียนรับ", "ทะเบียนรับ", "ทะเบียนหนังสือรับ", "เลขหนังสือรับ", "caseReceiveNo", "caseRecNo", "receiptNo", "receiveNumber", "registrationNo", "registrationNumber", "receiveRegistrationNo", "receiveCode", "receiveBookNo", "bookReceiveNo", "petitionReceiveNo", "complaintReceiveNo", "documentReceiveNo", "รับเลขที่", "รับที่", "เลขรับ", "offerDate", "bookDate", "letterDate", "dateProposed", "proposalDate", "proposeDate", "proposedDate", "submittedDate", "submitDate", "dateSubmitted", "วันที่หนังสือ", "วันที่เสนอ", "วันที่เสนอเรื่อง", "วันเดือนปีที่เสนอ", "วันที่ยื่น", "วันที่ยื่นเรื่อง", "recDate", "receiveDate", "dateReceive", "receiveAt", "receivedAt", "receiveOn", "receivedOn", "recDateText", "receiveDateText", "วันที่รับเรื่อง", "วันที่รับเรื่อง (พ.ศ.)", "วันที่รับเรื่อง(พ.ศ.)", "วันที่รับ", "วันรับเรื่อง", "รับเรื่องวันที่", "วันที่ลงรับ", "วันที่รับคำร้อง", "วันที่", "วันเดือนปี", "วันที่ (พ.ศ.)", "วันที่(พ.ศ.)", "date", "dateText", "recordDate", "recordedDate", "title", "subject", "caseSubject", "ชื่อเรื่อง", "เรื่อง", "เรื่องร้องเรียน", "caseTitle", "considerationTitle", "caseConsiderationTitle", "ชื่อเรื่องพิจารณา (ถ้ามี)", "ชื่อเรื่องพิจารณา", "เรื่องพิจารณา", "petitioners", "petitionerName", "petitioner", "requester", "complainant", "proposer", "motionProposer", "ผู้เสนอญัตติ/ผู้ร้อง", "ผู้เสนอญัตติ", "ผู้ร้อง", "status", "assignees", "owner", "responsibleCommissioners", "responsibleComm", "committeeOwner", "responsibleCommittee", "staffs", "secretariatOfficer", "operationOfficer", "opStaff", "operator", "responsibleOfficer", "operationStaff", "staff", "officer", "respondent", "agencyName", "accusedAgency", "accused", "agency", "coAssignees", "coAssignee", "coOwners", "coResponsible", "caseNum", "caseNo", "runningNo", "remark", "note", "pendingRemark", "pendingNote", "waitRemark", "waitingRemark", "considerationPendingRemark", "หมายเหตุรอพิจารณา", "หมายเหตุรอการพิจารณา", "reason", "statusReason", "decisionReason", "closedReason", "closeReason", "terminateReason", "stopReason", "endReason", "caseCloseReason", "caseEndReason", "rejectionReason", "rejectReason", "notAcceptedReason", "notReceiveReason", "notAcceptReason", "caseRejectReason", "เหตุผล", "เหตุผล (ไม่รับเรื่อง)", "เหตุผลไม่รับเรื่อง", "เหตุผลการไม่รับเรื่อง", "เหตุผลยุติเรื่อง", "เหตุผลการยุติเรื่อง", "petitionerPhone", "subcommittee", "dueDate", "createdAt", "updatedAt", "meetingStatus", "isDeleted", "deletedAt", "keySummary", "sentAgency", "sendToAgency", "sentToAgency", "forwardedAgency", "forwardAgency", "forwardToAgency", "sentAgencyName", "หน่วยงานที่ส่ง", "ส่งให้หน่วยงาน", "ส่งหน่วยงาน", "หน่วยงานที่เกี่ยวข้อง"]
}
function _caseReadMainDataRowsForSearch_(fields, opts) {
  opts = opts || {
  };
  var requested = Array.isArray(fields) ? fields.slice(): [];
  function caseSearchPickCanonical_(row, keys) {
    return"undefined" != typeof AppBackendCore && AppBackendCore.pickNormalized ? AppBackendCore.pickNormalized(row, keys, ""): _casePick_(row, keys)
  }
  function _caseLooksLikeStatusDate_(value) {
    var s = String(null == value ? "": value).trim();
    return !! s && ("[object Date]" === Object.prototype.toString.call(value) || (/^\d{1,2}[\/\-.]\d{1,2}[\/\-.](?:19|20|25)\d{2}$/.test(s) || /^\d{4}[\/\-.]\d{1,2}[\/\-.]\d{1,2}/.test(s) || /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s/i.test(s) || /GMT|เวลาอินโดจีน|T\d{2}:\d{2}/i.test(s) || /^\d{1,2}\s*(?:ม\.?ค\.?|ก\.?พ\.?|มี\.?ค\.?|เม\.?ย\.?|พ\.?ค\.?|มิ\.?ย\.?|ก\.?ค\.?|ส\.?ค\.?|ก\.?ย\.?|ต\.?ค\.?|พ\.?ย\.?|ธ\.?ค\.?|มกราคม|กุมภาพันธ์|มีนาคม|เมษายน|พฤษภาคม|มิถุนายน|กรกฎาคม|สิงหาคม|กันยายน|ตุลาคม|พฤศจิกายน|ธันวาคม)\s*(?:19|20|25)\d{2}/i.test(s)))
  }
  function _caseCleanDisplayStatus_(value) {
    var v = String(null == value ? "": value).replace(/[\u00A0\u200B-\u200D\uFEFF]/g, " ").replace(/\s+/g, " ").trim();
    if(! v || "-" === v || _caseLooksLikeStatusDate_(v))return"";
    return"undefined" != typeof AppBackendCore && AppBackendCore && "function" == typeof AppBackendCore.normalizeCaseStatus ? AppBackendCore.normalizeCaseStatus(v, {
      defaultStatus: "เรื่องเข้าใหม่"
    }): _caseNormalizeStatusForDisplay_(v)
  }
  function _caseStatusObject_(value) {
    if(value && "object" == typeof value &&! Array.isArray(value))return value;
    if("string" == typeof value) {
      var s = value.trim();
      if("{" === s.charAt(0) && "}" === s.charAt(s.length - 1) || "[" === s.charAt(0) && "]" === s.charAt(s.length - 1))try {
        var parsed = JSON.parse(s);
        return parsed && "object" == typeof parsed &&! Array.isArray(parsed) ? parsed: {
        }
      }
      catch(e) {
        _appIsFnName_("_recordWarning_") && _recordWarning_("ec", e)
      }
    }
    return {
    }
  }
  function _caseStatusKey_(key) {
    return String(null == key ? "": key).replace(/[\u00A0\u200B-\u200D\uFEFF]/g, "").replace(/[\s_.-]+/g, "").replace(/[\\/]+/g, "/").toLowerCase()
  }
  function _casePickStatusValue_(source, keys) {
    source = _caseStatusObject_(source);
    for(var i = 0;
    i < keys.length;
    i ++ ) {
      var k = keys[i];
      if(Object.prototype.hasOwnProperty.call(source, k)) {
        var v = _caseCleanDisplayStatus_(source[k]);
        if(v)return v
      }
    }
    var dict = {
    };
    Object.keys(source).forEach(function(k) {
      dict[_caseStatusKey_(k)] = source[k]
    });
    for(var j = 0;
    j < keys.length;
    j ++ ) {
      var nk = _caseStatusKey_(keys[j]);
      if(Object.prototype.hasOwnProperty.call(dict, nk)) {
        var x = _caseCleanDisplayStatus_(dict[nk]);
        if(x)return x
      }
    }
    return""
  }
  function _caseMainDataStatusValue_(row) {
    var raw = _caseStatusObject_((row = row || {
    }).raw || row.__raw || {
    }), main = _caseStatusObject_(row.MainData || row.mainData || row.MainData || row.mainData || raw.MainData || raw.mainData || raw.MainData || raw.mainData), flat = ["MainData/status", "MainData.status", "MainData_status", "mainData/status", "mainData.status", "mainData_status", "Main Data/status", "Main Data.status"], mainKeys = ["status", "สถานะ", "สถานะเรื่อง", "สถานะปัจจุบัน", "ผลการพิจารณา", "สถานะการพิจารณา", "สถานะพิจารณา", "สถานะเรื่องพิจารณา"], direct = _casePickStatusValue_(row, flat) || _casePickStatusValue_(raw, flat) || _casePickStatusValue_(main, mainKeys) || _casePickStatusValue_(_caseStatusObject_(raw.MainData || raw.mainData || raw.MainData || raw.mainData), mainKeys);
    if(direct)return direct;
    var normal = _casePickStatusValue_(row, ["status", "สถานะ"]) || _casePickStatusValue_(raw, ["status", "สถานะ"]);
    if(normal)return normal;
    var statusKeys = ["สถานะปัจจุบัน", "ผลการพิจารณา", "สถานะการพิจารณา", "สถานะเรื่องพิจารณา", "สถานะเรื่อง", "caseStatus", "processStatus", "currentStatus", "statusText", "caseState", "workflowStatus", "meetingStatus", "resultStatus"];
    return _casePickStatusValue_(row, statusKeys) || _casePickStatusValue_(raw, statusKeys) || ""
  }
  function canonical(row, index) {
    var caseNum = _caseManualNumericText_(caseSearchPickCanonical_(row = row || {
    }, ["caseNum", "caseNo", "runningNo", "orderNo", "seq", "no", "ลำดับเรื่อง", "ลำดับ", "ลำดับที่"]) || ""), recNo = _caseManualReceiveNoText_(caseSearchPickCanonical_(row, ["recNo", "receiveNo", "receivedNo", "caseReceiveNo", "caseRecNo", "receiptNo", "receiveNumber", "registrationNo", "registrationNumber", "receiveRegistrationNo", "receiveCode", "receiveBookNo", "bookReceiveNo", "petitionReceiveNo", "complaintReceiveNo", "documentReceiveNo", "เลขรับเรื่อง", "เลขที่รับเรื่อง", "รับเรื่องเลขที่", "เลขรับเรื่องพิจารณา", "เลขรับที่", "เลขรับคำร้อง", "เลขรับหนังสือ", "เลขทะเบียนรับ", "ทะเบียนรับ", "ทะเบียนหนังสือรับ", "เลขหนังสือรับ", "รับเลขที่", "รับที่", "เลขรับ"]) || ""), title = String(caseSearchPickCanonical_(row, ["title", "subject", "caseSubject", "ชื่อเรื่อง", "เรื่อง", "เรื่องร้องเรียน"]) || "").trim(), caseTitle = String(caseSearchPickCanonical_(row, ["caseTitle", "considerationTitle", "caseConsiderationTitle", "titleConsider", "considerTitle", "ชื่อเรื่องพิจารณา (ถ้ามี)", "ชื่อเรื่องพิจารณา", "เรื่องพิจารณา"]) || "").trim();
    ! title && caseTitle && (title = caseTitle), ! caseTitle && title && (caseTitle = title);
    var petitioners = String(caseSearchPickCanonical_(row, ["petitioners", "petitionerName", "petitioner", "requester", "complainant", "proposer", "motionProposer", "ผู้เสนอญัตติ/ผู้ร้อง", "ผู้เสนอญัตติ", "ผู้ร้อง", "ผู้เสนอ"]) || "").trim(), respondent = String(caseSearchPickCanonical_(row, ["respondent", "agencyName", "accusedAgency", "accused", "agency", "หน่วยงาน / ผู้ถูกร้อง", "หน่วยงาน/ผู้ถูกร้อง", "ผู้ถูกร้อง", "หน่วยงาน"]) || "").trim(), sentAgency = String(caseSearchPickCanonical_(row, ["sentAgency", "sendToAgency", "sentToAgency", "forwardedAgency", "forwardAgency", "forwardToAgency", "sentAgencyName", "หน่วยงานที่ส่ง", "ส่งให้หน่วยงาน", "ส่งหน่วยงาน", "หน่วยงานที่เกี่ยวข้อง"]) || "").trim(), status = _caseMainDataStatusValue_(row), statusForReason = _caseNormalizeStatusForDisplay_(String(status || "เรื่องเข้าใหม่").trim()), offerDate = String(caseSearchPickCanonical_(row, ["offerDate", "bookDate", "letterDate", "dateProposed", "proposalDate", "proposeDate", "proposedDate", "submittedDate", "submitDate", "dateSubmitted", "วันที่หนังสือ", "วันที่เสนอ", "วันที่เสนอเรื่อง", "วันเดือนปีที่เสนอ", "วันที่ยื่น", "วันที่ยื่นเรื่อง"]) || "").trim(), rawClosedReason = String(caseSearchPickCanonical_(row, ["closedReason", "closeReason", "terminateReason", "stopReason", "endReason", "caseCloseReason", "caseEndReason", "statusReason", "decisionReason", "reason", "เหตุผล", "เหตุผลยุติเรื่อง", "เหตุผลการยุติเรื่อง"]) || "").trim(), rawRejectionReason = String(caseSearchPickCanonical_(row, ["rejectionReason", "rejectReason", "notAcceptedReason", "notReceiveReason", "notAcceptReason", "caseRejectReason", "statusReason", "decisionReason", "reason", "เหตุผล", "เหตุผล (ไม่รับเรื่อง)", "เหตุผลไม่รับเรื่อง", "เหตุผลการไม่รับเรื่อง"]) || "").trim(), reasonGeneric = rawRejectionReason || rawClosedReason || "", closedReason = rawClosedReason || reasonGeneric || "", rejectionReason = rawRejectionReason || rawClosedReason || reasonGeneric || "", cat = String(caseSearchPickCanonical_(row, ["cat", "caseType", "type", "category", "ประเภทเรื่อง", "ประเภท"]) || "").trim(), subCat = String(caseSearchPickCanonical_(row, ["subCat", "subCategory", "issue", "topic", "issueTitle", "ประเด็นพิจารณา", "ประเด็น"]) || "").trim(), assignees = String(caseSearchPickCanonical_(row, ["assignees", "committeeOwner", "responsibleCommittee", "responsibleCommissioners", "responsibleComm", "subcommittee", "owner", "กมธ.รับผิดชอบ", "กมธ. รับผิดชอบ", "กรรมาธิการรับผิดชอบ", "คณะกรรมาธิการรับผิดชอบ", "ผู้รับผิดชอบ", "ผู้รับผิดชอบหลัก"]) || "").trim(), staffs = String(caseSearchPickCanonical_(row, ["secretariatOfficer", "operationOfficer", "opStaff", "staffs", "operator", "responsibleOfficer", "operationStaff", "staff", "officer", "เจ้าหน้าที่ฝ่ายเลขานุการ", "เจ้าหน้าที่ฝ่ายเลขานุการ"]) || "").trim(), coAssignees = String(caseSearchPickCanonical_(row, ["coAssignees", "coAssignee", "coOwners", "coResponsible", "ผู้รับผิดชอบร่วม", "ผู้ร่วมรับผิดชอบ"]) || "").trim(), petitionerPhone = _appPhoneForDisplay_(caseSearchPickCanonical_(row, ["petitionerPhone", "petitionerTel", "petitionerTelephone", "petitionerMobile", "petitionerContactPhone", "proposerPhone", "proposerTel", "proposerTelephone", "proposerMobile", "complainantPhone", "complainantTel", "complainantTelephone", "complainantMobile", "phone", "tel", "telephone", "mobile", "contactPhone", "phoneNumber", "เบอร์โทรศัพท์ผู้เสนอญัตติ/ผู้ร้อง", "เบอร์โทรผู้เสนอญัตติ/ผู้ร้อง", "โทรศัพท์ผู้เสนอญัตติ/ผู้ร้อง", "เบอร์โทรศัพท์ผู้ร้อง", "เบอร์โทรผู้ร้อง", "โทรศัพท์ผู้ร้อง", "เบอร์โทรศัพท์ผู้เสนอ", "เบอร์โทรผู้เสนอ", "โทรศัพท์ผู้เสนอ", "เบอร์โทรศัพท์", "เบอร์โทร", "โทรศัพท์", "หมายเลขโทรศัพท์", "มือถือ"]) || ""), receiveDateText = _caseSearchReceiveDateTextFromRow_(row), id = String(caseSearchPickCanonical_(row, ["caseId", "id", "uid", "rowId", "_id"]) || "").trim() || "MAIN-" + String(row.__rowNumber || index + 2), out = Object.assign({
    }, row, {
      caseId: id, id: row.id || id, caseNum: caseNum, caseNo: caseNum, runningNo: caseNum, recNo: recNo, receiveNo: recNo, title: title, subject: row.subject || title, caseTitle: caseTitle, considerationTitle: row.considerationTitle || caseTitle, petitioners: petitioners, petitionerName: row.petitionerName || petitioners, respondent: respondent, agencyName: row.agencyName || respondent, sentAgency: sentAgency, sendToAgency: sentAgency, "ส่งให้หน่วยงาน": sentAgency, status: statusForReason || "เรื่องเข้าใหม่", statusRaw: String(status || "").trim(), offerDate: offerDate, dateProposed: offerDate, bookDate: offerDate, letterDate: row.letterDate || offerDate, documentDate: row.documentDate || offerDate, "วันที่หนังสือ": row["วันที่หนังสือ"] || offerDate, reason: reasonGeneric, statusReason: row.statusReason || reasonGeneric, decisionReason: row.decisionReason || reasonGeneric, closedReason: closedReason, rejectionReason: rejectionReason, rejectReason: rejectionReason, notAcceptedReason: rejectionReason, "เหตุผล (ไม่รับเรื่อง)": rejectionReason, "เหตุผล": reasonGeneric, petitionerPhone: petitionerPhone, petitionerTel: petitionerPhone, phone: petitionerPhone, "เบอร์โทรศัพท์ผู้เสนอญัตติ/ผู้ร้อง": petitionerPhone, cat: cat, caseType: row.caseType || cat, subCat: subCat, subCategory: row.subCategory || subCat, assignees: assignees, owner: row.owner || assignees, staffs: staffs, opStaff: row.opStaff || staffs, coAssignees: coAssignees, type: "case", typeLabel: "เรื่องพิจารณา"
    });
    return out["ลำดับเรื่อง"] = caseNum, out["เลขรับเรื่อง"] = recNo, receiveDateText && (out.recDate = receiveDateText, out.receiveDate = receiveDateText, out.recDateText = receiveDateText, out.receiveDateText = receiveDateText, out["วันที่รับเรื่อง"] = receiveDateText), out["ชื่อเรื่องพิจารณา (ถ้ามี)"] = out["ชื่อเรื่องพิจารณา (ถ้ามี)"] || caseTitle, out["ผู้เสนอญัตติ/ผู้ร้อง"] = out["ผู้เสนอญัตติ/ผู้ร้อง"] || petitioners, _appIsFnName_("_caseSearchEnsureReceiveNo_") && (out = _caseSearchEnsureReceiveNo_(out)), out
  }
  function hasCaseSearchIdentity_(row) {
    var caseNum, recNo, title, petitioners, score;
    return row = row || {
    }, (String(caseSearchPickCanonical_(row, ["caseNum", "caseNo", "runningNo", "ลำดับเรื่อง"]) || "").trim() ? 1: 0) + (String(caseSearchPickCanonical_(row, ["recNo", "receiveNo", "เลขรับเรื่อง"]) || "").trim() ? 1: 0) + (String(caseSearchPickCanonical_(row, ["title", "subject", "caseTitle", "considerationTitle", "ชื่อเรื่อง", "ชื่อเรื่องพิจารณา (ถ้ามี)"]) || "").trim() ? 1: 0) + (String(caseSearchPickCanonical_(row, ["petitioners", "petitionerName", "ผู้เสนอญัตติ/ผู้ร้อง"]) || "").trim() ? 1: 0) >= 2
  }
  try {
    var projectedFields = requested.length ? requested.slice(): _appIsFnName_("_caseSearchProjectedFields_") ? _caseSearchProjectedFields_(): [], effectiveTtl =! 0 === opts.forceFresh ||! 0 === opts.noCache ||! 0 === opts.bypassCache ? 0: Math.max(60, Math.min(Number(opts.cacheTtlSeconds || opts.ttl || 180) || 180, 300)), projectedRows = "function" == typeof readSheetProjectedObjectsCached_ ? readSheetProjectedObjectsCached_("MainData", projectedFields, {
      includeDeleted: ! 1, requireCanonical: ! 1, ttl: effectiveTtl, batchSize: 500
    }): [];
    if(Array.isArray(projectedRows) && projectedRows.length) {
      var canonicalRows = projectedRows.map(function(row, idx) {
        return canonical(Object.assign({
          __rowNumber: idx + 2
        }, row || {
        }), idx)
      }).filter(function(row) {
        var deleted = String(row.isDeleted || row.deleted || row.deletedAt || row["ลบ"] || "").trim().toLowerCase();
        return"true" !== deleted && "1" !== deleted && "deleted" !== deleted && "ลบ" !== deleted
      }), identityRows = canonicalRows.filter(hasCaseSearchIdentity_);
      if(identityRows.length)return canonicalRows = identityRows, _appIsFnName_("_requestScopeNoteRowsRead_") && _requestScopeNoteRowsRead_("MainData.projected.identity", canonicalRows.length), requested.length && (canonicalRows = canonicalRows.map(function(row) {
        var out = {
        };
        return requested.forEach(function(f) {
          out[f] = void 0 !== row[f] && null !== row[f] ? row[f]: ""
        }), ["caseId", "id", "caseNum", "caseNo", "runningNo", "recNo", "receiveNo", "title", "subject", "caseTitle", "considerationTitle", "petitioners", "petitionerName", "status", "cat", "subCat", "assignees", "staffs", "coAssignees", "agencyName", "respondent", "recDate", "recDateText", "receiveDate", "receiveDateText", "type", "typeLabel", "ลำดับเรื่อง", "เลขรับเรื่อง", "วันที่รับเรื่อง", "ชื่อเรื่องพิจารณา (ถ้ามี)", "ผู้เสนอญัตติ/ผู้ร้อง"].forEach(function(k) {
          void 0 !== out[k] && null !== out[k] && "" !== String(out[k]).trim() || void 0 === row[k] || null === row[k] || "" === String(row[k]).trim() || (out[k] = row[k])
        }), out
      })), canonicalRows;
      _appIsFnName_("_recordWarning_") && _recordWarning_("case.search.projectedRead.emptyIdentity.fullMatrixRead", new Error("PROJECTED_ROWS_WITHOUT_CASE_IDENTITY"))
    }
  }
  catch(projectedErr) {
    _appIsFnName_("_recordWarning_") && _recordWarning_("case.search.projectedRead.fullMatrixRead", projectedErr)
  }
  try {
    var sh = "function" == typeof getSheet_ ? getSheet_("MainData"): null;
    if(! sh)return[];
    var matrix = "function" == typeof getSheetMatrixCached_ ? getSheetMatrixCached_(sh, 0, {
      allowFullMatrix: ! 0
    }): "function" == typeof getSheetMatrix_ ? getSheetMatrix_(sh, 0, {
      allowFullMatrix: ! 0
    }): [];
    if(! Array.isArray(matrix) || matrix.length < 2)return[];
    var schema = "undefined" != typeof SHEET_SCHEMAS && SHEET_SCHEMAS && Array.isArray(SHEET_SCHEMAS.MainData) ? SHEET_SCHEMAS.MainData: [], aliases = "undefined" != typeof SHEET_HEADER_ALIASES && SHEET_HEADER_ALIASES && SHEET_HEADER_ALIASES.MainData ? SHEET_HEADER_ALIASES.MainData: {
    }, appAliases = "function" == typeof getAppFieldAliases_ ? getAppFieldAliases_("MainData"): aliases, rawRows, rows = ("undefined" != typeof AppBackendCore && AppBackendCore.matrixToObjects ? AppBackendCore.matrixToObjects(matrix, {
      schema: schema, aliases: aliases, appAliases: appAliases, normalizeKey: normalizeDirectRowKey_, includeDeleted: ! 1
    }): []).map(function(obj, idx) {
      return canonical(obj, idx)
    });
    return _appIsFnName_("_requestScopeNoteRowsRead_") && _requestScopeNoteRowsRead_("MainData", rows.length), requested.length && (rows = rows.map(function(row) {
      var out = {
      };
      return requested.forEach(function(f) {
        out[f] = void 0 !== row[f] && null !== row[f] ? row[f]: ""
      }), ["caseId", "id", "caseNum", "caseNo", "runningNo", "recNo", "receiveNo", "title", "subject", "caseTitle", "considerationTitle", "petitioners", "petitionerName", "status", "cat", "subCat", "assignees", "staffs", "coAssignees", "agencyName", "respondent", "recDate", "recDateText", "receiveDate", "receiveDateText", "type", "typeLabel", "ลำดับเรื่อง", "เลขรับเรื่อง", "วันที่รับเรื่อง", "ชื่อเรื่องพิจารณา (ถ้ามี)", "ผู้เสนอญัตติ/ผู้ร้อง"].forEach(function(k) {
        void 0 !== out[k] && null !== out[k] && "" !== String(out[k]).trim() || void 0 === row[k] || null === row[k] || "" === String(row[k]).trim() || (out[k] = row[k])
      }), out
    })), rows
  }
  catch(e) {
    return _appIsFnName_("_recordWarning_") && _recordWarning_("case.directMainData.recDateOwner.failed", e), []
  }
}
function _caseProjectedRows_(fields, ttl) {
  var requested = fields || _caseSearchProjectedFields_(), rows = [];
  try {
    rows = _caseReadMainDataRowsForSearch_(requested) || []
  }
  catch(directErr) {
    _appIsFnName_("_recordWarning_") && _recordWarning_("case.search.projectedRows.directMainDataRecDate", directErr), rows = []
  }
  if(! rows.length) {
    var effectiveTtl = 0 === ttl ? 0: ttl || 180;
    try {
      rows = _caseDomainSharedRows_("MainData", requested, {
        includeDeleted: ! 1, requireCanonical: ! 1, ttl: effectiveTtl
      }) || []
    }
    catch(e) {
      _appIsFnName_("_recordWarning_") && _recordWarning_("case.search.projectedRows.sharedRead", e), rows = []
    }
  }
  return(Array.isArray(rows) ? rows: []).map(_caseSearchEnsureReceiveNo_).filter(function(row) {
    var deleted = String(row.isDeleted || row.deleted || row.deletedAt || "").trim().toLowerCase();
    if("true" === deleted || "1" === deleted || "deleted" === deleted || "ลบ" === deleted)return ! 1;
    var type = String(row.type || "").trim().toLowerCase(), label = String(row.typeLabel || "").trim();
    return"letter" !== type && "หนังสือ" !== label && "หนังสือติดตามมติ" !== label
  })
}
function _caseMeetingHistoryKeyCurrent_(value) {
  return String(null == value ? "": value).replace(/\s+/g, " ").trim()
}
function _caseMeetingHistoryTypeCurrent_(log) {
  log = log || {
  };
  var raw = _caseMeetingHistoryKeyCurrent_(log.meetingType || log.committeeType || log.type || log.meetingGroup || log["ประเภทการประชุม"] || ""), sub = _caseMeetingHistoryKeyCurrent_(log.subcommitteeName || log.subcommittee || log.subCommitteeName || log["คณะอนุกรรมาธิการ"] || "");
  if(/อนุกรรมาธิการ/.test(raw) || sub)return"คณะอนุกรรมาธิการ";
  return"คณะกรรมาธิการ"
}
function _caseMeetingHistoryTextCurrent_(log) {
  log = log || {
  };
  function cleanPart(v) {
    return _caseMeetingHistoryKeyCurrent_(v).replace(/^ครั้งที่\s*/i, "").replace(/^ครั้งประชุม\s*/i, "").trim()
  }
  var round = cleanPart(log.round || log.meetingRound || log.meetingNo || log.relatedMeetingNo || log.roundNo || log["ครั้งที่"] || log["ครั้งที่ประชุม"] || log["การประชุมครั้งที่"] || ""), dateRaw = log.date || log.meetingDate || log.relatedMeetingDate || log.dateRaw || log["วันที่ประชุม"] || log["วันประชุม"] || "", date = _caseMeetingHistoryKeyCurrent_(_committeeMeetingDateText_(dateRaw) || dateRaw), parts = [];
  round && parts.push("ครั้งที่ " + round);
  date && parts.push("วันที่ประชุม " + date);
  return parts.join(" / ")
}
function _caseMeetingHistoryIndexCurrent_() {
  var idx = {
  };
  function put(key, kind, text) {
    if(key = _caseMeetingHistoryKeyCurrent_(key), text = _caseMeetingHistoryKeyCurrent_(text), key && text) {
      var slot = idx[key] || (idx[key] = {
        committee: [], subcommittee: []
      }), arr = slot[kind] || (slot[kind] = []);
      arr.indexOf(text) < 0 && arr.push(text)
    }
  }
  var logs = [];
  try {
    logs = _appIsFnName_("_meetingHistoryProjectedRows_") ? _meetingHistoryProjectedRows_(): []
  }
  catch(_histErr) {
    _appIsFnName_("_recordWarning_") && _recordWarning_("case.report.meetingHistory.read", _histErr), logs = []
  }
  return(Array.isArray(logs) ? logs: []).forEach(function(log) {
    log = log || {
    };
    try {
      if(_appIsFnName_("isSoftDeletedRow_") && isSoftDeletedRow_(log))return
    }
    catch(_delErr) {
      _appIgnore_(_delErr, "case.report.meetingHistory.deletedCheck")
    }
    var kind = "คณะอนุกรรมาธิการ" === _caseMeetingHistoryTypeCurrent_(log) ? "subcommittee": "committee", text = _caseMeetingHistoryTextCurrent_(log);
    text && [log.caseId, log.id, log.caseNum, log.caseNo, log.recNo, log.receiveNo, log.title, log.caseTitle, log.considerationTitle, log.subject, log.note, log.summary, [log.title, log.caseTitle, log.considerationTitle].filter(Boolean).join(" ")].forEach(function(k) {
      put(k, kind, text);
      var compactKey = _caseMeetingHistoryKeyCurrent_(k).replace(/[\s ​-‍﻿]/g, "");
      compactKey && put(compactKey, kind, text)
    })
  }), idx
}
function _caseAttachMeetingHistoryCurrent_(rows) {
  rows = Array.isArray(rows) ? rows: [];
  var idx = _caseMeetingHistoryIndexCurrent_();
  function merged(row, kind) {
    var out = [];
    return[row.caseId, row.id, row.caseNum, row.caseNo, row.recNo, row.receiveNo, row.title, row.caseTitle, row.considerationTitle, row.subject, row.combinedTitle, [row.title, row.caseTitle, row.considerationTitle].filter(Boolean).join(" ")].forEach(function(k) {
      var key = _caseMeetingHistoryKeyCurrent_(k), compactKey = key.replace(/[\s ​-‍﻿]/g, ""), slots = [idx[key], idx[compactKey]];
      slots.forEach(function(slot) {
        (slot && slot[kind] || []).forEach(function(v) {
          out.indexOf(v) < 0 && out.push(v)
        })
      })
    }), out.join("\n")
  }
  return rows.map(function(row) {
    var comm = merged(row = row || {
    }, "committee"), sub = merged(row, "subcommittee");
    return comm && (row.committeeHistory = comm, row.committeeMeeting = comm, row["คณะกรรมาธิการ"] = comm), sub && (row.subcommitteeHistory = sub, row.subcommitteeMeeting = sub, row["คณะอนุกรรมาธิการ"] = sub), row
  })
}
function _caseReportMatchRows_(payload) {
  payload = payload || {
  };
  var projectedFields = ! 0 === payload.compactReadModel ? _caseSearchCompactProjectedFields_(): _caseSearchProjectedFields_(), rows = _appIsFnName_("_caseReadMainDataRowsForSearch_") ? _caseReadMainDataRowsForSearch_(projectedFields, payload): [];
  rows = (Array.isArray(rows) ? rows: []).map(function(row) {
    return _appIsFnName_("_caseSearchEnsureReceiveNo_") ? _caseSearchEnsureReceiveNo_(row || {
    }): row || {
    }
  }), ! 0 === payload.includeMeetingHistory && _appIsFnName_("_caseAttachMeetingHistoryCurrent_") && (rows = _caseAttachMeetingHistoryCurrent_(rows));
  var query = _normalizeSearchText_(payload.query || payload.q || payload.keyword || ""), reportType = String(payload.reportType || payload.groupType || payload.type || "all").toLowerCase().trim(), reportValue = String(payload.reportValue || payload.groupValue || payload.value || "").trim();
  function rowMatchesQuery(r) {
    return ! query || [r.caseNum, r.recNo, r.receiveNo, r.title, r.subject, r.caseTitle, r.considerationTitle, r.petitioners, r.petitionerName, r.status, r.assignees, r.staffs, r.coAssignees, r.subCat, r.cat, r.agencyName, r.respondent].some(function(v) {
      return - 1 !== _normalizeSearchText_(v).indexOf(query)
    })
  }
  function rowMatchesGroup(r) {
    return ! reportValue || ("cat" === reportType ? String(r.cat || r.caseType || "") === reportValue: "sub" === reportType ? String(r.subCat || r.subCategory || r.issue || "") === reportValue: "comm" === reportType ?- 1 !== String(r.assignees || r.owner || "").indexOf(reportValue): "status" === reportType ? String(r.status || "") === reportValue: [r.caseNum, r.recNo, r.title, r.caseTitle, r.petitioners, r.respondent, r.status, r.cat, r.subCat, r.assignees, r.staffs, r.coAssignees].some(function(v) {
      return - 1 !== String(null == v ? "": v).indexOf(reportValue)
    }))
  }
  return rows = rows.filter(rowMatchesQuery).filter(rowMatchesGroup).filter(function(row) {
    var type = String(row.type || "").trim().toLowerCase(), label = String(row.typeLabel || "").trim();
    return"letter" !== type && "หนังสือ" !== label && "หนังสือติดตามมติ" !== label
  }), _appIsFnName_("_requestScopePut_") && (rows = _requestScopePut_("caseReportRows", "MainData.recDate.directOwner", rows) || rows), rows.slice()
}
function _uniqueValuesFromRows_(rows, key) {
  rows = Array.isArray(rows) ? rows: [];
  var seen = {
  }, out = [];
  return rows.forEach(function(r) {
    String(r && r[key] || "").split(",").map(function(v) {
      return String(v || "").trim()
    }).filter(Boolean).forEach(function(v) {
      seen[v] || (seen[v] = 1, out.push(v))
    })
  }), out.sort(function(a, b) {
    return a.localeCompare(b, "th")
  }), out
}
function _caseSortRowsForSearch_(rows, payload) {
  payload = payload || {
  }, rows = Array.isArray(rows) ? rows: [];
  var sortBy = String(payload.sortBy || "caseNum").trim() || "caseNum", sortDir = "desc" === String(payload.sortDir || "asc").toLowerCase() ?- 1: 1;
  return rows.slice().sort(function(a, b) {
    function sortValue(row) {
      if("caseNum" === sortBy || "caseNo" === sortBy || "runningNo" === sortBy || "ลำดับเรื่อง" === sortBy) {
        var raw, m = String(row && (row.caseNum || row.caseNo || row.runningNo || row["ลำดับเรื่อง"]) || "").replace(/^'+/, "").trim().match(/^\d+/);
        return m ? Number(m[0]): Number.POSITIVE_INFINITY
      }
      if("recNo" === sortBy || "receiveNo" === sortBy || "เลขรับเรื่อง" === sortBy) {
        var rn, rm = String(row && (row.recNo || row.receiveNo || row["เลขรับเรื่อง"]) || "").replace(/^'+/, "").trim().match(/^\d+/);
        return rm ? Number(rm[0]): Number.POSITIVE_INFINITY
      }
      return row && row[sortBy]
    }
    var av = sortValue(a), bv = sortValue(b);
    return"number" == typeof av && "number" == typeof bv && isFinite(av) && isFinite(bv) && av !== bv ? (av - bv) * sortDir: String(null == av ? "": av).localeCompare(String(null == bv ? "": bv), "th") * sortDir
  })
}
function _caseBuildSearchIndexSummary_(rows) {
  rows = Array.isArray(rows) ? rows: [];
  var byStatus = {
  }, byType = {
  }, byFy = {
  }, recNoCount = 0, caseNoCount = 0;
  return rows.forEach(function(row) {
    row = row || {
    };
    var status = String(row.status || row.statusText || row["สถานะเรื่อง"] || "ไม่ระบุ").trim() || "ไม่ระบุ", type = String(row.category || row.caseType || row.typeName || row["ประเภท"] || "ไม่ระบุ").trim() || "ไม่ระบุ", fy = String(row.fy || row.fiscalYear || row.budgetFy || row["ปีงบประมาณ"] || "").replace(/[^0-9]/g, "") || "ไม่ระบุ";
    byStatus[status] = Number(byStatus[status] || 0) + 1, byType[type] = Number(byType[type] || 0) + 1, byFy[fy] = Number(byFy[fy] || 0) + 1, String(row.recNo || row.receiveNo || row["เลขรับเรื่อง"] || "").trim() && recNoCount ++ , String(row.caseNum || row.caseNo || row.runningNo || row["ลำดับเรื่อง"] || "").trim() && caseNoCount ++
  }), {
    ok: ! 0, modelId: "case-search-index-current", totalRecords: rows.length, byStatus: byStatus, byType: byType, byFiscalYear: byFy, recNoCoverage: recNoCount, caseNoCoverage: caseNoCount, generatedAt: (new Date).toISOString()
  }
}
function _caseSearchReadModel_(payload) {
  if(payload = payload || {
  }, "undefined" != typeof AppDataService && AppDataService && AppDataService.readCaseSearchModel)return AppDataService.readCaseSearchModel(payload);
  throw new Error("APP_DATA_SERVICE_UNAVAILABLE: case search read model")
}
function _caseSearchReportFacets_(payload) {
  payload = payload || {
  };
  var started = Date.now(), allowCache =! 0 !== payload.forceFresh &&! 0 !== payload.noCache &&! 0 !== payload.bypassCache, cacheKey = "case_report_facets_recdate_v4_" + _buildDigestHex_(JSON.stringify({
    query: _normalizeSearchText_(payload.query || payload.q || payload.keyword || ""), reportType: String(payload.reportType || payload.groupType || payload.type || "all").toLowerCase().trim(), reportValue: String(payload.reportValue || payload.groupValue || payload.value || "").trim(), cacheStamp: _appIsFnName_("_entityCacheStamp_") ? _entityCacheStamp_("maindata"): "1"
  }));
  if(allowCache && _appIsFnName_("_cacheGetJson_")) {
    var hit = _cacheGetJson_(cacheKey);
    if(hit)return hit.cacheHit =! 0, hit.cacheStatus = "hit", hit.durationMs = Math.max(0, Date.now() - started), hit.rowsRead = 0, hit
  }
  var model = _caseSearchReadModel_(Object.assign({
  }, payload, {
    forOptions: ! 0, noPage: ! 0, forceFresh: ! allowCache, noCache: ! allowCache, bypassCache: ! allowCache
  })), rows = Array.isArray(model.rows) ? model.rows: [], data = {
    filteredTotal: rows.length, reportType: String(payload.reportType || "all"), query: String(payload.query || payload.q || payload.keyword || ""), cat: _uniqueValuesFromRows_(rows, "cat"), sub: _uniqueValuesFromRows_(rows, "subCat"), comm: _uniqueValuesFromRows_(rows, "assignees"), status: _uniqueValuesFromRows_(rows, "status"), generatedAt: (new Date).toISOString(), source: "CaseReportFacets.cached", readModel: "CaseSearchReadModel.MainData.recDate.owner", cacheHit: ! 1, cacheStatus: "miss", rowsRead: Number(model.rowsRead || rows.length || 0), durationMs: Math.max(0, Date.now() - started)
  };
  if(allowCache && _appIsFnName_("_cachePutJson_"))try {
    _cachePutJson_(cacheKey, data, Math.max(60, Math.min(Number(payload.cacheTtlSeconds || 180) || 180, 300)))
  }
  catch(_facetCacheErr) {
    _appIsFnName_("_recordWarning_") && _recordWarning_("case.facets.cachePut", _facetCacheErr)
  }
  return data
}
AppDomain.Repositories = AppDomain.Repositories || {
};
// ===== DOMAIN PHYSICAL: DASHBOARD READ MODEL =====
function _dashboardEmptyStatsPayload_(reason) {
  return {
    total: 0, pending: 0, completed: 0, overdueLetters: 0, soonOverdue: 0, s0: 0, s1: 0, s2: 0, s3: 0, s4: 0, s5: 0, s6: 0, s7: 0, s8: 0, meetings: {
      total: 0, recent: 0, byResult: []
    }, byType: [], byTopic: [], statusRows: [], generatedAt: (new Date).toISOString(), degraded: !! reason, errorCode: reason ? "DASHBOARD_STATS_DEGRADED": ""
  }
}
function _dashboardStatsHasDashboardData_(stats) {
  function hasList(list) {
    return Array.isArray(list) && list.some(function(x) {
      return Number(x && (x.count || x.total || x.value) || 0) > 0
    })
  }
  var letters = (stats = stats || {
  }).letters || {
  }, meetings = stats.meetings || {
  };
  return Number(stats.total || stats.totalCases || 0) > 0 || hasList(stats.byType) || hasList(stats.byTopic) || hasList(stats.statusRows) || Number(letters.total || 0) > 0 || Number(meetings.total || 0) > 0
}
function _dashboardEmptyBudgetPayload_(reason) {
  return {
    fy: _appIsFnName_("_currentBudgetFyString_") ? _currentBudgetFyString_(): "", totalBudget: 0, totalPaid: 0, totalRemain: 0, byPlan: [], plans: [], rows: [], statusSummary: {
      refund: {
        total: 0, pending: 0
      }, report: {
        total: 0, pending: 0
      }
    }, generatedAt: (new Date).toISOString(), degraded: !! reason, errorCode: reason ? "DASHBOARD_BUDGET_DEGRADED": ""
  }
}
function _dashboardText_(value) {
  return null == value ? "": "[object Date]" === Object.prototype.toString.call(value) ? isNaN(value.getTime()) ? "": value.toISOString(): String(value).replace(/[\u00A0\u200B-\u200D\uFEFF]/g, " ").replace(/\s+/g, " ").trim()
}
function _dashboardStrictTitleText_(value) {
  var txt = _dashboardText_(value);
  if(! txt)return"";
  var compact = txt.replace(/[\s\u00A0\u1680\u180E\u2000-\u200F\u2028\u2029\u202F\u205F\u2060\u3000\uFEFF]/g, "");
  return ! compact || "-" === compact || "—" === compact || "–" === compact || "_" === compact || "." === compact || "…" === compact || /^null$/i.test(compact) || /^undefined$/i.test(compact) || /^n\/?a$/i.test(compact) || /^na$/i.test(compact) ? "": txt
}
function _dashboardMeetingAgendaTitle_(row) {
  return _dashboardStrictTitleText_((row = row || {
  }).title)
}
function _dashboardThaiDateText_(value) {
  return _appThaiDateText_(value)
}
function _dashboardNum_(value) {
  var n = Number(String(null == value ? 0: value).replace(/,/g, ""));
  return isFinite(n) ? n: 0
}
function _dashboardDate_(value) {
  if(! value)return null;
  if("[object Date]" === Object.prototype.toString.call(value))return isNaN(value.getTime()) ? null: value;
  var raw = String(value || "").trim();
  if(! raw)return null;
  var m = raw.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
  if(m) {
    var y = Number(m[3]);
    y > 2400 && (y -= 543);
    var d = new Date(y, Number(m[2]) - 1, Number(m[1]));
    return isNaN(d.getTime()) ? null: d
  }
  var d2 = new Date(raw);
  return isNaN(d2.getTime()) ? null: d2
}
function _routerDashboardProjectedFields_(sheetName) {
  var map;
  return({
    MainData: ["caseId", "id", "caseNum", "recNo", "title", "caseTitle", "petitioners", "petitionerName", "cat", "subCat", "issue", "topic", "subject", "status", "caseStatus", "processStatus", "resultStatus", "currentStatus", "statusText", "caseState", "workflowStatus", "meetingStatus", "caseType", "type", "category", "caseCategory", "subjectType", "topicName", "considerIssue", "caseIssue", "caseSubject", "สถานะเรื่อง", "สถานะเรื่องพิจารณา", "สถานะ", "สถานะพิจารณา", "สถานะปัจจุบัน", "ผลการพิจารณา", "สถานะการพิจารณา", "ประเภทเรื่อง", "ประเภท", "ประเด็นพิจารณา", "ประเด็น", "updatedAt", "createdAt", "isDeleted", "deletedAt"], Letters: ["letterId", "caseId", "letterNo", "bookNo", "letterDate", "subject", "issue", "dueDate", "extendDate", "letterStatus", "status", "trackStatus", "updatedAt", "createdAt", "isDeleted", "deletedAt"], CommitteeMeetings: ["meetingId", "id", "meetingNo", "meetingNumber", "no", "roundNo", "ครั้งที่", "ครั้งประชุม", "การประชุมครั้งที่", "meetingDate", "date", "วันที่ประชุม", "วันประชุม", "title", "หัวข้อ", "เรื่อง", "status", "สถานะ", "note", "หมายเหตุ", "createdAt", "updatedAt", "isDeleted", "deletedAt"], CommitteeMeetingAgendaItems: ["itemId", "id", "meetingId", "agendaNo", "agenda", "วาระ", "title", "caseTitle", "ชื่อเรื่อง", "เรื่อง", "เรื่องพิจารณา", "caseId", "agencyOrPresenter", "หน่วยงาน", "ผู้เสนอ", "result", "ผลการประชุม", "มติ", "note", "หมายเหตุ", "createdAt", "updatedAt", "isDeleted", "deletedAt"]
  }
  [String(sheetName || "")] || []).slice()
}
function _dashboardSafeRows_(sheetName, options) {
  options = options || {
  }, sheetName = String(sheetName || "").trim();
  var ttl = Math.max(15, Math.min(Number(options.ttl || 60) || 60, 300)), errors = [];
  function note(label, err) {
    var msg = label + ": " + String(err && err.message ? err.message: err || "unknown");
    errors.push(msg);
    try {
      _appIsFnName_("_recordWarning_") && _recordWarning_("dashboard.cg.projected." + label + "." + sheetName, err)
    }
    catch(_e) {
      _appIsFnName_("_recordWarning_") ? _recordWarning_("ec", _e): _appIsFnName_("_logWarn_") ? _logWarn_("ec", {
        error: String(_e && _e.message || _e)
      }): void _e
    }
  }
  var clean = __Code_20_Router_clean;
  function __Code_20_Router_clean(list) {
    return(list = Array.isArray(list) ? list: []).filter(function(row) {
      return row &&! ("function" == typeof isSoftDeletedRow_ ? isSoftDeletedRow_(row): ! 0 === row.isDeleted || "true" === String(row.isDeleted || "").toLowerCase() || row.deletedAt)
    })
  }
  function done(list) {
    return clean(list)
  }
  try {
    if(_appIsFnName_("_dashboardRowsCached_")) {
      var rows = done(_dashboardRowsCached_(sheetName, null) || []);
      if(rows.length)return rows
    }
  }
  catch(_dashRowsErr) {
    note("rowsCached", _dashRowsErr)
  }
  try {
    if("MainData" === sheetName && _appIsFnName_("_listMainDataRows_")) {
      var caseRows = done(_listMainDataRows_(! 1) || []);
      if(caseRows.length)return caseRows
    }
    if("Letters" === sheetName && _appIsFnName_("_trackingReadLettersRows_")) {
      var letterRows = done(_trackingReadLettersRows_() || []);
      if(letterRows.length)return letterRows
    }
  }
  catch(_domainRowsErr) {
    note("domainProjectedRows", _domainRowsErr)
  }
  try {
    if("function" == typeof readSheetProjectedObjectsCached_) {
      var fields = _routerDashboardProjectedFields_(sheetName);
      if(fields && fields.length) {
        var projectedRows = done(readSheetProjectedObjectsCached_(sheetName, fields, {
          includeDeleted: ! 1, requireCanonical: ! 1, ttl: ttl
        }) || []);
        if(projectedRows.length)return projectedRows
      }
    }
  }
  catch(_projectedErr) {
    note("projectedReader", _projectedErr)
  }
  if(errors.length &&! 0 === options.failOnError)throw new Error("DASHBOARD_PROJECTED_ROWS_FAILED: " + sheetName + ": " + errors.join(" | "));
  return[]
}
function _dashboardRequestRows_(sheetName, options) {
  options = options || {
  }, sheetName = String(sheetName || "").trim();
  var cacheKey = JSON.stringify({
    sheetName: sheetName, ttl: Math.max(15, Math.min(Number(options.ttl || 60) || 60, 300)), failOnError: ! 0 === options.failOnError, allowEmpty: ! 0 === options.allowEmpty
  });
  try {
    if(_appIsFnName_("_requestScopeGet_")) {
      var hit = _requestScopeGet_("dashboardSafeRows", cacheKey);
      if(hit && Array.isArray(hit.rows))return hit.rows.slice()
    }
  }
  catch(_requestHitErr) {
    _appIsFnName_("_recordWarning_") && _recordWarning_("dashboard.requestRows.hit." + sheetName, _requestHitErr)
  }
  var started = Date.now(), rows = _dashboardSafeRows_(sheetName, options), entry = {
    rows: (rows = Array.isArray(rows) ? rows: []).slice(), meta: {
      sheetName: sheetName, rowsRead: rows.length, durationMs: Math.max(0, Date.now() - started), source: "dashboard-request-scope-current"
    }
  };
  try {
    _appIsFnName_("_requestScopePut_") && _requestScopePut_("dashboardSafeRows", cacheKey, entry)
  }
  catch(_requestPutErr) {
    _appIsFnName_("_recordWarning_") && _recordWarning_("dashboard.requestRows.put." + sheetName, _requestPutErr)
  }
  return rows.slice()
}
function _dashboardCaseStatusValue_(row) {
  if(! row)return"";
  if("object" != typeof row || Array.isArray(row))return _dashboardText_(row);
  try {
    if(_appIsFnName_("_dashboardPickCaseStatus_")) {
      var picked = _dashboardPickCaseStatus_(row);
      if(picked)return picked
    }
  }
  catch(_pickErr) {
    _appIsFnName_("_recordWarning_") ? _recordWarning_("ec", _pickErr): _appIsFnName_("_logWarn_") ? _logWarn_("ec", {
      error: String(_pickErr && _pickErr.message || _pickErr)
    }): void _pickErr
  }
  for(var keys = ["สถานะเรื่อง", "สถานะเรื่องพิจารณา", "สถานะ", "สถานะพิจารณา", "สถานะปัจจุบัน", "ผลการพิจารณา", "สถานะการพิจารณา", "caseStatus", "status", "processStatus", "resultStatus", "currentStatus", "statusText", "caseState", "workflowStatus", "meetingStatus", "colStatus", "col10", "col11", "col12"], i = 0;
  i < keys.length;
  i ++ ) {
    var value = row[keys[i]];
    if(null != value && String(value).trim())return String(value).trim()
  }
  return""
}
function _dashboardCaseStatusKey_(status) {
  var raw, compact = _dashboardText_(status).replace(/\s+/g, "");
  return compact ? /จัดทำรายงาน|รายงาน/.test(compact) ? "s7": /ไม่รับเรื่อง|ไม่รับ/.test(compact) ? "s8": /ยุติ|ปิดเรื่อง|เสร็จสิ้น|สำเร็จ/.test(compact) ? "s6": /ส่ง.*หน่วยงาน|หน่วยงาน.*เกี่ยวข้อง|ติดตาม/.test(compact) ? "s5": /(อนุฯ|อนุกรรมาธิการ|คณะอนุกรรมาธิการ)/.test(compact) ? "s2": /(กมธ|กรรมาธิการ|คณะกรรมาธิการ)/.test(compact) ? "s4": /รอ|รอบรรจุ|ค้างพิจารณา/.test(compact) ? "s3": /เรื่องเข้าใหม่|ได้รับเรื่อง|เรื่องใหม่/.test(compact) ? "s0": /รับเรื่อง|รับเข้า|^รับ$/.test(compact) ? "s1": "": ""
}
function _dashboardTopRows_(map, limit) {
  return Object.keys(map || {
  }).map(function(label) {
    return {
      label: label, count: _dashboardNum_(map[label])
    }
  }).filter(function(x) {
    return x.count > 0
  }).sort(function(a, b) {
    return b.count - a.count || String(a.label || "").localeCompare(String(b.label || ""), "th")
  }).slice(0, Math.max(1, Number(limit || 10) || 10))
}
function _dashboardType_(row) {
  var raw = _dashboardText_((row = row || {
  }).cat || row.caseType || row.type || row.category || row.caseCategory || row.subjectType || row["ประเภทเรื่อง"] || row["ประเภท"] || row.col2);
  if(! raw)return"ไม่ระบุประเภท";
  var compact = raw.replace(/\s+/g, "");
  return/ร้องเรียน|ผู้ร้อง|ร้องทุกข์/.test(compact) ? "เรื่องร้องเรียน": /ประธานสภา/.test(compact) ? "ประธานสภาผู้แทนราษฎรมอบหมาย": /สภาผู้แทนราษฎร/.test(compact) && /มอบหมาย/.test(compact) ? "สภาผู้แทนราษฎรมอบหมาย": /กรรมาธิการ/.test(compact) && /ญัตติ/.test(compact) ? "กรรมาธิการเสนอญัตติ": raw
}
function _dashboardTopic_(row) {
  var raw = _dashboardText_((row = row || {
  }).subCat || row.subCategory || row["ประเด็นพิจารณา"] || row["ประเด็น"] || row.issue || row.topic || row.topicName || row.considerIssue || row.caseIssue || row.col3 || row.col7);
  return raw ? raw.length > 70 ? raw.substring(0, 70) + "…": raw: "ไม่ระบุประเด็น"
}
function _routerDashboardMeetingNoValue_(row) {
  var meetingNo = _dashboardText_((row = row || {
  }).meetingNo || "");
  return meetingNo ? meetingNo = meetingNo.replace(/^\s*(ครั้งที่|ครั้งประชุม)\s*/, "").replace(/\s+/g, " ").trim(): ""
}
function _routerDashboardMeetingRoundKey_(row) {
  var meetingNo = _routerDashboardMeetingNoValue_(row);
  return meetingNo ? "meetingNo:" + meetingNo: ""
}
function _dashboardMeetingSessionKey_(row) {
  return _routerDashboardMeetingRoundKey_(row = row || {
  })
}
function _dashboardMeetingTitleText_(row) {
  return _dashboardStrictTitleText_((row = row || {
  }).title || row.caseTitle || row.subject || "")
}
function _dashboardMeetingNoTitleSummary_(rows) {
  rows = Array.isArray(rows) ? rows: [];
  var cutoff = new Date;
  cutoff.setDate(cutoff.getDate() - 30), cutoff.setHours(0, 0, 0, 0);
  var sessionMap = {
  }, recentSessionMap = {
  }, titleCount = 0;
  rows.forEach(function(row) {
    var sessionKey = _dashboardMeetingSessionKey_(row = row || {
    });
    sessionKey && (sessionMap[sessionKey] =! 0);
    var d = _dashboardDate_(row.meetingDate || row.date || row["วันที่ประชุม"] || row.updatedAt || row.createdAt);
    d && d >= cutoff && sessionKey && (recentSessionMap[sessionKey] =! 0), _dashboardMeetingTitleText_(row) && titleCount ++
  });
  var totalMeetings = Object.keys(sessionMap).length, recent = Object.keys(recentSessionMap).length;
  return {
    total: totalMeetings, totalMeetings: totalMeetings, meetingCount: totalMeetings, recent: recent, recentMeetings: recent, totalItems: titleCount, itemTotal: titleCount, totalCasesDiscussed: titleCount, subjectCount: titleCount, byResult: [], generatedAt: (new Date).toISOString(), source: "dashboard-current-meetingNo-title-strict"
  }
}
function _dashboardCommitteeMeetingDashboard_(payload) {
  payload = payload || {};
  var ttl = !0 === payload.forceFresh ? 0: payload.cacheTtlSeconds || 60, includeRows = !0 === payload.includeMeetingRows, meetings = _dashboardRequestRows_("CommitteeMeetings", {
    ttl: ttl, failOnError: !1, allowEmpty: !0
  }).filter(function(row) {
    return !(row && (!0 === row.isDeleted || "true" === String(row.isDeleted || "").toLowerCase()))
  }), meetingMap = {};
  includeRows && meetings.forEach(function(meeting) {
    meeting = meeting || {};
    meetingMap[String(meeting.meetingId || "")] = meeting
  });
  var rows = [], itemCount = 0;
  _dashboardRequestRows_("CommitteeMeetingAgendaItems", {
    ttl: ttl, failOnError: !1, allowEmpty: !0
  }).forEach(function(item) {
    if(!0 !== (item = item || {}).isDeleted && "true" !== String(item.isDeleted || "").toLowerCase() && !item.deletedAt) {
      var title = _dashboardMeetingAgendaTitle_(item);
      if(title) {
        itemCount++;
        if(includeRows) {
          var meeting = meetingMap[String(item.meetingId || "")] || {};
          rows.push({
            meetingId: String(item.meetingId || ""), meetingNo: _dashboardText_(meeting.meetingNo || ""), meetingDate: _dashboardThaiDateText_(meeting.meetingDate || ""), title: title, agencyOrPresenter: _dashboardText_(item.agencyOrPresenter || ""), agendaNo: _dashboardText_(item.agendaNo || item.agenda || ""), source: "CommitteeMeetingAgendaItems.title.nonblank"
          })
        }
      }
    }
  });
  var summary = _dashboardMeetingNoTitleSummary_(meetings);
  return summary.totalItems = itemCount, summary.itemTotal = itemCount, summary.totalCasesDiscussed = itemCount, summary.subjectCount = itemCount, summary.source = "dashboard-committee-meetingNo-title-nonblank-strict-current", summary.meetingItemSource = "CommitteeMeetingAgendaItems.title.nonblank", {
    rows: rows, meetingRows: includeRows ? meetings: [], summary: summary
  }
}
function _dashboardLetterDateOnly_(value) {
  if(! value && 0 !== value)return null;
  try {
    if(value instanceof Date) {
      var direct = new Date(value.getFullYear(), value.getMonth(), value.getDate());
      return direct.setHours(0, 0, 0, 0), direct
    }
    var text = String(null == value ? "": value).replace(/[\u200B-\u200D\uFEFF]/g, "").trim();
    if(! text)return null;
    var m = text.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    if(m) {
      var y = Number(m[1]);
      y > 2400 && (y -= 543);
      var d1 = new Date(y, Number(m[2]) - 1, Number(m[3]));
      if(! isNaN(d1.getTime()))return d1.setHours(0, 0, 0, 0), d1
    }
    if(m = text.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})$/)) {
      var yy = Number(m[3]);
      yy < 100 && (yy += 2500), yy > 2400 && (yy -= 543);
      var d2 = new Date(yy, Number(m[2]) - 1, Number(m[1]));
      if(! isNaN(d2.getTime()))return d2.setHours(0, 0, 0, 0), d2
    }
    var d = new Date(text);
    return isNaN(d.getTime()) ? null: (d.getFullYear() > 2400 && (d = new Date(d.getFullYear() - 543, d.getMonth(), d.getDate())), d.setHours(0, 0, 0, 0), d)
  }
  catch(_dateErr) {
    return _appIsFnName_("_recordWarning_") && _recordWarning_("dashboard.letter.dateOnly", _dateErr), null
  }
}
function _dashboardLetterIsReceived_(status) {
  var st = _dashboardText_(status).replace(/\s+/g, "");
  return/ได้รับแล้ว|ได้รับตอบกลับแล้ว|ตอบกลับแล้ว|ตอบแล้ว|เสร็จสิ้น|เสร็จ|รายงานแล้ว/.test(st)
}
function _dashboardLetterSummary_(rows) {
  rows = Array.isArray(rows) ? rows: [];
  var today = new Date;
  today.setHours(0, 0, 0, 0);
  var out = {
    total: rows.length, notDue: 0, overdue: 0, received: 0, soonDue: 0
  };
  return rows.forEach(function(row) {
    var status;
    if(_dashboardLetterIsReceived_((row = row || {
    }).letterStatus || row.status || row.trackStatus || row["สถานะ"] || row["สถานะหนังสือ"] || ""))return out.received ++ , void 0;
    var due = _dashboardLetterDateOnly_(row.extendDate || row["ขยายเวลา"] || row["วันที่ขยายเวลา"] || row.dueDate || row["วันครบกำหนดตอบ"] || row["ครบกำหนด"] || row["กำหนดตอบ"] || row["วันครบกำหนด"]);
    if(! due)return out.notDue ++ , void 0;
    var diff = Math.round((due.getTime() - today.getTime())/864e5);
    if(diff <= 0)return out.overdue ++ , void 0;
    diff <= 7 && out.soonDue ++ , out.notDue ++
  }), out
}
function _dashboardStatsDirect_(payload) {
  var caseRows = _dashboardRequestRows_("MainData", {
    ttl: (payload = payload || {
    }).cacheTtlSeconds || 60, failOnError: ! 0, allowEmpty: ! 0
  }), letterRows = _dashboardRequestRows_("Letters", {
    ttl: payload.cacheTtlSeconds || 60, failOnError: ! 0, allowEmpty: ! 0
  }), committeeMeetingDashboard = _dashboardCommitteeMeetingDashboard_(payload || {
  }), meetingRows = Array.isArray(committeeMeetingDashboard.rows) ? committeeMeetingDashboard.rows: [], meetingNoRows = Array.isArray(committeeMeetingDashboard.meetingRows) ? committeeMeetingDashboard.meetingRows: [], stats = _dashboardEmptyStatsPayload_("dashboard-direct-current");
  stats.degraded =! 1, stats.errorCode = "", stats.total = caseRows.length;
  var statusLabels = {
    s0: "เรื่องเข้าใหม่", s8: "ไม่รับเรื่อง", s2: "อนุฯ พิจารณา", s3: "รอพิจารณา", s4: "กมธ. พิจารณา", s6: "ยุติเรื่อง", s5: "ส่งหน่วยงาน", s7: "จัดทำรายงาน"
  }, typeMap = {
  }, topicMap = {
  }, unknownStatus = 0;
  caseRows.forEach(function(row) {
    var statusValue, key = _dashboardCaseStatusKey_(_dashboardCaseStatusValue_(row = row || {
    }));
    key ? stats[key] = _dashboardNum_(stats[key]) + 1: unknownStatus ++ ;
    var typeName = _dashboardType_(row), topic = _dashboardTopic_(row);
    typeMap[typeName] = (typeMap[typeName] || 0) + 1, topicMap[topic] = (topicMap[topic] || 0) + 1
  }), stats.byType = _dashboardTopRows_(typeMap, 20), stats.byTopic = _dashboardTopRows_(topicMap, 10), stats.statusRows = Object.keys(statusLabels).map(function(key) {
    return {
      key: key, label: statusLabels[key], count: _dashboardNum_(stats[key])
    }
  }), unknownStatus && stats.statusRows.push({
    key: "unknown", label: "ไม่ระบุสถานะ", count: unknownStatus
  }), stats.completed = _dashboardNum_(stats.s6) + _dashboardNum_(stats.s7) + _dashboardNum_(stats.s8), stats.pending = Math.max(stats.total - stats.completed, 0), stats.letters = _dashboardLetterSummary_(letterRows), stats.overdueLetters = _dashboardNum_(stats.letters.overdue), stats.soonOverdue = _dashboardNum_(stats.letters.soonDue), stats.meetings = committeeMeetingDashboard.summary || _dashboardMeetingNoTitleSummary_(meetingNoRows), stats.meetings.totalItems = _dashboardNum_(stats.meetings.totalItems || stats.meetings.itemTotal || meetingRows.length), stats.meetings.itemTotal = stats.meetings.totalItems, stats.meetings.totalCasesDiscussed = stats.meetings.totalItems, stats.meetings.subjectCount = stats.meetings.totalItems, stats.meetings.totalMeetings = _dashboardNum_(stats.meetings.totalMeetings || stats.meetings.total || 0), stats.meetings.meetingCount = stats.meetings.totalMeetings, stats.meetings.total = stats.meetings.totalMeetings, stats.meetings.recentMeetings = _dashboardNum_(stats.meetings.recentMeetings || stats.meetings.recent || 0), stats.meetings.recent = stats.meetings.recentMeetings, stats.meetings.source = "dashboard-current-CommitteeMeetings-meetingNo-title-nonblank-only", stats.meetings.strictKpi =! 0, stats.meetings.archivedDirectRead =! 1, stats.totalMeetings = _dashboardNum_(stats.meetings.totalMeetings), stats.recentMeetings = _dashboardNum_(stats.meetings.recentMeetings || stats.meetings.recent), stats.meetingItemTotal = _dashboardNum_(stats.meetings.totalItems || stats.meetings.itemTotal || stats.meetings.totalCasesDiscussed || stats.meetings.subjectCount);
  var includeCaseRowsForDashboard =! 0 === payload.includeCases, includeMeetingRowsForDashboard =! 0 === payload.includeMeetingRows;
  stats.caseRows = includeCaseRowsForDashboard ? caseRows.slice(0, Math.max(1, Math.min(Number(payload.caseLimit || 30) || 30, 120))): [], stats.letterRows =! 0 === payload.includeLetters ? letterRows.slice(0, 100): [], stats.meetingRows = includeMeetingRowsForDashboard ? meetingRows.slice(0, 100): [], stats.meetingNoRows = includeMeetingRowsForDashboard ? meetingNoRows.slice(0, 100): [], stats.generatedAt = (new Date).toISOString();
  var requestMetrics = "function" == typeof getRequestScopeMetrics_ ? getRequestScopeMetrics_(): {
  };
  return stats.meta = {
    generatedAt: stats.generatedAt, source: "dashboard-current-strict-kpi-direct", dashboardKpiStrict: ! 0, performanceMode: "phase5-summary-kpi-first-paint", meetingSource: "CommitteeMeetings.meetingNo", meetingItemSource: "CommitteeMeetingAgendaItems.title.nonblank-strict", archivedMeetingLogsDirectRead: ! 1, cases: caseRows.length, letters: letterRows.length, meetings: meetingNoRows.length, meetingItems: meetingRows.length, caseRowsIncluded: includeCaseRowsForDashboard, meetingRowsIncluded: includeMeetingRowsForDashboard, cacheHit: ! (! requestMetrics ||! requestMetrics.cacheHit), cacheHits: Number(requestMetrics && requestMetrics.cacheHits || 0), cacheMisses: Number(requestMetrics && requestMetrics.cacheMisses || 0), rowsRead: Number(requestMetrics && requestMetrics.rowsRead || 0), cacheKinds: requestMetrics && requestMetrics.cacheKinds || {
    }
  }, stats.source = "dashboard-current-strict-kpi-direct", stats
}
function _dashboardStats_(payload) {
  return _dashboardStatsDirect_(payload || {
  })
}
function _dashboardCanonicalBundleDto_(stats, budgetData, caseData, cacheMeta) {
  budgetData = budgetData || {
  }, caseData = caseData || {
    rows: [], totalRecords: 0, totalPages: 1, page: 1, limit: 0
  }, cacheMeta = cacheMeta || {
  };
  var statsMeetingSummary = (stats = stats || {
  }).meetings && "object" == typeof stats.meetings ? stats.meetings: {
  }, strictMeetingRows = Array.isArray(stats.meetingNoRows) && stats.meetingNoRows.length ? stats.meetingNoRows: Array.isArray(stats.meetingRows) ? stats.meetingRows: [], strictMeetingSummary = strictMeetingRows.length ? _dashboardMeetingNoTitleSummary_(strictMeetingRows): {
    total: _dashboardNum_(statsMeetingSummary.totalMeetings || statsMeetingSummary.meetingCount || statsMeetingSummary.total || stats.totalMeetings), totalMeetings: _dashboardNum_(statsMeetingSummary.totalMeetings || statsMeetingSummary.meetingCount || statsMeetingSummary.total || stats.totalMeetings), meetingCount: _dashboardNum_(statsMeetingSummary.totalMeetings || statsMeetingSummary.meetingCount || statsMeetingSummary.total || stats.totalMeetings), recent: _dashboardNum_(statsMeetingSummary.recentMeetings || statsMeetingSummary.recent || stats.recentMeetings), recentMeetings: _dashboardNum_(statsMeetingSummary.recentMeetings || statsMeetingSummary.recent || stats.recentMeetings)
  }, strictAgendaItemTotal = _dashboardNum_(stats.meetingItemTotal || statsMeetingSummary.totalItems || statsMeetingSummary.itemTotal || statsMeetingSummary.totalCasesDiscussed || statsMeetingSummary.subjectCount);
  stats.meetings &&! 0 === stats.meetings.strictKpi && (strictAgendaItemTotal = _dashboardNum_(stats.meetings.totalItems || stats.meetings.itemTotal || stats.meetingItemTotal || strictAgendaItemTotal));
  var summary = {
    totalCases: Number(stats.total || 0), pendingCases: Number(stats.pending || 0), completedCases: Number(stats.completed || 0), overdueLetters: Number(stats.overdueLetters || 0), soonOverdue: Number(stats.soonOverdue || 0), totalMeetings: Number(strictMeetingSummary.totalMeetings || strictMeetingSummary.meetingCount || strictMeetingSummary.total || 0), recentMeetings: Number(strictMeetingSummary.recentMeetings || strictMeetingSummary.recent || 0), meetingItemTotal: Number(strictAgendaItemTotal || 0)
  }, canonicalMeetingStats = Object.assign({
    total: summary.totalMeetings, totalMeetings: summary.totalMeetings, meetingCount: summary.totalMeetings, recent: summary.recentMeetings, recentMeetings: summary.recentMeetings, totalItems: summary.meetingItemTotal, itemTotal: summary.meetingItemTotal, totalCasesDiscussed: summary.meetingItemTotal, byResult: []
  }, stats.meetings || {
  });
  canonicalMeetingStats.total = summary.totalMeetings, canonicalMeetingStats.totalMeetings = summary.totalMeetings, canonicalMeetingStats.meetingCount = summary.totalMeetings, canonicalMeetingStats.recent = summary.recentMeetings, canonicalMeetingStats.recentMeetings = summary.recentMeetings, canonicalMeetingStats.totalItems = summary.meetingItemTotal, canonicalMeetingStats.itemTotal = summary.meetingItemTotal, canonicalMeetingStats.totalCasesDiscussed = summary.meetingItemTotal, canonicalMeetingStats.meetingRows = Array.isArray(stats.meetingRows) ? stats.meetingRows.slice(0, 500): [], canonicalMeetingStats.meetingNoRows = Array.isArray(stats.meetingNoRows) ? stats.meetingNoRows.slice(0, 500): [];
  var dto = {
    contractStamp: "dashboard-canonical-dto-production-current", summary: summary, caseStats: {
      total: summary.totalCases, pending: summary.pendingCases, completed: summary.completedCases, statusRows: Array.isArray(stats.statusRows) ? stats.statusRows: [], rows: Array.isArray(caseData.rows) ? caseData.rows: [], totalRecords: Number(caseData.totalRecords || summary.totalCases || 0), page: Number(caseData.page || 1), limit: Number(caseData.limit || 0)
    }, typeStats: Array.isArray(stats.byType) ? stats.byType: [], issueStats: Array.isArray(stats.byTopic) ? stats.byTopic: [], trackingStats: stats.letters || {
      total: 0, notDue: 0, overdue: 0, received: 0, soonDue: 0
    }, meetingStats: canonicalMeetingStats, budgetStats: budgetData, charts: {
      byStatus: Array.isArray(stats.statusRows) ? stats.statusRows: [], byType: Array.isArray(stats.byType) ? stats.byType: [], byIssue: Array.isArray(stats.byTopic) ? stats.byTopic: [], byMeetingResult: []
    }, meta: Object.assign({
    }, stats.meta || {
    }, cacheMeta || {
    }, {
      generatedAt: (new Date).toISOString(), source: stats.meta && stats.meta.source || "dashboard-canonical-dto-production-current", noSilentEmpty: ! 0
    })
  };
  return dto.errorState = dto.meta.errorCode ? {
    code: dto.meta.errorCode, message: dto.meta.message || ""
  }
  : null, dto
}
function _dashboardBundleTtlSeconds_(payload) {
  var defaultTtl = _appIsFnName_("_appCacheTtl_") ? _appCacheTtl_("dashboardBundle", 240, 15, 300): 240;
  return Math.max(15, Math.min(Number(payload && payload.cacheTtlSeconds || defaultTtl) || defaultTtl, 300))
}
function _dashboardBuildSubBundles_(payload, stats, budget, cacheTtlSeconds) {
  payload = payload || {};
  var includeCases =! 0 === payload.includeCases, includeMeetingRows =! 0 === payload.includeMeetingRows, scopedCaseLimit = includeCases ? Math.max(10, Math.min(Number(payload.caseLimit || 30) || 30, 120)): 0, caseRows = includeCases ? Array.isArray(stats.caseRows) ? stats.caseRows.slice(0, scopedCaseLimit): _dashboardRequestRows_("MainData", {
    ttl: cacheTtlSeconds, failOnError: ! 0, allowEmpty: ! 0
  }).slice(0, scopedCaseLimit): [], budgetData = budget && budget.data ? budget.data: budget || {};
  return {
    caseData: { rows: caseRows, totalRecords: Number(stats.total || caseRows.length || 0), totalPages: 1, page: 1, limit: scopedCaseLimit }, caseRows: caseRows, budgetData: budgetData, includeCases: includeCases, includeMeetingRows: includeMeetingRows
  }
}
function _dashboardPayloadStats_(stats, subBundles) {
  stats = stats || {}, subBundles = subBundles || {};
  if(!1 !== subBundles.includeCases &&!1 !== subBundles.includeMeetingRows)return stats;
  var slim = Object.assign({}, stats);
  !1 === subBundles.includeCases && (slim.caseRows = [], slim.letterRows = []);
  !1 === subBundles.includeMeetingRows && (slim.meetingRows = [], slim.meetingNoRows = []);
  return slim.meta = Object.assign({}, stats.meta || {}, {
    dashboardFastFirstPaint: !0, caseRowsOmitted: !1 === subBundles.includeCases, letterRowsOmitted: !1 === subBundles.includeCases, meetingRowsOmitted: !1 === subBundles.includeMeetingRows, rowPayloadMode: "summary-kpi-payload-phase5", routerFacadeOnly: !0
  }), slim
}
function _dashboardBundleMeta_(startedAt, cacheKey, source) {
  var bundleMetrics = "function" == typeof getRequestScopeMetrics_ ? getRequestScopeMetrics_(): {
  };
  return {
    cached: ! 1, cacheStatus: "miss", cacheHit: ! (! bundleMetrics ||! bundleMetrics.cacheHit), cacheHits: Number(bundleMetrics && bundleMetrics.cacheHits || 0), cacheMisses: Number(bundleMetrics && bundleMetrics.cacheMisses || 0), rowsRead: Number(bundleMetrics && bundleMetrics.rowsRead || 0), durationMs: Math.max(0, Date.now() - startedAt), cacheKey: cacheKey, source: source || "dashboard-bundle-request-scope-current"
  }
}
function _dashboardBuildBundlePayload_(stats, subBundles, bundleMeta, cacheKey) {
  subBundles = subBundles || {
  };
  var caseRows = Array.isArray(subBundles.caseRows) ? subBundles.caseRows: [], caseData = subBundles.caseData || {
    rows: caseRows
  }, budgetData = subBundles.budgetData || {
  }, payloadStats = _dashboardPayloadStats_(stats, subBundles), dashboardDto = _dashboardCanonicalBundleDto_(payloadStats, budgetData, caseData, bundleMeta);
  return {
    dashboardDto: dashboardDto, contractStamp: dashboardDto.contractStamp, caseStats: dashboardDto.caseStats, typeStats: dashboardDto.typeStats, issueStats: dashboardDto.issueStats, trackingStats: dashboardDto.trackingStats, meetingStats: dashboardDto.meetingStats, charts: dashboardDto.charts, stats: payloadStats, summaryStats: payloadStats, budget: budgetData, budgetStats: budgetData, cases: caseData, rows: caseRows, letters: payloadStats.letters || {
    }, meetings: payloadStats.meetings || {
    }, meetingSummary: payloadStats.meetings || {
    }, meetingRows: Array.isArray(payloadStats.meetingRows) ? payloadStats.meetingRows: [], meetingNoRows: Array.isArray(payloadStats.meetingNoRows) ? payloadStats.meetingNoRows: [], summary: {
      totalCases: Number(payloadStats.total || 0), pendingCases: Number(payloadStats.pending || 0), completedCases: Number(payloadStats.completed || 0), overdueLetters: Number(payloadStats.overdueLetters || 0), soonOverdue: Number(payloadStats.soonOverdue || 0), totalMeetings: Number(dashboardDto.summary && dashboardDto.summary.totalMeetings || 0), recentMeetings: Number(dashboardDto.summary && dashboardDto.summary.recentMeetings || 0), meetingItemTotal: Number(dashboardDto.summary && dashboardDto.summary.meetingItemTotal || 0)
    }, quickCounts: {
      total: Number(payloadStats.total || 0), byStatus: payloadStats.statusRows || [], byType: payloadStats.byType || [], byTopic: payloadStats.byTopic || [], generatedAt: (new Date).toISOString()
    }, generatedAt: (new Date).toISOString(), meta: Object.assign({
    }, payloadStats.meta || {
    }, bundleMeta), cached: ! 1, cacheStatus: "miss", cacheKey: cacheKey
  }
}

function _dashboardBundleErrorCodeDASH2_(err, stage) {
  var msg = String(err && (err.error || err.message || err.msg) || err || "").toLowerCase(), st = String(stage || "dashboard").toLowerCase();
  if(/ไม่พบ\s*token|missing[-\s_]*token|no\s*token|token\s*การใช้งาน/.test(msg))return "DASHBOARD_AUTH_MISSING";
  if(/session\s*หมดอายุ|expired[-\s_]*session|session\s*expired|invalid\s*session|หมดอายุ/.test(msg))return "DASHBOARD_SESSION_EXPIRED";
  if(/สิทธิ์ไม่เพียงพอ|permission|forbidden|unauthori[sz]ed|access\s*denied/.test(msg))return "DASHBOARD_PERMISSION_DENIED";
  if(/cache/.test(st) || /cache/.test(msg))return "DASHBOARD_CACHE_READ_FAILED";
  if(/budget/.test(st))return "DASHBOARD_BUDGET_READ_FAILED";
  if(/sheet|spreadsheet|range|readsheet|ชีต|แผ่นงาน|ไม่พบชีต|rows|row/.test(msg) || /stats|case|letter|meeting|subbundle/.test(st))return "DASHBOARD_SHEET_READ_FAILED";
  if(/dto|normalize|bundle|build/.test(st))return "DASHBOARD_BUNDLE_BUILD_FAILED";
  return "DASHBOARD_BUNDLE_FAILED";
}
function _dashboardBundleErrorMessageDASH2_(code, err) {
  var raw = String(err && (err.message || err.error || err.msg) || err || "").trim();
  if("DASHBOARD_AUTH_MISSING" === code)return "Dashboard โหลดข้อมูลไม่สำเร็จ: ไม่พบ token การใช้งาน";
  if("DASHBOARD_SESSION_EXPIRED" === code)return "Dashboard โหลดข้อมูลไม่สำเร็จ: session หมดอายุ กรุณาเข้าสู่ระบบใหม่";
  if("DASHBOARD_PERMISSION_DENIED" === code)return "Dashboard โหลดข้อมูลไม่สำเร็จ: สิทธิ์ไม่เพียงพอ";
  if("DASHBOARD_CACHE_READ_FAILED" === code)return "Dashboard โหลดข้อมูลต่อจาก cache ไม่สำเร็จ ระบบจะโหลดข้อมูลใหม่";
  if("DASHBOARD_BUDGET_READ_FAILED" === code)return "Dashboard โหลดข้อมูลงบประมาณไม่สำเร็จ";
  if("DASHBOARD_SHEET_READ_FAILED" === code)return "Dashboard อ่านข้อมูลจากชีตไม่สำเร็จ";
  if("DASHBOARD_BUNDLE_BUILD_FAILED" === code)return "Dashboard สร้างชุดข้อมูลไม่สำเร็จ";
  return raw || "Dashboard โหลดข้อมูลไม่สำเร็จ";
}
function _dashboardBundleFailDASH2_(payload, code, err, stage, extra) {
  var now = (new Date).toISOString(), message = _dashboardBundleErrorMessageDASH2_(code, err), stats = _dashboardEmptyStatsPayload_("dash2-" + String(code || "dashboard").toLowerCase());
  stats.meta = Object.assign({
  }, stats.meta || {
  }, {
    degraded: !0, dashboardErrorCode: code, errorCode: code, errorStage: String(stage || "dashboard"), message: message, generatedAt: now, owner: "DASH-2:dashboard-error-code"
  }, extra || {
  });
  var data = {
    stats: stats, summaryStats: stats, budget: _dashboardEmptyBudgetPayload_("dash2-" + String(code || "dashboard").toLowerCase()), budgetStats: _dashboardEmptyBudgetPayload_("dash2-" + String(code || "dashboard").toLowerCase()), cases: { rows: [] }, rows: [], meetings: {}, meetingSummary: {}, generatedAt: now, meta: Object.assign({
      degraded: !0, dashboardErrorCode: code, errorCode: code, errorStage: String(stage || "dashboard"), message: message, generatedAt: now, owner: "DASH-2:dashboard-error-code"
    }, extra || {})
  };
  data.dashboardDto = _dashboardCanonicalBundleDto_(stats, data.budgetStats, data.cases, data.meta);
  data.dashboardDto.meta = Object.assign({}, data.dashboardDto.meta || {}, data.meta || {});
  var out = err_(message, data);
  out.errorCode = code;
  out.dashboardErrorCode = code;
  out.errorStage = String(stage || "dashboard");
  out.requestId = String(payload && payload.requestId || "");
  return out;
}
function _dashboardBundleWarnDASH2_(label, err, meta) {
  try {
    _appIsFnName_("_logApiFailure_") && _logApiFailure_(label, err, meta || {});
  }
  catch(_dash2LogErr) {
    try { _appIsFnName_("_recordWarning_") && _recordWarning_("dashboard.dash2.log", _dash2LogErr); } catch(_ignore) { _ignore && String(_ignore); }
  }
}

function _apiGetDashboardBundleCore_(payload) {
  (payload = payload || {
  }).includeBudget = !1 !== payload.includeBudget, payload.includeCases = !1 !== payload.includeCases, payload.hotPathMode = String(payload.hotPathMode || "dashboard-initial-single-bundle");
  var bundleStartedAt = Date.now(), sess, cacheTtlSeconds, cacheKey;
  try {
    sess = requireAuth_(payload, "viewer");
  }
  catch(authErr) {
    var authCode = _dashboardBundleErrorCodeDASH2_(authErr, "auth");
    _dashboardBundleWarnDASH2_("dashboard.bundle.auth.failure", authErr, {
      method: "apiGetDashboardBundle", requestId: payload && payload.requestId || "", errorCode: authCode
    });
    return _dashboardBundleFailDASH2_(payload, authCode, authErr, "auth");
  }
  try {
    cacheTtlSeconds = _dashboardBundleTtlSeconds_(payload), cacheKey = "dash_bundle_due_classifier_v8_" + _dashboardBundleCacheKey_(payload, sess);
    if(! 0 !== payload.forceFresh) {
      try {
        var cachedBundle = _cacheGetJson_(cacheKey);
        if(cachedBundle && _dashboardStatsHasDashboardData_(cachedBundle.stats || cachedBundle.summaryStats || {
        }))return cachedBundle.cached =! 0, cachedBundle.cacheStatus = "hit", cachedBundle.cacheKey = cacheKey, cachedBundle.meta = Object.assign({
        }, cachedBundle.meta || {
        }, {
          cached: ! 0, cacheStatus: "hit", cacheHit: ! 0, cacheKey: cacheKey, durationMs: Math.max(0, Date.now() - bundleStartedAt), rowsRead: 0, source: "dashboard-bundle-cache-current", dashboardErrorCode: "", errorCode: ""
        }), cachedBundle.dashboardDto ? cachedBundle.dashboardDto.meta = Object.assign({
        }, cachedBundle.dashboardDto.meta || {
        }, cachedBundle.meta || {
        }): cachedBundle.dashboardDto = _dashboardCanonicalBundleDto_(cachedBundle.stats || cachedBundle.summaryStats || {
        }, cachedBundle.budgetStats || cachedBundle.budget || {
        }, cachedBundle.cases || {
          rows: cachedBundle.rows || []
        }, cachedBundle.meta), ok_(cachedBundle, "โหลด dashboard bundle สำเร็จ")
      }
      catch(cacheErr) {
        var cacheCode = _dashboardBundleErrorCodeDASH2_(cacheErr, "cache-read");
        _dashboardBundleWarnDASH2_("dashboard.bundle.cache.read.failure", cacheErr, {
          method: "apiGetDashboardBundle", requestId: payload && payload.requestId || "", errorCode: cacheCode, cacheKey: cacheKey
        });
        payload.__dashboardCacheReadErrorCode = cacheCode;
      }
    }
    var stats;
    try {
      stats = _dashboardStats_(payload);
    }
    catch(statsErr) {
      var statsCode = _dashboardBundleErrorCodeDASH2_(statsErr, "stats-sheet-read");
      _dashboardBundleWarnDASH2_("dashboard.bundle.stats.failure", statsErr, {
        method: "apiGetDashboardBundle", requestId: payload && payload.requestId || "", errorCode: statsCode
      });
      return _dashboardBundleFailDASH2_(payload, statsCode, statsErr, "stats-sheet-read");
    }
    var budgetResult;
    try {
      budgetResult =! 0 === payload.includeBudget ? _getDashboardBudgetByPlanCurrentFYImpl_(): ok_({
      }, "ข้ามการโหลดงบประมาณเพื่อให้ Dashboard แสดงผลเร็ว")
    }
    catch(budgetErr) {
      var budgetCode = _dashboardBundleErrorCodeDASH2_(budgetErr, "budget-read");
      _dashboardBundleWarnDASH2_("dashboard.bundle.budget.failure", budgetErr, {
        method: "apiGetDashboardBundle", requestId: payload && payload.requestId || "", errorCode: budgetCode
      });
      budgetResult = err_(_dashboardBundleErrorMessageDASH2_(budgetCode, budgetErr), _dashboardEmptyBudgetPayload_("dash2-budget-read-failed"));
      budgetResult.errorCode = budgetCode;
    }
    var subBundles;
    try {
      subBundles = _dashboardBuildSubBundles_(payload, stats, budgetResult, cacheTtlSeconds)
    }
    catch(subErr) {
      var subCode = _dashboardBundleErrorCodeDASH2_(subErr, "subbundle-sheet-read");
      _dashboardBundleWarnDASH2_("dashboard.bundle.subbundle.failure", subErr, {
        method: "apiGetDashboardBundle", requestId: payload && payload.requestId || "", errorCode: subCode
      });
      return _dashboardBundleFailDASH2_(payload, subCode, subErr, "subbundle-sheet-read");
    }
    var bundleMeta = _dashboardBundleMeta_(bundleStartedAt, cacheKey, "dashboard-bundle-request-scope-current");
    bundleMeta.includeBudget =! 0 === payload.includeBudget, bundleMeta.includeCases =! 0 === payload.includeCases, bundleMeta.hotPathMode = payload.hotPathMode || "dashboard-initial-single-bundle", bundleMeta.initialSingleBundle =! 0;
    payload.__dashboardCacheReadErrorCode && (bundleMeta.cacheReadWarningCode = payload.__dashboardCacheReadErrorCode);
    budgetResult && budgetResult.errorCode && (bundleMeta.budgetWarningCode = budgetResult.errorCode);
    var data;
    try {
      data = _dashboardBuildBundlePayload_(stats, subBundles, bundleMeta, cacheKey);
    }
    catch(buildErr) {
      var buildCode = _dashboardBundleErrorCodeDASH2_(buildErr, "bundle-build");
      _dashboardBundleWarnDASH2_("dashboard.bundle.build.failure", buildErr, {
        method: "apiGetDashboardBundle", requestId: payload && payload.requestId || "", errorCode: buildCode
      });
      return _dashboardBundleFailDASH2_(payload, buildCode, buildErr, "bundle-build");
    }
    try {
      _cachePutJson_(cacheKey, data, cacheTtlSeconds)
    }
    catch(cacheWriteErr) {
      _dashboardBundleWarnDASH2_("dashboard.bundle.cache.write.failure", cacheWriteErr, {
        method: "apiGetDashboardBundle", requestId: payload && payload.requestId || "", errorCode: "DASHBOARD_CACHE_WRITE_FAILED", cacheKey: cacheKey
      });
      data.meta = Object.assign({}, data.meta || {}, {
        cacheWriteWarningCode: "DASHBOARD_CACHE_WRITE_FAILED"
      });
      data.dashboardDto && (data.dashboardDto.meta = Object.assign({}, data.dashboardDto.meta || {}, data.meta || {}));
    }
    return ok_(data, "โหลด dashboard bundle สำเร็จ")
  }
  catch(e) {
    var code = _dashboardBundleErrorCodeDASH2_(e, "bundle");
    _dashboardBundleWarnDASH2_("dashboard.bundle.current.failure", e, {
      method: "apiGetDashboardBundle", requestId: payload && payload.requestId || "", errorCode: code
    });
    return _dashboardBundleFailDASH2_(payload, code, e, "bundle");
  }
}
DashboardDomain.VERSION = "dashboard-domain-single-bundle-current", DashboardDomain.getBundle = function(payload) {
  return(payload = payload || {
  }).includeBudget = !1 !== payload.includeBudget, payload.includeCases = !1 !== payload.includeCases, payload.hotPathMode = String(payload.hotPathMode || "dashboard-initial-single-bundle"), _apiGetDashboardBundleCore_(payload)
};
DashboardDomain.status = function() {
  return {
    ok: !0, owner: "DashboardDomain", version: DashboardDomain.VERSION || "dashboard-domain-single-bundle-current", phase5: DashboardDomain.OWNER_CONTRACT_PHASE5, uiDomChanged: !1, businessLogicChanged: !1, apiNamesPreserved: !0
  }
};
CaseDomain.SHEET_NAME = "MainData", CaseDomain.VERSION = "case-domain-production-single-owner-current", CaseDomain.Services = CaseDomain.Services || {
  Repository: {
    source: "MainData"
  }, Search: {
    source: "MainData", dto: "CaseSearchRowDTO"
  }, Report: {
    source: "MainData+MeetingLogs"
  }, MeetingHistory: {
    source: "MeetingLogs"
  }
}, CaseDomain.caseText = function(value) {
  return"undefined" != typeof AppBackendCore && AppBackendCore.text ? AppBackendCore.text(value): String(null == value ? "": value).trim()
}, CaseDomain.pick = function(row, keys, defaultValue) {
  return"undefined" != typeof AppBackendCore && AppBackendCore.pick ? AppBackendCore.pick(row, keys, defaultValue): row && row[keys] || defaultValue || ""
}, CaseDomain.caseNumberValue = function(value) {
  var s, m = CaseDomain.caseText(value).match(/^(\d+)/);
  return m ? Number(m[1]): 999999999
}, CaseDomain.toSearchRow = function(row, seq) {
  if(row = row || {
  }, "undefined" != typeof AppBackendCore && AppBackendCore.normalizeCaseSearchDto) {
    var base = AppBackendCore.normalizeCaseSearchDto(row, seq) || {
    }, comm = CaseDomain.pick(row, ["committeeHistory", "committeeMeeting", "committeeMeetings", "meetingCommitteeHistory", "คณะกรรมาธิการ"], ""), sub = CaseDomain.pick(row, ["subcommitteeHistory", "subcommitteeMeeting", "subcommitteeMeetings", "meetingSubcommitteeHistory", "คณะอนุกรรมาธิการ"], "");
    return comm && (base.committeeHistory = base.committeeHistory || comm, base.committeeMeeting = base.committeeMeeting || comm, base["คณะกรรมาธิการ"] = base["คณะกรรมาธิการ"] || comm), sub && (base.subcommitteeHistory = base.subcommitteeHistory || sub, base.subcommitteeMeeting = base.subcommitteeMeeting || sub, base["คณะอนุกรรมาธิการ"] = base["คณะอนุกรรมาธิการ"] || sub), base.reportColumns = Object.assign({
    }, base.reportColumns || {
    }, {
      committeeHistory: base.committeeHistory || "", subcommitteeHistory: base.subcommitteeHistory || "", operationOfficer: base.operationOfficer || base.opStaff || base.staffs || base["เจ้าหน้าที่ฝ่ายเลขานุการ"] || ""
    }), base.dtoOwner = "CaseDomain.toSearchRow.production", base
  }
  var recDate = CaseDomain.pick(row, ["recDate", "recDateText", "วันที่รับเรื่อง", "receiveDate"], ""), statusRaw = CaseDomain.pick(row, ["status", "สถานะ"], ""), status = "undefined" != typeof AppBackendCore && AppBackendCore.normalizeCaseStatus ? AppBackendCore.normalizeCaseStatus(statusRaw, { defaultStatus: "เรื่องเข้าใหม่" }): _caseNormalizeStatusForDisplay_(statusRaw), loc = "undefined" != typeof AppBackendCore && AppBackendCore.location ? AppBackendCore.location(row): {
    subdistrict: CaseDomain.pick(row, ["ตำบล", "subdistrict"], ""), district: CaseDomain.pick(row, ["อำเภอ", "district"], ""), province: CaseDomain.pick(row, ["จังหวัด", "province"], "")
  }, title = CaseDomain.pick(row, ["title", "subject", "ชื่อเรื่อง", "เรื่อง"], ""), fullName = CaseDomain.pick(row, ["fullName", "petitionerName", "petitioners", "ชื่อ-สกุล", "ผู้เสนอญัตติ/ผู้ร้อง"], ""), coOwners = CaseDomain.pick(row, ["coOwners", "coAssignees", "ผู้ร่วมรับผิดชอบ", "ผู้รับผิดชอบร่วม"], ""), out = {
    id: CaseDomain.pick(row, ["id", "caseId", "รหัส"], ""), caseId: CaseDomain.pick(row, ["caseId", "id", "รหัส"], ""), seq: seq, caseNo: CaseDomain.pick(row, ["caseNo", "caseNum", "ลำดับเรื่อง"], ""), caseNum: CaseDomain.pick(row, ["caseNo", "caseNum", "ลำดับเรื่อง"], ""), recNo: CaseDomain.pick(row, ["recNo", "เลขรับเรื่อง", "receiveNo"], ""), recDate: recDate, recDateText: "undefined" != typeof AppBackendCore && AppBackendCore.dateText ? AppBackendCore.dateText(recDate): String(recDate || ""), title: title, subject: title, considerationTitle: CaseDomain.pick(row, ["considerationTitle", "ชื่อเรื่องพิจารณา", "ชื่อเรื่องพิจารณา (ถ้ามี)"], ""), petitionerName: fullName, petitioners: fullName, fullName: fullName, respondent: CaseDomain.pick(row, ["respondent", "ผู้ถูกร้อง"], ""), agency: CaseDomain.pick(row, ["agency", "หน่วยงาน"], ""), assignees: CaseDomain.pick(row, ["assignees", "กมธ.รับผิดชอบ", "กรรมาธิการรับผิดชอบ"], ""), coAssignees: coOwners, coOwners: coOwners, opStaff: CaseDomain.pick(row, ["opStaff", "เจ้าหน้าที่ฝ่ายเลขานุการ", "เจ้าหน้าที่ฝ่ายปฏิบัติการ"], ""), cat: CaseDomain.pick(row, ["cat", "ประเภทเรื่อง", "ประเภท"], ""), subCat: CaseDomain.pick(row, ["subCat", "ประเด็นพิจารณา", "ประเด็น"], ""), committeeHistory: CaseDomain.pick(row, ["committeeHistory", "committeeMeeting", "คณะกรรมาธิการ"], ""), subcommitteeHistory: CaseDomain.pick(row, ["subcommitteeHistory", "subcommitteeMeeting", "คณะอนุกรรมาธิการ"], ""), status: status, statusRaw: statusRaw, type: "case", typeLabel: "เรื่องพิจารณา", subdistrict: loc.subdistrict, district: loc.district, province: loc.province
  };
  return out.statusMeta = "undefined" != typeof AppBackendCore && AppBackendCore.statusMeta ? AppBackendCore.statusMeta(status, recDate): {
    status: status
  }, out.reportColumns = {
    caseNo: out.caseNo, recNo: out.recNo, recDateText: out.recDateText, title: out.title, considerationTitle: out.considerationTitle, committeeHistory: out.committeeHistory || "", subcommitteeHistory: out.subcommitteeHistory || "", petitioners: out.petitioners, status: out.status
  }, out
}, CaseDomain.toCompactSearchRow = function(row, seq) {
  var dto = CaseDomain.toSearchRow(row || {
  }, seq) || {
  }, compact = {
    id: dto.id || dto.caseId || "", caseId: dto.caseId || dto.id || "", seq: dto.seq || seq || "", caseNo: dto.caseNo || dto.caseNum || "", caseNum: dto.caseNum || dto.caseNo || "", recNo: dto.recNo || dto.receiveNo || "", recDate: dto.recDate || dto.recDateText || "", recDateText: dto.recDateText || dto.recDate || "", offerDate: dto.offerDate || dto.offerDateText || dto.bookDate || dto.letterDate || dto.documentDate || "", offerDateText: dto.offerDateText || dto.offerDate || dto.bookDate || dto.letterDate || dto.documentDate || "", bookDate: dto.bookDate || dto.offerDate || dto.offerDateText || "", letterDate: dto.letterDate || dto.offerDate || dto.offerDateText || "", documentDate: dto.documentDate || dto.offerDate || dto.offerDateText || "", title: dto.title || dto.subject || "", considerationTitle: dto.considerationTitle || dto.caseTitle || "", petitioners: dto.petitioners || dto.petitionerName || "", respondent: dto.respondent || dto.agency || dto.agencyName || "", agency: dto.agency || dto.respondent || dto.agencyName || "", assignees: dto.assignees || "", coAssignees: dto.coAssignees || dto.coOwners || "", opStaff: dto.opStaff || dto.operationOfficer || dto.staffs || "", cat: dto.cat || "", subCat: dto.subCat || "", status: dto.status || "เรื่องเข้าใหม่", statusRaw: dto.statusRaw || dto.status || "", closedReason: dto.closedReason || "", rejectionReason: dto.rejectionReason || "", reason: dto.reason || dto.closedReason || dto.rejectionReason || "", sentAgency: dto.sentAgency || "", committeeHistory: dto.committeeHistory || "", subcommitteeHistory: dto.subcommitteeHistory || "", type: "case", typeLabel: "เรื่องพิจารณา"
  };
  return compact["ลำดับเรื่อง"] = compact.caseNo, compact["เลขรับเรื่อง"] = compact.recNo, compact["วันที่รับเรื่อง"] = compact.recDateText, compact["ชื่อเรื่อง"] = compact.title, compact["ชื่อเรื่องพิจารณา (ถ้ามี)"] = compact.considerationTitle, compact["ผู้เสนอญัตติ/ผู้ร้อง"] = compact.petitioners, compact["สถานะ"] = compact.status, compact
}, CaseDomain.searchPageCacheKey = function(payload) {
  payload = payload || {
  };
  var scope = {
    q: String(payload.query || payload.q || payload.keyword || "").trim().toLowerCase(), reportType: String(payload.reportType || payload.groupType || payload.type || "all").trim().toLowerCase(), reportValue: String(payload.reportValue || payload.groupValue || payload.value || "").trim(), sortBy: String(payload.sortBy || "caseNum").trim(), sortDir: String(payload.sortDir || "asc").trim().toLowerCase(), page: Math.max(1, Number(payload.page || 1) || 1), limit: Math.max(1, Math.min(Number(payload.limit || payload.pageSize || 20) || 20, 100)), compact: ! 0 === payload.compactReadModel ? 1: 0, meeting: ! 0 === payload.includeMeetingHistory ? 1: 0, stamp: _appIsFnName_("_entityCacheStamp_") ? _entityCacheStamp_("maindata"): "1", dto: "case-search-compact-server-page-v2-stable-order"
  };
  return"case_search_page_v2_" + (_appIsFnName_("_buildDigestHex_") ? _buildDigestHex_(JSON.stringify(scope)): String(scope.page) + "_" + String(scope.limit))
}, CaseDomain.matchRow = function(row, payload) {
  payload = payload || {
  };
  var q = CaseDomain.caseText(payload.query || payload.q || payload.keyword || "").toLowerCase(), reportType = CaseDomain.caseText(payload.reportType || payload.groupType || payload.type || "all"), reportValue = CaseDomain.caseText(payload.reportValue || payload.groupValue || payload.value || ""), hay;
  if(q && [row.caseNo, row.caseNum, row.recNo, row.recDateText, row.title, row.subject, row.considerationTitle, row.caseTitle, row.petitionerName, row.petitioners, row.respondent, row.agency, row.agencyName, row.assignees, row.coOwners, row.coAssignees, row.opStaff, row.operationOfficer, row.staffs, row.status, row.cat, row.subCat].join(" ").toLowerCase().indexOf(q) < 0)return ! 1;
  if(reportType && "all" !== reportType && reportValue) {
    var field = "cat" === reportType ? row.cat: "sub" === reportType ? row.subCat: "comm" === reportType ? row.assignees: "status" === reportType ? row.status: "", fieldText = CaseDomain.caseText(field);
    if("comm" === reportType ? fieldText.indexOf(reportValue) < 0: fieldText !== reportValue)return ! 1
  }
  return ! 0
}, CaseDomain.searchCases = function(payload) {
  payload = payload || {
  };
  var started = Date.now(), compactMode = ! 0 === payload.compactReadModel, allowCache = !0 !== payload.forceFresh && !0 !== payload.noCache && !0 !== payload.bypassCache, noPage = !0 === payload.noPage || !0 === payload.fullList || !1 === payload.serverPaged, pageCacheKey = ! noPage && allowCache ? CaseDomain.searchPageCacheKey(payload): "";
  if(pageCacheKey && _appIsFnName_("_cacheGetJson_")) {
    var pageHit = _cacheGetJson_(pageCacheKey);
    if(pageHit && Array.isArray(pageHit.rows))return pageHit.cacheHit = !0, pageHit.cacheStatus = "page-hit", pageHit.rowsRead = 0, pageHit.durationMs = Math.max(0, Date.now() - started), pageHit.meta = Object.assign({
    }, pageHit.meta || {
    }, {
      pageCache: "hit", cacheKey: pageCacheKey
    }), pageHit
  }
  if(! _appIsFnName_("_caseSearchReadModel_"))return {
    ok: ! 1, error: "CASE_SEARCH_READ_MODEL_UNAVAILABLE", msg: "ไม่พบ read model สำหรับค้นหาเรื่องพิจารณา", rows: [], data: [], items: [], totalRecords: 0, page: 1, limit: Number(payload.limit || payload.pageSize || 20) || 20, pageSize: Number(payload.limit || payload.pageSize || 20) || 20, totalPages: 1, owner: "CaseDomain.searchCases", source: "MainData"
  };
  var model = _caseSearchReadModel_(Object.assign({
  }, payload, {
    compactReadModel: compactMode, includeMeetingHistory: !0 === payload.includeMeetingHistory
  })) || {
  }, raw = Array.isArray(model.rows) ? model.rows: [];
  for(var mapped = [], i = 0;
  i < raw.length;
  i ++ ) {
    var row = raw[i] || {
    };
    _appIsFnName_("_caseSearchEnsureReceiveNo_") && (row = _caseSearchEnsureReceiveNo_(row));
    var dto = compactMode ? CaseDomain.toCompactSearchRow(row, i + 1): CaseDomain.toSearchRow(row, i + 1);
    dto && CaseDomain.matchRow(dto, payload) && mapped.push(dto)
  }
  mapped.sort(function(a, b) {
    var byCaseNo = CaseDomain.caseNumberValue(a.caseNo || a.caseNum) - CaseDomain.caseNumberValue(b.caseNo || b.caseNum);
    if(byCaseNo)return byCaseNo;
    var byReceiveNo = String(a.recNo || a.receiveNo || "").localeCompare(String(b.recNo || b.receiveNo || ""), "th", {
      numeric: ! 0, sensitivity: "base"
    });
    if(byReceiveNo)return byReceiveNo;
    var byId = String(a.caseId || a.id || "").localeCompare(String(b.caseId || b.id || ""), "th", {
      numeric: ! 0, sensitivity: "base"
    });
    return byId || String(a.title || a.caseTitle || "").localeCompare(String(b.title || b.caseTitle || ""), "th", {
      numeric: ! 0, sensitivity: "base"
    })
  });
  var paged = noPage ? {
    rows: mapped, totalRecords: mapped.length, page: 1, limit: mapped.length || Math.max(1, Number(payload.limit || payload.pageSize || 20) || 20), pageSize: mapped.length || Math.max(1, Number(payload.limit || payload.pageSize || 20) || 20), totalPages: 1, serverPaged: ! 1
  }
  : "undefined" != typeof AppRepository && AppRepository.page ? AppRepository.page(mapped, payload, 20, 100): {
    rows: mapped.slice(0, Math.max(1, Math.min(Number(payload.limit || payload.pageSize || 20) || 20, 100))), totalRecords: mapped.length, page: 1, limit: Math.max(1, Math.min(Number(payload.limit || payload.pageSize || 20) || 20, 100)), pageSize: Math.max(1, Math.min(Number(payload.limit || payload.pageSize || 20) || 20, 100)), totalPages: Math.max(1, Math.ceil(mapped.length/Math.max(1, Math.min(Number(payload.limit || payload.pageSize || 20) || 20, 100)))), serverPaged: ! 0
  }, res = {
    ok: ! 0, rows: paged.rows, data: paged.rows, items: paged.rows, totalRecords: paged.totalRecords, total: paged.totalRecords, page: paged.page, limit: paged.limit, pageSize: paged.pageSize, totalPages: paged.totalPages, columns: "undefined" != typeof AppBackendCore && AppBackendCore.reportColumns ? AppBackendCore.reportColumns(): [], owner: "CaseDomain.searchCases", source: "MainData", readModel: compactMode ? "CaseSearchReadModel.MainData.compactServerPaged": "CaseSearchReadModel.MainData.canonicalOwner", serverPaged: ! 1 !== paged.serverPaged, serverFiltered: ! 0, rowsRead: Number(model.rowsRead || raw.length || 0), durationMs: Math.max(0, Date.now() - started), cacheHit: !! model.cacheHit, cacheStatus: String(model.cacheStatus || "miss"), meta: {
      source: "CaseDomain.searchCases", sourceOfTruth: "MainData", readModelOwner: "_caseSearchReadModel_", canonicalReader: "_caseReadMainDataRowsForSearch_", compactReadModel: compactMode, includeMeetingHistory: ! 0 === payload.includeMeetingHistory, serverPaged: ! 1 !== paged.serverPaged, serverFiltered: ! 0, rowsRead: Number(model.rowsRead || raw.length || 0), durationMs: Math.max(0, Date.now() - started), pageCache: "miss"
    }
  };
  "undefined" != typeof AppBackendCore && AppBackendCore.normalizeCaseSearchResponse && (res = AppBackendCore.normalizeCaseSearchResponse(res));
  if(pageCacheKey && _appIsFnName_("_cachePutJson_"))try {
    _cachePutJson_(pageCacheKey, res, Math.max(60, Math.min(Number(payload.cacheTtlSeconds || 180) || 180, 300)))
  }
  catch(_pageCachePutErr) {
    _appIsFnName_("_recordWarning_") && _recordWarning_("case.search.pageCache.put", _pageCachePutErr)
  }
  return res
}, CaseDomain.saveCase = function(payload) {
  if(payload = payload || {
  }, "undefined" == typeof AppRepository ||! AppRepository.writeObject)return {
    ok: ! 1, error: "CASE_REPOSITORY_WRITE_UNAVAILABLE"
  };
  var saved = AppRepository.writeObject(CaseDomain.SHEET_NAME, "id", payload, {
    domain: "cases"
  }), invalidated;
  return {
    ok: ! 0, item: saved, data: {
      item: saved
    }, owner: "CaseDomain.saveCase", cacheInvalidation: AppRepository.afterWrite ? AppRepository.afterWrite(["cases", "dashboard", "tracking", "meeting"]): []
  }
}, CaseDomain.getReportExportRows = function(payload) {
  payload = payload || {
  };
  var maxRows = Math.max(1, Math.min(Number(payload.maxRows || payload.limit || 5000) || 5000, 5000)), res = CaseDomain.searchCases(Object.assign({
  }, payload, {
    page: 1, limit: maxRows, pageSize: maxRows, noPage: ! 0, fullList: ! 0, serverPaged: ! 1, exportMode: ! 0, compactReadModel: ! 0, includeMeetingHistory: ! 1 !== payload.includeMeetingHistory, forceFresh: ! 0 === payload.forceFresh, noCache: ! 0 === payload.noCache, bypassCache: ! 0 === payload.bypassCache
  })), rows = Array.isArray(res && res.rows) ? res.rows.slice(0, maxRows): [], total = Number(res && res.totalRecords || rows.length || 0) || 0;
  return {
    ok: ! 0, rows: rows, data: rows, items: rows, totalRecords: total, total: total, returnedRows: rows.length, maxRows: maxRows, truncated: total > rows.length, page: 1, limit: rows.length || maxRows, pageSize: rows.length || maxRows, totalPages: 1, serverPaged: ! 1, exportMode: String(payload.exportMode || payload.mode || "report"), owner: "CaseDomain.getReportExportRows", source: "MainData+MeetingLogs.on-demand", generatedAt: (new Date).toISOString(), meta: {
      onDemandOnly: ! 0, initialLoadAllowed: ! 1, includeMeetingHistory: ! 1 !== payload.includeMeetingHistory, sourceOfTruth: "MainData"
    }
  }
}, CaseDomain.quickSummary = function(payload) {
  payload = payload || {
  };
  var res = CaseDomain.searchCases(Object.assign({
  }, payload, {
    noPage: ! 0, limit: 500
  })), rows = Array.isArray(res && res.rows) ? res.rows: [], statusMap = {
  }, typeMap = {
  };
  function top(map) {
    return Object.keys(map || {
    }).map(function(k) {
      return {
        label: k, count: Number(map[k] || 0)
      }
    }).sort(function(a, b) {
      return Number(b.count || 0) - Number(a.count || 0) || String(a.label || "").localeCompare(String(b.label || ""), "th")
    }).slice(0, 8)
  }
  return rows.forEach(function(r) {
    var st = CaseDomain.caseText(r && r.status || "") || "ไม่ระบุสถานะ", ty = CaseDomain.caseText(r && r.cat || "") || "ไม่ระบุประเภท";
    statusMap[st] = (statusMap[st] || 0) + 1, typeMap[ty] = (typeMap[ty] || 0) + 1
  }), {
    ok: ! 0, data: {
      total: Number(res && res.totalRecords || rows.length || 0), query: String(payload.query || payload.q || payload.keyword || ""), reportType: String(payload.reportType || payload.groupType || payload.type || "all"), reportValue: String(payload.reportValue || payload.groupValue || payload.value || ""), byStatus: top(statusMap), byType: top(typeMap), generatedAt: (new Date).toISOString(), cached: ! 1, cacheStatus: "CaseDomain.quickSummary"
    }, owner: "CaseDomain.quickSummary"
  }
}, CaseDomain.getReportOptions = function(payload) {
  payload = payload || {
  };
  var facets = _appIsFnName_("_caseSearchReportFacets_") ? _caseSearchReportFacets_(payload): {
  };
  return(facets = facets && "object" == typeof facets ? facets: {
  }).meta = Object.assign({
  }, facets.meta || {
  }, {
    source: facets.source || "CaseDomain.getReportOptions", readModel: facets.readModel || "CaseSearchReadModel.current", domainOwner: "CaseDomain"
  }), {
    ok: ! 0, data: facets, owner: "CaseDomain.getReportOptions"
  }
}, CaseDomain.status = function() {
  return {
    ok: ! 0, owner: "CaseDomain", boundary: CaseDomain.BOUNDARY, physical: CaseDomain.PHYSICAL, phase5: CaseDomain.OWNER_CONTRACT_PHASE5, stamp: PHASE10_DOMAIN_PHYSICAL_STAMP, boundaryStamp: PHASE3_DOMAIN_BOUNDARY_STAMP, uiDomChanged: ! 1, businessLogicChanged: ! 1
  }
};
// ===== DOMAIN PHYSICAL: COMMITTEE MEETING SYSTEM OWNER =====
function _committeeMeetingSheetSpec_() {
  return {
    sheets: {
      CommitteeMeetings: {
        purpose: "ข้อมูลหัวการประชุมของคณะกรรมาธิการ", key: "meetingId", headers: ["meetingId", "meetingNo", "meetingDate", "title", "status", "note", "createdAt", "updatedAt", "isDeleted", "deletedAt"]
      }, CommitteeMeetingAgendaItems: {
        purpose: "รายการระเบียบวาระการประชุม 1-4 แบบหลายรายการ", key: "itemId", headers: ["itemId", "meetingId", "agendaNo", "seq", "title", "relatedMeetingNo", "relatedMeetingDate", "caseId", "caseNum", "recNo", "caseTitle", "letterId", "letterNo", "letterSubject", "agencyOrPresenter", "result", "note", "createdAt", "updatedAt", "isDeleted", "deletedAt"]
      }
    }, sync: {
      targetSheet: "MeetingLogs", rule: "รายการระเบียบวาระที่ 1 และ 3 ที่เชื่อม caseId จะบันทึก/อัปเดตประวัติการพิจารณาของคณะกรรมาธิการอัตโนมัติ โดยใช้ครั้งที่=meetingNo, วันประชุม=meetingDate, ผลการประชุม/มติที่ประชุม=result"
    }
  }
}
function _committeeMeetingRows_(sheetName, includeDeleted) {
  try {
    return ensureCanonicalHeadersForNewSheet_(sheetName), _caseDomainSharedRows_(sheetName, [], {
      includeDeleted: ! 0 === includeDeleted, requireCanonical: ! 0, ttl: 180
    })
  }
  catch(e) {
    throw new Error("ไม่สามารถอ่านชีต " + sheetName + " ได้: " + String(e && e.message || e))
  }
}
function _committeeMeetingRepo_(name) {
  return getCanonicalRepository_(name)
}
function _committeeMeetingPad2_(n) {
  return((n = Number(n) || 0) < 10 ? "0": "") + String(n)
}
function _committeeMeetingIsDate_(v) {
  return"[object Date]" === Object.prototype.toString.call(v) &&! isNaN(v.getTime())
}
function _committeeMeetingDateText_(v) {
  if(null == v)return"";
  if(_committeeMeetingIsDate_(v)) {
    var y = v.getFullYear(), be = y < 2400 ? y + 543: y;
    return _committeeMeetingPad2_(v.getDate()) + "/" + _committeeMeetingPad2_(v.getMonth() + 1) + "/" + be
  }
  if("number" == typeof v && isFinite(v) && v > 2e4 && v < 4e5) {
    var serialDate = new Date(Math.round(864e5 * (v - 25569)));
    if(! isNaN(serialDate.getTime())) {
      var serialYear = serialDate.getUTCFullYear(), serialBe = serialYear < 2400 ? serialYear + 543: serialYear;
      return _committeeMeetingPad2_(serialDate.getUTCDate()) + "/" + _committeeMeetingPad2_(serialDate.getUTCMonth() + 1) + "/" + serialBe
    }
  }
  var raw = String(v || "").trim();
  if(! raw)return"";
  if(/^\d+(?:\.0+)?$/.test(raw)) {
    var serialNumber = Number(raw);
    if(isFinite(serialNumber) && serialNumber > 2e4 && serialNumber < 4e5) {
      var serialTextDate = new Date(Math.round(864e5 * (serialNumber - 25569)));
      if(! isNaN(serialTextDate.getTime())) {
        var serialTextYear = serialTextDate.getUTCFullYear(), serialTextBe = serialTextYear < 2400 ? serialTextYear + 543: serialTextYear;
        return _committeeMeetingPad2_(serialTextDate.getUTCDate()) + "/" + _committeeMeetingPad2_(serialTextDate.getUTCMonth() + 1) + "/" + serialTextBe
      }
    }
  }
  var m = raw.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
  if(m) {
    var y1 = Number(m[3]);
    return y1 < 2400 && (y1 += 543), _committeeMeetingPad2_(m[1]) + "/" + _committeeMeetingPad2_(m[2]) + "/" + y1
  }
  var iso = raw.match(/^(\d{4})-(\d{1,2})-(\d{1,2})(?:[T\s]|$)/);
  if(iso) {
    var y2 = Number(iso[1]);
    return y2 < 2400 && (y2 += 543), _committeeMeetingPad2_(iso[3]) + "/" + _committeeMeetingPad2_(iso[2]) + "/" + y2
  }
  if(/GMT|เวลาอินโดจีน|^[A-Z][a-z]{2}\s+[A-Z][a-z]{2}\s+\d{1,2}\s+\d{4}/.test(raw)) {
    var cleaned = raw.replace(/\s*\(.*?\)\s*/g, " ").replace(/เวลาอินโดจีน/g, "").trim(), d = new Date(cleaned);
    if(! isNaN(d.getTime())) {
      var y3 = d.getFullYear();
      return y3 < 2400 && (y3 += 543), _committeeMeetingPad2_(d.getDate()) + "/" + _committeeMeetingPad2_(d.getMonth() + 1) + "/" + y3
    }
  }
  return raw
}
function _committeeMeetingText_(v) {
  return _committeeMeetingIsDate_(v) ? _committeeMeetingDateText_(v): String(null == v ? "": v).trim()
}
function _committeeMeetingCaseRefText_(v) {
  if(null == v)return"";
  var raw = String(null == v ? "": v).trim();
  if(! raw &&! _committeeMeetingIsDate_(v))return"";
  if(/^\d{1,6}\s*\/\s*(?:19|20|25)\d{2}$/.test(raw))return raw.replace(/\s*\/\s*/, "/");
  if(/^\d{1,6}\s*[-–—]\s*(?:19|20|25)\d{2}$/.test(raw))return raw.replace(/\s*[-–—]\s*/, "/");
  var mixed = raw.match(/^(\d{1,6})\s*\/\s*(.+)$/), dateLike;
  if(mixed) {
    var tail = String(mixed[2] || "").trim(), tailLooksDate;
    if(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s/i.test(tail) || /GMT[+-]\d{4}|เวลาอินโดจีน/i.test(tail) || /^\d{4}-\d{1,2}-\d{1,2}(?:[T\s]|$)/.test(tail) || /^\d{1,2}[\/\-]\d{1,2}[\/\-](?:19|20|25)\d{2}$/.test(tail)) {
      var tailDate = new Date(tail.replace(/\s*\(.*?\)\s*/g, " ").replace(/เวลาอินโดจีน/g, "").trim());
      if(! isNaN(tailDate.getTime())) {
        var ty = tailDate.getFullYear();
        return ty < 2400 && (ty += 543), mixed[1] + "/" + String(ty)
      }
    }
  }
  if(_committeeMeetingIsDate_(v) || /^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s/i.test(raw) || /GMT[+-]\d{4}|เวลาอินโดจีน/i.test(raw) || /^\d{4}-\d{1,2}-\d{1,2}(?:[T\s]|$)/.test(raw)) {
    try {
      if(_appIsFnName_("_formatLetterNoFromDateValue_")) {
        var no = _formatLetterNoFromDateValue_(v);
        if(no)return no
      }
    }
    catch(_e) {
      _appIsFnName_("_recordWarning_") && _recordWarning_("ec", _e)
    }
    var dt = _committeeMeetingDateText_(v), dm = String(dt || "").match(/^0?(\d{1,2})\/\d{1,2}\/((?:19|20|25)\d{2})$/);
    if(dm)return dm[1] + "/" + dm[2]
  }
  return raw
}
function _committeeMeetingPublicMeeting_(row) {
  row = row || {
  };
  var out = {
  };
  return Object.keys(row).forEach(function(k) {
    out[k] = row[k]
  }), out.meetingId = _committeeMeetingText_(row.meetingId || ""), out.meetingNo = _committeeMeetingText_(row.meetingNo || ""), out.meetingDate = _committeeMeetingDateText_(row.meetingDate || row.date || ""), out.title = _committeeMeetingText_(row.title || "การประชุมคณะกรรมาธิการ"), out.status = _committeeMeetingText_(row.status || ""), out.note = _committeeMeetingText_(row.note || ""), out
}
function _committeeMeetingPublicItem_(row) {
  row = row || {
  };
  var out = {
  };
  return Object.keys(row).forEach(function(k) {
    out[k] = row[k]
  }), out.itemId = _committeeMeetingText_(row.itemId || ""), out.meetingId = _committeeMeetingText_(row.meetingId || ""), out.agendaNo = _committeeMeetingText_(row.agendaNo || ""), out.seq = Number(row.seq || 0) || 0, out.title = _committeeMeetingText_(row.title || ""), out.relatedMeetingNo = _committeeMeetingText_(row.relatedMeetingNo || ""), out.relatedMeetingDate = _committeeMeetingDateText_(row.relatedMeetingDate || ""), out.caseId = _committeeMeetingText_(row.caseId || ""), out.caseNum = _committeeMeetingCaseRefText_(row.caseNum || ""), out.recNo = _committeeMeetingCaseRefText_(row.recNo || ""), out.caseTitle = _committeeMeetingText_(row.caseTitle || ""), out.letterId = "", out.letterNo = "", out.letterSubject = "", out.agencyOrPresenter = _committeeMeetingText_(row.agencyOrPresenter || ""), out.result = _committeeMeetingText_(row.result || ""), out.note = _committeeMeetingText_(row.note || ""), out
}
function _committeeMeetingId_(prefix) {
  return String(prefix || "CM") + "-" + Utilities.getUuid().replace(/-/g, "").slice(0, 16).toUpperCase()
}
function _committeeMeetingNormalizeItem_(raw, meetingId, idx) {
  var agendaNo = _committeeMeetingText_((raw = raw || {
  }).agendaNo || raw.agenda || ""), itemId;
  return {
    itemId: _committeeMeetingText_(raw.itemId || "") || _committeeMeetingId_("CMI"), meetingId: meetingId, agendaNo: agendaNo, seq: Number(raw.seq || idx || 1) || 1, title: _committeeMeetingText_(raw.title || raw.caseTitle || raw.subject || ""), relatedMeetingNo: _committeeMeetingText_(raw.relatedMeetingNo || raw.certifyMeetingNo || ""), relatedMeetingDate: _committeeMeetingDateText_(raw.relatedMeetingDate || raw.certifyMeetingDate || ""), caseId: _committeeMeetingText_(raw.caseId || ""), caseNum: _committeeMeetingCaseRefText_(raw.caseNum || ""), recNo: _committeeMeetingCaseRefText_(raw.recNo || ""), caseTitle: _committeeMeetingText_(raw.caseTitle || raw.title || ""), letterId: "", letterNo: "", letterSubject: "", agencyOrPresenter: _committeeMeetingText_(raw.agencyOrPresenter || raw.agency || raw.presenter || ""), result: _committeeMeetingText_(raw.result || raw.resolution || raw.note || ""), note: _committeeMeetingText_(raw.note || ""), isDeleted: ! 1, deletedAt: ""
  }
}
function _committeeMeetingItemHasContent_(item) {
  return !! (_committeeMeetingText_(item.title) || _committeeMeetingText_(item.relatedMeetingNo) || _committeeMeetingText_(item.relatedMeetingDate) || _committeeMeetingText_(item.caseId) || _committeeMeetingText_(item.caseTitle) || _committeeMeetingText_(item.agencyOrPresenter) || _committeeMeetingText_(item.result) || _committeeMeetingText_(item.note))
}
function _committeeMeetingLinkCaseInfo_(item) {
  if((item = item || {
  }).caseId)try {
    var found = _safeResolveCaseIdentityAliases_({
      caseId: item.caseId, caseNum: item.caseNum, recNo: item.recNo, title: item.title, caseTitle: item.caseTitle
    }).case;
    found && (item.caseId = _committeeMeetingText_(found.caseId || item.caseId), item.caseNum = _committeeMeetingCaseRefText_(found.caseNum || item.caseNum), item.recNo = _committeeMeetingCaseRefText_(found.recNo || item.recNo), item.caseTitle = _committeeMeetingText_(found.caseTitle || found.title || item.caseTitle || item.title), item.title || (item.title = item.caseTitle))
  }
  catch(_e) {
    _recordWarning_("committee.meeting.case.link", _e)
  }
  return item
}
function _committeeMeetingSyncAgenda1And3ToHistory_(meeting, items) {
  var synced = [];
  return(items || []).forEach(function(item) {
    var agendaNo = String(item.agendaNo || "");
    if(("1" === agendaNo || "3" === agendaNo || "4" === agendaNo) && String(item.caseId || "").trim()) {
      var logId = "MSYS-" + String(item.itemId || "").replace(/[^A-Za-z0-9_-]/g, "").slice(0, 40), res = saveMeetingLog({
        logId: logId, currentLogId: logId, caseId: item.caseId, caseNum: item.caseNum, recNo: item.recNo, title: item.caseTitle || item.title, round: meeting.meetingNo, date: _committeeMeetingDateText_(meeting.meetingDate), note: item.result || item.note, result: item.result || item.note, summary: [_committeeMeetingAgendaLabel_(item.agendaNo), item.agencyOrPresenter].filter(function(v) {
          return !! _committeeMeetingText_(v)
        }).join(" / "), meetingId: meeting.meetingId
      });
      synced.push({
        itemId: item.itemId, caseId: item.caseId, logId: logId, result: res && res.data ? res.data: res
      })
    }
  }), synced
}
function _committeeMeetingSortableDate_(value) {
  if(_committeeMeetingIsDate_(value))return value.getTime();
  var raw = String(value || "").trim();
  if(! raw)return 0;
  var m = raw.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
  if(m) {
    var y = Number(m[3]);
    return y > 2400 && (y -= 543), new Date(y, Number(m[2]) - 1, Number(m[1])).getTime() || 0
  }
  var iso = raw.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if(iso) {
    var y2 = Number(iso[1]);
    return y2 > 2400 && (y2 -= 543), new Date(y2, Number(iso[2]) - 1, Number(iso[3])).getTime() || 0
  }
  var d = new Date(raw.replace(/\s*\(.*?\)\s*/g, " ").replace(/เวลาอินโดจีน/g, ""));
  return isNaN(d.getTime()) ? 0: d.getTime()
}
function _committeeMeetingMeetingHeaderMatch_(meeting, q) {
  return ! q || [(meeting = meeting || {
  }).meetingNo, _committeeMeetingDateText_(meeting.meetingDate), meeting.title, meeting.status, meeting.note].join(" ").toLowerCase().indexOf(q) >- 1;
  var hay
}
function _committeeMeetingItemMatch_(meeting, item, q, agendaFilter) {
  if(item = item || {
  }, agendaFilter && String(item.agendaNo || "") !== String(agendaFilter))return ! 1;
  if(! q)return ! 0;
  var title = _committeeMeetingAgendaTitle_(item), hay;
  return[meeting && meeting.meetingNo, meeting && _committeeMeetingDateText_(meeting.meetingDate), meeting && meeting.title, title, item.title, item.caseTitle, item.caseNum, item.recNo, item.agencyOrPresenter, item.result, item.note, _committeeMeetingAgendaLabel_(item.agendaNo)].join(" ").toLowerCase().indexOf(q) >- 1
}
function _committeeMeetingConsiderationDisplayTitle_(meeting, items) {
  function collect(agendaNo) {
    var out = [];
    return items.forEach(function(item) {
      if(String(item && item.agendaNo || "") === String(agendaNo)) {
        var title = _committeeMeetingText_(item && item.caseTitle || item && item.title || "");
        title && out.indexOf(title) < 0 && out.push(title)
      }
    }), out
  }
  meeting = meeting || {
  }, items = Array.isArray(items) ? items: [];
  var titles = collect("3");
  return titles.length || (titles = collect("1")), titles.length > 2 ? titles.slice(0, 2).join(" / ") + " และอีก " + (titles.length - 2) + " เรื่อง": titles.join(" / ") || _committeeMeetingText_(meeting.displayTitle || meeting.summaryTitle || meeting.title || "การประชุมคณะกรรมาธิการ")
}
function _committeeMeetingBuildBundle_(payload) {
  var meetingId = _committeeMeetingText_((payload = payload || {
  }).meetingId || payload.id || ""), q = _committeeMeetingText_(payload.query || payload.q || payload.keyword || "").toLowerCase(), agendaFilter = _committeeMeetingText_(payload.agendaNo || payload.agenda || ""), meetingsAll = _committeeMeetingRows_("CommitteeMeetings", ! 1), itemsAll = _committeeMeetingRows_("CommitteeMeetingAgendaItems", ! 1).map(_committeeMeetingPublicItem_), allGrouped = {
  };
  itemsAll.forEach(function(item) {
    var id = String(item.meetingId || "");
    allGrouped[id] || (allGrouped[id] = []), allGrouped[id].push(item)
  }), Object.keys(allGrouped).forEach(function(id) {
    allGrouped[id].sort(function(a, b) {
      return Number(a.agendaNo || 0) - Number(b.agendaNo || 0) || Number(a.seq || 0) - Number(b.seq || 0)
    })
  });
  var meetingsRaw, meetings = meetingsAll.filter(function(meeting) {
    var id = String(meeting.meetingId || "");
    if(meetingId)return id === meetingId;
    if(! q &&! agendaFilter)return ! 0;
    var rows = allGrouped[id] || [], hasAgenda =! agendaFilter || rows.some(function(item) {
      return String(item.agendaNo || "") === String(agendaFilter)
    });
    return ! (agendaFilter &&! hasAgenda) && (q ?!! _committeeMeetingMeetingHeaderMatch_(meeting, q) || rows.some(function(item) {
      return _committeeMeetingItemMatch_(meeting, item, q, agendaFilter)
    }): hasAgenda)
  }).sort(function(a, b) {
    var an = Number(String(a.meetingNo || "").replace(/[^0-9.\-]/g, "")), bn = Number(String(b.meetingNo || "").replace(/[^0-9.\-]/g, ""));
    if(! isNaN(an) &&! isNaN(bn) && an !== bn)return an - bn;
    var cmp = String(a.meetingNo || "").localeCompare(String(b.meetingNo || ""), "th", {
      numeric: ! 0, sensitivity: "base"
    }), av, bv;
    return 0 !== cmp ? cmp: _committeeMeetingSortableDate_(a.meetingDate) - _committeeMeetingSortableDate_(b.meetingDate)
  }).map(_committeeMeetingPublicMeeting_), ids = {
  };
  meetings.forEach(function(m) {
    ids[String(m.meetingId || "")] =! 0
  });
  var items = itemsAll.filter(function(item) {
    return ! 0 === ids[String(item.meetingId || "")]
  }), grouped = {
  };
  return items.forEach(function(item) {
    var id = String(item.meetingId || "");
    grouped[id] || (grouped[id] = []), grouped[id].push(item)
  }), Object.keys(grouped).forEach(function(id) {
    grouped[id].sort(function(a, b) {
      return Number(a.agendaNo || 0) - Number(b.agendaNo || 0) || Number(a.seq || 0) - Number(b.seq || 0)
    })
  }), meetings.forEach(function(meeting) {
    var id = String(meeting.meetingId || ""), displayTitle = _committeeMeetingConsiderationDisplayTitle_(meeting, grouped[id] || []);
    meeting.displayTitle = displayTitle, meeting.summaryTitle = displayTitle
  }), {
    meetings: meetings, items: items, itemsByMeetingId: grouped, spec: _committeeMeetingSheetSpec_(), filters: {
      query: q, agendaNo: agendaFilter, agendaLabel: agendaFilter ? _committeeMeetingAgendaLabel_(agendaFilter): "ทุกวาระ"
    }
  }
}
TrackingDomain.VERSION = "tracking-domain-final-current", TrackingDomain.normalize = function(res) {
  var data = res && res.data && "object" == typeof res.data ? res.data: res;
  if(data && "object" == typeof data) {
    var rows = Array.isArray(data.rows) ? data.rows: Array.isArray(data.data) ? data.data: Array.isArray(data.items) ? data.items: [];
    data.rows = rows, data.data = rows, data.items = rows, data.totalRecords = Number(data.totalRecords || data.total || rows.length || 0) || 0, data.total = data.totalRecords, data.page = Number(data.page || 1) || 1, data.limit = Number(data.limit || data.pageSize || 20) || 20, data.pageSize = data.limit, data.owner = "TrackingDomain.getTracking", data.domainOwner = "TrackingDomain", data.serverPaged =! 1 !== data.serverPaged
  }
  return res
}, TrackingDomain.getTracking = function(payload) {
  payload = payload || {
  };
  var res = _appIsFnName_("_getTrackingCore_") ? _getTrackingCore_(payload): {
    ok: ! 0, data: {
      rows: [], data: [], items: [], totalRecords: 0, page: 1, limit: Number(payload.limit || 20) || 20, owner: "TrackingDomain.getTracking"
    }
  };
  return TrackingDomain.normalize(res)
}, TrackingDomain.status = function() {
  return {
    ok: ! 0, owner: "TrackingDomain", boundary: TrackingDomain.BOUNDARY, physical: TrackingDomain.PHYSICAL, phase5: TrackingDomain.OWNER_CONTRACT_PHASE5, stamp: PHASE10_DOMAIN_PHYSICAL_STAMP, boundaryStamp: PHASE3_DOMAIN_BOUNDARY_STAMP, uiDomChanged: ! 1, businessLogicChanged: ! 1
  }
}, AppDomain.Repositories.CaseRepository = {
  search: function(payload) {
    return CaseDomain.searchCases(payload || {
    })
  }, readModel: function(payload) {
    return _caseSearchReadModel_(payload || {
    })
  }, facets: function(payload) {
    return _caseSearchReportFacets_(payload || {
    })
  }
};
CaseDomain.FACADE_PHASE5 = {
  owner: "Code_30_Domain_Cases:CaseService.ProductionOwner", repository: AppDomain.Repositories.CaseRepository, search: function(payload) {
    return CaseDomain.searchCases(payload || {
    })
  }, reportOptions: function(payload) {
    return CaseDomain.getReportOptions(payload || {
    })
  }, reportExportRows: function(payload) {
    return CaseDomain.getReportExportRows(payload || {
    })
  }, quickSummary: function(payload) {
    return CaseDomain.quickSummary(payload || {
    })
  }, meetingHistory: function(payload) {
    return"function" == typeof _caseAttachMeetingHistoryProduction_ ? _caseAttachMeetingHistoryProduction_(payload || {
    }): payload
  }, status: function() {
    return {
      ok: ! 0, owner: this.owner, uiDomChanged: ! 1, businessLogicChanged: ! 1
    }
  }
};
function apiGetCommitteeMeetingSystemSpec(payload) {
  return MeetingDomain.getSystemSpec(payload || {
  })
}
function apiListCommitteeMeetings(payload) {
  return MeetingDomain.listMeetings(payload || {
  })
}
function apiGetCommitteeMeetingSystem(payload) {
  return MeetingDomain.getSystem(payload || {
  })
}
function _committeeMeetingAgendaTitle_(item) {
  item = item || {
  };
  var agendaNo = String(item.agendaNo || ""), label;
  return"2" === agendaNo ? ["การประชุมครั้งที่ " + _committeeMeetingText_(item.relatedMeetingNo || ""), _committeeMeetingText_(item.relatedMeetingDate || "")].filter(function(v) {
    return v && "การประชุมครั้งที่ " !== v
  }).join(" / ") || _committeeMeetingText_(item.title || "รับรองบันทึกการประชุม"): _committeeMeetingText_("3" === agendaNo || "4" === agendaNo ? item.caseTitle || item.title || "": item.title || item.caseTitle || "")
}
function _committeeMeetingAgendaLabel_(agendaNo) {
  var m;
  return {
    1: "ระเบียบวาระที่ 1 เรื่องแจ้ง", 2: "ระเบียบวาระที่ 2 รับรองบันทึกการประชุม", 3: "ระเบียบวาระที่ 3 เรื่องพิจารณา", 4: "ระเบียบวาระที่ 4 เรื่องอื่น ๆ"
  }
  [String(agendaNo || "")] || "ระเบียบวาระ"
}
function _committeeMeetingPrintBundle_(payload) {
  var q = _committeeMeetingText_((payload = payload || {
  }).query || payload.keyword || "").toLowerCase(), agendaFilter = _committeeMeetingText_(payload.agendaNo || payload.agenda || ""), bundle = _committeeMeetingBuildBundle_({
    query: q, agendaNo: agendaFilter
  }), overviewRows = [], summaryMeetings = [], listMeetings = [];
  return(bundle.meetings || []).forEach(function(meeting) {
    var meetingId = String(meeting.meetingId || ""), displayTitle = _committeeMeetingText_(meeting.displayTitle || meeting.summaryTitle || meeting.title || "การประชุมคณะกรรมาธิการ");
    listMeetings.push({
      meetingId: meetingId, meetingNo: _committeeMeetingText_(meeting.meetingNo || ""), meetingDate: _committeeMeetingText_(meeting.meetingDate || ""), title: displayTitle, displayTitle: displayTitle, summaryTitle: displayTitle, note: _committeeMeetingText_(meeting.note || "")
    });
    var meetingItems = (bundle.itemsByMeetingId && bundle.itemsByMeetingId[meetingId] || []).filter(function(item) {
      return ! agendaFilter || String(item.agendaNo || "") === agendaFilter
    }), agenda13 = meetingItems.filter(function(item) {
      var agendaNo = String(item.agendaNo || "");
      return("1" === agendaNo || "3" === agendaNo || "4" === agendaNo) &&!! String(item.caseId || "").trim()
    }).map(function(item) {
      return {
        meetingId: meetingId, meetingNo: _committeeMeetingText_(meeting.meetingNo || ""), meetingDate: _committeeMeetingText_(meeting.meetingDate || ""), meetingTitle: displayTitle, displayTitle: displayTitle, agendaNo: _committeeMeetingText_(item.agendaNo || ""), agendaLabel: _committeeMeetingAgendaLabel_(item.agendaNo), title: _committeeMeetingAgendaTitle_(item), caseId: _committeeMeetingText_(item.caseId || ""), caseNum: _committeeMeetingCaseRefText_(item.caseNum || ""), recNo: _committeeMeetingCaseRefText_(item.recNo || ""), agencyOrPresenter: _committeeMeetingText_(item.agencyOrPresenter || ""), result: _committeeMeetingText_(item.result || item.note || "")
      }
    });
    overviewRows = overviewRows.concat(agenda13), summaryMeetings.push({
      meetingId: meetingId, meetingNo: _committeeMeetingText_(meeting.meetingNo || ""), meetingDate: _committeeMeetingText_(meeting.meetingDate || ""), title: displayTitle, displayTitle: displayTitle, note: _committeeMeetingText_(meeting.note || ""), items: meetingItems.map(function(item) {
        return {
          itemId: _committeeMeetingText_(item.itemId || ""), agendaNo: _committeeMeetingText_(item.agendaNo || ""), agendaLabel: _committeeMeetingAgendaLabel_(item.agendaNo), seq: Number(item.seq || 0) || 0, title: _committeeMeetingAgendaTitle_(item), relatedMeetingNo: _committeeMeetingText_(item.relatedMeetingNo || ""), relatedMeetingDate: _committeeMeetingText_(item.relatedMeetingDate || ""), caseId: _committeeMeetingText_(item.caseId || ""), caseNum: _committeeMeetingCaseRefText_(item.caseNum || ""), recNo: _committeeMeetingCaseRefText_(item.recNo || ""), agencyOrPresenter: _committeeMeetingText_(item.agencyOrPresenter || ""), result: _committeeMeetingText_(item.result || item.note || "")
        }
      })
    })
  }), {
    overviewRows: overviewRows, listMeetings: listMeetings, tableMeetings: listMeetings, summaryMeetings: summaryMeetings, filters: {
      query: q, agendaNo: agendaFilter, agendaLabel: agendaFilter ? _committeeMeetingAgendaLabel_(agendaFilter): "ทุกวาระ"
    }, generatedAt: (new Date).toISOString(), totalOverviewRows: overviewRows.length, totalListMeetings: listMeetings.length, totalSummaryMeetings: summaryMeetings.length
  }
}
function apiGetCommitteeMeetingPrintBundle(payload) {
  return MeetingDomain.getPrintBundle(payload || {
  })
}
function apiSearchMeetingAgendaCases(payload) {
  return MeetingDomain.searchAgendaCases(payload || {
  })
}
function apiSaveCommitteeMeetingSystem(payload) {
  return writeGateway_("apiSaveCommitteeMeetingSystem", payload || {
  }, function(input) {
    return MeetingDomain.saveSystem(input || {
    })
  }, "บันทึกการประชุมสำเร็จ", "บันทึกการประชุมไม่สำเร็จ")
}
function apiDeleteCommitteeMeetingSystem(payload) {
  return writeGateway_("apiDeleteCommitteeMeetingSystem", payload || {
  }, function(input) {
    return MeetingDomain.deleteSystem(input || {
    })
  }, "ลบการประชุมสำเร็จ", "ลบการประชุมไม่สำเร็จ")
}
MeetingDomain.VERSION = "meeting-domain-final-current", MeetingDomain.status = function() {
  return {
    ok: ! 0, owner: "MeetingDomain", boundary: MeetingDomain.BOUNDARY, physical: MeetingDomain.PHYSICAL, phase5: MeetingDomain.OWNER_CONTRACT_PHASE5, stamp: PHASE10_DOMAIN_PHYSICAL_STAMP, boundaryStamp: PHASE3_DOMAIN_BOUNDARY_STAMP, uiDomChanged: ! 1, businessLogicChanged: ! 1
  }
}, MeetingDomain.getSystemSpec = function(payload) {
  return payload = requireDomainRequest_(payload || {
  }, "viewer"), ok_(_committeeMeetingSheetSpec_(), "โหลดรายละเอียดชีตการประชุมคณะกรรมาธิการสำเร็จ")
}, MeetingDomain.listMeetings = function(payload) {
  var bundle = _committeeMeetingBuildBundle_((payload = requireDomainRequest_(payload || {
  }, "viewer")) || {
  });
  return ok_(bundle, "โหลดการประชุมคณะกรรมาธิการสำเร็จ")
}, MeetingDomain.getSystem = function(payload) {
  var bundle = _committeeMeetingBuildBundle_((payload = requireDomainRequest_(payload || {
  }, "viewer")) || {
  }), first = bundle.meetings && bundle.meetings[0] || null;
  return ok_({
    meeting: first, items: first && bundle.itemsByMeetingId[String(first.meetingId || "")] || [], spec: bundle.spec
  }, first ? "โหลดข้อมูลการประชุมสำเร็จ": "ไม่พบข้อมูลการประชุม")
}, MeetingDomain.getPrintBundle = function(payload) {
  return payload = requireDomainRequest_(payload || {
  }, "viewer"), ok_(_committeeMeetingPrintBundle_(payload || {
  }), "โหลดข้อมูลพิมพ์การประชุมคณะกรรมาธิการสำเร็จ")
}, MeetingDomain.searchAgendaCases = function(payload) {
  var q = _committeeMeetingText_((payload = requireDomainRequest_(payload || {
  }, "viewer")).query || payload.q || "").toLowerCase();
  if(q.length < 1)return ok_({
    rows: []
  }, "กรุณาระบุคำค้น");
  var limit = Number(payload.limit || 30) || 30, rows, out = _caseDomainSharedRows_("MainData", ["caseId", "caseNum", "recNo", "title", "caseTitle", "petitioners", "respondent", "status", "agencyName", "updatedAt", "createdAt", "isDeleted", "deletedAt"], {
    includeDeleted: ! 1, requireCanonical: ! 0, ttl: 180
  }).filter(function(r) {
    return ! isSoftDeletedRow_(r) && [_committeeMeetingCaseRefText_(r.caseNum || ""), _committeeMeetingCaseRefText_(r.recNo || ""), r.title, r.caseTitle, r.petitioners, r.respondent, r.status, r.agencyName].join(" ").toLowerCase().indexOf(q) >- 1;
    var caseNum, recNo, hay
  }).slice(0, limit).map(function(r) {
    var caseNum = _committeeMeetingCaseRefText_(r.caseNum || ""), recNo = _committeeMeetingCaseRefText_(r.recNo || "");
    return {
      caseId: String(r.caseId || ""), caseNum: caseNum, recNo: recNo, title: String(r.title || ""), caseTitle: String(r.caseTitle || r.title || ""), petitioners: String(r.petitioners || ""), respondent: String(r.respondent || ""), status: String(r.status || ""), agencyName: String(r.agencyName || "")
    }
  });
  return ok_({
    rows: out, totalRecords: out.length
  }, "ค้นหาเรื่องพิจารณาสำเร็จ")
}, MeetingDomain.saveSystem = function(payload) {
  return payload = requireDomainRequest_(payload || {
  }, "staff"), domainWrite_("apiSaveCommitteeMeetingSystem", payload, function(input) {
    ensureCanonicalHeadersForNewSheet_("CommitteeMeetings"), ensureCanonicalHeadersForNewSheet_("CommitteeMeetingAgendaItems");
    var now = (new Date).toISOString(), meetingInput = input.meeting || input || {
    }, meetingId = _committeeMeetingText_(meetingInput.meetingId || input.meetingId || "") || _committeeMeetingId_("CMTG"), meeting = {
      meetingId: meetingId, meetingNo: _committeeMeetingText_(meetingInput.meetingNo || meetingInput.round || input.meetingNo || ""), meetingDate: _committeeMeetingDateText_(meetingInput.meetingDate || meetingInput.date || input.meetingDate || ""), title: _committeeMeetingText_(meetingInput.title || "การประชุมคณะกรรมาธิการ"), status: _committeeMeetingText_(meetingInput.status || "บันทึก"), note: _committeeMeetingText_(meetingInput.note || ""), isDeleted: ! 1, deletedAt: ""
    };
    if(! meeting.meetingNo)throw new Error("กรุณาระบุการประชุมครั้งที่");
    if(! meeting.meetingDate)throw new Error("กรุณาระบุวันเดือนปีการประชุม");
    var meetingResult = _committeeMeetingRepo_("committee.meetings").upsert(meetingId, meeting), incoming = [];
    ["agenda1", "agenda2", "agenda3", "agenda4"].forEach(function(k, idx) {
      var arr = input[k] || [];
      Array.isArray(arr) || (arr = []), arr.forEach(function(row, i) {
        (row = row || {
        }).agendaNo = String(idx + 1), row.seq = row.seq || i + 1, incoming.push(row)
      })
    }), Array.isArray(input.items) && (incoming = incoming.concat(input.items));
    var repo = _committeeMeetingRepo_("committee.meetingAgendaItems"), existing = repo.listActive().filter(function(r) {
      return String(r.meetingId || "") === meetingId
    }), keep = {
    }, saved = [];
    incoming.forEach(function(row, i) {
      var item = _committeeMeetingNormalizeItem_(row, meetingId, i + 1);
      if(_committeeMeetingItemHasContent_(item = _committeeMeetingLinkCaseInfo_(item))) {
        var res = repo.upsert(item.itemId, item, {
          now: now
        });
        keep[item.itemId] =! 0, saved.push(res.row || item)
      }
    }), existing.forEach(function(row) {
      var id = String(row.itemId || "");
      id &&! keep[id] && repo.softDelete(id, {
        deletedAt: now, updatedAt: now
      })
    });
    var synced = _committeeMeetingSyncAgenda1And3ToHistory_(meeting, saved);
    return _appIsFnName_("_invalidateMeetingDerivedCaches_") && _invalidateMeetingDerivedCaches_("committeeMeetingSystem"), "function" == typeof invalidateSheetCache_ && (invalidateSheetCache_("CommitteeMeetings"), invalidateSheetCache_("CommitteeMeetingAgendaItems"), invalidateSheetCache_("MeetingLogs")), ok_({
      meetingId: meetingId, mode: meetingResult.mode, items: saved, syncedMeetingLogs: synced
    }, "บันทึกการประชุมคณะกรรมาธิการสำเร็จ")
  })
}, MeetingDomain.deleteSystem = function(payload) {
  return payload = requireDomainRequest_(payload || {
  }, "staff"), domainWrite_("apiDeleteCommitteeMeetingSystem", payload, function(input) {
    var meetingId = _committeeMeetingText_(input.meetingId || input.id || "");
    if(! meetingId)throw new Error("ไม่พบรหัสการประชุม");
    var now = (new Date).toISOString();
    return _committeeMeetingRepo_("committee.meetings").softDelete(meetingId, {
      deletedAt: now, updatedAt: now
    }), _committeeMeetingRepo_("committee.meetingAgendaItems").listActive().filter(function(r) {
      return String(r.meetingId || "") === meetingId
    }).forEach(function(r) {
      _committeeMeetingRepo_("committee.meetingAgendaItems").softDelete(String(r.itemId || ""), {
        deletedAt: now, updatedAt: now
      })
    }), "function" == typeof invalidateSheetCache_ && (invalidateSheetCache_("CommitteeMeetings"), invalidateSheetCache_("CommitteeMeetingAgendaItems")), ok_({
      meetingId: meetingId
    }, "ลบข้อมูลการประชุมสำเร็จ")
  })
};
