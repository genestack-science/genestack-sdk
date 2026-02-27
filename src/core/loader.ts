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
