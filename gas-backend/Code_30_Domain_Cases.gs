var __APP_GLOBAL__ =
    (typeof __APP_GLOBAL__ != "undefined" && __APP_GLOBAL__) ||
    (typeof globalThis != "undefined" && globalThis) ||
    this ||
    {},
  AppDomain = (__APP_GLOBAL__.AppDomain = __APP_GLOBAL__.AppDomain || {}),
  CaseDomain = (__APP_GLOBAL__.CaseDomain = __APP_GLOBAL__.CaseDomain || {}),
  TrackingDomain = (__APP_GLOBAL__.TrackingDomain =
    __APP_GLOBAL__.TrackingDomain || {}),
  MeetingDomain = (__APP_GLOBAL__.MeetingDomain =
    __APP_GLOBAL__.MeetingDomain || {}),
  DashboardDomain = (__APP_GLOBAL__.DashboardDomain =
    __APP_GLOBAL__.DashboardDomain || {}),
  CASE_DOMAIN_DTO_REFACTOR_STAMP =
    "case-domain-dto-no-envelope-refactor-2026-06-15",
  PHASE5_CASE_DOMAIN_OWNER_STAMP = "phase5-domain-owner-cleanup-current",
  PHASE3_DOMAIN_BOUNDARY_STAMP =
    "c5-case-tracking-meeting-domain-owner-current",
  PHASE10_DOMAIN_PHYSICAL_STAMP = "c5-domain-physical-owner-lock-current",
  _CDO_ = "Code_30_Domain_Cases",
  _CWR_ = ["apiSaveCase", "apiDeleteCase"],
  _TWR_ = ["apiSaveLetter", "apiDeleteLetter"],
  _MWR_ = [
    "apiSaveMeetingLog",
    "apiDeleteMeetingLog",
    "apiSaveCommitteeMeetingSystem",
    "apiDeleteCommitteeMeetingSystem",
  ],
  _C30K_CASE_NUM_ = [
    "caseNum",
    "caseNo",
    "runningNo",
    "ลำดับเรื่อง",
    "เลขลำดับเรื่อง",
    "ลำดับเรื่องพิจารณา",
    "เลขที่ลำดับเรื่อง",
    "หมายเลขลำดับเรื่อง",
    "เลขที่เรื่องพิจารณา",
    "เลขลำดับเรื่องพิจารณา",
    "หมายเลขเรื่องพิจารณา",
  ],
  _C30K_PENDING_REASON_ = [
    "pendingRemark",
    "pendingReason",
    "waitReason",
    "waitingReason",
    "statusReason",
    "decisionReason",
    "reason",
    "เหตุผล",
    "เหตุผลรอพิจารณา",
    "เหตุผลรอการพิจารณา",
    "หมายเหตุรอพิจารณา",
    "หมายเหตุรอการพิจารณา",
  ],
  _C30K_PETITIONER_PHONE_ = [
    "petitionerPhone",
    "petitionerTel",
    "petitionerTelephone",
    "petitionerMobile",
    "petitionerContactPhone",
    "proposerPhone",
    "proposerTel",
    "proposerTelephone",
    "proposerMobile",
    "complainantPhone",
    "complainantTel",
    "complainantTelephone",
    "complainantMobile",
    "phone",
    "tel",
    "telephone",
    "mobile",
    "contactPhone",
    "phoneNumber",
    "เบอร์โทรศัพท์ผู้เสนอญัตติ/ผู้ร้อง",
    "เบอร์โทรผู้เสนอญัตติ/ผู้ร้อง",
    "โทรศัพท์ผู้เสนอญัตติ/ผู้ร้อง",
    "เบอร์โทรศัพท์ผู้ร้อง",
    "เบอร์โทรผู้ร้อง",
    "โทรศัพท์ผู้ร้อง",
    "เบอร์โทรศัพท์ผู้เสนอ",
    "เบอร์โทรผู้เสนอ",
    "โทรศัพท์ผู้เสนอ",
    "เบอร์โทรศัพท์",
    "เบอร์โทร",
    "โทรศัพท์",
    "หมายเลขโทรศัพท์",
    "มือถือ",
  ],
  _C30K_SENT_AGENCY_ = [
    "sentAgency",
    "sendToAgency",
    "sentToAgency",
    "forwardedAgency",
    "forwardAgency",
    "forwardToAgency",
    "sentAgencyName",
    "หน่วยงานที่ส่ง",
    "ส่งให้หน่วยงาน",
    "ส่งหน่วยงาน",
    "หน่วยงานที่เกี่ยวข้อง",
  ],
  _C30K_CO_ASSIGNEES_ = [
    "coAssignees",
    "coAssignee",
    "coOwners",
    "coResponsible",
    "ผู้รับผิดชอบร่วม",
    "ผู้ร่วมรับผิดชอบ",
  ],
  _C30K_SUBCOMMITTEE_NAME_ = [
    "subcommitteeName",
    "subcommittee",
    "subCommitteeName",
    "คณะอนุกรรมาธิการ",
  ],
  _C30K_CASE_TITLE_ = [
    "caseTitle",
    "considerationTitle",
    "caseConsiderationTitle",
    "titleConsider",
    "considerTitle",
    "ชื่อเรื่องพิจารณา (ถ้ามี)",
    "ชื่อเรื่องพิจารณา",
    "เรื่องพิจารณา",
  ],
  _C30K_TITLE_ = [
    "title",
    "subject",
    "caseSubject",
    "เรื่อง",
    "ชื่อเรื่อง",
    "เรื่องร้องเรียน",
  ],
  _C30K_PETITIONERS_ = [
    "petitioners",
    "petitioner",
    "petitionerName",
    "ผู้ร้อง",
    "ผู้เสนอญัตติ",
    "ผู้เสนอญัตติ/ผู้ร้อง",
  ],
  _C30K_OFFER_DATE_ = [
    "offerDate",
    "bookDate",
    "letterDate",
    "dateProposed",
    "proposalDate",
    "proposeDate",
    "proposedDate",
    "submittedDate",
    "submitDate",
    "dateSubmitted",
    "วันที่หนังสือ",
    "วันที่เสนอ",
    "วันที่เสนอเรื่อง",
    "วันเดือนปีที่เสนอ",
    "วันที่ยื่น",
    "วันที่ยื่นเรื่อง",
  ],
  _C30K_CLOSED_REASON_ = [
    "closedReason",
    "closeReason",
    "terminateReason",
    "stopReason",
    "endReason",
    "caseCloseReason",
    "caseEndReason",
    "statusReason",
    "decisionReason",
    "reason",
    "เหตุผล",
    "เหตุผลยุติเรื่อง",
    "เหตุผลการยุติเรื่อง",
  ],
  _C30K_RESPONDENT_ = [
    "respondent",
    "agencyName",
    "accusedAgency",
    "accused",
    "agency",
    "หน่วยงาน/ผู้ถูกร้อง",
    "หน่วยงาน/ผู้ถูกร้อง",
    "ผู้ถูกร้อง",
    "หน่วยงาน",
  ],
  _C30K_STAFFS_ = [
    "staffs",
    "secretariatOfficer",
    "operationOfficer",
    "opStaff",
    "operator",
    "responsibleOfficer",
    "operationStaff",
    "staff",
    "officer",
    "เจ้าหน้าที่ฝ่ายเลขานุการ",
    "เจ้าหน้าที่ฝ่ายเลขานุการ",
  ],
  _C30K_TITLE_NAME_ = [
    "title",
    "subject",
    "caseSubject",
    "caseName",
    "name",
    "เรื่อง",
    "ชื่อเรื่อง",
    "หัวข้อเรื่อง",
  ],
  _C30K_PETITIONERS_FULL_ = [
    "petitioners",
    "petitioner",
    "petitionerName",
    "requester",
    "complainant",
    "proposer",
    "motionProposer",
    "ผู้เสนอญัตติ/ผู้ร้อง",
    "ผู้ร้อง",
    "ผู้เสนอญัตติ",
  ],
  _C30K_RESPONDENT_SPACED_ = [
    "respondent",
    "agencyName",
    "accusedAgency",
    "accused",
    "agency",
    "หน่วยงาน / ผู้ถูกร้อง",
    "หน่วยงาน/ผู้ถูกร้อง",
    "ผู้ถูกร้อง",
    "หน่วยงาน",
  ],
  _C30K_CANONICAL_REPORT_BASE_ = [
    "caseId",
    "id",
    "caseNum",
    "caseNo",
    "runningNo",
    "recNo",
    "receiveNo",
    "title",
    "subject",
    "caseTitle",
    "considerationTitle",
    "petitioners",
    "petitionerName",
    "status",
    "cat",
    "subCat",
    "assignees",
    "staffs",
    "coAssignees",
    "agencyName",
    "respondent",
    "recDate",
    "recDateText",
    "receiveDate",
    "receiveDateText",
    "type",
    "typeLabel",
    "ลำดับเรื่อง",
    "เลขรับเรื่อง",
    "วันที่รับเรื่อง",
    "ชื่อเรื่องพิจารณา (ถ้ามี)",
    "ผู้เสนอญัตติ/ผู้ร้อง",
  ];
function _s_(v) {
  return String(v || "");
}
function _a_(v) {
  return _c30A_(v) ? v.slice() : [];
}
function _cm_(o) {
  return _c30O_({ uiDomChanged: !1, businessLogicChanged: !1 }, o || {});
}
function _c30S_(v) {
  return String(v == null ? "" : v);
}
function _c30W_(k, e, c) {
  return _appIsFnName_("_recordWarning_") && _recordWarning_(k, e, c);
}
function _c30A_(v) {
  return Array.isArray(v);
}
function _c30O_() {
  return Object.assign.apply(Object, arguments);
}
function _c30H_(o, k) {
  return Object.prototype.hasOwnProperty.call(o, k);
}
var PHASEC_DOMAIN_CONSOLIDATION_STAMP =
  "phaseC-code30-domain-status-consolidation-current";
function _domainStatusPhaseC_(domain, name, extra) {
  var out = {
    ok: !0,
    owner: name,
    phase5: domain.OWNER_CONTRACT_PHASE5,
    uiDomChanged: !1,
    businessLogicChanged: !1,
    phaseCStamp: PHASEC_DOMAIN_CONSOLIDATION_STAMP,
  };
  (domain.BOUNDARY && (out.boundary = domain.BOUNDARY),
    domain.PHYSICAL && (out.physical = domain.PHYSICAL),
    domain.VERSION && (out.version = domain.VERSION),
    (domain.BOUNDARY || domain.PHYSICAL) &&
      ((out.stamp = PHASE10_DOMAIN_PHYSICAL_STAMP),
      (out.boundaryStamp = PHASE3_DOMAIN_BOUNDARY_STAMP)));
  return _c30O_(out, extra || {});
}
function _phaseCDomainConsolidationContract_() {
  return _cm_({
    ok: !0,
    stamp: PHASEC_DOMAIN_CONSOLIDATION_STAMP,
    owner: _CDO_,
    consolidated: [
      "CaseDomain.status",
      "TrackingDomain.status",
      "MeetingDomain.status",
      "DashboardDomain.status",
    ],
    singleStatusFactory: "_domainStatusPhaseC_",
    apiNamesPreserved: !0,
    noNewFiles: !0,
  });
}
var PHASED_CODE30_MAPPER_DEDUP_STAMP =
  "phaseD-code30-status-mapper-dedup-current";
function _caseStatusNormalizePhaseD_(value, opts) {
  opts = opts || {};
  var fallback = String(opts.defaultStatus || "เรื่องเข้าใหม่"),
    raw = _c30S_(value).trim(),
    compact = raw.replace(/\s+/g, "");
  try {
    if (
      typeof AppBackendCore != "undefined" &&
      AppBackendCore &&
      typeof AppBackendCore.normalizeCaseStatus == "function"
    ) {
      var normalized = AppBackendCore.normalizeCaseStatus(raw, {
        defaultStatus: fallback,
        strict: opts.strict === !0,
      });
      if (normalized) return normalized;
    }
  } catch (_phaseDStatusErr) {
    _c30W_(String(opts.warningKey || "case.status.phaseD"), _phaseDStatusErr, {
      value: value,
    });
  }
  return !compact
    ? fallback
    : /^(รับเรื่อง|ได้รับเรื่อง|เรื่องใหม่|รับเข้า|รับ)$/.test(compact)
      ? "เรื่องเข้าใหม่"
      : /^(อยู่ระหว่างดำเนินการ|รอติดตาม)$/.test(compact)
        ? "รอพิจารณา"
        : raw || fallback;
}
function _phaseDCode30MapperDedupContract_() {
  return _cm_({
    ok: !0,
    stamp: PHASED_CODE30_MAPPER_DEDUP_STAMP,
    owner: _CDO_,
    consolidated: [
      "_caseNormalizeStatusForDisplay_",
      "_caseReportStatusPhase3_",
      "_dashboardNormalizeCaseStatusForCount_",
    ],
    singleStatusMapper: "_caseStatusNormalizePhaseD_",
    apiNamesPreserved: !0,
    noNewFiles: !0,
    uiDomChanged: !1,
    businessLogicChanged: !1,
  });
}
var PHASED2_CODE30_ROW_DATE_MAPPER_DEDUP_STAMP =
  "phaseD2-code30-row-date-mapper-dedup-current";
function _caseD2Pad2_(value) {
  return String(Number(value) || 0).padStart(2, "0");
}
function _caseD2ThaiYear_(year) {
  year = Number(_c30S_(year).replace(/[^0-9]/g, "")) || 0;
  return year
    ? year >= 3600 && year <= 3700
      ? year - 1086
      : year >= 3e3 && year <= 3200
        ? year - 543
        : year < 100
          ? year + 2500
          : year < 2400
            ? year + 543
            : year
    : 0;
}
function _caseD2CivilYear_(year) {
  year = _caseD2ThaiYear_(year);
  return year > 2400 ? year - 543 : year;
}
function _caseDateOnlyPhaseD2_(value) {
  if (value == null || value === "") return null;
  try {
    var d = null;
    if (
      Object.prototype.toString.call(value) === "[object Date]" &&
      !isNaN(value.getTime())
    )
      d = new Date(value.getFullYear(), value.getMonth(), value.getDate());
    else if (
      typeof value === "number" &&
      isFinite(value) &&
      value > 2e4 &&
      value < 4e5
    ) {
      var serial = new Date(Math.round(864e5 * (value - 25569)));
      d = new Date(
        serial.getUTCFullYear(),
        serial.getUTCMonth(),
        serial.getUTCDate(),
      );
    } else {
      var text = _c30S_(value)
        .replace(/^'+/, "")
        .replace(/[\u00A0\u200B-\u200D\uFEFF]/g, "")
        .trim();
      if (!text) return null;
      if (/^\d+(?:\.0+)?$/.test(text)) {
        var serialNumber = Number(text);
        if (
          isFinite(serialNumber) &&
          serialNumber > 2e4 &&
          serialNumber < 4e5
        ) {
          var serialText = new Date(Math.round(864e5 * (serialNumber - 25569)));
          d = new Date(
            serialText.getUTCFullYear(),
            serialText.getUTCMonth(),
            serialText.getUTCDate(),
          );
        }
      }
      if (!d) {
        var iso = text.match(/^(\d{4})-(\d{1,2})-(\d{1,2})(?:[T\s]|$)/);
        if (iso)
          d = new Date(
            _caseD2CivilYear_(iso[1]),
            Number(iso[2]) - 1,
            Number(iso[3]),
          );
        else {
          var th = text.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})$/);
          if (th)
            d = new Date(
              _caseD2CivilYear_(th[3]),
              Number(th[2]) - 1,
              Number(th[1]),
            );
          else if (
            /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s/i.test(text) ||
            /GMT[+-]\d{4}|เวลาอินโดจีน|^[A-Z][a-z]{2}\s+[A-Z][a-z]{2}\s+\d{1,2}\s+\d{4}/.test(
              text,
            )
          ) {
            var parsed = new Date(
              text
                .replace(/\s*\(.*?\)\s*/g, " ")
                .replace(/เวลาอินโดจีน/g, "")
                .trim(),
            );
            if (!isNaN(parsed.getTime()))
              d = new Date(
                parsed.getFullYear(),
                parsed.getMonth(),
                parsed.getDate(),
              );
          } else {
            var parsed2 = new Date(text);
            if (!isNaN(parsed2.getTime()))
              d = new Date(
                parsed2.getFullYear(),
                parsed2.getMonth(),
                parsed2.getDate(),
              );
          }
        }
      }
    }
    if (!d || isNaN(d.getTime())) return null;
    d.getFullYear() > 2400 &&
      (d = new Date(d.getFullYear() - 543, d.getMonth(), d.getDate()));
    return (d.setHours(0, 0, 0, 0), d);
  } catch (_phaseD2DateOnlyErr) {
    return (
      _c30W_("case.date.phaseD2", _phaseD2DateOnlyErr, { value: value }),
      null
    );
  }
}
function _caseDateTextPhaseD2_(value, opts) {
  opts = opts || {};
  if (value == null || value === "") return "";
  var d = _caseDateOnlyPhaseD2_(value);
  if (d) {
    var be = d.getFullYear() < 2400 ? d.getFullYear() + 543 : d.getFullYear();
    return (
      _caseD2Pad2_(d.getDate()) +
      "/" +
      _caseD2Pad2_(d.getMonth() + 1) +
      "/" +
      String(be)
    );
  }
  var raw = _c30S_(value).trim();
  return opts.preserveRaw === !0 ? raw : "";
}
function _caseRowPickPhaseD2_(row, aliases, defaultValue) {
  ((row = row || {}), (aliases = _c30A_(aliases) ? aliases : [aliases]));
  for (var i = 0; i < aliases.length; i += 1) {
    var key = aliases[i];
    if (
      key &&
      _c30H_(row, key) &&
      row[key] != null &&
      String(row[key]).trim() !== ""
    )
      return row[key];
  }
  return defaultValue == null ? "" : defaultValue;
}
function _phaseD2Code30RowDateMapperDedupContract_() {
  return _cm_({
    ok: !0,
    stamp: PHASED2_CODE30_ROW_DATE_MAPPER_DEDUP_STAMP,
    owner: _CDO_,
    consolidated: [
      "_committeeMeetingDateText_",
      "_dashboardDate_",
      "_trackingDateOnly_",
      "_trackingDueDateOnly_",
      "_normalizeLetterDateFromFields_",
    ],
    singleDateMapper: "_caseDateTextPhaseD2_/_caseDateOnlyPhaseD2_",
    singleRowPicker: "_caseRowPickPhaseD2_",
    apiNamesPreserved: !0,
    noNewFiles: !0,
    uiDomChanged: !1,
    businessLogicChanged: !1,
  });
}
CaseDomain.dto = function (data, meta) {
  return _c30O_(
    {
      domain: "cases",
      contractOwner: _CDO_,
      stamp: CASE_DOMAIN_DTO_REFACTOR_STAMP,
    },
    data || {},
    { meta: _c30O_({ dtoOnly: !0 }, meta || {}) },
  );
};
function _caseDomainOwnerContractPhase5_(n, s, r, w) {
  return _cm_({
    ok: !0,
    owner: _s_(n),
    codeOwner: _CDO_,
    stamp: PHASE5_CASE_DOMAIN_OWNER_STAMP,
    sourceOfTruth: _a_(s),
    readOwner: _s_(r),
    writeOwner: _s_(w),
    apiFacadeMode: "thin-api-to-domain-owner",
    apiNamesPreserved: !0,
    noNewFiles: !0,
  });
}
function _domainBoundaryPhase3_(n, p, apis, h, w) {
  return _cm_({
    name: _s_(n),
    purpose: _s_(p),
    owner: _CDO_,
    stamp: PHASE3_DOMAIN_BOUNDARY_STAMP,
    api: _a_(apis),
    helpersPrefix: _s_(h),
    writes: _a_(w),
  });
}
function _domainPhysicalSectionPhase10_(n, o, p, api, h, s, w) {
  return _cm_({
    name: _s_(n),
    owner: _s_(o),
    purpose: _s_(p),
    apiPrefix: _s_(api || "api"),
    helperPrefixes: _a_(h),
    sourceSheets: _a_(s),
    writes: _a_(w),
    stamp: PHASE10_DOMAIN_PHYSICAL_STAMP,
    apiNamesPreserved: !0,
  });
}
[
  [
    CaseDomain,
    "CaseDomain",
    "case",
    [
      "apiSaveCase",
      "apiDeleteCase",
      "apiSearch",
      "apiGetCaseContext",
      "apiSearchCasesLite",
      "apiGetCaseReportExportRows",
      "apiGetCases",
      "apiGetCasesBundle",
      "apiGetCaseReportOptions",
    ],
    "_case",
    _CWR_,
  ],
  [
    TrackingDomain,
    "TrackingDomain",
    "tracking",
    [
      "apiGetTracking",
      "apiGetLetters",
      "apiSaveLetter",
      "apiDeleteLetter",
      "apiGetAllLettersWithCaseInfo",
    ],
    "_tracking",
    _TWR_,
  ],
  [
    MeetingDomain,
    "MeetingDomain",
    "meeting",
    [
      "apiGetMeetingLookupOptions",
      "apiGetMeetingHistory",
      "apiSaveMeetingLog",
      "apiDeleteMeetingLog",
      "apiListCommitteeMeetings",
      "apiGetCommitteeMeetingSystem",
      "apiGetCommitteeMeetingSystemSpec",
      "apiSearchMeetingAgendaCases",
      "apiGetCommitteeMeetingPrintBundle",
      "apiSaveCommitteeMeetingSystem",
      "apiDeleteCommitteeMeetingSystem",
    ],
    "_committeeMeeting",
    _MWR_,
  ],
].forEach(function (d) {
  d[0].BOUNDARY = _domainBoundaryPhase3_(d[1], d[2], d[3], d[4], d[5]);
});
[
  [
    CaseDomain,
    "Case physical cluster",
    "Code_30_Domain_Cases.gs:CaseDomain",
    "case",
    ["_case", "_Domain_getCase", "_dashboardCase"],
    ["MainData", "MeetingLogs", "Letters"],
    _CWR_,
  ],
  [
    TrackingDomain,
    "Tracking physical cluster",
    "Code_30_Domain_Cases.gs:TrackingDomain",
    "tracking",
    ["_tracking", "_letter", "_meetingLetters"],
    ["Letters", "MainData"],
    _TWR_,
  ],
  [
    MeetingDomain,
    "Meeting physical cluster",
    "Code_30_Domain_Cases.gs:MeetingDomain",
    "meeting",
    ["_meeting", "_committeeMeeting"],
    ["MeetingLogs", "CommitteeMeetings", "CommitteeMeetingAgendaItems"],
    _MWR_,
  ],
].forEach(function (d) {
  d[0].PHYSICAL = _domainPhysicalSectionPhase10_(
    d[1],
    d[2],
    d[3],
    "api",
    d[4],
    d[5],
    d[6],
  );
});

/* ============================================================================
 * Code_30_Domain_Cases.gs internal owners (R146, no new files / no new APIs)
 * --------------------------------------------------------------------------
 * CaseDomain      : MainData search/report/canonical case bundle/save/delete
 * MeetingDomain   : MeetingLogs + CommitteeMeetingAgendaItems history linkage
 * TrackingDomain  : Letters tracking/follow-up linkage to case sequence
 * DashboardDomain : Dashboard read-model bundle; budget remains BudgetDomain
 * SharedRelation  : _caseSequenceFrom_ / _stampCaseSequenceIdentity_ /
 *                   _caseChildRowBelongsToResolvedCase_ only
 * ========================================================================== */
var CASE_DOMAIN_INTERNAL_OWNER_SECTIONS_R146 = Object.freeze({
  CaseDomain: "MainData case search/report/canonical bundle owner",
  MeetingDomain: "MeetingLogs and agenda history relation owner",
  TrackingDomain: "Letters and follow-up relation owner",
  DashboardDomain: "Dashboard case bundle read owner",
  SharedRelation: "Sequence/caseId relation helpers shared inside Code_30 only",
  rules: Object.freeze({ noNewApi: true, noNewFiles: true, singleFileOwners: true })
});

function _domainPhysicalContractPhase10_() {
  return {
    ok: !0,
    stamp: PHASE10_DOMAIN_PHYSICAL_STAMP,
    owner: _CDO_,
    physical: {
      cases: CaseDomain.PHYSICAL,
      tracking: TrackingDomain.PHYSICAL,
      meeting: MeetingDomain.PHYSICAL,
    },
    rules: _cm_({
      apiNamesPreserved: !0,
      noRouteRenamed: !0,
      noNewFiles: !0,
      physicalCleanupOnly: !0,
    }),
  };
}
function _domainBoundaryContractPhase3_() {
  return {
    ok: !0,
    stamp: PHASE3_DOMAIN_BOUNDARY_STAMP,
    owner: _CDO_,
    domains: {
      cases: CaseDomain.BOUNDARY,
      tracking: TrackingDomain.BOUNDARY,
      meeting: MeetingDomain.BOUNDARY,
    },
    physical: _domainPhysicalContractPhase10_(),
    rules: _cm_({
      routerFacadeOnly: !0,
      apiNamesPreserved: !0,
      noNewFiles: !0,
      productionPhysicalCleanup: !0,
    }),
  };
}
CaseDomain.PHASEC_CONSOLIDATION = _phaseCDomainConsolidationContract_();
CaseDomain.PHASED_MAPPER_DEDUP = _phaseDCode30MapperDedupContract_();
CaseDomain.PHASED2_ROW_DATE_MAPPER_DEDUP =
  _phaseD2Code30RowDateMapperDedupContract_();
[
  [
    CaseDomain,
    "CaseDomain",
    ["MainData", "MeetingLogs", "Letters"],
    "CaseDomain.searchCases / CaseDomain.getReportOptions / CaseDomain.getReportExportRows / CaseDomain.quickSummary",
    "apiSaveCase / apiDeleteCase",
  ],
  [
    DashboardDomain,
    "DashboardDomain",
    ["MainData", "MeetingLogs", "Letters"],
    "DashboardDomain.getBundle + BudgetDomain.getDashboardSummaryForDashboard",
    "read-only; budget delegated to BudgetDomain",
  ],
  [
    TrackingDomain,
    "TrackingDomain",
    ["Letters", "MainData"],
    "TrackingDomain.getTracking / TrackingDomain.getLetters",
    "TrackingDomain.saveLetter / TrackingDomain.deleteLetter",
  ],
  [
    MeetingDomain,
    "MeetingDomain",
    [
      "MeetingLogs",
      "CommitteeMeetings",
      "CommitteeMeetingAgendaItems",
      "MainData",
    ],
    "MeetingDomain.getHistory / MeetingDomain.listMeetings / MeetingDomain.getSystem",
    "MeetingDomain.saveLog / MeetingDomain.saveSystem",
  ],
].forEach(function (d) {
  d[0].OWNER_CONTRACT_PHASE5 = _caseDomainOwnerContractPhase5_(
    d[1],
    d[2],
    d[3],
    d[4],
  );
});
/* R146: single relation owner cleanup; sequence/caseId guards remain the only child-row identity path. */
var CASE_READ_MODEL_LOCK_ID = "case-read-model-current",
  CASE_RECEIVE_DATE_CANONICAL_KEYS_current = [
    "recDate",
    "receiveDate",
    "recDateText",
    "receiveDateText",
    "วันที่รับเรื่อง",
  ],
  CASE_SEQUENCE_CANONICAL_KEYS_CURRENT = Object.freeze(_C30K_CASE_NUM_.slice());
function _caseBundleHasValue_(value) {
  return value != null && String(value).trim() !== "";
}
function _caseBundleMergeNonEmpty_() {
  for (var merged = {}, i = 0; i < arguments.length; i += 1) {
    var row = arguments[i] || {};
    Object.keys(row).forEach(function (key) {
      var value = row[key];
      _caseBundleHasValue_(value)
        ? (merged[key] = value)
        : _c30H_(merged, key) || (merged[key] = value);
    });
  }
  return sanitizeRow_(merged);
}
function _caseSequenceNormalizeStrict_(value) {
  return String(value == null ? "" : value)
    .replace(/[\u00A0\u200B-\u200D\uFEFF]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
function _caseSequenceFrom_(row) {
  row = row || {};
  for (var i = 0; i < CASE_SEQUENCE_CANONICAL_KEYS_CURRENT.length; i++) {
    var key = CASE_SEQUENCE_CANONICAL_KEYS_CURRENT[i],
      value = row[key],
      normalized = value === void 0 || value === null ? "" : _caseSequenceNormalizeStrict_(value);
    if (normalized) return normalized;
  }
  return "";
}
function _stampCaseSequenceIdentity_(row, caseNum) {
  row = row || {};
  caseNum = _caseSequenceNormalizeStrict_(caseNum);
  if (!caseNum) return row;
  CASE_SEQUENCE_CANONICAL_KEYS_CURRENT.forEach(function (key) {
    row[key] = caseNum;
  });
  row.__relationSequenceStampedBy = "Code_30_Domain_Cases:_stampCaseSequenceIdentity_:r146";
  return row;
}
function _caseUniqueFieldList_(fields) {
  var seen = {}, out = [];
  (fields || []).forEach(function (field) {
    field = _s_(field).trim();
    field && !seen[field] && ((seen[field] = 1), out.push(field));
  });
  return out;
}
function _caseFieldsWithSequence_(prefix, suffix) {
  return _caseUniqueFieldList_((prefix || []).concat(CASE_SEQUENCE_CANONICAL_KEYS_CURRENT, suffix || []));
}
function _caseApplySequenceIdentity_(row, caseNum, clearWhenEmpty) {
  row = row || {};
  caseNum = _caseSequenceNormalizeStrict_(caseNum);
  if (!caseNum) {
    clearWhenEmpty === !0 && CASE_SEQUENCE_CANONICAL_KEYS_CURRENT.forEach(function (key) {
      row[key] = "";
    });
    return row;
  }
  return _stampCaseSequenceIdentity_(row, caseNum);
}
function _caseSequenceIdentityPayload_(caseNum, base) {
  return _caseApplySequenceIdentity_(_c30O_({}, base || {}), caseNum, false);
}
function _requireUniqueCaseBySequence_(payload) {
  var caseNum = _caseSequenceFrom_(payload || {});
  if (!caseNum) throw new Error("กรุณาระบุลำดับเรื่อง");
  var rows = (_listMainDataRows_(!1) || []).filter(function (row) {
    return (
      row && !isSoftDeletedRow_(row) && _caseSequenceFrom_(row) === caseNum
    );
  });
  rows = _dedupeLatestRowsBy_(rows, function (row) {
    return _caseSequenceFrom_(row);
  });
  if (!rows.length) throw new Error("ไม่พบข้อมูลลำดับเรื่อง: " + caseNum);
  if (rows.length !== 1)
    throw new Error("พบลำดับเรื่องซ้ำในข้อมูลหลัก: " + caseNum);
  return { caseNum: caseNum, row: rows[0] };
}

function _caseResolvedRelationContext_(payload) {
  var resolved = _requireUniqueCaseBySequence_(payload || {}),
    caseNum = resolved.caseNum,
    row = resolved.row || {},
    caseId = _s_(row.caseId || row.id || row.recordId || row.uid || "").trim();
  return { caseNum: caseNum, caseId: caseId, row: row };
}
function _caseChildRowBelongsToResolvedCase_(row, relation) {
  row = row || {};
  relation = relation || {};
  if (_appIsFnName_("isSoftDeletedRow_") && isSoftDeletedRow_(row)) return !1;
  var targetSeq = _caseSequenceNormalizeStrict_(relation.caseNum),
    rowSeq = _caseSequenceFrom_(row),
    targetCaseId = _s_(relation.caseId || "").trim(),
    rowCaseId = _s_(row.caseId || row.caseID || row.case_id || "").trim();
  if (rowSeq) return !!(targetSeq && rowSeq === targetSeq);
  return !!(targetCaseId && rowCaseId && rowCaseId === targetCaseId);
}
function _caseStampResolvedRelation_(row, relation, owner) {
  row = _c30O_({}, row || {});
  relation = relation || {};
  if (relation.caseNum) _stampCaseSequenceIdentity_(row, relation.caseNum);
  if (relation.caseId) row.caseId = relation.caseId;
  if (!_caseSequenceFrom_(row)) {
    row.__legacyCaseIdRelationFallback = !0;
    row.__relationFallbackOwner = owner || "Code_30_Domain_Cases:caseId-fallback-no-petitioner-r146";
  } else {
    row.__relationCanonicalStamp = owner || "Code_30_Domain_Cases:case-sequence-canonical-r146";
  }
  return row;
}

function getCanonicalCaseBundleImpl_(payload) {
  payload = payload || {};
  var resolved = _requireUniqueCaseBySequence_(payload);
  var caseNum = resolved.caseNum;
  var seed = _caseBundleMergeNonEmpty_(resolved.row, _stampCaseSequenceIdentity_({}, caseNum));
  var strictPayload = _caseSequenceIdentityPayload_(caseNum);
  var history = [],
    letters = [],
    relatedWarnings = [];
  try {
    history = _Domain_getMeetingHistory(strictPayload);
    _c30A_(history) || (history = []);
  } catch (historyErr) {
    _recordWarning_("canonical_case_bundle.history.case_sequence_strict", historyErr, {
      caseNum: caseNum,
    });
    relatedWarnings.push({
      section: "history",
      errorCode: "CASE_HISTORY_LOAD_FAILED",
      message: String(
        historyErr && historyErr.message
          ? historyErr.message
          : "โหลดประวัติการประชุมไม่สำเร็จ",
      ),
    });
    history = [];
  }
  try {
    letters = _Domain_getLetters(
      _c30O_({}, strictPayload, {
        includeLetters: !0,
        __meetingListMode: "caseLetters",
      }),
    );
    _c30A_(letters) || (letters = []);
  } catch (lettersErr) {
    _recordWarning_("canonical_case_bundle.letters.case_sequence_strict", lettersErr, {
      caseNum: caseNum,
    });
    relatedWarnings.push({
      section: "letters",
      errorCode: "CASE_LETTERS_LOAD_FAILED",
      message: String(
        lettersErr && lettersErr.message
          ? lettersErr.message
          : "โหลดหนังสือติดตามไม่สำเร็จ",
      ),
    });
    letters = [];
  }
  return {
    case: seed,
    rawCase: seed,
    aliases: [caseNum],
    relatedCases: [seed],
    matchKey: caseNum,
    primaryLinkKey: "caseNum",
    history: _c30A_(history) ? history : [],
    letters: _c30A_(letters) ? letters : [],
    counts: {
      aliases: 1,
      relatedCases: 1,
      history: _c30A_(history) ? history.length : 0,
      letters: _c30A_(letters) ? letters.length : 0,
    },
    relatedLoadOk: relatedWarnings.length === 0,
    relatedWarnings: relatedWarnings,
    partialRelatedData: relatedWarnings.length > 0,
    resolvedAt: new Date().toISOString(),
  };
}
function _Domain_getCaseContext(payload) {
  var bundle = getCanonicalCaseBundleImpl_((payload = payload || {})),
    seed = bundle.case || {};
  return ok_(
    {
      case: seed || null,
      aliases: bundle.aliases || [],
      relatedCases: bundle.relatedCases || [],
      matchKey: bundle.matchKey,
      historyCount: Number((bundle.counts && bundle.counts.history) || 0),
      letterCount: Number((bundle.counts && bundle.counts.letters) || 0),
      historyPreview: _c30A_(bundle.history) ? bundle.history.slice(0, 5) : [],
      letterPreview: _c30A_(bundle.letters) ? bundle.letters.slice(0, 5) : [],
      resolvedAt: bundle.resolvedAt || new Date().toISOString(),
    },
    "โหลดบริบทข้อมูลเรื่องสำเร็จ",
  );
}
function _Domain_getCanonicalCaseBundle(payload) {
  return ok_(
    getCanonicalCaseBundleImpl_(payload || {}),
    "โหลดชุดข้อมูลเรื่องแบบ canonical สำเร็จ",
  );
}
function _getCaseIdentityHealthReport_(limit) {
  limit = Number(limit || 200) || 200;
  var cases = [];
  try {
    cases = _dedupeLatestRowsBy_(_listMainDataRows_(!1), _caseIdentityKey_);
  } catch (_e) {
    (_recordWarning_("ec", _e), (cases = []));
  }
  var sliced = cases.slice(0, limit),
    byAlias = {};
  sliced.forEach(function (r) {
    var key =
      _normalizedText_((r && (r.title || r.caseTitle)) || "") +
      "||" +
      _normalizedText_((r && (r.petitioners || r.petitionerName)) || "");
    key &&
      key !== "||" &&
      ((byAlias[key] = byAlias[key] || []), byAlias[key].push(r));
  });
  var aliasCollisions = Object.keys(byAlias)
      .filter(function (k) {
        return (byAlias[k] || []).length > 1;
      })
      .map(function (k) {
        var group = byAlias[k] || [];
        return {
          aliasKey: k,
          count: group.length,
          caseIds: group
            .map(function (x) {
              return _s_(x.caseId).trim();
            })
            .filter(Boolean),
          caseNums: group
            .map(function (x) {
              return _s_(x.caseNum).trim();
            })
            .filter(Boolean),
          titles: group
            .map(function (x) {
              return _s_(x.title || x.caseTitle).trim();
            })
            .filter(Boolean)
            .slice(0, 3),
        };
      }),
    missingCaseIds = sliced
      .filter(function (r) {
        return !_s_(r && r.caseId).trim();
      })
      .slice(0, 50)
      .map(function (r) {
        return {
          caseNum: _s_(r.caseNum).trim(),
          recNo: _s_(r.recNo).trim(),
          title: _s_(r.title || r.caseTitle).trim(),
        };
      }),
    sampledBundles,
    failedBundles = sliced
      .slice(0, Math.min(25, sliced.length))
      .map(function (r) {
        try {
          var bundle = getCanonicalCaseBundleImpl_({
            caseId: _s_(r.caseId).trim(),
            caseNum: _s_(r.caseNum).trim(),
            recNo: _s_(r.recNo).trim(),
            title: _s_(r.title || r.caseTitle).trim(),
            petitioners: _s_(r.petitioners || r.petitionerName).trim(),
          });
          return {
            ok: !(!bundle || !bundle.case),
            caseId: _s_(r.caseId).trim(),
            relatedCases: Number(
              (bundle && bundle.counts && bundle.counts.relatedCases) || 0,
            ),
            history: Number(
              (bundle && bundle.counts && bundle.counts.history) || 0,
            ),
            letters: Number(
              (bundle && bundle.counts && bundle.counts.letters) || 0,
            ),
          };
        } catch (e) {
          return (
            _recordWarning_("ec", e),
            {
              ok: !1,
              caseId: _s_(r.caseId).trim(),
              error: (e && e.message) || String(e),
            }
          );
        }
      })
      .filter(function (x) {
        return !x.ok;
      }),
    report = {
      generatedAt: new Date().toISOString(),
      scannedCases: sliced.length,
      aliasCollisionCount: aliasCollisions.length,
      aliasCollisions: aliasCollisions.slice(0, 20),
      missingCaseIdCount: missingCaseIds.length,
      missingCaseIds,
      bundleFailures: failedBundles.length,
      bundleFailureCases: failedBundles.slice(0, 20),
      ok:
        aliasCollisions.length === 0 &&
        missingCaseIds.length === 0 &&
        failedBundles.length === 0,
    };
  return ok_(
    report,
    report.ok
      ? "สถานะ identity ของเรื่องอยู่ในเกณฑ์ดี"
      : "พบประเด็นด้าน identity/canonical ของเรื่อง",
  );
}
function getCaseIdentityHealthReport(limit) {
  return _getCaseIdentityHealthReport_(Number(limit || 200) || 200);
}
function _caseManualNumericText_(value) {
  if (value == null || _caseValueLooksLikeDate_(value)) return "";
  var raw = String(value)
    .replace(/^'+/, "")
    .replace(/[​-‍\uFEFF]/g, "")
    .trim();
  if (
    !raw ||
    raw === "-" ||
    _caseValueLooksLikeDate_(raw) ||
    _caseLooksLikeInternalId_(raw)
  )
    return "";
  if (/^\d+$/.test(raw)) return raw;
  var decimal = raw.match(/^(\d+)\.0+$/);
  return decimal ? decimal[1] : "";
}
function _caseReferenceTextColumnNames_() {
  return [
    "caseNum",
    "caseNo",
    "runningNo",
    "ลำดับเรื่อง",
    "recNo",
    "receiveNo",
    "receivedNo",
    "เลขรับเรื่อง",
    "เลขที่รับเรื่อง",
    "รับเรื่องเลขที่",
  ];
}
function _caseEnsureMainDataReferenceTextColumns_() {
  try {
    var exec = _appIsFnName_("_executionState_")
      ? _executionState_()
      : typeof AppInfra != "undefined" && AppInfra
        ? AppInfra
        : {};
    if (exec.__caseReferenceTextColumnsEnsured) return { ok: !0, cached: !0 };
    if (typeof getSheet_ != "function" || !_appIsFnName_("_sheetHeaders_"))
      return { ok: !1, skipped: !0, reason: "sheet helpers unavailable" };
    var sh = getSheet_("MainData"),
      headers = _sheetHeaders_("MainData"),
      names = _caseReferenceTextColumnNames_(),
      rowCount = Math.max(
        2,
        Number(sh.getMaxRows && sh.getMaxRows()) ||
          Number(sh.getLastRow && sh.getLastRow()) ||
          2,
      ),
      formatted = [];
    return (
      names.forEach(function (name) {
        var idx = headers.indexOf(name);
        if (!(idx < 0))
          try {
            (AppRepository.setRangeNumberFormat(
              "MainData",
              1,
              idx + 1,
              rowCount,
              1,
              "@",
            ),
              formatted.push(name));
          } catch (e) {
            _c30W_("case.referenceTextColumnFormat." + name, e);
          }
      }),
      (exec.__caseReferenceTextColumnsEnsured = !0),
      { ok: !0, formatted, rowCount }
    );
  } catch (e) {
    return (
      _c30W_("case.ensureReferenceTextColumns", e),
      { ok: !1, error: String((e && e.message) || e) }
    );
  }
}
function _caseReceiveNoFromDateValue_(value) {
  if (value == null) return "";
  if (
    Object.prototype.toString.call(value) === "[object Date]" &&
    !isNaN(value.getTime())
  ) {
    var y = value.getFullYear(),
      thaiYear = y > 2400 ? y : y + 543;
    return String(value.getMonth() + 1) + "/" + String(thaiYear);
  }
  var raw = String(value)
    .replace(/^'+/, "")
    .replace(/[​-‍\uFEFF]/g, "")
    .trim();
  if (!raw) return "";
  var dateLike = raw.match(/^1[\/\-](\d{1,2})[\/\-]((?:19|20|25)\d{2})$/);
  if (dateLike) {
    var m = Number(dateLike[1]);
    if (m >= 1 && m <= 12) return String(m) + "/" + dateLike[2];
  }
  if (
    /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s/i.test(raw) ||
    /GMT[+-]\d{4}|เวลาอินโดจีน/i.test(raw)
  ) {
    var parsed = new Date(raw);
    if (parsed && !isNaN(parsed.getTime())) {
      var py = parsed.getFullYear();
      return (
        String(parsed.getMonth() + 1) + "/" + String(py > 2400 ? py : py + 543)
      );
    }
  }
  return "";
}
function _caseManualReceiveNoText_(value) {
  if (value == null) return "";
  var recovered = _caseReceiveNoFromDateValue_(value);
  if (recovered) return recovered;
  var raw = String(value)
    .replace(/^'+/, "")
    .replace(/[​-‍\uFEFF]/g, "")
    .trim();
  if (
    !raw ||
    raw === "-" ||
    raw === "/" ||
    _caseValueLooksLikeDate_(raw) ||
    _caseLooksLikeInternalId_(raw)
  )
    return "";
  if (/^\d+$/.test(raw)) return raw;
  var decimal = raw.match(/^(\d+)\.0+$/);
  if (decimal) return decimal[1];
  var slash = raw.match(/^(\d+)\s*\/\s*((?:19|20|25)?\d{2})$/);
  if (slash) return slash[1] + "/" + slash[2];
  var dashYear = raw.match(/^(\d+)\s*[\-–—]\s*((?:19|20|25)?\d{2})$/);
  return dashYear ? dashYear[1] + "/" + dashYear[2] : "";
}
function _caseManualReceiveNoForSheet_(value) {
  var normalized = _caseManualReceiveNoText_(value);
  return normalized
    ? normalized.indexOf("/") > -1
      ? "'" + normalized
      : normalized
    : "";
}
function _extractRunningNumber_(value, referenceDate, explicitYear) {
  return _caseManualNumericText_(value);
}
function _caseLooksLikeInternalId_(value) {
  var raw = _c30S_(value).trim();
  return (
    /^CASE[_-]/i.test(raw) || /^MAIN-\d+/i.test(raw) || /^ROW-\d+/i.test(raw)
  );
}
function _caseValueLooksLikeDate_(value) {
  if (
    Object.prototype.toString.call(value) === "[object Date]" &&
    !isNaN(value.getTime())
  )
    return !0;
  var raw = _c30S_(value).trim();
  return (
    !!raw &&
    (/^\d{4}-\d{1,2}-\d{1,2}/.test(raw) ||
      /^\d{1,2}\/\d{1,2}\/(?:19|20|25)\d{2}$/.test(raw) ||
      /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s/i.test(raw) ||
      /GMT[+-]\d{4}|เวลาอินโดจีน/i.test(raw) ||
      /^\d{1,2}\s*(ม\.?ค\.?|ก\.?พ\.?|มี\.?ค\.?|เม\.?ย\.?|พ\.?ค\.?|มิ\.?ย\.?|ก\.?ค\.?|ส\.?ค\.?|ก\.?ย\.?|ต\.?ค\.?|พ\.?ย\.?|ธ\.?ค\.?|มกราคม|กุมภาพันธ์|มีนาคม|เมษายน|พฤษภาคม|มิถุนายน|กรกฎาคม|สิงหาคม|กันยายน|ตุลาคม|พฤศจิกายน|ธันวาคม)\s*(?:19|20|25)\d{2}$/i.test(
        raw,
      ))
  );
}
function _normalizeReceiveNo_(caseNum, recNo, recDate, offerDate) {
  return _caseManualReceiveNoText_(recNo);
}
function _caseDomainSharedRows_(sheetName, fields, opts) {
  return (
    (opts = opts || {}),
    (fields = _c30A_(fields) ? fields : []),
    _appIsFnName_("_appDataServiceRead_")
      ? _appDataServiceRead_(
          sheetName,
          fields,
          _c30O_({ owner: "cases.domain", ttl: 180 }, opts),
        ) || []
      : fields.length && typeof readSheetProjectedObjectsCached_ == "function"
        ? readSheetProjectedObjectsCached_(sheetName, fields, {
            includeDeleted: opts.includeDeleted === !0,
            requireCanonical: opts.requireCanonical === !0,
            ttl: opts.ttl || 180,
          }) || []
        : typeof readSheetObjectsCached_ == "function"
          ? readSheetObjectsCached_(sheetName, {
              includeDeleted: opts.includeDeleted === !0,
              requireCanonical: opts.requireCanonical === !0,
            }) || []
          : readSheetObjects_(sheetName, {
              includeDeleted: opts.includeDeleted === !0,
              requireCanonical: opts.requireCanonical === !0,
            }) || []
  );
}
function _caseDomainMainDataProjectedRows_(includeDeleted) {
  return _caseDomainSharedRows_(
    "MainData",
    _caseFieldsWithSequence_([
      "caseId",
      "id",
      "cat",
      "subCat",
      "recNo",
      "receiveNo",
      "offerDate",
      "recDate",
      "title",
      "petitioners",
      "petitionerName",
      "petitioner",
      "status",
      "assignees",
      "owner",
      "responsibleCommissioners",
      "responsibleComm",
      "committeeOwner",
      "responsibleCommittee",
      "staffs",
      "secretariatOfficer",
      "operationOfficer",
      "opStaff",
      "operator",
      "responsibleOfficer",
      "operationStaff",
      "staff",
      "officer",
      "respondent",
      "agencyName",
      "accusedAgency",
      "accused",
      "agency",
      "coAssignees",
      "coAssignee",
      "coOwners",
      "coResponsible",
      "remark",
      "caseTitle",
      "closedReason",
      "rejectionReason",
      "pendingRemark",
      "pendingReason",
      "waitReason",
      "waitingReason",
      "เหตุผลรอพิจารณา",
      "เหตุผลรอการพิจารณา",
      "หมายเหตุรอพิจารณา",
      "หมายเหตุรอการพิจารณา",
      "statusReason",
      "reason",
      "เหตุผล",
      "committeeHistory",
      "committeeMeeting",
      "committeeMeetings",
      "meetingCommitteeHistory",
      "คณะกรรมาธิการ",
      "subcommitteeHistory",
      "subcommitteeMeeting",
      "subcommitteeMeetings",
      "meetingSubcommitteeHistory",
      "คณะอนุกรรมาธิการ",
      "petitionerPhone",
      "subject",
      "caseType",
      "topic",
      "subcommittee",
      "dueDate",
      "createdAt",
      "updatedAt",
      "meetingStatus",
      "isDeleted",
      "deletedAt",
      "keySummary",
    ]),
    { includeDeleted: includeDeleted === !0, ttl: 180 },
  );
}
function _caseDomainLettersProjectedRows_(includeDeleted) {
  return _caseDomainSharedRows_(
    "Letters",
    _caseFieldsWithSequence_([
      "letterId",
      "caseId",
      "letterNo",
      "bookNo",
      "letterDate",
      "agency",
      "subject",
      "issue",
      "dueDate",
      "extendDate",
      "remark",
      "letterStatus",
      "status",
      "repliesJSON",
      "extensionsJSON",
      "extensionJSON",
      "opStaff",
      "officer",
      "createdAt",
      "updatedAt",
      "isDeleted",
      "deletedAt",
    ]),
    { includeDeleted: includeDeleted === !0, ttl: 180 },
  );
}
function _getMainDataRepository_() {
  return getCanonicalRepository_("cases.mainData");
}
function _listMainDataRows_(includeDeleted) {
  try {
    return _caseDomainMainDataProjectedRows_(includeDeleted === !0);
  } catch (_projectedErr) {
    throw (
      _recordWarning_("ec", _projectedErr),
      new Error(
        "CASE_MAIN_DATA_PROJECTED_READER_FAILED:" +
          String((_projectedErr && _projectedErr.message) || _projectedErr),
      )
    );
  }
}
function _casePick_(row, keys) {
  ((row = row || {}), (keys = _c30A_(keys) ? keys : []));
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (
      row[key] !== void 0 &&
      row[key] !== null &&
      String(row[key]).trim() !== ""
    )
      return row[key];
  }
  return "";
}
function _caseCanonicalFields_(row) {
  var title, cat, subCat, assignees;
  return (
    (row = row || {}),
    {
      title: String(_casePick_(row, _C30K_TITLE_) || "").trim(),
      cat: String(
        _casePick_(row, [
          "cat",
          "caseType",
          "category",
          "ประเภทเรื่อง",
          "ประเภท",
        ]) || "",
      ).trim(),
      subCat: String(
        _casePick_(row, [
          "subCat",
          "subCategory",
          "issue",
          "topic",
          "topicName",
          "considerIssue",
          "caseIssue",
          "ประเด็นพิจารณา",
          "ประเด็น",
        ]) || "",
      ).trim(),
      assignees: String(
        _casePick_(row, [
          "assignees",
          "owner",
          "responsibleCommissioners",
          "responsibleComm",
          "committeeOwner",
          "responsibleCommittee",
          "กมธ.รับผิดชอบ",
          "กมธ.รับผิดชอบ",
          "กรรมาธิการรับผิดชอบ",
          "คณะกรรมาธิการรับผิดชอบ",
          "ผู้รับผิดชอบ",
          "ผู้รับผิดชอบหลัก",
        ]) || "",
      ).trim(),
    }
  );
}
function _caseNormalizeInputDto_(input) {
  (((input = _c30O_({}, input || {})).id = input.id || input.caseId || ""),
    (input.caseId = input.caseId || input.id || ""));
  var schema = _caseCanonicalFields_(input);
  ((input.title = schema.title),
    (input.caseTitle = String(
      _casePick_(input, ["caseTitle", "title", "subject", "เรื่อง"]) ||
        schema.title ||
        "",
    ).trim()),
    (input.subject = _s_(input.subject || schema.title).trim()),
    (input.cat = schema.cat || input.cat || ""),
    (input.caseType = input.caseType || schema.cat || ""),
    (input.subCat = schema.subCat || input.subCat || ""),
    (input.subCategory = input.subCategory || input.subCat || ""),
    (input.issue = input.issue || input.subCat || ""),
    (input.topic = input.subCat || input.topic || ""),
    (input.assignees = schema.assignees || input.assignees || ""),
    (input.owner = input.owner || input.assignees || ""),
    (input.responsibleCommissioners =
      input.responsibleCommissioners || input.assignees || ""),
    (input.petitioner = String(
      _casePick_(input, [
        "petitioner",
        "petitioners",
        "petitionerName",
        "ผู้ร้อง",
        "ผู้เสนอญัตติ",
        "ผู้เสนอญัตติ/ผู้ร้อง",
      ]) || "",
    ).trim()),
    (input.petitioners = String(
      _casePick_(input, _C30K_PETITIONERS_) || "",
    ).trim()),
    (input.keySummary = String(
      _casePick_(input, [
        "keySummary",
        "summary",
        "สรุปสาระสำคัญของเรื่อง",
        "สรุปสาระสำคัญ",
        "สาระสำคัญ",
      ]) || "",
    ).trim()),
    (input.remark = String(
      _casePick_(input, ["remark", "note", "หมายเหตุ"]) || "",
    ).trim()),
    (input.pendingRemark = String(
      _casePick_(input, _C30K_PENDING_REASON_) || "",
    ).trim()),
    (input.pendingReason = input.pendingRemark),
    (input.rejectionReason = String(
      _casePick_(input, [
        "rejectionReason",
        "rejectReason",
        "notAcceptedReason",
        "เหตุผล(ไม่รับเรื่อง)",
        "เหตุผลไม่รับเรื่อง",
      ]) || "",
    ).trim()),
    (input.petitionerPhone = _appPhoneForDisplay_(
      _casePick_(input, _C30K_PETITIONER_PHONE_) || "",
    )));
  var rawStatus = String(
    _casePick_(input, [
      "status",
      "caseStatus",
      "processStatus",
      "currentStatus",
      "สถานะ",
      "สถานะเรื่อง",
    ]) || "เรื่องเข้าใหม่",
  ).trim();
  ((input.statusRaw = rawStatus),
    (input.status =
      typeof AppBackendCore != "undefined" &&
      AppBackendCore &&
      typeof AppBackendCore.normalizeCaseStatus == "function"
        ? AppBackendCore.normalizeCaseStatus(rawStatus, {
            defaultStatus: "เรื่องเข้าใหม่",
            strict: !0,
          })
        : _caseNormalizeStatusForDisplay_(rawStatus)));
  var caseNumRaw = _casePick_(input, _C30K_CASE_NUM_) || "";
  _caseValueLooksLikeDate_(caseNumRaw) && (caseNumRaw = "");
  input.caseNum = _extractRunningNumber_(
    caseNumRaw,
    input.offerDate || input.recDate || input.createdAt,
    input.fy || input.fiscalYear || input.budgetYear,
  );
  _caseApplySequenceIdentity_(input, input.caseNum, true);
  var recNoRaw =
    _casePick_(input, [
      "recNo",
      "receiveNo",
      "receivedNo",
      "เลขรับเรื่อง",
      "เลขที่รับเรื่อง",
      "รับเรื่องเลขที่",
    ]) || "";
  return (
    (input.recNo = _normalizeReceiveNo_(
      input.caseNum,
      recNoRaw,
      input.recDate,
      input.offerDate,
    )),
    (input.receiveNo = input.recNo),
    (input.เลขรับเรื่อง = input.recNo),
    input
  );
}
function _caseNormalizeStatusForDisplay_(status) {
  return _caseStatusNormalizePhaseD_(status, {
    defaultStatus: "เรื่องเข้าใหม่",
    warningKey: "case.display.status",
  });
}
function _caseCanonicalDto_(row) {
  var schema = _caseCanonicalFields_((row = row || {})),
    title = schema.title,
    cat = schema.cat,
    subCat = schema.subCat,
    assignees = schema.assignees,
    statusRaw = String(row.status || row.caseStatus || "เรื่องเข้าใหม่").trim(),
    statusForReason = _caseNormalizeStatusForDisplay_(statusRaw),
    offerDateCanonical = String(
      _casePick_(row, _C30K_OFFER_DATE_) || "",
    ).trim(),
    rawClosedReason = String(
      _casePick_(row, _C30K_CLOSED_REASON_) || "",
    ).trim(),
    rawRejectionReason = String(
      _casePick_(row, [
        "rejectionReason",
        "rejectReason",
        "notAcceptedReason",
        "notReceiveReason",
        "notAcceptReason",
        "caseRejectReason",
        "statusReason",
        "decisionReason",
        "reason",
        "เหตุผล",
        "เหตุผล(ไม่รับเรื่อง)",
        "เหตุผลไม่รับเรื่อง",
        "เหตุผลการไม่รับเรื่อง",
      ]) || "",
    ).trim(),
    rawPendingReason = String(
      _casePick_(row, _C30K_PENDING_REASON_) || "",
    ).trim(),
    closedReasonForDto = rawClosedReason || rawRejectionReason || "",
    rejectionReasonForDto = rawRejectionReason || rawClosedReason || "",
    pendingReasonForDto =
      rawPendingReason ||
      (statusForReason === "รอพิจารณา"
        ? rawClosedReason || rawRejectionReason
        : ""),
    genericReasonForDto =
      statusForReason === "รอพิจารณา"
        ? pendingReasonForDto
        : statusForReason === "ยุติเรื่อง"
          ? closedReasonForDto
          : statusForReason === "ไม่รับเรื่อง"
            ? rejectionReasonForDto
            : rawPendingReason || rawClosedReason || rawRejectionReason || "";
  return _c30O_({}, row, {
    caseId: _s_(row.caseId || row.id).trim(),
    id: _s_(row.id || row.caseId).trim(),
    caseNum: _caseManualNumericText_(_casePick_(row, _C30K_CASE_NUM_) || ""),
    caseNo: _caseManualNumericText_(
      _casePick_(row, [
        "caseNo",
        "caseNum",
        "runningNo",
        "ลำดับเรื่อง",
        "เลขลำดับเรื่อง",
      ]) || "",
    ),
    recNo: _caseManualReceiveNoText_(
      (_appIsFnName_("_caseSearchReceiveNoText_")
        ? _caseSearchReceiveNoText_(row)
        : "") ||
        _casePick_(row, [
          "recNo",
          "receiveNo",
          "receivedNo",
          "เลขรับเรื่อง",
          "เลขรับ",
          "เลขรับที่",
          "ทะเบียนรับ",
        ]) ||
        "",
    ),
    title,
    caseTitle: String(
      _casePick_(row, [
        "caseTitle",
        "considerationTitle",
        "caseConsiderationTitle",
        "ชื่อเรื่องพิจารณา(ถ้ามี)",
        "ชื่อเรื่องพิจารณา",
        "เรื่องพิจารณา",
      ]) ||
        row.caseTitle ||
        title ||
        "",
    ).trim(),
    subject: _s_(row.subject || title).trim(),
    cat,
    caseType: _s_(row.caseType || cat).trim(),
    petitioners: String(_casePick_(row, _C30K_PETITIONERS_) || "").trim(),
    petitionerPhone: _appPhoneForDisplay_(
      _casePick_(row, _C30K_PETITIONER_PHONE_) || "",
    ),
    respondent: String(_casePick_(row, _C30K_RESPONDENT_) || "").trim(),
    sentAgency: String(_casePick_(row, _C30K_SENT_AGENCY_) || "").trim(),
    sendToAgency: String(_casePick_(row, _C30K_SENT_AGENCY_) || "").trim(),
    subCat,
    subCategory: subCat,
    issue: subCat,
    topic: subCat,
    assignees,
    owner: assignees,
    responsibleCommissioners: assignees,
    staffs: String(_casePick_(row, _C30K_STAFFS_) || "").trim(),
    coAssignees: String(_casePick_(row, _C30K_CO_ASSIGNEES_) || "").trim(),
    status: statusForReason,
    statusRaw,
    offerDate: offerDateCanonical,
    dateProposed: offerDateCanonical,
    bookDate: offerDateCanonical,
    closedReason: closedReasonForDto,
    rejectionReason: rejectionReasonForDto,
    rejectReason: rejectionReasonForDto,
    notAcceptedReason: rejectionReasonForDto,
    pendingRemark: pendingReasonForDto,
    pendingReason: pendingReasonForDto,
    statusReason: genericReasonForDto,
    reason: genericReasonForDto,
    เหตุผล: genericReasonForDto,
    "เหตุผล(ไม่รับเรื่อง)": rejectionReasonForDto,
    schemaStamp: "domain-schema-cases-current",
    contractStamp: "case-dto-current",
  });
}
function _casePlainIdentityKey_(value) {
  return _c30S_(value).replace(/^'+/, "").trim();
}
/* r146: title/petitioner is display-only, never a relational key. */
function _caseBuildSaveLookupIndex_() {
  var cacheKey =
      "case.saveLookupIndex.current." +
      (_appIsFnName_("_entityCacheStamp_")
        ? _entityCacheStamp_("maindata")
        : "1"),
    hit = _appIsFnName_("_requestScopeGet_")
      ? _requestScopeGet_("caseSaveLookupIndex", cacheKey)
      : null;
  if (hit) return hit;
  var rows = [];
  try {
    rows = _appIsFnName_("_caseDomainMainDataProjectedRows_")
      ? _caseDomainMainDataProjectedRows_(!0)
      : _getMainDataRepository_().list({
          includeDeleted: !0,
          requireCanonical: !0,
        });
  } catch (_idxProjectedErr) {
    rows = _getMainDataRepository_().list({
      includeDeleted: !0,
      requireCanonical: !0,
    });
  }
  var idx = {
    byId: {},
    byCaseNum: {},
    rowsRead: (rows = _c30A_(rows) ? rows : []).length,
    generatedAt: new Date().toISOString(),
    source: "case-keyed-index-current",
  };
  function caseIndexPut_(map, key, row) {
    if ((key = _casePlainIdentityKey_(key))) {
      var current = map[key];
      (!current ||
        _rowFreshnessScore_(row).localeCompare(_rowFreshnessScore_(current)) >
          0) &&
        (map[key] = row);
    }
  }
  return (
    rows.forEach(function (row) {
      ((row = row || {}),
        caseIndexPut_(idx.byId, row.caseId || row.id, row),
        caseIndexPut_(
          idx.byCaseNum,
          _caseManualNumericText_(
            row.caseNum || row.caseNo || row.runningNo || row.ลำดับเรื่อง || "",
          ),
          row,
        ));
    }),
    _appIsFnName_("_requestScopePut_") &&
      (idx = _requestScopePut_("caseSaveLookupIndex", cacheKey, idx)),
    idx
  );
}
function _caseFindExistingFromIndex_(input) {
  input = input || {};
  var idx = _caseBuildSaveLookupIndex_(),
    id = _casePlainIdentityKey_(input.id || input.caseId || "");
  if (id && idx.byId[id]) return idx.byId[id];
  var caseNum = _caseManualNumericText_(
    input.caseNum || input.caseNo || input.runningNo || input.ลำดับเรื่อง || "",
  );
  if (caseNum && idx.byCaseNum[caseNum]) return idx.byCaseNum[caseNum];
  return null;
}
function _findExistingCaseRecord_(input) {
  input = input || {};
  var targetId = _s_(input.id || input.caseId).trim();
  if (targetId)
    try {
      var byId = _getMainDataRepository_().findByKey(targetId, {
        includeDeleted: !0,
        requireCanonical: !0,
      });
      if (byId) return byId;
    } catch (_findByIdErr) {
      _recordWarning_("cases.findExisting.byId", _findByIdErr);
    }
  try {
    var indexed = _appIsFnName_("_caseFindExistingFromIndex_")
      ? _caseFindExistingFromIndex_(input)
      : null;
    if (indexed) return indexed;
  } catch (_caseIndexErr) {
    _recordWarning_("cases.findExisting.keyedIndex", _caseIndexErr);
  }
  var rows = _getMainDataRepository_().listActive(),
    targetCaseNum = _caseManualNumericText_(
      input.caseNum ||
        input.caseNo ||
        input.runningNo ||
        input.ลำดับเรื่อง ||
        "",
    ),
    matches = (_c30A_(rows) ? rows : []).filter(function (row) {
      if (
        ((row = row || {}),
        (targetId && _s_(row.caseId).trim() === targetId) ||
          (targetCaseNum &&
            _caseManualNumericText_(
              row.caseNum ||
                row.caseNo ||
                row.runningNo ||
                row.ลำดับเรื่อง ||
                "",
            ) === targetCaseNum) ||
          false)
      )
        return !0;
      return !1;
    });
  return matches.length
    ? (matches.sort(function (a, b) {
        return _rowFreshnessScore_(b).localeCompare(_rowFreshnessScore_(a));
      }),
      matches[0] || null)
    : null;
}
function _buildCaseCanonicalRecord_(input, existing, now) {
  ((input = input || {}),
    (existing = existing || {}),
    (now = now || new Date().toISOString()));
  var resolvedId = String(
      existing.caseId ||
        input.id ||
        input.caseId ||
        "CASE_" + Date.now() + "_" + Math.floor(9e3 * Math.random() + 1e3),
    ).trim(),
    schema = _caseCanonicalFields_(_c30O_({}, existing, input)),
    title = _s_(
      input.title ||
        input.caseTitle ||
        schema.title ||
        existing.title ||
        existing.caseTitle,
    ).trim(),
    cat = _s_(
      schema.cat ||
        input.cat ||
        input.caseType ||
        existing.cat ||
        existing.caseType,
    ).trim(),
    subCat = _s_(
      schema.subCat || input.subCat || existing.subCat || existing.topic,
    ).trim(),
    assignees = _s_(
      schema.assignees || input.assignees || existing.assignees,
    ).trim(),
    receiveNoForSheet = _caseManualReceiveNoForSheet_(
      input.recNo ||
        input.receiveNo ||
        existing.recNo ||
        existing.receiveNo ||
        existing.เลขรับเรื่อง ||
        "",
    ),
    statusForReason = _caseNormalizeStatusForDisplay_(
      String(input.status || existing.status || "เรื่องเข้าใหม่").trim(),
    ),
    incomingClosedReason = String(
      input.closedReason !== void 0
        ? input.closedReason
        : existing.closedReason || "",
    ).trim(),
    incomingRejectionReason = String(
      input.rejectionReason ||
        input.rejectReason ||
        input.notAcceptedReason ||
        input["เหตุผล(ไม่รับเรื่อง)"] ||
        existing.rejectionReason ||
        existing.rejectReason ||
        existing.notAcceptedReason ||
        existing["เหตุผล(ไม่รับเรื่อง)"] ||
        "",
    ).trim(),
    incomingPendingRemark = String(
      input.pendingRemark ||
        input.pendingReason ||
        input.waitReason ||
        input.waitingReason ||
        (statusForReason === "รอพิจารณา"
          ? input.statusReason ||
            input.reason ||
            input.เหตุผล ||
            existing.pendingRemark ||
            existing.pendingReason ||
            existing.statusReason ||
            existing.reason ||
            existing.เหตุผล ||
            ""
          : existing.pendingRemark || existing.pendingReason || ""),
    ).trim(),
    incomingStatusReason = "";
  return (
    statusForReason === "ไม่รับเรื่อง"
      ? ((incomingRejectionReason =
          incomingRejectionReason || incomingClosedReason),
        (incomingClosedReason = ""),
        (incomingPendingRemark = ""),
        (incomingStatusReason = incomingRejectionReason))
      : statusForReason === "ยุติเรื่อง"
        ? ((incomingClosedReason =
            incomingClosedReason || incomingRejectionReason),
          (incomingRejectionReason = ""),
          (incomingPendingRemark = ""),
          (incomingStatusReason = incomingClosedReason))
        : statusForReason === "รอพิจารณา"
          ? ((incomingPendingRemark =
              incomingPendingRemark ||
              incomingClosedReason ||
              incomingRejectionReason),
            (incomingClosedReason = ""),
            (incomingRejectionReason = ""),
            (incomingStatusReason = incomingPendingRemark))
          : ((incomingClosedReason = ""),
            (incomingRejectionReason = ""),
            (incomingPendingRemark = ""),
            (incomingStatusReason = "")),
    _c30O_({}, existing, {
      caseId: resolvedId,
      caseNum: _caseManualNumericText_(
        input.caseNum || input.caseNo || existing.caseNum || "",
      ),
      recNo: receiveNoForSheet,
      receiveNo: receiveNoForSheet,
      เลขรับเรื่อง: receiveNoForSheet,
      title,
      petitioners: _s_(
        input.petitioner || input.petitioners || existing.petitioners,
      ).trim(),
      respondent: String(
        _casePick_(_c30O_({}, existing, input), _C30K_RESPONDENT_) || "",
      ).trim(),
      assignees,
      staffs: String(
        _casePick_(_c30O_({}, existing, input), _C30K_STAFFS_) || "",
      ).trim(),
      coAssignees: String(
        _casePick_(_c30O_({}, existing, input), _C30K_CO_ASSIGNEES_) || "",
      ).trim(),
      offerDate: input.offerDate || existing.offerDate || "",
      recDate: input.recDate || existing.recDate || "",
      dueDate: input.dueDate || existing.dueDate || "",
      status: statusForReason,
      caseTitle: _s_(input.caseTitle || title || existing.caseTitle).trim(),
      subCat,
      subCategory: subCat,
      issue: subCat,
      remark: String(
        input.remark !== void 0 ? input.remark : existing.remark || "",
      ).trim(),
      keySummary: _s_(
        input.keySummary || input.summary || existing.keySummary,
      ).trim(),
      agencyName: _s_(input.agencyName || existing.agencyName).trim(),
      closedReason: incomingClosedReason,
      rejectionReason: incomingRejectionReason,
      pendingRemark: incomingPendingRemark,
      pendingReason: incomingPendingRemark,
      statusReason: incomingStatusReason,
      reason: incomingStatusReason,
      เหตุผล: incomingStatusReason,
      cat,
      subcommittee: _s_(input.subcommittee || existing.subcommittee).trim(),
      owner: assignees,
      responsibleCommissioners: assignees,
      petitionerPhone: _appPhoneForSheet_(
        input.petitionerPhone || existing.petitionerPhone || "",
      ),
      meetingStatus: _s_(input.meetingStatus || existing.meetingStatus).trim(),
      subject: _s_(input.subject || title || existing.subject).trim(),
      caseType: cat,
      topic: subCat,
      schemaStamp: "domain-schema-cases-current",
      createdAt: existing.createdAt || now,
      updatedAt: now,
      isDeleted: !1,
      deletedAt: "",
    })
  );
}
function _applyCaseAiSummaryIfNeeded_(caseId, record, isNew) {
  if (!isNew) return "";
  record = record || {};
  var title = _s_(record.title || record.caseTitle).trim();
  if (!_getGeminiKey_() || !title) return "";
  try {
    var aiSummary = _generateCaseSummary_(
      title,
      record.petitioners || "",
      record.respondent || "",
    );
    return (
      aiSummary &&
        !_s_(record.keySummary).trim() &&
        _getMainDataRepository_().upsert(caseId, {
          caseId,
          keySummary: aiSummary,
        }),
      aiSummary || ""
    );
  } catch (_aiErr) {
    return (_recordWarning_("ec", _aiErr), "");
  }
}
function _caseNormalizeComparableText_(value) {
  return _c30S_(value).replace(/\s+/g, "").trim();
}
function _caseValidateIndependentFields_(input) {
  var caseNum = _caseManualNumericText_(
      (input = input || {}).caseNum || input.caseNo || "",
    ),
    recNo = _caseManualReceiveNoText_(input.recNo || input.receiveNo || ""),
    keySummary = _caseNormalizeComparableText_(
      input.keySummary || input.summary || "",
    ),
    remark = _caseNormalizeComparableText_(input.remark || input.note || "");
  if (keySummary && remark && keySummary === remark)
    throw new Error(
      "สรุปสาระสำคัญของเรื่อง และหมายเหตุต้องเป็นคนละรายการ ห้ามคัดลอกข้อความเดียวกัน",
    );
  return !0;
}
function apiSaveCase(payload) {
  return writeGateway_(
    "apiSaveCase",
    payload || {},
    function (inputPayload) {
      (_appIsFnName_("_domainRouterAuthAlreadyOk_") &&
        _domainRouterAuthAlreadyOk_(inputPayload)) ||
        requireAuth_(inputPayload, "staff");
      var sess = _getSession_(inputPayload.token || inputPayload._token),
        c = _caseNormalizeInputDto_(inputPayload.case || inputPayload || {});
      _caseValidateIndependentFields_(c);
      var title = _s_(c.title || c.caseTitle).trim();
      if (!title) throw new Error("กรุณากรอกชื่อเรื่อง");
      var repo = _getMainDataRepository_(),
        existing = _findExistingCaseRecord_(c),
        now,
        record = _buildCaseCanonicalRecord_(
          c,
          existing,
          new Date().toISOString(),
        );
      _caseEnsureMainDataReferenceTextColumns_();
      var saved = repo.upsert(record.caseId, record);
      invalidateSheetCache_("MainData");
      var derivedInvalidation = _appIsFnName_("_invalidateCaseDerivedCaches_")
          ? _invalidateCaseDerivedCaches_("apiSaveCase")
          : {},
        aiSummary = "";
      (!inputPayload ||
        (inputPayload.enableAiSummary !== !0 &&
          inputPayload.generateAiSummary !== !0 &&
          inputPayload.aiSummaryRequested !== !0) ||
        (aiSummary = _applyCaseAiSummaryIfNeeded_(
          record.caseId,
          record,
          saved && saved.mode === "create",
        )),
        logAudit_("apiSaveCase", {
          caseId: record.caseId,
          mode: (saved && saved.mode) || (existing ? "update" : "create"),
          title,
          user: sess ? sess.username || sess.email : "unknown",
        }));
      var dto = _caseCanonicalDto_(record);
      return ok_(
        _c30O_({}, dto, {
          aiSummary: aiSummary || "",
          cacheInvalidation: derivedInvalidation || {},
        }),
        "บันทึกข้อมูลเรื่องสำเร็จ",
      );
    },
    "บันทึกข้อมูลเรื่องสำเร็จ",
    "บันทึกข้อมูลเรื่องไม่สำเร็จ",
  );
}
function apiDeleteCase(payload) {
  return writeGateway_(
    "apiDeleteCase",
    payload || {},
    function (input) {
      (_appIsFnName_("_domainRouterAuthAlreadyOk_") &&
        _domainRouterAuthAlreadyOk_(input)) ||
        requireAuth_(input, "admin");
      var sess = _getSession_(input.token || input._token),
        caseId = _s_(input.caseId).trim();
      if (!caseId) throw new Error("ไม่พบ caseId");
      if (
        (getCanonicalHeaderAudit_("MainData"),
        !softDeleteSheetObjectByKey_("MainData", "caseId", caseId))
      )
        throw new Error("ไม่พบเรื่อง:" + caseId);
      invalidateSheetCache_("MainData");
      var derivedInvalidation = _appIsFnName_("_invalidateCaseDerivedCaches_")
        ? _invalidateCaseDerivedCaches_("apiDeleteCase")
        : {};
      return (
        logAudit_("apiDeleteCase", {
          caseId,
          user: sess ? sess.username : "unknown",
        }),
        ok_(
          { deleted: !0, caseId, cacheInvalidation: derivedInvalidation || {} },
          "ลบข้อมูลเรื่องสำเร็จ",
        )
      );
    },
    "ลบข้อมูลเรื่องสำเร็จ",
    "ลบข้อมูลเรื่องไม่สำเร็จ",
  );
}
function apiSearch(payload) {
  payload = payload || {};
  try {
    (_appIsFnName_("_domainRouterAuthAlreadyOk_") &&
      _domainRouterAuthAlreadyOk_(payload)) ||
      requireAuth_(payload, "viewer");
    var q = _s_(payload.q || payload.query || payload.keyword)
        .trim()
        .toLowerCase(),
      type =
        String(payload.type || "all")
          .toLowerCase()
          .trim() || "all",
      limit = Math.max(
        1,
        Math.min(Number(payload.limit || payload.pageSize || 25) || 25, 100),
      ),
      sourceRows = _appIsFnName_("_caseReadMainDataRowsForSearch_")
        ? _caseReadMainDataRowsForSearch_(_caseSearchProjectedFields_(), {
            forceFresh: !0,
            noCache: !0,
            bypassCache: !0,
            cacheTtlSeconds: 0,
            source: "apiSearch.displaySafeDefaultValue",
          })
        : _caseDomainMainDataProjectedRows_(!1),
      cases = (_c30A_(sourceRows) ? sourceRows : []).map(function (r) {
        var dto = _caseCanonicalDto_(r || {});
        _appIsFnName_("_caseSearchEnsureReceiveNo_") &&
          (dto = _caseSearchEnsureReceiveNo_(dto));
        var caseNum = _caseManualNumericText_(
            dto.caseNum || dto.caseNo || dto.runningNo || dto.ลำดับเรื่อง || "",
          ),
          recNo = _caseManualReceiveNoText_(
            dto.recNo || dto.receiveNo || dto.เลขรับเรื่อง || "",
          ),
          title = _s_(dto.title || dto.subject).trim(),
          caseTitle = String(
            dto.caseTitle ||
              dto.considerationTitle ||
              dto["ชื่อเรื่องพิจารณา(ถ้ามี)"] ||
              "",
          ).trim();
        return {
          id: dto.caseId || dto.id || "",
          caseId: dto.caseId || dto.id || "",
          type: "case",
          typeLabel: "เรื่องพิจารณา",
          caseNum,
          caseNo: caseNum,
          runningNo: caseNum,
          ลำดับเรื่อง: caseNum,
          recNo,
          receiveNo: recNo,
          เลขรับเรื่อง: recNo,
          title: title || caseTitle || "",
          subject: title || caseTitle || "",
          caseTitle: caseTitle || title || "",
          considerationTitle: caseTitle || "",
          "ชื่อเรื่องพิจารณา(ถ้ามี)": caseTitle || title || "",
          detail: dto.petitioners || dto.petitionerName || dto.petitioner || "",
          petitioners:
            dto.petitioners || dto.petitionerName || dto.petitioner || "",
          respondent: dto.respondent || dto.agencyName || "",
          agencyName: dto.agencyName || dto.respondent || "",
          status: dto.status || "",
          offerDate:
            dto.offerDate ||
            dto.bookDate ||
            dto.letterDate ||
            dto.dateProposed ||
            "",
          dateProposed: dto.dateProposed || dto.offerDate || "",
          bookDate: dto.bookDate || dto.offerDate || "",
          closedReason: dto.closedReason || "",
          rejectionReason: dto.rejectionReason || "",
          rejectReason: dto.rejectReason || dto.rejectionReason || "",
          notAcceptedReason: dto.notAcceptedReason || dto.rejectionReason || "",
          "เหตุผล(ไม่รับเรื่อง)":
            dto["เหตุผล(ไม่รับเรื่อง)"] || dto.rejectionReason || "",
          cat: dto.cat || dto.caseType || "",
          caseType: dto.caseType || dto.cat || "",
          subCat: dto.subCat || "",
          assignees: dto.assignees || "",
          owner: dto.owner || dto.assignees || "",
          staffs: dto.staffs || dto.opStaff || "",
          coAssignees: dto.coAssignees || "",
          updatedAt: dto.updatedAt || dto.createdAt || "",
        };
      }),
      letters = _caseDomainLettersProjectedRows_(!1).map(function (r) {
        return {
          id: r.letterId || "",
          type: "letter",
          typeLabel: "หนังสือ",
          title: r.subject || r.issue || "",
          detail: r.agency || "",
          status: r.letterStatus || r.status || "",
          updatedAt: r.updatedAt || r.createdAt || "",
        };
      }),
      all = cases.concat(letters);
    return (
      type !== "all" &&
        (all = all.filter(function (r) {
          return r.type === type;
        })),
      q &&
        (all = all.filter(function (r) {
          return [r.title, r.detail, r.typeLabel, r.status].some(function (v) {
            return _s_(v).toLowerCase().indexOf(q) !== -1;
          });
        })),
      all.sort(function (a, b) {
        return _s_(b.updatedAt).localeCompare(_s_(a.updatedAt));
      }),
      ok_(all.slice(0, limit).map(sanitizeRow_), "ค้นหาข้อมูลสำเร็จ")
    );
  } catch (e) {
    return (
      _recordWarning_("ec", e),
      err_(e.message || String(e), {
        rows: [],
        data: [],
        totalRecords: 0,
        technicalDebtFix: "apiSearch-projected-reader",
      })
    );
  }
}
function apiGetCaseContext(payload) {
  return (
    (payload = requireDomainRequest_(payload, "viewer")),
    normalizeResult_(
      _Domain_getCaseContext(payload),
      "โหลดบริบทข้อมูลเรื่องสำเร็จ",
      "โหลดบริบทข้อมูลเรื่องไม่สำเร็จ",
    )
  );
}
function _letterIsDateLikeValue_(value) {
  if (value == null || value === "") return !1;
  if (value instanceof Date && !isNaN(value.getTime())) return !0;
  var raw = _s_(value).trim();
  if (!raw) return !1;
  if (/^\d{4}-\d{1,2}-\d{1,2}(?:[T\s]|$)/.test(raw)) return !0;
  if (
    /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s/i.test(raw) ||
    /GMT[+-]\d{4}|เวลาอินโดจีน/i.test(raw)
  ) {
    var parsed = new Date(raw);
    return !isNaN(parsed.getTime());
  }
  return !1;
}
function _formatLetterNoFromDateValue_(value) {
  function toLetterNoFromParts(day, year) {
    var d = Number(day || 0),
      y = Number(year || 0);
    return d && y ? String(d) + "/" + String(y >= 2400 ? y : y + 543) : "";
  }
  if (value instanceof Date && !isNaN(value.getTime()))
    return toLetterNoFromParts(value.getDate(), value.getFullYear());
  var raw = _c30S_(value).trim();
  if (!raw) return "";
  var isoMatch = raw.match(/^(\d{4})-(\d{1,2})-(\d{1,2})(?:[T\s]|$)/);
  if (isoMatch) return toLetterNoFromParts(isoMatch[3], isoMatch[1]);
  var parsed = new Date(raw);
  return isNaN(parsed.getTime())
    ? ""
    : toLetterNoFromParts(parsed.getDate(), parsed.getFullYear());
}
function _normalizeLetterNumberDisplay_(value) {
  if (value == null) return "";
  var textValue = _s_(value).trim();
  return textValue || value instanceof Date
    ? /^\d{1,5}\s*\/\s*\d{2,4}$/.test(textValue)
      ? textValue.replace(/\s*\/\s*/, "/")
      : (_letterIsDateLikeValue_(value) &&
          _formatLetterNoFromDateValue_(value)) ||
        textValue
    : "";
}
function _normalizeLetterDateFromFields_(letterDate, letterNo, bookNo) {
  return (
    _caseDateTextPhaseD2_(letterDate || "", { context: "letterDate" }) ||
    (_letterIsDateLikeValue_(letterNo)
      ? _caseDateTextPhaseD2_(letterNo || "", { context: "letterNo" })
      : _letterIsDateLikeValue_(bookNo)
        ? _caseDateTextPhaseD2_(bookNo || "", { context: "bookNo" })
        : "")
  );
}
function _normalizeLetterStatusCanonical_(status) {
  var s = _c30S_(status).replace(/\s+/g, "").trim();
  return s
    ? s === "ได้รับตอบกลับแล้ว" || s === "ตอบรับแล้ว" || s === "ได้รับแล้ว"
      ? "ได้รับแล้ว"
      : s
    : "ยังไม่ได้รับ";
}
function _isReceivedLetterStatusCanonical_(status) {
  return _normalizeLetterStatusCanonical_(status) === "ได้รับแล้ว";
}
function _normalizeLetterRow_(row) {
  row = row || {};
  var rawLetterNo = row.letterNo || row.bookNo || "",
    rawBookNo = row.bookNo || row.letterNo || "",
    letterNoWasDate = _letterIsDateLikeValue_(row.letterNo || ""),
    bookNoWasDate = _letterIsDateLikeValue_(row.bookNo || ""),
    rowCaseNum = _caseSequenceFrom_(row);
  return sanitizeRow_({
    letterId: _s_(row.letterId),
    caseId: _s_(row.caseId).trim(),
    caseNum: rowCaseNum,
    caseNo: rowCaseNum,
    runningNo: rowCaseNum,
    ลำดับเรื่อง: rowCaseNum,
    letterNo: _normalizeLetterNumberDisplay_(rawLetterNo),
    letterNoRaw: _c30S_(rawLetterNo),
    letterNoSchemaIssue:
      letterNoWasDate || bookNoWasDate ? "date-like-letter-number" : "",
    letterDate: _normalizeLetterDateFromFields_(
      row.letterDate || "",
      row.letterNo || "",
      row.bookNo || "",
    ),
    agency: _s_(row.agency),
    subject: _s_(row.subject),
    issue: _s_(row.issue),
    dueDate: normalizeDateOutput_(row.dueDate || ""),
    extendDate: normalizeDateOutput_(row.extendDate || ""),
    remark: _s_(row.remark),
    letterStatus: _normalizeLetterStatusCanonical_(
      row.letterStatus || row.status || "",
    ),
    repliesJSON: String(row.repliesJSON || row.repliesJson || "[]"),
    extensionsJSON: String(
      row.extensionsJSON || row.extensionJSON || row.extensionsJson || "[]",
    ),
    opStaff: _s_(row.opStaff || row.officer),
    bookNo: _normalizeLetterNumberDisplay_(rawBookNo),
    bookNoRaw: _c30S_(rawBookNo),
    officer: _s_(row.officer || row.opStaff),
  });
}
function _meetingHistoryTypeText_(row) {
  row = row || {};
  var raw = _s_(
      row.committeeType ||
        row.meetingType ||
        row.type ||
        row.meetingGroup ||
        row.ประเภทการประชุม,
    )
      .replace(/\s+/g, "")
      .trim(),
    sub = _s_(
      row.subcommitteeName ||
        row.subcommittee ||
        row.subCommitteeName ||
        row.คณะอนุกรรมาธิการ,
    )
      .replace(/\s+/g, "")
      .trim();
  return /อนุกรรมาธิการ/.test(raw) || sub
    ? "คณะอนุกรรมาธิการ"
    : (/กรรมาธิการ/.test(raw), "คณะกรรมาธิการ");
}
function _normalizeMeetingLogRow_(row) {
  row = row || {};
  var rowCaseNumCanonical = _caseSequenceFrom_(row);
  var meetingDateText = _committeeMeetingDateText_(
      _caseRowPickPhaseD2_(
        row,
        ["date", "meetingDate", "dateRaw", "วันที่ประชุม"],
        "",
      ),
    ),
    meetingTypeText = _meetingHistoryTypeText_(row),
    subcommitteeName = String(
      _caseRowPickPhaseD2_(row, _C30K_SUBCOMMITTEE_NAME_, ""),
    )
      .replace(/\s+/g, "")
      .trim();
  return sanitizeRow_({
    logId: _s_(row.logId || row.meetingLogId || row.id),
    caseId: _s_(row.caseId).trim(),
    caseNum: rowCaseNumCanonical,
    caseNo: rowCaseNumCanonical,
    runningNo: rowCaseNumCanonical,
    ลำดับเรื่อง: rowCaseNumCanonical,
    recNo: _s_(
      row.recNo ||
        row.receiveNo ||
        row.receiptNo ||
        row.เลขรับเรื่อง ||
        row.เลขรับ,
    ).trim(),
    receiveNo: _s_(
      row.receiveNo ||
        row.recNo ||
        row.receiptNo ||
        row.เลขรับเรื่อง ||
        row.เลขรับ,
    ).trim(),
    round: _s_(
      row.round ||
        row.meetingRound ||
        row.meetingNo ||
        row.ครั้งที่ ||
        row.ครั้งที่ประชุม,
    ),
    date: meetingDateText,
    meetingDate: meetingDateText,
    dateRaw: meetingDateText,
    วันที่ประชุม: meetingDateText,
    meetingType: meetingTypeText,
    committeeType: meetingTypeText,
    ประเภทการประชุม: meetingTypeText,
    subcommitteeName:
      meetingTypeText === "คณะอนุกรรมาธิการ" ? subcommitteeName : "",
    meetingGroup:
      meetingTypeText === "คณะอนุกรรมาธิการ"
        ? subcommitteeName || "คณะอนุกรรมาธิการ"
        : "คณะกรรมาธิการ",
    note: _s_(
      row.note || row.result || row.summary || row.มติ || row.ผลการประชุม,
    ),
    title: _s_(
      row.title || row.caseTitle || row.subject || row.เรื่อง || row.ชื่อเรื่อง,
    ),
    location: _s_(row.location || row.meetingLocation || row.สถานที่ประชุม),
    attendees: _s_(row.attendees || row.participants || row.ผู้เข้าร่วมประชุม),
    summary: _s_(row.summary || row.note || row.result),
    result: _s_(row.result || row.note || row.summary),
  });
}
function _normalizeIdentityTextSafe_(value) {
  if (_appIsFnName_("_normalizeIdentityText_"))
    try {
      return _normalizeIdentityText_(value || "");
    } catch (_e) {
      _recordWarning_("ec", _e);
    }
  return _c30S_(value)
    .replace(/\s+/g, "")
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .trim()
    .toLowerCase();
}
function _safeCaseIdentityKey_(row) {
  row = row || {};
  var seq = _caseSequenceFrom_(row);
  var primary = _s_(row.caseId || row.id).trim();
  return seq ? "seq:" + seq : primary ? "id:" + primary : "missing-sequence:" + _rowFreshnessScore_(row);
}
function _safeMeetingLogIdentityKey_(row) {
  row = row || {};
  var caseNum = _caseSequenceFrom_(row),
    caseId = _s_(row.caseId || row.caseID || row.case_id).trim(),
    caseKey = caseNum ? "seq:" + caseNum : caseId ? "id:" + caseId : "missing-sequence",
    logId = _s_(row.logId || row.meetingLogId || row.id).trim(),
    meetingId = _s_(row.meetingId || row.committeeMeetingId).trim(),
    round = _s_(
      row.round ||
        row.meetingRound ||
        row.meetingNo ||
        row.relatedMeetingNo ||
        row.roundNo ||
        row.ครั้งที่ ||
        row.ครั้งที่ประชุม,
    )
      .replace(/^ครั้งที่\s*/i, "")
      .replace(/^ครั้งประชุม\s*/i, "")
      .replace(/\s+/g, "")
      .trim(),
    date = _committeeMeetingDateText_(
      row.date ||
        row.meetingDate ||
        row.relatedMeetingDate ||
        row.dateRaw ||
        row.วันที่ประชุม ||
        "",
    ),
    meetingType = _meetingHistoryTypeText_(row),
    subcommitteeName =
      meetingType === "คณะอนุกรรมาธิการ"
        ? _normalizeIdentityTextSafe_(
            row.subcommitteeName ||
              row.subcommittee ||
              row.subCommitteeName ||
              row.คณะอนุกรรมาธิการ ||
              row.meetingGroup ||
              "",
          )
        : "";
  if (round || date)
    return [caseKey, "event", round, date, meetingType, subcommitteeName].join("|");
  if (meetingId)
    return [caseKey, "meeting", meetingId, meetingType, subcommitteeName].join("|");
  return [caseKey, "log", logId || _rowFreshnessScore_(row)].join("|");
}
function _meetingHistoryRowPreferenceScore_(row) {
  row = row || {};
  var logId = _s_(row.logId || row.meetingLogId || row.id).trim(),
    syntheticAgendaRow = /^CMI-/i.test(logId),
    score = syntheticAgendaRow ? 100 : logId ? 1000 : 10;
  _caseSequenceFrom_(row) && (score += 100);
  _s_(row.round || row.meetingRound || row.meetingNo).trim() && (score += 20);
  _s_(row.date || row.meetingDate || row.dateRaw).trim() && (score += 20);
  _s_(row.note || row.result || row.summary).trim() && (score += 15);
  _s_(row.subcommitteeName || row.subcommittee).trim() && (score += 5);
  return score;
}
function _meetingHistoryMergePreferredRow_(preferred, fallback) {
  var out = {}, source;
  [fallback || {}, preferred || {}].forEach(function (row) {
    Object.keys(row || {}).forEach(function (key) {
      var value = row[key];
      if (value !== void 0 && value !== null && String(value).trim() !== "")
        out[key] = value;
      else if (!Object.prototype.hasOwnProperty.call(out, key)) out[key] = value;
    });
  });
  return out;
}
function _dedupeMeetingHistoryRows_(rows) {
  var map = {}, order = [];
  (_c30A_(rows) ? rows : []).forEach(function (row) {
    if (!row) return;
    var key = _safeMeetingLogIdentityKey_(row), current = map[key];
    if (!current) {
      map[key] = row;
      order.push(key);
      return;
    }
    var incomingScore = _meetingHistoryRowPreferenceScore_(row),
      currentScore = _meetingHistoryRowPreferenceScore_(current),
      incomingStamp = _s_(row.updatedAt || row.modifiedAt || row.createdAt),
      currentStamp = _s_(current.updatedAt || current.modifiedAt || current.createdAt),
      preferIncoming = incomingScore > currentScore ||
        (incomingScore === currentScore && incomingStamp >= currentStamp);
    map[key] = preferIncoming
      ? _meetingHistoryMergePreferredRow_(row, current)
      : _meetingHistoryMergePreferredRow_(current, row);
  });
  return order.map(function (key) { return map[key]; });
}
function _safeLetterIdentityKey_(row) {
  return (
    (row = row || {}),
    _appIsFnName_("_letterIdentityKey_")
      ? _letterIdentityKey_(row)
      : [
          _s_(row.letterId).trim(),
          _s_(row.caseId).trim(),
          _s_(row.letterNo || row.bookNo).trim(),
          normalizeDateOutput_(row.letterDate || ""),
          _normalizeIdentityTextSafe_(row.subject || row.issue || ""),
        ].join("|")
  );
}
function _safeDedupeLatestRowsBy_(rows, keyFn) {
  if (
    ((rows = _c30A_(rows) ? rows.slice() : []),
    _appIsFnName_("_dedupeLatestRowsBy_"))
  )
    try {
      return _dedupeLatestRowsBy_(rows, keyFn);
    } catch (_e) {
      _recordWarning_("ec", _e);
    }
  var map = {};
  return (
    rows.forEach(function (row) {
      if (row) {
        var key = "";
        try {
          key = String((typeof keyFn == "function" ? keyFn(row) : "") || "");
        } catch (_eKey) {
          (_recordWarning_("ec", _eKey), (key = ""));
        }
        key ||
          (key = String(
            row.id ||
              row.caseId ||
              row.logId ||
              row.letterId ||
              JSON.stringify(row),
          ));
        var current = map[key],
          rowStamp,
          curStamp;
        if (!current) return ((map[key] = row), void 0);
        _s_(
          row.updatedAt || row.modifiedAt || row.timestamp || row.createdAt,
        ) >=
          _s_(
            current.updatedAt ||
              current.modifiedAt ||
              current.timestamp ||
              current.createdAt,
          ) && (map[key] = row);
      }
    }),
    Object.keys(map).map(function (key) {
      return map[key];
    })
  );
}
function _safeResolveCaseIdentityAliases_(payload) {
  payload = payload || {};
  var strictCaseNum = _caseSequenceFrom_(payload);
  if (strictCaseNum) {
    var strictResolved = _requireUniqueCaseBySequence_(_caseSequenceIdentityPayload_(strictCaseNum));
    var strictRow = strictResolved && strictResolved.row ? strictResolved.row : null;
    var strictIds = [];
    if (strictRow) {
      var strictCaseId = _s_(strictRow.caseId || strictRow.id).trim();
      strictCaseId && strictIds.push(strictCaseId);
    }
    return {
      ids: strictIds,
      case: strictRow,
      rows: strictRow ? [strictRow] : [],
      caseNum: strictCaseNum,
      identityOwner: "case-sequence-strict-current-r146",
    };
  }
  var seedId = String((payload && (payload.caseId || payload.id)) || "").trim(),
    seedRows = [];
  if (seedId) {
    try {
      seedRows = (_listMainDataRows_(!1) || []).filter(function (row) {
        return (
          row &&
          !isSoftDeletedRow_(row) &&
          (_s_(row.caseId).trim() === seedId || _s_(row.id).trim() === seedId)
        );
      });
    } catch (_strictIdErr) {
      _recordWarning_("case.identity.strictIdOnly", _strictIdErr, { caseId: seedId });
      seedRows = [];
    }
  }
  if (seedRows.length > 1)
    seedRows = _dedupeLatestRowsBy_(seedRows, function (row) {
      return _s_(row.caseId || row.id).trim();
    });
  var seedCase = seedRows.length === 1 ? seedRows[0] : null,
    ids = [];
  seedCase && _s_(seedCase.caseId || seedCase.id).trim() && ids.push(_s_(seedCase.caseId || seedCase.id).trim());
  return {
    ids: ids.filter(Boolean).filter(function (v, i, arr) {
      return arr.indexOf(v) === i;
    }),
    case: seedCase,
    rows: seedCase ? [seedCase] : [],
    caseNum: seedCase ? _caseSequenceFrom_(seedCase) : "",
    identityOwner: seedCase
      ? "case-id-strict-current-r146"
      : "case-identity-empty-no-title-petitioner-fallback-r146",
  };
}
function _assertCaseExistsSafe_(payloadOrCaseId, sourceName) {
  var payload =
    payloadOrCaseId && typeof payloadOrCaseId == "object"
      ? payloadOrCaseId
      : { caseId: payloadOrCaseId };
  if (_appIsFnName_("_assertCaseExists_"))
    try {
      return _assertCaseExists_(payload, sourceName);
    } catch (_eAssert) {
      _recordWarning_("ec", _eAssert);
    }
  var found = null;
  try {
    found = _findCaseByIdentity_(payload);
  } catch (_eFind) {
    (_recordWarning_("meeting.caseAssert.find", _eFind), (found = null));
  }
  if (!found) throw new Error("ไม่พบข้อมูลเรื่องพิจารณา");
  return found;
}
function _meetingLettersProjectedFields_(name) {
  return (name = _s_(name).trim()) === "MainData"
    ? [
        "caseId",
        "id",
        "caseNum",
        "caseNo",
        "runningNo",
        "ลำดับเรื่อง",
        "เลขลำดับเรื่อง",
        "ลำดับเรื่องพิจารณา",
        "เลขที่ลำดับเรื่อง",
        "หมายเลขลำดับเรื่อง",
        "เลขที่เรื่องพิจารณา",
        "เลขลำดับเรื่องพิจารณา",
        "หมายเลขเรื่องพิจารณา",
        "recNo",
        "title",
        "caseTitle",
        "subject",
        "petitioners",
        "petitionerName",
        "status",
        "updatedAt",
        "createdAt",
        "isDeleted",
        "deletedAt",
      ]
    : name === "MeetingLogs"
      ? [
          "logId",
          "meetingId",
          "caseId",
          "caseNum",
          "caseNo",
          "runningNo",
          "ลำดับเรื่อง",
          "เลขลำดับเรื่อง",
          "ลำดับเรื่องพิจารณา",
          "เลขที่ลำดับเรื่อง",
          "หมายเลขลำดับเรื่อง",
          "เลขที่เรื่องพิจารณา",
          "เลขลำดับเรื่องพิจารณา",
          "หมายเลขเรื่องพิจารณา",
          "round",
          "date",
          "meetingDate",
          "title",
          "location",
          "attendees",
          "summary",
          "result",
          "note",
          "committeeType",
          "subcommitteeId",
          "subcommitteeName",
          "meetingGroup",
          "caseNum",
          "recNo",
          "updatedAt",
          "createdAt",
          "isDeleted",
          "deletedAt",
        ]
      : name === "Letters"
        ? [
            "letterId",
            "caseId",
            "caseNum",
            "caseNo",
            "runningNo",
            "ลำดับเรื่อง",
            "เลขลำดับเรื่อง",
            "ลำดับเรื่องพิจารณา",
            "เลขที่ลำดับเรื่อง",
            "หมายเลขลำดับเรื่อง",
            "เลขที่เรื่องพิจารณา",
            "เลขลำดับเรื่องพิจารณา",
            "หมายเลขเรื่องพิจารณา",
            "letterNo",
            "bookNo",
            "agency",
            "subject",
            "issue",
            "letterStatus",
            "status",
            "officer",
            "opStaff",
            "letterDate",
            "dueDate",
            "extendDate",
            "repliesJSON",
            "repliesJson",
            "extensionsJSON",
            "extensionJSON",
            "extensionsJSON",
            "extensionJSON",
            "updatedAt",
            "createdAt",
            "isDeleted",
            "deletedAt",
          ]
        : [];
}
function _meetingLettersRows_(name, includeDeleted) {
  var fields = _meetingLettersProjectedFields_((name = _s_(name).trim()));
  if (!fields.length)
    throw new Error("MEETING_LETTERS_PROJECTED_READER_UNAVAILABLE:" + name);
  try {
    return (
      _caseDomainSharedRows_(name, fields, {
        includeDeleted: includeDeleted === !0,
        ttl: 120,
        requireCanonical: !1,
      }) || []
    );
  } catch (_projectedErr) {
    throw (
      _recordWarning_("ec", _projectedErr),
      new Error(
        "MEETING_LETTERS_PROJECTED_READER_FAILED:" +
          name +
          ":" +
          String(
            _projectedErr && _projectedErr.message
              ? _projectedErr.message
              : _projectedErr,
          ),
      )
    );
  }
}
function _trackingProjectedFields_() {
  return {
    letters: [
      "letterId",
      "caseId",
      "caseNum",
      "caseNo",
      "runningNo",
      "ลำดับเรื่อง",
      "เลขลำดับเรื่อง",
      "ลำดับเรื่องพิจารณา",
      "เลขที่ลำดับเรื่อง",
      "หมายเลขลำดับเรื่อง",
      "letterNo",
      "bookNo",
      "agency",
      "subject",
      "issue",
      "letterStatus",
      "status",
      "officer",
      "opStaff",
      "letterDate",
      "dueDate",
      "extendDate",
      "repliesJSON",
      "repliesJson",
      "extensionsJSON",
      "extensionJSON",
      "extensionsJSON",
      "extensionJSON",
      "updatedAt",
      "isDeleted",
      "deletedAt",
    ],
    cases: [
      "caseId",
      "caseNum",
      "caseNo",
      "runningNo",
      "ลำดับเรื่อง",
      "เลขลำดับเรื่อง",
      "ลำดับเรื่องพิจารณา",
      "เลขที่ลำดับเรื่อง",
      "หมายเลขลำดับเรื่อง",
      "recNo",
      "title",
      "caseTitle",
      "status",
      "updatedAt",
      "isDeleted",
      "deletedAt",
    ],
  };
}
function TrackingRepository_() {
  var fields = _trackingProjectedFields_();
  function projected(sheetName, selectedFields, ttl) {
    try {
      return (
        _caseDomainSharedRows_(sheetName, selectedFields, {
          includeDeleted: !1,
          ttl: ttl || 120,
        }) || []
      );
    } catch (_projectedErr) {
      throw (
        _recordWarning_("ec", _projectedErr),
        new Error(
          "TRACKING_PROJECTED_READER_FAILED:" +
            _s_(sheetName) +
            ":" +
            String(
              _projectedErr && _projectedErr.message
                ? _projectedErr.message
                : _projectedErr,
            ),
        )
      );
    }
  }
  return {
    repositoryOwner: !0,
    strictErrorMode: !0,
    listLetters: function () {
      return projected("Letters", fields.letters, 120);
    },
    listCases: function () {
      return projected("MainData", fields.cases, 120);
    },
    searchIndex: function (lettersRows, caseMap) {
      return _getLettersSearchIndex_(lettersRows, caseMap);
    },
  };
}
function _trackingReadLettersRows_() {
  return TrackingRepository_().listLetters();
}
function _meetingHistoryProjectedRows_() {
  var out = [];
  function push(row) {
    row = row || {};
    try {
      if (_appIsFnName_("isSoftDeletedRow_") && isSoftDeletedRow_(row)) return;
    } catch (_e) {
      _appIgnore_(_e, "c6.C30:769");
    }
    out.push(row);
  }
  try {
    (
      _caseDomainSharedRows_(
        "MeetingLogs",
        [
          "caseId",
          "round",
          "meetingRound",
          "meetingNo",
          "relatedMeetingNo",
          "date",
          "meetingDate",
          "relatedMeetingDate",
          "วันที่ประชุม",
          "note",
          "logId",
          "meetingId",
          "title",
          "caseTitle",
          "considerationTitle",
          "subject",
          "location",
          "attendees",
          "summary",
          "result",
          "committeeType",
          "meetingType",
          "ประเภทการประชุม",
          "subcommitteeId",
          "subcommitteeName",
          "subcommittee",
          "คณะอนุกรรมาธิการ",
          "meetingGroup",
          "caseNum",
          "caseNo",
          "runningNo",
          "ลำดับเรื่อง",
          "เลขลำดับเรื่อง",
          "ลำดับเรื่องพิจารณา",
          "เลขที่ลำดับเรื่อง",
          "หมายเลขลำดับเรื่อง",
          "recNo",
          "receiveNo",
          "updatedAt",
          "isDeleted",
          "deletedAt",
        ],
        { includeDeleted: !1, ttl: 120 },
      ) || []
    ).forEach(push);
  } catch (_logErr) {
    _c30W_("meetingHistory.logs.read", _logErr);
  }
  try {
    var meetings =
        _caseDomainSharedRows_(
          "CommitteeMeetings",
          [
            "meetingId",
            "id",
            "meetingNo",
            "meetingNumber",
            "no",
            "roundNo",
            "ครั้งที่",
            "ครั้งประชุม",
            "การประชุมครั้งที่",
            "meetingDate",
            "date",
            "วันที่ประชุม",
            "วันประชุม",
            "title",
            "status",
            "note",
            "committeeType",
            "meetingType",
            "ประเภทการประชุม",
            "subcommitteeId",
            "subcommitteeName",
            "subcommittee",
            "คณะอนุกรรมาธิการ",
            "meetingGroup",
            "updatedAt",
            "isDeleted",
            "deletedAt",
          ],
          { includeDeleted: !1, ttl: 120 },
        ) || [],
      byId = {};
    (meetings.forEach(function (m) {
      m = m || {};
      var id = _s_(m.meetingId).trim();
      id && (byId[id] = m);
    }),
      (
        _caseDomainSharedRows_(
          "CommitteeMeetingAgendaItems",
          [
            "itemId",
            "id",
            "meetingId",
            "agendaNo",
            "seq",
            "agenda",
            "title",
            "เรื่อง",
            "ชื่อเรื่อง",
            "เรื่องพิจารณา",
            "considerationTitle",
            "relatedMeetingNo",
            "relatedMeetingDate",
            "caseId",
            "caseNum",
            "caseNo",
            "runningNo",
            "ลำดับเรื่อง",
            "เลขลำดับเรื่อง",
            "ลำดับเรื่องพิจารณา",
            "เลขที่ลำดับเรื่อง",
            "หมายเลขลำดับเรื่อง",
            "recNo",
            "receiveNo",
            "caseTitle",
            "agencyOrPresenter",
            "หน่วยงาน",
            "ผู้เสนอ",
            "result",
            "ผลการประชุม",
            "มติ",
            "note",
            "committeeType",
            "meetingType",
            "ประเภทการประชุม",
            "subcommitteeId",
            "subcommitteeName",
            "subcommittee",
            "คณะอนุกรรมาธิการ",
            "meetingGroup",
            "updatedAt",
            "isDeleted",
            "deletedAt",
          ],
          { includeDeleted: !1, ttl: 120 },
        ) || []
      ).forEach(function (item) {
        item = item || {};
        try {
          if (_appIsFnName_("isSoftDeletedRow_") && isSoftDeletedRow_(item))
            return;
        } catch (_delErr) {
          _appIgnore_(_delErr, "c6.C30:799");
        }
        var meeting = byId[_s_(item.meetingId).trim()] || {},
          caseId = _s_(item.caseId).trim(),
          caseNum = _caseSequenceFrom_({
            caseNum: item.caseNum,
            caseNo: item.caseNo,
            runningNo: item.runningNo,
            ลำดับเรื่อง: item.ลำดับเรื่อง,
          }),
          recNo = _s_(item.recNo || item.receiveNo).trim(),
          title = _s_(
            item.caseTitle ||
              item.considerationTitle ||
              item.title ||
              item.ชื่อเรื่อง ||
              item.เรื่อง ||
              item.เรื่องพิจารณา,
          ).trim();
        if (caseNum) {
          var sub = _s_(
              item.subcommitteeName ||
                item.subcommittee ||
                item.คณะอนุกรรมาธิการ ||
                meeting.subcommitteeName ||
                meeting.subcommittee ||
                meeting.คณะอนุกรรมาธิการ ||
                item.meetingGroup ||
                meeting.meetingGroup,
            ).trim(),
            ctype = _s_(
              item.committeeType ||
                item.meetingType ||
                item.ประเภทการประชุม ||
                meeting.committeeType ||
                meeting.meetingType ||
                meeting.ประเภทการประชุม,
            ).trim(),
            meetingTitleTypeProbe = _s_(
              meeting.title || meeting.ชื่อการประชุม,
            ).trim();
          /อนุกรรมาธิการ/.test([ctype, sub, meetingTitleTypeProbe].join("")) ||
          sub
            ? (ctype = "คณะอนุกรรมาธิการ")
            : (ctype = "คณะกรรมาธิการ");
          var round = _s_(
              item.relatedMeetingNo ||
                item.meetingNo ||
                item.roundNo ||
                item.ครั้งที่ ||
                meeting.meetingNo ||
                meeting.meetingNumber ||
                meeting.roundNo ||
                meeting.ครั้งที่,
            ).trim(),
            date =
              item.relatedMeetingDate ||
              item.meetingDate ||
              item.date ||
              item.วันที่ประชุม ||
              meeting.meetingDate ||
              meeting.date ||
              meeting.วันที่ประชุม ||
              "";
          push({
            logId:
              "CMI-" +
              String(
                item.itemId ||
                  item.id ||
                  item.meetingId ||
                  caseId ||
                  caseNum ||
                  recNo ||
                  title,
              )
                .replace(/[^A-Za-z0-9_-]/g, "")
                .slice(0, 60),
            meetingId: item.meetingId || "",
            caseId,
            caseNum,
            caseNo: caseNum,
            recNo,
            receiveNo: recNo,
            round,
            meetingNo: round,
            date,
            meetingDate: date,
            title: title || meeting.title || "",
            caseTitle: title || "",
            considerationTitle: title || "",
            note:
              item.result ||
              item.ผลการประชุม ||
              item.มติ ||
              item.note ||
              item.agencyOrPresenter ||
              meeting.note ||
              "",
            summary: [
              _s_(item.agendaNo || item.agenda).trim()
                ? "วาระ" + String(item.agendaNo || item.agenda).trim()
                : "",
              item.agencyOrPresenter || item.หน่วยงาน || item.ผู้เสนอ || "",
            ]
              .filter(function (v) {
                return _s_(v).trim();
              })
              .join("/"),
            result:
              item.result || item.ผลการประชุม || item.มติ || item.note || "",
            committeeType: ctype,
            meetingType: ctype,
            ประเภทการประชุม: ctype,
            subcommitteeId: item.subcommitteeId || meeting.subcommitteeId || "",
            subcommitteeName: ctype === "คณะอนุกรรมาธิการ" ? sub : "",
            meetingGroup:
              ctype === "คณะอนุกรรมาธิการ"
                ? sub || "คณะอนุกรรมาธิการ"
                : "คณะกรรมาธิการ",
            updatedAt: item.updatedAt || meeting.updatedAt || "",
          });
        }
      }));
  } catch (_agendaErr) {
    _c30W_("meetingHistory.agenda.read", _agendaErr);
  }
  var seen = {};
  return out.filter(function (r) {
    var k = [
      r.logId,
      r.caseId,
      r.caseNum,
      r.recNo,
      r.round,
      r.date,
      r.note,
      r.committeeType,
      r.subcommitteeName,
    ].join("|");
    return !seen[k] && ((seen[k] = 1), !0);
  });
}
function _trackingNormalizeLetterNo_(value) {
  return _appIsFnName_("_normalizeLetterNumberDisplay_")
    ? _normalizeLetterNumberDisplay_(value)
    : _c30S_(value).trim();
}
function _trackingNormalizeStatus_(status) {
  if (_appIsFnName_("_normalizeLetterStatusCanonical_"))
    return _normalizeLetterStatusCanonical_(status);
  var s = _c30S_(status).replace(/\s+/g, "").trim();
  return s
    ? s === "ได้รับตอบกลับแล้ว" || s === "ตอบรับแล้ว"
      ? "ได้รับแล้ว"
      : s
    : "ยังไม่ได้รับ";
}
function _trackingIsReceived_(status) {
  return _appIsFnName_("_isReceivedLetterStatusCanonical_")
    ? _isReceivedLetterStatusCanonical_(status)
    : _trackingNormalizeStatus_(status) === "ได้รับแล้ว";
}
function _trackingQueryCacheKey_(payload) {
  payload = payload || {};
  var todayKey = Utilities.formatDate(
      new Date(),
      Session.getScriptTimeZone() || "Asia/Bangkok",
      "yyyy-MM-dd",
    ),
    raw = {
      query: _s_(payload.query || payload.search),
      filterType: String(payload.filterType || payload.type || "all"),
      status: _s_(payload.status),
      opStaff: _s_(payload.opStaff || payload.staff),
      agency: _s_(payload.agency || payload.agencyFilter || payload.agencyName),
      caseId: _s_(payload.caseId),
      sortBy: String(payload.sortBy || "sequence"),
      sortDir: String(payload.sortDir || "asc"),
      page: Math.max(1, Number(payload.page || 1) || 1),
      limit: Math.max(1, Math.min(Number(payload.limit || 25) || 25, 25)),
      date: todayKey,
      release: String(
        ((_appIsFnName_("_appRelease_") && _appRelease_()) || {}).assetStamp ||
          ((_appIsFnName_("_appRelease_") && _appRelease_()) || {}).stamp ||
          "",
      ),
    };
  return (
    "tracking_query_status_filter_v8_" +
    (_appIsFnName_("_entityCacheStamp_")
      ? _entityCacheStamp_("letters")
      : "1") +
    "_" +
    (_appIsFnName_("_entityCacheStamp_")
      ? _entityCacheStamp_("maindata")
      : "1") +
    "_" +
    _hashPassword_(JSON.stringify(raw)).substring(0, 24)
  );
}
function _trackingCaseMapCacheKey_() {
  return (
    "tracking_case_map_current_" +
    (_appIsFnName_("_entityCacheStamp_") ? _entityCacheStamp_("maindata") : "1")
  );
}
function _trackingBuildCaseMap_(cases, guardShouldYield, guardMarkPartial) {
  var caseMap = {};
  cases = _c30A_(cases) ? cases : [];
  for (var caseIndex = 0; caseIndex < cases.length; caseIndex++) {
    if (typeof guardShouldYield == "function" && guardShouldYield(650)) {
      typeof guardMarkPartial == "function" &&
        guardMarkPartial({
          stage: "case-map",
          processedCases: caseIndex,
          totalCases: cases.length,
        });
      break;
    }
    var r = cases[caseIndex];
    r &&
      !isSoftDeletedRow_(r) &&
      (caseMap[_s_(r.caseId)] = {
        caseNum: _s_(r.caseNum),
        recNo: _s_(r.recNo),
        title: _s_(r.title || r.caseTitle),
        status: _s_(r.status),
      });
  }
  return caseMap;
}
function _trackingGetCaseMap_(
  trackingRepo,
  guardShouldYield,
  guardMarkPartial,
  forceFresh,
) {
  var key = _trackingCaseMapCacheKey_(),
    requestHit = _requestScopeGet_("trackingCaseMap", key);
  if (requestHit && typeof requestHit == "object") return requestHit;
  if (forceFresh !== !0 && _appIsFnName_("_cacheGetJson_")) {
    var cached = _cacheGetJson_(key);
    if (cached && cached.map && typeof cached.map == "object")
      return _requestScopePut_("trackingCaseMap", key, cached.map);
  }
  var map = _trackingBuildCaseMap_(
    trackingRepo.listCases(),
    guardShouldYield,
    guardMarkPartial,
  );
  if (_appIsFnName_("_cachePutJson_"))
    try {
      _cachePutJson_(key, { map }, 180);
    } catch (_cacheErr) {
      _recordWarning_("ec", _cacheErr);
    }
  return _requestScopePut_("trackingCaseMap", key, map);
}
function _trackingEmptyResult_(payload, message, code) {
  payload = payload || {};
  var limit = Math.max(1, Math.min(Number(payload.limit || 25) || 25, 25)),
    page;
  return {
    rows: [],
    data: [],
    page: Math.max(1, Number(payload.page || 1) || 1),
    limit,
    totalRecords: 0,
    totalPages: 1,
    generatedAt: new Date().toISOString(),
    cached: !1,
    cacheStatus: "safe-empty",
    serverPaged: !0,
    serverFiltered: !0,
    statusCounts: { all: 0, received: 0, overdue: 0, notdue: 0 },
    maxPageSize: 25,
    contract: "tracking-server-paged-current",
    dataQuality: { letterNoSchemaIssues: 0 },
    filterType: String(payload.filterType || payload.type || "all"),
    sortBy: String(payload.sortBy || "sequence"),
    sortDir: String(payload.sortDir || "asc"),
    warning: _s_(message),
    errorCode: _s_(code),
  };
}
function _trackingParseReplies_(row) {
  try {
    var raw = String(
      (row && (row.repliesJSON || row.repliesJson)) || "[]",
    ).trim();
    return raw && raw.charAt(0) === "[" ? JSON.parse(raw) : [];
  } catch (_e) {
    return (_recordWarning_("ec", _e), []);
  }
}
function _trackingDateOnly_(value) {
  return _caseDateOnlyPhaseD2_(value);
}
function _trackingDueDateOnly_(value) {
  return _caseDateOnlyPhaseD2_(value);
}
function _trackingReceivedFreezeDate_(normalized, replies, today) {
  ((normalized = normalized || {}), (replies = _c30A_(replies) ? replies : []));
  for (var i = 0; i < replies.length; i++) {
    var rd = _trackingDateOnly_(
      replies[i] &&
        (replies[i].date || replies[i].replyDate || replies[i].receivedDate),
    );
    if (rd) return rd;
  }
  return (
    _trackingDateOnly_(
      normalized.receivedDate ||
        normalized.replyDate ||
        normalized.statusUpdatedAt ||
        normalized.updatedAt ||
        normalized.modifiedAt,
    ) ||
    _trackingDateOnly_(today) ||
    null
  );
}
function _trackingSequenceNumber_(value) {
  var text = _trackingNormalizeLetterNo_(value),
    m = _s_(text).match(/\d+/);
  return m ? Number(m[0]) : Number.MAX_SAFE_INTEGER;
}
function _trackingBuildStatusCounts_(items) {
  var counts = { all: 0, received: 0, overdue: 0, notdue: 0 };
  return (
    (_c30A_(items) ? items : []).forEach(function (item) {
      counts.all += 1;
      var key = String((item && item.filterKey) || "notdue");
      (counts[key] || (counts[key] = 0), (counts[key] += 1));
    }),
    counts
  );
}
function _trackingApplyServerFilters_(items, filters) {
  var matchedLetterIds = (filters = filters || {}).matchedLetterIds || null,
    query = _s_(filters.query),
    statusFilter = _s_(filters.statusFilter),
    staffFilter = _s_(filters.staffFilter).toLowerCase(),
    agencyFilter = _s_(filters.agencyFilter).toLowerCase(),
    caseIdFilter = _s_(filters.caseIdFilter);
  return (_c30A_(items) ? items : []).filter(function (item) {
    return (
      !(!item || isSoftDeletedRow_(item)) &&
      (!caseIdFilter || _s_(item.caseId) === caseIdFilter) &&
      (!statusFilter ||
        _s_(item.letterStatus) === statusFilter ||
        _s_(item.status) === statusFilter) &&
      (!staffFilter ||
        _s_(item.opStaff || item.officer)
          .toLowerCase()
          .indexOf(staffFilter) !== -1) &&
      (!agencyFilter ||
        _s_(item.agency).toLowerCase().indexOf(agencyFilter) !== -1) &&
      !(query && matchedLetterIds && !matchedLetterIds[_s_(item.letterId)])
    );
  });
}
function _trackingGuardAdapters_(guard) {
  function shouldYield(bufferMs) {
    return (
      !!guard &&
      (_appIsFn_(guard.shouldYield)
        ? guard.shouldYield(bufferMs)
        : !!_appIsFn_(guard.timeLeftMs) &&
          guard.timeLeftMs() <= Math.max(Number(bufferMs || 0) || 0, 1500))
    );
  }
  function markPartial(detail) {
    if (guard) {
      if (_appIsFn_(guard.markPartial))
        try {
          guard.markPartial(detail || {});
        } catch (_markErr) {
          _recordWarning_("tracking.guard.markPartial", _markErr);
        }
      else if (_appIsFn_(guard.check))
        try {
          guard.check("partial", detail || {});
        } catch (_checkErr) {
          _recordWarning_("tracking.guard.checkPartial", _checkErr);
        }
    }
  }
  return { shouldYield, markPartial };
}
function _trackingBuildQueryMatchMap_(query, letterIndex) {
  if (!(query = _s_(query).trim().toLowerCase())) return null;
  var matchedLetterIds = {},
    queryTokens = query
      .split(/[^0-9a-zA-Zก-๙]+/)
      .map(function (x) {
        return _s_(x).trim();
      })
      .filter(Boolean);
  return (
    (letterIndex || []).forEach(function (entry) {
      if (entry) {
        var hit = _s_(entry.text).indexOf(query) !== -1;
        if (!hit && queryTokens.length) {
          var tokenMap = {};
          ((entry.tokens || []).forEach(function (t) {
            tokenMap[t] = 1;
          }),
            (hit = queryTokens.every(function (t) {
              return tokenMap[t] || _s_(entry.text).indexOf(t) !== -1;
            })));
        }
        hit && (matchedLetterIds[_s_(entry.letterId)] = 1);
      }
    }),
    matchedLetterIds
  );
}
function _trackingNormalizeRowsForServerPage_(rows, caseMap, today, guardApi) {
  var normalizedItems = [];
  rows = _c30A_(rows) ? rows : [];
  for (var rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    if (guardApi && guardApi.shouldYield && guardApi.shouldYield(650)) {
      guardApi.markPartial &&
        guardApi.markPartial({
          stage: "normalize-letters",
          processedRows: rowIndex,
          totalRows: rows.length,
        });
      break;
    }
    var r = rows[rowIndex] || {},
      normalized = _appIsFnName_("_normalizeLetterRow_")
        ? _normalizeLetterRow_(r)
        : r,
      due = _trackingDueDateOnly_(normalized.extendDate || normalized.dueDate),
      daysLeft = due ? Math.round((due - today) / 864e5) : null,
      letterStatus = _trackingNormalizeStatus_(
        normalized.letterStatus || normalized.status || "",
      ),
      received = _trackingIsReceived_(letterStatus),
      repliesParsed = _trackingParseReplies_(normalized),
      receivedFreezeDate = received
        ? _trackingReceivedFreezeDate_(normalized, repliesParsed, today)
        : null;
    received &&
      due &&
      receivedFreezeDate &&
      (daysLeft = Math.round((due - receivedFreezeDate) / 864e5));
    var filterKey = received
        ? "received"
        : due && daysLeft <= 0
          ? "overdue"
          : "notdue",
      caseInfo = (caseMap || {})[_s_(normalized.caseId)] || {
        caseNum: "-",
        recNo: "",
        title: "-",
        status: "",
      };
    normalizedItems.push(
      sanitizeRow_({
        letterId: normalized.letterId || "",
        caseId: normalized.caseId || "",
        caseNum: caseInfo.caseNum,
        recNo: caseInfo.recNo,
        caseTitle: caseInfo.title,
        title: caseInfo.title,
        caseStatus: caseInfo.status,
        letterNo: _trackingNormalizeLetterNo_(
          normalized.letterNo || normalized.bookNo || "",
        ),
        bookNo: _trackingNormalizeLetterNo_(
          normalized.bookNo || normalized.letterNo || "",
        ),
        letterNoRaw: normalized.letterNoRaw || "",
        letterNoSchemaIssue: normalized.letterNoSchemaIssue || "",
        agency: normalized.agency || "",
        subject: normalized.subject || normalized.title || "",
        issue: normalized.issue || "",
        daysLeft: daysLeft === null ? "" : daysLeft,
        frozenDaysLeft: received && daysLeft !== null ? daysLeft : "",
        stoppedDayCount: received,
        receivedDate: receivedFreezeDate
          ? Utilities.formatDate(
              receivedFreezeDate,
              Session.getScriptTimeZone() || "Asia/Bangkok",
              "yyyy-MM-dd",
            )
          : "",
        status: letterStatus,
        letterStatus,
        filterKey,
        officer: normalized.officer || normalized.opStaff || "",
        opStaff: normalized.opStaff || normalized.officer || "",
        letterDate: normalized.letterDate || "",
        dueDate: normalized.dueDate || "",
        extendDate: normalized.extendDate || "",
        repliesJSON: normalized.repliesJSON || "[]",
        replies: repliesParsed,
      }),
    );
  }
  return normalizedItems;
}
function _trackingSortServerItems_(items, sortBy, sortDir) {
  return (
    (items = _c30A_(items) ? items : []).sort(function (a, b) {
      var av, bv;
      if (sortBy === "caseNum" || sortBy === "sequence" || sortBy === "seq")
        return (av = _trackingSequenceNumber_(
          a && (a.caseNum || a.recNo || a.letterNo),
        )) ===
          (bv = _trackingSequenceNumber_(
            b && (b.caseNum || b.recNo || b.letterNo),
          ))
          ? _s_(a.caseNum || a.letterNo).localeCompare(
              _s_(b.caseNum || b.letterNo),
              "th",
              { numeric: !0, sensitivity: "base" },
            )
          : sortDir === "desc"
            ? bv - av
            : av - bv;
      if (
        ((av = a && a[sortBy]),
        (bv = b && b[sortBy]),
        sortBy === "daysLeft"
          ? ((av = Number(av === "" || av == null ? 999999 : av)),
            (bv = Number(bv === "" || bv == null ? 999999 : bv)))
          : sortBy === "letterDate" ||
              sortBy === "dueDate" ||
              sortBy === "extendDate"
            ? ((av = av ? new Date(av).getTime() : 0),
              (bv = bv ? new Date(bv).getTime() : 0))
            : ((av = _c30S_(av).toLowerCase()),
              (bv = _c30S_(bv).toLowerCase())),
        av === bv)
      )
        return 0;
      var cmp = av > bv ? 1 : -1;
      return sortDir === "desc" ? -cmp : cmp;
    }),
    items
  );
}
function _trackingPaginateServerItems_(items, payload) {
  var trackingPayload = _c30O_({}, payload, {
    limit: Math.max(1, Math.min(Number(payload.limit || 25) || 25, 25)),
    page: Math.max(1, Number(payload.page || 1) || 1),
  });
  return _appIsFnName_("_paginateArrayResult_")
    ? _paginateArrayResult_(items.map(sanitizeRow_), trackingPayload, 25, 25, {
        source: "tracking-core-server-filtered",
      })
    : {
        rows: items.map(sanitizeRow_).slice(0, 25),
        totalRecords: items.length,
        page: 1,
        limit: Math.min(items.length, 25),
        totalPages: Math.max(1, Math.ceil(items.length / 25)),
      };
}
function _trackingRequestOptions_(payload) {
  payload = payload || {};
  var query = _s_(payload.query || payload.search)
      .trim()
      .toLowerCase(),
    rawType = String(
      payload.filterType || payload.type || payload.statusType || "all",
    )
      .replace(/[ ​-‍\uFEFF]/g, "")
      .trim()
      .toLowerCase(),
    compact = rawType.replace(/[\s_\-\/]+/g, ""),
    thai = _s_(payload.filterType || payload.type).replace(/\s+/g, ""),
    typeFilter = "all";
  rawType && compact !== "all" && thai !== "หนังสือทั้งหมด"
    ? compact === "received" ||
      compact === "done" ||
      compact === "reply" ||
      compact === "replied" ||
      thai.indexOf("ตอบรับ") > -1 ||
      thai.indexOf("ได้รับแล้ว") > -1
      ? (typeFilter = "received")
      : compact === "overdue" ||
          compact === "due" ||
          compact === "late" ||
          compact === "expired" ||
          compact === "ครบเลยกำหนด" ||
          thai.indexOf("เลยกำหนด") > -1 ||
          thai.indexOf("ครบกำหนด") > -1
        ? (typeFilter = "overdue")
        : (compact === "notdue" ||
            compact === "notyetdue" ||
            compact === "pending" ||
            compact === "soon" ||
            compact === "ยังไม่ครบกำหนด" ||
            compact === "ไม่ครบกำหนด" ||
            thai.indexOf("ไม่ครบกำหนด") > -1) &&
          (typeFilter = "notdue")
    : (typeFilter = "all");
  var sortBy = String(payload.sortBy || "sequence").trim(),
    allowedSorts;
  return (
    {
      sequence: !0,
      seq: !0,
      caseNum: !0,
      letterNo: !0,
      letterDate: !0,
      dueDate: !0,
      extendDate: !0,
      daysLeft: !0,
      agency: !0,
      opStaff: !0,
      status: !0,
      letterStatus: !0,
    }[sortBy] || (sortBy = "sequence"),
    {
      query,
      typeFilter,
      statusFilter: _s_(payload.status).trim(),
      staffFilter: _s_(payload.opStaff || payload.staff)
        .trim()
        .toLowerCase(),
      agencyFilter: _s_(
        payload.agency || payload.agencyFilter || payload.agencyName,
      )
        .trim()
        .toLowerCase(),
      caseIdFilter: _s_(payload.caseId).trim(),
      sortBy,
      sortDir:
        String(payload.sortDir || "asc")
          .trim()
          .toLowerCase() === "desc"
          ? "desc"
          : "asc",
    }
  );
}
function _trackingReadCachedPage_(cacheKey) {
  if (!_appIsFnName_("_cacheGetJson_")) return null;
  var cachedTracking = _cacheGetJson_(cacheKey);
  return cachedTracking &&
    _c30A_(cachedTracking.rows) &&
    cachedTracking.serverPaged === !0 &&
    cachedTracking.serverFiltered === !0 &&
    cachedTracking.contract === "tracking-server-paged-current" &&
    cachedTracking.rows.length <= 25 &&
    Number(cachedTracking.limit || 25) <= 25
    ? ((cachedTracking.cached = !0),
      (cachedTracking.cacheStatus = "hit"),
      cachedTracking)
    : null;
}
function _trackingBuildServerPageData_(payload, guardApi) {
  var opts = _trackingRequestOptions_((payload = payload || {})),
    trackingRepo = TrackingRepository_(),
    rows = trackingRepo.listLetters(),
    caseMap = _trackingGetCaseMap_(
      trackingRepo,
      guardApi && guardApi.shouldYield,
      guardApi && guardApi.markPartial,
      payload.forceFresh === !0,
    ),
    today = new Date();
  today.setHours(0, 0, 0, 0);
  var matchedLetterIds = _trackingBuildQueryMatchMap_(
      opts.query,
      trackingRepo.searchIndex(rows, caseMap),
    ),
    normalizedItems = _trackingNormalizeRowsForServerPage_(
      rows,
      caseMap,
      today,
      guardApi || {},
    ),
    baseItems = _trackingApplyServerFilters_(normalizedItems, {
      query: opts.query,
      matchedLetterIds,
      statusFilter: opts.statusFilter,
      staffFilter: opts.staffFilter,
      agencyFilter: opts.agencyFilter,
      caseIdFilter: opts.caseIdFilter,
    }),
    statusCounts = _trackingBuildStatusCounts_(baseItems),
    items = baseItems.filter(function (item) {
      return (
        !opts.typeFilter ||
        opts.typeFilter === "all" ||
        _s_(item.filterKey) === opts.typeFilter
      );
    });
  return (
    (items = _trackingSortServerItems_(items, opts.sortBy, opts.sortDir)),
    {
      opts,
      rows,
      normalizedItems,
      baseItems,
      items,
      paged: _trackingPaginateServerItems_(items, payload),
      statusCounts,
    }
  );
}
function _trackingBuildServerOutput_(payload, result, cacheKey, guard) {
  var opts =
      (result = result || {}).opts || _trackingRequestOptions_(payload || {}),
    baseItems = _c30A_(result.baseItems) ? result.baseItems : [],
    paged = result.paged || {},
    generatedAt = new Date().toISOString(),
    out = _c30O_({}, paged, {
      generatedAt,
      cached: !1,
      cacheStatus: "miss",
      serverPaged: !0,
      serverFiltered: !0,
      statusCounts:
        result.statusCounts || _trackingBuildStatusCounts_(baseItems),
      maxPageSize: 25,
      contract: "tracking-server-paged-current",
      contractEnvelope: "rows-totalRecords-page-limit-meta-current",
      meta: {
        source: "tracking-core-server-filtered",
        generatedAt,
        filterType: opts.typeFilter || "all",
        sortBy: opts.sortBy,
        sortDir: opts.sortDir,
      },
      dataQuality: {
        letterNoSchemaIssues: baseItems.filter(function (x) {
          return !(!x || !x.letterNoSchemaIssue);
        }).length,
      },
      filterType: opts.typeFilter || "all",
      sortBy: opts.sortBy,
      sortDir: opts.sortDir,
      partial: !!(guard && guard.report && guard.report().yielded),
      warning:
        guard && guard.report && guard.report().yielded
          ? "PARTIAL_RESULT_TIMEOUT_GUARD"
          : "",
    });
  return (
    guard &&
      _appIsFnName_("_executionGuardAttachMeta_") &&
      (out = _executionGuardAttachMeta_(out, guard, {
        rowsRead: (result.rows || []).length,
        normalizedRows: (result.normalizedItems || []).length,
      })),
    _appIsFnName_("_noteResponseBudget_") &&
      (out.responseBudget = _noteResponseBudget_("apiGetTracking", out)),
    out
  );
}
function _getTrackingCore_(payload) {
  payload = payload || {};
  var guard =
      typeof createExecutionGuard_ == "function"
        ? createExecutionGuard_({
            label: "_getTrackingCore_",
            route: "apiGetTracking",
            maxMs: Number(payload.hardLimitMs || 28e3) || 28e3,
            warningMs: Number(payload.softLimitMs || 24e3) || 24e3,
          })
        : null,
    guardApi = _trackingGuardAdapters_(guard);
  try {
    var cacheTtlSeconds = Math.max(
        10,
        Math.min(Number(payload.cacheTtlSeconds || 45) || 45, 180),
      ),
      cacheKey = _trackingQueryCacheKey_(payload);
    if (payload.forceFresh !== !0) {
      var cachedTracking = _trackingReadCachedPage_(cacheKey);
      if (cachedTracking)
        return ok_(cachedTracking, "โหลดข้อมูลติดตามหนังสือสำเร็จ");
    }
    var pageData,
      out = _trackingBuildServerOutput_(
        payload,
        _trackingBuildServerPageData_(payload, guardApi),
        cacheKey,
        guard,
      );
    return (
      _appIsFnName_("_cachePutJson_") &&
        _cachePutJson_(cacheKey, out, cacheTtlSeconds),
      ok_(out, "โหลดข้อมูลติดตามหนังสือสำเร็จ")
    );
  } catch (e) {
    _recordWarning_("ec", e);
    var userMessage = _appIsFnName_("_aiUserFacingError_")
      ? _aiUserFacingError_(e)
      : e && e.message
        ? e.message
        : String(e);
    try {
      typeof logAudit_ == "function" &&
        logAudit_("tracking.strict_error", {
          message: _s_(userMessage).substring(0, 240),
        });
    } catch (_auditErr) {
      _recordWarning_("ec", _auditErr);
    }
    var empty = _trackingEmptyResult_(
      payload,
      userMessage,
      "TRACKING_PROJECTED_READER_REQUIRED",
    );
    return (
      (empty.partial = !0),
      (empty.cacheStatus = "error"),
      (empty.strictErrorMode = !0),
      err_("โหลดข้อมูลติดตามหนังสือไม่สำเร็จ:" + userMessage, empty)
    );
  }
}
function _Domain_getLetters(caseId) {
  try {
    getCanonicalHeaderAudit_("Letters");
    var payload =
      caseId && typeof caseId === "object" && !Array.isArray(caseId)
        ? caseId
        : {};
    var listMode = _s_(
      payload.__meetingListMode || payload.listMode || "",
    ).trim();
    var requestedLetterId = _s_(
      payload.letterId || payload.id || payload.recordId || payload.rowId || "",
    ).trim();
    var preferCaseList =
      /caseLetters|allLetters|case/i.test(listMode) ||
      payload.__meetingListRefreshOwner ||
      payload.__meetingAfterSaveRefreshOwner ||
      payload.includeLetters === !0;
    var letterId = preferCaseList ? "" : requestedLetterId;
    var forceFresh =
      payload.forceFresh === !0 ||
      payload.forceRefresh === !0 ||
      payload.noCache === !0 ||
      payload.bypassCache === !0 ||
      payload.cacheTtlSeconds === 0 ||
      !!letterId ||
      !!preferCaseList;
    function parseArray(value) {
      if (_c30A_(value))
        return value.filter(function (item) {
          return !!item;
        });
      if (value && typeof value === "object") {
        if (_c30A_(value.rows))
          return value.rows.filter(function (item) {
            return !!item;
          });
        if (_c30A_(value.items))
          return value.items.filter(function (item) {
            return !!item;
          });
        if (_c30A_(value.data))
          return value.data.filter(function (item) {
            return !!item;
          });
        if (_c30A_(value.records))
          return value.records.filter(function (item) {
            return !!item;
          });
        if (value.payload) return parseArray(value.payload);
        if (value.result) return parseArray(value.result);
        return [];
      }
      var raw = _s_(value).replace(/^'+/, "").trim();
      if (
        !raw ||
        raw === "-" ||
        raw === "[]" ||
        raw === "{}" ||
        /^null|undefined$/i.test(raw)
      )
        return [];
      try {
        return parseArray(JSON.parse(raw));
      } catch (_jsonErr) {
        return [];
      }
    }
    function firstParsedArray(row, normalized, keys) {
      row = row || {};
      normalized = normalized || {};
      keys = keys || [];
      for (var i = 0; i < keys.length; i++) {
        var k = keys[i],
          values = [row[k], normalized[k]];
        for (var j = 0; j < values.length; j++) {
          var parsed = parseArray(values[j]);
          if (parsed.length) return parsed;
        }
      }
      return [];
    }
    function pick(row, keys) {
      row = row || {};
      for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        if (row[k] !== void 0 && row[k] !== null && _s_(row[k]).trim() !== "")
          return row[k];
      }
      return "";
    }
    function norm(v) {
      return _normalizeIdentityTextSafe_(v || "");
    }
    function readFullLetterRows() {
      try {
        return sheetToObjects_(getSheet_("Letters")) || [];
      } catch (_fullErr) {
        _recordWarning_("letters.fullRead.r94", _fullErr);
        return [];
      }
    }
    function readCaseRows() {
      try {
        return _meetingLettersRows_("MainData", !1) || [];
      } catch (_caseProjectedErr) {
        try {
          return sheetToObjects_(getSheet_("MainData")) || [];
        } catch (_caseFullErr) {
          _recordWarning_("letters.caseIdentityRead.r94", _caseFullErr);
          return [];
        }
      }
    }
    var aliases = { ids: [], case: null },
      idMap = {},
      caseRows = [],
      canonicalCaseId = "",
      relation = null;
    if (aliases.case) caseRows.push(aliases.case);
    var targetCaseNum = _caseSequenceFrom_(payload);
    if (!targetCaseNum && !letterId)
      throw new Error("กรุณาระบุลำดับเรื่องสำหรับหนังสือติดตาม");
    if (!letterId) {
      var resolvedCaseForLetters = _requireUniqueCaseBySequence_(_caseSequenceIdentityPayload_(targetCaseNum));
      caseRows = resolvedCaseForLetters && resolvedCaseForLetters.row
        ? [resolvedCaseForLetters.row]
        : [];
      var resolvedCaseId = _s_(
        resolvedCaseForLetters &&
          resolvedCaseForLetters.row &&
          (resolvedCaseForLetters.row.caseId || resolvedCaseForLetters.row.id),
      ).trim();
      canonicalCaseId = resolvedCaseId;
      relation = {
        caseNum: targetCaseNum,
        caseId: resolvedCaseId,
        row: (resolvedCaseForLetters && resolvedCaseForLetters.row) || {},
      };
      resolvedCaseId && (idMap[resolvedCaseId] = !0);
    }
    function identity(row) {
      row = row || {};
      var id = _s_(row.letterId || row.id || row.recordId || row.rowId).trim();
      if (id) return "id:" + id;
      return [
        "key",
        _s_(row.caseId),
        _s_(row.letterNo || row.bookNo),
        normalizeDateOutput_(row.letterDate || row.date || ""),
        norm(row.subject || row.issue || ""),
        norm(row.agency || ""),
      ].join("|");
    }
    function mergeRow(base, fresh) {
      base = base || {};
      fresh = fresh || {};
      var out = {};
      Object.keys(base).forEach(function (k) {
        out[k] = base[k];
      });
      Object.keys(fresh).forEach(function (k) {
        var v = fresh[k];
        if (
          _c30A_(v)
            ? v.length
            : v !== void 0 && v !== null && _s_(v).trim() !== ""
        )
          out[k] = v;
        else if (!(k in out)) out[k] = v;
      });
      return out;
    }
    function normalizeReplyDetail(item) {
      item = item || {};
      var date = normalizeDateOutput_(
        item.date ||
          item.replyDate ||
          item.receivedDate ||
          item.receiveDate ||
          item["วันที่รับ"] ||
          "",
      );
      var bookNo = _normalizeLetterNumberDisplay_(
        item.bookNo ||
          item.letterNo ||
          item.replyBookNo ||
          item.replyLetterNo ||
          item.replyNo ||
          item.receiveNo ||
          item["เลขที่หนังสือ"] ||
          item["เลขที่หนังสือตอบรับ"] ||
          "",
      );
      var title = _s_(
        item.title ||
          item.replyTitle ||
          item.subjectTitle ||
          item.replySubjectTitle ||
          item["เรื่อง"] ||
          item["เรื่องหนังสือตอบรับ"] ||
          item["เรื่องตอบรับ"] ||
          "",
      );
      var subject = _s_(
        item.subject ||
          item.summary ||
          item.note ||
          item.replySubject ||
          item.replySummary ||
          item.replyNote ||
          item["สาระตอบกลับ"] ||
          item["หมายเหตุ"] ||
          "",
      );
      return {
        date: date,
        replyDate: date,
        receivedDate: date,
        bookNo: bookNo,
        letterNo: bookNo,
        title: title,
        subject: subject,
        summary: subject,
        note: subject,
      };
    }
    function normalizeExtensionDetail(item) {
      item = item || {};
      var bookNo = _normalizeLetterNumberDisplay_(
        item.bookNo ||
          item.letterNo ||
          item.extensionBookNo ||
          item.extensionLetterNo ||
          item.extensionNo ||
          item.extendNo ||
          item["เลขที่หนังสือ"] ||
          item["เลขที่หนังสือขยายเวลา"] ||
          "",
      );
      var date = normalizeDateOutput_(
        item.date ||
          item.letterDate ||
          item.extensionDate ||
          item.extensionLetterDate ||
          item.extendedDate ||
          item["วันเดือนปี"] ||
          item["วันเดือนปีขยายเวลา"] ||
          "",
      );
      var title = _s_(
        item.title ||
          item.subject ||
          item.extensionTitle ||
          item.extensionSubject ||
          item.extendTitle ||
          item["เรื่อง"] ||
          item["เรื่องขยายเวลา"] ||
          "",
      );
      var dueDate = normalizeDateOutput_(
        item.dueDate ||
          item.extendedDueDate ||
          item.extensionDueDate ||
          item.newDueDate ||
          item["วันครบกำหนดขยายเวลา"] ||
          "",
      );
      return {
        bookNo: bookNo,
        letterNo: bookNo,
        date: date,
        letterDate: date,
        extensionDate: date,
        title: title,
        subject: title,
        dueDate: dueDate,
        extendedDueDate: dueDate,
        newDueDate: dueDate,
      };
    }
    function normalizeDetailed(row) {
      row = row || {};
      var normalized = _normalizeLetterRow_(row);
      [
        "caseNum",
        "caseNo",
        "recNo",
        "receiveNo",
        "title",
        "caseTitle",
        "petitioners",
      ].forEach(function (k) {
        if (row[k] !== void 0 && normalized[k] === void 0)
          normalized[k] = row[k];
      });
      var replies = firstParsedArray(row, normalized, [
        "replies",
        "replyRows",
        "replyItems",
        "replyList",
        "repliesJSON",
        "repliesJson",
        "replyJSON",
        "replyJson",
        "ข้อมูลหนังสือตอบรับ",
      ]);
      var extensions = firstParsedArray(row, normalized, [
        "extensions",
        "extensionRows",
        "extensionItems",
        "extendItems",
        "extensionList",
        "extensionsJSON",
        "extensionsJson",
        "extensionJSON",
        "extensionJson",
        "กรณีขยายระยะเวลา",
      ]);
      if (!replies.length) {
        var replyOne = normalizeReplyDetail({
          date: pick(row, [
            "replyDate",
            "receivedDate",
            "receiveDate",
            "วันที่รับ",
          ]),
          bookNo: pick(row, [
            "replyBookNo",
            "replyLetterNo",
            "replyNo",
            "receiveNo",
            "เลขที่หนังสือตอบรับ",
          ]),
          title: pick(row, [
            "replyTitle",
            "replySubjectTitle",
            "replySubject",
            "เรื่องหนังสือตอบรับ",
            "เรื่องตอบรับ",
          ]),
          subject: pick(row, [
            "replySummary",
            "replyNote",
            "สาระตอบกลับ",
            "หมายเหตุ",
          ]),
        });
        _s_(
          replyOne.date ||
            replyOne.bookNo ||
            replyOne.title ||
            replyOne.subject,
        ).trim() && (replies = [replyOne]);
      } else
        replies = replies.map(normalizeReplyDetail).filter(function (item) {
          return (
            _s_(
              item.date || item.bookNo || item.title || item.subject,
            ).trim() !== ""
          );
        });
      if (!extensions.length) {
        var extOne = normalizeExtensionDetail({
          bookNo: pick(row, [
            "extensionBookNo",
            "extensionLetterNo",
            "extensionNo",
            "extendNo",
            "เลขที่หนังสือขยายเวลา",
          ]),
          date: pick(row, [
            "extensionDate",
            "extensionLetterDate",
            "extendedDate",
            "วันเดือนปีขยายเวลา",
          ]),
          title: pick(row, [
            "extensionTitle",
            "extensionSubject",
            "extendTitle",
            "เรื่องขยายเวลา",
          ]),
          dueDate: pick(row, [
            "extendedDueDate",
            "extensionDueDate",
            "newDueDate",
            "วันครบกำหนดขยายเวลา",
          ]),
        });
        _s_(
          extOne.bookNo || extOne.date || extOne.title || extOne.dueDate,
        ).trim() && (extensions = [extOne]);
      } else
        extensions = extensions
          .map(normalizeExtensionDetail)
          .filter(function (item) {
            return (
              _s_(
                item.bookNo || item.date || item.title || item.dueDate,
              ).trim() !== ""
            );
          });
      normalized.repliesJSON = _safeJsonStringify_(replies);
      normalized.extensionsJSON = _safeJsonStringify_(extensions);
      normalized.replies = replies;
      normalized.replyRows = replies;
      normalized.replyItems = replies;
      normalized.extensions = extensions;
      normalized.extensionRows = extensions;
      normalized.extensionItems = extensions;
      if (relation) {
        normalized = _caseStampResolvedRelation_(
          normalized,
          relation,
          "letter-case-sequence-or-caseid-resolved-r146",
        );
      }
      if (canonicalCaseId) normalized.caseId = canonicalCaseId;
      return normalized;
    }
    function letterMatchesCase(row) {
      if (!row || isSoftDeletedRow_(row)) return !1;
      var rowCaseId = _s_(row.caseId || row.caseID || row.case_id || row.recordId || row.uid || "").trim();
      if (relation) return _caseChildRowBelongsToResolvedCase_(row, relation);
      return !!letterId && rowCaseId && idMap[rowCaseId];
    }
    var projectedRows = [];
    try {
      projectedRows = _trackingReadLettersRows_() || [];
    } catch (_projectedErr) {
      _recordWarning_("letters.projectedRead.r94", _projectedErr);
      projectedRows = [];
    }
    var fullRows =
      forceFresh || letterId || preferCaseList ? readFullLetterRows() : [];
    var fullByKey = {};
    fullRows.forEach(function (row) {
      var key = identity(row);
      key && (fullByKey[key] = row);
    });
    var allRows = (projectedRows.length ? projectedRows : fullRows).map(
      function (row) {
        var key = identity(row),
          full = key && fullByKey[key];
        return full ? mergeRow(row, full) : row;
      },
    );
    if (fullRows.length) {
      var seen = {};
      allRows.forEach(function (row) {
        var key = identity(row);
        key && (seen[key] = !0);
      });
      fullRows.forEach(function (row) {
        var key = identity(row);
        key && !seen[key] && allRows.push(row);
      });
    }
    var rows = [];
    if (letterId) {
      rows = allRows.filter(function (r) {
        return (
          _s_(r.letterId || r.id || r.recordId || r.rowId).trim() === letterId
        );
      });
    } else {
      rows = allRows.filter(letterMatchesCase);
    }

    var hasIdentity = letterId || targetCaseNum;
    return hasIdentity
      ? _safeDedupeLatestRowsBy_(rows, _safeLetterIdentityKey_)
          .map(normalizeDetailed)
          .sort(function (a, b) {
            var av = _s_(a.letterDate || a.dueDate),
              bv = _s_(b.letterDate || b.dueDate);
            return av === bv
              ? _s_(b.letterId).localeCompare(_s_(a.letterId), "th")
              : av > bv
                ? -1
                : 1;
          })
      : [];
  } catch (e) {
    throw (
      _recordWarning_("ec", e),
      logAudit_("letters.strict_error", {
        error: String(e && e.message ? e.message : e),
      }),
      e
    );
  }
}
function _Domain_getMeetingHistory(payload) {
  try {
    var relation = _caseResolvedRelationContext_(payload || {}),
      caseNum = relation.caseNum,
      rows = (_meetingHistoryProjectedRows_() || [])
        .filter(function (row) {
          return _caseChildRowBelongsToResolvedCase_(row, relation);
        })
        .map(function (row) {
          return _caseStampResolvedRelation_(
            row,
            relation,
            "meeting-history-case-sequence-primary-key-r148",
          );
        });
    return _dedupeMeetingHistoryRows_(rows)
      .map(function (row) {
        return _normalizeMeetingLogRow_(row);
      })
      .sort(function (a, b) {
        var av = _s_(a.dateRaw),
          bv = _s_(b.dateRaw);
        return av === bv
          ? _s_(a.round).localeCompare(_s_(b.round), "th")
          : av > bv
            ? -1
            : 1;
      });
  } catch (e) {
    _recordWarning_("meeting_history.case_relation_resolved_guard", e);
    throw e;
  }
}
function deleteLetter(payload) {
  var input;
  return domainWrite_(
    "deleteLetter",
    payload && typeof payload == "object" ? payload : { letterId: payload },
    function (req) {
      req = req && typeof req === "object" ? req : {};
      var letterId = String(
        _payloadValue_(req, ["letterId", "id"]) || "",
      ).trim();
      if (!letterId) throw new Error("ไม่พบรหัสหนังสือติดตามที่ต้องการลบ");
      var relation = _safeResolveCaseIdentityAliases_(req),
        caseNum = _caseSequenceNormalizeStrict_(relation && relation.caseNum || "");
      if (!caseNum)
        throw new Error("ไม่พบลำดับเรื่องสำหรับลบหนังสือติดตาม");
      var targetLetter = (_meetingLettersRows_("Letters", !0) || []).filter(function (row) {
          return _s_(row && (row.letterId || row.id || row.recordId || row.rowId)).trim() === letterId;
        })[0] || null,
        targetCaseNum = _caseSequenceFrom_(targetLetter || {});
      if (!targetCaseNum && targetLetter && targetLetter.caseId) {
        var targetRelation = _safeResolveCaseIdentityAliases_({ caseId: targetLetter.caseId });
        targetCaseNum = _caseSequenceNormalizeStrict_(targetRelation && targetRelation.caseNum || "");
      }
      if (targetCaseNum && targetCaseNum !== caseNum)
        throw new Error("หนังสือติดตามไม่ตรงกับลำดับเรื่องที่เลือก");
      var res = getCanonicalRepository_("letters.main").softDelete(letterId, {
          isDeleted: !0,
          deletedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }),
        cacheInvalidation = _appIsFnName_("_invalidateLettersDerivedCaches_")
          ? _invalidateLettersDerivedCaches_("deleteLetter")
          : {};
      return ok_(
        {
          letterId: letterId,
          primaryKey: "ลำดับเรื่อง",
          caseNum: caseNum,
          cacheInvalidation: cacheInvalidation,
          result: res,
        },
        "ลบหนังสือติดตามสำเร็จ",
      );
    },
  );
}
function _fetchAllLettersWithCaseInfoImpl_(payload) {
  payload = payload || {};
  var allCases = _safeDedupeLatestRowsBy_(
      _meetingLettersRows_("MainData", !1),
      _safeCaseIdentityKey_,
    ),
    caseMap = {},
    caseSeqMap = {};
  allCases.forEach(function (row) {
    if (row && !isSoftDeletedRow_(row)) {
      var id = _s_(row.caseId).trim(),
        seq = _caseSequenceFrom_(row);
      id && (caseMap[id] = row);
      seq && (caseSeqMap[seq] = row);
    }
  });
  var letters = _safeDedupeLatestRowsBy_(
      _meetingLettersRows_("Letters", !1),
      _safeLetterIdentityKey_,
    )
      .filter(function (row) {
        return row && !isSoftDeletedRow_(row);
      })
      .map(function (row) {
        var normalized = _normalizeLetterRow_(row),
          rowCaseNum = _caseSequenceFrom_(row) || _caseSequenceFrom_(normalized),
          rowCaseId = _s_(normalized.caseId || row.caseId || "").trim(),
          owner = rowCaseNum ? caseSeqMap[rowCaseNum] || null : caseMap[rowCaseId] || null;
        if (rowCaseNum && owner && _caseSequenceFrom_(owner) !== rowCaseNum) owner = null;
        owner &&
          ((normalized.caseNum = _caseSequenceFrom_(owner) || _s_(owner.caseNum)),
          (normalized.caseNo = normalized.caseNum),
          (normalized.runningNo = normalized.caseNum),
          (normalized["ลำดับเรื่อง"] = normalized.caseNum),
          (normalized.recNo = _s_(owner.recNo)),
          (normalized.caseTitle = _s_(owner.caseTitle || owner.title)),
          (normalized.title = _s_(owner.title || owner.caseTitle)),
          (normalized.petitioners = _s_(
            owner.petitioners || owner.petitionerName,
          )),
          (normalized.assignees = _s_(owner.assignees)),
          (normalized.status = _s_(owner.status)));
        try {
          var repliesJson = normalized.repliesJSON || "[]";
          normalized.replies =
            repliesJson && String(repliesJson).trim().charAt(0) === "["
              ? JSON.parse(repliesJson)
              : [];
        } catch (_e) {
          (_recordWarning_("ec", _e), (normalized.replies = []));
        }
        return normalized;
      }),
    filterType = String(payload.filterType || payload.type || "all").trim();
  if (filterType === "received")
    letters = letters.filter(function (row) {
      return (
        _s_(row.letterStatus).trim() === "ได้รับแล้ว" ||
        _s_(row.letterStatus).trim() === "ได้รับตอบกลับแล้ว"
      );
    });
  else if (filterType === "overdue" || filterType === "notdue") {
    var today = new Date();
    (today.setHours(0, 0, 0, 0),
      (letters = letters.filter(function (row) {
        var status = _s_(row.letterStatus).trim();
        if (status === "ได้รับแล้ว" || status === "ได้รับตอบกลับแล้ว")
          return !1;
        var target = row.extendDate || row.dueDate;
        if (!target) return filterType === "notdue";
        var d = _trackingDueDateOnly_(target);
        return d
          ? filterType === "overdue"
            ? today >= d
            : today < d
          : filterType === "notdue";
      })));
  }
  return (
    letters.sort(function (a, b) {
      var av = _s_(a.letterDate || a.dueDate),
        bv = _s_(b.letterDate || b.dueDate);
      return av === bv
        ? _s_(a.caseNum).localeCompare(_s_(b.caseNum), "th")
        : av > bv
          ? -1
          : 1;
    }),
    ok_(letters, "โหลดหนังสือติดตามพร้อมข้อมูลเรื่องสำเร็จ")
  );
}
function saveMeetingLog(p) {
  return domainWrite_(
    "saveMeetingLog",
    p,
    function (input) {
      input = input && typeof input == "object" ? input : {};
      var now = new Date().toISOString(),
        lock = null,
        locked = !1;
      function text(v) {
        return _c30S_(v)
          .replace(/[\u200B-\u200D\uFEFF]/g, "")
          .replace(/\s+/g, "")
          .trim();
      }
      function norm(v) {
        return text(v)
          .toLowerCase()
          .replace(/[\s_\-\/().:]+/g, "");
      }
      function unique(list) {
        var out2 = [],
          seen = {};
        return (
          (_c30A_(list) ? list : []).forEach(function (v) {
            ((v = text(v)), v && !seen[v] && ((seen[v] = !0), out2.push(v)));
          }),
          out2
        );
      }
      function aliases(domain, field, fallback) {
        var list = [];
        try {
          if (
            typeof AppBackendCore != "undefined" &&
            AppBackendCore.getFieldAliases
          )
            list = AppBackendCore.getFieldAliases(domain, field) || [];
          else if (
            typeof AppBackendCore != "undefined" &&
            AppBackendCore.FIELD_MAP
          ) {
            var d = AppBackendCore.FIELD_MAP.domains || {},
              spec = d[domain] || {},
              fields = spec.fields || {},
              item = fields[field] || {};
            list = item.aliases || [];
          }
        } catch (_aliasErr) {
          _c30W_("meeting.saveLog.alias", _aliasErr, { domain, field });
        }
        return unique(
          (_c30A_(list) ? list : []).concat(
            _c30A_(fallback) ? fallback : [field],
          ),
        );
      }
      var casePayload =
          input.caseIdentity && typeof input.caseIdentity == "object"
            ? input.caseIdentity
            : input.case && typeof input.case == "object"
              ? input.case
              : {},
        logPayload =
          input.log && typeof input.log == "object"
            ? input.log
            : input.meetingLog && typeof input.meetingLog == "object"
              ? input.meetingLog
              : input.history && typeof input.history == "object"
                ? input.history
                : {};
      function pick(scopes, keys) {
        ((scopes = _c30A_(scopes) ? scopes : [scopes]),
          (keys = unique(_c30A_(keys) ? keys : [keys])));
        for (var s = 0; s < scopes.length; s++)
          for (var obj = scopes[s] || {}, i = 0; i < keys.length; i++) {
            var k = keys[i];
            if (
              _c30H_(obj, k) &&
              obj[k] != null &&
              String(obj[k]).trim() !== ""
            )
              return obj[k];
          }
        return "";
      }
      function caseVal(field, extra) {
        return text(
          pick(
            [casePayload, input, logPayload],
            aliases("cases", field, extra || [field]),
          ),
        );
      }
      function logVal(field, extra) {
        return text(
          pick(
            [logPayload, input, casePayload],
            aliases("meetingLogs", field, extra || [field]),
          ),
        );
      }
      function hashKey(parts) {
        for (
          var raw = parts.map(text).join("|").toLowerCase(),
            h = 2166136261,
            i = 0;
          i < raw.length;
          i++
        )
          ((h ^= raw.charCodeAt(i)),
            (h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24)));
        return (h >>> 0).toString(36).toUpperCase();
      }
      function ensureSheet() {
        var requiredHeaders = [
            "caseId",
            "round",
            "date",
            "note",
            "logId",
            "meetingId",
            "meetingDate",
            "title",
            "location",
            "attendees",
            "summary",
            "result",
            "committeeType",
            "subcommitteeId",
            "subcommitteeName",
            "meetingGroup",
            "createdAt",
            "updatedAt",
            "isDeleted",
            "deletedAt",
            "caseNum",
            "caseNo",
            "recNo",
            "receiveNo",
            "phase2BusinessKey",
          ],
          ss = getSpreadsheet_(),
          sh2 = ss.getSheetByName("MeetingLogs");
        return (
          sh2 ||
            ((sh2 = ss.insertSheet("MeetingLogs")),
            sh2
              .getRange(1, 1, 1, requiredHeaders.length)
              .setValues([requiredHeaders])),
          requiredHeaders.forEach(function (h) {
            _appIsFnName_("ensureHeaderColumn_") &&
              ensureHeaderColumn_("MeetingLogs", h);
          }),
          getSheet_("MeetingLogs")
        );
      }
      function invalidateAfterWrite(rowNumber) {
        if (_appIsFnName_("_afterSheetWrite_"))
          try {
            _afterSheetWrite_("MeetingLogs", {
              operation: "saveMeetingLog",
              rows: 1,
              row: rowNumber,
              owner: "phase2.meetingHistory.singleSavePath",
            });
          } catch (_afterErr) {
            _c30W_("meeting.saveLog.phase2.afterWrite", _afterErr, {
              row: rowNumber,
            });
          }
        if (_appIsFnName_("_invalidateMeetingDerivedCaches_"))
          try {
            _invalidateMeetingDerivedCaches_("saveMeetingLog.phase2");
          } catch (_cacheErr) {
            _c30W_("meeting.saveLog.phase2.invalidate", _cacheErr, {
              row: rowNumber,
            });
          }
        else if (typeof invalidateSheetCache_ == "function")
          try {
            invalidateSheetCache_("MeetingLogs");
          } catch (_cacheErr2) {
            _c30W_("meeting.saveLog.phase2.invalidateSheet", _cacheErr2, {
              row: rowNumber,
            });
          }
        if (_appIsFnName_("_invalidateCaseDerivedCaches_"))
          try {
            _invalidateCaseDerivedCaches_(
              "saveMeetingLog.phase3.reportReadModel",
            );
          } catch (_caseCacheErr) {
            _c30W_(
              "meeting.saveLog.phase3.invalidateCaseReport",
              _caseCacheErr,
              { row: rowNumber },
            );
          }
      }
      try {
        let col2 = function (names) {
            names = unique(_c30A_(names) ? names : [names]);
            for (var n = 0; n < names.length; n++)
              for (var want = norm(names[n]), c = 0; c < headers.length; c++)
                if (norm(headers[c]) === want) return c;
            return -1;
          },
          cell2 = function (row3, names) {
            var idx = col2(names);
            return idx >= 0 ? text(row3[idx]) : "";
          },
          rowDeleted2 = function (row3) {
            return (
              (cDel >= 0 && /^true|1|yes|deleted$/i.test(text(row3[cDel]))) ||
              (cDeletedAt >= 0 && !!text(row3[cDeletedAt]))
            );
          },
          sameBusiness2 = function (row3) {
            var rowCaseNumForMatch = cell2(row3, ["caseNum", "caseNo", "runningNo", "ลำดับเรื่อง"]),
              sameCaseNum = caseNum && rowCaseNumForMatch === caseNum;
            if (
              cBusiness >= 0 &&
              sameCaseNum &&
              text(row3[cBusiness]) &&
              text(row3[cBusiness]) === businessKey
            )
              return !0;
            var sameCase = sameCaseNum,
              sameRound =
                !round ||
                cell2(
                  row3,
                  aliases("meetingLogs", "round", [
                    "round",
                    "meetingRound",
                    "meetingNo",
                    "ครั้งที่",
                    "ครั้งที่ประชุม",
                  ]),
                ) === round,
              sameDate =
                !date ||
                cell2(
                  row3,
                  aliases("meetingLogs", "date", [
                    "date",
                    "meetingDate",
                    "วันที่ประชุม",
                  ]),
                ) === date,
              rowType = cell2(row3, [
                "committeeType",
                "meetingType",
                "ประเภทการประชุม",
              ]),
              sameType = !rowType || rowType === committeeType,
              rowSub = cell2(row3, [
                "subcommitteeName",
                "subcommittee",
                "คณะอนุกรรมาธิการ",
                "meetingGroup",
              ]),
              sameSub =
                committeeType !== "คณะอนุกรรมาธิการ" ||
                rowSub === subcommitteeName;
            return sameCase && sameRound && sameDate && sameType && sameSub;
          },
          setCol2 = function (names, value) {
            names = unique(_c30A_(names) ? names : [names]);
            for (var i = 0; i < names.length; i++) {
              var idx = col2(names[i]);
              idx >= 0 && (out[idx] = value);
            }
          };
        var col = col2,
          cell = cell2,
          rowDeleted = rowDeleted2,
          sameBusiness = sameBusiness2,
          setCol = setCol2;
        if (
          typeof LockService != "undefined" &&
          LockService.getDocumentLock &&
          ((lock = LockService.getDocumentLock()),
          (locked = lock && lock.tryLock ? lock.tryLock(15e3) : !1),
          lock && !locked)
        )
          throw new Error(
            "ระบบกำลังบันทึกประวัติการประชุมจากคำสั่งก่อนหน้า กรุณาลองอีกครั้ง",
          );
        var caseSeed = {
            caseId: caseVal("caseId", ["caseId", "id", "case_id"]),
            caseNum: text(
              pick(
                [casePayload, input, logPayload],
                ["caseNum", "caseNo", "runningNo", "ลำดับเรื่อง"],
              ),
            ),
            recNo: caseVal("recNo", [
              "recNo",
              "receiveNo",
              "receiptNo",
              "เลขรับเรื่อง",
              "เลขรับ",
            ]),
            title: caseVal("title", [
              "title",
              "caseTitle",
              "subject",
              "เรื่อง",
              "ชื่อเรื่อง",
            ]),
            caseTitle: caseVal("caseTitle", [
              "caseTitle",
              "title",
              "subject",
              "เรื่อง",
              "ชื่อเรื่อง",
            ]),
            petitioners: caseVal("petitioners", [
              "petitioners",
              "petitioner",
              "petitionerName",
              "ผู้เสนอญัตติ/ผู้ร้อง",
              "ผู้ร้อง",
            ]),
          },
          resolved = null;
        if (!caseSeed.caseNum)
          throw new Error("กรุณาระบุลำดับเรื่องก่อนบันทึกประวัติการประชุม");
        resolved = _safeResolveCaseIdentityAliases_(_caseSequenceIdentityPayload_(caseSeed.caseNum)) || {};
        var caseInfo = (resolved && resolved.case) || {},
          realCaseId = text(caseInfo.caseId || caseInfo.id || ""),
          caseNum = text(
            caseSeed.caseNum ||
              caseInfo.caseNum ||
              caseInfo.caseNo ||
              caseInfo.runningNo ||
              "",
          ),
          recNo = text(
            caseSeed.recNo ||
              caseInfo.recNo ||
              caseInfo.receiveNo ||
              caseInfo.receiptNo ||
              "",
          ),
          title = text(
            caseSeed.title ||
              caseSeed.caseTitle ||
              caseInfo.title ||
              caseInfo.caseTitle ||
              caseInfo.subject ||
              "",
          ),
          petitioners = text(
            caseSeed.petitioners ||
              caseInfo.petitioners ||
              caseInfo.petitionerName ||
              caseInfo.petitioner ||
              "",
          );
        if (!realCaseId || !caseNum)
          throw new Error(
            "ไม่พบเรื่องพิจารณาที่ตรงกับลำดับเรื่อง กรุณาเลือกเรื่องใหม่ก่อนบันทึกประวัติการประชุม",
          );
        if (caseSeed.caseId && caseSeed.caseId !== realCaseId)
          _recordWarning_("meeting.saveLog.clientCaseIdIgnored.sequenceStrict", null, {
            clientCaseId: caseSeed.caseId,
            canonicalCaseId: realCaseId,
            caseNum: caseNum,
          });
        var syntheticCaseId = !1,
          caseId = realCaseId,
          round = logVal("round", [
            "round",
            "newRound",
            "meetingRound",
            "meetingNo",
            "roundNo",
            "ครั้งที่",
            "ครั้งที่ประชุม",
          ]),
          date = logVal("date", [
            "date",
            "newDate",
            "meetingDate",
            "meetingDateText",
            "วันที่ประชุม",
          ]),
          note = logVal("result", [
            "note",
            "newNote",
            "result",
            "summary",
            "decision",
            "มติ",
            "ผลการพิจารณา",
            "ผลการประชุม",
          ]);
        if (!round && !date && !note)
          throw new Error("กรุณากรอกข้อมูลประวัติการประชุม");
        var committeeType =
            logVal("committeeType", [
              "committeeType",
              "meetingType",
              "committeeKind",
              "ประเภทการประชุม",
            ]) ||
            text(input.committeeType || input.meetingType || "") ||
            "คณะกรรมาธิการ",
          subcommitteeId = logVal("subcommitteeId", [
            "subcommitteeId",
            "subCommitteeId",
          ]),
          subcommitteeName = logVal(
            "subcommitteeName",
            _C30K_SUBCOMMITTEE_NAME_,
          );
        if (committeeType !== "คณะอนุกรรมาธิการ")
          ((subcommitteeId = ""), (subcommitteeName = ""));
        else if (
          (!subcommitteeName &&
            subcommitteeId &&
            (subcommitteeName = subcommitteeId),
          !subcommitteeId &&
            subcommitteeName &&
            (subcommitteeId = subcommitteeName),
          !subcommitteeName)
        )
          throw new Error("กรุณาเลือกคณะอนุกรรมาธิการ");
        var meetingGroup =
            committeeType === "คณะอนุกรรมาธิการ"
              ? subcommitteeName
              : committeeType,
          businessKey = [
            caseId,
            caseNum,
            recNo,
            title,
            round,
            date,
            committeeType,
            subcommitteeName,
          ]
            .map(text)
            .join("|"),
          logId = text(
            pick(
              [logPayload, input],
              ["logId", "currentLogId", "meetingLogId"],
            ),
          );
        logId || (logId = "LOGH-" + hashKey([businessKey, note]));
        for (
          var rowObj = {
              caseId,
              caseNum,
              caseNo: caseNum,
              recNo,
              receiveNo: recNo,
              round,
              meetingRound: round,
              meetingNo: round,
              date,
              meetingDate: date,
              note,
              logId,
              id: logId,
              meetingLogId: logId,
              meetingId: logVal("meetingId", ["meetingId"]),
              title,
              caseTitle: title,
              subject: title,
              location: logVal("location", [
                "location",
                "meetingLocation",
                "สถานที่ประชุม",
              ]),
              attendees: logVal("attendees", [
                "attendees",
                "participants",
                "ผู้เข้าร่วมประชุม",
              ]),
              summary: logVal("summary", ["summary"]) || note,
              result: logVal("result", ["result"]) || note,
              committeeType,
              meetingType: committeeType,
              subcommitteeId,
              subcommitteeName,
              subcommittee: subcommitteeName,
              meetingGroup,
              phase2BusinessKey: businessKey,
              updatedAt: now,
              isDeleted: !1,
              deletedAt: "",
            },
            sh = ensureSheet(),
            width = Math.max(sh.getLastColumn(), 1),
            lastRow = Math.max(sh.getLastRow(), 1),
            values = sh.getRange(1, 1, lastRow, width).getValues(),
            headers = (values[0] || []).map(function (h) {
              return text(h);
            }),
            cLog = col2(
              aliases("meetingLogs", "logId", ["logId", "meetingLogId", "id"]),
            ),
            cBusiness = col2(["phase2BusinessKey"]),
            cDel = col2(["isDeleted", "deleted"]),
            cDeletedAt = col2(["deletedAt"]),
            targetRow = -1,
            r = 1;
          r < values.length;
          r++
        ) {
          var row = values[r] || [];
          if (
            !rowDeleted2(row) &&
            cLog >= 0 &&
            text(row[cLog]) &&
            text(row[cLog]) === logId
          ) {
            targetRow = r + 1;
            break;
          }
        }
        if (targetRow < 0)
          for (var rr = 1; rr < values.length; rr++) {
            var row2 = values[rr] || [];
            if (!rowDeleted2(row2) && sameBusiness2(row2)) {
              targetRow = rr + 1;
              var existingId = cLog >= 0 ? text(row2[cLog]) : "";
              existingId &&
                (rowObj.logId =
                  rowObj.id =
                  rowObj.meetingLogId =
                  logId =
                    existingId);
              break;
            }
          }
        var cCreated = col2(["createdAt"]),
          existingCreated = "";
        (targetRow > 1 &&
          cCreated >= 0 &&
          (existingCreated =
            (values[targetRow - 1] && values[targetRow - 1][cCreated]) || ""),
          (rowObj.createdAt = existingCreated || now));
        var isCreate = targetRow < 1;
        isCreate && (targetRow = Math.max(sh.getLastRow(), 1) + 1);
        for (
          var out =
            targetRow > 1 && values[targetRow - 1]
              ? values[targetRow - 1].slice(0, width)
              : [];
          out.length < width;
        )
          out.push("");
        return (
          setCol2(aliases("meetingLogs", "caseId", ["caseId"]), rowObj.caseId),
          setCol2(["caseNum", "caseNo", "runningNo", "ลำดับเรื่อง"], rowObj.caseNum),
          setCol2(
            aliases("meetingLogs", "recNo", [
              "recNo",
              "receiveNo",
              "receiptNo",
              "เลขรับเรื่อง",
              "เลขรับ",
            ]),
            rowObj.recNo,
          ),
          setCol2(
            aliases("meetingLogs", "round", [
              "round",
              "meetingRound",
              "meetingNo",
              "ครั้งที่",
              "ครั้งที่ประชุม",
            ]),
            rowObj.round,
          ),
          setCol2(
            aliases("meetingLogs", "date", [
              "date",
              "meetingDate",
              "วันที่ประชุม",
            ]),
            rowObj.date,
          ),
          setCol2(
            ["note", "newNote", "มติ", "ผลการพิจารณา", "ผลการประชุม"],
            rowObj.note,
          ),
          setCol2(["summary"], rowObj.summary),
          setCol2(["result"], rowObj.result),
          setCol2(
            aliases("meetingLogs", "logId", ["logId", "meetingLogId", "id"]),
            rowObj.logId,
          ),
          setCol2(["meetingId"], rowObj.meetingId),
          setCol2(
            aliases("meetingLogs", "title", [
              "title",
              "caseTitle",
              "subject",
              "เรื่อง",
              "ชื่อเรื่อง",
            ]),
            rowObj.title,
          ),
          setCol2(
            ["location", "meetingLocation", "สถานที่ประชุม"],
            rowObj.location,
          ),
          setCol2(
            ["attendees", "participants", "ผู้เข้าร่วมประชุม"],
            rowObj.attendees,
          ),
          setCol2(
            ["committeeType", "meetingType", "ประเภทการประชุม"],
            rowObj.committeeType,
          ),
          setCol2(["subcommitteeId", "subCommitteeId"], rowObj.subcommitteeId),
          setCol2(_C30K_SUBCOMMITTEE_NAME_, rowObj.subcommitteeName),
          setCol2(["meetingGroup"], rowObj.meetingGroup),
          setCol2(["phase2BusinessKey"], rowObj.phase2BusinessKey),
          setCol2(["createdAt"], rowObj.createdAt),
          setCol2(["updatedAt"], rowObj.updatedAt),
          setCol2(["isDeleted", "deleted"], rowObj.isDeleted),
          setCol2(["deletedAt"], rowObj.deletedAt),
          sh.getRange(targetRow, 1, 1, out.length).setValues([out]),
          invalidateAfterWrite(targetRow),
          ok_(
            {
              logId,
              caseId,
              syntheticCaseId,
              rowNumber: targetRow,
              mode: isCreate ? "create" : "update",
              source: "MeetingLogs.phase2.single-save-path",
              phase2BusinessKey: businessKey,
            },
            "บันทึกประวัติการประชุมสำเร็จ",
          )
        );
      } finally {
        try {
          lock && locked && lock.releaseLock && lock.releaseLock();
        } catch (_releaseErr) {
          _c30W_("meeting.saveLog.phase2.releaseLock", _releaseErr);
        }
      }
    },
    "บันทึกประวัติการประชุมสำเร็จ",
    "บันทึกประวัติการประชุมไม่สำเร็จ",
  );
}
function deleteMeetingLog(payload) {
  var input;
  return domainWrite_(
    "deleteMeetingLog",
    payload && typeof payload == "object" ? payload : { logId: payload },
    function (req) {
      req = req && typeof req === "object" ? req : {};
      var logId = String(
        _payloadValue_(req, ["logId", "id", "rowId", "meetingLogId"]) || "",
      ).trim();
      if (!logId) throw new Error("ไม่พบรหัสประวัติการประชุมที่ต้องการลบ");
      var relation = _safeResolveCaseIdentityAliases_(req),
        caseNum = _caseSequenceNormalizeStrict_(relation && relation.caseNum || "");
      if (!caseNum)
        throw new Error("ไม่พบลำดับเรื่องสำหรับลบประวัติการประชุม");
      var targetLog = (_meetingLettersRows_("MeetingLogs", !0) || []).filter(function (row) {
          return _s_(row && (row.logId || row.id || row.recordId || row.rowId)).trim() === logId;
        })[0] || null,
        targetCaseNum = _caseSequenceFrom_(targetLog || {});
      if (!targetCaseNum && targetLog && targetLog.caseId) {
        var targetRelation = _safeResolveCaseIdentityAliases_({ caseId: targetLog.caseId });
        targetCaseNum = _caseSequenceNormalizeStrict_(targetRelation && targetRelation.caseNum || "");
      }
      if (targetCaseNum && targetCaseNum !== caseNum)
        throw new Error("ประวัติการประชุมไม่ตรงกับลำดับเรื่องที่เลือก");
      var now = new Date().toISOString(),
        repo = getCanonicalRepository_("meeting.logs"),
        res = null;
      try {
        res = repo.softDelete(logId, {
          isDeleted: !0,
          deletedAt: now,
          updatedAt: now,
        });
      } catch (_repoDeleteErr) {
        _c30W_("meeting.delete.repo", _repoDeleteErr, { logId });
      }
      var okDeleted = !(!res || (res.ok === !1 && !res.deleted && !res.mode));
      if (!okDeleted)
        try {
          var sh =
            typeof AppRepository != "undefined" && AppRepository.getSheet
              ? AppRepository.getSheet("MeetingLogs")
              : typeof getSheet_ == "function"
                ? getSheet_("MeetingLogs")
                : null;
          if (sh) {
            let readMeetingLogMatrix_2 = function () {
              return typeof AppRepository != "undefined" &&
                AppRepository.readMatrix
                ? AppRepository.readMatrix("MeetingLogs")
                : typeof getSheetMatrix_ == "function"
                  ? getSheetMatrix_(sh)
                  : [];
            };
            var readMeetingLogMatrix_ = readMeetingLogMatrix_2,
              values = readMeetingLogMatrix_2();
            if (values.length > 1) {
              let col2 = function (names) {
                for (var i = 0; i < names.length; i++) {
                  var j = head.indexOf(names[i]);
                  if (j >= 0) return j;
                }
                return -1;
              };
              var col = col2,
                head = values[0].map(function (h) {
                  return _s_(h).trim();
                }),
                cLog = col2(["logId", "id", "rowId", "meetingLogId"]),
                cCase = col2(["caseId"]),
                cRound = col2(["round", "meetingNo", "ครั้งที่"]),
                cDate = col2(["date", "meetingDate", "วันที่ประชุม"]),
                cDel = col2(["isDeleted"]);
              cDel < 0 &&
                _appIsFnName_("ensureHeaderColumn_") &&
                (ensureHeaderColumn_("MeetingLogs", "isDeleted"),
                (values = readMeetingLogMatrix_2()),
                (cDel = (head = values[0].map(function (h) {
                  return _s_(h).trim();
                })).indexOf("isDeleted")));
              var cDeletedAt = col2(["deletedAt"]);
              cDeletedAt < 0 &&
                _appIsFnName_("ensureHeaderColumn_") &&
                (ensureHeaderColumn_("MeetingLogs", "deletedAt"),
                (values = readMeetingLogMatrix_2()),
                (cDeletedAt = (head = values[0].map(function (h) {
                  return _s_(h).trim();
                })).indexOf("deletedAt")));
              var cUpdated = col2(["updatedAt"]);
              cUpdated < 0 &&
                _appIsFnName_("ensureHeaderColumn_") &&
                (ensureHeaderColumn_("MeetingLogs", "updatedAt"),
                (values = readMeetingLogMatrix_2()),
                (cUpdated = (head = values[0].map(function (h) {
                  return _s_(h).trim();
                })).indexOf("updatedAt")));
              for (
                var caseId = _s_(req.caseId).trim(), r = 1;
                r < values.length;
                r++
              ) {
                var row = values[r],
                  match = cLog >= 0 && _s_(row[cLog]).trim() === logId;
                if (
                  (!match &&
                    caseId &&
                    _s_(logId).indexOf("LOG-") < 0 &&
                    (match =
                      cCase >= 0 &&
                      _s_(row[cCase]).trim() === caseId &&
                      ((cRound >= 0 && _s_(row[cRound]).trim() === logId) ||
                        (cDate >= 0 && _s_(row[cDate]).trim() === logId))),
                  match)
                ) {
                  (cDel >= 0 &&
                    AppRepository.setCellValue(
                      "MeetingLogs",
                      r + 1,
                      cDel + 1,
                      !0,
                      { invalidate: !1 },
                    ),
                    cDeletedAt >= 0 &&
                      AppRepository.setCellValue(
                        "MeetingLogs",
                        r + 1,
                        cDeletedAt + 1,
                        now,
                        { invalidate: !1 },
                      ),
                    cUpdated >= 0 &&
                      AppRepository.setCellValue(
                        "MeetingLogs",
                        r + 1,
                        cUpdated + 1,
                        now,
                        { invalidate: !1 },
                      ),
                    (okDeleted = !0),
                    (res = { ok: !0, mode: "softDeleteFallback", row: r + 1 }));
                  break;
                }
              }
            }
          }
        } catch (_fallbackDeleteErr) {
          _c30W_("meeting.delete.sheetFallback", _fallbackDeleteErr, { logId });
        }
      if (!okDeleted)
        throw new Error("ไม่พบข้อมูลประวัติการประชุมที่ต้องการลบ");
      var cacheInvalidation = _appIsFnName_("_invalidateMeetingDerivedCaches_")
        ? _invalidateMeetingDerivedCaches_("deleteMeetingLog")
        : {};
      return ok_(
        { logId, cacheInvalidation, result: res },
        "ลบประวัติการประชุมสำเร็จ",
      );
    },
  );
}
function saveLetter(p) {
  return domainWrite_("saveLetter", p, function (input) {
    input = input && typeof input === "object" ? input : {};
    var hadInputCaseSequence = !!_caseSequenceFrom_(input);
    var startedAt = Date.now();
    var relation = _safeResolveCaseIdentityAliases_(input),
      caseNum = _caseSequenceNormalizeStrict_(relation && relation.caseNum || "");
    if (!caseNum)
      return err_("ไม่พบลำดับเรื่องสำหรับหนังสือติดตาม", {
        primaryKey: "ลำดับเรื่อง",
        receivedCaseId: _s_(input.caseId || input.id).trim(),
      });
    _caseApplySequenceIdentity_(input, caseNum, false);
    var canonicalCase = _requireUniqueCaseBySequence_(_caseSequenceIdentityPayload_(caseNum));
    var caseId = _s_(
      canonicalCase && canonicalCase.row &&
        (canonicalCase.row.caseId || canonicalCase.row.id),
    ).trim();
    if (!caseId) return err_("ไม่พบ caseId ของลำดับเรื่อง: " + caseNum);
    function normalizeReply(row) {
      row = row || {};
      var date = normalizeDateOutput_(
        row.date || row.replyDate || row.receivedDate || "",
      );
      var bookNo = _normalizeLetterNumberDisplay_(
        row.bookNo || row.letterNo || row.replyNo || row.receiveNo || "",
      );
      var title = _s_(row.title || row.replyTitle || row.subjectTitle || "");
      var subject = _s_(row.subject || row.summary || row.note || "");
      return {
        date: date,
        replyDate: date,
        receivedDate: date,
        bookNo: bookNo,
        letterNo: bookNo,
        title: title,
        subject: subject,
        summary: subject,
        note: subject,
      };
    }
    function normalizeExtension(row) {
      row = row || {};
      var bookNo = _normalizeLetterNumberDisplay_(
        row.bookNo || row.letterNo || row.extensionNo || row.extendNo || "",
      );
      var date = normalizeDateOutput_(
        row.date ||
          row.letterDate ||
          row.extensionDate ||
          row.extendedDate ||
          "",
      );
      var title = _s_(row.title || row.subject || row.topic || row.issue || "");
      var dueDate = normalizeDateOutput_(
        row.extendedDueDate ||
          row.dueDate ||
          row.newDueDate ||
          row.extendDate ||
          "",
      );
      return {
        bookNo: bookNo,
        letterNo: bookNo,
        date: date,
        letterDate: date,
        extensionDate: date,
        title: title,
        subject: title,
        dueDate: dueDate,
        extendedDueDate: dueDate,
        newDueDate: dueDate,
      };
    }
    function normKey(v) {
      try {
        if (typeof _normalizedHeaderKey_ === "function")
          return _normalizedHeaderKey_(v);
      } catch (_nkErr) {}
      return String(v == null ? "" : v)
        .replace(/[\s\u00A0\u200B-\u200D\uFEFF_\-\/().:：]+/g, "")
        .toLowerCase();
    }
    function clean(v) {
      return _s_(v)
        .replace(/[\u00A0\u200B-\u200D\uFEFF]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    }
    function readHeaders(sh) {
      var lastCol = Math.max(
        1,
        Number(sh.getLastColumn && sh.getLastColumn()) || 1,
      );
      return sh
        .getRange(1, 1, 1, lastCol)
        .getValues()[0]
        .map(function (h) {
          return String(h || "").trim();
        });
    }
    function ensureFastHeaders(sh, required) {
      var headers = readHeaders(sh),
        seen = {};
      headers.forEach(function (h) {
        var k = normKey(h);
        if (k) seen[k] = true;
      });
      var missing = [];
      required.forEach(function (h) {
        var k = normKey(h);
        if (k && !seen[k]) {
          seen[k] = true;
          missing.push(h);
        }
      });
      if (missing.length) {
        sh.getRange(1, headers.length + 1, 1, missing.length).setValues([
          missing,
        ]);
        headers = headers.concat(missing);
      }
      return headers;
    }
    function buildIndex(headers) {
      var exact = {},
        norm = {};
      headers.forEach(function (h, i) {
        if (h) exact[h] = i;
        var k = normKey(h);
        if (k && norm[k] == null) norm[k] = i;
      });
      return {
        exact: exact,
        norm: norm,
        idx: function (names) {
          names = Array.isArray(names) ? names : [names];
          for (var i = 0; i < names.length; i++) {
            var n = String(names[i] || "");
            if (this.exact[n] != null) return this.exact[n];
            var k = normKey(n);
            if (k && this.norm[k] != null) return this.norm[k];
          }
          return -1;
        },
      };
    }
    function colValues(sh, idx, lastRow) {
      if (idx < 0 || lastRow <= 1) return [];
      return sh
        .getRange(2, idx + 1, lastRow - 1, 1)
        .getValues()
        .map(function (r) {
          return r && r[0];
        });
    }
    var replies = (_c30A_(input.replies) ? input.replies : [])
      .map(normalizeReply)
      .filter(function (item) {
        return (
          _s_(item.date || item.bookNo || item.title || item.subject).trim() !==
          ""
        );
      });
    var extensions = (_c30A_(input.extensions) ? input.extensions : [])
      .map(normalizeExtension)
      .filter(function (item) {
        return (
          _s_(item.bookNo || item.date || item.title || item.dueDate).trim() !==
          ""
        );
      });
    var latestExtendDate = "";
    extensions.forEach(function (item) {
      if (item && item.dueDate) latestExtendDate = item.dueDate;
    });
    var now = new Date().toISOString();
    var incomingLetterNo = input.letterNo || input.bookNo || "";
    var incomingBookNo = input.bookNo || input.letterNo || "";
    var letterId = String(input.letterId || "LTR-" + Date.now()).trim();
    var normalizedLetterNo = _normalizeLetterNumberDisplay_(incomingLetterNo);
    var normalizedBookNo = _normalizeLetterNumberDisplay_(incomingBookNo);
    var normalizedLetterDate = _normalizeLetterDateFromFields_(
      input.letterDate || "",
      input.letterNo || "",
      input.bookNo || "",
    );
    var row = _caseSequenceIdentityPayload_(caseNum, {
      letterId: letterId,
      caseId: caseId,
      letterNo: normalizedLetterNo,
      letterDate: normalizedLetterDate,
      agency: _s_(input.agency).trim(),
      subject: _s_(input.subject).trim(),
      issue: _s_(input.issue).trim(),
      dueDate: input.dueDate || "",
      extendDate: input.extendDate || latestExtendDate || "",
      remark: _s_(input.remark).trim(),
      letterStatus: _normalizeLetterStatusCanonical_(
        input.letterStatus || "ยังไม่ได้รับ",
      ),
      repliesJSON: _safeJsonStringify_(replies),
      extensionsJSON: _safeJsonStringify_(extensions),
      opStaff: _s_(input.opStaff).trim(),
      bookNo: normalizedBookNo,
      officer: _s_(input.officer || input.opStaff).trim(),
      updatedAt: now,
      isDeleted: false,
      deletedAt: "",
    });
    var required = [
      "letterId",
      "caseId",
      "caseNum",
      "caseNo",
      "runningNo",
      "ลำดับเรื่อง",
      "เลขลำดับเรื่อง",
      "ลำดับเรื่องพิจารณา",
      "เลขที่ลำดับเรื่อง",
      "หมายเลขลำดับเรื่อง",
      "letterNo",
      "bookNo",
      "letterDate",
      "agency",
      "subject",
      "issue",
      "dueDate",
      "extendDate",
      "remark",
      "letterStatus",
      "repliesJSON",
      "extensionsJSON",
      "opStaff",
      "officer",
      "createdAt",
      "updatedAt",
      "isDeleted",
      "deletedAt",
    ];
    var sh = getSheet_("Letters");
    var headers = ensureFastHeaders(sh, required),
      index = buildIndex(headers),
      width = headers.length,
      lastRow = Math.max(1, Number(sh.getLastRow && sh.getLastRow()) || 1),
      rowNumber = 0,
      serviceReads = 0,
      serviceWrites = 0;
    var idCol = index.idx(["letterId", "id"]),
      caseCol = index.idx(["caseId"]),
      caseNumCol = index.idx([
        "caseNum",
        "caseNo",
        "runningNo",
        "ลำดับเรื่อง",
        "เลขลำดับเรื่อง",
        "ลำดับเรื่องพิจารณา",
        "เลขที่ลำดับเรื่อง",
        "หมายเลขลำดับเรื่อง",
      ]),
      letterNoCol = index.idx(["letterNo", "bookNo"]),
      bookNoCol = index.idx(["bookNo", "letterNo"]),
      agencyCol = index.idx(["agency", "หน่วยงาน"]),
      deletedCol = index.idx(["isDeleted", "deleted"]),
      deletedAtCol = index.idx(["deletedAt"]);
    if (letterId && idCol >= 0) {
      var ids = colValues(sh, idCol, lastRow);
      serviceReads += ids.length ? 1 : 0;
      for (var i = 0; i < ids.length; i++) {
        if (clean(ids[i]) === letterId) {
          rowNumber = i + 2;
          break;
        }
      }
    }
    if (!rowNumber && lastRow > 1 && (normalizedLetterNo || normalizedBookNo)) {
      var caseVals = colValues(sh, caseCol, lastRow),
        caseNumVals = colValues(sh, caseNumCol, lastRow),
        noVals = colValues(sh, letterNoCol, lastRow),
        bookVals =
          bookNoCol === letterNoCol
            ? noVals
            : colValues(sh, bookNoCol, lastRow),
        agencyVals = colValues(sh, agencyCol, lastRow),
        delVals = colValues(sh, deletedCol, lastRow),
        delAtVals = colValues(sh, deletedAtCol, lastRow);
      serviceReads +=
        1 +
        (caseNumCol >= 0 ? 1 : 0) +
        (bookNoCol === letterNoCol ? 0 : 1) +
        (agencyCol >= 0 ? 1 : 0) +
        (deletedCol >= 0 ? 1 : 0) +
        (deletedAtCol >= 0 ? 1 : 0);
      for (var j = 0; j < caseVals.length; j++) {
        var deleted =
          (deletedCol >= 0 &&
            /^(true|1|yes|deleted|ลบ)$/i.test(clean(delVals[j]))) ||
          (deletedAtCol >= 0 && !!clean(delAtVals[j]));
        if (deleted) continue;
        var storedCaseNum = _caseSequenceNormalizeStrict_(caseNumVals[j] || ""),
          storedCaseId = clean(caseVals[j]),
          sameCase = storedCaseNum
            ? storedCaseNum === caseNum
            : !!(caseId && storedCaseId === caseId);
        var n1 = clean(noVals[j]),
          n2 = clean(bookVals[j]),
          sameNo =
            (normalizedLetterNo &&
              (n1 === normalizedLetterNo || n2 === normalizedLetterNo)) ||
            (normalizedBookNo &&
              (n1 === normalizedBookNo || n2 === normalizedBookNo));
        var sameAgency =
          !row.agency ||
          !clean(agencyVals[j]) ||
          clean(agencyVals[j]) === row.agency;
        if (sameCase && sameNo && sameAgency) {
          rowNumber = j + 2;
          break;
        }
      }
    }
    var values =
      rowNumber > 1
        ? sh.getRange(rowNumber, 1, 1, width).getValues()[0]
        : headers.map(function () {
            return "";
          });
    if (rowNumber > 1) serviceReads += 1;
    function setField(names, value) {
      var idx = index.idx(names);
      if (idx >= 0) values[idx] = value == null ? "" : value;
    }
    Object.keys(row).forEach(function (k) {
      setField(k, row[k]);
    });
    if (!rowNumber) {
      setField("createdAt", now);
      row.createdAt = now;
      rowNumber = lastRow + 1;
    }
    sh.getRange(rowNumber, 1, 1, width).setValues([values]);
    serviceWrites += 1;
    try {
      if (typeof invalidateSheetCache_ === "function")
        invalidateSheetCache_("Letters");
    } catch (_invSheetErr) {
      _c30W_("letters.save.fast.invalidateSheet.r90", _invSheetErr, {
        row: rowNumber,
      });
    }
    var cacheInvalidation = {};
    try {
      if (_appIsFnName_("_invalidateLettersDerivedCaches_"))
        cacheInvalidation =
          _invalidateLettersDerivedCaches_("saveLetter.fast.r90") || {};
    } catch (_invErr) {
      _c30W_("letters.save.fast.invalidate.r90", _invErr, { row: rowNumber });
    }
    row._rowNumber = rowNumber;
    return ok_(
      {
        letterId: letterId,
        caseId: caseId,
        row: row,
        letter: row,
        savedRow: row,
        replies: replies,
        extensions: extensions,
        cacheInvalidation: cacheInvalidation || {},
        mode: rowNumber <= lastRow ? "update" : "append",
        primaryKey: "ลำดับเรื่อง",
        caseNum: caseNum,
        relationResolvedFrom: hadInputCaseSequence
          ? "case-sequence"
          : relation && relation.case
            ? "case-id-compatibility-to-sequence"
            : "case-sequence",
        perf: {
          owner: "saveLetter.fastDirectSheet.r90",
          durationMs: Date.now() - startedAt,
          serviceReads: serviceReads,
          serviceWrites: serviceWrites,
          rowNumber: rowNumber,
        },
      },
      rowNumber <= lastRow
        ? "อัปเดตหนังสือติดตามสำเร็จ"
        : "บันทึกหนังสือติดตามสำเร็จ",
    );
  });
}
((MeetingDomain.getLookupOptions = function (payload) {
  try {
    return (
      (payload = requireDomainRequest_(payload, "viewer")),
      ok_(
        _Domain_getMeetingLookupOptions(payload),
        "โหลดข้อมูลตัวเลือกการประชุมสำเร็จ",
      )
    );
  } catch (e) {
    return (
      _c30W_("cases.meetingLookup.auth", e),
      err_(
        "ไม่สามารถโหลดข้อมูลตัวเลือกการประชุมได้:ไม่พบ token การใช้งาน กรุณาเข้าสู่ระบบใหม่แล้วลองอีกครั้ง",
        {
          authRequired: !0,
          route: "apiGetMeetingLookupOptions",
          error: String((e && e.message) || e),
        },
      )
    );
  }
}),
  (MeetingDomain.getHistory = function (payload) {
    payload = payload || {};
    var perfToken = _appIsFnName_("_appApiPerfStart_")
      ? _appApiPerfStart_("apiGetMeetingHistory", payload)
      : null;
    (_appIsFnName_("_domainRouterAuthAlreadyOk_") &&
      _domainRouterAuthAlreadyOk_(payload)) ||
      requireAuth_(payload, "viewer");
    var rows = _Domain_getMeetingHistory(payload),
      data = _paginateArrayResult_(rows, payload, 20, 250, {
        source: "getMeetingHistory",
        pageFacade: "AppPageKit.rowsFrom-publicBridge",
        domainOwner: "MeetingDomain.getHistory",
      });
    return (
      _appIsFnName_("_appApiPerfEnd_") &&
        (data = _appApiPerfEnd_(perfToken, "ok", data, {
          rowsRead: _c30A_(rows) ? rows.length : 0,
        })),
      ok_(data, "โหลดประวัติการประชุมสำเร็จ")
    );
  }),
  (MeetingDomain.saveLog = function (payload) {
    try {
      return (
        (payload = requireDomainRequest_(payload, "staff")),
        normalizeResult_(
          saveMeetingLog(payload),
          "บันทึกประวัติการประชุมสำเร็จ",
          "บันทึกประวัติการประชุมไม่สำเร็จ",
        )
      );
    } catch (e) {
      var message = String(
        (e && e.message) || e || "บันทึกประวัติการประชุมไม่สำเร็จ",
      );
      return (
        _c30W_("cases.saveMeetingLog", e),
        err_("บันทึกประวัติการประชุมไม่สำเร็จ:" + message, {
          route: "apiSaveMeetingLog",
          error: message,
        })
      );
    }
  }),
  (MeetingDomain.deleteLog = function (payload) {
    payload = requireDomainRequest_(payload, "staff");
    var logId = _payloadValue_(payload, [
      "logId",
      "id",
      "meetingLogId",
      "currentLogId",
    ]);
    return logId
      ? ((payload.logId = logId),
        (payload.id = logId),
        normalizeResult_(
          deleteMeetingLog(payload),
          "ลบประวัติการประชุมสำเร็จ",
          "ลบประวัติการประชุมไม่สำเร็จ",
        ))
      : err_("ลบประวัติการประชุมไม่สำเร็จ:ไม่พบรหัสรายการประชุม", {
          route: "apiDeleteMeetingLog",
        });
  }),
  (TrackingDomain.getLetters = function (payload) {
    payload = requireDomainRequest_(payload, "viewer");
    var rows = _Domain_getLetters(payload);
    return ok_(
      _paginateArrayResult_(rows, payload, 20, 250, {
        source: "getLetters",
        domainOwner: "TrackingDomain.getLetters",
      }),
      "โหลดข้อมูลหนังสือสำเร็จ",
    );
  }),
  (TrackingDomain.saveLetter = function (payload) {
    return (
      (payload = requireDomainRequest_(payload, "staff")),
      auditEvent_("letters", {
        route: "apiSaveLetter",
        caseId: payload.caseId || "",
      }),
      _normalizeOkEnvelope_(
        saveLetter(payload),
        "บันทึกหนังสือติดตามสำเร็จ",
        "บันทึกหนังสือติดตามไม่สำเร็จ",
      )
    );
  }),
  (TrackingDomain.deleteLetter = function (payload) {
    return (
      (payload = requireDomainRequest_(payload, "staff")),
      _normalizeOkEnvelope_(
        deleteLetter(payload),
        "ลบหนังสือติดตามสำเร็จ",
        "ลบหนังสือติดตามไม่สำเร็จ",
      )
    );
  }));
function apiGetMeetingLookupOptions(payload) {
  return MeetingDomain.getLookupOptions(payload || {});
}
function apiGetMeetingHistory(payload) {
  return MeetingDomain.getHistory(payload || {});
}
function apiSaveMeetingLog(payload) {
  return writeGateway_(
    "apiSaveMeetingLog",
    payload || {},
    function (input) {
      return MeetingDomain.saveLog(input || {});
    },
    "บันทึกประวัติการประชุมสำเร็จ",
    "บันทึกประวัติการประชุมไม่สำเร็จ",
  );
}
function apiDeleteMeetingLog(payload) {
  return writeGateway_(
    "apiDeleteMeetingLog",
    payload || {},
    function (input) {
      return MeetingDomain.deleteLog(input || {});
    },
    "ลบประวัติการประชุมสำเร็จ",
    "ลบประวัติการประชุมไม่สำเร็จ",
  );
}
function apiGetLetters(payload) {
  return TrackingDomain.getLetters(payload || {});
}
function apiSaveLetter(payload) {
  return writeGateway_(
    "apiSaveLetter",
    payload || {},
    function (input) {
      return TrackingDomain.saveLetter(input || {});
    },
    "บันทึกหนังสือติดตามสำเร็จ",
    "บันทึกหนังสือติดตามไม่สำเร็จ",
  );
}
function apiDeleteLetter(payload) {
  return writeGateway_(
    "apiDeleteLetter",
    payload || {},
    function (input) {
      return TrackingDomain.deleteLetter(input || {});
    },
    "ลบหนังสือติดตามสำเร็จ",
    "ลบหนังสือติดตามไม่สำเร็จ",
  );
}
function _meetingDuplicateRowMeta_(sheetName) {
  var sh = getSheet_(sheetName),
    data = getSheetMatrix_(sh);
  if (!data || data.length <= 1) return [];
  var headers = (data[0] || []).map(function (v) {
    return _s_(v).trim();
  });
  return data
    .slice(1)
    .map(function (row, idx) {
      var obj = {};
      return (
        headers.forEach(function (h, i) {
          h && (obj[h] = row[i]);
        }),
        (obj._sheetName = sheetName),
        (obj._rowNumber = idx + 2),
        (obj._rowValues = row),
        obj
      );
    })
    .filter(function (row) {
      return !isSoftDeletedRow_(row);
    });
}
function _meetingDuplicateBusinessKey_(sheetName, row) {
  return (
    (row = row || {}),
    sheetName === "MainData"
      ? [
          _s_(row.caseId).trim(),
          _s_(row.caseNum).trim(),
          _s_(row.recNo).trim(),
          _normalizedText_(row.title || row.caseTitle || row.subject || ""),
          _normalizedText_(row.petitioners || row.petitionerName || ""),
        ].join("|")
      : sheetName === "MeetingLogs"
        ? [
            _s_(row.caseId).trim(),
            _s_(row.round).trim(),
            normalizeDateOutput_(row.meetingDate || row.date || ""),
            _normalizedText_(row.title || ""),
            _normalizedText_(row.result || row.note || row.summary || ""),
          ].join("|")
        : sheetName === "Letters"
          ? [
              _s_(row.caseId).trim(),
              _s_(row.letterNo || row.bookNo).trim(),
              normalizeDateOutput_(row.letterDate || ""),
              _normalizedText_(row.agency || ""),
              _normalizedText_(row.subject || row.issue || ""),
            ].join("|")
          : ""
  );
}
function _meetingDuplicatePrimaryKey_(sheetName, row) {
  return (
    (row = row || {}),
    sheetName === "MainData"
      ? _s_(row.caseId).trim()
      : sheetName === "MeetingLogs"
        ? _s_(row.logId || row.meetingId).trim()
        : sheetName === "Letters"
          ? _s_(row.letterId).trim()
          : ""
  );
}
function _meetingDuplicateSheetReport_(sheetName) {
  var rows = _meetingDuplicateRowMeta_(sheetName),
    primaryGroups = {},
    businessGroups = {};
  function buildDuplicateItems(map, kind) {
    return Object.keys(map)
      .filter(function (key) {
        return key && map[key] && map[key].length > 1;
      })
      .map(function (key) {
        var items = map[key].slice().sort(function (a, b) {
            return _rowFreshnessScore_(b).localeCompare(_rowFreshnessScore_(a));
          }),
          keep = items[0] || null,
          remove = items.slice(1);
        return {
          type: kind,
          key,
          count: items.length,
          keepRowNumber: keep ? keep._rowNumber : 0,
          removeRowNumbers: remove.map(function (row) {
            return row._rowNumber;
          }),
          keepId: keep ? _meetingDuplicatePrimaryKey_(sheetName, keep) : "",
          ids: items.map(function (row) {
            return _meetingDuplicatePrimaryKey_(sheetName, row);
          }),
        };
      });
  }
  rows.forEach(function (row) {
    var primaryKey = _meetingDuplicatePrimaryKey_(sheetName, row),
      businessKey = _meetingDuplicateBusinessKey_(sheetName, row);
    (primaryKey &&
      (primaryGroups[primaryKey] || (primaryGroups[primaryKey] = []),
      primaryGroups[primaryKey].push(row)),
      businessKey &&
        (businessGroups[businessKey] || (businessGroups[businessKey] = []),
        businessGroups[businessKey].push(row)));
  });
  var primaryDuplicates = buildDuplicateItems(primaryGroups, "primary"),
    businessDuplicates = buildDuplicateItems(businessGroups, "business").filter(
      function (item) {
        return !primaryGroups[item.key] || primaryGroups[item.key].length <= 1;
      },
    ),
    duplicateItems = primaryDuplicates.concat(businessDuplicates);
  return {
    sheetName,
    totalRows: rows.length,
    duplicateGroups: duplicateItems.length,
    duplicates: duplicateItems.reduce(function (sum, item) {
      return sum + Math.max(0, Number(item.count || 0) - 1);
    }, 0),
    items: duplicateItems,
  };
}
function _meetingDuplicateAuditReport_() {
  return {
    generatedAt: new Date().toISOString(),
    cases: _meetingDuplicateSheetReport_("MainData"),
    meetingLogs: _meetingDuplicateSheetReport_("MeetingLogs"),
    letters: _meetingDuplicateSheetReport_("Letters"),
  };
}
function _meetingDuplicateAuditCsv_(audit) {
  audit = audit || _meetingDuplicateAuditReport_();
  var rows = [
    [
      "sheet",
      "duplicateType",
      "key",
      "count",
      "keepRowNumber",
      "removeRowNumbers",
      "ids",
    ],
  ];
  return (
    ["cases", "meetingLogs", "letters"].forEach(function (section) {
      var report = audit[section] || {},
        items;
      (_c30A_(report.items) ? report.items : []).forEach(function (item) {
        rows.push([
          String(report.sheetName || section),
          _s_(item.type),
          _s_(item.key),
          Number(item.count || 0),
          Number(item.keepRowNumber || 0),
          String((item.removeRowNumbers || []).join("|")),
          String((item.ids || []).join("|")),
        ]);
      });
    }),
    rows.map(function (row) {
      return row
        .map(function (cell) {
          var value = _c30S_(cell);
          return /[",\n]/.test(value)
            ? '"' + value.replace(/"/g, '""') + '"'
            : value;
        })
        .join(",");
    }).join(`
`)
  );
}
function _softDeleteSheetRowsByNumber_(sheetName, rowNumbers, patchObj) {
  if (!(rowNumbers = _c30A_(rowNumbers) ? rowNumbers.slice() : []).length)
    return 0;
  var sh = getSheet_(sheetName),
    audit = getCanonicalHeaderAudit_(sheetName);
  if (audit.missing.length)
    throw new Error(
      "ชีต " + sheetName + " ยังไม่เป็น canonical: " + audit.missing.join(", "),
    );
  var data = getSheetMatrix_(sh);
  if (data.length <= 1) return 0;
  var map = _headerMap_(
      data[0].map(function (v) {
        return _s_(v).trim();
      }),
    ),
    patch = _c30O_(
      {
        isDeleted: !0,
        deletedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      patchObj || {},
    ),
    touched = 0;
  return (
    rowNumbers.forEach(function (rowNumber) {
      var rowIndex = Number(rowNumber || 0) - 1;
      rowIndex < 1 ||
        rowIndex >= data.length ||
        (Object.keys(patch).forEach(function (key) {
          map[key] !== void 0 && (data[rowIndex][map[key]] = patch[key]);
        }),
        touched++);
    }),
    touched &&
      (AppRepository.setRangeValues(sheetName, 2, 1, data.slice(1), {
        invalidate: !1,
      }),
      invalidateSheetCache_(sheetName)),
    touched
  );
}
function apiAuditMeetingData(payload) {
  return (
    (payload = requireDomainRequest_(payload, "admin")),
    ok_(_meetingDuplicateAuditReport_(), "ตรวจสอบข้อมูลซ้ำสำเร็จ")
  );
}
function apiExportMeetingDuplicateAuditCsv(payload) {
  payload = requireDomainRequest_(payload, "admin");
  var audit = _meetingDuplicateAuditReport_();
  return ok_(
    {
      fileName:
        "meeting_duplicate_audit_" +
        Utilities.formatDate(
          new Date(),
          Session.getScriptTimeZone(),
          "yyyyMMdd_HHmmss",
        ) +
        ".csv",
      csv: _meetingDuplicateAuditCsv_(audit),
      audit,
    },
    "สร้างไฟล์รายงานข้อมูลซ้ำสำเร็จ",
  );
}
function apiCleanupMeetingData(payload) {
  return writeGateway_(
    "apiCleanupMeetingData",
    payload || {},
    function (input) {
      input = requireDomainRequest_(input, "admin");
      var audit = _meetingDuplicateAuditReport_(),
        result = {
          cases: 0,
          meetingLogs: 0,
          letters: 0,
          generatedAt: new Date().toISOString(),
        };
      return (
        [
          { section: "cases", sheetName: "MainData" },
          { section: "meetingLogs", sheetName: "MeetingLogs" },
          { section: "letters", sheetName: "Letters" },
        ].forEach(function (entry) {
          var report = audit[entry.section] || {},
            rowNumbers = [];
          ((report.items || []).forEach(function (item) {
            rowNumbers = rowNumbers.concat(item.removeRowNumbers || []);
          }),
            (result[entry.section] = _softDeleteSheetRowsByNumber_(
              entry.sheetName,
              rowNumbers,
              { remark: "duplicate-cleanup", note: "duplicate-cleanup" },
            )));
        }),
        _appIsFnName_("_invalidateMeetingDerivedCaches_") &&
          _invalidateMeetingDerivedCaches_("cleanupDuplicates"),
        _appIsFnName_("_invalidateLettersDerivedCaches_") &&
          _invalidateLettersDerivedCaches_("cleanupDuplicates"),
        ok_(result, "รวมข้อมูลซ้ำสำเร็จ")
      );
    },
    "รวมข้อมูลซ้ำสำเร็จ",
    "รวมข้อมูลซ้ำไม่สำเร็จ",
  );
}
function _Domain__getDashboardStatsRaw_(payload) {
  return _appIsFnName_("_dashboardStatsDirect_")
    ? _dashboardStatsDirect_(payload || {})
    : {
        total: 0,
        totalMeetings: 0,
        meetingItemTotal: 0,
        meetings: { total: 0, totalMeetings: 0, totalItems: 0 },
        statusRows: [],
        byType: [],
        byTopic: [],
        meta: { source: "dashboard-owner-code21-unavailable" },
      };
}
(typeof _Domain_getCanonicalCaseBundle == "function" &&
  (AppDomain.getCanonicalCaseBundle = _Domain_getCanonicalCaseBundle),
  (AppDomain.CasesService = AppDomain.CasesService || {
    cleanOwner: !0,
    getBundle: function (payload) {
      return _Domain_getCanonicalCaseBundle(payload || {});
    },
    getContext: function (payload) {
      return _Domain_getCaseContext(payload || {});
    },
    findExisting: function (payload) {
      return _findExistingCaseRecord_(payload || {});
    },
    repository: function () {
      return _getMainDataRepository_();
    },
  }),
  typeof _Domain_getCaseIdentityHealthReport == "function" &&
    (AppDomain.getCaseIdentityHealthReport =
      _Domain_getCaseIdentityHealthReport),
  typeof _Domain_getLetters == "function" &&
    (AppDomain.getLetters = _Domain_getLetters),
  typeof _Domain_getMeetingHistory == "function" &&
    (AppDomain.getMeetingHistory = _Domain_getMeetingHistory),
  (AppDomain.getDashboardStatsRaw = _Domain__getDashboardStatsRaw_));
var _LOOKUP_BUNDLE_CACHE_TTL_ = 600;
function getLookupBundle_(type, query, scope, limit) {
  var normalizedType;
  if (_normalizeLookupText_(type || "meeting") === "meeting") {
    var base = _getMeetingLookupBundle_(scope);
    return (
      (limit = Math.max(20, Math.min(Number(limit || 120) || 120, 300))),
      {
        petitioners: _filterLookupRows_(base.petitioners, query, limit),
        proposer: _filterLookupRows_(base.proposer, query, limit),
        assignees: _filterLookupRows_(base.assignees, query, limit),
        coAssignees: _filterLookupRows_(base.coAssignees, query, limit),
        staffs: _filterLookupRows_(base.staffs, query, limit),
        opStaff: _filterLookupRows_(base.opStaff, query, limit),
        subcommittees: _filterLookupRows_(base.subcommittees, query, limit),
        bundles: {
          petitioners: _filterLookupRows_(
            base.bundles.petitioners,
            query,
            limit,
          ),
          comms: _filterLookupRows_(base.bundles.comms, query, limit),
          staffs: _filterLookupRows_(base.bundles.staffs, query, limit),
          ops: _filterLookupRows_(base.bundles.ops, query, limit),
          subcommittees: _filterLookupRows_(
            base.bundles.subcommittees,
            query,
            limit,
          ),
        },
      }
    );
  }
  return { rows: [] };
}
function _normalizeLookupContractPayload_(payload) {
  payload = payload || {};
  var limit = Math.max(1, Math.min(Number(payload.limit || 80) || 80, 300)),
    page = Math.max(1, Number(payload.page || 1) || 1),
    cursor = _s_(payload.cursor).trim();
  return {
    type: String(payload.type || "meeting").trim() || "meeting",
    key: _s_(payload.key || payload.kind || payload.target).trim(),
    q: _s_(payload.q || payload.query || payload.keyword).trim(),
    scope: _s_(payload.scope || payload.category || payload.group).trim(),
    limit,
    page,
    cursor,
    offset:
      cursor && /^\d+$/.test(cursor) ? Number(cursor) : (page - 1) * limit,
    contractStamp: "lookup-contract-current",
  };
}
function apiSearchLookup(payload) {
  payload = payload || {};
  var boundary = _routerAuthorizedEntry_("apiSearchLookup", payload, "viewer");
  if (!boundary.ok) return boundary.result;
  var bundle = getLookupBundle_(
      (payload = _normalizeLookupContractPayload_(payload)).type,
      payload.q,
      payload.scope,
      Math.max(payload.limit + payload.offset + 1, payload.limit),
    ),
    rows =
      (payload.key &&
        (bundle[payload.key] || (bundle.bundles || {})[payload.key])) ||
      [];
  rows.length ||
    payload.key ||
    Object.keys(bundle || {}).forEach(function (k) {
      _c30A_(bundle[k]) && (rows = rows.concat(bundle[k]));
    });
  var sliced = (rows = _c30A_(rows) ? rows : []).slice(
      payload.offset,
      payload.offset + payload.limit,
    ),
    nextOffset = payload.offset + sliced.length;
  return {
    ok: !0,
    data: {
      rows: sliced,
      items: sliced,
      records: sliced,
      key: payload.key,
      type: payload.type,
      q: payload.q,
      scope: payload.scope,
      limit: payload.limit,
      cursor: payload.cursor,
      nextCursor: nextOffset < rows.length ? String(nextOffset) : "",
      totalRecords: rows.length,
      contractStamp: payload.contractStamp,
    },
  };
}
function _normalizeLookupText_(value) {
  return _s_(value).trim();
}
function _normalizeLookupQuery_(value) {
  return _normalizeLookupText_(value).toLowerCase();
}
function _activeLookupNameRows_(rows, source) {
  return (_c30A_(rows) ? rows : [])
    .map(function (r) {
      return {
        name: _normalizeLookupText_((r && (r.name || r.fullName)) || ""),
        phone: _normalizeLookupText_((r && (r.phone || r.tel)) || "").replace(
          /'/g,
          "",
        ),
        position: _normalizeLookupText_((r && r.position) || ""),
        status: _normalizeLookupText_((r && r.status) || ""),
        source: _normalizeLookupText_(source || ""),
      };
    })
    .filter(function (x) {
      return (
        !!x.name &&
        (!x.status ||
          x.status === "ดำรงตำแหน่ง" ||
          x.status === "ใช้งาน" ||
          x.status.toLowerCase() === "active")
      );
    });
}
function _distinctLookupRowsByName_(rows) {
  var map = {};
  return (
    (_c30A_(rows) ? rows : []).forEach(function (x) {
      var key = _normalizeLookupQuery_((x = x || {}).name);
      if (key) {
        if (!map[key])
          return (
            (map[key] = {
              name: _normalizeLookupText_(x.name),
              phone: _normalizeLookupText_(x.phone),
              position: _normalizeLookupText_(x.position),
              source: _normalizeLookupText_(x.source),
            }),
            void 0
          );
        (!map[key].phone &&
          x.phone &&
          (map[key].phone = _normalizeLookupText_(x.phone)),
          !map[key].position &&
            x.position &&
            (map[key].position = _normalizeLookupText_(x.position)),
          !map[key].source &&
            x.source &&
            (map[key].source = _normalizeLookupText_(x.source)));
      }
    }),
    Object.keys(map)
      .map(function (key) {
        return map[key];
      })
      .sort(function (a, b) {
        return _s_(a.name).localeCompare(_s_(b.name), "th");
      })
  );
}
function _filterLookupRows_(rows, query, limit) {
  var q = _normalizeLookupQuery_(query),
    out = _c30A_(rows) ? rows.slice() : [];
  return (
    q &&
      (out = out.filter(function (x) {
        return (
          _normalizeLookupQuery_(x.name).indexOf(q) !== -1 ||
          _normalizeLookupQuery_(x.phone).indexOf(q) !== -1 ||
          _normalizeLookupQuery_(x.position).indexOf(q) !== -1 ||
          _normalizeLookupQuery_(x.source).indexOf(q) !== -1
        );
      })),
    out.slice(0, Math.max(1, Number(limit || 120) || 120))
  );
}
function _meetingLookupBundleCacheKey_(category) {
  var cacheTokens = [
    _appIsFnName_("_entityCacheStamp_")
      ? _entityCacheStamp_("petitioners")
      : "na",
    _appIsFnName_("_entityCacheStamp_")
      ? _entityCacheStamp_("personnel_comm")
      : "na",
    _appIsFnName_("_entityCacheStamp_")
      ? _entityCacheStamp_("personnel_staff")
      : "na",
    _appIsFnName_("_entityCacheStamp_")
      ? _entityCacheStamp_("personnel_op")
      : "na",
    _appIsFnName_("_entityCacheStamp_")
      ? _entityCacheStamp_("subcommittees")
      : "na",
  ].join("_");
  return (
    "meeting_lookup_bundle_current_" +
    _normalizeLookupText_(category || "all") +
    "_" +
    cacheTokens
  );
}
function _getMeetingLookupBundle_(category) {
  var cache = _AppScriptCache_(),
    cacheKey = _meetingLookupBundleCacheKey_(category);
  try {
    var cached = cache.get(cacheKey);
    if (cached) return JSON.parse(cached);
  } catch (_cacheReadErr) {
    _recordWarning_("ec", _cacheReadErr);
  }
  var petitioners = _distinctLookupRowsByName_(
      _Domain_getPetitioners().map(function (x) {
        return {
          name: _normalizeLookupText_(x && x.name),
          phone: _normalizeLookupText_(x && x.phone),
          position: "",
          source: "petitioners",
        };
      }),
    ),
    comms = _distinctLookupRowsByName_(
      _activeLookupNameRows_(_Domain_getPersonnelComms(), "comms"),
    ),
    staffs = _distinctLookupRowsByName_(
      _activeLookupNameRows_(_Domain_getPersonnelStaffs(), "staffs"),
    ),
    ops = _distinctLookupRowsByName_(
      _activeLookupNameRows_(_Domain_getPersonnelOps(), "ops"),
    ),
    subcommittees = _distinctLookupRowsByName_(
      _caseDomainSharedRows_("Subcommittees", [], { includeDeleted: !1 })
        .map(function (x) {
          return {
            name: _normalizeLookupText_(x && x.name),
            phone: "",
            position: "subcommittee",
            source: "subcommittees",
          };
        })
        .filter(function (x) {
          return x.name;
        }),
    ),
    proposer,
    bundle = {
      petitioners,
      proposer:
        _s_(category).trim() === "กรรมาธิการเสนอญัตติ" ? comms : petitioners,
      assignees: comms,
      coAssignees: staffs,
      staffs: ops,
      opStaff: ops,
      subcommittees,
      bundles: { petitioners, comms, staffs, ops, subcommittees },
    };
  try {
    safeCachePut_(cache, cacheKey, bundle, _LOOKUP_BUNDLE_CACHE_TTL_);
  } catch (_cacheWriteErr) {
    _recordWarning_("ec", _cacheWriteErr);
  }
  return bundle;
}
function _Domain_getMeetingLookupOptions(payload) {
  var category = _normalizeLookupText_(
      (payload = payload || {}).category || payload.cat,
    ),
    query = _normalizeLookupText_(payload.query || payload.q),
    limit = Math.max(20, Math.min(Number(payload.limit || 120) || 120, 300)),
    result = getLookupBundle_("meeting", query, category, limit);
  return (
    (result.meta = {
      category,
      query: _normalizeLookupQuery_(query),
      limit,
      generatedAt: new Date().toISOString(),
      cacheTtlSec: _LOOKUP_BUNDLE_CACHE_TTL_,
    }),
    Object.keys(result).forEach(function (key) {
      _c30A_(result[key]) && (result[key] = result[key].slice(0, limit));
    }),
    result
  );
}
var THAILAND_LOCATION_SHEET_NAME_ = "ThailandLocations",
  THAILAND_LOCATION_INDEX_ = null;
function _getThailandLocationFlatRows_() {
  var cacheKey =
      "th_loc_flat_current|" + _entityCacheStamp_("thailandlocations"),
    cache = _AppScriptCache_();
  try {
    var cached = cache.get(cacheKey);
    if (cached) return JSON.parse(cached);
  } catch (_cacheReadErr) {
    _recordWarning_("ec", _cacheReadErr);
  }
  var sh = getSheet_(THAILAND_LOCATION_SHEET_NAME_),
    data = getSheetMatrix_(sh, 4),
    rows = [];
  if (data.length > 1)
    for (
      var headerMap = _headerMap_(
          (data[0] || []).map(function (v) {
            return _s_(v).trim();
          }),
        ),
        cProvince = headerMap.province,
        cDistrict = headerMap.district,
        cSubDistrict =
          headerMap.subDistrict > -1
            ? headerMap.subDistrict
            : headerMap.subdistrict,
        cZip = headerMap.zip > -1 ? headerMap.zip : headerMap.postalCode,
        i = 1;
      i < data.length;
      i++
    ) {
      var province = String(cProvince > -1 ? data[i][cProvince] : "").trim(),
        district = String(cDistrict > -1 ? data[i][cDistrict] : "").trim(),
        subDistrict = String(
          cSubDistrict > -1 ? data[i][cSubDistrict] : "",
        ).trim(),
        zip = String(cZip > -1 ? data[i][cZip] : "").trim();
      province &&
        district &&
        subDistrict &&
        rows.push({ province, district, subDistrict, zip });
    }
  try {
    safeCachePut_(cache, cacheKey, rows, 21600);
  } catch (_cacheWriteErr) {
    _recordWarning_("ec", _cacheWriteErr);
  }
  return rows;
}
function _thailandLocationTree_() {
  var rows = _getThailandLocationFlatRows_();
  if (!rows.length) return [];
  var provinceMap = {};
  return (
    rows.forEach(function (row) {
      var province = provinceMap[row.province];
      province ||
        (province = provinceMap[row.province] =
          { name: row.province, districts: [] });
      for (var district = null, i = 0; i < province.districts.length; i++)
        if (_s_(province.districts[i].name) === row.district) {
          district = province.districts[i];
          break;
        }
      (district ||
        ((district = { name: row.district, subDistricts: [] }),
        province.districts.push(district)),
        district.subDistricts.push({ name: row.subDistrict, zip: row.zip }));
    }),
    Object.keys(provinceMap).map(function (key) {
      return provinceMap[key];
    })
  );
}
function _buildThailandLocationIndex_() {
  if (THAILAND_LOCATION_INDEX_) return THAILAND_LOCATION_INDEX_;
  var tree = _thailandLocationTree_(),
    index = {
      provinces: {},
      districts: {},
      subDistricts: {},
      postalCodeMap: {},
    };
  return (
    (_c30A_(tree) ? tree : []).forEach(function (province) {
      var provinceName = _s_(province && province.name).trim();
      provinceName &&
        ((index.provinces[provinceName] = province),
        (_c30A_(province && province.districts)
          ? province.districts
          : []
        ).forEach(function (district) {
          var districtName = _s_(district && district.name).trim();
          if (districtName) {
            var districtKey = provinceName + "|" + districtName;
            ((index.districts[districtKey] = district),
              (_c30A_(district && district.subDistricts)
                ? district.subDistricts
                : []
              ).forEach(function (subDistrict) {
                var subName = _s_(subDistrict && subDistrict.name).trim();
                if (subName) {
                  var subKey = districtKey + "|" + subName;
                  ((index.subDistricts[subKey] = subDistrict),
                    (index.postalCodeMap[subKey] = _s_(
                      subDistrict && subDistrict.zip,
                    ).trim()));
                }
              }));
          }
        }));
    }),
    (THAILAND_LOCATION_INDEX_ = index),
    index
  );
}
function _thailandLocationRowsFromIndex_(payload) {
  payload = payload || {};
  var province = _s_(payload.province).trim(),
    district = _s_(payload.district).trim(),
    subDistrict = _s_(payload.subDistrict || payload.subdistrict).trim(),
    index = _buildThailandLocationIndex_();
  if (province && !district && !subDistrict && index.provinces[province])
    return [index.provinces[province]];
  if (province && district && !subDistrict) {
    var districtKey = province + "|" + district;
    if (index.districts[districtKey])
      return [{ name: province, districts: [index.districts[districtKey]] }];
  }
  if (province && district && subDistrict) {
    var subKey = province + "|" + district + "|" + subDistrict;
    if (index.subDistricts[subKey])
      return [
        {
          name: province,
          districts: [
            { name: district, subDistricts: [index.subDistricts[subKey]] },
          ],
        },
      ];
  }
  return null;
}
function _thailandLocationCacheKey_(payload) {
  return (
    (payload = payload || {}),
    "th_loc_current|" +
      [
        _s_(payload.province),
        _s_(payload.district),
        _s_(payload.subDistrict || payload.subdistrict),
        _s_(payload.query || payload.q),
        payload.summaryOnly ? "1" : "0",
        _entityCacheStamp_("thailandlocations"),
      ].join("|")
  );
}
function _thailandLocationSummary_(rows) {
  return (rows = _c30A_(rows) ? rows : []).map(function (p) {
    var districts = _c30A_(p && p.districts) ? p.districts : [],
      subDistrictCount = districts.reduce(function (total, district) {
        return (
          total +
          (_c30A_(district && district.subDistricts)
            ? district.subDistricts.length
            : 0)
        );
      }, 0);
    return {
      name: _s_(p && p.name),
      districtCount: districts.length,
      subDistrictCount,
    };
  });
}
function _thailandLocationFilter_(payload) {
  payload = payload || {};
  var province = _s_(payload.province).trim(),
    district = _s_(payload.district).trim(),
    subDistrict = _s_(payload.subDistrict || payload.subdistrict).trim(),
    query = _s_(payload.query || payload.q)
      .trim()
      .toLowerCase(),
    rows = _thailandLocationRowsFromIndex_(payload) || _thailandLocationTree_();
  return (
    province &&
      (rows = rows.filter(function (p) {
        return _s_(p && p.name) === province;
      })),
    district &&
      (rows = rows
        .map(function (p) {
          var districts = (_c30A_(p && p.districts) ? p.districts : []).filter(
            function (d) {
              return _s_(d && d.name) === district;
            },
          );
          return { name: _s_(p && p.name), districts };
        })
        .filter(function (p) {
          return p.districts.length;
        })),
    subDistrict &&
      (rows = rows
        .map(function (p) {
          var districts = (_c30A_(p && p.districts) ? p.districts : [])
            .map(function (d) {
              var subs = (
                _c30A_(d && d.subDistricts) ? d.subDistricts : []
              ).filter(function (s) {
                return _s_(s && s.name) === subDistrict;
              });
              return { name: _s_(d && d.name), subDistricts: subs };
            })
            .filter(function (d) {
              return d.subDistricts.length;
            });
          return { name: _s_(p && p.name), districts };
        })
        .filter(function (p) {
          return p.districts.length;
        })),
    query &&
      (rows = rows
        .map(function (p) {
          var provinceName = _s_(p && p.name),
            districts = (_c30A_(p && p.districts) ? p.districts : [])
              .map(function (d) {
                var districtName = _s_(d && d.name),
                  subs = (
                    _c30A_(d && d.subDistricts) ? d.subDistricts : []
                  ).filter(function (s) {
                    return (
                      [
                        provinceName,
                        districtName,
                        _s_(s && s.name),
                        _s_(s && s.zip),
                      ]
                        .join(" ")
                        .toLowerCase()
                        .indexOf(query) !== -1
                    );
                  });
                return (
                  districtName.toLowerCase().indexOf(query) === -1 ||
                    subs.length ||
                    (subs = _c30A_(d && d.subDistricts) ? d.subDistricts : []),
                  { name: districtName, subDistricts: subs }
                );
              })
              .filter(function (d) {
                return (
                  d.subDistricts.length ||
                  d.name.toLowerCase().indexOf(query) !== -1
                );
              });
          return (
            provinceName.toLowerCase().indexOf(query) === -1 ||
              districts.length ||
              (districts = _c30A_(p && p.districts) ? p.districts : []),
            { name: provinceName, districts }
          );
        })
        .filter(function (p) {
          return (
            p.districts.length || p.name.toLowerCase().indexOf(query) !== -1
          );
        })),
    rows
  );
}
function _Domain_getThailandLocations(payload) {
  payload = payload || {};
  var cache = _AppScriptCache_(),
    cacheKey = _thailandLocationCacheKey_(payload);
  try {
    var cached = cache.get(cacheKey);
    if (cached) return ok_(JSON.parse(cached), "โหลดข้อมูลจังหวัด/อำเภอสำเร็จ");
  } catch (_cacheReadErr) {
    _recordWarning_("ec", _cacheReadErr);
  }
  var rows = _thailandLocationFilter_(payload),
    summaryOnly = !!payload.summaryOnly,
    province = _s_(payload.province).trim(),
    result;
  result = summaryOnly
    ? {
        provinces: _thailandLocationSummary_(rows),
        totalProvinces: rows.length,
      }
    : {
        rows,
        provinces: rows,
        totalProvinces: rows.length,
        province: province || "",
        districtOptions:
          rows[0] && _c30A_(rows[0].districts)
            ? rows[0].districts.map(function (d) {
                return _s_(d && d.name);
              })
            : [],
        subDistrictOptions:
          rows[0] &&
          rows[0].districts &&
          rows[0].districts[0] &&
          _c30A_(rows[0].districts[0].subDistricts)
            ? rows[0].districts[0].subDistricts.map(function (s) {
                return { name: _s_(s && s.name), zip: _s_(s && s.zip) };
              })
            : [],
      };
  try {
    safeCachePut_(cache, cacheKey, result, 1800);
  } catch (_cacheWriteErr) {
    _recordWarning_("ec", _cacheWriteErr);
  }
  return ok_(
    result,
    province && !rows.length
      ? "ไม่พบข้อมูลจังหวัด"
      : "โหลดข้อมูลจังหวัด/อำเภอสำเร็จ",
  );
}
function _normalizeSearchText_(value) {
  return _c30S_(value).toLowerCase().replace(/\s+/g, " ").trim();
}
function _caseSearchPickReceiveAlias_(row, keys) {
  ((row = row || {}), (keys = _c30A_(keys) ? keys : []));
  for (var i = 0; i < keys.length; i++) {
    var key,
      value = row[keys[i]];
    if (
      value != null &&
      String(value).trim() !== "" &&
      !_caseLooksLikeInternalId_(value)
    )
      return value;
  }
  return "";
}
function _caseSearchCleanReceiveCandidate_(value) {
  return _caseManualReceiveNoText_(value);
}
function _caseSearchReceiveAliasKeys_() {
  return [
    "recNo",
    "receiveNo",
    "receivedNo",
    "receive_no",
    "caseReceiveNo",
    "caseRecNo",
    "receiptNo",
    "receiveNumber",
    "registrationNo",
    "registrationNumber",
    "receiveRegistrationNo",
    "receiveCode",
    "receiveBookNo",
    "bookReceiveNo",
    "petitionReceiveNo",
    "complaintReceiveNo",
    "documentReceiveNo",
    "canonicalReceiveNo",
    "receiveNoDisplay",
    "displayReceiveNo",
    "เลขรับเรื่อง",
    "เลขที่รับเรื่อง",
    "รับเรื่องเลขที่",
    "เลขรับเรื่องพิจารณา",
    "เลขรับที่",
    "เลขรับคำร้อง",
    "เลขรับหนังสือ",
    "เลขทะเบียนรับ",
    "ทะเบียนรับ",
    "ทะเบียนหนังสือรับ",
    "เลขหนังสือรับ",
    "รับเลขที่",
    "รับที่",
    "เลขรับ",
  ];
}
function _caseSearchReceiveNoCandidateFromAnyKey_(row) {
  row = row || {};
  var best = "";
  return (
    Object.keys(row).forEach(function (key) {
      if (!best || !/^\d+\s*[\/\-–—]\s*25\d{2}$/.test(best)) {
        var normalizedKey = _s_(key)
            .replace(/[\s_\-–—()（）\[\]{}:：/\.]+/g, "")
            .toLowerCase(),
          isReceiveKey;
        if (
          (normalizedKey === "recno" ||
            normalizedKey.indexOf("receive") !== -1 ||
            normalizedKey.indexOf("receipt") !== -1 ||
            normalizedKey.indexOf("registration") !== -1 ||
            String(key).indexOf("เลขรับ") !== -1 ||
            String(key).indexOf("ทะเบียนรับ") !== -1 ||
            String(key).indexOf("รับเลข") !== -1) &&
          !/date|วันที่|วันรับ|receiveddate|receivedat/i.test(normalizedKey)
        ) {
          var candidate = _caseSearchCleanReceiveCandidate_(row[key]);
          candidate &&
            (!best ||
              /^\d+\s*[\/\-–—]\s*25\d{2}$/.test(candidate) ||
              (/^\d+$/.test(candidate) && !/^\d+$/.test(best))) &&
            (best = candidate);
        }
      }
    }),
    best
  );
}
function _caseSearchReceiveNoText_(row) {
  var recRaw = _caseSearchCleanReceiveCandidate_((row = row || {}).recNo),
    aliasRaw = "",
    raw;
  return (
    recRaw ||
      (aliasRaw = _caseSearchCleanReceiveCandidate_(
        _caseSearchPickReceiveAlias_(row, _caseSearchReceiveAliasKeys_()),
      )),
    _caseManualReceiveNoText_(
      recRaw || aliasRaw || _caseSearchReceiveNoCandidateFromAnyKey_(row),
    )
  );
}
function _caseSearchReceiveDateAliasKeys_() {
  return [
    "MainData.recDate",
    "MainData/recDate",
    "MainData_recDate",
    "mainData.recDate",
    "mainData/recDate",
    "mainData_recDate",
    "recDate",
    "rec_date",
    "rec date",
    "receiveDate",
    "receive_date",
    "receive date",
    "receiptDate",
    "receipt_date",
    "registrationDate",
    "registration_date",
    "caseReceiveDate",
    "caseRecDate",
    "petitionReceiveDate",
    "complaintReceiveDate",
    "documentReceiveDate",
    "receiveAt",
    "receivedAt",
    "receiveOn",
    "receivedOn",
    "recDateText",
    "receiveDateText",
    "receiveDateDisplay",
    "วันที่รับเรื่อง",
    "วันที่รับเรื่อง (พ.ศ.)",
    "วันที่รับเรื่อง(พ.ศ.)",
    "วันเดือนปีที่รับเรื่อง",
    "วันเดือนปีรับเรื่อง",
    "วันที่รับ",
    "วันรับเรื่อง",
    "วันรับ",
    "รับเรื่องวันที่",
    "วันที่ลงรับ",
    "วันที่ลงทะเบียนรับ",
    "วันที่รับคำร้อง",
    "วันที่รับหนังสือ",
    "วันเดือนปีที่รับ",
    "วันเดือนปีรับ",
    "รับวันที่",
    "วันที่รับเรื่องร้องเรียน",
    "วันรับคำร้อง",
    "วันรับหนังสือ",
  ];
}
function _caseSearchReceiveDateCandidateFromAnyKey_(source) {
  source = source || {};
  var best = "";
  return (
    Object.keys(source).forEach(function (key) {
      if (!best) {
        var rawKey = _s_(key),
          normalizedKey = _caseSearchFieldKey_(rawKey),
          thaiDateKey =
            rawKey.indexOf("วัน") !== -1 || rawKey.indexOf("วันที่") !== -1,
          thaiReceiveKey =
            rawKey.indexOf("รับ") !== -1 ||
            rawKey.indexOf("ลงรับ") !== -1 ||
            rawKey.indexOf("ทะเบียนรับ") !== -1,
          enReceiveDateKey =
            /^(maindata)?(recdate|receivedate|receiveddate|receiptdate|registrationdate|datereceived|datereceive|receivedat|receiveat|receivedon|receiveon|casereceivedate|caserecdate|petitionreceivedate|complaintreceivedate|documentreceivedate)$/i.test(
              normalizedKey,
            ),
          excluded;
        if (
          !(
            /offer|propose|submit|book|letter|due|deadline|extend|delete|deleted|update|updated|create|created|meeting|reply|response|closed|close|refund|report|status/i.test(
              normalizedKey,
            ) ||
            rawKey.indexOf("เสนอ") !== -1 ||
            (rawKey.indexOf("หนังสือ") !== -1 &&
              rawKey.indexOf("รับหนังสือ") === -1) ||
            rawKey.indexOf("ครบกำหนด") !== -1 ||
            rawKey.indexOf("ประชุม") !== -1 ||
            rawKey.indexOf("แก้ไข") !== -1 ||
            rawKey.indexOf("สร้าง") !== -1 ||
            rawKey.indexOf("ลบ") !== -1 ||
            rawKey.indexOf("สถานะ") !== -1
          ) &&
          (enReceiveDateKey || (thaiDateKey && thaiReceiveKey))
        ) {
          var text = _caseSearchReceiveDateText_(source[key]);
          text && (best = text);
        }
      }
    }),
    best
  );
}
function _caseSearchFieldKey_(value) {
  return _c30S_(value)
    .replace(/[\u00A0\u200B-\u200D\uFEFF]/g, "")
    .replace(/[\s\n\r\t\-–—_()（）\[\]{}:：\/\.]+/g, "")
    .toLowerCase();
}
function _caseSearchPickField_(source, keys) {
  ((source = source || {}), (keys = _c30A_(keys) ? keys : []));
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (
      _c30H_(source, key) &&
      source[key] !== void 0 &&
      source[key] !== null &&
      String(source[key]).trim() !== ""
    )
      return source[key];
  }
  var dict = {};
  Object.keys(source).forEach(function (key2) {
    var nk = _caseSearchFieldKey_(key2);
    nk && !_c30H_(dict, nk) && (dict[nk] = source[key2]);
  });
  for (var j = 0; j < keys.length; j++) {
    var nkey = _caseSearchFieldKey_(keys[j]);
    if (
      nkey &&
      dict[nkey] !== void 0 &&
      dict[nkey] !== null &&
      String(dict[nkey]).trim() !== ""
    )
      return dict[nkey];
  }
  return "";
}
function _caseSearchReceiveDateText_(value) {
  if (value == null) return "";
  var pad2 = _appIsFnName_("_appSharedPad2_")
    ? _appSharedPad2_
    : function (n) {
        return String(n).padStart(2, "0");
      };
  function cleanText(v) {
    return _c30S_(v)
      .replace(/^'+/, "")
      .replace(/[\u00A0\u200B-\u200D\uFEFF]/g, "")
      .trim();
  }
  function normalizeThaiYear(y) {
    return (
      (y = Number(_c30S_(y).replace(/[^0-9]/g, "")) || 0),
      y
        ? y >= 3600 && y <= 3700
          ? y - 1086
          : y >= 3e3 && y <= 3200
            ? y - 543
            : y < 2400
              ? y + 543
              : y
        : 0
    );
  }
  function validDayMonth(d2, m) {
    return (
      (d2 = Number(d2)),
      (m = Number(m)),
      d2 >= 1 && d2 <= 31 && m >= 1 && m <= 12
    );
  }
  function safeDateText(day, month, year) {
    return validDayMonth(day, month)
      ? ((year = normalizeThaiYear(year)),
        year
          ? pad2(Number(day)) + "/" + pad2(Number(month)) + "/" + String(year)
          : "")
      : "";
  }
  function formatDateObject(d2) {
    if (!d2 || isNaN(d2.getTime())) return "";
    var tz =
      (typeof Session != "undefined" &&
        Session.getScriptTimeZone &&
        Session.getScriptTimeZone()) ||
      "Asia/Bangkok";
    try {
      if (typeof Utilities != "undefined" && Utilities.formatDate)
        return safeDateText(
          Utilities.formatDate(d2, tz, "dd"),
          Utilities.formatDate(d2, tz, "MM"),
          Utilities.formatDate(d2, tz, "yyyy"),
        );
    } catch (_fmtErr) {
      _appIgnore_(_fmtErr, "c6.C30:2134");
    }
    return safeDateText(d2.getDate(), d2.getMonth() + 1, d2.getFullYear());
  }
  function rejectNonDateText(text) {
    return (
      !text ||
      text === "-" ||
      text === "/" ||
      /^CASE[_-]/i.test(text) ||
      /^MAIN-\d+/i.test(text) ||
      /^ROW-\d+/i.test(text) ||
      /^\d+\s*\/\s*25\d{2}$/.test(text)
    );
  }
  if (
    Object.prototype.toString.call(value) === "[object Date]" &&
    !isNaN(value.getTime())
  )
    return formatDateObject(value);
  if (typeof value == "number" && isFinite(value) && value > 2e4 && value < 9e4)
    return formatDateObject(new Date(Math.round(864e5 * (value - 25569))));
  var raw = cleanText(value);
  if (rejectNonDateText(raw)) return "";
  var dmy = raw.match(
    /^(\d{1,2})[\/\-.](\d{1,2})[\/\-.]((?:19|20|25|30|31|36)\d{2})$/,
  );
  if (dmy) return safeDateText(dmy[1], dmy[2], dmy[3]);
  var iso = raw.match(
    /^((?:19|20|25|30|31|36)\d{2})[-\/](\d{1,2})[-\/](\d{1,2})(?:[T\s].*)?$/,
  );
  if (iso) return safeDateText(iso[3], iso[2], iso[1]);
  if (/GMT|T\d{2}:\d{2}:\d{2}/i.test(raw)) {
    var d = new Date(raw);
    if (!isNaN(d.getTime())) return formatDateObject(d);
  }
  if (_appIsFnName_("_appThaiDateText_"))
    try {
      var converted = cleanText(_appThaiDateText_(raw)),
        parts = converted.match(
          /^(\d{1,2})\/(\d{1,2})\/((?:19|20|25|30|31|36)\d{2})$/,
        );
      if (parts) return safeDateText(parts[1], parts[2], parts[3]);
    } catch (_err) {
      _appIgnore_(_err, "c6.C30:2158");
    }
  return "";
}
function _caseSearchMainDataObject_(row) {
  var raw =
    (row = row || {}).raw && typeof row.raw == "object"
      ? row.raw
      : row.__raw && typeof row.__raw == "object"
        ? row.__raw
        : {};
  return row.MainData &&
    typeof row.MainData == "object" &&
    !_c30A_(row.MainData)
    ? row.MainData
    : row.mainData && typeof row.mainData == "object" && !_c30A_(row.mainData)
      ? row.mainData
      : row.MainData && typeof row.MainData == "object" && !_c30A_(row.MainData)
        ? row.MainData
        : row.mainData &&
            typeof row.mainData == "object" &&
            !_c30A_(row.mainData)
          ? row.mainData
          : raw.MainData &&
              typeof raw.MainData == "object" &&
              !_c30A_(raw.MainData)
            ? raw.MainData
            : raw.mainData &&
                typeof raw.mainData == "object" &&
                !_c30A_(raw.mainData)
              ? raw.mainData
              : {};
}
/* R146: title/petitioner relation-key helpers removed; relation identity is sequence/caseId only. */
function _caseSearchIdentityKeysForMainDataRecDate_(row) {
  row = row || {};
  var keys = [],
    seen = {};
  function addCaseIdentityKey_(prefix, value) {
    var key = (value = _c30S_(value).replace(/^'+/, "").trim())
      ? prefix + ":" + value
      : "";
    return (key && !seen[key] && ((seen[key] = 1), keys.push(key)), value);
  }
  function firstValue(list) {
    return _caseSearchPickField_(row, list) || "";
  }
  var caseId = addCaseIdentityKey_(
      "caseId",
      firstValue(["caseId", "id", "uid", "rowId", "_id"]),
    ),
    caseNum = addCaseIdentityKey_(
      "caseNum",
      firstValue(["caseNum", "caseNo", "runningNo", "ลำดับเรื่อง"]),
    ),
    recNo = addCaseIdentityKey_(
      "recNo",
      firstValue(["recNo", "receiveNo", "เลขรับเรื่อง"]),
    );
  if (caseNum && recNo) {
    var pair = "caseNumRecNo:" + caseNum + "|" + recNo;
    seen[pair] || ((seen[pair] = 1), keys.push(pair));
  }
  return keys;
}
function _caseSearchMainDataRecDateIndex_() {
  var cacheNs = "MainData.recDate.owner",
    cached = _appIsFnName_("_requestScopeGet_")
      ? _requestScopeGet_("caseSearchMainDataRecDateIndex", cacheNs)
      : null;
  if (cached && typeof cached == "object") return cached;
  var map = {};
  function addKey(prefix, value, text) {
    return (
      (value = _c30S_(value).replace(/^'+/, "").trim()) &&
        text &&
        !map[prefix + ":" + value] &&
        (map[prefix + ":" + value] = text),
      value
    );
  }
  function addDirectKey(key, text) {
    key && text && !map[key] && (map[key] = text);
  }
  try {
    var fields = [
        "caseId",
        "id",
        "uid",
        "rowId",
        "_id",
        "caseNum",
        "caseNo",
        "runningNo",
        "ลำดับเรื่อง",
        "recNo",
        "receiveNo",
        "เลขรับเรื่อง",
        "isDeleted",
      ].concat(_caseSearchReceiveDateAliasKeys_()),
      rows =
        typeof readSheetProjectedObjectsCached_ == "function"
          ? readSheetProjectedObjectsCached_("MainData", fields, {
              includeDeleted: !1,
              requireCanonical: !1,
              ttl: 180,
              batchSize: 500,
            })
          : [];
    (_c30A_(rows) ? rows : []).forEach(function (row) {
      var text =
        _caseSearchReceiveDateText_(
          _caseSearchPickField_(
            (row = row || {}),
            _caseSearchReceiveDateAliasKeys_(),
          ),
        ) || _caseSearchReceiveDateCandidateFromAnyKey_(row);
      if (text) {
        var dateIndexCaseId = addKey(
            "caseId",
            _caseSearchPickField_(row, ["caseId", "id", "uid", "rowId", "_id"]),
            text,
          ),
          dateIndexCaseNum = addKey(
            "caseNum",
            _caseSearchPickField_(row, [
              "caseNum",
              "caseNo",
              "runningNo",
              "ลำดับเรื่อง",
            ]),
            text,
          ),
          dateIndexRecNo = addKey(
            "recNo",
            _caseSearchPickField_(row, ["recNo", "receiveNo", "เลขรับเรื่อง"]),
            text,
          );
        dateIndexCaseNum &&
          dateIndexRecNo &&
          addDirectKey(
            "caseNumRecNo:" + dateIndexCaseNum + "|" + dateIndexRecNo,
            text,
          );
        /* r146: receive-date lookup intentionally excludes title/petitioner keys. */
      }
    });
  } catch (e) {
    _c30W_("case.search.maindata.recDate.index.owner", e);
  }
  return (
    _appIsFnName_("_requestScopePut_") &&
      _requestScopePut_("caseSearchMainDataRecDateIndex", cacheNs, map),
    map
  );
}
function _caseSearchReceiveDateValueFromRow_(row) {
  row = row || {};
  var keys = _caseSearchReceiveDateAliasKeys_();
  function read(source) {
    var value2 = _caseSearchPickField_((source = source || {}), keys);
    return value2 !== "" && value2 != null
      ? value2
      : _caseSearchReceiveDateCandidateFromAnyKey_(source);
  }
  var rawObj =
      row.raw && typeof row.raw == "object"
        ? row.raw
        : row.__raw && typeof row.__raw == "object"
          ? row.__raw
          : {},
    value = read(row),
    main,
    data;
  if (
    (value !== "" && _caseSearchReceiveDateText_(value)) ||
    ((value = read(rawObj)) !== "" && _caseSearchReceiveDateText_(value)) ||
    ((value = read(_caseSearchMainDataObject_(row))) !== "" &&
      _caseSearchReceiveDateText_(value)) ||
    ((value = read(
      row.data && typeof row.data == "object" && !_c30A_(row.data)
        ? row.data
        : {},
    )) !== "" &&
      _caseSearchReceiveDateText_(value))
  )
    return value;
  for (
    var idx = _caseSearchMainDataRecDateIndex_(),
      identityKeys = _caseSearchIdentityKeysForMainDataRecDate_(row),
      i = 0;
    i < identityKeys.length;
    i++
  )
    if (idx && idx[identityKeys[i]]) return idx[identityKeys[i]];
  return "";
}
function _caseSearchReceiveDateTextFromRow_(row) {
  return _caseSearchReceiveDateText_(
    _caseSearchReceiveDateValueFromRow_(row || {}),
  );
}
function _caseSearchEnsureReceiveNo_(row) {
  row = row || {};
  var out = _c30O_({}, row),
    receiveNo = _caseSearchReceiveNoText_(out),
    receiveDateText = _caseSearchReceiveDateTextFromRow_(out),
    caseNum = _caseManualNumericText_(_casePick_(out, _C30K_CASE_NUM_) || ""),
    title = String(_casePick_(out, _C30K_TITLE_) || "").trim(),
    consideration = String(
      _casePick_(out, [
        "considerationTitle",
        "caseConsiderationTitle",
        "caseTitle",
        "ชื่อเรื่องพิจารณา (ถ้ามี)",
        "ชื่อเรื่องพิจารณา",
        "เรื่องพิจารณา",
      ]) || "",
    ).trim(),
    petitioners = String(
      _casePick_(out, [
        "petitioners",
        "petitionerName",
        "petitioner",
        "requester",
        "complainant",
        "proposer",
        "motionProposer",
        "ผู้เสนอญัตติ/ผู้ร้อง",
        "ผู้เสนอญัตติ",
        "ผู้ร้อง",
      ]) || "",
    ).trim(),
    respondent = String(_casePick_(out, _C30K_RESPONDENT_SPACED_) || "").trim();
  return (
    caseNum
      ? _stampCaseSequenceIdentity_(out, caseNum)
      : ((out.caseNum = ""),
        (out.caseNo = ""),
        (out.runningNo = ""),
        (out.ลำดับเรื่อง = "")),
    receiveNo
      ? ((out.receiveNo = receiveNo),
        (out.recNo = receiveNo),
        (out.receiveNoDisplay = receiveNo),
        (out.canonicalReceiveNo = receiveNo),
        (out.เลขรับเรื่อง = receiveNo))
      : ((out.receiveNo = ""),
        (out.recNo = ""),
        (out.receiveNoDisplay = ""),
        (out.canonicalReceiveNo = ""),
        (out.เลขรับเรื่อง = "")),
    receiveDateText
      ? ((out.recDate = receiveDateText),
        (out.receiveDate = receiveDateText),
        (out.recDateText = receiveDateText),
        (out.receiveDateText = receiveDateText),
        (out.วันที่รับเรื่อง = receiveDateText))
      : ((out.recDate = out.recDate || ""),
        (out.receiveDate = out.receiveDate || ""),
        (out.recDateText = out.recDateText || ""),
        (out.receiveDateText = out.receiveDateText || ""),
        (out.วันที่รับเรื่อง = out.วันที่รับเรื่อง || "")),
    title &&
      ((out.title = title),
      (out.subject = out.subject || title),
      (out.ชื่อเรื่อง = title)),
    consideration &&
      ((out.caseTitle = consideration),
      (out.considerationTitle = consideration),
      (out["ชื่อเรื่องพิจารณา (ถ้ามี)"] = consideration)),
    petitioners &&
      ((out.petitioners = petitioners),
      (out.petitionerName = out.petitionerName || petitioners),
      (out["ผู้เสนอญัตติ/ผู้ร้อง"] = petitioners)),
    respondent &&
      ((out.respondent = respondent),
      (out.agencyName = out.agencyName || respondent)),
    (out.type = "case"),
    (out.typeLabel = "เรื่องพิจารณา"),
    out
  );
}
function _caseSearchVisibleProjectedFieldsR146_() {
  return _caseFieldsWithSequence_([
    "caseId", "id",
    "recNo", "receiveNo", "เลขรับเรื่อง", "เลขที่รับเรื่อง",
    "recDate", "receiveDate", "recDateText", "receiveDateText", "วันที่รับเรื่อง",
    "title", "subject", "caseSubject", "ชื่อเรื่อง", "เรื่อง",
    "caseTitle", "considerationTitle", "caseConsiderationTitle",
    "ชื่อเรื่องพิจารณา (ถ้ามี)", "ชื่อเรื่องพิจารณา", "เรื่องพิจารณา",
    "petitioners", "petitionerName", "ผู้เสนอญัตติ/ผู้ร้อง", "ผู้เสนอญัตติ", "ผู้ร้อง",
    "respondent", "agencyName", "หน่วยงาน/ผู้ถูกร้อง", "ผู้ถูกร้อง", "หน่วยงาน",
    "status", "cat", "caseType", "subCat", "subCategory",
    "assignees", "owner", "staffs", "opStaff", "coAssignees",
    "pendingRemark", "pendingReason", "statusReason", "reason", "เหตุผล",
    "closedReason", "rejectionReason", "petitionerPhone", "sentAgency",
    "isDeleted", "deletedAt", "updatedAt"
  ]);
}
function _caseSearchCompactProjectedFields_() {
  return _caseSearchVisibleProjectedFieldsR146_();
}
function _caseSearchProjectedFields_() {
  return _caseUniqueFieldList_(
    _caseSearchVisibleProjectedFieldsR146_().concat([
      "offerDate", "bookDate", "letterDate", "dateProposed", "วันที่หนังสือ",
      "subcommittee", "committeeHistory", "subcommitteeHistory",
      "dueDate", "createdAt", "meetingStatus", "keySummary",
      "sendToAgency", "sentToAgency", "ส่งให้หน่วยงาน", "หน่วยงานที่เกี่ยวข้อง"
    ])
  );
}
function _caseReadMainDataRowsForSearch_(fields, opts) {
  opts = opts || {};
  var requested = _c30A_(fields) ? fields.slice() : [];
  function caseSearchPickCanonical_(row, keys) {
    return typeof AppBackendCore != "undefined" && AppBackendCore.pickNormalized
      ? AppBackendCore.pickNormalized(row, keys, "")
      : _casePick_(row, keys);
  }
  function _caseLooksLikeStatusDate_(value) {
    var s = _c30S_(value).trim();
    return (
      !!s &&
      (Object.prototype.toString.call(value) === "[object Date]" ||
        /^\d{1,2}[\/\-.]\d{1,2}[\/\-.](?:19|20|25)\d{2}$/.test(s) ||
        /^\d{4}[\/\-.]\d{1,2}[\/\-.]\d{1,2}/.test(s) ||
        /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s/i.test(s) ||
        /GMT|เวลาอินโดจีน|T\d{2}:\d{2}/i.test(s) ||
        /^\d{1,2}\s*(?:ม\.?ค\.?|ก\.?พ\.?|มี\.?ค\.?|เม\.?ย\.?|พ\.?ค\.?|มิ\.?ย\.?|ก\.?ค\.?|ส\.?ค\.?|ก\.?ย\.?|ต\.?ค\.?|พ\.?ย\.?|ธ\.?ค\.?|มกราคม|กุมภาพันธ์|มีนาคม|เมษายน|พฤษภาคม|มิถุนายน|กรกฎาคม|สิงหาคม|กันยายน|ตุลาคม|พฤศจิกายน|ธันวาคม)\s*(?:19|20|25)\d{2}/i.test(
          s,
        ))
    );
  }
  function _caseCleanDisplayStatus_(value) {
    var v = _c30S_(value)
      .replace(/[\u00A0\u200B-\u200D\uFEFF]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    return !v || v === "-" || _caseLooksLikeStatusDate_(v)
      ? ""
      : typeof AppBackendCore != "undefined" &&
          AppBackendCore &&
          typeof AppBackendCore.normalizeCaseStatus == "function"
        ? AppBackendCore.normalizeCaseStatus(v, {
            defaultStatus: "เรื่องเข้าใหม่",
          })
        : _caseNormalizeStatusForDisplay_(v);
  }
  function _caseStatusObject_(value) {
    if (value && typeof value == "object" && !_c30A_(value)) return value;
    if (typeof value == "string") {
      var s = value.trim();
      if (
        (s.charAt(0) === "{" && s.charAt(s.length - 1) === "}") ||
        (s.charAt(0) === "[" && s.charAt(s.length - 1) === "]")
      )
        try {
          var parsed = JSON.parse(s);
          return parsed && typeof parsed == "object" && !_c30A_(parsed)
            ? parsed
            : {};
        } catch (e) {
          _c30W_("ec", e);
        }
    }
    return {};
  }
  function _caseStatusKey_(key) {
    return _c30S_(key)
      .replace(/[\u00A0\u200B-\u200D\uFEFF]/g, "")
      .replace(/[\s_.-]+/g, "")
      .replace(/[\\/]+/g, "/")
      .toLowerCase();
  }
  function _casePickStatusValue_(source, keys) {
    source = _caseStatusObject_(source);
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      if (_c30H_(source, k)) {
        var v = _caseCleanDisplayStatus_(source[k]);
        if (v) return v;
      }
    }
    var dict = {};
    Object.keys(source).forEach(function (k2) {
      dict[_caseStatusKey_(k2)] = source[k2];
    });
    for (var j = 0; j < keys.length; j++) {
      var nk = _caseStatusKey_(keys[j]);
      if (_c30H_(dict, nk)) {
        var x = _caseCleanDisplayStatus_(dict[nk]);
        if (x) return x;
      }
    }
    return "";
  }
  function _caseMainDataStatusValue_(row) {
    var raw = _caseStatusObject_((row = row || {}).raw || row.__raw || {}),
      main = _caseStatusObject_(
        row.MainData || row.mainData || raw.MainData || raw.mainData,
      ),
      flat = [
        "MainData/status",
        "MainData.status",
        "MainData_status",
        "mainData/status",
        "mainData.status",
        "mainData_status",
        "Main Data/status",
        "Main Data.status",
      ],
      mainKeys = [
        "status",
        "สถานะ",
        "สถานะเรื่อง",
        "สถานะปัจจุบัน",
        "ผลการพิจารณา",
        "สถานะการพิจารณา",
        "สถานะพิจารณา",
        "สถานะเรื่องพิจารณา",
      ],
      direct =
        _casePickStatusValue_(row, flat) ||
        _casePickStatusValue_(raw, flat) ||
        _casePickStatusValue_(main, mainKeys) ||
        _casePickStatusValue_(
          _caseStatusObject_(raw.MainData || raw.mainData),
          mainKeys,
        );
    if (direct) return direct;
    var normal =
      _casePickStatusValue_(row, ["status", "สถานะ"]) ||
      _casePickStatusValue_(raw, ["status", "สถานะ"]);
    if (normal) return normal;
    var statusKeys = [
      "สถานะปัจจุบัน",
      "ผลการพิจารณา",
      "สถานะการพิจารณา",
      "สถานะเรื่องพิจารณา",
      "สถานะเรื่อง",
      "caseStatus",
      "processStatus",
      "currentStatus",
      "statusText",
      "caseState",
      "workflowStatus",
      "meetingStatus",
      "resultStatus",
    ];
    return (
      _casePickStatusValue_(row, statusKeys) ||
      _casePickStatusValue_(raw, statusKeys) ||
      ""
    );
  }
  function canonical(row, index) {
    var caseNum = _caseManualNumericText_(
        caseSearchPickCanonical_((row = row || {}), _C30K_CASE_NUM_) || "",
      ),
      recNo = _caseManualReceiveNoText_(
        caseSearchPickCanonical_(row, [
          "recNo",
          "receiveNo",
          "receivedNo",
          "caseReceiveNo",
          "caseRecNo",
          "receiptNo",
          "receiveNumber",
          "registrationNo",
          "registrationNumber",
          "receiveRegistrationNo",
          "receiveCode",
          "receiveBookNo",
          "bookReceiveNo",
          "petitionReceiveNo",
          "complaintReceiveNo",
          "documentReceiveNo",
          "เลขรับเรื่อง",
          "เลขที่รับเรื่อง",
          "รับเรื่องเลขที่",
          "เลขรับเรื่องพิจารณา",
          "เลขรับที่",
          "เลขรับคำร้อง",
          "เลขรับหนังสือ",
          "เลขทะเบียนรับ",
          "ทะเบียนรับ",
          "ทะเบียนหนังสือรับ",
          "เลขหนังสือรับ",
          "รับเลขที่",
          "รับที่",
          "เลขรับ",
        ]) || "",
      ),
      title = String(
        caseSearchPickCanonical_(row, [
          "title",
          "subject",
          "caseSubject",
          "ชื่อเรื่อง",
          "เรื่อง",
          "เรื่องร้องเรียน",
        ]) || "",
      ).trim(),
      caseTitle = String(
        caseSearchPickCanonical_(row, _C30K_CASE_TITLE_) || "",
      ).trim();
    (!title && caseTitle && (title = caseTitle),
      !caseTitle && title && (caseTitle = title));
    var petitioners = String(
        caseSearchPickCanonical_(row, [
          "petitioners",
          "petitionerName",
          "petitioner",
          "requester",
          "complainant",
          "proposer",
          "motionProposer",
          "ผู้เสนอญัตติ/ผู้ร้อง",
          "ผู้เสนอญัตติ",
          "ผู้ร้อง",
          "ผู้เสนอ",
        ]) || "",
      ).trim(),
      respondent = String(
        caseSearchPickCanonical_(row, _C30K_RESPONDENT_SPACED_) || "",
      ).trim(),
      sentAgency = String(
        caseSearchPickCanonical_(row, _C30K_SENT_AGENCY_) || "",
      ).trim(),
      status = _caseMainDataStatusValue_(row),
      statusForReason = _caseNormalizeStatusForDisplay_(
        String(status || "เรื่องเข้าใหม่").trim(),
      ),
      offerDate = String(
        caseSearchPickCanonical_(row, _C30K_OFFER_DATE_) || "",
      ).trim(),
      rawPendingReason = String(
        caseSearchPickCanonical_(row, _C30K_PENDING_REASON_) || "",
      ).trim(),
      rawClosedReason = String(
        caseSearchPickCanonical_(row, _C30K_CLOSED_REASON_) || "",
      ).trim(),
      rawRejectionReason = String(
        caseSearchPickCanonical_(row, [
          "rejectionReason",
          "rejectReason",
          "notAcceptedReason",
          "notReceiveReason",
          "notAcceptReason",
          "caseRejectReason",
          "statusReason",
          "decisionReason",
          "reason",
          "เหตุผล",
          "เหตุผล (ไม่รับเรื่อง)",
          "เหตุผลไม่รับเรื่อง",
          "เหตุผลการไม่รับเรื่อง",
        ]) || "",
      ).trim(),
      pendingReason =
        statusForReason === "รอพิจารณา"
          ? rawPendingReason || rawClosedReason || rawRejectionReason
          : rawPendingReason,
      reasonGeneric =
        statusForReason === "รอพิจารณา"
          ? pendingReason
          : rawRejectionReason || rawClosedReason || rawPendingReason || "",
      closedReason = rawClosedReason || reasonGeneric || "",
      rejectionReason =
        rawRejectionReason || rawClosedReason || reasonGeneric || "",
      cat = String(
        caseSearchPickCanonical_(row, [
          "cat",
          "caseType",
          "type",
          "category",
          "ประเภทเรื่อง",
          "ประเภท",
        ]) || "",
      ).trim(),
      subCat = String(
        caseSearchPickCanonical_(row, [
          "subCat",
          "subCategory",
          "issue",
          "topic",
          "issueTitle",
          "ประเด็นพิจารณา",
          "ประเด็น",
        ]) || "",
      ).trim(),
      assignees = String(
        caseSearchPickCanonical_(row, [
          "assignees",
          "committeeOwner",
          "responsibleCommittee",
          "responsibleCommissioners",
          "responsibleComm",
          "subcommittee",
          "owner",
          "กมธ.รับผิดชอบ",
          "กมธ. รับผิดชอบ",
          "กรรมาธิการรับผิดชอบ",
          "คณะกรรมาธิการรับผิดชอบ",
          "ผู้รับผิดชอบ",
          "ผู้รับผิดชอบหลัก",
        ]) || "",
      ).trim(),
      staffs = String(
        caseSearchPickCanonical_(row, [
          "secretariatOfficer",
          "operationOfficer",
          "opStaff",
          "staffs",
          "operator",
          "responsibleOfficer",
          "operationStaff",
          "staff",
          "officer",
          "เจ้าหน้าที่ฝ่ายเลขานุการ",
          "เจ้าหน้าที่ฝ่ายเลขานุการ",
        ]) || "",
      ).trim(),
      coAssignees = String(
        caseSearchPickCanonical_(row, _C30K_CO_ASSIGNEES_) || "",
      ).trim(),
      petitionerPhone = _appPhoneForDisplay_(
        caseSearchPickCanonical_(row, _C30K_PETITIONER_PHONE_) || "",
      ),
      receiveDateText = _caseSearchReceiveDateTextFromRow_(row),
      id =
        String(
          caseSearchPickCanonical_(row, [
            "caseId",
            "id",
            "uid",
            "rowId",
            "_id",
          ]) || "",
        ).trim() || "MAIN-" + String(row.__rowNumber || index + 2),
      out = _c30O_({}, row, {
        caseId: id,
        id: row.id || id,
        caseNum,
        caseNo: caseNum,
        runningNo: caseNum,
        recNo,
        receiveNo: recNo,
        title,
        subject: row.subject || title,
        caseTitle,
        considerationTitle: row.considerationTitle || caseTitle,
        petitioners,
        petitionerName: row.petitionerName || petitioners,
        respondent,
        agencyName: row.agencyName || respondent,
        sentAgency,
        sendToAgency: sentAgency,
        ส่งให้หน่วยงาน: sentAgency,
        status: statusForReason || "เรื่องเข้าใหม่",
        statusRaw: _s_(status).trim(),
        offerDate,
        dateProposed: offerDate,
        bookDate: offerDate,
        letterDate: row.letterDate || offerDate,
        documentDate: row.documentDate || offerDate,
        วันที่หนังสือ: row.วันที่หนังสือ || offerDate,
        reason: reasonGeneric,
        statusReason: row.statusReason || reasonGeneric,
        decisionReason: row.decisionReason || reasonGeneric,
        closedReason,
        rejectionReason,
        rejectReason: rejectionReason,
        notAcceptedReason: rejectionReason,
        pendingRemark: pendingReason,
        pendingReason,
        waitReason: pendingReason,
        เหตุผลรอพิจารณา: pendingReason,
        เหตุผลรอการพิจารณา: pendingReason,
        หมายเหตุรอพิจารณา: pendingReason,
        "เหตุผล (ไม่รับเรื่อง)": rejectionReason,
        เหตุผล: reasonGeneric,
        petitionerPhone,
        petitionerTel: petitionerPhone,
        phone: petitionerPhone,
        "เบอร์โทรศัพท์ผู้เสนอญัตติ/ผู้ร้อง": petitionerPhone,
        cat,
        caseType: row.caseType || cat,
        subCat,
        subCategory: row.subCategory || subCat,
        assignees,
        owner: row.owner || assignees,
        staffs,
        opStaff: row.opStaff || staffs,
        coAssignees,
        type: "case",
        typeLabel: "เรื่องพิจารณา",
      });
    return (
      (out.ลำดับเรื่อง = caseNum),
      (out.เลขรับเรื่อง = recNo),
      receiveDateText &&
        ((out.recDate = receiveDateText),
        (out.receiveDate = receiveDateText),
        (out.recDateText = receiveDateText),
        (out.receiveDateText = receiveDateText),
        (out.วันที่รับเรื่อง = receiveDateText)),
      (out["ชื่อเรื่องพิจารณา (ถ้ามี)"] =
        out["ชื่อเรื่องพิจารณา (ถ้ามี)"] || caseTitle),
      (out["ผู้เสนอญัตติ/ผู้ร้อง"] =
        out["ผู้เสนอญัตติ/ผู้ร้อง"] || petitioners),
      _appIsFnName_("_caseSearchEnsureReceiveNo_") &&
        (out = _caseSearchEnsureReceiveNo_(out)),
      out
    );
  }
  function hasCaseSearchIdentity_(row) {
    var caseNum, recNo, title, petitioners, score;
    return (
      (row = row || {}),
      (String(
        caseSearchPickCanonical_(row, [
          "caseNum",
          "caseNo",
          "runningNo",
          "ลำดับเรื่อง",
        ]) || "",
      ).trim()
        ? 1
        : 0) +
        (String(
          caseSearchPickCanonical_(row, [
            "recNo",
            "receiveNo",
            "เลขรับเรื่อง",
          ]) || "",
        ).trim()
          ? 1
          : 0) +
        (String(
          caseSearchPickCanonical_(row, [
            "title",
            "subject",
            "caseTitle",
            "considerationTitle",
            "ชื่อเรื่อง",
            "ชื่อเรื่องพิจารณา (ถ้ามี)",
          ]) || "",
        ).trim()
          ? 1
          : 0) +
        (String(
          caseSearchPickCanonical_(row, [
            "petitioners",
            "petitionerName",
            "ผู้เสนอญัตติ/ผู้ร้อง",
          ]) || "",
        ).trim()
          ? 1
          : 0) >=
        2
    );
  }
  try {
    var projectedFields = requested.length
        ? requested.slice()
        : _appIsFnName_("_caseSearchProjectedFields_")
          ? _caseSearchProjectedFields_()
          : [],
      effectiveTtl =
        opts.forceFresh === !0 || opts.noCache === !0 || opts.bypassCache === !0
          ? 0
          : Math.max(
              60,
              Math.min(
                Number(opts.cacheTtlSeconds || opts.ttl || 180) || 180,
                300,
              ),
            ),
      projectedRows =
        typeof readSheetProjectedObjectsCached_ == "function"
          ? readSheetProjectedObjectsCached_("MainData", projectedFields, {
              includeDeleted: !1,
              requireCanonical: !1,
              ttl: effectiveTtl,
              batchSize: 500,
            })
          : [];
    if (_c30A_(projectedRows) && projectedRows.length) {
      var canonicalRows = projectedRows
          .map(function (row, idx) {
            return canonical(_c30O_({ __rowNumber: idx + 2 }, row || {}), idx);
          })
          .filter(function (row) {
            var deleted = _s_(
              row.isDeleted || row.deleted || row.deletedAt || row.ลบ,
            )
              .trim()
              .toLowerCase();
            return (
              deleted !== "true" &&
              deleted !== "1" &&
              deleted !== "deleted" &&
              deleted !== "ลบ"
            );
          }),
        identityRows = canonicalRows.filter(hasCaseSearchIdentity_);
      if (identityRows.length)
        return (
          (canonicalRows = identityRows),
          _appIsFnName_("_requestScopeNoteRowsRead_") &&
            _requestScopeNoteRowsRead_(
              "MainData.projected.identity",
              canonicalRows.length,
            ),
          requested.length &&
            (canonicalRows = canonicalRows.map(function (row) {
              var out = {};
              return (
                requested.forEach(function (f) {
                  out[f] = row[f] !== void 0 && row[f] !== null ? row[f] : "";
                }),
                _C30K_CANONICAL_REPORT_BASE_.forEach(function (k) {
                  (out[k] !== void 0 &&
                    out[k] !== null &&
                    String(out[k]).trim() !== "") ||
                    row[k] === void 0 ||
                    row[k] === null ||
                    String(row[k]).trim() === "" ||
                    (out[k] = row[k]);
                }),
                out
              );
            })),
          canonicalRows
        );
      _c30W_(
        "case.search.projectedRead.emptyIdentity.fullMatrixRead",
        new Error("PROJECTED_ROWS_WITHOUT_CASE_IDENTITY"),
      );
    }
  } catch (projectedErr) {
    _c30W_("case.search.projectedRead.fullMatrixRead", projectedErr);
  }
  try {
    var sh = typeof getSheet_ == "function" ? getSheet_("MainData") : null;
    if (!sh) return [];
    var matrix =
      typeof getSheetMatrixCached_ == "function"
        ? getSheetMatrixCached_(sh, 0, { allowFullMatrix: !0 })
        : typeof getSheetMatrix_ == "function"
          ? getSheetMatrix_(sh, 0, { allowFullMatrix: !0 })
          : [];
    if (!_c30A_(matrix) || matrix.length < 2) return [];
    var schema =
        typeof SHEET_SCHEMAS != "undefined" &&
        SHEET_SCHEMAS &&
        _c30A_(SHEET_SCHEMAS.MainData)
          ? SHEET_SCHEMAS.MainData
          : [],
      aliases =
        typeof SHEET_HEADER_ALIASES != "undefined" &&
        SHEET_HEADER_ALIASES &&
        SHEET_HEADER_ALIASES.MainData
          ? SHEET_HEADER_ALIASES.MainData
          : {},
      appAliases =
        typeof getAppFieldAliases_ == "function"
          ? getAppFieldAliases_("MainData")
          : aliases,
      rawRows,
      rows = (
        typeof AppBackendCore != "undefined" && AppBackendCore.matrixToObjects
          ? AppBackendCore.matrixToObjects(matrix, {
              schema,
              aliases,
              appAliases,
              normalizeKey: normalizeDirectRowKey_,
              includeDeleted: !1,
            })
          : []
      ).map(function (obj, idx) {
        return canonical(obj, idx);
      });
    return (
      _appIsFnName_("_requestScopeNoteRowsRead_") &&
        _requestScopeNoteRowsRead_("MainData", rows.length),
      requested.length &&
        (rows = rows.map(function (row) {
          var out = {};
          return (
            requested.forEach(function (f) {
              out[f] = row[f] !== void 0 && row[f] !== null ? row[f] : "";
            }),
            _C30K_CANONICAL_REPORT_BASE_.forEach(function (k) {
              (out[k] !== void 0 &&
                out[k] !== null &&
                String(out[k]).trim() !== "") ||
                row[k] === void 0 ||
                row[k] === null ||
                String(row[k]).trim() === "" ||
                (out[k] = row[k]);
            }),
            out
          );
        })),
      rows
    );
  } catch (e) {
    return (_c30W_("case.directMainData.recDateOwner.failed", e), []);
  }
}
function _caseProjectedRows_(fields, ttl) {
  var requested = fields || _caseSearchProjectedFields_(),
    rows = [];
  try {
    rows = _caseReadMainDataRowsForSearch_(requested) || [];
  } catch (directErr) {
    (_c30W_("case.search.projectedRows.directMainDataRecDate", directErr),
      (rows = []));
  }
  if (!rows.length) {
    var effectiveTtl = ttl === 0 ? 0 : ttl || 180;
    try {
      rows =
        _caseDomainSharedRows_("MainData", requested, {
          includeDeleted: !1,
          requireCanonical: !1,
          ttl: effectiveTtl,
        }) || [];
    } catch (e) {
      (_c30W_("case.search.projectedRows.sharedRead", e), (rows = []));
    }
  }
  return (_c30A_(rows) ? rows : [])
    .map(_caseSearchEnsureReceiveNo_)
    .filter(function (row) {
      var deleted = _s_(row.isDeleted || row.deleted || row.deletedAt)
        .trim()
        .toLowerCase();
      if (
        deleted === "true" ||
        deleted === "1" ||
        deleted === "deleted" ||
        deleted === "ลบ"
      )
        return !1;
      var type = _s_(row.type).trim().toLowerCase(),
        label = _s_(row.typeLabel).trim();
      return (
        type !== "letter" && label !== "หนังสือ" && label !== "หนังสือติดตามมติ"
      );
    });
}
function _caseMeetingHistoryKeyCurrent_(value) {
  return _c30S_(value).replace(/\s+/g, " ").trim();
}
function _caseMeetingHistoryTypeCurrent_(log) {
  log = log || {};
  var raw = _caseMeetingHistoryKeyCurrent_(
      log.meetingType ||
        log.committeeType ||
        log.type ||
        log.meetingGroup ||
        log.ประเภทการประชุม ||
        "",
    ),
    sub = _caseMeetingHistoryKeyCurrent_(
      log.subcommitteeName ||
        log.subcommittee ||
        log.subCommitteeName ||
        log.คณะอนุกรรมาธิการ ||
        "",
    );
  return /อนุกรรมาธิการ/.test(raw) || sub
    ? "คณะอนุกรรมาธิการ"
    : "คณะกรรมาธิการ";
}
function _caseMeetingHistoryTextCurrent_(log) {
  log = log || {};
  function cleanPart(v) {
    return _caseMeetingHistoryKeyCurrent_(v)
      .replace(/^ครั้งที่\s*/i, "")
      .replace(/^ครั้งประชุม\s*/i, "")
      .trim();
  }
  var round = cleanPart(
      log.round ||
        log.meetingRound ||
        log.meetingNo ||
        log.relatedMeetingNo ||
        log.roundNo ||
        log.ครั้งที่ ||
        log.ครั้งที่ประชุม ||
        log.การประชุมครั้งที่ ||
        "",
    ),
    dateRaw =
      log.date ||
      log.meetingDate ||
      log.relatedMeetingDate ||
      log.dateRaw ||
      log.วันที่ประชุม ||
      log.วันประชุม ||
      "",
    date = _caseMeetingHistoryKeyCurrent_(
      _committeeMeetingDateText_(dateRaw) || dateRaw,
    ),
    parts = [];
  return (
    round && parts.push("ครั้งที่ " + round),
    date && parts.push("วันที่ประชุม " + date),
    parts.join(" / ")
  );
}
function _caseMeetingHistoryIndexCurrent_() {
  var idx = {};
  function put(key, kind, text) {
    if (
      ((key = _caseMeetingHistoryKeyCurrent_(key)),
      (text = _caseMeetingHistoryKeyCurrent_(text)),
      key && text)
    ) {
      var slot = idx[key] || (idx[key] = { committee: [], subcommittee: [] }),
        arr = slot[kind] || (slot[kind] = []);
      arr.indexOf(text) < 0 && arr.push(text);
    }
  }
  var logs = [];
  try {
    logs = _appIsFnName_("_meetingHistoryProjectedRows_")
      ? _meetingHistoryProjectedRows_()
      : [];
  } catch (_histErr) {
    (_c30W_("case.report.meetingHistory.read", _histErr), (logs = []));
  }
  return (
    (_c30A_(logs) ? logs : []).forEach(function (log) {
      log = log || {};
      try {
        if (_appIsFnName_("isSoftDeletedRow_") && isSoftDeletedRow_(log))
          return;
      } catch (_delErr) {
        _appIgnore_(_delErr, "case.report.meetingHistory.deletedCheck");
      }
      var kind =
          _caseMeetingHistoryTypeCurrent_(log) === "คณะอนุกรรมาธิการ"
            ? "subcommittee"
            : "committee",
        text = _caseMeetingHistoryTextCurrent_(log),
        caseNum = _caseSequenceFrom_(log),
        caseId = _s_(log.caseId || log.case_id || "").trim();
      text &&
        [caseId, caseNum].forEach(function (k) {
          put(k, kind, text);
          var compactKey = _caseMeetingHistoryKeyCurrent_(k).replace(
            /[\s ​-‍\uFEFF]/g,
            "",
          );
          compactKey && put(compactKey, kind, text);
        });
    }),
    idx
  );
}
function _caseAttachMeetingHistoryCurrent_(rows) {
  return _appIsFnName_("_caseReportApplyMeetingHistoryPhase3_")
    ? _caseReportApplyMeetingHistoryPhase3_(_c30A_(rows) ? rows : [])
    : _c30A_(rows)
      ? rows
      : [];
}
function _caseReportMatchRows_(payload) {
  payload = payload || {};
  var projectedFields =
      payload.fullList === !0 || payload.exportMode || payload.includeMeetingHistory === !0
        ? _caseSearchProjectedFields_()
        : _caseSearchCompactProjectedFields_(),
    rows = _appIsFnName_("_caseReadMainDataRowsForSearch_")
      ? _caseReadMainDataRowsForSearch_(projectedFields, payload)
      : [];
  ((rows = (_c30A_(rows) ? rows : []).map(function (row) {
    return _appIsFnName_("_caseSearchEnsureReceiveNo_")
      ? _caseSearchEnsureReceiveNo_(row || {})
      : row || {};
  })),
    payload.includeMeetingHistory === !0 &&
      _appIsFnName_("_caseAttachMeetingHistoryCurrent_") &&
      (rows = _caseAttachMeetingHistoryCurrent_(rows)));
  var query = _normalizeSearchText_(
      payload.query || payload.q || payload.keyword || "",
    ),
    reportType = String(
      payload.reportType || payload.groupType || payload.type || "all",
    )
      .toLowerCase()
      .trim(),
    reportValue = _s_(
      payload.reportValue || payload.groupValue || payload.value,
    ).trim();
  function rowMatchesQuery(r) {
    return (
      !query ||
      [
        r.caseNum,
        r.recNo,
        r.receiveNo,
        r.title,
        r.subject,
        r.caseTitle,
        r.considerationTitle,
        r.petitioners,
        r.petitionerName,
        r.status,
        r.assignees,
        r.staffs,
        r.coAssignees,
        r.subCat,
        r.cat,
        r.agencyName,
        r.respondent,
      ].some(function (v) {
        return _normalizeSearchText_(v).indexOf(query) !== -1;
      })
    );
  }
  function rowMatchesGroup(r) {
    return (
      !reportValue ||
      (reportType === "cat"
        ? _s_(r.cat || r.caseType) === reportValue
        : reportType === "sub"
          ? _s_(r.subCat || r.subCategory || r.issue) === reportValue
          : reportType === "comm"
            ? _s_(r.assignees || r.owner).indexOf(reportValue) !== -1
            : reportType === "status"
              ? _s_(r.status) === reportValue
              : [
                  r.caseNum,
                  r.recNo,
                  r.title,
                  r.caseTitle,
                  r.petitioners,
                  r.respondent,
                  r.status,
                  r.cat,
                  r.subCat,
                  r.assignees,
                  r.staffs,
                  r.coAssignees,
                ].some(function (v) {
                  return _c30S_(v).indexOf(reportValue) !== -1;
                }))
    );
  }
  return (
    (rows = rows
      .filter(rowMatchesQuery)
      .filter(rowMatchesGroup)
      .filter(function (row) {
        var type = _s_(row.type).trim().toLowerCase(),
          label = _s_(row.typeLabel).trim();
        return (
          type !== "letter" &&
          label !== "หนังสือ" &&
          label !== "หนังสือติดตามมติ"
        );
      })),
    _appIsFnName_("_requestScopePut_") &&
      (rows =
        _requestScopePut_(
          "caseReportRows",
          "MainData.recDate.directOwner",
          rows,
        ) || rows),
    rows.slice()
  );
}
function _uniqueValuesFromRows_(rows, key) {
  rows = _c30A_(rows) ? rows : [];
  var seen = {},
    out = [];
  return (
    rows.forEach(function (r) {
      _s_(r && r[key])
        .split(",")
        .map(function (v) {
          return _s_(v).trim();
        })
        .filter(Boolean)
        .forEach(function (v) {
          seen[v] || ((seen[v] = 1), out.push(v));
        });
    }),
    out.sort(function (a, b) {
      return a.localeCompare(b, "th");
    }),
    out
  );
}
function _caseSortRowsForSearch_(rows, payload) {
  ((payload = payload || {}), (rows = _c30A_(rows) ? rows : []));
  var sortBy = String(payload.sortBy || "caseNum").trim() || "caseNum",
    sortDir =
      String(payload.sortDir || "asc").toLowerCase() === "desc" ? -1 : 1;
  return rows.slice().sort(function (a, b) {
    function sortValue(row) {
      if (
        sortBy === "caseNum" ||
        sortBy === "caseNo" ||
        sortBy === "runningNo" ||
        sortBy === "ลำดับเรื่อง"
      ) {
        var raw,
          m = String(
            (row &&
              (row.caseNum ||
                row.caseNo ||
                row.runningNo ||
                row.ลำดับเรื่อง)) ||
              "",
          )
            .replace(/^'+/, "")
            .trim()
            .match(/^\d+/);
        return m ? Number(m[0]) : Number.POSITIVE_INFINITY;
      }
      if (
        sortBy === "recNo" ||
        sortBy === "receiveNo" ||
        sortBy === "เลขรับเรื่อง"
      ) {
        var rn,
          rm = String(
            (row && (row.recNo || row.receiveNo || row.เลขรับเรื่อง)) || "",
          )
            .replace(/^'+/, "")
            .trim()
            .match(/^\d+/);
        return rm ? Number(rm[0]) : Number.POSITIVE_INFINITY;
      }
      return row && row[sortBy];
    }
    var av = sortValue(a),
      bv = sortValue(b);
    return typeof av == "number" &&
      typeof bv == "number" &&
      isFinite(av) &&
      isFinite(bv) &&
      av !== bv
      ? (av - bv) * sortDir
      : _c30S_(av).localeCompare(_c30S_(bv), "th") * sortDir;
  });
}
function _caseBuildSearchIndexSummary_(rows) {
  rows = _c30A_(rows) ? rows : [];
  var byStatus = {},
    byType = {},
    byFy = {},
    recNoCount = 0,
    caseNoCount = 0;
  return (
    rows.forEach(function (row) {
      row = row || {};
      var status =
          String(
            row.status || row.statusText || row.สถานะเรื่อง || "ไม่ระบุ",
          ).trim() || "ไม่ระบุ",
        type =
          String(
            row.category ||
              row.caseType ||
              row.typeName ||
              row.ประเภท ||
              "ไม่ระบุ",
          ).trim() || "ไม่ระบุ",
        fy =
          _s_(
            row.fy || row.fiscalYear || row.budgetFy || row.ปีงบประมาณ,
          ).replace(/[^0-9]/g, "") || "ไม่ระบุ";
      ((byStatus[status] = Number(byStatus[status] || 0) + 1),
        (byType[type] = Number(byType[type] || 0) + 1),
        (byFy[fy] = Number(byFy[fy] || 0) + 1),
        _s_(row.recNo || row.receiveNo || row.เลขรับเรื่อง).trim() &&
          recNoCount++,
        _s_(
          row.caseNum || row.caseNo || row.runningNo || row.ลำดับเรื่อง,
        ).trim() && caseNoCount++);
    }),
    {
      ok: !0,
      modelId: "case-search-index-current",
      totalRecords: rows.length,
      byStatus,
      byType,
      byFiscalYear: byFy,
      recNoCoverage: recNoCount,
      caseNoCoverage: caseNoCount,
      generatedAt: new Date().toISOString(),
    }
  );
}
var PHASE3_CASE_REPORT_READ_MODEL_STAMP =
  "phase3-case-report-read-model-2026-06-30";
function _caseReportTextPhase3_(value) {
  return value == null
    ? ""
    : Object.prototype.toString.call(value) === "[object Date]"
      ? isNaN(value.getTime())
        ? ""
        : _appIsFnName_("_committeeMeetingDateText_")
          ? _committeeMeetingDateText_(value)
          : Utilities.formatDate(
              value,
              Session.getScriptTimeZone() || "Asia/Bangkok",
              "yyyy-MM-dd",
            )
      : String(value)
          .replace(/[\u00A0\u200B-\u200D\uFEFF]/g, " ")
          .replace(/\s+/g, " ")
          .trim();
}
function _caseReportThaiDigitsPhase3_(value) {
  return _caseReportTextPhase3_(value).replace(/[๐-๙]/g, function (ch) {
    return String("๐๑๒๓๔๕๖๗๘๙".indexOf(ch));
  });
}
function _caseReportNormKeyPhase3_(value) {
  return _caseReportThaiDigitsPhase3_(value)
    .toLowerCase()
    .replace(/[\s\n\r\t\-–—_()（）\[\]{}:：\/\\\.]+/g, "");
}
function _caseReportCompactPhase3_(value) {
  return _caseReportThaiDigitsPhase3_(value)
    .toLowerCase()
    .replace(
      /[\s\u00A0\u1680\u180E\u2000-\u200F\u2028\u2029\u202F\u205F\u2060\u3000\uFEFF\-–—_()（）\[\]{}:：\/\\\.]+/g,
      "",
    );
}
function _caseReportUniquePhase3_(list) {
  var out = [],
    seen = {};
  return (
    (_c30A_(list) ? list : []).forEach(function (value) {
      ((value = _caseReportTextPhase3_(value)),
        value && !seen[value] && ((seen[value] = !0), out.push(value)));
    }),
    out
  );
}
function _caseReportAliasesPhase3_(domain, field, fallback) {
  var list = [];
  try {
    typeof AppBackendCore != "undefined" &&
      AppBackendCore.getFieldAliases &&
      (list = AppBackendCore.getFieldAliases(domain, field) || []);
  } catch (_aliasErr) {
    _c30W_("case.report.phase3.alias", _aliasErr, { domain, field });
  }
  return _caseReportUniquePhase3_(
    (_c30A_(list) ? list : []).concat(_c30A_(fallback) ? fallback : [field]),
  );
}
function _caseReportPickObjPhase3_(row, names) {
  ((row = row || {}), (names = _c30A_(names) ? names : [names]));
  for (var i = 0; i < names.length; i++) {
    var name = names[i];
    if (_c30H_(row, name)) {
      var value = _caseReportTextPhase3_(row[name]);
      if (value) return value;
    }
  }
  var normalized = {};
  Object.keys(row).forEach(function (key2) {
    normalized[_caseReportNormKeyPhase3_(key2)] = row[key2];
  });
  for (var j = 0; j < names.length; j++) {
    var key = _caseReportNormKeyPhase3_(names[j]);
    if (_c30H_(normalized, key)) {
      var v = _caseReportTextPhase3_(normalized[key]);
      if (v) return v;
    }
  }
  return "";
}
function _caseReportHeaderIndexPhase3_(headers, names) {
  ((headers = _c30A_(headers) ? headers : []),
    (names = _c30A_(names) ? names : [names]));
  var headerMap = {};
  headers.forEach(function (h, i) {
    var key = _caseReportNormKeyPhase3_(h);
    key && headerMap[key] == null && (headerMap[key] = i);
  });
  for (var n = 0; n < names.length; n++) {
    var want = _caseReportNormKeyPhase3_(names[n]);
    if (want && headerMap[want] != null) return headerMap[want];
  }
  return -1;
}
function _caseReportValueAtPhase3_(row, index) {
  return index >= 0 ? _caseReportTextPhase3_((row || [])[index]) : "";
}
function _caseReportStatusPhase3_(value) {
  return _caseStatusNormalizePhaseD_(value, {
    defaultStatus: "เรื่องเข้าใหม่",
    warningKey: "case.report.phase3.status",
  });
}
function _caseReportIsDeletedPhase3_(row) {
  var marker = _caseReportTextPhase3_(
      row && (row.isDeleted || row.deleted || row.ลบ || row.สถานะลบ || ""),
    ).toLowerCase(),
    deletedAt = _caseReportTextPhase3_(
      row && (row.deletedAt || row.วันที่ลบ || ""),
    );
  return !!deletedAt || /^(true|1|yes|deleted|ลบ)$/i.test(marker);
}
function _caseReportFirstNumberPhase3_(value) {
  var m = _caseReportThaiDigitsPhase3_(value).replace(/^'+/, "").match(/^\d+/);
  return m ? Number(m[0]) : Number.POSITIVE_INFINITY;
}
function _caseReportSortTextPhase3_(value) {
  return _caseReportTextPhase3_(value).toLowerCase();
}
function _caseReportSplitLinesPhase3_(value) {
  return _caseReportUniquePhase3_(
    _caseReportTextPhase3_(value)
      .split(/[\n;,]+/)
      .map(function (x) {
        return _caseReportTextPhase3_(x);
      })
      .filter(Boolean),
  );
}
function _caseReportMergeLinesPhase3_(existing, incoming) {
  return _caseReportUniquePhase3_(
    _caseReportSplitLinesPhase3_(existing).concat(
      _c30A_(incoming) ? incoming : _caseReportSplitLinesPhase3_(incoming),
    ),
  ).join(`
`);
}
function _caseReportMeetingTypePhase3_(log) {
  log = log || {};
  var raw = _caseReportTextPhase3_(
      log.committeeType ||
        log.meetingType ||
        log.type ||
        log.meetingGroup ||
        log.ประเภทการประชุม ||
        "",
    ),
    sub = _caseReportTextPhase3_(
      log.subcommitteeName ||
        log.subcommittee ||
        log.subCommitteeName ||
        log.คณะอนุกรรมาธิการ ||
        "",
    );
  return /อนุกรรมาธิการ/.test(raw) || sub ? "subcommittee" : "committee";
}
function _caseReportMeetingTextPhase3_(log) {
  log = log || {};
  function cleanRound(v) {
    return _caseReportTextPhase3_(v)
      .replace(/^ครั้งที่\s*/i, "")
      .replace(/^ครั้งประชุม\s*/i, "")
      .trim();
  }
  var round = cleanRound(
      log.round ||
        log.meetingRound ||
        log.meetingNo ||
        log.relatedMeetingNo ||
        log.roundNo ||
        log.ครั้งที่ ||
        log.ครั้งที่ประชุม ||
        log.การประชุมครั้งที่ ||
        "",
    ),
    dateRaw =
      log.date ||
      log.meetingDate ||
      log.relatedMeetingDate ||
      log.dateRaw ||
      log.วันที่ประชุม ||
      log.วันประชุม ||
      "",
    date = "";
  try {
    date = _appIsFnName_("_committeeMeetingDateText_")
      ? _committeeMeetingDateText_(dateRaw)
      : "";
  } catch (_dateErr) {
    date = "";
  }
  date = _caseReportTextPhase3_(date || dateRaw);
  var parts = [];
  if (
    (round && parts.push("ครั้งที่ " + round),
    date && parts.push("วันที่ประชุม " + date),
    !parts.length)
  ) {
    var note = _caseReportTextPhase3_(
      log.summary || log.result || log.note || log.title || "",
    );
    note && parts.push(note);
  }
  return parts.join(" / ");
}
function _caseReportCaseIdentityKeysPhase3_(row) {
  row = row || {};
  var out = [],
    caseId = _caseReportTextPhase3_(row.caseId || row.case_id || row.recordId || row.uid || ""),
    caseNum = _caseReportTextPhase3_(
      row.caseNum || row.caseNo || row.runningNo || row.ลำดับเรื่อง || "",
    );
  function put(prefix, value) {
    ((value = _caseReportCompactPhase3_(value)),
      value && out.push(prefix + value));
  }
  return (
    caseId &&
      !/^MAIN-\d+$/i.test(caseId) &&
      !/^ROW-\d+$/i.test(caseId) &&
      put("id:", caseId),
    caseNum && put("n:", caseNum),
    _caseReportUniquePhase3_(out)
  );
}
function _caseReportLogIdentityKeysPhase3_(log) {
  log = log || {};
  var seed = {
      caseId: _caseReportTextPhase3_(log.caseId || log.case_id || ""),
      caseNum: _caseReportTextPhase3_(
        log.caseNum || log.caseNo || log.runningNo || log.ลำดับเรื่อง || "",
      ),
    },
    bk = _caseReportTextPhase3_(log.phase2BusinessKey || "");
  if (bk) {
    var parts = bk.split("|").map(_caseReportTextPhase3_);
    ((seed.caseId = seed.caseId || parts[0] || ""),
      (seed.caseNum = seed.caseNum || parts[1] || ""));
  }
  return _caseReportCaseIdentityKeysPhase3_(seed);
}
function _caseReportMeetingHistoryIndexPhase3_() {
  var idx = {},
    logs = [];
  try {
    logs = _appIsFnName_("_meetingHistoryProjectedRows_")
      ? _meetingHistoryProjectedRows_()
      : [];
  } catch (_histErr) {
    (_c30W_("case.report.phase3.meetingRead", _histErr), (logs = []));
  }
  function put(key, kind, text, sortKey) {
    if (
      ((key = _caseReportTextPhase3_(key)),
      (text = _caseReportTextPhase3_(text)),
      !(!key || !text))
    ) {
      var slot = idx[key] || (idx[key] = { committee: [], subcommittee: [] }),
        arr = slot[kind] || (slot[kind] = []);
      arr.some(function (item) {
        return item.text === text;
      }) || arr.push({ text, sortKey: sortKey || text });
    }
  }
  return (
    (_c30A_(logs) ? logs : []).forEach(function (log) {
      if (((log = log || {}), !_caseReportIsDeletedPhase3_(log))) {
        var kind = _caseReportMeetingTypePhase3_(log),
          text = _caseReportMeetingTextPhase3_(log),
          sortKey = [
            _caseReportTextPhase3_(
              log.dateRaw || log.date || log.meetingDate || "",
            ),
            _caseReportTextPhase3_(
              log.round || log.meetingRound || log.meetingNo || "",
            ),
            text,
          ].join("|");
        text &&
          _caseReportLogIdentityKeysPhase3_(log).forEach(function (key) {
            put(key, kind, text, sortKey);
          });
      }
    }),
    Object.keys(idx).forEach(function (key) {
      ["committee", "subcommittee"].forEach(function (kind) {
        idx[key][kind] = (idx[key][kind] || [])
          .sort(function (a, b) {
            return _s_(a.sortKey).localeCompare(_s_(b.sortKey), "th", {
              numeric: !0,
              sensitivity: "base",
            });
          })
          .map(function (item) {
            return item.text;
          });
      });
    }),
    idx
  );
}
function _caseReportApplyMeetingHistoryPhase3_(rows) {
  rows = _c30A_(rows) ? rows : [];
  var idx = _caseReportMeetingHistoryIndexPhase3_(),
    matched = 0;
  return (
    (rows = rows.map(function (row) {
      row = row || {};
      var comm = [],
        sub = [];
      return (
        _caseReportCaseIdentityKeysPhase3_(row).forEach(function (key) {
          var slot = idx[key];
          slot &&
            ((comm = comm.concat(slot.committee || [])),
            (sub = sub.concat(slot.subcommittee || [])));
        }),
        (comm = _caseReportUniquePhase3_(comm)),
        (sub = _caseReportUniquePhase3_(sub)),
        (comm.length || sub.length) && (matched += 1),
        (row.committeeHistory = _caseReportMergeLinesPhase3_(
          row.committeeHistory ||
            row.committeeMeeting ||
            row.คณะกรรมาธิการ ||
            "",
          comm,
        )),
        (row.committeeMeeting = row.committeeHistory),
        (row.คณะกรรมาธิการ = row.committeeHistory),
        (row.subcommitteeHistory = _caseReportMergeLinesPhase3_(
          row.subcommitteeHistory ||
            row.subcommitteeMeeting ||
            row.คณะอนุกรรมาธิการ ||
            "",
          sub,
        )),
        (row.subcommitteeMeeting = row.subcommitteeHistory),
        (row.คณะอนุกรรมาธิการ = row.subcommitteeHistory),
        row
      );
    })),
    (rows.__phase3MeetingHistoryMatched = matched),
    rows
  );
}
function _caseReportMainFieldsPhase3_() {
  return {
    caseId: _caseReportAliasesPhase3_("cases", "caseId", [
      "caseId",
      "id",
      "รหัส",
      "รหัสเรื่อง",
      "รหัสเรื่องพิจารณา",
    ]),
    caseNum: _caseReportAliasesPhase3_("cases", "caseNum", [
      "ลำดับเรื่อง",
      "เลขลำดับเรื่อง",
      "caseNum",
      "caseNo",
      "runningNo",
    ]),
    recNo: _caseReportAliasesPhase3_("cases", "recNo", [
      "เลขรับเรื่อง",
      "เลขรับ",
      "เลขที่รับเรื่อง",
      "รับเรื่องเลขที่",
      "ทะเบียนรับ",
      "recNo",
      "receiveNo",
      "receivedNo",
      "receiptNo",
    ]),
    recDate: _caseReportAliasesPhase3_("cases", "recDate", [
      "วันที่รับเรื่อง",
      "วันที่รับ",
      "วันรับเรื่อง",
      "recDate",
      "receiveDate",
      "receivedDate",
      "dateReceived",
    ]),
    title: _caseReportAliasesPhase3_("cases", "title", [
      "ชื่อเรื่อง",
      "เรื่อง",
      "subject",
      "title",
      "เรื่องร้องเรียน",
    ]),
    caseTitle: _caseReportAliasesPhase3_("cases", "caseTitle", [
      "ชื่อเรื่องพิจารณา (ถ้ามี)",
      "ชื่อเรื่องพิจารณา",
      "เรื่องพิจารณา",
      "caseTitle",
      "considerationTitle",
    ]),
    petitioners: _caseReportAliasesPhase3_("cases", "petitioners", [
      "ผู้เสนอญัตติ/ผู้ร้อง",
      "ผู้เสนอญัตติ",
      "ผู้ร้อง",
      "ผู้ร้องเรียน",
      "ผู้เสนอ",
      "petitioners",
      "petitionerName",
      "proposer",
      "complainant",
    ]),
    respondent: _caseReportAliasesPhase3_("cases", "respondent", [
      "ผู้ถูกร้อง",
      "หน่วยงาน / ผู้ถูกร้อง",
      "หน่วยงาน/ผู้ถูกร้อง",
      "respondent",
      "agencyName",
      "accusedAgency",
      "agency",
    ]),
    agencyName: _caseReportAliasesPhase3_("cases", "agencyName", [
      "หน่วยงาน",
      "agency",
      "agencyName",
      "accusedAgency",
      "หน่วยงานที่ส่ง",
    ]),
    sentAgency: [
      "sentAgency",
      "sendToAgency",
      "sentAgencyName",
      "forwardAgency",
      "หน่วยงานที่ส่ง",
      "ส่งให้หน่วยงาน",
      "หน่วยงานที่เกี่ยวข้อง",
    ],
    assignees: _caseReportAliasesPhase3_("cases", "assignees", [
      "กมธ.รับผิดชอบ",
      "กมธ. รับผิดชอบ",
      "กรรมาธิการรับผิดชอบ",
      "คณะกรรมาธิการรับผิดชอบ",
      "ผู้รับผิดชอบ",
      "ผู้รับผิดชอบหลัก",
      "assignees",
      "owner",
      "responsibleCommittee",
      "committeeOwner",
    ]),
    coAssignees: _caseReportAliasesPhase3_("cases", "coAssignees", [
      "ผู้ร่วมรับผิดชอบ",
      "ผู้รับผิดชอบร่วม",
      "coAssignees",
      "coOwners",
      "coResponsible",
      "subcommittee",
    ]),
    opStaff: _caseReportAliasesPhase3_("cases", "staffs", [
      "เจ้าหน้าที่ฝ่ายเลขานุการ",
      "เจ้าหน้าที่ฝ่ายปฏิบัติการ",
      "opStaff",
      "staffs",
      "operationOfficer",
      "secretariatOfficer",
      "officer",
      "staff",
    ]),
    cat: _caseReportAliasesPhase3_("cases", "cat", [
      "ประเภทเรื่อง",
      "ประเภท",
      "cat",
      "caseType",
      "category",
      "type",
    ]),
    subCat: _caseReportAliasesPhase3_("cases", "subCat", [
      "ประเด็นพิจารณา",
      "ประเด็น",
      "หัวข้อประเด็น",
      "subCat",
      "subCategory",
      "issue",
      "topic",
    ]),
    status: _caseReportAliasesPhase3_("cases", "status", [
      "สถานะ",
      "สถานะเรื่อง",
      "สถานะเรื่องพิจารณา",
      "สถานะปัจจุบัน",
      "ผลการพิจารณา",
      "status",
      "caseStatus",
      "processStatus",
      "currentStatus",
    ]),
    reason: [
      "เหตุผล",
      "เหตุผลสถานะ",
      "เหตุผลการพิจารณา",
      "reason",
      "statusReason",
      "decisionReason",
    ],
    pendingRemark: _caseReportAliasesPhase3_("cases", "pendingRemark", [
      "เหตุผลรอพิจารณา",
      "เหตุผลรอการพิจารณา",
      "หมายเหตุรอพิจารณา",
      "หมายเหตุรอการพิจารณา",
      "pendingRemark",
      "pendingReason",
      "waitReason",
      "waitingReason",
    ]),
    rejectionReason: _caseReportAliasesPhase3_("cases", "rejectionReason", [
      "เหตุผล (ไม่รับเรื่อง)",
      "เหตุผลไม่รับเรื่อง",
      "rejectionReason",
      "rejectReason",
      "notAcceptedReason",
    ]),
    closedReason: _caseReportAliasesPhase3_("cases", "closedReason", [
      "เหตุผลยุติเรื่อง",
      "เหตุผลการยุติเรื่อง",
      "closedReason",
      "closeReason",
      "terminateReason",
    ]),
    sentAgencyReason: [
      "sentAgencyReason",
      "sendAgencyReason",
      "sendReason",
      "forwardReason",
      "transferReason",
      "เหตุผลส่งหน่วยงาน",
      "เหตุผลการส่งหน่วยงาน",
      "เหตุผลที่ส่งหน่วยงาน",
    ],
    committeeHistory: [
      "คณะกรรมาธิการ",
      "committeeHistory",
      "committeeMeeting",
      "committeeMeetings",
      "meetingCommitteeHistory",
    ],
    subcommitteeHistory: [
      "คณะอนุกรรมาธิการ",
      "subcommitteeHistory",
      "subcommitteeMeeting",
      "subcommitteeMeetings",
      "meetingSubcommitteeHistory",
    ],
    updatedAt: ["updatedAt", "แก้ไขล่าสุด"],
    createdAt: ["createdAt", "วันที่สร้าง"],
    isDeleted: ["isDeleted", "deleted", "ลบ", "สถานะลบ"],
    deletedAt: ["deletedAt", "วันที่ลบ"],
  };
}
function _caseReportNormalizeMainRowPhase3_(raw, rowNumber, headers, indexes) {
  var fields = _caseReportMainFieldsPhase3_(),
    source = null;
  function pick(field) {
    return source
      ? _caseReportPickObjPhase3_(source, fields[field] || [field])
      : _caseReportValueAtPhase3_(raw, indexes[field]);
  }
  raw && typeof raw == "object" && !_c30A_(raw) && (source = raw);
  var rawStatus = pick("status"),
    status = _caseReportStatusPhase3_(rawStatus),
    reason = pick("reason"),
    pendingReason = pick("pendingRemark"),
    closedReason = pick("closedReason"),
    rejectionReason = pick("rejectionReason"),
    sentAgencyReason = pick("sentAgencyReason");
  (status === "รอพิจารณา" && !pendingReason && (pendingReason = reason),
    status === "ยุติเรื่อง" && !closedReason && (closedReason = reason),
    status === "ไม่รับเรื่อง" && !rejectionReason && (rejectionReason = reason),
    status === "ส่งหน่วยงาน" &&
      !sentAgencyReason &&
      (sentAgencyReason = reason));
  var caseNum = pick("caseNum"),
    recNo = pick("recNo"),
    recDate = pick("recDate"),
    title = pick("title"),
    caseTitle = pick("caseTitle"),
    displayTitle = title || caseTitle,
    respondent = pick("respondent") || pick("agencyName"),
    id = pick("caseId") || "MAIN-" + _s_(rowNumber),
    statusReason =
      status === "รอพิจารณา"
        ? pendingReason
        : status === "ไม่รับเรื่อง"
          ? rejectionReason
          : status === "ยุติเรื่อง"
            ? closedReason
            : status === "ส่งหน่วยงาน"
              ? sentAgencyReason
              : "",
    row = {
      id,
      caseId: id,
      seq: Number(rowNumber || 1) - 1,
      __rowNumber: rowNumber || "",
      caseNo: caseNum,
      caseNum,
      runningNo: caseNum,
      recNo,
      receiveNo: recNo,
      recDate,
      recDateText: recDate,
      receiveDate: recDate,
      receiveDateText: recDate,
      title: displayTitle,
      subject: displayTitle,
      caseTitle: caseTitle || displayTitle,
      considerationTitle: caseTitle || displayTitle,
      petitioners: pick("petitioners"),
      petitionerName: pick("petitioners"),
      respondent,
      agency: respondent,
      agencyName: respondent,
      sentAgency: pick("sentAgency"),
      sendToAgency: pick("sentAgency"),
      assignees: pick("assignees"),
      owner: pick("assignees"),
      coAssignees: pick("coAssignees"),
      coOwners: pick("coAssignees"),
      opStaff: pick("opStaff"),
      operationOfficer: pick("opStaff"),
      staffs: pick("opStaff"),
      cat: pick("cat"),
      caseType: pick("cat"),
      subCat: pick("subCat"),
      subCategory: pick("subCat"),
      committeeHistory: pick("committeeHistory"),
      committeeMeeting: pick("committeeHistory"),
      subcommitteeHistory: pick("subcommitteeHistory"),
      subcommitteeMeeting: pick("subcommitteeHistory"),
      status,
      statusRaw: rawStatus,
      reason:
        statusReason ||
        reason ||
        pendingReason ||
        closedReason ||
        rejectionReason ||
        sentAgencyReason,
      pendingRemark: pendingReason,
      pendingReason,
      closedReason,
      rejectionReason,
      sentAgencyReason,
      statusReason: statusReason || reason,
      decisionReason: statusReason || reason,
      updatedAt: pick("updatedAt"),
      createdAt: pick("createdAt"),
      type: "case",
      typeLabel: "เรื่องพิจารณา",
    };
  return (
    (row.ลำดับเรื่อง = row.caseNum),
    (row.เลขรับเรื่อง = row.recNo),
    (row.วันที่รับเรื่อง = row.recDateText),
    (row.ชื่อเรื่อง = row.title),
    (row["ชื่อเรื่องพิจารณา (ถ้ามี)"] = row.considerationTitle),
    (row["ผู้เสนอญัตติ/ผู้ร้อง"] = row.petitioners),
    (row.ผู้ถูกร้อง = row.respondent),
    (row.คณะกรรมาธิการ = row.committeeHistory),
    (row.คณะอนุกรรมาธิการ = row.subcommitteeHistory),
    (row.สถานะ = row.status),
    (row.เหตุผล = row.reason),
    (row.reportColumns = {
      caseNo: row.caseNo,
      recNo: row.recNo,
      recDateText: row.recDateText,
      title: row.title,
      considerationTitle: row.considerationTitle,
      committeeHistory: row.committeeHistory || "",
      subcommitteeHistory: row.subcommitteeHistory || "",
      petitioners: row.petitioners,
      respondent: row.respondent,
      assignees: row.assignees,
      coAssignees: row.coAssignees,
      status: row.status,
      reason: row.reason || "",
    }),
    row
  );
}
function _caseReportReadMainRowsPhase3_(payload) {
  payload = payload || {};
  var rows = [];
  try {
    var sh = typeof getSheet_ == "function" ? getSheet_("MainData") : null;
    if (!sh) return [];
    var matrix =
      typeof getSheetMatrix_ == "function"
        ? getSheetMatrix_(sh, 0, { allowFullMatrix: !0 })
        : sh.getDataRange().getValues();
    if (!_c30A_(matrix) || matrix.length < 2) return [];
    var headers = (matrix[0] || []).map(_caseReportTextPhase3_),
      fields = _caseReportMainFieldsPhase3_(),
      idx = {};
    Object.keys(fields).forEach(function (field) {
      idx[field] = _caseReportHeaderIndexPhase3_(headers, fields[field]);
    });
    for (var r = 1; r < matrix.length; r++) {
      var raw = matrix[r] || [];
      if (
        raw.some(function (cell) {
          return !!_caseReportTextPhase3_(cell);
        })
      ) {
        var deletionProbe = {
          isDeleted: _caseReportValueAtPhase3_(raw, idx.isDeleted),
          deletedAt: _caseReportValueAtPhase3_(raw, idx.deletedAt),
        };
        _caseReportIsDeletedPhase3_(deletionProbe) ||
          rows.push(
            _caseReportNormalizeMainRowPhase3_(raw, r + 1, headers, idx),
          );
      }
    }
  } catch (e) {
    (_c30W_("case.report.phase3.readMain", e), (rows = []));
  }
  return rows;
}
function _caseReportMatchesPhase3_(row, payload) {
  ((payload = payload || {}), (row = row || {}));
  var q = _caseReportTextPhase3_(
      payload.query || payload.q || payload.keyword || "",
    ).toLowerCase(),
    reportType = _caseReportTextPhase3_(
      payload.reportType || payload.groupType || payload.type || "all",
    ).toLowerCase(),
    reportValue = _caseReportTextPhase3_(
      payload.reportValue || payload.groupValue || payload.value || "",
    );
  if (q) {
    var hay = [
      row.caseNo,
      row.caseNum,
      row.recNo,
      row.receiveNo,
      row.recDateText,
      row.title,
      row.subject,
      row.considerationTitle,
      row.caseTitle,
      row.petitionerName,
      row.petitioners,
      row.respondent,
      row.agency,
      row.agencyName,
      row.assignees,
      row.owner,
      row.coOwners,
      row.coAssignees,
      row.opStaff,
      row.operationOfficer,
      row.staffs,
      row.committeeHistory,
      row.subcommitteeHistory,
      row.status,
      row.cat,
      row.subCat,
      row.reason,
      row.pendingReason,
      row.pendingRemark,
    ]
      .join(" ")
      .toLowerCase();
    if (hay.indexOf(q) < 0) return !1;
  }
  if (reportType && reportType !== "all" && reportValue) {
    var field =
      reportType === "cat"
        ? row.cat
        : reportType === "sub"
          ? row.subCat
          : reportType === "comm"
            ? row.assignees
            : reportType === "status"
              ? row.status
              : "";
    if (reportType === "status") {
      if (
        _caseReportStatusPhase3_(field) !==
        _caseReportStatusPhase3_(reportValue)
      )
        return !1;
    } else if (reportType === "comm") {
      if (_caseReportTextPhase3_(field).indexOf(reportValue) < 0) return !1;
    } else if (_caseReportTextPhase3_(field) !== reportValue) return !1;
  }
  return !0;
}
function _caseReportSortRowsPhase3_(rows, payload) {
  payload = payload || {};
  var sortBy = _caseReportTextPhase3_(payload.sortBy || "caseNum") || "caseNum",
    desc =
      _caseReportTextPhase3_(payload.sortDir || "asc").toLowerCase() === "desc";
  return (_c30A_(rows) ? rows : []).slice().sort(function (a, b) {
    var av, bv;
    if (
      (sortBy === "caseNum" || sortBy === "caseNo" || sortBy === "runningNo"
        ? ((av = _caseReportFirstNumberPhase3_(
            a && (a.caseNum || a.caseNo || a.runningNo),
          )),
          (bv = _caseReportFirstNumberPhase3_(
            b && (b.caseNum || b.caseNo || b.runningNo),
          )))
        : sortBy === "recNo" || sortBy === "receiveNo"
          ? ((av = _caseReportFirstNumberPhase3_(
              a && (a.recNo || a.receiveNo),
            )),
            (bv = _caseReportFirstNumberPhase3_(b && (b.recNo || b.receiveNo))))
          : ((av = _caseReportSortTextPhase3_(a && a[sortBy])),
            (bv = _caseReportSortTextPhase3_(b && b[sortBy]))),
      av !== bv)
    )
      return (av > bv ? 1 : -1) * (desc ? -1 : 1);
    var ar = Number((a && a.__rowNumber) || 0) || 0,
      br = Number((b && b.__rowNumber) || 0) || 0;
    return ar !== br
      ? ar - br
      : _caseReportSortTextPhase3_(a && a.recNo).localeCompare(
          _caseReportSortTextPhase3_(b && b.recNo),
          "th",
          { numeric: !0, sensitivity: "base" },
        );
  });
}
function _caseReportReadModelPhase3_(payload) {
  payload = payload || {};
  var started = Date.now(),
    includeMeetingHistory = payload.includeMeetingHistory === !0,
    noPage =
      payload.noPage === !0 ||
      payload.fullList === !0 ||
      payload.serverPaged === !1,
    requestedLimit = Math.max(
      1,
      Math.min(
        Number(payload.limit || payload.pageSize || 20) || 20,
        noPage ? 5e3 : 100,
      ),
    ),
    page = Math.max(1, Number(payload.page || 1) || 1),
    allowCache =
      payload.forceFresh !== !0 &&
      payload.noCache !== !0 &&
      payload.bypassCache !== !0,
    cacheScope = {
      q: _caseReportTextPhase3_(
        payload.query || payload.q || payload.keyword || "",
      ).toLowerCase(),
      reportType: _caseReportTextPhase3_(
        payload.reportType || payload.groupType || payload.type || "all",
      ).toLowerCase(),
      reportValue: _caseReportTextPhase3_(
        payload.reportValue || payload.groupValue || payload.value || "",
      ),
      sortBy: _caseReportTextPhase3_(payload.sortBy || "caseNum"),
      sortDir: _caseReportTextPhase3_(payload.sortDir || "asc"),
      page: noPage ? 1 : page,
      limit: requestedLimit,
      includeMeetingHistory: includeMeetingHistory ? 1 : 0,
      noPage: noPage ? 1 : 0,
      mainStamp: _appIsFnName_("_entityCacheStamp_")
        ? _entityCacheStamp_("maindata")
        : "1",
      meetingStamp:
        includeMeetingHistory && _appIsFnName_("_entityCacheStamp_")
          ? _entityCacheStamp_("meeting")
          : "0",
      model: PHASE3_CASE_REPORT_READ_MODEL_STAMP,
    },
    cacheKey =
      "case_report_read_model_phase3_" +
      (_appIsFnName_("_buildDigestHex_")
        ? _buildDigestHex_(JSON.stringify(cacheScope))
        : String(cacheScope.page) + "_" + String(cacheScope.limit));
  if (allowCache && _appIsFnName_("_cacheGetJson_")) {
    var hit = _cacheGetJson_(cacheKey);
    if (hit && typeof hit == "object")
      return (
        (hit.cacheHit = !0),
        (hit.cacheStatus = "hit"),
        (hit.durationMs = Math.max(0, Date.now() - started)),
        hit
      );
  }
  var allRows = _caseReportReadMainRowsPhase3_(payload),
    rowsRead = allRows.length,
    meetingMatched = 0;
  includeMeetingHistory &&
    ((allRows = _caseReportApplyMeetingHistoryPhase3_(allRows)),
    (meetingMatched = Number(allRows.__phase3MeetingHistoryMatched || 0) || 0));
  var filtered = allRows.filter(function (row) {
    return _caseReportMatchesPhase3_(row, payload);
  });
  filtered = _caseReportSortRowsPhase3_(filtered, payload);
  var totalRecords = filtered.length,
    pageSize = noPage
      ? Math.max(
          1,
          Math.min(
            Number(payload.maxRows || payload.limit || totalRecords || 5e3) ||
              5e3,
            5e3,
          ),
        )
      : requestedLimit,
    totalPages = noPage ? 1 : Math.max(1, Math.ceil(totalRecords / pageSize)),
    safePage = noPage ? 1 : Math.max(1, Math.min(page, totalPages)),
    start = noPage ? 0 : (safePage - 1) * pageSize,
    outRows = noPage
      ? filtered.slice(0, pageSize)
      : filtered.slice(start, start + pageSize),
    res = {
      ok: !0,
      rows: outRows,
      data: outRows,
      items: outRows,
      totalRecords,
      total: totalRecords,
      page: safePage,
      limit: pageSize,
      pageSize,
      totalPages,
      columns:
        typeof AppBackendCore != "undefined" && AppBackendCore.reportColumns
          ? AppBackendCore.reportColumns()
          : [],
      owner: "CaseDomain.searchCases",
      source: "CaseReportReadModel.phase3",
      readModel: PHASE3_CASE_REPORT_READ_MODEL_STAMP,
      serverPaged: !noPage,
      serverFiltered: !0,
      rowsRead,
      returnedRows: outRows.length,
      durationMs: Math.max(0, Date.now() - started),
      cacheHit: !1,
      cacheStatus: allowCache ? "miss" : "bypass",
      meetingHistoryAttached: includeMeetingHistory,
      meetingHistoryMatchedRows: meetingMatched,
      meta: {
        source: "CaseReportReadModel.phase3",
        sourceOfTruth: "MainData+MeetingLogs",
        readModelOwner: "Code_30_Domain_Cases._caseReportReadModelPhase3_",
        serverPaged: !noPage,
        serverFiltered: !0,
        rowsRead,
        returnedRows: outRows.length,
        durationMs: Math.max(0, Date.now() - started),
        includeMeetingHistory,
        meetingHistoryMatchedRows: meetingMatched,
        phase3Stamp: PHASE3_CASE_REPORT_READ_MODEL_STAMP,
      },
    };
  if (
    (typeof AppBackendCore != "undefined" &&
      AppBackendCore.normalizeCaseSearchResponse &&
      (res = AppBackendCore.normalizeCaseSearchResponse(res)),
    allowCache && _appIsFnName_("_cachePutJson_"))
  )
    try {
      _cachePutJson_(
        cacheKey,
        res,
        Math.max(
          30,
          Math.min(Number(payload.cacheTtlSeconds || 120) || 120, 300),
        ),
      );
    } catch (_putErr) {
      _c30W_("case.report.phase3.cachePut", _putErr);
    }
  return res;
}
function _caseReportFacetsPhase3_(payload) {
  payload = payload || {};
  var started = Date.now(),
    model = _caseReportReadModelPhase4_(
      _c30O_({}, payload, {
        noPage: !0,
        fullList: !0,
        serverPaged: !1,
        includeMeetingHistory: !1,
        limit: 5e3,
        pageSize: 5e3,
        __phase4IndexMode: "reportOptions",
        __route: "CaseDomain.getReportOptions",
        source: "case-report-options-phase4",
      }),
    ),
    rows = _c30A_(model.rows) ? model.rows : [];
  function values(key) {
    var seen = {},
      out = [];
    return (
      rows.forEach(function (row) {
        _caseReportTextPhase3_((row && row[key]) || "")
          .split(",")
          .map(_caseReportTextPhase3_)
          .filter(Boolean)
          .forEach(function (v) {
            seen[v] || ((seen[v] = 1), out.push(v));
          });
      }),
      out.sort(function (a, b) {
        return a.localeCompare(b, "th");
      })
    );
  }
  return {
    filteredTotal: rows.length,
    reportType: String(payload.reportType || "all"),
    query: _s_(payload.query || payload.q || payload.keyword),
    cat: values("cat"),
    sub: values("subCat"),
    comm: values("assignees"),
    status: values("status"),
    generatedAt: new Date().toISOString(),
    source: "CaseReportFacets.phase4",
    readModel: PHASE4_CASE_REPORT_INDEX_STAMP,
    cacheHit: !!model.cacheHit,
    cacheStatus: model.cacheStatus || "bypass",
    rowsRead: Number(model.rowsRead || rows.length || 0),
    durationMs: Math.max(0, Date.now() - started),
    meta: {
      source: "CaseReportFacets.phase4",
      readModel: PHASE4_CASE_REPORT_INDEX_STAMP,
      domainOwner: "CaseDomain",
    },
  };
}
function _caseSearchReadModel_(payload) {
  return (
    (payload = payload || {}),
    typeof AppDataService != "undefined" &&
    AppDataService &&
    AppDataService.readCaseSearchModel
      ? AppDataService.readCaseSearchModel(payload)
      : _caseReportReadModelPhase3_(payload)
  );
}
function _caseSearchReportFacets_(payload) {
  return _caseReportFacetsPhase3_(payload || {});
}
AppDomain.Repositories = AppDomain.Repositories || {};
var PHASEF_DASHBOARD_STATUS_READ_MODEL_STAMP =
  "phaseF-dashboard-status-read-model-current";
function _dashboardStatusCountStamp_() {
  return "dashboard-status-count-s0-default-current-phaseF-read-model-2026-07-05";
}
function _dashboardStatusLabelsPhaseF_() {
  return {
    s0: "เรื่องเข้าใหม่",
    s8: "ไม่รับเรื่อง",
    s2: "อนุฯ พิจารณา",
    s3: "รอพิจารณา",
    s4: "กมธ. พิจารณา",
    s6: "ยุติเรื่อง",
    s5: "ส่งหน่วยงาน",
    s7: "จัดทำรายงาน",
  };
}
function _dashboardStatusReadModelPhaseF_(rows) {
  rows = _c30A_(rows) ? rows : [];
  var labels = _dashboardStatusLabelsPhaseF_(),
    counts = {},
    unknownStatus = 0;
  Object.keys(labels).forEach(function (key) {
    counts[key] = 0;
  });
  rows.forEach(function (row) {
    var key = _dashboardCaseStatusKey_(_dashboardCaseStatusValue_(row || {}));
    _c30H_(labels, key)
      ? (counts[key] = _dashboardNum_(counts[key]) + 1)
      : unknownStatus++;
  });
  var statusRows = Object.keys(labels).map(function (key) {
      return {
        key: key,
        label: labels[key],
        count: _dashboardNum_(counts[key]),
      };
    }),
    statusRowsTotal = statusRows.reduce(function (sum, row) {
      return sum + _dashboardNum_(row && row.count);
    }, 0);
  unknownStatus &&
    (statusRows.push({
      key: "unknown",
      label: "ไม่ระบุสถานะ",
      count: unknownStatus,
    }),
    (statusRowsTotal += unknownStatus));
  return {
    stamp: PHASEF_DASHBOARD_STATUS_READ_MODEL_STAMP,
    statusCountStamp: _dashboardStatusCountStamp_(),
    dashboardStatusCountStamp: _dashboardStatusCountStamp_(),
    source: "DashboardStatusReadModel.PhaseF",
    sourceRowCount: rows.length,
    statusRows: statusRows,
    statusRowsTotal: statusRowsTotal,
    counts: counts,
    unknownStatus: unknownStatus,
    defaultBlankToS0: !0,
    labels: labels,
    generatedAt: new Date().toISOString(),
  };
}
function _phaseFDashboardStatusReadModelContract_() {
  return _cm_({
    ok: !0,
    stamp: PHASEF_DASHBOARD_STATUS_READ_MODEL_STAMP,
    owner: "DashboardDomain.statusReadModel",
    singleSource: "_dashboardStatusReadModelPhaseF_",
    statusCountStamp: _dashboardStatusCountStamp_(),
    sourceRowCountRequired: !0,
    frontendRemapDisabled: !0,
    snapshotStampRequired: !0,
    apiNamesPreserved: !0,
    noNewFiles: !0,
    uiDomChanged: !1,
    businessLogicChanged: !1,
  });
}
function _dashboardEmptyStatsPayload_(reason) {
  return {
    total: 0,
    pending: 0,
    completed: 0,
    overdueLetters: 0,
    soonOverdue: 0,
    s0: 0,
    s2: 0,
    s3: 0,
    s4: 0,
    s5: 0,
    s6: 0,
    s7: 0,
    s8: 0,
    meetings: { total: 0, recent: 0, byResult: [] },
    byType: [],
    byTopic: [],
    statusRows: [],
    statusCountStamp: _dashboardStatusCountStamp_(),
    dashboardStatusCountStamp: _dashboardStatusCountStamp_(),
    statusReadModelStamp: PHASEF_DASHBOARD_STATUS_READ_MODEL_STAMP,
    dashboardStatusReadModelStamp: PHASEF_DASHBOARD_STATUS_READ_MODEL_STAMP,
    statusReadModel: {
      stamp: PHASEF_DASHBOARD_STATUS_READ_MODEL_STAMP,
      sourceRowCount: 0,
      statusRows: [],
      statusRowsTotal: 0,
    },
    sourceRowCount: 0,
    statusSourceRowCount: 0,
    generatedAt: new Date().toISOString(),
    degraded: !!reason,
    errorCode: reason ? "DASHBOARD_STATS_DEGRADED" : "",
  };
}
function _dashboardStatsHasDashboardData_(stats) {
  function hasList(list) {
    return (
      _c30A_(list) &&
      list.some(function (x) {
        return Number((x && (x.count || x.total || x.value)) || 0) > 0;
      })
    );
  }
  var letters = (stats = stats || {}).letters || {},
    meetings = stats.meetings || {};
  return (
    Number(stats.total || stats.totalCases || 0) > 0 ||
    hasList(stats.byType) ||
    hasList(stats.byTopic) ||
    hasList(stats.statusRows) ||
    Number(letters.total || 0) > 0 ||
    Number(meetings.total || 0) > 0
  );
}
function _dashboardEmptyBudgetPayload_(reason) {
  return {
    fy: _appIsFnName_("_currentBudgetFyString_")
      ? _currentBudgetFyString_()
      : "",
    totalBudget: 0,
    totalPaid: 0,
    totalRemain: 0,
    byPlan: [],
    plans: [],
    rows: [],
    statusSummary: {
      refund: { total: 0, pending: 0 },
      report: { total: 0, pending: 0 },
    },
    generatedAt: new Date().toISOString(),
    degraded: !!reason,
    errorCode: reason ? "DASHBOARD_BUDGET_DEGRADED" : "",
  };
}
function _dashboardText_(value) {
  return value == null
    ? ""
    : Object.prototype.toString.call(value) === "[object Date]"
      ? isNaN(value.getTime())
        ? ""
        : value.toISOString()
      : String(value)
          .replace(/[\u00A0\u200B-\u200D\uFEFF]/g, " ")
          .replace(/\s+/g, " ")
          .trim();
}
function _dashboardStrictTitleText_(value) {
  var txt = _dashboardText_(value);
  if (!txt) return "";
  var compact = txt.replace(
    /[\s\u00A0\u1680\u180E\u2000-\u200F\u2028\u2029\u202F\u205F\u2060\u3000\uFEFF]/g,
    "",
  );
  return !compact ||
    compact === "-" ||
    compact === "\u2014" ||
    compact === "\u2013" ||
    compact === "_" ||
    compact === "." ||
    compact === "\u2026" ||
    /^null$/i.test(compact) ||
    /^undefined$/i.test(compact) ||
    /^n\/?a$/i.test(compact) ||
    /^na$/i.test(compact)
    ? ""
    : txt;
}
function _dashboardMeetingAgendaTitle_(row) {
  return _dashboardStrictTitleText_((row = row || {}).title);
}
function _dashboardThaiDateText_(value) {
  return _appThaiDateText_(value);
}
function _dashboardNum_(value) {
  var n = Number(String(value == null ? 0 : value).replace(/,/g, ""));
  return isFinite(n) ? n : 0;
}
function _dashboardDate_(value) {
  return _caseDateOnlyPhaseD2_(value);
}
function _routerDashboardProjectedFields_(sheetName) {
  var map;
  return (
    {
      MainData: [
        "caseId",
        "id",
        "caseNum",
        "recNo",
        "title",
        "caseTitle",
        "petitioners",
        "petitionerName",
        "cat",
        "subCat",
        "issue",
        "topic",
        "subject",
        "status",
        "caseStatus",
        "processStatus",
        "resultStatus",
        "currentStatus",
        "statusText",
        "caseState",
        "workflowStatus",
        "meetingStatus",
        "caseType",
        "type",
        "category",
        "caseCategory",
        "subjectType",
        "topicName",
        "considerIssue",
        "caseIssue",
        "caseSubject",
        "สถานะเรื่อง",
        "สถานะเรื่องพิจารณา",
        "สถานะ",
        "สถานะพิจารณา",
        "สถานะปัจจุบัน",
        "ผลการพิจารณา",
        "สถานะการพิจารณา",
        "ประเภทเรื่อง",
        "ประเภท",
        "ประเด็นพิจารณา",
        "ประเด็น",
        "updatedAt",
        "createdAt",
        "isDeleted",
        "deletedAt",
      ],
      Letters: [
        "letterId",
        "caseId",
        "letterNo",
        "bookNo",
        "letterDate",
        "subject",
        "issue",
        "dueDate",
        "extendDate",
        "letterStatus",
        "status",
        "trackStatus",
        "updatedAt",
        "createdAt",
        "isDeleted",
        "deletedAt",
      ],
      CommitteeMeetings: [
        "meetingId",
        "id",
        "meetingNo",
        "meetingNumber",
        "no",
        "roundNo",
        "ครั้งที่",
        "ครั้งประชุม",
        "การประชุมครั้งที่",
        "meetingDate",
        "date",
        "วันที่ประชุม",
        "วันประชุม",
        "title",
        "หัวข้อ",
        "เรื่อง",
        "status",
        "สถานะ",
        "note",
        "หมายเหตุ",
        "createdAt",
        "updatedAt",
        "isDeleted",
        "deletedAt",
      ],
      CommitteeMeetingAgendaItems: [
        "itemId",
        "id",
        "meetingId",
        "agendaNo",
        "agenda",
        "วาระ",
        "title",
        "caseTitle",
        "ชื่อเรื่อง",
        "เรื่อง",
        "เรื่องพิจารณา",
        "caseId",
        "agencyOrPresenter",
        "หน่วยงาน",
        "ผู้เสนอ",
        "result",
        "ผลการประชุม",
        "มติ",
        "note",
        "หมายเหตุ",
        "createdAt",
        "updatedAt",
        "isDeleted",
        "deletedAt",
      ],
    }[_s_(sheetName)] || []
  ).slice();
}
function _dashboardSafeRows_(sheetName, options) {
  ((options = options || {}), (sheetName = _s_(sheetName).trim()));
  var ttl = Math.max(15, Math.min(Number(options.ttl || 60) || 60, 300)),
    errors = [];
  function note(label, err) {
    var msg =
      label +
      ": " +
      String(err && err.message ? err.message : err || "unknown");
    errors.push(msg);
    try {
      _c30W_("dashboard.cg.projected." + label + "." + sheetName, err);
    } catch (_e) {
      _appIsFnName_("_recordWarning_")
        ? _recordWarning_("ec", _e)
        : _appIsFnName_("_logWarn_") &&
          _logWarn_("ec", { error: String((_e && _e.message) || _e) });
    }
  }
  var clean = __Code_20_Router_clean;
  function __Code_20_Router_clean(list) {
    return (list = _c30A_(list) ? list : []).filter(function (row) {
      return (
        row &&
        !(typeof isSoftDeletedRow_ == "function"
          ? isSoftDeletedRow_(row)
          : row.isDeleted === !0 ||
            _s_(row.isDeleted).toLowerCase() === "true" ||
            row.deletedAt)
      );
    });
  }
  function done(list) {
    return clean(list);
  }
  try {
    if (_appIsFnName_("_dashboardRowsCached_")) {
      var rows = done(_dashboardRowsCached_(sheetName, null) || []);
      if (rows.length) return rows;
    }
  } catch (_dashRowsErr) {
    note("rowsCached", _dashRowsErr);
  }
  try {
    if (sheetName === "MainData" && _appIsFnName_("_listMainDataRows_")) {
      var caseRows = done(_listMainDataRows_(!1) || []);
      if (caseRows.length) return caseRows;
    }
    if (sheetName === "Letters" && _appIsFnName_("_trackingReadLettersRows_")) {
      var letterRows = done(_trackingReadLettersRows_() || []);
      if (letterRows.length) return letterRows;
    }
  } catch (_domainRowsErr) {
    note("domainProjectedRows", _domainRowsErr);
  }
  try {
    if (typeof readSheetProjectedObjectsCached_ == "function") {
      var fields = _routerDashboardProjectedFields_(sheetName);
      if (fields && fields.length) {
        var projectedRows = done(
          readSheetProjectedObjectsCached_(sheetName, fields, {
            includeDeleted: !1,
            requireCanonical: !1,
            ttl,
          }) || [],
        );
        if (projectedRows.length) return projectedRows;
      }
    }
  } catch (_projectedErr) {
    note("projectedReader", _projectedErr);
  }
  if (errors.length && options.failOnError === !0)
    throw new Error(
      "DASHBOARD_PROJECTED_ROWS_FAILED: " +
        sheetName +
        ": " +
        errors.join(" | "),
    );
  return [];
}
function _dashboardRequestRows_(sheetName, options) {
  ((options = options || {}), (sheetName = _s_(sheetName).trim()));
  var cacheKey = JSON.stringify({
    sheetName,
    ttl: Math.max(15, Math.min(Number(options.ttl || 60) || 60, 300)),
    failOnError: options.failOnError === !0,
    allowEmpty: options.allowEmpty === !0,
  });
  try {
    if (_appIsFnName_("_requestScopeGet_")) {
      var hit = _requestScopeGet_("dashboardSafeRows", cacheKey);
      if (hit && _c30A_(hit.rows)) return hit.rows.slice();
    }
  } catch (_requestHitErr) {
    _c30W_("dashboard.requestRows.hit." + sheetName, _requestHitErr);
  }
  var started = Date.now(),
    rows = _dashboardSafeRows_(sheetName, options),
    entry = {
      rows: (rows = _c30A_(rows) ? rows : []).slice(),
      meta: {
        sheetName,
        rowsRead: rows.length,
        durationMs: Math.max(0, Date.now() - started),
        source: "dashboard-request-scope-current",
      },
    };
  try {
    _appIsFnName_("_requestScopePut_") &&
      _requestScopePut_("dashboardSafeRows", cacheKey, entry);
  } catch (_requestPutErr) {
    _c30W_("dashboard.requestRows.put." + sheetName, _requestPutErr);
  }
  return rows.slice();
}
function _dashboardNormalizeCaseStatusForCount_(status) {
  return _caseStatusNormalizePhaseD_(status, {
    defaultStatus: "เรื่องเข้าใหม่",
    strict: !0,
    warningKey: "dashboard.status.normalize",
  });
}
function _dashboardCaseStatusValue_(row) {
  if (!row) return "เรื่องเข้าใหม่";
  if (typeof row != "object" || _c30A_(row))
    return _dashboardNormalizeCaseStatusForCount_(row);
  try {
    if (_appIsFnName_("_dashboardPickCaseStatus_")) {
      var picked = _dashboardPickCaseStatus_(row);
      if (picked) return _dashboardNormalizeCaseStatusForCount_(picked);
    }
  } catch (_pickErr) {
    _appIsFnName_("_recordWarning_")
      ? _recordWarning_("ec", _pickErr)
      : _appIsFnName_("_logWarn_") &&
        _logWarn_("ec", {
          error: String((_pickErr && _pickErr.message) || _pickErr),
        });
  }
  for (
    var keys = [
        "สถานะเรื่อง",
        "สถานะเรื่องพิจารณา",
        "สถานะ",
        "สถานะพิจารณา",
        "สถานะปัจจุบัน",
        "ผลการพิจารณา",
        "สถานะการพิจารณา",
        "caseStatus",
        "status",
        "processStatus",
        "resultStatus",
        "currentStatus",
        "statusText",
        "caseState",
        "workflowStatus",
        "meetingStatus",
        "colStatus",
        "col10",
        "col11",
        "col12",
      ],
      i = 0;
    i < keys.length;
    i++
  ) {
    var value = row[keys[i]];
    if (value != null && String(value).trim())
      return _dashboardNormalizeCaseStatusForCount_(value);
  }
  return "เรื่องเข้าใหม่";
}
function _dashboardCaseStatusKey_(status) {
  var raw = _dashboardNormalizeCaseStatusForCount_(status),
    compact = _dashboardText_(raw).replace(/\s+/g, "");
  return !compact
    ? "s0"
    : /จัดทำรายงาน|รายงาน/.test(compact)
      ? "s7"
      : /ไม่รับเรื่อง|ไม่รับ/.test(compact)
        ? "s8"
        : /ยุติ|ปิดเรื่อง|เสร็จสิ้น|สำเร็จ/.test(compact)
          ? "s6"
          : /ส่ง.*หน่วยงาน|หน่วยงาน.*เกี่ยวข้อง|ติดตาม/.test(compact)
            ? "s5"
            : /(อนุฯ|อนุกรรมาธิการ|คณะอนุกรรมาธิการ)/.test(compact)
              ? "s2"
              : /(กมธ|กรรมาธิการ|คณะกรรมาธิการ)/.test(compact)
                ? "s4"
                : /รอ|รอบรรจุ|ค้างพิจารณา/.test(compact)
                  ? "s3"
                  : /เรื่องเข้าใหม่|ได้รับเรื่อง|เรื่องใหม่|รับเรื่อง|รับเข้า|^รับ$/.test(
                        compact,
                      )
                    ? "s0"
                    : "s0";
}
function _dashboardTopRows_(map, limit) {
  return Object.keys(map || {})
    .map(function (label) {
      return { label, count: _dashboardNum_(map[label]) };
    })
    .filter(function (x) {
      return x.count > 0;
    })
    .sort(function (a, b) {
      return (
        b.count - a.count || _s_(a.label).localeCompare(_s_(b.label), "th")
      );
    })
    .slice(0, Math.max(1, Number(limit || 10) || 10));
}
function _dashboardType_(row) {
  var raw = _dashboardText_(
    (row = row || {}).cat ||
      row.caseType ||
      row.type ||
      row.category ||
      row.caseCategory ||
      row.subjectType ||
      row.ประเภทเรื่อง ||
      row.ประเภท ||
      row.col2,
  );
  if (!raw) return "ไม่ระบุประเภท";
  var compact = raw.replace(/\s+/g, "");
  return /ร้องเรียน|ผู้ร้อง|ร้องทุกข์/.test(compact)
    ? "เรื่องร้องเรียน"
    : /ประธานสภา/.test(compact)
      ? "ประธานสภาผู้แทนราษฎรมอบหมาย"
      : /สภาผู้แทนราษฎร/.test(compact) && /มอบหมาย/.test(compact)
        ? "สภาผู้แทนราษฎรมอบหมาย"
        : /กรรมาธิการ/.test(compact) && /ญัตติ/.test(compact)
          ? "กรรมาธิการเสนอญัตติ"
          : raw;
}
function _dashboardTopic_(row) {
  var raw = _dashboardText_(
    (row = row || {}).subCat ||
      row.subCategory ||
      row.ประเด็นพิจารณา ||
      row.ประเด็น ||
      row.issue ||
      row.topic ||
      row.topicName ||
      row.considerIssue ||
      row.caseIssue ||
      row.col3 ||
      row.col7,
  );
  return raw
    ? raw.length > 70
      ? raw.substring(0, 70) + "\u2026"
      : raw
    : "ไม่ระบุประเด็น";
}
function _routerDashboardMeetingNoValue_(row) {
  var meetingNo = _dashboardText_((row = row || {}).meetingNo || "");
  return meetingNo
    ? (meetingNo = meetingNo
        .replace(/^\s*(ครั้งที่|ครั้งประชุม)\s*/, "")
        .replace(/\s+/g, " ")
        .trim())
    : "";
}
function _routerDashboardMeetingRoundKey_(row) {
  var meetingNo = _routerDashboardMeetingNoValue_(row);
  return meetingNo ? "meetingNo:" + meetingNo : "";
}
function _dashboardMeetingSessionKey_(row) {
  return _routerDashboardMeetingRoundKey_((row = row || {}));
}
function _dashboardMeetingTitleText_(row) {
  return _dashboardStrictTitleText_(
    (row = row || {}).title || row.caseTitle || row.subject || "",
  );
}
function _dashboardMeetingNoTitleSummary_(rows) {
  rows = _c30A_(rows) ? rows : [];
  var cutoff = new Date();
  (cutoff.setDate(cutoff.getDate() - 30), cutoff.setHours(0, 0, 0, 0));
  var sessionMap = {},
    recentSessionMap = {},
    titleCount = 0;
  rows.forEach(function (row) {
    var sessionKey = _dashboardMeetingSessionKey_((row = row || {}));
    sessionKey && (sessionMap[sessionKey] = !0);
    var d = _dashboardDate_(
      row.meetingDate ||
        row.date ||
        row.วันที่ประชุม ||
        row.updatedAt ||
        row.createdAt,
    );
    (d && d >= cutoff && sessionKey && (recentSessionMap[sessionKey] = !0),
      _dashboardMeetingTitleText_(row) && titleCount++);
  });
  var totalMeetings = Object.keys(sessionMap).length,
    recent = Object.keys(recentSessionMap).length;
  return {
    total: totalMeetings,
    totalMeetings,
    meetingCount: totalMeetings,
    recent,
    recentMeetings: recent,
    totalItems: titleCount,
    itemTotal: titleCount,
    totalCasesDiscussed: titleCount,
    subjectCount: titleCount,
    byResult: [],
    generatedAt: new Date().toISOString(),
    source: "dashboard-current-meetingNo-title-strict",
  };
}
function _dashboardCommitteeMeetingDashboard_(payload) {
  payload = payload || {};
  var ttl = payload.forceFresh === !0 ? 0 : payload.cacheTtlSeconds || 60,
    includeRows = payload.includeMeetingRows === !0,
    meetings = _dashboardRequestRows_("CommitteeMeetings", {
      ttl,
      failOnError: !1,
      allowEmpty: !0,
    }).filter(function (row) {
      return !(
        row &&
        (row.isDeleted === !0 || _s_(row.isDeleted).toLowerCase() === "true")
      );
    }),
    meetingMap = {};
  includeRows &&
    meetings.forEach(function (meeting) {
      ((meeting = meeting || {}),
        (meetingMap[_s_(meeting.meetingId)] = meeting));
    });
  var rows = [],
    itemCount = 0;
  _dashboardRequestRows_("CommitteeMeetingAgendaItems", {
    ttl,
    failOnError: !1,
    allowEmpty: !0,
  }).forEach(function (item) {
    if (
      (item = item || {}).isDeleted !== !0 &&
      _s_(item.isDeleted).toLowerCase() !== "true" &&
      !item.deletedAt
    ) {
      var title = _dashboardMeetingAgendaTitle_(item);
      if (title && (itemCount++, includeRows)) {
        var meeting = meetingMap[_s_(item.meetingId)] || {};
        rows.push({
          meetingId: _s_(item.meetingId),
          meetingNo: _dashboardText_(meeting.meetingNo || ""),
          meetingDate: _dashboardThaiDateText_(meeting.meetingDate || ""),
          title,
          agencyOrPresenter: _dashboardText_(item.agencyOrPresenter || ""),
          agendaNo: _dashboardText_(item.agendaNo || item.agenda || ""),
          source: "CommitteeMeetingAgendaItems.title.nonblank",
        });
      }
    }
  });
  var summary = _dashboardMeetingNoTitleSummary_(meetings);
  return (
    (summary.totalItems = itemCount),
    (summary.itemTotal = itemCount),
    (summary.totalCasesDiscussed = itemCount),
    (summary.subjectCount = itemCount),
    (summary.source =
      "dashboard-committee-meetingNo-title-nonblank-strict-current"),
    (summary.meetingItemSource = "CommitteeMeetingAgendaItems.title.nonblank"),
    { rows, meetingRows: includeRows ? meetings : [], summary }
  );
}
function _dashboardLetterDateOnly_(value) {
  if (!value && value !== 0) return null;
  try {
    if (value instanceof Date) {
      var direct = new Date(
        value.getFullYear(),
        value.getMonth(),
        value.getDate(),
      );
      return (direct.setHours(0, 0, 0, 0), direct);
    }
    var text = _c30S_(value)
      .replace(/[\u200B-\u200D\uFEFF]/g, "")
      .trim();
    if (!text) return null;
    var m = text.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    if (m) {
      var y = Number(m[1]);
      y > 2400 && (y -= 543);
      var d1 = new Date(y, Number(m[2]) - 1, Number(m[3]));
      if (!isNaN(d1.getTime())) return (d1.setHours(0, 0, 0, 0), d1);
    }
    if ((m = text.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})$/))) {
      var yy = Number(m[3]);
      (yy < 100 && (yy += 2500), yy > 2400 && (yy -= 543));
      var d2 = new Date(yy, Number(m[2]) - 1, Number(m[1]));
      if (!isNaN(d2.getTime())) return (d2.setHours(0, 0, 0, 0), d2);
    }
    var d = new Date(text);
    return isNaN(d.getTime())
      ? null
      : (d.getFullYear() > 2400 &&
          (d = new Date(d.getFullYear() - 543, d.getMonth(), d.getDate())),
        d.setHours(0, 0, 0, 0),
        d);
  } catch (_dateErr) {
    return (_c30W_("dashboard.letter.dateOnly", _dateErr), null);
  }
}
function _dashboardLetterIsReceived_(status) {
  var st = _dashboardText_(status).replace(/\s+/g, "");
  return /ได้รับแล้ว|ได้รับตอบกลับแล้ว|ตอบกลับแล้ว|ตอบแล้ว|เสร็จสิ้น|เสร็จ|รายงานแล้ว/.test(
    st,
  );
}
function _dashboardLetterSummary_(rows) {
  rows = _c30A_(rows) ? rows : [];
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  var out = {
    total: rows.length,
    notDue: 0,
    overdue: 0,
    received: 0,
    soonDue: 0,
  };
  return (
    rows.forEach(function (row) {
      var status;
      if (
        _dashboardLetterIsReceived_(
          (row = row || {}).letterStatus ||
            row.status ||
            row.trackStatus ||
            row.สถานะ ||
            row.สถานะหนังสือ ||
            "",
        )
      )
        return (out.received++, void 0);
      var due = _dashboardLetterDateOnly_(
        row.extendDate ||
          row.ขยายเวลา ||
          row.วันที่ขยายเวลา ||
          row.dueDate ||
          row.วันครบกำหนดตอบ ||
          row.ครบกำหนด ||
          row.กำหนดตอบ ||
          row.วันครบกำหนด,
      );
      if (!due) return (out.notDue++, void 0);
      var diff = Math.round((due.getTime() - today.getTime()) / 864e5);
      if (diff <= 0) return (out.overdue++, void 0);
      (diff <= 7 && out.soonDue++, out.notDue++);
    }),
    out
  );
}
function _dashboardStatsDirect_(payload) {
  payload = payload || {};
  var fastFirstPaint =
      payload.phase1FirstPaint === !0 ||
      /first-paint|fast-summary|summary-kpi/i.test(
        _s_(payload.hotPathMode || payload.mode || ""),
      ),
    skipHeavyFirstPaint =
      fastFirstPaint &&
      payload.includeLetters !== !0 &&
      payload.includeMeetingRows !== !0 &&
      String(
        _appIsFnName_("_scriptProp_")
          ? _scriptProp_("DASHBOARD_FAST_FIRST_PAINT_SKIP_HEAVY", "Y")
          : "Y",
      ).toUpperCase() !== "N",
    caseRows = _dashboardRequestRows_("MainData", {
      ttl: payload.cacheTtlSeconds || 60,
      failOnError: !0,
      allowEmpty: !0,
    }),
    letterRows = skipHeavyFirstPaint
      ? []
      : _dashboardRequestRows_("Letters", {
          ttl: payload.cacheTtlSeconds || 60,
          failOnError: !0,
          allowEmpty: !0,
        }),
    committeeMeetingDashboard = skipHeavyFirstPaint
      ? { rows: [], meetingRows: [], summary: _dashboardMeetingNoTitleSummary_([]) }
      : _dashboardCommitteeMeetingDashboard_(payload || {}),
    meetingRows = _c30A_(committeeMeetingDashboard.rows)
      ? committeeMeetingDashboard.rows
      : [],
    meetingNoRows = _c30A_(committeeMeetingDashboard.meetingRows)
      ? committeeMeetingDashboard.meetingRows
      : [],
    stats = _dashboardEmptyStatsPayload_("dashboard-direct-current");
  ((stats.degraded = !1),
    (stats.errorCode = ""),
    (stats.total = caseRows.length));
  var statusReadModel = _dashboardStatusReadModelPhaseF_(caseRows),
    typeMap = {},
    topicMap = {};
  Object.keys(statusReadModel.counts || {}).forEach(function (key) {
    stats[key] = _dashboardNum_(statusReadModel.counts[key]);
  });
  (caseRows.forEach(function (row) {
    row = row || {};
    var typeName = _dashboardType_(row),
      topic = _dashboardTopic_(row);
    ((typeMap[typeName] = (typeMap[typeName] || 0) + 1),
      (topicMap[topic] = (topicMap[topic] || 0) + 1));
  }),
    (stats.byType = _dashboardTopRows_(typeMap, 20)),
    (stats.byTopic = _dashboardTopRows_(topicMap, 10)),
    (stats.statusRows = statusReadModel.statusRows),
    (stats.statusCountStamp = statusReadModel.statusCountStamp),
    (stats.dashboardStatusCountStamp =
      statusReadModel.dashboardStatusCountStamp),
    (stats.statusReadModelStamp = PHASEF_DASHBOARD_STATUS_READ_MODEL_STAMP),
    (stats.dashboardStatusReadModelStamp =
      PHASEF_DASHBOARD_STATUS_READ_MODEL_STAMP),
    (stats.statusDefaultBlankToS0 = !0),
    (stats.statusRowsTotal = statusReadModel.statusRowsTotal),
    (stats.sourceRowCount = statusReadModel.sourceRowCount),
    (stats.statusSourceRowCount = statusReadModel.sourceRowCount),
    (stats.statusUnknownCount = statusReadModel.unknownStatus),
    (stats.statusReadModel = statusReadModel),
    (stats.completed =
      _dashboardNum_(stats.s6) +
      _dashboardNum_(stats.s7) +
      _dashboardNum_(stats.s8)),
    (stats.pending = Math.max(stats.total - stats.completed, 0)),
    (stats.letters = _dashboardLetterSummary_(letterRows)),
    (stats.overdueLetters = _dashboardNum_(stats.letters.overdue)),
    (stats.soonOverdue = _dashboardNum_(stats.letters.soonDue)),
    (stats.meetings =
      committeeMeetingDashboard.summary ||
      _dashboardMeetingNoTitleSummary_(meetingNoRows)),
    (stats.meetings.totalItems = _dashboardNum_(
      stats.meetings.totalItems ||
        stats.meetings.itemTotal ||
        meetingRows.length,
    )),
    (stats.meetings.itemTotal = stats.meetings.totalItems),
    (stats.meetings.totalCasesDiscussed = stats.meetings.totalItems),
    (stats.meetings.subjectCount = stats.meetings.totalItems),
    (stats.meetings.totalMeetings = _dashboardNum_(
      stats.meetings.totalMeetings || stats.meetings.total || 0,
    )),
    (stats.meetings.meetingCount = stats.meetings.totalMeetings),
    (stats.meetings.total = stats.meetings.totalMeetings),
    (stats.meetings.recentMeetings = _dashboardNum_(
      stats.meetings.recentMeetings || stats.meetings.recent || 0,
    )),
    (stats.meetings.recent = stats.meetings.recentMeetings),
    (stats.meetings.source =
      "dashboard-current-CommitteeMeetings-meetingNo-title-nonblank-only"),
    (stats.meetings.strictKpi = !0),
    (stats.meetings.archivedDirectRead = !1),
    (stats.totalMeetings = _dashboardNum_(stats.meetings.totalMeetings)),
    (stats.recentMeetings = _dashboardNum_(
      stats.meetings.recentMeetings || stats.meetings.recent,
    )),
    (stats.meetingItemTotal = _dashboardNum_(
      stats.meetings.totalItems ||
        stats.meetings.itemTotal ||
        stats.meetings.totalCasesDiscussed ||
        stats.meetings.subjectCount,
    )));
  var includeCaseRowsForDashboard = payload.includeCases === !0,
    includeMeetingRowsForDashboard = payload.includeMeetingRows === !0;
  ((stats.caseRows = includeCaseRowsForDashboard
    ? caseRows.slice(
        0,
        Math.max(1, Math.min(Number(payload.caseLimit || 30) || 30, 120)),
      )
    : []),
    (stats.letterRows =
      payload.includeLetters === !0 ? letterRows.slice(0, 100) : []),
    (stats.meetingRows = includeMeetingRowsForDashboard
      ? meetingRows.slice(0, 100)
      : []),
    (stats.meetingNoRows = includeMeetingRowsForDashboard
      ? meetingNoRows.slice(0, 100)
      : []),
    (stats.generatedAt = new Date().toISOString()));
  var requestMetrics =
    typeof getRequestScopeMetrics_ == "function"
      ? getRequestScopeMetrics_()
      : {};
  return (
    (stats.meta = {
      generatedAt: stats.generatedAt,
      source: "dashboard-current-strict-kpi-direct",
      dashboardKpiStrict: !0,
      statusReadModelStamp: PHASEF_DASHBOARD_STATUS_READ_MODEL_STAMP,
      statusCountStamp: _dashboardStatusCountStamp_(),
      statusSourceRowCount: stats.sourceRowCount,
      statusRowsTotal: stats.statusRowsTotal,
      performanceMode:
        payload && payload.phase1FirstPaint
          ? "phase1-summary-kpi-first-paint"
          : "phase5-summary-kpi-first-paint",
      meetingSource: "CommitteeMeetings.meetingNo",
      meetingItemSource: "CommitteeMeetingAgendaItems.title.nonblank-strict",
      archivedMeetingLogsDirectRead: !1,
      cases: caseRows.length,
      letters: letterRows.length,
      meetings: meetingNoRows.length,
      meetingItems: meetingRows.length,
      caseRowsIncluded: includeCaseRowsForDashboard,
      meetingRowsIncluded: includeMeetingRowsForDashboard,
      fastFirstPaintSkippedHeavySheets: !!skipHeavyFirstPaint,
      cacheHit: !(!requestMetrics || !requestMetrics.cacheHit),
      cacheHits: Number((requestMetrics && requestMetrics.cacheHits) || 0),
      cacheMisses: Number((requestMetrics && requestMetrics.cacheMisses) || 0),
      rowsRead: Number((requestMetrics && requestMetrics.rowsRead) || 0),
      cacheKinds: (requestMetrics && requestMetrics.cacheKinds) || {},
    }),
    (stats.source = "dashboard-current-strict-kpi-direct"),
    stats
  );
}
function _dashboardStats_(payload) {
  return _dashboardStatsDirect_(payload || {});
}
function _dashboardCanonicalBundleDto_(stats, budgetData, caseData, cacheMeta) {
  ((budgetData = budgetData || {}),
    (caseData = caseData || {
      rows: [],
      totalRecords: 0,
      totalPages: 1,
      page: 1,
      limit: 0,
    }),
    (cacheMeta = cacheMeta || {}));
  var statsMeetingSummary =
      (stats = stats || {}).meetings && typeof stats.meetings == "object"
        ? stats.meetings
        : {},
    strictMeetingRows =
      _c30A_(stats.meetingNoRows) && stats.meetingNoRows.length
        ? stats.meetingNoRows
        : _c30A_(stats.meetingRows)
          ? stats.meetingRows
          : [],
    strictMeetingSummary = strictMeetingRows.length
      ? _dashboardMeetingNoTitleSummary_(strictMeetingRows)
      : {
          total: _dashboardNum_(
            statsMeetingSummary.totalMeetings ||
              statsMeetingSummary.meetingCount ||
              statsMeetingSummary.total ||
              stats.totalMeetings,
          ),
          totalMeetings: _dashboardNum_(
            statsMeetingSummary.totalMeetings ||
              statsMeetingSummary.meetingCount ||
              statsMeetingSummary.total ||
              stats.totalMeetings,
          ),
          meetingCount: _dashboardNum_(
            statsMeetingSummary.totalMeetings ||
              statsMeetingSummary.meetingCount ||
              statsMeetingSummary.total ||
              stats.totalMeetings,
          ),
          recent: _dashboardNum_(
            statsMeetingSummary.recentMeetings ||
              statsMeetingSummary.recent ||
              stats.recentMeetings,
          ),
          recentMeetings: _dashboardNum_(
            statsMeetingSummary.recentMeetings ||
              statsMeetingSummary.recent ||
              stats.recentMeetings,
          ),
        },
    strictAgendaItemTotal = _dashboardNum_(
      stats.meetingItemTotal ||
        statsMeetingSummary.totalItems ||
        statsMeetingSummary.itemTotal ||
        statsMeetingSummary.totalCasesDiscussed ||
        statsMeetingSummary.subjectCount,
    );
  stats.meetings &&
    stats.meetings.strictKpi === !0 &&
    (strictAgendaItemTotal = _dashboardNum_(
      stats.meetings.totalItems ||
        stats.meetings.itemTotal ||
        stats.meetingItemTotal ||
        strictAgendaItemTotal,
    ));
  var summary = {
      totalCases: Number(stats.total || 0),
      pendingCases: Number(stats.pending || 0),
      completedCases: Number(stats.completed || 0),
      overdueLetters: Number(stats.overdueLetters || 0),
      soonOverdue: Number(stats.soonOverdue || 0),
      totalMeetings: Number(
        strictMeetingSummary.totalMeetings ||
          strictMeetingSummary.meetingCount ||
          strictMeetingSummary.total ||
          0,
      ),
      recentMeetings: Number(
        strictMeetingSummary.recentMeetings || strictMeetingSummary.recent || 0,
      ),
      meetingItemTotal: Number(strictAgendaItemTotal || 0),
    },
    canonicalMeetingStats = _c30O_(
      {
        total: summary.totalMeetings,
        totalMeetings: summary.totalMeetings,
        meetingCount: summary.totalMeetings,
        recent: summary.recentMeetings,
        recentMeetings: summary.recentMeetings,
        totalItems: summary.meetingItemTotal,
        itemTotal: summary.meetingItemTotal,
        totalCasesDiscussed: summary.meetingItemTotal,
        byResult: [],
      },
      stats.meetings || {},
    );
  ((canonicalMeetingStats.total = summary.totalMeetings),
    (canonicalMeetingStats.totalMeetings = summary.totalMeetings),
    (canonicalMeetingStats.meetingCount = summary.totalMeetings),
    (canonicalMeetingStats.recent = summary.recentMeetings),
    (canonicalMeetingStats.recentMeetings = summary.recentMeetings),
    (canonicalMeetingStats.totalItems = summary.meetingItemTotal),
    (canonicalMeetingStats.itemTotal = summary.meetingItemTotal),
    (canonicalMeetingStats.totalCasesDiscussed = summary.meetingItemTotal),
    (canonicalMeetingStats.meetingRows = _c30A_(stats.meetingRows)
      ? stats.meetingRows.slice(0, 500)
      : []),
    (canonicalMeetingStats.meetingNoRows = _c30A_(stats.meetingNoRows)
      ? stats.meetingNoRows.slice(0, 500)
      : []));
  var dto = {
    contractStamp: "dashboard-canonical-dto-production-current",
    summary,
    caseStats: {
      total: summary.totalCases,
      pending: summary.pendingCases,
      completed: summary.completedCases,
      statusRows: _c30A_(stats.statusRows) ? stats.statusRows : [],
      statusReadModelStamp:
        stats.statusReadModelStamp || PHASEF_DASHBOARD_STATUS_READ_MODEL_STAMP,
      statusCountStamp: stats.statusCountStamp || _dashboardStatusCountStamp_(),
      sourceRowCount: Number(
        stats.sourceRowCount ||
          stats.statusSourceRowCount ||
          summary.totalCases ||
          0,
      ),
      statusRowsTotal: Number(stats.statusRowsTotal || 0),
      rows: _c30A_(caseData.rows) ? caseData.rows : [],
      totalRecords: Number(caseData.totalRecords || summary.totalCases || 0),
      page: Number(caseData.page || 1),
      limit: Number(caseData.limit || 0),
    },
    typeStats: _c30A_(stats.byType) ? stats.byType : [],
    issueStats: _c30A_(stats.byTopic) ? stats.byTopic : [],
    trackingStats: stats.letters || {
      total: 0,
      notDue: 0,
      overdue: 0,
      received: 0,
      soonDue: 0,
    },
    meetingStats: canonicalMeetingStats,
    budgetStats: budgetData,
    charts: {
      byStatus: _c30A_(stats.statusRows) ? stats.statusRows : [],
      byType: _c30A_(stats.byType) ? stats.byType : [],
      byIssue: _c30A_(stats.byTopic) ? stats.byTopic : [],
      byMeetingResult: [],
    },
    meta: _c30O_({}, stats.meta || {}, cacheMeta || {}, {
      generatedAt: new Date().toISOString(),
      source:
        (stats.meta && stats.meta.source) ||
        "dashboard-canonical-dto-production-current",
      statusReadModelStamp:
        stats.statusReadModelStamp || PHASEF_DASHBOARD_STATUS_READ_MODEL_STAMP,
      statusCountStamp: stats.statusCountStamp || _dashboardStatusCountStamp_(),
      statusSourceRowCount: Number(
        stats.sourceRowCount ||
          stats.statusSourceRowCount ||
          summary.totalCases ||
          0,
      ),
      noSilentEmpty: !0,
    }),
  };
  return (
    (dto.errorState = dto.meta.errorCode
      ? { code: dto.meta.errorCode, message: dto.meta.message || "" }
      : null),
    dto
  );
}
function _dashboardBundleTtlSeconds_(payload) {
  var defaultTtl = _appIsFnName_("_appCacheTtl_")
    ? _appCacheTtl_("dashboardBundle", 240, 15, 300)
    : 240;
  return Math.max(
    15,
    Math.min(
      Number((payload && payload.cacheTtlSeconds) || defaultTtl) || defaultTtl,
      300,
    ),
  );
}
function _dashboardBuildSubBundles_(payload, stats, budget, cacheTtlSeconds) {
  payload = payload || {};
  var includeCases = payload.includeCases === !0,
    includeMeetingRows = payload.includeMeetingRows === !0,
    scopedCaseLimit = includeCases
      ? Math.max(10, Math.min(Number(payload.caseLimit || 30) || 30, 120))
      : 0,
    caseRows = includeCases
      ? _c30A_(stats.caseRows)
        ? stats.caseRows.slice(0, scopedCaseLimit)
        : _dashboardRequestRows_("MainData", {
            ttl: cacheTtlSeconds,
            failOnError: !0,
            allowEmpty: !0,
          }).slice(0, scopedCaseLimit)
      : [],
    budgetData = budget && budget.data ? budget.data : budget || {};
  return {
    caseData: {
      rows: caseRows,
      totalRecords: Number(stats.total || caseRows.length || 0),
      totalPages: 1,
      page: 1,
      limit: scopedCaseLimit,
    },
    caseRows,
    budgetData,
    includeCases,
    includeMeetingRows,
  };
}
function _dashboardPayloadStats_(stats, subBundles) {
  if (
    ((stats = stats || {}),
    (subBundles = subBundles || {}),
    subBundles.includeCases !== !1 && subBundles.includeMeetingRows !== !1)
  )
    return stats;
  var slim = _c30O_({}, stats);
  return (
    subBundles.includeCases === !1 &&
      ((slim.caseRows = []), (slim.letterRows = [])),
    subBundles.includeMeetingRows === !1 &&
      ((slim.meetingRows = []), (slim.meetingNoRows = [])),
    (slim.meta = _c30O_({}, stats.meta || {}, {
      dashboardFastFirstPaint: !0,
      caseRowsOmitted: subBundles.includeCases === !1,
      letterRowsOmitted: subBundles.includeCases === !1,
      meetingRowsOmitted: subBundles.includeMeetingRows === !1,
      rowPayloadMode: "summary-kpi-payload-phase5",
      routerFacadeOnly: !0,
    })),
    slim
  );
}
function _dashboardBundleMeta_(startedAt, cacheKey, source) {
  var bundleMetrics =
    typeof getRequestScopeMetrics_ == "function"
      ? getRequestScopeMetrics_()
      : {};
  return {
    cached: !1,
    cacheStatus: "miss",
    cacheHit: !(!bundleMetrics || !bundleMetrics.cacheHit),
    cacheHits: Number((bundleMetrics && bundleMetrics.cacheHits) || 0),
    cacheMisses: Number((bundleMetrics && bundleMetrics.cacheMisses) || 0),
    rowsRead: Number((bundleMetrics && bundleMetrics.rowsRead) || 0),
    durationMs: Math.max(0, Date.now() - startedAt),
    cacheKey,
    source: source || "dashboard-bundle-request-scope-current",
  };
}
function _dashboardBuildBundlePayload_(
  stats,
  subBundles,
  bundleMeta,
  cacheKey,
) {
  subBundles = subBundles || {};
  var caseRows = _c30A_(subBundles.caseRows) ? subBundles.caseRows : [],
    caseData = subBundles.caseData || { rows: caseRows },
    budgetData = subBundles.budgetData || {},
    payloadStats = _dashboardPayloadStats_(stats, subBundles),
    dashboardDto = _dashboardCanonicalBundleDto_(
      payloadStats,
      budgetData,
      caseData,
      bundleMeta,
    );
  return {
    dashboardDto,
    contractStamp: dashboardDto.contractStamp,
    caseStats: dashboardDto.caseStats,
    typeStats: dashboardDto.typeStats,
    issueStats: dashboardDto.issueStats,
    trackingStats: dashboardDto.trackingStats,
    meetingStats: dashboardDto.meetingStats,
    charts: dashboardDto.charts,
    stats: payloadStats,
    summaryStats: payloadStats,
    budget: budgetData,
    budgetStats: budgetData,
    cases: caseData,
    rows: caseRows,
    letters: payloadStats.letters || {},
    meetings: payloadStats.meetings || {},
    meetingSummary: payloadStats.meetings || {},
    meetingRows: _c30A_(payloadStats.meetingRows)
      ? payloadStats.meetingRows
      : [],
    meetingNoRows: _c30A_(payloadStats.meetingNoRows)
      ? payloadStats.meetingNoRows
      : [],
    summary: {
      totalCases: Number(payloadStats.total || 0),
      pendingCases: Number(payloadStats.pending || 0),
      completedCases: Number(payloadStats.completed || 0),
      overdueLetters: Number(payloadStats.overdueLetters || 0),
      soonOverdue: Number(payloadStats.soonOverdue || 0),
      totalMeetings: Number(
        (dashboardDto.summary && dashboardDto.summary.totalMeetings) || 0,
      ),
      recentMeetings: Number(
        (dashboardDto.summary && dashboardDto.summary.recentMeetings) || 0,
      ),
      meetingItemTotal: Number(
        (dashboardDto.summary && dashboardDto.summary.meetingItemTotal) || 0,
      ),
    },
    quickCounts: {
      total: Number(payloadStats.total || 0),
      byStatus: payloadStats.statusRows || [],
      byType: payloadStats.byType || [],
      byTopic: payloadStats.byTopic || [],
      generatedAt: new Date().toISOString(),
    },
    generatedAt: new Date().toISOString(),
    meta: _c30O_({}, payloadStats.meta || {}, bundleMeta),
    cached: !1,
    cacheStatus: "miss",
    cacheKey,
  };
}
function _dashboardBundleErrorCodeDASH2_(err, stage) {
  var msg = String(
      (err && (err.error || err.message || err.msg)) || err || "",
    ).toLowerCase(),
    st = String(stage || "dashboard").toLowerCase();
  return /ไม่พบ\s*token|missing[-\s_]*token|no\s*token|token\s*การใช้งาน/.test(
    msg,
  )
    ? "DASHBOARD_AUTH_MISSING"
    : /session\s*หมดอายุ|expired[-\s_]*session|session\s*expired|invalid\s*session|หมดอายุ/.test(
          msg,
        )
      ? "DASHBOARD_SESSION_EXPIRED"
      : /สิทธิ์ไม่เพียงพอ|permission|forbidden|unauthori[sz]ed|access\s*denied/.test(
            msg,
          )
        ? "DASHBOARD_PERMISSION_DENIED"
        : /cache/.test(st) || /cache/.test(msg)
          ? "DASHBOARD_CACHE_READ_FAILED"
          : /budget/.test(st)
            ? "DASHBOARD_BUDGET_READ_FAILED"
            : /sheet|spreadsheet|range|readsheet|ชีต|แผ่นงาน|ไม่พบชีต|rows|row/.test(
                  msg,
                ) || /stats|case|letter|meeting|subbundle/.test(st)
              ? "DASHBOARD_SHEET_READ_FAILED"
              : /dto|normalize|bundle|build/.test(st)
                ? "DASHBOARD_BUNDLE_BUILD_FAILED"
                : "DASHBOARD_BUNDLE_FAILED";
}
function _dashboardBundleErrorMessageDASH2_(code, err) {
  var raw = String(
    (err && (err.message || err.error || err.msg)) || err || "",
  ).trim();
  return code === "DASHBOARD_AUTH_MISSING"
    ? "Dashboard โหลดข้อมูลไม่สำเร็จ: ไม่พบ token การใช้งาน"
    : code === "DASHBOARD_SESSION_EXPIRED"
      ? "Dashboard โหลดข้อมูลไม่สำเร็จ: session หมดอายุ กรุณาเข้าสู่ระบบใหม่"
      : code === "DASHBOARD_PERMISSION_DENIED"
        ? "Dashboard โหลดข้อมูลไม่สำเร็จ: สิทธิ์ไม่เพียงพอ"
        : code === "DASHBOARD_CACHE_READ_FAILED"
          ? "Dashboard โหลดข้อมูลต่อจาก cache ไม่สำเร็จ ระบบจะโหลดข้อมูลใหม่"
          : code === "DASHBOARD_BUDGET_READ_FAILED"
            ? "Dashboard โหลดข้อมูลงบประมาณไม่สำเร็จ"
            : code === "DASHBOARD_SHEET_READ_FAILED"
              ? "Dashboard อ่านข้อมูลจากชีตไม่สำเร็จ"
              : code === "DASHBOARD_BUNDLE_BUILD_FAILED"
                ? "Dashboard สร้างชุดข้อมูลไม่สำเร็จ"
                : raw || "Dashboard โหลดข้อมูลไม่สำเร็จ";
}
function _dashboardBundleFailDASH2_(payload, code, err, stage, extra) {
  var now = new Date().toISOString(),
    message = _dashboardBundleErrorMessageDASH2_(code, err),
    stats = _dashboardEmptyStatsPayload_(
      "dash2-" + String(code || "dashboard").toLowerCase(),
    );
  stats.meta = _c30O_(
    {},
    stats.meta || {},
    {
      degraded: !0,
      dashboardErrorCode: code,
      errorCode: code,
      errorStage: String(stage || "dashboard"),
      message,
      generatedAt: now,
      owner: "DASH-2:dashboard-error-code",
    },
    extra || {},
  );
  var data = {
    stats,
    summaryStats: stats,
    budget: _dashboardEmptyBudgetPayload_(
      "dash2-" + String(code || "dashboard").toLowerCase(),
    ),
    budgetStats: _dashboardEmptyBudgetPayload_(
      "dash2-" + String(code || "dashboard").toLowerCase(),
    ),
    cases: { rows: [] },
    rows: [],
    meetings: {},
    meetingSummary: {},
    generatedAt: now,
    meta: _c30O_(
      {
        degraded: !0,
        dashboardErrorCode: code,
        errorCode: code,
        errorStage: String(stage || "dashboard"),
        message,
        generatedAt: now,
        owner: "DASH-2:dashboard-error-code",
      },
      extra || {},
    ),
  };
  ((data.dashboardDto = _dashboardCanonicalBundleDto_(
    stats,
    data.budgetStats,
    data.cases,
    data.meta,
  )),
    (data.dashboardDto.meta = _c30O_(
      {},
      data.dashboardDto.meta || {},
      data.meta || {},
    )));
  var out = err_(message, data);
  return (
    (out.errorCode = code),
    (out.dashboardErrorCode = code),
    (out.errorStage = String(stage || "dashboard")),
    (out.requestId = _s_(payload && payload.requestId)),
    out
  );
}
function _dashboardBundleWarnDASH2_(label, err, meta) {
  try {
    _appIsFnName_("_logApiFailure_") && _logApiFailure_(label, err, meta || {});
  } catch (_dash2LogErr) {
    try {
      _c30W_("dashboard.dash2.log", _dash2LogErr);
    } catch (_ignore) {
      _ignore && String(_ignore);
    }
  }
}
var DASHBOARD_BUDGET_LAZY_LOAD_STAMP_PHASEE =
  "dashboard-budget-lazy-owner-phase4-single-budget-domain-2026-07-04-r1";
function _dashboardBudgetFromBudgetDomainPhaseE_(payload) {
  return (
    (payload = _c30O_({}, payload || {}, {
      __phaseEDashboardBudgetHydration: !0,
      source: String(
        (payload && payload.source) || "dashboard-budget-domain-owner-phase4",
      ),
      cacheTtlSeconds: Math.max(
        30,
        Math.min(Number((payload && payload.cacheTtlSeconds) || 60) || 60, 180),
      ),
    })),
    typeof BudgetDomain != "undefined" &&
    BudgetDomain &&
    typeof BudgetDomain.getDashboardSummaryForDashboard == "function"
      ? BudgetDomain.getDashboardSummaryForDashboard(payload)
      : ok_(
          _dashboardEmptyBudgetPayload_(
            "phase4-budget-domain-owner-unavailable",
          ),
          "ข้ามการโหลดงบประมาณ: BudgetDomain ยังไม่พร้อม",
        )
  );
}
function _dashboardDeferredFirstPaintBundleR141_(payload, sess, startedAt, cacheKey) {
  payload = payload || {};
  var now = new Date().toISOString(),
    stats = _dashboardEmptyStatsPayload_("dashboard-cold-first-paint-deferred-r146"),
    budget = _dashboardEmptyBudgetPayload_("dashboard-cold-first-paint-deferred-r146"),
    caseData = { rows: [], totalRecords: 0, totalPages: 1, page: 1, limit: 0 },
    meta = {
      cached: !1,
      cacheStatus: "deferred-first-paint",
      cacheHit: !1,
      cacheKey: cacheKey || "",
      durationMs: Math.max(0, Date.now() - Number(startedAt || Date.now())),
      generatedAt: now,
      source: "dashboard-cold-first-paint-no-sheet-read-r146",
      dashboardFirstPaintDeferred: !0,
      deferHydrationRequired: !0,
      fastFirstPaintNoSheetRead: !0,
      coldStartNoBlockingSheetRead: !0,
      dashboardPostTimeoutGuard: !0,
      rowsRead: 0,
      includeBudget: payload.includeBudget === !0,
      includeCases: payload.includeCases === !0,
      hotPathMode: payload.hotPathMode || "phase1-dashboard-first-paint-summary",
      performanceTargetMs: 1200,
      owner: "Code_30_Domain_Cases._dashboardDeferredFirstPaintBundleR141_",
    };
  stats.degraded = !1;
  stats.errorCode = "";
  stats.dashboardErrorCode = "";
  stats.total = 0;
  stats.pending = 0;
  stats.completed = 0;
  stats.statusRows = [];
  stats.byType = [];
  stats.byTopic = [];
  stats.letters = { total: 0, notDue: 0, overdue: 0, received: 0, soonDue: 0 };
  stats.meetings = { total: 0, totalMeetings: 0, meetingCount: 0, recent: 0, recentMeetings: 0, totalItems: 0, itemTotal: 0, totalCasesDiscussed: 0, subjectCount: 0, strictKpi: !0, source: "deferred-first-paint" };
  stats.generatedAt = now;
  stats.meta = _c30O_({}, stats.meta || {}, meta);
  var dto = _dashboardCanonicalBundleDto_(stats, budget, caseData, meta);
  dto.meta = _c30O_({}, dto.meta || {}, meta);
  var data = {
    dashboardDto: dto,
    contractStamp: dto.contractStamp,
    caseStats: dto.caseStats,
    typeStats: [],
    issueStats: [],
    trackingStats: stats.letters,
    meetingStats: stats.meetings,
    charts: dto.charts || { byStatus: [], byType: [], byIssue: [], byMeetingResult: [] },
    stats: stats,
    summaryStats: stats,
    budget: budget,
    budgetStats: budget,
    cases: caseData,
    rows: [],
    letters: stats.letters,
    meetings: stats.meetings,
    meetingSummary: stats.meetings,
    meetingRows: [],
    meetingNoRows: [],
    pendingHydration: !0,
    generatedAt: now,
    meta: meta,
    cached: !1,
    cacheStatus: "deferred-first-paint",
    cacheKey: cacheKey || "",
  };
  return ok_(data, "Dashboard first paint พร้อมใช้งานแบบไม่อ่านชีต");
}
function _apiGetDashboardBundleCore_(payload) {
  payload = payload || {};
  payload.includeBudget = payload.includeBudget === !0;
  payload.includeCases = payload.includeCases === !0;
  payload.hotPathMode = String(
    payload.hotPathMode || "dashboard-initial-single-bundle",
  );
  var bundleStartedAt = Date.now(),
    sess,
    cacheTtlSeconds,
    cacheKey;
  function budgetHasDataForDashboardR81_(bundle) {
    try {
      var data = bundle && bundle.data !== void 0 ? bundle.data : bundle || {};
      var dto =
        data.dashboardDto && typeof data.dashboardDto === "object"
          ? data.dashboardDto
          : {};
      var b =
        data.budgetStats ||
        data.budget ||
        data.dashboardBudget ||
        dto.budgetStats ||
        {};
      var guard = 0;
      while (b && typeof b === "object" && !Array.isArray(b) && guard++ < 8) {
        if (b.budgetStats) {
          b = b.budgetStats;
          continue;
        }
        if (b.dashboardBudget) {
          b = b.dashboardBudget;
          continue;
        }
        if (b.budget) {
          b = b.budget;
          continue;
        }
        if (
          b.data &&
          typeof b.data === "object" &&
          !Array.isArray(b.data) &&
          (b.data.budgetStats ||
            b.data.overviewSection ||
            b.data.segments ||
            b.data.rows ||
            b.data.byPlan ||
            b.data.plans)
        ) {
          b = b.data;
          continue;
        }
        break;
      }
      var seg = (b && b.segments) || {};
      var ov = (b && b.overviewSection) || seg.overview || {};
      var wf = (b && b.workflowSection) || seg.workflow || {};
      var rpt = (b && b.reportSection) || seg.report || {};
      var totals = (b && b.grandTotals) || (b && b.totals) || ov.totals || {};
      var all = totals.all || totals || {};
      function n(v) {
        v = Number(String(v == null ? "" : v).replace(/[^0-9.\-]/g, ""));
        return isFinite(v) ? v : 0;
      }
      function a(v) {
        return Array.isArray(v) && v.length > 0;
      }
      var status =
        (b && b.statusSummary) ||
        (b && b.workflow) ||
        (b && b.budgetWorkflow) ||
        (b && b.workflowSummary) ||
        wf.summary ||
        {};
      var refund = status.refund || status.refundSummary || {};
      var report = status.report || status.reportSummary || {};
      return !!(
        n(b && b.totalBudget) ||
        n(b && b.totalPaid) ||
        n(b && b.totalExpense) ||
        n(b && b.totalRemain) ||
        n(b && b.totalRemaining) ||
        n(all.budget) ||
        n(all.totalBudget) ||
        n(all.spent) ||
        n(all.totalPaid) ||
        n(all.remain) ||
        n(all.totalRemain) ||
        n(ov.totalBudget) ||
        n(ov.totalPaid) ||
        n(ov.totalRemain) ||
        a(b && b.byPlan) ||
        a(b && b.plans) ||
        a(b && b.rows) ||
        a(b && b.details) ||
        a(ov.rows) ||
        a(rpt.rows) ||
        a(b && b.workflowRows) ||
        a(b && b.statusRows) ||
        a(wf.rows) ||
        n(refund.total) ||
        n(report.total) ||
        n(status.refundTotal) ||
        n(status.reportTotal)
      );
    } catch (_budgetHasErr) {
      return !1;
    }
  }
  try {
    try {
      sess = requireAuth_(payload, "viewer");
    } catch (authErr) {
      var authCode = _dashboardBundleErrorCodeDASH2_(authErr, "auth");
      return (
        _dashboardBundleWarnDASH2_("dashboard.bundle.auth.failure", authErr, {
          method: "apiGetDashboardBundle",
          requestId: (payload && payload.requestId) || "",
          errorCode: authCode,
        }),
        _dashboardBundleFailDASH2_(payload, authCode, authErr, "auth")
      );
    }
    cacheTtlSeconds = _dashboardBundleTtlSeconds_(payload);
    cacheKey =
      "dash_bundle_phaseF_fast_r93_" + _dashboardBundleCacheKey_(payload, sess);
    if (
      payload.forceFresh !== !0 &&
      payload.noCache !== !0 &&
      payload.bypassCache !== !0
    )
      try {
        var cachedBundle = _cacheGetJson_(cacheKey);
        if (
          cachedBundle &&
          _dashboardStatsHasDashboardData_(
            cachedBundle.stats || cachedBundle.summaryStats || {},
          ) &&
          ((payload && payload.includeBudget) !== !0 ||
            budgetHasDataForDashboardR81_(cachedBundle))
        ) {
          cachedBundle.cached = !0;
          cachedBundle.cacheStatus = "hit";
          cachedBundle.cacheKey = cacheKey;
          cachedBundle.meta = _c30O_({}, cachedBundle.meta || {}, {
            cached: !0,
            cacheStatus: "hit",
            cacheHit: !0,
            cacheKey,
            durationMs: Math.max(0, Date.now() - bundleStartedAt),
            rowsRead: 0,
            source: "dashboard-bundle-cache-r93",
            dashboardErrorCode: "",
            errorCode: "",
          });
          cachedBundle.dashboardDto
            ? (cachedBundle.dashboardDto.meta = _c30O_(
                {},
                cachedBundle.dashboardDto.meta || {},
                cachedBundle.meta || {},
              ))
            : (cachedBundle.dashboardDto = _dashboardCanonicalBundleDto_(
                cachedBundle.stats || cachedBundle.summaryStats || {},
                cachedBundle.budgetStats || cachedBundle.budget || {},
                cachedBundle.cases || { rows: cachedBundle.rows || [] },
                cachedBundle.meta,
              ));
          return ok_(cachedBundle, "โหลด dashboard bundle สำเร็จ");
        }
        if (
          cachedBundle &&
          payload.includeBudget === !0 &&
          !budgetHasDataForDashboardR81_(cachedBundle)
        ) {
          payload.__dashboardBudgetCacheMissR81 = !0;
          _appIsFnName_("_recordWarning_") &&
            _recordWarning_(
              "dashboard.bundle.cache.skipBudgetEmpty.r92",
              null,
              { cacheKey: cacheKey, requestId: payload.requestId || "" },
            );
        }
      } catch (cacheErr) {
        var cacheCode = _dashboardBundleErrorCodeDASH2_(cacheErr, "cache-read");
        _dashboardBundleWarnDASH2_(
          "dashboard.bundle.cache.read.failure",
          cacheErr,
          {
            method: "apiGetDashboardBundle",
            requestId: (payload && payload.requestId) || "",
            errorCode: cacheCode,
            cacheKey,
          },
        );
        payload.__dashboardCacheReadErrorCode = cacheCode;
      }
    if (
      payload.phase1FirstPaint === !0 &&
      payload.forceFresh !== !0 &&
      String(
        _appIsFnName_("_scriptProp_")
          ? _scriptProp_("DASHBOARD_COLD_FIRST_PAINT_DEFERRED", "Y")
          : "Y",
      ).toUpperCase() !== "N"
    ) {
      return _dashboardDeferredFirstPaintBundleR141_(
        payload,
        sess,
        bundleStartedAt,
        cacheKey,
      );
    }
    var stats;
    try {
      stats = _dashboardStats_(payload);
    } catch (statsErr) {
      var statsCode = _dashboardBundleErrorCodeDASH2_(
        statsErr,
        "stats-sheet-read",
      );
      return (
        _dashboardBundleWarnDASH2_("dashboard.bundle.stats.failure", statsErr, {
          method: "apiGetDashboardBundle",
          requestId: (payload && payload.requestId) || "",
          errorCode: statsCode,
        }),
        _dashboardBundleFailDASH2_(
          payload,
          statsCode,
          statsErr,
          "stats-sheet-read",
        )
      );
    }
    var budgetResult;
    try {
      budgetResult =
        payload.includeBudget === !0
          ? _dashboardBudgetFromBudgetDomainPhaseE_(payload)
          : ok_(
              {},
              "ข้ามการโหลดงบประมาณเพื่อให้ Dashboard first paint แสดงผลเร็ว",
            );
    } catch (budgetErr) {
      var budgetCode = _dashboardBundleErrorCodeDASH2_(
        budgetErr,
        "budget-read",
      );
      _dashboardBundleWarnDASH2_("dashboard.bundle.budget.failure", budgetErr, {
        method: "apiGetDashboardBundle",
        requestId: (payload && payload.requestId) || "",
        errorCode: budgetCode,
      });
      budgetResult = err_(
        _dashboardBundleErrorMessageDASH2_(budgetCode, budgetErr),
        _dashboardEmptyBudgetPayload_("dash2-budget-read-failed"),
      );
      budgetResult.errorCode = budgetCode;
    }
    var subBundles;
    try {
      subBundles = _dashboardBuildSubBundles_(
        payload,
        stats,
        budgetResult,
        cacheTtlSeconds,
      );
    } catch (subErr) {
      var subCode = _dashboardBundleErrorCodeDASH2_(
        subErr,
        "subbundle-sheet-read",
      );
      return (
        _dashboardBundleWarnDASH2_(
          "dashboard.bundle.subbundle.failure",
          subErr,
          {
            method: "apiGetDashboardBundle",
            requestId: (payload && payload.requestId) || "",
            errorCode: subCode,
          },
        ),
        _dashboardBundleFailDASH2_(
          payload,
          subCode,
          subErr,
          "subbundle-sheet-read",
        )
      );
    }
    var bundleMeta = _dashboardBundleMeta_(
      bundleStartedAt,
      cacheKey,
      "dashboard-bundle-request-scope-r93",
    );
    bundleMeta.includeBudget = payload.includeBudget === !0;
    bundleMeta.includeCases = payload.includeCases === !0;
    bundleMeta.hotPathMode =
      payload.hotPathMode || "dashboard-initial-single-bundle";
    bundleMeta.initialSingleBundle = !0;
    bundleMeta.dataLoadingPerformance = /^phase1-dashboard/.test(
      _s_(payload.hotPathMode),
    );
    bundleMeta.phase1FirstPaint =
      payload.phase1FirstPaint === !0 ||
      _s_(payload.hotPathMode) === "phase1-dashboard-first-paint-summary";
    bundleMeta.phase1LazyHydration =
      payload.phase1LazyHydration === !0 ||
      _s_(payload.hotPathMode) === "phase1-dashboard-lazy-hydration";
    bundleMeta.performanceTargetMs = bundleMeta.phase1FirstPaint
      ? 1800
      : bundleMeta.phase1LazyHydration
        ? 6500
        : 3e3;
    payload.__dashboardCacheReadErrorCode &&
      (bundleMeta.cacheReadWarningCode = payload.__dashboardCacheReadErrorCode);
    payload.__dashboardBudgetCacheMissR81 &&
      (bundleMeta.budgetCacheBypassReason = "cached-bundle-missing-budget-r81");
    budgetResult &&
      budgetResult.errorCode &&
      (bundleMeta.budgetWarningCode = budgetResult.errorCode);
    var data;
    try {
      data = _dashboardBuildBundlePayload_(
        stats,
        subBundles,
        bundleMeta,
        cacheKey,
      );
    } catch (buildErr) {
      var buildCode = _dashboardBundleErrorCodeDASH2_(buildErr, "bundle-build");
      return (
        _dashboardBundleWarnDASH2_("dashboard.bundle.build.failure", buildErr, {
          method: "apiGetDashboardBundle",
          requestId: (payload && payload.requestId) || "",
          errorCode: buildCode,
        }),
        _dashboardBundleFailDASH2_(payload, buildCode, buildErr, "bundle-build")
      );
    }
    try {
      if (
        (payload.includeBudget !== !0 || budgetHasDataForDashboardR81_(data)) &&
        _dashboardStatsHasDashboardData_(data.stats || data.summaryStats || {})
      )
        _cachePutJson_(cacheKey, data, cacheTtlSeconds);
    } catch (cacheWriteErr) {
      _dashboardBundleWarnDASH2_(
        "dashboard.bundle.cache.write.failure",
        cacheWriteErr,
        {
          method: "apiGetDashboardBundle",
          requestId: (payload && payload.requestId) || "",
          errorCode: "DASHBOARD_CACHE_WRITE_FAILED",
          cacheKey,
        },
      );
      data.meta = _c30O_({}, data.meta || {}, {
        cacheWriteWarningCode: "DASHBOARD_CACHE_WRITE_FAILED",
      });
      data.dashboardDto &&
        (data.dashboardDto.meta = _c30O_(
          {},
          data.dashboardDto.meta || {},
          data.meta || {},
        ));
    }
    return ok_(data, "โหลด dashboard bundle สำเร็จ");
  } catch (e) {
    var code = _dashboardBundleErrorCodeDASH2_(e, "bundle");
    return (
      _dashboardBundleWarnDASH2_("dashboard.bundle.current.failure", e, {
        method: "apiGetDashboardBundle",
        requestId: (payload && payload.requestId) || "",
        errorCode: code,
      }),
      _dashboardBundleFailDASH2_(payload, code, e, "bundle")
    );
  }
}
var DASHBOARD_HOT_READ_MODEL_STAMP =
  "dashboard-bundle-read-model-index-v1-2026-07-01";
function _dashboardHotRowsReturned_(res) {
  var data =
      res && res.data && typeof res.data == "object" ? res.data : res || {},
    rows = _c30A_(data.rows)
      ? data.rows
      : _c30A_(data.cases && data.cases.rows)
        ? data.cases.rows
        : _c30A_(data.items)
          ? data.items
          : [];
  return rows.length;
}
function _dashboardHotAttachMeta_(res, payload, started) {
  res = res && typeof res == "object" ? res : { ok: !1, data: {} };
  var data =
      res.data && typeof res.data == "object" && !_c30A_(res.data)
        ? res.data
        : res,
    rowsReturned = _dashboardHotRowsReturned_(res),
    baseMeta = data.meta || res.meta || {},
    meta = _c30O_({}, baseMeta, {
      method: "apiGetDashboardBundle",
      readModel: DASHBOARD_HOT_READ_MODEL_STAMP,
      readModelOwner: "Code_30_Domain_Cases.dashboardBundleReadModelOverlay",
      durationMs: Math.max(0, Date.now() - Number(started || Date.now())),
      rowsRead:
        Number(baseMeta.rowsRead || data.rowsRead || rowsReturned || 0) || 0,
      rowsReturned,
      cacheHit: !!(
        baseMeta.cacheHit ||
        data.cacheHit ||
        res.cacheHit ||
        data.cached ||
        res.cached
      ),
      cacheStatus: String(
        baseMeta.cacheStatus || data.cacheStatus || res.cacheStatus || "live",
      ),
      source: "apiGetDashboardBundle.readModelOverlay",
    });
  return (
    (data.meta = meta),
    (data.readModel = DASHBOARD_HOT_READ_MODEL_STAMP),
    (data.rowsReturned = rowsReturned),
    (data.rowsRead = meta.rowsRead),
    (data.cacheHit = meta.cacheHit),
    (data.cacheStatus = meta.cacheStatus),
    (res.meta = _c30O_({}, res.meta || {}, meta)),
    (res.readModel = DASHBOARD_HOT_READ_MODEL_STAMP),
    (res.rowsReturned = rowsReturned),
    (res.rowsRead = meta.rowsRead),
    (res.cacheHit = meta.cacheHit),
    (res.cacheStatus = meta.cacheStatus),
    res
  );
}
((DashboardDomain.VERSION = "dashboard-domain-single-bundle-current"),
  (DashboardDomain.getBundle = function (payload) {
    var started = Date.now();
    return (
      ((payload = payload || {}).includeBudget = payload.includeBudget === !0),
      (payload.includeCases = payload.includeCases !== !1),
      (payload.hotPathMode = String(
        payload.hotPathMode || "dashboard-initial-single-bundle",
      )),
      _dashboardHotAttachMeta_(
        _apiGetDashboardBundleCore_(payload),
        payload,
        started,
      )
    );
  }),
  (DashboardDomain.status = function () {
    return _domainStatusPhaseC_(DashboardDomain, "DashboardDomain", {
      version:
        DashboardDomain.VERSION || "dashboard-domain-single-bundle-current",
      apiNamesPreserved: !0,
    });
  }),
  (CaseDomain.SHEET_NAME = "MainData"),
  (CaseDomain.VERSION = "case-domain-production-single-owner-current"),
  (CaseDomain.Services = CaseDomain.Services || {
    Repository: { source: "MainData" },
    Search: { source: "MainData", dto: "CaseSearchRowDTO" },
    Report: { source: "MainData+MeetingLogs" },
    MeetingHistory: { source: "MeetingLogs" },
  }),
  (CaseDomain.caseText = function (value) {
    return typeof AppBackendCore != "undefined" && AppBackendCore.text
      ? AppBackendCore.text(value)
      : _c30S_(value).trim();
  }),
  (CaseDomain.pick = function (row, keys, defaultValue) {
    return typeof AppBackendCore != "undefined" && AppBackendCore.pick
      ? AppBackendCore.pick(row, keys, defaultValue)
      : (row && row[keys]) || defaultValue || "";
  }),
  (CaseDomain.caseNumberValue = function (value) {
    var s,
      m = CaseDomain.caseText(value).match(/^(\d+)/);
    return m ? Number(m[1]) : 999999999;
  }),
  (CaseDomain.toSearchRow = function (row, seq) {
    if (
      ((row = row || {}),
      typeof AppBackendCore != "undefined" &&
        AppBackendCore.normalizeCaseSearchDto)
    ) {
      var base = AppBackendCore.normalizeCaseSearchDto(row, seq) || {},
        comm = CaseDomain.pick(
          row,
          [
            "committeeHistory",
            "committeeMeeting",
            "committeeMeetings",
            "meetingCommitteeHistory",
            "คณะกรรมาธิการ",
          ],
          "",
        ),
        sub = CaseDomain.pick(
          row,
          [
            "subcommitteeHistory",
            "subcommitteeMeeting",
            "subcommitteeMeetings",
            "meetingSubcommitteeHistory",
            "คณะอนุกรรมาธิการ",
          ],
          "",
        );
      return (
        comm &&
          ((base.committeeHistory = base.committeeHistory || comm),
          (base.committeeMeeting = base.committeeMeeting || comm),
          (base.คณะกรรมาธิการ = base.คณะกรรมาธิการ || comm)),
        sub &&
          ((base.subcommitteeHistory = base.subcommitteeHistory || sub),
          (base.subcommitteeMeeting = base.subcommitteeMeeting || sub),
          (base.คณะอนุกรรมาธิการ = base.คณะอนุกรรมาธิการ || sub)),
        (base.reportColumns = _c30O_({}, base.reportColumns || {}, {
          committeeHistory: base.committeeHistory || "",
          subcommitteeHistory: base.subcommitteeHistory || "",
          operationOfficer:
            base.operationOfficer ||
            base.opStaff ||
            base.staffs ||
            base.เจ้าหน้าที่ฝ่ายเลขานุการ ||
            "",
        })),
        (base.dtoOwner = "CaseDomain.toSearchRow.production"),
        base
      );
    }
    var recDate = CaseDomain.pick(
        row,
        ["recDate", "recDateText", "วันที่รับเรื่อง", "receiveDate"],
        "",
      ),
      statusRaw = CaseDomain.pick(row, ["status", "สถานะ"], ""),
      status =
        typeof AppBackendCore != "undefined" &&
        AppBackendCore.normalizeCaseStatus
          ? AppBackendCore.normalizeCaseStatus(statusRaw, {
              defaultStatus: "เรื่องเข้าใหม่",
            })
          : _caseNormalizeStatusForDisplay_(statusRaw),
      loc =
        typeof AppBackendCore != "undefined" && AppBackendCore.location
          ? AppBackendCore.location(row)
          : {
              subdistrict: CaseDomain.pick(row, ["ตำบล", "subdistrict"], ""),
              district: CaseDomain.pick(row, ["อำเภอ", "district"], ""),
              province: CaseDomain.pick(row, ["จังหวัด", "province"], ""),
            },
      title = CaseDomain.pick(
        row,
        ["title", "subject", "ชื่อเรื่อง", "เรื่อง"],
        "",
      ),
      fullName = CaseDomain.pick(
        row,
        [
          "fullName",
          "petitionerName",
          "petitioners",
          "ชื่อ-สกุล",
          "ผู้เสนอญัตติ/ผู้ร้อง",
        ],
        "",
      ),
      coOwners = CaseDomain.pick(
        row,
        ["coOwners", "coAssignees", "ผู้ร่วมรับผิดชอบ", "ผู้รับผิดชอบร่วม"],
        "",
      ),
      out = {
        id: CaseDomain.pick(row, ["id", "caseId", "รหัส"], ""),
        caseId: CaseDomain.pick(row, ["caseId", "id", "รหัส"], ""),
        seq,
        caseNo: CaseDomain.pick(row, ["caseNo", "caseNum", "ลำดับเรื่อง"], ""),
        caseNum: CaseDomain.pick(row, ["caseNo", "caseNum", "ลำดับเรื่อง"], ""),
        recNo: CaseDomain.pick(row, ["recNo", "เลขรับเรื่อง", "receiveNo"], ""),
        recDate,
        recDateText:
          typeof AppBackendCore != "undefined" && AppBackendCore.dateText
            ? AppBackendCore.dateText(recDate)
            : _s_(recDate),
        title,
        subject: title,
        considerationTitle: CaseDomain.pick(
          row,
          [
            "considerationTitle",
            "ชื่อเรื่องพิจารณา",
            "ชื่อเรื่องพิจารณา (ถ้ามี)",
          ],
          "",
        ),
        petitionerName: fullName,
        petitioners: fullName,
        fullName,
        respondent: CaseDomain.pick(row, ["respondent", "ผู้ถูกร้อง"], ""),
        agency: CaseDomain.pick(row, ["agency", "หน่วยงาน"], ""),
        assignees: CaseDomain.pick(
          row,
          ["assignees", "กมธ.รับผิดชอบ", "กรรมาธิการรับผิดชอบ"],
          "",
        ),
        coAssignees: coOwners,
        coOwners,
        opStaff: CaseDomain.pick(
          row,
          ["opStaff", "เจ้าหน้าที่ฝ่ายเลขานุการ", "เจ้าหน้าที่ฝ่ายปฏิบัติการ"],
          "",
        ),
        cat: CaseDomain.pick(row, ["cat", "ประเภทเรื่อง", "ประเภท"], ""),
        subCat: CaseDomain.pick(
          row,
          ["subCat", "ประเด็นพิจารณา", "ประเด็น"],
          "",
        ),
        committeeHistory: CaseDomain.pick(
          row,
          ["committeeHistory", "committeeMeeting", "คณะกรรมาธิการ"],
          "",
        ),
        subcommitteeHistory: CaseDomain.pick(
          row,
          ["subcommitteeHistory", "subcommitteeMeeting", "คณะอนุกรรมาธิการ"],
          "",
        ),
        status,
        statusRaw,
        type: "case",
        typeLabel: "เรื่องพิจารณา",
        subdistrict: loc.subdistrict,
        district: loc.district,
        province: loc.province,
      };
    return (
      (out.statusMeta =
        typeof AppBackendCore != "undefined" && AppBackendCore.statusMeta
          ? AppBackendCore.statusMeta(status, recDate)
          : { status }),
      (out.reportColumns = {
        caseNo: out.caseNo,
        recNo: out.recNo,
        recDateText: out.recDateText,
        title: out.title,
        considerationTitle: out.considerationTitle,
        committeeHistory: out.committeeHistory || "",
        subcommitteeHistory: out.subcommitteeHistory || "",
        petitioners: out.petitioners,
        status: out.status,
      }),
      out
    );
  }),
  (CaseDomain.toCompactSearchRow = function (row, seq) {
    var dto = CaseDomain.toSearchRow(row || {}, seq) || {},
      compact = {
        id: dto.id || dto.caseId || "",
        caseId: dto.caseId || dto.id || "",
        seq: dto.seq || seq || "",
        caseNo: dto.caseNo || dto.caseNum || "",
        caseNum: dto.caseNum || dto.caseNo || "",
        recNo: dto.recNo || dto.receiveNo || "",
        recDate: dto.recDate || dto.recDateText || "",
        recDateText: dto.recDateText || dto.recDate || "",
        offerDate:
          dto.offerDate ||
          dto.offerDateText ||
          dto.bookDate ||
          dto.letterDate ||
          dto.documentDate ||
          "",
        offerDateText:
          dto.offerDateText ||
          dto.offerDate ||
          dto.bookDate ||
          dto.letterDate ||
          dto.documentDate ||
          "",
        bookDate: dto.bookDate || dto.offerDate || dto.offerDateText || "",
        letterDate: dto.letterDate || dto.offerDate || dto.offerDateText || "",
        documentDate:
          dto.documentDate || dto.offerDate || dto.offerDateText || "",
        title: dto.title || dto.subject || "",
        considerationTitle: dto.considerationTitle || dto.caseTitle || "",
        petitioners: dto.petitioners || dto.petitionerName || "",
        respondent: dto.respondent || dto.agency || dto.agencyName || "",
        agency: dto.agency || dto.respondent || dto.agencyName || "",
        assignees: dto.assignees || "",
        coAssignees: dto.coAssignees || dto.coOwners || "",
        opStaff: dto.opStaff || dto.operationOfficer || dto.staffs || "",
        cat: dto.cat || "",
        subCat: dto.subCat || "",
        status: dto.status || "เรื่องเข้าใหม่",
        statusRaw: dto.statusRaw || dto.status || "",
        closedReason: dto.closedReason || "",
        rejectionReason: dto.rejectionReason || "",
        pendingRemark: dto.pendingRemark || dto.pendingReason || "",
        pendingReason: dto.pendingReason || dto.pendingRemark || "",
        reason:
          dto.reason ||
          dto.pendingRemark ||
          dto.pendingReason ||
          dto.closedReason ||
          dto.rejectionReason ||
          "",
        sentAgency: dto.sentAgency || "",
        committeeHistory: dto.committeeHistory || "",
        subcommitteeHistory: dto.subcommitteeHistory || "",
        type: "case",
        typeLabel: "เรื่องพิจารณา",
      };
    return (
      (compact.ลำดับเรื่อง = compact.caseNo),
      (compact.เลขรับเรื่อง = compact.recNo),
      (compact.วันที่รับเรื่อง = compact.recDateText),
      (compact.ชื่อเรื่อง = compact.title),
      (compact["ชื่อเรื่องพิจารณา (ถ้ามี)"] = compact.considerationTitle),
      (compact["ผู้เสนอญัตติ/ผู้ร้อง"] = compact.petitioners),
      (compact.สถานะ = compact.status),
      compact
    );
  }),
  (CaseDomain.searchPageCacheKey = function (payload) {
    payload = payload || {};
    var scope = {
      q: _s_(payload.query || payload.q || payload.keyword)
        .trim()
        .toLowerCase(),
      reportType: String(
        payload.reportType || payload.groupType || payload.type || "all",
      )
        .trim()
        .toLowerCase(),
      reportValue: _s_(
        payload.reportValue || payload.groupValue || payload.value,
      ).trim(),
      sortBy: String(payload.sortBy || "caseNum").trim(),
      sortDir: String(payload.sortDir || "asc")
        .trim()
        .toLowerCase(),
      page: Math.max(1, Number(payload.page || 1) || 1),
      limit: Math.max(
        1,
        Math.min(Number(payload.limit || payload.pageSize || 20) || 20, 100),
      ),
      compact: payload.compactReadModel === !0 ? 1 : 0,
      meeting: payload.includeMeetingHistory === !0 ? 1 : 0,
      stamp: _appIsFnName_("_entityCacheStamp_")
        ? _entityCacheStamp_("maindata")
        : "1",
      dto: "case-search-compact-server-page-v2-stable-order",
    };
    return (
      "case_search_page_v2_" +
      (_appIsFnName_("_buildDigestHex_")
        ? _buildDigestHex_(JSON.stringify(scope))
        : String(scope.page) + "_" + String(scope.limit))
    );
  }),
  (CaseDomain.matchRow = function (row, payload) {
    payload = payload || {};
    var q = CaseDomain.caseText(
        payload.query || payload.q || payload.keyword || "",
      ).toLowerCase(),
      reportType = CaseDomain.caseText(
        payload.reportType || payload.groupType || payload.type || "all",
      ),
      reportValue = CaseDomain.caseText(
        payload.reportValue || payload.groupValue || payload.value || "",
      ),
      hay;
    if (
      q &&
      [
        row.caseNo,
        row.caseNum,
        row.recNo,
        row.recDateText,
        row.title,
        row.subject,
        row.considerationTitle,
        row.caseTitle,
        row.petitionerName,
        row.petitioners,
        row.respondent,
        row.agency,
        row.agencyName,
        row.assignees,
        row.coOwners,
        row.coAssignees,
        row.opStaff,
        row.operationOfficer,
        row.staffs,
        row.status,
        row.cat,
        row.subCat,
      ]
        .join(" ")
        .toLowerCase()
        .indexOf(q) < 0
    )
      return !1;
    if (reportType && reportType !== "all" && reportValue) {
      var field =
          reportType === "cat"
            ? row.cat
            : reportType === "sub"
              ? row.subCat
              : reportType === "comm"
                ? row.assignees
                : reportType === "status"
                  ? row.status
                  : "",
        fieldText = CaseDomain.caseText(field);
      if (
        reportType === "comm"
          ? fieldText.indexOf(reportValue) < 0
          : fieldText !== reportValue
      )
        return !1;
    }
    return !0;
  }));
var PHASE4_CASE_REPORT_INDEX_STAMP =
  "phase4-case-report-index-qa-gate-2026-06-30";
function _caseReportIndexPolicyPhase4_() {
  return {
    ok: !0,
    stamp: PHASE4_CASE_REPORT_INDEX_STAMP,
    owner: "Code_30_Domain_Cases.CaseReportIndexPhase4",
    sourceOfTruth: "MainData+MeetingLogs",
    cachePrefix: "case_report_index_phase4_",
    ttlSeconds: { search: 180, reportOptions: 240, export: 90, max: 300 },
    invalidatedByRoutes: [
      "apiSaveCase",
      "apiDeleteCase",
      "apiSaveMeetingLog",
      "apiDeleteMeetingLog",
      "apiSaveCommitteeMeetingSystem",
      "apiDeleteCommitteeMeetingSystem",
    ],
    qaMethods: [
      "apiSearchCasesLite",
      "apiGetCaseReportOptions",
      "apiGetCaseReportExportRows",
    ],
    uiDomChanged: !1,
    businessLogicChanged: !1,
  };
}
function _caseReportIndexStampPhase4_(domain) {
  domain = String(domain || "case")
    .trim()
    .toLowerCase();
  try {
    if (_appIsFnName_("_entityCacheStamp_"))
      return String(_entityCacheStamp_(domain) || "1");
  } catch (_stampErr) {
    _c30W_("case.report.phase4.stamp", _stampErr, { domain });
  }
  try {
    if (_appIsFnName_("_routerEntityCacheStamp_"))
      return String(_routerEntityCacheStamp_(domain) || "1");
  } catch (_routerStampErr) {
    _c30W_("case.report.phase4.routerStamp", _routerStampErr, { domain });
  }
  return "1";
}
function _caseReportIndexScopePhase4_(payload) {
  payload = payload || {};
  var noPage =
      payload.noPage === !0 ||
      payload.fullList === !0 ||
      payload.serverPaged === !1,
    includeMeetingHistory = payload.includeMeetingHistory === !0,
    limit = Math.max(
      1,
      Math.min(
        Number(
          payload.limit ||
            payload.pageSize ||
            (noPage ? payload.maxRows || 5e3 : 20),
        ) || (noPage ? 5e3 : 20),
        noPage ? 5e3 : 100,
      ),
    );
  return {
    stamp: PHASE4_CASE_REPORT_INDEX_STAMP,
    phase3:
      typeof PHASE3_CASE_REPORT_READ_MODEL_STAMP != "undefined"
        ? PHASE3_CASE_REPORT_READ_MODEL_STAMP
        : "phase3-unknown",
    q: _caseReportTextPhase3_(
      payload.query || payload.q || payload.keyword || "",
    ).toLowerCase(),
    reportType: _caseReportTextPhase3_(
      payload.reportType || payload.groupType || payload.type || "all",
    ).toLowerCase(),
    reportValue: _caseReportTextPhase3_(
      payload.reportValue || payload.groupValue || payload.value || "",
    ),
    sortBy: _caseReportTextPhase3_(payload.sortBy || "caseNum"),
    sortDir: _caseReportTextPhase3_(payload.sortDir || "asc").toLowerCase(),
    page: noPage ? 1 : Math.max(1, Number(payload.page || 1) || 1),
    limit,
    maxRows: Math.max(
      1,
      Math.min(Number(payload.maxRows || limit) || limit, 5e3),
    ),
    includeMeetingHistory: includeMeetingHistory ? 1 : 0,
    noPage: noPage ? 1 : 0,
    exportMode: _caseReportTextPhase3_(
      payload.exportMode || payload.mode || "",
    ),
    compactReadModel: payload.compactReadModel === !0 ? 1 : 0,
    mainStamp: _caseReportIndexStampPhase4_("maindata"),
    caseStamp: _caseReportIndexStampPhase4_("case"),
    meetingStamp: includeMeetingHistory
      ? _caseReportIndexStampPhase4_("meeting")
      : "0",
    route: _caseReportTextPhase3_(
      payload.__route || payload.route || payload.source || "case-report-index",
    ),
  };
}
function _caseReportIndexKeyPhase4_(payload) {
  var scope = _caseReportIndexScopePhase4_(payload),
    digest = _appIsFnName_("_buildDigestHex_")
      ? _buildDigestHex_(JSON.stringify(scope))
      : String(scope.page) +
        "_" +
        String(scope.limit) +
        "_" +
        String(Date.now());
  return { key: "case_report_index_phase4_" + digest, scope };
}
function _caseReportIndexTtlPhase4_(payload) {
  return (
    (payload = payload || {}),
    payload.noPage === !0 ||
    payload.fullList === !0 ||
    payload.serverPaged === !1
      ? 90
      : _s_(payload.__phase4IndexMode) === "reportOptions"
        ? 240
        : Math.max(
            30,
            Math.min(Number(payload.cacheTtlSeconds || 180) || 180, 300),
          )
  );
}
function _caseReportTelemetryPhase4_(res, payload, started, cacheInfo) {
  ((res =
    res && typeof res == "object"
      ? res
      : { ok: !1, rows: [], data: [], totalRecords: 0 }),
    (payload = payload || {}));
  var rows = _c30A_(res.rows) ? res.rows : _c30A_(res.data) ? res.data : [],
    total = Math.max(
      0,
      Number(res.totalRecords || res.total || rows.length) || 0,
    ),
    ok = res.ok !== !1,
    errorCode = _s_(res.errorCode || res.code).trim(),
    empty = ok && total === 0,
    meta = _c30O_({}, res.meta || {});
  return (
    (meta.phase4Index = {
      stamp: PHASE4_CASE_REPORT_INDEX_STAMP,
      owner: "Code_30_Domain_Cases.CaseReportIndexPhase4",
      source: "CaseReportIndex.phase4",
      sourceOfTruth: "MainData+MeetingLogs",
      cacheKey: (cacheInfo && cacheInfo.key) || "",
      cacheStatus:
        (cacheInfo && cacheInfo.status) || String(res.cacheStatus || "bypass"),
      cacheHit: !!((cacheInfo && cacheInfo.hit) || res.cacheHit),
      scope:
        (cacheInfo && cacheInfo.scope) || _caseReportIndexScopePhase4_(payload),
      rowsRead: Number(res.rowsRead || meta.rowsRead || rows.length || 0) || 0,
      returnedRows: rows.length,
      totalRecords: total,
      includeMeetingHistory: payload.includeMeetingHistory === !0,
      meetingHistoryMatchedRows:
        Number(
          res.meetingHistoryMatchedRows || meta.meetingHistoryMatchedRows || 0,
        ) || 0,
      status: ok ? (empty ? "ok-empty" : "ok-data") : "read-error",
      errorCode: ok ? "" : errorCode || "CASE_REPORT_INDEX_READ_FAILED",
      emptyReason: empty ? "filter-or-dataset-empty" : "",
      durationMs: Math.max(0, Date.now() - Number(started || Date.now())),
      uiDomChanged: !1,
      businessLogicChanged: !1,
    }),
    (res.meta = meta),
    (res.indexPolicy = _caseReportIndexPolicyPhase4_()),
    (res.readModel = PHASE4_CASE_REPORT_INDEX_STAMP),
    (res.source = "CaseReportIndex.phase4"),
    (res.cacheStatus = meta.phase4Index.cacheStatus),
    (res.cacheHit = meta.phase4Index.cacheHit),
    (res.errorState = meta.phase4Index.status),
    (res.durationMs = meta.phase4Index.durationMs),
    res
  );
}
function _caseReportReadModelPhase4_(payload) {
  payload = payload || {};
  var started = Date.now(),
    allowCache =
      payload.forceFresh !== !0 &&
      payload.noCache !== !0 &&
      payload.bypassCache !== !0,
    idx = _caseReportIndexKeyPhase4_(payload),
    cacheInfo = {
      key: idx.key,
      scope: idx.scope,
      status: allowCache ? "miss" : "bypass",
      hit: !1,
    };
  if (allowCache && _appIsFnName_("_cacheGetJson_")) {
    var hit = _cacheGetJson_(idx.key);
    if (hit && typeof hit == "object")
      return (
        (cacheInfo.status = "hit"),
        (cacheInfo.hit = !0),
        (hit.cacheHit = !0),
        (hit.cacheStatus = "hit"),
        _caseReportTelemetryPhase4_(hit, payload, started, cacheInfo)
      );
  }
  var res;
  try {
    res = _caseReportReadModelPhase3_(
      _c30O_({}, payload, {
        noCache: !0,
        bypassCache: !0,
        forceFresh: !1,
        __phase4IndexOwner: PHASE4_CASE_REPORT_INDEX_STAMP,
      }),
    );
  } catch (e) {
    (_c30W_("case.report.phase4.readModel", e, { source: _s_(payload.source) }),
      (res = {
        ok: !1,
        rows: [],
        data: [],
        items: [],
        records: [],
        totalRecords: 0,
        total: 0,
        error: String((e && e.message) || e),
        msg: "อ่านข้อมูลรายงานไม่สำเร็จ",
        errorCode: "CASE_REPORT_INDEX_READ_FAILED",
        meta: { exception: String((e && e.message) || e) },
      }));
  }
  if (
    ((res = _caseReportTelemetryPhase4_(res, payload, started, cacheInfo)),
    allowCache && res.ok !== !1 && _appIsFnName_("_cachePutJson_"))
  )
    try {
      _cachePutJson_(idx.key, res, _caseReportIndexTtlPhase4_(payload));
    } catch (_putErr) {
      _c30W_("case.report.phase4.cachePut", _putErr, { key: idx.key });
    }
  return res;
}
function _phase4QaCheck_(name, ok, detail) {
  return {
    name: _s_(name),
    ok: !!ok,
    detail: detail || {},
    at: new Date().toISOString(),
  };
}
function _phase4SmokeResultShape_(res) {
  return !!(
    res &&
    typeof res == "object" &&
    _c30A_(res.rows) &&
    res.totalRecords != null &&
    res.meta &&
    res.meta.phase4Index
  );
}
function apiGetPhase4QaGate(payload) {
  payload = payload || {};
  var started = Date.now(),
    checks = [],
    routeNames = [];
  try {
    _appIsFnName_("_apiRouteRegistry_") &&
      (routeNames = Object.keys(_apiRouteRegistry_() || {}));
  } catch (_routeErr) {
    checks.push(
      _phase4QaCheck_("route.registry.read", !1, {
        error: String((_routeErr && _routeErr.message) || _routeErr),
      }),
    );
  }
  [
    "apiSearchCasesLite",
    "apiGetCaseReportOptions",
    "apiGetCaseReportExportRows",
    "apiSaveMeetingLog",
  ].forEach(function (route) {
    checks.push(
      _phase4QaCheck_(
        "route.registered." + route,
        routeNames.indexOf(route) > -1 || routeNames.length === 0,
        { route },
      ),
    );
  });
  var searchRes = _caseReportReadModelPhase4_({
    page: 1,
    limit: 3,
    compactReadModel: !0,
    includeMeetingHistory: !1,
    noCache: !0,
    bypassCache: !0,
    source: "phase4-qa-search",
  });
  checks.push(
    _phase4QaCheck_(
      "readModel.search.shape",
      _phase4SmokeResultShape_(searchRes),
      {
        totalRecords: Number(searchRes.totalRecords || 0),
        rows: _c30A_(searchRes.rows) ? searchRes.rows.length : -1,
        errorState: searchRes.errorState || "",
      },
    ),
  );
  var exportRes = CaseDomain.getReportExportRows({
    maxRows: 3,
    limit: 3,
    includeMeetingHistory: !0,
    noCache: !0,
    bypassCache: !0,
    source: "phase4-qa-export",
  });
  checks.push(
    _phase4QaCheck_(
      "readModel.export.shape",
      !!(exportRes && exportRes.ok !== !1 && _c30A_(exportRes.rows)),
      {
        totalRecords: Number((exportRes && exportRes.totalRecords) || 0),
        rows: _c30A_(exportRes && exportRes.rows) ? exportRes.rows.length : -1,
        source: _s_(exportRes && exportRes.source),
      },
    ),
  );
  var optRes = CaseDomain.getReportOptions({
    noCache: !0,
    bypassCache: !0,
    source: "phase4-qa-options",
  });
  checks.push(
    _phase4QaCheck_(
      "readModel.options.shape",
      !!(
        optRes &&
        optRes.ok !== !1 &&
        optRes.data &&
        typeof optRes.data == "object"
      ),
      {
        source: _s_(optRes && optRes.source),
        readModel: _s_(optRes && optRes.readModel),
      },
    ),
  );
  var ledger = _appIsFnName_("_cacheInvalidationLedgerStatusPhase4_")
    ? _cacheInvalidationLedgerStatusPhase4_()
    : null;
  checks.push(
    _phase4QaCheck_("cacheLedger.available", !!(ledger && ledger.ok), {
      stamp: (ledger && ledger.stamp) || "",
    }),
  );
  var passed = checks.filter(function (c) {
      return c.ok;
    }).length,
    failed = checks.length - passed;
  return {
    ok: failed === 0,
    owner: "Code_30_Domain_Cases.apiGetPhase4QaGate",
    stamp: PHASE4_CASE_REPORT_INDEX_STAMP,
    policy: _caseReportIndexPolicyPhase4_(),
    checks,
    passed,
    failed,
    readOnly: !0,
    noDataMutation: !0,
    durationMs: Math.max(0, Date.now() - started),
    generatedAt: new Date().toISOString(),
    meta: {
      source: "Phase4QaGate",
      uiDomChanged: !1,
      businessLogicChanged: !1,
    },
  };
}
var HOT_ROUTE_READ_MODEL_STAMP = "hot-route-materialized-index-v2-2026-07-02",
  CASE_SEARCH_MATERIALIZED_INDEX_STAMP =
    "case-search-materialized-index-v2-2026-07-02",
  TRACKING_MATERIALIZED_INDEX_STAMP =
    "tracking-materialized-index-v2-2026-07-02";
function _hotRouteDigest_(seed) {
  seed = _s_(seed);
  try {
    if (_appIsFnName_("_buildDigestHex_")) return _buildDigestHex_(seed);
  } catch (_digestErr) {
    _c30W_("hotRoute.digest", _digestErr);
  }
  try {
    return Utilities.base64EncodeWebSafe(seed).substring(0, 96);
  } catch (_utilErr) {
    return seed.replace(/[^A-Za-z0-9_-]/g, "_").substring(0, 96);
  }
}
function _hotRouteCacheGet_(key) {
  try {
    if (
      typeof AppDataService != "undefined" &&
      AppDataService &&
      AppDataService.cacheGet
    )
      return AppDataService.cacheGet(key);
  } catch (_adsGetErr) {
    _c30W_("hotRoute.cacheGet.appDataService", _adsGetErr, { key });
  }
  try {
    return _appIsFnName_("_cacheGetJson_") ? _cacheGetJson_(key) : null;
  } catch (_cacheErr) {
    _c30W_("hotRoute.cacheGet", _cacheErr, { key });
  }
  return null;
}
function _hotRouteCachePut_(key, value, ttlSeconds) {
  ttlSeconds = Math.max(30, Math.min(Number(ttlSeconds || 180) || 180, 21600));
  try {
    if (
      typeof AppDataService != "undefined" &&
      AppDataService &&
      AppDataService.cachePut
    )
      return AppDataService.cachePut(key, value, ttlSeconds);
  } catch (_adsPutErr) {
    _c30W_("hotRoute.cachePut.appDataService", _adsPutErr, { key });
  }
  try {
    return _appIsFnName_("_cachePutJson_")
      ? _cachePutJson_(key, value, ttlSeconds)
      : !1;
  } catch (_cachePutErr) {
    _c30W_("hotRoute.cachePut", _cachePutErr, { key });
  }
  return !1;
}
function _hotRouteDateKey_() {
  try {
    return Utilities.formatDate(
      new Date(),
      Session.getScriptTimeZone() || "Asia/Bangkok",
      "yyyy-MM-dd",
    );
  } catch (_e) {
    return new Date().toISOString().slice(0, 10);
  }
}

function _casePayloadSessionScopeR146_(payload) {
  payload = payload || {};
  var security = payload._securityContext || payload.__securityContext || {},
    token = _s_(payload.token || payload._token || payload.sessionToken || payload.__sessionToken || "").trim(),
    principal = _s_(security.userId || security.username || security.email || payload.userId || payload.username || payload.email || "anonymous").trim().toLowerCase(),
    role = _s_(security.role || payload.role || "viewer").trim().toLowerCase(),
    tokenFp = "";
  try {
    tokenFp = token && _appIsFnName_("_sessionMetaTokenFingerprint_")
      ? _sessionMetaTokenFingerprint_(token)
      : token
        ? _hotRouteDigest_("session-token|" + token).substring(0, 16)
        : "no-token";
  } catch (_scopeErr) {
    tokenFp = "scope-error";
  }
  return _hotRouteDigest_(JSON.stringify({ principal: principal, role: role, token: tokenFp })).substring(0, 32);
}
function _casePayloadSequenceScopeR146_(payload) {
  return _caseSequenceFrom_(payload || {}) || "all";
}

function _caseSearchIndexScope_(payload) {
  return (
    (payload = payload || {}),
    {
      stamp: CASE_SEARCH_MATERIALIZED_INDEX_STAMP,
      compactReadModel: payload.compactReadModel !== !1 ? 1 : 0,
      includeMeetingHistory: payload.includeMeetingHistory === !0 ? 1 : 0,
      caseStamp: _appIsFnName_("_entityCacheStamp_")
        ? String(_entityCacheStamp_("maindata") || "1")
        : "1",
      meetingStamp:
        payload.includeMeetingHistory === !0 &&
        _appIsFnName_("_entityCacheStamp_")
          ? String(
              _entityCacheStamp_("meeting") ||
                _entityCacheStamp_("meetinglogs") ||
                "1",
            )
          : "0",
      sessionScope: _casePayloadSessionScopeR146_(payload),
      caseSequenceScope: _casePayloadSequenceScopeR146_(payload),
    }
  );
}
function _caseSearchMaterializedIndexKey_(payload) {
  return (
    "case_search_materialized_index_v2_" +
    _hotRouteDigest_(JSON.stringify(_caseSearchIndexScope_(payload || {})))
  );
}
function _caseSearchReadMaterializedIndex_(payload) {
  payload = payload || {};
  var started = Date.now(),
    allowCache =
      payload.forceFresh !== !0 &&
      payload.noCache !== !0 &&
      payload.bypassCache !== !0,
    key = _caseSearchMaterializedIndexKey_(payload),
    cached = allowCache ? _hotRouteCacheGet_(key) : null;
  if (cached && _c30A_(cached.rows))
    return (
      (cached.cacheHit = !0),
      (cached.cacheStatus = String(cached.cacheStatus || "materialized-hit")),
      (cached.rowsRead = 0),
      (cached.durationMs = Math.max(0, Date.now() - started)),
      cached
    );
  var maxRows = Math.max(
      100,
      Math.min(
        Number(
          payload.materializedLimit || payload.maxMaterializedRows || 5e3,
        ) || 5e3,
        5e3,
      ),
    ),
    source = _caseReportReadModelPhase4_(
      _c30O_({}, payload, {
        query: "",
        q: "",
        keyword: "",
        reportType: "all",
        groupType: "all",
        type: "all",
        reportValue: "",
        groupValue: "",
        value: "",
        page: 1,
        limit: maxRows,
        pageSize: maxRows,
        maxRows,
        noPage: !0,
        fullList: !0,
        serverPaged: !1,
        compactReadModel: payload.compactReadModel !== !1,
        includeMeetingHistory: payload.includeMeetingHistory === !0,
        noCache: !0,
        bypassCache: !0,
        forceFresh: !1,
        __route: "apiSearchCasesLite.materialized-index-base",
        source: "case-search-materialized-index-base",
      }),
    ),
    rows = _c30A_(source && source.rows)
      ? source.rows
      : _c30A_(source && source.data)
        ? source.data
        : [];
  rows = (_c30A_(rows) ? rows : []).filter(function (row) {
    var type = _s_(row && row.type)
        .trim()
        .toLowerCase(),
      label = _s_(row && row.typeLabel).trim(),
      deleted = String(
        (row && (row.isDeleted || row.deleted || row.deletedAt || row.ลบ)) ||
          "",
      )
        .trim()
        .toLowerCase();
    return (
      deleted !== "true" &&
      deleted !== "1" &&
      deleted !== "deleted" &&
      deleted !== "ลบ" &&
      type !== "letter" &&
      label !== "หนังสือ" &&
      label !== "หนังสือติดตามมติ"
    );
  });
  var model = {
    ok: !0,
    rows,
    totalRecords: rows.length,
    source: "CaseSearchMaterializedIndex.v2",
    readModel: CASE_SEARCH_MATERIALIZED_INDEX_STAMP,
    cacheHit: !1,
    cacheStatus: allowCache ? "materialized-miss" : "materialized-bypass",
    cacheKey: key,
    rowsRead:
      Number(
        (source && (source.rowsRead || source.totalRecords)) ||
          rows.length ||
          0,
      ) || 0,
    rowsReturned: rows.length,
    durationMs: Math.max(0, Date.now() - started),
    generatedAt: new Date().toISOString(),
    scope: _caseSearchIndexScope_(payload),
    meta: {
      source: "CaseSearchMaterializedIndex.v2",
      readModelOwner: "Code_30_Domain_Cases.caseSearchMaterializedIndex",
      rowsRead:
        Number(
          (source && (source.rowsRead || source.totalRecords)) ||
            rows.length ||
            0,
        ) || 0,
      rowsReturned: rows.length,
      baseSource: String((source && source.source) || "CaseReportIndex.phase4"),
      uiDomChanged: !1,
      businessLogicChanged: !1,
    },
  };
  return (
    allowCache &&
      _hotRouteCachePut_(
        key,
        model,
        Math.max(
          300,
          Math.min(Number(payload.indexTtlSeconds || 21600) || 21600, 21600),
        ),
      ),
    model
  );
}
function _caseSearchRowsMatch_(rows, payload) {
  return (
    (payload = payload || {}),
    (rows = _c30A_(rows) ? rows : []),
    rows.filter(function (row) {
      try {
        return _caseReportMatchesPhase3_(row || {}, payload);
      } catch (_matchErr) {
        var query = _caseReportTextPhase3_(
          payload.query || payload.q || payload.keyword || "",
        ).toLowerCase();
        return (
          !query ||
          [
            row.caseNo,
            row.caseNum,
            row.recNo,
            row.receiveNo,
            row.title,
            row.subject,
            row.considerationTitle,
            row.caseTitle,
            row.petitioners,
            row.respondent,
            row.status,
            row.cat,
            row.subCat,
            row.assignees,
          ]
            .join(" ")
            .toLowerCase()
            .indexOf(query) > -1
        );
      }
    })
  );
}
function _caseSearchMaterializedQuery_(payload) {
  payload = payload || {};
  var started = Date.now(),
    idx = _caseSearchReadMaterializedIndex_(payload),
    noPage =
      payload.noPage === !0 ||
      payload.fullList === !0 ||
      payload.serverPaged === !1,
    page = Math.max(1, Number(payload.page || 1) || 1),
    limit = Math.max(
      1,
      Math.min(
        Number(payload.limit || payload.pageSize || 20) || 20,
        noPage ? 5e3 : 100,
      ),
    ),
    filtered = _caseSearchRowsMatch_(idx.rows || [], payload);
  filtered = _caseReportSortRowsPhase3_(filtered, payload);
  var totalRecords = filtered.length,
    totalPages = noPage ? 1 : Math.max(1, Math.ceil(totalRecords / limit)),
    safePage = noPage ? 1 : Math.max(1, Math.min(page, totalPages)),
    start = noPage ? 0 : (safePage - 1) * limit,
    outRows = noPage
      ? filtered.slice(0, limit)
      : filtered.slice(start, start + limit),
    rowsRead = idx.cacheHit
      ? 0
      : Number(idx.rowsRead || idx.totalRecords || 0) || 0,
    duration = Math.max(0, Date.now() - started),
    res = {
      ok: !0,
      rows: outRows,
      data: outRows,
      items: outRows,
      records: outRows,
      totalRecords,
      total: totalRecords,
      page: safePage,
      limit,
      pageSize: limit,
      totalPages,
      columns:
        typeof AppBackendCore != "undefined" && AppBackendCore.reportColumns
          ? AppBackendCore.reportColumns()
          : [],
      owner: "CaseDomain.searchCases",
      source: "CaseSearchMaterializedIndex.v2.query",
      readModel: CASE_SEARCH_MATERIALIZED_INDEX_STAMP,
      serverPaged: !noPage,
      serverFiltered: !0,
      rowsRead,
      returnedRows: outRows.length,
      rowsReturned: outRows.length,
      durationMs: duration,
      cacheHit: !!idx.cacheHit,
      cacheStatus: String(idx.cacheStatus || "materialized"),
      materializedIndexHit: !!idx.cacheHit,
      materializedIndexRows: Number(
        idx.totalRecords || (idx.rows || []).length || 0,
      ),
      meta: {
        source: "CaseSearchMaterializedIndex.v2.query",
        sourceOfTruth: "MainData+MeetingLogs",
        readModelOwner: "Code_30_Domain_Cases._caseSearchMaterializedQuery_",
        materializedIndex: CASE_SEARCH_MATERIALIZED_INDEX_STAMP,
        materializedIndexHit: !!idx.cacheHit,
        materializedIndexRows: Number(
          idx.totalRecords || (idx.rows || []).length || 0,
        ),
        serverPaged: !noPage,
        serverFiltered: !0,
        rowsRead,
        rowsReturned: outRows.length,
        returnedRows: outRows.length,
        totalRecords,
        durationMs: duration,
        cacheHit: !!idx.cacheHit,
        cacheStatus: String(idx.cacheStatus || "materialized"),
        uiDomChanged: !1,
        businessLogicChanged: !1,
      },
    };
  return (
    typeof AppBackendCore != "undefined" &&
      AppBackendCore.normalizeCaseSearchResponse &&
      (res = AppBackendCore.normalizeCaseSearchResponse(res)),
    res
  );
}
function _trackingMaterializedIndexScope_(payload) {
  return (
    (payload = payload || {}),
    {
      stamp: TRACKING_MATERIALIZED_INDEX_STAMP,
      dateKey: _hotRouteDateKey_(),
      lettersStamp: _appIsFnName_("_entityCacheStamp_")
        ? String(_entityCacheStamp_("letters") || "1")
        : "1",
      caseStamp: _appIsFnName_("_entityCacheStamp_")
        ? String(_entityCacheStamp_("maindata") || "1")
        : "1",
    }
  );
}
function _trackingMaterializedIndexKey_(payload) {
  return (
    "tracking_materialized_index_v2_" +
    _hotRouteDigest_(
      JSON.stringify(_trackingMaterializedIndexScope_(payload || {})),
    )
  );
}
function _trackingIndexSearchText_(item) {
  return (
    (item = item || {}),
    [
      item.letterId,
      item.caseId,
      item.caseNum,
      item.recNo,
      item.caseTitle,
      item.title,
      item.letterNo,
      item.bookNo,
      item.agency,
      item.subject,
      item.issue,
      item.status,
      item.letterStatus,
      item.officer,
      item.opStaff,
      item.letterDate,
      item.dueDate,
      item.extendDate,
    ]
      .join(" ")
      .toLowerCase()
  );
}
function _trackingPublicMaterializedItem_(item) {
  var out = {},
    src = item || {};
  return (
    Object.keys(src).forEach(function (k) {
      String(k).substring(0, 2) !== "__" && (out[k] = src[k]);
    }),
    out
  );
}
function _trackingReadMaterializedIndex_(payload, guardApi) {
  payload = payload || {};
  var started = Date.now(),
    allowCache =
      payload.forceFresh !== !0 &&
      payload.noCache !== !0 &&
      payload.bypassCache !== !0,
    key = _trackingMaterializedIndexKey_(payload),
    cached = allowCache ? _hotRouteCacheGet_(key) : null;
  if (cached && _c30A_(cached.rows))
    return (
      (cached.cacheHit = !0),
      (cached.cacheStatus = String(cached.cacheStatus || "materialized-hit")),
      (cached.rowsRead = 0),
      (cached.durationMs = Math.max(0, Date.now() - started)),
      cached
    );
  var trackingRepo = TrackingRepository_(),
    sourceRows = trackingRepo.listLetters(),
    caseMap = _trackingGetCaseMap_(
      trackingRepo,
      guardApi && guardApi.shouldYield,
      guardApi && guardApi.markPartial,
      payload.forceFresh === !0,
    ),
    today = new Date();
  today.setHours(0, 0, 0, 0);
  var normalizedItems = _trackingNormalizeRowsForServerPage_(
      sourceRows,
      caseMap,
      today,
      guardApi || {},
    ).map(function (item) {
      return (
        (item = item || {}),
        (item.__searchText = _trackingIndexSearchText_(item)),
        item
      );
    }),
    model = {
      ok: !0,
      rows: normalizedItems,
      totalRecords: normalizedItems.length,
      source: "TrackingMaterializedIndex.v2",
      readModel: TRACKING_MATERIALIZED_INDEX_STAMP,
      cacheHit: !1,
      cacheStatus: allowCache ? "materialized-miss" : "materialized-bypass",
      cacheKey: key,
      rowsRead: _c30A_(sourceRows) ? sourceRows.length : normalizedItems.length,
      rowsReturned: normalizedItems.length,
      durationMs: Math.max(0, Date.now() - started),
      generatedAt: new Date().toISOString(),
      scope: _trackingMaterializedIndexScope_(payload),
      meta: {
        source: "TrackingMaterializedIndex.v2",
        readModelOwner: "Code_30_Domain_Cases.trackingMaterializedIndex",
        sourceOfTruth: "Letters+MainData",
        rowsRead: _c30A_(sourceRows)
          ? sourceRows.length
          : normalizedItems.length,
        rowsReturned: normalizedItems.length,
        uiDomChanged: !1,
        businessLogicChanged: !1,
      },
    };
  return (
    allowCache &&
      _hotRouteCachePut_(
        key,
        model,
        Math.max(
          300,
          Math.min(Number(payload.indexTtlSeconds || 21600) || 21600, 21600),
        ),
      ),
    model
  );
}
function _trackingQueryMatchMapFromMaterialized_(query, items) {
  if (((query = _s_(query).trim().toLowerCase()), !query)) return null;
  var tokens = query
      .split(/[^0-9a-zA-Zก-๙]+/)
      .map(function (x) {
        return _s_(x).trim();
      })
      .filter(Boolean),
    map = {};
  return (
    (_c30A_(items) ? items : []).forEach(function (item) {
      var text = String(
          (item && item.__searchText) || _trackingIndexSearchText_(item),
        ).toLowerCase(),
        hit = text.indexOf(query) > -1;
      (!hit &&
        tokens.length &&
        (hit = tokens.every(function (t) {
          return text.indexOf(t) > -1;
        })),
        hit && (map[_s_(item && item.letterId)] = 1));
    }),
    map
  );
}
function _trackingBuildServerPageDataFromMaterialized_(payload, guardApi) {
  var opts = _trackingRequestOptions_((payload = payload || {})),
    idx = _trackingReadMaterializedIndex_(payload, guardApi),
    normalizedItems = _c30A_(idx.rows) ? idx.rows : [],
    matchedLetterIds = _trackingQueryMatchMapFromMaterialized_(
      opts.query,
      normalizedItems,
    ),
    baseItems = _trackingApplyServerFilters_(normalizedItems, {
      query: opts.query,
      matchedLetterIds,
      statusFilter: opts.statusFilter,
      staffFilter: opts.staffFilter,
      agencyFilter: opts.agencyFilter,
      caseIdFilter: opts.caseIdFilter,
    }),
    statusCounts = _trackingBuildStatusCounts_(baseItems),
    items = baseItems.filter(function (item) {
      return (
        !opts.typeFilter ||
        opts.typeFilter === "all" ||
        _s_(item.filterKey) === opts.typeFilter
      );
    });
  return (
    (items = _trackingSortServerItems_(items, opts.sortBy, opts.sortDir).map(
      _trackingPublicMaterializedItem_,
    )),
    {
      opts,
      rows: idx.cacheHit ? [] : normalizedItems,
      normalizedItems,
      baseItems,
      items,
      paged: _trackingPaginateServerItems_(items, payload),
      statusCounts,
      materializedIndex: idx,
    }
  );
}
function _hotRouteReadModelPayloadScope_(payload) {
  return (
    (payload = payload || {}),
    {
      q: _s_(payload.query || payload.q || payload.keyword)
        .trim()
        .toLowerCase(),
      reportType: String(
        payload.reportType || payload.groupType || payload.type || "all",
      )
        .trim()
        .toLowerCase(),
      reportValue: _s_(
        payload.reportValue || payload.groupValue || payload.value,
      ).trim(),
      filterType: String(payload.filterType || payload.statusType || "all")
        .trim()
        .toLowerCase(),
      status: _s_(payload.status).trim(),
      staff: _s_(payload.opStaff || payload.staff).trim(),
      agency: _s_(
        payload.agency || payload.agencyFilter || payload.agencyName,
      ).trim(),
      sortBy: String(payload.sortBy || "caseNum").trim(),
      sortDir: String(payload.sortDir || "asc")
        .trim()
        .toLowerCase(),
      page: Math.max(1, Number(payload.page || 1) || 1),
      limit: Math.max(
        1,
        Math.min(Number(payload.limit || payload.pageSize || 20) || 20, 100),
      ),
      caseIndexStamp: _caseSearchIndexScope_(payload).caseStamp,
      trackingIndexDate: _hotRouteDateKey_(),
      model: HOT_ROUTE_READ_MODEL_STAMP,
      sessionScope: _casePayloadSessionScopeR146_(payload),
      caseSequenceScope: _casePayloadSequenceScopeR146_(payload),
    }
  );
}
function _hotRouteReadModelCacheKey_(method, payload) {
  var scope = _hotRouteReadModelPayloadScope_(payload || {}),
    seed = JSON.stringify({ method: _s_(method), scope });
  return (
    "hot_route_query_window_v2_" +
    String(method || "api") +
    "_" +
    _hotRouteDigest_(seed)
  );
}
function _hotRouteRowsReturned_(res) {
  var data = res && res.data && typeof res.data == "object" ? res.data : res,
    rows = _c30A_(data && data.rows)
      ? data.rows
      : _c30A_(res && res.rows)
        ? res.rows
        : _c30A_(data && data.items)
          ? data.items
          : [];
  return rows.length;
}
function _hotRouteAttachReadModelMeta_(
  res,
  method,
  payload,
  started,
  cacheInfo,
) {
  res = res && typeof res == "object" ? res : { ok: !1, data: { rows: [] } };
  var data =
      res.data && typeof res.data == "object" && !_c30A_(res.data)
        ? res.data
        : res,
    rowsReturned = _hotRouteRowsReturned_(res),
    rowsRead = Number(data.rowsRead || res.rowsRead || rowsReturned || 0) || 0,
    meta = _c30O_({}, data.meta || res.meta || {}, {
      method: _s_(method),
      readModel: HOT_ROUTE_READ_MODEL_STAMP,
      readModelOwner: "Code_30_Domain_Cases.hotRouteMaterializedReadModel",
      durationMs: Math.max(0, Date.now() - Number(started || Date.now())),
      rowsRead,
      rowsReturned,
      cacheHit: !!(cacheInfo && cacheInfo.hit),
      cacheStatus: (cacheInfo && cacheInfo.status) || "bypass",
      cacheKey: (cacheInfo && cacheInfo.key) || "",
      source: String(method || "hot-route") + ".materializedQueryWindow",
      payloadScope: _hotRouteReadModelPayloadScope_(payload || {}),
    });
  return (
    (data.meta = meta),
    (data.readModel = HOT_ROUTE_READ_MODEL_STAMP),
    (data.cacheHit = meta.cacheHit),
    (data.cacheStatus = meta.cacheStatus),
    (data.durationMs = meta.durationMs),
    (data.rowsRead = rowsRead),
    (data.rowsReturned = rowsReturned),
    (res.meta = _c30O_({}, res.meta || {}, meta)),
    (res.readModel = HOT_ROUTE_READ_MODEL_STAMP),
    (res.cacheHit = meta.cacheHit),
    (res.cacheStatus = meta.cacheStatus),
    (res.durationMs = meta.durationMs),
    (res.rowsRead = rowsRead),
    (res.rowsReturned = rowsReturned),
    res
  );
}
function _hotRouteReadThrough_(method, payload, ttlSeconds, builder) {
  payload = payload || {};
  var started = Date.now(),
    allowCache =
      payload.forceFresh !== !0 &&
      payload.noCache !== !0 &&
      payload.bypassCache !== !0,
    key = _hotRouteReadModelCacheKey_(method, payload),
    cacheInfo = {
      key,
      status: allowCache ? "query-miss" : "query-bypass",
      hit: !1,
    };
  if (allowCache)
    try {
      var hit = _hotRouteCacheGet_(key);
      if (hit && typeof hit == "object")
        return (
          (cacheInfo.status = "query-hit"),
          (cacheInfo.hit = !0),
          _hotRouteAttachReadModelMeta_(
            hit,
            method,
            payload,
            started,
            cacheInfo,
          )
        );
    } catch (cacheErr) {
      ((cacheInfo.status = "query-read-error"),
        _c30W_("hotRoute.query.cacheGet", cacheErr, { method }));
    }
  var res = builder(payload || {});
  if (
    ((res = _hotRouteAttachReadModelMeta_(
      res,
      method,
      payload,
      started,
      cacheInfo,
    )),
    allowCache && res.ok !== !1)
  )
    try {
      _hotRouteCachePut_(
        key,
        res,
        Math.max(
          60,
          Math.min(
            Number(ttlSeconds || payload.cacheTtlSeconds || 600) || 600,
            21600,
          ),
        ),
      );
    } catch (cachePutErr) {
      _c30W_("hotRoute.query.cachePut", cachePutErr, { method });
    }
  return res;
}
function _getTrackingMaterializedCore_(payload) {
  payload = payload || {};
  var guard =
      typeof createExecutionGuard_ == "function"
        ? createExecutionGuard_({
            label: "_getTrackingMaterializedCore_",
            route: "apiGetTracking",
            maxMs: Number(payload.hardLimitMs || 28e3) || 28e3,
            warningMs: Number(payload.softLimitMs || 24e3) || 24e3,
          })
        : null,
    guardApi = _trackingGuardAdapters_(guard);
  try {
    var out = _trackingBuildServerOutput_(
        payload,
        _trackingBuildServerPageDataFromMaterialized_(payload, guardApi),
        _trackingMaterializedIndexKey_(payload),
        guard,
      ),
      idx = (out && out.materializedIndex) || null;
    return (
      (out.readModel = TRACKING_MATERIALIZED_INDEX_STAMP),
      (out.materializedIndex = TRACKING_MATERIALIZED_INDEX_STAMP),
      (out.materializedIndexHit = !!(idx && idx.cacheHit)),
      (out.rowsRead =
        idx && idx.cacheHit
          ? 0
          : Number((idx && idx.rowsRead) || out.rowsRead || 0) || 0),
      (out.rowsReturned = _c30A_(out.rows) ? out.rows.length : 0),
      (out.cacheHit = !!(idx && idx.cacheHit)),
      (out.cacheStatus = String(
        (idx && idx.cacheStatus) || out.cacheStatus || "materialized",
      )),
      (out.meta = _c30O_({}, out.meta || {}, {
        source: "tracking-materialized-index-query",
        readModelOwner: "Code_30_Domain_Cases._getTrackingMaterializedCore_",
        materializedIndex: TRACKING_MATERIALIZED_INDEX_STAMP,
        materializedIndexHit: !!(idx && idx.cacheHit),
        rowsRead: out.rowsRead,
        rowsReturned: out.rowsReturned,
        cacheHit: out.cacheHit,
        cacheStatus: out.cacheStatus,
        uiDomChanged: !1,
        businessLogicChanged: !1,
      })),
      ok_(out, "โหลดข้อมูลติดตามหนังสือสำเร็จ")
    );
  } catch (e) {
    return (
      _recordWarning_("tracking.materialized.error", e),
      _getTrackingCore_(payload)
    );
  }
}
((CaseDomain.searchCases = function (payload) {
  return (
    (payload = payload || {}),
    _hotRouteReadThrough_(
      "apiSearchCasesLite",
      payload,
      Number(payload.cacheTtlSeconds || 600) || 600,
      function (p) {
        return _caseSearchMaterializedQuery_(
          _c30O_(p || {}, {
            __route: "CaseDomain.searchCases",
            compactReadModel: !0,
            serverPaged: !0,
            __projectedFieldsOwner: "case-search-visible-fields-r146",
          }),
        );
      },
    )
  );
}),
  (CaseDomain.saveCase = function (payload) {
    if (
      ((payload = payload || {}),
      typeof AppRepository == "undefined" || !AppRepository.writeObject)
    )
      return { ok: !1, error: "CASE_REPOSITORY_WRITE_UNAVAILABLE" };
    var saved = AppRepository.writeObject(
        CaseDomain.SHEET_NAME,
        "id",
        payload,
        { domain: "cases" },
      ),
      invalidated;
    return {
      ok: !0,
      item: saved,
      data: { item: saved },
      owner: "CaseDomain.saveCase",
      cacheInvalidation: AppRepository.afterWrite
        ? AppRepository.afterWrite([
            "cases",
            "dashboard",
            "tracking",
            "meeting",
          ])
        : [],
    };
  }),
  (CaseDomain.getReportExportRows = function (payload) {
    payload = payload || {};
    var maxRows = Math.max(
        1,
        Math.min(Number(payload.maxRows || payload.limit || 5e3) || 5e3, 5e3),
      ),
      res = _caseReportReadModelPhase4_(
        _c30O_({}, payload, {
          page: 1,
          limit: maxRows,
          pageSize: maxRows,
          maxRows,
          noPage: !0,
          fullList: !0,
          serverPaged: !1,
          exportMode: String(payload.exportMode || payload.mode || "report"),
          compactReadModel: !0,
          includeMeetingHistory: payload.includeMeetingHistory !== !1,
          forceFresh: payload.forceFresh === !0,
          noCache: payload.noCache === !0,
          bypassCache: payload.bypassCache === !0,
          __route: "CaseDomain.getReportExportRows",
          source: "apiGetCaseReportExportRows.phase4",
        }),
      ),
      rows = _c30A_(res && res.rows) ? res.rows.slice(0, maxRows) : [],
      total = Number((res && res.totalRecords) || rows.length || 0) || 0;
    return {
      ok: !0,
      rows,
      data: rows,
      items: rows,
      totalRecords: total,
      total,
      returnedRows: rows.length,
      maxRows,
      truncated: total > rows.length,
      page: 1,
      limit: rows.length || maxRows,
      pageSize: rows.length || maxRows,
      totalPages: 1,
      serverPaged: !1,
      exportMode: String(payload.exportMode || payload.mode || "report"),
      owner: "CaseDomain.getReportExportRows",
      source: "CaseReportIndex.phase4.export",
      readModel: PHASE4_CASE_REPORT_INDEX_STAMP,
      generatedAt: new Date().toISOString(),
      meta: _c30O_({}, (res && res.meta) || {}, {
        includeMeetingHistory: payload.includeMeetingHistory !== !1,
        sourceOfTruth: "MainData+MeetingLogs",
        reportReadModel: PHASE4_CASE_REPORT_INDEX_STAMP,
        meetingHistoryMatchedRows:
          Number((res && res.meetingHistoryMatchedRows) || 0) || 0,
      }),
    };
  }),
  (CaseDomain.quickSummary = function (payload) {
    payload = payload || {};
    var res = CaseDomain.searchCases(
        _c30O_({}, payload, { noPage: !0, limit: 500 }),
      ),
      rows = _c30A_(res && res.rows) ? res.rows : [],
      statusMap = {},
      typeMap = {};
    function top(map) {
      return Object.keys(map || {})
        .map(function (k) {
          return { label: k, count: Number(map[k] || 0) };
        })
        .sort(function (a, b) {
          return (
            Number(b.count || 0) - Number(a.count || 0) ||
            _s_(a.label).localeCompare(_s_(b.label), "th")
          );
        })
        .slice(0, 8);
    }
    return (
      rows.forEach(function (r) {
        var st = CaseDomain.caseText((r && r.status) || "") || "ไม่ระบุสถานะ",
          ty = CaseDomain.caseText((r && r.cat) || "") || "ไม่ระบุประเภท";
        ((statusMap[st] = (statusMap[st] || 0) + 1),
          (typeMap[ty] = (typeMap[ty] || 0) + 1));
      }),
      {
        ok: !0,
        data: {
          total: Number((res && res.totalRecords) || rows.length || 0),
          query: _s_(payload.query || payload.q || payload.keyword),
          reportType: String(
            payload.reportType || payload.groupType || payload.type || "all",
          ),
          reportValue: _s_(
            payload.reportValue || payload.groupValue || payload.value,
          ),
          byStatus: top(statusMap),
          byType: top(typeMap),
          generatedAt: new Date().toISOString(),
          cached: !1,
          cacheStatus: "CaseDomain.quickSummary",
        },
        owner: "CaseDomain.quickSummary",
      }
    );
  }),
  (CaseDomain.getReportOptions = function (payload) {
    payload = payload || {};
    var facets = _caseReportFacetsPhase3_(payload);
    return {
      ok: !0,
      data: facets,
      owner: "CaseDomain.getReportOptions",
      source: "CaseReportFacets.phase4",
      readModel: PHASE4_CASE_REPORT_INDEX_STAMP,
    };
  }),
  (CaseDomain.status = function () {
    return _domainStatusPhaseC_(CaseDomain, "CaseDomain");
  }));
function _committeeMeetingSheetSpec_() {
  return {
    sheets: {
      CommitteeMeetings: {
        purpose: "ข้อมูลหัวการประชุมของคณะกรรมาธิการ",
        key: "meetingId",
        headers: [
          "meetingId",
          "meetingNo",
          "meetingDate",
          "title",
          "status",
          "note",
          "createdAt",
          "updatedAt",
          "isDeleted",
          "deletedAt",
        ],
      },
      CommitteeMeetingAgendaItems: {
        purpose: "รายการระเบียบวาระการประชุม 1-4 แบบหลายรายการ",
        key: "itemId",
        headers: [
          "itemId",
          "meetingId",
          "agendaNo",
          "seq",
          "title",
          "relatedMeetingNo",
          "relatedMeetingDate",
          "caseId",
          "caseNum",
          "recNo",
          "caseTitle",
          "letterId",
          "letterNo",
          "letterSubject",
          "agencyOrPresenter",
          "result",
          "note",
          "createdAt",
          "updatedAt",
          "isDeleted",
          "deletedAt",
        ],
      },
    },
    sync: {
      targetSheet: "MeetingLogs",
      rule: "รายการระเบียบวาระที่ 1 และ 3 ที่เชื่อม caseId จะบันทึก/อัปเดตประวัติการพิจารณาของคณะกรรมาธิการอัตโนมัติ โดยใช้ครั้งที่=meetingNo, วันประชุม=meetingDate, ผลการประชุม/มติที่ประชุม=result",
    },
  };
}
function _committeeMeetingRows_(sheetName, includeDeleted) {
  try {
    return (
      ensureCanonicalHeadersForNewSheet_(sheetName),
      _caseDomainSharedRows_(sheetName, [], {
        includeDeleted: includeDeleted === !0,
        requireCanonical: !0,
        ttl: 180,
      })
    );
  } catch (e) {
    throw new Error(
      "ไม่สามารถอ่านชีต " +
        sheetName +
        " ได้: " +
        String((e && e.message) || e),
    );
  }
}
function _committeeMeetingRepo_(name) {
  return getCanonicalRepository_(name);
}
function _committeeMeetingPad2_(n) {
  return ((n = Number(n) || 0) < 10 ? "0" : "") + String(n);
}
function _committeeMeetingIsDate_(v) {
  return (
    Object.prototype.toString.call(v) === "[object Date]" && !isNaN(v.getTime())
  );
}
function _committeeMeetingDateText_(v) {
  return _caseDateTextPhaseD2_(v, {
    preserveRaw: !0,
    context: "committeeMeeting",
  });
}
function _committeeMeetingText_(v) {
  return _committeeMeetingIsDate_(v)
    ? _committeeMeetingDateText_(v)
    : _c30S_(v).trim();
}
function _committeeMeetingCaseRefText_(v) {
  if (v == null) return "";
  var raw = _c30S_(v).trim();
  if (!raw && !_committeeMeetingIsDate_(v)) return "";
  if (/^\d{1,6}\s*\/\s*(?:19|20|25)\d{2}$/.test(raw))
    return raw.replace(/\s*\/\s*/, "/");
  if (/^\d{1,6}\s*[-–—]\s*(?:19|20|25)\d{2}$/.test(raw))
    return raw.replace(/\s*[-–—]\s*/, "/");
  var mixed = raw.match(/^(\d{1,6})\s*\/\s*(.+)$/),
    dateLike;
  if (mixed) {
    var tail = _s_(mixed[2]).trim(),
      tailLooksDate;
    if (
      /^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s/i.test(tail) ||
      /GMT[+-]\d{4}|เวลาอินโดจีน/i.test(tail) ||
      /^\d{4}-\d{1,2}-\d{1,2}(?:[T\s]|$)/.test(tail) ||
      /^\d{1,2}[\/\-]\d{1,2}[\/\-](?:19|20|25)\d{2}$/.test(tail)
    ) {
      var tailDate = new Date(
        tail
          .replace(/\s*\(.*?\)\s*/g, " ")
          .replace(/เวลาอินโดจีน/g, "")
          .trim(),
      );
      if (!isNaN(tailDate.getTime())) {
        var ty = tailDate.getFullYear();
        return (ty < 2400 && (ty += 543), mixed[1] + "/" + String(ty));
      }
    }
  }
  if (
    _committeeMeetingIsDate_(v) ||
    /^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s/i.test(raw) ||
    /GMT[+-]\d{4}|เวลาอินโดจีน/i.test(raw) ||
    /^\d{4}-\d{1,2}-\d{1,2}(?:[T\s]|$)/.test(raw)
  ) {
    try {
      if (_appIsFnName_("_formatLetterNoFromDateValue_")) {
        var no = _formatLetterNoFromDateValue_(v);
        if (no) return no;
      }
    } catch (_e) {
      _c30W_("ec", _e);
    }
    var dt = _committeeMeetingDateText_(v),
      dm = _s_(dt).match(/^0?(\d{1,2})\/\d{1,2}\/((?:19|20|25)\d{2})$/);
    if (dm) return dm[1] + "/" + dm[2];
  }
  return raw;
}
function _committeeMeetingPublicMeeting_(row) {
  row = row || {};
  var out = {};
  return (
    Object.keys(row).forEach(function (k) {
      out[k] = row[k];
    }),
    (out.meetingId = _committeeMeetingText_(row.meetingId || "")),
    (out.meetingNo = _committeeMeetingText_(row.meetingNo || "")),
    (out.meetingDate = _committeeMeetingDateText_(
      row.meetingDate || row.date || "",
    )),
    (out.title = _committeeMeetingText_(row.title || "การประชุมคณะกรรมาธิการ")),
    (out.status = _committeeMeetingText_(row.status || "")),
    (out.note = _committeeMeetingText_(row.note || "")),
    (out.readOnlyLegacy =
      !!row.__legacyReadOnly || /^LEGACY-/.test(out.meetingId)),
    out
  );
}
function _committeeMeetingPublicItem_(row) {
  row = row || {};
  var out = {};
  return (
    Object.keys(row).forEach(function (k) {
      out[k] = row[k];
    }),
    (out.itemId = _committeeMeetingText_(row.itemId || "")),
    (out.meetingId = _committeeMeetingText_(row.meetingId || "")),
    (out.agendaNo = _committeeMeetingText_(row.agendaNo || "")),
    (out.seq = Number(row.seq || 0) || 0),
    (out.title = _committeeMeetingText_(row.title || "")),
    (out.relatedMeetingNo = _committeeMeetingText_(row.relatedMeetingNo || "")),
    (out.relatedMeetingDate = _committeeMeetingDateText_(
      row.relatedMeetingDate || "",
    )),
    (out.caseId = _committeeMeetingText_(row.caseId || "")),
    (out.caseNum = _committeeMeetingCaseRefText_(row.caseNum || "")),
    (out.recNo = _committeeMeetingCaseRefText_(row.recNo || "")),
    (out.caseTitle = _committeeMeetingText_(row.caseTitle || "")),
    (out.letterId = ""),
    (out.letterNo = ""),
    (out.letterSubject = ""),
    (out.agencyOrPresenter = _committeeMeetingText_(
      row.agencyOrPresenter || "",
    )),
    (out.result = _committeeMeetingText_(row.result || "")),
    (out.note = _committeeMeetingText_(row.note || "")),
    out
  );
}
function _committeeMeetingId_(prefix) {
  return (
    String(prefix || "CM") +
    "-" +
    Utilities.getUuid().replace(/-/g, "").slice(0, 16).toUpperCase()
  );
}
function _committeeMeetingNormalizeItem_(raw, meetingId, idx) {
  var agendaNo = _committeeMeetingText_(
      (raw = raw || {}).agendaNo || raw.agenda || "",
    ),
    itemId;
  return {
    itemId:
      _committeeMeetingText_(raw.itemId || "") || _committeeMeetingId_("CMI"),
    meetingId,
    agendaNo,
    seq: Number(raw.seq || idx || 1) || 1,
    title: _committeeMeetingText_(
      raw.title || raw.caseTitle || raw.subject || "",
    ),
    relatedMeetingNo: _committeeMeetingText_(
      raw.relatedMeetingNo || raw.certifyMeetingNo || "",
    ),
    relatedMeetingDate: _committeeMeetingDateText_(
      raw.relatedMeetingDate || raw.certifyMeetingDate || "",
    ),
    caseId: _committeeMeetingText_(raw.caseId || ""),
    caseNum: _committeeMeetingCaseRefText_(raw.caseNum || ""),
    recNo: _committeeMeetingCaseRefText_(raw.recNo || ""),
    caseTitle: _committeeMeetingText_(raw.caseTitle || raw.title || ""),
    letterId: "",
    letterNo: "",
    letterSubject: "",
    agencyOrPresenter: _committeeMeetingText_(
      raw.agencyOrPresenter || raw.agency || raw.presenter || "",
    ),
    result: _committeeMeetingText_(
      raw.result || raw.resolution || raw.note || "",
    ),
    note: _committeeMeetingText_(raw.note || ""),
    isDeleted: !1,
    deletedAt: "",
  };
}
function _committeeMeetingItemHasContent_(item) {
  return !!(
    _committeeMeetingText_(item.title) ||
    _committeeMeetingText_(item.relatedMeetingNo) ||
    _committeeMeetingText_(item.relatedMeetingDate) ||
    _committeeMeetingText_(item.caseId) ||
    _committeeMeetingText_(item.caseTitle) ||
    _committeeMeetingText_(item.agencyOrPresenter) ||
    _committeeMeetingText_(item.result) ||
    _committeeMeetingText_(item.note)
  );
}
function _committeeMeetingLinkCaseInfo_(item) {
  if ((item = item || {}).caseId)
    try {
      var found = _safeResolveCaseIdentityAliases_({
        caseId: item.caseId,
        caseNum: item.caseNum,
        recNo: item.recNo,
        title: item.title,
        caseTitle: item.caseTitle,
      }).case;
      found &&
        ((item.caseId = _committeeMeetingText_(found.caseId || item.caseId)),
        (item.caseNum = _committeeMeetingCaseRefText_(
          found.caseNum || item.caseNum,
        )),
        (item.recNo = _committeeMeetingCaseRefText_(found.recNo || item.recNo)),
        (item.caseTitle = _committeeMeetingText_(
          found.caseTitle || found.title || item.caseTitle || item.title,
        )),
        item.title || (item.title = item.caseTitle));
    } catch (_e) {
      _recordWarning_("committee.meeting.case.link", _e);
    }
  return item;
}
function _committeeMeetingSyncAgenda1And3ToHistory_(meeting, items) {
  var synced = [];
  return (
    (items || []).forEach(function (item) {
      var agendaNo = _s_(item.agendaNo);
      if (
        (agendaNo === "1" || agendaNo === "3" || agendaNo === "4") &&
        _s_(item.caseId).trim()
      ) {
        var logId =
            "MSYS-" +
            _s_(item.itemId)
              .replace(/[^A-Za-z0-9_-]/g, "")
              .slice(0, 40),
          res = saveMeetingLog({
            logId,
            currentLogId: logId,
            caseId: item.caseId,
            caseNum: item.caseNum,
            recNo: item.recNo,
            title: item.caseTitle || item.title,
            round: meeting.meetingNo,
            date: _committeeMeetingDateText_(meeting.meetingDate),
            note: item.result || item.note,
            result: item.result || item.note,
            summary: [
              _committeeMeetingAgendaLabel_(item.agendaNo),
              item.agencyOrPresenter,
            ]
              .filter(function (v) {
                return !!_committeeMeetingText_(v);
              })
              .join(" / "),
            meetingId: meeting.meetingId,
          });
        synced.push({
          itemId: item.itemId,
          caseId: item.caseId,
          logId,
          result: res && res.data ? res.data : res,
        });
      }
    }),
    synced
  );
}
function _committeeMeetingSortableDate_(value) {
  if (_committeeMeetingIsDate_(value)) return value.getTime();
  var raw = _s_(value).trim();
  if (!raw) return 0;
  var m = raw.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
  if (m) {
    var y = Number(m[3]);
    return (
      y > 2400 && (y -= 543),
      new Date(y, Number(m[2]) - 1, Number(m[1])).getTime() || 0
    );
  }
  var iso = raw.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (iso) {
    var y2 = Number(iso[1]);
    return (
      y2 > 2400 && (y2 -= 543),
      new Date(y2, Number(iso[2]) - 1, Number(iso[3])).getTime() || 0
    );
  }
  var d = new Date(
    raw.replace(/\s*\(.*?\)\s*/g, " ").replace(/เวลาอินโดจีน/g, ""),
  );
  return isNaN(d.getTime()) ? 0 : d.getTime();
}
function _committeeMeetingMeetingHeaderMatch_(meeting, q) {
  return (
    !q ||
    [
      (meeting = meeting || {}).meetingNo,
      _committeeMeetingDateText_(meeting.meetingDate),
      meeting.title,
      meeting.status,
      meeting.note,
    ]
      .join(" ")
      .toLowerCase()
      .indexOf(q) > -1
  );
  var hay;
}
function _committeeMeetingItemMatch_(meeting, item, q, agendaFilter) {
  if (
    ((item = item || {}),
    agendaFilter && _s_(item.agendaNo) !== String(agendaFilter))
  )
    return !1;
  if (!q) return !0;
  var title = _committeeMeetingAgendaTitle_(item),
    hay;
  return (
    [
      meeting && meeting.meetingNo,
      meeting && _committeeMeetingDateText_(meeting.meetingDate),
      meeting && meeting.title,
      title,
      item.title,
      item.caseTitle,
      item.caseNum,
      item.recNo,
      item.agencyOrPresenter,
      item.result,
      item.note,
      _committeeMeetingAgendaLabel_(item.agendaNo),
    ]
      .join(" ")
      .toLowerCase()
      .indexOf(q) > -1
  );
}
function _committeeMeetingConsiderationDisplayTitle_(meeting, items) {
  meeting = meeting || {};
  return _committeeMeetingText_(
    meeting.title ||
      meeting.meetingTitle ||
      meeting.name ||
      "การประชุมคณะกรรมาธิการ",
  );
}
function _committeeMeetingLegacyHash_(value) {
  var s = _committeeMeetingText_(value),
    h = 0;
  for (var i = 0; i < s.length; i += 1) h = (h * 31 + s.charCodeAt(i)) | 0;
  return String(Math.abs(h || 1));
}
function _committeeMeetingLegacyBundle_() {
  var logs = [];
  try {
    logs =
      _caseDomainSharedRows_("MeetingLogs", [], {
        includeDeleted: !1,
        requireCanonical: !1,
        ttl: 60,
      }) || [];
  } catch (_legacyMeetingReadErr) {
    _c30W_("MeetingDomain.compatibilityProjectedRead", _legacyMeetingReadErr, {
      sheetName: "MeetingLogs",
      source: "MeetingLogs-compat-read",
    });
    return {
      meetings: [],
      items: [],
      source: "MeetingLogs-compat-read",
      degraded: !0,
    };
  }
  var groups = {},
    items = [];
  return (
    logs.forEach(function (row, idx) {
      if (!row || isSoftDeletedRow_(row)) return;
      var round = _committeeMeetingText_(
          row.round || row.meetingNo || row["ครั้งที่"] || "",
        ),
        date = _committeeMeetingDateText_(
          row.dateRaw ||
            row.date ||
            row.meetingDate ||
            row["วันที่ประชุม"] ||
            "",
        ),
        sourceId = _committeeMeetingText_(row.meetingId || ""),
        signature = [round, date].join("|");
      if (!round && !date) return;
      var id = sourceId || "LEGACY-" + _committeeMeetingLegacyHash_(signature),
        meetingTitle =
          _committeeMeetingText_(
            row.meetingTitle ||
              row.meetingName ||
              row.name ||
              row.summaryTitle ||
              row.displayTitle ||
              row["ชื่อการประชุม"] ||
              row["หัวข้อการประชุม"] ||
              "",
          ) ||
          ["การประชุมคณะกรรมาธิการ", round ? "ครั้งที่ " + round : ""]
            .filter(function (v) {
              return !!_committeeMeetingText_(v);
            })
            .join(" ");
      groups[id] ||
        (groups[id] = {
          meetingId: id,
          meetingNo: round,
          meetingDate: date,
          title: meetingTitle,
          status: "legacy",
          note: "",
          __legacyReadOnly: !sourceId,
          readOnlyLegacy: !sourceId,
        });
      var item = {
        itemId:
          _committeeMeetingText_(row.logId || row.id || row.rowId || "") ||
          "LEGACY-ITEM-" + _committeeMeetingLegacyHash_(signature + "|" + idx),
        meetingId: id,
        agendaNo: "3",
        seq: idx + 1,
        title: _committeeMeetingText_(
          row.caseTitle || row.title || row.subject || "",
        ),
        caseId: _committeeMeetingText_(row.caseId || ""),
        caseNum: _committeeMeetingCaseRefText_(row.caseNum || row.caseNo || ""),
        recNo: _committeeMeetingCaseRefText_(row.recNo || row.receiveNo || ""),
        caseTitle: _committeeMeetingText_(
          row.caseTitle || row.title || row.subject || "",
        ),
        agencyOrPresenter: _committeeMeetingText_(
          row.agencyName || row.respondent || "",
        ),
        result: _committeeMeetingText_(
          row.result || row.note || row.summary || "",
        ),
        note: _committeeMeetingText_(row.note || ""),
      };
      items.push(_committeeMeetingPublicItem_(item));
    }),
    {
      meetings: Object.keys(groups).map(function (k) {
        return _committeeMeetingPublicMeeting_(groups[k]);
      }),
      items: items,
      source: "MeetingLogs-compat-read",
      degraded: !1,
    }
  );
}
function _committeeMeetingSafeCanonicalRows_(sheetName, asItems, context) {
  try {
    var rows = _committeeMeetingRows_(sheetName, !1) || [];
    return asItems ? rows.map(_committeeMeetingPublicItem_) : rows;
  } catch (_canonicalMeetingReadErr) {
    return (
      _c30W_(context, _canonicalMeetingReadErr, { sheetName: sheetName }),
      []
    );
  }
}
function _committeeMeetingBuildBundle_(payload) {
  var meetingId = _committeeMeetingText_(
      (payload = payload || {}).meetingId || payload.id || "",
    ),
    q = _committeeMeetingText_(
      payload.query || payload.q || payload.keyword || "",
    ).toLowerCase(),
    agendaFilter = _committeeMeetingText_(
      payload.agendaNo || payload.agenda || "",
    ),
    meetingsAll = _committeeMeetingSafeCanonicalRows_(
      "CommitteeMeetings",
      !1,
      "committee.meeting.canonicalMeetingsRead",
    ),
    itemsAll = _committeeMeetingSafeCanonicalRows_(
      "CommitteeMeetingAgendaItems",
      !0,
      "committee.meeting.canonicalItemsRead",
    ),
    includeLegacyReadOnly =
      payload.includeLegacyReadOnly === !0 || payload.compatLegacy === !0,
    legacy = includeLegacyReadOnly
      ? _committeeMeetingLegacyBundle_()
      : { meetings: [], items: [] },
    canonicalMeetings = {},
    canonicalItems = {};
  meetingsAll.forEach(function (m) {
    canonicalMeetings[_s_(m.meetingId)] = !0;
  });
  itemsAll.forEach(function (it) {
    canonicalItems[_s_(it.itemId)] = !0;
  });
  includeLegacyReadOnly &&
    (legacy.meetings || []).forEach(function (m) {
      var id = _s_(m.meetingId);
      canonicalMeetings[id] ||
        ((canonicalMeetings[id] = !0), meetingsAll.push(m));
    });
  includeLegacyReadOnly &&
    (legacy.items || []).forEach(function (it) {
      var id = _s_(it.itemId);
      canonicalItems[id] || ((canonicalItems[id] = !0), itemsAll.push(it));
    });
  var allGrouped = {};
  (itemsAll.forEach(function (item) {
    var id = _s_(item.meetingId);
    (allGrouped[id] || (allGrouped[id] = []), allGrouped[id].push(item));
  }),
    Object.keys(allGrouped).forEach(function (id) {
      allGrouped[id].sort(function (a, b) {
        return (
          Number(a.agendaNo || 0) - Number(b.agendaNo || 0) ||
          Number(a.seq || 0) - Number(b.seq || 0)
        );
      });
    }));
  var meetingsRaw,
    meetings = meetingsAll
      .filter(function (meeting) {
        var id = _s_(meeting.meetingId);
        if (meetingId) return id === meetingId;
        if (!q && !agendaFilter) return !0;
        var rows = allGrouped[id] || [],
          hasAgenda =
            !agendaFilter ||
            rows.some(function (item) {
              return _s_(item.agendaNo) === String(agendaFilter);
            });
        return (
          !(agendaFilter && !hasAgenda) &&
          (q
            ? !!_committeeMeetingMeetingHeaderMatch_(meeting, q) ||
              rows.some(function (item) {
                return _committeeMeetingItemMatch_(
                  meeting,
                  item,
                  q,
                  agendaFilter,
                );
              })
            : hasAgenda)
        );
      })
      .sort(function (a, b) {
        var an = Number(_s_(a.meetingNo).replace(/[^0-9.\-]/g, "")),
          bn = Number(_s_(b.meetingNo).replace(/[^0-9.\-]/g, ""));
        if (!isNaN(an) && !isNaN(bn) && an !== bn) return an - bn;
        var cmp = _s_(a.meetingNo).localeCompare(_s_(b.meetingNo), "th", {
            numeric: !0,
            sensitivity: "base",
          }),
          av,
          bv;
        return cmp !== 0
          ? cmp
          : _committeeMeetingSortableDate_(a.meetingDate) -
              _committeeMeetingSortableDate_(b.meetingDate);
      })
      .map(_committeeMeetingPublicMeeting_),
    ids = {};
  meetings.forEach(function (m) {
    ids[_s_(m.meetingId)] = !0;
  });
  var items = itemsAll.filter(function (item) {
      return ids[_s_(item.meetingId)] === !0;
    }),
    grouped = {};
  return (
    items.forEach(function (item) {
      var id = _s_(item.meetingId);
      (grouped[id] || (grouped[id] = []), grouped[id].push(item));
    }),
    Object.keys(grouped).forEach(function (id) {
      grouped[id].sort(function (a, b) {
        return (
          Number(a.agendaNo || 0) - Number(b.agendaNo || 0) ||
          Number(a.seq || 0) - Number(b.seq || 0)
        );
      });
    }),
    meetings.forEach(function (meeting) {
      var displayTitle = _committeeMeetingText_(
        meeting.title ||
          meeting.meetingTitle ||
          meeting.name ||
          "การประชุมคณะกรรมาธิการ",
      );
      ((meeting.displayTitle = displayTitle),
        (meeting.summaryTitle = displayTitle));
    }),
    {
      meetings,
      items,
      itemsByMeetingId: grouped,
      spec: _committeeMeetingSheetSpec_(),
      filters: {
        query: q,
        agendaNo: agendaFilter,
        agendaLabel: agendaFilter
          ? _committeeMeetingAgendaLabel_(agendaFilter)
          : "ทุกวาระ",
      },
    }
  );
}
((TrackingDomain.VERSION = "tracking-domain-final-current"),
  (TrackingDomain.normalize = function (res) {
    var data = res && res.data && typeof res.data == "object" ? res.data : res;
    if (data && typeof data == "object") {
      var rows = _c30A_(data.rows)
        ? data.rows
        : _c30A_(data.data)
          ? data.data
          : _c30A_(data.items)
            ? data.items
            : [];
      ((data.rows = rows),
        (data.data = rows),
        (data.items = rows),
        (data.totalRecords =
          Number(data.totalRecords || data.total || rows.length || 0) || 0),
        (data.total = data.totalRecords),
        (data.page = Number(data.page || 1) || 1),
        (data.limit = Number(data.limit || data.pageSize || 20) || 20),
        (data.pageSize = data.limit),
        (data.owner = "TrackingDomain.getTracking"),
        (data.domainOwner = "TrackingDomain"),
        (data.serverPaged = data.serverPaged !== !1));
    }
    return res;
  }),
  (TrackingDomain.getTracking = function (payload) {
    return (
      (payload = payload || {}),
      _hotRouteReadThrough_(
        "apiGetTracking",
        payload,
        Number(payload.cacheTtlSeconds || 600) || 600,
        function (p) {
          return TrackingDomain.normalize(_getTrackingMaterializedCore_(p));
        },
      )
    );
  }),
  (TrackingDomain.status = function () {
    return _domainStatusPhaseC_(TrackingDomain, "TrackingDomain");
  }),
  (AppDomain.Repositories.CaseRepository = {
    search: function (payload) {
      return CaseDomain.searchCases(payload || {});
    },
    readModel: function (payload) {
      return _caseSearchReadModel_(payload || {});
    },
    facets: function (payload) {
      return _caseSearchReportFacets_(payload || {});
    },
  }),
  (CaseDomain.FACADE_PHASE5 = {
    owner: "Code_30_Domain_Cases:CaseService.ProductionOwner",
    repository: AppDomain.Repositories.CaseRepository,
    search: function (payload) {
      return CaseDomain.searchCases(payload || {});
    },
    reportOptions: function (payload) {
      return CaseDomain.getReportOptions(payload || {});
    },
    reportExportRows: function (payload) {
      return CaseDomain.getReportExportRows(payload || {});
    },
    quickSummary: function (payload) {
      return CaseDomain.quickSummary(payload || {});
    },
    meetingHistory: function (payload) {
      return typeof _caseAttachMeetingHistoryProduction_ == "function"
        ? _caseAttachMeetingHistoryProduction_(payload || {})
        : payload;
    },
    status: function () {
      return {
        ok: !0,
        owner: this.owner,
        uiDomChanged: !1,
        businessLogicChanged: !1,
      };
    },
  }));
function apiGetCommitteeMeetingSystemSpec(payload) {
  return MeetingDomain.getSystemSpec(payload || {});
}
function apiListCommitteeMeetings(payload) {
  return MeetingDomain.listMeetings(payload || {});
}
function apiGetCommitteeMeetingSystem(payload) {
  return MeetingDomain.getSystem(payload || {});
}
function _committeeMeetingAgendaTitle_(item) {
  item = item || {};
  var agendaNo = _s_(item.agendaNo),
    label;
  return agendaNo === "2"
    ? [
        "การประชุมครั้งที่ " +
          _committeeMeetingText_(item.relatedMeetingNo || ""),
        _committeeMeetingText_(item.relatedMeetingDate || ""),
      ]
        .filter(function (v) {
          return v && v !== "การประชุมครั้งที่ ";
        })
        .join(" / ") ||
        _committeeMeetingText_(item.title || "รับรองบันทึกการประชุม")
    : _committeeMeetingText_(
        agendaNo === "3" || agendaNo === "4"
          ? item.caseTitle || item.title || ""
          : item.title || item.caseTitle || "",
      );
}
function _committeeMeetingAgendaLabel_(agendaNo) {
  var m;
  return (
    {
      1: "ระเบียบวาระที่ 1 เรื่องแจ้ง",
      2: "ระเบียบวาระที่ 2 รับรองบันทึกการประชุม",
      3: "ระเบียบวาระที่ 3 เรื่องพิจารณา",
      4: "ระเบียบวาระที่ 4 เรื่องอื่น ๆ",
    }[_s_(agendaNo)] || "ระเบียบวาระ"
  );
}
function _committeeMeetingPrintBundle_(payload) {
  var q = _committeeMeetingText_(
      (payload = payload || {}).query || payload.keyword || "",
    ).toLowerCase(),
    agendaFilter = _committeeMeetingText_(
      payload.agendaNo || payload.agenda || "",
    ),
    bundle = _committeeMeetingBuildBundle_({
      query: q,
      agendaNo: agendaFilter,
      includeLegacyReadOnly: !1,
    }),
    overviewRows = [],
    summaryMeetings = [],
    listMeetings = [];
  return (
    (bundle.meetings || []).forEach(function (meeting) {
      var meetingId = _s_(meeting.meetingId),
        displayTitle = _committeeMeetingText_(
          meeting.title ||
            meeting.meetingTitle ||
            meeting.name ||
            meeting.displayTitle ||
            meeting.summaryTitle ||
            "การประชุมคณะกรรมาธิการ",
        );
      listMeetings.push({
        meetingId,
        meetingNo: _committeeMeetingText_(meeting.meetingNo || ""),
        meetingDate: _committeeMeetingText_(meeting.meetingDate || ""),
        title: displayTitle,
        displayTitle,
        summaryTitle: displayTitle,
        note: _committeeMeetingText_(meeting.note || ""),
      });
      var meetingItems = (
          (bundle.itemsByMeetingId && bundle.itemsByMeetingId[meetingId]) ||
          []
        ).filter(function (item) {
          return !agendaFilter || _s_(item.agendaNo) === agendaFilter;
        }),
        agenda13 = meetingItems
          .filter(function (item) {
            var agendaNo = _s_(item.agendaNo);
            return (
              (agendaNo === "1" || agendaNo === "3" || agendaNo === "4") &&
              !!_s_(item.caseId).trim()
            );
          })
          .map(function (item) {
            return {
              meetingId,
              meetingNo: _committeeMeetingText_(meeting.meetingNo || ""),
              meetingDate: _committeeMeetingText_(meeting.meetingDate || ""),
              meetingTitle: displayTitle,
              displayTitle,
              agendaNo: _committeeMeetingText_(item.agendaNo || ""),
              agendaLabel: _committeeMeetingAgendaLabel_(item.agendaNo),
              title: _committeeMeetingAgendaTitle_(item),
              caseId: _committeeMeetingText_(item.caseId || ""),
              caseNum: _committeeMeetingCaseRefText_(item.caseNum || ""),
              recNo: _committeeMeetingCaseRefText_(item.recNo || ""),
              agencyOrPresenter: _committeeMeetingText_(
                item.agencyOrPresenter || "",
              ),
              result: _committeeMeetingText_(item.result || item.note || ""),
            };
          });
      ((overviewRows = overviewRows.concat(agenda13)),
        summaryMeetings.push({
          meetingId,
          meetingNo: _committeeMeetingText_(meeting.meetingNo || ""),
          meetingDate: _committeeMeetingText_(meeting.meetingDate || ""),
          title: displayTitle,
          displayTitle,
          note: _committeeMeetingText_(meeting.note || ""),
          items: meetingItems.map(function (item) {
            return {
              itemId: _committeeMeetingText_(item.itemId || ""),
              agendaNo: _committeeMeetingText_(item.agendaNo || ""),
              agendaLabel: _committeeMeetingAgendaLabel_(item.agendaNo),
              seq: Number(item.seq || 0) || 0,
              title: _committeeMeetingAgendaTitle_(item),
              relatedMeetingNo: _committeeMeetingText_(
                item.relatedMeetingNo || "",
              ),
              relatedMeetingDate: _committeeMeetingText_(
                item.relatedMeetingDate || "",
              ),
              caseId: _committeeMeetingText_(item.caseId || ""),
              caseNum: _committeeMeetingCaseRefText_(item.caseNum || ""),
              recNo: _committeeMeetingCaseRefText_(item.recNo || ""),
              agencyOrPresenter: _committeeMeetingText_(
                item.agencyOrPresenter || "",
              ),
              result: _committeeMeetingText_(item.result || item.note || ""),
            };
          }),
        }));
    }),
    {
      overviewRows,
      listMeetings,
      tableMeetings: listMeetings,
      summaryMeetings,
      filters: {
        query: q,
        agendaNo: agendaFilter,
        agendaLabel: agendaFilter
          ? _committeeMeetingAgendaLabel_(agendaFilter)
          : "ทุกวาระ",
      },
      generatedAt: new Date().toISOString(),
      totalOverviewRows: overviewRows.length,
      totalListMeetings: listMeetings.length,
      totalSummaryMeetings: summaryMeetings.length,
    }
  );
}
function apiGetCommitteeMeetingPrintBundle(payload) {
  return MeetingDomain.getPrintBundle(payload || {});
}
function apiSearchMeetingAgendaCases(payload) {
  return MeetingDomain.searchAgendaCases(payload || {});
}
function apiSaveCommitteeMeetingSystem(payload) {
  return writeGateway_(
    "apiSaveCommitteeMeetingSystem",
    payload || {},
    function (input) {
      return MeetingDomain.saveSystem(input || {});
    },
    "บันทึกการประชุมสำเร็จ",
    "บันทึกการประชุมไม่สำเร็จ",
  );
}
function apiDeleteCommitteeMeetingSystem(payload) {
  return writeGateway_(
    "apiDeleteCommitteeMeetingSystem",
    payload || {},
    function (input) {
      return MeetingDomain.deleteSystem(input || {});
    },
    "ลบการประชุมสำเร็จ",
    "ลบการประชุมไม่สำเร็จ",
  );
}
((MeetingDomain.VERSION = "meeting-domain-final-current"),
  (MeetingDomain.status = function () {
    return _domainStatusPhaseC_(MeetingDomain, "MeetingDomain");
  }),
  (MeetingDomain.getSystemSpec = function (payload) {
    return (
      (payload = requireDomainRequest_(payload || {}, "viewer")),
      ok_(
        _committeeMeetingSheetSpec_(),
        "โหลดรายละเอียดชีตการประชุมคณะกรรมาธิการสำเร็จ",
      )
    );
  }),
  (MeetingDomain.listMeetings = function (payload) {
    var bundle = _committeeMeetingBuildBundle_(
      (payload = requireDomainRequest_(payload || {}, "viewer")) || {},
    );
    return ok_(bundle, "โหลดการประชุมคณะกรรมาธิการสำเร็จ");
  }),
  (MeetingDomain.getSystem = function (payload) {
    var bundle = _committeeMeetingBuildBundle_(
        (payload = requireDomainRequest_(payload || {}, "viewer")) || {},
      ),
      first = (bundle.meetings && bundle.meetings[0]) || null;
    return ok_(
      {
        meeting: first,
        items: (first && bundle.itemsByMeetingId[_s_(first.meetingId)]) || [],
        spec: bundle.spec,
      },
      first ? "โหลดข้อมูลการประชุมสำเร็จ" : "ไม่พบข้อมูลการประชุม",
    );
  }),
  (MeetingDomain.getPrintBundle = function (payload) {
    return (
      (payload = requireDomainRequest_(payload || {}, "viewer")),
      ok_(
        _committeeMeetingPrintBundle_(payload || {}),
        "โหลดข้อมูลพิมพ์การประชุมคณะกรรมาธิการสำเร็จ",
      )
    );
  }),
  (MeetingDomain.searchAgendaCases = function (payload) {
    var q = _committeeMeetingText_(
      (payload = requireDomainRequest_(payload || {}, "viewer")).query ||
        payload.q ||
        "",
    ).toLowerCase();
    if (q.length < 1) return ok_({ rows: [] }, "กรุณาระบุคำค้น");
    var limit = Number(payload.limit || 30) || 30,
      rows,
      out = _caseDomainSharedRows_(
        "MainData",
        [
          "caseId",
          "caseNum",
          "recNo",
          "title",
          "caseTitle",
          "petitioners",
          "respondent",
          "status",
          "agencyName",
          "updatedAt",
          "createdAt",
          "isDeleted",
          "deletedAt",
        ],
        { includeDeleted: !1, requireCanonical: !0, ttl: 180 },
      )
        .filter(function (r) {
          return (
            !isSoftDeletedRow_(r) &&
            [
              _committeeMeetingCaseRefText_(r.caseNum || ""),
              _committeeMeetingCaseRefText_(r.recNo || ""),
              r.title,
              r.caseTitle,
              r.petitioners,
              r.respondent,
              r.status,
              r.agencyName,
            ]
              .join(" ")
              .toLowerCase()
              .indexOf(q) > -1
          );
        })
        .slice(0, limit)
        .map(function (r) {
          var caseNum = _committeeMeetingCaseRefText_(r.caseNum || ""),
            recNo = _committeeMeetingCaseRefText_(r.recNo || "");
          return {
            caseId: _s_(r.caseId),
            caseNum,
            recNo,
            title: _s_(r.title),
            caseTitle: _s_(r.caseTitle || r.title),
            petitioners: _s_(r.petitioners),
            respondent: _s_(r.respondent),
            status: _s_(r.status),
            agencyName: _s_(r.agencyName),
          };
        });
    return ok_(
      { rows: out, totalRecords: out.length },
      "ค้นหาเรื่องพิจารณาสำเร็จ",
    );
  }),
  (MeetingDomain.saveSystem = function (payload) {
    return (
      (payload = requireDomainRequest_(payload || {}, "staff")),
      domainWrite_("apiSaveCommitteeMeetingSystem", payload, function (input) {
        (ensureCanonicalHeadersForNewSheet_("CommitteeMeetings"),
          ensureCanonicalHeadersForNewSheet_("CommitteeMeetingAgendaItems"));
        var now = new Date().toISOString(),
          meetingInput = input.meeting || input || {},
          meetingId =
            _committeeMeetingText_(
              meetingInput.meetingId || input.meetingId || "",
            ) || _committeeMeetingId_("CMTG"),
          meeting = {
            meetingId,
            meetingNo: _committeeMeetingText_(
              meetingInput.meetingNo ||
                meetingInput.round ||
                input.meetingNo ||
                "",
            ),
            meetingDate: _committeeMeetingDateText_(
              meetingInput.meetingDate ||
                meetingInput.date ||
                input.meetingDate ||
                "",
            ),
            title: _committeeMeetingText_(
              meetingInput.title || "การประชุมคณะกรรมาธิการ",
            ),
            status: _committeeMeetingText_(meetingInput.status || "บันทึก"),
            note: _committeeMeetingText_(meetingInput.note || ""),
            isDeleted: !1,
            deletedAt: "",
          };
        if (!meeting.meetingNo) throw new Error("กรุณาระบุการประชุมครั้งที่");
        if (!meeting.meetingDate)
          throw new Error("กรุณาระบุวันเดือนปีการประชุม");
        var meetingResult = _committeeMeetingRepo_("committee.meetings").upsert(
            meetingId,
            meeting,
          ),
          incoming = [];
        (["agenda1", "agenda2", "agenda3", "agenda4"].forEach(
          function (k, idx) {
            var arr = input[k] || [];
            (_c30A_(arr) || (arr = []),
              arr.forEach(function (row, i) {
                (((row = row || {}).agendaNo = String(idx + 1)),
                  (row.seq = row.seq || i + 1),
                  incoming.push(row));
              }));
          },
        ),
          _c30A_(input.items) && (incoming = incoming.concat(input.items)));
        var repo = _committeeMeetingRepo_("committee.meetingAgendaItems"),
          existing = repo.listActive().filter(function (r) {
            return _s_(r.meetingId) === meetingId;
          }),
          keep = {},
          saved = [];
        (incoming.forEach(function (row, i) {
          var item = _committeeMeetingNormalizeItem_(row, meetingId, i + 1);
          if (
            _committeeMeetingItemHasContent_(
              (item = _committeeMeetingLinkCaseInfo_(item)),
            )
          ) {
            var res = repo.upsert(item.itemId, item, { now });
            ((keep[item.itemId] = !0), saved.push(res.row || item));
          }
        }),
          existing.forEach(function (row) {
            var id = _s_(row.itemId);
            id &&
              !keep[id] &&
              repo.softDelete(id, { deletedAt: now, updatedAt: now });
          }));
        var synced = _committeeMeetingSyncAgenda1And3ToHistory_(meeting, saved);
        return (
          _appIsFnName_("_invalidateMeetingDerivedCaches_") &&
            _invalidateMeetingDerivedCaches_("committeeMeetingSystem"),
          typeof invalidateSheetCache_ == "function" &&
            (invalidateSheetCache_("CommitteeMeetings"),
            invalidateSheetCache_("CommitteeMeetingAgendaItems"),
            invalidateSheetCache_("MeetingLogs")),
          ok_(
            {
              meetingId,
              mode: meetingResult.mode,
              items: saved,
              syncedMeetingLogs: synced,
            },
            "บันทึกการประชุมคณะกรรมาธิการสำเร็จ",
          )
        );
      })
    );
  }),
  (MeetingDomain.deleteSystem = function (payload) {
    return (
      (payload = requireDomainRequest_(payload || {}, "staff")),
      domainWrite_(
        "apiDeleteCommitteeMeetingSystem",
        payload,
        function (input) {
          var meetingId = _committeeMeetingText_(
            input.meetingId || input.id || "",
          );
          if (!meetingId) throw new Error("ไม่พบรหัสการประชุม");
          var now = new Date().toISOString();
          return (
            _committeeMeetingRepo_("committee.meetings").softDelete(meetingId, {
              deletedAt: now,
              updatedAt: now,
            }),
            _committeeMeetingRepo_("committee.meetingAgendaItems")
              .listActive()
              .filter(function (r) {
                return _s_(r.meetingId) === meetingId;
              })
              .forEach(function (r) {
                _committeeMeetingRepo_(
                  "committee.meetingAgendaItems",
                ).softDelete(_s_(r.itemId), { deletedAt: now, updatedAt: now });
              }),
            typeof invalidateSheetCache_ == "function" &&
              (invalidateSheetCache_("CommitteeMeetings"),
              invalidateSheetCache_("CommitteeMeetingAgendaItems")),
            ok_({ meetingId }, "ลบข้อมูลการประชุมสำเร็จ")
          );
        },
      )
    );
  }));

DashboardDomain.PHASEF_STATUS_READ_MODEL =
  _phaseFDashboardStatusReadModelContract_();
