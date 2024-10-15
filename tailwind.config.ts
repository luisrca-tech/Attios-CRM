import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
    },
    colors: {
      black: "rgb(var(--black) / <alpha-value>)",
      white: {
        100: "rgb(var(--white-100) / <alpha-value>)",
        200: "rgb(var(--white-200) / <alpha-value>)",
        300: "rgb(var(--white-300) / <alpha-value>)",
      },
      primary: {
        100: "rgb(var(--primary-100) / <alpha-value>)",
        200: "rgb(var(--primary-200) / <alpha-value>)",
      },
      secondary: {
        100: "rgb(var(--secondary-100) / <alpha-value>)",
        200: "rgb(var(--secondary-200) / <alpha-value>)",
        300: "rgb(var(--secondary-300) / <alpha-value>)",
        400: "rgb(var(--secondary-400) / <alpha-value>)",
        500: "rgb(var(--secondary-500) / <alpha-value>)",
      },
      outline: {
        100: "rgb(var(--outline-100) / <alpha-value>)",
      },
    },
  },
  plugins: [],
} satisfies Config;
