/**
 * @file loader.ts
 * @description Advanced variant database loader for loading multi-omics variant references.
 * Manages an in-memory cache of standard genomic SNP references for fast downstream lookups.
 */

export interface CachedGenomicReference {
  id: string;
  geneSymbol: string;
  rsId: string;
  majorAlleles: string;
  minorAlleles: string;
}

export class VariantDatabaseLoader {
  private inMemoryCache: Map<string, CachedGenomicReference> = new Map();
  private totalVariantsLoaded = 0;

  constructor() {
    this.populateInitialCache();
  }

  /**
   * Pre-loads the in-memory cache with standard default genomic references.
   */
  private populateInitialCache(): void {
    const defaultReferences: CachedGenomicReference[] = [
      { id: 'ref_comt',  geneSymbol: 'COMT',  rsId: 'rs4680',      majorAlleles: 'G/G', minorAlleles: 'A/A' },
      { id: 'ref_drd2',  geneSymbol: 'DRD2',  rsId: 'rs1800497',   majorAlleles: 'C/C', minorAlleles: 'T/T' },
      { id: 'ref_per3',  geneSymbol: 'PER3',  rsId: 'rs57875989',  majorAlleles: '5/5', minorAlleles: '4/4' },
      { id: 'ref_clock', geneSymbol: 'CLOCK', rsId: 'rs1801260',   majorAlleles: 'T/T', minorAlleles: 'C/C' },
      { id: 'ref_tnf',   geneSymbol: 'TNF-α', rsId: 'rs1800629',   majorAlleles: 'G/G', minorAlleles: 'A/A' },
      { id: 'ref_il6',   geneSymbol: 'IL6',   rsId: 'rs1800795',   majorAlleles: 'G/G', minorAlleles: 'C/C' },
      { id: 'ref_fto',   geneSymbol: 'FTO',   rsId: 'rs9939609',   majorAlleles: 'T/T', minorAlleles: 'A/A' },
      { id: 'ref_igf1',  geneSymbol: 'IGF-1', rsId: 'rs35767',     majorAlleles: 'G/G', minorAlleles: 'A/A' },
      { id: 'ref_mstn',  geneSymbol: 'MSTN',  rsId: 'rs1805086',   majorAlleles: 'A/A', minorAlleles: 'G/G' },
    ];

    for (const ref of defaultReferences) {
      this.inMemoryCache.set(ref.rsId.toLowerCase(), ref);
      this.totalVariantsLoaded++;
    }
  }

  /**
   * Fetches variant reference details from the in-memory cache.
   * Falls back to a simulated async database call on cache miss.
   */
  public async loadGenomicReference(rsId: string): Promise<CachedGenomicReference | null> {
    if (!rsId) return null;

    const cachedRef = this.inMemoryCache.get(rsId.toLowerCase());
    if (cachedRef) return cachedRef;

    // Simulate an asynchronous variant database call for uncached IDs
    return new Promise((resolve) => {
      setTimeout(() => resolve(null), 150);
    });
  }

  /**
   * Inserts or updates a genomic reference in the in-memory cache.
   */
  public upsertReference(ref: CachedGenomicReference): void {
    if (!ref.rsId) throw new Error('Upsert Failure: rsId cannot be empty.');
    const key = ref.rsId.toLowerCase();
    if (!this.inMemoryCache.has(key)) {
      this.totalVariantsLoaded++;
    }
    this.inMemoryCache.set(key, ref);
  }

  /**
   * Returns how many variants are currently loaded into the cache.
