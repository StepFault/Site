import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Driven by CSS variables set in app/layout.tsx
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "Fira Code", "monospace"],
      },
      // Semantic design-system aliases that map to the strict Zinc/Emerald palette.
      // All raw palette tokens (zinc-*, emerald-*, blue-*) remain available via
      // Tailwind's defaults — these aliases exist only for semantic shorthand.
      colors: {
        background: {
          DEFAULT: "rgb(9 9 11)",    // zinc-950  — primary canvas
          surface: "rgb(24 24 27)", // zinc-900  — card / panel surfaces
        },
        border: {
          DEFAULT: "rgb(39 39 42)", // zinc-800  — sharp geometric borders
          subtle: "rgb(63 63 70)",  // zinc-700  — secondary dividers
        },
        text: {
          primary: "rgb(228 228 231)",  // zinc-200
          secondary: "rgb(113 113 122)", // zinc-500
          muted: "rgb(82 82 91)",        // zinc-600
        },
        accent: {
          DEFAULT: "rgb(52 211 153)",  // emerald-400 — live status, terminal output
          alt: "rgb(96 165 250)",      // blue-400    — alternate accent
        },
      },
      borderRadius: {
        // Enforce "minimal rounded corners" from the .cursorrules aesthetic directive.
        // Components should reach for `rounded` (4px) or `rounded-md` (6px) at most.
        DEFAULT: "0.25rem",
        md: "0.375rem",
      },
    },
  },
  plugins: [],
};

export default config;
