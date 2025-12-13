# Local Testing Guide

## Quick Test - Static Site Only

### Option 1: Python HTTP Server (Simplest)

```bash
cd /home/lroyland/Desktop/Stepfault/Site
python3 -m http.server 3000
```

Then visit: http://localhost:3000

**Note**: This only serves static files. The contact form won't work (no API endpoint).

### Option 2: Vercel CLI (Full Simulation)

This simulates the actual Vercel environment including serverless functions:

```bash
# Install Vercel CLI (if not installed)
npm install -g vercel

# Run local dev server
vercel dev
```

This will:
- Serve static files
- Run the Python serverless function locally
- Simulate the Vercel environment

### Option 3: FastAPI Server (Full Backend)

If you want to test with the full FastAPI backend:

```bash
# Activate virtual environment
source .venv/bin/activate

# Run FastAPI server
uvicorn src.api.main:app --reload --port 8000
```

Then visit: http://localhost:8000

## Testing the Contact Form

### With Vercel CLI (`vercel dev`)
- Form should work at `/api/contact.py`
- Full Vercel environment simulation

### With FastAPI Server
- Form should work at `/api/contact` or `/api/v1/contact`
- Full backend with all features

### With Python HTTP Server
- Form will fail (no backend)
- Good for testing static HTML/CSS/JS only

## Current Status

I've started a Python HTTP server on port 3000 for quick static testing.

---

**For full testing**: Use `vercel dev` to test the serverless function locally!

