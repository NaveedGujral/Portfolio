import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        custom: {
          grey: '#2e2f2f',
          white: 
            {
              50:'#f7f9f9',
              100:'#e8eded',
              150:'#d0dcdc',
            },       
          blue: '#2397be',
          red: '#e94d35',
        }
      }
    },
    fontFamily: {
      LexendGiga: ["LexendGiga","sans-serif"],
    }
  },
  plugins: [],
};
export default config;
