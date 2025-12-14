/**
 * Footer Component
 * Footer with company info and navigation links
 */
export function createFooter() {
  return `
    <footer class="glass-dark" style="background: rgba(0, 0, 0, 0.3); color: #b0b0b0; text-align: center; padding: 3rem 1rem; margin-top: 6rem; border-top: 1px solid rgba(255, 255, 255, 0.05);">
      <div style="max-width: 1200px; margin: 0 auto; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 2rem;">
        <div style="flex: 1 1 200px; text-align: left; min-width: 180px;">
          <strong class="font-mono text-quantum" style="font-size: 1.1rem;">StepFault</strong><br>
          <span class="font-sans" style="font-size: 0.9rem; color: #888;">Building the Bridge Between Today's Software<br>and Tomorrow's Quantum/AI Future</span><br>
          <span class="font-sans" style="font-size: 0.85rem; color: #666; margin-top: 0.5rem; display: block;">Tulsa, OK</span>
        </div>
        <div style="flex: 1 1 200px; min-width: 180px;">
          <nav style="display: flex; gap: 1.5rem; justify-content: center; flex-wrap: wrap;">
            <a href="#services" class="font-sans" style="color: #b0b0b0; text-decoration: none; transition: color 0.3s;" onmouseover="this.style.color='#00bcd4'" onmouseout="this.style.color='#b0b0b0'">Services</a>
            <a href="#tech" class="font-sans" style="color: #b0b0b0; text-decoration: none; transition: color 0.3s;" onmouseover="this.style.color='#00bcd4'" onmouseout="this.style.color='#b0b0b0'">Tech Stack</a>
            <a href="#contact" class="font-sans" style="color: #b0b0b0; text-decoration: none; transition: color 0.3s;" onmouseover="this.style.color='#00bcd4'" onmouseout="this.style.color='#b0b0b0'">Contact</a>
          </nav>
        </div>
        <div style="flex: 1 1 200px; text-align: right; min-width: 180px;">
          <span class="font-sans" style="font-size: 0.9rem;">&copy; 2025 StepFault. All rights reserved.</span><br>
          <span class="font-sans" style="font-size: 0.85rem; color: #666; margin-top: 0.5rem; display: block;">Privacy Policy | Terms of Service</span>
        </div>
      </div>
    </footer>
  `;
}
