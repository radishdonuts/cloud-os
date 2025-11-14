
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // CloudOS Color System
        cloud: {
          cream: '#FFF9F0',
          'cream-dark': '#F5EFE6',
          green: '#A8D5BA',
          'green-dark': '#7FB89E',
          'green-deeper': '#5A9B7D',
          gray: '#E8EBF0',
          'gray-dark': '#B8BCC8',
          'gray-deeper': '#8B8F9B',
          blue: '#A8C5E0',
          purple: '#C5B8E0',
          pink: '#E0B8D5',
        },
        dark: {
          bg: '#1A1D23',
          'bg-light': '#23262E',
          'bg-lighter': '#2C3038',
          border: '#3A3D45',
          text: '#E8EBF0',
          'text-muted': '#B8BCC8',
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
