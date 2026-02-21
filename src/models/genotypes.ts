/**
 * @file genotypes.ts
 * @description Genotype classification models and allele interpretation utilities.
 * Defines the structured representations of raw sequencing outputs used across the SDK.
 */

export type ZygosityType = 'homozygous_major' | 'heterozygous' | 'homozygous_minor';

export type ExpressionImpact = 'gain_of_function' | 'loss_of_function' | 'neutral' | 'uncertain';

export interface AlleleClassification {
  rsId: string;
  geneSymbol: string;
  observedAlleles: string;
  zygosity: ZygosityType;
  expressionImpact: ExpressionImpact;
  populationFrequencyPct: number;
}
export interface GenotypeSummaryProfile {
  userId: string;
  processedAt: number;
