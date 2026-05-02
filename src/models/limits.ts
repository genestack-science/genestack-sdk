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
  normalLow: number;
  normalHigh: number;
  criticalHigh: number;
}

export const COMPOUND_SAFETY_THRESHOLDS: SafetyThreshold[] = [
  {
    compoundId: 'cat_semax',
    compoundName: 'Semax',
    absoluteMaxDailyMg: 1.5,
    absoluteMinEffectiveMg: 0.1,
    warningThresholdMg: 1.2,
    cycleMaxWeeks: 8
  },
  {
    compoundId: 'cat_bpc157',
    compoundName: 'BPC-157',
    absoluteMaxDailyMg: 1.0,
    absoluteMinEffectiveMg: 0.1,
    warningThresholdMg: 0.75,
    cycleMaxWeeks: 12
  },
  {
    compoundId: 'cat_cjc1295',
    compoundName: 'CJC-1295 + DAC',
    absoluteMaxDailyMg: 4.0,
    absoluteMinEffectiveMg: 0.5,
    warningThresholdMg: 3.0,
    cycleMaxWeeks: 16
  },
  {
    compoundId: 'cat_bromantane',
    compoundName: 'Bromantane',
    absoluteMaxDailyMg: 200,
    absoluteMinEffectiveMg: 25,
    warningThresholdMg: 150,
    cycleMaxWeeks: 12
  }
];

export const PHYSIOLOGICAL_BOUNDS: PhysiologicalBound[] = [
  {
    metric: 'resting_heart_rate',
    unit: 'bpm',
    criticalLow: 30,
    normalLow: 50,
    normalHigh: 90,
    criticalHigh: 120
  },
  {
    metric: 'heart_rate_variability',
    unit: 'ms',
    criticalLow: 10,
    normalLow: 30,
    normalHigh: 100,
    criticalHigh: 200
  },
  {
    metric: 'body_temperature_celsius',
    unit: '°C',
    criticalLow: 35.0,
    normalLow: 36.1,
    normalHigh: 37.5,
    criticalHigh: 39.5
  },
  {
    metric: 'sleep_duration_hours',
    unit: 'hours',
    criticalLow: 3,
    normalLow: 6,
    normalHigh: 10,
    criticalHigh: 14
  }
];

/**
 * Finds the safety threshold record for a given compound ID.
 */
export function getThresholdById(compoundId: string): SafetyThreshold | undefined {
  return COMPOUND_SAFETY_THRESHOLDS.find((t) => t.compoundId === compoundId);
}

/**
 * Returns whether a given dosage amount is at or above the warning threshold.
 */
export function isAboveWarningThreshold(compoundId: string, dosageMg: number): boolean {
  const threshold = getThresholdById(compoundId);
  if (!threshold) return false;
  return dosageMg >= threshold.warningThresholdMg;
}
