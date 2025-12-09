"""Contact form request/response schemas."""

from pydantic import BaseModel, EmailStr, Field, field_validator


class ContactRequest(BaseModel):
    """Contact form submission request model."""
    
    name: str = Field(
        ...,
        min_length=1,
        max_length=100,
        description="Contact name",
        examples=["John Doe"]
    )
    email: EmailStr = Field(
        ...,
        description="Contact email address",
        examples=["john.doe@example.com"]
    )
    message: str = Field(
        ...,
        min_length=10,
        max_length=2000,
        description="Contact message",
        examples=["I'm interested in learning more about your quantum computing services."]
    )

    @field_validator("name")
    @classmethod
    def validate_name(cls, v: str) -> str:
        """Validate and clean name field."""
        name = v.strip()
        if not name:
            raise ValueError("Name cannot be empty")
        if len(name) > 100:
            raise ValueError("Name must be 100 characters or less")
        return name

    @field_validator("message")
    @classmethod
    def validate_message(cls, v: str) -> str:
        """Validate and clean message field."""
        message = v.strip()
        if len(message) < 10:
            raise ValueError("Message must be at least 10 characters long")
        if len(message) > 2000:
            raise ValueError("Message must be 2000 characters or less")
        return message


class ContactResponse(BaseModel):
    """Contact form submission response model."""
    
    success: bool = Field(
        ...,
        description="Whether the submission was successful",
        examples=[True]
    )
    message: str = Field(
        ...,
        description="Response message to the user",
        examples=["Thank you for your message. We'll get back to you soon!"]
    )

