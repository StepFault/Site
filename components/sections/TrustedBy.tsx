import { BrandIcon, type BrandId } from "@/components/ui/BrandIcon";

type Partner = { id: BrandId; label: string };

const INDUSTRY_PARTNERS: Partner[] = [
  { id: "google", label: "Google" },
  { id: "ycombinator", label: "Y Combinator" },
  { id: "techstars", label: "Techstars" },
  { id: "openai", label: "OpenAI" },
  { id: "anthropic", label: "Anthropic" },
  { id: "tulsa-remote", label: "Tulsa Remote" },
];

const ACADEMIC_PARTNERS: Partner[] = [
  { id: "tu", label: "University of Tulsa" },
  { id: "ttcu", label: "TTCU" },
  { id: "stanford", label: "Stanford University" },
  { id: "mit", label: "MIT" },
  { id: "research-partner", label: "Research Partner (swap logo)" },
];

function PartnerLogoRow({ partners }: { partners: Partner[] }) {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 px-2 sm:gap-x-10 md:gap-x-12">
      {partners.map(({ id, label }) => (
        <li key={id}>
          <div
            className="group flex min-h-[2.5rem] min-w-[4rem] flex-col items-center justify-center text-slate-400 transition-colors duration-300 hover:text-white"
            title={label}
          >
            <BrandIcon brand={id} className="h-8 w-auto max-w-[7rem] fill-current" />
            <span className="sr-only">{label}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

function PartnerTier({
  eyebrow,
  partners,
}: {
  eyebrow: string;
  partners: Partner[];
}) {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-slate-500">
        {eyebrow}
      </p>
      <PartnerLogoRow partners={partners} />
    </div>
  );
}

export default function TrustedBy() {
  return (
    <section
      aria-label="Trusted by and partnered with"
      className="relative z-0 w-full max-w-6xl scroll-mt-20"
    >
      <p className="mb-6 text-center text-xs tracking-widest text-slate-500">
        TRUSTED BY &amp; PARTNERED WITH
      </p>
      <div className="flex flex-col gap-10 rounded-xl border border-white/5 bg-slate-900/20 px-4 py-8 backdrop-blur-sm sm:px-8">
        <PartnerTier eyebrow="Industry" partners={INDUSTRY_PARTNERS} />
        <div className="h-px w-full max-w-md self-center bg-white/10" aria-hidden />
        <PartnerTier eyebrow="Academic &amp; Research" partners={ACADEMIC_PARTNERS} />
      </div>
    </section>
  );
}
