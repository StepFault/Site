import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Returns a Supabase client with the service-role key for use in Route Handlers
 * and other server-only contexts. Bypasses RLS.
 *
 * Returns null if required env vars are missing so callers can return 503
 * instead of throwing during request handling.
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    return null;
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
