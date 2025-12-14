# Contact Form Troubleshooting Guide

## Issue: Auto-reply works but database and notification email don't

### Symptoms
- ✅ Auto-reply email is received by submitter
- ❌ No entry in Supabase database
- ❌ No notification email received

### Root Cause
Errors are being caught and logged, but the form still returns success. This means:
1. Database connection might be failing silently
2. Notification email might be failing silently
3. Environment variables might not be set in Vercel

### Solution Steps

#### 1. Check Vercel Environment Variables

Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**

Make sure these are set for **Production**, **Preview**, and **Development**:

```
SUPABASE_DB_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres
ZOHO_EMAIL=your-email@yourdomain.com
ZOHO_PASSWORD=your-app-password
ZOHO_SMTP_HOST=smtp.zoho.com
ZOHO_SMTP_PORT=587
NOTIFICATION_EMAIL=your-email@yourdomain.com
```

#### 2. Run Diagnostic Script

```bash
# On your local machine
source .venv/bin/activate
python scripts/diagnose_contact_form.py
```

This will check:
- Environment variables
- Database connection
- Email configuration
- Full flow test

#### 3. Check Vercel Function Logs

1. Go to **Vercel Dashboard** → Your Project
2. Click on **Functions** tab
3. Find `/api/contact.py`
4. Click on it to see execution logs
5. Look for error messages like:
   - "SUPABASE_DB_URL environment variable is not set"
   - "Failed to save to database"
   - "Failed to send notification email"

#### 4. Test Database Connection

```bash
python scripts/test_database.py
```

If this fails, your `SUPABASE_DB_URL` is incorrect.

#### 5. Verify Environment Variables in Vercel

The code now reads directly from `os.environ`, so make sure:
- Variables are set in Vercel dashboard (not just `.env` file)
- Variable names match exactly (case-sensitive in some contexts)
- No extra spaces or quotes in values

### Common Issues

#### Issue: "SUPABASE_DB_URL environment variable is not set"
**Solution:** Set `SUPABASE_DB_URL` in Vercel environment variables

#### Issue: Database connection timeout
**Solution:** 
- Check connection string format
- Verify Supabase project is active
- Check if IP is whitelisted (if required)

#### Issue: "NOTIFICATION_EMAIL not set"
**Solution:** Set `NOTIFICATION_EMAIL` in Vercel environment variables

#### Issue: Email authentication fails
**Solution:**
- Verify `ZOHO_PASSWORD` is an **App Password**, not regular password
- Check `ZOHO_EMAIL` is correct
- Verify SMTP port (587 for TLS, 465 for SSL)

### After Fixing

1. **Redeploy** on Vercel (or wait for auto-deploy)
2. **Test** the contact form again
3. **Check** Vercel function logs for any remaining errors
4. **Verify** database entry appears in Supabase
5. **Verify** notification email is received

### Debugging Tips

- Check Vercel function logs immediately after submission
- Use the diagnostic script to test locally
- Compare local `.env` with Vercel environment variables
- Test database connection separately with `test_database.py`

---

**Last Updated:** 2025-01-09

