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

