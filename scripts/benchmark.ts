/**
 * @file benchmark.ts
 * @description Advanced performance benchmark suite for profiling telemetry processing limits.
 * 
 * Demonstrates:
 * 1. Iterating over large datasets of mock multi-omics/biometric entries
 * 2. Timing the processing limits of the Ingestion/Translation layer
 * 3. Reporting memory heap allocations and throughput metrics per second
 * 
 */

import { Interpreter } from '../src/core/interpreter';
import { Mapper } from '../src/core/mapper';
import { SignalInput } from '../src/types/signals';

const SAMPLE_SIZE = 450;
const OUTPUT_UPDATE_INTERVAL = 50;

function createBenchmarkSample(index: number): SignalInput {
  const cognitionOptions: ('stable' | 'burst_crash' | 'low_drive')[] = ['stable', 'burst_crash', 'low_drive'];
  const sleepOptions: ('deep_refreshed' | 'disturbed' | 'wired_tired')[] = ['deep_refreshed', 'disturbed', 'wired_tired'];
  const inflammationOptions: ('rare' | 'occasional' | 'persistent')[] = ['rare', 'occasional', 'persistent'];
  
  return {
    userId: `usr_bench_${index}_${Date.now().toString(36)}`,
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
      chronicFatigue: 'rare',
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
      sourceDevice: 'benchmark_harness',
