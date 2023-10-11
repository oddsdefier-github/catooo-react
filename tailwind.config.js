/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-font-inter')({
      a: -0.0223,
      b: 0.185,
      c: -0.1745,
      baseFontSize: 16,
      importFontFace: true,
    })
  ]
}

