const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ...colors,
        transparent: 'transparent',
        current: 'currentColor',
        purple: {
          100: '#EDDAFD',
          200: '#D8B6FC',
          300: '#BE90F7',
          400: '#A673EF',
          500: '#8247E5',
          600: '#6433C4',
          700: '#4A23A4',
          800: '#331684',
          900: '#220D6D',
        },
        white: '#FFFFFF',
        gray: {
          900: '#111827',
          800: '#1f2937',
          500: '#6b7280',
        },
        blackfill: '#1E1E1E',
        whiteFont: '#FCDDEC',
      },
    },
    backgroundImage: {
      hero: 'linear-gradient(rgba(181, 23, 158, 0.6), rgba(72, 12, 168, 0.06))',
      button:
        'linear-gradient(to right top, rgb(187, 247, 208), rgb(74, 222, 128), rgb(30 58 138))',
    },
  },
  plugins: [],
};
