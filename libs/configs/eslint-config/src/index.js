module.exports = {
  configs: {
    /**
     * Use this for casual js/typescript projects.
     */
    basic: {
      name: 'eslint-config/basic',
      extends: 'plugin:@hendacorp/basic',
    },

    /**
     * Use this for React Native or Expo projects.
     */
    native: {
      name: 'eslint-config/native',
      extends: 'plugin:@hendacorp/native',
    },

    /**
     * Use this for Next.js projects.
     */
    next: {
      name: 'eslint-config/next',
      extends: 'plugin:@hendacorp/next',
    },

    /**
     * Use this for Node.js projects.
     */
    nodest: {
      name: 'eslint-config/nodest',
      extends: 'plugin:@hendacorp/nodest',
    },

    /**
     * Use this for React.js projects.
     */
    reactful: {
      name: 'eslint-config/reactful',
      extends: 'plugin:@hendacorp/reactful',
    },
  },
};
