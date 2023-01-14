import type { Config } from "jest";

const config: Config = {
  collectCoverage: false,
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  roots: ["<rootDir>/src"],
};

export default config;
