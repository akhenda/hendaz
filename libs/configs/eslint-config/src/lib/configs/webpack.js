const shopify = require('@shopify/eslint-plugin');

module.exports = [
  ...shopify.configs.webpack,
  {
    rules: {},
  },
];
