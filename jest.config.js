import { createJsWithTsEsmPreset } from 'ts-jest'

/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  // https://kulshekhar.github.io/ts-jest/docs/guides/esm-support
  // files (.ts, .tsx, .js, .jsx) will be transformed by ts-jest to ESM syntax.
  ...createJsWithTsEsmPreset(),
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', // tsコードで変換後のimport aaa.jsを探すことを誤魔化している
  },
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec).+(ts|tsx|js|jsx)'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  fakeTimers: {
    enableGlobally: true,
    advanceTimers: true,
  },
}
