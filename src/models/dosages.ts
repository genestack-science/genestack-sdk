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
  const cycleInfo = dosage.cycleOnDays
    ? ` — cycle: ${dosage.cycleOnDays} days on / ${dosage.cycleOffDays ?? 0} days off`
    : '';
  const foodNote = dosage.withFood ? ', with food' : '';
  return `${dosage.amount} ${dosage.unit} (${dosage.frequency}${foodNote}${cycleInfo})`;
}

/**
 * Returns true if a given amount falls within the provided DosageRange.
 */
export function isWithinSafeRange(amount: number, range: DosageRange): boolean {
  return amount >= range.minDose && amount <= range.maxDose;
}

/**
 * Scales a dosage amount by a multiplier, clamped to the provided safety range.
 */
export function scaleAndClamp(amount: number, multiplier: number, range: DosageRange): number {
  const scaled = amount * multiplier;
  return Math.min(range.maxDose, Math.max(range.minDose, scaled));
}
