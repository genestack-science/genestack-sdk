/**
 * @file security.ts
 * @description Security-layer type definitions for GENESTACK SDK.
 * Covers compliance check results, sandbox runtime configs, and overlap engine outputs.
 */

export type SecuritySeverityLevel = 'info' | 'warning' | 'critical';

export interface SecurityEvent {
  eventId: string;
  severity: SecuritySeverityLevel;
  code: string;
  message: string;
  affectedEntity?: string;
