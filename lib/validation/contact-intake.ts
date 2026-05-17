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
  "rapid_mvp",
  "fractional_sprint",
  "enterprise_setup",
] as const;

export type EngagementBudgetValue = (typeof ENGAGEMENT_BUDGET_VALUES)[number];

export const ENGAGEMENT_BUDGET_OPTIONS: readonly {
  value: EngagementBudgetValue;
  label: string;
}[] = [
  { value: "rapid_mvp", label: "Rapid MVP ($1.5k - $5k)" },
  { value: "fractional_sprint", label: "Fractional Sprint ($5k - $10k)" },
  { value: "enterprise_setup", label: "Enterprise Setup ($10k+)" },
] as const;

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
    .min(1, "Email is required.")
    .email("Enter a valid email address."),
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
