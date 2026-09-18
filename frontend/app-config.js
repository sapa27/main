(function(r){"use strict";
var CR_URL="https://sapa27-gateway-asxuzzwspa-eu.a.run.app",
R="commission-v1.2-reliability-loading-cache-session-2026-09-02-r331-v62",
AV="asset-manifest-r331-v62-reliability",
SF="cloud-run-single-source-r331-v62",
BN="V1.2 Cloud Run + GAS Canonical Response CR-8.1 Meeting Recovery",
RD="2026-09-18",FR="r331-v62",
HA="cloud-run-canonical-frontend-r331-v62-cr8.1-meeting-recovery-20260918",
QG="current-quality-gate-r341",TV="gas-direct-json-v1",
LOGO="https://upload.wikimedia.org/wikipedia/commons/9/9a/Seal_of_the_Parliament_of_Thailand.svg",
P=Object.freeze({releaseStamp:R,assetStamp:AV,sourceFingerprint:SF,buildName:BN,releaseDate:RD,frontendRevision:FR,hostArtifact:HA,qualityGate:QG,transportProtocolVersion:TV,rpcProtocolVersion:TV});
r.APP_BUILD_PROVENANCE=P;
r.APP_RUNTIME_CONFIG={
 CLOUD_RUN_GATEWAY_URL:CR_URL,CLOUD_RUN_ALL_PRIMARY:!0,
 REQUEST_TIMEOUT_MS:45000,WRITE_REQUEST_TIMEOUT_MS:120000,AI_DOCUMENT_TIMEOUT_MS:300000,
 RPC_READ_TIMEOUT_BY_METHOD_MS:{apiSessionResume:30000,apiSessionCheck:30000,apiGetDashboardBundle:35000,apiSearchCasesLite:35000,apiGetTracking:35000,apiGetCommitteeMeetingSystem:35000,apiBudgetGetSummary:35000},
 RPC_READ_CACHE_TTL_MS:60000,RPC_READ_STALE_TTL_MS:600000,RPC_READ_CACHE_MAX_ENTRIES:96,
 RPC_READ_CACHE_TTL_BY_METHOD_MS:{apiGetDashboardBundle:180000,apiGetTracking:300000,apiGetPeoplePageBundle:180000,apiGetPetitioners:180000,apiSearchCasesLite:180000,apiGetMeetingLookupOptions:300000,apiGetMeetingHistory:120000,apiGetLetters:120000,apiGetCanonicalCaseBundle:120000,apiListCommitteeMeetings:120000,apiGetCommitteeMeetingSystem:120000}
};
r.APP_CONFIG=Object.assign(r.APP_CONFIG||{},{releaseStamp:R,sourceFingerprint:SF,cloudRunGatewayUrl:CR_URL,deferredAssetVersion:AV,transportVersion:TV,pageScriptLoadTimeoutMs:55000,meetingPageScriptLoadTimeoutMs:80000,pageActivationTimeoutMs:75000,meetingPageActivationTimeoutMs:95000});
r.APP_DEPLOY_RELEASE=Object.assign(r.APP_DEPLOY_RELEASE||{},{stamp:R,assetStamp:AV,sourceFingerprint:SF,transportVersion:TV});
r.DEFAULT_LOGO=r.DEFAULT_LOGO||LOGO;r.LOGO_URL=r.LOGO_URL||LOGO;
r.isAuthenticated||(r.isAuthenticated=function(){try{return!!r.AppStore.get("auth.token","")&&!r.__APP_LOGOUT_IN_PROGRESS__&&!r.__APP_LOGGED_OUT_LOCK__}catch(e){return!1}});
})(typeof window!=="undefined"?window:globalThis);
