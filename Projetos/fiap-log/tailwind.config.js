/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        main: "#040404",
      },
      fontFamily: {
        primary_regular: ["Inter_400Regular"],
        primary_medium: ["Inter_500Medium"],
        primary_semiBold: ["Inter_600SemiBold"],
        primary_bold: ["Inter_700Bold"],
        secondary_regular: ["RedHatDisplay_400Regular"],
        secondary_medium: ["RedHatDisplay_500Medium"],
        secondary_semiBold: ["RedHatDisplay_600SemiBold"],
        secondary_bold: ["RedHatDisplay_700Bold"]
      }
    },
  },
  darkMode: "class",
  plugins: [],
}