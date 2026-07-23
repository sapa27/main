(function(root) {
    "use strict"; 
    var existing = root.APP_CONFIG || {
    }
    ,
    APP_RELEASE_STAMP = "commission-v1.2-github-pages-gas-direct-2026-07-14-r104",
    APP_ASSET_STAMP = "asset-manifest-commission-v1.2-github-pages-gas-direct-2026-07-14-r104",
    APP_VERSION = "1.2.0-production-current",
    FALLBACK_LOGO = "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22128%22%20height%3D%22128%22%20viewBox%3D%220%200%20128%20128%22%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20rx%3D%2224%22%20fill%3D%22%23f8fafc%22%2F%3E%3Ccircle%20cx%3D%2264%22%20cy%3D%2248%22%20r%3D%2226%22%20fill%3D%22%23d4af37%22%2F%3E%3Cpath%20d%3D%22M28%20100h72M40%2088h48M48%2074h32%22%20stroke%3D%22%23334155%22%20stroke-width%3D%227%22%20stroke-linecap%3D%22round%22%2F%3E%3Ctext%20x%3D%2264%22%20y%3D%2255%22%20text-anchor%3D%22middle%22%20font-family%3D%22Sarabun%2C%20Arial%22%20font-size%3D%2218%22%20fill%3D%22%23334155%22%3E%E0%B8%AA%E0%B8%A0%E0%B8%B2%3C%2Ftext%3E%3C%2Fsvg%3E"; 
    function text(v) {
      return v == null ? "": String(v)
    }
    function cleanUrl(url) {
      return text(url).trim().replace(/\s+/g, "")
    }
    function isSafeLogoUrl(url) {
      return url = cleanUrl(url),
      !url || /^data:image\//i.test(url) || /^https?:\/\//i.test(url)
    }
    var GITHUB_DIRECT_CONFIG = root.__GITHUB_PAGES_GAS_CONFIG__ || root.__GITHUB_GAS_CONFIG__ || {
    }
    ,
    STORED_GAS_WEB_APP_URL = (function(){ try { return root.localStorage && root.localStorage.getItem("GITHUB_GAS_WEB_APP_URL") || ""; } catch (_) { return ""; } })(),
    VERCEL_MIGRATION_CONFIG = GITHUB_DIRECT_CONFIG,
    VERCEL_GAS_WEB_APP_URL = cleanUrl(GITHUB_DIRECT_CONFIG.gasWebAppUrl || GITHUB_DIRECT_CONFIG.GAS_WEB_APP_URL || root.GITHUB_GAS_WEB_APP_URL || root.GAS_WEB_APP_URL || STORED_GAS_WEB_APP_URL || "https://script.google.com/macros/s/AKfycbzt3p-NLOg8QpmnB_Bj03Rds6H9SlNevnbcOAqzm1vzuAFXPtXhYVlDUTblCclmjSAm/exec"),
    VERCEL_LOGO_URL = cleanUrl(GITHUB_DIRECT_CONFIG.logoUrl || GITHUB_DIRECT_CONFIG.APP_LOGO_URL || ""),
    defaults = {
      appTitle: "ระบบบริหารจัดการเรื่องพิจารณา",
      gasWebAppUrl: VERCEL_GAS_WEB_APP_URL || "",
      logoUrl: VERCEL_LOGO_URL && isSafeLogoUrl(VERCEL_LOGO_URL) ? VERCEL_LOGO_URL: FALLBACK_LOGO,
      fallbackLogoUrl: FALLBACK_LOGO,
      localAssetBase: "./partials/",
      localAssetBaseCandidates: ["./partials/",
        "partials/",
        "../partials/"],
      transportMode: "github-pages-gas-direct-iframe-bridge",
      hostingTarget: "github-pages-gas-direct",
      vercelStaticFrontendReady: !1,
      vercelApiProxyEnabled: !1,
      vercelEnvBuildTool: "tools/generate_vercel_env.py",
      releaseGate: "tools/phaseN_legacy_transport_gate.py",
      vercelApiProxyUrl: "",
      vercelLoginProxyUrl: "",
      vercelPublicConfigProxyUrl: "",
      vercelApiProxyTimeoutMs: 110e3,
      vercelReadProxyClientTimeoutMs: 80e3,
      vercelWriteProxyClientTimeoutMs: 110e3,
      vercelProxyServerTimeoutMs: 50e3,
      vercelReadProxyServerTimeoutMs: 45e3,
      vercelWriteProxyServerTimeoutMs: 50e3,
      vercelLoginProxyTimeoutMs: 3e4,
      vercelPublicConfigProxyTimeoutMs: 8e3,
      proxyRejectGoogleHostedFrontend: !1,
      gasBackendUiDisabled: !1,
      gasBackendFrontendEntryProperty: "VERCEL_FRONTEND_URL",
      dataLoadingPerformance: !0,
      canonicalPartialRoot: "gas-backend",
      apiRouteAllowlistOwner: "Code_20_Router._routerCanonicalHandlerMap_",
      apiDtoContractOwner: "AppBackendCore.API_DTO_CONTRACT_BY_METHOD",
      staticApiContractAllowlistDisabled: !0,
      canonicalEditableRoot: "gas-backend",
      generatedMirrorRoot: "github-pages/partials",
      syncTool: "tools/generate_vercel_env.py",
      contractGate: "tools/phaseN_legacy_transport_gate.py",
      runtimeSlimmingEnabled: !0,
      writeSchemaUnification: !0,
      writeSchemaGate: "tools/phaseN_legacy_transport_gate.py",
      contractGateEnabled: !0,
      generatedMirrorPolicy: "edit-gas-backend-run-sync-do-not-edit-generated-mirrors",
      dashboardLazyHydrationEnabled: !0,
      dashboardIdleHydrationEnabled: !0,
      dashboardInitialIncludeBudget: !1,
      dashboardInitialIncludeCases: !1,
      dashboardInitialIncludeMeetingRows: !1,
      dashboardLazyIncludeBudget: !1,
      dashboardLazyIncludeCases: !1,
      dashboardLazyIncludeMeetingRows: !1,
      dashboardLazyCaseLimit: 30,
      dashboardLazyHydrationDelayMs: 900,
      dashboardBudgetHydrationEnabled: !0,
      dashboardBudgetHydrationDelayMs: 350,
      inlinePartialsEnabled: !1,
      bridgeLoadGraceMs: 12000,
      requireBridgeReadyMessage: !0,
      allowAssumedBridgeReady: !1,
      securityHardening: !0,
      fastLoginJsonpDisabled: !0,
      apiTimeoutMs: 110e3,
      publicConfigTimeoutMs: 4e3,
      fastLoginJsonp: !1,
      loginFormPost: !0,
      dataApiPostBridgeEnabled: !1,
      dataApiIframeBridgeEnabled: !0,
      dataApiJsonpReadEnabled: !0,
      jsonpReadTimeoutMs: 110e3,
      loginViaVercelProxy: !1,
      readJsonpApi: !0,
      clientApiCacheEnabled: !0,
      clientReadResponseCacheEnabled: !0,
      clientReadCacheTtlMs: 60000,
      clientReadCacheMaxTtlMs: 120000,
      clientReadStaleIfErrorMs: 600000,
      clientReadRetryCount: 1,
      clientReadRetryDelayMs: 350,
      clientInFlightDedupe: !0,
      clientApiCacheOwner: "backend-router-cache",
      clientInFlightOwner: "github-pages/github-gas-transport.js::AppTransport.inFlightOnly",
      releaseStamp: APP_RELEASE_STAMP,
      publicJsonpReadMethods: [],
      cachePolicyOwner: "Code_20_Router._routerHotPathContractSpec_",
      legacyTransportRemoved: !0,
      legacyJsonpTransportRemoved: !0,
      legacyGasBridgeTransportRemoved: !1,
      legacyLoginPostIframeRemoved: !1,
      frontendTransportSinglePathPhase2: !0,
      staticGasDirectDisabled: !1,
      releaseManifest: {
        stamp: APP_RELEASE_STAMP,
        githubCommitHash: "",
        gasDeploymentId: "",
        cacheBustVersion: APP_RELEASE_STAMP
      },
      assetManifest: {
        stamp: APP_ASSET_STAMP,
        bundles: {
          appCritical: {
            files: []
          }
          ,
          appCore: {
            files: ["Scripts_Core_Runtime"]
          }
          ,
          pageDashboard: {
            files: ["Scripts_Page_Dashboard"]
          }
          ,
          pageMeeting: {
            files: ["Scripts_Page_Meeting"]
          }
          ,
          pageCommitteeMeeting: {
            files: ["Scripts_Page_Meeting"]
          }
          ,
          pageTrackReport: {
            files: ["Scripts_Page_ReportTrack"]
          }
          ,
          pagePetitioner: {
            files: ["Scripts_Page_Petitioner"]
          }
          ,
          pagePeople: {
            files: ["Scripts_Page_People"]
          }
          ,
          pageBudget: {
            files: ["Scripts_Page_Budget"]
          }
          ,
          pageAdmin: {
            files: ["Scripts_Page_Admin"],
            minRole: "admin"
          }
          ,
          pageAiPrint: {
            files: ["Scripts_Core_Runtime"]
          }
        }
        ,
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
        }
        ,
        templates: {
        }
        ,
        externalGroups: ["bootstrap",
          "xlsx"],
        externalAssets: {
          bootstrap: {
            script: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js",
            onDemand: !0
          }
          ,
          xlsx: {
            script: "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js",
            onDemand: !0
          }
        }
      }
    }
    ; 
    root.APP_CONFIG = Object.assign({}, defaults, existing || {});


    root.APP_CONFIG.vercelApiProxyTimeoutMs = Number(root.APP_CONFIG.vercelApiProxyTimeoutMs || 110000);
    root.APP_CONFIG.vercelReadProxyClientTimeoutMs = Number(root.APP_CONFIG.vercelReadProxyClientTimeoutMs || 80000);
    root.APP_CONFIG.vercelWriteProxyClientTimeoutMs = Number(root.APP_CONFIG.vercelWriteProxyClientTimeoutMs || 110000);
    root.APP_CONFIG.vercelProxyServerTimeoutMs = Number(root.APP_CONFIG.vercelProxyServerTimeoutMs || 50000);
    root.APP_CONFIG.vercelReadProxyServerTimeoutMs = Number(root.APP_CONFIG.vercelReadProxyServerTimeoutMs || 45000);
    root.APP_CONFIG.vercelWriteProxyServerTimeoutMs = Number(root.APP_CONFIG.vercelWriteProxyServerTimeoutMs || 50000);
    root.APP_CONFIG.apiTimeoutMs = Number(root.APP_CONFIG.apiTimeoutMs || 110000);
    root.APP_CONFIG.clientApiCacheEnabled = true;
    root.APP_CONFIG.clientReadResponseCacheEnabled = true;
    root.APP_CONFIG.clientReadCacheTtlMs = Number(root.APP_CONFIG.clientReadCacheTtlMs || 60000);
    root.APP_CONFIG.clientReadCacheMaxTtlMs = Number(root.APP_CONFIG.clientReadCacheMaxTtlMs || 120000);
    root.APP_CONFIG.clientReadStaleIfErrorMs = Number(root.APP_CONFIG.clientReadStaleIfErrorMs || 600000);
    root.APP_CONFIG.clientReadRetryCount = Number(root.APP_CONFIG.clientReadRetryCount || 1);
    root.APP_CONFIG.clientReadRetryDelayMs = Number(root.APP_CONFIG.clientReadRetryDelayMs || 350);
    root.APP_CONFIG.clientApiCacheOwner = "backend-router-cache";
    root.APP_CONFIG.clientInFlightOwner = "github-pages/github-gas-transport.js::AppTransport.inFlightOnly";
    root.APP_CONFIG.fastLoginJsonp = false;
    root.APP_CONFIG.fastLoginJsonpDisabled = true;
    root.APP_CONFIG.requireBridgeReadyMessage = true;
    root.APP_CONFIG.allowAssumedBridgeReady = false;
    root.APP_CONFIG.bridgeLoadGraceMs = 12000;
    root.APP_CONFIG.transportMode = "github-pages-gas-direct-iframe-bridge";
    root.APP_CONFIG.contractGate = "tools/phaseN_legacy_transport_gate.py";
    root.APP_CONFIG.runtimeSlimmingEnabled = true;
    root.APP_CONFIG.vercelStaticFrontendReady = false;
    root.APP_CONFIG.vercelApiProxyEnabled = false;
    root.APP_CONFIG.loginViaVercelProxy = false;
    root.APP_CONFIG.loginFormPost = true;
    root.APP_CONFIG.vercelApiProxyUrl = "";
    root.APP_CONFIG.vercelLoginProxyUrl = "";
    root.APP_CONFIG.vercelPublicConfigProxyUrl = "";
    root.APP_CONFIG.hostingTarget = "github-pages-gas-direct";
    root.APP_CONFIG.releaseGate = "tools/phaseN_legacy_transport_gate.py";
    root.APP_CONFIG.apiRouteAllowlistOwner = "Code_20_Router._routerCanonicalHandlerMap_";
    root.APP_CONFIG.apiDtoContractOwner = "AppBackendCore.API_DTO_CONTRACT_BY_METHOD";
    root.APP_CONFIG.staticApiContractAllowlistDisabled = true;
    root.APP_CONFIG.legacyTransportRemoved = true;
    root.APP_CONFIG.legacyJsonpTransportRemoved = false;
    root.APP_CONFIG.legacyGasBridgeTransportRemoved = false;
    root.APP_CONFIG.legacyLoginPostIframeRemoved = false;
    root.APP_CONFIG.frontendTransportSinglePathPhase2 = true;
    root.APP_CONFIG.staticGasDirectDisabled = false;
    root.APP_CONFIG.readJsonpApi = true;
    root.APP_CONFIG.publicJsonpReadMethods = [];
    root.APP_CONFIG.releaseStamp = APP_RELEASE_STAMP;
    root.APP_CONFIG.assetStamp = APP_ASSET_STAMP;
    root.APP_CONFIG.releaseManifest = Object.assign({}, root.APP_CONFIG.releaseManifest || {}, {
      stamp: APP_RELEASE_STAMP,
      cacheBustVersion: APP_RELEASE_STAMP
    });
    root.APP_CONFIG.assetManifest = Object.assign({}, root.APP_CONFIG.assetManifest || {}, {
      stamp: APP_ASSET_STAMP
    });

    function publishDeployRelease() {
      root.APP_DEPLOY_RELEASE = Object.assign({}, root.APP_DEPLOY_RELEASE || {}, {
        stamp: APP_RELEASE_STAMP,
        assetStamp: APP_ASSET_STAMP,
        version: APP_VERSION,
        source: "github-pages/app-config.js",
        transportMode: root.APP_CONFIG.transportMode || "",
        hostingTarget: root.APP_CONFIG.hostingTarget || "github-pages-gas-direct",
        vercelStaticFrontendReady: true,
        vercelApiProxyEnabled: true,
        legacyTransportRemoved: true
      });
    }

    try {
      var params = new URLSearchParams(root.location && root.location.search || "");
      var logoUrl = params.get("logo") || params.get("logoUrl") || "";
      var gasParam = params.get("gas") || params.get("gasWebAppUrl") || params.get("GAS_WEB_APP_URL") || "";
      var transport = params.get("transport") || "";
      if (gasParam && /^https:\/\/script\.google\.com\/macros\/s\//i.test(gasParam)) {
        root.APP_CONFIG.gasWebAppUrl = cleanUrl(gasParam);
        root.GAS_WEB_APP_URL = root.APP_CONFIG.gasWebAppUrl;
        try { root.localStorage && root.localStorage.setItem("GITHUB_GAS_WEB_APP_URL", root.APP_CONFIG.gasWebAppUrl); } catch (_) {}
      }

      if (logoUrl && isSafeLogoUrl(logoUrl)) {
        if (root.localStorage) root.localStorage.setItem("APP_LOGO_URL", logoUrl.trim());
        root.APP_CONFIG.logoUrl = logoUrl.trim();
      }
      if (!root.APP_CONFIG.gasWebAppUrl && VERCEL_GAS_WEB_APP_URL) {
        root.APP_CONFIG.gasWebAppUrl = VERCEL_GAS_WEB_APP_URL;
      }
      if ((!root.APP_CONFIG.logoUrl || root.APP_CONFIG.logoUrl === FALLBACK_LOGO) &&
          VERCEL_LOGO_URL && isSafeLogoUrl(VERCEL_LOGO_URL)) {
        root.APP_CONFIG.logoUrl = VERCEL_LOGO_URL;
      }
      if (root.localStorage) {
        var storedLogo = cleanUrl(root.localStorage.getItem("APP_LOGO_URL") || "");
        var badLogo = cleanUrl(root.localStorage.getItem("APP_BAD_LOGO_URL") || "");
        if (storedLogo && storedLogo === badLogo) storedLogo = "";
        if (storedLogo && isSafeLogoUrl(storedLogo)) root.APP_CONFIG.logoUrl = storedLogo;
        if (storedLogo && !isSafeLogoUrl(storedLogo)) root.localStorage.removeItem("APP_LOGO_URL");
      }
      if (!isSafeLogoUrl(root.APP_CONFIG.logoUrl)) root.APP_CONFIG.logoUrl = FALLBACK_LOGO;
      if (!root.APP_CONFIG.logoUrl) root.APP_CONFIG.logoUrl = FALLBACK_LOGO;
      root.APP_CONFIG.transportMode = transport && /github-pages-gas-direct/i.test(transport)
        ? transport
        : "github-pages-gas-direct-iframe-bridge";
    } catch (_configError) {
      // Preserve safe defaults when browser storage or URL parsing is unavailable.
    }

    publishDeployRelease();
    root.GAS_WEB_APP_URL = root.GAS_WEB_APP_URL || root.APP_CONFIG.gasWebAppUrl || "";
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
  }
)(typeof window !== "undefined" ? window : globalThis);
