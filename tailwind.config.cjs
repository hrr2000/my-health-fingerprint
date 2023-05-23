/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mont: ["var(--font-mont)"],
      },
      colors: {
        "primary": "#22375B",
        "highlight": "#1479ff",
        "black-soft": "#242424",
        "black-mute": "#2f2f2f",
      },
      backgroundColor: {
        "primary": "#1479ff",
        "primary-hover": "#0953D1",
      },
      borderColor: {
        "primary": "#1479ff",
        "primary-hover": "#0A46AF",
      },
      gridTemplateColumns: {
        collections: "repeat(auto-fit, minmax(250px,1fr))",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("tailwind-scrollbar"),
  ],
};
