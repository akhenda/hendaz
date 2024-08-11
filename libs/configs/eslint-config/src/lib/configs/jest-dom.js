const jestDOM = require('eslint-plugin-jest-dom');

const jestConfig = require('./jest');

module.exports = [
  ...jestConfig,

  /**
   * eslint-plugin-jest-dom
   */
  {
    files: [
      '**/test/**/*.[jt]s?(x)',
      '**/tests/**/*.[jt]s?(x)',
      '**/__tests__/**/*.[jt]s?(x)',
      '**/?(*.)+(spec|test).[jt]s?(x)',
    ],
    ...jestDOM.configs['flat/recommended'],
    rules: {},
  },
];
