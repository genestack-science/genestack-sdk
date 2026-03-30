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
