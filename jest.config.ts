import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { useESM: true }],
    '\\.css$': 'jest-transform-stub',
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
};

export default config;
