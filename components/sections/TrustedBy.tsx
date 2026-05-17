import { BrandIcon, type BrandId } from "@/components/ui/BrandIcon";

const TRUSTED_PARTNERS: { id: BrandId; label: string }[] = [
  { id: "google", label: "Google" },
  { id: "ycombinator", label: "Y Combinator" },
  { id: "techstars", label: "Techstars" },
  { id: "openai", label: "OpenAI" },
  { id: "anthropic", label: "Anthropic" },
  { id: "tulsa-remote", label: "Tulsa Remote" },
  { id: "tu", label: "University of Tulsa" },
];

export default function TrustedBy() {
  return (
    <section
      aria-label="Trusted by and partnered with"
      className="relative z-0 w-full max-w-6xl scroll-mt-20"
    >
      <p className="mb-4 text-center text-xs tracking-widest text-slate-500">
        TRUSTED BY &amp; PARTNERED WITH
      </p>
      <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8 px-4 sm:gap-x-12">
        {TRUSTED_PARTNERS.map(({ id, label }) => (
          <li key={id}>
            <div
              className="group flex flex-col items-center gap-2 text-slate-400 transition-colors duration-300 hover:text-white"
              title={label}
            >
              <BrandIcon brand={id} className="h-8 w-auto fill-current" />
              <span className="sr-only">{label}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
