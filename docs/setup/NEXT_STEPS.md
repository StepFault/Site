# Next Steps After Database Setup ✅

## ✅ Completed
- [x] Supabase database created
- [x] Database tables created (`contact_submissions`)
- [x] Environment variables configured in `.env`

## 🔄 Next Steps

### 1. Test Database Connection (Optional but Recommended)

Test that your database connection works:

```bash
# Make sure you're in the project directory
cd /home/lroyland/Desktop/Stepfault/Site

# Activate virtual environment
source .venv/bin/activate

# Install/update dependencies
pip install -r requirements.txt

# Test database connection
python scripts/test_database.py
```

**Expected output:**
```
✅ Database connection pool created successfully!
✅ Table 'contact_submissions' exists! Current row count: 0
✅ Test submission saved with ID: [uuid]
✅ All database tests passed!
```

---

### 2. Set Up Zoho Mail (Required for Email Features)

#### 2.1 Generate App Password
1. Log in to your Zoho account
2. Go to **Account Settings** → **Security**
3. Find **App Passwords** section
4. Click **Generate New Password**
5. Select **Mail** as the app
6. Give it a name (e.g., "StepFault Contact Form")
7. **Copy the generated password** (you won't see it again!)

#### 2.2 Add to .env
Add these to your `.env` file:

```env
ZOHO_EMAIL=your-email@yourdomain.com
ZOHO_PASSWORD=your-app-password-here
ZOHO_SMTP_HOST=smtp.zoho.com
ZOHO_SMTP_PORT=587
NOTIFICATION_EMAIL=your-email@yourdomain.com
```

**Important:** 
- Use the **App Password**, not your regular Zoho password
- `NOTIFICATION_EMAIL` is where you'll receive notifications when forms are submitted

---

### 3. Configure Vercel Environment Variables

Before deploying, add all environment variables to Vercel:

1. Go to **Vercel Dashboard** → Your Project
2. Go to **Settings** → **Environment Variables**
3. Add each variable from your `.env` file:
   - `SUPABASE_URL`
   - `SUPABASE_KEY`
   - `SUPABASE_DB_URL`
   - `ZOHO_EMAIL`
   - `ZOHO_PASSWORD`
   - `ZOHO_SMTP_HOST`
   - `ZOHO_SMTP_PORT`
   - `NOTIFICATION_EMAIL`
4. Set them for **Production**, **Preview**, and **Development**
5. **Important:** Use `service_role` key for `SUPABASE_KEY` in production (more secure)

---

### 4. Test Locally (Optional)

Test the full flow locally with FastAPI:

```bash
# Start FastAPI server
source .venv/bin/activate
uvicorn src.api.main:app --reload --port 8000
```

Then:
1. Open http://localhost:8000
2. Submit the contact form
3. Check:
   - Supabase table (should see new submission)
   - Your email (should receive notification)
   - Submitter's email (should receive auto-reply)

---

### 5. Deploy to Vercel

Once everything is tested locally:

1. **Commit changes:**
   ```bash
   git add .
   git commit -m "docs(setup): update database setup instructions"
   git push origin dev
   ```

2. **Merge to main:**
   ```bash
   git checkout main
   git merge dev
   git push origin main
   ```

3. **Vercel will auto-deploy** (or trigger manually via deployment hook)

4. **Test on production:**
   - Submit form on live site
   - Verify submission in Supabase
   - Check emails are sent

---

## Testing Checklist

Before deploying to production, verify:

- [ ] Database connection works (`python scripts/test_database.py`)
- [ ] Zoho email credentials configured
- [ ] All environment variables set in Vercel
- [ ] Local test submission works (if testing locally)
- [ ] Submission appears in Supabase table
- [ ] Notification email received
- [ ] Auto-reply email sent to submitter

---

## Troubleshooting

### Database Connection Issues
- Verify `SUPABASE_DB_URL` format is correct
- Check password doesn't have special characters that need URL encoding
- Ensure table exists in Supabase

### Email Issues
- Make sure you're using **App Password**, not regular password
- Verify SMTP settings are correct
- Check Vercel function logs for email errors

### Vercel Deployment Issues
- Ensure all environment variables are set
- Check Vercel function logs
- Verify dependencies are in `requirements.txt`

---

**Ready to proceed?** Let me know when you've set up Zoho Mail and we can test everything! 🚀


