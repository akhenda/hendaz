const cypress = require('eslint-plugin-cypress/flat');
const testingLibrary = require('eslint-plugin-testing-library');
const fixupPluginRules = require('@eslint/compat').fixupPluginRules;

module.exports = [
  {
    files: [
      '**/test/**/*.[jt]s?(x)',
      '**/tests/**/*.[jt]s?(x)',
      '**/__tests__/**/*.[jt]s?(x)',
      '**/?(*.)+(spec|test).[jt]s?(x)',
    ],
    ...cypress.configs.recommended,
  },
  {
    files: [
      '**/test/**/*.[jt]s?(x)',
      '**/tests/**/*.[jt]s?(x)',
      '**/__tests__/**/*.[jt]s?(x)',
      '**/?(*.)+(spec|test).[jt]s?(x)',
    ],
    ...cypress.configs.globals,
  },
  {
    files: [
      '**/test/**/*.[jt]s?(x)',
      '**/tests/**/*.[jt]s?(x)',
      '**/__tests__/**/*.[jt]s?(x)',
      '**/?(*.)+(spec|test).[jt]s?(x)',
    ],
    plugins: {
      cypress,
      'testing-library': fixupPluginRules({ rules: testingLibrary.rules }),
    },
    rules: {
      'cypress/unsafe-to-chain-command': 'error',
      'cypress/no-unnecessary-waiting': 'off',
    },
  },
];
