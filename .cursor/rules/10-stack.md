# Technology Stack Rules (Stepfault.ai Showroom)

Guidelines specific to the Next.js and TypeScript architecture used in this project. **CRITICAL:** This repository DOES NOT contain the actual MAPOS backend Python/Node orchestration logic. It is a pure frontend simulation.

## Core Framework
- **Next.js App Router:** Assume React 19 and Next.js App Router for all routing.
- **TypeScript:** Strict TypeScript must be used across all files. No `any` types.
- **Server Components Default:** Default to React Server Components. 
- **Client Components:** Use `"use client"` strictly at the top of files that require browser APIs, state, or interactive UI/Framer Motion.

## Styling & UI Design
- **Tailwind CSS:** Use Tailwind for all styling. Do not create custom `.css` files unless defining global font variables.
- **Dark Mode Only:** The site is strictly dark mode. 
  - Backgrounds: Use `bg-zinc-950` or `bg-black`.
  - Text: Primary copy is `text-zinc-200`, secondary is `text-zinc-500`.
  - Accents: Use `text-emerald-400` or `text-blue-500` strictly for live status indicators, terminal outputs, and success states.
- **Typography:** - Body/Copy: `font-sans` (Inter).
  - Terminal/Data/Metrics: `font-mono` (JetBrains Mono or Fira Code).
- **Geometry:** Borders should be sharp (`border-zinc-800`) with minimal rounding (max `rounded-md`).

## Animations
- **Framer Motion:** Use Framer Motion to create deterministic MAPOS simulations. 
- **Syntax:** Ensure zero broken syntax in variants. Keep animations high-signal, low-noise to match the "Stripe Docs meets Elite CLI" aesthetic.

## Backend & API Routing
- **Route Handlers:** Use Next.js Route Handlers (`app/api/`) written in TypeScript. **DO NOT** use Python.
- **Simulated Logic:** Do not write actual agent-routing logic; write UI components and API responses that *simulate* it for the VC showroom.

## Database & Authentication
- **Supabase:** Use Supabase for the database layer.
- **Client Library:** Utilize `@supabase/ssr` for the waitlist, contact forms, and any required data persistence.

## Performance & Security
- **Vercel Edge:** Maximize Vercel Edge Runtime for static and marketing pages to ensure <50ms TTFB for VC automated scrapers.
- **Environment Variables:** All environment variables must be typed and validated.