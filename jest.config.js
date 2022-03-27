module.exports = {
  roots: ['<rootDir>'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/main/**'],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [
    'node_modules',
    'test-config',
    'interfaces',
    '.module.ts',
    '<rootDir>/src/main.ts',
    '.mock.ts',
    '.plugin.ts',
    '.repository.ts',
  ],
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '@/test/(.*)': '<rootDir>/test/$1',
    '@/(.*)': '<rootDir>/src/$1',
    'src/(.*)': '<rootDir>/src/$1',
    'test/(.*)': '<rootDir>/test/$1',
  },
};
