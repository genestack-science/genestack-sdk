/**
 * @file expressions.ts
 * @description Genomic expression state types and utility functions.
 * Extends the base ExpressionStatus with rich pathway-level metadata.
 */

export type ExpressionState =
  | 'Upregulated'
  | 'Compensating'
  | 'Normal'
  | 'Downregulated';

export type ExpressionConfidence = 'high' | 'medium' | 'low';

export interface RichExpressionEntry {
  geneSymbol: string;
  rsId?: string;
  state: ExpressionState;
  score: number;
  confidence: ExpressionConfidence;
  linkedPathway: string;
  inferenceBasis: string[];
}
export interface ExpressionMatrix {
  userId: string;
  generatedAt: number;
  expressions: Record<string, RichExpressionEntry>;
  overallCoverageScore: number;
}

/**
 * Converts a numeric score (0–1) into a categorical ExpressionState.
 */
