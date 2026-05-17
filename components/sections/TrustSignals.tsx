"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { BrandIcon, type BrandId } from "@/components/ui/BrandIcon";
import portfolioData from "@/lib/data/portfolio.json";

type PartnerLogo = { id: string; name: string; logo: string; url?: string };

type InfraItem = { brand: BrandId; name: string };

type InfraCategory = {
  id: string;
  title: string;
  items: InfraItem[];
  badge?: string;
};

const GLASS_CARD =
  "rounded-xl border border-white/10 bg-slate-900/40 p-6 shadow-2xl backdrop-blur-md " +
  "transition-all duration-300 hover:border-white/20 hover:bg-slate-800/50";

const INFRA_CATEGORIES: InfraCategory[] = [
  {
    id: "application",
    title: "Application",
    items: [
      { brand: "nextjs", name: "Next.js" },
      { brand: "tailwind", name: "Tailwind CSS" },
      { brand: "vercel", name: "Vercel" },
      { brand: "supabase", name: "Supabase" },
    ],
  },
  {
    id: "ai",
    title: "AI & ML",
    items: [
      { brand: "pytorch", name: "PyTorch" },
      { brand: "aws", name: "AWS" },
      { brand: "azure", name: "Microsoft Azure" },
      { brand: "openai", name: "OpenAI" },
    ],
    badge: "Powered by Dedicated Cloud Compute",
  },
  {
    id: "quantum",
    title: "Quantum / Compute",
    items: [
      { brand: "ibm", name: "IBM" },
      { brand: "python", name: "Python" },
      { brand: "cpp", name: "C++" },
    ],
  },
];

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
                  className="block rounded focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-zinc-900"
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

function InfraTechItem({ brand, name }: InfraItem) {
  return (
    <li className="group flex items-center gap-3 rounded-md border border-transparent px-2 py-2 transition-all duration-300 hover:border-white/10 hover:bg-white/5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center text-slate-400 transition-colors duration-300 group-hover:text-white">
        <BrandIcon brand={brand} className="h-6 w-6 fill-current" />
      </div>
      <span className="font-mono text-xs tracking-wide text-slate-300 transition-colors duration-300 group-hover:text-white">
        {name}
      </span>
    </li>
  );
}

function InfrastructureCategory({
  category,
  index,
}: {
  category: InfraCategory;
  index: number;
}) {
  return (
    <motion.article
      custom={index}
      variants={FADE_UP}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className={GLASS_CARD}
    >
      <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-300">
        {category.title}
      </h3>
      <ul className="mt-4 grid grid-cols-1 gap-1 sm:grid-cols-2">
        {category.items.map((item) => (
          <InfraTechItem key={item.brand} {...item} />
        ))}
      </ul>
      {category.badge && (
        <p className="mt-4 inline-flex rounded-md border border-emerald-400/20 bg-emerald-400/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-emerald-400/90">
          {category.badge}
        </p>
      )}
    </motion.article>
  );
}

export default function TrustSignals() {
  const partners = portfolioData.partners as {
    academic: PartnerLogo[];
  };
  const { academic } = partners;

  return (
    <section id="trust" className="relative z-0 w-full max-w-5xl scroll-mt-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className={`flex flex-col gap-8 ${GLASS_CARD}`}
      >
        <p className="max-w-xl text-left font-mono text-xs leading-relaxed text-slate-300">
          Research and infrastructure we ship against—relationships that inform
          architecture, not logo walls.
        </p>
        <LogoRow logos={academic} label="Academic &amp; Institutional Partners" />
        <div className="h-px w-full bg-white/10" />
        <div className="flex flex-col gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-300">
            Core Infrastructure
          </p>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {INFRA_CATEGORIES.map((category, i) => (
              <InfrastructureCategory
                key={category.id}
                category={category}
                index={i}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
