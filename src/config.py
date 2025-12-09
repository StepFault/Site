"""Application configuration management using Pydantic settings."""

from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    debug: bool = False
    environment: str = "production"
    log_level: str = "INFO"
    host: str = "0.0.0.0"
    port: int = 8000
    allowed_origins: List[str] = ["http://localhost:8000"]

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

        def __init__(self, **kwargs):
            super().__init__(**kwargs)
            # Parse ALLOWED_ORIGINS from comma-separated string if needed
            if isinstance(self.allowed_origins, str):
                self.allowed_origins = [
                    origin.strip() for origin in self.allowed_origins.split(",")
                ]


settings = Settings()

