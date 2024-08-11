const { FlatCompat } = require('@eslint/eslintrc');
const baseConfig = require('../../../eslint.config.js');
const js = require('@eslint/js');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {},
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    rules: {},
  },
  ...compat.config({ parser: 'jsonc-eslint-parser' }).map((config) => ({
    ...config,
    files: ['**/*.json'],
    rules: {
      ...config.rules,
      '@nx/dependency-checks': 'error',
    },
  })),
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
      '**/*/jest.config.ts',
      '# The eslint plugin test fixtures contain files that deliberatly fail linting',
      "# in order to test that the plugin reports those errors. We don't want the",
      '# normal eslint run to complain about those files though so ignore them here.',
      'libs/configs/eslint-config/src/tests/fixtures',
      '**/*/fixtures',
      'src/tests/fixtures',
    ],
  },
];
