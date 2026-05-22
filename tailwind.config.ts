import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      colors: {
        cream: "#F7F5F2",
        ink: "#0D0D0D",
        olive: {
          DEFAULT: "#4A4A2F",
          dark: "#3A3A22",
          muted: "#7A7A5A",
        },
        muted: "#6B6866",
        border: "#E2DFDA",
      },
      fontSize: {
        display: ["clamp(2.6rem, 7vw, 6.5rem)", { lineHeight: "1.03", letterSpacing: "-0.01em" }],
        "display-sm": ["clamp(2rem, 4vw, 3.5rem)", { lineHeight: "1.1" }],
      },
    },
  },
  plugins: [],
};

export default config;
