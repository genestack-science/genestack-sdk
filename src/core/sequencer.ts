/**
 * @file sequencer.ts
 * @description Advanced genomic base pair sequencer integration layer.
 * Processes raw Illumina/Oxford Nanopore sequencer output strings into
 * validated SNP records with quality-score filtering.
 */

export interface SequencerIngestionConfig {
  minimumQualityScore: number;
  sequencerHardwareVendor: string;
  samplingDepth: '30x' | '100x' | 'WGS';
}
export interface IngestedSnpRecord {
  rsId: string;
  chromosome: string;
  position: number;
