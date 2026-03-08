/**
 * @file omicsParser.ts
 * @description In-depth multi-omics variant file reader for raw sequencing formats.
 * Parses and extracts specific SNPs (COMT, DRD2, etc.) from raw data.
 * 
 */

export interface GenomicVariantEntry {
  rsId: string;
  chromosome: string;
  position: number;
  alleles: string;
  qualityScore: number;
}

export class MultiOmicsParser {
  private targetSnpWhiteList: string[] = ['rs4680', 'rs1800497', 'rs57875989', 'rs1801260', 'rs1800629', 'rs9939609'];

  /**
   * Parses raw variant files (e.g. 23andMe, AncestryDNA, or VCF formats) line by line.
