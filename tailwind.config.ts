import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0f4c81",
          dark: "#08345d",
          accent: "#f4b400"
        }
      }
    }
  },
  plugins: []
};

export default config;
