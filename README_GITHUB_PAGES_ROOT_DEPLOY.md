# GitHub Pages + Google Apps Script — R126

ชุด R126 ใช้ GAS Web App deployment ต่อไปนี้เป็น backend:

`https://script.google.com/macros/s/AKfycbyQZcetvUPxA8OI_vWGiBV2fRT3G3Gkqpho443kX79GQMFJ3eSbL2RDSYYg7S10J4c/exec`

## การแก้ไขหลักใน R126

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
  ├─ Login และ authenticated API → verified GAS bridge
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

ไฟล์ JavaScript local ทั้งหมดต้องโหลดด้วย `?v=r126`

## ไฟล์ที่ต้องเขียนทับใน GAS

เขียนทับไฟล์ทั้งหมดในโฟลเดอร์ `gas-backend/` แล้ว Deploy เป็น Web app เวอร์ชันใหม่

- Execute as: Me
- Who has access: ตามนโยบายองค์กรที่อนุญาตให้ GitHub Pages เรียกใช้งาน
- ใช้ deployment URL `/exec` เดิม

## การตรวจหลัง Deploy

1. ปิดแท็บระบบเดิมทั้งหมด
2. เปิด Incognito หรือกด `Ctrl+Shift+R`
3. ตรวจ Network ให้ JavaScript local ทั้ง 7 ไฟล์เป็น `r126`
4. ทดสอบตารางอย่างน้อย 35 รายการ: เลือก 10, 20 และ 50 แถว/หน้า
5. ทดสอบพิมพ์ตารางที่มีมากกว่า 1 หน้า และตรวจว่ารายการสุดท้ายปรากฏในตัวอย่างพิมพ์
6. ทดสอบ `ค้นหาเรื่องพิจารณา → แก้ไข` หลายครั้งติดต่อกัน

## Security contract

- Authenticated API ห้ามใช้ JSONP
- token, CSRF และ password ห้ามอยู่ใน URL
- Client cache แบ่งตาม session
- Bridge ต้องผ่าน origin, nonce และ ping verification
