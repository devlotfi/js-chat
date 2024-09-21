const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            foreground: '#3F4654',
            content1: '#fff',
            background: {
              DEFAULT: '#fff',
              100: '#F3F2F2',
              foreground: '#3F4654',
            },
            default: {
              DEFAULT: '#F3F2F2',
            },
            primary: {
              DEFAULT: '#4B7FE2',
              foreground: '#fff',
            },
          },
        },
        dark: {
          colors: {
            foreground: '#CED9EE',
            content1: '#2B313E',
            background: {
              DEFAULT: '#2B313E',
              100: '#212631',
              foreground: '#CED9EE',
            },
            default: {
              DEFAULT: '#212631',
            },
            primary: {
              DEFAULT: '#4B7FE2',
              foreground: '#fff',
            },
          },
        },
      },
    }),
  ],
};
