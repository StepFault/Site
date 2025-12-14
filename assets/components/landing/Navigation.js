/**
 * Navigation Component
 * Sticky navigation with glassmorphism styling
 */
export function createNavigation() {
  return `
    <nav class="navbar glass-dark" style="position: sticky; top: 0; z-index: 1000; backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);">
      <div style="display: flex; align-items: center; gap: 0.7rem;">
        <img src="assets/stepfault-logo.png" alt="StepFault Technical Consulting Logo" class="logo" style="height: 24px; width: auto; max-height: 24px;">
        <span class="font-mono text-quantum" style="font-size: 1.35rem; font-weight: 600; letter-spacing: 1px;">StepFault</span>
      </div>
      <div class="menu-toggle" id="menuToggle" aria-label="Open navigation" tabindex="0">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul class="nav-links" id="navLinks">
        <li><a href="#services">Services</a></li>
        <li><a href="#tech">Tech Stack</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  `;
}
