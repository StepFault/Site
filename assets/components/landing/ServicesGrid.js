/**
 * Services Grid Component
 * 3-column grid showcasing services with glassmorphism styling
 */
export function createServicesGrid() {
  const services = [
    {
      title: 'Full Stack Dev',
      description: 'End-to-end web application development. Modern frameworks, scalable architectures, and cloud-native solutions that grow with your business.',
      icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
      theme: 'quantum',
      gradient: 'linear-gradient(135deg, #00bcd4 0%, #0097a7 100%)',
      glowColor: 'rgba(0, 188, 212, 0.2)'
    },
    {
      title: 'AI Strategy',
      description: 'Strategic AI implementation and machine learning solutions. From automation to predictive analytics, unlock the power of artificial intelligence.',
      icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
      theme: 'ai',
      gradient: 'linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)',
      glowColor: 'rgba(156, 39, 176, 0.2)'
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
    const iconPath = service.iconPath || service.icon;
    
    return `
      <div class="${glassClass}" 
           style="padding: 2.5rem; border-radius: 20px; transition: all 0.3s; cursor: pointer;" 
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
        <p class="font-sans" style="color: #b0b0b0; line-height: 1.6; font-size: 1rem;">
          ${service.description}
        </p>
      </div>
    `;
  };

  return `
    <section id="services" style="max-width: 1200px; margin: 6rem auto; padding: 0 2rem;">
      <h2 class="font-mono text-quantum" style="text-align: center; font-size: 2.5rem; margin-bottom: 3rem;">Our Services</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
        ${services.map(createServiceCard).join('')}
      </div>
    </section>
  `;
}
