import { evergreen } from './evergreen';

describe('evergreen', () => {
  it('should work', () => {
    expect(evergreen().at(0)).toContain('last 1 chrome');
  });
});
