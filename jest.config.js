module.exports = {
  roots: ['<rootDir>/src'],
  // collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/main/**'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb',
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  },
  transform: {
    '.+\\.ts$': 'ts-jest'
  } 
}
