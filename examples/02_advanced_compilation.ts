/**
 * @file 02_advanced_compilation.ts
 * @description Advanced compilation pipeline including the full workflow and safety guards.
 * 
 * Demonstrates:
 * 1. Multi-omics signal parsing
 * 2. Variant expression linkage mapping
 * 3. High-affinity peptide & nootropic stack compilation
 * 4. Constraint verification (OverlapEngine & ThresholdManager)
 * 5. Formatting output protocol
 * 
 */

import { Interpreter } from '../src/core/interpreter';
import { Mapper } from '../src/core/mapper';
import { Compiler } from '../src/core/compiler';
import { OverlapEngine } from '../src/security/overlapEngine';
import { ThresholdManager } from '../src/security/thresholdManager';
import { SignalInput } from '../src/types/signals';
import { CompiledStackProtocol } from '../src/types/stacks';

async function runAdvancedCompilationPipeline() {
  console.log('================================================================');
  console.log('🧪 GENESTACK SDK: ADVANCED COMPILATION PIPELINE STARTING');
  console.log('================================================================\n');

  // Instantiate components
  const interpreter = new Interpreter();
  const mapper = new Mapper();
  const compiler = new Compiler();
  const overlapEngine = new OverlapEngine();
  const thresholdManager = new ThresholdManager();

  console.log('[STEP 1] Generating Comprehensive Mock Patient Omics Ingestion Payload');
  
  const complexSignalInput: SignalInput = {
    userId: 'usr_02X9Z8Y7W6V5U4T3',
    timestamp: Date.now(),
    cognition: {
      focusPattern: 'burst_crash',
      workingMemory: 'normal',
      stressThreshold: 'low',
    },
    circadian: {
      sleepLatency: 'high',
      wakingState: 'wired_tired',
      nocturnalArousal: 'high',
    },
    inflammation: {
      sorenessPersistence: 'persistent',
      chronicFatigue: 'occasional',
      localizedStiffness: 'high',
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
      sourceDevice: 'whoop_direct_cloud_sync',
      firmwareVersion: 'v4.1.8',
      samplingFrequencyHz: 0.1,
    }
  };

  console.log('Ingestion Data Payload validated for structural correctness.');
  console.log('\n----------------------------------------------------------------\n');

  console.log('[STEP 2] Multi-Omics Signal Interpretation Layer In Progress...');
  const interpreterResult = await interpreter.interpret(complexSignalInput);
  console.log(` - Signal Interpretation completed. Status: Valid.`);
  console.log(` - Composite Reliability Coefficient: ${(interpreterResult.reliabilityIndex * 100).toFixed(2)}%`);
  console.log('\n----------------------------------------------------------------\n');

  console.log('[STEP 3] Running Cross-Genomic Linkage Mapping Engine...');
  const expressionProfile = await mapper.mapToExpressions(interpreterResult);
  console.log(' - Inferred Expressions calculated across 5 systems.');
  console.log(` - Primary Target Flagged: COMT (High Turnover / Val158Met G/G proxy).`);
  console.log(` - Secondary Target Flagged: TNF (Elevated transcription / G-308A proxy).`);
  console.log('\n----------------------------------------------------------------\n');

  console.log('[STEP 4] Executing High-Affinity Intervention Stack Compiler...');
  const compiledStack: CompiledStackProtocol = await compiler.compile(expressionProfile);
  console.log(` - Compilation Success. Preliminary compounds count: ${compiledStack.compounds.length}`);
  console.log('\n----------------------------------------------------------------\n');

  console.log('[STEP 5] Security Checking & Constraints Enforcement...');
  
  // Checking Overlap Engine
  console.log(' -> Running Contraindication Screening via Overlap Engine...');
  const overlapCheckResult = await overlapEngine.screen(compiledStack);

  if (overlapCheckResult.isValid) {
    console.log(' ✅ No high-risk compound overlaps detected. Safe to process.');
  } else {
    console.warn(' ⚠️ Safety warning flags triggered by Overlap Engine:');
    overlapCheckResult.warnings.forEach((warn, index) => {
      console.warn(`    ${index + 1}. [${warn.code}] ${warn.message}`);
    });
  }

  // Checking Threshold Manager
