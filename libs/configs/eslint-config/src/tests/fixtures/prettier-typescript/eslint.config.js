const eslintConfig = require('@hendaz/eslint-config');

module.exports = [
  ...eslintConfig.configs.typescript,
  ...eslintConfig.configs.prettier,
  {
    languageOptions: {
      parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
  },
];
