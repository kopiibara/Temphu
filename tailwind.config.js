/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@mui/material/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Questrial'],
      },
      lineHeight: {
        custom: "1.5",
      },
      blur: {
        'lg': '20px',
      },
    },
  },
  plugins: [],
}

