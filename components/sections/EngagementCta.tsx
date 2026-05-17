const MVP_CTA_HREF = "YOUR_STRIPE_OR_CALENDLY_LINK_1";
const FRACTIONAL_CTA_HREF = "YOUR_CALENDLY_LINK_2";

type EngagementCtaProps = {
  className?: string;
  /** Hero uses left-aligned CTAs on large screens. */
  align?: "center" | "start";
};

export default function EngagementCta({
  className = "",
  align = "center",
}: EngagementCtaProps) {
  const textAlign =
    align === "start" ? "text-center lg:text-left" : "text-center";
  const buttonsJustify =
    align === "start" ? "justify-center lg:justify-start" : "justify-center";

  return (
    <div className={["w-full", className].filter(Boolean).join(" ")}>
      <p className={`mb-6 text-lg leading-relaxed text-slate-300 ${textAlign}`}>
        Sprint slots are open this week. Book a call or scope fractional work.
      </p>
      <div className={`flex flex-wrap items-center gap-4 ${buttonsJustify}`}>
        <a
          href={MVP_CTA_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center rounded-md bg-blue-500 px-7 py-3 font-mono text-sm font-medium text-white shadow-[0_0_28px_rgba(59,130,246,0.35)] transition-[background-color,box-shadow] hover:bg-blue-400 hover:shadow-[0_0_36px_rgba(59,130,246,0.45)] sm:flex-none"
        >
          Book MVP Strategy Call
        </a>
        <a
          href={FRACTIONAL_CTA_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center rounded-md border border-white/10 bg-slate-900/30 px-7 py-3 font-mono text-sm text-slate-50 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-slate-800/50 sm:flex-none"
        >
          Explore Fractional Scoping
        </a>
      </div>
    </div>
  );
}
