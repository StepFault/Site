import { z } from "zod";

/**
 * Structured outputs for human/sub-agent turns (Path A: not executed by a runtime router).
 * Validate assistant payloads with `.safeParse()` before treating them as authoritative.
 */

export const uiUxWorkerOutputSchema = z.object({
  worker: z.literal("ui_ux"),
  summary: z.string().max(2000),
  proposed_files: z.array(
    z.object({
      path: z.string().min(1),
      rationale: z.string().max(500),
    }),
  ),
  design_constraints: z
    .object({
      dark_mode_only: z.boolean().optional(),
      accent_usage: z.enum(["emerald", "blue"]).optional(),
    })
    .optional(),
});

export const dataStateWorkerOutputSchema = z.object({
  worker: z.literal("data_state"),
  scope: z.enum(["schema", "migration", "api_validation", "read_model"]),
  tables_or_resources: z.array(z.string().min(1)),
  zod_or_typescript_notes: z.string().max(8000).optional(),
  supabase_rls_notes: z.string().max(4000).optional(),
  rollback_notes: z.string().max(2000).optional(),
});

export const httpMethodSchema = z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]);

export const integrationApiWorkerOutputSchema = z.object({
  worker: z.literal("integration_api"),
  route: z.object({
    method: httpMethodSchema,
    path: z.string().min(1),
  }),
  env_vars_required: z.array(z.string().min(1)),
  auth_pattern: z
    .enum(["none", "service_role", "oauth2", "api_key_vault", "other"])
    .optional(),
  failure_modes: z.array(
    z.object({
      condition: z.string().max(500),
      http_status_or_code: z.string().max(64),
      remediation: z.string().max(1000),
    }),
  ),
});

export type UiUxWorkerOutput = z.infer<typeof uiUxWorkerOutputSchema>;
export type DataStateWorkerOutput = z.infer<typeof dataStateWorkerOutputSchema>;
export type IntegrationApiWorkerOutput = z.infer<typeof integrationApiWorkerOutputSchema>;
