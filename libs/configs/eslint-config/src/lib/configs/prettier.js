const { fixupConfigRules } = require('@eslint/compat');
const shopify = require('@shopify/eslint-plugin');
const yml = require('eslint-plugin-yml');

module.exports = [
  ...fixupConfigRules(shopify.configs.prettier),

  /**
   * eslint-plugin-yml
   */
  ...yml.configs['flat/prettier'],

  {
    rules: {},
  },
];
