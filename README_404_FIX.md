# GitHub Pages Root/404 Checklist — R115

ไฟล์ `index.html`, `.nojekyll`, `app-config.js`, `github-gas-transport.js`, `critical-login-runtime.js`, `app-index-*.js` และโฟลเดอร์ `partials/` ต้องอยู่ที่ root ที่ GitHub Pages publish จริง

## ตรวจเส้นทาง

- `/<repo>/index.html` ต้องได้ HTTP 200
- `/<repo>/app-config.js?v=r115` ต้องได้ HTTP 200
- `/<repo>/github-gas-transport.js?v=r115` ต้องได้ HTTP 200
- `/<repo>/partials/Scripts_Core_Runtime.html?v=<asset stamp>` ต้องได้ HTTP 200
- `/<repo>/diagnostic.html` ต้องเปิดได้

## อาการที่บอกว่าไฟล์คนละรุ่น

- `Invalid or unexpected token`
- ปุ่มไม่ตอบสนองหลัง Login
- transport mode หรือ release stamp ไม่ตรงกัน
- ไฟล์บางตัวเป็น `r115` แต่ `app-index-*.js` ไม่มี `?v=r115`

R115 ใส่ cache version ให้ JavaScript local ทั้ง 7 ไฟล์แล้ว ต้อง commit ทั้งชุดและล้าง cache หลัง GitHub Pages deploy สำเร็จ
