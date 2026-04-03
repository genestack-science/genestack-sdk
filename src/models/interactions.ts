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
  mitigation?: string;
}
export interface InteractionScreeningResult {
  pairKey: string;
  compoundA: string;
  compoundB: string;
  severity: InteractionSeverity;
  mechanism: InteractionMechanism;
  flagged: boolean;
  mitigation?: string;
}

// Standard pre-defined interaction rules for common compound combinations
export const STANDARD_INTERACTION_RULES: CompoundInteractionRule[] = [
  {
    id: 'rule_semax_bromantane',
    compoundA: 'Semax Nootropic',
    compoundB: 'Bromantane',
