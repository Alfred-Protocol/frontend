const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './node_modules/flowbite/**/*.js'],
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
        blackfill: 'rgba(30, 30, 30, 1)',
        blackfillLess: 'rgba(30, 30, 30, 0.8)',
        whiteFont: '#FCDDEC',
        greenGrowth: '#66FF88',
        grayDark: 'rgba(252, 221, 236, 0.6)',
        solidPurple: 'rgba(65, 58, 184, 0.7)',
        solidPurpleDark: 'rgba(65, 58, 184, 1)',
        solidBlue: 'rgba(63, 55, 201, 0.7)',
        solidBlueDark: 'rgba(63, 55, 201, 1)',
        purpleLight: '#EF5DA8',
      },
      fontFamily: {
        sans: [
          'Inter var',
          // { fontFeatureSettings: '"cv11", "ss01"' },
          ...defaultTheme.fontFamily.sans,
        ],
      },
      backgroundImage: {
        hero: 'linear-gradient(rgba(181, 23, 158, 0.6), rgba(72, 12, 168, 0.06))',
        button:
          'linear-gradient(to right top, rgb(187, 247, 208), rgb(74, 222, 128), #A673EF)',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
