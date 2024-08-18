/** @type {import('tailwindcss').Config} **/
import scrollbar from "tailwind-scrollbar";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        DEFAULT: "0.5rem",
        none: "0rem",
        sm: "0.375rem",
        md: "0.5rem",
        lg: "0.625rem",
        full: "9999px",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar")({
      nocompatible: true,
    }),
  ],
};
