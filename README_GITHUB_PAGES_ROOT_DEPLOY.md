# GitHub Pages + GAS Direct Edition (R95)

ชุดนี้แยกจาก Vercel Edition เพื่อใช้งานแบบ:

```text
GitHub Pages (Static frontend)
  -> hidden iframe bridge ไปยัง GAS Web App
  -> google.script.run / apiGithubBridgeCall
  -> Google Sheets
```

## ไฟล์ที่ต้องใช้งาน

### 1) อัปโหลด/Deploy ฝั่ง GAS
นำไฟล์ทั้งหมดในโฟลเดอร์ `gas-backend/` ไปใส่ใน Google Apps Script แล้ว Deploy เป็น Web app:

- Execute as: Me
- Who has access: Anyone หรือ Anyone with the link
- คัดลอก URL ที่ลงท้าย `/exec`

### 2) ตั้งค่า GitHub Pages
นำไฟล์ทั้งหมดในโฟลเดอร์ `github-pages/` ไปไว้ใน repository ที่เปิด GitHub Pages

ต้องแก้ไฟล์:

```text
github-pages/app-config.js
```

ค้นหา:

```text
https://script.google.com/macros/s/AKfycbzt3p-NLOg8QpmnB_Bj03Rds6H9SlNevnbcOAqzm1vzuAFXPtXhYVlDUTblCclmjSAm/exec
```

แล้วแทนด้วย GAS Web App URL ที่ลงท้าย `/exec`

ตัวอย่าง:

```javascript
gasWebAppUrl: "https://script.google.com/macros/s/XXXXX/exec"
```

## วิธีทดสอบเร็วโดยไม่แก้ไฟล์

เปิด URL GitHub Pages พร้อม query parameter:

```text
https://<user>.github.io/<repo>/?gas=https%3A%2F%2Fscript.google.com%2Fmacros%2Fs%2FXXXXX%2Fexec
```

ระบบจะบันทึก URL ลง `localStorage` key:

```text
GITHUB_GAS_WEB_APP_URL
```

## สิ่งที่ตัดออกจาก Vercel Edition

- ไม่ใช้ `/api/gas`
- ไม่ใช้ `/api/login`
- ไม่ใช้ `/api/public-config`
- ไม่ใช้ Vercel proxy timeout
- ไม่ใช้ Vercel CSP/runtime-owner guard

## Transport ที่ใช้

- ใช้ hidden iframe ไปยัง `GAS_WEB_APP_URL?__githubBridgeClient=1`
- iframe ใช้ `google.script.run.apiGithubBridgeCall()`
- ใช้ `postMessage` ระหว่าง GitHub Pages กับ GAS iframe
- รองรับ read/write API เดิมทั้งหมดโดยไม่เพิ่ม API ใหม่

## หมายเหตุสำคัญ

หากหน้า login ขึ้นว่า `GAS_WEB_APP_URL_REQUIRED` หรือ bridge timeout ให้ตรวจว่า:

1. แก้ `https://script.google.com/macros/s/AKfycbzt3p-NLOg8QpmnB_Bj03Rds6H9SlNevnbcOAqzm1vzuAFXPtXhYVlDUTblCclmjSAm/exec` แล้ว
2. GAS Web App URL ลงท้าย `/exec`
3. Deploy GAS เป็นเวอร์ชันใหม่แล้ว
4. สิทธิ์ Web App เป็น Anyone / Anyone with link
5. เปิด GitHub Pages ผ่าน `https://` ไม่ใช่เปิดไฟล์จากเครื่องโดยตรง


## R97 note
This package has `app-config.js` preconfigured with the known GAS Web App URL from the previous Vercel proxy configuration. If a newer GAS deployment is used, replace `gasWebAppUrl` in `app-config.js` with the latest `/exec` URL.


## R104: GAS URL hardening

ชุดนี้ตั้งค่า GAS Web App URL ล่าสุดไว้ทั้งใน `app-config.js`, `index.html` และ fallback ภายใน `github-gas-transport.js` แล้ว:

```text
https://script.google.com/macros/s/AKfycbzt3p-NLOg8QpmnB_Bj03Rds6H9SlNevnbcOAqzm1vzuAFXPtXhYVlDUTblCclmjSAm/exec
```

กรุณาอัปโหลด/commit ไฟล์ root ทั้งชุด ไม่ใช่เฉพาะ `index.html` เพื่อป้องกัน browser ใช้ไฟล์ transport หรือ config รุ่นเก่าค้างอยู่


## R104 note
- Login uses POST iframe.
- Read APIs use JSONP authenticated read first, then bridge fallback, to avoid hidden iframe message loss on GitHub Pages.
- Upload root files and deploy GAS backend Code_00_PlatformCore.gs from this package.
