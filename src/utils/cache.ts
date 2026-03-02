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
