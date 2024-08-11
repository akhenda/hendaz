import { execESLint, fixtureFile } from '../../utils';

describe('config', () => {
  it('has valid plugins and requires', () => {
    expect(
      execESLint(
        `--ignore-pattern "**/all/build/*" --config ${fixtureFile('all/eslint.config.js')} ${fixtureFile('all')}`,
      ),
    ).toBe('');
  }, 8000);
});
