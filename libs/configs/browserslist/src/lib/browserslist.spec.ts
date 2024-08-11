import { browserslist } from './browserslist';

describe('browserslist', () => {
  it('should work', () => {
    expect(browserslist().at(0)).toContain('last 3 chrome');
  });
});
