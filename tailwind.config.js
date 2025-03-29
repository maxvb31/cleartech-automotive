const { theme } = require('@sanity/demo/tailwind')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './intro-template/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    ...theme,
    fontFamily: {
      sans: ['NeueHaasGrotesk', 'sans-serif'],
      inter: ['Inter', 'sans-serif'],
      helvetica: ['Helvetica', 'Arial', 'sans-serif'],
    },
    fontWeight: {
      thin: '200',
      light: '300',
      roman: '400',
      medium: '500',
      bold: '700',
    },
    extend: {
      screens: {
        xl: '1400px',
      },
    },
  },

  plugins: [require('@tailwindcss/typography')],
}
