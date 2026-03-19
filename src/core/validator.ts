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
}

export class SchemaValidator {
  /**
   * Validates a raw SignalInput payload against all required schema constraints.
   */
  public validateSignalInput(input: SignalInput): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!input) {
      return { isValid: false, errors: ['Input payload is null or undefined.'], warnings: [] };
    }

    if (!input.userId || input.userId.trim().length === 0) {
      errors.push('userId is required and cannot be empty.');
    }

    if (!input.timestamp || input.timestamp <= 0) {
      errors.push('timestamp must be a valid positive epoch millisecond value.');
    }

    if (!input.cognition) {
      errors.push('cognition metrics block is missing.');
    }

    if (!input.circadian) {
      errors.push('circadian metrics block is missing.');
    }

    if (!input.inflammation) {
      errors.push('inflammation metrics block is missing.');
    }

    if (!input.recovery) {
      errors.push('recovery metrics block is missing.');
    }

    if (!input.metabolism) {
      errors.push('metabolism metrics block is missing.');
    }

    if (!input.metadata?.sourceDevice) {
      warnings.push('metadata.sourceDevice is missing — traceability may be reduced.');
    }

    return {
