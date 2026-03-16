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
   * Records a named checkpoint with elapsed time and optional memory snapshot.
   */
  public checkpoint(label: string): void {
    const now = Date.now();
    const entry: ProfileCheckpoint = {
      label,
      timestampMs: now,
      elapsedSinceStartMs: now - this.startTime
    };

    if (typeof process !== 'undefined') {
      entry.memoryUsedMb = parseFloat(
        (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
      );
    }

    this.checkpoints.push(entry);
  }

  /**
   * Stops the profiler and returns the full performance report.
   */
  public stop(recordCount?: number): PerformanceReport {
    const completedAt = Date.now();
    const totalDurationMs = completedAt - this.startTime;

    const report: PerformanceReport = {
      profileId: this.profileId,
      startedAt: this.startTime,
      completedAt,
      totalDurationMs,
      checkpoints: this.checkpoints
    };

    if (recordCount !== undefined && totalDurationMs > 0) {
      report.throughputPerSec = parseFloat(
        ((recordCount / totalDurationMs) * 1000).toFixed(1)
      );
    }

    return report;
  }

  /**
   * Returns a formatted console-ready summary of a performance report.
   */
  public static formatReport(report: PerformanceReport): string {
