/**
 * @file biometrics.ts
 * @description Biometric processing utility functions.
 * Handles normalization, trend detection, and classification of continuous
 * wearable telemetry readings.
 */

export type BiometricTrend = 'rising' | 'stable' | 'falling';

export interface BiometricWindow {
  metric: string;
  values: number[];
  timestamps: number[];
}
export interface TrendAnalysis {
  metric: string;
  trend: BiometricTrend;
  slope: number;
  confidence: number;
  periodMs: number;
}

/**
 * Computes a simple linear regression slope for a series of values.
 * Positive slope = rising, negative = falling.
 */
export function computeLinearSlope(values: number[]): number {
  const n = values.length;
  if (n < 2) return 0;

  const xMean = (n - 1) / 2;
  const yMean = values.reduce((sum, v) => sum + v, 0) / n;

  let numerator = 0;
  let denominator = 0;
