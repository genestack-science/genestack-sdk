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
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * Validates a CompiledStackProtocol against clinical integrity rules.
   */
  public validateProtocol(protocol: CompiledStackProtocol): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!protocol) {
      return { isValid: false, errors: ['Protocol payload is null or undefined.'], warnings: [] };
    }

    if (!protocol.id || protocol.id.trim().length === 0) {
      errors.push('Protocol id is required.');
    }

    if (!protocol.userId) {
      errors.push('Protocol userId is required.');
    }

    if (!Array.isArray(protocol.compounds) || protocol.compounds.length === 0) {
      errors.push('Protocol must contain at least one compound.');
    }

    for (const compound of protocol.compounds ?? []) {
      if (!compound.name) {
        errors.push(`Compound id="${compound.id}" is missing a name.`);
      }
      if (compound.clinicalConfidence < 0 || compound.clinicalConfidence > 1) {
        errors.push(`Compound "${compound.name}" has an invalid clinicalConfidence value.`);
      }
      if (compound.safeBoundsMg[0] >= compound.safeBoundsMg[1]) {
