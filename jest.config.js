/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  preset: 'ts-jest/presets/js-with-ts-esm',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec).+(ts|tsx|js|jsx)'],
  setupFilesAfterEnv: ['./jest.setup.js'],
};
