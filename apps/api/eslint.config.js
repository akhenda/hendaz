const eslintConfig = require('@hendaz/eslint-config');
const { fixupConfigRules } = require('@eslint/compat');

const baseConfig = require('../../eslint.config');

module.exports = [
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {},
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: './apps/api/tsconfig.*?.json',
      },
    },
    rules: {},
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    rules: {},
  },
  {
    ignores: [
      '/dist',
      '/node_modules',
      '.eslintrc.js',
      '.eslintrc.cjs',
      '.prettier.cjs',
      '.releaserc',
      'release.config.cjs',
      'coverage',
      '/coverage',
      '.npmrc',
      '.github',
      'package.json',
      'tsconfig.json',
      'jest.config.js',
      'jest.config.ts',
    ],
  },
];
