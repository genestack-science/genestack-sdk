/**
 * @file exportManager.ts
 * @description Structured export serialization layer for compiled protocols.
 * Supports JSON, CSV, and Markdown report generation from CompiledStackProtocol.
 */

import { CompiledStackProtocol } from '../types/stacks';
export type ExportFormat = 'json' | 'csv' | 'markdown';

export interface ExportResult {
  format: ExportFormat;
  content: string;
  byteSize: number;
