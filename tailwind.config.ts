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
        mint: "#53c7be",
        romanticPink: "#FFB3C1",
      },
      backgroundImage: {
        'mint-gradient': 'linear-gradient(45deg, #53c7be, #a4f0d4)', // Мятная краля (Дорого)
        'romantic-gradient': 'linear-gradient(45deg, #FFB3C1, #FFC0CB)',
      },
    },
  },
  plugins: [],
} satisfies Config;
