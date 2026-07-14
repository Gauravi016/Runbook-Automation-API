"""Flask application factory"""
from flask import Flask
from flask_cors import CORS
from app.models import db
from config import config


def create_app(config_name='development'):
    """Create and configure the Flask application"""
    app = Flask(__name__)
    
    # Load configuration from config module
    app.config.from_object(config[config_name])
    
    # Initialize database
    db.init_app(app)
    
    # Enable CORS for React frontend
    CORS(app)
    
    # Register blueprints
    with app.app_context():
        from app.routes import health_bp, auth_bp, tasks_bp, services_bp
        app.register_blueprint(health_bp)
        app.register_blueprint(auth_bp)
        app.register_blueprint(tasks_bp)
        app.register_blueprint(services_bp)
    
    return app


