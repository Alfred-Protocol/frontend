const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
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
      },
    },
    colors,
    backgroundImage: {
      hero: 'linear-gradient(151.26deg, #B182FF 0%, #8310C9 51.36%, #5315D9 98.61%)',
      button:
        'linear-gradient(to right top, rgb(187, 247, 208), rgb(74, 222, 128), rgb(126, 34, 206))',
    },
  },
  plugins: [],
};
