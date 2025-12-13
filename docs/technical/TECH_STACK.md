# Technology Stack Specification

## Frontend

### Core Technologies
- **HTML5** - Semantic markup
- **CSS3** - Styling (currently using custom CSS, no framework)
- **Vanilla JavaScript (ES6+)** - No frameworks required for this static site
  - Modern JavaScript features (async/await, fetch API, etc.)
  - No build step needed for frontend

### Current Frontend Structure
- `index.html` - Main page
- `assets/style.css` - All styles
- `assets/script.js` - All JavaScript (when we add it back)

## Backend (For Contact Form & Future Features)

### Primary Framework: FastAPI
- **FastAPI** - Modern, fast Python web framework
  - Version: Latest stable (0.109.0+)
  - Why: Async support, automatic API docs, type hints, excellent performance
  - Perfect for API endpoints and future backend features

### Supporting Libraries
- **Pydantic** - Data validation and settings management
  - Version: 2.5.3+
  - Used for: Request/response models, configuration management
- **Uvicorn** - ASGI server for FastAPI
  - Version: 0.27.0+
  - Used for: Running FastAPI in development and production
- **python-dotenv** - Environment variable management
  - Version: 1.0.0+
  - Used for: Loading .env files

### Validation & Utilities
- **email-validator** - Email validation
  - Version: 2.1.0+
  - Used for: Contact form email validation
- **httpx** - HTTP client (for future external API calls)
  - Version: 0.26.0+
  - Used for: Making HTTP requests to external services

## Deployment

### Current: Vercel
- **Vercel** - Static site hosting + serverless functions
  - Static files: Automatically served
  - Serverless functions: Python functions in `api/` folder
  - No build configuration needed for static files

### Future: Dedicated Server (Optional)
- **Uvicorn** - Production ASGI server
- **Gunicorn + Uvicorn Workers** - For production deployments
- **Nginx** - Reverse proxy (if needed)

## Development Tools

### Testing
- **pytest** - Testing framework
  - Version: 7.4.4+
- **pytest-asyncio** - Async test support
  - Version: 0.23.3+
- **pytest-cov** - Coverage reporting
  - Version: 7.0.0+
- **httpx** - Test client for FastAPI

### Code Quality
- **Black** - Code formatter
  - Version: 24.1.1+
- **Ruff** - Fast Python linter
  - Version: 0.1.11+

## Python Version
- **Python 3.10+** (3.11 or 3.12 recommended)

## Package Management
- **pip** - Standard Python package manager
- **requirements.txt** - Dependency specification
- **Virtual Environment** - `.venv/` for isolation

## What We Will NOT Use

- ❌ **Django** - Too heavy for this project
- ❌ **Flask** - FastAPI is preferred for modern async support
- ❌ **React/Vue/Angular** - Not needed for this static site
- ❌ **Webpack/Vite** - No build step needed for frontend
- ❌ **TypeScript** - Vanilla JavaScript is sufficient
- ❌ **Tailwind/Bootstrap** - Custom CSS is fine

## Project Structure

```
Site/
├── index.html              # Main page
├── assets/                 # Static assets
│   ├── style.css           # All styles
│   ├── script.js           # All JavaScript
│   └── [images, etc.]      # Other assets
├── api/                    # Vercel serverless functions (if needed)
│   └── contact.py          # Contact form handler
├── src/                    # FastAPI application (for local dev)
│   ├── api/
│   │   ├── main.py         # FastAPI app
│   │   ├── routes/         # API routes
│   │   └── schemas/        # Pydantic models
│   ├── services/           # Business logic
│   └── config.py           # Configuration
├── tests/                  # Test suite
├── docs/                   # Documentation
├── requirements.txt        # Python dependencies
└── vercel.json            # Vercel configuration (if needed)
```

## Key Principles

1. **Keep it simple** - No unnecessary frameworks or build tools
2. **Static first** - Static site with optional backend features
3. **FastAPI for APIs** - When backend is needed, use FastAPI
4. **Vercel for deployment** - Leverage Vercel's static + serverless capabilities
5. **Type safety** - Use Pydantic for data validation
6. **Async by default** - FastAPI's async support for performance

---

**This is the official tech stack specification for the StepFault project.**

