/**
 * Calculates the sum of two or more numbers.
 *
 * @param {number[]} args - A variable number of numbers to be added together
 * @return {number} The sum of all numbers in the input array
 */
export function sum(...args: number[]): number {
  return args.reduce((a, b) => a + b, 0);
}

export default sum;
