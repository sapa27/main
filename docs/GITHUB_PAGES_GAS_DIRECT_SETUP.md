# GitHub Pages + GAS Verified Session Bridge — R115

สถาปัตยกรรม Production ของชุดนี้:

```text
GitHub Pages (static frontend)
  ├─ Login: form POST → GAS doPost → nonce-bound postMessage
  ├─ Authenticated API: persistent GAS iframe → nonce + ping verification
  │                    → google.script.run.apiGithubBridgeCall → apiRouter
  ├─ Public contract API: JSONP แบบไม่มี token/CSRF เท่านั้น
  └─ Deferred page assets: static filesจาก ./partials พร้อม asset stamp
```

## หลักการเจ้าของระบบ

- Transport owner: `github-gas-transport.js`
- API owner: `apiRouter` ใน `Code_20_Router.gs`
- Web entry owner: `doGet`/`doPost` ใน `Code_00_PlatformCore.gs`
- Editable frontend partials: `gas-backend/Scripts_*.html`
- Static mirrors: `partials/Scripts_*.html`
- GAS deployment URL ต้องกำหนดใน `app-config.js` และ `index.html` เท่านั้น

R115 ปิดการเปลี่ยน GAS URL ผ่าน query string และ localStorage โดยค่าเริ่มต้น เพื่อไม่ให้ username/password ถูกส่งไปยัง deployment ที่ไม่ได้กำหนดไว้

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

อย่าอัปโหลดเฉพาะ `index.html` เพราะ R115 ใช้ cache stamp เดียวกันกับ JavaScript ทุกไฟล์

### Google Apps Script

เขียนทับไฟล์ทั้งหมดใน `gas-backend/` แล้ว Deploy เป็น Web app เวอร์ชันใหม่:

- Execute as: **Me**
- Who has access: **Anyone** หรือ **Anyone with the link** ตามนโยบายองค์กร
- URL ต้องลงท้าย `/exec`

ไฟล์สำคัญที่ต้อง Deploy พร้อมกันคือ `Code_00_PlatformCore.gs` เพราะมี nonce handshake, Login callback และ bridge renderer รุ่น R115

## การตรวจหลัง Deploy

1. ปิดแท็บระบบเดิมทั้งหมด
2. เปิด Incognito หรือ Hard Reload
3. Network ต้องแสดงไฟล์ต่อไปนี้เป็น `r115`:
   - `app-config.js?v=r115`
   - `github-gas-transport.js?v=r115`
   - `app-index-foundation-pre-vue.js?v=r115`
   - `app-index-foundation-after-vue.js?v=r115`
   - `app-index-foundation-after-swal.js?v=r115`
   - `critical-login-runtime.js?v=r115`
   - `app-index-bootstrap.js?v=r115`
4. เปิด `diagnostic.html` แล้วให้ผ่าน:
   - READY + nonce-bound source
   - Ping-verified bridge
   - `google.script.run` ping
   - Public JSONP contract โดยไม่มี credentials

## Security contract

- Authenticated API ห้ามใช้ JSONP
- JSONP ใช้เฉพาะ public contract API
- token/CSRF ไม่อยู่ใน URL
- Login callback ต้องมี request ID, release stamp และ nonce ที่ตรงกัน
- Data bridge ต้องมี release stamp, bridge nonce และ ping verification
- Client read cache ถูกแบ่งตาม session token hash และล้างเมื่อ Login/Logout/เปลี่ยนผู้ใช้/บันทึกข้อมูล
- ไม่อนุญาตเปลี่ยน GAS deployment ระหว่าง runtime เว้นแต่แก้ `app-config.js` โดยตั้งใจ

## Troubleshooting

### Login สำเร็จแต่ข้อมูลไม่แสดง

เปิด `diagnostic.html` ก่อน หาก bridge ไม่ผ่าน ให้ตรวจ:

- GAS ได้ Deploy `Code_00_PlatformCore.gs` รุ่น R115 แล้ว
- GitHub โหลด JavaScript ทุกไฟล์เป็น `?v=r115`
- URL ใน `app-config.js`, `index.html` และ fallback ใน `github-gas-transport.js` เป็น deployment เดียวกัน
- Web app permission อนุญาตให้ผู้ใช้เปิด `/exec`

### พบ release mismatch หรือ bridge timeout

แปลว่า GitHub และ GAS เป็นคนละรุ่น ห้ามแก้ด้วย JSONP fallback ให้ Deploy ทั้งสองฝั่งจาก ZIP เดียวกัน

### ปุ่มค้างหลัง transport error

R115 จะปลด UI lock และแสดงแถบ “เชื่อมต่อใหม่” ด้านบน หากเกิดซ้ำให้ใช้ `diagnostic.html` เพื่อดู bridge status แทนการซ่อน error เป็นข้อมูลว่าง
