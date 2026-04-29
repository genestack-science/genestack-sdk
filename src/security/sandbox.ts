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
  }

  public getOptions(): SandboxOptions {
    return this.options;
  }

  public async executeIsolatedTask(task: () => Promise<any>): Promise<SandboxResponse> {
    const startTime = Date.now();
    try {
      const output = await task();
      const executionDurationMs = Date.now() - startTime;
      return {
        success: true,
        output,
        executionDurationMs,
        warningsRaised: []
      };
    } catch (err: any) {
      const executionDurationMs = Date.now() - startTime;
      return {
        success: false,
        output: null,
        error: err.message || 'Induced parse exception',
        executionDurationMs,
        warningsRaised: ['Unhandled runtime exception detected']
      };
    }
  }

  public containsHazardousPatterns(code: string): boolean {
    if (!code) return false;
    const hazardousPatterns = ['process.exit', 'require', 'child_process', 'fs.'];
    for (const pattern of hazardousPatterns) {
      if (code.includes(pattern)) {
        return true;
      }
