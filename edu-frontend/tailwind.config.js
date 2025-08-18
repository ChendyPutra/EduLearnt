/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  extend: {
  animation: {
    fadeInUp: "fadeInUp 1s ease-out",
    zoomIn: "zoomIn 20s ease-in-out infinite",
  },
  keyframes: {
    fadeInUp: {
      "0%": { opacity: 0, transform: "translateY(20px)" },
      "100%": { opacity: 1, transform: "translateY(0)" },
    },
    zoomIn: {
      "0%, 100%": { transform: "scale(1.05)" },
      "50%": { transform: "scale(1)" },
    },
  },
}

}
