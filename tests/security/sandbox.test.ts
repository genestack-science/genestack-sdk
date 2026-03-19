/**
 * @file sandbox.test.ts
 * @description Validates runtime environment isolation.
 * 
 */

import { SecuritySandbox } from '../../src/security/sandbox';

describe('🛡️ Security Sandbox Unit Tests Suite', () => {
  let sandbox: SecuritySandbox;

  beforeEach(() => {
    sandbox = new SecuritySandbox({
      maxMemoryAllowedBytes: 1048576 * 64, // 64MB testing
      totalComputationDurationMs: 1500, // short timeout for tests
      preventOutboundSockets: true,
      isolationLevel: 'high'
    });
  });

  it('Should successfully create a sandbox instance', () => {
    expect(sandbox).toBeDefined();
    expect(sandbox).toBeInstanceOf(SecuritySandbox);
  });

  it('Should successfully execute compliant async tasks within isolated runtime', async () => {
    const validTask = async () => {
      let sum = 0;
      for (let i = 0; i < 100; i++) {
        sum += i;
      }
      return sum;
    };

    const response = await sandbox.executeIsolatedTask(validTask);

    expect(response).toBeDefined();
    expect(response.success).toBe(true);
    expect(response.output).toBe(4950);
    expect(response.error).toBeUndefined();
    expect(response.executionDurationMs).toBeLessThan(1000);
  });

  it('Should correctly detect unhandled runtime exceptions inside isolated tasks', async () => {
    const errorTask = async () => {
      throw new Error('Induced parse exception inside sandbox.');
    };

    const response = await sandbox.executeIsolatedTask(errorTask);

    expect(response).toBeDefined();
    expect(response.success).toBe(false);
    expect(response.output).toBeNull();
    expect(response.error).toContain('Induced parse exception');
    expect(response.warningsRaised.length).toBeGreaterThan(0);
  });

  it('Should detect dangerous patterns in raw script source strings', () => {
    const safeCode = `const x = 10; console.log(x);`;
    expect(sandbox.containsHazardousPatterns(safeCode)).toBe(false);

    const maliciousCode = `process.exit(1);`;
    expect(sandbox.containsHazardousPatterns(maliciousCode)).toBe(true);

    const exploitCode = `require("child_process").exec("rm -rf /");`;
