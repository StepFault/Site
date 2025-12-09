# Finding Your Supabase Connection String

## Quick Method: Connect Button

1. In your Supabase project dashboard, look for a **"Connect"** button (usually at the top)
2. Click it to see connection options
3. Look for **"Connection string"** or **"URI"** format
4. Copy the string that looks like:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT].supabase.co:5432/postgres
   ```
5. Replace `[YOUR-PASSWORD]` with your actual database password

## Alternative: Manual Construction

If you can't find the connection string in the UI, you can build it manually:

### Step 1: Get Your Project Reference
- Look at your `SUPABASE_URL` from Settings → API
- Example: `https://abcdefghijklmnop.supabase.co`
- The project reference is: `abcdefghijklmnop`

### Step 2: Get Your Database Password
- This is the password you set when you reset the database password
- NOT your Supabase account password
- If you forgot it, reset it again in Settings → Database

### Step 3: Construct the Connection String

**Format:**
```
postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

**Example:**
If your:
- Project reference: `abcdefghijklmnop`
- Database password: `mypassword123`

Then your connection string is:
```
postgresql://postgres:mypassword123@db.abcdefghijklmnop.supabase.co:5432/postgres
```

## For Vercel/Serverless (Optional)

If you're deploying to Vercel, you might want to use the **Transaction mode** connection string instead:
- Look for **"Connection pooling"** → **"Transaction mode"** in the Connect section
- This is optimized for serverless functions

## Common Issues

**"Connection refused"**
- Check that your password doesn't have special characters that need URL encoding
- Make sure you're using the database password, not your account password

**"Authentication failed"**
- Verify the password is correct
- Try resetting the database password again

**Can't find connection string**
- Try the "Connect" button at the top of the dashboard
- Or use the manual construction method above
- The UI location may vary by Supabase version

