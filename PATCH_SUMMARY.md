# PATCH SUMMARY

แก้ตามกฎสำคัญ: เขียนทับไฟล์เดิมทั้งไฟล์ ไม่เพิ่มไฟล์ใหม่ ไม่ต่อท้ายไฟล์ และไม่ทำชื่อเวอร์ชันใหม่

## อาการที่แก้

- `GAS bridge client ไม่ส่งสัญญาณ READY`
- หน้า GitHub รอ READY จาก iframe bridge client แล้วหยุดก่อนเรียก `apiLogin`

## ไฟล์ที่แก้

- `github-pages/github-gas-transport.js`
- `github-pages/app-config.js`
- `github-pages/index.html`
- `github-pages/diagnostic.html`
- `gas-backend/Code_00_PlatformCore.gs`

## รายละเอียดการแก้

1. เขียน `github-gas-transport.js` ใหม่ให้ใช้เฉพาะ GAS bridge client เท่านั้น
2. ไม่ใช้ form POST fallback
3. เพิ่มการตรวจ iframe load และส่ง ready probe ไปยัง bridge client
4. ถ้า iframe โหลดแล้วแต่ READY ไม่ถึง ให้ถือว่า bridge iframe พร้อมสำหรับการส่ง request แล้วปล่อยให้ผลจริงตัดสินที่ ping/API response
5. เขียน `_githubBridgeClientHtml_()` ใน `Code_00_PlatformCore.gs` ใหม่ให้ส่ง READY หลายครั้ง หลายรูปแบบ และตอบ parent probe ได้
6. เพิ่ม diagnostic ให้เห็นสถานะ iframe load, bridge state, ping และ route contract

## สิ่งที่ต้องทำหลังนำไฟล์ไปใช้

- อัปโหลดไฟล์ใน `github-pages/` ทับไฟล์เดิมบน GitHub
- อัปเดต `gas-backend/Code_00_PlatformCore.gs` ใน Apps Script
- Deploy เป็น New version โดยตั้ง `Execute as = Me` และ `Who has access = Anyone`
- เปิด `diagnostic.html?bridge=client-only` เพื่อตรวจ
