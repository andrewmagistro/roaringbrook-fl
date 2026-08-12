import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        /* Coastal teal scale (legacy class name "navy" kept) */
        navy: {
          DEFAULT: "#0E5A6E",
          light: "#3E92A6",
          dark: "#0A3C4A",
          deep: "#072B36",
        },
        /* Muted brass-sand single accent (legacy class name "gold" kept) */
        gold: {
          DEFAULT: "#C9A24B",
          light: "#E0C885",
          dark: "#A8822F",
        },
        cream: {
          DEFAULT: "#FBF8F2",
          dark: "#F2ECE0",
        },
        ink: {
          DEFAULT: "#16242B",
          soft: "#5A6B72",
        },
        sand: "#C9A24B",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "4xl": "2rem",
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
        spring: "cubic-bezier(0.32, 0.72, 0, 1)",
      },
      boxShadow: {
        soft: "0 2px 8px -2px hsl(192 40% 20% / 0.08), 0 12px 40px -8px hsl(192 40% 20% / 0.10)",
        lift: "0 8px 18px -6px hsl(192 40% 20% / 0.12), 0 28px 60px -12px hsl(192 40% 20% / 0.18)",
        teal: "0 16px 50px -12px hsl(192 78% 24% / 0.45)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "marquee-y": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(-50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
