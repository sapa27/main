# GitHub Pages 404 Fix

สาเหตุ 404: GitHub Pages หา `index.html` ที่ root ของแหล่ง publish ไม่พบ เพราะชุดก่อนหน้าเก็บไฟล์หน้าเว็บไว้ใน `github-pages/index.html`.

ชุด R96 นี้แก้โดยวางไฟล์หน้าเว็บสำหรับ GitHub Pages ไว้ที่ root โดยตรง:

- `index.html`
- `app-config.js`
- `github-gas-transport.js`
- `critical-login-runtime.js`
- `app-index-*.js`
- `partials/`
- `.nojekyll`

วิธีใช้:

1. อัปโหลดไฟล์และโฟลเดอร์ทั้งหมดใน ZIP นี้ไปที่ root ของ repository ที่ใช้ GitHub Pages
2. ตรวจ `app-config.js` แล้วแทน `PUT_GAS_WEB_APP_URL_HERE` ด้วย GAS Web App URL ที่ลงท้าย `/exec`
3. GitHub Settings → Pages → Build and deployment → Deploy from a branch → เลือก branch และ `/root`
4. รอ deploy แล้วเปิด URL ของ GitHub Pages ใหม่

หมายเหตุ: โฟลเดอร์ `gas-backend/` ใช้สำหรับอัปโหลดเข้า Google Apps Script ไม่ใช่ไฟล์ที่ GitHub Pages ต้องโหลดโดยตรง
