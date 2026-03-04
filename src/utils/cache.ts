/**
 * @file cache.ts
 * @description Generic in-memory LRU-style cache with TTL support.
 * Used across the SDK for caching genomic references, expression profiles,
 * and compiled protocol outputs to reduce redundant computation.
 */

export interface CacheEntry<T> {
  key: string;
  value: T;
  createdAt: number;
  expiresAt: number;
  hitCount: number;
}
export interface CacheStats {
  totalEntries: number;
  hitRate: number;
  expiredPurged: number;
}

export class SDKCache<T> {
  private store: Map<string, CacheEntry<T>> = new Map();
  private totalRequests = 0;
  private totalHits = 0;
  private totalPurged = 0;

  constructor(private defaultTtlMs = 300_000) {} // Default: 5 minutes

  /**
   * Stores a value in the cache with an optional custom TTL.
   */
  public set(key: string, value: T, ttlMs?: number): void {
    const now = Date.now();
    this.store.set(key, {
      key,
      value,
      createdAt: now,
      expiresAt: now + (ttlMs ?? this.defaultTtlMs),
      hitCount: 0
    });
  }

  /**
   * Retrieves a value from the cache. Returns null if expired or missing.
   */
  public get(key: string): T | null {
    this.totalRequests++;
    const entry = this.store.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return null;
    }

