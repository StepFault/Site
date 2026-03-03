"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import portfolioData from "@/lib/data/portfolio.json";

type Metric = { label: string; value: string };

type Project = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  domain: string;
  status: string;
  image: string | null;
  tags: string[];
  metrics: Metric[];
  year: number;
  colSpan: number;
};

const STATUS_STYLES: Record<string, string> = {
  deployed: "text-emerald-400 border-emerald-400/30 bg-emerald-400/5",
  roadmap: "text-zinc-400 border-zinc-700 bg-zinc-800/50",
};

const STATUS_LABELS: Record<string, string> = {
  deployed: "DEPLOYED",
  roadmap: "ROADMAP",
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isRoadmap = project.status === "roadmap";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.07, duration: 0.45, ease: "easeOut" }}
      className={[
        "group relative flex flex-col gap-5 overflow-hidden rounded-md border p-6",
        "bg-zinc-900/50 border-zinc-800",
        "transition-all duration-300",
        "hover:border-emerald-400 hover:shadow-[0_0_15px_rgba(52,211,153,0.1)]",
        isRoadmap ? "md:col-span-2" : "col-span-1",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Status badge */}
      <div className="flex items-center justify-between">
        <span
          className={[
            "inline-flex items-center rounded-sm border px-2 py-0.5 font-mono text-[10px] tracking-widest",
            STATUS_STYLES[project.status] ?? STATUS_STYLES.roadmap,
          ].join(" ")}
        >
          {STATUS_LABELS[project.status] ?? project.status.toUpperCase()}
        </span>
        <span className="font-mono text-[10px] text-zinc-700">{project.year}</span>
      </div>

      {/* Image / roadmap visual */}
      {project.image ? (
        <div className="relative h-32 w-full overflow-hidden rounded-sm border border-zinc-800">
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover opacity-60 transition-opacity duration-300 group-hover:opacity-80"
          />
        </div>
      ) : (
        <div className="relative flex h-32 w-full items-center justify-center overflow-hidden rounded-sm border border-zinc-800 bg-zinc-950">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(52,211,153,0.06)_0%,transparent_70%)]" />
          <span className="font-mono text-xs tracking-[0.3em] text-zinc-700">
            RESEARCH IN PROGRESS
          </span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-1">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-600">
          {project.domain}
        </p>
        <h3 className="text-base font-semibold text-zinc-200 leading-snug">
          {project.name}
        </h3>
        <p className="text-sm text-emerald-400/80 font-mono">{project.tagline}</p>
      </div>

      {/* Description */}
      <p className="text-xs leading-relaxed text-zinc-500 line-clamp-3">
        {project.description}
      </p>

      {/* Metrics */}
      <div
        className={[
          "grid gap-3",
          project.colSpan === 2 ? "grid-cols-3" : "grid-cols-1",
        ].join(" ")}
      >
        {project.metrics.map((m) => (
          <div key={m.label} className="flex flex-col gap-0.5">
            <span className="font-mono text-base font-semibold text-zinc-300">
              {m.value}
            </span>
            <span className="font-mono text-[10px] text-zinc-600">{m.label}</span>
          </div>
        ))}
      </div>

      {/* Tags */}
      <div className="mt-auto flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-sm border border-zinc-800 bg-zinc-900 px-2 py-0.5 font-mono text-[10px] text-zinc-500"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Roadmap glow accent */}
      {isRoadmap && (
        <div className="pointer-events-none absolute inset-0 rounded-md border border-emerald-400/10 bg-[radial-gradient(ellipse_at_top_right,rgba(52,211,153,0.04)_0%,transparent_60%)]" />
      )}
    </motion.div>
  );
}

export default function Deployments() {
  const projects = portfolioData.projects as Project[];

  return (
    <section
      id="deployments"
      className="w-full max-w-5xl scroll-mt-20"
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4 }}
        className="mb-8 flex items-end justify-between"
      >
        <div className="flex flex-col gap-2">
          <h2 className="font-mono text-xs uppercase tracking-widest text-zinc-500">
            // APPLIED RESEARCH &amp; DEPLOYMENTS
          </h2>
          <p className="text-2xl font-semibold tracking-tight text-zinc-200">
            From Lab to Production
          </p>
        </div>
        <span className="hidden font-mono text-xs text-zinc-700 sm:block">
          {projects.filter((p) => p.status === "deployed").length} active /{" "}
          {projects.filter((p) => p.status === "roadmap").length} upcoming
        </span>
      </motion.div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
