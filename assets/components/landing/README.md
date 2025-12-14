# Landing Page Components

This directory contains modular components for the StepFault landing page, organized for maintainability and future refactoring.

## Component Structure

### BackgroundGrid.js
- **Purpose**: Animated SVG grid pattern for scientific/technical aesthetic
- **Location**: Behind Hero section
- **Features**: 
  - Digital blueprint/coordinate plane effect
  - Dual-layer grid (Quantum cyan + AI violet)
  - Subtle animations (pulse and slow movement)
  - Coordinate axes and corner markers
  - Low opacity (0.15) to maintain text readability
  - Responsive SVG that scales with viewport

### Navigation.js
- **Purpose**: Sticky navigation bar with glassmorphism styling
- **Location**: Top of page, sticky positioning
- **Features**: Mobile menu toggle, logo, navigation links

### Hero.js
- **Purpose**: High-converting hero section with primary CTA
- **Location**: First section after navigation
- **Features**: 
  - Main headline: "Building the Bridge Between Today's Software and Tomorrow's Quantum/AI Future"
  - Primary CTA button: "Start Your Project"
  - Glassmorphism card with technical borders

### ServicesGrid.js
- **Purpose**: 3-column grid showcasing services
- **Location**: After hero section
- **Services**:
  1. Full Stack Dev (Quantum theme)
  2. AI Strategy (AI theme)
  3. Technical Architecture (Quantum theme)
- **Features**: Glassmorphism cards with hover effects

### TechMatrix.js
- **Purpose**: Display technical stack to prove competence
- **Location**: After services section
- **Categories**:
  - Backend (Python, FastAPI, PostgreSQL, Supabase, Node.js)
  - Frontend (React, TypeScript, Tailwind CSS, Next.js, Vue.js)
  - AI/ML (TensorFlow, PyTorch, OpenAI API, LangChain, Scikit-learn)
  - Cloud & DevOps (AWS, Vercel, Docker, Kubernetes, GitHub Actions)
  - Quantum (Qiskit, Cirq, PennyLane, IBM Quantum)

### ContactForm.js
- **Purpose**: Contact form with dark theme styling
- **Location**: Bottom of page, before footer
- **Features**: 
  - Glassmorphism container
  - Technical border styling
  - Form validation (handled in script.js)
  - Focus states with quantum accent colors

### Footer.js
- **Purpose**: Footer with company info and navigation
- **Location**: Bottom of page
- **Features**: Company info, navigation links, copyright

## Usage

The components are currently embedded directly in `index.html` for static site compatibility. The `components.js` file contains the component definitions as functions that can be used if migrating to a build system or JavaScript framework.

### Current Implementation
- Components are directly in HTML with clear comment markers
- Each section is self-contained and can be easily identified

### Future Refactoring
If migrating to a build system (e.g., Vite, Webpack, or a framework):
1. Import components from `components.js`
2. Use a build step to inject components into HTML
3. Or migrate to a framework like React/Vue

## Design System

All components use the scientific/technical design system:
- **Colors**: Quantum (Cyan #00bcd4), AI (Violet #9c27b0)
- **Typography**: JetBrains Mono (headers), Inter (body)
- **Effects**: Glassmorphism, technical borders
- **Background**: Deep Space Black (#0a0a0a) with Indigo gradients
