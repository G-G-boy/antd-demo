/**
 * @type {import("tailwindcss/tailwind-config").TailwindConfig}
 */
const config = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    important: true,
    corePlugins: {
        preflight: false,
    },
    theme: {
        extend: {
            colors: {
                primary: 'var(--color-primary)',
            },
            boxShadow: {
                base: '0 4px 8px 0 rgb(95 101 105 / 5%)',
                focus: '0 12px 20px 0 rgb(95 101 105 / 10%)',
                'focus-more': 'rgba(95, 101, 105, 0.1) 0px 12px 20px 0px',
                bottom: '0 2px 8px 0 rgb(7 17 27 / 6%)',
                'bottom-more': '0 4px 8px 0 rgb(7 17 27 / 10%)',
            },
            width: {
                300: '75rem',
            },
            fontSize: {
                'size-xs': '12px',
                'size-sm': '14px',
                'size-base': '16px',
                'size-lg': '18px',
                'size-xl': '20px',
                'size-2xl': '24px',
            },
            minWidth: {
                300: '75rem',
            },
            backgroundColor: {
                base: '#fbfbfb',
            },
        },
        screens: {
            sm: '576px',
            md: '768px',
            lg: '992px',
            xl: '1200px',
            xxl: '1600px',
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        require('tailwindcss-rtl'),
        require('tailwindcss-flip'),
        require('@tailwindcss/line-clamp'),
    ],
};

module.exports = config;
