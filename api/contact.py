"""
Vercel serverless function for contact form submissions.

This function handles POST requests to /api/contact.py and processes
contact form submissions. It uses the same validation logic as the
FastAPI backend but adapts to Vercel's serverless function format.
"""

from http.server import BaseHTTPRequestHandler
import json
import logging
from email.utils import parseaddr

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def validate_email(email: str) -> bool:
    """Simple email validation."""
    if not email or '@' not in email:
        return False
    try:
        name, addr = parseaddr(email)
        return bool(addr and '.' in addr.split('@')[1])
    except Exception:
        return False


class handler(BaseHTTPRequestHandler):
    """
    Vercel Python serverless function handler.
    Must inherit from BaseHTTPRequestHandler.
    """
    
    def do_OPTIONS(self):
        """Handle CORS preflight requests."""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def do_POST(self):
        """Handle POST requests."""
        try:
            # Read request body
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length)
            body_str = body.decode('utf-8')
            
            if not body_str:
                body_str = '{}'
            
            body_data = json.loads(body_str)
            
            # Extract and validate fields
            name = body_data.get('name', '').strip()
            email = body_data.get('email', '').strip()
            message = body_data.get('message', '').strip()
            
            # Validation
            if not name or len(name) < 1 or len(name) > 100:
                self.send_response(422)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({
                    'success': False,
                    'error': 'Validation error',
                    'message': 'Name must be between 1 and 100 characters'
                }).encode('utf-8'))
                return
            
            if not email or not validate_email(email):
                self.send_response(422)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({
                    'success': False,
                    'error': 'Validation error',
                    'message': 'Invalid email address'
                }).encode('utf-8'))
                return
            
            if not message or len(message) < 10 or len(message) > 2000:
                self.send_response(422)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({
                    'success': False,
                    'error': 'Validation error',
                    'message': 'Message must be between 10 and 2000 characters'
                }).encode('utf-8'))
                return
            
            # Log submission
            logger.info(
                f"Contact form submission: {name} ({email}) - {len(message)} chars"
            )
            
            # Send success response
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({
                'success': True,
                'message': "Thank you for your message. We'll get back to you soon!"
            }).encode('utf-8'))
            
        except json.JSONDecodeError as e:
            logger.warning(f"JSON decode error: {e}")
            self.send_response(400)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({
                'success': False,
                'error': 'Invalid JSON',
                'message': 'Invalid request format'
            }).encode('utf-8'))
        except Exception as e:
            logger.error(f"Error processing contact form: {e}", exc_info=True)
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({
                'success': False,
                'error': 'Internal server error',
                'message': 'An error occurred processing your message. Please try again later.'
            }).encode('utf-8'))
    
    def log_message(self, format, *args):
        """Override to use our logger instead of stderr."""
        logger.info(f"{format % args}")

