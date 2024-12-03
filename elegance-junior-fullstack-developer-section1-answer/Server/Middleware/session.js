// เพิ่มการใช้งาน session สำหรับการตรวจสอบสถานะของผู้ใช้งาน
import session from 'express-session';

export const sessionMiddleware = session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    // บังคับให้ใช้ HTTPS ในโหมด production
    secure: process.env.NODE_ENV === 'production',
    // ป้องกันการเข้าถึงข้อมูลจากฝั่งเซิร์ฟเวอร์
    httpOnly: true,
    // กำหนดระยะเวลาที่ผู้ใช้งานสามารถเข้าสู่ระบบได้(24 ชั่วโมง)
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
});