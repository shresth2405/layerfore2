/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FCB41F',
          50: '#FFF8E6',
          100: '#FFEFC2',
          200: '#FEE299',
          300: '#FDD471',
          400: '#FDC748',
          500: '#FCB41F',
          600: '#E39A01',
          700: '#AB7301',
          800: '#734D01',
          900: '#3B2700'
        },
        accent: {
          DEFAULT: '#0EA5E9',
          50: '#E0F7FF',
          100: '#B3ECFF',
          200: '#80DFFF',
          300: '#4DD2FF',
          400: '#1AC5FF',
          500: '#0EA5E9',
          600: '#0B83BA',
          700: '#08628C',
          800: '#06415D',
          900: '#03212F'
        },
        success: {
          DEFAULT: '#22C55E',
          50: '#E8FFF1',
          100: '#BFFFDA',
          200: '#96FFC3',
          300: '#6DFFAC',
          400: '#44FF95',
          500: '#22C55E',
          600: '#1A9E4B',
          700: '#137738',
          800: '#0C4F25',
          900: '#062813'
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'star-movement-bottom': 'star-movement-bottom linear infinite alternate',
        'star-movement-top': 'star-movement-top linear infinite alternate',
      },
      keyframes: {
        'star-movement-bottom': {
          '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
          '100%': { transform: 'translate(-100%, 0%)', opacity: '0' },
        },
        'star-movement-top': {
          '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
          '100%': { transform: 'translate(100%, 0%)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
