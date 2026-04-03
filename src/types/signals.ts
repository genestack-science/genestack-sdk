export interface CognitionMetrics {
  focusPattern: 'stable' | 'burst_crash' | 'low_drive';
  workingMemory: 'normal' | 'impaired' | 'enhanced';
  stressThreshold: 'low' | 'normal' | 'resilient';
}
export interface CircadianMetrics {
  sleepLatency: 'high' | 'normal' | 'low';
  wakingState: 'deep_refreshed' | 'disturbed' | 'wired_tired' | 'normal';
  nocturnalArousal: 'high' | 'normal' | 'low';
}
export interface InflammationMetrics {
  sorenessPersistence: 'rare' | 'occasional' | 'persistent';
  chronicFatigue: 'rare' | 'occasional' | 'persistent';
  localizedStiffness: 'none' | 'moderate' | 'severe';
}
export interface RecoveryMetrics {
  muscleRegeneration: 'fast' | 'normal' | 'slow';
  forcePreservation: 'normal' | 'reduced' | 'enhanced';
  jointSoreness: 'none' | 'moderate' | 'severe';
}
export interface MetabolismMetrics {
  caloricUtilization: 'normal' | 'efficient' | 'suboptimal';
  weightPreservation: 'lean' | 'normal' | 'easy_fat_gain';
  energyCrashes: 'frequent' | 'rare' | 'occasional';
}
export interface SignalMetadata {
  sourceDevice: string;
  firmwareVersion: string;
  samplingFrequencyHz: number;
}
