/**
 * @file adapters.ts
 * @description Shared type definitions for all inbound adapter modules.
 * Covers wearable telemetry, omics parser, blood panel, and export adapter contracts.
 */

export type AdapterStatus = 'connected' | 'disconnected' | 'error' | 'initializing';

export interface AdapterHealthCheck {
  adapterId: string;
  name: string;
  status: AdapterStatus;
  lastPingAt: number;
  latencyMs?: number;
  errorMessage?: string;
}
export interface AdapterConfig {
  adapterId: string;
  timeoutMs: number;
  retryAttempts: number;
  enableLogging: boolean;
}
export interface ParsedAdapterOutput {
  adapterId: string;
  parsedAt: number;
  recordCount: number;
  data: Record<string, unknown>;
  warnings: string[];
}

/**
 * Creates a default AdapterConfig with sensible fallback values.
 */
export function createDefaultAdapterConfig(adapterId: string): AdapterConfig {
  return {
