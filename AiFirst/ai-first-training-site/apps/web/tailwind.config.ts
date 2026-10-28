import type { Config } from "tailwindcss";

export default {
  content: ["./pages/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        wmNavy: "#092d47",
        wmBlue: "#1977a6",
        wmMagenta: "#c41469",
        wmLime: "#d2e23a",
      },
    },
  },
  plugins: [],
} satisfies Config;
