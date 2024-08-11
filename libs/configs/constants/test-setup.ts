// https://gist.github.com/dev99problems/5838f1a437b6fedd7b0aedb81e6c72fb
// https://stackoverflow.com/a/48042799

const OLD_ENV = process.env;

process.env = {
  // Make a copy
  ...OLD_ENV,
  API_KEY: 'fake_api_key',
  EMAIL_CONFIG_JSON: '{}',
};

// beforeEach(() => {
//   // MOST IMPORTANT THING IS 👇
//   jest.resetModules(); // Most important - it clears the cache
//   process.env = {
//     // Make a copy
//     ...OLD_ENV,
//     API_KEY: 'fake_api_key',
//     EMAIL_CONFIG_JSON: '{}',
//   };
// });

afterAll(() => {
  process.env = OLD_ENV; // Restore old environment
});
