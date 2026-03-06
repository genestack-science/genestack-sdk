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
