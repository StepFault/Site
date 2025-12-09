# Database & Email Setup Guide

## Step 1: Set Up Supabase Database

### 1.1 Create Supabase Account
1. Go to https://supabase.com
2. Sign up for a free account (no credit card required)
3. Create a new project
4. Wait for project to be provisioned (~2 minutes)

### 1.2 Get Database Credentials
1. Go to **Settings** → **API**
2. Copy:
   - **Project URL** → `SUPABASE_URL`
   - **anon public** key → `SUPABASE_KEY` (for client-side, optional)
   - **service_role** key → `SUPABASE_KEY` (for server-side, recommended)

### 1.3 Get Database Connection String
1. Go to **Settings** → **Database**
2. Scroll to **Connection string** section
3. Select **URI** tab
4. Copy the connection string
5. Replace `[YOUR-PASSWORD]` with your database password
6. This is your `SUPABASE_DB_URL`

**Format:**
```
postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

### 1.4 Create Database Table
1. Go to **SQL Editor** in Supabase dashboard
2. Click **New query**
3. Copy and paste the SQL from `migrations/001_create_contact_submissions.sql`
4. Click **Run** (or press Ctrl+Enter)
5. Verify table was created:
   - Go to **Table Editor**
   - You should see `contact_submissions` table

---

## Step 2: Set Up Zoho Mail

### 2.1 Generate App Password
1. Log in to your Zoho account
2. Go to **Account Settings** → **Security**
3. Find **App Passwords** section
4. Click **Generate New Password**
5. Select **Mail** as the app
6. Give it a name (e.g., "StepFault Contact Form")
7. **Copy the generated password** (you won't see it again!)

### 2.2 Configure SMTP Settings
- **SMTP Host:** `smtp.zoho.com`
- **SMTP Port:** `587` (TLS) or `465` (SSL)
- **Email:** Your Zoho email address
- **Password:** The app password you just generated (NOT your regular password!)

---

## Step 3: Configure Environment Variables

### 3.1 Local Development (.env file)
Create a `.env` file in the project root:

```env
# Application
DEBUG=true
ENVIRONMENT=development
LOG_LEVEL=INFO

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-service-role-key
SUPABASE_DB_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres

# Zoho Mail
ZOHO_EMAIL=your-email@yourdomain.com
ZOHO_PASSWORD=your-app-password
ZOHO_SMTP_HOST=smtp.zoho.com
ZOHO_SMTP_PORT=587
NOTIFICATION_EMAIL=your-email@yourdomain.com
```

### 3.2 Vercel Production
1. Go to your Vercel project dashboard
2. Go to **Settings** → **Environment Variables**
3. Add all the variables from `.env.example`
4. Make sure to set them for **Production**, **Preview**, and **Development**

**Important:** 
- Use the **service_role** key for `SUPABASE_KEY` in production (not anon key)
- Never commit `.env` file to git!

---

## Step 4: Test the Setup

### 4.1 Test Database Connection
```bash
# Install dependencies
pip install -r requirements.txt

# Test database connection (you can create a simple test script)
python -c "
import asyncio
from src.db.database import get_pool, close_pool

async def test():
    pool = await get_pool()
    print('✅ Database connection successful!')
    await close_pool()

asyncio.run(test())
"
```

### 4.2 Test Email (Optional)
You can test email separately, but the easiest way is to submit the contact form and check:
1. Your notification email inbox
2. The submitter's inbox (for auto-reply)
3. Supabase table editor (to see the saved submission)

---

## Troubleshooting

### Database Connection Issues
- **Error: "connection refused"**
  - Check that `SUPABASE_DB_URL` is correct
  - Verify password is correct (no brackets in actual password)
  - Check Supabase project is active

- **Error: "authentication failed"**
  - Verify password in connection string
  - Try resetting database password in Supabase

### Email Issues
- **Error: "authentication failed"**
  - Make sure you're using **App Password**, not regular password
  - Verify email address is correct
  - Check SMTP port (587 for TLS, 465 for SSL)

- **Emails not sending**
  - Check Vercel function logs for errors
  - Verify all email environment variables are set
  - Test SMTP connection separately

### Vercel Deployment Issues
- **Function timeout**
  - Database/email operations might be slow
  - Check Vercel function logs
  - Consider increasing timeout in Vercel settings

- **Import errors**
  - Make sure all dependencies are in `requirements.txt`
  - Check that `api/contact.py` can import from `src/`

---

## Verification Checklist

- [ ] Supabase project created
- [ ] Database table created (`contact_submissions`)
- [ ] Connection string obtained and tested
- [ ] Zoho app password generated
- [ ] Environment variables set locally (`.env`)
- [ ] Environment variables set in Vercel
- [ ] Test form submission works
- [ ] Submission appears in Supabase table
- [ ] Notification email received
- [ ] Auto-reply email sent to submitter

---

## Next Steps

Once everything is working:
1. ✅ Submissions are saved to database
2. ✅ You receive notification emails
3. ✅ Submitters receive auto-replies
4. 🔜 (Future) Admin dashboard to view submissions
5. 🔜 (Future) Mark submissions as read/replied

