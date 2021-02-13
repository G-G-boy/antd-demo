const envPreset = [
    '@babel/preset-env',
    {
        useBuiltIns: 'usage',
        corejs: 3,
        modules: false,
    },
];

module.exports = function (api) {
    const presets = [
        '@babel/preset-typescript',
        envPreset,
        ['@babel/preset-react', {runtime: 'automatic'}],
    ];
    const plugins = [
        '@babel/plugin-transform-runtime',
        !api.env('production') && 'react-refresh/babel',
    ].filter(Boolean);
    api.cache(true);
    return {
        presets,
        plugins,
        env: {
            production: {
                plugins: [
                    '@babel/plugin-transform-react-constant-elements',
                    '@babel/plugin-transform-react-inline-elements',
                ],
            },
        },
    };
};
