/* GitHub Pages configuration for GAS backend. */
(function(root, doc) {
  'use strict';
  var existing = root.APP_CONFIG || {};
  var defaults = {
    appTitle: 'ระบบบริหารจัดการเรื่องพิจารณา',

    /* REQUIRED: ใส่ URL ของ GAS Web App ที่ลงท้ายด้วย /exec */
    gasWebAppUrl: 'https://script.google.com/macros/s/AKfycbz_2jUHmXV7e1DZXY0FwU54uMsq0v6CM5T-dXPsEVv3KGrf-BQwHBZ6TCHKNbIRkKpCIg/exec',

    /* OPTIONAL: ใส่ URL รูปตรารัฐสภาแบบ public หรือ data:image/... เพื่อให้โลโก้แสดงทันทีบน GitHub Pages */
    logoUrl: 'https://th.wikipedia.org/wiki/%E0%B9%84%E0%B8%9F%E0%B8%A5%E0%B9%8C:Seal_of_the_Parliament_of_Thailand.svg',

    localAssetBase: './partials/',
    transportMode: 'gas-named-iframe-request',
    forceBridgeClientOnly: true,
    apiTimeoutMs: 90000,
    publicConfigTimeoutMs: 5000,
    assetManifest: {"stamp":"asset-manifest-github-static-2026-06-25","bundles":{"appCritical":{"files":["Scripts_Critical_Login_Runtime"]},"appCore":{"files":["Scripts_Core_Runtime"]},"pageDashboard":{"files":["Scripts_Page_Dashboard"]},"pageMeeting":{"files":["Scripts_Page_Meeting"]},"pageCommitteeMeeting":{"files":["Scripts_Page_Meeting"]},"pageTrackReport":{"files":["Scripts_Page_ReportTrack"]},"pagePetitioner":{"files":["Scripts_Page_Petitioner"]},"pagePeople":{"files":["Scripts_Page_People"]},"pageBudget":{"files":["Scripts_Page_Budget"]},"pageAdmin":{"files":["Scripts_Page_Admin"],"minRole":"admin"},"pageAiPrint":{"files":["Scripts_Core_Runtime"]}},"upfrontScripts":["Scripts_Critical_Login_Runtime"],"chunks":{"dashboard":["Scripts_Page_Dashboard"],"search":["Scripts_Page_ReportTrack"],"petitioner":["Scripts_Page_Petitioner"],"meeting":["Scripts_Page_Meeting"],"committee-meeting":["Scripts_Page_Meeting"],"track":["Scripts_Page_ReportTrack"],"report":["Scripts_Page_ReportTrack"],"people":["Scripts_Page_People"],"personnel":["Scripts_Page_People"],"budget":["Scripts_Page_Budget"],"admin":["Scripts_Page_Admin"],"ai":["Scripts_Core_Runtime"],"print":["Scripts_Core_Runtime"]},"templates":{},"externalGroups":["bootstrap","xlsx"],"externalAssets":{"bootstrap":{"script":"https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js","onDemand":true},"xlsx":{"script":"https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js","onDemand":true}}}
  };
  function text(v) { return v == null ? '' : String(v); }
  function applyLogo(url, source) {
    url = text(url).trim();
    if (!url || !doc) return false;
    root.APP_LOGO = root.APP_LOGO || {};
    root.APP_LOGO.active = url;
    root.APP_LOGO.svg = url;
    root.APP_LOGO.png96 = url;
    root.APP_LOGO.png192 = url;
    root.APP_LOGO.png512 = url;
    root.APP_LOGO.source = source || 'app-config';
    root.DEFAULT_LOGO = url;
    root.LOGO_URL = url;
    root.currentLogoUrl = url;
    root.__SAFE_LOGO_URL__ = url;
    root.__APP_PARLIAMENT_LOGO__ = url;
    try {
      if (!/^data:image\/svg\+xml/i.test(url)) {
        var link = doc.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = url;
        (doc.head || doc.documentElement).appendChild(link);
      }
    } catch (_) {}
    try {
      var nodes = doc.querySelectorAll('[data-logo="parliament"],#login-logo-img,#side-logo-img,#mobile-topbar-logo,#summary-logo-img,#ps-ai-print-logo,#report-logo-img,.print-logo-img');
      Array.prototype.forEach.call(nodes, function(img) {
        if (!img || !img.setAttribute) return;
        img.style.display = '';
        img.setAttribute('loading', img.id === 'login-logo-img' ? 'eager' : (img.getAttribute('loading') || 'eager'));
        img.setAttribute('decoding', img.id === 'login-logo-img' ? 'sync' : (img.getAttribute('decoding') || 'async'));
        try { img.fetchPriority = img.id === 'login-logo-img' ? 'high' : 'auto'; } catch (_) {}
        if (img.getAttribute('src') !== url) img.setAttribute('src', url);
        img.classList && img.classList.add('logo-loaded');
        img.dataset.logoSource = source || 'app-config';
      });
    } catch (_) {}
    return true;
  }
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
      root.APP_CONFIG.gasWebAppUrl = text(root.localStorage.getItem('GAS_WEB_APP_URL') || '').trim();
    }
    if (!root.APP_CONFIG.logoUrl && root.localStorage) {
      root.APP_CONFIG.logoUrl = text(root.localStorage.getItem('APP_LOGO_URL') || '').trim();
    }
  } catch (_) {}
  root.GAS_WEB_APP_URL = root.GAS_WEB_APP_URL || root.APP_CONFIG.gasWebAppUrl || '';
  if (root.APP_CONFIG.logoUrl) applyLogo(root.APP_CONFIG.logoUrl, 'app-config-fast');
})(typeof window !== 'undefined' ? window : globalThis, typeof document !== 'undefined' ? document : null);
