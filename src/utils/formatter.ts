/**
 * @file formatter.ts
 * @description Output formatting utilities for scores, labels, and protocol summaries.
 */

/**
 * Formats a confidence score (0–1) as a percentage string with a label tier.
 */
export function formatConfidenceScore(score: number): string {
  const pct = (score * 100).toFixed(1);
  let tier: string;
  if (score >= 0.9) tier = 'Very High';
  else if (score >= 0.75) tier = 'High';
  else if (score >= 0.5) tier = 'Moderate';
  else if (score >= 0.25) tier = 'Low';
  else tier = 'Very Low';
  return `${pct}% (${tier})`;
}

/**
 * Converts a camelCase or snake_case key into a readable title label.
 */
export function keyToLabel(key: string): string {
  return key
