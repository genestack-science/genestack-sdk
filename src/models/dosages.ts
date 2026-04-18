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
  | 'weekly'
  | 'bi_weekly'
  | 'as_needed';

export interface StructuredDosage {
  compoundId: string;
  compoundName: string;
  amount: number;
  unit: DosageUnit;
  frequency: DosageFrequency;
  withFood: boolean;
  cycleOnDays?: number;
  cycleOffDays?: number;
  notes?: string;
}
export interface DosageRange {
  minDose: number;
  maxDose: number;
  unit: DosageUnit;
  recommendedStartDose: number;
}
export interface DosageAdjustmentLog {
  compoundId: string;
  originalDose: number;
  adjustedDose: number;
  adjustmentReason: string;
  appliedAt: number;
}

/**
 * Formats a StructuredDosage into a human-readable prescription string.
 */
export function formatDosageLabel(dosage: StructuredDosage): string {
