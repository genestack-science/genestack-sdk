import { WearableIngestionAdapter, WearableTelemetryPacket } from '../../src/adapters/wearableApi';

describe('WearableIngestionAdapter', () => {
  test('should parse telemetry packet correctly', async () => {
    const adapter = new WearableIngestionAdapter();
    const packet: WearableTelemetryPacket = {
      userId: 'usr_test_1',
      deviceSource: 'oura',
      syncToken: 'token_abc',
      timestamp: Date.now(),
      biometrics: [
        { id: 's1', type: 'resting_heart_rate', value: 65, timestamp: Date.now(), confidence: 0.95 }
      ],
      metadata: {
        firmwareVersion: '1.0.0',
        samplingFrequencyHz: 1,
        sensorAnomaliesDetected: false
