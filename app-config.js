(function (root) {
  "use strict";

  var RELEASE_STAMP = "commission-v1.2-github-pages-gas-direct-2026-07-16-r134";
  var ASSET_STAMP = "asset-manifest-commission-v1.2-github-pages-gas-direct-2026-07-16-r134";
  var APP_VERSION = "1.2.0-production-current";
  var DEFAULT_GAS_WEB_APP_URL = [
    "https://script.google.com/macros/s/",
    "AKfycbyQZcetvUPxA8OI_vWGiBV2fRT3G3Gkqpho443kX79GQMFJ3eSbL2RDSYYg7S10J4c",
    "/exec"
  ].join("");
  var DEFAULT_LOGO_URL = [
    "https://upload.wikimedia.org/wikipedia/commons/",
    "9/9a/Seal_of_the_Parliament_of_Thailand.svg"
  ].join("");

  function asText(value) {
    return value == null ? "" : String(value);
  }

  function cleanUrl(value) {
    return asText(value).trim().replace(/\s+/g, "");
  }

  function safeStorageGet(key) {
    try {
      return root.localStorage ? root.localStorage.getItem(key) || "" : "";
    } catch (_error) {
      return "";
    }
  }

  function safeStorageSet(key, value) {
    try {
      if (root.localStorage) {
        root.localStorage.setItem(key, value);
      }
    } catch (_error) {
      // Storage can be blocked in private browsing or embedded contexts.
    }
  }

  function safeStorageRemove(key) {
    try {
      if (root.localStorage) {
        root.localStorage.removeItem(key);
      }
    } catch (_error) {
      // Ignore unavailable browser storage.
    }
  }

  function isGasWebAppUrl(value) {
    return /^https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec(?:[?#].*)?$/i.test(cleanUrl(value));
  }

  function isSafeLogoUrl(value) {
    var url = cleanUrl(value);
    return !url || /^data:image\//i.test(url) || /^https?:\/\//i.test(url);
  }

  function makeFallbackLogo() {
    var svg = [
      '<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">',
      '<rect width="128" height="128" rx="24" fill="#f8fafc"/>',
      '<circle cx="64" cy="48" r="26" fill="#d4af37"/>',
      '<path d="M28 100h72M40 88h48M48 74h32" stroke="#334155" stroke-width="7" stroke-linecap="round"/>',
      '<text x="64" y="55" text-anchor="middle" font-family="Arial" font-size="18" fill="#334155">TH</text>',
      '</svg>'
    ].join("");
    return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
  }

  function readQueryParams() {
    try {
      return new URLSearchParams(root.location && root.location.search ? root.location.search : "");
    } catch (_error) {
      return null;
    }
  }

  var fallbackLogo = makeFallbackLogo();
  var injected = root.__GITHUB_PAGES_GAS_CONFIG__ || root.__GITHUB_GAS_CONFIG__ || {};
  var existing = root.APP_CONFIG && typeof root.APP_CONFIG === "object" ? root.APP_CONFIG : {};
  var runtimeGasOverrideAllowed = injected.allowRuntimeGasUrlOverride === true;
  var storedGasUrl = runtimeGasOverrideAllowed ? cleanUrl(safeStorageGet("GITHUB_GAS_WEB_APP_URL")) : "";
  var injectedGasUrl = cleanUrl(
    injected.gasWebAppUrl ||
    injected.GAS_WEB_APP_URL ||
    root.GITHUB_GAS_WEB_APP_URL ||
    root.GAS_WEB_APP_URL ||
    storedGasUrl ||
    DEFAULT_GAS_WEB_APP_URL
  );
  var injectedLogoUrl = cleanUrl(
    injected.logoUrl ||
    injected.APP_LOGO_URL ||
    DEFAULT_LOGO_URL
  );

  if (!isGasWebAppUrl(injectedGasUrl)) {
    injectedGasUrl = DEFAULT_GAS_WEB_APP_URL;
  }
  if (!isSafeLogoUrl(injectedLogoUrl)) {
    injectedLogoUrl = DEFAULT_LOGO_URL;
  }

  var defaults = {
    appTitle: "ระบบบริหารจัดการเรื่องพิจารณา",
    gasWebAppUrl: injectedGasUrl,
    trustedGasWebAppUrl: injectedGasUrl,
    allowRuntimeGasUrlOverride: runtimeGasOverrideAllowed,
    logoUrl: injectedLogoUrl || fallbackLogo,
    fallbackLogoUrl: fallbackLogo,
    localAssetBase: "./partials/",
    localAssetBaseCandidates: ["./partials/", "partials/", "../partials/"],
    transportMode: "github-pages-phase-c-authenticated-post-only-bridge-optional-r134",
    deploymentBindingVerified: true,
    deploymentBindingOwner: "app-config.js::DEFAULT_GAS_WEB_APP_URL-r134",
    hostingTarget: "github-pages-gas-direct",
    vercelStaticFrontendReady: false,
    vercelApiProxyEnabled: false,
    vercelEnvBuildTool: "",
    releaseGate: "",
    vercelApiProxyUrl: "",
    vercelLoginProxyUrl: "",
    vercelPublicConfigProxyUrl: "",
    vercelApiProxyTimeoutMs: 110000,
    vercelReadProxyClientTimeoutMs: 80000,
    vercelWriteProxyClientTimeoutMs: 110000,
    vercelProxyServerTimeoutMs: 50000,
    vercelReadProxyServerTimeoutMs: 45000,
    vercelWriteProxyServerTimeoutMs: 50000,
    vercelLoginProxyTimeoutMs: 30000,
    vercelPublicConfigProxyTimeoutMs: 8000,
    proxyRejectGoogleHostedFrontend: false,
    gasBackendUiDisabled: false,
    gasBackendFrontendEntryProperty: "",
    dataLoadingPerformance: true,
    canonicalPartialRoot: "gas-backend",
    canonicalEditableRoot: "gas-backend",
    generatedMirrorRoot: "partials",
    generatedMirrorPolicy: "edit-gas-backend-run-sync-do-not-edit-generated-mirrors",
    syncTool: "",
    contractGate: "",
    contractGateEnabled: true,
    runtimeSlimmingEnabled: false,
    writeSchemaUnification: false,
    writeSchemaGate: "",
    apiRouteAllowlistOwner: "Code_20_Router._routerCanonicalHandlerMap_",
    apiDtoContractOwner: "AppBackendCore.API_DTO_CONTRACT_BY_METHOD",
    staticApiContractAllowlistDisabled: true,
    dashboardLazyHydrationEnabled: true,
    dashboardIdleHydrationEnabled: true,
    dashboardInitialIncludeBudget: false,
    dashboardInitialIncludeCases: false,
    dashboardInitialIncludeMeetingRows: false,
    dashboardLazyIncludeBudget: false,
    dashboardLazyIncludeCases: false,
    dashboardLazyIncludeMeetingRows: false,
    dashboardLazyCaseLimit: 30,
    dashboardLazyHydrationDelayMs: 900,
    dashboardBudgetHydrationEnabled: true,
    dashboardBudgetHydrationDelayMs: 2200,
    dashboardApiTimeoutMs: 18000,
    dashboardFastFirstPaintSkipHeavySheets: true,
    inlinePartialsEnabled: false,
    pageScriptLoadTimeoutMs: 20000,
    pageTemplateLoadTimeoutMs: 10000,
    pageActivationTimeoutMs: 18000,
    partialScriptFailFastEnabled: true,
    bridgeLoadGraceMs: 8000,
    bridgeReadyTimeoutMs: 5200,
    bridgeVerifyTimeoutMs: 2500,
    bridgeRequestTimeoutMs: 12000,
    bridgeRetryCount: 0,
    transportRecoveryProbeDelayMs: 900,
    transportRecoveredAutoDismiss: true,
    suppressStaleTransportErrors: true,
    bridgeNonceRequired: true,
    bridgePingVerificationRequired: true,
    requireBridgeReadyMessage: true,
    allowAssumedBridgeReady: false,
    securityHardening: true,
    fastLoginJsonp: false,
    fastLoginJsonpDisabled: true,
    apiTimeoutMs: 22000,
    publicConfigTimeoutMs: 4000,
    loginFormPost: false,
    loginBridgeFirst: false,
    loginBridgeTimeoutMs: 12000,
    loginPostTimeoutMs: 22000,
    loginPostFallbackEnabled: true,
    loginBridgeFallbackEnabled: false,
    loginBridgeFallbackAfterPostTimeout: false,
    loginTimeoutFallbackChainGuard: true,
    loginHedgedBridgeEnabled: false,
    loginBridgeHedgeDelayMs: 2500,
    loginHardDeadlineMs: 24000,
    loginDirectRouterBypassEnabled: true,
    loginCallbackCrossReleaseCompatible: true,
    dataApiPostBridgeEnabled: true,
    authenticatedDataPostFirst: true,
    dataApiIframeBridgeEnabled: false,
    dataApiJsonpReadEnabled: false,
    jsonpReadTimeoutMs: 15000,
    loginViaVercelProxy: false,
    readJsonpApi: false,
    authenticatedJsonpReadFirst: false,
    authenticatedReadBridgeFirst: false,
    authenticatedReadBridgeOnly: false,
    authenticatedPostMessageBridgeOnly: false,
    innerBridgeSourceWindowRequired: false,
    postMessageCallbackSourceWindowRequired: false,
    perRequestApiPostDisabled: false,
    persistentGasIframeBridgeDisabled: true,
    publicJsonpReadEnabled: true,
    publicJsonpReadMethods: [
      "apiGetRouteContract",
      "apiGetPhase0ContractGate",
      "apiGetPhase1Contract",
      "apiGetPhase2Contract"
    ],
    clientApiCacheEnabled: true,
    clientReadResponseCacheEnabled: true,
    clientReadCacheTtlMs: 30000,
    clientReadCacheMaxTtlMs: 120000,
    clientReadCacheMaxEntries: 120,
    clientReadStaleIfErrorMs: 120000,
    clientReadRetryCount: 0,
    clientReadRetryDelayMs: 150,
    clientInFlightDedupe: true,
    clientApiCacheOwner: "github-pages/github-gas-transport.js::session-scoped-read-cache-r134",
    clientInFlightOwner: "github-pages/github-gas-transport.js::session-scoped-in-flight-r134",
    safeHtmlRendererOwner: "CriticalLogin.canonical-safe-html-r134",
    safeHtmlRendererNonRecursive: true,
    dashboardRecoveryCacheScope: "session-token-hash-r134",
    dashboardRecoveryCacheLegacyPurge: true,
    cachePolicyOwner: "Code_20_Router._routerHotPathContractSpec_",
    legacyTransportRemoved: false,
    legacyJsonpTransportRemoved: false,
    legacyGasBridgeTransportRemoved: false,
    legacyLoginPostIframeRemoved: false,
    frontendTransportSinglePathPhase2: false,
    authenticatedPostFallbackEnabled: true,
    authenticatedBridgeFallbackAfterPostTimeout: false,
    authenticatedTimeoutFallbackChainGuard: true,
    authenticatedUseReadyBridgeFirst: false,
    warmVerifiedBridgeAfterLogin: false,
    dashboardColdFirstPaintDeferredEnabled: true,
    dashboardHydrationSequential: true,
    dashboardVisibleDataRetryOnDeferred: false,
    sessionTouchThrottleMs: 180000,
    mutationRefreshDebounceMs: 900,
    buttonRequestTimeoutMs: 12000,
    authenticatedTransportPreferenceTtlMs: 900000,
    dataApiPostTimeoutMs: 18000,
    authenticatedTransportFallbackOwner: "github-pages/github-gas-transport.js::post-only-bridge-optional-r134",
    staticGasDirectDisabled: false,
    releaseStamp: RELEASE_STAMP,
    assetStamp: ASSET_STAMP,
    releaseManifest: {
      stamp: RELEASE_STAMP,
      githubCommitHash: "",
      gasDeploymentId: "",
      cacheBustVersion: RELEASE_STAMP
    },
    assetManifest: {
      stamp: ASSET_STAMP,
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
      upfrontScripts: [],
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

  root.APP_CONFIG = Object.assign({}, defaults, existing);
  root.APP_CONFIG.allowRuntimeGasUrlOverride = runtimeGasOverrideAllowed;
  root.APP_CONFIG.trustedGasWebAppUrl = injectedGasUrl;
  if (runtimeGasOverrideAllowed !== true) {
    root.APP_CONFIG.gasWebAppUrl = injectedGasUrl;
  }

  var params = readQueryParams();
  if (params) {
    var gasParam = cleanUrl(
      params.get("gas") ||
      params.get("gasWebAppUrl") ||
      params.get("GAS_WEB_APP_URL") ||
      ""
    );
    var logoParam = cleanUrl(params.get("logo") || params.get("logoUrl") || "");
    var transportParam = cleanUrl(params.get("transport") || "");

    if (root.APP_CONFIG.allowRuntimeGasUrlOverride === true && isGasWebAppUrl(gasParam)) {
      root.APP_CONFIG.gasWebAppUrl = gasParam;
      root.APP_CONFIG.trustedGasWebAppUrl = gasParam;
      safeStorageSet("GITHUB_GAS_WEB_APP_URL", gasParam);
    }
    if (logoParam && isSafeLogoUrl(logoParam)) {
      root.APP_CONFIG.logoUrl = logoParam;
      safeStorageSet("APP_LOGO_URL", logoParam);
    }
    if (transportParam && transportParam === defaults.transportMode) {
      root.APP_CONFIG.transportMode = defaults.transportMode;
    }
  }

  if (root.APP_CONFIG.allowRuntimeGasUrlOverride !== true) {
    safeStorageRemove("GITHUB_GAS_WEB_APP_URL");
  }

  var storedLogo = cleanUrl(safeStorageGet("APP_LOGO_URL"));
  var rejectedLogo = cleanUrl(safeStorageGet("APP_BAD_LOGO_URL"));
  if (storedLogo && storedLogo === rejectedLogo) {
    storedLogo = "";
  }
  if (storedLogo && isSafeLogoUrl(storedLogo)) {
    root.APP_CONFIG.logoUrl = storedLogo;
  } else if (storedLogo) {
    safeStorageRemove("APP_LOGO_URL");
  }

  if (!isGasWebAppUrl(root.APP_CONFIG.gasWebAppUrl)) {
    root.APP_CONFIG.gasWebAppUrl = DEFAULT_GAS_WEB_APP_URL;
  }
  if (!isSafeLogoUrl(root.APP_CONFIG.logoUrl) || !root.APP_CONFIG.logoUrl) {
    root.APP_CONFIG.logoUrl = DEFAULT_LOGO_URL || fallbackLogo;
  }

  root.APP_CONFIG.releaseStamp = RELEASE_STAMP;
  root.APP_CONFIG.assetStamp = ASSET_STAMP;
  root.APP_CONFIG.releaseManifest = Object.assign({}, root.APP_CONFIG.releaseManifest || {}, {
    stamp: RELEASE_STAMP,
    cacheBustVersion: RELEASE_STAMP
  });
  root.APP_CONFIG.assetManifest = Object.assign({}, root.APP_CONFIG.assetManifest || {}, {
    stamp: ASSET_STAMP
  });

  root.APP_DEPLOY_RELEASE = Object.assign({}, root.APP_DEPLOY_RELEASE || {}, {
    stamp: RELEASE_STAMP,
    assetStamp: ASSET_STAMP,
    version: APP_VERSION,
    source: "github-pages/app-config.js",
    transportMode: root.APP_CONFIG.transportMode,
    hostingTarget: root.APP_CONFIG.hostingTarget,
    vercelStaticFrontendReady: false,
    vercelApiProxyEnabled: false,
    legacyTransportRemoved: false
  });

  root.GAS_WEB_APP_URL = root.APP_CONFIG.gasWebAppUrl;
  root.APP_FALLBACK_LOGO_URL = root.APP_FALLBACK_LOGO_URL || fallbackLogo;
  root.APP_LOGO = root.APP_LOGO || {};
  root.APP_LOGO.active = root.APP_LOGO.active || root.APP_CONFIG.logoUrl || fallbackLogo;
  root.APP_LOGO.svg = root.APP_LOGO.svg || root.APP_LOGO.active;
  root.APP_LOGO.png96 = root.APP_LOGO.png96 || root.APP_LOGO.active;
  root.APP_LOGO.png192 = root.APP_LOGO.png192 || root.APP_LOGO.active;
  root.APP_LOGO.png512 = root.APP_LOGO.png512 || root.APP_LOGO.active;
  root.DEFAULT_LOGO = root.DEFAULT_LOGO || root.APP_LOGO.active;
  root.LOGO_URL = root.LOGO_URL || root.APP_LOGO.active;
  root.currentLogoUrl = root.currentLogoUrl || root.APP_LOGO.active;
  root.__SAFE_LOGO_URL__ = root.__SAFE_LOGO_URL__ || root.APP_LOGO.active;
})(typeof window !== "undefined" ? window : globalThis);
