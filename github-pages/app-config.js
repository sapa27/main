(function (root) {
  "use strict";
  var existing = root.APP_CONFIG || {};
  var GAS_URL = "https://script.google.com/macros/s/AKfycbxcQny1EstWYJei6AQWy-GS0nNzt86fA_eLfePa4-C5cKPZj_ol5XotPRVnvuvQpjwR/exec";
  var RELEASE = "commission-v1.2-gas-hosted-production-2026-07-17-r148";
  var ASSET = "asset-manifest-commission-v1.2-gas-hosted-production-2026-07-17-r148";
  var LOGO = "https://upload.wikimedia.org/wikipedia/commons/9/9a/Seal_of_the_Parliament_of_Thailand.svg";

  root.APP_CONFIG = Object.assign({}, existing, {
    appTitle: "ระบบบริหารจัดการเรื่องพิจารณา",
    version: existing.version || "1.2.0-production-current",
    releaseStamp: existing.releaseStamp || RELEASE,
    assetStamp: existing.assetStamp || ASSET,
    hostingTarget: "github-pages",
    transportMode: "github-pages-gas-iframe-bridge-r148-compat",
    gasWebAppUrl: GAS_URL,
    gasWebAppUrlServerEnvRequired: false,
    gasBackendUiDisabled: false,
    staticGasDirectDisabled: false,
    vercelStaticFrontendReady: false,
    vercelApiProxyEnabled: false,
    loginViaVercelProxy: false,
    loginFormPost: false,
    legacyGasBridgeTransportRemoved: false,
    legacyLoginPostIframeRemoved: false,
    logoUrl: LOGO,
    fallbackLogoUrl: LOGO,
    localAssetBase: "./partials/",
    localAssetBaseCandidates: ["./partials/", "partials/"],
    bridgeTimeoutMs: 12000,
    requestTimeoutMs: 90000,
    publicConfigTimeoutMs: 8000,
    clientReadResponseCacheEnabled: false,
    clientInFlightDedupe: true,
    clientApiCacheOwner: "none",
    clientInFlightOwner: "github-pages/github-gas-transport.js::gas-iframe-bridge-r148-compat"
  });

  root.GAS_WEB_APP_URL = GAS_URL;
  root.APP_DEPLOY_RELEASE = Object.assign({}, root.APP_DEPLOY_RELEASE || {}, {
    stamp: root.APP_CONFIG.releaseStamp,
    assetStamp: root.APP_CONFIG.assetStamp,
    version: root.APP_CONFIG.version,
    source: "github-pages/app-config.js",
    transportMode: root.APP_CONFIG.transportMode,
    hostingTarget: "github-pages",
    githubPagesGasBridge: true
  });
  root.APP_FALLBACK_LOGO_URL = LOGO;
  root.DEFAULT_LOGO = root.DEFAULT_LOGO || LOGO;
  root.LOGO_URL = root.LOGO_URL || LOGO;
})(typeof window !== "undefined" ? window : globalThis);
