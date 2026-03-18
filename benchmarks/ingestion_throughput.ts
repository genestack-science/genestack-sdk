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
  };
}

async function runHighThroughputConcurrencyTest() {
  console.log('================================================================');
  console.log('🏁 MULTI-THREAD HIGH-THROUGHPUT TEST STARTING');
  console.log('================================================================\n');

  const interpreter = new Interpreter();
  const durations: number[] = [];
  let successfulRequests = 0;

  console.log(`[INIT] Executing ${TOTAL_ROUNDS} concurrent batch tests...`);
  console.log(`[INIT] Batch size limit set to ${CONCURRENCY_BATCH_LIMIT} parallel requests.`);
  console.log('\n----------------------------------------------------------------\n');

  for (let round = 1; round <= TOTAL_ROUNDS; round++) {
    const roundStartTime = Date.now();
    const concurrentBatch: Promise<any>[] = [];

    for (let i = 0; i < CONCURRENCY_BATCH_LIMIT; i++) {
      const sample = createIngestionThroughputMock(round * 100 + i);
      // Push promise execution directly to the batch array
      concurrentBatch.push(interpreter.interpret(sample));
    }

    // Resolve parallel requests concurrently
    const batchResults = await Promise.all(concurrentBatch);
    
    const roundEndTime = Date.now();
    const roundDuration = roundEndTime - roundStartTime;
    durations.push(roundDuration);
    successfulRequests += batchResults.length;

    console.log(` ✅ Batch #${round.toString().padStart(2, '0')} Processed. Duration: ${roundDuration} ms | Successes: ${batchResults.length}`);
  }

  // Calculate statistical distribution metrics
  const totalProcessingDuration = durations.reduce((sum, d) => sum + d, 0);
  const minDuration = Math.min(...durations);
  const maxDuration = Math.max(...durations);
  const averageDuration = totalProcessingDuration / TOTAL_ROUNDS;
