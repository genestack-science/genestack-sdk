export interface SandboxOptions {
  maxMemoryAllowedBytes: number;
  totalComputationDurationMs: number;
  preventOutboundSockets: boolean;
  isolationLevel: 'low' | 'high';
}
export interface SandboxResponse {
  success: boolean;
  output: any;
  error?: string;
  executionDurationMs: number;
  warningsRaised: string[];
}

export class SecuritySandbox {
  private options: SandboxOptions;
  constructor(options: SandboxOptions) {
    this.options = options;
