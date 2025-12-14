/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./assets/**/*.{js,html}",
    "./src/**/*.{js,html,py}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep Space Black background
        'space-black': '#0a0a0a',
        // Dark Indigo backgrounds
        'indigo-dark': {
          50: '#1a1a2e',
          100: '#16213e',
          200: '#0f172a',
          300: '#0c1222',
          400: '#0a0f1a',
        },
        // Cyan (Quantum) accent
        'quantum': {
          50: '#e0f7fa',
          100: '#b2ebf2',
          200: '#80deea',
          300: '#4dd0e1',
          400: '#26c6da',
          500: '#00bcd4',
          600: '#00acc1',
          700: '#0097a7',
          800: '#00838f',
          900: '#006064',
          DEFAULT: '#00bcd4',
        },
        // Violet (AI) accent
        'ai': {
          50: '#f3e5f5',
          100: '#e1bee7',
          200: '#ce93d8',
          300: '#ba68c8',
          400: '#ab47bc',
          500: '#9c27b0',
          600: '#8e24aa',
          700: '#7b1fa2',
          800: '#6a1b9a',
          900: '#4a148c',
          DEFAULT: '#9c27b0',
        },
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'monospace'],
        'sans': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      backgroundImage: {
        'space-gradient': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0f172a 100%)',
        'indigo-gradient': 'linear-gradient(135deg, #0f172a 0%, #1a1a2e 100%)',
      },
      backdropBlur: {
        'glass': '12px',
        'glass-strong': '20px',
      },
      boxShadow: {
        'technical': '0 0 0 1px rgba(0, 188, 212, 0.1)',
        'technical-glow': '0 0 0 1px rgba(0, 188, 212, 0.2), 0 0 10px rgba(0, 188, 212, 0.1)',
        'ai-glow': '0 0 0 1px rgba(156, 39, 176, 0.2), 0 0 10px rgba(156, 39, 176, 0.1)',
      },
    },
  },
  plugins: [],
}
