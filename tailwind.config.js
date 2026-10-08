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
        dark: {
          950: '#030712',
          900: '#080d1a',
          850: '#0c1427',
          800: '#111c38',
          700: '#1b2a4e',
        },
        primary: {
          DEFAULT: '#00f2fe',
          400: '#38bdf8',
          500: '#00f2fe',
          600: '#0284c7',
        },
        accent: {
          cyan: '#00f2fe',
          blue: '#4facfe',
          purple: '#8a2be2',
          neon: '#00ffcc',
          violet: '#a855f7',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
        arabic: ['Cairo', 'Outfit', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2.5s linear infinite',
        'border-pulse': 'borderPulse 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(0, 242, 254, 0.3)' },
          '100%': { boxShadow: '0 0 35px rgba(138, 43, 226, 0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        borderPulse: {
          '0%, 100%': { borderColor: 'rgba(0, 242, 254, 0.2)' },
          '50%': { borderColor: 'rgba(168, 85, 247, 0.5)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'cyber-grid': 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
      }
    },
  },
  plugins: [],
}
