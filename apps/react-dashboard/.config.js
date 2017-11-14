/**
 * Author: yhtml5
 * Description: The configuration file for the yhtml5-scripts should not be packaged into the app
 *
 */

const config = {
  devHost: '0.0.0.0',
  devPort: 9991,
  analyzerPort: 9992,
  // host: './',

  entry: 'src/index.js',
  distributePort: 9993,
  output: '/',
  type: '',
  templateHtml: 'src/pages/template.js',
  test: {
    // moduleNameMapper: webpackConfigAlias,
    testMatch: ['app/**/__tests__/**/*.js?(x)', 'app/**/?(*.)(spec|test).js?(x)'],
    transformIgnorePatterns: ["node_modules/(?!(yhtml5-test|react-redux|react-native-button)/)"],
    collectCoverageFrom: ['app/**/*.{js,jsx}']
  }
}

module.exports = config
