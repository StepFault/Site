"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import portfolioData from "@/lib/data/portfolio.json";

type Metric = { label: string; value: string };

type CaseStudy = {
  id: string;
  slug: string;
  name: string;
  domain: string;
  scale: string;
  solution: string;
  status: string;
  image: string | null;
  metrics: Metric[];
  year: number;
};

const STATUS_STYLES: Record<string, string> = {
  "case-study":
    "text-emerald-400 border-emerald-400/30 bg-emerald-400/5",
  deployed: "text-emerald-400 border-emerald-400/30 bg-emerald-400/5",
  testing: "text-amber-400 border-amber-400/30 bg-amber-400/5",
  "testing-deployed":
    "text-amber-400/90 border-amber-400/20 bg-emerald-400/5 border-emerald-400/20",
  roadmap: "text-zinc-400 border-zinc-700 bg-zinc-800/50",
};

const STATUS_LABELS: Record<string, string> = {
  "case-study": "CASE STUDY",
  deployed: "DEPLOYED",
  testing: "TESTING",
  "testing-deployed": "TESTING · DEPLOYED",
  roadmap: "ROADMAP",
};

const CARD_SHELL =
  "group relative flex flex-col gap-5 overflow-hidden rounded-md border p-6 " +
  "border-zinc-800 bg-zinc-900/50 transition-all duration-300 " +
  "hover:border-emerald-400 hover:shadow-[0_0_15px_rgba(52,211,153,0.1)]";

function CaseStudyMetrics({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 border-t border-zinc-800/90 pt-5 sm:grid-cols-3">
      {metrics.map((m) => (
        <div key={m.label} className="flex flex-col gap-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
            {m.label}
          </span>
          <span className="font-mono text-sm font-semibold leading-snug text-zinc-300">
            {m.value}
          </span>
        </div>
      ))}
    </div>
  );
}

function CaseStudyVisual({
  image,
  name,
}: {
  image: string | null;
  name: string;
}) {
  if (image) {
    return (
      <div className="relative h-36 w-full overflow-hidden rounded-sm border border-zinc-800">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover opacity-55 transition-opacity duration-300 group-hover:opacity-75"
        />
      </div>
    );
  }

  return (
    <div className="relative flex h-36 w-full items-center justify-center overflow-hidden rounded-sm border border-zinc-800 bg-zinc-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(52,211,153,0.06)_0%,transparent_70%)]" />
      <span className="font-mono text-xs tracking-[0.3em] text-zinc-700">
        CASE STUDY
      </span>
    </div>
  );
}

function CaseStudyCard({
  study,
  index,
}: {
  study: CaseStudy;
  index: number;
}) {
  const badgeStyle =
    STATUS_STYLES[study.status] ?? STATUS_STYLES["case-study"];
  const badgeLabel =
    STATUS_LABELS[study.status] ?? study.status.toUpperCase();

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.07, duration: 0.45, ease: "easeOut" }}
      className={CARD_SHELL}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className={[
            "inline-flex items-center rounded-sm border px-2 py-0.5 font-mono text-[10px] tracking-widest",
            badgeStyle,
          ].join(" ")}
        >
          {badgeLabel}
        </span>
        <span className="font-mono text-[10px] text-zinc-700">
          {study.year}
        </span>
      </div>

      <CaseStudyVisual image={study.image} name={study.name} />

      <div className="flex flex-col gap-1">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-600">
          {study.domain}
        </p>
        <h3 className="text-base font-semibold leading-snug text-zinc-200 md:text-[1.05rem]">
          {study.name}
        </h3>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-emerald-400/90">
            Scale
          </p>
          <p className="text-sm leading-relaxed text-zinc-400">{study.scale}</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-emerald-400/90">
            Solution
          </p>
          <p className="text-sm leading-relaxed text-zinc-400">
            {study.solution}
          </p>
        </div>
      </div>

      <CaseStudyMetrics metrics={study.metrics} />
    </motion.article>
  );
}

export default function Deployments() {
  const caseStudies = portfolioData.projects as CaseStudy[];

  return (
    <section
      id="deployments"
      className="w-full max-w-5xl scroll-mt-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4 }}
        className="mb-8 flex items-end justify-between gap-4"
      >
        <div className="flex flex-col gap-2">
          <h2 className="font-mono text-xs uppercase tracking-widest text-zinc-500">
            // TECHNICAL TRACK RECORD
          </h2>
          <p className="text-2xl font-semibold tracking-tight text-zinc-200">
            Executive case studies
          </p>
        </div>
        <span className="shrink-0 font-mono text-xs text-zinc-700">
          {caseStudies.length} anchor programs
        </span>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {caseStudies.map((study, i) => (
          <CaseStudyCard key={study.id} study={study} index={i} />
        ))}
      </div>
    </section>
  );
}
