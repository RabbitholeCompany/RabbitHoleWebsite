const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--aw-color-primary)",
        secondary: "var(--aw-color-secondary)",
        accent: "var(--aw-color-accent)",
      },
      fontFamily: {
        sans: ["var(--aw-font-sans)", ...defaultTheme.fontFamily.sans],
        serif: ["var(--aw-font-serif)", ...defaultTheme.fontFamily.serif],
        heading: ["var(--aw-font-heading)", ...defaultTheme.fontFamily.sans],
      },
      // gradient hover effect... thanks to https://birdeatsbug.com/blog/creating-hover-effects-with-tailwind-css
      backgroundSize: {
        "size-200": "200% 200%",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
  darkMode: "class",
};
