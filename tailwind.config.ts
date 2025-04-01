import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#001F33", // Deep Navy Blue
          dark: "#001525",
          light: "#003A5C",
        },
        accent: {
          DEFAULT: "#C9A357", // Gold/Bronze
          dark: "#B08A3E",
          light: "#D9B978",
        },
        alert: {
          DEFAULT: "#D82F2F", // Bright Red
          dark: "#B82222",
          light: "#E85555",
        },
        gray: {
          DEFAULT: "#4A4A4A", // Steel Gray
          dark: "#333333",
          light: "#6A6A6A",
        },
        blue: {
          DEFAULT: "#5B8DB1", // Light Blue
          dark: "#4A7A9A",
          light: "#7AA5C4",
        },
        // Add standard colors to ensure they're available
        white: "#FFFFFF",
        black: "#000000",
      },
    },
  },
  plugins: [],
};

export default config;
