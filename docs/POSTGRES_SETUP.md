# PostgreSQL Database Setup Guide

## Step 1: Install PostgreSQL

### Windows:
1. Download from: https://www.postgresql.org/download/windows/
2. Run the installer
3. Remember the password you set for `postgres` user
4. Keep the default port 5432

### Verify Installation:
Open PowerShell and run:
```powershell
psql --version
```

## Step 2: Create Database

Open PostgreSQL Command Line (psql):

```powershell
psql -U postgres
```

Enter the password when prompted.

Then create the database:

```sql
CREATE DATABASE runbook_db;
\q
```

## Step 3: Update .env File

The `.env` file in the backend folder already has the correct configuration:

```
DATABASE_URL=postgresql://postgres:1234@localhost:5432/runbook_db
```

If your PostgreSQL password is different, update it:

```
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/runbook_db
```

## Step 4: Install Python Dependencies

```powershell
cd c:\Users\ggomare\Desktop\Documents\Project_Ideas\Runbook\backend
venv\Scripts\activate
pip install -r requirements.txt
```

This will install `psycopg2-binary` (PostgreSQL driver for Python).

## Step 5: Initialize Database

Run the initialization script from the Runbook root folder:

```powershell
cd c:\Users\ggomare\Desktop\Documents\Project_Ideas\Runbook
python Database/init_db.py
```

You should see:
```
📦 Database Setup
============================================================
Connecting to: localhost:5432/runbook_db

1️⃣  Creating user_details table...
   Status: SUCCESS
   Message: "user_details" Table Created Successfully.

============================================================
✅ Database initialization complete!
============================================================
```

## Step 6: Test Authentication

1. Start the backend:
```powershell
cd backend
python run.py
```

2. Start the frontend:
```powershell
cd frontend
npm run dev
```

3. Go to http://localhost:3000

4. Login with:
   - Username: `admin`
   - Password: `admin123`

## Verify Database Connection

You can verify the database was created using pgAdmin or psql:

```powershell
psql -U postgres -d runbook_db
```

Then list tables:
```sql
\dt
```

You should see the `users` table.

## Troubleshooting

### "psql: command not found"
- PostgreSQL PATH not set. Add it manually or reinstall PostgreSQL

### "FATAL: password authentication failed for user 'postgres'"
- Wrong password. Update DATABASE_URL in .env

### "could not translate host name 'localhost' to address"
- PostgreSQL service not running. Start it:
  - Windows Services → PostgreSQL
  - Or: `pg_ctl -D "C:\Program Files\PostgreSQL\15\data" start`

### "FATAL: database 'runbook_db' does not exist"
- Create the database using the SQL command above

### "ModuleNotFoundError: No module named 'psycopg2'"
- Run: `pip install psycopg2-binary`

## Database Management

Use the db_manager for common tasks:

```powershell
# List all users
python Database/db_manager.py list

# Create new admin user
python Database/db_manager.py admin

# Reset entire database
python Database/db_manager.py reset
```

See `Database/README.md` for more commands.
