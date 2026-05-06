/**
 * @file normalizer.ts
 * @description Utility for normalizing multi-omics signals across heterogeneous datasets.
 */

export class SignalNormalizer {
  /**
   * Normalizes a raw biometric value to a [0, 1] range based on historical cohort bounds.
   */
  public static normalize(value: number, min: number, max: number): number {
    if (max <= min) return 0.5;
    const normalized = (value - min) / (max - min);
    return Math.max(0, Math.min(1, normalized));
  }

  /**
   * Applies Z-score normalization to a series of biological samples.
   */
  public static zScore(values: number[]): number[] {
    if (values.length === 0) return [];
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const stdDev = Math.sqrt(values.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b, 0) / values.length);
    
    if (stdDev === 0) return values.map(() => 0);
    return values.map(x => (x - mean) / stdDev);
  }
}
