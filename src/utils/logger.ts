/**
 * @file logger.ts
 * @description Structured diagnostic logger for the GENESTACK SDK pipeline.
 * Supports configurable log levels, prefixed namespaces, and JSON-structured output.
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogEntry {
  level: LogLevel;
  namespace: string;
  message: string;
