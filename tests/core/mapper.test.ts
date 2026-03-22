/**
 * @file mapper.test.ts
 * @description Validates genome-wide association linkage.
 * 
 */

import { Mapper } from '../../src/core/mapper';
import { InterpreterResult } from '../../src/types/signals';

describe('🧬 Mapper Unit Tests Suite', () => {
  let mapper: Mapper;

  beforeEach(() => {
    mapper = new Mapper();
  });

  it('Should successfully create a mapper instance', () => {
    expect(mapper).toBeDefined();
    expect(mapper).toBeInstanceOf(Mapper);
  });

  it('Should map interpreted metrics directly to inferred gene expressions profiles', async () => {
    const mockResult: InterpreterResult = {
      id: 'int_test_mapper_01',
      userId: 'usr_mapper_test_01',
      timestamp: Date.now(),
      computationTimeMs: 12,
      reliabilityIndex: 0.98,
      metrics: {
        cognition_focus_score: 0.35,
        circadian_sleep_efficiency: 0.4,
        inflammatory_cytokine_load: 0.85,
        growth_repair_signal: 0.35,
        metabolic_storage_bias: 0.8
      }
    };

    const profile = await mapper.mapToExpressions(mockResult);

    expect(profile).toBeDefined();
    expect(profile.id).toBeDefined();
    expect(profile.userId).toBe('usr_mapper_test_01');
    expect(profile.expressions).toBeDefined();
