/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{njk,html,js}", "./_site/**/*.html"],
  theme: {
    extend: {
      colors: {
        "brand-blue": "#688CBA",
      },
    },
  },
  plugins: [],
};
