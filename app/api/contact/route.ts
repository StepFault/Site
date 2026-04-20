import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { sendContactNotification } from "@/lib/email";
import {
  ContactIntakeSchema,
  type ContactIntakePayload,
} from "@/lib/validation/contact-intake";

export const runtime = "nodejs";

type SuccessBody = {
  success: true;
  message: string;
};

type ErrorBody = {
  success: false;
  error: string;
  details?: { field: string; message: string }[];
};

function flattenZodError(
  err: ZodError
): { field: string; message: string }[] {
  return err.issues.map((issue) => ({
    field: issue.path.join(".") || "root",
    message: issue.message,
  }));
}

export async function POST(
  req: NextRequest
): Promise<NextResponse<SuccessBody | ErrorBody>> {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json<ErrorBody>(
      { success: false, error: "Request body must be valid JSON." },
      { status: 400 }
    );
  }

  const parsed = ContactIntakeSchema.safeParse(raw);
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

  const data: ContactIntakePayload = parsed.data;

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    console.error("[contact] Missing Supabase env vars in this environment.");
    return NextResponse.json<ErrorBody>(
      {
        success: false,
        error:
          "Contact service is temporarily unavailable. Please try again later.",
      },
      { status: 503 }
    );
  }

  const row = {
    name: data.executiveName,
    email: data.corporateEmail,
    message: data.immediateTechnicalHurdle,
    company: data.company,
    funding_stage: data.fundingStage,
    budget_range: data.engagementBudgetRange,
  };

  const { error: dbError } = await supabase
    .from("contact_submissions")
    .insert(row);

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

  sendContactNotification(data).catch((err: unknown) => {
    console.error("[contact] Email notification failed:", err);
  });

  return NextResponse.json<SuccessBody>(
    {
      success: true,
      message:
        "Intake received. A principal will review your submission and respond if there is a mutual fit.",
    },
    { status: 200 }
  );
}
