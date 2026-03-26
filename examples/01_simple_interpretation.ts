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
