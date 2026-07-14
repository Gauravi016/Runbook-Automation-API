"""Authentication service"""
import jwt
from datetime import datetime, timedelta
import os
from app.models import User


class AuthService:
    """Service for authentication operations"""
    
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')
    
    @staticmethod
    def register_user(username, email, password, role='user'):
        """Register a new user"""
        # Check if user already exists
        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            return None, 'Username already exists'
        
        existing_email = User.query.filter_by(email=email).first()
        if existing_email:
            return None, 'Email already exists'
        
        # Create new user
        user = User(username=username, email=email, role=role)
        user.set_password(password)
        
        from app.models import db
        try:
            db.session.add(user)
            db.session.commit()
            return user, None
        except Exception as e:
            db.session.rollback()
            return None, str(e)
    
    @staticmethod
    def login_user(username, password):
        """Authenticate user and return token"""
        user = User.query.filter_by(username=username).first()
        
        if not user:
            return None, None, 'Username not found'
        
        if not user.check_password(password):
            return None, None, 'Invalid password'
        
        if not user.is_active:
            return None, None, 'User is inactive'
        
        # Update last login timestamp
        user.last_login = datetime.utcnow()
        from app.models import db
        try:
            db.session.commit()
        except Exception:
            pass  # Don't fail login if we can't update last_login
        
        # Generate JWT token
        token = AuthService.generate_token(user.id)
        return user, token, None
    
    @staticmethod
    def generate_token(user_id, expires_in=7):
        """Generate JWT token"""
        payload = {
            'user_id': user_id,
            'iat': datetime.utcnow(),
            'exp': datetime.utcnow() + timedelta(days=expires_in)
        }
        token = jwt.encode(
            payload,
            AuthService.SECRET_KEY,
            algorithm='HS256'
        )
        return token
    
    @staticmethod
    def verify_token(token):
        """Verify JWT token and return user_id"""
        try:
            payload = jwt.decode(
                token,
                AuthService.SECRET_KEY,
                algorithms=['HS256']
            )
            return payload.get('user_id')
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None
    
    @staticmethod
    def get_user_by_id(user_id):
        """Get user by ID"""
        return User.query.get(user_id)
