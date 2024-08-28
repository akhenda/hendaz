/**
 * Use this for Node.js projects.
 */
module.exports = {
  extends: 'plugin:@hendacorp/nodest',
  overrides: [
    {
      files: '*.json',
      parser: 'jsonc-eslint-parser',
      rules: {},
    },
  ],
};
