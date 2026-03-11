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
 */
export function stdDev(values: number[]): number {
  if (values.length === 0) throw new Error('Cannot compute stdDev of empty array.');
  const avg = mean(values);
  const squaredDiffs = values.map((v) => Math.pow(v - avg, 2));
  return Math.sqrt(mean(squaredDiffs));
}

/**
 * Computes the Z-score of a single value against a dataset.
 */
export function zScore(value: number, values: number[]): number {
  const sd = stdDev(values);
  if (sd === 0) return 0;
  return (value - mean(values)) / sd;
}
