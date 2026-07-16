# GitHub Pages + GAS POST-only Transport — R136

R136 แก้ปัญหาเฉพาะ GitHub ที่ขึ้นว่า `GAS bridge ถูกปิดใน GitHub mode: ใช้ authenticated POST แทน` โดยเปลี่ยน health check/reconnect/diagnostic ให้ไม่เรียก persistent bridge อีกต่อไปใน GitHub mode

## สถาปัตยกรรม

```text
GitHub Pages
  ├─ Login → form POST ไป GAS doPost → postMessage callback
  ├─ Authenticated API → per-request POST iframe + nonce + postMessage callback
  ├─ Connection health check → public apiGetRouteContract JSONP ไม่มี token/CSRF
  ├─ Persistent GAS bridge → ปิดใน GitHub mode
  └─ GAS direct UI → ใช้ google.script.run ตามปกติ
```

## หลักความปลอดภัย

- password/token/CSRF ไม่อยู่ใน URL
- authenticated API ไม่ใช้ JSONP
- public JSONP ใช้เฉพาะ contract/ping ที่ไม่มี credential
- POST callback ต้องผ่าน Google origin + requestId + nonce
- หาก bridge ถูกปิด จะไม่ถือเป็น error ของ GitHub อีก

## Deploy

1. เขียนทับไฟล์ทั้งหมดใน `gas-backend/`
2. Deploy GAS Web App เป็น New version โดยใช้ `/exec` URL เดิม
3. เขียนทับไฟล์ GitHub Pages root และ `partials/`
4. ปิดแท็บเดิมทั้งหมด แล้วเปิด Incognito/Hard Refresh
5. ตรวจ Network ว่าไฟล์โหลดด้วย `?v=r136`

## ตรวจสอบ

เปิด `diagnostic.html` แล้วต้องเห็นโหมด `POST-only` และ public contract ping ผ่าน โดยไม่ต้องรอ READY + ping bridge
