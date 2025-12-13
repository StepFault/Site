"""Application configuration management using Pydantic settings."""

from pydantic_settings import BaseSettings
from typing import List, Union
from pydantic import Field, field_validator


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    debug: bool = False
    environment: str = "production"
    log_level: str = "INFO"
    host: str = "0.0.0.0"
    port: int = 8000
    allowed_origins: Union[str, List[str]] = Field(default="http://localhost:8000")
    
    # Database (Supabase)
    supabase_url: str = Field(default="", description="Supabase project URL")
    supabase_key: str = Field(default="", description="Supabase anon/service key")
    supabase_db_url: str = Field(default="", description="Supabase PostgreSQL connection string")
    
    # Email (Zoho)
    zoho_email: str = Field(default="", description="Zoho email address for SMTP")
    zoho_password: str = Field(default="", description="Zoho app password (not regular password)")
    zoho_smtp_host: str = Field(default="smtp.zoho.com", description="Zoho SMTP host")
    zoho_smtp_port: int = Field(default=587, description="Zoho SMTP port")
    notification_email: str = Field(default="", description="Email address to receive notifications")

    class Config:
        env_file = ".env"
        case_sensitive = False

    @field_validator("allowed_origins", mode="before")
    @classmethod
    def parse_allowed_origins(cls, v):
        """Parse allowed_origins from comma-separated string or list."""
        if v is None or v == "":
            return ["http://localhost:8000"]
        if isinstance(v, str):
            if not v.strip():
                return ["http://localhost:8000"]
            # Handle comma-separated string
            origins = [origin.strip() for origin in v.split(",") if origin.strip()]
            return origins if origins else ["http://localhost:8000"]
        if isinstance(v, list):
            return v if v else ["http://localhost:8000"]
        return ["http://localhost:8000"]
    
    @field_validator("allowed_origins", mode="after")
    @classmethod
    def ensure_list(cls, v):
        """Ensure allowed_origins is always a list."""
        if isinstance(v, str):
            return [v] if v else ["http://localhost:8000"]
        return v if isinstance(v, list) and v else ["http://localhost:8000"]


settings = Settings()

