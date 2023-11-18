/** @type {import('tailwindcss').Config} */
export default {
    important: true,
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        colors: {
            black: '#282828',
            white: '#FFFFFF',
            primary: '#359E53',
            surface: '#F9F0BD',
        },
        extend: {}
    },
    plugins: []
};