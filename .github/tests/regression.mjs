#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT = process.cwd();
const REV = 'r331';
const RELEASE = 'commission-v1.2-p2b-perf-transport-tuning-2026-08-24-r331';
const ASSET = 'asset-manifest-r331-perf-transport-tuning';
const QUALITY = 'current-quality-gate-r331';
const RPC = 'github-pages-rpc-r330';
let passed = 0;

function file(rel) {
  const p = path.join(ROOT, rel);
  assert.ok(fs.existsSync(p), `missing file: ${rel}`);
  return fs.readFileSync(p, 'utf8');
}
function ok(name, fn) {
  try { fn(); passed++; console.log(`ok ${passed} - ${name}`); }
  catch (e) { console.error(`not ok - ${name}`); throw e; }
}
function stripNonRevision(text) {
  return text
    .replace(/(?:sha256|sha384|sha512)-[A-Za-z0-9+/=]+/gi, '<HASH>')
    .replace(/https?:\/\/[^\s\"'<>`]+/gi, '<URL>')
    .replaceAll(RPC, '<RPC_PROTOCOL>');
}
function jsSyntax(src, label) { new vm.Script(src, {filename: label}); }
function htmlScripts(html) {
  const out = [];
  const re = /<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi;
  let m;
  while ((m = re.exec(html))) {
    const attrs = m[1] || '';
    const type = (attrs.match(/\btype=[\"']([^\"']+)[\"']/i) || [])[1] || '';
    if (type && !/(?:javascript|ecmascript|module)/i.test(type)) continue;
    const body = m[2].replace(/<\?(?:!=|=)?[\s\S]*?\?>/g, 'null');
    if (body.trim()) out.push(body);
  }
  return out;
}

const index = file('github-pages/index.html');
const config = file('github-pages/app-config.js');
const transport = file('github-pages/github-gas-transport.js');
const workflow = file('.github/workflows/pages.yml');

ok('R331 application release converges across public Pages files', () => {
  for (const [name, text] of [['index', index], ['config', config], ['transport', transport], ['workflow', workflow]]) {
    assert.ok(text.toLowerCase().includes(REV), `missing ${REV} in ${name}`);
  }
  assert.match(index, /commission-v1\.2-p2b-perf-transport-tuning-2026-08-24-r331/);
  assert.match(index, /asset-manifest-r331-perf-transport-tuning/);
  assert.match(index, /current-quality-gate-r331/);
  assert.match(config, /github-pages-rpc-r330/);
  assert.match(transport, /rpc-r331/);
});

ok('R331 cache-bust markers are current', () => {
  assert.ok(index.includes('app-config.js?v=r331'));
  assert.ok(index.includes('github-gas-transport.js?v=r331'));
  assert.ok(!index.includes('app-config.js?v=r330'));
  assert.ok(!index.includes('github-gas-transport.js?v=r330'));
});

ok('GAS endpoint is a valid canonical Web App /exec URL', () => {
  const m = /GAS_URL=\"([^\"]+)\"/.exec(config);
  assert.ok(m && /^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(m[1]));
});

ok('single application revision with RPC protocol intentionally separated', () => {
  const stale = [];
  for (const [name, text] of [['index', index], ['config', config], ['transport', transport], ['workflow', workflow]]) {
    for (const token of stripNonRevision(text).match(/r\d{2,3}/gi) || []) {
      if (token.toLowerCase() !== REV) stale.push(`${name}:${token}`);
    }
  }
  assert.deepEqual(stale, []);
});

ok('XLSX SRI is preserved and never rewritten by release normalization', () => {
  assert.ok(index.includes('sha512-r22gChDnGvBylk90+2e/ycr3RVrDi8DIOkIGNhJlKfuyQM4tIRAI062MaV8sfjQKYVGjOBaZBOA87z+IhZE9DA=='));
  assert.ok(!index.includes('sha512-r331gCh'));
});

ok('CDN scripts keep SRI', () => {
  const scripts = [...index.matchAll(/<script[^>]+src=[\"'][^\"']+[\"'][^>]*>/gi)].map(m => m[0]);
  for (const tag of scripts) {
    if (/cdn\.jsdelivr|unpkg|cdnjs/i.test(tag)) assert.match(tag, /\bintegrity=[\"'][^\"']+[\"']/i);
  }
});

ok('RPC transport is fetch-only and legacy bridge is retired', () => {
  assert.ok(transport.includes('w.AppTransport.run=run'));
  assert.ok(transport.includes('method:"POST",mode:"no-cors"'));
  for (const forbidden of ['MessageChannel','legacyRemote','runGasDirectBridge','runVercelProxy','runJsonpApi','createElement("form")','createElement("iframe")','warmAuthBridge','ensureBridgeClient','RPC_POST_SIGNAL_GRACE']) {
    assert.ok(!transport.includes(forbidden), `retired transport token: ${forbidden}`);
  }
});

ok('Frontend JavaScript syntax', () => {
  jsSyntax(config, 'app-config.js');
  jsSyntax(transport, 'github-gas-transport.js');
  htmlScripts(index).forEach((s, i) => jsSyntax(s, `index.html#${i + 1}`));
});

ok('Workflow gates regression before Pages deployment', () => {
  assert.ok(workflow.includes('needs: regression'));
  assert.ok(workflow.includes('actions/checkout@v4'));
  assert.ok(workflow.includes('actions/configure-pages@v5'));
  assert.ok(workflow.includes('actions/upload-pages-artifact@v3'));
  assert.ok(workflow.includes('actions/deploy-pages@v4'));
  assert.ok(workflow.includes('Run R331 automated regression suite'));
  assert.ok(workflow.includes('workflow_dispatch:'));
});

ok('Public repository contains no GAS backend source', () => {
  assert.ok(!fs.existsSync(path.join(ROOT, 'gas-backend')));
});

console.log(`# ${passed} regression groups passed (frontend-only R331 mode)`);
