/**
 * @file cleaner.ts
 * @description In-depth physiological telemetry signal filter and de-noiser.
 * Removes continuous baseline drift and outlier spikes from high-frequency streams.
 * 
 */

import { BiometricSample } from '../adapters/wearableApi';
export interface CleanedTelemetrySample {
  id: string;
  type: string;
  value: number;
  variance: number;
  filteredStatus: boolean;
  timestamp: number;
}

export class Cleaner {
  private static trailingValues: Record<string, number[]> = {};

  /**
   * De-noises incoming biometric samples to remove sudden noise spikes and anomalies.
   */
  public async cleanSample(sample: BiometricSample): Promise<CleanedTelemetrySample> {
    if (!sample || !sample.id) {
      throw new Error('Signal Cleaner Exception: Input sample payload cannot be empty.');
    }

    const metricKey = sample.type.toLowerCase();
    
    if (!Cleaner.trailingValues[metricKey]) {
      Cleaner.trailingValues[metricKey] = [];
    }

    // Append the latest raw value to the sliding window array
    Cleaner.trailingValues[metricKey].push(sample.value);

    // Limit window to previous 25 readings
    if (Cleaner.trailingValues[metricKey].length > 25) {
      Cleaner.trailingValues[metricKey].shift();
    }

    const windowValues = Cleaner.trailingValues[metricKey]!;
    let filteredStatus = false;
    let finalCleanValue = sample.value;

    // Check if there are enough trailing readings to calculate standard deviation
    if (windowValues.length >= 3) {
      const sum = windowValues.reduce((acc, v) => acc + v, 0);
      const mean = sum / windowValues.length;

      const squaredDiffs = windowValues.map((v) => Math.pow(v - mean, 2));
      const variance = squaredDiffs.reduce((acc, v) => acc + v, 0) / windowValues.length;
      const stdDev = Math.sqrt(variance);

      // Flag as an anomaly if the reading deviates from the mean by more than 2.5 standard deviations
      if (stdDev > 0) {
        const zScore = Math.abs(sample.value - mean) / stdDev;
        if (zScore > 2.5) {
          filteredStatus = true;
          // Use the rolling average as a fallback to smooth out the spike
          finalCleanValue = parseFloat(mean.toFixed(2));
        }
      }
    }

    // Compute variance from rolling average
    const trailingMean = windowValues.reduce((acc, v) => acc + v, 0) / windowValues.length;
    const variance = parseFloat(Math.abs(finalCleanValue - trailingMean).toFixed(2));

    return {
      id: sample.id,
      type: sample.type,
      value: finalCleanValue,
      variance,
      filteredStatus,
      timestamp: Date.now()
