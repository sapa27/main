# GitHub Pages Root/404 Checklist — R118

ไฟล์ `index.html`, `.nojekyll`, `app-config.js`, `github-gas-transport.js`, `critical-login-runtime.js`, `app-index-*.js` และโฟลเดอร์ `partials/` ต้องอยู่ที่ root ที่ GitHub Pages publish จริง

## ตรวจเส้นทาง

- `/<repo>/index.html` ต้องได้ HTTP 200
- `/<repo>/app-config.js?v=r118` ต้องได้ HTTP 200
- `/<repo>/github-gas-transport.js?v=r118` ต้องได้ HTTP 200
- `/<repo>/partials/Scripts_Core_Runtime.html?v=<asset stamp>` ต้องได้ HTTP 200
- `/<repo>/diagnostic.html` ต้องเปิดได้

## อาการที่บอกว่าไฟล์คนละรุ่น

- `Invalid or unexpected token`
- ปุ่มไม่ตอบสนองหลัง Login
- transport mode หรือ release stamp ไม่ตรงกัน
- ไฟล์บางตัวเป็น `r118` แต่ `app-index-*.js` ไม่มี `?v=r118`

R118 ใส่ cache version ให้ JavaScript local ทั้ง 7 ไฟล์แล้ว ต้อง commit ทั้งชุดและล้าง cache หลัง GitHub Pages deploy สำเร็จ

## R118 runtime stability

R118 ใช้ HTML renderer เจ้าของเดียวแบบไม่วนซ้ำ และ Dashboard recovery cache แบ่งตาม session เพื่อป้องกันหน้า/ปุ่มค้างและข้อมูลค้างข้ามผู้ใช้
