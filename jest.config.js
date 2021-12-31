/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  // preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['__data__'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*',
    '!<rootDir>/src/**/constants',
    '!<rootDir>/src/**/__tests__',
    '!<rootDir>/src/**/types',
    '!<rootDir>/src/index.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
};
