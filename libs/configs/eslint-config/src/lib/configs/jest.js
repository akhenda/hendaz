const shopify = require('@shopify/eslint-plugin');
const fixupConfigRules = require('@eslint/compat').fixupConfigRules;

module.exports = [
  /**
   * Main configs
   */
  ...fixupConfigRules(shopify.configs.jest),
  {
    files: [
      '**/test/**/*.[jt]s?(x)',
      '**/tests/**/*.[jt]s?(x)',
      '**/__tests__/**/*.[jt]s?(x)',
      '**/?(*.)+(spec|test).[jt]s?(x)',
    ],
    rules: {},
  },
];
