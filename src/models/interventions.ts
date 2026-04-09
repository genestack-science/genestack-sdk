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
