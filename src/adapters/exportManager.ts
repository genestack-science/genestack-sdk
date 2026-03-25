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

    switch (format) {
      case 'json':
        content = this.toJson(protocol);
        break;
      case 'csv':
        content = this.toCsv(protocol);
        break;
      case 'markdown':
        content = this.toMarkdown(protocol);
        break;
      default:
        throw new Error(`Export Failure: Unsupported format "${format}".`);
    }

    return {
      format,
      content,
      byteSize: Buffer.byteLength(content, 'utf8'),
      generatedAt: Date.now()
    };
  }

  /**
   * Serializes the protocol to a pretty-printed JSON string.
   */
  private toJson(protocol: CompiledStackProtocol): string {
    return JSON.stringify(protocol, null, 2);
  }

  /**
   * Serializes the protocol compounds to a CSV string.
   */
  private toCsv(protocol: CompiledStackProtocol): string {
