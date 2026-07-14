# Runbook Automation Dashboard

A web application for managing and automating runbook tasks and services. Built with Flask backend and React frontend.

## Project Structure

```
Runbook/
├── backend/              # Flask REST API
│   ├── app/             # Application package
│   │   ├── routes/      # API endpoints
│   │   ├── services/    # Business logic
│   │   ├── models/      # Database models
│   │   └── utils/       # Utility functions
│   ├── tests/           # Test cases
│   ├── config.py        # Configuration
│   ├── run.py          # Application entry point
│   └── requirements.txt # Python dependencies
│
├── frontend/            # React SPA
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API client services
│   │   ├── hooks/       # Custom React hooks
│   │   ├── utils/       # Utility functions
│   │   ├── App.jsx      # Root component
│   │   └── main.jsx     # Entry point
│   ├── public/          # Static assets
│   ├── package.json     # Node dependencies
│   └── vite.config.js   # Vite configuration
│
└── docs/                # Documentation
```

## Setup Instructions

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the Flask server:
   ```bash
   python run.py
   ```

The API will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The dashboard will be available at `http://localhost:3000`

## API Endpoints

### Health Check
- `GET /api/health` - Server health status

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/{id}` - Get a specific task
- `PUT /api/tasks/{id}` - Update a task
- `DELETE /api/tasks/{id}` - Delete a task

### Services
- `GET /api/services` - Get all services
- `POST /api/services` - Create a new service
- `GET /api/services/{id}` - Get a specific service
- `PUT /api/services/{id}` - Update a service
- `DELETE /api/services/{id}` - Delete a service

## Technologies Used

### Backend
- Flask - Web framework
- Flask-CORS - CORS support
- Flask-SQLAlchemy - ORM (optional)
- Python 3.9+

### Frontend
- React 18 - UI library
- Vite - Build tool
- Axios - HTTP client
- React Router - Navigation

## Environment Variables

Create a `.env` file in the backend directory:
```
FLASK_ENV=development
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///runbook.db
PORT=5000
```

## Next Steps

1. Implement database models in `backend/app/models/`
2. Create service business logic in `backend/app/services/`
3. Build React components in `frontend/src/components/`
4. Implement page views in `frontend/src/pages/`
5. Add tests in `backend/tests/`

## License

MIT
