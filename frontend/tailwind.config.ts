import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4CAF50',  // Green
        accent: '#FFC107',   // Amber
        background: '#F9FAFB', // Light Gray
        text: '#374151',      // Dark Gray
        error: '#EF4444',     // Red
        info: '#3B82F6',      // Blue
      },
    },
  },
  plugins: [],
} satisfies Config;
