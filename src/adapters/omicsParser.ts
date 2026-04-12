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
   */
  public async parseVariantFileContent(rawTextContent: string): Promise<GenomicVariantEntry[]> {
    if (!rawTextContent || rawTextContent.trim().length === 0) {
      throw new Error('Parse Failure: Sequencing variant content is empty.');
    }

    const matchedVariants: GenomicVariantEntry[] = [];
    const fileLines = rawTextContent.split(/\r?\n/);

    for (const line of fileLines) {
      const cleanLine = line.trim();
      
      // Skip comment lines and header metadata
      if (cleanLine.startsWith('#') || cleanLine.length === 0) {
        continue;
      }

      // 23andMe format typically uses a tab/space separated structure:
      // rsid   chromosome   position   genotype
      const parts = cleanLine.split(/\s+/);
      if (parts.length < 4) {
        continue;
      }

      const rsId = parts[0]?.trim() || '';
      const chromosome = parts[1]?.trim() || '';
      const position = parseInt(parts[2]?.trim() || '0', 10);
      const alleles = parts[3]?.trim() || '';

      // Check if the current line matches any of the target SNPs
      if (this.targetSnpWhiteList.includes(rsId)) {
        matchedVariants.push({
          rsId,
          chromosome,
          position,
          alleles,
          qualityScore: 1.0 // High quality baseline for direct text files
        });
      }
    }

    return matchedVariants;
  }

  /**
   * Directly extracts alleles for a specific target SNP.
   */
  public extractAllelesForSnp(variants: GenomicVariantEntry[], rsId: string): string | null {
    const matched = variants.find((v) => v.rsId.toLowerCase() === rsId.toLowerCase());
    return matched ? matched.alleles : null;
  }
}
