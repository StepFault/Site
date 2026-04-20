import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
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
        <Hero />

        {/* ── 02 · EXECUTIVE OFFERINGS ─────────────────────────────────────────── */}
        <SectionDivider label="// executive offerings" />
        <Services />

        {/* ── 03 · DEMO (reference trace) ─────────────────────────────────────── */}
        <SectionDivider label="// mapos reference trace" />

        <section
          id="simulator"
          className="w-full max-w-3xl scroll-mt-20"
        >
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-mono text-xs uppercase tracking-widest text-zinc-500">
              MAPOS Runtime · Deterministic orchestration (UI reference)
            </h2>
            <span className="font-mono text-xs text-zinc-700">01 / 03</span>
          </div>
          <MaposSimulator />
        </section>

        {/* ── 04 · TECHNICAL TRACK RECORD ─────────────────────────────────────── */}
        <SectionDivider label="// technical track record" />
        <Deployments />

        {/* ── 05 · RESEARCH & STACK ─────────────────────────────────────────────── */}
        <SectionDivider label="// research & stack relationships" />
        <TrustSignals />

        {/* ── 06 · ENGAGEMENT INTAKE ────────────────────────────────────────────── */}
        <SectionDivider label="// engagement protocol" />

        <section
          id="access"
          className="w-full max-w-3xl scroll-mt-20 pb-16"
        >
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-mono text-xs uppercase tracking-widest text-zinc-500">
              Technical intake · Privileged review queue
            </h2>
            <span className="font-mono text-xs text-zinc-700">03 / 03</span>
          </div>
          <AccessGate />
        </section>

      </main>
    </>
  );
}
