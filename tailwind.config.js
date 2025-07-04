/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          background: '#0c111d',
          surface: '#161b26',
          card: '#161b26',
          text: '#f5f5f6',
          hover: '#1f242f',
          accent: '#7f56d9',
          border: '#222834',
        }
      }
    },
  },
  plugins: [],
};
