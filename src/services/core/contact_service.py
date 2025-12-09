"""Contact form service for processing submissions."""

import logging
from typing import Dict

from src.api.schemas.contact import ContactRequest
from src.services.core.contact_processor import process_contact_submission_async

logger = logging.getLogger(__name__)


class ContactService:
    """Service for handling contact form submissions."""
    
    async def process_contact_submission(
        self, contact_request: ContactRequest
    ) -> Dict[str, str]:
        """
        Process a contact form submission.
        
        Saves to database and sends email notifications.
        
        Args:
            contact_request: Validated contact form data
            
        Returns:
            Dictionary with success status and message
        """
        return await process_contact_submission_async(
            name=contact_request.name,
            email=contact_request.email,
            message=contact_request.message,
        )

