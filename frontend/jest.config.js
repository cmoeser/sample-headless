module.exports = {
  // https://jestjs.io/docs/en/tutorial-react-native#modulenamemapper
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^~/(.*)$': '<rootDir>/src/$1'
  },
  // https://jestjs.io/docs/en/configuration#transform-object-string-string
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    "^.+\\.js$": "babel-jest",
    '.*\\.(vue)$': 'vue-jest'
  },
  // https://jestjs.io/docs/en/configuration#modulefileextensions-array-string
  moduleFileExtensions: ['ts', 'js', 'vue', 'json'],

  // https://github.com/facebook/jest/issues/1211#issuecomment-247381553
  // https://jestjs.io/docs/en/configuration.html#coveragepathignorepatterns-array-string
  collectCoverageFrom: [
    'components/**/*.vue',
    'layouts/**/*.vue',
    'pages/**/*.vue',
    'lib/**/*.ts',
    'plugins/**/*.ts',
    'store/**/*.ts',
  ],
  preset: 'ts-jest/presets/js-with-ts',
  transformIgnorePatterns: ['node_modules/(?!(bootstrap-vue)/)']
};