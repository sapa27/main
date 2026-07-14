# R107 GitHub Pages Data / Session Token Fix

## สาเหตุหลักที่ตรวจพบ

หลัง `apiLogin` สำเร็จ หน้าเว็บได้รับ `token` และ `csrfToken` ถูกต้อง แต่ระบบเรียก `apiBootstrap` ต่อทันทีเพื่อโหลด route contract โดย `apiBootstrap` ส่งกลับเฉพาะ `csrfToken` ไม่ได้ออก `token` ใหม่

ฟังก์ชัน `AppSecurity.setSessionTokens(token, csrf)` เดิมเขียนค่าว่างทับ `auth.token` เมื่อ response มีเฉพาะ CSRF ทำให้คำขอ Dashboard และทุกโมดูลหลังจากนั้นถูกส่งโดยไม่มี token แม้หน้า Login จะแสดงว่าสำเร็จแล้ว

## การแก้ไข R107

1. เปลี่ยน token update เป็นแบบ merge ใน runtime ทั้งก่อนและหลังโหลด Core
   - รับได้ทั้ง `(token, csrfToken)` และ object
   - อัปเดตเฉพาะค่าที่ response ส่งมาจริง
   - รักษา token เดิมเมื่อ `apiBootstrap` ส่งกลับเฉพาะ CSRF
   - การ Logout ยังคงล้าง token ผ่านฟังก์ชัน logout โดยตรง
2. แก้ People runtime ไม่ให้ส่ง object ผิดรูปแบบเข้า setter แบบสองพารามิเตอร์
3. จัดค่า GitHub Pages / JSONP / iframe bridge ใน `app-config.js` ให้ไม่ขัดแย้งกับ Vercel edition เดิม
4. อัปเดต release/cache bust เป็น `r107`
5. เปลี่ยน `diagnostic.html` ให้ตรวจ GitHub Pages → GAS Direct และ Public JSONP endpoint โดยตรง
6. คง URL โลโก้รัฐสภา
   - `https://upload.wikimedia.org/wikipedia/commons/9/9a/Seal_of_the_Parliament_of_Thailand.svg`

## ไฟล์สำคัญที่แก้ไข

- `critical-login-runtime.js`
- `app-config.js`
- `diagnostic.html`
- `gas-backend/Scripts_Critical_Login_Runtime.html`
- `gas-backend/Scripts_Core_Runtime.html`
- `gas-backend/Scripts_Page_People.html`
- `partials/Scripts_Critical_Login_Runtime.html`
- `partials/Scripts_Core_Runtime.html`
- `partials/Scripts_Page_People.html`
- `gas-backend/Code_00_PlatformCore.gs` (release/transport stamp)

## ต้อง Deploy ทั้งสองฝั่ง

### 1. GitHub Pages

เขียนทับไฟล์เดิมด้วยไฟล์ root ทั้งชุด รวม `index.html`, `app-config.js`, `github-gas-transport.js`, `critical-login-runtime.js`, `diagnostic.html`, `partials/` และ `.nojekyll`

### 2. Google Apps Script

เขียนทับไฟล์ GAS ด้วยไฟล์ใน `gas-backend/` แล้ว Deploy → Manage deployments → Edit → New version → Deploy โดยคง Web App URL `/exec` เดิมได้

### 3. ล้าง cache ฝั่ง Browser

หลัง GitHub Pages deploy เสร็จ ให้ปิดแท็บเดิม เปิดหน้าใหม่ และกด `Ctrl+F5` หนึ่งครั้ง เพื่อให้โหลด asset stamp `r107`

## วิธีตรวจสอบ

1. เปิด `diagnostic.html` และกด “เริ่มตรวจสอบ” ต้องผ่าน Public JSONP `apiGetRouteContract`
2. เปิดระบบและ Login
3. หลังเข้า Dashboard เปิด Console แล้วตรวจ:

```js
AppStore.get("auth.token", "").length > 0
AppStore.get("auth.csrfToken", "").length > 0
AppTransport.phase2Status()
```

สองบรรทัดแรกควรเป็น `true` และ `phase2Status().ok` ควรเป็น `true`


## R107 — GitHub authenticated data transport correction

- Authenticated read APIs now use the GAS iframe `google.script.run` bridge first.
- JSONP remains only for public contract reads and as a transport fallback.
- Bootstrap transport errors no longer clear a valid login token/session.
- Network/bridge/JSONP transport errors are no longer converted into empty arrays; the UI receives the real error instead of displaying blank modules.
- Release/cache stamp: `r107`.
