/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fdeca7",
          100: "#fce37b",
          200: "#f7d446",
          300: "#fad12a",
          400: "#facc15",
          500: "#f1c410",
          600: "#e7bb0b",
          700: "#ddb206",
          800: "#d3a900",
          900: "#c09a00",
        },
      },
      fontFamily: {
        montserrat: ["IBM Plex Mono", "monospace"],
      },
    },
  },
  plugins: [],
}
