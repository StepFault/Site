"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldPath, type Resolver } from "react-hook-form";
import { CircleCheck, CircleX, Loader2, Lock } from "lucide-react";
import {
  ContactIntakeSchema,
  type ContactIntakeInput,
  type ContactIntakePayload,
  ENGAGEMENT_BUDGET_OPTIONS,
  FUNDING_STAGE_OPTIONS,
} from "@/lib/validation/contact-intake";

const LOADING_PHASES = [
  { key: "auth", label: "Verifying corporate identity signal..." },
  { key: "queue", label: "Encrypting intake payload for principal queue..." },
] as const;

const PHASE_MS = 900;

const inputRow =
  "flex w-full min-w-0 flex-1 bg-transparent font-mono text-sm text-zinc-200 " +
  "placeholder:text-zinc-700 focus:outline-none disabled:opacity-40 caret-emerald-400";

const selectRow =
  inputRow +
  " cursor-pointer rounded-sm border border-zinc-800/80 bg-zinc-950/80 py-1.5 pl-2 pr-8 " +
  "appearance-none bg-[length:1rem_1rem] bg-[right_0.35rem_center] bg-no-repeat " +
  "hover:border-zinc-700 focus:border-zinc-600";

type PhaseKey = (typeof LOADING_PHASES)[number]["key"] | null;

function TerminalField({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-3">
        <span className="shrink-0 font-mono text-xs text-zinc-500 select-none">
          {label}
        </span>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
      <div className="mt-1.5 h-px bg-zinc-800" />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1.5 flex items-center gap-1.5 font-mono text-xs text-red-400"
        >
          <CircleX className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
          {error}
        </motion.p>
      )}
    </div>
  );
}

export type EngagementIntakeFormProps = {
  variant?: "page" | "embedded";
  /** Homepage intake: run staged terminal status while POST is in flight. */
  showLoadingPhases?: boolean;
};

export default function EngagementIntakeForm({
  variant = "page",
  showLoadingPhases = false,
}: EngagementIntakeFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");
  const [phase, setPhase] = useState<PhaseKey>(null);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactIntakeInput, unknown, ContactIntakePayload>({
    resolver: zodResolver(
      ContactIntakeSchema
    ) as Resolver<ContactIntakeInput, unknown, ContactIntakePayload>,
    defaultValues: {
      executiveName: "",
      company: "",
      corporateEmail: "",
      fundingStage: "",
      immediateTechnicalHurdle: "",
      engagementBudgetRange: "",
    },
  });

  const runLoadingPhases = useCallback((): Promise<void> => {
    return new Promise((resolve) => {
      let i = 0;
      const step = () => {
        if (i >= LOADING_PHASES.length) {
          setPhase(null);
          resolve();
          return;
        }
        setPhase(LOADING_PHASES[i].key);
        i++;
        setTimeout(step, PHASE_MS);
      };
      step();
    });
  }, []);

  const applyServerFieldErrors = useCallback(
    (details: { field: string; message: string }[]) => {
      const keys = new Set<FieldPath<ContactIntakeInput>>([
        "executiveName",
        "company",
        "corporateEmail",
        "fundingStage",
        "immediateTechnicalHurdle",
        "engagementBudgetRange",
      ]);
      for (const d of details) {
        if (keys.has(d.field as FieldPath<ContactIntakeInput>)) {
          setError(d.field as FieldPath<ContactIntakeInput>, {
            type: "server",
            message: d.message,
          });
        }
      }
    },
    [setError]
  );

  const onSubmit = async (data: ContactIntakePayload) => {
    setServerError("");

    const post = fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).catch(() => null);

    const res = showLoadingPhases
      ? (await Promise.all([runLoadingPhases(), post]))[1]
      : await post;

    if (!res) {
      setServerError("Network error. Please try again.");
      return;
    }

    const json = (await res.json().catch(() => null)) as
      | { success: true; message?: string }
      | { success: false; error?: string; details?: { field: string; message: string }[] }
      | null;

    if (!json) {
      setServerError("Invalid response from server.");
      return;
    }

    if (json.success) {
      setSubmitted(true);
      reset();
      return;
    }

    if (json.details?.length) {
      applyServerFieldErrors(json.details);
    }
    setServerError(json.error ?? "Submission failed. Please try again.");
  };

  const busy = isSubmitting || (showLoadingPhases && phase !== null);
  const phaseLabel = LOADING_PHASES.find((p) => p.key === phase)?.label ?? "";

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-md border border-emerald-400/25 bg-emerald-400/[0.04] p-8"
      >
        <div className="font-mono text-sm leading-relaxed">
          <p className="flex items-center gap-2 text-zinc-500">
            <Lock className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
            $ stepfault intake --status --classified
          </p>
          <p className="mt-3 flex items-center gap-2 text-emerald-400">
            <CircleCheck className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
            Intake committed successfully.
          </p>
          <p className="mt-2 text-zinc-400">
            Your submission is queued for principal review. Only funded-scope
            engagements are accepted; you will hear back if there is alignment.
          </p>
          {variant === "page" && (
            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-700 bg-zinc-900 px-5 py-2.5 font-mono text-sm text-zinc-200 transition-colors hover:border-emerald-500/50 hover:bg-zinc-800 hover:text-emerald-400"
              >
                <span aria-hidden>←</span>
                Back to home
              </Link>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="font-mono text-sm text-zinc-500 underline decoration-zinc-600 underline-offset-2 transition-colors hover:text-zinc-200 hover:decoration-zinc-500"
              >
                Submit another intake
              </button>
            </div>
          )}
          {variant === "embedded" && (
            <p className="mt-6 text-xs text-zinc-600">
              Stepfault · Secure engagement gateway
            </p>
          )}
        </div>
      </motion.div>
    );
  }

  const chromeTitle =
    variant === "embedded"
      ? "stepfault-intake, technical-audit.v1"
      : "stepfault-secure-intake, funded-clients.v2";

  return (
    <div className="rounded-md border border-zinc-800 bg-zinc-950 shadow-[0_0_0_1px_rgba(24,24,27,0.4)]">
      <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        <span className="ml-3 font-mono text-xs text-zinc-500">{chromeTitle}</span>
      </div>

      <div className="border-b border-zinc-800 px-5 py-4 sm:px-6 sm:py-5">
        <p className="font-mono text-sm text-zinc-500">
          <span className="text-emerald-400">$</span> stepfault intake
          --gate=funded --require-corporate-email
        </p>
        <p className="mt-2 font-mono text-xs leading-relaxed text-zinc-600">
          Restricted channel. Corporate email required. All fields audited before
          queue admission.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 px-5 py-6 sm:space-y-6 sm:px-6 sm:py-7"
        noValidate
      >
        <TerminalField label="EXEC_NAME____" error={errors.executiveName?.message}>
          <input
            type="text"
            autoComplete="name"
            disabled={busy}
            placeholder="Principal or technical executive"
            className={inputRow}
            {...register("executiveName")}
          />
        </TerminalField>

        <TerminalField label="COMPANY______" error={errors.company?.message}>
          <input
            type="text"
            autoComplete="organization"
            disabled={busy}
            placeholder="Legal entity or operating company"
            className={inputRow}
            {...register("company")}
          />
        </TerminalField>

        <TerminalField label="CORP_EMAIL___" error={errors.corporateEmail?.message}>
          <input
            type="email"
            autoComplete="email"
            disabled={busy}
            placeholder="you@institution.com"
            className={inputRow}
            {...register("corporateEmail")}
          />
        </TerminalField>

        <TerminalField label="FUND_STAGE__" error={errors.fundingStage?.message}>
          <select
            disabled={busy}
            className={selectRow}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2371717a' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
            }}
            {...register("fundingStage")}
          >
            <option value="">Select funding stage</option>
            {FUNDING_STAGE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </TerminalField>

        <TerminalField
          label="TECH_HURDLE__"
          error={errors.immediateTechnicalHurdle?.message}
        >
          <textarea
            rows={variant === "embedded" ? 4 : 5}
            disabled={busy}
            placeholder="Systems constraints, compliance boundaries, timeline, and failure modes..."
            className={`${inputRow} resize-none leading-relaxed`}
            {...register("immediateTechnicalHurdle")}
          />
        </TerminalField>

        <TerminalField
          label="BUDGET_BAND__"
          error={errors.engagementBudgetRange?.message}
        >
          <select
            disabled={busy}
            className={selectRow}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2371717a' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
            }}
            {...register("engagementBudgetRange")}
          >
            <option value="">Select engagement budget range</option>
            {ENGAGEMENT_BUDGET_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </TerminalField>

        <AnimatePresence>
          {serverError && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-start gap-2 rounded border border-red-400/20 bg-red-400/5 px-4 py-3 font-mono text-xs text-red-400"
            >
              <CircleX className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
              {serverError}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
          <AnimatePresence mode="wait">
            {showLoadingPhases && phase ? (
              <motion.span
                key={phase}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 6 }}
                transition={{ duration: 0.18 }}
                className="flex items-center gap-2 font-mono text-xs text-zinc-500"
              >
                <Loader2
                  className="h-3.5 w-3.5 shrink-0 animate-spin text-emerald-400"
                  strokeWidth={2}
                  aria-hidden
                />
                {phaseLabel}
              </motion.span>
            ) : (
              <motion.span
                key="idle-hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-mono text-xs text-zinc-700"
              >
                {busy
                  ? "Transmitting secure payload..."
                  : "Review before commit — submissions are logged."}
              </motion.span>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={busy}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-400 px-6 py-2.5 font-mono text-xs font-medium text-black transition-colors hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {busy ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={2} aria-hidden />
                Processing…
              </>
            ) : (
              <>
                <Lock className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                Commit secure intake
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
