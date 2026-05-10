export interface CognitionMetrics {
  focusPattern: 'stable' | 'burst_crash' | 'low_drive';
  workingMemory: 'normal' | 'impaired' | 'enhanced';
  stressThreshold: 'low' | 'normal' | 'resilient';
}
export interface CircadianMetrics {
  sleepLatency: 'high' | 'normal' | 'low';
  wakingState: 'deep_refreshed' | 'disturbed' | 'wired_tired' | 'normal' | 'fatigued_drained';
  nocturnalArousal: 'high' | 'normal' | 'low';
}
export interface InflammationMetrics {
  sorenessPersistence: 'rare' | 'occasional' | 'persistent' | 'chronic';
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
export interface MoodMetrics {
  hedonicTone: 'depressed' | 'stable' | 'elevated';
  emotionalVolatility: 'low' | 'normal' | 'high';
}
export interface StressMetrics {
  perceivedControl: 'high' | 'normal' | 'low';
  physioHyperarousal: 'rare' | 'occasional' | 'frequent';
  copingReserve: 'abundant' | 'normal' | 'depleted';
}
export interface MethylationMetrics {
  samToSahRatio: number;
  homocysteineLevel: number;
}
export interface SignalMetadata {
  sourceDevice: string;
  firmwareVersion: string;
  samplingFrequencyHz: number;
}
export interface SignalInput {
  userId: string;
  timestamp: number;
  cognition: CognitionMetrics;
  circadian: CircadianMetrics;
  inflammation: InflammationMetrics;
  recovery: RecoveryMetrics;
  metabolism: MetabolismMetrics;
  mood?: MoodMetrics;
  stress?: StressMetrics;
  methylation?: MethylationMetrics;
  metadata: SignalMetadata;
}
export interface InterpreterResult {
  id: string;
  userId: string;
  timestamp: number;
  computationTimeMs: number;
  reliabilityIndex: number;
  metrics: Record<string, string | number>;
}
export interface ExpressionStatus {
  status: 'Upregulated' | 'Compensating' | 'Normal' | 'Downregulated';
  score?: number;
}
export interface ExpressionProfile {
  id: string;
  userId: string;
  timestamp: number;
  expressions: {
    comt?: ExpressionStatus;
    tnf?: ExpressionStatus;
    igf1?: ExpressionStatus;
    per3?: ExpressionStatus;
    clock?: ExpressionStatus;
    fto?: ExpressionStatus;
    pparg?: ExpressionStatus;
    nr3c1?: ExpressionStatus;
    fkbp5?: ExpressionStatus;
    sod1?: ExpressionStatus;
    sod2?: ExpressionStatus;
    mthfr?: ExpressionStatus;
    [gene: string]: ExpressionStatus | undefined;
  };
}
