/**
 * @file 01_simple_interpretation.ts
 * @description Advanced introductory ingestion script for the GENESTACK SDK.
 * This script demonstrates end-to-end signal conversion into inferred gene expressions.
 * 
 */

import { Interpreter } from '../src/core/interpreter';
import { Mapper } from '../src/core/mapper';
import { SignalInput, ExpressionProfile } from '../src/types/signals';

async function runSimpleInterpretationDemo() {
  console.log('================================================================');
  console.log('🧬 GENESTACK CORE: SIMPLE INTERPRETATION ENGINE STARTING');
  console.log('================================================================\n');

  // Initialize the core interpreter and mapper components
  const interpreter = new Interpreter();
  const mapper = new Mapper();

  console.log('[STEP 1] Raw Biometric Signals Payload Definition');
  const signalInput: SignalInput = {
    userId: 'usr_01J8H7K3M9N2V1A5',
    timestamp: Date.now(),
    cognition: {
      focusPattern: 'burst_crash',
      workingMemory: 'normal',
      stressThreshold: 'low',
    },
    circadian: {
      sleepLatency: 'high',
      wakingState: 'disturbed',
      nocturnalArousal: 'high',
    },
    inflammation: {
      sorenessPersistence: 'occasional',
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
      sourceDevice: 'oura_gen3_direct_sync',
      firmwareVersion: 'v2.4.12',
      samplingFrequencyHz: 0.05,
    }
  };

  console.log('Successfully initialized SignalInput payload for processing.');
  console.log(JSON.stringify(signalInput, null, 2));
  console.log('\n----------------------------------------------------------------\n');

  console.log('[STEP 2] Running Interpreter Signal De-noising & Processing');
  // Pass input to the signal de-noising layer
  const interpreterResult = await interpreter.interpret(signalInput);

  console.log('Interpreter Output Metrics:');
  console.log(`- Base Signals Processed: ${Object.keys(interpreterResult.metrics).length}`);
  console.log(`- Processing Duration: ${interpreterResult.computationTimeMs} ms`);
  console.log(`- Reliability Index: ${(interpreterResult.reliabilityIndex * 100).toFixed(1)}%`);
  console.log('\n----------------------------------------------------------------\n');

  console.log('[STEP 3] Running Mapping Engine to Infer Expressions');
  // Pass the processed output to the cross-genomic linkage mapping engine
  const expressionProfile: ExpressionProfile = await mapper.mapToExpressions(interpreterResult);

  console.log('Mapping Engine output completed successfully.\n');
  console.log('================================================================');
  console.log('📊 INFERRED EXPRESSIONS PROFILE RESULTS');
  console.log('================================================================');

  const { expressions } = expressionProfile;

  // Pretty print mapped expression results for inspection
  for (const [gene, details] of Object.entries(expressions)) {
    console.log(`\n🔹 TARGET GENE: ${gene.toUpperCase()}`);
    console.log(`  - Inferred Expression Level: ${details.status}`);
    console.log(`  - Algorithmic Score: ${(details.score * 100).toFixed(2)}%`);
    console.log(`  - Scientific Mechanism: ${details.technical}`);
  }

  console.log('\n================================================================');
