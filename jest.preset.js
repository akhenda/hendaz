const nxPreset = require('@nx/jest/preset').default;

module.exports = {
  ...nxPreset,
  // setupFilesAfterEnv: [
  //   '@testing-library/jest-dom/extend-expect',
  //   'jest-extended/all',
  // ],
  coverageReporters: ['text', 'text-summary', 'html', 'json', 'json-summary', 'lcov'],
};
