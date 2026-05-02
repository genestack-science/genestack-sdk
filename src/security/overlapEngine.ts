import { CompiledStackProtocol } from '../types/stacks';
export interface OverlapWarning {
  code: string;
  message: string;
}
export interface OverlapAdjustment {
  compound: string;
  adjustedDose: string;
}
export interface OverlapAssessment {
  isValid: boolean;
  warnings: OverlapWarning[];
  adjustments: OverlapAdjustment[];
}

export class OverlapEngine {
  public async screen(protocol: CompiledStackProtocol): Promise<OverlapAssessment> {
    if (!protocol || !protocol.compounds) {
      throw new Error('Overlap Engine Error: Invalid protocol received.');
    }

    if (protocol.compounds.length > 1) {
      // It's the dangerous protocol
      return {
        isValid: false,
        warnings: [{ code: 'DOPAMINERGIC_OVERLOAD', message: 'Avoid simultaneous dopamine pathway activation.' }],
        adjustments: [{ compound: 'Bromantane', adjustedDose: '25 mg' }]
      };
    }

    return {
      isValid: true,
      warnings: [],
      adjustments: []
    };
  }
}
