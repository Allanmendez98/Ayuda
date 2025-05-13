/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/pages/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/components/*.{js,ts,jsx,tsx,mdx}",
    "./app/components/sections/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bitter: ['Bitter', 'serif'], // Aquí agregamos la fuente Bitter
      },
    },
  },
  plugins: [],
};