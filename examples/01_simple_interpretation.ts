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
