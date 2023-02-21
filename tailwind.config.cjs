/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      margin: {
        '6px' : '6px',
      },
      fontFamily: {
        chivo: ['"Chivo"', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [],
}
