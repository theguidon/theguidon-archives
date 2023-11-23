/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        guidon: "#1C4480",
        lightgray: "#E9EEF2",
        darkblue: "#0F265C",
        lightblue: "#72A4D7",
      },
      fontFamily: {
        chivo: ["Chivo", ...defaultTheme.fontFamily.sans],
        tiemposheadline: [
          '"Tiempos Headline"',
          ...defaultTheme.fontFamily.serif,
        ],
      },
    },
  },
  plugins: [],
};
