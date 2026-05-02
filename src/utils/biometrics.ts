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

  for (let i = 0; i < n; i++) {
    numerator += (i - xMean) * (values[i]! - yMean);
    denominator += (i - xMean) ** 2;
  }

  return denominator === 0 ? 0 : numerator / denominator;
}

/**
 * Classifies a slope value into a BiometricTrend label.
 */
export function classifyTrend(slope: number, threshold = 0.05): BiometricTrend {
  if (slope > threshold) return 'rising';
  if (slope < -threshold) return 'falling';
  return 'stable';
}

/**
 * Runs a full trend analysis on a BiometricWindow.
 */
export function analyzeTrend(window: BiometricWindow): TrendAnalysis {
  const slope = computeLinearSlope(window.values);
  const trend = classifyTrend(slope);
  const periodMs =
    window.timestamps.length >= 2
      ? window.timestamps[window.timestamps.length - 1]! - window.timestamps[0]!
      : 0;

  // Confidence based on how cleanly the slope fits (simplified)
  const maxSlope = 5;
  const confidence = parseFloat(Math.min(1, Math.abs(slope) / maxSlope).toFixed(3));

  return { metric: window.metric, trend, slope, confidence, periodMs };
}

/**
 * Normalizes a biometric reading into the [0, 1] range using known physiological bounds.
 */
export function normalizeBiometric(
  value: number,
  criticalLow: number,
  criticalHigh: number
): number {
  const range = criticalHigh - criticalLow;
  if (range === 0) return 0;
  return Math.min(1, Math.max(0, (value - criticalLow) / range));
}
