"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Deployments", href: "#deployments" },
  { label: "Partners", href: "#trust" },
  { label: "Demo", href: "#simulator" },
  { label: "Contact", href: "/contact" },
] as const;

export default function Navbar() {
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
          {NAV_LINKS.slice(0, -1).map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="font-mono text-xs tracking-widest text-zinc-500 transition-colors hover:text-zinc-200"
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={NAV_LINKS[NAV_LINKS.length - 1].href}
              className="rounded-md border border-zinc-700 bg-zinc-900 px-4 py-1.5 font-mono text-xs tracking-widest text-zinc-200 transition-colors hover:border-emerald-500/50 hover:bg-zinc-800 hover:text-emerald-400"
            >
              {NAV_LINKS[NAV_LINKS.length - 1].label}
            </a>
          </li>
        </ul>
      </nav>
    </motion.header>
  );
}
