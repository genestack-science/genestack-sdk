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
