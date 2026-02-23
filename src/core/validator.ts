/**
 * @file validator.ts
 * @description Multi-layer schema and constraint validator for signal inputs and compiled protocols.
 * Enforces required fields, numerical ranges, and cross-field consistency checks.
 */

import { SignalInput } from '../types/signals';
import { CompiledStackProtocol } from '../types/stacks';
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
