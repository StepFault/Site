/**
 * Landing Page Component Loader
 * Orchestrates all landing page components
 */
import { createNavigation } from './Navigation.js';
import { createHero } from './Hero.js';
import { createServicesGrid } from './ServicesGrid.js';
import { createTechMatrix } from './TechMatrix.js';
import { createContactForm } from './ContactForm.js';
import { createFooter } from './Footer.js';

/**
 * Initialize and render the landing page
 */
export function renderLandingPage() {
  const app = document.getElementById('app');
  if (!app) {
    console.error('App container not found');
    return;
  }

  // Render all components in order
  app.innerHTML = `
    ${createNavigation()}
    ${createHero()}
    ${createServicesGrid()}
    ${createTechMatrix()}
    ${createContactForm()}
    ${createFooter()}
  `;
}
