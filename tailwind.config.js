/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Authentic VOGR & Branham.org Palette
        vogr: {
          navy: '#0C2340',        // Classic VOGR deep midnight navy
          navyDark: '#08172B',    // Dark footer/header navy
          navyLight: '#18385E',   // Accent navy
          navySoft: '#F0F4F8',    // Soft ice blue tint for backgrounds
          crimson: '#8B1E22',     // Classic sacred crimson/wine red
          crimsonHover: '#6E161A',
          gold: '#C59B27',        // Rich brass/altar gold
          goldHover: '#AD861E',
          goldSoft: '#FCF8ED',
          border: '#E2E8F0',
          card: '#FFFFFF',
        },
        church: {
          slate: '#334155',
          body: '#1E293B',
          muted: '#64748B',
          bgLight: '#F8FAFC',
          bgPure: '#FFFFFF',
          borderLight: '#E2E8F0',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'Cambria', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'church': '0 4px 20px -2px rgba(12, 35, 64, 0.08), 0 2px 6px -1px rgba(12, 35, 64, 0.04)',
        'church-lg': '0 10px 30px -4px rgba(12, 35, 64, 0.12), 0 4px 10px -2px rgba(12, 35, 64, 0.06)',
      }
    },
  },
  plugins: [],
}
