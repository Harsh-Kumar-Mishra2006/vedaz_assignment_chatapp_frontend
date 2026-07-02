/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'chat-primary': '#075E54',
        'chat-secondary': '#128C7E',
        'chat-light': '#DCF8C6',
        'chat-background': '#ECE5DD',
      },
      animation: {
        'bounce-dots': 'bounce 1.4s infinite',
      },
      keyframes: {
        bounce: {
          '0%, 60%, 100%': { transform: 'translateY(0)' },
          '30%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}; 