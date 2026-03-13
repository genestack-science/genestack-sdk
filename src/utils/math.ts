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

/**
 * Normalizes a value into the [0, 1] range based on min/max bounds.
 */
export function normalizeToRange(value: number, min: number, max: number): number {
  if (min === max) return 0;
  return Math.min(1, Math.max(0, (value - min) / (max - min)));
}

/**
 * Applies a Gaussian weight to a point at distance x from center with standard deviation sigma.
 */
export function gaussianWeight(x: number, sigma: number): number {
  if (sigma <= 0) throw new Error('sigma must be greater than 0.');
  return Math.exp(-(x * x) / (2 * sigma * sigma));
}

/**
 * Applies a Gaussian smoothing kernel to an array of values.
 */
export function gaussianSmooth(values: number[], sigma: number): number[] {
  const radius = Math.ceil(3 * sigma);
