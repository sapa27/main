# GitHub Pages frontend + Google Apps Script backend

แพ็กเกจนี้แยกหน้าเว็บออกไป deploy บน GitHub Pages โดยยังใช้ Google Apps Script เป็น API หลังบ้านเดิม

## วิธีตั้งค่า

1. นำไฟล์ในโฟลเดอร์ `gas-backend` ไปแทน/อัปเดตใน Apps Script project เดิม แล้ว Deploy เป็น Web app
   - Execute as: Me / User deploying
   - Who has access: Anyone
2. คัดลอก Web app URL ที่ลงท้ายด้วย `/exec`
3. แก้ไฟล์ `github-pages/app-config.js`
   - ใส่ URL ในค่า `gasWebAppUrl`
4. นำโฟลเดอร์ `github-pages` ขึ้น GitHub repository
5. ตั้งค่า GitHub Pages ให้ใช้ branch/folder ที่เก็บไฟล์นี้

## การทดสอบเร็ว

เปิดหน้า GitHub Pages แล้วเพิ่ม query string ครั้งแรกได้ เช่น

`?gas=https://script.google.com/macros/s/XXXXXXXX/exec`

ระบบจะบันทึก URL ลง localStorage ของ browser เครื่องนั้น จากนั้นหน้าเว็บจะเรียก GAS ผ่าน hidden iframe POST + postMessage
โดยไม่ใช้ `google.script.run` และไม่ต้องย้ายฐานข้อมูล/logic หลังบ้านออกจาก Apps Script


## แก้ปัญหาโลโก้ไม่แสดง

GitHub Pages เป็น static hosting จึงไม่สามารถอ่าน `Script Properties` ของ GAS ได้โดยตรงก่อน login
ให้ตั้งค่าได้ 2 วิธี:

1. ใส่ URL รูป public หรือ data URI ใน `github-pages/app-config.js` ที่ค่า `logoUrl`
2. หรือ deploy GAS backend เวอร์ชันนี้ แล้วหน้าเว็บจะพยายามโหลด public logo config จาก GAS อัตโนมัติ

## แก้ปัญหา GAS API timeout: apiLogin

ให้เปิด `diagnostic.html` บน GitHub Pages แล้วกดตรวจสอบ หาก ping ไม่ผ่าน ให้ตรวจ:

- นำไฟล์ใน `gas-backend/` ไปอัปเดตใน Apps Script แล้วกด Deploy เป็น version ใหม่
- Web app ต้องเป็น `Execute as: Me` และ `Who has access: Anyone`
- `app-config.js` ต้องใช้ URL ที่ลงท้ายด้วย `/exec`
- หลัง deploy แล้วให้ hard refresh หน้า GitHub Pages หรือเพิ่ม query `?gas=WEB_APP_EXEC_URL`
