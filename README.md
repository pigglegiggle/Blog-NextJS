# Project Setup

## English Version

1. **Install dependencies**
```bash
npm install
```

2. **Create `.env` file** in the root directory and add your database URL:
```env
DATABASE_URL="your-database-url-here"
```

3. **Apply Prisma migrations** (create tables in your database):
```bash
npx prisma migrate dev --name init
```

4. **Run development server**
```bash
npm run dev
```

---

## ภาษาไทย

1. **ติดตั้ง dependencies**
```bash
npm install
```

2. **สร้างไฟล์ `.env`** ในโฟลเดอร์ root และใส่ database URL:
```env
DATABASE_URL="your-database-url-here"
```

3. **รัน Prisma migrations** (สร้าง Table):
```bash
npx prisma migrate dev --name init
```

4. **รันเซิร์ฟเวอร์สำหรับพัฒนา**
```bash
npm run dev
```

