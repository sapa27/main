"use strict";
const {
  json,
  methodNotAllowed,
  readJsonBody,
  normalizeProxyBody,
  callGas,
  RELEASE_STAMP,
  PROXY_CONTRACT_STAMP,
  text,
}
= require("./_gasProxyCommon");
module.exports = async function loginProxyHandler(req, res) {
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
          method: "apiLogin",
          transport: "vercel-login-proxy",
          releaseStamp: RELEASE_STAMP,
          proxyContractStamp: PROXY_CONTRACT_STAMP,
        });
    }
    const payload = normalizeProxyBody(body, "apiLogin").payload || {
    };
    const username = text(payload.username || payload.user || payload.userId || payload.email).trim();
    const password = text(payload.password || payload.pass || payload.pwd).trim();
    if (!username) {
      return json(res, 400, {
          ok: false,
          error: "กรุณาระบุ username ก่อนเข้าสู่ระบบ",
          errorCode: "USERNAME_REQUIRED",
          method: "apiLogin",
          transport: "vercel-login-proxy",
          releaseStamp: RELEASE_STAMP,
          proxyContractStamp: PROXY_CONTRACT_STAMP,
        });
    }
    if (!password) {
      return json(res, 400, {
          ok: false,
          error: "กรุณาระบุ password ก่อนเข้าสู่ระบบ",
          errorCode: "PASSWORD_REQUIRED",
          method: "apiLogin",
          transport: "vercel-login-proxy",
          releaseStamp: RELEASE_STAMP,
          proxyContractStamp: PROXY_CONTRACT_STAMP,
        });
    }
    const result = await callGas({
        method: "apiLogin",
        payload,
        req,
        timeoutMs: body.timeoutMs || process.env.GAS_LOGIN_PROXY_TIMEOUT_MS || 50000,
      });
    const out = result.body && typeof result.body === "object"
    ? result.body
    : {
      ok: false,
      error: "GAS login response empty",
      errorCode: "GAS_LOGIN_RESPONSE_EMPTY",
      method: "apiLogin",
      transport: "vercel-login-proxy",
      releaseStamp: RELEASE_STAMP,
      proxyContractStamp: PROXY_CONTRACT_STAMP,
    };
    out.transport = out.transport || "vercel-login-proxy";
    out.proxyContractStamp = out.proxyContractStamp || PROXY_CONTRACT_STAMP;
    return json(res, result.status, out);
  } catch (err) {
    return json(res, err && err.code === "PAYLOAD_TOO_LARGE" ? 413: 500, {
        ok: false,
        error: String((err && err.message) || err),
        errorCode: (err && err.code) || "VERCEL_LOGIN_PROXY_ERROR",
        method: "apiLogin",
        transport: "vercel-login-proxy",
        releaseStamp: RELEASE_STAMP,
        proxyContractStamp: PROXY_CONTRACT_STAMP,
      });
  }
};
