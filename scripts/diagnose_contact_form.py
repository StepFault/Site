#!/usr/bin/env python3
"""Diagnostic script to check contact form configuration and connections."""

import os
import sys
import asyncio
import logging

# Add src to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s: %(message)s"
)
logger = logging.getLogger(__name__)

def check_env_vars():
    """Check if required environment variables are set."""
    print("\n" + "="*60)
    print("ENVIRONMENT VARIABLES CHECK")
    print("="*60)
    
    required_vars = {
        "ZOHO_EMAIL": "Zoho email address",
        "ZOHO_PASSWORD": "Zoho app password",
        "ZOHO_SMTP_HOST": "Zoho SMTP host (default: smtp.zoho.com)",
        "ZOHO_SMTP_PORT": "Zoho SMTP port (default: 587)",
        "NOTIFICATION_EMAIL": "Email to receive notifications",
        "SUPABASE_DB_URL": "Supabase database connection string",
    }
    
    all_set = True
    for var, description in required_vars.items():
        value = os.environ.get(var, "")
        if value:
            # Mask sensitive values
            if "PASSWORD" in var or "DB_URL" in var:
                masked = value[:10] + "..." if len(value) > 10 else "***"
                print(f"✅ {var}: {masked} ({description})")
            else:
                print(f"✅ {var}: {value} ({description})")
        else:
            print(f"❌ {var}: NOT SET ({description})")
            all_set = False
    
    return all_set

async def test_database():
    """Test database connection."""
    print("\n" + "="*60)
    print("DATABASE CONNECTION TEST")
    print("="*60)
    
    try:
        from src.db.database import get_pool, save_contact_submission
        from src.db.models import ContactSubmission
        
        # Check if SUPABASE_DB_URL is set
        db_url = os.environ.get("SUPABASE_DB_URL", "")
        if not db_url:
            # Try from settings
            from src.config import settings
            db_url = settings.supabase_db_url
        
        if not db_url:
            print("❌ SUPABASE_DB_URL not set in environment or settings")
            return False
        
        print(f"✅ Database URL configured (length: {len(db_url)})")
        
        # Test connection
        pool = await get_pool()
        print("✅ Database connection pool created")
        
        # Test query
        async with pool.acquire() as conn:
            count = await conn.fetchval("SELECT COUNT(*) FROM contact_submissions")
            print(f"✅ Database query successful - Current submissions: {count}")
        
        return True
        
    except Exception as e:
        print(f"❌ Database test failed: {e}")
        import traceback
        traceback.print_exc()
        return False

def test_email_config():
    """Test email configuration."""
    print("\n" + "="*60)
    print("EMAIL CONFIGURATION TEST")
    print("="*60)
    
    try:
        from src.services.email.zoho_service import ZohoEmailService
        
        service = ZohoEmailService()
        
        if not service.email:
            print("❌ ZOHO_EMAIL not set")
            return False
        print(f"✅ ZOHO_EMAIL: {service.email}")
        
        if not service.password:
            print("❌ ZOHO_PASSWORD not set")
            return False
        print(f"✅ ZOHO_PASSWORD: {'*' * len(service.password)}")
        
        print(f"✅ SMTP Host: {service.smtp_host}")
        print(f"✅ SMTP Port: {service.smtp_port} ({'SSL' if service.use_ssl else 'TLS'})")
        
        if not service.notification_email:
            print("⚠️  NOTIFICATION_EMAIL not set (notification emails will be skipped)")
        else:
            print(f"✅ NOTIFICATION_EMAIL: {service.notification_email}")
        
        return True
        
    except Exception as e:
        print(f"❌ Email config test failed: {e}")
        import traceback
        traceback.print_exc()
        return False

async def test_full_flow():
    """Test the full contact form submission flow."""
    print("\n" + "="*60)
    print("FULL FLOW TEST")
    print("="*60)
    
    try:
        from src.services.core.contact_processor import process_contact_submission_async
        
        result = await process_contact_submission_async(
            name="Test User",
            email="test@example.com",
            message="This is a diagnostic test message to verify the contact form is working correctly."
        )
        
        print(f"✅ Process completed: {result}")
        print("\n⚠️  Note: Check your database and email to verify:")
        print("   1. Database entry was created in Supabase")
        print("   2. Notification email was sent to NOTIFICATION_EMAIL")
        print("   3. Auto-reply email was sent to test@example.com")
        
        return True
        
    except Exception as e:
        print(f"❌ Full flow test failed: {e}")
        import traceback
        traceback.print_exc()
        return False

async def main():
    """Run all diagnostic tests."""
    print("\n" + "="*60)
    print("CONTACT FORM DIAGNOSTIC TOOL")
    print("="*60)
    
    # Check environment variables
    env_ok = check_env_vars()
    
    # Test email config
    email_ok = test_email_config()
    
    # Test database
    db_ok = await test_database()
    
    # Full flow test (optional)
    if env_ok and email_ok and db_ok:
        print("\n" + "="*60)
        response = input("Run full flow test? (y/n): ")
        if response.lower() == 'y':
            await test_full_flow()
    
    # Summary
    print("\n" + "="*60)
    print("SUMMARY")
    print("="*60)
    print(f"Environment Variables: {'✅' if env_ok else '❌'}")
    print(f"Email Configuration: {'✅' if email_ok else '❌'}")
    print(f"Database Connection: {'✅' if db_ok else '❌'}")
    
    if not (env_ok and email_ok and db_ok):
        print("\n⚠️  Issues found! Please check:")
        if not env_ok:
            print("   - Set missing environment variables")
        if not email_ok:
            print("   - Configure Zoho email credentials")
        if not db_ok:
            print("   - Check SUPABASE_DB_URL connection string")
        print("\n   For Vercel: Set environment variables in Vercel Dashboard")
        print("   Settings → Environment Variables")

if __name__ == "__main__":
    asyncio.run(main())

