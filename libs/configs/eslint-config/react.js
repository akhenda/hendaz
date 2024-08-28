/**
 * Use this for React.js projects.
 */
module.exports = {
  extends: 'plugin:@hendacorp/reactful',
  overrides: [
    {
      files: '*.json',
      parser: 'jsonc-eslint-parser',
      rules: {},
    },
  ],
};
