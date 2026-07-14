"""User model for database"""
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
import bcrypt

db = SQLAlchemy()


class User(db.Model):
    """User model"""
    __tablename__ = 'user_details'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False, index=True)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    last_login = db.Column(db.DateTime, nullable=True)
    role = db.Column(db.String(50), default='user', nullable=False)
    
    # def set_password(self, password):
    #     """Hash and set password"""
    #     self.password_hash = generate_password_hash(password)
    
    # def check_password(self, password):
    #     """Check if password matches"""
    #     return check_password_hash(self.password_hash, password)
    
    def set_password(self, password):
        """Hash and set password using bcrypt"""
        salt = bcrypt.gensalt(rounds=12)
        self.password_hash = bcrypt.hashpw(password.encode(), salt).decode()

    def check_password(self, password):
        """Check if password matches"""
        return bcrypt.checkpw(password.encode(), self.password_hash.encode())
    
    def to_dict(self):
        """Convert to dictionary"""
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'is_active': self.is_active,
            'role': self.role,
            'last_login': self.last_login.isoformat() if self.last_login else None,
            'created_at': self.created_at.isoformat()
        }
    
    def __repr__(self):
        return f'<User {self.username}>'
