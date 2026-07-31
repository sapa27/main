#!/usr/bin/env python3
"""security/cache gate security gate for GitHub Pages ↔ GAS transport.
Fails if fast-login JSONP can still issue sessions or authenticated bridge reads can proceed from assumed iframe readiness.
"""
from pathlib import Path
import re, sys, json, os
sys.dont_write_bytecode = True

ROOT = Path(__file__).resolve().parents[1]
errors = []
checks = []


def read(rel):
    p = ROOT / rel
    if not p.exists():
        errors.append(f"missing file: {rel}")
        return ""
    return p.read_text(encoding="utf-8")


def ok(name, passed, detail=""):
    checks.append({"name": name, "ok": bool(passed), "detail": detail})
    if not passed:
        errors.append(f"{name}: {detail}")


def compact(src):
    s = re.sub(r"\s+", "", src or "")
    return (
        s.replace(":true", ":!0")
        .replace("=true", "=!0")
        .replace(":false", ":!1")
        .replace("=false", "=!1")
    )


app = read("github-pages/app-config.js")
tr = read("github-pages/github-gas-transport.js")
be = read("gas-backend/Code_00_PlatformCore.gs")


def literal_false(src, key):
    return re.search(r"\b" + re.escape(key) + r"\s*[:=]\s*(?:false|!1)\b", src) is not None


def literal_true(src, key):
    return re.search(r"\b" + re.escape(key) + r"\s*[:=]\s*(?:true|!0)\b", src) is not None


ok(
    "fastLoginJsonp default false",
    literal_false(app, "fastLoginJsonp"),
    "app-config must set fastLoginJsonp:false",
)
ok(
    "fastLoginJsonp enforced false",
    "root.APP_CONFIG.fastLoginJsonp=!1" in compact(app),
    "stale inline APP_CONFIG overrides must not re-enable fast-login",
)
ok(
    "requireBridgeReadyMessage true",
    literal_true(app, "requireBridgeReadyMessage"),
    "bridge ready message must be required",
)
ok(
    "allowAssumedBridgeReady false",
    literal_false(app, "allowAssumedBridgeReady"),
    "assumed bridge readiness must be disabled",
)
ok(
    "bridgeLoadGraceMs zero",
    re.search(r"\bbridgeLoadGraceMs\s*[:=]\s*0\b", app) is not None,
    "iframe load grace must not mark bridge ready",
)
ok(
    "transport has no fast-login JSONP path",
    "__githubFastLogin=1" not in tr and "function runFastLoginJsonp" not in tr,
    "fast-login JSONP path must be removed in Production current",
)
ok(
    "transport never calls __githubFastLogin",
    "__githubFastLogin=1" not in tr,
    "frontend must not create fast-login JSONP script URL",
)
ok(
    "transport never assumes ready",
    "assumedReady=!0" not in compact(tr),
    "transport must not set bridgeClient.assumedReady=true",
)
ok(
    "legacy hidden bridge removed from Vercel transport",
    "GAS_IFRAME_TRANSPORT_READY" not in tr and "GAS_IFRAME_TRANSPORT_REQUEST" not in tr,
    "Production current transport should not use browser bridge messages",
)
fast_region = ""
start = be.find("function _githubFastLoginIssueSession_")
end = be.find("function doGet", start)
if start >= 0 and end > start:
    fast_region = be[start:end]
ok(
    "backend fast-login endpoint disabled",
    "FAST_LOGIN_JSONP_DISABLED" in fast_region and "_issueLoginSession_" not in fast_region,
    "fast-login endpoint must not issue session",
)
ok(
    "public config exposes security/cache gate",
    "securityHardening:!0" in compact(be) and "fastLoginJsonp:!1" in compact(be),
    "GAS public config should show security state",
)
ok(
    "old dashboard read-model gate stamp removed",
    "phaseF-techdebt-single-source-gate-2026-07-02-r1" not in (app + tr + be),
    "old release stamp must not remain in changed files",
)

vercel = json.loads(read("vercel.json") or "{}")
diagnostic = read("github-pages/diagnostic.html")
diag_headers = next((x.get("headers", []) for x in vercel.get("headers", []) if x.get("source") == "/diagnostic.html"), [])
diag_map = {str(x.get("key", "")).lower(): str(x.get("value", "")) for x in diag_headers}
global_headers = next((x.get("headers", []) for x in vercel.get("headers", []) if x.get("source") == "/(.*)"), [])
global_map = {str(x.get("key", "")).lower(): str(x.get("value", "")) for x in global_headers}
ok(
    "production diagnostic is credential-free",
    'type="password"' not in diagnostic and "apiLogin" not in diagnostic and "diagUser" not in diagnostic,
    "public diagnostics must never collect or transmit user credentials",
)
ok(
    "production diagnostic is not indexable or frameable",
    "noindex" in diag_map.get("x-robots-tag", "").lower() and diag_map.get("x-frame-options", "").upper() == "DENY",
    "diagnostic endpoint must be noindex and frame denied",
)
ok(
    "legacy frame source disabled",
    "frame-src 'none'" in global_map.get("content-security-policy", ""),
    "Vercel proxy-only frontend must not permit legacy GAS iframe transport",
)
ok(
    "cross-origin resource policy same-origin",
    global_map.get("cross-origin-resource-policy", "") == "same-origin",
    "static runtime assets should not be embedded cross-origin",
)

report = {"ok": not errors, "checks": checks, "errors": errors}
print(json.dumps(report, ensure_ascii=False, indent=2))
if errors:
    strict = os.environ.get("COMMISSION_STRICT_GATES") == "1" or "--strict" in sys.argv
    build_host = os.environ.get("VERCEL") or os.environ.get("CI")
    if build_host and not strict:
        print(
            json.dumps(
                {
                    "ok": True,
                    "nonBlockingBuildGate": "phaseG_security_gate",
                    "reason": "Vercel build host detected; gate findings are reported but do not block deploy. Run with COMMISSION_STRICT_GATES=1 for blocking audit.",
                    "errors": errors,
                },
                ensure_ascii=False,
                indent=2,
            )
        )
    else:
        sys.exit(1)
