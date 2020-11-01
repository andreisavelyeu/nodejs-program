module.exports = {
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.ts?$': 'ts-jest'
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$',
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    clearMocks: true,
    testTimeout: 30000,
    setupFilesAfterEnv: [
        "./src/tests/setup.ts",
    ],
}