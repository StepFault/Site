/**
 * Contact Form Component
 * Styled contact form matching the dark theme
 */
export function createContactForm() {
  return `
    <section id="contact" style="max-width: 800px; margin: 6rem auto; padding: 0 2rem;">
      <h2 class="font-mono text-quantum" style="text-align: center; font-size: 2.5rem; margin-bottom: 3rem;">Get In Touch</h2>
      <div class="glass border-technical-glow" style="padding: 3rem; border-radius: 20px;">
        <form id="contactForm" style="display: flex; flex-direction: column; gap: 1.5rem;" autocomplete="off">
          <div style="display: flex; flex-direction: column;">
            <label for="name" class="font-mono text-quantum" style="margin-bottom: 0.75rem; font-size: 0.95rem; font-weight: 500;">Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              required 
              class="glass-dark border-tech-subtle"
              style="padding: 1rem; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.08); background: rgba(0, 0, 0, 0.2); color: #fff; font-family: 'Inter', sans-serif; font-size: 1rem; transition: all 0.3s;"
              onfocus="this.style.borderColor='rgba(0, 188, 212, 0.4)'; this.style.boxShadow='0 0 0 3px rgba(0, 188, 212, 0.1)'"
              onblur="this.style.borderColor='rgba(255, 255, 255, 0.08)'; this.style.boxShadow='none'"
            >
          </div>
          <div style="display: flex; flex-direction: column;">
            <label for="email" class="font-mono text-quantum" style="margin-bottom: 0.75rem; font-size: 0.95rem; font-weight: 500;">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              required 
              class="glass-dark border-tech-subtle"
              style="padding: 1rem; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.08); background: rgba(0, 0, 0, 0.2); color: #fff; font-family: 'Inter', sans-serif; font-size: 1rem; transition: all 0.3s;"
              onfocus="this.style.borderColor='rgba(0, 188, 212, 0.4)'; this.style.boxShadow='0 0 0 3px rgba(0, 188, 212, 0.1)'"
              onblur="this.style.borderColor='rgba(255, 255, 255, 0.08)'; this.style.boxShadow='none'"
            >
          </div>
          <div style="display: flex; flex-direction: column;">
            <label for="message" class="font-mono text-quantum" style="margin-bottom: 0.75rem; font-size: 0.95rem; font-weight: 500;">Message</label>
            <textarea 
              id="message" 
              name="message" 
              rows="6" 
              required 
              class="glass-dark border-tech-subtle"
              style="padding: 1rem; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.08); background: rgba(0, 0, 0, 0.2); color: #fff; font-family: 'Inter', sans-serif; font-size: 1rem; resize: vertical; transition: all 0.3s;"
              onfocus="this.style.borderColor='rgba(0, 188, 212, 0.4)'; this.style.boxShadow='0 0 0 3px rgba(0, 188, 212, 0.1)'"
              onblur="this.style.borderColor='rgba(255, 255, 255, 0.08)'; this.style.boxShadow='none'"
            ></textarea>
          </div>
          <button 
            type="submit" 
            class="cta-button"
            style="background: linear-gradient(135deg, #00bcd4 0%, #0097a7 100%); color: #fff; padding: 1rem 2rem; border-radius: 999px; border: none; font-weight: 600; font-size: 1.1rem; cursor: pointer; transition: all 0.3s; box-shadow: 0 4px 20px rgba(0, 188, 212, 0.3); font-family: 'Inter', sans-serif; margin-top: 0.5rem;"
            onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 25px rgba(0, 188, 212, 0.4)'"
            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 20px rgba(0, 188, 212, 0.3)'"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  `;
}
