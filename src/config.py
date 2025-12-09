"""Application configuration management using Pydantic settings."""

from pydantic_settings import BaseSettings
from typing import List
from pydantic import Field, field_validator


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    debug: bool = False
    environment: str = "production"
    log_level: str = "INFO"
    host: str = "0.0.0.0"
    port: int = 8000
    allowed_origins: List[str] = Field(default_factory=lambda: ["http://localhost:8000"])

    class Config:
        env_file = ".env"
        case_sensitive = False

        @classmethod
        def customise_sources(
            cls,
            init_settings,
            env_settings,
            dotenv_settings,
            file_secret_settings,
        ):
            return (
                dotenv_settings,
                env_settings,
                init_settings,
                file_secret_settings,
            )

    @field_validator("allowed_origins", mode="before")
    @classmethod
    def parse_allowed_origins(cls, v):
        """Parse allowed_origins from comma-separated string or list."""
        if isinstance(v, str):
            return [origin.strip() for origin in v.split(",") if origin.strip()]
        return v


settings = Settings()

