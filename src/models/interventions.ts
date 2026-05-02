/**
 * @file interventions.ts
 * @description Structured intervention compound models.
 * Defines the canonical compound catalog used by the Compiler
 * to select and validate peptide, nootropic, and adaptogen recommendations.
 */

export type CompoundClass =
  | 'Peptides'
  | 'Nootropics'
  | 'Adaptogens'
  | 'Mitochondrial'
  | 'Anti_Inflammatory'
  | 'Hormonal_Support'
  | 'Metabolic';

export type DeliveryRoute = 'sublingual' | 'subcutaneous' | 'oral' | 'intranasal' | 'topical';

export interface CatalogCompound {
  id: string;
  name: string;
  aliases: string[];
  class: CompoundClass;
  deliveryRoute: DeliveryRoute;
  targetPathways: string[];
  targetGenes: string[];
  mechanism: string;
  halfLifeHours: number;
  onset: 'immediate' | 'gradual' | 'delayed';
  standardDoseMg: number;
  maxDailyDoseMg: number;
  contraindications: string[];
  clinicalEvidenceScore: number; // 0–1 scale
}

export const COMPOUND_CATALOG: CatalogCompound[] = [
  {
    id: 'cat_semax',
    name: 'Semax',
    aliases: ['Semax Nootropic', 'ACTH(4-7)'],
    class: 'Nootropics',
    deliveryRoute: 'intranasal',
    targetPathways: ['BDNF / TrkB Pathway', 'Dopaminergic Pathway'],
    targetGenes: ['COMT', 'DRD2'],
    mechanism: 'Upregulates BDNF synthesis and prevents prefrontal dopamine crash.',
    halfLifeHours: 0.5,
    onset: 'immediate',
    standardDoseMg: 0.45,
    maxDailyDoseMg: 1.5,
    contraindications: ['Severe_Anxiety', 'Psychosis_History'],
    clinicalEvidenceScore: 0.82
  },
  {
    id: 'cat_bpc157',
    name: 'BPC-157',
    aliases: ['BPC-157 Peptide', 'Body Protective Compound 157'],
    class: 'Peptides',
    deliveryRoute: 'subcutaneous',
    targetPathways: ['VEGFR-2 Angiogenesis', 'COX-2 Anti-Inflammatory'],
    targetGenes: ['TNF-α', 'IL-6'],
    mechanism: 'Promotes angiogenesis and directly downregulates local inflammatory cytokines.',
    halfLifeHours: 4,
    onset: 'gradual',
    standardDoseMg: 0.25,
    maxDailyDoseMg: 1.0,
    contraindications: ['Active_Oncology'],
    clinicalEvidenceScore: 0.88
  },
  {
    id: 'cat_cjc1295',
    name: 'CJC-1295 + DAC',
    aliases: ['CJC1295', 'DAC:GRF'],
    class: 'Peptides',
    deliveryRoute: 'subcutaneous',
    targetPathways: ['GHRH Axis', 'IGF-1 Growth Axis'],
    targetGenes: ['IGF-1', 'MSTN'],
    mechanism: 'Sustains pulsatile GH release via GHRH receptor agonism.',
    halfLifeHours: 240,
    onset: 'delayed',
    standardDoseMg: 2.0,
    maxDailyDoseMg: 4.0,
    contraindications: ['Pituitary_Adenoma', 'Active_Cancer'],
    clinicalEvidenceScore: 0.79
  },
  {
    id: 'cat_bromantane',
    name: 'Bromantane',
    aliases: ['Ladasten'],
    class: 'Adaptogens',
    deliveryRoute: 'oral',
    targetPathways: ['Glutamatergic Neuro-Modulation', 'Dopamine Synthesis'],
    targetGenes: ['DRD2', 'COMT'],
    mechanism: 'Enhances tyrosine hydroxylase activity to increase dopamine synthesis capacity.',
    halfLifeHours: 11,
    onset: 'gradual',
    standardDoseMg: 100,
    maxDailyDoseMg: 200,
    contraindications: [],
    clinicalEvidenceScore: 0.72
  }
];

/**
 * Looks up a compound from the catalog by name or alias.
 */
export function findCompoundByName(name: string): CatalogCompound | undefined {
  const lowerName = name.toLowerCase();
  return COMPOUND_CATALOG.find(
    (c) =>
      c.name.toLowerCase() === lowerName ||
      c.aliases.some((a) => a.toLowerCase() === lowerName)
  );
}
