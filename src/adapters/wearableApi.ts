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
  timestamp: number;
  confidence: number;
}
export interface WearableTelemetryPacket {
  userId: string;
  deviceSource: 'oura' | 'whoop' | 'apple_health' | 'garmin';
  syncToken: string;
  timestamp: number;
  biometrics: BiometricSample[];
  metadata: {
    firmwareVersion: string;
    samplingFrequencyHz: number;
    sensorAnomaliesDetected: boolean;
  };
}

export class WearableIngestionAdapter {
  /**
   * Translates incoming telemetry packets into valid Signal Interpreter metrics.
   */
  public async parseWearableTelemetry(packet: WearableTelemetryPacket): Promise<Record<string, any>> {
    if (!packet || !packet.biometrics || packet.biometrics.length === 0) {
