/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      purple: {
        100: '#EDDAFD',
        200: '#D8B6FC',
        800: '#331684',
        900: '#220D6D',
      },
    },
    backgroundImage: {
      hero: 'linear-gradient(151.26deg, #B182FF 0%, #8310C9 51.36%, #5315D9 98.61%)',
      button:
        'linear-gradient(to right top, rgb(187, 247, 208), rgb(74, 222, 128), rgb(126, 34, 206))',
    },
  },
  plugins: [],
};
