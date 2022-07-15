module.exports = {
  content: [
    "./.storybook/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {},
  variants: {},
  plugins: [
    require("tailwind-bootstrap-grid")({
      gridColumns: 12
    })
  ],
  corePlugins: {
    container: false
  }
};
