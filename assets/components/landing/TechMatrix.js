/**
 * Tech Matrix Component
 * Displays technical stack to prove competence
 */
export function createTechMatrix() {
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
    <section id="tech" style="max-width: 1200px; margin: 6rem auto; padding: 0 2rem;">
      <h2 class="font-mono text-quantum" style="text-align: center; font-size: 2.5rem; margin-bottom: 3rem;">Technical Stack</h2>
      <div class="glass border-technical-glow" style="padding: 3rem; border-radius: 20px;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem;">
          ${Object.values(techStack).map(createTechCategory).join('')}
        </div>
      </div>
    </section>
  `;
}
