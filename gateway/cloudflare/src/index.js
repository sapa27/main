const GATEWAY_VERSION = 'p0e-cloudflare-v1';
const DEFAULT_RPC_VERSION = 'github-pages-rpc-r330';
const DEFAULT_ALLOWED_ORIGIN = 'https://sapa27.github.io';

function str(value) {
  return value == null ? '' : String(value).trim();
}

function numberEnv(value, fallback, min, max) {
  const n = Number(value);
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : fallback;
}

function validGasUrl(value) {
  return /^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(str(value));
}

function allowedOrigins(env) {
  return new Set(str(env.ALLOWED_ORIGINS || DEFAULT_ALLOWED_ORIGIN).split(',').map(v => v.trim()).filter(Boolean));
}

function isAllowedOrigin(origin, env) {
  return !!origin && allowedOrigins(env).has(origin);
}

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,X-Requested-With',
    'Access-Control-Max-Age': '600',
    'Cache-Control': 'no-store, no-cache, must-revalidate',
    'Content-Type': 'application/json; charset=utf-8',
    'Vary': 'Origin',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'no-referrer'
  };
}

function json(status, origin, payload, env) {
  const headers = isAllowedOrigin(origin, env)
    ? corsHeaders(origin)
    : {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Content-Type': 'application/json; charset=utf-8',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'no-referrer'
      };
  return new Response(JSON.stringify(payload), { status, headers });
}

function fail(code, message, status = 502) {
  const error = new Error(message || code);
  error.code = code;
  error.status = status;
  return error;
}

function callbackName() {
  const raw = typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID().replaceAll('-', '')
    : Array.from(crypto.getRandomValues(new Uint8Array(16)), b => b.toString(16).padStart(2, '0')).join('');
  return '__cfGw_' + raw;
}

function parseJsonp(text, callback) {
  const source = str(text);
  const prefixes = ['/**/' + callback + '(', callback + '('];
  const prefix = prefixes.find(p => source.startsWith(p));
  if (!prefix || !source.endsWith(');')) {
    throw fail('GATEWAY_INVALID_JSONP', 'Invalid GAS JSONP response');
  }
  try {
    return JSON.parse(source.slice(prefix.length, -2));
  } catch {
    throw fail('GATEWAY_INVALID_JSONP', 'Invalid GAS JSONP payload');
  }
}

async function fetchWithTimeout(url, init, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort('upstream timeout'), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } catch (error) {
    if (controller.signal.aborted) throw fail('GATEWAY_UPSTREAM_TIMEOUT', 'GAS upstream timeout', 504);
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

function config(env) {
  const gasUrl = str(env.GAS_WEB_APP_URL);
  const rpcVersion = str(env.RPC_VERSION || DEFAULT_RPC_VERSION);
  const maxBodyBytes = numberEnv(env.MAX_BODY_BYTES, 6 * 1024 * 1024, 64 * 1024, 8 * 1024 * 1024);
  const fetchTimeoutMs = numberEnv(env.FETCH_TIMEOUT_MS, 45000, 3000, 120000);
  return { gasUrl, rpcVersion, maxBodyBytes, fetchTimeoutMs };
}

async function gasJsonp(mode, parentOrigin, query, env) {
  const cfg = config(env);
  const callback = callbackName();
  const url = new URL(cfg.gasUrl);
  url.searchParams.set('mode', mode);
  url.searchParams.set('parentOrigin', parentOrigin);
  url.searchParams.set('rpcVersion', cfg.rpcVersion);
  url.searchParams.set('callback', callback);
  url.searchParams.set('_ts', Date.now().toString(36));
  for (const [key, value] of Object.entries(query || {})) url.searchParams.set(key, str(value));
  const response = await fetchWithTimeout(url, { method: 'GET', redirect: 'follow', headers: { Accept: 'application/javascript,text/javascript,*/*;q=0.1' } }, cfg.fetchTimeoutMs);
  if (!response.ok) throw fail('GATEWAY_GAS_GET_FAILED', 'GAS GET HTTP ' + response.status, 502);
  return parseJsonp(await response.text(), callback);
}

async function gasPost(body, parentOrigin, env) {
  const cfg = config(env);
  const form = new URLSearchParams();
  form.set('mode', 'github-rpc');
  form.set('parentOrigin', parentOrigin);
  form.set('rpcVersion', cfg.rpcVersion);
  form.set('rpcId', str(body.rpcId));
  form.set('rpcToken', str(body.rpcToken));
  form.set('rpcFunction', str(body.rpcFunction));
  form.set('rpcPayload', JSON.stringify(body.rpcPayload == null ? {} : body.rpcPayload));
  form.set('traceId', str(body.traceId));
  form.set('clientStartedAt', str(body.clientStartedAt));
  const response = await fetchWithTimeout(cfg.gasUrl, {
    method: 'POST',
    redirect: 'follow',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    body: form.toString()
  }, cfg.fetchTimeoutMs);
  if (!response.ok) throw fail('GATEWAY_GAS_POST_FAILED', 'GAS POST HTTP ' + response.status, 502);
  await response.arrayBuffer();
}

async function readJsonBody(request, env) {
  const cfg = config(env);
  const declared = Number(request.headers.get('content-length') || 0);
  if (declared > cfg.maxBodyBytes) throw fail('GATEWAY_BODY_TOO_LARGE', 'Request body too large', 413);
  const text = await request.text();
  if (new TextEncoder().encode(text).byteLength > cfg.maxBodyBytes) throw fail('GATEWAY_BODY_TOO_LARGE', 'Request body too large', 413);
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    throw fail('GATEWAY_INVALID_JSON', 'Request body must be valid JSON', 400);
  }
}

async function handle(request, env) {
  const origin = str(request.headers.get('origin'));
  if (!isAllowedOrigin(origin, env)) {
    return json(403, origin, { ok: false, error: { code: 'GATEWAY_ORIGIN_DENIED', message: 'Origin not allowed' } }, env);
  }
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders(origin) });

  const cfg = config(env);
  if (!validGasUrl(cfg.gasUrl)) {
    return json(503, origin, { ok: false, error: { code: 'GATEWAY_GAS_URL_NOT_CONFIGURED', message: 'Gateway GAS endpoint is not configured' } }, env);
  }

  try {
    const url = new URL(request.url);
    if (request.method === 'GET') {
      const mode = str(url.searchParams.get('mode') || 'health');
      const parentOrigin = str(url.searchParams.get('parentOrigin') || origin);
      if (parentOrigin !== origin) return json(403, origin, { ok: false, error: { code: 'GATEWAY_PARENT_ORIGIN_MISMATCH', message: 'parentOrigin mismatch' } }, env);

      if (mode === 'health') {
        const payload = await gasJsonp('github-rpc-health', parentOrigin, {}, env);
        return json(200, origin, { ...payload, gatewayOk: true, gatewayVersion: GATEWAY_VERSION, provider: 'cloudflare' }, env);
      }
      if (mode === 'result') {
        const rpcId = str(url.searchParams.get('rpcId'));
        const rpcToken = str(url.searchParams.get('rpcToken'));
        if (!rpcId || !rpcToken) return json(400, origin, { ok: false, error: { code: 'GATEWAY_RPC_ID_REQUIRED', message: 'rpcId/rpcToken required' } }, env);
        const payload = await gasJsonp('github-rpc-result', parentOrigin, { rpcId, rpcToken }, env);
        return json(200, origin, payload, env);
      }
      return json(400, origin, { ok: false, error: { code: 'GATEWAY_MODE_INVALID', message: 'Unsupported gateway mode' } }, env);
    }

    if (request.method === 'POST') {
      const body = await readJsonBody(request, env);
      const parentOrigin = str(body.parentOrigin || origin);
      if (parentOrigin !== origin) return json(403, origin, { ok: false, error: { code: 'GATEWAY_PARENT_ORIGIN_MISMATCH', message: 'parentOrigin mismatch' } }, env);
      if (str(body.rpcVersion) !== cfg.rpcVersion) return json(409, origin, { ok: false, error: { code: 'GATEWAY_RPC_VERSION_MISMATCH', message: 'RPC version mismatch' } }, env);
      if (!str(body.rpcId) || !str(body.rpcToken) || !str(body.rpcFunction)) return json(400, origin, { ok: false, error: { code: 'GATEWAY_RPC_FIELDS_REQUIRED', message: 'RPC fields required' } }, env);
      await gasPost(body, parentOrigin, env);
      return json(202, origin, { ok: true, accepted: true, rpcId: str(body.rpcId), traceId: str(body.traceId), gatewayVersion: GATEWAY_VERSION, provider: 'cloudflare' }, env);
    }

    return json(405, origin, { ok: false, error: { code: 'GATEWAY_METHOD_NOT_ALLOWED', message: 'Method not allowed' } }, env);
  } catch (error) {
    const status = Number(error && error.status) || 502;
    return json(status, origin, { ok: false, error: { code: str(error && error.code) || 'GATEWAY_UPSTREAM_FAILED', message: str(error && error.message) || 'Gateway upstream failed' } }, env);
  }
}

export default {
  async fetch(request, env) {
    return handle(request, env);
  }
};
