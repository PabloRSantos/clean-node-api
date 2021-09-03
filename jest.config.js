module.exports = {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/src/main/**",
    "!**/test/**",
    "!**/*-protocols.ts",
    "!**/index.ts",
    "!**/@types/*",
    "!**/protocols/*",
    "!**/protocols/**/*",
  ],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "node",
  preset: "@shelf/jest-mongodb",
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
  transform: {
    ".+\\.ts$": "ts-jest",
  },
};
