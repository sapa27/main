#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path
import argparse
import hashlib
import json
import re
import sys
sys.dont_write_bytecode = True

ROOT = Path(__file__).resolve().parents[1]
PACKAGE_JSON = ROOT / "package.json"
ROUTER_SOURCE = ROOT / "gas-backend" / "Code_20_Router.gs"
PROXY_COMMON = ROOT / "api" / "_gasProxyCommon.js"
MANIFEST = ROOT / "TECH_DEBT_MANIFEST.json"
CANONICAL_RUNTIME_DIR = ROOT / "gas-backend"
STATIC_RUNTIME_DIR = ROOT / "github-pages" / "partials"
ENV_OUT = ROOT / "github-pages" / "vercel-env.generated.js"
GAS_INDEX = ROOT / "gas-backend" / "Index.html"
CRITICAL_RUNTIME = ROOT / "gas-backend" / "Scripts_Critical_Login_Runtime.html"
ASSET_SOURCE = ROOT / "gas-backend" / "Code_03_Platform_Assets.gs"
APP_CONFIG = ROOT / "github-pages" / "app-config.js"
STATIC_INDEX = ROOT / "github-pages" / "index.html"
GENERATED_FRONTEND_FILES = {
    "app-index-foundation-pre-vue.js",
    "app-index-foundation-after-vue.js",
    "app-index-foundation-after-swal.js",
    "app-index-bootstrap.js",
    "critical-login-runtime.js",
}
def _package_metadata() -> dict:
    data = json.loads(PACKAGE_JSON.read_text(encoding="utf-8"))
    release = str(data.get("release") or data.get("releaseStamp") or "").strip()
    asset = str(data.get("assetStamp") or "").strip()
    version = str(data.get("version") or "").strip()
    if not release or not asset or not version:
        raise RuntimeError("PACKAGE_RELEASE_METADATA_MISSING")
    return {"release": release, "asset": asset, "version": version}


_PACKAGE = _package_metadata()
RELEASE = _PACKAGE["release"]
ASSET = _PACKAGE["asset"]
VERSION = _PACKAGE["version"]
MIRROR_HEADER = "<!-- GENERATED MIRROR: gas-backend/{name} -->\n"


RELEASE_SYNC_FILES = [
    ROOT / "TECH_DEBT_MANIFEST.json",
    ROOT / "api" / "_gasProxyCommon.js",
    ROOT / "gas-backend" / "Code_00_PlatformCore.gs",
    ROOT / "gas-backend" / "Scripts_Critical_Login_Runtime.html",
    ROOT / "gas-backend" / "Scripts_Page_Dashboard.html",
    ROOT / "github-pages" / "app-config.js",
    ROOT / "github-pages" / "diagnostic.html",
    ROOT / "github-pages" / "github-gas-transport.js",
    ROOT / "github-pages" / "index.html",
    ROOT / "tools" / "phaseN_legacy_transport_gate.py",
    ROOT / "vercel.json",
]
RELEASE_PATTERN = re.compile(r"commission-v1\.2-gas-hosted-production-\d{4}-\d{2}-\d{2}-r\d+")
ASSET_PATTERN = re.compile(r"asset-manifest-commission-v1\.2-gas-hosted-production-\d{4}-\d{2}-\d{2}-r\d+")


def _canonical_fallback_logo_data_uri() -> str:
    text = ASSET_SOURCE.read_text(encoding="utf-8")
    # Former readable owner.
    match = re.search(
        r"function _appDefaultLogoDataUri_\(\)\s*\{[\s\S]*?var markup\s*=\s*'([^']+)'",
        text,
    )
    # Current compact owner in getAppLogoConfig_.
    if not match:
        match = re.search(
            r"compactDefaultSvg\s*=\s*[\"']data:image/svg\+xml;charset=UTF-8,[\"']\s*\+\s*encodeURIComponent\(\s*'([^']+)'\s*\)",
            text,
        )
    if not match:
        raise RuntimeError("CANONICAL_FALLBACK_LOGO_NOT_FOUND")
    from urllib.parse import quote
    return "data:image/svg+xml;charset=UTF-8," + quote(match.group(1), safe="")


def _sync_fallback_logo() -> bool:
    expected = _canonical_fallback_logo_data_uri()
    text = APP_CONFIG.read_text(encoding="utf-8")
    pattern = re.compile(r'(FALLBACK_LOGO\s*=\s*)"[^"]*"')
    updated, count = pattern.subn(lambda m: m.group(1) + json.dumps(expected, ensure_ascii=False), text, count=1)
    if count != 1:
        raise RuntimeError("APP_CONFIG_FALLBACK_LOGO_BLOCK_NOT_FOUND")
    if updated != text:
        APP_CONFIG.write_text(updated, encoding="utf-8")
        return True
    return False


STATIC_LOGIN_CONTRACT_START = "/* GENERATED LOGIN TRANSITION CONTRACT: canonical GAS Index */"
STATIC_LOGIN_CONTRACT_END = "/* END GENERATED LOGIN TRANSITION CONTRACT */"


def _staticize_index_from_canonical() -> bool:
    text = GAS_INDEX.read_text(encoding="utf-8")
    expected_logo = _canonical_fallback_logo_data_uri()

    replacements = [
        (r"<\?var __logo=[\s\S]*?\?>", ""),
        (r"<\?!=\s*__logo\.png96\s*\?>", expected_logo),
        (r"<\?!=\s*getActiveLogoUrl_\(\)\s*\?>", expected_logo),
        (r"<\?=\s*getActiveLogoUrl_\(\)\s*\?>", expected_logo),
        (r"<\?!=JSON\.stringify\(__logo\|\|\{\}\)\?>", _vercel_static_logo_expression()),
        (
            r"<\?!=JSON\.stringify\(\(typeof serverLogoUrl[\s\S]*?\)\?serverLogoUrl:''\)\?>",
            'String((window.APP_CONFIG || {}).logoUrl || "")',
        ),
        (r"<\?!=bootstrapJson\?>", _vercel_static_bootstrap_expression()),
        (r"<\?!=\(typeof assetManifestJson[\s\S]*?\?>", _vercel_static_asset_manifest_expression()),
        (
            r"<\?!=includeProductionBundle_\('appCritical'\)\?>",
            '<script src="critical-login-runtime.js"></script>',
        ),
        (
            r"<\?!=\(typeof coreRuntimeFilesJson[\s\S]*?\?>",
            json.dumps(["Scripts_Core_Runtime"], ensure_ascii=False),
        ),
        (
            r"<\?!=\(typeof deferredScriptMapJson[\s\S]*?\?>",
            json.dumps({
                "dashboard": ["Scripts_Page_Dashboard"],
                "search": ["Scripts_Page_ReportTrack"],
                "petitioner": ["Scripts_Page_Petitioner"],
                "meeting": ["Scripts_Page_Meeting"],
                "committee-meeting": ["Scripts_Page_Meeting"],
                "track": ["Scripts_Page_ReportTrack"],
                "report": ["Scripts_Page_ReportTrack"],
                "people": ["Scripts_Page_People"],
                "personnel": ["Scripts_Page_People"],
                "budget": ["Scripts_Page_Budget"],
                "admin": ["Scripts_Page_Admin"],
                "ai": ["Scripts_Core_Runtime"],
                "print": ["Scripts_Core_Runtime"],
            }, ensure_ascii=False),
        ),
        (r"<\?!=\(typeof deferredTemplateMapJson[\s\S]*?\?>", "{}"),
    ]
    updated = text
    for pattern, value in replacements:
        updated, count = re.subn(pattern, lambda _m, replacement=value: replacement, updated)
        if count < 1:
            raise RuntimeError(f"STATIC_INDEX_TEMPLATE_REPLACEMENT_FAILED:{pattern}:{count}")
    if "<?" in updated:
        raise RuntimeError("UNRESOLVED_GAS_TEMPLATE_IN_STATIC_INDEX")

    canonical_blocks = _script_blocks(GAS_INDEX)
    dom_contract_index = next(
        (i for i, block in enumerate(canonical_blocks) if block["id"] == "app-index-dom-contract-owner"),
        -1,
    )
    async_index = next(
        (i for i, block in enumerate(canonical_blocks) if block["id"] == "app-async-runtime-loader"),
        -1,
    )
    if dom_contract_index < 0 or async_index < 0:
        raise RuntimeError("STATIC_INDEX_SCRIPT_OWNER_MARKER_MISSING")
    pre_indices = set(range(dom_contract_index + 1))
    thai_indices = {
        i for i, block in enumerate(canonical_blocks)
        if "Index.thai-date-early-adapter" in block["body"]
    }
    after_tokens = (
        "function safeAlertFire",
        "window.APP_LOGO=window.APP_LOGO||",
        "__APP_ASSET_POLICY_CURRENT__",
        "window.DEFAULT_LOGO=window.DEFAULT_LOGO||",
        "patchParliamentLogo",
        "window.__APP_BOOTSTRAP__=",
    )
    after_indices = {
        i for i, block in enumerate(canonical_blocks)
        if any(token in block["body"] for token in after_tokens)
    }
    bootstrap_indices = {
        i for i, block in enumerate(canonical_blocks)
        if i > async_index and block["body"] and "text/x-template" not in block["type"]
    }
    if len(thai_indices) != 1 or len(after_indices) != len(after_tokens) or len(bootstrap_indices) < 4:
        raise RuntimeError(
            f"STATIC_INDEX_SCRIPT_OWNER_COUNT_INVALID:thai={len(thai_indices)}:after={len(after_indices)}:bootstrap={len(bootstrap_indices)}"
        )

    first_pre = min(pre_indices)
    first_thai = min(thai_indices)
    first_after = min(after_indices)
    first_bootstrap = min(bootstrap_indices)
    script_index = -1
    script_pattern = re.compile(r"<script\b([^>]*)>([\s\S]*?)</script>", re.IGNORECASE)

    def externalize_script(match: re.Match) -> str:
        nonlocal script_index
        if "critical-login-runtime.js" in (match.group(1) or ""):
            return match.group(0)
        script_index += 1
        if script_index in pre_indices:
            return '<script src="app-index-foundation-pre-vue.js"></script>' if script_index == first_pre else ""
        if script_index in thai_indices:
            return '<script src="app-index-foundation-after-vue.js"></script>' if script_index == first_thai else ""
        if script_index in after_indices:
            return '<script src="app-index-foundation-after-swal.js"></script>' if script_index == first_after else ""
        if script_index == async_index:
            return ""
        if script_index in bootstrap_indices:
            return '<script src="app-index-bootstrap.js"></script>' if script_index == first_bootstrap else ""
        return match.group(0)

    updated = script_pattern.sub(externalize_script, updated)
    transport_anchor = '<script src="app-index-foundation-pre-vue.js"></script>'
    transport_block = '<script src="vercel-env.generated.js"></script>\n<script src="app-config.js"></script>\n<script src="github-gas-transport.js"></script>\n' + transport_anchor
    if transport_anchor not in updated:
        raise RuntimeError("STATIC_INDEX_TRANSPORT_ANCHOR_MISSING")
    updated = updated.replace(transport_anchor, transport_block, 1)
    current = STATIC_INDEX.read_text(encoding="utf-8") if STATIC_INDEX.exists() else None
    if current != updated:
        STATIC_INDEX.write_text(updated, encoding="utf-8")
        return True
    return False


def _sync_static_login_contract() -> bool:
    expected_logo = _canonical_fallback_logo_data_uri()
    text = STATIC_INDEX.read_text(encoding="utf-8")
    updated = text

    login_pattern = re.compile(
        r'(<div class="lcurrentStamp2-logo-wrap">)\s*(?:<span class="lcurrentStamp2-logo-placeholder"[^>]*>[^<]*</span>\s*)?<img id="login-logo-img"(?:\s*class="logo-loaded")?\s*src="[^"]*"',
        re.S,
    )
    replacement = (
        r'\1<span class="lcurrentStamp2-logo-placeholder" aria-hidden="true">รัฐสภา</span>'
        + '<img id="login-logo-img" src=' + json.dumps(expected_logo, ensure_ascii=False)
    )
    updated, count = login_pattern.subn(replacement, updated, count=1)
    if count != 1:
        raise RuntimeError("STATIC_LOGIN_LOGO_CONTRACT_NOT_FOUND")

    for logo_id in ("side-logo-img", "mobile-topbar-logo"):
        pattern = re.compile(r'(<img id="' + re.escape(logo_id) + r'"src=")[^"]*(")')
        updated = pattern.sub(lambda match: match.group(1) + expected_logo + match.group(2), updated)

    css = f"""{STATIC_LOGIN_CONTRACT_START}
.lcurrentStamp2-logo-wrap{{position:relative;background:#fff!important}}
.lcurrentStamp2-logo-placeholder{{
  position:absolute;inset:8px;z-index:0;display:flex;align-items:center;justify-content:center;
  border-radius:50%;background:#fff!important;color:#001e3c;font-size:1.15rem;font-weight:800;
  text-align:center;border:1px solid #d7dee8
}}
.lcurrentStamp2-logo-wrap img{{position:relative;z-index:1}}
.lcurrentStamp2-logo-wrap img{{visibility:visible!important}}
.app-boot-status{{display:none;background:#fff;color:#1e293b}}
html.app-auth-resolving #app-boot-status{{display:none!important}}
html.app-auth-resolving #login-page{{display:none!important}}
{STATIC_LOGIN_CONTRACT_END}"""
    block_pattern = re.compile(re.escape(STATIC_LOGIN_CONTRACT_START) + r'[\s\S]*?' + re.escape(STATIC_LOGIN_CONTRACT_END))
    if block_pattern.search(updated):
        updated = block_pattern.sub(css, updated, count=1)
    else:
        style_end = updated.rfind("</style>")
        if style_end < 0:
            raise RuntimeError("STATIC_INDEX_STYLE_END_NOT_FOUND")
        updated = updated[:style_end] + css + "\n" + updated[style_end:]

    if updated != text:
        STATIC_INDEX.write_text(updated, encoding="utf-8")
        return True
    return False


def _extract_function_body(text: str, function_name: str) -> str:
    start = text.find(f"function {function_name}")
    if start < 0:
        return ""
    brace = text.find("{", start)
    if brace < 0:
        return ""
    depth = 0
    quote = ""
    escaped = False
    for index in range(brace, len(text)):
        char = text[index]
        if quote:
            if escaped:
                escaped = False
            elif char == "\\":
                escaped = True
            elif char == quote:
                quote = ""
            continue
        if char in ("'", '"', "`"):
            quote = char
        elif char == "{":
            depth += 1
        elif char == "}":
            depth -= 1
            if depth == 0:
                return text[brace + 1:index]
    return ""


def _router_methods() -> list[str]:
    text = ROUTER_SOURCE.read_text(encoding="utf-8")

    # Backward-compatible reader for the former canonical handler map.
    start = text.find("function _routerCanonicalHandlerMap_")
    end = text.find("function _routerResolveCanonicalHandler_", start)
    methods: list[str] = []
    if start >= 0 and end > start:
        block = text[start:end]
        methods = re.findall(
            r"^\s*(api[A-Za-z0-9_]+|getDeferredInclude)\s*:\s*typeof\s+",
            block,
            re.MULTILINE,
        )

    # Current router owner: core, admin and AI route tuple registries.
    if not methods:
        route_group_pattern = re.compile(
            r"[\"']((?:(?:api[A-Za-z0-9_]+|getDeferredInclude)(?:\|(?:api[A-Za-z0-9_]+|getDeferredInclude))*))[\"']\s*,"
        )
        for function_name in (
            "_routerPhase1CoreRouteTuples_",
            "_routerAdminRoutes_",
            "_routerAiRoutes_",
        ):
            body = _extract_function_body(text, function_name)
            if not body:
                raise RuntimeError(f"ROUTER_ROUTE_TUPLE_OWNER_NOT_FOUND:{function_name}")
            for group in route_group_pattern.findall(body):
                methods.extend(group.split("|"))

    methods = list(dict.fromkeys(methods))
    if len(methods) < 50:
        raise RuntimeError(f"ROUTER_METHOD_COUNT_SUSPICIOUS:{len(methods)}")
    return methods


def _proxy_allowlist_text(methods: list[str]) -> str:
    lines = ["// GENERATED from gas-backend/Code_20_Router.gs canonical route registry.",
             "const PROXY_ALLOWED_METHODS = Object.freeze(["]
    lines.extend(f'  {json.dumps(method)},' for method in methods)
    lines.append("]);" )
    return "\n".join(lines)


def _sync_release_metadata() -> list[str]:
    changed = []
    for path in RELEASE_SYNC_FILES:
        if not path.exists():
            raise RuntimeError(f"RELEASE_SYNC_FILE_MISSING:{path.relative_to(ROOT)}")
        text = path.read_text(encoding="utf-8")
        updated = RELEASE_PATTERN.sub(RELEASE, text)
        updated = ASSET_PATTERN.sub(ASSET, updated)
        if updated != text:
            path.write_text(updated, encoding="utf-8")
            changed.append(str(path.relative_to(ROOT)))
    return changed


def _sync_proxy_contract(methods: list[str]) -> bool:
    text = PROXY_COMMON.read_text(encoding="utf-8")
    pattern = re.compile(r"(?:\/\/ GENERATED from gas-backend/Code_20_Router\.gs(?: canonical route registry|::_routerCanonicalHandlerMap_)\.\n)?const PROXY_ALLOWED_METHODS = Object\.freeze\(\[[\s\S]*?\]\);", re.MULTILINE)
    updated, count = pattern.subn(_proxy_allowlist_text(methods), text, count=1)
    if count != 1:
        raise RuntimeError("PROXY_ALLOWLIST_BLOCK_NOT_FOUND")
    if updated != text:
        PROXY_COMMON.write_text(updated, encoding="utf-8")
        return True
    return False


def _sync_manifest(methods: list[str]) -> bool:
    data = json.loads(MANIFEST.read_text(encoding="utf-8"))
    data["release"] = RELEASE
    data["releaseStamp"] = RELEASE
    data["assetStamp"] = ASSET
    data["apiContractOwner"] = "gas-backend/Code_20_Router.gs::_routerCanonicalHandlerMap_"
    api = data.setdefault("apiContract", {})
    api["routeCount"] = len(methods)
    api["owner"] = "gas-backend/Code_20_Router.gs::_routerCanonicalHandlerMap_"
    api["proxyOwner"] = "generated by tools/generate_vercel_env.py from canonical router handler map"
    freeze = data.setdefault("contractFreeze", {})
    freeze["routeCount"] = len(methods)
    freeze["apiMethods"] = methods
    data["p3ReleaseSecurity"] = {
        "stamp": "production-verified-recovery-single-owner-r39",
        "releaseOwner": "package.json::release",
        "apiContractOwner": "gas-backend/Code_20_Router.gs::_routerCanonicalHandlerMap_",
        "proxyAllowlistGenerated": True,
        "manifestApiMethodsGenerated": True,
        "diagnosticCredentialInputsRemoved": True,
        "diagnosticNoIndex": True,
        "diagnosticFrameDenied": True,
        "vercelFrameSource": "none",
        "productionBrowserGate": "npm run production:e2e",
        "noNewApiRoutes": True,
        "spreadsheetSchemaChanged": False,
        "businessRulesChanged": False,
        "uiStructureChanged": False,
    }
    build_contract = data.setdefault("buildContract", {})
    build_contract["packageBuildCommand"] = json.loads(PACKAGE_JSON.read_text(encoding="utf-8"))["scripts"]["build"]
    build_contract["sourceContractOwner"] = "tools/phaseN_legacy_transport_gate.py::check_build_contracts"
    build_contract["sourceContractCommand"] = "npm run check:contracts"
    build_contract["duplicateInlineGateOwnersRemoved"] = True

    data["generatedMirror"] = "github-pages/{app-index-foundation-pre-vue.js,app-index-foundation-after-vue.js,app-index-foundation-after-swal.js,app-index-bootstrap.js,critical-login-runtime.js,vercel-env.generated.js,partials/Scripts_*.html}"
    single = data.setdefault("singleSourceGeneration", {})
    single.update({
        "stamp": "production-verified-recovery-single-owner-r39",
        "canonicalOwners": ["gas-backend/Index.html", "gas-backend/Scripts_*.html", "github-pages/app-config.js"],
        "generator": "tools/generate_vercel_env.py",
        "generatedRuntimeCount": 9,
        "generatedFrontendCount": 5,
        "generatedEnv": "github-pages/vercel-env.generated.js",
        "sourcePackageExcludesGeneratedArtifacts": True,
        "sourceFileCount": 37,
        "buildOutputFileCount": 52,
        "duplicateRuntimeBytesRemovedFromSourcePackage": 2022437,
        "postSwalFoundationGenerated": True,
        "uiModernizationRuntimeGenerated": True,
        "externalVueRuntimeRemoved": True,
        "pwaManifestMimeCorrected": True,
        "newApiRoutes": 0,
        "newSourceFiles": 0,
        "uiStructureChanged": False,
        "businessLogicChanged": False,
        "spreadsheetSchemaChanged": False,
    })
    runtime = data.setdefault("runtimePolicies", {})
    runtime["frontendTransportOwner"] = "host-aware: GAS Scripts_Critical_Login_Runtime AppTransport.run; Vercel github-pages/github-gas-transport.js AppTransport.run"
    runtime["clientInFlightOwner"] = "host-aware AppTransport.inFlightOnly"
    data["productionConsolidation"] = {
        "stamp": "production-verified-recovery-single-owner-r39",
        "releaseOwner": "package.json::release",
        "apiContractOwner": "gas-backend/Code_20_Router.gs::_routerCanonicalHandlerMap_",
        "runtimeSourceOwner": "gas-backend/Index.html + gas-backend/Scripts_*.html",
        "postSwalGeneratedFromIndex": True,
        "uiModernizationGeneratedFromIndex": True,
        "buildContractOwner": "tools/phaseN_legacy_transport_gate.py::check_build_contracts",
        "appConfigDeadPropertiesRemoved": 48,
        "packageInlineGateOwnersRemoved": True,
        "currentProductionGateOwner": "tools/phaseN_legacy_transport_gate.py::current_checks",
        "historicalGateBytesBeforeConsolidation": 263260,
        "currentProductionGateBytes": (ROOT / "tools" / "phaseN_legacy_transport_gate.py").stat().st_size,
        "exactDuplicateFunctionGroupsOver300Bytes": 0,
        "sourceFileCount": 37,
        "buildOutputFileCount": 52,
        "noNewApiRoutes": True,
        "noNewSourceFiles": True,
        "spreadsheetSchemaChanged": False,
        "businessRulesChanged": False,
        "uiStructureChanged": False,
    }
    rendered = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
    current = MANIFEST.read_text(encoding="utf-8")
    if rendered != current:
        MANIFEST.write_text(rendered, encoding="utf-8")
        return True
    return False


def _contract_drift_errors() -> list[str]:
    errors = []
    # GAS may reject raw BOM/line-separator characters embedded mid-source even
    # when modern Node parses them. Keep the canonical GAS source ASCII-escaped.
    lexical_hazards = {"\ufeff": "RAW_BOM", "\u2028": "RAW_LINE_SEPARATOR", "\u2029": "RAW_PARAGRAPH_SEPARATOR"}
    for source in sorted(CANONICAL_RUNTIME_DIR.iterdir()):
        if not source.is_file() or source.suffix.lower() not in {".gs", ".html", ".js"}:
            continue
        source_text = source.read_text(encoding="utf-8")
        for token, label in lexical_hazards.items():
            positions = [str(i) for i, char in enumerate(source_text) if char == token]
            if positions:
                errors.append(f"GAS_LEXICAL_HAZARD:{label}:{source.relative_to(ROOT)}:{','.join(positions[:8])}")
    methods = _router_methods()
    proxy = PROXY_COMMON.read_text(encoding="utf-8")
    match = re.search(r"const PROXY_ALLOWED_METHODS = Object\.freeze\(\[([\s\S]*?)\]\);", proxy)
    proxy_methods = re.findall(r'["\'](api[A-Za-z0-9_]+|getDeferredInclude)["\']', match.group(1) if match else "")
    if proxy_methods != methods:
        errors.append("PROXY_ALLOWLIST_NOT_GENERATED_FROM_ROUTER")
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    if manifest.get("contractFreeze", {}).get("apiMethods") != methods:
        errors.append("MANIFEST_API_METHODS_NOT_GENERATED_FROM_ROUTER")
    if manifest.get("release") != RELEASE or manifest.get("assetStamp") != ASSET:
        errors.append("MANIFEST_RELEASE_NOT_PACKAGE_OWNED")
    app_config = APP_CONFIG.read_text(encoding="utf-8")
    fallback_match = re.search(r'FALLBACK_LOGO\s*=\s*"([^"]*)"', app_config)
    if not fallback_match or fallback_match.group(1) != _canonical_fallback_logo_data_uri():
        errors.append("APP_CONFIG_FALLBACK_LOGO_NOT_CANONICAL")
    static_index = STATIC_INDEX.read_text(encoding="utf-8")
    if STATIC_LOGIN_CONTRACT_START not in static_index or 'รัฐสภา</span><img id="login-logo-img"' not in static_index:
        errors.append("STATIC_LOGIN_CONTRACT_NOT_GENERATED_FROM_CANONICAL")
    for path in RELEASE_SYNC_FILES:
        text = path.read_text(encoding="utf-8")
        releases = set(RELEASE_PATTERN.findall(text))
        assets = set(ASSET_PATTERN.findall(text))
        if releases and releases != {RELEASE}:
            errors.append(f"RELEASE_DRIFT:{path.relative_to(ROOT)}:{sorted(releases)}")
        if assets and assets != {ASSET}:
            errors.append(f"ASSET_DRIFT:{path.relative_to(ROOT)}:{sorted(assets)}")
    return errors


def _runtime_sources() -> list[Path]:
    return sorted(CANONICAL_RUNTIME_DIR.glob("Scripts_*.html"), key=lambda path: path.name)


def _expected_mirror(source: Path) -> str:
    text = source.read_text(encoding="utf-8")
    # Keep the historical byte-equivalent Core mirror contract. All other mirrors
    # carry an explicit generated marker and are never edited directly.
    if source.name == "Scripts_Core_Runtime.html":
        return text
    return MIRROR_HEADER.format(name=source.name) + text



def _script_blocks(path: Path) -> list[dict[str, str]]:
    text = path.read_text(encoding="utf-8")
    blocks: list[dict[str, str]] = []
    pattern = re.compile(r"<script\b([^>]*)>([\s\S]*?)</script>", re.IGNORECASE)
    for match in pattern.finditer(text):
        attrs = match.group(1) or ""
        body = match.group(2) or ""
        id_match = re.search(r"\bid=[\"']([^\"']+)", attrs, re.IGNORECASE)
        type_match = re.search(r"\btype=[\"']([^\"']+)", attrs, re.IGNORECASE)
        blocks.append({
            "id": id_match.group(1) if id_match else "",
            "type": type_match.group(1).lower() if type_match else "",
            "attrs": attrs,
            "body": body.strip(),
        })
    return blocks


def _join_javascript(blocks: list[dict[str, str]], source_label: str) -> str:
    bodies = [block["body"] for block in blocks if block["body"] and "text/x-template" not in block["type"]]
    if not bodies:
        raise RuntimeError(f"NO_GENERATABLE_JAVASCRIPT:{source_label}")
    return "// GENERATED from " + source_label + ". Do not edit directly.\n" + ";\n".join(bodies) + "\n"


def _vercelize_index_javascript(text: str) -> str:
    deferred_scripts = {
        "dashboard": ["Scripts_Page_Dashboard"],
        "search": ["Scripts_Page_ReportTrack"],
        "petitioner": ["Scripts_Page_Petitioner"],
        "meeting": ["Scripts_Page_Meeting"],
        "committee-meeting": ["Scripts_Page_Meeting"],
        "track": ["Scripts_Page_ReportTrack"],
        "report": ["Scripts_Page_ReportTrack"],
        "people": ["Scripts_Page_People"],
        "personnel": ["Scripts_Page_People"],
        "budget": ["Scripts_Page_Budget"],
        "admin": ["Scripts_Page_Admin"],
        "ai": ["Scripts_Core_Runtime"],
        "print": ["Scripts_Core_Runtime"],
    }
    replacements = [
        (r"<\?!=\(typeof coreRuntimeFilesJson[\s\S]*?\?>", json.dumps(["Scripts_Core_Runtime"], ensure_ascii=False)),
        (r"<\?!=\(typeof deferredScriptMapJson[\s\S]*?\?>", json.dumps(deferred_scripts, ensure_ascii=False)),
        (r"<\?!=\(typeof deferredTemplateMapJson[\s\S]*?\?>", "{}"),
    ]
    for pattern, value in replacements:
        text, count = re.subn(pattern, value, text, count=1)
        if count != 1:
            raise RuntimeError(f"INDEX_TEMPLATE_REPLACEMENT_FAILED:{pattern}")
    if "<?" in text:
        raise RuntimeError("UNRESOLVED_GAS_TEMPLATE_IN_GENERATED_JAVASCRIPT")
    return text




def _vercel_static_logo_expression() -> str:
    return """(function(root) {
  var cfg = root.APP_CONFIG || {};
  var fallback = String(cfg.fallbackLogoUrl || cfg.logoUrl || "");
  var active = String(cfg.logoUrl || fallback);
  return {
    svg: fallback,
    png96: fallback,
    png192: fallback,
    png512: fallback,
    inline: "",
    active: active,
    source: "github-static-app-config"
  };
})(window)"""


def _vercel_static_bootstrap_expression() -> str:
    pages = [
        "/login", "/dashboard", "/meeting", "/search", "/track",
        "/report", "/people", "/petitioner", "/budget", "/admin",
    ]
    pages_json = json.dumps(pages, ensure_ascii=False)
    return f"""(function(root) {{
  var cfg = root.APP_CONFIG || {{}};
  var release = String(cfg.releaseStamp || "{RELEASE}");
  var assetManifest = cfg.assetManifest || {{}};
  return {{
    ok: true,
    page: "/dashboard",
    requestedPage: "/dashboard",
    session: null,
    user: null,
    source: "github-pages-static-bootstrap",
    generatedAt: "build-time",
    authenticated: false,
    username: "",
    displayName: "",
    role: "",
    csrfToken: "",
    authBootstrapMode: "vercel-api-proxy",
    sessionRestoreSupported: true,
    sessionResumeMode: "sessionStorage-opaque-resume-handle",
    loginRouteContract: "router-login-renders-form-current-critical-runtime",
    criticalRuntimeContract: "critical-login-runtime-production-current",
    runtimeAuthContract: "runtime-auth-production-current",
    logoUrl: String(cfg.logoUrl || cfg.fallbackLogoUrl || ""),
    defaultRoute: "/dashboard",
    appStamp: "github-pages-static-" + release,
    assetStamp: String(assetManifest.stamp || cfg.assetStamp || "{ASSET}"),
    baseUrl: "",
    uiMode: "vue3",
    enabledVuePages: {pages_json},
    terminology: cfg.terminology || {{}},
    printStandard: cfg.printStandard || {{}}
  }};
}})(window)"""


def _vercel_static_asset_manifest_expression() -> str:
    return """(function(root) {
  var cfg = root.APP_CONFIG || {};
  return cfg.assetManifest || {
    stamp: cfg.assetStamp || "",
    bundles: {},
    upfrontScripts: [],
    chunks: {},
    templates: {},
    externalGroups: [],
    externalAssets: {}
  };
})(window)"""


def _vercelize_after_swal_javascript(text: str) -> str:
    replacements = [
        (r"<\?!=JSON\.stringify\(__logo\|\|\{\}\)\?>", _vercel_static_logo_expression()),
        (r"<\?!=JSON\.stringify\(\(typeof serverLogoUrl[\s\S]*?\)\?serverLogoUrl:''\)\?>", 'String((window.APP_CONFIG || {}).logoUrl || "")'),
        (r"<\?!=bootstrapJson\?>", _vercel_static_bootstrap_expression()),
        (r"<\?!=\(typeof assetManifestJson[\s\S]*?\?>", _vercel_static_asset_manifest_expression()),
    ]
    for pattern, value in replacements:
        text, count = re.subn(pattern, lambda _match, replacement=value: replacement, text, count=1)
        if count != 1:
            raise RuntimeError(f"AFTER_SWAL_TEMPLATE_REPLACEMENT_FAILED:{pattern}")
    if "<?" in text:
        raise RuntimeError("UNRESOLVED_GAS_TEMPLATE_IN_AFTER_SWAL")
    return text


def _generated_frontend_assets() -> dict[Path, str]:
    index_blocks = _script_blocks(GAS_INDEX)
    critical_blocks = _script_blocks(CRITICAL_RUNTIME)

    dom_contract_index = next((i for i, block in enumerate(index_blocks) if block["id"] == "app-index-dom-contract-owner"), -1)
    if dom_contract_index < 0:
        raise RuntimeError("INDEX_DOM_CONTRACT_MARKER_MISSING")
    pre_blocks = index_blocks[: dom_contract_index + 1]

    thai_date_blocks = [block for block in index_blocks if "Index.thai-date-early-adapter" in block["body"]]
    if len(thai_date_blocks) != 1:
        raise RuntimeError(f"THAI_DATE_ADAPTER_COUNT:{len(thai_date_blocks)}")

    after_swal_tokens = [
        "function safeAlertFire",
        "window.APP_LOGO=window.APP_LOGO||",
        "__APP_ASSET_POLICY_CURRENT__",
        "window.DEFAULT_LOGO=window.DEFAULT_LOGO||",
        "patchParliamentLogo",
        "window.__APP_BOOTSTRAP__=",
    ]
    after_swal_blocks = []
    for token in after_swal_tokens:
        matches = [block for block in index_blocks if token in block["body"]]
        if len(matches) != 1:
            raise RuntimeError(f"AFTER_SWAL_BLOCK_COUNT:{token}:{len(matches)}")
        after_swal_blocks.append(matches[0])

    async_index = next((i for i, block in enumerate(index_blocks) if block["id"] == "app-async-runtime-loader"), -1)
    if async_index < 0:
        raise RuntimeError("ASYNC_RUNTIME_LOADER_MARKER_MISSING")
    async_block = index_blocks[async_index]
    bootstrap_blocks = [
        block for block in index_blocks[async_index + 1 :]
        if block["body"] and "text/x-template" not in block["type"]
    ]
    if len(bootstrap_blocks) < 4:
        raise RuntimeError(f"INDEX_BOOTSTRAP_BLOCK_COUNT:{len(bootstrap_blocks)}")

    return {
        ROOT / "github-pages" / "app-index-foundation-pre-vue.js": _join_javascript(pre_blocks, "gas-backend/Index.html foundation-pre"),
        ROOT / "github-pages" / "app-index-foundation-after-vue.js": _join_javascript(thai_date_blocks, "gas-backend/Index.html thai-date-adapter"),
        ROOT / "github-pages" / "app-index-foundation-after-swal.js": _vercelize_after_swal_javascript(_join_javascript(after_swal_blocks, "gas-backend/Index.html post-swal-foundation")),
        ROOT / "github-pages" / "app-index-bootstrap.js": _vercelize_index_javascript(_join_javascript(bootstrap_blocks, "gas-backend/Index.html bootstrap")),
        ROOT / "github-pages" / "critical-login-runtime.js": _join_javascript(critical_blocks + [async_block], "gas-backend/Scripts_Critical_Login_Runtime.html + Index async loader"),
    }


def _public_config_js() -> str:
    cfg = {
        "releaseTrack": "production-current",
        "version": VERSION,
        "releaseStamp": RELEASE,
        "assetStamp": ASSET,
        "hostingTarget": "vercel-api-proxy",
        "vercelStaticFrontendReady": True,
        "vercelApiProxyEnabled": True,
        "legacyTransportRemoved": True,
        "legacyJsonpTransportRemoved": True,
        "legacyGasBridgeTransportRemoved": True,
        "legacyLoginPostIframeRemoved": True,
        "vercelApiProxyUrl": "/api/gas",
        "vercelLoginProxyUrl": "/api/login",
        "vercelPublicConfigProxyUrl": "/api/public-config",
        "proxyRejectGoogleHostedFrontend": True,
        "gasBackendUiDisabled": True,
        "gasBackendFrontendEntryProperty": "VERCEL_FRONTEND_URL",
        "gasWebAppUrl": "",
        "gasWebAppUrlPublicFallbackOnly": False,
        "gasWebAppUrlServerEnvRequired": True,
        "logoUrl": "",
        "vercelEnv": "",
        "vercelUrl": "",
        "vercelProductionUrl": "",
        "gitCommitSha": "",
        "generatedAt": "build-time",
        "source": "tools/generate_vercel_env.py",
        "publicOnly": True,
        "deterministicPublicEnv": True,
    }
    cfg_json = json.dumps(cfg, ensure_ascii=False, indent=2).replace("\n", "\n  ")
    return f"""// GENERATED by tools/generate_vercel_env.py. Public, non-secret deterministic values only.
(function (root) {{
  'use strict';

  var cfg = {cfg_json};

  root.__VERCEL_MIGRATION_CONFIG__ = Object.freeze(cfg);
  root.APP_DEPLOY_RELEASE = Object.assign(
    {{}},
    root.APP_DEPLOY_RELEASE || {{}},
    {{
      stamp: cfg.releaseStamp,
      assetStamp: cfg.assetStamp,
      version: cfg.version,
      hostingTarget: cfg.hostingTarget,
      vercelStaticFrontendReady: true,
      vercelApiProxyEnabled: true,
      legacyTransportRemoved: true
    }}
  );
}})(window);
"""


def _expected_outputs() -> dict[Path, str]:
    outputs = {ENV_OUT: _public_config_js()}
    outputs.update(_generated_frontend_assets())
    for source in _runtime_sources():
        outputs[STATIC_RUNTIME_DIR / source.name] = _expected_mirror(source)
    return outputs


def _sha256(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def generate() -> dict:
    releaseSynced = _sync_release_metadata()
    methods = _router_methods()
    proxySynced = _sync_proxy_contract(methods)
    manifestSynced = _sync_manifest(methods)
    fallbackLogoSynced = _sync_fallback_logo()
    staticIndexSynced = _staticize_index_from_canonical()
    staticLoginContractSynced = _sync_static_login_contract()
    outputs = _expected_outputs()
    STATIC_RUNTIME_DIR.mkdir(parents=True, exist_ok=True)

    expected_names = {path.name for path in outputs if path.parent == STATIC_RUNTIME_DIR}
    removed = []
    for stale in sorted(STATIC_RUNTIME_DIR.glob("Scripts_*.html")):
        if stale.name not in expected_names:
            stale.unlink()
            removed.append(str(stale.relative_to(ROOT)))

    written = []
    unchanged = []
    hashes = {}
    for path, text in outputs.items():
        path.parent.mkdir(parents=True, exist_ok=True)
        current = path.read_text(encoding="utf-8") if path.exists() else None
        if current == text:
            unchanged.append(str(path.relative_to(ROOT)))
        else:
            path.write_text(text, encoding="utf-8")
            written.append(str(path.relative_to(ROOT)))
        hashes[str(path.relative_to(ROOT))] = _sha256(text)

    return {
        "ok": True,
        "mode": "generate",
        "singleSourceOwner": "gas-backend/Index.html + gas-backend/Scripts_*.html",
        "generatedRuntimeCount": len(_runtime_sources()),
        "generatedFrontendCount": len(GENERATED_FRONTEND_FILES),
        "releaseMetadataSynced": releaseSynced,
        "proxyContractSynced": proxySynced,
        "manifestContractSynced": manifestSynced,
        "fallbackLogoSynced": fallbackLogoSynced,
        "staticIndexSynced": staticIndexSynced,
        "staticLoginContractSynced": staticLoginContractSynced,
        "apiMethodCount": len(methods),
        "written": written,
        "unchanged": unchanged,
        "removedStale": removed,
        "hashes": hashes,
        "release": RELEASE,
        "serverGasEnvRequired": True,
        "vercelApiProxyEnabled": True,
        "deterministicPublicEnv": True,
    }


def check() -> dict:
    errors = _contract_drift_errors()
    hashes = {}
    outputs = _expected_outputs()
    for path, expected in outputs.items():
        rel = str(path.relative_to(ROOT))
        if not path.exists():
            errors.append(f"MISSING_GENERATED_ARTIFACT:{rel}")
            continue
        actual = path.read_text(encoding="utf-8")
        hashes[rel] = _sha256(actual)
        if actual != expected:
            errors.append(f"GENERATED_ARTIFACT_DRIFT:{rel}")

    expected_names = {path.name for path in outputs if path.parent == STATIC_RUNTIME_DIR}
    for stale in sorted(STATIC_RUNTIME_DIR.glob("Scripts_*.html")) if STATIC_RUNTIME_DIR.exists() else []:
        if stale.name not in expected_names:
            errors.append(f"ORPHAN_GENERATED_MIRROR:{stale.relative_to(ROOT)}")

    result = {
        "ok": not errors,
        "mode": "check",
        "singleSourceOwner": "gas-backend/Index.html + gas-backend/Scripts_*.html",
        "generatedRuntimeCount": len(_runtime_sources()),
        "generatedFrontendCount": len(GENERATED_FRONTEND_FILES),
        "errors": errors,
        "hashes": hashes,
        "release": RELEASE,
    }
    if errors:
        raise RuntimeError(json.dumps(result, ensure_ascii=False))
    return result


def clean_generated() -> dict:
    removed = []
    generated_paths = [ENV_OUT]
    generated_paths.extend(ROOT / "github-pages" / name for name in sorted(GENERATED_FRONTEND_FILES))
    if STATIC_RUNTIME_DIR.exists():
        generated_paths.extend(sorted(STATIC_RUNTIME_DIR.glob("Scripts_*.html")))
    for path in generated_paths:
        if path.exists() and path.is_file():
            path.unlink()
            removed.append(str(path.relative_to(ROOT)))
    try:
        if STATIC_RUNTIME_DIR.exists() and not any(STATIC_RUNTIME_DIR.iterdir()):
            STATIC_RUNTIME_DIR.rmdir()
    except OSError:
        pass
    return {
        "ok": True,
        "mode": "clean-generated",
        "singleSourceOwner": "gas-backend/Index.html + gas-backend/Scripts_*.html",
        "removed": removed,
        "release": RELEASE,
    }


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate deterministic Vercel artifacts from canonical GAS sources.")
    group = parser.add_mutually_exclusive_group()
    group.add_argument("--check", action="store_true", help="Verify generated artifacts without modifying them.")
    group.add_argument("--clean-generated", action="store_true", help="Remove build-generated Vercel artifacts from the source package.")
    args = parser.parse_args()

    try:
        if args.check:
            result = check()
        elif args.clean_generated:
            result = clean_generated()
        else:
            result = generate()
        print(json.dumps(result, ensure_ascii=False, indent=2))
    except Exception as exc:
        print(str(exc), file=sys.stderr)
        raise


if __name__ == "__main__":
    main()
