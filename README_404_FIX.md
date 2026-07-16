# GitHub Pages Root/404 Checklist — R129

ไฟล์ต่อไปนี้ต้องอยู่ที่ root ที่ GitHub Pages publish จริง:

- `index.html`
- `.nojekyll`
- `app-config.js`
- `github-gas-transport.js`
- `critical-login-runtime.js`
- `app-index-*.js`
- `partials/`
- `diagnostic.html`

## URL ที่ต้องตอบ HTTP 200

- `/<repo>/index.html`
- `/<repo>/app-config.js?v=r129`
- `/<repo>/github-gas-transport.js?v=r129`
- `/<repo>/app-index-bootstrap.js?v=r129`
- `/<repo>/partials/Scripts_Core_Runtime.html`
- `/<repo>/diagnostic.html`

หาก Browser ยังโหลด release รุ่นก่อนหน้า ให้ปิดแท็บทั้งหมดและเปิดใหม่แบบ Incognito หลัง GitHub Pages deploy เสร็จ
