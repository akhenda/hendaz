/**
 * Use this for React Native or Expo projects.
 */
module.exports = {
  extends: 'plugin:@hendacorp/native',
  overrides: [
    {
      files: '*.json',
      parser: 'jsonc-eslint-parser',
      rules: {},
    },
  ],
};
