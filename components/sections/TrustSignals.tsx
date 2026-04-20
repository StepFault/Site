"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import portfolioData from "@/lib/data/portfolio.json";

type PartnerLogo = { id: string; name: string; logo: string; url?: string };

type InfrastructureByCategory = {
  application: PartnerLogo[];
  ai: PartnerLogo[];
  quantum: PartnerLogo[];
};

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" as const },
  }),
};

const SCROLL_STEP_PX = 200;

function LogoRow({
  logos,
  label,
}: {
  logos: PartnerLogo[];
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">
        {label}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-6">
        {logos.map((partner, i) => {
          const content = (
            <Image
              src={partner.logo}
              alt={partner.name}
              width={160}
              height={48}
              className="h-10 w-auto grayscale opacity-50 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
            />
          );
          return (
            <motion.div
              key={partner.id}
              custom={i}
              variants={FADE_UP}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
            >
              {partner.url ? (
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-zinc-900 rounded"
                  aria-label={`${partner.name} (opens in new window)`}
                >
                  {content}
                </a>
              ) : (
                content
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function InfrastructureScrollRow({
  logos,
  label,
}: {
  logos: PartnerLogo[];
  label: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(
      el.scrollLeft < el.scrollWidth - el.clientWidth - 1
    );
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    el.addEventListener("scroll", updateScrollState);
    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", updateScrollState);
    };
  }, [logos.length, updateScrollState]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction === "left" ? -SCROLL_STEP_PX : SCROLL_STEP_PX,
      behavior: "smooth",
    });
  };

  const buttonBase =
    "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md border border-zinc-800 bg-zinc-900/80 font-mono text-zinc-500 transition-colors hover:border-zinc-600 hover:bg-zinc-800 hover:text-zinc-200 disabled:pointer-events-none disabled:opacity-40";

  return (
    <div className="flex flex-col gap-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">
        {label}
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label={`Scroll ${label} left`}
          className={buttonBase}
          disabled={!canScrollLeft}
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={2} aria-hidden />
        </button>
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="region"
          aria-label={`${label} technologies`}
        >
          {logos.map((partner, i) => {
            const content = (
              <Image
                src={partner.logo}
                alt={partner.name}
                width={120}
                height={36}
                className="h-9 w-auto grayscale opacity-50 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
              />
            );
            return (
              <motion.div
                key={partner.id}
                custom={i}
                variants={FADE_UP}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="flex-shrink-0"
              >
                {partner.url ? (
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-zinc-900 rounded"
                    aria-label={`${partner.name} (opens in new window)`}
                  >
                    {content}
                  </a>
                ) : (
                  content
                )}
              </motion.div>
            );
          })}
        </div>
        <button
          type="button"
          aria-label={`Scroll ${label} right`}
          className={buttonBase}
          disabled={!canScrollRight}
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-4 w-4" strokeWidth={2} aria-hidden />
        </button>
      </div>
    </div>
  );
}

export default function TrustSignals() {
  const partners = portfolioData.partners as {
    academic: PartnerLogo[];
    infrastructure: PartnerLogo[] | InfrastructureByCategory;
  };
  const { academic, infrastructure } = partners;
  const infraByCategory =
    infrastructure &&
    typeof infrastructure === "object" &&
    "application" in infrastructure
      ? (infrastructure as InfrastructureByCategory)
      : null;

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
        <div className="flex flex-col gap-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">
            Core Infrastructure
          </p>
          {infraByCategory ? (
            <div className="flex flex-col gap-6 overflow-hidden">
              <InfrastructureScrollRow
                logos={infraByCategory.application}
                label="Application"
              />
              <InfrastructureScrollRow
                logos={infraByCategory.ai}
                label="AI &amp; ML"
              />
              <InfrastructureScrollRow
                logos={infraByCategory.quantum}
                label="Quantum"
              />
            </div>
          ) : Array.isArray(infrastructure) ? (
            <LogoRow logos={infrastructure} label="" />
          ) : null}
        </div>
      </motion.div>
    </section>
  );
}
