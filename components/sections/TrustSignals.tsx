"use client";

import { motion, type Variants } from "framer-motion";
import { BrandIcon, type BrandId } from "@/components/ui/BrandIcon";

type InfraItem = { brand: BrandId; name: string };

type InfraCategory = {
  id: string;
  title: string;
  items: InfraItem[];
  badge?: string;
  highlight?: boolean;
};

const GLASS_CARD =
  "rounded-xl border border-white/10 bg-slate-900/40 p-5 shadow-2xl backdrop-blur-md " +
  "transition-all duration-300 hover:border-white/20 hover:bg-slate-800/50 sm:p-6";

const GLASS_HIGHLIGHT =
  "border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)] hover:border-blue-400/40 hover:shadow-[0_0_22px_rgba(59,130,246,0.15)]";

const INFRA_CATEGORIES: InfraCategory[] = [
  {
    id: "frontend",
    title: "Frontend & UX",
    items: [
      { brand: "nextjs", name: "Next.js" },
      { brand: "react", name: "React" },
      { brand: "tailwind", name: "Tailwind CSS" },
      { brand: "framer", name: "Framer Motion" },
    ],
  },
  {
    id: "backend",
    title: "Backend & Data",
    items: [
      { brand: "nodejs", name: "Node.js" },
      { brand: "python", name: "Python" },
      { brand: "postgresql", name: "PostgreSQL" },
      { brand: "supabase", name: "Supabase" },
      { brand: "redis", name: "Redis" },
    ],
  },
  {
    id: "ai",
    title: "AI & Machine Learning",
    highlight: true,
    items: [
      { brand: "pytorch", name: "PyTorch" },
      { brand: "tensorflow", name: "TensorFlow" },
      { brand: "huggingface", name: "Hugging Face" },
      { brand: "langchain", name: "LangChain" },
      { brand: "openai", name: "OpenAI" },
    ],
    badge: "Dedicated Azure/AWS compute available",
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    highlight: true,
    items: [
      { brand: "aws", name: "AWS" },
      { brand: "azure", name: "Microsoft Azure" },
      { brand: "docker", name: "Docker" },
      { brand: "github-actions", name: "GitHub Actions" },
      { brand: "vercel", name: "Vercel" },
    ],
  },
  {
    id: "quantum",
    title: "Quantum & Deep Tech",
    items: [
      { brand: "qiskit", name: "Qiskit" },
      { brand: "ibm-quantum", name: "IBM Quantum" },
      { brand: "cpp", name: "C++" },
    ],
  },
];

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: "easeOut" as const },
  }),
};

function InfraTechItem({ brand, name }: InfraItem) {
  return (
    <li className="group flex items-center gap-2.5 rounded-md border border-transparent px-1.5 py-1.5 transition-all duration-300 hover:border-white/10 hover:bg-white/5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center text-slate-400 transition-colors duration-300 group-hover:text-white">
        <BrandIcon brand={brand} className="h-5 w-5 fill-current" />
      </div>
      <span className="font-mono text-[11px] leading-tight tracking-wide text-slate-300 transition-colors duration-300 group-hover:text-white sm:text-xs">
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
  const cardClass = [
    GLASS_CARD,
    category.highlight ? GLASS_HIGHLIGHT : "",
  ].join(" ");

  return (
    <motion.article
      custom={index}
      variants={FADE_UP}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className={cardClass}
    >
      <h3 className="font-mono text-[10px] uppercase tracking-[0.28em] text-slate-300">
        {category.title}
      </h3>
      <ul className="mt-3 flex flex-col gap-0.5">
        {category.items.map((item) => (
          <InfraTechItem key={`${category.id}-${item.brand}`} {...item} />
        ))}
      </ul>
      {category.badge && (
        <p className="mt-3 inline-flex rounded-md border border-emerald-400/20 bg-emerald-400/5 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-emerald-400/90">
          {category.badge}
        </p>
      )}
    </motion.article>
  );
}

export default function TrustSignals() {
  return (
    <section
      id="trust"
      className="relative z-0 w-full max-w-7xl scroll-mt-20"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-2 px-1">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-300">
            Core Infrastructure
          </p>
          <p className="max-w-2xl font-mono text-xs leading-relaxed text-slate-300">
            Stack we run in production. Frontend, data, ML, and cloud. Built to
            ship fast and stay maintainable.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {INFRA_CATEGORIES.map((category, i) => (
            <InfrastructureCategory
              key={category.id}
              category={category}
              index={i}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
