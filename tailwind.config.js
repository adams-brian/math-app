const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        fade: 'fade 0.5s ease-out',
        'great-work': 'great-work 5s'
      },
      boxShadow: {
        correct: '0px 0px 15px 10px rgba(97, 223, 101, 70%)',
        focus: '0 0 1px 4px rgba(59, 130, 246, 0.5)',
        incorrect: '0px 0px 10px 5px rgba(253, 95, 95, 70%)'
      },
      colors: {
        'background-blue': 'rgb(166,220,243)',
        addition: {
          100: 'rgb(238,205,205)',
          400: 'rgb(255,153,153)'
        },
        subtraction: {
          100: 'rgb(205,239,205)',
          400: 'rgb(153,255,153)'
        },
        multiplication: {
          100: 'rgb(205,229,239)',
          400: 'rgb(153,227,255)'
        },
        division: {
          100: 'rgb(239,239,205)',
          400: 'rgb(255,255,153)'
        },
        correct: 'rgb(97,223,101)',
        incorrect: 'rgb(253,95,95)',
        gray: colors.trueGray
      },
      fontFamily: {
        'primary': '"Fredoka One", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
      },
      gridTemplateColumns: {
        'auto-1fr': 'auto 1fr'
      },
      inset: {
        '50vw': '50vw',
        '30vh': '30vh'
      },
      keyframes: {
        fade: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 }
        },
        'great-work': {
          '0%': {
            'background-color': 'rgba(255, 255, 255, 0)',
            'color': 'rgba(0, 0, 0, 0)'
          },
          '7%': {
            'background-color': 'rgba(255, 255, 255, 0.6)',
            'color': 'rgba(0, 0, 0, 0.8)'
          },
          '30%': {
            'background-color': 'rgba(255, 255, 255, 0.6)',
            'color': 'rgba(0, 0, 0, 0.8)'
          },
          '100%': {
            'background-color': 'rgba(255, 255, 255, 0)',
            'color': 'rgba(0, 0, 0, 0)'
          }
        }
      },
      spacing: {
        '10vh': '10vh',
        144: '36rem',
        256: '64rem'
      },
      transitionProperty: {
        'width': 'width'
       }
    }
  },
  variants: {
    extend: {
      backgroundColor: ['active']
    }
  },
  plugins: [],
}
