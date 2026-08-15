/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#16697A',
          secondary: '#489FB5',
          accent: '#82C0CC',
          bg: '#EDE7E3',
          action: '#FFA62B',
        },
      },
    },
  },
  plugins: [],
}