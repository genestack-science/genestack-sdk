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
  }

  private shouldLog(level: LogLevel): boolean {
    return LEVEL_PRIORITY[level] >= LEVEL_PRIORITY[this.config.minLevel];
  }

  private formatMessage(entry: LogEntry): string {
    if (this.config.enableJsonOutput) {
      return JSON.stringify(entry);
    }
    const ts = this.config.enableTimestamps
      ? `[${new Date(entry.timestamp).toISOString()}] `
      : '';
    const data = entry.data ? ` ${JSON.stringify(entry.data)}` : '';
    return `${ts}[${entry.level.toUpperCase()}] [${entry.namespace}] ${entry.message}${data}`;
  }

  public debug(message: string, data?: Record<string, unknown>): void {
    this.emit('debug', message, data);
  }

  public info(message: string, data?: Record<string, unknown>): void {
    this.emit('info', message, data);
  }

  public warn(message: string, data?: Record<string, unknown>): void {
    this.emit('warn', message, data);
  }

  public error(message: string, data?: Record<string, unknown>): void {
    this.emit('error', message, data);
  }

  private emit(level: LogLevel, message: string, data?: Record<string, unknown>): void {
    if (!this.shouldLog(level)) return;

