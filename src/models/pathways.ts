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
    name: 'Circadian Rhythmicity',
    category: 'circadian',
    targetGenes: ['PER3', 'CLOCK'],
    targetSnps: ['rs57875989', 'rs1801260'],
    biologicalFunction: 'Controls chronotype alignment, slow-wave sleep, and cellular repair timing.',
    interventionClasses: ['Hormonal_Support', 'Adaptogens'],
    biomarkerProxies: ['sleep_latency', 'slow_wave_amplitude', 'nocturnal_arousal']
  },
  {
    id: 'pathway_inflammatory',
    name: 'Inflammatory Balance',
    category: 'inflammatory',
    targetGenes: ['TNF-α', 'IL-6'],
    targetSnps: ['rs1800629', 'rs1800795'],
    biologicalFunction: 'Governs localized cytokine activity and physical stress recovery.',
    interventionClasses: ['Peptides', 'Anti_Inflammatory'],
    biomarkerProxies: ['hs_crp', 'il6_serum', 'soreness_persistence']
  },
  {
    id: 'pathway_growth_axis',
    name: 'Anabolic Signaling & Growth Axis',
    category: 'growth_axis',
    targetGenes: ['IGF-1', 'MSTN'],
    targetSnps: ['rs35767', 'rs1805086'],
    biologicalFunction: 'Modulates tissue repair, myostatin suppression, and GH pulsatility.',
    interventionClasses: ['Peptides', 'Hormonal_Support'],
    biomarkerProxies: ['igf1_serum', 'muscle_regeneration_rate']
  },
  {
    id: 'pathway_metabolic',
    name: 'Metabolic Efficiency',
    category: 'metabolic',
    targetGenes: ['FTO', 'PPARG'],
    targetSnps: ['rs9939609'],
    biologicalFunction: 'Determines lipid storage tendency vs. mitochondrial uncoupling capacity.',
    interventionClasses: ['Mitochondrial', 'Metabolic'],
    biomarkerProxies: ['fasting_glucose', 'resting_metabolic_rate', 'body_composition']
  }
];

/**
 * Returns a pathway definition by its category key.
 */
export function getPathwayByCategory(category: PathwayCategory): PathwayDefinition | undefined {
  return PATHWAY_REGISTRY.find((p) => p.category === category);
}

/**
 * Returns all pathways that target a specific gene symbol.
 */
export function getPathwaysByGene(geneSymbol: string): PathwayDefinition[] {
  return PATHWAY_REGISTRY.filter((p) =>
    p.targetGenes.some((g) => g.toLowerCase() === geneSymbol.toLowerCase())
  );
}

/**
 * Returns all pathways that target a specific SNP rsID.
 */
export function getPathwaysBySnp(rsId: string): PathwayDefinition[] {
  return PATHWAY_REGISTRY.filter((p) =>
    p.targetSnps.some((s) => s.toLowerCase() === rsId.toLowerCase())
  );
}
