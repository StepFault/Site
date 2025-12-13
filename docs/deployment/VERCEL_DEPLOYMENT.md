# Vercel Deployment Guide

## Current Configuration

### Serverless Function
- **File**: `api/contact.py`
- **Format**: BaseHTTPRequestHandler class (Vercel requirement)
- **Runtime**: Python 3.12
- **Endpoint**: `/api/contact.py` (auto-detected by Vercel)

### Vercel Configuration
- **File**: `vercel.json`
- **Config**: Minimal - only specifies Python runtime
- **Static Files**: Auto-detected and served automatically

### Frontend
- **Endpoint**: `/api/contact` (works for both FastAPI and Vercel)
- FastAPI serves at `/api/contact` (alias route)
- Vercel serves at `/api/contact.py` (auto-detected)

## Deployment Process

1. **Push to GitHub**: Changes are automatically deployed
2. **Vercel Auto-Deploy**: Vercel detects changes and deploys
3. **Function Detection**: Vercel auto-detects `api/contact.py`
4. **Static Files**: Automatically served from root

## Testing on Vercel

After deployment:

1. **Visit your Vercel site**
2. **Submit the contact form**
3. **Check Vercel Function Logs**:
   - Vercel Dashboard → Deployments → Latest
   - Functions tab → `api/contact.py`
   - Logs tab → Should show submission logs

## Function Format

The function uses `BaseHTTPRequestHandler` class format:
- `do_POST()` - Handles POST requests
- `do_OPTIONS()` - Handles CORS preflight
- Proper error handling and logging
- Same validation as FastAPI backend

## Troubleshooting

If the function doesn't work:
1. Check Vercel Functions tab - is `api/contact.py` listed?
2. Check Function Logs - any errors?
3. Verify `vercel.json` is correct
4. Ensure function uses BaseHTTPRequestHandler format

---

**Status**: Ready for deployment! 🚀

