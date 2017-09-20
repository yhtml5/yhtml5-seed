/**
 * the config of yhtml5
 */

const config = {
  test: {
    testMatch: ['app/**/__tests__/**/*.js?(x)', 'app/**/?(*.)(spec|test).js?(x)'],
    transformIgnorePatterns: ["node_modules/(?!(yhtml5-test|react-redux|react-native-button)/)"],
    collectCoverageFrom: ['app/**/*.{js,jsx}']
  }
}

module.exports = config