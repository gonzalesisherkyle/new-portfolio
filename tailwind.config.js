/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6ffed',
          100: '#dafbda',
          200: '#9be9a8', // GitHub contribution level 1
          300: '#40c463', // GitHub contribution level 2
          400: '#30a14e', // GitHub contribution level 3
          500: '#216e39', // GitHub contribution level 4
          600: '#238636', // GitHub button green
          700: '#2ea043',
          800: '#3fb950',
          900: '#238636',
        },
        dark: {
          bg: '#0d1117',   // GitHub black
          card: '#161b22', // GitHub dark grey
          border: '#30363d',
          text: '#c9d1d9',
          muted: '#8b949e',
        }
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'],
        mono: ['"Fira Code"', '"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'pixel': '4px 4px 0px 0px rgba(0,0,0,1)',
        'pixel-hover': '2px 2px 0px 0px rgba(0,0,0,1)',
      }
    },
  },
  plugins: [],
}
