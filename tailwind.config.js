/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        boca: {
          primary: "#173B57",
          secondary: "#2563EB",
          bg: "#F5F7FA",
          text: "#1F2937",
          muted: "#6B7280",
          border: "#D1D5DB",
          success: "#15803D",
          warning: "#B45309",
          danger: "#B91C1C"
        }
      },
      boxShadow: {
        panel: "0 8px 24px rgba(23, 59, 87, 0.08)"
      }
    }
  },
  plugins: []
};
