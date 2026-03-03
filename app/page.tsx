import Navbar from "@/components/layout/Navbar";
import TrustSignals from "@/components/sections/TrustSignals";
import Deployments from "@/components/sections/Deployments";
import MaposSimulator from "@/components/ui/MaposSimulator";
import AccessGate from "@/components/sections/AccessGate";

// ── Section divider ────────────────────────────────────────────────────────────

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex w-full max-w-5xl items-center gap-4">
      <div className="h-px flex-1 bg-zinc-800" />
      <span className="font-mono text-xs text-zinc-600">{label}</span>
      <div className="h-px flex-1 bg-zinc-800" />
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="flex flex-col items-center gap-16 px-4 pt-28 pb-16 sm:px-8 md:px-12">

        {/* ── 01 · HERO ──────────────────────────────────────────────────────── */}
        <section className="flex w-full max-w-3xl flex-col items-center gap-8 text-center">
          {/* Lab identity badge */}
          <div className="flex items-center gap-2 font-mono text-xs text-zinc-500">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
            <span>Stepfault Applied Research Lab</span>
            <span className="text-zinc-700">|</span>
            <span>Status: <span className="text-emerald-400">Active</span></span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-200 sm:text-5xl md:text-6xl">
            Applied AI Research
            <br />
            <span className="text-emerald-400">Built for High Stakes</span>
          </h1>

          {/* Sub-headline */}
          <p className="max-w-lg text-base text-zinc-500 sm:text-lg">
            We design and deploy deterministic AI systems for domains where
            failure is not an option — law, medicine, cybersecurity, and finance.
          </p>

          {/* Metadata strip */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-xs text-zinc-600">
            <span>Deployments: <span className="text-zinc-400">4 active</span></span>
            <span className="text-zinc-800">|</span>
            <span>Domains: <span className="text-zinc-400">Legal · Health · Security · Finance</span></span>
            <span className="text-zinc-800">|</span>
            <span>Architecture: <span className="text-zinc-400">Multi-Agent</span></span>
            <span className="text-zinc-800">|</span>
            <span>HITL: <span className="text-emerald-400">Enabled</span></span>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#deployments"
              className="rounded-md border border-zinc-800 bg-zinc-900 px-6 py-2.5 font-mono text-sm text-zinc-200 transition-colors hover:border-zinc-700 hover:bg-zinc-800"
            >
              View Deployments
            </a>
            <a
              href="#access"
              className="rounded-md bg-emerald-400 px-6 py-2.5 font-mono text-sm text-black transition-colors hover:bg-emerald-300"
            >
              Request Sandbox Access
            </a>
          </div>
        </section>

        {/* ── 02 · TRUST SIGNALS ─────────────────────────────────────────────── */}
        <SectionDivider label="// partners & infrastructure" />
        <TrustSignals />

        {/* ── 03 · SIMULATOR ─────────────────────────────────────────────────── */}
        <SectionDivider label="// live simulation" />

        <section
          id="simulator"
          className="w-full max-w-3xl scroll-mt-20"
        >
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-mono text-xs uppercase tracking-widest text-zinc-500">
              MAPOS Runtime — Interactive Demonstration
            </h2>
            <span className="font-mono text-xs text-zinc-700">01 / 03</span>
          </div>
          <MaposSimulator />
        </section>

        {/* ── 04 · DEPLOYMENTS ───────────────────────────────────────────────── */}
        <SectionDivider label="// applied research & deployments" />
        <Deployments />

        {/* ── 05 · ACCESS GATE ───────────────────────────────────────────────── */}
        <SectionDivider label="// request access" />

        <section
          id="access"
          className="w-full max-w-3xl scroll-mt-20 pb-16"
        >
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-mono text-xs uppercase tracking-widest text-zinc-500">
              Sandbox Access — Limited Preview
            </h2>
            <span className="font-mono text-xs text-zinc-700">03 / 03</span>
          </div>
          <AccessGate />
        </section>

      </main>
    </>
  );
}
