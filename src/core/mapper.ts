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
