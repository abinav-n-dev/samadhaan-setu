/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#071412',
          darkSecondary: '#0D1D1A',
          sidebarActive: '#1F2927',
          mint: '#8FF0C8',
          mintBright: '#B6F7D8',
          mintSoft: '#DDF8EA',
          bg: '#F6F8F7',
          card: '#FFFFFF',
          text: '#10201C',
          textMuted: '#66736F',
          border: '#DDE5E1',
        },
        priority: {
          critical: '#DC4444',
          high: '#F08A3C',
          medium: '#E4B84A',
          low: '#4DAA78',
          info: '#4C83D1',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(7, 20, 18, 0.05), 0 1px 2px -1px rgba(7, 20, 18, 0.05)',
        'elevated': '0 4px 12px -2px rgba(7, 20, 18, 0.08), 0 2px 6px -2px rgba(7, 20, 18, 0.04)',
        'modal': '0 20px 25px -5px rgba(7, 20, 18, 0.1), 0 8px 10px -6px rgba(7, 20, 18, 0.1)',
      }
    },
  },
  plugins: [],
}

