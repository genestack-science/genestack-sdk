export interface CompiledCompound {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  class: string;
  pathway: string;
  mappedExpressions: string[];
  details: string;
  contraindications: string[];
  safeBoundsMg: [number, number];
  clinicalConfidence: number;
}
export interface SecurityChecks {
  isValid: boolean;
  warnings: string[];
  adjustments: {
    compoundId: string;
    adjustedDose: string;
    reason: string;
  }[];
}
export interface PhasedScheduleItem {
  phase: number;
  durationDays: number;
  compounds: string[];
  objectives: string;
}
export interface CompiledStackProtocol {
  id: string;
  userId: string;
  timestamp: number;
  compounds: CompiledCompound[];
  coverageScore: number;
  redundancyScore: 'low' | 'moderate' | 'high';
  securityChecks: SecurityChecks;
  suggestedPhasedSchedule: PhasedScheduleItem[];
}
