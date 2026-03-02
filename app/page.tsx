import MaposSimulator from "@/components/ui/MaposSimulator";
import AccessGate from "@/components/sections/AccessGate";

// ── Section divider ────────────────────────────────────────────────────────────

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex w-full max-w-3xl items-center gap-4">
      <div className="h-px flex-1 bg-zinc-800" />
      <span className="font-mono text-xs text-zinc-600">{label}</span>
      <div className="h-px flex-1 bg-zinc-800" />
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <main className="flex flex-col items-center gap-16 px-4 py-16 sm:px-8 md:px-12">

      {/* ── 01 · HERO ──────────────────────────────────────────────────────── */}
      <section className="flex w-full max-w-3xl flex-col items-center gap-8 pt-8 text-center">
        {/* System status badge */}
        <div className="flex items-center gap-2 font-mono text-xs text-zinc-500">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
          <span>MAPOS v1.0 — Deterministic Runtime</span>
          <span className="text-zinc-700">|</span>
          <span>Status: <span className="text-emerald-400">Operational</span></span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-200 sm:text-5xl md:text-6xl">
          Deterministic AI for
          <br />
          <span className="text-emerald-400">High-Stakes Domains</span>
        </h1>

        {/* Sub-headline */}
        <p className="max-w-lg text-base text-zinc-500 sm:text-lg">
          MAPOS orchestrates multi-agent systems with provable guarantees.
          No hallucinations. No guesswork. Just deterministic outcomes.
        </p>

        {/* Metadata strip */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-xs text-zinc-600">
          <span>Agents: <span className="text-zinc-400">4 domains</span></span>
          <span className="text-zinc-800">|</span>
          <span>Consensus: <span className="text-zinc-400">raft</span></span>
          <span className="text-zinc-800">|</span>
          <span>Output guarantee: <span className="text-zinc-400">deterministic</span></span>
          <span className="text-zinc-800">|</span>
          <span>HITL: <span className="text-emerald-400">enabled</span></span>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#simulator"
            className="rounded-md border border-zinc-800 bg-zinc-900 px-6 py-2.5 font-mono text-sm text-zinc-200 transition-colors hover:border-zinc-700 hover:bg-zinc-800"
          >
            Watch Live Run
          </a>
          <a
            href="#access"
            className="rounded-md bg-emerald-400 px-6 py-2.5 font-mono text-sm text-black transition-colors hover:bg-emerald-300"
          >
            Request Sandbox Access
          </a>
        </div>
      </section>

      {/* ── 02 · SIMULATOR ─────────────────────────────────────────────────── */}
      <SectionDivider label="// live simulation" />

      <section
        id="simulator"
        className="w-full max-w-3xl scroll-mt-8"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-mono text-xs uppercase tracking-widest text-zinc-500">
            MAPOS Runtime — Interactive Demonstration
          </h2>
          <span className="font-mono text-xs text-zinc-700">01 / 02</span>
        </div>
        <MaposSimulator />
      </section>

      {/* ── 03 · ACCESS GATE ───────────────────────────────────────────────── */}
      <SectionDivider label="// request access" />

      <section
        id="access"
        className="w-full max-w-3xl scroll-mt-8 pb-16"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-mono text-xs uppercase tracking-widest text-zinc-500">
            Sandbox Access — Limited Preview
          </h2>
          <span className="font-mono text-xs text-zinc-700">02 / 02</span>
        </div>
        <AccessGate />
      </section>

    </main>
  );
}
