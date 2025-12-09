# Local Testing Instructions

## Current Status

✅ **Python HTTP server is running on port 3000**

Visit: **http://localhost:3000**

## What Works Locally

### ✅ Static Site (Current Server)
- HTML page loads
- CSS styles work
- JavaScript runs
- **Contact form will NOT work** (no API endpoint)

### ❌ Contact Form
The contact form won't work with the simple HTTP server because there's no backend API.

## To Test the Full Site (Including Contact Form)

### Option 1: Install Vercel CLI (Recommended)

This simulates the actual Vercel environment:

```bash
# Install Vercel CLI
npm install -g vercel

# Run local dev server (simulates Vercel)
vercel dev
```

This will:
- Serve static files
- Run the Python serverless function locally
- Make `/api/contact.py` work
- Simulate the exact Vercel environment

### Option 2: Use FastAPI Server

If you want to test with the full FastAPI backend:

```bash
# Activate virtual environment
source .venv/bin/activate

# Run FastAPI server
uvicorn src.api.main:app --reload --port 8000
```

Then visit: http://localhost:8000

## Quick Test Commands

```bash
# Check if server is running
curl http://localhost:3000

# Test static assets
curl http://localhost:3000/assets/style.css

# Stop the server (find the process)
pkill -f "python3 -m http.server"
```

## Next Steps

1. **Test static site**: Visit http://localhost:3000 (works now)
2. **Test contact form**: Install Vercel CLI and run `vercel dev`
3. **Or wait for Vercel deployment** to complete

---

**Current**: Static site is accessible at http://localhost:3000 🚀

