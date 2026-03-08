import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact | Stepfault",
  description: "Get in touch with the Stepfault team.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-zinc-200 antialiased">
        <div className="mx-auto max-w-2xl px-6 pt-28 pb-24">
          {/* Back to home (visible on both form and success) */}
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 font-mono text-sm text-zinc-500 transition-colors hover:text-emerald-400"
          >
            <span aria-hidden>←</span>
            Back to home
          </Link>

          <div className="mb-2 flex items-center gap-2 font-mono text-xs text-zinc-500">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span>Contact</span>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-zinc-200">
            Get in touch
          </h1>
          <p className="mt-3 text-zinc-500">
            Have a question or want to schedule a demo? Fill out the form below
            and we&apos;ll get back to you within 24 hours.
          </p>

          <div className="mt-10">
            <ContactForm />
          </div>
        </div>
      </main>
    </>
  );
}