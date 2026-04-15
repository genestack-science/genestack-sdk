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
