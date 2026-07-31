(function (root) {
  "use strict";

  var buildCfg = root.__VERCEL_MIGRATION_CONFIG__ || {};
  var existing = root.APP_CONFIG || {};
  var APP_RELEASE_STAMP = String(buildCfg.releaseStamp || "commission-v1.2-gas-hosted-production-2026-07-17-r148");
  var APP_ASSET_STAMP = String(buildCfg.assetStamp || "asset-manifest-commission-v1.2-gas-hosted-production-2026-07-17-r148");
  var APP_VERSION = String(buildCfg.version || "1.2.0-production-current");
  var FALLBACK_LOGO = "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22128%22%20height%3D%22128%22%20viewBox%3D%220%200%20128%20128%22%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20rx%3D%2224%22%20fill%3D%22%23f8fafc%22%2F%3E%3Ccircle%20cx%3D%2264%22%20cy%3D%2248%22%20r%3D%2226%22%20fill%3D%22%23d4af37%22%2F%3E%3Cpath%20d%3D%22M28%20100h72M40%2088h48M48%2074h32%22%20stroke%3D%22%23334155%22%20stroke-width%3D%227%22%20stroke-linecap%3D%22round%22%2F%3E%3Ctext%20x%3D%2264%22%20y%3D%2255%22%20text-anchor%3D%22middle%22%20font-family%3D%22Sarabun%2C%20Arial%22%20font-size%3D%2218%22%20fill%3D%22%23334155%22%3E%E0%B8%AA%E0%B8%A0%E0%B8%B2%3C%2Ftext%3E%3C%2Fsvg%3E";

  function text(value) {
    return value == null ? "" : String(value);
  }

  function cleanUrl(value) {
    return text(value).trim().replace(/\s+/g, "");
  }

  function safeLogo(value) {
    value = cleanUrl(value);
    return !value || /^data:image\//i.test(value) || /^https?:\/\//i.test(value);
  }

  var defaults = {
    appTitle: "ระบบบริหารจัดการเรื่องพิจารณา",
    version: APP_VERSION,
    releaseStamp: APP_RELEASE_STAMP,
    assetStamp: APP_ASSET_STAMP,
    hostingTarget: "vercel-api-proxy",
    transportMode: "vercel-api-proxy-only",
    vercelStaticFrontendReady: true,
    vercelApiProxyEnabled: true,
    loginViaVercelProxy: true,
    loginFormPost: false,
    staticGasDirectDisabled: true,
    legacyTransportRemoved: true,
    legacyJsonpTransportRemoved: true,
    legacyGasBridgeTransportRemoved: true,
    legacyLoginPostIframeRemoved: true,
    vercelApiProxyUrl: cleanUrl(buildCfg.vercelApiProxyUrl || "/api/gas") || "/api/gas",
    vercelLoginProxyUrl: cleanUrl(buildCfg.vercelLoginProxyUrl || "/api/login") || "/api/login",
    vercelPublicConfigProxyUrl: cleanUrl(buildCfg.vercelPublicConfigProxyUrl || "/api/public-config") || "/api/public-config",
    gasWebAppUrl: "",
    gasWebAppUrlServerEnvRequired: true,
    gasBackendUiDisabled: true,
    proxyRejectGoogleHostedFrontend: true,
    logoUrl: "",
    fallbackLogoUrl: FALLBACK_LOGO,
    localAssetBase: "./partials/",
    localAssetBaseCandidates: ["./partials/", "partials/", "../partials/"],
    vercelLoginProxyTimeoutMs: 59000,
    vercelReadProxyClientTimeoutMs: 59000,
    vercelWriteProxyClientTimeoutMs: 59000,
    vercelProxyServerTimeoutMs: 55000,
    vercelReadProxyServerTimeoutMs: 50000,
    vercelWriteProxyServerTimeoutMs: 55000,
    apiTimeoutMs: 59000,
    publicConfigTimeoutMs: 10000,
    clientReadResponseCacheEnabled: true,
    clientReadCacheTtlMs: 60000,
    clientReadCacheMaxTtlMs: 120000,
    clientReadStaleIfErrorMs: 600000,
    clientInFlightDedupe: true,
    clientApiCacheOwner: "vercel-proxy-read-cache",
    clientInFlightOwner: "github-pages/github-gas-transport.js::vercel-proxy-only",
    canonicalEditableRoot: "gas-backend",
    generatedMirrorRoot: "github-pages/partials",
    generatedMirrorPolicy: "edit-gas-backend-run-sync-do-not-edit-generated-mirrors",
    releaseManifest: {
      stamp: APP_RELEASE_STAMP,
      cacheBustVersion: APP_RELEASE_STAMP,
      gasDeploymentId: ""
    },
    assetManifest: {
      stamp: APP_ASSET_STAMP,
      bundles: {
        appCritical: { files: [] },
        appCore: { files: ["Scripts_Core_Runtime"] },
        pageDashboard: { files: ["Scripts_Page_Dashboard"] },
        pageMeeting: { files: ["Scripts_Page_Meeting"] },
        pageCommitteeMeeting: { files: ["Scripts_Page_Meeting"] },
        pageTrackReport: { files: ["Scripts_Page_ReportTrack"] },
        pagePetitioner: { files: ["Scripts_Page_Petitioner"] },
        pagePeople: { files: ["Scripts_Page_People"] },
        pageBudget: { files: ["Scripts_Page_Budget"] },
        pageAdmin: { files: ["Scripts_Page_Admin"], minRole: "admin" },
        pageAiPrint: { files: ["Scripts_Core_Runtime"] }
      },
      chunks: {
        dashboard: ["Scripts_Page_Dashboard"],
        search: ["Scripts_Page_ReportTrack"],
        petitioner: ["Scripts_Page_Petitioner"],
        meeting: ["Scripts_Page_Meeting"],
        "committee-meeting": ["Scripts_Page_Meeting"],
        track: ["Scripts_Page_ReportTrack"],
        report: ["Scripts_Page_ReportTrack"],
        people: ["Scripts_Page_People"],
        personnel: ["Scripts_Page_People"],
        budget: ["Scripts_Page_Budget"],
        admin: ["Scripts_Page_Admin"],
        ai: ["Scripts_Core_Runtime"],
        print: ["Scripts_Core_Runtime"]
      },
      templates: {},
      externalGroups: ["bootstrap", "xlsx"],
      externalAssets: {
        bootstrap: {
          script: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js",
          onDemand: true
        },
        xlsx: {
          script: "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js",
          onDemand: true
        }
      }
    }
  };

  var merged = Object.assign({}, defaults, buildCfg || {}, existing || {});

  // Vercel is the only browser transport owner. Never expose or consume the GAS /exec URL in the browser.
  merged.hostingTarget = "vercel-api-proxy";
  merged.transportMode = "vercel-api-proxy-only";
  merged.vercelStaticFrontendReady = true;
  merged.vercelApiProxyEnabled = true;
  merged.loginViaVercelProxy = true;
  merged.loginFormPost = false;
  merged.staticGasDirectDisabled = true;
  merged.legacyTransportRemoved = true;
  merged.legacyJsonpTransportRemoved = true;
  merged.legacyGasBridgeTransportRemoved = true;
  merged.legacyLoginPostIframeRemoved = true;
  merged.vercelApiProxyUrl = cleanUrl(merged.vercelApiProxyUrl || "/api/gas") || "/api/gas";
  merged.vercelLoginProxyUrl = cleanUrl(merged.vercelLoginProxyUrl || "/api/login") || "/api/login";
  merged.vercelPublicConfigProxyUrl = cleanUrl(merged.vercelPublicConfigProxyUrl || "/api/public-config") || "/api/public-config";
  merged.gasWebAppUrl = "";
  merged.releaseStamp = APP_RELEASE_STAMP;
  merged.assetStamp = APP_ASSET_STAMP;
  merged.fallbackLogoUrl = FALLBACK_LOGO;

  try {
    var storedLogo = cleanUrl(root.localStorage && root.localStorage.getItem("APP_LOGO_URL") || "");
    if (storedLogo && safeLogo(storedLogo)) merged.logoUrl = storedLogo;
  } catch (_) {}
  if (!safeLogo(merged.logoUrl)) merged.logoUrl = "";
  if (!merged.logoUrl) merged.logoUrl = FALLBACK_LOGO;

  root.APP_CONFIG = merged;
  root.GAS_WEB_APP_URL = "";
  try {
    root.localStorage && root.localStorage.removeItem("GITHUB_GAS_WEB_APP_URL");
  } catch (_) {}

  root.APP_DEPLOY_RELEASE = Object.assign({}, root.APP_DEPLOY_RELEASE || {}, {
    stamp: APP_RELEASE_STAMP,
    assetStamp: APP_ASSET_STAMP,
    version: APP_VERSION,
    source: "github-pages/app-config.js",
    transportMode: "vercel-api-proxy-only",
    hostingTarget: "vercel-api-proxy",
    vercelStaticFrontendReady: true,
    vercelApiProxyEnabled: true,
    legacyTransportRemoved: true
  });

  root.APP_FALLBACK_LOGO_URL = root.APP_FALLBACK_LOGO_URL || FALLBACK_LOGO;
  root.APP_LOGO = root.APP_LOGO || {};
  root.APP_LOGO.active = merged.logoUrl;
  root.APP_LOGO.svg = root.APP_LOGO.svg || merged.logoUrl;
  root.APP_LOGO.png96 = root.APP_LOGO.png96 || merged.logoUrl;
  root.APP_LOGO.png192 = root.APP_LOGO.png192 || merged.logoUrl;
  root.APP_LOGO.png512 = root.APP_LOGO.png512 || merged.logoUrl;
  root.DEFAULT_LOGO = root.DEFAULT_LOGO || merged.logoUrl;
  root.LOGO_URL = root.LOGO_URL || merged.logoUrl;
  root.currentLogoUrl = root.currentLogoUrl || merged.logoUrl;
  root.__SAFE_LOGO_URL__ = root.__SAFE_LOGO_URL__ || merged.logoUrl;
})(typeof window !== "undefined" ? window : globalThis);
