const { fixupConfigRules } = require('@eslint/compat');
const shopify = require('@shopify/eslint-plugin');

module.exports = [...fixupConfigRules(shopify.configs.core)];
