-- Migration: Create contact_submissions table
-- Database: Supabase PostgreSQL
-- Created: 2025-01-09

CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied'))
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at 
    ON contact_submissions(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_status 
    ON contact_submissions(status);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_email 
    ON contact_submissions(email);

-- Add comment to table
COMMENT ON TABLE contact_submissions IS 'Stores contact form submissions from the website';

