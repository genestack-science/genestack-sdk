import { Compiler } from '../../src/core/compiler';
import { ExpressionProfile } from '../../src/types/signals';

describe('Compiler Unit Tests', () => {
  const compiler = new Compiler();

  const mockProfile: ExpressionProfile = {
    id: 'expr_test_123',
    userId: 'usr_test_123',
    timestamp: Date.now(),
