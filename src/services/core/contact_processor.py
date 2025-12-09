"""Shared contact form processing logic for both FastAPI and Vercel."""

import asyncio
import logging
from typing import Dict

from src.db.database import save_contact_submission, get_pool, close_pool
from src.db.models import ContactSubmission
from src.services.email.zoho_service import ZohoEmailService

logger = logging.getLogger(__name__)


async def process_contact_submission_async(
    name: str,
    email: str,
    message: str,
) -> Dict[str, str]:
    """
    Process a contact form submission asynchronously.
    
    Saves to database and sends email notifications.
    This function can be used by both FastAPI and Vercel.
    
    Args:
        name: Submitter's name
        email: Submitter's email
        message: Message content
        
    Returns:
        Dictionary with success status and message
    """
    logger.info(f"Processing contact submission from {name} ({email})")
    
    try:
        # Create database model
        submission = ContactSubmission(
            name=name,
            email=email,
            message=message,
            status="new",
        )
        
        # Save to database
        try:
            saved_submission = await save_contact_submission(submission)
            logger.info(
                f"Contact submission saved to database with ID: {saved_submission.id}"
            )
        except Exception as db_error:
            # Log database error but don't fail the request
            logger.error(
                f"Failed to save to database: {db_error}",
                exc_info=True
            )
            # Continue processing even if database save fails
        
        # Send emails (non-blocking, don't fail if they error)
        email_service = ZohoEmailService()
        
        # Send notification email
        try:
            await email_service.send_notification(
                submitter_name=name,
                submitter_email=email,
                message=message,
            )
        except Exception as email_error:
            logger.warning(
                f"Failed to send notification email: {email_error}",
                exc_info=True
            )
        
        # Send auto-reply to submitter
        try:
            await email_service.send_auto_reply(
                recipient_name=name,
                recipient_email=email,
            )
        except Exception as email_error:
            logger.warning(
                f"Failed to send auto-reply email: {email_error}",
                exc_info=True
            )
        
        return {
            "success": True,
            "message": "Thank you for your message. We'll get back to you soon!",
        }
        
    except Exception as e:
        logger.error(
            f"Error processing contact submission: {e}",
            exc_info=True
        )
        # Still return success to user even if there's an internal error
        return {
            "success": True,
            "message": "Thank you for your message. We'll get back to you soon!",
        }


def process_contact_submission_sync(
    name: str,
    email: str,
    message: str,
) -> Dict[str, str]:
    """
    Process a contact form submission synchronously (for Vercel).
    
    This wraps the async function for use in synchronous contexts.
    
    Args:
        name: Submitter's name
        email: Submitter's email
        message: Message content
        
    Returns:
        Dictionary with success status and message
    """
    try:
        # Get or create event loop
        try:
            loop = asyncio.get_event_loop()
        except RuntimeError:
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)
        
        # Run async function
        result = loop.run_until_complete(
            process_contact_submission_async(name, email, message)
        )
        
        return result
        
    except Exception as e:
        logger.error(f"Error in sync wrapper: {e}", exc_info=True)
        return {
            "success": True,
            "message": "Thank you for your message. We'll get back to you soon!",
        }

