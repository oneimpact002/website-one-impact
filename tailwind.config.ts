import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "1.5rem" },
    fontFamily: {
      sans:    ["Sora", "sans-serif"],
      heading: ["Zalando Sans Expanded", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
