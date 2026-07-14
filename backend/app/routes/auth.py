"""Authentication API routes"""
from flask import request, jsonify
from app.services.auth_service import AuthService

# Import blueprint - will be registered in __init__
def init_auth_routes(auth_bp):
    """Initialize authentication routes"""
    
    @auth_bp.route('/login', methods=['POST'])
    def login():
        """User login endpoint"""
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        username = data.get('username')
        password = data.get('password')
        
        if not username or not password:
            return jsonify({'error': 'Username and password are required'}), 400
        
        user, token, error = AuthService.login_user(username, password)
        
        if error:
            return jsonify({'error': error}), 401
        
        return jsonify({
            'message': 'Login successful',
            'user': user.to_dict(),
            'token': token
        }), 200

    @auth_bp.route('/register', methods=['POST'])
    def register():
        """User registration endpoint"""
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        
        if not username or not email or not password:
            return jsonify({'error': 'Username, email, and password are required'}), 400
        
        user, error = AuthService.register_user(username, email, password)
        
        if error:
            return jsonify({'error': error}), 400
        
        token = AuthService.generate_token(user.id)
        
        return jsonify({
            'message': 'User registered successfully',
            'user': user.to_dict(),
            'token': token
        }), 201

    @auth_bp.route('/verify', methods=['POST'])
    def verify_token():
        """Verify token and get user info"""
        data = request.get_json()
        
        if not data or 'token' not in data:
            return jsonify({'error': 'Token is required'}), 400
        
        token = data.get('token')
        user_id = AuthService.verify_token(token)
        
        if not user_id:
            return jsonify({'error': 'Invalid or expired token'}), 401
        
        user = AuthService.get_user_by_id(user_id)
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify({
            'message': 'Token is valid',
            'user': user.to_dict()
        }), 200

