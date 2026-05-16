"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Pause, Play, RotateCcw, Terminal } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

import type { MaposLogType, MaposLogEntry } from "@/lib/mapos-sim";
import {
  MAPOS_SIMULATION_SEQUENCE,
  MAPOS_LINE_DELAY_MS,
  MAPOS_PAUSE_AT_VERIFICATION_MS,
} from "@/lib/mapos-sim";

function getLogStyle(type: MaposLogType): string {
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
  const [lines, setLines] = useState<MaposLogEntry[]>([]);
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
      if (lineIndex >= MAPOS_SIMULATION_SEQUENCE.length) {
        setIsRunning(false);
        return;
      }

      const entry = MAPOS_SIMULATION_SEQUENCE[lineIndex];

      // Pause at verification gate
      if (entry.type === "verification") {
        setIsPaused(true);
        timeoutId = setTimeout(() => {
          setIsPaused(false);
          setLines((prev) => [...prev, entry]);
          lineIndex++;
          scheduleNextLine();
        }, MAPOS_PAUSE_AT_VERIFICATION_MS);
        return;
      }

      setLines((prev) => [...prev, entry]);
      lineIndex++;
      scheduleNextLine();
    };

    const scheduleNextLine = () => {
      timeoutId = setTimeout(addNextLine, MAPOS_LINE_DELAY_MS);
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
                  : lines.length === MAPOS_SIMULATION_SEQUENCE.length
                  ? "bg-emerald-400"
                  : "bg-zinc-700"
              }`}
            />
            <span className="font-mono text-xs text-zinc-500">
              {isRunning
                ? "Running"
                : lines.length === MAPOS_SIMULATION_SEQUENCE.length
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