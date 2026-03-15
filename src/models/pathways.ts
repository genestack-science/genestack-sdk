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
  id: string;
  name: string;
  category: PathwayCategory;
  targetGenes: string[];
  targetSnps: string[];
  biologicalFunction: string;
  interventionClasses: string[];
  biomarkerProxies: string[];
}

export const PATHWAY_REGISTRY: PathwayDefinition[] = [
  {
    id: 'pathway_dopaminergic',
    name: 'Dopaminergic Regulation',
    category: 'dopaminergic',
    targetGenes: ['COMT', 'DRD2'],
    targetSnps: ['rs4680', 'rs1800497'],
    biologicalFunction: 'Regulates prefrontal dopamine clearance rates and receptor density.',
    interventionClasses: ['Nootropics', 'Adaptogens'],
    biomarkerProxies: ['cognitive_focus_score', 'working_memory_efficiency']
  },
  {
    id: 'pathway_circadian',
