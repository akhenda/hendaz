const eslintConfig = require('@hendaz/eslint-config');

module.exports = [
  ...eslintConfig.configs.typescript,
  ...eslintConfig.configs.node,
  {
    languageOptions: {
      parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
];
