/**
 * @file interactions.ts
 * @description Compound-to-compound interaction screening models.
 * Defines interaction severity tiers and contraindication rule structures
 * used by the Overlap Engine and Compiler safety layers.
 */

export type InteractionSeverity = 'none' | 'minor' | 'moderate' | 'major' | 'contraindicated';

export type InteractionMechanism =
  | 'synergistic_overload'
  | 'receptor_competition'
  | 'metabolic_saturation'
  | 'enzymatic_inhibition'
  | 'pathway_amplification';

export interface CompoundInteractionRule {
  id: string;
  compoundA: string;
  compoundB: string;
  severity: InteractionSeverity;
  mechanism: InteractionMechanism;
  description: string;
