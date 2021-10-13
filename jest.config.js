module.exports = {
    roots: ['<rootDir>/src'],
    testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(test).ts'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    testPathIgnorePatterns: ['/node_modules/'],
    transformIgnorePatterns: ['<rootDir>/(node_modules)/'],
    extensionsToTreatAsEsm: ['.ts'],
    testEnvironment: 'node',
    globals: {
        'ts-jest': {
            useESM: true,
        },
    },
};
