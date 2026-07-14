# R109 GitHub Pages Read Transport 403 Fix

## สาเหตุที่ยืนยันแล้ว
R108 กำหนด `runReadApi()` ให้เรียก `runApiPost()` ก่อนสำหรับ API อ่านข้อมูลหลัง Login ทุกตัว การ POST ไปยัง GAS ผ่าน hidden iframe ทำให้ GAS ส่งผลลัพธ์ HtmlService ผ่าน URL ชั่วคราว `script.googleusercontent.com/macros/echo?user_content_key=...` ซึ่งอาจตอบ HTTP 403 เมื่อถูกโหลดเป็น third-party iframe จาก GitHub Pages

ผลคือ Login สำเร็จและหน้าแอปแสดง แต่ Dashboard และโมดูลทั้งหมดรอ POST timeout ก่อน fallback จึงไม่แสดงข้อมูล

## การแก้ไข R109
- Login ยังคงใช้ POST iframe เพราะต้องส่งรหัสผ่าน
- Read API ทุกตัวใช้ JSONP เป็นเส้นทางหลัก
- Read API ไม่เรียก `__githubApiPost` อีก
- ยกเลิกการ prewarm GAS iframe หลัง Login เพื่อไม่สร้าง `echo?... 403` โดยไม่จำเป็น
- GAS iframe bridge ใช้เมื่อ JSONP เกิด transport failure เท่านั้น
- Write API ยังคงใช้ POST เดิมเพื่อไม่เปลี่ยน Business Logic ในรอบแก้ข้อมูลไม่แสดง
- อัปเดต release/cache stamp เป็น R109

ต้องเขียนทับไฟล์ GitHub Pages ทั้งชุด และเขียนทับ/Deploy GAS จาก `gas-backend` เป็น New version
