# R104 GitHub Pages Data Bridge 403 Fixed

สาเหตุ: หลัง Login สำเร็จ R100 เปลี่ยน API อ่านข้อมูลทั้งหมดไปใช้ form POST iframe (`__githubApiPost`) ทำให้ Google Apps Script สร้าง HtmlService callback ผ่าน `script.googleusercontent.com/macros/echo?...` หลายครั้ง และบางครั้ง Google ส่ง 403 ทำให้ข้อมูลไม่โหลดแสดง

การแก้ไข R104:
- Login ยังใช้ POST iframe ตามเดิม เพราะต้องส่งรหัสผ่าน
- API หลัง Login ทั้ง read/write กลับมาใช้ hidden GAS iframe bridge (`google.script.run.apiGithubBridgeCall`) เพื่อลดปัญหา echo 403
- prewarm bridge หลัง Login สำเร็จ
- ปิด data API POST bridge ใน `app-config.js`
- cache bust เป็น r104

ต้องอัปโหลดทั้ง root ของ ZIP ไป GitHub Pages และ deploy GAS เวอร์ชันที่มี `apiGithubBridgeCall` อยู่แล้ว


## R104 note
- Login uses POST iframe.
- Read APIs use JSONP authenticated read first, then bridge fallback, to avoid hidden iframe message loss on GitHub Pages.
- Upload root files and deploy GAS backend Code_00_PlatformCore.gs from this package.
