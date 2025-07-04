/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          background: '#0c111d',
          surface: '#1f242f',
          text: '#f5f5f6',
          hover: '#1f242f',
          accent: '#7f56d9',
        }
      }
    },
  },
  plugins: [],
};
