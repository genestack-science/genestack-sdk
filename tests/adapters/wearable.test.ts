import { WearableIngestionAdapter, WearableTelemetryPacket } from '../../src/adapters/wearableApi';

describe('WearableIngestionAdapter', () => {
  test('should parse telemetry packet correctly', async () => {
    const adapter = new WearableIngestionAdapter();
    const packet: WearableTelemetryPacket = {
      userId: 'usr_test_1',
