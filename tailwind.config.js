/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F43976',     // pink
        secondary: '#FF8AB0',    // light pink
        accent: '#1C1B1F',    // black
        bgPrimary: '#EBEBEB'    // light gray
      }
    }
  },
  plugins: [
    require('flowbite/plugin')
  ]
}