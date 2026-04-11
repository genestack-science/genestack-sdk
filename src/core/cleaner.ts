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
    
