const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./views/**/*.{html,hbs,js}", "./demo.config.js"],
  theme: {
    screens: {
      xxs: "0px",
      // => @media (min-width: 0px) { ... }

      xs: "480px",
      // => @media (min-width: 480px) { ... }

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      width: {
        280: "280px",
      },
      minWidth: {
        340: "340px",
      },
      maxHeight: {
        50: "50px",
        28: "28px",
      },
      flex: {
        1: "1 1 0%",
        auto: "1 1 auto",
        initial: "0 1 auto",
        inherit: "inherit",
        none: "none",
        2: "2 2 0%",
      },
      colors: {
        "dark-gray": {
          DEFAULT: "#232323",
          900: "#393939",
          800: "#4F4F4F",
          700: "#656565",
          600: "#7B7B7B",
          500: "#919191",
          400: "#A7A7A7",
          300: "#BDBDBD",
          200: "#D3D3D3",
          100: "#E9E9E9",
          50: "#F4F4F4",
        },
        "light-blue": {
          DEFAULT: "#9AB6D0",
          200: "#EBF0F6",
          100: "#F0F4F8",
          50: "#F5F8FA",
        },
        neutral: {
          50: "#F6F8FA",
          100: "#EBEEF1",
          150: "#d5dbe1",
          300: "#fdfeff",
          700: "#414552",
        },
        brand: {
          DEFAULT: "#3A713E",
          outline: "#4D7950",
          dark: "#1E4521",
          chip: "#D9EECE",
          "outline-chip": "#C2DBB8",
        },
        beige: "#FFF9E0",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
