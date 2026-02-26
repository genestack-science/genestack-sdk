/**
 * @file math.ts
 * @description Core mathematical utility functions for signal processing and statistics.
 */

/**
 * Computes the arithmetic mean of an array of numbers.
 */
export function mean(values: number[]): number {
  if (values.length === 0) throw new Error('Cannot compute mean of empty array.');
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

/**
 * Computes the population standard deviation of an array of numbers.
