"use client";

import { useMemo, useState } from "react";

import MaposSimulator from "@/components/ui/MaposSimulator";
import {
  MAPOS_SECTOR_LABELS,
  MAPOS_SECTORS,
  buildSectorSequence,
  type MaposSector,
} from "@/lib/mapos-sim";

export default function MaposSectorPreview() {
  const [sector, setSector] = useState<MaposSector>("legal");
  const trace = useMemo(() => buildSectorSequence(sector), [sector]);

  return (
    <div className="flex w-full max-w-3xl flex-col gap-4">
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="MAPOS demo vertical"
      >
        {MAPOS_SECTORS.map((s) => (
          <button
            key={s}
            type="button"
            role="tab"
            aria-selected={sector === s}
            onClick={() => setSector(s)}
            className={`rounded border px-3 py-1.5 font-mono text-xs transition-colors ${
              sector === s
                ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
                : "border-white/10 bg-slate-900/40 text-zinc-500 shadow-lg backdrop-blur-md hover:border-white/20 hover:bg-slate-800/50 hover:text-zinc-300"
            }`}
          >
            {MAPOS_SECTOR_LABELS[s]}
          </button>
        ))}
      </div>
      <MaposSimulator key={sector} trace={trace} />
    </div>
  );
}
