/**
 * @file dosages.ts
 * @description Structured dosage models and scaling utilities for compound recommendations.
 */

export type DosageUnit = 'mg' | 'mcg' | 'IU' | 'ml' | 'g';
export type DosageFrequency =
  | 'daily_morning'
  | 'daily_evening'
  | 'BID'
  | 'TID'
