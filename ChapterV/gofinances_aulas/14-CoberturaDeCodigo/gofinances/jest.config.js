module.exports = {
  preset: "jest-expo",

  testPathIgnorePatterns: [
    "/node_modules",
    "/android",
    "/ios"
  ],

  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)"
  ],

  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.tsx",
    "!src/**/*.spec.tsx"
  ],
  coverageReporters: [
    "lcov"
  ],

  setupFiles: [
    "./jestSetupFile.js"
  ],
}
