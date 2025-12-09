# Testing Locally with FastAPI

## Current Status

Node.js v12 is too old for Vercel CLI, so we're using FastAPI for local testing.

## Start the Server

```bash
cd /home/lroyland/Desktop/Stepfault/Site
source .venv/bin/activate
uvicorn src.api.main:app --reload --port 8000
```

## Access the Site

- **Homepage**: http://localhost:8000
- **Contact Form API**: http://localhost:8000/api/contact
- **API Documentation**: http://localhost:8000/api/docs

## Test the Contact Form

1. Visit http://localhost:8000
2. Fill out and submit the contact form
3. Check terminal for submission logs
4. Should see success message

## What Works

✅ Full FastAPI backend  
✅ Contact form submission  
✅ Form validation  
✅ CORS configured  
✅ Static files served  

## Note

The frontend JavaScript calls `/api/contact.py` for Vercel, but FastAPI serves it at `/api/contact`. The FastAPI server has an alias route that should handle this.

---

**For Vercel testing**: Wait for the deployment to complete, or upgrade Node.js to >= 18 for `vercel dev`.

