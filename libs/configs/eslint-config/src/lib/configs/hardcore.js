const shopify = require('@shopify/eslint-plugin');
const eslint = require('@eslint/js');
const globals = require('globals');
const FlatCompat = require('@eslint/eslintrc').FlatCompat;
const fixupConfigRules = require('@eslint/compat').fixupConfigRules;
const switchCase = require('eslint-plugin-switch-case');
const jsonc = require('eslint-plugin-jsonc');
// const arrayFunc = require('eslint-plugin-array-func');
const noSecrets = require('eslint-plugin-no-secrets');
const filenames = require('eslint-plugin-filenames');
const noConstructorBind = require('eslint-plugin-no-constructor-bind');
const html = require('eslint-plugin-html');
const sonarjs = require('eslint-plugin-sonarjs');
// const functional = require('eslint-plugin-functional');
const unicorn = require('eslint-plugin-unicorn');

const coreConfig = require('./core');

const compat = new FlatCompat();

module.exports = [
  eslint.configs.recommended,

  /**
   * Main configs
   */
  ...coreConfig,
  ...fixupConfigRules(shopify.configs.esnext),

  /**
   * eslint-plugin-jsonc
   */
  ...jsonc.configs['flat/base'],
  ...jsonc.configs['flat/recommended-with-json'],
  ...jsonc.configs['flat/recommended-with-jsonc'],

  /**
   * eslint-plugin-array-func
   */
  // arrayFunc.configs.recommended,

  /**
   * eslint-plugin-no-secrets
   */
  {
    files: ['**/*.js'],
    plugins: { 'no-secrets': noSecrets },
    rules: {
      'no-secrets/no-secrets': 'error',
    },
  },

  /**
   * eslint-plugin-eslint-comments
   */
  ...fixupConfigRules(compat.extends('plugin:eslint-comments/recommended')),
  {
    rules: {
      'eslint-comments/no-unused-disable': 'error',
    },
  },

  /**
   * eslint-plugin-no-unsanitized
   */
  // ...fixupConfigRules(compat.extends('plugin:no-unsanitized/DOM')),
  {
    rules: {},
  },

  /**
   * eslint-plugin-switch-case
   */
  ...fixupConfigRules(compat.extends('plugin:switch-case/recommended')),
  {
    plugins: { 'switch-case': switchCase },
    rules: {},
  },

  /**
   * eslint-plugin-filenames
   */
  {
    plugins: { filenames },
    rules: {
      // 'filenames/match-exported': [2, [null, 'kebab', 'camel']],
    },
  },

  /**
   * eslint-plugin-no-constructor-bind
   */
  {
    plugins: { 'no-constructor-bind': noConstructorBind },
    rules: {
      'no-constructor-bind/no-constructor-bind': 'error',
      'no-constructor-bind/no-constructor-state': 'error',
    },
  },

  /**
   * eslint-plugin-html
   */
  {
    files: ['**/*.html'],
    plugins: { html },
  },

  /**
   * eslint-plugin-sonarjs
   */
  sonarjs.configs.recommended,
  {
    rules: {},
  },

  /**
   * eslint-plugin-functional
   */
  // {
  //   extends: [
  //     functional.configs.externalVanillaRecommended,
  //     functional.configs.recommended,
  //     functional.configs.stylistic,
  //     functional.configs.disableTypeChecked,
  //   ],
  //   rules: {
  //     'functional/immutable-data': ['error', { ignorePattern: ['^module.exports$'] }],
  //     'functional/functional-parameters': [
  //       'error',
  //       {
  //         ignorePattern: [
  //           '^mounted$',
  //           '^created$',
  //           '^unmount$',
  //           '^unmounted$',
  //           '^beforeDestroy$',
  //           '^destroy$',
  //           '^updated$',
  //           '^beforeUpdate$',
  //           '^onBeforeUpdate$',
  //           '^onUpdated$',
  //           '^onMounted$',
  //         ],
  //       },
  //     ],
  //     'functional/no-expression-statement': ['error', { ignoreVoid: true }],
  //   },
  // },
  // {
  //   files: ['**/*.ts'],
  //   extends: [
  //     functional.configs.externalTypescriptRecommended,
  //     functional.configs.recommended,
  //     functional.configs.stylistic,
  //   ],
  //   languageOptions: {
  //     parser: tseslint.parser,
  //     parserOptions: { projectService: true },
  //   },
  // },

  /**
   * eslint-plugin-unicorn
   */
  {
    languageOptions: {
      globals: globals.builtin,
    },
    plugins: { unicorn: unicorn },
    rules: {
      'unicorn/prefer-module': 'off',

      // conflicts with Prettier
      'unicorn/empty-brace-spaces': 'off',
      'unicorn/no-nested-ternary': 'off',
      'unicorn/number-literal-case': 'off',
    },
  },

  /**
   * eslint-plugin-boundaries
   */
  // {
  //   files: ["**/*.js"],
  //   plugins: {
  //     boundaries,
  //   },
  //   rules: {
  //     ...boundaries.configs.recommended.rules,
  //   }
  // },

  /**
   * General rules
   */
  {
    rules: {},
  },
];
