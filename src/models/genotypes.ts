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
  totalVariantsProcessed: number;
  gainOfFunctionCount: number;
  lossOfFunctionCount: number;
  classifications: AlleleClassification[];
}

/**
 * Determines zygosity based on a two-character allele string like "AA", "AG", or "GG".
 */
export function classifyZygosity(majorAllele: string, observedAlleles: string): ZygosityType {
  const [a1, a2] = observedAlleles.toUpperCase().split('/');
  if (a1 === a2) {
    return a1 === majorAllele.toUpperCase() ? 'homozygous_major' : 'homozygous_minor';
  }
  return 'heterozygous';
}

/**
 * Determines a simple expression impact label based on zygosity and known gene behavior.
 */
export function inferExpressionImpact(
  geneSymbol: string,
  zygosity: ZygosityType
): ExpressionImpact {
  const gainOfFunctionGenes = ['COMT', 'TNF-α', 'IL6'];
  const lossOfFunctionGenes = ['DRD2', 'MSTN'];

  if (gainOfFunctionGenes.includes(geneSymbol)) {
    return zygosity === 'homozygous_minor' ? 'gain_of_function' : 'neutral';
  }
  if (lossOfFunctionGenes.includes(geneSymbol)) {
    return zygosity === 'homozygous_minor' ? 'loss_of_function' : 'neutral';
  }
  return 'uncertain';
}

/**
 * Builds a full GenotypeSummaryProfile from a list of AlleleClassifications.
 */
export function buildGenotypeSummary(
  userId: string,
  classifications: AlleleClassification[]
): GenotypeSummaryProfile {
  return {
    userId,
    processedAt: Date.now(),
    totalVariantsProcessed: classifications.length,
    gainOfFunctionCount: classifications.filter((c) => c.expressionImpact === 'gain_of_function').length,
    lossOfFunctionCount: classifications.filter((c) => c.expressionImpact === 'loss_of_function').length,
    classifications
  };
}
