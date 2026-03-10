/**
 * @file ingestion_throughput.ts
 * @description In-depth multi-threaded processing performance tests for profiling ingestion throughput limits.
 * 
 */

import { Interpreter } from '../src/core/interpreter';
import { SignalInput } from '../src/types/signals';

const CONCURRENCY_BATCH_LIMIT = 50;
const TOTAL_ROUNDS = 12;

function createIngestionThroughputMock(index: number): SignalInput {
  const cognitionOptions: ('stable' | 'burst_crash' | 'low_drive')[] = ['stable', 'burst_crash', 'low_drive'];
  const sleepOptions: ('deep_refreshed' | 'disturbed' | 'wired_tired')[] = ['deep_refreshed', 'disturbed', 'wired_tired'];
  const inflammationOptions: ('rare' | 'occasional' | 'persistent')[] = ['rare', 'occasional', 'persistent'];

  return {
    userId: `usr_ingest_${index}_${Date.now().toString(36)}`,
    timestamp: Date.now(),
    cognition: {
      focusPattern: cognitionOptions[index % cognitionOptions.length]!,
      workingMemory: 'normal',
      stressThreshold: 'low',
    },
    circadian: {
      sleepLatency: 'high',
      wakingState: sleepOptions[index % sleepOptions.length]!,
      nocturnalArousal: 'high',
    },
    inflammation: {
      sorenessPersistence: inflammationOptions[index % inflammationOptions.length]!,
      chronicFatigue: 'occasional',
      localizedStiffness: 'moderate',
    },
    recovery: {
      muscleRegeneration: 'slow',
      forcePreservation: 'normal',
      jointSoreness: 'moderate',
    },
    metabolism: {
      caloricUtilization: 'normal',
      weightPreservation: 'easy_fat_gain',
      energyCrashes: 'frequent',
    },
    metadata: {
      sourceDevice: 'concurrency_throughput_tester',
      firmwareVersion: 'v1.0.1',
      samplingFrequencyHz: 1.0,
    }
