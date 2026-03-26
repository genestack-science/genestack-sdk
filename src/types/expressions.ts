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
export function scoreToState(score: number, invertedScale = false): ExpressionState {
  const adjusted = invertedScale ? 1 - score : score;
  if (adjusted >= 0.7) return 'Upregulated';
  if (adjusted >= 0.5) return 'Compensating';
  if (adjusted >= 0.3) return 'Normal';
  return 'Downregulated';
}

/**
 * Maps an ExpressionState to a human-readable label with clinical context.
 */
export function stateToLabel(state: ExpressionState): string {
  const labels: Record<ExpressionState, string> = {
    Upregulated: 'Overactive — intervention may be required to downregulate.',
