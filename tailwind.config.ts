import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background: slightly warmer cream
        bg: "#FBF7F1",
        surface: "#FFFFFF",
        // Ink: very dark olive-charcoal (softer than pure black)
        ink: "#1F2A22",
        muted: "#6B7268",
        border: "#E8E1D3",
        // Accent: softer sage green (was deep forest)
        accent: "#6B8E72",
        "accent-soft": "#EEF3EC",
        "accent-deep": "#4A6B51",
        // Warm peachy/blush accent for gentle highlights
        warmth: "#E8A87C",
        "warmth-soft": "#FBE9D9",
        // Soft sky for variety
        sky: "#A9C5D4",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-plex)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        "tight-display": "-0.025em",
      },
      maxWidth: {
        reading: "65ch",
      },
      keyframes: {
        "gentle-float": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-6px) rotate(1deg)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "gentle-float": "gentle-float 5s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
