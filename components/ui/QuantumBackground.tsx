/**
 * Subtle quantum / genetics themed backdrop — CSS + SVG only, no WebGL.
 */
export default function QuantumBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-[1] overflow-hidden bg-slate-950"
    >
      <div className="quantum-mesh absolute inset-0 opacity-[0.22]" />

      <svg
        className="quantum-lattice absolute inset-0 h-full w-full opacity-[0.18]"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id="quantum-grid"
            width="120"
            height="120"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="20" cy="20" r="1.2" fill="rgb(96 165 250)" opacity="0.5" />
            <circle cx="60" cy="45" r="1" fill="rgb(167 139 250)" opacity="0.45" />
            <circle cx="95" cy="30" r="0.9" fill="rgb(56 189 248)" opacity="0.4" />
            <circle cx="40" cy="85" r="1.1" fill="rgb(129 140 248)" opacity="0.45" />
            <circle cx="88" cy="92" r="0.8" fill="rgb(96 165 250)" opacity="0.35" />
            <path
              d="M20 20 L60 45 L95 30 M60 45 L40 85 M40 85 L88 92 M95 30 L88 92"
              stroke="rgb(99 102 241)"
              strokeWidth="0.35"
              fill="none"
              opacity="0.25"
            />
          </pattern>
          <linearGradient id="quantum-wave" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(30 58 138)" stopOpacity="0" />
            <stop offset="45%" stopColor="rgb(67 56 202)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="rgb(30 64 175)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#quantum-grid)" />
        <path
          className="quantum-wave-path"
          d="M-10% 55% Q25% 35%, 50% 50% T110% 45%"
          stroke="url(#quantum-wave)"
          strokeWidth="120"
          fill="none"
          opacity="0.5"
        />
        <path
          className="quantum-wave-path quantum-wave-path-delayed"
          d="M-5% 70% Q30% 58%, 55% 68% T105% 62%"
          stroke="url(#quantum-wave)"
          strokeWidth="90"
          fill="none"
          opacity="0.35"
        />
      </svg>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgb(2_6_23)_72%)] opacity-80" />
    </div>
  );
}
