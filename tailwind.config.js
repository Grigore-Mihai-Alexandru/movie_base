/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors:{
        gray:'#292729',
        dark_gray:'#1d1b1d',
        black:'rgba(9,9,9,255)'
      }
    },
  },
  plugins: [],
}
