/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-purple": "#655445",
        "gray-search-text" : "#9D9FA1",
        "gray-search-outline" : "#EAECF0",
        "light-gold" : '#DBCAA0',
        "figma-gray" : '#5A6A85'
      },
    },
  },
  plugins: [],
};


