/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {

      scale: {
        '60': '.6',
      },

      fontFamily:{
        'inter': ['Inter', 'sans-serif'],
        'raleway': ['Raleway', 'sans-serif'],
        'bebas': ['Bebas Neue', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
