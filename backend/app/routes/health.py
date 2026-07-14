"""Health check routes"""

def init_health_routes(health_bp):
    """Initialize health routes"""
    
    @health_bp.route('', methods=['GET'])
    def health_check():
        """Health check endpoint"""
        return {'status': 'ok', 'message': 'Server is running'}, 200
