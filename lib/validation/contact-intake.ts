import { z } from "zod";

/** Canonical values stored in DB / API (snake_case strings). */
export const FUNDING_STAGE_VALUES = [
  "pre_seed_bootstrapped",
  "seed",
  "series_a_plus",
  "enterprise_government",
] as const;

export type FundingStageValue = (typeof FUNDING_STAGE_VALUES)[number];

export const FUNDING_STAGE_OPTIONS: readonly {
  value: FundingStageValue;
  label: string;
}[] = [
  { value: "pre_seed_bootstrapped", label: "Pre-Seed / Bootstrapped" },
  { value: "seed", label: "Seed" },
  { value: "series_a_plus", label: "Series A+" },
  { value: "enterprise_government", label: "Enterprise / Government" },
] as const;

/** Highest-commitment options first (gatekeeper ordering). */
export const ENGAGEMENT_BUDGET_VALUES = [
  "fractional_cto_retainer",
  "50k_plus",
  "25k_50k",
  "10k_25k",
] as const;

export type EngagementBudgetValue = (typeof ENGAGEMENT_BUDGET_VALUES)[number];

export const ENGAGEMENT_BUDGET_OPTIONS: readonly {
  value: EngagementBudgetValue;
  label: string;
}[] = [
  { value: "fractional_cto_retainer", label: "Fractional CTO Retainer" },
  { value: "50k_plus", label: "$50k+" },
  { value: "25k_50k", label: "$25k–$50k" },
  { value: "10k_25k", label: "$10k–$25k" },
] as const;

const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "yahoo.co.uk",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "icloud.com",
  "me.com",
  "proton.me",
  "protonmail.com",
  "aol.com",
]);

function isCorporateEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase().trim();
  if (!domain) return false;
  return !FREE_EMAIL_DOMAINS.has(domain);
}

export const ContactIntakeSchema = z.object({
  executiveName: z
    .string()
    .trim()
    .min(1, "Executive name is required.")
    .max(120, "Executive name must be 120 characters or less."),
  company: z
    .string()
    .trim()
    .min(1, "Company is required.")
    .max(200, "Company must be 200 characters or less."),
  corporateEmail: z
    .string()
    .trim()
    .min(1, "Corporate email is required.")
    .email("Enter a valid email address.")
    .refine(isCorporateEmail, {
      message:
        "Use a corporate email domain (personal inboxes such as Gmail are not accepted for intake).",
    }),
  fundingStage: z.preprocess(
    (v) => (v === "" || v === undefined ? undefined : v),
    z.enum(FUNDING_STAGE_VALUES, {
      error: "Select your current funding stage.",
    })
  ),
  immediateTechnicalHurdle: z
    .string()
    .trim()
    .min(20, "Describe the technical hurdle in at least 20 characters.")
    .max(4000, "Maximum 4000 characters."),
  engagementBudgetRange: z.preprocess(
    (v) => (v === "" || v === undefined ? undefined : v),
    z.enum(ENGAGEMENT_BUDGET_VALUES, {
      error: "Select an engagement budget range.",
    })
  ),
});

/** Raw form values (e.g. empty strings before enum selection). */
export type ContactIntakeInput = z.input<typeof ContactIntakeSchema>;

/** Validated payload POSTed to `/api/contact` and persisted. */
export type ContactIntakePayload = z.output<typeof ContactIntakeSchema>;
