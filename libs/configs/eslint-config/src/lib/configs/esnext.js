const shopify = require('@shopify/eslint-plugin');
const eslint = require('@eslint/js');
const eslintPluginLodash = require('eslint-plugin-lodash');
const FlatCompat = require('@eslint/eslintrc').FlatCompat;
const eslintPluginSimpleImportSort = require('eslint-plugin-simple-import-sort');
const eslintPluginDeprecate = require('eslint-plugin-deprecate');
const eslintPluginSortKeysFix = require('eslint-plugin-sort-keys-fix');
const unusedImports = require('eslint-plugin-unused-imports');
const yml = require('eslint-plugin-yml');

const fixupConfigRules = require('@eslint/compat').fixupConfigRules;
const fixupPluginRules = require('@eslint/compat').fixupPluginRules;

const core = require('./core');
const globals = require('globals');

const compat = new FlatCompat();
const pluginLodash = fixupPluginRules(eslintPluginLodash);

module.exports = [
  eslint.configs.recommended,
  ...core,

  /**
   * Compatibility hacks
   */
  ...fixupConfigRules(
    compat.extends(
      // 'plugin:import/recommended',
      'plugin:lodash/recommended',
      'plugin:you-dont-need-lodash-underscore/compatible',
    ),
  ),

  /**
   * eslint-plugin-yml
   */
  ...yml.configs['flat/recommended'],

  /**
   * eslint-plugin-promise
   */
  // pluginPromise.configs['flat/recommended'], // Already defined in shopify plugin

  /**
   * eslint-plugin-sort-class-members
   */
  // sortClassMembers.configs['flat/recommended'], // Already defined in shopify plugin

  /**
   * eslint-plugin-import
   */
  {
    // plugins: { import: pluginImport },
    rules: {
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    },
  },

  /**
   * eslint-plugin-sort-keys-fix
   */
  {
    plugins: { 'sort-keys-fix': eslintPluginSortKeysFix },
    rules: {
      'sort-keys-fix/sort-keys-fix': 'warn',
    },
  },

  /**
   * eslint-plugin-deprecate
   */
  {
    plugins: { deprecate: eslintPluginDeprecate },
    rules: {
      // 'deprecate/function': ['error', { name: 'legacyFunc', use: 'newFunc from this package' }],
      // 'deprecate/member-expression': ['error', { name: 'React.createClass', use: 'native es6 classes' }],
      // 'deprecate/import': [
      //   'error',
      //   { name: 'path/to/legacyModule', use: 'newModule' },
      //   { nameRegExp: '\\.sss', use: 'css imports' },
      // ],
    },
  },

  /**
   * eslint-plugin-unused-imports
   */
  {
    plugins: { 'unused-imports': unusedImports },
    rules: {
      'no-unused-vars': 'off', // or "@typescript-eslint/no-unused-vars": "off",
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },

  /**
   * eslint-plugin-lodash
   */
  {
    plugins: { lodash: pluginLodash },
    rules: {
      'lodash/prefer-lodash-method': 'off',
    },
  },

  /**
   * eslint-plugin-simple-import-sort
   */
  {
    plugins: { 'simple-import-sort': eslintPluginSimpleImportSort },
    rules: {
      'simple-import-sort/exports': 'warn',
      'simple-import-sort/imports': 'warn',
    },
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Node.js builtins. You could also generate this regex if you use a `.js` config.
            // For example: `^(${require("module").builtinModules.join("|")})(/|$)`
            [
              '^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)',
            ],
            // Packages. `react` related packages come first.
            ['^react', '^@?\\w'],
            // Side effect imports.
            ['^\\u0000'],
            // Internal packages.
            [
              '^(~|@|@root|@src|@types|@assets|@config|@components|@hooks|@screens|@pages|@services|@store|@state|@utils|@theme|@navigation|@redux|@helpers|@api|@models|@controllers|@middleware|@workers|@HOCs|@containers|@models|@providers)(/.*|$)',
            ],
            // Parent imports. Put `..` last.
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            // Other relative imports. Put same-folder imports and `.` last.
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // Style imports.
            ['^.+\\.s?css$'],
          ],
        },
      ],
    },
  },

  /**
   * General rules
   */
  ...fixupConfigRules(shopify.configs.esnext),
  {
    languageOptions: {
      parserOptions: {
        // ecmaVersion: 2022,
        // sourceType: 'module',
        // requireConfigFile: false,
      },
      globals: {
        ...globals.es2024,
      },
    },
    plugins: {
      // 'write-good-comments',
    },
  },
];
