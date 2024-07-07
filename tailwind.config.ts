import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'lila': '#dec9ff',
        'mainpurple' : '#6101fa',
      },
      fontFamily:{
        
      },
      dropShadow:{
        '3xl': '0 0px 35px rgba(0, 0, 0, 0.50)'
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.7)',
      }
      
    },
  },
  plugins: [],
} satisfies Config;
