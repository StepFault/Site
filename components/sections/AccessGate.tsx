"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface FormState {
  name: string;
  email: string;
  useCase: string;
}

type Status = "idle" | "authenticating" | "transmitting" | "success" | "error";

interface FieldError {
  field: string;
  message: string;
}

// ── Loading phase sequence ─────────────────────────────────────────────────────
// Each phase is shown in sequence while the fetch is in-flight.

const LOADING_PHASES: { status: Status; label: string }[] = [
  { status: "authenticating", label: "Authenticating request origin..." },
  { status: "transmitting", label: "Transmitting request to MAPOS queue..." },
];

const PHASE_DURATION_MS = 1200;

// ── Helpers ───────────────────────────────────────────────────────────────────

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-xs text-zinc-500 select-none">
      {children}
    </span>
  );
}

function FieldError({ message }: { message: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-1 font-mono text-xs text-red-400"
    >
      ✗ {message}
    </motion.p>
  );
}

const inputBase =
  "w-full bg-transparent font-mono text-sm text-zinc-200 placeholder:text-zinc-700 " +
  "focus:outline-none disabled:opacity-40 caret-emerald-400";

// ── Component ─────────────────────────────────────────────────────────────────

export default function AccessGate() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", useCase: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [loadingLabel, setLoadingLabel] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldError[]>([]);
  const [serverError, setServerError] = useState("");

  const isLoading = status === "authenticating" || status === "transmitting";
  const fieldError = (f: string) => fieldErrors.find((e) => e.field === f)?.message;

  const clearFieldError = (field: string) =>
    setFieldErrors((prev) => prev.filter((e) => e.field !== field));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    clearFieldError(name === "useCase" ? "message" : name);
  };

  // Runs through the two loading phases sequentially, then resolves once all
  // phases complete. This gives the UI something to animate while the fetch
  // is in-flight — and ensures the sequence always plays in full.
  const runLoadingSequence = (): Promise<void> => {
    return new Promise((resolve) => {
      let i = 0;
      const step = () => {
        if (i >= LOADING_PHASES.length) {
          resolve();
          return;
        }
        const phase = LOADING_PHASES[i];
        setStatus(phase.status);
        setLoadingLabel(phase.label);
        i++;
        setTimeout(step, PHASE_DURATION_MS);
      };
      step();
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors([]);
    setServerError("");

    // Run animated loading sequence concurrently with the fetch so both
    // complete before we update the final status.
    const [, res] = await Promise.all([
      runLoadingSequence(),
      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.useCase,
        }),
      }).catch(() => null),
    ]);

    if (!res) {
      setStatus("error");
      setServerError("Network error. Please try again.");
      return;
    }

    const data = await res.json().catch(() => null);

    if (data?.success) {
      setStatus("success");
    } else {
      setStatus("error");
      if (data?.details?.length) {
        setFieldErrors(data.details);
      } else {
        setServerError(data?.error ?? "Submission failed. Please try again.");
      }
    }
  };

  // ── Success state ──────────────────────────────────────────────────────────
  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-md border border-zinc-800 bg-zinc-950 p-8"
      >
        <div className="font-mono text-sm leading-relaxed">
          <p className="text-zinc-500">$ mapos access-request --status</p>
          <p className="mt-2 text-emerald-400">✓ Request received.</p>
          <p className="mt-1 text-zinc-400">
            Your application has been queued for review.
          </p>
          <p className="mt-1 text-zinc-400">
            Expect contact within{" "}
            <span className="text-zinc-200">24–48 hours</span>.
          </p>
          <p className="mt-4 text-zinc-600">
            — Stepfault MAPOS Access Control
          </p>
        </div>
      </motion.div>
    );
  }

  // ── Form state ─────────────────────────────────────────────────────────────
  return (
    <div className="rounded-md border border-zinc-800 bg-zinc-950">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
        <span className="ml-3 font-mono text-xs text-zinc-500">
          mapos-access-control — request sandbox
        </span>
      </div>

      {/* Prompt header */}
      <div className="border-b border-zinc-800 px-6 py-5">
        <p className="font-mono text-sm text-zinc-500">
          <span className="text-emerald-400">$</span> mapos request-access
          --sandbox --tier=limited-preview
        </p>
        <p className="mt-2 font-mono text-xs text-zinc-600">
          Fields marked with <span className="text-zinc-400">_</span> are
          required. Tab to advance.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
        {/* Name */}
        <div>
          <div className="flex items-baseline gap-3">
            <FieldLabel>NAME_________</FieldLabel>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              disabled={isLoading}
              autoComplete="name"
              placeholder="Full name"
              className={inputBase}
            />
          </div>
          <div className="mt-1 h-px bg-zinc-800" />
          {fieldError("name") && <FieldError message={fieldError("name")!} />}
        </div>

        {/* Institutional Email */}
        <div>
          <div className="flex items-baseline gap-3">
            <FieldLabel>EMAIL________</FieldLabel>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              disabled={isLoading}
              autoComplete="email"
              placeholder="institutional@org.com"
              className={inputBase}
            />
          </div>
          <div className="mt-1 h-px bg-zinc-800" />
          {fieldError("email") && <FieldError message={fieldError("email")!} />}
        </div>

        {/* Use Case */}
        <div>
          <div className="flex items-start gap-3">
            <FieldLabel>USE_CASE_____</FieldLabel>
            <textarea
              name="useCase"
              value={form.useCase}
              onChange={handleChange}
              disabled={isLoading}
              rows={3}
              placeholder="Describe the high-stakes domain or workflow you intend to orchestrate..."
              className={`${inputBase} resize-none`}
            />
          </div>
          <div className="mt-1 h-px bg-zinc-800" />
          {fieldError("message") && (
            <FieldError message={fieldError("message")!} />
          )}
        </div>

        {/* Server error */}
        <AnimatePresence>
          {status === "error" && serverError && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="rounded border border-red-400/20 bg-red-400/5 px-4 py-3 font-mono text-xs text-red-400"
            >
              ✗ {serverError}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit row */}
        <div className="flex items-center justify-between pt-2">
          {/* Loading label */}
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.span
                key={loadingLabel}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.2 }}
                className="font-mono text-xs text-zinc-500"
              >
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="mr-2 inline-block text-emerald-400"
                >
                  ▸
                </motion.span>
                {loadingLabel}
              </motion.span>
            ) : (
              <motion.span
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-mono text-xs text-zinc-700"
              >
                {status === "error" ? "Retry when ready." : "Ready to transmit."}
              </motion.span>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={isLoading}
            className="rounded bg-emerald-400 px-5 py-2 font-mono text-xs text-black transition-colors hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isLoading ? "Processing..." : "Transmit Request"}
          </button>
        </div>
      </form>
    </div>
  );
}
