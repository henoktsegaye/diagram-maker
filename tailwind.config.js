/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ], theme: {
    extend: {
      blur: {
        xs: '2px',
      }
    },
  },
  variants: {
    extend: {
      blur: ['hover', 'focus'],
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('@tailwindcss/line-clamp'),
  ],
  darkMode: "class",
}

