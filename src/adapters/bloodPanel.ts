export interface BloodMarker {
  id: string;
  name: string;
  value: number;
  unit: string;
  referenceRange: [number, number];
}

export class BloodPanelParser {
  public parseLabReport(jsonContent: string): BloodMarker[] {
    if (!jsonContent || jsonContent.trim().length === 0) {
      throw new Error('Parse Failure: Blood panel content is empty.');
    }
    const parsed = JSON.parse(jsonContent);
