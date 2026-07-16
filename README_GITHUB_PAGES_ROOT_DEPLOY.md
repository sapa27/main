# GitHub Pages + Google Apps Script — R136

ชุด R136 ใช้ GAS Web App deployment ต่อไปนี้เป็น backend:

`https://script.google.com/macros/s/AKfycbyQZcetvUPxA8OI_vWGiBV2fRT3G3Gkqpho443kX79GQMFJ3eSbL2RDSYYg7S10J4c/exec`

## การแก้ไขหลักใน R136

1. ระบบพิมพ์มาตรฐานคืนแถวที่ pagination ซ่อนไว้ก่อนสร้างเอกสาร ทำให้พิมพ์ข้อมูลหน้า 2, 3 และหน้าถัดไปได้
2. รายงานแบบ server pagination ดึงข้อมูลครบทุกหน้าก่อนพิมพ์ โดยเฉพาะรายงานติดตามหนังสือและสรุปงบประมาณแยกประเภท
3. แก้ class ของตัวเลือกจำนวนแถวจากค่าที่ต่อกันผิด ให้ event `change` ทำงานและเปลี่ยนจำนวนแถว/หน้าได้
4. เส้นทาง `ค้นหาเรื่องพิจารณา → แก้ไข → จัดการเรื่องพิจารณา` รอการเปิด route, โหลด script, initialize หน้า meeting และเปิดข้อมูลตามลำดับ
5. Router เรียก `initMeetingPage({ force: true })` เพื่อไม่ตีความสถานะระหว่าง mount ว่าไม่มี controller
6. แก้ `ReferenceError: normKey is not defined` โดยย้ายตัว normalize `ลำดับเรื่อง` ไปเป็น helper กลางเจ้าของเดียวใน Report/Track runtime
7. `findCase()`, `fetchBundle()` และการกรองหนังสือติดตามใช้ `normalizeCaseSequenceKey()` จาก scope เดียวกัน
8. เส้นทางแก้ไขส่ง `ลำดับเรื่อง` เป็น Primary Link Key และไม่เลือก `caseId` หรือ `id` มาแทนเมื่อมีข้อมูลหลักแล้ว

## สถาปัตยกรรมการเชื่อมต่อ

```text
GitHub Pages
  ├─ Login และ authenticated API → nonce-verified POST + postMessage
  ├─ Persistent GAS bridge → automatic verified fallback
  ├─ Public contract API → JSONP โดยไม่มี token/CSRF
  ├─ Page scripts → ./partials/
  └─ API Router → GAS apiRouter
```

## ไฟล์ที่ต้องเขียนทับบน GitHub Pages

- `index.html`
- `app-config.js`
- `github-gas-transport.js`
- `critical-login-runtime.js`
- `app-index-foundation-pre-vue.js`
- `app-index-foundation-after-vue.js`
- `app-index-foundation-after-swal.js`
- `app-index-bootstrap.js`
- โฟลเดอร์ `partials/`
- `.nojekyll`

ไฟล์ JavaScript local ทั้งหมดต้องโหลดด้วย `?v=r136`

## ไฟล์ที่ต้องเขียนทับใน GAS

เขียนทับไฟล์ทั้งหมดในโฟลเดอร์ `gas-backend/` แล้ว Deploy เป็น Web app เวอร์ชันใหม่

- Execute as: Me
- Who has access: ตามนโยบายองค์กรที่อนุญาตให้ GitHub Pages เรียกใช้งาน
- ใช้ deployment URL `/exec` เดิม

## การตรวจหลัง Deploy

1. ปิดแท็บระบบเดิมทั้งหมด
2. เปิด Incognito หรือกด `Ctrl+Shift+R`
3. ตรวจ Network ให้ JavaScript local ทั้ง 7 ไฟล์เป็น `r136`
4. ทดสอบตารางอย่างน้อย 35 รายการ: เลือก 10, 20 และ 50 แถว/หน้า
5. ทดสอบพิมพ์ตารางที่มีมากกว่า 1 หน้า และตรวจว่ารายการสุดท้ายปรากฏในตัวอย่างพิมพ์
6. ทดสอบ `ค้นหาเรื่องพิจารณา → แก้ไข` หลายครั้งติดต่อกัน

## Security contract

- Authenticated API ห้ามใช้ JSONP
- token, CSRF และ password ห้ามอยู่ใน URL
- Client cache แบ่งตาม session
- Bridge ต้องผ่าน origin, nonce และ ping verification

## R136 — Authenticated data loading stability

### Root cause confirmed

The previous runtime allowed login to fall back from the persistent GAS iframe bridge to a form POST. After a successful POST login, however, every authenticated read/write API was still forced back through the persistent bridge. When the browser returned `403` for the redirected `script.googleusercontent.com/macros/echo?...` iframe or the READY/ping handshake timed out, the UI showed a successful login but Dashboard and all modules remained empty.

### Production correction

- Login uses the password POST path first; credentials stay in the POST body.
- Authenticated API calls use a nonce-verified per-request POST + `postMessage` path as the stable route.
- The persistent authenticated POST remains an automatic fallback when available.
- The chosen healthy transport is remembered per browser tab to avoid repeating a 20–22 second failed handshake for every API call.
- `GAS_API_POST_RESPONSE` validates Google origin, iframe source window, request id, and nonce before resolving.
- Public JSONP remains limited to unauthenticated contract methods; token, CSRF, and password are never placed in a JSONP URL.
- The route-contract builder no longer re-enters the Phase 1 single-source contract while its own registry is being created, preventing `Maximum call stack size exceeded`.
- `apiGetRouteContract`, `apiGetPhase0ContractGate`, `apiGetPhase1Contract`, and `apiGetPhase2Contract` are consistently marked public in the router metadata, matching the public-contract allowlist.

### Required deployment order

1. Deploy every file in `gas-backend/` as a new Web App version while preserving the existing `/exec` deployment URL.
2. Overwrite the GitHub Pages root files and `partials/` from this package.
3. Close old tabs and open the system in Incognito or perform a hard refresh.

The backend must be deployed first because the R136 frontend requires the R136 nonce to be echoed in `GAS_API_POST_RESPONSE`.


## R136 — GitHub POST-only bridge-bypass correction

R136 แก้ปัญหาที่เกิดเฉพาะ GitHub: ปุ่มเชื่อมต่อใหม่และ recovery probe ยังเรียก `ensureBridgeClient()`/`ping()` แบบ bridge ทั้งที่ `persistentGasIframeBridgeDisabled=true` ทำให้ผู้ใช้เห็นข้อความ `GAS bridge ถูกปิดใน GitHub mode: ใช้ authenticated POST แทน` แม้ GAS direct จะเข้าได้ปกติ

การแก้ไข:

- `AppTransport.ensureBridgeClient()` ใน GitHub mode คืนสถานะ `POST-only ready` แทนการ throw error
- `AppTransport.ping()/healthCheck()` ใช้ public `apiGetRouteContract` เป็น connectivity ping
- Reconnect banner และ automatic recovery probe เรียก `healthCheck()` ไม่เรียก bridge
- Authenticated API post-first จะไม่ fallback ไป bridge เมื่อ bridge ถูกปิด
- Diagnostic page เปลี่ยนเป็น POST-only diagnostic
