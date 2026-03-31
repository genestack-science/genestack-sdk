import { BloodPanelParser } from '../../src/adapters/bloodPanel';

describe('BloodPanelParser', () => {
  test('should parse blood markers correctly', () => {
    const parser = new BloodPanelParser();
    const mockContent = JSON.stringify([
      { id: 'm1', name: 'Vitamin D', value: 45, unit: 'ng/mL', referenceRange: [30, 100] }
    ]);
    const markers = parser.parseLabReport(mockContent);
    expect(markers.length).toBe(1);
