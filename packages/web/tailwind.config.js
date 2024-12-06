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
              100: '#F3F2F2',
            },
            primary: {
              DEFAULT: '#4B7FE2',
              50: '#e3efff',
              100: '#bad0f9',
              200: '#8fb1f0',
              300: '#6492e7',
              400: '#3972df',
              500: '#2059c6',
              600: '#16459b',
              700: '#0d3170',
              800: '#041e46',
              900: '#000a1d',
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
              100: '#1C2029',
              foreground: '#CED9EE',
            },
            default: {
              DEFAULT: '#3C4557',
              100: '#4A5469',
              200: '#556079',
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
