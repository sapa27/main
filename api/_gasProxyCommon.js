"use strict";
const RELEASE_STAMP = "commission-v1.2-gas-hosted-production-2026-07-13-r94";
const DEFAULT_MAX_BODY_BYTES = 1048576;
const MAX_STREAM_BODY_BYTES = 4300000;
const MAX_RESPONSE_BODY_BYTES = 4300000;
const PROXY_LARGE_BODY_METHODS = new Set([
  "apiExtractTrackingPdf",
  "apiExtractDocumentPdf",
  "apiExtractMeetingAgendaPdf"
]);
const DEFAULT_PROXY_TIMEOUT_MS = 55000;
const MAX_PROXY_TIMEOUT_MS = 55000;
const DEFAULT_GAS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyePJucr2k5kt5xvyOymbatxKIxEJf4pSYWjzeABKPHRjFwlWrmVMZuP7sw2mXWnx-f/exec";
// GENERATED from gas-backend/Code_20_Router.gs canonical route registry.
const PROXY_ALLOWED_METHODS = Object.freeze([
  "apiLogin",
  "apiSessionResume",
  "apiLogout",
  "apiSessionCheck",
  "getDeferredInclude",
  "apiBootstrap",
  "apiGetRouteContract",
  "apiGetPhase0ContractGate",
  "apiGetPhase1Contract",
  "apiGetPhase2Contract",
  "apiGetClientDataContract",
  "apiGetAppTerminology",
  "apiGetPhase5ReleaseReadiness",
  "apiIssueActionToken",
  "apiSaveCase",
  "apiDeleteCase",
  "apiGetCases",
  "apiGetCaseQuickSummary",
  "apiGetCaseReportOptions",
  "apiGetCaseContext",
  "apiGetCanonicalCaseBundle",
  "apiGetPhase4QaGate",
  "apiSearchCasesLite",
  "apiGetCaseReportExportRows",
  "apiGetPetitioners",
  "apiGetPetitionerRelatedCounts",
  "apiSavePetitioner",
  "apiDeletePetitioner",
  "apiGetPersonnelComms",
  "apiGetPersonnelOps",
  "apiGetPersonnelStaffs",
  "apiGetPersonnelSubcommittees",
  "apiGetPersonnelDirectoryBundle",
  "apiGetPeoplePageBundle",
  "apiGetSalarySettings",
  "apiSavePersonnelComm",
  "apiSavePersonnelOp",
  "apiSavePersonnelStaff",
  "apiSavePersonnelSubcommittee",
  "apiDeletePersonnelComm",
  "apiDeletePersonnelOp",
  "apiDeletePersonnelStaff",
  "apiDeletePersonnelSubcommittee",
  "apiGetMeetingLookupOptions",
  "apiGetMeetingHistory",
  "apiListCommitteeMeetings",
  "apiGetCommitteeMeetingSystem",
  "apiGetCommitteeMeetingSystemSpec",
  "apiSearchMeetingAgendaCases",
  "apiGetCommitteeMeetingPrintBundle",
  "apiSaveCommitteeMeetingSystem",
  "apiDeleteCommitteeMeetingSystem",
  "apiSaveSalarySettings",
  "apiSaveMeetingLog",
  "apiDeleteMeetingLog",
  "apiGetLetters",
  "apiGetAllLettersWithCaseInfo",
  "apiSaveLetter",
  "apiDeleteLetter",
  "apiAuditMeetingData",
  "apiExportMeetingDuplicateAuditCsv",
  "apiCleanupMeetingData",
  "apiGetTracking",
  "apiBudgetListByFY",
  "apiBudgetListByFYFast",
  "apiBudgetGetSummary",
  "apiBudgetGetFiscalYears",
  "apiBudgetGetSubcommitteeOptions",
  "apiBudgetGetImportForEdit",
  "apiBudgetGetTypeSummaryByFY",
  "apiBudgetSaveImport",
  "apiBudgetDeleteImport",
  "apiGetDashboardBundle",
  "apiGetThailandLocations",
  "apiSearchLookup",
  "apiSearch",
  "apiAdminListUsers",
  "apiAdminSaveUser",
  "apiAdminDeleteUser",
  "apiAdminListSubcommittees",
  "apiAdminSaveSubcommittee",
  "apiAdminDeleteSubcommittee",
  "apiBudgetAdminListYearSettingsAll",
  "apiBudgetAdminSaveYearSettingsRows",
  "apiAiAssistantAsk",
  "apiAiAssistantStartJob",
  "apiAiAssistantGetJob",
  "apiAiAssistantSummarizeCase",
  "apiSuggestCaseStatus",
  "apiSuggestCaseClassification",
  "apiSemanticSearch",
  "apiMeetingSmartSummary",
  "apiDraftReplyLetter",
  "apiExtractTrackingPdf",
  "apiExtractDocumentPdf",
  "apiGenerateExecutiveSummary",
  "apiPredictOverdueRisk",
  "apiPredictiveBudgeting",
  "apiAnalyzePersonnelWorkload",
  "apiAnalyzeWorkloadBottlenecks",
  "apiRecommendWorkloadDistribution",
  "apiCheckDuplicateCase",
  "apiDetectBudgetAnomalies",
  "apiGetDailyBriefing",
  "apiGenerateBudgetTrendSummary",
  "apiAiDashboardInsights",
  "apiExtractMeetingAgendaPdf",
  "apiChat",
]);
const PROXY_ALLOWED_METHOD_SET = new Set(PROXY_ALLOWED_METHODS);
const PROXY_CONTRACT_STAMP = "phase5-proxy-contract-hardening-2026-07-09-r1";
function header(res, key, value) {
  try {
    res.setHeader(key, value);
  } catch (_) {
  }
}
function noStore(res) {
  header(res, "Cache-Control", "no-store, no-cache, max-age=0, must-revalidate");
  header(res, "Pragma", "no-cache");
  header(res, "X-Production-Vercel-Proxy", RELEASE_STAMP);
}
function json(res, status, body) {
  noStore(res);
  header(res, "Content-Type", "application/json; charset=utf-8");
  res.statusCode = status || 200;
  res.end(JSON.stringify(body == null ? {
      }
      : body));
}
function methodNotAllowed(res, allowed) {
  header(res, "Allow", allowed || "POST, OPTIONS");
  return json(res, 405, {
      ok: false,
      error: "Method not allowed",
      errorCode: "METHOD_NOT_ALLOWED",
      releaseStamp: RELEASE_STAMP,
    });
}
function text(value) {
  return value == null ? "": String(value);
}
function normalizeGasWebAppUrl(url) {
  url = text(url).trim();
  if ((url.startsWith('"') && url.endsWith('"')) ||(url.startsWith("'") && url.endsWith("'"))) {
    url = url.slice(1, - 1).trim();
  }
  url = url.replace(/\s+/g, "");
  url = url.replace(/\/exec\/(?=($|[?#]))/i, "/exec");
  return url;
}
function gasUrl() {
  return normalizeGasWebAppUrl(process.env.GAS_WEB_APP_URL || process.env.VERCEL_GAS_WEB_APP_URL || process.env.DEFAULT_GAS_WEB_APP_URL || DEFAULT_GAS_WEB_APP_URL || "");
}
function isLikelyGasExecUrl(url) {
  return /^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec(?:[?#].*)?$/i.test(normalizeGasWebAppUrl(url));
}
function normalizeTimeoutMs(value, fallback, maxValue) {
  const fallbackMs = Number(fallback || DEFAULT_PROXY_TIMEOUT_MS) || DEFAULT_PROXY_TIMEOUT_MS;
  const maxMs = Math.max(1000, Math.min(Number(maxValue || MAX_PROXY_TIMEOUT_MS) || MAX_PROXY_TIMEOUT_MS,
      MAX_PROXY_TIMEOUT_MS));
  const raw = Number(value == null || value === "" ? fallbackMs: value);
  if (!Number.isFinite(raw) || raw <= 0)return Math.min(fallbackMs, maxMs);
  return Math.max(1000, Math.min(Math.floor(raw), maxMs));
}
function isPlainObject(value) {
  return!!value && typeof value === "object" && !Array.isArray(value) && !Buffer.isBuffer(value) && !(value instanceof Uint8Array);
}
function proxyAllowsMethod(method) {
  method = text(method).trim();
  return!!method && PROXY_ALLOWED_METHOD_SET.has(method);
}
function proxyRequestBodyLimit(method) {
  method = text(method).trim();
  return PROXY_LARGE_BODY_METHODS.has(method)
    ? MAX_STREAM_BODY_BYTES
    : DEFAULT_MAX_BODY_BYTES;
}
function safeMethod(method) {
  method = text(method).trim();
  return proxyAllowsMethod(method) ? method: "";
}
function proxyMethodError(rawMethod) {
  rawMethod = text(rawMethod).trim();
  return {
    ok: false,
    error: rawMethod ? "Vercel proxy ไม่อนุญาต method ที่ไม่อยู่ใน frozen API contract": "method required",
    errorCode: rawMethod ? "PROXY_METHOD_NOT_IN_CONTRACT": "METHOD_REQUIRED",
    method: rawMethod || "",
    transport: "vercel-api-proxy",
    releaseStamp: RELEASE_STAMP,
    proxyContractStamp: PROXY_CONTRACT_STAMP,
    allowedMethodCount: PROXY_ALLOWED_METHODS.length,
  };
}
function redact(value) {
  if (!value || typeof value !== "object")return value;
  if (Array.isArray(value))return value.map(redact);
  const out = {
  };
  for (const[key,
      child] of Object.entries(value)) {
    out[key] = /password|pass|pwd|token|csrf|secret|authorization|cookie/i.test(key) ? "[redacted]": redact(child);
  }
  return out;
}
function clientIp(req) {
  return text(req && req.headers && req.headers["x-forwarded-for"] || "").split(",")[0].trim() || text(req && req.socket && req.socket.remoteAddress || "");
}
function jsonByteLength(str) {
  return Buffer.byteLength(text(str), "utf8");
}
function parseJsonText(raw) {
  if (!text(raw).trim())return {
  };
  try {
    return JSON.parse(raw);
  } catch (_) {
    return null;
  }
}
async function readJsonBody(req) {
  if (req && req.body !== undefined && req.body !== null) {
    if (isPlainObject(req.body))return req.body;
    if (typeof req.body === "string")return parseJsonText(req.body);
    if (Buffer.isBuffer(req.body) || req.body instanceof Uint8Array)return parseJsonText(Buffer.from(req.body).toString("utf8"));
  }
  if (!req || typeof req[Symbol.asyncIterator] !== "function")return {
  };
  const chunks = [];
  let size = 0;
  for await(const chunk of req) {
    const buf = Buffer.isBuffer(chunk) ? chunk: Buffer.from(chunk);
    size += buf.length;
    if (size > MAX_STREAM_BODY_BYTES) {
      const err = new Error("Payload too large");
      err.code = "PAYLOAD_TOO_LARGE";
      throw err;
    }
    chunks.push(buf);
  }
  return parseJsonText(Buffer.concat(chunks).toString("utf8"));
}
function normalizeProxyBody(body, fallbackMethod) {
  body = isPlainObject(body) ? body: {
  };
  const request = isPlainObject(body.request) ? body.request: {
  };
  const rawMethod = text(fallbackMethod || body.method || body.action || request.method || "").trim();
  const method = safeMethod(rawMethod);
  let payload = isPlainObject(body.payload)
  ? body.payload
  : isPlainObject(body.params)
  ? body.params
  : isPlainObject(body.data)
  ? body.data
  : isPlainObject(request.payload)
  ? request.payload
  : isPlainObject(request.params)
  ? request.params
  : isPlainObject(request.data)
  ? request.data
  : null;
  if (!payload) {
    const loosePayload = Object.assign({
      }, body);
    ["method",
      "action",
      "request",
      "timeoutMs",
      "releaseStamp",
      "source",
      "bridge",
      "requestId"].forEach((key) => delete loosePayload[key]);
    payload = Object.keys(loosePayload).length ? loosePayload: {
    };
  }
  return {
    method,
    payload,
    rawMethod
  };
}
async function callGas({
    method,
    payload,
    req,
    timeoutMs
  }) {
  const url = gasUrl();
  if (!url) {
    return {
      status: 500,
      body: {
        ok: false,
        error: "ยังไม่ได้ตั้งค่า GAS_WEB_APP_URL ใน Vercel Environment Variables",
        errorCode: "GAS_WEB_APP_URL_MISSING",
        method,
        transport: "vercel-api-proxy",
        releaseStamp: RELEASE_STAMP,
      },
    };
  }
  if (!isLikelyGasExecUrl(url)) {
    return {
      status: 500,
      body: {
        ok: false,
        error: "GAS_WEB_APP_URL ไม่ถูกต้อง ต้องเป็น Apps Script Web App /exec URL เท่านั้น ห้ามใช้ /dev กับ Vercel proxy",
        errorCode: "GAS_WEB_APP_URL_INVALID",
        method,
        transport: "vercel-api-proxy",
        releaseStamp: RELEASE_STAMP,
      },
    };
  }
  if (!method) {
    return {
      status: 400,
      body: proxyMethodError(method),
    };
  }
  const requestId = "vercel_" + Date.now() + "_" + Math.random().toString(36).slice(2);
  const started = Date.now();
  const controller = new AbortController();
  const effectiveTimeoutMs = normalizeTimeoutMs(timeoutMs || process.env.GAS_PROXY_TIMEOUT_MS, DEFAULT_PROXY_TIMEOUT_MS,
    MAX_PROXY_TIMEOUT_MS);
  let proxyTimedOut = false;
  let timeoutReject = null;
  const timer = setTimeout(() => {
    proxyTimedOut = true;
    try {
      controller.abort();
    } catch (_) {
    }
    if (typeof timeoutReject === "function") {
      const timeoutError = new Error("GAS API timeout ผ่าน Vercel proxy");
      timeoutError.name = "AbortError";
      timeoutError.code = "VERCEL_PROXY_GAS_TIMEOUT";
      timeoutReject(timeoutError);
    }
  }, effectiveTimeoutMs);
  const safePayload = isPlainObject(payload) ? Object.assign({
    }, payload): {
  };
  delete safePayload.__clientGasWebAppUrl;
  const envelope = {
    method,
    payload: Object.assign({
      }, safePayload, {
        __productionVercelProxy: true,
        __vercelRequestId: requestId,
        __vercelForwardedFor: clientIp(req),
        __vercelReleaseStamp: RELEASE_STAMP,
      }),
    bridge: "vercel-api-proxy",
    source: "vercel-api-proxy",
    requestId,
    releaseStamp: RELEASE_STAMP,
  };
  const bodyText = JSON.stringify(envelope);
  const requestBodyLimit = proxyRequestBodyLimit(method);
  const requestBodyBytes = jsonByteLength(bodyText);
  if (requestBodyBytes > requestBodyLimit) {
    clearTimeout(timer);
    return {
      status: 413,
      body: {
        ok: false,
        error: PROXY_LARGE_BODY_METHODS.has(method)
          ? "ไฟล์ PDF มีขนาดใหญ่เกินขีดจำกัดของ Vercel proxy กรุณาใช้ไฟล์ไม่เกิน 3 MB"
          : "API payload ใหญ่เกินขนาดที่ Vercel proxy อนุญาต",
        errorCode: "PAYLOAD_TOO_LARGE",
        method,
        requestId,
        transport: "vercel-api-proxy",
        releaseStamp: RELEASE_STAMP,
        meta: {
          requestBodyBytes,
          requestBodyLimit,
          vercelFunctionPayloadSafe: true
        }
      },
    };
  }
  try {
    const gasFetchPromise = fetch(url, {
        method: "POST",
        redirect: "follow",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json, text/plain, */*",
          "X-Production-Vercel-Proxy": RELEASE_STAMP,
          "X-Vercel-Proxy-Method": method,
          "X-Vercel-Proxy-Request-Id": requestId,
        },
        body: bodyText,
        signal: controller.signal,
      }).then(async (response) => {
        const raw = await response.text();
        return { response, raw };
      });
    const timeoutPromise = new Promise((_, reject) => {
      timeoutReject = reject;
    });
    const gasResult = await Promise.race([gasFetchPromise, timeoutPromise]);
    const response = gasResult.response;
    const raw = gasResult.raw;
    const responseBodyBytes = jsonByteLength(raw);
    if (responseBodyBytes > MAX_RESPONSE_BODY_BYTES) {
      return {
        status: 502,
        body: {
          ok: false,
          error: "GAS response ใหญ่เกินขีดจำกัดของ Vercel Function กรุณาแบ่งหน้า/ลดจำนวนข้อมูล",
          errorCode: "VERCEL_PROXY_RESPONSE_TOO_LARGE",
          method,
          requestId,
          transport: "vercel-api-proxy",
          releaseStamp: RELEASE_STAMP,
          meta: {
            responseBodyBytes,
            responseBodyLimit: MAX_RESPONSE_BODY_BYTES,
            vercelFunctionPayloadSafe: true,
            durationMs: Date.now() - started
          }
        }
      };
    }
    let result;
    try {
      result = raw ? JSON.parse(raw): {
      };
    } catch (_) {
      const html = /<html|<!doctype/i.test(raw);
      const responseUrl = text(response.url || "");
      const preview = raw.slice(0, 300);
      const googleAccessHtml = html && /accounts\.google|ServiceLogin|workspace|docs\.google|เอกสารเวิร์ดโปรเซสเซอร์|สเปรดชีตผ่านเว็บ/i.test(responseUrl + " " + preview);
      result = {
        ok: false,
        error: googleAccessHtml
          ? "GAS Web App ส่งหน้า Google Sign-in/Workspace แทน JSON: ตรวจ GAS_WEB_APP_URL ให้เป็น deployment /exec ล่าสุด และตั้ง Execute as/Who has access ให้ตรงกับการใช้งานผ่าน Vercel"
          : html
          ? "GAS ส่ง HTML กลับมา ไม่ใช่ JSON: ตรวจว่า GAS_WEB_APP_URL เป็น /exec และ deployment ล่าสุดมี doPost"
          : "GAS response ไม่ใช่ JSON",
        errorCode: googleAccessHtml
          ? "GAS_DEPLOYMENT_ACCESS_OR_URL_INVALID"
          : html
          ? "GAS_RETURNED_HTML_NOT_JSON"
          : "GAS_RESPONSE_NOT_JSON",
        method,
        httpStatus: response.status,
        contentType: response.headers.get("content-type") || "",
        responseUrl,
        redirected: !!response.redirected,
        rawPreview: preview,
      };
    }
    if (!result || typeof result !== "object")result = {
      ok: false,
      error: "GAS response empty",
      errorCode: "GAS_RESPONSE_EMPTY",
      method
    };
    result.method = result.method || method;
    result.requestId = result.requestId || requestId;
    result.transport = result.transport || "vercel-api-proxy";
    result.releaseStamp = result.releaseStamp || RELEASE_STAMP;
    result.meta = Object.assign({
      }, isPlainObject(result.meta) ? result.meta: {
      }, {
        vercelProxy: true,
        productionCurrent: true,
        releaseStamp: RELEASE_STAMP,
        httpStatus: response.status,
        requestId,
        durationMs: Date.now() - started,
        timeoutMs: effectiveTimeoutMs,
        requestBodyBytes,
        responseBodyBytes,
      });
    if (!response.ok && result.ok !== false) {
      result.ok = false;
      result.error = result.error || "GAS HTTP error " + response.status;
      result.errorCode = result.errorCode || "GAS_HTTP_ERROR";
    }
    const upstreamStatus =
      response.ok
        ? 200
        : response.status >= 400 && response.status <= 599
        ? response.status
        : 502;
    return {
      status: upstreamStatus,
      body: result
    };
  } catch (err) {
    const aborted = proxyTimedOut || (err && (err.name === "AbortError" || err.code === "VERCEL_PROXY_GAS_TIMEOUT"));
    return {
      status: aborted ? 504: 502,
      body: {
        ok: false,
        error: aborted ? "GAS API timeout ผ่าน Vercel proxy": text(err && err.message || err),
        errorCode: aborted ? "VERCEL_PROXY_GAS_TIMEOUT": "VERCEL_PROXY_GAS_FAILED",
        method,
        requestId,
        transport: "vercel-api-proxy",
        releaseStamp: RELEASE_STAMP,
        meta: {
          vercelProxy: true,
          productionCurrent: true,
          durationMs: Date.now() - started,
          timeoutMs: effectiveTimeoutMs,
          proxyHardTimeoutRace: true,
          proxyTimedOut: !!proxyTimedOut,
          releaseStamp: RELEASE_STAMP,
        },
      },
    };
  } finally {
    clearTimeout(timer);
  }
}
module.exports = {
  RELEASE_STAMP,
  PROXY_CONTRACT_STAMP,
  PROXY_ALLOWED_METHODS,
  proxyAllowsMethod,
  proxyMethodError,
  noStore,
  json,
  methodNotAllowed,
  gasUrl,
  normalizeGasWebAppUrl,
  isLikelyGasExecUrl,
  normalizeTimeoutMs,
  proxyRequestBodyLimit,
  safeMethod,
  readJsonBody,
  normalizeProxyBody,
  callGas,
  redact,
  text,
};
