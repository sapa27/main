# Single Source Production Policy

## 1. Canonical owners

ระบบนี้ใช้เจ้าของโค้ดหลักเพียงชุดเดียวเพื่อป้องกันไฟล์หลายเวอร์ชันทำงานทับกัน

| ขอบเขต | Canonical owner |
|---|---|
| GAS และ UI runtime | `gas-backend/Index.html`, `gas-backend/Scripts_*.html` |
| Backend API contract | `gas-backend/Code_20_Router.gs::_routerCanonicalHandlerMap_` |
| Write schema | `gas-backend/Code_20_Router.gs::_routerPhaseKWriteSchemaByMethod_` |
| Release stamp | `package.json::release` |
| Vercel generated artifacts | `tools/generate_vercel_env.py` |
| Production contract gate | `tools/phaseN_legacy_transport_gate.py` |

ห้ามแก้ไฟล์ใน `github-pages/partials/`, generated bootstrap หรือ `vercel-env.generated.js` โดยตรง เพราะไฟล์เหล่านี้สร้างจาก canonical source ระหว่าง build

## 2. Hosting model

### GAS

```text
Browser → google.script.run.apiRouter → Domain → Repository → Google Sheets
```

### Vercel

```text
Browser → /api/login หรือ /api/gas → GAS Web App /exec → apiRouter
```

ทั้งสอง host ใช้ API router และ business rules ชุดเดียวกัน แต่ transport owner แยกตาม host ห้ามเขียนทับกัน

## 3. Build และตรวจสอบ

คำสั่งมาตรฐาน:

```bash
npm run build
npm run audit:strict
npm run production:e2e
```

`npm run build` ต้อง:

1. สร้าง generated artifacts จาก canonical source
2. ตรวจว่า generated files ตรงกับ source
3. ตรวจ JavaScript syntax
4. ตรวจ API, route, write schema และ runtime owner
5. ตรวจ security/release contract

ก่อนบรรจุ source ZIP ให้ใช้:

```bash
npm run source:clean-generated
```

Source package ต้องไม่มี:

- `github-pages/partials/Scripts_*.html`
- generated bootstrap/runtime files
- `github-pages/vercel-env.generated.js`
- `__pycache__`
- `*.pyc`

Vercel ต้องรัน `npm run build` ก่อน deploy เพื่อสร้าง artifacts กลับมา

## 4. กฎการพัฒนา

- ไม่เพิ่ม API เมื่อสามารถใช้ method เดิมได้
- ไม่สร้าง owner ใหม่ทับ route, lifecycle, cache, navigation หรือ action owner เดิม
- ไม่เก็บ empty response ลง cache สำหรับข้อมูลสำคัญ
- Empty state และ Error state ต้องแยกกัน
- Read compatibility สำหรับข้อมูล legacy ต้องเป็น read-only หาก write schema ไม่ตรงกับ canonical model
- การแก้ Search → Edit ต้องรอ route, runtime และ DOM พร้อมก่อนเติมข้อมูล
- ปฏิทินต้องมี event owner เดียวต่อ interaction และไม่ bind `focus`, `click`, `pointer` ซ้ำซ้อน
- การแก้ generated artifact ต้องแก้ที่ canonical source หรือ generator เท่านั้น

## 5. Current contracts

- API routes: 108
- Write routes/schemas: 27
- Frontend runtime source: GAS canonical files
- Frontend response cache: ปิด; cache owner อยู่ Backend
- Write refresh owner: `AppDirtyRefreshOwner`
- Page lifecycle owner: `AppPageHealth` / `AppPages`
- Navigation owner: canonical route resolver ใน `Index.html`

การเปลี่ยนจำนวน route, schema, DOM contract หรือ business rule ต้องเป็นการเปลี่ยนข้อกำหนดโดยชัดแจ้ง ไม่ควรเกิดจาก refactor

## 6. Production verification

Static gate ไม่เพียงพอสำหรับยืนยันว่าข้อมูลแสดงจริง Browser smoke ต้องใช้ response ที่มีข้อมูลและตรวจอย่างน้อย:

- Login และ Dashboard
- เปิด/ปิดเมนูย่อย
- Search → Edit → ฟอร์มมี `caseId`, เลขรับ และชื่อเรื่อง
- ปฏิทินเปิดตอบสนอง
- รายการประชุมแสดงแถวจริง
- สรุปงบประมาณแสดงรายการจริง
- ไม่มี `ReferenceError`, `TypeError` หรือ lifecycle state `error`

Browser smoke ใช้ข้อมูลจำลอง จึงยังต้องทดสอบกับ Google Sheets production หลัง deploy เพื่อยืนยันชื่อชีต, header, สิทธิ์, quota และข้อมูลจริง

## 7. Release checklist

1. แก้ canonical source เท่านั้น
2. รัน `npm run build`
3. รัน security และ strict audit
4. รัน Chromium workflow
5. ตรวจว่า API 108 และ write schema 27 ไม่เปลี่ยน
6. ตรวจ source/build size budget
7. ลบ generated files และ Python cache ก่อนสร้าง source ZIP
8. Deploy GAS เป็น New version
9. Deploy Vercel โดยไม่ใช้ build cacheเมื่อเปลี่ยน bootstrap/runtime
10. ทดสอบข้อมูลจริงทุกโมดูลหลัง deploy
