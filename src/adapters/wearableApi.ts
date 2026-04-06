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
      throw new Error('Ingestion Failure: Telemetry payload contains no biometric samples.');
    }

    const aggregatedMetrics: Record<string, any> = {};

    for (const sample of packet.biometrics) {
      if (sample.confidence < 0.65) {
        // Skip low-confidence sensor readings
        continue;
      }

      // De-noise and map metric values directly to expression weights
      const key = `${packet.deviceSource}_${sample.type}`;
      
      if (!aggregatedMetrics[key]) {
        aggregatedMetrics[key] = [];
      }

      aggregatedMetrics[key].push(sample.value);
    }

    // Compute moving averages for metrics
    const parsedOutputs: Record<string, any> = {
      source: packet.deviceSource,
      syncToken: packet.syncToken,
      samplesParsed: packet.biometrics.length,
      timestamp: packet.timestamp,
      movingAverages: {}
    };

