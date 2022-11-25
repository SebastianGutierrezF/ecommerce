/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors:{
        'morado-fondo': '#17152A',
        'morado-contenedor': '#1F1D35',
        'gris-contenedor': '#39325C',
        'gris-fuente': '#666577',
        'blanco-fuente': '#DBDCE1',
        'rosa-resaltar': '#B249F2',
        'morado-resaltar': '#9238F1',
      },
    },
  },
  plugins: [],
}
