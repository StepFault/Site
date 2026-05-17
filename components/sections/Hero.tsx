"use client";

import { motion, type Variants } from "framer-motion";
import { CircleDot, Rocket, Users } from "lucide-react";

const MVP_CTA_HREF = "YOUR_STRIPE_OR_CALENDLY_LINK_1";
const FRACTIONAL_CTA_HREF = "YOUR_CALENDLY_LINK_2";

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export default function Hero() {
  return (
    <motion.section
      className="relative flex w-full max-w-6xl flex-col items-center gap-8 px-2 text-center sm:gap-10 lg:items-start lg:text-left"
      initial="hidden"
      animate="visible"
      variants={container}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(39_39_42/0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgb(39_39_42/0.35)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,#000_55%,transparent_100%)]"
      />

      <motion.div
        variants={fadeUp}
        className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-mono text-xs text-zinc-500 lg:justify-start"
      >
        <CircleDot
          className="h-3.5 w-3.5 shrink-0 text-blue-400"
          strokeWidth={2}
          aria-hidden
        />
        <span>Stepfault</span>
        <span className="text-zinc-700">|</span>
        <span>48h MVPs · Fractional engineering</span>
        <span className="text-zinc-700">|</span>
        <span>
          Status: <span className="text-blue-400">Sprint slots open</span>
        </span>
      </motion.div>

      <motion.h1
        variants={fadeUp}
        className="max-w-5xl text-balance text-6xl font-bold tracking-tight text-zinc-100 sm:text-7xl"
      >
        <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-blue-500 bg-clip-text text-transparent">
          Elite
        </span>{" "}
        Engineering. Startup Speed.
      </motion.h1>

      <motion.p
        variants={fadeUp}
        className="mx-auto max-w-2xl text-base leading-relaxed text-zinc-500 sm:text-lg lg:mx-0"
      >
        Elite Engineering. Startup Speed. We scaffold production-grade MVPs,
        process massive AI datasets, and unblock engineering teams in days, not
        months.
      </motion.p>

      <motion.div
        variants={fadeUp}
        className="flex flex-wrap items-center justify-center gap-4 lg:justify-start"
      >
        <a
          href={MVP_CTA_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-500 px-7 py-3 font-mono text-sm font-medium text-white shadow-[0_0_28px_rgba(59,130,246,0.35)] transition-[background-color,box-shadow] hover:bg-blue-400 hover:shadow-[0_0_36px_rgba(59,130,246,0.45)]"
        >
          <Rocket className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
          Ship Your MVP
        </a>
        <a
          href={FRACTIONAL_CTA_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-700 bg-transparent px-7 py-3 font-mono text-sm text-zinc-200 transition-colors hover:border-zinc-500 hover:bg-zinc-900/80"
        >
          <Users className="h-4 w-4 shrink-0 text-zinc-500" strokeWidth={2} aria-hidden />
          Hire Us Fractionally
        </a>
      </motion.div>
    </motion.section>
  );
}
