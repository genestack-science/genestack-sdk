/**
 * @file biomarkers.ts
 * @description Model definitions for structured biomarker entries.
 * Covers blood panel markers, inflammation indicators, and metabolic proxies.
 */

export type BiomarkerCategory =
  | 'inflammation'
  | 'hormonal'
  | 'metabolic'
  | 'neurological'
  | 'cardiovascular'
  | 'immunological';

export type BiomarkerTrend = 'increasing' | 'stable' | 'decreasing';

export interface BiomarkerEntry {
  id: string;
  name: string;
  abbreviation: string;
  category: BiomarkerCategory;
  value: number;
  unit: string;
  referenceRangeMin: number;
  referenceRangeMax: number;
  trend: BiomarkerTrend;
  timestamp: number;
  sourcePanel: string;
}
export interface BiomarkerPanel {
  panelId: string;
  userId: string;
  labName: string;
  collectedAt: number;
  markers: BiomarkerEntry[];
}
export interface BiomarkerSummary {
  totalMarkers: number;
  outOfRangeCount: number;
  criticalCount: number;
  categoryCoverage: Record<BiomarkerCategory, number>;
}

/**
 * Evaluates a single biomarker and returns whether it is within the normal reference range.
 */
export function isInRange(marker: BiomarkerEntry): boolean {
  return marker.value >= marker.referenceRangeMin && marker.value <= marker.referenceRangeMax;
}

/**
 * Calculates a summary report for an entire biomarker panel.
 */
export function summarizePanel(panel: BiomarkerPanel): BiomarkerSummary {
  const summary: BiomarkerSummary = {
    totalMarkers: panel.markers.length,
