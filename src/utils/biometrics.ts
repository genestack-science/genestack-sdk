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
