#!/usr/bin/env python3
"""Quick script to test database connection."""

import asyncio
import sys
import os

# Add src to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from src.db.database import get_pool, close_pool, save_contact_submission
from src.db.models import ContactSubmission


async def test_connection():
    """Test database connection and table."""
    print("🔍 Testing Supabase database connection...")
    
    try:
        # Test connection
        pool = await get_pool()
        print("✅ Database connection pool created successfully!")
        
        # Test query - check if table exists
        async with pool.acquire() as conn:
            result = await conn.fetchval(
                """
                SELECT COUNT(*) FROM contact_submissions
                """
            )
            print(f"✅ Table 'contact_submissions' exists! Current row count: {result}")
        
        # Test insert
        print("\n🧪 Testing insert operation...")
        test_submission = ContactSubmission(
            name="Test User",
            email="test@example.com",
            message="This is a test submission to verify the database connection works correctly.",
            status="new"
        )
        
        saved = await save_contact_submission(test_submission)
        print(f"✅ Test submission saved with ID: {saved.id}")
        print(f"   Created at: {saved.created_at}")
        
        # Clean up test data (optional)
        async with pool.acquire() as conn:
            await conn.execute(
                "DELETE FROM contact_submissions WHERE email = 'test@example.com'"
            )
        print("🧹 Test data cleaned up")
        
        await close_pool()
        print("\n✅ All database tests passed!")
        return True
        
    except Exception as e:
        print(f"\n❌ Database test failed: {e}")
        print("\nTroubleshooting:")
        print("1. Check that SUPABASE_DB_URL is correct in .env")
        print("2. Verify the database password is correct")
        print("3. Make sure the table was created (run the migration SQL)")
        print("4. Check that your Supabase project is active")
        return False


if __name__ == "__main__":
    success = asyncio.run(test_connection())
    sys.exit(0 if success else 1)

