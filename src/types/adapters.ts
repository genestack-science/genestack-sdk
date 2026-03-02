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
