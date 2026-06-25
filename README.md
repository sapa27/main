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
