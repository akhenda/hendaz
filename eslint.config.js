const { FlatCompat } = require('@eslint/eslintrc');
const nxEslintPlugin = require('@nx/eslint-plugin');
const js = require('@eslint/js');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  { plugins: { '@nx': nxEslintPlugin } },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
  ...compat.config({ extends: ['plugin:@nx/typescript'] }).map((config) => ({
    ...config,
    files: ['**/*.ts', '**/*.tsx'],
    // languageOptions: {
    //   parserOptions: {
    //     project: 'tsconfig.json',
    //   },
    // },
    rules: {
      ...config.rules,
    },
  })),
  ...compat.config({ extends: ['plugin:@nx/javascript'] }).map((config) => ({
    ...config,
    files: ['**/*.js', '**/*.jsx'],
    rules: {
      ...config.rules,
    },
  })),
  ...compat.config({ env: { jest: true } }).map((config) => ({
    ...config,
    files: ['**/*.spec.ts', '**/*.spec.tsx', '**/*.spec.js', '**/*.spec.jsx'],
    rules: {
      ...config.rules,
    },
  })),
  {
    ignores: [
      '/dist',
      '/node_modules',
      '.eslintrc.js',
      '.eslintrc.cjs',
      'eslint.config.js',
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
    ],
  },
];
