/**
 * @file limits.ts
 * @description Clinical threshold and safety ceiling constants for the GENESTACK SDK.
 * Used across the compiler, tuner, and validator to enforce dosage and physiological bounds.
 */

export interface SafetyThreshold {
  compoundId: string;
  compoundName: string;
  absoluteMaxDailyMg: number;
  absoluteMinEffectiveMg: number;
  warningThresholdMg: number;
  cycleMaxWeeks: number;
}
export interface PhysiologicalBound {
  metric: string;
  unit: string;
  criticalLow: number;
