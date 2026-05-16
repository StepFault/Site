"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { CircleDot, ClipboardCheck, MonitorPlay } from "lucide-react";

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
      className="flex w-full max-w-3xl flex-col items-center gap-8 text-center"
      initial="hidden"
      animate="visible"
      variants={container}
    >
      <motion.div
        variants={fadeUp}
        className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-mono text-xs text-zinc-500"
      >
        <CircleDot
          className="h-3.5 w-3.5 shrink-0 text-emerald-400"
          strokeWidth={2}
          aria-hidden
        />
        <span>Stepfault</span>
        <span className="text-zinc-700">|</span>
        <span>Interim CTO · Deep-tech R&amp;D · MAPOS</span>
        <span className="text-zinc-700">|</span>
        <span>
          Status: <span className="text-emerald-400">Principal capacity open</span>
        </span>
      </motion.div>

      <motion.h1
        variants={fadeUp}
        className="max-w-4xl text-balance text-3xl font-semibold tracking-tight text-zinc-200 sm:text-4xl md:text-5xl"
      >
        Multi-agent orchestration and systems architecture where{" "}
        <span className="text-emerald-400">
          AI, bioinformatics, and legal compliance stay one accountable stack.
        </span>
      </motion.h1>

      <motion.p
        variants={fadeUp}
        className="max-w-xl text-base text-zinc-500 sm:text-lg"
      >
        Interim CTO and principal R&amp;D for Series A+ and institutional
        teams—architecture, proof, and regulatory posture in the same room.
      </motion.p>

      <motion.div
        variants={fadeUp}
        className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-xs text-zinc-600"
      >
        <span>
          Mandate:{" "}
          <span className="text-zinc-400">
            Architecture · Research leadership · Technical governance
          </span>
        </span>
        <span className="text-zinc-800">|</span>
        <span>
          Segments:{" "}
          <span className="text-zinc-400">
            Series A+ · Federal · Enterprise
          </span>
        </span>
        <span className="text-zinc-800">|</span>
        <span>
          Posture:{" "}
          <span className="text-emerald-400">Compliance-native systems</span>
        </span>
      </motion.div>

      <motion.div
        variants={fadeUp}
        className="flex flex-wrap items-center justify-center gap-4"
      >
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-400 px-6 py-2.5 font-mono text-sm text-black transition-colors hover:bg-emerald-300"
        >
          <ClipboardCheck className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
          Request principal review
        </Link>
        <Link
          href="#simulator"
          className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-800 bg-zinc-900 px-6 py-2.5 font-mono text-sm text-zinc-200 transition-colors hover:border-zinc-700 hover:bg-zinc-800"
        >
          <MonitorPlay
            className="h-3.5 w-3.5 shrink-0 text-zinc-500"
            strokeWidth={2}
          />
          MAPOS reference trace
        </Link>
      </motion.div>
    </motion.section>
  );
}
