const shopify = require('@shopify/eslint-plugin');
const security = require('eslint-plugin-security');
const n = require('eslint-plugin-n');
const { fixupConfigRules } = require('@eslint/compat');

module.exports = [
  security.configs.recommended,
  n.configs['flat/recommended-script'],

  /**
   * Main configs
   */
  ...fixupConfigRules(shopify.configs.node),
  {
    rules: {
      'n/no-missing-import': 'off',
    },
  },
];
