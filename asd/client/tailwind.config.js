module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "#161a0d",
        background: "#f9f9f9",
        primary: "#9abb5d",
        secondary: "#c0d696",
        accent: "#a8ca6a",
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio'),require('@tailwindcss/forms')],
};
