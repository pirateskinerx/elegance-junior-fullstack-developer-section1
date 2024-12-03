import express from 'express';
import cors from 'cors';
import { sessionMiddleware } from './Middleware/session.js';
import authRoutes from './Routes/auth.js';

const app = express();
const port = 3000;

// Config การใช้งาน CORS ก่อน
app.use(cors({
  // กำหนดที่อยู่ของ client ที่จะส่งข้อมูลไปยัง server 
  origin: 'http://localhost:5173',
  // กำหนดให้ใช้ session สำหรับการตรวจสอบสถานะของผู้ใช้งาน
  credentials: true,
  // กำหนดวิธีการส่งข้อมูลไปยัง server
  methods: ['GET', 'POST'],
  // กำหนดส่วน Header ที่จะส่งไปยัง server
  allowedHeaders: ['Content-Type']
}));
// กำหนดให้ใช้ JSON ในการส่งข้อมูลไปยัง server
app.use(express.json());
// กำหนดให้ใช้ session สำหรับการตรวจสอบสถานะของผู้ใช้งาน
app.use(sessionMiddleware);

// กำหนดให้ใช้เส้นทาง(endpoint)สำหรับการเข้าสู่ระบบ
app.use('/api', authRoutes);

// Handle กับ error ที่เกิดขึ้นในการดำเนินการ
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
});

// กำหนดให้ server ทำงานที่ port ที่ระบุ หรือเพื่อดูว่า server ทำงานอยู่หรือไม่
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});