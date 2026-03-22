import { InterpreterResult, ExpressionProfile } from '../types/signals';

export class Mapper {
  /**
   * Maps an interpretation result to inferred expression profile states.
   */
  public async mapToExpressions(result: InterpreterResult): Promise<ExpressionProfile> {
    if (!result || !result.userId) {
      throw new Error('Mapping Failure: Ingestion payload contains no valid user identity.');
    }

    const expressions: Record<string, { status: 'Upregulated' | 'Compensating' | 'Normal' | 'Downregulated'; score: number }> = {};

    // Map cognition metrics to COMT
    const rawFocus = typeof result.metrics['cognition_focus_score'] === 'number' ? result.metrics['cognition_focus_score'] : 0.5;
    const focusScore = 1 - rawFocus;
    if (focusScore >= 0.6) {
      expressions['comt'] = { status: 'Upregulated', score: focusScore };
    } else if (focusScore < 0.4) {
      expressions['comt'] = { status: 'Downregulated', score: focusScore };
    } else {
      expressions['comt'] = { status: 'Normal', score: focusScore };
    }

    // Map inflammatory metrics to TNF
    const loadScore = typeof result.metrics['inflammatory_cytokine_load'] === 'number' ? result.metrics['inflammatory_cytokine_load'] : 0.5;
    if (loadScore > 0.7) {
      expressions['tnf'] = { status: 'Upregulated', score: loadScore };
    } else if (loadScore < 0.3) {
      expressions['tnf'] = { status: 'Downregulated', score: loadScore };
    } else {
      expressions['tnf'] = { status: 'Normal', score: loadScore };
    }

    // Map growth & recovery to IGF1
    const repairScore = typeof result.metrics['growth_repair_signal'] === 'number' ? result.metrics['growth_repair_signal'] : 0.5;
    if (repairScore > 0.7) {
      expressions['igf1'] = { status: 'Upregulated', score: repairScore };
    } else if (repairScore < 0.4) {
      expressions['igf1'] = { status: 'Downregulated', score: repairScore };
    } else {
      expressions['igf1'] = { status: 'Normal', score: repairScore };
    }

    return {
      id: `expr_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`,
      userId: result.userId,
      timestamp: Date.now(),
      expressions
    };
  }
