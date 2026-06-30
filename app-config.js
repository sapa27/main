/* GitHub Pages configuration for GAS backend. */
(function(root) {
  'use strict';
  var existing = root.APP_CONFIG || {};
  var FALLBACK_LOGO = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22128%22%20height%3D%22128%22%20viewBox%3D%220%200%20128%20128%22%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20rx%3D%2224%22%20fill%3D%22%23f8fafc%22/%3E%3Ccircle%20cx%3D%2264%22%20cy%3D%2248%22%20r%3D%2226%22%20fill%3D%22%23d4af37%22/%3E%3Cpath%20d%3D%22M28%20100h72M40%2088h48M48%2074h32%22%20stroke%3D%22%23334155%22%20stroke-width%3D%227%22%20stroke-linecap%3D%22round%22/%3E%3Ctext%20x%3D%2264%22%20y%3D%2255%22%20text-anchor%3D%22middle%22%20font-family%3D%22Sarabun%2C%20Arial%22%20font-size%3D%2218%22%20fill%3D%22%23334155%22%3E%E0%B8%AA%E0%B8%A0%E0%B8%B2%3C/text%3E%3C/svg%3E';
  function text(v) { return v == null ? '' : String(v); }
  function cleanUrl(url) { return text(url).trim().replace(/\s+/g, ''); }
  function isSafeLogoUrl(url) {
    url = cleanUrl(url);
    return !url || /^data:image\//i.test(url) || /^https?:\/\//i.test(url);
  }
  var defaults = {
    appTitle: 'ระบบบริหารจัดการเรื่องพิจารณา',
    gasWebAppUrl: 'https://script.google.com/macros/s/AKfycbww1Qk8zbsKOSgCKXVpzM756fBAjwenhCpKBD17UEzugx6Eb8efueluaJ_Pag3pdjb4_Q/exec',
    logoUrl: FALLBACK_LOGO,
    fallbackLogoUrl: FALLBACK_LOGO,
    localAssetBase: './partials/',
    localAssetBaseCandidates: ['./partials/', 'partials/', '../partials/'],
    transportMode: 'phase5-login-post-primary-fastlogin-minimal-fallback',
    inlinePartialsEnabled: false,
    bridgeReadyTimeoutMs: 15000,
    bridgeLoadGraceMs: 1000,
    forceBridgeClientOnly: false,
    apiTimeoutMs: 60000,
    bridgeNoMessageTimeoutMs: 30000,
    publicConfigTimeoutMs: 4000,
    fastLoginJsonp: true,
    loginFormPost: true,
    loginPostTimeoutMs: 30000,
    loginBridgeFallback: false,
    fastLoginTimeoutMs: 25000,
    readJsonpApi: true,
    readJsonpFallbackToBridge: false,
    writeFormPost: false,
    clientApiCacheEnabled: false,
    clientInFlightDedupe: false,
    jsonpApiTimeoutMs: 60000,
    phase5ReleaseManifest: {stamp:'phase5-login-post-hotfix-2026-06-30', githubCommitHash:'', gasDeploymentId:'', cacheBustVersion:'phase5-login-post-hotfix-2026-06-30'},
    assetManifest: {"stamp":"asset-manifest-github-static-2026-06-29-p0","bundles":{"appCritical":{"files":["Scripts_Critical_Login_Runtime"]},"appCore":{"files":["Scripts_Core_Runtime"]},"pageDashboard":{"files":["Scripts_Page_Dashboard"]},"pageMeeting":{"files":["Scripts_Page_Meeting"]},"pageCommitteeMeeting":{"files":["Scripts_Page_Meeting"]},"pageTrackReport":{"files":["Scripts_Page_ReportTrack"]},"pagePetitioner":{"files":["Scripts_Page_Petitioner"]},"pagePeople":{"files":["Scripts_Page_People"]},"pageBudget":{"files":["Scripts_Page_Budget"]},"pageAdmin":{"files":["Scripts_Page_Admin"],"minRole":"admin"},"pageAiPrint":{"files":["Scripts_Core_Runtime"]}},"upfrontScripts":["Scripts_Critical_Login_Runtime"],"chunks":{"dashboard":["Scripts_Page_Dashboard"],"search":["Scripts_Page_ReportTrack"],"petitioner":["Scripts_Page_Petitioner"],"meeting":["Scripts_Page_Meeting"],"committee-meeting":["Scripts_Page_Meeting"],"track":["Scripts_Page_ReportTrack"],"report":["Scripts_Page_ReportTrack"],"people":["Scripts_Page_People"],"personnel":["Scripts_Page_People"],"budget":["Scripts_Page_Budget"],"admin":["Scripts_Page_Admin"],"ai":["Scripts_Core_Runtime"],"print":["Scripts_Core_Runtime"]},"templates":{},"externalGroups":["bootstrap","xlsx"],"externalAssets":{"bootstrap":{"script":"https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js","onDemand":true},"xlsx":{"script":"https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js","onDemand":true}}}
  };
  root.APP_CONFIG = Object.assign(defaults, existing || {});
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
