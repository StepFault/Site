"""
Vercel serverless function for contact form submissions.

This function handles POST requests to /api/contact.py and processes
contact form submissions. It uses Pydantic validation (same as FastAPI)
to ensure consistent validation logic.
"""

from http.server import BaseHTTPRequestHandler
import json
import logging
import os
import sys

# Add src to path for imports
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from pydantic import ValidationError
from src.api.schemas.contact import ContactRequest
from src.config import settings
from src.services.core.contact_processor import process_contact_submission_sync

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def _get_cors_origin() -> str:
    """Get CORS origin from settings or default to * for development."""
    if settings.debug or not settings.allowed_origins:
        return '*'
    # For production, use first allowed origin or * if empty
    origins = settings.allowed_origins if isinstance(settings.allowed_origins, list) else [settings.allowed_origins]
    return origins[0] if origins else '*'


class handler(BaseHTTPRequestHandler):
    """
    Vercel Python serverless function handler.
    Must inherit from BaseHTTPRequestHandler.
    """
    
    def _send_json_response(
        self, 
        status_code: int, 
        data: dict, 
        cors_origin: str = None
    ) -> None:
        """
        Helper method to send JSON response with CORS headers.
        
        Args:
            status_code: HTTP status code
            data: Dictionary to serialize as JSON
            cors_origin: CORS origin header value (defaults to settings)
        """
        if cors_origin is None:
            cors_origin = _get_cors_origin()
        
        self.send_response(status_code)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', cors_origin)
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode('utf-8'))
    
    def do_OPTIONS(self):
        """Handle CORS preflight requests."""
        cors_origin = _get_cors_origin()
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', cors_origin)
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
            
            # Validate using Pydantic schema (same as FastAPI)
            try:
                contact_request = ContactRequest(**body_data)
            except ValidationError as e:
                # Extract first validation error message
                error_messages = [err['msg'] for err in e.errors()]
                error_message = error_messages[0] if error_messages else 'Validation error'
                
                logger.warning(f"Validation error: {error_message}")
                self._send_json_response(422, {
                    'success': False,
                    'error': 'Validation error',
                    'message': error_message
                })
                return
            
            # Process submission (save to database and send emails)
            logger.info(
                f"Contact form submission: {contact_request.name} "
                f"({contact_request.email}) - {len(contact_request.message)} chars"
            )
            
            try:
                # Process submission (database + emails)
                result = process_contact_submission_sync(
                    name=contact_request.name,
                    email=contact_request.email,
                    message=contact_request.message,
                )
                
                # Send success response
                self._send_json_response(200, result)
                
            except Exception as process_error:
                # Log error but still return success to user
                logger.error(
                    f"Error processing submission: {process_error}",
                    exc_info=True
                )
                self._send_json_response(200, {
                    'success': True,
                    'message': "Thank you for your message. We'll get back to you soon!"
                })
            
        except json.JSONDecodeError as e:
            logger.warning(f"JSON decode error: {e}")
            self._send_json_response(400, {
                'success': False,
                'error': 'Invalid JSON',
                'message': 'Invalid request format'
            })
        except Exception as e:
            logger.error(f"Error processing contact form: {e}", exc_info=True)
            self._send_json_response(500, {
                'success': False,
                'error': 'Internal server error',
                'message': 'An error occurred processing your message. Please try again later.'
            })
    
    def log_message(self, format, *args):
        """Override to use our logger instead of stderr."""
        logger.info(f"{format % args}")

