module.exports = {
    root: true,
    extends: ['react-app', 'prettier'],
    plugins: ['formatjs'],
    rules: {
        'no-redeclare': 'off',
        '@typescript-eslint/no-redeclare': 'off',
        'jsx-a11y/anchor-is-valid': 'off',
        'formatjs/enforce-default-message': ['error', 'literal'],
        'formatjs/no-multiple-whitespaces': 'error',
        'formatjs/no-camel-case': 'error',
    },
};
