#!/usr/bin/env python3
"""Quick script to test database connection."""

import asyncio
import logging
import sys
import os

# Add src to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from src.db.database import get_pool, close_pool, save_contact_submission
from src.db.models import ContactSubmission

# Configure logging for test script
logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s: %(message)s"
)
logger = logging.getLogger(__name__)


async def test_connection():
    """Test database connection and table."""
    logger.info("🔍 Testing Supabase database connection...")
    
    try:
        # Test connection
        pool = await get_pool()
        logger.info("✅ Database connection pool created successfully!")
        
        # Test query - check if table exists
        async with pool.acquire() as conn:
            result = await conn.fetchval(
                """
                SELECT COUNT(*) FROM contact_submissions
                """
            )
            logger.info(f"✅ Table 'contact_submissions' exists! Current row count: {result}")
        
        # Test insert
        logger.info("\n🧪 Testing insert operation...")
        test_submission = ContactSubmission(
            name="Test User",
            email="test@example.com",
            message="This is a test submission to verify the database connection works correctly.",
            status="new"
        )
        
        saved = await save_contact_submission(test_submission)
        logger.info(f"✅ Test submission saved with ID: {saved.id}")
        logger.info(f"   Created at: {saved.created_at}")
        
        # Clean up test data (optional)
        async with pool.acquire() as conn:
            await conn.execute(
                "DELETE FROM contact_submissions WHERE email = 'test@example.com'"
            )
        logger.info("🧹 Test data cleaned up")
        
        await close_pool()
        logger.info("\n✅ All database tests passed!")
        return True
        
    except Exception as e:
        logger.error(f"\n❌ Database test failed: {e}")
        logger.error("\nTroubleshooting:")
        logger.error("1. Check that SUPABASE_DB_URL is correct in .env")
        logger.error("2. Verify the database password is correct")
        logger.error("3. Make sure the table was created (run the migration SQL)")
        logger.error("4. Check that your Supabase project is active")
        return False


if __name__ == "__main__":
    success = asyncio.run(test_connection())
    sys.exit(0 if success else 1)


