import { sum } from './sum';

describe('sum', () => {
  it('should add all numbers', () => {
    expect(sum(1, 2, 3, 4, 5)).toBe(15);
  });
});
