import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        mint: "#a0f0d8",
        romanticPink: "#ffc0cb",
      },
      backgroundImage: {
        'mint-gradient': 'linear-gradient(to bottom, #AAF0D1, #AAF0D1)', // Мятная краля (Дорого)
        'romantic-gradient': 'linear-gradient(to bottom, #ffc0cb, #ffe4e1)',
      },
    },
  },
  plugins: [],
} satisfies Config;
