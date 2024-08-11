const shopify = require('@shopify/eslint-plugin');
const tseslint = require('typescript-eslint');
// const deprecation = require('eslint-plugin-deprecation');
// const FlatCompat = require('@eslint/eslintrc').FlatCompat;
const fixupConfigRules = require('@eslint/compat').fixupConfigRules;

const esnext = require('./esnext');

// const compat = new FlatCompat();

module.exports = [
  // ...tseslint.configs.recommended,

  ...fixupConfigRules(shopify.configs.typescript),

  ...esnext,

  // ...fixupConfigRules(compat.extends('plugin:deprecation/recommended')),

  {
    files: ['*.d.ts'],
    rules: {
      'import/order': 'off',
    },
  },

  {
    files: ['**/*.ts', '**/*.tsx'],
    // plugins: { deprecation }, // The plugin is already defined in plugin:deprecation/recommended
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: { projectService: true },
    },
    settings: {
      // 'import/parsers': {
      //   '@typescript-eslint/parser': ['.ts', '.tsx'],
      // },
      // 'import/resolver': {
      //   typescript: {},
      // },
    },
    rules: {
      // turn on errors for missing imports
      'import/no-unresolved': 'error',

      '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
      'no-undef': 'off',

      '@typescript-eslint/ban-types': [
        'error',
        {
          types: {
            Number: { message: 'Use `number` instead.', fixWith: 'number' },
            Boolean: { message: 'Use `boolean` instead.', fixWith: 'boolean' },
            Symbol: { message: 'Use `symbol` instead.', fixWith: 'symbol' },
            Object: { message: 'Use `object` instead.', fixWith: 'object' },
            String: { message: 'Use `string` instead.', fixWith: 'string' },
            '{}': { message: 'Use `object` instead.', fixWith: 'object' },
            Array: { message: 'Provide a more specific type' },
          },
          extendDefaults: false,
        },
      ],

      // '@typescript-eslint/naming-convention': [
      //   'error',
      //   { selector: 'default', format: ['camelCase'] },
      //   { selector: 'variableLike', format: ['camelCase', 'UPPER_CASE', 'PascalCase'] },
      //   { selector: 'parameter', format: ['camelCase'] },
      //   { selector: 'typeLike', format: ['PascalCase'] },
      //   { selector: 'property', modifiers: ['readonly'], format: ['PascalCase'] },
      //   { selector: 'enumMember', format: ['UPPER_CASE'] },
      //   {
      //     selector: 'variable',
      //     format: ['PascalCase', 'UPPER_CASE'],
      //     types: ['boolean'],
      //     prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
      //   },
      //   {
      //     selector: 'memberLike',
      //     modifiers: ['private'],
      //     format: ['camelCase'],
      //     leadingUnderscore: 'forbid',
      //   },
      // ],
    },
  },
];
