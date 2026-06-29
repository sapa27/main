// ระบุ URL Web App ของ Google Apps Script ที่ Deploy เสร็จแล้ว
const GAS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzbVk6gcecAczDzu-8VrBqACEaLctglzJK_Mv66xIq_AdAlwurcj1mQVla_sklIjzUHfw/exec";

window.AppApi = {
  /**
   * ฟังก์ชันหลักสำหรับส่ง Request ไปยัง Backend
   */
  call: async function(domain, action, payload) {
    try {
      const response = await fetch(GAS_WEB_APP_URL, {
        method: "POST",
        body: JSON.stringify({
          domain: domain,
          action: action,
          data: payload || {}
        }),
        headers: {
          "Content-Type": "text/plain;charset=utf-8" // บังคับใช้ text/plain สำหรับเลี่ยง CORS Preflight บน GAS
        }
      });
      
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("API Gateway Connection Error:", error);
      return { ok: false, error: "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้" };
    }
  }
};
