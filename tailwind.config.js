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
        darkBg: '#0A0F1D',
        darkCard: '#131B2E',
        darkBorder: '#2E3A59',
        accentIndigo: '#6366F1',
        accentTeal: '#06B6D4',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}

