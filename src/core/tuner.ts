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
