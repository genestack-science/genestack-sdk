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
    severity: 'major',
    mechanism: 'pathway_amplification',
    description: 'Concurrent dopamine synthesis pathway activation risks receptor desensitization.',
    mitigation: 'Reduce Bromantane to starting dose and alternate dosing days.'
  },
  {
    id: 'rule_bpc_tb500',
    compoundA: 'BPC-157 Peptide',
    compoundB: 'TB-500 Peptide',
    severity: 'minor',
    mechanism: 'synergistic_overload',
    description: 'Combined angiogenesis promotion — beneficial but warrants monitoring.',
    mitigation: 'Monitor for over-healing or hypersensitivity at injection sites.'
  },
  {
    id: 'rule_cjc_ghrp',
    compoundA: 'CJC-1295 + DAC',
    compoundB: 'GHRP-6',
    severity: 'moderate',
    mechanism: 'pathway_amplification',
    description: 'Dual GHRH/ghrelin axis stimulation can cause supraphysiological GH pulses.',
    mitigation: 'Use lower individual doses and monitor IGF-1 levels monthly.'
  }
];

/**
 * Screens a pair of compound names against the standard interaction rules.
 */
export function screenInteractionPair(
  nameA: string,
  nameB: string,
  rules: CompoundInteractionRule[] = STANDARD_INTERACTION_RULES
): InteractionScreeningResult | null {
  for (const rule of rules) {
    const matches =
      (rule.compoundA === nameA && rule.compoundB === nameB) ||
      (rule.compoundA === nameB && rule.compoundB === nameA);

    if (matches) {
      return {
        pairKey: `${nameA}__${nameB}`,
        compoundA: nameA,
        compoundB: nameB,
        severity: rule.severity,
        mechanism: rule.mechanism,
        flagged: rule.severity !== 'none' && rule.severity !== 'minor',
        mitigation: rule.mitigation
      };
