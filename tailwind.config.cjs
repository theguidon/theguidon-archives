/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        guidon: "#1C4480",
        lightblue: "#DBE9F4",
        darkblue: "#0F265C",
      },
      fontFamily: {
        chivo: ["Chivo", ...defaultTheme.fontFamily.sans],
        tiemposheadline: ["Tiempos Headline", ...defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [],
};
