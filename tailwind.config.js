/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        intuit: {
          blue: '#0376C9',
          'blue-dark': '#025A99',
          red: '#E31837',
          'red-dark': '#B8142D',
          gray: {
            50: '#F7F7F7',
            100: '#EEEEEE',
            200: '#E2E2E2',
            300: '#CBCBCB',
            400: '#AFAFAF',
            500: '#6B6B6B',
            600: '#545454',
            700: '#333333',
            800: '#1F1F1F',
          }
        }
      },
      fontFamily: {
        sans: ['Lato', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
