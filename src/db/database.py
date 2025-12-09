"""Database connection and operations for Supabase PostgreSQL."""

import logging
from typing import Optional
from uuid import UUID
import asyncpg
from contextlib import asynccontextmanager

from src.config import settings
from src.db.models import ContactSubmission

logger = logging.getLogger(__name__)

# Global connection pool
_pool: Optional[asyncpg.Pool] = None


async def get_pool() -> asyncpg.Pool:
    """Get or create database connection pool."""
    global _pool
    if _pool is None:
        if not settings.supabase_db_url:
            raise ValueError("SUPABASE_DB_URL environment variable is not set")
        
        _pool = await asyncpg.create_pool(
            settings.supabase_db_url,
            min_size=1,
            max_size=5,
            command_timeout=5,
        )
        logger.info("Database connection pool created")
    return _pool


async def close_pool():
    """Close database connection pool."""
    global _pool
    if _pool:
        await _pool.close()
        _pool = None
        logger.info("Database connection pool closed")


@asynccontextmanager
async def get_connection():
    """Get a database connection from the pool."""
    pool = await get_pool()
    async with pool.acquire() as connection:
        yield connection


async def save_contact_submission(submission: ContactSubmission) -> ContactSubmission:
    """
    Save a contact form submission to the database.
    
    Args:
        submission: ContactSubmission model
        
    Returns:
        ContactSubmission with generated ID and timestamp
    """
    pool = await get_pool()
    
    async with pool.acquire() as conn:
        row = await conn.fetchrow(
            """
            INSERT INTO contact_submissions (name, email, message, status)
            VALUES ($1, $2, $3, $4)
            RETURNING id, name, email, message, created_at, status
            """,
            submission.name,
            submission.email,
            submission.message,
            submission.status,
        )
        
        logger.info(f"Saved contact submission with ID: {row['id']}")
        
        return ContactSubmission(
            id=row['id'],
            name=row['name'],
            email=row['email'],
            message=row['message'],
            created_at=row['created_at'],
            status=row['status'],
        )


async def get_contact_submission(submission_id: UUID) -> Optional[ContactSubmission]:
    """Get a contact submission by ID."""
    pool = await get_pool()
    
    async with pool.acquire() as conn:
        row = await conn.fetchrow(
            """
            SELECT id, name, email, message, created_at, status
            FROM contact_submissions
            WHERE id = $1
            """,
            submission_id,
        )
        
        if row:
            return ContactSubmission(
                id=row['id'],
                name=row['name'],
                email=row['email'],
                message=row['message'],
                created_at=row['created_at'],
                status=row['status'],
            )
        return None

