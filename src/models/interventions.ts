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
