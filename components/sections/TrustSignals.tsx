"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import portfolioData from "@/lib/data/portfolio.json";

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" as const },
  }),
};

function LogoRow({
  logos,
  label,
}: {
  logos: { id: string; name: string; logo: string }[];
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">
        {label}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-6">
        {logos.map((partner, i) => (
          <motion.div
            key={partner.id}
            custom={i}
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            <Image
              src={partner.logo}
              alt={partner.name}
              width={160}
              height={48}
              className="h-10 w-auto grayscale opacity-50 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function TrustSignals() {
  const { academic, infrastructure } = portfolioData.partners;

  return (
    <section
      id="trust"
      className="w-full max-w-3xl scroll-mt-20"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-8 rounded-md border border-zinc-800 bg-zinc-900/30 px-6 py-8"
      >
        <LogoRow logos={academic} label="Academic &amp; Institutional Partners" />
        <div className="h-px w-full bg-zinc-800" />
        <LogoRow logos={infrastructure} label="Core Infrastructure" />
      </motion.div>
    </section>
  );
}
