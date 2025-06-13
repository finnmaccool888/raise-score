import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}", // For root level files like page.tsx
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1rem", // Adjusted for more breathing room
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))", // Defined in globals.css for B&W theme
        input: "hsl(var(--input))", // Defined in globals.css for B&W theme
        ring: "hsl(var(--ring))", // Defined in globals.css for B&W theme
        background: "hsl(var(--background))", // White via globals.css
        foreground: "hsl(var(--foreground))", // Black via globals.css
        primary: {
          DEFAULT: "hsl(var(--primary))", // Black via globals.css
          foreground: "hsl(var(--primary-foreground))", // White via globals.css
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))", // Light gray or white via globals.css
          foreground: "hsl(var(--secondary-foreground))", // Black via globals.css
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))", // Accent or black via globals.css
          foreground: "hsl(var(--destructive-foreground))", // White or black via globals.css
        },
        muted: {
          DEFAULT: "hsl(var(--muted))", // Light gray or white via globals.css
          foreground: "hsl(var(--muted-foreground))", // Dark gray or black via globals.css
        },
        accent: {
          DEFAULT: "hsl(var(--accent))", // Teal via globals.css
          foreground: "hsl(var(--accent-foreground))", // Black via globals.css
        },
        popover: {
          DEFAULT: "hsl(var(--popover))", // White via globals.css
          foreground: "hsl(var(--popover-foreground))", // Black via globals.css
        },
        card: {
          DEFAULT: "hsl(var(--card))", // White via globals.css
          foreground: "hsl(var(--card-foreground))", // Black via globals.css
        },
      },
      borderRadius: {
        lg: "0", // Brutalist often uses sharp corners
        md: "0",
        sm: "0",
      },
      fontWeight: {
        extrabold: "800",
        black: "900",
      },
      fontSize: {
        "7xl": "5rem",
        "8xl": "6rem",
        "9xl": "7rem",
      },
      letterSpacing: {
        tightest: "-.075em",
        tighter: "-.05em",
        tight: "-.025em",
        normal: "0",
        wide: ".025em",
        wider: ".05em",
        widest: ".1em",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Ensure Inter is primary
        mono: ["DM Mono", "monospace"], // For any mono needs
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")], // Essential for shadcn/ui
} satisfies Config

export default config
