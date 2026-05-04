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

    expressions['comt'] = this.calculateState(1 - (typeof result.metrics['cognition_focus_score'] === 'number' ? result.metrics['cognition_focus_score'] : 0.5), 0.6, 0.4);
    expressions['tnf'] = this.calculateState(typeof result.metrics['inflammatory_cytokine_load'] === 'number' ? result.metrics['inflammatory_cytokine_load'] : 0.5, 0.7, 0.3);
    expressions['igf1'] = this.calculateState(typeof result.metrics['growth_repair_signal'] === 'number' ? result.metrics['growth_repair_signal'] : 0.5, 0.7, 0.4);

    return {
      id: `expr_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`,
      userId: result.userId,
      timestamp: Date.now(),
      expressions
    };
  }

  /**
   * Internal helper to determine expression state based on thresholds.
   */
  private calculateState(score: number, high: number, low: number): { status: 'Upregulated' | 'Compensating' | 'Normal' | 'Downregulated'; score: number } {
    if (score >= high) return { status: 'Upregulated', score };
    if (score < low) return { status: 'Downregulated', score };
    return { status: 'Normal', score };
  }
}
