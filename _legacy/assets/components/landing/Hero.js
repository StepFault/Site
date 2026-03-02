/**
 * Hero Section Component
 * High-converting hero section with primary CTA
 */
export function createHero() {
  return `
    <header class="hero" style="position: relative; overflow: hidden; min-height: 80vh; display: flex; align-items: center; justify-content: center; padding: 4rem 2rem;">
      <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0f172a 100%); z-index: 0;"></div>
      <div style="position: relative; z-index: 1; max-width: 900px; width: 100%; text-align: center;">
        <div class="glass-strong border-technical-glow" style="padding: 4rem 3rem; border-radius: 24px; backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);">
          <h1 class="font-mono text-quantum-glow" style="font-size: 3rem; margin-bottom: 1.5rem; line-height: 1.2;">
            Building the Bridge Between<br>
            <span class="text-ai-glow">Today's Software</span> and<br>
            <span class="text-quantum-glow">Tomorrow's Quantum/AI Future</span>
          </h1>
          <p class="font-sans" style="font-size: 1.25rem; color: #b0b0b0; margin-bottom: 2.5rem; line-height: 1.6;">
            Transform your business with cutting-edge technology solutions. From full-stack development to AI strategy and quantum computing integration.
          </p>
          <a href="#contact" class="cta-button" style="display: inline-block; background: linear-gradient(135deg, #00bcd4 0%, #0097a7 100%); color: #fff; padding: 1rem 2.5rem; border-radius: 999px; text-decoration: none; font-weight: 600; font-size: 1.1rem; transition: all 0.3s; box-shadow: 0 4px 20px rgba(0, 188, 212, 0.3);">
            Start Your Project
          </a>
        </div>
      </div>
    </header>
  `;
}
