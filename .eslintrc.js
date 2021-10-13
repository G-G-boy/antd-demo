module.exports = {
    root: true,
    extends: ['react-app', 'plugin:cypress/recommended', 'prettier'],
    plugins: ['formatjs'],
    rules: {
        'no-redeclare': 'off',
        '@typescript-eslint/no-redeclare': 'off',
        'jsx-a11y/anchor-is-valid': 'off',
        // 'formatjs/enforce-default-message': ['error', 'literal'],
        // 'formatjs/no-multiple-whitespaces': 'error',
        // 'formatjs/no-camel-case': 'error',
    },
    overrides: [
        {
            files: '*.test.ts',
            extends: ['plugin:jest/recommended'],
            env: {
                'jest/globals': true,
            },
            settings: {
                jest: {
                    version: require('jest/package.json').version,
                },
            },
        },
    ],
    ignorePatterns: ['/node_modules/'],
};
