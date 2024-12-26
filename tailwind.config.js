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
                authGray: '#1f2d3d',
                registerBlue: '#1976d2',
                registerGray: '#cccccc',
                navgray: '#0f0f10',
                fff: '#ffffff',
                softGray: '#f2f4f7',
                main1: '#ffffff',
                main2: '#f2f4f7',
            },
            animation: {
                ripple: 'ripple 10s infinite',
                scaleUp: 'scaleUp 0.7s',
            },
            keyframes: {
                ripple: {
                    '0%, 100%': { transform: 'scale(0.90)', opacity: '0.8' },
                    '50%': { transform: 'scale(1.05)', opacity: '1' },
                },
                scaleUp: {
                    '0%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.05)' },
                    '100%': { transform: 'scale(1)' },
                },
            },
        },
    },
    plugins: [],
};
