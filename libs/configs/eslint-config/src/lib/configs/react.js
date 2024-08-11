const { fixupConfigRules } = require('@eslint/compat');
const shopify = require('@shopify/eslint-plugin');
const react = require('eslint-plugin-react');

module.exports = [
  ...fixupConfigRules(react.configs.flat.recommended),
  ...fixupConfigRules(react.configs.flat['jsx-runtime']),

  ...fixupConfigRules(shopify.configs.react),

  {
    files: ['**/*.test.*', '**/*.spec.*'],
    rules: {
      'shopify/jsx-no-hardcoded-content': 'off',
    },
  },

  {
    rules: {
      // 'import/prefer-default-export': 'off',
      // 'no-use-before-define': ['off', { classes: false, functions: false }],
      // 'react/function-component-definition': [
      //   'error',
      //   {
      //     namedComponents: ['function-declaration', 'arrow-function'],
      //     unnamedComponents: 'arrow-function',
      //   },
      // ],
      // 'react/jsx-props-no-spreading': 'off',
      // 'react/style-prop-object': [
      //   'error',
      //   {
      //     allow: ['StatusBar'],
      //   },
      // ],
      // 'react/prop-types': 'off', // Since we do not use prop-types
      // 'react/require-default-props': 'off', // Since we do not use prop-types
      // // Don"t explicitly add .js/.jsx/.tsx/.ts extensions
      // 'import/extensions': [
      //   'error',
      //   'ignorePackages',
      //   {
      //     js: 'never',
      //     jsx: 'never',
      //     ts: 'never',
      //     tsx: 'never',
      //   },
      // ],
      // 'no-param-reassign': ['error', { props: true, ignorePropertyModificationsForRegex: ['^draft'] }],
    },
  },
];
