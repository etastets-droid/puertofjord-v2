import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        fjord: {
          50:  '#f2f6f7',
          100: '#e0eaec',
          200: '#c4d6db',
          300: '#9bbac3',
          400: '#6a96a4',
          500: '#4f7a8a',
          600: '#3d5f6e',
          700: '#2e4652',  // main fjord
          800: '#1e2e36',
          900: '#111b20',
          950: '#0a1115',
        },
        gold: {
          300: '#e8d5b0',
          400: '#d4b88a',
          500: '#b8946a',  // main gold
          600: '#9a7550',
          700: '#7a5c3c',
        },
        stone: {
          50:  '#faf8f5',
          100: '#f2ede6',
          200: '#e4d9cc',
          300: '#d0bfad',
          400: '#b8a08a',
          500: '#9a8068',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans:  ['"Jost"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.3em',
      },
    },
  },
  plugins: [],
} satisfies Config
