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
                registerBlue: '#1976d2',
                registerGray: '#cccccc',
                fff: '#ffffff',
            },
            animation: {
                ripple: 'ripple 10s infinite',
            },
            keyframes: {
                ripple: {
                    '0%, 100%': { transform: 'scale(0.90)', opacity: '0.8' },
                    '50%': { transform: 'scale(1.05)', opacity: '1' },
                },
            },
        },
    },
    plugins: [],
};
