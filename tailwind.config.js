/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,svelte,js,ts}'],
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["sunset"],
  }
 }