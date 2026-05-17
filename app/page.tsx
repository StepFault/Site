import Navbar from "@/components/layout/Navbar";
import QuantumBackground from "@/components/ui/QuantumBackground";
import Hero from "@/components/sections/Hero";
import TrustedBy from "@/components/sections/TrustedBy";
import Services from "@/components/sections/Services";
import TrustSignals from "@/components/sections/TrustSignals";
import Deployments from "@/components/sections/Deployments";
import MaposSimulator from "@/components/ui/MaposSimulator";
import MaposSectorPreview from "@/components/ui/MaposSectorPreview";
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
      <QuantumBackground />
      <Navbar />

      <main className="relative z-0 flex flex-col items-center gap-16 px-4 pt-32 pb-16 sm:px-8 md:px-12">

        {/* ── 01 · HERO ──────────────────────────────────────────────────────── */}
        <div className="w-full max-w-6xl">
          <Hero />
        </div>
        <TrustedBy />

        {/* ── 02 · EXECUTIVE OFFERINGS ─────────────────────────────────────────── */}
        <SectionDivider label="// offerings" />
        <Services />

        {/* ── 03 · DEMO (reference trace) ─────────────────────────────────────── */}
        <SectionDivider label="// mapos · reference trace" />

        <section
          id="simulator"
          className="w-full max-w-3xl scroll-mt-20"
        >
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-mono text-xs uppercase tracking-widest text-slate-300">
              MAPOS · Deterministic orchestration (showroom trace)
            </h2>
            <span className="font-mono text-xs text-zinc-700">01 / 03</span>
          </div>
          <MaposSimulator />

          <div className="mt-10 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-xs uppercase tracking-widest text-slate-300">
                One vertical · same playback engine
              </h3>
              <span className="font-mono text-xs text-zinc-700">02 / 03</span>
            </div>
            <MaposSectorPreview />
          </div>
        </section>

        {/* ── 04 · TECHNICAL TRACK RECORD ─────────────────────────────────────── */}
        <SectionDivider label="// track record" />
        <Deployments />

        {/* ── 05 · RESEARCH & STACK ─────────────────────────────────────────────── */}
        <SectionDivider label="// stack & research context" />
        <TrustSignals />

        {/* ── 06 · ENGAGEMENT CTA ───────────────────────────────────────────────── */}
        <SectionDivider label="// engage" />

        <section
          id="access"
          className="w-full max-w-3xl scroll-mt-20 pb-16"
        >
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-mono text-xs uppercase tracking-widest text-slate-300">
              Book this week&apos;s sprint
            </h2>
            <span className="font-mono text-xs text-zinc-700">03 / 03</span>
          </div>
          <AccessGate />
        </section>

      </main>
    </>
  );
}
