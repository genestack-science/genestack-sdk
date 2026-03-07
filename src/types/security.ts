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
