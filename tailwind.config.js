/**
 * @type {import("tailwindcss/tailwind-config").TailwindConfig}
 */
const config = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    important: true,
    theme: {
        extend: {
            colors: {
                primary: 'var(--color-primary)',
            },
            boxShadow: {
                base: '0 4px 8px 0 rgb(95 101 105 / 5%)',
                focus: '0 12px 20px 0 rgb(95 101 105 / 10%)',
                'focus-more': 'rgba(95, 101, 105, 0.1) 0px 12px 20px 0px',
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
    plugins: [],
    corePlugins: {
        ringWidth: false,
        ringColor: false,
        ringOpacity: false,
        ringOffsetWidth: false,
        ringOffsetColor: false,
        outline: false,
        appearance: false,
        pointerEvents: false,
        resize: false,
    },
};

module.exports = config;
