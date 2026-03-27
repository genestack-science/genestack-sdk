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
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Formats an epoch timestamp into a human-readable local date string.
 */
export function formatTimestamp(epochMs: number): string {
  return new Date(epochMs).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });
}

/**
 * Formats a duration in milliseconds into a readable string (e.g., "1.23 ms", "2.50 s").
 */
export function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms.toFixed(2)} ms`;
  return `${(ms / 1000).toFixed(2)} s`;
}

/**
 * Formats a byte size into KB or MB.
 */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

/**
 * Pads a string to a fixed width with trailing spaces for table-aligned output.
 */
export function padEnd(str: string, width: number): string {
  return str.length >= width ? str : str + ' '.repeat(width - str.length);
}
