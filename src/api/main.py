"""FastAPI application main entry point."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import logging
import os

from src.config import settings
from src.api.routes import contact

# Configure logging
logging.basicConfig(
    level=getattr(logging, settings.log_level.upper()),
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)

# Create FastAPI app
app = FastAPI(
    title="StepFault API",
    description="Creative AI & Quantum Computing Solutions",
    version="0.1.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

# Configure CORS
cors_origins = settings.allowed_origins
if settings.debug:
    cors_origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(contact.router)

# Add alias route for /api/contact (Vercel compatibility)
# This allows the frontend to work with both local FastAPI and Vercel serverless
from src.api.routes.contact import submit_contact
from src.api.schemas.contact import ContactRequest, ContactResponse

@app.post(
    "/api/contact",
    response_model=ContactResponse,
    status_code=200,
    include_in_schema=False,  # Don't show in docs since it's an alias
)
async def submit_contact_alias(contact_request: ContactRequest) -> ContactResponse:
    """Alias endpoint for /api/contact (local development)."""
    return await submit_contact(contact_request)

@app.post(
    "/api/contact.py",
    response_model=ContactResponse,
    status_code=200,
    include_in_schema=False,  # Don't show in docs since it's an alias
)
async def submit_contact_vercel_alias(contact_request: ContactRequest) -> ContactResponse:
    """Alias endpoint for /api/contact.py (Vercel compatibility for local testing)."""
    return await submit_contact(contact_request)

# Mount static files (assets folder)
app.mount("/assets", StaticFiles(directory="assets"), name="assets")


def _get_project_root() -> str:
    """Get the project root directory."""
    return os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


@app.get("/", include_in_schema=False)
async def read_root():
    """Serve the main index.html file."""
    project_root = _get_project_root()
    index_path = os.path.join(project_root, "index.html")
    return FileResponse(index_path, media_type="text/html")


@app.get("/index.html", include_in_schema=False)
async def read_index():
    """Serve the main index.html file (explicit path)."""
    project_root = _get_project_root()
    index_path = os.path.join(project_root, "index.html")
    return FileResponse(index_path, media_type="text/html")


@app.get("/privacy-policy.html", include_in_schema=False)
async def privacy_policy():
    """Serve the privacy policy page."""
    project_root = _get_project_root()
    privacy_path = os.path.join(project_root, "privacy-policy.html")
    if not os.path.exists(privacy_path):
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Privacy policy page not found")
    return FileResponse(privacy_path, media_type="text/html")


@app.get("/terms-of-service.html", include_in_schema=False)
async def terms_of_service():
    """Serve the terms of service page."""
    project_root = _get_project_root()
    terms_path = os.path.join(project_root, "terms-of-service.html")
    if not os.path.exists(terms_path):
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Terms of service page not found")
    return FileResponse(terms_path, media_type="text/html")


@app.get("/health", tags=["health"])
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "environment": settings.environment
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "src.api.main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.debug,
    )

