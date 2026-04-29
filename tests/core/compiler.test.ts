import { Compiler } from '../../src/core/compiler';
import { ExpressionProfile } from '../../src/types/signals';

describe('Compiler Unit Tests', () => {
  const compiler = new Compiler();

  const mockProfile: ExpressionProfile = {
    id: 'expr_test_123',
    userId: 'usr_test_123',
    timestamp: Date.now(),
    expressions: {
      comt: { status: 'Upregulated' },
      tnf: { status: 'Normal' },
      igf1: { status: 'Downregulated' }
    }
  };

  test('should compile expression profiles into protocol stacks', async () => {
    const protocol = await compiler.compile(mockProfile);
    expect(protocol).toBeDefined();
    expect(protocol.userId).toBe('usr_test_123');
    expect(protocol.compounds.length).toBeGreaterThan(0);
    expect(protocol.securityChecks.isValid).toBe(true);
  });

  test('should reject invalid expression profiles', async () => {
    await expect(compiler.compile(null as any)).rejects.toThrow();
  });
});
