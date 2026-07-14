"""Simple database initialization - creates tables and connects to PostgreSQL"""
import os
import sys
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables from backend/.env
backend_env_path = Path(__file__).parent.parent / 'backend' / '.env'
load_dotenv(backend_env_path)


def user_details_table_create() -> dict[str, str]:
    """Create user_details table in PostgreSQL"""
    
    # Step 1: Import required modules
    try:
        import psycopg2
    except Exception as error:
        return {
            'file_name': 'User-Details-Table-Create',
            'step': '1',
            'status': 'ERROR',
            'message': str(error)
        }

    # Step 2: Define database connection parameters
    try:
        database_connection_parameter = {
            'dbname': str(os.environ.get('DATABASE_NAME')),
            'user': str(os.environ.get('DATABASE_USER')),
            'password': str(os.environ.get('DATABASE_PASSWORD')),
            'host': str(os.environ.get('DATABASE_HOST')),
            'port': str(os.environ.get('DATABASE_PORT'))
        }
        table_owner = str(os.environ.get('DATABASE_USER'))
    except Exception as error:
        return {
            'file_name': 'User-Details-Table-Create',
            'step': '2',
            'status': 'ERROR',
            'message': str(error)
        }

    # Step 3: Check if table already exists
    try:
        check_table_sql = '''
        SELECT EXISTS (
            SELECT FROM information_schema.tables
            WHERE table_schema = 'public'
            AND table_name = 'user_details'
        );'''
        
        with psycopg2.connect(**database_connection_parameter) as database_connection:
            with database_connection.cursor() as database_cursor:
                database_cursor.execute(check_table_sql)
                if database_cursor.fetchone()[0]:
                    return {
                        'file_name': 'User-Details-Table-Create',
                        'step': '3',
                        'status': 'INFO',
                        'message': '"user_details" Table Already Present.'
                    }
    except Exception as error:
        return {
            'file_name': 'User-Details-Table-Create',
            'step': '3',
            'status': 'ERROR',
            'message': str(error)
        }

    # Step 4: Execute table creation query
    try:
        create_table_sql = f'''
        CREATE TABLE user_details (
            id SERIAL PRIMARY KEY,
            username VARCHAR(100) NOT NULL UNIQUE,
            email VARCHAR(150) NOT NULL UNIQUE,
            password_hash VARCHAR(255) NOT NULL,
            is_active BOOLEAN NOT NULL DEFAULT TRUE,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            last_login TIMESTAMPTZ,
            role VARCHAR(50) NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user', 'manager'))
        );
        ALTER TABLE user_details OWNER TO {table_owner};'''
        
        with psycopg2.connect(**database_connection_parameter) as database_connection:
            with database_connection.cursor() as database_cursor:
                database_cursor.execute(create_table_sql)
                database_connection.commit()
    except Exception as error:
        return {
            'file_name': 'User-Details-Table-Create',
            'step': '4',
            'status': 'ERROR',
            'message': str(error)
        }

    # Step 5: Verify table creation
    try:
        check_table_sql = '''
        SELECT EXISTS (
            SELECT FROM information_schema.tables
            WHERE table_schema = 'public'
            AND table_name = 'user_details'
        );'''
        
        with psycopg2.connect(**database_connection_parameter) as database_connection:
            with database_connection.cursor() as database_cursor:
                database_cursor.execute(check_table_sql)
                if not database_cursor.fetchone()[0]:
                    return {
                        'file_name': 'User-Details-Table-Create',
                        'step': '5',
                        'status': 'ERROR',
                        'message': '"user_details" Table Not Created.'
                    }
                else:
                    return {
                        'file_name': 'User-Details-Table-Create',
                        'step': '5',
                        'status': 'SUCCESS',
                        'message': '"user_details" Table Created Successfully.'
                    }
    except Exception as error:
        return {
            'file_name': 'User-Details-Table-Create',
            'step': '5',
            'status': 'ERROR',
            'message': str(error)
        }


def initialize_database():
    """Initialize the database - create tables"""
    
    # Get database parameters from .env
    db_name = os.getenv('DATABASE_NAME')
    db_host = os.getenv('DATABASE_HOST')
    db_port = os.getenv('DATABASE_PORT')
    
    if not all([db_name, db_host, db_port]):
        print("❌ ERROR: Database parameters not set in .env file")
        return False
    
    print("📦 Database Setup")
    print("=" * 60)
    print(f"Connecting to: {db_host}:{db_port}/{db_name}")
    
    try:
        # Create user_details table
        print("\n1️⃣  Creating user_details table...")
        result = user_details_table_create()
        print(f"   Status: {result['status']}")
        print(f"   Message: {result['message']}")
        
        if result['status'] == 'ERROR':
            print("\n" + "=" * 60)
            print("❌ Database initialization failed!")
            print("=" * 60)
            return False
        
        print("\n" + "=" * 60)
        print("✅ Database initialization complete!")
        print("=" * 60)
        return True
        
    except Exception as e:
        print(f"❌ Error: {e}")
        print("\nMake sure:")
        print("1. PostgreSQL is running")
        print("2. Database 'runbook_db' exists")
        print("3. .env file has correct connection parameters")
        return False


if __name__ == '__main__':
    success = initialize_database()
    sys.exit(0 if success else 1)


