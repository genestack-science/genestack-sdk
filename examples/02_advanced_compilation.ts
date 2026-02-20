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
