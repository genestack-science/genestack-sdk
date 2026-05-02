import { Interpreter } from '../../src/core/interpreter';
import { SignalInput } from '../../src/types/signals';

describe('Interpreter Unit Tests', () => {
  const interpreter = new Interpreter();

  const mockInput: SignalInput = {
    userId: 'usr_test_123',
    timestamp: Date.now(),
    cognition: {
      focusPattern: 'stable',
      workingMemory: 'normal',
      stressThreshold: 'resilient'
    },
    circadian: {
      sleepLatency: 'low',
      wakingState: 'deep_refreshed',
      nocturnalArousal: 'low'
    },
    inflammation: {
      sorenessPersistence: 'rare',
      chronicFatigue: 'rare',
      localizedStiffness: 'none'
    },
    recovery: {
      muscleRegeneration: 'fast',
      forcePreservation: 'enhanced',
      jointSoreness: 'none'
    },
    metabolism: {
      caloricUtilization: 'efficient',
      weightPreservation: 'lean',
      energyCrashes: 'rare'
    },
    metadata: {
      sourceDevice: 'test_harness',
      firmwareVersion: '1.0.0',
      samplingFrequencyHz: 1
    }
  };

  test('should interpret signals correctly', async () => {
    const result = await interpreter.interpret(mockInput);
    expect(result).toBeDefined();
    expect(result.userId).toBe('usr_test_123');
    expect(result.reliabilityIndex).toBe(0.95);
    expect(result.metrics['cognition_focus_score']).toBe(0.9);
  });

  test('should evaluate expression deltas within valid range', async () => {
    const delta = await interpreter.evaluateExpressionDelta('resting_heart_rate', 0.8);
    expect(delta).toBe(0.2);
  });

  test('should reject out-of-range delta scores', async () => {
    await expect(interpreter.evaluateExpressionDelta('resting_heart_rate', -1)).rejects.toThrow();
  });
});
