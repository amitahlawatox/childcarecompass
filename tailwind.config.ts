import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#FAF8F5",
        surface: "#FFFFFF",
        ink: "#1A1A1A",
        muted: "#6B6B6B",
        border: "#E5E0D8",
        accent: "#2D4A3E",
        "accent-soft": "#E8EFEC",
        warmth: "#C8A882",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-plex)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        "tight-display": "-0.025em",
      },
      maxWidth: {
        "reading": "65ch",
      },
    },
  },
  plugins: [],
};

export default config;
