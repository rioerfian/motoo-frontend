/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#e11d48",

          secondary: "#a8a29e",

          accent: "#f59e0b",

          neutral: "#03080f",

          "base-100": "#f7fafc",

          info: "#22d3ee",

          success: "#4ade80",

          warning: "#facc15",

          error: "#e11d48",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
