/* GitHub Pages configuration for GAS backend. */
(function(root) {
  'use strict';
  var existing = root.APP_CONFIG || {};
  var defaults = {
    appTitle: 'ระบบบริหารจัดการเรื่องพิจารณา',

    /* REQUIRED: ใส่ URL ของ GAS Web App ที่ลงท้ายด้วย /exec */
    gasWebAppUrl: 'https://script.google.com/macros/s/AKfycbwQmlyAXQLvKw3xZcLtaO9JR1sLDEbrmRQ9ztH3T75vmPt3Jmo04SCv3OAEUFVG8p6zMw/exec',

    /* OPTIONAL: ใส่ URL รูปตรารัฐสภาแบบ public หรือ data:image/... เพื่อให้โลโก้แสดงทันทีบน GitHub Pages */
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Seal_of_the_Parliament_of_Thailand.svg',

    localAssetBase: './partials/',
    transportMode: 'iframe-postmessage',
    apiTimeoutMs: 90000,
    bridgeNoMessageTimeoutMs: 15000,
    publicConfigTimeoutMs: 8000,
    assetManifest: {"stamp":"asset-manifest-github-static-2026-06-25","bundles":{"appCritical":{"files":["Scripts_Critical_Login_Runtime"]},"appCore":{"files":["Scripts_Core_Runtime"]},"pageDashboard":{"files":["Scripts_Page_Dashboard"]},"pageMeeting":{"files":["Scripts_Page_Meeting"]},"pageCommitteeMeeting":{"files":["Scripts_Page_Meeting"]},"pageTrackReport":{"files":["Scripts_Page_ReportTrack"]},"pagePetitioner":{"files":["Scripts_Page_Petitioner"]},"pagePeople":{"files":["Scripts_Page_People"]},"pageBudget":{"files":["Scripts_Page_Budget"]},"pageAdmin":{"files":["Scripts_Page_Admin"],"minRole":"admin"},"pageAiPrint":{"files":["Scripts_Core_Runtime"]}},"upfrontScripts":["Scripts_Critical_Login_Runtime"],"chunks":{"dashboard":["Scripts_Page_Dashboard"],"search":["Scripts_Page_ReportTrack"],"petitioner":["Scripts_Page_Petitioner"],"meeting":["Scripts_Page_Meeting"],"committee-meeting":["Scripts_Page_Meeting"],"track":["Scripts_Page_ReportTrack"],"report":["Scripts_Page_ReportTrack"],"people":["Scripts_Page_People"],"personnel":["Scripts_Page_People"],"budget":["Scripts_Page_Budget"],"admin":["Scripts_Page_Admin"],"ai":["Scripts_Core_Runtime"],"print":["Scripts_Core_Runtime"]},"templates":{},"externalGroups":["bootstrap","xlsx"],"externalAssets":{"bootstrap":{"script":"https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js","onDemand":true},"xlsx":{"script":"https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js","onDemand":true}}}
  };
  root.APP_CONFIG = Object.assign(defaults, existing || {});
  try {
    var params = new URLSearchParams(root.location && root.location.search || '');
    var gasUrl = params.get('gas') || params.get('gasWebAppUrl') || '';
    var logoUrl = params.get('logo') || params.get('logoUrl') || '';
    if (gasUrl) {
      root.localStorage && root.localStorage.setItem('GAS_WEB_APP_URL', gasUrl.trim());
      root.APP_CONFIG.gasWebAppUrl = gasUrl.trim();
    }
    if (logoUrl) {
      root.localStorage && root.localStorage.setItem('APP_LOGO_URL', logoUrl.trim());
      root.APP_CONFIG.logoUrl = logoUrl.trim();
    }
    if (!root.APP_CONFIG.gasWebAppUrl && root.localStorage) {
      root.APP_CONFIG.gasWebAppUrl = String(root.localStorage.getItem('GAS_WEB_APP_URL') || '').trim();
    }
    if (!root.APP_CONFIG.logoUrl && root.localStorage) {
      root.APP_CONFIG.logoUrl = String(root.localStorage.getItem('APP_LOGO_URL') || '').trim();
    }
  } catch (_) {}
  root.GAS_WEB_APP_URL = root.GAS_WEB_APP_URL || root.APP_CONFIG.gasWebAppUrl || '';
})(typeof window !== 'undefined' ? window : globalThis);
