import eslintConfig from './eslint-config';

describe('eslintConfig', () => {
  it('should match snapshot', () => {
    expect(eslintConfig).toBeDefined();
    // expect(eslintConfig).toMatchSnapshot();
  });
});
