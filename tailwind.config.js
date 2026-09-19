/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0F172A',
          darkSecondary: '#1E293B',
          sidebarActive: '#1E293B',
          mint: '#059669',
          mintBright: '#10B981',
          mintSoft: '#ECFDF5',
          saffron: '#EA580C',
          saffronSoft: '#FFF7ED',
          navy: '#1E3A8A',
          navySoft: '#EFF6FF',
          bg: '#F8FAFC',
          card: '#FFFFFF',
          text: '#0F172A',
          textMuted: '#64748B',
          border: '#E2E8F0',
        },
        priority: {
          critical: '#DC2626',
          high: '#EA580C',
          medium: '#D97706',
          low: '#059669',
          info: '#2563EB',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(15, 23, 42, 0.05)',
        'elevated': '0 4px 12px -2px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.04)',
        'modal': '0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.05)',
      }
    },
  },
  plugins: [],
}

