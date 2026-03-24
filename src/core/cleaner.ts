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
