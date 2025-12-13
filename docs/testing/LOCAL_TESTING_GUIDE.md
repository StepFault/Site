# Local Testing Guide - Dev Branch

## Quick Start

### 1. Ensure You're on Dev Branch
```bash
git checkout dev
git pull origin dev
```

### 2. Activate Virtual Environment
```bash
source .venv/bin/activate
```

### 3. Install/Update Dependencies (if needed)
```bash
pip install -r requirements.txt
```

### 4. Start FastAPI Server
```bash
uvicorn src.api.main:app --reload --port 8000
```

### 5. Open in Browser
- **Main Site**: http://localhost:8000
- **API Docs**: http://localhost:8000/api/docs
- **Health Check**: http://localhost:8000/health

---

## Testing the Contact Form

### Test Valid Submission
1. Go to http://localhost:8000
2. Scroll to "Contact Us" section
3. Fill out the form:
   - Name: Test User
   - Email: test@example.com
   - Message: This is a test message with at least 10 characters
4. Click "Send Message"
5. Check:
   - ✅ Success message appears
   - ✅ Form resets
   - ✅ Check database (Supabase) for new submission
   - ✅ Check email inbox for notification

### Test Validation Errors
1. Try submitting with:
   - Empty fields
   - Invalid email format
   - Message less than 10 characters
2. Verify error messages appear

### Test API Directly
```bash
# Test with curl
curl -X POST http://localhost:8000/api/contact.py \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message"
  }'
```

---

## Environment Variables

Make sure your `.env` file has all required variables:

```env
# Database
SUPABASE_DB_URL=postgresql://...

# Email
ZOHO_EMAIL=your-email@domain.com
ZOHO_PASSWORD=your-app-password
ZOHO_SMTP_HOST=smtp.zoho.com
ZOHO_SMTP_PORT=587
NOTIFICATION_EMAIL=your-email@domain.com

# Application
DEBUG=true
ENVIRONMENT=development
LOG_LEVEL=INFO
ALLOWED_ORIGINS=http://localhost:8000
```

---

## Stopping the Server

Press `Ctrl+C` in the terminal where uvicorn is running, or:

```bash
pkill -f uvicorn
```

---

## Troubleshooting

### Port Already in Use
If port 8000 is busy:
```bash
# Use a different port
uvicorn src.api.main:app --reload --port 8001
```

### Import Errors
```bash
# Make sure you're in the project root
cd /home/lroyland/Desktop/Stepfault/Site

# Reinstall dependencies
pip install -r requirements.txt
```

### Database Connection Issues
```bash
# Test database connection
python scripts/test_database.py
```

### CORS Issues
- Check `ALLOWED_ORIGINS` in `.env`
- Should include `http://localhost:8000` for local testing

---

## What to Test Before Merging to Main

- [ ] Contact form submits successfully
- [ ] Validation errors display correctly
- [ ] Database saves submissions
- [ ] Email notifications are sent
- [ ] Auto-reply emails are sent
- [ ] CORS headers are correct
- [ ] No console errors in browser
- [ ] Mobile menu works
- [ ] All static assets load correctly

---

## Next Steps After Testing

If everything works:
1. Merge `dev` to `main`: `git checkout main && git merge dev`
2. Push to main: `git push origin main`
3. Vercel will auto-deploy from `main` branch

