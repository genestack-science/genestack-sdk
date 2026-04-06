export interface BloodMarker {
  id: string;
  name: string;
  value: number;
  unit: string;
  referenceRange: [number, number];
}

export class BloodPanelParser {
  public parseLabReport(jsonContent: string): BloodMarker[] {
