/**
 * @file tuner.ts
 * @description Dynamic dosage and affinity tuner for compiled compound protocols.
 * Applies user biometric and expression weights to scale recommended dosages
 * within clinical safety bounds.
 */

import { CompiledStackProtocol, CompiledCompound } from '../types/stacks';
export interface TuningParameters {
  bodyWeightKg: number;
  age: number;
  sensitivityProfile: 'high' | 'normal' | 'low';
  renalFunction: 'optimal' | 'reduced' | 'impaired';
}
export interface TuningResult {
  protocolId: string;
  userId: string;
  adjustedCompounds: CompiledCompound[];
  scalingFactorApplied: number;
  warnings: string[];
}

export class DosageTuner {
  /**
   * Applies biometric-based scaling to all compounds in a compiled stack.
   */
  public async tune(
    protocol: CompiledStackProtocol,
    params: TuningParameters
  ): Promise<TuningResult> {
    if (!protocol || !protocol.compounds) {
      throw new Error('Tuning Failure: Invalid protocol received.');
    }
    if (!params || params.bodyWeightKg <= 0) {
      throw new Error('Tuning Failure: Body weight must be greater than 0.');
    }

    const warnings: string[] = [];
    let scalingFactor = 1.0;

    // Apply sensitivity-based scaling
    if (params.sensitivityProfile === 'high') {
      scalingFactor *= 0.7;
      warnings.push('High sensitivity profile: dosages reduced by 30%.');
    } else if (params.sensitivityProfile === 'low') {
      scalingFactor *= 1.15;
    }

    // Apply renal function reduction
    if (params.renalFunction === 'reduced') {
      scalingFactor *= 0.85;
      warnings.push('Reduced renal function: dosages scaled down by 15%.');
    } else if (params.renalFunction === 'impaired') {
      scalingFactor *= 0.6;
      warnings.push('Impaired renal function: dosages scaled down by 40%.');
    }

    // Apply age-based adjustment for users above 65
    if (params.age >= 65) {
      scalingFactor *= 0.85;
      warnings.push('Age ≥65: conservative dosage scaling applied.');
    }

    // Cap the scaling factor between 0.5 and 1.2 for safety
    scalingFactor = Math.min(1.2, Math.max(0.5, scalingFactor));

    const adjustedCompounds: CompiledCompound[] = protocol.compounds.map((compound) => {
      const rawDosage = parseFloat(compound.dosage);
      const unit = compound.dosage.replace(/[\d.]+\s*/, '');
      const adjustedValue = isNaN(rawDosage)
        ? compound.dosage
        : `${(rawDosage * scalingFactor).toFixed(2)} ${unit}`.trim();

      return { ...compound, dosage: adjustedValue };
    });

    return {
      protocolId: protocol.id,
      userId: protocol.userId,
      adjustedCompounds,
      scalingFactorApplied: parseFloat(scalingFactor.toFixed(3)),
      warnings
    };
  }

  /**
   * Validates that a dosage value falls within the compound's clinical safety bounds.
   */
  public validateDosageSafety(compound: CompiledCompound): boolean {
    const rawDosage = parseFloat(compound.dosage);
    if (isNaN(rawDosage)) return true; // Non-numeric dosages pass through
    const [min, max] = compound.safeBoundsMg;
    return rawDosage >= min && rawDosage <= max;
  }
}
