const shopify = require('@shopify/eslint-plugin');
const core = require('./core');
const { fixupConfigRules } = require('@eslint/compat');

module.exports = [...fixupConfigRules(shopify.configs.es5), ...core];
