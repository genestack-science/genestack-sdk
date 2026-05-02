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
      firmwareVersion: 'v1.0.0',
      samplingFrequencyHz: 1.0,
    }
  };
}

async function runThroughputProfiling() {
  console.log('================================================================');
  console.log('🏁 GENESTACK PERFORMANCE BENCHMARKING HARNESS STARTING');
  console.log('================================================================\n');

  const interpreter = new Interpreter();
  const mapper = new Mapper();

  console.log(`[INIT] Generating ${SAMPLE_SIZE} synthetic multi-omics telemetry samples...`);
  const benchmarkSamples: SignalInput[] = [];
  for (let i = 0; i < SAMPLE_SIZE; i++) {
    benchmarkSamples.push(createBenchmarkSample(i));
  }
  console.log('Dataset populated successfully. Processing initialization complete.');
  console.log('\n----------------------------------------------------------------\n');

  console.log('[PROFILING START] Initiating telemetry data parsing loops...');

  const startTimeMs = Date.now();
  const initialMemoryUsage = process.memoryUsage();

  let successfullyProcessedSamples = 0;

  for (let i = 0; i < SAMPLE_SIZE; i++) {
    const sample = benchmarkSamples[i]!;

    // Run basic interpreter parsing
    const interpretedResult = await interpreter.interpret(sample);

    // Run cross-genomic linkage mapping
    const expressionProfile = await mapper.mapToExpressions(interpretedResult);

    if (expressionProfile.id) {
      successfullyProcessedSamples++;
    }

    if (i > 0 && i % OUTPUT_UPDATE_INTERVAL === 0) {
      const currentElapsedMs = Date.now() - startTimeMs;
      const rate = (successfullyProcessedSamples / (currentElapsedMs / 1000)).toFixed(1);
      console.log(`⏳ Progress Check: ${successfullyProcessedSamples}/${SAMPLE_SIZE} parsed. Rate: ${rate} samples/sec`);
    }
  }

  const endMemoryUsage = process.memoryUsage();
  const totalElapsedMs = Date.now() - startTimeMs;
  const processingThroughputRate = (successfullyProcessedSamples / (totalElapsedMs / 1000)).toFixed(1);

  console.log('\n----------------------------------------------------------------\n');
  console.log('================================================================');
  console.log('📈 BENCHMARK PERFORMANCE PROFILE RESULTS');
  console.log('================================================================');

  console.log(`- Total Ingestion Workload:  ${successfullyProcessedSamples} records`);
  console.log(`- Total Time Elapsed:        ${totalElapsedMs} ms`);
  console.log(`- Data Conversion Rate:      ${processingThroughputRate} records/sec`);
  
  console.log('\nMemory Profile Diagnostics:');
  console.log(`  - Baseline Heap Used:      ${(initialMemoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`);
  console.log(`  - Final Heap Allocation:   ${(endMemoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`);
  console.log(`  - Memory Overhead delta:   ${((endMemoryUsage.heapUsed - initialMemoryUsage.heapUsed) / 1024 / 1024).toFixed(2)} MB`);
  
  console.log('\n================================================================');
  console.log('🎉 BENCHMARK EXECUTION COMPLETED WITHOUT ISSUES');
  console.log('================================================================\n');
}

// Start profiling
runThroughputProfiling().catch((err) => {
  console.error('Fatal benchmark execution exception:', err);
  process.exit(1);
});
