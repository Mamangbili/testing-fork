/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'ijo': '#00A86B',
        'kuning': '#8FA946',
        'abu': '#5B687A',
        'abu-tipis': '#ABABAB'
      }
    },

    screens: {
      'sm': '660px',
      'xxs': '380px',
      'xs': '486px',
      'md2': '900px',
      'xl1': '1020px'
    }

  },
  plugins: [],
}