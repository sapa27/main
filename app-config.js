// release: commission-v1.1-phaseK-write-schema-unification-2026-07-02-r1
/* GitHub Pages configuration for GAS backend. */
(function(root) {
'use strict';
var existing = root.APP_CONFIG || {};
var APP_RELEASE_STAMP = 'commission-v1.1-phaseK-write-schema-unification-2026-07-02-r1';
var APP_ASSET_STAMP = 'asset-manifest-commission-v1.1-phaseK-write-schema-unification-2026-07-02-r1';
var FALLBACK_LOGO = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22128%22%20height%3D%22128%22%20viewBox%3D%220%200%20128%20128%22%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20rx%3D%2224%22%20fill%3D%22%23f8fafc%22/%3E%3Ccircle%20cx%3D%2264%22%20cy%3D%2248%22%20r%3D%2226%22%20fill%3D%22%23d4af37%22/%3E%3Cpath%20d%3D%22M28%20100h72M40%2088h48M48%2074h32%22%20stroke%3D%22%23334155%22%20stroke-width%3D%227%22%20stroke-linecap%3D%22round%22/%3E%3Ctext%20x%3D%2264%22%20y%3D%2255%22%20text-anchor%3D%22middle%22%20font-family%3D%22Sarabun%2C%20Arial%22%20font-size%3D%2218%22%20fill%3D%22%23334155%22%3E%E0%B8%AA%E0%B8%A0%E0%B8%B2%3C/text%3E%3C/svg%3E';
function text(v) { return v == null ? '' : String(v); }
function cleanUrl(url) { return text(url).trim().replace(/\s+/g, ''); }
function isSafeLogoUrl(url) {
url = cleanUrl(url);
return !url || /^data:image\//i.test(url) || /^https?:\/\//i.test(url);
}
var defaults = {
appTitle: 'ระบบบริหารจัดการเรื่องพิจารณา',
gasWebAppUrl: 'https://script.google.com/macros/s/AKfycbxYepAf1Rz6zjG2NGjdKOtmSHw9FwsDg_ySY4VmftRYYhdT2L8VgO4g4kTo4x4ctZbDwg/exec',
logoUrl: FALLBACK_LOGO,
fallbackLogoUrl: FALLBACK_LOGO,
localAssetBase: './partials/',
localAssetBaseCandidates: ['./partials/', 'partials/', '../partials/'],
transportMode: 'phaseK-write-schema-unification-auth-bridge-ready-login-post-only',
phase1DataLoadingPerformance: true,
phase2SingleSourceRefactor: true,
phase2CanonicalPartialRoot: 'gas-backend',
apiRouteAllowlistOwner: 'Code_20_Router._apiRouteRegistry_',
apiDtoContractOwner: 'AppBackendCore.API_DTO_CONTRACT_BY_METHOD',
staticApiContractAllowlistDisabled: true,
phaseICanonicalEditableRoot: 'gas-backend',
phaseIGeneratedMirrorRoot: 'github-pages/partials',
phaseISyncTool: 'tools/sync_frontend_partials.py',
phaseIContractGate: 'tools/phaseK_write_schema_gate.py',
phaseJRuntimeSlimming: true,
phaseKWriteSchemaUnification: true,
phaseKWriteSchemaGate: 'tools/phaseK_write_schema_gate.py',
phaseJRuntimeAssets: ['app-index-foundation-pre-vue.js','app-index-foundation-after-vue.js','app-index-foundation-after-swal.js','critical-login-runtime.js','app-index-bootstrap.js'],
phaseIContractGateEnabled: true,
phase2GeneratedMirrorPolicy: 'edit-gas-backend-run-sync-do-not-edit-generated-mirrors',
dashboardFirstPaintEnabled: true,
dashboardLazyHydrationEnabled: true,
dashboardInitialIncludeBudget: false,
dashboardInitialIncludeCases: false,
dashboardInitialIncludeMeetingRows: false,
dashboardLazyIncludeBudget: false,
dashboardLazyIncludeCases: true,
dashboardLazyIncludeMeetingRows: false,
dashboardLazyCaseLimit: 30,
dashboardLazyHydrationDelayMs: 250,
dashboardBudgetHydrationEnabled: true,
dashboardBudgetHydrationDelayMs: 350,
dashboardBudgetHydrationCacheTtlSec: 60,
dashboardSessionCacheTtlSec: 300,
dashboardFirstPaintTargetMs: 1800,
dashboardLazyHydrationTargetMs: 6500,
apiPerformanceTimingEnabled: true,
inlinePartialsEnabled: false,
bridgeReadyTimeoutMs: 10000,
bridgeLoadGraceMs: 0,
requireBridgeReadyMessage: true,
allowAssumedBridgeReady: false,
phaseGSecurityHardening: true,
phaseGFastLoginJsonpDisabled: true,
forceBridgeClientOnly: false,
apiTimeoutMs: 45000,
bridgeNoMessageTimeoutMs: 45000,
publicConfigTimeoutMs: 4000,
fastLoginJsonp: false,
loginFormPost: true,
loginPostTimeoutMs: 20000,
loginBridgeFallback: false,
fastLoginTimeoutMs: 0,
readJsonpApi: true,
readJsonpFallbackToBridge: false,
writeFormPost: false,
clientApiCacheEnabled: true,
clientInFlightDedupe: true,
jsonpApiTimeoutMs: 25000,
jsonpReadCircuitBreaker: false,
jsonpReadCircuitBreakMs: 60000,
phase0ProductionStabilization: true,
releaseStamp: APP_RELEASE_STAMP,
requireGasWebAppUrl: true,
forceAuthenticatedReadBridge: true,
phaseCTransportPolicy: 'public-jsonp-authenticated-bridge-write-bridge',
phaseGSecurityPolicy: 'login-post-only-no-fast-login-jsonp-require-explicit-bridge-ready',
phaseIContractFinalCleanupPolicy: 'route-registry-only-api-allowlist-dto-contract-separated',
writeSchemaPolicy: 'single-write-schema-by-method-backend-client-gate',
publicJsonpReadMethods: ['apiGetRouteContract','apiGetPhase0ContractGate','apiGetPhase1Contract','apiGetPhase2Contract'],
clientApiCacheDefaultTtlSec: 30,
clientApiCacheTtlSecMap: {
apiGetDashboardBundle: 300,
apiSearchCasesLite: 300,
apiGetTracking: 300,
apiBudgetGetSummary: 60,
apiGetMasterDataBundle: 900,
apiGetPeoplePageBundle: 360,
apiGetRouteContract: 300,
apiGetClientDataContract: 300,
apiSessionCheck: 20,
apiSessionResume: 15
},
strictBridgeOriginCheck: true,
allowedBridgeOrigins: ['https://script.google.com'],
bridgeTargetOrigin: '',
phase5ReleaseManifest: {stamp:APP_RELEASE_STAMP, githubCommitHash:'', gasDeploymentId:'', cacheBustVersion:APP_RELEASE_STAMP},
assetManifest: {"stamp":APP_ASSET_STAMP,"bundles":{"appCritical":{"files":["Scripts_Critical_Login_Runtime"]},"appCore":{"files":["Scripts_Core_Runtime"]},"pageDashboard":{"files":["Scripts_Page_Dashboard"]},"pageMeeting":{"files":["Scripts_Page_Meeting"]},"pageCommitteeMeeting":{"files":["Scripts_Page_Meeting"]},"pageTrackReport":{"files":["Scripts_Page_ReportTrack"]},"pagePetitioner":{"files":["Scripts_Page_Petitioner"]},"pagePeople":{"files":["Scripts_Page_People"]},"pageBudget":{"files":["Scripts_Page_Budget"]},"pageAdmin":{"files":["Scripts_Page_Admin"],"minRole":"admin"},"pageAiPrint":{"files":["Scripts_Core_Runtime"]}},"upfrontScripts":["Scripts_Critical_Login_Runtime"],"chunks":{"dashboard":["Scripts_Page_Dashboard"],"search":["Scripts_Page_ReportTrack"],"petitioner":["Scripts_Page_Petitioner"],"meeting":["Scripts_Page_Meeting"],"committee-meeting":["Scripts_Page_Meeting"],"track":["Scripts_Page_ReportTrack"],"report":["Scripts_Page_ReportTrack"],"people":["Scripts_Page_People"],"personnel":["Scripts_Page_People"],"budget":["Scripts_Page_Budget"],"admin":["Scripts_Page_Admin"],"ai":["Scripts_Core_Runtime"],"print":["Scripts_Core_Runtime"]},"templates":{},"externalGroups":["bootstrap","xlsx"],"externalAssets":{"bootstrap":{"script":"https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js","onDemand":true},"xlsx":{"script":"https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js","onDemand":true}}}
};
root.APP_CONFIG = Object.assign(defaults, existing || {});
// Phase G security hardening is non-overridable from stale inline config/local overrides.
root.APP_CONFIG.fastLoginJsonp = false;
root.APP_CONFIG.phaseGFastLoginJsonpDisabled = true;
root.APP_CONFIG.requireBridgeReadyMessage = true;
root.APP_CONFIG.allowAssumedBridgeReady = false;
root.APP_CONFIG.bridgeLoadGraceMs = 0;
root.APP_CONFIG.transportMode = 'phaseK-write-schema-unification-auth-bridge-ready-login-post-only';
root.APP_CONFIG.phaseIContractGate = 'tools/phaseK_write_schema_gate.py';
root.APP_CONFIG.phaseJRuntimeSlimming = true;
root.APP_CONFIG.apiRouteAllowlistOwner = 'Code_20_Router._apiRouteRegistry_';
root.APP_CONFIG.apiDtoContractOwner = 'AppBackendCore.API_DTO_CONTRACT_BY_METHOD';
root.APP_CONFIG.staticApiContractAllowlistDisabled = true;
// Phase B release/deploy consistency: enforce one visible stamp across GitHub static files and GAS bridge diagnostics.
root.APP_CONFIG.releaseStamp = APP_RELEASE_STAMP;
root.APP_CONFIG.assetStamp = APP_ASSET_STAMP;
root.APP_CONFIG.phase5ReleaseManifest = Object.assign({}, root.APP_CONFIG.phase5ReleaseManifest || {}, { stamp: APP_RELEASE_STAMP, cacheBustVersion: APP_RELEASE_STAMP });
root.APP_CONFIG.assetManifest = Object.assign({}, root.APP_CONFIG.assetManifest || {}, { stamp: APP_ASSET_STAMP });
root.APP_DEPLOY_RELEASE = Object.assign({}, root.APP_DEPLOY_RELEASE || {}, { stamp: APP_RELEASE_STAMP, assetStamp: APP_ASSET_STAMP, source: 'github-pages/app-config.js', transportMode: root.APP_CONFIG.transportMode || '' });
try {
var params = new URLSearchParams(root.location && root.location.search || '');
var gasUrl = params.get('gas') || params.get('gasWebAppUrl') || '';
var logoUrl = params.get('logo') || params.get('logoUrl') || '';
var bridge = params.get('bridge') || '';
if (gasUrl) {
root.localStorage && root.localStorage.setItem('GAS_WEB_APP_URL', gasUrl.trim());
root.APP_CONFIG.gasWebAppUrl = gasUrl.trim();
}
if (logoUrl && isSafeLogoUrl(logoUrl)) {
root.localStorage && root.localStorage.setItem('APP_LOGO_URL', logoUrl.trim());
root.APP_CONFIG.logoUrl = logoUrl.trim();
}
if (!root.APP_CONFIG.gasWebAppUrl && root.localStorage) {
root.APP_CONFIG.gasWebAppUrl = cleanUrl(root.localStorage.getItem('GAS_WEB_APP_URL') || '');
}
if (root.localStorage) {
var storedLogo = cleanUrl(root.localStorage.getItem('APP_LOGO_URL') || '');
var badLogo = cleanUrl(root.localStorage.getItem('APP_BAD_LOGO_URL') || '');
if (storedLogo && storedLogo === badLogo) storedLogo = '';
if (storedLogo && isSafeLogoUrl(storedLogo)) root.APP_CONFIG.logoUrl = storedLogo;
if (storedLogo && !isSafeLogoUrl(storedLogo)) root.localStorage.removeItem('APP_LOGO_URL');
}
if (!isSafeLogoUrl(root.APP_CONFIG.logoUrl)) root.APP_CONFIG.logoUrl = FALLBACK_LOGO;
if (!root.APP_CONFIG.logoUrl) root.APP_CONFIG.logoUrl = FALLBACK_LOGO;
if (bridge) root.APP_CONFIG.transportMode = bridge;
root.APP_DEPLOY_RELEASE = Object.assign({}, root.APP_DEPLOY_RELEASE || {}, { stamp: APP_RELEASE_STAMP, assetStamp: APP_ASSET_STAMP, source: 'github-pages/app-config.js', transportMode: root.APP_CONFIG.transportMode || '' });
} catch (_) {}
root.GAS_WEB_APP_URL = root.GAS_WEB_APP_URL || root.APP_CONFIG.gasWebAppUrl || '';
root.APP_FALLBACK_LOGO_URL = root.APP_FALLBACK_LOGO_URL || FALLBACK_LOGO;
root.APP_LOGO = root.APP_LOGO || {};
root.APP_LOGO.active = root.APP_LOGO.active || root.APP_CONFIG.logoUrl || FALLBACK_LOGO;
root.APP_LOGO.svg = root.APP_LOGO.svg || root.APP_LOGO.active;
root.APP_LOGO.png96 = root.APP_LOGO.png96 || root.APP_LOGO.active;
root.APP_LOGO.png192 = root.APP_LOGO.png192 || root.APP_LOGO.active;
root.APP_LOGO.png512 = root.APP_LOGO.png512 || root.APP_LOGO.active;
root.DEFAULT_LOGO = root.DEFAULT_LOGO || root.APP_LOGO.active;
root.LOGO_URL = root.LOGO_URL || root.APP_LOGO.active;
root.currentLogoUrl = root.currentLogoUrl || root.APP_LOGO.active;
root.__SAFE_LOGO_URL__ = root.__SAFE_LOGO_URL__ || root.APP_LOGO.active;
})(typeof window !== 'undefined' ? window : globalThis);
