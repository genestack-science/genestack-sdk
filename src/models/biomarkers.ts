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
