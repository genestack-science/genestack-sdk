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

    entry.hitCount++;
    this.totalHits++;
    return entry.value;
  }

  /**
   * Returns whether a non-expired entry exists for the given key.
   */
  public has(key: string): boolean {
    return this.get(key) !== null;
  }

  /**
   * Removes a single entry from the cache.
   */
  public delete(key: string): void {
    this.store.delete(key);
  }

  /**
   * Purges all expired entries from the cache.
   */
  public purgeExpired(): number {
    const now = Date.now();
    let purgedCount = 0;
    for (const [key, entry] of this.store.entries()) {
      if (now > entry.expiresAt) {
        this.store.delete(key);
        purgedCount++;
      }
    }
    this.totalPurged += purgedCount;
    return purgedCount;
  }

  /**
   * Clears all cache entries.
   */
  public clear(): void {
    this.totalPurged += this.store.size;
    this.store.clear();
  }

  /**
   * Returns cache performance statistics.
   */
  public getStats(): CacheStats {
    return {
      totalEntries: this.store.size,
      hitRate: this.totalRequests > 0
        ? parseFloat((this.totalHits / this.totalRequests).toFixed(3))
        : 0,
      expiredPurged: this.totalPurged
    };
  }
}
