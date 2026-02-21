/**
 * @file wearableApi.ts
 * @description Advanced ingestion layer for wearable device APIs (Apple Health, Oura, Whoop).
 * Reads, validates, and cleans continuous biometric telemetry streams.
 * 
 */

export type ContinuousBiometricMetric =
  | 'resting_heart_rate'
  | 'heart_rate_variability'
  | 'respiratory_rate'
  | 'deep_sleep_duration_seconds'
  | 'body_temperature_celsius';

export interface BiometricSample {
  id: string;
  type: ContinuousBiometricMetric;
  value: number;
