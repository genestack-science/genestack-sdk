/**
 * @file mapper.test.ts
 * @description Validates genome-wide association linkage.
 * 
 */

import { Mapper } from '../../src/core/mapper';
import { InterpreterResult } from '../../src/types/signals';

describe('🧬 Mapper Unit Tests Suite', () => {
  let mapper: Mapper;

  beforeEach(() => {
