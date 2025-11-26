/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Manrope'", "system-ui", "sans-serif"],
        display: ["'Playfair Display'", "serif"],
      },
    },
  },
  daisyui: {
    themes: [
      {
        recipeWarm: {
          primary: "#d97742",
          "primary-content": "#2f1b0f",
          secondary: "#b45309",
          accent: "#f59e0b",
          neutral: "#241510",
          "base-100": "#fffaf5",
          "base-200": "#f7ecdf",
          "base-300": "#f0dfce",
          info: "#2563eb",
          success: "#2f8f83",
          warning: "#f4a261",
          error: "#d62828",
          "--rounded-box": "16px",
          "--rounded-btn": "12px",
          "--tab-radius": "10px",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
