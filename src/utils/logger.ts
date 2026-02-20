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
  timestamp: number;
  data?: Record<string, unknown>;
}
export interface LoggerConfig {
  namespace: string;
  minLevel: LogLevel;
  enableJsonOutput: boolean;
  enableTimestamps: boolean;
}

const LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3
};

export class SDKLogger {
  private config: LoggerConfig;
  private history: LogEntry[] = [];

  constructor(config: Partial<LoggerConfig> = {}) {
    this.config = {
      namespace: 'genestack-sdk',
      minLevel: 'info',
      enableJsonOutput: false,
      enableTimestamps: true,
      ...config
    };
