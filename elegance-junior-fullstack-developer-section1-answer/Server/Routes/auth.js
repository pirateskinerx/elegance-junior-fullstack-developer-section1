import express from "express";
import { findUserByCredentials } from "../config/database.js"; // import ฟังก์ชันสำหรับการค้นหาผู้ใช้งานจากข้อมูลที่ระบุ จากไฟล์ database.js

const router = express.Router();
// สร้างเส้นทาง(endpoint)สำหรับการเข้าสู่ระบบ
router.post("/login", async (req, res) => {
  // Handler function ที่จะทำงานเมื่อมีการส่งข้อมูลไปยัง endpoint นี้
  try {
    const { email, password } = req.body;
    // ตรวจสอบว่ามีข้อมูล email และ password หรือไม่
    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Email and password are required",
      });
    }
    // ค้นหาผู้ใช้งานจากข้อมูลที่ระบุ
    const user = await findUserByCredentials(email, password);
    // ตรวจสอบว่าผู้ใช้งานมีอยู่หรือไม่
    if (!user) { 
      return res.status(401).json({
        status: "error",
        message: "Invalid credentials",
      });
    }
    // กำหนดข้อมูล user ใน session
    req.session.user = {
      id: user.id,
      email: user.email,
    };
    // กำหนดระยะเวลาที่ผู้ใช้งานสามารถเข้าสู่ระบบได้(24 ชั่วโมง)
    req.session.cookie.maxAge = 24 * 60 * 60 * 1000; // 24 ชั่วโมง
    // ส่งข้อมูลกลับไปยัง client เพื่อตรวจสอบสถานะของผู้ใช้งาน
    res.json({
      status: "success",
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    // Handle กับ error ที่เกิดขึ้นในการดำเนินการ
    console.error("Login error:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
});

export default router;
