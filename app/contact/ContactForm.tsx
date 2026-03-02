"use client";

import { useState } from "react";

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface ValidationError {
  field: string;
  message: string;
}

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const fieldError = (field: string): string | undefined =>
    errors.find((e) => e.field === field)?.message;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear field-level error on change
    if (errors.some((e) => e.field === name)) {
      setErrors((prev) => prev.filter((e) => e.field !== name));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrors([]);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        if (data.details) {
          setErrors(data.details);
        }
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-md border border-emerald-400/30 bg-emerald-400/5 p-6 text-center">
        <p className="font-mono text-emerald-400">Message sent successfully.</p>
        <p className="mt-2 text-sm text-zinc-500">We&apos;ll be in touch soon.</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 font-mono text-sm text-zinc-400 hover:text-zinc-200"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block font-mono text-sm text-zinc-400">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          disabled={status === "submitting"}
          className="mt-1 w-full rounded-md border border-zinc-800 bg-zinc-950 px-4 py-2 font-mono text-zinc-200 placeholder:text-zinc-600 focus:border-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-700 disabled:opacity-50"
          placeholder="Your name"
        />
        {fieldError("name") && (
          <p className="mt-1 font-mono text-xs text-red-400">{fieldError("name")}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block font-mono text-sm text-zinc-400">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          disabled={status === "submitting"}
          className="mt-1 w-full rounded-md border border-zinc-800 bg-zinc-950 px-4 py-2 font-mono text-zinc-200 placeholder:text-zinc-600 focus:border-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-700 disabled:opacity-50"
          placeholder="you@example.com"
        />
        {fieldError("email") && (
          <p className="mt-1 font-mono text-xs text-red-400">{fieldError("email")}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block font-mono text-sm text-zinc-400">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          disabled={status === "submitting"}
          className="mt-1 w-full resize-none rounded-md border border-zinc-800 bg-zinc-950 px-4 py-2 font-mono text-zinc-200 placeholder:text-zinc-600 focus:border-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-700 disabled:opacity-50"
          placeholder="Tell us about your project..."
        />
        {fieldError("message") && (
          <p className="mt-1 font-mono text-xs text-red-400">{fieldError("message")}</p>
        )}
      </div>

      {/* Error banner */}
      {status === "error" && errors.length === 0 && (
        <div className="rounded-md border border-red-400/30 bg-red-400/5 p-4">
          <p className="font-mono text-sm text-red-400">
            Something went wrong. Please try again.
          </p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-md bg-emerald-400 px-6 py-3 font-mono text-sm text-black transition-colors hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}