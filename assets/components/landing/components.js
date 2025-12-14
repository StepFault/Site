/**
 * Landing Page Components
 * Modular component system for the landing page
 */

const LandingComponents = {
  /**
   * BackgroundGrid Component - Page-wide background
   */
  BackgroundGrid: () => `
    <div class="background-grid" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; overflow: hidden; pointer-events: none;">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="position: absolute; top: 0; left: 0;">
        <defs>
          <pattern id="grid-pattern-page" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(0, 188, 212, 0.4)" stroke-width="0.5"/>
          </pattern>
          <pattern id="grid-pattern-ai-page" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(156, 39, 176, 0.3)" stroke-width="0.5"/>
          </pattern>
          <linearGradient id="grid-fade-page" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:rgba(0, 188, 212, 0.15);stop-opacity:1" />
            <stop offset="50%" style="stop-color:rgba(0, 188, 212, 0.08);stop-opacity:1" />
            <stop offset="100%" style="stop-color:rgba(0, 188, 212, 0);stop-opacity:1" />
          </linearGradient>
        </defs>
        
        <!-- Main grid pattern -->
        <rect width="100%" height="100%" fill="url(#grid-pattern-page)" class="grid-pattern-move" />
        
        <!-- Secondary AI-themed grid overlay -->
        <rect width="100%" height="100%" fill="url(#grid-pattern-ai-page)" class="grid-pattern-move" style="animation-delay: -10s;" />
        
        <!-- Fade gradient overlay -->
        <rect width="100%" height="100%" fill="url(#grid-fade-page)" class="grid-animated" />
        
        <!-- Coordinate axes (subtle center lines) -->
        <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="rgba(0, 188, 212, 0.3)" stroke-width="1" stroke-dasharray="4,4" class="grid-animated" />
        <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="rgba(156, 39, 176, 0.25)" stroke-width="1" stroke-dasharray="4,4" class="grid-animated" style="animation-delay: -2s;" />
        
        <!-- Corner coordinate markers -->
        <circle cx="10%" cy="10%" r="3" fill="rgba(0, 188, 212, 0.4)" class="grid-animated" />
        <circle cx="90%" cy="10%" r="3" fill="rgba(0, 188, 212, 0.4)" class="grid-animated" style="animation-delay: -1s;" />
        <circle cx="10%" cy="90%" r="3" fill="rgba(156, 39, 176, 0.4)" class="grid-animated" style="animation-delay: -2s;" />
        <circle cx="90%" cy="90%" r="3" fill="rgba(156, 39, 176, 0.4)" class="grid-animated" style="animation-delay: -3s;" />
      </svg>
    </div>
  `,

  /**
   * Navigation Component
   */
  Navigation: () => `
    <nav class="navbar glass-dark" style="position: sticky; top: 0; z-index: 1000; backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); position: relative; z-index: 1000;">
      <div style="display: flex; align-items: center; gap: 0.7rem;">
        <img src="assets/stepfault-logo.svg" alt="StepFault Logo" class="logo" style="height: 38px; width: 38px;">
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
  `,

  /**
   * BackgroundGrid Component - Page-wide background
   */
  BackgroundGrid: () => `
    <div class="background-grid" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; overflow: hidden; pointer-events: none;">
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
  `,

  /**
   * Hero Section Component
   */
  Hero: () => `
    <header class="hero" style="position: relative; overflow: hidden; min-height: 80vh; display: flex; align-items: center; justify-content: center; padding: 4rem 2rem; z-index: 1;">
      <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0f172a 100%); z-index: 0;"></div>
      <!-- Hero section is now free for custom background effects -->
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
  `,

  /**
   * Services Grid Component
   */
  ServicesGrid: () => {
    const services = [
      {
        title: 'Full Stack Dev',
        description: 'End-to-end web application development. Modern frameworks, scalable architectures, and cloud-native solutions that grow with your business.',
        icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
        theme: 'quantum',
        gradient: 'linear-gradient(135deg, #00bcd4 0%, #0097a7 100%)',
        glowColor: 'rgba(0, 188, 212, 0.2)',
        iconPath: null
      },
      {
        title: 'AI Strategy',
        description: 'Strategic AI implementation and machine learning solutions. From automation to predictive analytics, unlock the power of artificial intelligence.',
        icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
        theme: 'ai',
        gradient: 'linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)',
        glowColor: 'rgba(156, 39, 176, 0.2)',
        iconPath: null
      },
      {
        title: 'Technical Architecture',
        description: 'Scalable system design and cloud infrastructure. Build robust, maintainable architectures that handle growth and complexity with ease.',
        icon: 'M3 9h18M9 21V9',
        theme: 'quantum',
        gradient: 'linear-gradient(135deg, #00bcd4 0%, #0097a7 100%)',
        glowColor: 'rgba(0, 188, 212, 0.2)',
        iconPath: 'M3 3h18v18H3V3zm0 6h18M9 21V9'
      }
    ];

    const createServiceCard = (service) => {
      const glassClass = service.theme === 'ai' ? 'glass-ai border-technical-ai-glow' : 'glass border-technical-glow';
      const textClass = service.theme === 'ai' ? 'text-ai' : 'text-quantum';
      
      return `
        <div class="${glassClass}" 
             style="padding: 2.5rem 2.5rem 3.25rem 2.5rem; border-radius: 20px; transition: all 0.3s; cursor: pointer;" 
             onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 10px 30px ${service.glowColor}'"
             onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
          <div style="width: 60px; height: 60px; background: ${service.gradient}; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem;">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
              ${service.iconPath ? `
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <path d="${service.icon}"/>
              ` : `
                <path d="${service.icon}"/>
              `}
            </svg>
          </div>
          <h3 class="font-mono ${textClass}" style="font-size: 1.5rem; margin-bottom: 1rem;">${service.title}</h3>
          <p class="font-sans" style="color: #b0b0b0; line-height: 1.6; font-size: 1rem; margin-bottom: 0;">
            ${service.description}
          </p>
        </div>
      `;
    };

    return `
      <section id="services" style="max-width: 1200px; margin: 6rem auto; padding: 0 2rem; position: relative; z-index: 1;">
        <h2 class="font-mono text-quantum" style="text-align: center; font-size: 2.5rem; margin-bottom: 3rem;">Our Services</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
          ${services.map(createServiceCard).join('')}
        </div>
      </section>
    `;
  },

  /**
   * Tech Matrix Component
   */
  TechMatrix: () => {
    const techStack = {
      backend: {
        title: 'Backend',
        theme: 'quantum',
        technologies: ['Python', 'FastAPI', 'PostgreSQL', 'Supabase', 'Node.js']
      },
      frontend: {
        title: 'Frontend',
        theme: 'ai',
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Vue.js']
      },
      aiMl: {
        title: 'AI/ML',
        theme: 'ai',
        technologies: ['TensorFlow', 'PyTorch', 'OpenAI API', 'LangChain', 'Scikit-learn']
      },
      cloudDevOps: {
        title: 'Cloud & DevOps',
        theme: 'quantum',
        technologies: ['AWS', 'Vercel', 'Docker', 'Kubernetes', 'GitHub Actions']
      },
      quantum: {
        title: 'Quantum',
        theme: 'quantum',
        technologies: ['Qiskit', 'Cirq', 'PennyLane', 'IBM Quantum']
      }
    };

    const createTechCategory = (category) => {
      const textClass = category.theme === 'ai' ? 'text-ai' : 'text-quantum';
      const borderColor = category.theme === 'ai' ? 'rgba(156, 39, 176, 0.2)' : 'rgba(0, 188, 212, 0.2)';
      
      return `
        <div>
          <h3 class="font-mono ${textClass}" style="font-size: 1.25rem; margin-bottom: 1rem; border-bottom: 1px solid ${borderColor}; padding-bottom: 0.5rem;">${category.title}</h3>
          <ul style="list-style: none; padding: 0;">
            ${category.technologies.map(tech => `
              <li class="font-mono" style="color: #b0b0b0; padding: 0.5rem 0; font-size: 0.95rem;">${tech}</li>
            `).join('')}
          </ul>
        </div>
      `;
    };

    return `
      <section id="tech" style="max-width: 1200px; margin: 6rem auto; padding: 0 2rem; position: relative; z-index: 1;">
        <h2 class="font-mono text-quantum" style="text-align: center; font-size: 2.5rem; margin-bottom: 3rem;">Technical Stack</h2>
        <div class="glass border-technical-glow" style="padding: 3rem; border-radius: 20px;">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem;">
            ${Object.values(techStack).map(createTechCategory).join('')}
          </div>
        </div>
      </section>
    `;
  },

  /**
   * Contact Form Component
   */
  ContactForm: () => `
    <section id="contact" style="max-width: 800px; margin: 6rem auto; padding: 0 2rem; position: relative; z-index: 1;">
      <h2 class="font-mono text-quantum" style="text-align: center; font-size: 2.5rem; margin-bottom: 3rem;">Get In Touch</h2>
      <div class="glass border-technical-glow" style="padding: 3rem 3rem 3.5rem 3rem; border-radius: 20px;">
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
            style="background: linear-gradient(135deg, #00bcd4 0%, #0097a7 100%); color: #fff; padding: 1rem 2rem; border-radius: 999px; border: none; font-weight: 600; font-size: 1.1rem; cursor: pointer; transition: all 0.3s; box-shadow: 0 4px 20px rgba(0, 188, 212, 0.3); font-family: 'Inter', sans-serif; margin-top: 0.5rem; margin-bottom: 0;"
            onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 25px rgba(0, 188, 212, 0.4)'"
            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 20px rgba(0, 188, 212, 0.3)'"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  `,

  /**
   * Footer Component
   */
  Footer: () => `
    <footer class="glass-dark" style="background: rgba(0, 0, 0, 0.3); color: #b0b0b0; text-align: center; padding: 3rem 1rem; margin-top: 6rem; border-top: 1px solid rgba(255, 255, 255, 0.05); position: relative; z-index: 1;">
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
  `
};
