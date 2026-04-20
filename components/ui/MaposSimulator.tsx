"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Pause, Play, RotateCcw, Terminal } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

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

const SECTORS = ["legal", "health", "security", "finance"] as const;
type Sector = (typeof SECTORS)[number];

function buildSectorSequence(sector: Sector): LogEntry[] {
  const sequences: Record<Sector, LogEntry[]> = {
    legal: [
      { type: "system", text: "MAPOS Runtime v1.0.0 initialized" },
      { type: "system", text: "Connecting to deterministic orchestration layer..." },
      { type: "success", text: "✓ Connection established" },
      { type: "blank" },
      { type: "header", text: "DATA INGESTION [Legal]" },
      { type: "data", text: "→ Ingesting: regulatory_frameworks.json (2.4 MB)" },
      { type: "data", text: "→ Ingesting: case_precedents_2024.zip (12.1 MB)" },
      { type: "data", text: "→ Ingesting: compliance_matrices.yaml (847 KB)" },
      { type: "success", text: "✓ Data ingestion complete: 3 sources, 15.3 MB total" },
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
      { type: "verification", text: "STATUS: Human-in-the-Loop Verification Gate" },
      { type: "pending", text: "⏸ Awaiting human verification..." },
    ],
    health: [
      { type: "system", text: "MAPOS Runtime v1.0.0 initialized" },
      { type: "system", text: "Connecting to deterministic orchestration layer..." },
      { type: "success", text: "✓ Connection established" },
      { type: "blank" },
      { type: "header", text: "DATA INGESTION [Health]" },
      { type: "data", text: "→ Ingesting: biomarker_schemas.json (1.2 MB)" },
      { type: "data", text: "→ Ingesting: clinical_guidelines_2024.zip (8.6 MB)" },
      { type: "data", text: "→ Ingesting: dietary_reference.yaml (412 KB)" },
      { type: "success", text: "✓ Data ingestion complete: 3 sources, 10.2 MB total" },
      { type: "blank" },
      { type: "header", text: "AGENT ROUTING" },
      { type: "route", text: "ROUTE: Agent_Health_01 → clinical_compliance" },
      { type: "route", text: "ROUTE: Agent_Nutrition_03 → intervention_engine" },
      { type: "route", text: "ROUTE: Agent_Biomarker_02 → panel_analysis" },
      { type: "route", text: "ROUTE: Agent_Synth_04 → outcome_synthesis" },
      { type: "success", text: "✓ All agents dispatched to target domains" },
      { type: "blank" },
      { type: "header", text: "EXECUTION PIPELINE" },
      { type: "exec", text: "Executing: Agent_Health_01.compliance_check()" },
      { type: "exec", text: "  → Output hash: 0x3b8e1c9a" },
      { type: "exec", text: "Executing: Agent_Nutrition_03.recommend()" },
      { type: "exec", text: "  → Output hash: 0x5d2f7e4b" },
      { type: "exec", text: "Executing: Agent_Biomarker_02.analyze()" },
      { type: "exec", text: "  → Output hash: 0x8a1c6d3e" },
      { type: "exec", text: "Executing: Agent_Synth_04.synthesize()" },
      { type: "exec", text: "  → Output hash: 0x1f9b4a2c" },
      { type: "success", text: "✓ Execution pipeline complete" },
      { type: "blank" },
      { type: "verification", text: "STATUS: Human-in-the-Loop Verification Gate" },
      { type: "pending", text: "⏸ Awaiting human verification..." },
    ],
    security: [
      { type: "system", text: "MAPOS Runtime v1.0.0 initialized" },
      { type: "system", text: "Connecting to deterministic orchestration layer..." },
      { type: "success", text: "✓ Connection established" },
      { type: "blank" },
      { type: "header", text: "DATA INGESTION [Security]" },
      { type: "data", text: "→ Ingesting: threat_indicators.json (4.1 MB)" },
      { type: "data", text: "→ Ingesting: playbook_registry.zip (6.2 MB)" },
      { type: "data", text: "→ Ingesting: siem_rules.yaml (1.8 MB)" },
      { type: "success", text: "✓ Data ingestion complete: 3 sources, 12.1 MB total" },
      { type: "blank" },
      { type: "header", text: "AGENT ROUTING" },
      { type: "route", text: "ROUTE: Agent_Threat_01 → correlation_engine" },
      { type: "route", text: "ROUTE: Agent_Playbook_02 → response_orchestration" },
      { type: "route", text: "ROUTE: Agent_SIEM_03 → rule_evaluation" },
      { type: "route", text: "ROUTE: Agent_Synth_05 → incident_synthesis" },
      { type: "success", text: "✓ All agents dispatched to target domains" },
      { type: "blank" },
      { type: "header", text: "EXECUTION PIPELINE" },
      { type: "exec", text: "Executing: Agent_Threat_01.correlate()" },
      { type: "exec", text: "  → Output hash: 0x6e2d8b5c" },
      { type: "exec", text: "Executing: Agent_Playbook_02.execute()" },
      { type: "exec", text: "  → Output hash: 0x9c4a1f7e" },
      { type: "exec", text: "Executing: Agent_SIEM_03.evaluate()" },
      { type: "exec", text: "  → Output hash: 0x2b7e3d9a" },
      { type: "exec", text: "Executing: Agent_Synth_05.synthesize()" },
      { type: "exec", text: "  → Output hash: 0x4f1a6c8b" },
      { type: "success", text: "✓ Execution pipeline complete" },
      { type: "blank" },
      { type: "verification", text: "STATUS: Human-in-the-Loop Verification Gate" },
      { type: "pending", text: "⏸ Awaiting human verification..." },
    ],
    finance: [
      { type: "system", text: "MAPOS Runtime v1.0.0 initialized" },
      { type: "system", text: "Connecting to deterministic orchestration layer..." },
      { type: "success", text: "✓ Connection established" },
      { type: "blank" },
      { type: "header", text: "DATA INGESTION [Finance]" },
      { type: "data", text: "→ Ingesting: regulatory_frameworks.json (3.1 MB)" },
      { type: "data", text: "→ Ingesting: market_risk_models.zip (9.4 MB)" },
      { type: "data", text: "→ Ingesting: compliance_checklist.yaml (622 KB)" },
      { type: "success", text: "✓ Data ingestion complete: 3 sources, 13.1 MB total" },
      { type: "blank" },
      { type: "header", text: "AGENT ROUTING" },
      { type: "route", text: "ROUTE: Agent_Compliance_01 → regulatory_check" },
      { type: "route", text: "ROUTE: Agent_Risk_02 → market_risk_matrix" },
      { type: "route", text: "ROUTE: Agent_Report_03 → advisory_synthesis" },
      { type: "route", text: "ROUTE: Agent_Synth_06 → consensus_output" },
      { type: "success", text: "✓ All agents dispatched to target domains" },
      { type: "blank" },
      { type: "header", text: "EXECUTION PIPELINE" },
      { type: "exec", text: "Executing: Agent_Compliance_01.regulatory_check()" },
      { type: "exec", text: "  → Output hash: 0x7c3e9b2a" },
      { type: "exec", text: "Executing: Agent_Risk_02.risk_score()" },
      { type: "exec", text: "  → Output hash: 0x1d5f8e4c" },
      { type: "exec", text: "Executing: Agent_Report_03.synthesize()" },
      { type: "exec", text: "  → Output hash: 0x8b2a6f1d" },
      { type: "exec", text: "Executing: Agent_Synth_06.consensus()" },
      { type: "exec", text: "  → Output hash: 0x3e9c4b7a" },
      { type: "success", text: "✓ Execution pipeline complete" },
      { type: "blank" },
      { type: "verification", text: "STATUS: Human-in-the-Loop Verification Gate" },
      { type: "pending", text: "⏸ Awaiting human verification..." },
    ],
  };
  return sequences[sector];
}

function buildFullSequence(): LogEntry[] {
  const separator = (label: string): LogEntry[] => [
    { type: "blank" },
    { type: "header", text: `━━━ SECTOR: ${label.toUpperCase()} ━━━` },
    { type: "blank" },
  ];
  const parts: LogEntry[] = [];
  SECTORS.forEach((sector, i) => {
    if (i > 0) parts.push(...separator(sector));
    parts.push(...buildSectorSequence(sector));
  });
  return parts;
}

const SIMULATION_SEQUENCE = buildFullSequence();

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
          <Terminal
            className="ml-3 h-3.5 w-3.5 shrink-0 text-zinc-600"
            strokeWidth={2}
            aria-hidden
          />
          <span className="font-mono text-xs text-zinc-500">
            mapos-runtime · deterministic trace (UI-only)
          </span>
        </div>

        {/* Terminal content (scrollable for multi-sector run) */}
        <div className="simulator-scroll min-h-[420px] max-h-[560px] overflow-y-auto p-4 font-mono text-sm leading-relaxed">
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
              className="inline-flex items-center gap-1.5 text-amber-400"
            >
              <Pause className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
              Awaiting verification gate...
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
              type="button"
              onClick={resetSimulation}
              disabled={!isRunning && lines.length === 0}
              className="inline-flex items-center gap-1.5 rounded border border-zinc-800 bg-zinc-900 px-3 py-1.5 font-mono text-xs text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <RotateCcw className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
              Reset
            </button>
            <button
              type="button"
              onClick={startSimulation}
              disabled={isRunning}
              className="inline-flex items-center gap-1.5 rounded bg-emerald-400 px-3 py-1.5 font-mono text-xs text-black transition-colors hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Play className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
              Run trace
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}