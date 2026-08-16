(function(root){"use strict";
var existing=root.APP_CONFIG||{};
var GAS_URL="https://script.google.com/macros/s/AKfycbxu2K3ukqReIC8wCalO7P3NRrySO3JUVDoE3d4P0oEzknHehos1u7sCPeeYkashRzgV/exec";
var LOGO="https://upload.wikimedia.org/wikipedia/commons/9/9a/Seal_of_the_Parliament_of_Thailand.svg";
var RELEASE="commission-github-gas-rpc-current-2026-08-16";
var ASSET_VERSION="rpc-current-1";
var RPC_VERSION="github-pages-rpc-v1";
var TRANSPORT_MODE="github-pages-gas-router-rpc";
root.APP_GITHUB_CONFIG={
  GAS_WEB_APP_URL:GAS_URL,STATIC_LOGO_URL:LOGO,
  TRANSPORT_MODE:TRANSPORT_MODE,RPC_VERSION:RPC_VERSION,
  HEALTH_TIMEOUT_MS:10000,POST_SIGNAL_GRACE_MS:3500,RESULT_TIMEOUT_MS:90000,
  RESULT_POLL_MIN_MS:450,RESULT_POLL_MAX_MS:2200,REQUEST_TIMEOUT_MS:90000,
  API_TRANSPORT_MODE:"form-post-capability-jsonp",AUTH_TRANSPORT_MODE:"form-post-capability-jsonp",
  LOCAL_ASSET_MODE:false,LOCAL_ASSET_VERSION:ASSET_VERSION,DEFERRED_ASSET_VERSION:ASSET_VERSION,
  DEFERRED_ASSET_FORCE_FRESH:true,DEFERRED_ASSET_CACHE_KEY_MODE:"version::name",DEFERRED_ASSET_REQUEST_VERSIONING:true
};
root.APP_CONFIG=Object.assign({},existing,{
  appTitle:"ระบบบริหารจัดการเรื่องพิจารณา",version:"1.2.0-rpc-current-1",releaseStamp:RELEASE,
  backendFeatureBaseline:"gas-rpc-capability-jsonp-ai-chunk",hostingTarget:"github-pages",transportMode:TRANSPORT_MODE,
  gasWebAppUrl:GAS_URL,gasWebAppUrlServerEnvRequired:false,gasBackendUiDisabled:false,staticGasDirectDisabled:false,
  logoUrl:LOGO,fallbackLogoUrl:LOGO,requestTimeoutMs:90000,clientReadResponseCacheEnabled:false,clientInFlightDedupe:true,
  clientApiCacheOwner:"none",clientInFlightOwner:"github-pages/github-gas-transport.js::canonical-rpc",
  deferredAssetVersion:ASSET_VERSION,deferredAssetForceFresh:true,deferredAssetCacheKeyMode:"version::name",deferredAssetRequestVersioning:true,
  deferredAssetSourceOwner:"github-pages canonical source",pendingReasonCompatibilityGuard:false,pendingReasonOwner:"canonical deferred ReportTrack renderer",
  transportRecoveryReason:"Retire Apps Script iframe/MessageChannel/postMessage transport; use POST body plus short-lived Script Cache capability JSONP result",
  githubMeetingCompatibilityOwner:"github-pages/index.html::commissioner-proposer-owner-r297",githubCommissionerLookupOwner:"apiGetPersonnelComms",
  githubPetitionerPopupOwner:"canonical petitioner runtime",githubCommissionerCacheOwner:"meeting.lookup.กรรมาธิการเสนอญัตติ::r297",
  githubAiDuplicateFallbackOwner:"github-pages/index.html::ai-duplicate-model-fallback-r299",githubAiDuplicateFallbackModel:"gemini-3.6-flash",
  githubAiDuplicateFallbackReadApi:"apiGetCaseReportExportRows",githubPdfRuntimeBaseline:"r301-chunk-transfer-on-canonical-backend",
  githubPdfTransferMode:"chunked-start-chunk-final",rpcVersion:RPC_VERSION,bridgeRequired:false
});
root.APP_DEPLOY_RELEASE=Object.assign({},root.APP_DEPLOY_RELEASE||{}, {stamp:RELEASE,version:root.APP_CONFIG.version,backendFeatureBaseline:root.APP_CONFIG.backendFeatureBaseline,source:"github-pages/app-config.js",transportMode:TRANSPORT_MODE,hostingTarget:root.APP_CONFIG.hostingTarget,githubPagesGasBridge:false,rpcVersion:RPC_VERSION,deferredAssetVersion:ASSET_VERSION,deferredAssetCacheKeyMode:"version::name",deferredAssetRequestVersioning:true,pendingReasonCompatibilityGuard:false});
root.GAS_WEB_APP_URL=GAS_URL;root.APP_FALLBACK_LOGO_URL=LOGO;root.DEFAULT_LOGO=root.DEFAULT_LOGO||LOGO;root.LOGO_URL=root.LOGO_URL||LOGO;
})(typeof window!=="undefined"?window:globalThis);
