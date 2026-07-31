"use strict";
const {
  json,
  methodNotAllowed,
  readJsonBody,
  normalizeProxyBody,
  callGas,
  proxyMethodError,
  RELEASE_STAMP,
  PROXY_CONTRACT_STAMP,
}
= require("./_gasProxyCommon");
module.exports = async function gasProxyHandler(req, res) {
  if (req.method === "OPTIONS") {
    return json(res, 200, {
        ok: true,
        allow: "POST, OPTIONS",
        releaseStamp: RELEASE_STAMP,
        proxyContractStamp: PROXY_CONTRACT_STAMP,
      });
  }
  if (req.method !== "POST")return methodNotAllowed(res, "POST, OPTIONS");
  try {
    const body = await readJsonBody(req);
    if (body == null) {
      return json(res, 400, {
          ok: false,
          error: "JSON request body ไม่ถูกต้อง",
          errorCode: "BAD_JSON",
          transport: "vercel-api-proxy",
          releaseStamp: RELEASE_STAMP,
          proxyContractStamp: PROXY_CONTRACT_STAMP,
        });
    }
    const normalized = normalizeProxyBody(body);
    if (normalized.rawMethod && !normalized.method) {
      return json(res, 400, proxyMethodError(normalized.rawMethod));
    }
    if (/^getDeferredInclude$/i.test(normalized.method)) {
      return json(res, 400, {
          ok: false,
          error: "getDeferredInclude เป็น local static include ไม่ควรส่งผ่าน Vercel proxy",
          errorCode: "LOCAL_INCLUDE_NOT_PROXYABLE",
          method: normalized.method,
          releaseStamp: RELEASE_STAMP,
          proxyContractStamp: PROXY_CONTRACT_STAMP,
        });
    }
    const result = await callGas({
        method: normalized.method,
        payload: normalized.payload,
        req,
        timeoutMs: body.timeoutMs,
      });
    return json(res, result.status, result.body);
  } catch (err) {
    return json(res, err && err.code === "PAYLOAD_TOO_LARGE" ? 413: 500, {
        ok: false,
        error: String((err && err.message) || err),
        errorCode: (err && err.code) || "VERCEL_PROXY_ERROR",
        transport: "vercel-api-proxy",
        releaseStamp: RELEASE_STAMP,
        proxyContractStamp: PROXY_CONTRACT_STAMP,
      });
  }
};
