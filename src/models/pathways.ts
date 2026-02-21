/**
 * @file pathways.ts
 * @description Biological pathway registry and mapping models.
 * Defines the five core GENESTACK regulatory pathways, their target genes,
 * and utility functions for pathway lookups.
 */

export type PathwayCategory =
  | 'dopaminergic'
  | 'circadian'
  | 'inflammatory'
  | 'growth_axis'
  | 'metabolic';

export interface PathwayDefinition {
