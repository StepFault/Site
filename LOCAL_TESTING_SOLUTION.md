# Local Testing Solution

## Problem

Node.js v12.22.9 is too old for Vercel CLI (requires Node.js >= 18).

## Solution: Use FastAPI Server Instead

Since Vercel CLI won't work with your Node.js version, we'll test with the FastAPI server which works perfectly with Python 3.10+.

## Testing with FastAPI

### Start the Server

```bash
cd /home/lroyland/Desktop/Stepfault/Site
source .venv/bin/activate
uvicorn src.api.main:app --reload --port 8000
```

### Access the Site

- **Homepage**: http://localhost:8000
- **Contact Form**: Should work at `/api/contact` or `/api/v1/contact`
- **API Docs**: http://localhost:8000/api/docs

## What Works

✅ **Static files** - Served by FastAPI  
✅ **Contact form** - Full backend API  
✅ **CORS** - Configured for local development  
✅ **Validation** - All form validation works  
✅ **Logging** - See submissions in console  

## Test the Contact Form

1. Visit http://localhost:8000
2. Fill out the contact form
3. Submit - should work!
4. Check terminal for submission logs

## Stop the Server

Press `Ctrl+C` in the terminal running uvicorn.

---

**Status**: FastAPI server is the best option for local testing with your current Node.js version! 🚀

