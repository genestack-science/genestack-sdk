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
