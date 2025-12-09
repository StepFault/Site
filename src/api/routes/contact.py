"""Contact form API routes."""

from fastapi import APIRouter, HTTPException, status
from fastapi.responses import JSONResponse
import logging

from src.api.schemas.contact import ContactRequest, ContactResponse
from src.services.core.contact_service import ContactService

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/v1", tags=["contact"])

contact_service = ContactService()


@router.post(
    "/contact",
    response_model=ContactResponse,
    status_code=status.HTTP_200_OK,
    summary="Submit contact form",
    description="Submit a contact form with name, email, and message",
)
async def submit_contact(contact_request: ContactRequest) -> ContactResponse:
    """
    Handle contact form submission.
    
    Validates the input and processes the contact form submission.
    
    Args:
        contact_request: Contact form data (name, email, message)
        
    Returns:
        ContactResponse with success status and message
        
    Raises:
        HTTPException: If validation fails or processing error occurs
    """
    try:
        result = await contact_service.process_contact_submission(contact_request)
        return ContactResponse(**result)
    except ValueError as e:
        logger.warning(f"Validation error in contact form: {e}")
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=str(e)
        )
    except Exception as e:
        logger.error(f"Error processing contact form: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred processing your message. Please try again later."
        )

