/**
 * @file overlap.test.ts
 * @description Evaluates dynamic over-activation limits.
 * 
 */

import { OverlapEngine } from '../../src/security/overlapEngine';
import { CompiledStackProtocol } from '../../src/types/stacks';

describe('🛡️ Overlap Engine Unit Tests Suite', () => {
  let overlapEngine: OverlapEngine;

  beforeEach(() => {
    overlapEngine = new OverlapEngine();
  });

  it('Should successfully create an overlap engine instance', () => {
    expect(overlapEngine).toBeDefined();
    expect(overlapEngine).toBeInstanceOf(OverlapEngine);
  });

  it('Should successfully screen compliant stacks with no triggered warnings', async () => {
    const cleanProtocol: CompiledStackProtocol = {
      id: 'stk_clean_01',
      userId: 'usr_clean_safety_01',
      timestamp: Date.now(),
      compounds: [
