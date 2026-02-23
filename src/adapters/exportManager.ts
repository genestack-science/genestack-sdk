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
  generatedAt: number;
}

export class ExportManager {
  /**
   * Serializes a compiled protocol into the requested export format.
   */
  public export(protocol: CompiledStackProtocol, format: ExportFormat): ExportResult {
    if (!protocol) {
      throw new Error('Export Failure: Protocol payload cannot be null.');
    }

    let content = '';
