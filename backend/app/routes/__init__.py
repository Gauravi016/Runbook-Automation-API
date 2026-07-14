"""API routes blueprints"""
from flask import Blueprint

# Create blueprints
health_bp = Blueprint('health', __name__, url_prefix='/api/health')
auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')
tasks_bp = Blueprint('tasks', __name__, url_prefix='/api/tasks')
services_bp = Blueprint('services', __name__, url_prefix='/api/services')

# Import and initialize route handlers
from app.routes.health import init_health_routes
from app.routes.auth import init_auth_routes
from app.routes.tasks import init_tasks_routes
from app.routes.services import init_services_routes

# Initialize all routes
init_health_routes(health_bp)
init_auth_routes(auth_bp)
init_tasks_routes(tasks_bp)
init_services_routes(services_bp)

