/**
 * BackgroundGrid Component
 * Animated SVG grid pattern for scientific/technical aesthetic
 * Renders a subtle digital blueprint/coordinate plane effect
 */
export function createBackgroundGrid() {
  return `
    <div class="background-grid" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; overflow: hidden; opacity: 0.15; pointer-events: none;">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="position: absolute; top: 0; left: 0;">
        <defs>
          <pattern id="grid-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(0, 188, 212, 0.3)" stroke-width="0.5"/>
          </pattern>
          <pattern id="grid-pattern-ai" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(156, 39, 176, 0.2)" stroke-width="0.5"/>
          </pattern>
          <linearGradient id="grid-fade" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:rgba(0, 188, 212, 0.1);stop-opacity:1" />
            <stop offset="50%" style="stop-color:rgba(0, 188, 212, 0.05);stop-opacity:1" />
            <stop offset="100%" style="stop-color:rgba(0, 188, 212, 0);stop-opacity:1" />
          </linearGradient>
          <style>
            @keyframes gridPulse {
              0%, 100% { opacity: 0.15; }
              50% { opacity: 0.25; }
            }
            @keyframes gridMove {
              0% { transform: translate(0, 0); }
              100% { transform: translate(60px, 60px); }
            }
            .grid-animated {
              animation: gridPulse 8s ease-in-out infinite;
            }
            .grid-pattern-move {
              animation: gridMove 20s linear infinite;
            }
          </style>
        </defs>
        
        <!-- Main grid pattern -->
        <rect width="100%" height="100%" fill="url(#grid-pattern)" class="grid-pattern-move" />
        
        <!-- Secondary AI-themed grid overlay -->
        <rect width="100%" height="100%" fill="url(#grid-pattern-ai)" class="grid-pattern-move" style="animation-delay: -10s;" />
        
        <!-- Fade gradient overlay -->
        <rect width="100%" height="100%" fill="url(#grid-fade)" class="grid-animated" />
        
        <!-- Coordinate axes (subtle center lines) -->
        <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="rgba(0, 188, 212, 0.2)" stroke-width="1" stroke-dasharray="4,4" class="grid-animated" />
        <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="rgba(156, 39, 176, 0.15)" stroke-width="1" stroke-dasharray="4,4" class="grid-animated" style="animation-delay: -2s;" />
        
        <!-- Corner coordinate markers -->
        <circle cx="10%" cy="10%" r="2" fill="rgba(0, 188, 212, 0.3)" class="grid-animated" />
        <circle cx="90%" cy="10%" r="2" fill="rgba(0, 188, 212, 0.3)" class="grid-animated" style="animation-delay: -1s;" />
        <circle cx="10%" cy="90%" r="2" fill="rgba(156, 39, 176, 0.3)" class="grid-animated" style="animation-delay: -2s;" />
        <circle cx="90%" cy="90%" r="2" fill="rgba(156, 39, 176, 0.3)" class="grid-animated" style="animation-delay: -3s;" />
      </svg>
    </div>
  `;
}
