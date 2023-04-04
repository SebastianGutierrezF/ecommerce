/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors:{
        'morado-fondo': '#17152A',
        'morado-contenedor': '#1E2236',
        'gris-contenedor': '#323D5C',
        'gris-fuente': '#656D77',
        'blanco-fuente': '#ffffff',
        'rosa-resaltar': '#2596be',
        'morado-resaltar': '#bfdbff',
      },
    },
  },
  plugins: [],
}
