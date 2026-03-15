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
  startedAt: number;
  completedAt: number;
  totalDurationMs: number;
  checkpoints: ProfileCheckpoint[];
  throughputPerSec?: number;
}

export class PerformanceProfiler {
  private startTime: number = 0;
  private checkpoints: ProfileCheckpoint[] = [];
  private profileId: string;

  constructor(profileId?: string) {
    this.profileId = profileId ?? `prof_${Date.now().toString(36)}`;
  }

  /**
   * Starts the profiler timer.
   */
  public start(): void {
    this.startTime = Date.now();
    this.checkpoints = [];
  }

  /**
