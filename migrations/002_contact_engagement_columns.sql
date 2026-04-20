-- Extend contact_submissions for executive intake (funded-client gatekeeper form).
-- Run in Supabase SQL editor after 001_create_contact_submissions.sql.

ALTER TABLE contact_submissions
  ADD COLUMN IF NOT EXISTS company VARCHAR(200),
  ADD COLUMN IF NOT EXISTS funding_stage VARCHAR(100),
  ADD COLUMN IF NOT EXISTS budget_range VARCHAR(100);

COMMENT ON COLUMN contact_submissions.company IS 'Organization name (executive intake)';
COMMENT ON COLUMN contact_submissions.funding_stage IS 'Normalized funding stage key';
COMMENT ON COLUMN contact_submissions.budget_range IS 'Normalized engagement budget band key';
