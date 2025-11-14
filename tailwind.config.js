
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // macOS-inspired Color System
        cloud: {
          cream: '#F5F5F7',
          'cream-dark': '#E8E8ED',
          green: '#34C759',
          'green-dark': '#30B350',
          'green-deeper': '#248A3D',
          gray: '#F2F2F7',
          'gray-dark': '#D1D1D6',
          'gray-deeper': '#8E8E93',
          blue: '#007AFF',
          purple: '#AF52DE',
          pink: '#FF2D55',
        },
        dark: {
          bg: '#1C1C1E',
          'bg-light': '#2C2C2E',
          'bg-lighter': '#3A3A3C',
          border: '#48484A',
          text: '#F2F2F7',
          'text-muted': '#98989D',
        }
      },
      borderRadius: {
        'cloud': '20px',
        'cloud-lg': '24px',
        'cloud-xl': '28px',
      },
      boxShadow: {
        'cloud': '0 8px 32px rgba(0, 0, 0, 0.08)',
        'cloud-lg': '0 12px 48px rgba(0, 0, 0, 0.12)',
        'cloud-hover': '0 12px 40px rgba(0, 0, 0, 0.15)',
        'glow': '0 0 24px rgba(168, 213, 186, 0.3)',
        'glow-strong': '0 0 32px rgba(168, 213, 186, 0.5)',
      },
      backdropBlur: {
        'cloud': '24px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'slide-left': 'slideLeft 0.3s ease-out',
        'slide-right': 'slideRight 0.3s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
