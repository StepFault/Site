# Vercel Configuration Fix

## Problem

Build error: `Function Runtimes must have a valid version, for example now-php@1.0.0`

The `functions` configuration in `vercel.json` was using an invalid format:
```json
{
  "functions": {
    "api/contact.py": {
      "runtime": "python3.12"  // ❌ Invalid format
    }
  }
}
```

## Solution

Removed the `functions` configuration entirely. Vercel will:
- **Auto-detect** Python files in the `api/` folder
- **Auto-serve** static files from the root
- **No configuration needed** for simple deployments

## New Configuration

```json
{}
```

Empty `vercel.json` - Vercel handles everything automatically.

## How It Works

1. **Static Files**: Automatically served from root (`index.html`, `assets/`)
2. **Python Functions**: Auto-detected from `api/*.py` files
3. **Function Endpoint**: `/api/contact.py` (matches file path)

## After Deployment

The function should be:
- Detected in Vercel Functions tab
- Accessible at `/api/contact.py`
- Static site served correctly

---

**Status**: Fixed - Vercel will auto-detect everything! ✅

