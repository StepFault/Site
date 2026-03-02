import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";
import { createClient } from "@supabase/supabase-js";
import { sendContactNotification } from "@/lib/email";

// ── Zod schema ────────────────────────────────────────────────────────────────
// Mirrors the Python Pydantic ContactRequest schema exactly.

const ContactSchema = z.object({
  name: z
    .string({ error: "Name is required." })
    .trim()
    .min(1, "Name is required.")
    .max(100, "Name must be 100 characters or less."),
  email: z
    .string({ error: "Email is required." })
    .email("Invalid email address."),
  message: z
    .string({ error: "Message is required." })
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(2000, "Message must be 2000 characters or less."),
});

type ContactPayload = z.infer<typeof ContactSchema>;

// ── Typed response bodies ─────────────────────────────────────────────────────

type SuccessBody = {
  success: true;
  message: string;
};

type ErrorBody = {
  success: false;
  error: string;
  details?: { field: string; message: string }[];
};

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Admin Supabase client using the service-role key.
 * Bypasses RLS — safe here because this is a server-only Route Handler.
 * Created per-request; at serverless scale there is no persistent connection to pool.
 */
function supabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing Supabase env vars: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY"
    );
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}

function flattenZodError(
  err: ZodError
): { field: string; message: string }[] {
  return err.issues.map((issue) => ({
    field: issue.path.join(".") || "root",
    message: issue.message,
  }));
}

// ── POST /api/contact ─────────────────────────────────────────────────────────

export async function POST(
  req: NextRequest
): Promise<NextResponse<SuccessBody | ErrorBody>> {
  // 1 ── Parse JSON body
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json<ErrorBody>(
      { success: false, error: "Request body must be valid JSON." },
      { status: 400 }
    );
  }

  // 2 ── Validate with Zod
  const parsed = ContactSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json<ErrorBody>(
      {
        success: false,
        error: "Validation failed.",
        details: flattenZodError(parsed.error),
      },
      { status: 422 }
    );
  }

  const { name, email, message }: ContactPayload = parsed.data;

  // 3 ── Persist to Supabase `contact_submissions`
  const { error: dbError } = await supabaseAdmin()
    .from("contact_submissions")
    .insert({ name, email, message });

  if (dbError) {
    console.error("[contact] Supabase insert error:", dbError.message);
    return NextResponse.json<ErrorBody>(
      {
        success: false,
        error: "Failed to save your submission. Please try again later.",
      },
      { status: 500 }
    );
  }

  // 4 ── Send internal email notification (fire-and-forget)
  // Email failure must never block a successful DB write from returning 200.
  sendContactNotification({ name, email, message }).catch((err: unknown) => {
    console.error("[contact] Email notification failed:", err);
  });

  return NextResponse.json<SuccessBody>(
    {
      success: true,
      message: "Thank you for your message. We'll be in touch soon.",
    },
    { status: 200 }
  );
}
