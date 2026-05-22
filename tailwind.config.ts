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
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-bebas)", "Impact", "sans-serif"],
      },
      colors: {
        bg: "#0A0A0A",
        surface: "#111111",
        "surface-2": "#161616",
        primary: "#F0F0F0",
        secondary: "#888888",
        accent: "#E8FF47",
        "accent-hover": "#D4EB3A",
        border: "#1A1A1A",
        "border-mid": "#222222",
      },
      letterSpacing: {
        display: "-0.02em",
      },
    },
  },
  plugins: [],
};

export default config;
