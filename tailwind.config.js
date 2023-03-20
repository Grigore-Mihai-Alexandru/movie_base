/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-react/**/*.js",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors:{
        gray:'#292729',
        dark_gray:'#1d1b1d',
        // black:'rgba(9,9,9,255)'
        // black:"rgb(38, 43, 49)",
        pink: "#950740",
        light_red: "#C3073F",
        dark_red: "#6F2232",
        black: "#1A1A1D",
        gray: "#4E4E50",
      }
    },
  },
  plugins: [require("flowbite/plugin.js")],
}
