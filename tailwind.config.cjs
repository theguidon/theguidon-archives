/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        guidon: "#1C4480",
      },
      fontFamily: {
        chivo: ["Chivo", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
