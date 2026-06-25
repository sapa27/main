/* GitHub Pages configuration for GAS backend. */
(function(root) {
  'use strict';
  var existing = root.APP_CONFIG || {};
  var defaults = {
    appTitle: 'ระบบบริหารจัดการเรื่องพิจารณา',
    gasWebAppUrl: 'https://script.google.com/macros/s/AKfycbwlKoxrV6EjWOaUVk4aGA98sbiPJNHV_T5BYDVtpWqM0a9kvL2FNpeBWL62j8YI3mxqmw/exec',
    localAssetBase: './partials/',
    transportMode: 'iframe-postmessage',
    assetManifest: {"stamp":"asset-manifest-github-static-2026-06-25","bundles":{"appCritical":{"files":["Scripts_Critical_Login_Runtime"]},"appCore":{"files":["Scripts_Core_Runtime"]},"pageDashboard":{"files":["Scripts_Page_Dashboard"]},"pageMeeting":{"files":["Scripts_Page_Meeting"]},"pageCommitteeMeeting":{"files":["Scripts_Page_Meeting"]},"pageTrackReport":{"files":["Scripts_Page_ReportTrack"]},"pagePetitioner":{"files":["Scripts_Page_Petitioner"]},"pagePeople":{"files":["Scripts_Page_People"]},"pageBudget":{"files":["Scripts_Page_Budget"]},"pageAdmin":{"files":["Scripts_Page_Admin"],"minRole":"admin"},"pageAiPrint":{"files":["Scripts_Core_Runtime"]}},"upfrontScripts":["Scripts_Critical_Login_Runtime"],"chunks":{"dashboard":["Scripts_Page_Dashboard"],"search":["Scripts_Page_ReportTrack"],"petitioner":["Scripts_Page_Petitioner"],"meeting":["Scripts_Page_Meeting"],"committee-meeting":["Scripts_Page_Meeting"],"track":["Scripts_Page_ReportTrack"],"report":["Scripts_Page_ReportTrack"],"people":["Scripts_Page_People"],"personnel":["Scripts_Page_People"],"budget":["Scripts_Page_Budget"],"admin":["Scripts_Page_Admin"],"ai":["Scripts_Core_Runtime"],"print":["Scripts_Core_Runtime"]},"templates":{},"externalGroups":["bootstrap","xlsx"],"externalAssets":{"bootstrap":{"script":"https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js","onDemand":true},"xlsx":{"script":"https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js","onDemand":true}}}
  };
  root.APP_CONFIG = Object.assign(defaults, existing || {});
  try {
    var params = new URLSearchParams(root.location && root.location.search || '');
    var gasUrl = params.get('gas') || params.get('gasWebAppUrl') || '';
    if (gasUrl) {
      root.localStorage && root.localStorage.setItem('GAS_WEB_APP_URL', gasUrl);
      root.APP_CONFIG.gasWebAppUrl = gasUrl;
    }
  } catch (_) {}
  root.GAS_WEB_APP_URL = root.GAS_WEB_APP_URL || root.APP_CONFIG.gasWebAppUrl || '';
})(typeof window !== 'undefined' ? window : globalThis);
