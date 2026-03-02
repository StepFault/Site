"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

// Deterministic simulation sequence - every render produces identical output
const SIMULATION_SEQUENCE: LogEntry[] = [
  { type: "system", text: "MAPOS Runtime v1.0.0 initialized" },
  { type: "system", text: "Connecting to deterministic orchestration layer..." },
  { type: "success", text: "✓ Connection established" },
  { type: "blank" },
  { type: "header", text: "DATA INGESTION" },
  { type: "data", text: "→ Ingesting: regulatory_frameworks.json (2.4 MB)" },
  { type: "data", text: "→ Ingesting: case_precedents_2024.zip (12.1 MB)" },
  { type: "data", text: "→ Ingesting: compliance_matrices.yaml (847 KB)" },
  { type: "success", text: "✓ Data ingestion complete — 3 sources, 15.3 MB total" },
  { type: "blank" },
  { type: "header", text: "AGENT ROUTING" },
  { type: "route", text: "ROUTE: Agent_Legal_04 → regulatory_compliance" },
  { type: "route", text: "ROUTE: Agent_Risk_02 → risk_assessment_matrix" },
  { type: "route", text: "ROUTE: Agent_Docs_01 → precedent_analysis" },
  { type: "route", text: "ROUTE: Agent_Synth_03 → cross_domain_synthesis" },
  { type: "success", text: "✓ All agents dispatched to target domains" },
  { type: "blank" },
  { type: "header", text: "EXECUTION PIPELINE" },
  { type: "exec", text: "Executing: Agent_Legal_04.compliance_check()" },
  { type: "exec", text: "  → Output hash: 0x7a3f2e1b" },
  { type: "exec", text: "Executing: Agent_Risk_02.risk_score()" },
  { type: "exec", text: "  → Output hash: 0x4c8d9e2a" },
  { type: "exec", text: "Executing: Agent_Docs_01.precedent_match()" },
  { type: "exec", text: "  → Output hash: 0x91b2f3c8" },
  { type: "exec", text: "Executing: Agent_Synth_03.synthesize()" },
  { type: "exec", text: "  → Output hash: 0x2e4a8d1f" },
  { type: "success", text: "✓ Execution pipeline complete" },
  { type: "blank" },
  { type: "verification", text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" },
  { type: "verification", text: "STATUS: Human-in-the-Loop Verification Gate" },
  { type: "verification", text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" },
  { type: "blank" },
  { type: "pending", text: "⏸ Awaiting human verification..." },
];

type LogType =
  | "system"
  | "success"
  | "blank"
  | "header"
  | "data"
  | "route"
  | "exec"
  | "verification"
  | "pending";

interface LogEntry {
  type: LogType;
  text?: string;
}

const LINE_DELAY_MS = 80; // Deterministic timing per line
const PAUSE_AT_VERIFICATION_MS = 2000; // Pause before showing "awaiting" state

function getLogStyle(type: LogType): string {
  switch (type) {
    case "system":
      return "text-zinc-500";
    case "success":
      return "text-emerald-400";
    case "header":
      return "text-zinc-300 font-semibold tracking-wide";
    case "data":
      return "text-zinc-400";
    case "route":
      return "text-zinc-300";
    case "exec":
      return "text-zinc-400";
    case "verification":
      return "text-amber-400";
    case "pending":
      return "text-zinc-500 animate-pulse";
    case "blank":
    default:
      return "";
  }
}

export default function MaposSimulator() {
  const [lines, setLines] = useState<LogEntry[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const startSimulation = useCallback(() => {
    setLines([]);
    setIsRunning(true);
    setIsPaused(false);
  }, []);

  const resetSimulation = useCallback(() => {
    setLines([]);
    setIsRunning(false);
    setIsPaused(false);
  }, []);

  // Deterministic sequential line renderer
  useEffect(() => {
    if (!isRunning) return;

    let lineIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const addNextLine = () => {
      if (lineIndex >= SIMULATION_SEQUENCE.length) {
        setIsRunning(false);
        return;
      }

      const entry = SIMULATION_SEQUENCE[lineIndex];

      // Pause at verification gate
      if (entry.type === "verification") {
        setIsPaused(true);
        timeoutId = setTimeout(() => {
          setIsPaused(false);
          setLines((prev) => [...prev, entry]);
          lineIndex++;
          scheduleNextLine();
        }, PAUSE_AT_VERIFICATION_MS);
        return;
      }

      setLines((prev) => [...prev, entry]);
      lineIndex++;
      scheduleNextLine();
    };

    const scheduleNextLine = () => {
      timeoutId = setTimeout(addNextLine, LINE_DELAY_MS);
    };

    // Start after brief delay
    timeoutId = setTimeout(addNextLine, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isRunning]);

  return (
    <div className="w-full max-w-3xl">
      {/* Terminal window chrome */}
      <div className="rounded-md border border-zinc-800 bg-zinc-950">
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          <span className="ml-3 font-mono text-xs text-zinc-500">
            mapos-runtime — deterministic simulation
          </span>
        </div>

        {/* Terminal content */}
        <div className="min-h-[420px] p-4 font-mono text-sm leading-relaxed">
          <AnimatePresence initial={false}>
            {lines.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className={getLogStyle(line.type)}
              >
                {line.type === "blank" ? "\u00A0" : line.text}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Cursor */}
          {isRunning && !isPaused && (
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block h-4 w-2 bg-emerald-400"
            />
          )}

          {/* Paused indicator */}
          {isPaused && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-amber-400"
            >
              ⏸ Processing...
            </motion.span>
          )}
        </div>

        {/* Control bar */}
        <div className="flex items-center justify-between border-t border-zinc-800 px-4 py-3">
          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${
                isRunning
                  ? "bg-emerald-400 animate-pulse"
                  : lines.length === SIMULATION_SEQUENCE.length
                  ? "bg-emerald-400"
                  : "bg-zinc-700"
              }`}
            />
            <span className="font-mono text-xs text-zinc-500">
              {isRunning
                ? "Running"
                : lines.length === SIMULATION_SEQUENCE.length
                ? "Complete"
                : "Idle"}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={resetSimulation}
              disabled={!isRunning && lines.length === 0}
              className="rounded border border-zinc-800 bg-zinc-900 px-3 py-1.5 font-mono text-xs text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Reset
            </button>
            <button
              onClick={startSimulation}
              disabled={isRunning}
              className="rounded bg-emerald-400 px-3 py-1.5 font-mono text-xs text-black transition-colors hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Run Simulation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}