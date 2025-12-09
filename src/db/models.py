"""Database models for contact form submissions."""

from datetime import datetime
from typing import Optional
from uuid import UUID
from pydantic import BaseModel, Field


class ContactSubmission(BaseModel):
    """Model for contact form submission."""
    
    id: Optional[UUID] = None
    name: str = Field(..., max_length=100)
    email: str = Field(..., max_length=255)
    message: str = Field(..., min_length=10, max_length=2000)
    created_at: Optional[datetime] = None
    status: str = Field(default="new", pattern="^(new|read|replied)$")
    
    class Config:
        from_attributes = True

