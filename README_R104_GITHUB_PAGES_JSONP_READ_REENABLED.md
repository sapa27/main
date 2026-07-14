# R106 GitHub Pages JSONP Read Re-enabled

## สาเหตุ
R103 เพิ่มเส้นทาง JSONP สำหรับ Read API แล้ว แต่ `app-config.js` ช่วงท้ายยังตั้งค่า `root.APP_CONFIG.readJsonpApi = false;` ทำให้ frontend ไม่เคยใช้ JSONP จริง และย้อนกลับไปใช้ hidden iframe bridge ซึ่งเป็นจุดที่ทำให้ Dashboard/ทุกระบบไม่ดึงข้อมูล.

## การแก้ไข
- เปิด `root.APP_CONFIG.readJsonpApi = true;`
- ปรับ `legacyJsonpTransportRemoved = false;` ให้สอดคล้องกับ GitHub Pages edition
- อัปเดต release/cache bust เป็น R106
- คง Login POST iframe ตามเดิม
- คง Write API ผ่าน bridge ตามเดิม
- Read API ใช้ JSONP ก่อน แล้ว fallback ไป bridge หาก JSONP ล้ม

## ต้อง deploy
- GitHub Pages root files ทั้งชุด
- GAS `Code_00_PlatformCore.gs` ต้องเป็นรุ่นที่รองรับ `__githubJsonpApi`


R106: โลโก้รัฐสภาใช้ URL: https://upload.wikimedia.org/wikipedia/commons/9/9a/Seal_of_the_Parliament_of_Thailand.svg
