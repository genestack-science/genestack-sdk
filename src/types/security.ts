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
  detectedAt: number;
}
export interface ComplianceCheckResult {
  isCompliant: boolean;
  warningsDetected: string[];
  anonymizedUserId: string;
  clearedFields: string[];
  checkedAt: number;
}
export interface SandboxExecutionResult {
  taskId: string;
  success: boolean;
  output: unknown;
  error?: string;
  executionDurationMs: number;
  warningsRaised: string[];
  memoryUsedBytes?: number;
}
export interface OverlapAssessmentResult {
  protocolId: string;
  isValid: boolean;
  warnings: Array<{ code: string; message: string }>;
  adjustments: Array<{ compound: string; adjustedDose: string; reason?: string }>;
  checkedAt: number;
}
export interface SecurityAuditReport {
  reportId: string;
  userId: string;
  generatedAt: number;
  events: SecurityEvent[];
  overallRiskScore: number; // 0–1, where 1 = highest risk
  recommendations: string[];
}

/**
 * Assigns a numeric risk score to a list of SecurityEvents.
 */
export function calculateRiskScore(events: SecurityEvent[]): number {
  if (events.length === 0) return 0;
  const weights: Record<SecuritySeverityLevel, number> = {
    info: 0.1,
    warning: 0.4,
    critical: 1.0
  };
  const raw = events.reduce((sum, e) => sum + weights[e.severity], 0);
  return parseFloat(Math.min(1.0, raw / events.length).toFixed(3));
}
