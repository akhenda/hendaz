const reactful = require('./reactful');

/**
 * Use this for React Native or Expo projects.
 */
module.exports = [
  ...reactful,
  {
    rules: {
      'react/style-prop-object': ['error', { allow: ['StatusBar'] }],
    },
  },
];
