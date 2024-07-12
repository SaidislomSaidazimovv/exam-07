/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        red: "text-red-500",
        blue: "rgba(35,137,218,1)",
      },
    },
  },
  plugins: [],
};
