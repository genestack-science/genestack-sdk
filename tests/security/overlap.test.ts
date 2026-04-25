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
        {
          id: 'int_semax',
          name: 'Semax Nootropic',
          dosage: '450 mcg',
          frequency: 'daily_morning',
          class: 'Nootropics',
          pathway: 'BDNF / TrkB Pathway',
          mappedExpressions: ['COMT'],
          details: 'Supports focus.',
          contraindications: [],
          safeBoundsMg: [0.1, 1.2],
          clinicalConfidence: 0.9
        }
      ],
      coverageScore: 1.0,
      redundancyScore: 'low',
      securityChecks: { isValid: true, warnings: [], adjustments: [] },
      suggestedPhasedSchedule: []
    };

    const assessment = await overlapEngine.screen(cleanProtocol);
    expect(assessment).toBeDefined();
    expect(assessment.isValid).toBe(true);
    expect(assessment.warnings.length).toBe(0);
    expect(assessment.adjustments.length).toBe(0);
  });

  it('Should flag dopaminergic overload when combining high-turnover nootropics', async () => {
    const dangerousProtocol: CompiledStackProtocol = {
      id: 'stk_dangerous_01',
      userId: 'usr_dangerous_overlap_01',
      timestamp: Date.now(),
      compounds: [
        {
          id: 'int_semax',
          name: 'Semax Nootropic',
          dosage: '450 mcg',
          frequency: 'daily_morning',
          class: 'Nootropics',
          pathway: 'BDNF / TrkB Pathway',
          mappedExpressions: ['COMT'],
          details: 'Supports focus.',
          contraindications: [],
          safeBoundsMg: [0.1, 1.2],
          clinicalConfidence: 0.9
        },
        {
          id: 'int_bromantane',
          name: 'Bromantane',
          dosage: '100 mg',
          frequency: 'daily_morning',
          class: 'Adaptogens',
          pathway: 'Glutamatergic Neuro-Modulation',
          mappedExpressions: ['DRD2'],
          details: 'Dopamine synthesis.',
          contraindications: [],
          safeBoundsMg: [25, 150],
          clinicalConfidence: 0.85
        }
      ],
      coverageScore: 1.0,
      redundancyScore: 'low',
      securityChecks: { isValid: true, warnings: [], adjustments: [] },
      suggestedPhasedSchedule: []
    };

    const assessment = await overlapEngine.screen(dangerousProtocol);
    expect(assessment).toBeDefined();
    expect(assessment.isValid).toBe(false);

    // Assert that the overlap engine triggers the correct security warning code
    const warnCodes = assessment.warnings.map((w) => w.code);
    expect(warnCodes.includes('DOPAMINERGIC_OVERLOAD')).toBe(true);

    // Verify dosage ceiling was applied to prevent receptor burnout
    expect(assessment.adjustments.length).toBe(1);
    expect(assessment.adjustments[0]?.compound).toBe('Bromantane');
    expect(assessment.adjustments[0]?.adjustedDose).toBe('25 mg');
  });
});
