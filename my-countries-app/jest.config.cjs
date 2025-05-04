module.exports = {
  testEnvironment: "jsdom",
  testEnvironment: "jest-fixed-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.cjs"],
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest", // This pattern matches .js, .jsx, .ts, and .tsx files
  },
}