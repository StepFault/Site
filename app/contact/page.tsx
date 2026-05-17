import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact | Stepfault",
  description:
    "Book an MVP strategy call or explore fractional scoping with Stepfault.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-950 text-zinc-200 antialiased">
        <div className="mx-auto max-w-2xl px-6 pt-28 pb-24">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 font-mono text-sm text-slate-300 transition-colors hover:text-emerald-400"
          >
            <span aria-hidden>←</span>
            Back to home
          </Link>

          <div className="mb-2 flex items-center gap-2 font-mono text-xs text-slate-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span>Engagement</span>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Move fast with senior engineering
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-300">
            Pick a path below. No intake forms. We reply when it is a fit.
          </p>

          <div className="mt-10">
            <ContactForm />
          </div>
        </div>
      </main>
    </>
  );
}
