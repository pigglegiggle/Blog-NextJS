# Project Setup

This project uses [Prisma](https://www.prisma.io/) as the ORM.  
To connect to the database, you need to set up the `DATABASE_URL` environment variable in a `.env` file at the project root.

## 1. Create `.env` file

In the root directory, create a file called `.env` and add:

```env
DATABASE_URL="your-database-url-here"
```

## 2. Database URL Examples

### MySQL (XAMPP / local)
```env
DATABASE_URL="mysql://root:@localhost:3306/mydb"
```
- **Username:** `root` (default in XAMPP)  
- **Password:** empty by default  
- **Database:** `mydb` (replace with your DB name)  

### MySQL (with password)
```env
DATABASE_URL="mysql://user:password@localhost:3306/mydb"
```

### PostgreSQL
```env
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
```

### SQLite
```env
DATABASE_URL="file:./dev.db"
```

### SQL Server
```env
DATABASE_URL="sqlserver://localhost:1433;database=mydb;user=sa;password=your_password;encrypt=true"
```

### MongoDB
```env
DATABASE_URL="mongodb+srv://user:password@cluster0.mongodb.net/mydb"
```

## 3. Apply Migrations

Once the `.env` file is set up, run:

```bash
npx prisma migrate dev --name init
```

Or, if you just want to push schema without migrations (for testing):

```bash
npx prisma db push
```

✅ Now your project is ready to connect to the database.

