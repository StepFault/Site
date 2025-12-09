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
    """Alias endpoint for /api/contact (Vercel compatibility)."""
    return await submit_contact(contact_request)

# Mount static files (assets folder)
app.mount("/assets", StaticFiles(directory="assets"), name="assets")


@app.get("/", include_in_schema=False)
async def read_root():
    """Serve the main index.html file."""
    project_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    index_path = os.path.join(project_root, "index.html")
    return FileResponse(index_path)


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

