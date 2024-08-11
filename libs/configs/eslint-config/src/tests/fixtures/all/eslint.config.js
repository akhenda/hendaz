const eslintConfig = require('@hendaz/eslint-config');

module.exports = [
  // This isn't a best practice - you should only pick out the extends that you
  // care about and typescript/react implies the presence of the esnext, es5 and
  // core configs so specifying them all is not needed.
  // But it is useful for testing to prove all configs can be loaded sucessfully
  ...eslintConfig.configs.core,
  ...eslintConfig.configs.es5,
  // ...eslintConfig.configs.esnext,
  ...eslintConfig.configs.typescript,

  // Augmenting configs - When extending, these go after the core config
  ...eslintConfig.configs.cypress,
  ...eslintConfig.configs.jest,
  ...eslintConfig.configs['jest-dom'],
  ...eslintConfig.configs.node,
  ...eslintConfig.configs.react,
  ...eslintConfig.configs.webpack,
  ...eslintConfig.configs.playwright,
  ...eslintConfig.configs['playwright-jest'],
  ...eslintConfig.configs.hardcore,

  // Prettier config - When extending, this must go last
  ...eslintConfig.configs.prettier,

  {
    settings: {
      react: {
        version: '16.0',
      },
    },

    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      'sort-keys-fix/sort-keys-fix': 'off',
    },
  },
];
