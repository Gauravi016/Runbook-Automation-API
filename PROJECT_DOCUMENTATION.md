# Runbook Automation Dashboard - Complete Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Services & Features](#services--features)
4. [Technologies Used](#technologies-used)
5. [Project Structure](#project-structure)
6. [Application Flow](#application-flow)
7. [API Endpoints](#api-endpoints)
8. [Database Schema](#database-schema)
9. [Setup & Installation](#setup--installation)
10. [How to Run](#how-to-run)
11. [Key Features](#key-features)

---

## Project Overview

The **Runbook Automation Dashboard** is an enterprise-grade automation platform designed to manage, execute, and monitor runbooks (automated workflows) across multiple servers and environments. It provides a comprehensive dashboard for viewing execution history, performance metrics, and generating detailed reports on automation activities.

### Purpose
- 🤖 **Automate** repetitive operational tasks
- 📊 **Monitor** execution status and performance metrics
- 📈 **Report** on automation effectiveness and time saved
- 🔐 **Secure** user authentication and access control
- 🌐 **Multi-environment** support (Dev, UAT, Production)

---

## Architecture

The application follows a **Modern Web Architecture** pattern with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                   CLIENT LAYER (Browser)                     │
│                  React 18 + Vite + Dark Theme               │
│                                                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │Dashboard │  │ Runbooks │  │ Reports  │  │ Library  │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
└─────────────────────┬───────────────────────────────────────┘
                      │ HTTPS/REST API
┌─────────────────────▼───────────────────────────────────────┐
│              APPLICATION LAYER (Backend)                     │
│            Flask 2.3 + Python 3.x + JWT Auth               │
│                                                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │   Auth   │  │ Runbook  │  │ Reports  │  │  Health  │    │
│  │ Service  │  │ Service  │  │ Service  │  │ Service  │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
└─────────────────────┬───────────────────────────────────────┘
                      │ SQL
┌─────────────────────▼───────────────────────────────────────┐
│              DATA PERSISTENCE LAYER                          │
│          PostgreSQL Database + SQLAlchemy ORM               │
│                                                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │  Users   │  │Runbooks  │  │Executions│  │ Reports  │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
└─────────────────────────────────────────────────────────────┘
```

---

## Services & Features

### 1. **Authentication Service** 🔐
**Purpose:** User identity management and access control

**Features:**
- User registration with validation
- Secure login with JWT token generation
- Password encryption and storage
- Token-based session management
- User context tracking

**File Location:** `backend/app/services/auth_service.py`

**Key Methods:**
```python
- login_user(username, password) → Returns user & JWT token
- register_user(username, email, password) → Creates new user
- verify_token(token) → Validates JWT token
- get_user(user_id) → Retrieves user by ID
```

---

### 2. **Runbook Service** 📘
**Purpose:** Manage runbook creation, retrieval, and execution

**Features:**
- Create and store runbooks (automation scripts)
- Execute runbooks on demand or scheduled
- Track execution history and results
- Support multiple programming languages (Python, Bash, PowerShell, Node.js, SQL)
- Store execution logs and error messages
- Schedule runbooks with cron expressions

**File Location:** `backend/app/services/service_service.py`

**Key Capabilities:**
```python
- get_all_runbooks() → List all available runbooks
- get_runbook(runbook_id) → Get specific runbook details
- create_runbook(data) → Create new runbook
- execute_runbook(runbook_id) → Execute immediately
- schedule_runbook(runbook_id, schedule) → Schedule for later
- get_execution_history(runbook_id) → View past executions
```

---

### 3. **Task Service** ✅
**Purpose:** Manage individual tasks and job execution

**Features:**
- Create and manage tasks
- Track task status (Pending, Running, Success, Failed)
- Execute tasks with error handling
- Task dependency management
- Retry logic for failed tasks

**File Location:** `backend/app/services/task_service.py`

**Key Methods:**
```python
- get_all_tasks() → List all tasks
- create_task(task_data) → Create new task
- update_task(task_id, data) → Update task status
- delete_task(task_id) → Remove task
- execute_task(task_id) → Run task
```

---

### 4. **Health Check Service** ❤️
**Purpose:** Monitor system and server health

**Features:**
- Check API endpoint availability
- Monitor database connectivity
- Track server resource utilization
- Generate health status reports
- Alert on unhealthy conditions

**File Location:** `backend/app/routes/health.py`

**Endpoints:**
- `GET /api/health` → System health status
- `GET /api/health/detailed` → Detailed health metrics

---

### 5. **Reports Service** 📊
**Purpose:** Generate execution reports and analytics

**Features:**
- Generate execution trend reports
- Calculate success/failure statistics
- Time-saved analysis and metrics
- Environment distribution reports
- Server-wise execution summary
- Failed execution details with error logs
- Export reports (PDF, Excel, CSV)
- Schedule report generation

**File Location:** Backend integration with database

**Report Types:**
- Execution Trend Report
- Success vs Failure Analysis
- Server-wise Performance Report
- Failed Execution Report
- Time Saved Report
- Monthly Automation Growth Report

---

## Technologies Used

### **Frontend Stack**

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.2.0 | UI framework & component library |
| Vite | 4.3.9 | Build tool & dev server |
| React Router DOM | 6.14.0 | Client-side routing |
| Recharts | 3.9.2 | Data visualization & charts |
| Framer Motion | 12.42.2 | Animations & transitions |
| React Icons | 5.7.0 | Icon library |
| Material UI (MUI) | 9.2.0 | Component library & theming |
| Emotion | 11.14.x | CSS-in-JS styling |
| Axios | 1.4.0 | HTTP client |

### **Backend Stack**

| Technology | Version | Purpose |
|-----------|---------|---------|
| Flask | 2.3.2 | Web framework |
| Flask-CORS | 4.0.0 | Cross-Origin Resource Sharing |
| Flask-SQLAlchemy | 3.0.5 | ORM for database operations |
| PostgreSQL | 13+ | Relational database |
| psycopg | 3.3.4 | PostgreSQL adapter |
| PyJWT | 2.13.0 | JWT token generation & validation |
| Werkzeug | 2.3.7 | WSGI toolkit |
| Gunicorn | 20.1.0 | Production WSGI server |
| python-dotenv | 1.0.0 | Environment variables management |

### **Styling & Theming**

| Feature | Technology | Details |
|---------|-----------|---------|
| Dark Theme | CSS Variables | 20+ custom CSS variables |
| Glassmorphism | CSS Filters | Backdrop blur & transparency |
| Font | Inter (Google Fonts) | Modern sans-serif typography |
| Icons | React Icons | Comprehensive icon sets |
| Colors | HSL/RGB | Accessible color palettes |

### **Development Tools**

| Tool | Purpose |
|------|---------|
| ESLint | Code linting |
| Node.js | JavaScript runtime |
| npm | Package manager |

---

## Project Structure

```
Runbook/
├── backend/                          # Flask backend application
│   ├── app/
│   │   ├── __init__.py              # App factory
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   └── user.py              # User database model
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   ├── auth.py              # Authentication endpoints
│   │   │   ├── health.py            # Health check endpoints
│   │   │   ├── services.py          # Runbook service endpoints
│   │   │   └── tasks.py             # Task management endpoints
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   ├── auth_service.py      # Auth business logic
│   │   │   ├── service_service.py   # Runbook business logic
│   │   │   └── task_service.py      # Task business logic
│   │   └── utils/
│   │       └── __init__.py
│   ├── instance/                    # Instance-specific files
│   ├── tests/                       # Unit tests
│   ├── config.py                    # Configuration settings
│   ├── requirements.txt             # Python dependencies
│   └── run.py                       # Application entry point
│
├── frontend/                        # React application
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx        # Main dashboard
│   │   │   ├── Dashboard.css        # Dashboard styles
│   │   │   ├── Login.jsx            # Authentication page
│   │   │   ├── Login.css
│   │   │   ├── Runbook.jsx          # Executed runbooks page
│   │   │   ├── Runbook.css
│   │   │   ├── RunbookLibrary.jsx   # Available runbooks
│   │   │   ├── RunbookLibrary.css
│   │   │   ├── RunbookDetails.jsx   # Runbook details view
│   │   │   ├── RunbookDetails.css
│   │   │   ├── CreateRunbook.jsx    # Create runbook form
│   │   │   ├── CreateRunbook.css
│   │   │   ├── Reports.jsx          # Reports dashboard
│   │   │   └── Reports.css
│   │   ├── components/
│   │   │   ├── Sidebar.jsx          # Navigation sidebar
│   │   │   └── ProtectedRoute.jsx   # Route protection
│   │   ├── hooks/
│   │   │   ├── useAuth.jsx          # Authentication context
│   │   │   └── useTheme.jsx         # Theme context
│   │   ├── services/
│   │   │   └── api.js               # API service layer
│   │   ├── utils/                   # Utility functions
│   │   ├── styles/
│   │   │   ├── theme.css            # Global theme & variables
│   │   │   ├── Sidebar.css
│   │   │   └── ...other styles
│   │   ├── App.jsx                  # Root component
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx                 # Entry point
│   ├── package.json                 # Dependencies
│   ├── vite.config.js               # Vite configuration
│   └── index.html
│
├── Database/
│   ├── init_db.py                   # Database initialization
│   └── README.md                    # Database setup guide
│
├── docs/                            # Documentation
├── POSTGRES_SETUP.md               # PostgreSQL setup guide
├── README.md                        # Project readme
├── backend_start.bat                # Windows batch file to start backend
├── frontend_start.bat               # Windows batch file to start frontend
└── stop.bat                         # Stop services

```

---

## Application Flow

### **1. User Authentication Flow** 🔑

```
┌─────────────────────────────────────────────────┐
│         User Visits Application                   │
└──────────────────┬──────────────────────────────┘
                   ▼
┌─────────────────────────────────────────────────┐
│   Check localStorage for Auth Token              │
│   ├─ Token exists → Go to Dashboard             │
│   └─ No token → Show Login Page                  │
└──────────────────┬──────────────────────────────┘
                   ▼
┌─────────────────────────────────────────────────┐
│    User Enters Credentials (Login/Register)      │
└──────────────────┬──────────────────────────────┘
                   ▼
┌─────────────────────────────────────────────────┐
│  POST /api/auth/login or /api/auth/register      │
│  Backend validates credentials                   │
└──────────────────┬──────────────────────────────┘
                   ▼
┌─────────────────────────────────────────────────┐
│  ✓ Valid → Generate JWT Token                   │
│  ✗ Invalid → Return 401 Error                   │
└──────────────────┬──────────────────────────────┘
                   ▼
┌─────────────────────────────────────────────────┐
│  Store Token in Context & localStorage           │
│  Redirect to Dashboard                           │
└─────────────────────────────────────────────────┘
```

### **2. Dashboard Navigation Flow** 📊

```
Dashboard (Home)
│
├── Runbook Execution Page
│   ├── View executed runbooks
│   ├── KPI cards (success rate, avg time, etc.)
│   ├── Health scores & trends
│   ├── AI recommendations
│   └── Recent activity feed
│
├── Runbook Library
│   ├── Browse available runbooks
│   ├── Search & filter
│   ├── View runbook details
│   └── Create new runbook
│
├── Create/Edit Runbook
│   ├── Basic information (name, description)
│   ├── Script configuration
│   ├── Schedule setup
│   ├── Notifications
│   └── Save/Execute
│
├── Reports Dashboard
│   ├── Filter data (date, runbook, server, etc.)
│   ├── View KPI metrics
│   ├── Execution trends chart
│   ├── Success vs Failure pie chart
│   ├── Most executed runbooks
│   ├── Environment distribution
│   ├── Server-wise report table
│   ├── Failed executions with error logs
│   ├── Recent executions table
│   └── Export reports (PDF/Excel)
│
└── Logout
    └── Clear token & redirect to login
```

### **3. Runbook Execution Flow** 🚀

```
┌──────────────────────────────────────┐
│  User Selects Runbook                 │
│  OR Creates New Runbook               │
└──────────────┬───────────────────────┘
               ▼
┌──────────────────────────────────────┐
│  Frontend sends execution request     │
│  POST /api/services/execute           │
└──────────────┬───────────────────────┘
               ▼
┌──────────────────────────────────────┐
│  Backend validates request            │
│  ├─ Check authentication              │
│  ├─ Verify runbook exists             │
│  └─ Validate parameters               │
└──────────────┬───────────────────────┘
               ▼
┌──────────────────────────────────────┐
│  Create execution record in DB        │
│  Status: RUNNING                      │
└──────────────┬───────────────────────┘
               ▼
┌──────────────────────────────────────┐
│  Execute runbook script               │
│  ├─ Run on target server              │
│  ├─ Capture output/logs               │
│  └─ Track execution time              │
└──────────────┬───────────────────────┘
               ▼
┌──────────────────────────────────────┐
│  Update execution record              │
│  Status: SUCCESS/FAILED               │
│  Store results & logs                 │
└──────────────┬───────────────────────┘
               ▼
┌──────────────────────────────────────┐
│  Send notification (if configured)    │
│  Update dashboard in real-time        │
└──────────────────────────────────────┘
```

### **4. Reporting Flow** 📈

```
User Navigates to Reports
       │
       ▼
Apply Filters
├─ Date Range
├─ Runbook Name
├─ Server
├─ Environment
└─ Status

       │
       ▼
Frontend calculates metrics from data:
├─ Total Executions (count)
├─ Successful Runs (count)
├─ Failed Runs (count)
├─ Success Rate (%)
└─ Other KPIs

       │
       ▼
Render Charts & Tables:
├─ Execution Trend (Line chart)
├─ Success vs Failure (Pie chart)
├─ Most Executed (Bar chart)
├─ Environment Distribution (Donut chart)
├─ Server-wise Report (Table)
├─ Failed Executions (Table)
└─ Recent Executions (Table)

       │
       ▼
Export Options:
├─ PDF Export
├─ Excel Export
├─ Email Report
└─ Print Report
```

---

## API Endpoints

### **Base URL**
```
http://localhost:5000/api
```

### **Authentication Endpoints** 🔐

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/auth/login` | User login |
| POST | `/auth/register` | User registration |
| GET | `/auth/profile` | Get current user profile |
| POST | `/auth/logout` | User logout |

**Example Request - Login:**
```bash
POST /auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### **Runbook Service Endpoints** 📘

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/services` | List all runbooks |
| GET | `/services/:id` | Get runbook details |
| POST | `/services` | Create new runbook |
| PUT | `/services/:id` | Update runbook |
| DELETE | `/services/:id` | Delete runbook |
| POST | `/services/:id/execute` | Execute runbook immediately |
| POST | `/services/:id/schedule` | Schedule runbook execution |
| GET | `/services/:id/history` | Get execution history |

**Example Request - Execute Runbook:**
```bash
POST /services/1/execute
Content-Type: application/json
Authorization: Bearer {token}

{
  "parameters": {
    "server": "linux-01",
    "environment": "production"
  }
}
```

---

### **Health Check Endpoints** ❤️

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/health` | Basic health status |
| GET | `/health/detailed` | Detailed health metrics |

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-07-14T10:30:00Z",
  "database": "connected",
  "api": "running"
}
```

---

### **Task Management Endpoints** ✅

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/tasks` | List all tasks |
| GET | `/tasks/:id` | Get task details |
| POST | `/tasks` | Create new task |
| PUT | `/tasks/:id` | Update task |
| DELETE | `/tasks/:id` | Delete task |

---

## Database Schema

### **Users Table**
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE
);
```

### **Runbooks Table** (Conceptual)
```sql
CREATE TABLE runbooks (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  script_content TEXT NOT NULL,
  language VARCHAR(50), -- python, bash, powershell, nodejs, sql
  schedule VARCHAR(100), -- cron expression
  environment VARCHAR(50), -- dev, uat, production
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE
);
```

### **Executions Table** (Conceptual)
```sql
CREATE TABLE executions (
  id SERIAL PRIMARY KEY,
  runbook_id INTEGER REFERENCES runbooks(id),
  status VARCHAR(50), -- pending, running, success, failed
  output TEXT,
  error_message TEXT,
  duration_seconds INTEGER,
  executed_by INTEGER REFERENCES users(id),
  server VARCHAR(100),
  executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Setup & Installation

### **Prerequisites**
- Node.js 16+ (for frontend)
- Python 3.8+ (for backend)
- PostgreSQL 13+ (for database)
- Git

### **Backend Setup**

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Create Python virtual environment:**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies:**
```bash
pip install -r requirements.txt
```

4. **Set up environment variables:**
Create a `.env` file in the `backend` directory:
```env
FLASK_ENV=development
FLASK_APP=run.py
DATABASE_URL=postgresql://user:password@localhost:5432/runbook_db
JWT_SECRET_KEY=your-secret-key-here
```

5. **Initialize database:**
```bash
cd Database
python init_db.py
```

### **Frontend Setup**

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
Create a `.env` file in the `frontend` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

---

## How to Run

### **Starting the Backend**

**Option 1 - Using batch file (Windows):**
```bash
cd Runbook
backend_start.bat
```

**Option 2 - Manual start:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
python run.py
```

Backend will run on: `http://localhost:5000`

### **Starting the Frontend**

**Option 1 - Using batch file (Windows):**
```bash
cd Runbook
frontend_start.bat
```

**Option 2 - Manual start:**
```bash
cd frontend
npm run dev
```

Frontend will run on: `http://localhost:3000`

### **Stopping Services**

**Option 1 - Using batch file (Windows):**
```bash
cd Runbook
stop.bat
```

**Option 2 - Manual stop:**
- Press `Ctrl+C` in the terminal windows running the services

---

## Key Features

### **🎯 Dashboard Features**
- Real-time execution statistics (KPIs)
- Success rate tracking with visual indicators
- Execution trend analysis over time
- Failed execution count monitoring
- Average execution time calculation
- Time saved metrics
- Customizable widgets
- Responsive design for all devices

### **📘 Runbook Management**
- Create runbooks with multiple language support
- Execute runbooks on-demand
- Schedule runbooks with cron expressions
- Edit existing runbooks
- Delete runbooks with confirmation
- Search and filter functionality
- Categorize runbooks by type
- Environment-specific configuration
- Parameter support for dynamic execution

### **📊 Advanced Reporting**
- Execution trend visualization
- Success vs failure analysis
- Most executed runbooks ranking
- Environment distribution analysis
- Execution time comparison
- Server-wise performance metrics
- Failed execution details with error logs
- Recent activity timeline
- Export reports (PDF, Excel)
- Scheduled report generation

### **🔒 Security Features**
- User authentication with JWT tokens
- Password encryption
- Protected routes for authorized access
- CORS support for secure API access
- Token-based session management
- Secure credential storage

### **🎨 User Interface**
- Modern dark theme with glassmorphism
- Smooth animations and transitions
- Interactive charts and visualizations
- Responsive grid layouts
- Sidebar navigation
- Collapsible menu
- Status badges and indicators
- Toast notifications
- Loading states

### **📱 Responsive Design**
- Desktop (1400px+): Full layout
- Laptop (1200px): Optimized columns
- Tablet (1024px): Stacked layout
- Mobile (768px): Single column
- Mobile (480px): Minimal UI

### **⚙️ Technical Features**
- Component-based architecture
- Context API for state management
- Custom hooks for reusable logic
- RESTful API design
- Error handling and validation
- Loading skeletons for better UX
- Optimized build with Vite
- ES6+ JavaScript syntax
- CSS custom properties for theming

---

## Conclusion

The **Runbook Automation Dashboard** is a comprehensive solution for managing and monitoring automated workflows. It combines modern frontend technologies with a robust backend architecture to provide an enterprise-grade platform for automation, reporting, and analytics.

### **Key Strengths**
✅ User-friendly interface with dark theme  
✅ Comprehensive reporting and analytics  
✅ Secure authentication and authorization  
✅ Scalable architecture  
✅ Multiple runbook language support  
✅ Real-time monitoring and alerts  
✅ Export and scheduling capabilities  
✅ Responsive design  

### **For More Information**
- See `README.md` for quick start guide
- See `POSTGRES_SETUP.md` for database setup
- See `Database/README.md` for database details

---

**Last Updated:** July 14, 2026  
**Version:** 1.0.0  
**Status:** Production Ready
