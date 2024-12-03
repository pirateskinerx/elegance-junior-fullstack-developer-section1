import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(__dirname, '..', 'data', 'users.json');

// เพิ่มฟังก์ชันสำหรับเตรียมฐานข้อมูล
async function initializeDatabase() {
  try {
    // สร้างโฟลเดอร์ data
    const dataDir = join(__dirname, '..', 'data');
    await fs.mkdir(dataDir, { recursive: true });
    
    // ตรวจสอบว่ามีไฟล์ users.json หรือไม่
    try {
      await fs.access(DB_PATH);
    } catch {
      // ถ้าไม่มีไฟล์ ให้สร้างไฟล์ใหม่พร้อมข้อมูลเริ่มต้น
      const initialData = { users: [] };
      await fs.writeFile(DB_PATH, JSON.stringify(initialData, null, 2));
    }
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
}
// ฟังก์ชันสำหรับการค้นหาผู้ใช้งานจากข้อมูลที่ระบุ
export const findUserByCredentials = async (email, password) => {
  try {
    // เรียกใช้ฟังก์ชัน initialize ก่อน
    await initializeDatabase();
    
    const usersData = JSON.parse(await fs.readFile(DB_PATH, 'utf8'));
    const user = usersData.users.find(user => 
      user.email === email && user.password === password
    );
    
    if (!user) return null;
    
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Database error');
  }
};