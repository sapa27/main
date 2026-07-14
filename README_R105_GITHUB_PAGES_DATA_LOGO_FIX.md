# R105 GitHub Pages Data + Parliament Logo Fix

## สิ่งที่แก้

1. แก้เส้นทางอ่านข้อมูลหลัง Login สำหรับ GitHub Pages + GAS Direct
   - Login ยังใช้ POST iframe ตามเดิม
   - Read API ใช้ JSONP เป็นหลัก
   - ส่ง token/csrf ทั้งใน payload และ query parameter เพื่อให้ GAS auth อ่านได้ครบ
   - callback ใช้ `window.__APP_GITHUB_JSONP_CB_*` เพื่อลดปัญหา global callback ไม่ถูกเรียก
   - backend `__githubJsonpApi` merge token/csrf จาก query กลับเข้า payload ก่อนเข้า `apiRouter`

2. เพิ่มโลโก้รัฐสภา URL ที่ผู้ใช้กำหนด
   - https://upload.wikimedia.org/wikipedia/commons/9/9a/Seal_of_the_Parliament_of_Thailand.svg

## ต้อง deploy ทั้งสองฝั่ง

### GitHub Pages root
อัปโหลดไฟล์ root ทั้งชุด เช่น `index.html`, `app-config.js`, `github-gas-transport.js`, `critical-login-runtime.js`, `partials/`, `.nojekyll`

### Google Apps Script
อัปโหลด `gas-backend/Code_00_PlatformCore.gs` เข้า GAS แล้ว Deploy Web App เวอร์ชันใหม่ เพราะ R105 แก้ `__githubJsonpApi` ฝั่ง GAS ด้วย

