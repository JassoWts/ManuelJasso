/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        accent: '#f59e0b'
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0)' }
        },
        floatLg: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
          '100%': { transform: 'translateY(0)' }
        },
        breath: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.025)' }
        },
        textFadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '60%': { opacity: '1' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        blink: {
          '0%, 90%, 100%': { transform: 'scaleY(1)' },
          '95%': { transform: 'scaleY(0.2)' }
        },
        pop: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.06)' },
          '100%': { transform: 'scale(1)' }
        },
        seedJiggle: {
            '0%': { transform: 'translateY(0) rotate(0deg)' },
            '50%': { transform: 'translateY(-3px) rotate(-8deg)' },
            '100%': { transform: 'translateY(0) rotate(0deg)' }
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }
        },
        shinePulse: {
          '0%': { opacity: '0', transform: 'translateX(-30%) skewX(-20deg)' },
          '40%': { opacity: '0.35' },
          '55%': { opacity: '0' },
          '100%': { opacity: '0', transform: 'translateX(130%) skewX(-20deg)' }
        },
        textShimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' }
        }
      },
      animation: {
        'float': 'float 5s ease-in-out infinite',
        'float-lg': 'floatLg 6s ease-in-out infinite',
        'badge-pop': 'pop 350ms ease',
        'seed-jiggle': 'seedJiggle 400ms ease',
        'breath': 'breath 6s ease-in-out infinite',
        'text-fade-up': 'textFadeUp 800ms cubic-bezier(0.4,0,0.2,1) both',
        'gradient-shift': 'gradientShift 12s ease-in-out infinite',
        'shine-pulse': 'shinePulse 3.4s ease-in-out infinite',
        'text-shimmer': 'textShimmer 3s linear infinite'
      }
    }
  },
  darkMode: 'class',
  plugins: []
};
