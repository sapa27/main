import crypto from 'node:crypto';

const GAS_URL = String(process.env.GAS_WEB_APP_URL || process.env.GAS_WEBAPP_URL || '').trim();
const RPC_VERSION = String(process.env.RPC_VERSION || 'github-pages-rpc-r330').trim();
const ALLOWED_ORIGINS = new Set(String(process.env.ALLOWED_ORIGINS || process.env.ALLOWED_ORIGIN || 'https://sapa27.github.io')
  .split(',').map(v => v.trim()).filter(Boolean));
const MAX_BODY_BYTES = Math.max(64 * 1024, Number(process.env.MAX_BODY_BYTES || 6 * 1024 * 1024));
const FETCH_TIMEOUT_MS = Math.max(3000, Number(process.env.FETCH_TIMEOUT_MS || 45000));

function validGasUrl(url) {
  return /^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(url);
}
function callbackName() {
  return '__gw_' + crypto.randomBytes(12).toString('hex');
}
function parseJsonp(text, callback) {
  const prefixes = ['/**/' + callback + '(', callback + '('];
  const prefix = prefixes.find(p => text.startsWith(p));
  if (!prefix || !text.endsWith(');')) {
    const e = new Error('Invalid GAS JSONP response');
    e.code = 'GATEWAY_INVALID_JSONP';
    throw e;
  }
  return JSON.parse(text.slice(prefix.length, -2));
}
function cors(origin) {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,X-Requested-With',
    'Cache-Control': 'no-store',
    'Vary': 'Origin'
  };
}
function send(res, status, origin, payload) {
  for (const [k, v] of Object.entries(cors(origin))) res.setHeader(k, v);
  return res.status(status).json(payload);
}
function allowed(origin) {
  return !!origin && ALLOWED_ORIGINS.has(origin);
}
function requestOrigin(req) {
  return String(req.headers.origin || '').trim();
}
function parentOriginOf(req, body) {
  return String((body && body.parentOrigin) || req.query.parentOrigin || requestOrigin(req) || '').trim();
}
function timeoutSignal(ms) {
  return AbortSignal.timeout(Math.max(1000, Number(ms || FETCH_TIMEOUT_MS)));
}
async function gasJsonp(mode, parentOrigin, query = {}) {
  const cb = callbackName();
  const url = new URL(GAS_URL);
  url.searchParams.set('mode', mode);
  url.searchParams.set('parentOrigin', parentOrigin);
  url.searchParams.set('rpcVersion', RPC_VERSION);
  url.searchParams.set('callback', cb);
  url.searchParams.set('_ts', Date.now().toString(36));
  for (const [key, value] of Object.entries(query)) url.searchParams.set(key, String(value));
  const upstream = await fetch(url, { redirect: 'follow', signal: timeoutSignal(FETCH_TIMEOUT_MS) });
  if (!upstream.ok) {
    const e = new Error('GAS GET HTTP ' + upstream.status);
    e.code = 'GATEWAY_GAS_GET_FAILED';
    throw e;
  }
  return parseJsonp(await upstream.text(), cb);
}
async function gasPost(payload, parentOrigin) {
  const form = new URLSearchParams();
  form.set('mode', 'github-rpc');
  form.set('parentOrigin', parentOrigin);
  form.set('rpcVersion', RPC_VERSION);
  form.set('rpcId', String(payload.rpcId || ''));
  form.set('rpcToken', String(payload.rpcToken || ''));
  form.set('rpcFunction', String(payload.rpcFunction || ''));
  form.set('rpcPayload', JSON.stringify(payload.rpcPayload == null ? {} : payload.rpcPayload));
  form.set('traceId', String(payload.traceId || ''));
  form.set('clientStartedAt', String(payload.clientStartedAt || ''));
  const upstream = await fetch(GAS_URL, {
    method: 'POST',
    redirect: 'follow',
    body: form,
    signal: timeoutSignal(FETCH_TIMEOUT_MS)
  });
  if (!upstream.ok) {
    const e = new Error('GAS POST HTTP ' + upstream.status);
    e.code = 'GATEWAY_GAS_POST_FAILED';
    throw e;
  }
  await upstream.arrayBuffer();
  return true;
}
async function readJsonBody(req) {
  let body = req.body;
  if (body == null) return {};
  if (Buffer.isBuffer(body)) body = body.toString('utf8');
  if (typeof body === 'string') {
    if (Buffer.byteLength(body, 'utf8') > MAX_BODY_BYTES) {
      const e = new Error('Request body too large'); e.code = 'GATEWAY_BODY_TOO_LARGE'; e.status = 413; throw e;
    }
    return body ? JSON.parse(body) : {};
  }
  const raw = JSON.stringify(body);
  if (Buffer.byteLength(raw, 'utf8') > MAX_BODY_BYTES) {
    const e = new Error('Request body too large'); e.code = 'GATEWAY_BODY_TOO_LARGE'; e.status = 413; throw e;
  }
  return body;
}

export default async function handler(req, res) {
  const origin = requestOrigin(req);
  if (!allowed(origin)) return send(res, 403, origin || 'null', { ok: false, error: { code: 'GATEWAY_ORIGIN_DENIED', message: 'Origin not allowed' } });
  if (req.method === 'OPTIONS') {
    for (const [k, v] of Object.entries(cors(origin))) res.setHeader(k, v);
    return res.status(204).end();
  }
  if (!validGasUrl(GAS_URL)) return send(res, 503, origin, { ok: false, error: { code: 'GATEWAY_GAS_URL_NOT_CONFIGURED', message: 'Gateway GAS endpoint is not configured' } });
  try {
    if (req.method === 'GET') {
      const mode = String(req.query.mode || 'health');
      const parentOrigin = parentOriginOf(req, null);
      if (parentOrigin !== origin) return send(res, 403, origin, { ok: false, error: { code: 'GATEWAY_PARENT_ORIGIN_MISMATCH', message: 'parentOrigin mismatch' } });
      if (mode === 'health') {
        const x = await gasJsonp('github-rpc-health', parentOrigin, {});
        return send(res, 200, origin, { ...x, gatewayOk: true, gatewayVersion: 'p0e-gateway-v1', provider: 'vercel' });
      }
      if (mode === 'result') {
        const rpcId = String(req.query.rpcId || ''), rpcToken = String(req.query.rpcToken || '');
        if (!rpcId || !rpcToken) return send(res, 400, origin, { ok: false, error: { code: 'GATEWAY_RPC_ID_REQUIRED', message: 'rpcId/rpcToken required' } });
        const x = await gasJsonp('github-rpc-result', parentOrigin, { rpcId, rpcToken });
        return send(res, 200, origin, x);
      }
      return send(res, 400, origin, { ok: false, error: { code: 'GATEWAY_MODE_INVALID', message: 'Unsupported gateway mode' } });
    }
    if (req.method === 'POST') {
      const body = await readJsonBody(req);
      const parentOrigin = parentOriginOf(req, body);
      if (parentOrigin !== origin) return send(res, 403, origin, { ok: false, error: { code: 'GATEWAY_PARENT_ORIGIN_MISMATCH', message: 'parentOrigin mismatch' } });
      if (String(body.rpcVersion || '') !== RPC_VERSION) return send(res, 409, origin, { ok: false, error: { code: 'GATEWAY_RPC_VERSION_MISMATCH', message: 'RPC version mismatch' } });
      if (!body.rpcId || !body.rpcToken || !body.rpcFunction) return send(res, 400, origin, { ok: false, error: { code: 'GATEWAY_RPC_FIELDS_REQUIRED', message: 'RPC fields required' } });
      await gasPost(body, parentOrigin);
      return send(res, 202, origin, { ok: true, accepted: true, rpcId: body.rpcId, traceId: body.traceId || '', gatewayVersion: 'p0e-gateway-v1', provider: 'vercel' });
    }
    return send(res, 405, origin, { ok: false, error: { code: 'GATEWAY_METHOD_NOT_ALLOWED', message: 'Method not allowed' } });
  } catch (error) {
    const status = Number(error && error.status) || 502;
    return send(res, status, origin, { ok: false, error: { code: String(error && error.code || 'GATEWAY_UPSTREAM_FAILED'), message: String(error && error.message || error || 'Gateway upstream failed') } });
  }
}
