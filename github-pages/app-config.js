(function(root){"use strict";
var existing=root.APP_CONFIG||{};
var GAS_URL="https://script.google.com/macros/s/AKfycbxu2K3ukqReIC8wCalO7P3NRrySO3JUVDoE3d4P0oEzknHehos1u7sCPeeYkashRzgV/exec";
var LOGO="https://upload.wikimedia.org/wikipedia/commons/9/9a/Seal_of_the_Parliament_of_Thailand.svg";
var RELEASE="commission-github-gas-r260-origin-trust-2026-08-11";
root.APP_GITHUB_CONFIG={
  GAS_WEB_APP_URL:GAS_URL,
  BRIDGE_MODE:"github-bridge",
  BRIDGE_TIMEOUT_MS:12000,
  REQUEST_TIMEOUT_MS:90000,
  API_TRANSPORT_MODE:"bridge-first",
  AUTH_TRANSPORT_MODE:"bridge-first",
  AUTH_POST_FALLBACK_TIMEOUT_MS:15000,
  API_POST_FALLBACK_TIMEOUT_MS:20000,
  BRIDGE_VERSION:"github-pages-bridge-v2",
  LOCAL_ASSET_MODE:false
};
root.APP_CONFIG=Object.assign({},existing,{
  appTitle:"ระบบบริหารจัดการเรื่องพิจารณา",
  version:existing.version||"1.2.0-production-current",
  releaseStamp:RELEASE,
  hostingTarget:"github-pages",
  transportMode:"github-pages-gas-router-bridge-first",
  gasWebAppUrl:GAS_URL,
  gasWebAppUrlServerEnvRequired:false,
  gasBackendUiDisabled:false,
  staticGasDirectDisabled:false,
  vercelStaticFrontendReady:false,
  vercelApiProxyEnabled:false,
  loginViaVercelProxy:false,
  loginFormPost:false,
  legacyGasBridgeTransportRemoved:false,
  legacyLoginPostIframeRemoved:false,
  logoUrl:LOGO,
  fallbackLogoUrl:LOGO,
  bridgeTimeoutMs:12000,
  requestTimeoutMs:90000,
  clientReadResponseCacheEnabled:false,
  clientInFlightDedupe:true,
  clientApiCacheOwner:"none",
  clientInFlightOwner:"github-pages/github-gas-transport.js::r260-apps-script-origin-trust"
});
root.GAS_WEB_APP_URL=GAS_URL;
root.APP_DEPLOY_RELEASE=Object.assign({},root.APP_DEPLOY_RELEASE||{}, {
  stamp:RELEASE,
  version:root.APP_CONFIG.version,
  source:"github-pages/app-config.js",
  transportMode:root.APP_CONFIG.transportMode,
  hostingTarget:"github-pages",
  githubPagesGasBridge:true,
  bridgeVersion:"github-pages-bridge-v2"
});
root.APP_FALLBACK_LOGO_URL=LOGO;
root.DEFAULT_LOGO=root.DEFAULT_LOGO||LOGO;
root.LOGO_URL=root.LOGO_URL||LOGO;
})(typeof window!=="undefined"?window:globalThis);
