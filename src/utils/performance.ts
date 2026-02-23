/**
 * @file performance.ts
 * @description Lightweight performance profiling utilities for the GENESTACK SDK pipeline.
 * Measures execution time, throughput, and memory usage across pipeline stages.
 */

export interface ProfileCheckpoint {
  label: string;
  timestampMs: number;
  elapsedSinceStartMs: number;
  memoryUsedMb?: number;
}
export interface PerformanceReport {
  profileId: string;
