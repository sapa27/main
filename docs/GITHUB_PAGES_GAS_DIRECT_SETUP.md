# GitHub Pages + GAS Verified Bridge — R118

สถาปัตยกรรม Production ของชุดนี้:

```text
GitHub Pages (static frontend)
  ├─ Login: verified GAS bridge → google.script.run.apiGithubBridgeCall(apiLogin)
  │          └─ fallback: form POST → GAS doPost → postMessage callback
  ├─ Authenticated API: persistent GAS iframe → nonce + ping verification
  │                    → google.script.run.apiGithubBridgeCall → apiRouter
  ├─ Public contract API: JSONP แบบไม่มี token/CSRF เท่านั้น
  └─ Deferred page assets: static files จาก ./partials พร้อม asset stamp
```

## การแก้ไขสำคัญใน R118

- ยุบ HTML renderer ให้มีเจ้าของเดียวและไม่เรียกย้อนกลับระหว่าง `AppProductionFinal.setTrustedHtml()` กับ `safeSetInnerHTML()`
- แก้สาเหตุ `Maximum call stack size exceeded` ที่ทำให้เนื้อหา เมนูย่อย และปุ่มหยุดทำงาน
- Dashboard recovery cache แบ่งตาม session token hash ไม่คืนข้อมูลข้ามผู้ใช้
- ล้าง cache รุ่นเก่า `dashboard_bundle_last_good_r93` และปฏิเสธ cache ที่ release ไม่ตรง
- ยกเลิกการบังคับ Login ผ่าน POST iframe เป็นเส้นทางแรก
- Login ใช้ verified bridge ชุดเดียวกับ authenticated API
- POST Login เหลือเป็น compatibility fallback
- Login callback ตรวจ Google origin และ request ID เป็นเงื่อนไขหลัก
- ถ้า callback มี nonce ต้องตรงกับคำขอ
- release stamp ต่างรุ่นไม่ทำให้ callback ถูกทิ้งจน timeout แต่บันทึกเป็น diagnostic
- bridge ใช้ stamp ที่ backend ประกาศใน READY message ป้องกัน GitHub/GAS ต่างรุ่นชั่วคราว
- Login/Logout/Session Resume ไม่ใช้ in-flight dedupe เพื่อไม่รวมคำขอคนละรหัสผ่านเข้าด้วยกัน

## เจ้าของระบบ

- Transport owner: `github-gas-transport.js`
- API owner: `apiRouter` ใน `Code_20_Router.gs`
- Web entry owner: `doGet`/`doPost` ใน `Code_00_PlatformCore.gs`
- Editable frontend partials: `gas-backend/Scripts_*.html`
- Static mirrors: `partials/Scripts_*.html`
- GAS deployment URL กำหนดใน `app-config.js`

## ไฟล์ที่ต้อง Deploy

### GitHub Pages

Commit ไฟล์ root ทั้งชุด รวมถึง:

- `index.html`
- `app-config.js`
- `github-gas-transport.js`
- `critical-login-runtime.js`
- `app-index-*.js`
- โฟลเดอร์ `partials/`
- `.nojekyll`

อย่าอัปโหลดเฉพาะ `index.html` เพราะ R118 ใช้ cache stamp เดียวกันกับ JavaScript ทุกไฟล์

### Google Apps Script

เขียนทับไฟล์ทั้งหมดใน `gas-backend/` แล้ว Deploy เป็น Web app เวอร์ชันใหม่:

- Execute as: **Me**
- Who has access: **Anyone** หรือ **Anyone with the link** ตามนโยบายองค์กร
- URL ต้องลงท้าย `/exec`

ไฟล์สำคัญคือ `Code_00_PlatformCore.gs` เพราะมี bridge renderer, Login callback และ `doPost`

## การตรวจหลัง Deploy

1. ปิดแท็บระบบเดิมทั้งหมด
2. เปิด Incognito หรือ Hard Reload
3. Network ต้องแสดงไฟล์ต่อไปนี้เป็น `r118`:
   - `app-config.js?v=r118`
   - `github-gas-transport.js?v=r118`
   - `app-index-foundation-pre-vue.js?v=r118`
   - `app-index-foundation-after-vue.js?v=r118`
   - `app-index-foundation-after-swal.js?v=r118`
   - `critical-login-runtime.js?v=r118`
   - `app-index-bootstrap.js?v=r118`
4. เปิด `diagnostic.html` แล้วตรวจ READY, nonce, ping และ `google.script.run`
5. Login ต้องไม่ขึ้น `GAS Login POST timeout`

## Security contract

- Authenticated API ห้ามใช้ JSONP
- JSONP ใช้เฉพาะ public contract API
- token/CSRF/password ไม่อยู่ใน URL
- Bridge ต้องมี Google origin, request-bound nonce และ ping verification
- Login POST callback ต้องมี request ID ที่ตรงกับคำขอ และ nonce ต้องตรงเมื่อ callback ส่ง nonce มา
- Client read cache แบ่งตาม session token และล้างเมื่อ Login/Logout/เปลี่ยนผู้ใช้/บันทึกข้อมูล
- ไม่อนุญาตเปลี่ยน GAS deployment ระหว่าง runtime เว้นแต่แก้ `app-config.js`

## Troubleshooting

### GAS Login POST timeout

R118 จะใช้ verified bridge ก่อน หากยังพบ timeout ให้ตรวจว่า:

- GitHub โหลด `github-gas-transport.js?v=r118`
- GAS Web App เปิด `/exec` ได้
- `Code_00_PlatformCore.gs` ถูกเขียนทับและ Deploy เป็น New version
- Browser ไม่บล็อก third-party iframe หรือ Google Apps Script

### Login สำเร็จแต่ข้อมูลไม่แสดง

เปิด `diagnostic.html` และตรวจว่า bridge ผ่าน READY + ping จากนั้นตรวจว่า token ถูกเก็บใน memory store และ `apiBootstrap` ใช้ authenticated bridge
