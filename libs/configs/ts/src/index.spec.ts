import { sum } from './index';

describe('sum', () => {
  it('should return the sum of two or more numbers', () => {
    expect(sum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)).toBe(55);
  });
});
