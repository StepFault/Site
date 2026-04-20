"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Atom, Building2, Scale } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type OfferingTier = {
  id: string;
  label: string;
  title: string;
  icon: LucideIcon;
  bullets: readonly string[];
};

const OFFERING_TIERS: readonly OfferingTier[] = [
  {
    id: "tier-1",
    label: "Tier 01",
    title: "Interim CTO & Architecture Rescue",
    icon: Building2,
    bullets: [
      "VC Due Diligence Prep",
      "Codebase Stabilization",
      "Enterprise-Grade Scaling",
    ],
  },
  {
    id: "tier-2",
    label: "Tier 02",
    title: "Deep Tech R&D",
    icon: Atom,
    bullets: [
      "Custom AI Integration",
      "Bioinformatics Pipelines",
      "Quantum Optimization algorithms",
    ],
  },
  {
    id: "tier-3",
    label: "Tier 03",
    title: "Algorithmic Legal Compliance",
    icon: Scale,
    bullets: [
      "Cross-Border Fintech Compliance",
      "SYSCOHADA/IFRS mapping",
      "Human-In-The-Loop regulatory enforcement",
    ],
  },
] as const;

const ENGAGEMENT_STEPS = [
  { n: "1", title: "Paid Discovery Audit" },
  { n: "2", title: "Retainer Execution" },
  { n: "3", title: "Team Handoff" },
] as const;

const tierCardClass =
  "group relative flex h-full flex-col overflow-hidden rounded-md border border-zinc-800 " +
  "bg-zinc-950/70 px-7 py-8 transition-[border-color,background-color,box-shadow] duration-300 " +
  "hover:border-zinc-700 hover:bg-zinc-900/45 hover:shadow-[0_0_0_1px_rgba(39,39,42,0.4)] " +
  "md:px-8 md:py-9";

function OfferingBullets({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-6 flex flex-col gap-3 border-t border-zinc-800/90 pt-6">
      {items.map((text) => (
        <li
          key={text}
          className="flex gap-3 text-left text-[13px] leading-relaxed tracking-wide text-zinc-500"
        >
          <span
            className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-emerald-400/90"
            aria-hidden
          />
          <span>{text}</span>
        </li>
      ))}
    </ul>
  );
}

function EngagementModel() {
  return (
    <div className="rounded-md border border-zinc-800 bg-zinc-900/25 px-6 py-7 md:px-10 md:py-8">
      <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-zinc-600">
        Engagement model
      </p>
      <div className="mt-5 flex flex-col gap-0 md:flex-row md:items-center md:gap-3">
        {ENGAGEMENT_STEPS.map((step, i) => (
          <Fragment key={step.n}>
            <div
              className={[
                "flex flex-1 flex-col gap-1 py-5 md:min-w-0 md:py-0",
                i > 0 ? "border-t border-zinc-800/90 md:border-t-0" : "",
              ].join(" ")}
            >
              <span className="font-mono text-[10px] text-zinc-600">
                {step.n}
              </span>
              <span className="text-sm font-medium tracking-tight text-zinc-300">
                {step.title}
              </span>
            </div>
            {i < ENGAGEMENT_STEPS.length - 1 && (
              <ArrowRight
                className="mx-1 hidden h-4 w-4 shrink-0 self-center text-zinc-700 md:block"
                strokeWidth={2}
                aria-hidden
              />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      className="w-full max-w-5xl scroll-mt-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mb-10 flex flex-col gap-3 md:mb-12"
      >
        <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-500">
          // Executive offerings
        </h2>
        <p className="max-w-2xl text-2xl font-semibold tracking-tight text-zinc-200 md:text-[1.65rem] md:leading-snug">
          Principal-led mandates for institutions operating under technical and
          regulatory constraint.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
        {OFFERING_TIERS.map((tier, index) => {
          const Icon = tier.icon;
          return (
            <motion.article
              key={tier.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: index * 0.06,
                duration: 0.45,
                ease: "easeOut",
              }}
              className={tierCardClass}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/15 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-2 text-left">
                  <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-600">
                    {tier.label}
                  </span>
                  <h3 className="text-base font-semibold leading-snug tracking-tight text-zinc-200 md:text-[1.05rem]">
                    {tier.title}
                  </h3>
                </div>
                <Icon
                  className="h-5 w-5 shrink-0 text-zinc-600 transition-colors duration-300 group-hover:text-emerald-400/90"
                  strokeWidth={1.75}
                  aria-hidden
                />
              </div>
              <OfferingBullets items={tier.bullets} />
            </motion.article>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ delay: 0.12, duration: 0.45, ease: "easeOut" }}
        className="mt-8 md:mt-10"
      >
        <EngagementModel />
      </motion.div>
    </section>
  );
}
