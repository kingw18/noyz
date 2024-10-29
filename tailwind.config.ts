import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background and foreground colors for consistent dark mode
        background: "#1E1E2E", // Dark slate background for the main page
        foreground: "#E5E5E5", // Primary light gray text

        // Card and popover colors for distinct, clean component styling
        card: {
          DEFAULT: "#2A2A40", // Card background color for slight contrast against page background
          foreground: "#E5E5E5", // Card text color
        },
        popover: {
          DEFAULT: "#2A2A40", // Popover component background
          foreground: "#E5E5E5", // Popover text color
        },

        // Accent colors for interactive elements, highlighting, and primary interactions
        primary: {
          DEFAULT: "#F7931A", // Accent orange for primary buttons or active states
          foreground: "#1E1E2E", // Text on primary accent color
        },
        accent: {
          DEFAULT: "#63A4FF", // Cool blue for links and secondary highlights
          foreground: "#1E1E2E", // Text on accent color
        },

        // Additional muted color for secondary text or less prominent information
        muted: {
          DEFAULT: "#A0A0B0", // Muted gray for less important text
          foreground: "#E5E5E5",
        },
        destructive: {
          DEFAULT: "#FF5C5C", // Red for destructive actions like "Delete"
          foreground: "#1E1E2E",
        },

        // Border and ring colors to unify input and card borders
        border: "#3A3A4A", // Subtle border color for cards and inputs
        ring: "#63A4FF", // Ring color for focus states
      },
      borderRadius: {
        lg: "0.75rem", // Larger border radius for cards
        md: "0.5rem",
        sm: "0.25rem",
      },
      boxShadow: {
        card: "0px 4px 15px rgba(0, 0, 0, 0.1)", // Soft shadow for cards
      },
      fontSize: {
        base: ["16px", "24px"], // Base font size for better readability
        lg: ["18px", "28px"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
