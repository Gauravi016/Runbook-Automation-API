# Database Setup

Simple database initialization script with step-by-step verification and error handling.

## What it does

- Reads PostgreSQL credentials from `.env` file
- Connects to PostgreSQL database using psycopg2
- Creates the `user_details` table with 5-step verification
- Checks if table already exists before creation
- Verifies table was created successfully

## How to use

From the Runbook root folder:

```powershell
python Database/init_db.py
```

## Tables Created

### `user_details` - User Management Table

Stores all user account information and authentication data.

**Columns:**
- `id` - Primary key (auto-increment)
- `username` - Unique username (max 100 chars)
- `email` - Unique email address (max 150 chars)
- `password_hash` - Hashed password (max 255 chars)
- `is_active` - Account active status (default: TRUE)
- `created_at` - Account creation timestamp (auto: NOW())
- `updated_at` - Last update timestamp (auto: NOW())
- `last_login` - Last login timestamp
- `role` - User role: 'admin', 'user', or 'manager' (default: 'user')

**Constraints:**
- Username is unique
- Email is unique
- Role must be 'admin', 'user', or 'manager'

## Requirements

1. PostgreSQL running on `localhost:5432`
2. Database `runbook_db` exists
3. `.env` file with database credentials:
   ```
   DATABASE_NAME=runbook_db
   DATABASE_USER=postgres
   DATABASE_PASSWORD=1234
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   ```

## Troubleshooting

### Connection refused
- PostgreSQL not running
- Check port 5432 is open

### "database 'runbook_db' does not exist"
- Create it via pgAdmin or psql:
  ```sql
  CREATE DATABASE runbook_db;
  ```

### "Module not found: psycopg2"
- Run: `pip install psycopg2-binary`

### Environment variables not found
- Make sure `.env` file exists in backend folder with all required variables

### "user_details Table Already Present"
- Table already exists (nothing to do)
- Delete and recreate: `DROP TABLE user_details;` then run script again



