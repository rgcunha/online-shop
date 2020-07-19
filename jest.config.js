module.exports = {
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  preset: "ts-jest",
  setupFilesAfterEnv: ["jest-extended"],
  testEnvironment: "node",
  verbose: true,
};
