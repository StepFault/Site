# Database & Email Integration Recommendations

## Free Database Options

### 🏆 **Recommended: Supabase** (Best Overall)
**Why it's perfect for this project:**
- ✅ **100% Free tier** (500MB database, 2GB bandwidth/month)
- ✅ **PostgreSQL** (industry standard, reliable)
- ✅ **Serverless-friendly** (works great with Vercel)
- ✅ **Easy setup** (5 minutes to get started)
- ✅ **Built-in REST API** (optional, we'll use direct SQL)
- ✅ **Real-time subscriptions** (if needed later)
- ✅ **Row-level security** (built-in security)
- ✅ **No credit card required** for free tier

**Setup Steps:**
1. Sign up at https://supabase.com
2. Create new project
3. Get connection string from Settings → Database
4. Add to `.env` file
5. Done!

**Pricing:** Free forever (up to 500MB, then $25/month)

---

### 🚀 **Alternative: Neon** (Serverless PostgreSQL)
**Why consider it:**
- ✅ **Free tier** (0.5GB storage, unlimited projects)
- ✅ **True serverless** (auto-scales to zero)
- ✅ **Branching** (like Git for databases)
- ✅ **Fast cold starts**
- ✅ **PostgreSQL 15+**

**Pricing:** Free forever (0.5GB), then $19/month

---

### ⚡ **Alternative: Turso** (Edge Database)
**Why consider it:**
- ✅ **Free tier** (500 databases, 1GB storage)
- ✅ **SQLite-based** (familiar SQL)
- ✅ **Global edge network** (very fast)
- ✅ **Lightweight** (perfect for serverless)

**Pricing:** Free forever (1GB), then $29/month

---

## Email Integration: Zoho Mail

### Setup Requirements
1. **Zoho SMTP Credentials:**
   - SMTP Server: `smtp.zoho.com`
   - Port: `587` (TLS) or `465` (SSL)
   - Requires: Email address + App Password (not regular password)

2. **App Password Setup:**
   - Go to Zoho Account → Security → App Passwords
   - Generate new app password for "Mail"
   - Use this as password in SMTP config

3. **Email Options:**
   - **Option A:** Send notification to your work email when form is submitted
   - **Option B:** Send auto-reply to the person who submitted the form
   - **Option C:** Both (recommended)

---

## Recommended Architecture

### Database: **Supabase PostgreSQL**
- Store all contact form submissions
- Track submission timestamp
- Optional: Add status field (new, read, replied)

### Email: **Zoho SMTP**
- Send notification email to you when form is submitted
- Optional: Send auto-reply to submitter

### Implementation Plan:
1. Set up Supabase database
2. Create `contact_submissions` table
3. Update `ContactService` to save to database
4. Update Vercel function to use database
5. Add Zoho email notification
6. Add environment variables
7. Test end-to-end

---

## Database Schema

```sql
CREATE TABLE contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied'))
);

CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);
```

---

## Environment Variables Needed

```env
# Supabase Database
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
SUPABASE_DB_URL=postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres

# Zoho Email
ZOHO_EMAIL=your-email@yourdomain.com
ZOHO_PASSWORD=your-app-password
ZOHO_SMTP_HOST=smtp.zoho.com
ZOHO_SMTP_PORT=587
NOTIFICATION_EMAIL=your-email@yourdomain.com
```

---

## Next Steps

1. **Choose database:** Supabase (recommended) or Neon/Turso
2. **Set up account** and get credentials
3. **Create database table** (I'll provide SQL)
4. **Add dependencies** to `requirements.txt`
5. **Update service** to save submissions
6. **Add email notifications** via Zoho
7. **Test locally** then deploy

---

## Questions to Answer

1. **Which database?** (I recommend Supabase)
2. **Email notifications?** 
   - Send to you when form submitted? ✅
   - Send auto-reply to submitter? (optional)
3. **Admin dashboard?** (future - view submissions in a web interface)

Let me know your preferences and I'll implement it! 🚀

