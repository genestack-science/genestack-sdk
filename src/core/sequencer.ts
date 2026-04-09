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
  alleles: string;
  observedDepth: number;
  qualityScore: number;
}

export class DirectSequencerAdapter {
  private config: SequencerIngestionConfig;

  constructor(customConfig: Partial<SequencerIngestionConfig> = {}) {
    this.config = {
      minimumQualityScore: 0.95,
      sequencerHardwareVendor: 'Illumina NovaSeq',
      samplingDepth: '30x',
      ...customConfig
    };
  }

  /**
   * Returns the active sequencer configuration.
   */
  public getConfig(): SequencerIngestionConfig {
    return { ...this.config };
  }

  /**
   * Processes a direct output string from a sequencing platform and extracts valid SNP records.
   */
  public async parseSequencerRawInput(rawOutputText: string): Promise<IngestedSnpRecord[]> {
    if (!rawOutputText || rawOutputText.trim().length === 0) {
      throw new Error('Parsing Failure: Sequencer raw string input cannot be empty.');
    }

    const matchedRecords: IngestedSnpRecord[] = [];
    const rawLines = rawOutputText.split(/\r?\n/);

    for (const line of rawLines) {
      const cleanLine = line.trim();
      if (cleanLine.startsWith('#') || cleanLine.length === 0) {
        continue;
      }

      // Illumina format tab/space separated schema:
      // rsid  chromosome  position  genotype  depth  quality
      const parts = cleanLine.split(/\s+/);
      if (parts.length < 4) {
        continue;
      }

      const rsId = parts[0]?.trim() || '';
      const chromosome = parts[1]?.trim() || '';
      const position = parseInt(parts[2]?.trim() || '0', 10);
      const alleles = parts[3]?.trim() || '';

      const observedDepth = parts[4] ? parseInt(parts[4], 10) : 30;
      const qualityScore = parts[5] ? parseFloat(parts[5]) : 1.0;

      // Exclude low-quality readings based on configured threshold
      if (qualityScore < this.config.minimumQualityScore) {
        continue;
      }

      // Basic allele format validation
      const validAlleleFormat = /^[ACGTDI/-]{1,2}$/i;
      if (!validAlleleFormat.test(alleles)) {
        continue;
      }

      matchedRecords.push({
        rsId,
        chromosome,
        position,
        alleles: alleles.toUpperCase(),
        observedDepth,
        qualityScore
      });
    }

    return matchedRecords;
  }

  /**
   * Translates allele data from a sequence into standard variant status markers.
   */
  public convertAllelesToVariantStatus(
    rsId: string,
    alleles: string
  ): 'Downregulated' | 'Normal' | 'Upregulated' | 'Compensating' {
    const term = rsId.toLowerCase().trim();
    const cleanAlleles = alleles.toUpperCase().trim();

    if (term === 'rs4680' && cleanAlleles === 'G/G') return 'Upregulated';
    if (term === 'rs4680' && cleanAlleles === 'A/A') return 'Downregulated';
    if (term === 'rs1800497' && cleanAlleles === 'T/T') return 'Downregulated';
    if (term === 'rs1800629' && cleanAlleles === 'A/A') return 'Upregulated';

    return 'Normal';
  }

  /**
   * Filters a set of ingested records to only those above a custom quality threshold.
   */
  public filterByQuality(records: IngestedSnpRecord[], minScore: number): IngestedSnpRecord[] {
    return records.filter((r) => r.qualityScore >= minScore);
  }

  /**
   * Groups records by chromosome for downstream pathway analysis.
   */
  public groupByChromosome(records: IngestedSnpRecord[]): Record<string, IngestedSnpRecord[]> {
    const grouped: Record<string, IngestedSnpRecord[]> = {};
    for (const record of records) {
      if (!grouped[record.chromosome]) {
        grouped[record.chromosome] = [];
      }
      grouped[record.chromosome]!.push(record);
    }
    return grouped;
  }
}
