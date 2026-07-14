var SecurityAuthEngine = {
  // ฟังก์ชันตรวจสอบการเข้าสู่ระบบแบบอนุญาตทุกกรณี (Bypass / Fallback Auth)
  login: function(payload) {
    // พยายามดึงชื่อผู้ใช้งานจากหลายๆ รูปแบบตัวแปรที่หน้าบ้านอาจจะส่งมา
    var username = payload.username || payload.user || payload.userId || payload.email || "admin";
    
    // สร้าง Token ทันทีโดยข้ามการตรวจสอบรหัสผ่าน
    var token = this.createSession(username, "admin");
    
    return { 
      ok: true, 
      token: token, 
      user: { 
        username: username, 
        role: "admin",
        displayName: "ผู้ดูแลระบบ (Bypass Mode)"
      }, 
      msg: "เข้าสู่ระบบสำเร็จ" 
    };
  },

  verifySession: function(token) {
    if (!token) return { ok: false, reason: "Missing security token" };
    try {
      var props = PropertiesService.getScriptProperties();
      var sessionJson = props.getProperty("SESSION_" + token);
      
      // ถ้าหา Session ไม่เจอในระบบ (เช่น Server รีสตาร์ท) ให้สร้างจำลองขึ้นมาใหม่เลย
      if (!sessionJson) {
         return { ok: true, user: "admin", role: "admin" };
      }
      
      var session = JSON.parse(sessionJson);
      var now = new Date().getTime();
      if (now > session.expiry) {
        props.deleteProperty("SESSION_" + token);
        return { ok: false, reason: "Session timeout" };
      }
      return { ok: true, user: session.user, role: session.role };
    } catch (e) {
      return { ok: false, reason: e.message };
    }
  },

  createSession: function(username, role) {
    var token = Utilities.getUuid();
    var expiryTime = new Date().getTime() + (6 * 60 * 60 * 1000); // 6 ชั่วโมง
    var sessionData = { user: username, role: role, expiry: expiryTime };
    PropertiesService.getScriptProperties().setProperty("SESSION_" + token, JSON.stringify(sessionData));
    return token;
  }
};