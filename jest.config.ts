import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
    // Path to Next.js app
    dir: './',
});

const config: Config = {
    displayName: 'texas-elite-gutters',
    testEnvironment: 'jsdom',
    setupFiles: ['<rootDir>/jest.polyfills.js'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    testMatch: [
        '**/__tests__/**/*.test.[jt]s?(x)',
    ],
    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}',
        '!src/**/*.d.ts',
        '!src/**/*.stories.{js,jsx,ts,tsx}',
        '!**/node_modules/**',
    ],
    moduleDirectories: ['node_modules', '<rootDir>/'],
};

export default createJestConfig(config);
