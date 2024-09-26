import type { Config } from 'tailwindcss';
import tailwindcss_animate from 'tailwindcss-animate';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      screens: {},
    },
    extend: {
      fontFamily: {
        pretendard: ['var(--font-pretendard)', 'sans-serif'],
      },
      colors: {
        white: 'var(--white)',
        'white-04': 'var(--white-04)',
        black: 'var(--black)',
        'black-04': 'var(--black-04)',
        gray: 'var(--gray)',
        'gray-1': 'var(--gray-1)',
        'gray-2': 'var(--gray-2)',
        'gray-3': 'var(--gray-3)',
        'gray-4': 'var(--gray-4)',
        'gray-5': 'var(--gray-5)',
        'gray-6': 'var(--gray-6)',
        'gray-7': 'var(--gray-7)',

        red: 'var(--red)',
        'red-1': 'var(--red-1)',
        'red-2': 'var(--red-2)',
        'red-3': 'var(--red-3)',
        'red-4': 'var(--red-4)',

        blue: 'var(--blue)',
        'blue-light': 'var(--blue-light)',
        green: 'var(--green)',
        'green-light': 'var(--green-light)',
        purple: 'var(--purple)',
        'purple-light': 'var(--purple-light)',
        yellow: 'var(--yellow)',
        'yellow-light': 'var(--yellow-light)',
      },
      keyframes: {},
      animation: {},
    },
  },

  plugins: [tailwindcss_animate],
};
export default config;
