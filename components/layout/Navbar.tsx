"use client";

import { motion } from "framer-motion";
import { Briefcase, Building2, Layers, Mail, MonitorPlay } from "lucide-react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Services", href: "#services", Icon: Briefcase },
  { label: "Deployments", href: "#deployments", Icon: Layers },
  { label: "Partners", href: "#trust", Icon: Building2 },
  { label: "Demo", href: "#simulator", Icon: MonitorPlay },
  { label: "Contact", href: "/contact", Icon: Mail },
] as const;

export default function Navbar() {
  const contactNav = NAV_LINKS[NAV_LINKS.length - 1];
  const ContactIcon = contactNav.Icon;

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-md"
    >
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 md:px-8">
        {/* Wordmark */}
        <Link
          href="/"
          className="font-mono text-sm font-bold tracking-[0.25em] text-zinc-200 transition-colors hover:text-emerald-400"
        >
          STEPFAULT
        </Link>

        {/* Nav links */}
        <ul className="flex items-center gap-5 sm:gap-6">
          {NAV_LINKS.slice(0, -1).map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                className="inline-flex items-center gap-1.5 font-mono text-xs tracking-widest text-zinc-500 transition-colors hover:text-zinc-200"
              >
                <Icon className="h-3.5 w-3.5 text-zinc-600" strokeWidth={2} aria-hidden />
                {label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={contactNav.href}
              className="inline-flex items-center gap-1.5 rounded-md border border-zinc-700 bg-zinc-900 px-4 py-1.5 font-mono text-xs tracking-widest text-zinc-200 transition-colors hover:border-emerald-500/50 hover:bg-zinc-800 hover:text-emerald-400"
            >
              <ContactIcon
                className="h-3.5 w-3.5 text-zinc-500"
                strokeWidth={2}
                aria-hidden
              />
              {contactNav.label}
            </a>
          </li>
        </ul>
      </nav>
    </motion.header>
  );
}
