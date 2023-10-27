/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./src/**/*.{html,tsx,ts}"],
  // corePlugins: {
  //   preflight: false,
  // },
  darkMode: "class",

  theme: {
    colors: {
      primary: {
        s005: "#CCDBEA",
        s010: "#99B8D5",
        s080: "#3371AB",
        s100: "#004E96",
        s120: "#003669",
        s140: "#001F3C",
      },
      secondary: {
        s005: "#FCD6B4",
        s010: "#FCC89B",
        s080: "#F99237",
        s100: "#f87705",
        s120: "#C65F04",
        s140: "#7B3B02",
      },
      success: { s005: "#BAE8DE", s010: "#A3E0D4", s080: "#75D1BE", s100: "#1ab394", s120: "#127D67", s140: "#0C594A" },
      attention: { s005: "#FEF4CE", s010: "#FEF1BD", s080: "#FDE37C", s100: "#FDDD5C", s120: "#CAB049", s140: "#978437" },
      error: { s005: "#FFC1C1", s010: "#FFACAC", s080: "#FF5A5A", s100: "#ff3131", s120: "#CC2727", s140: "#991D1D" },
      info: { s005: "#DFF2F8", s010: "#C0E5F2", s080: "#A1D9EB", s100: "#63c0df", s120: "#4F99B2", s140: "#3B7385" },
      neutral: {
        light: { s00: "#FFFFFF", s10: "#F1F2F4", s20: "#B3B9C4", s30: "#758195", s40: "#44546F", s50: "#172B4D" },
        dark: { s00: "#161A1D", s10: "#22272B", s20: "#454F59", s30: "#738496", s40: "#9FADBC", s50: "#DEE4EA" },
      },
      iotLight: { s090: "#FFFEFE", s100: "#DEDDDD", s110: "#BDBCBC" },
      iotDark: { s090: "#444A52", s100: "#34393F", s110: "#24282C" },
    },
    extend: {
      fontFamily: {
        sans: ["Open Sans", "ui-sans-serif", "system-ui", "-apple-system"],
      },
      screens: {
        desktop: "1200px",
        tablet: "900px",
        mobile: "660px",
      },
      fontSize: {
        "2xs": "0.5rem",
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
  important: true,
};
