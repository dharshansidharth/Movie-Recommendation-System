/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customYellow: '#FFFBCC', 
        customBlue: '#D0E4FF',
        customPurple: '#C4A3FF',
        customRed: '#FFD1D1'
      },
    },
  },
  plugins: [],
}