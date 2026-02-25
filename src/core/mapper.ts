import { InterpreterResult, ExpressionProfile } from '../types/signals';

export class Mapper {
  /**
   * Maps an interpretation result to inferred expression profile states.
   */
  public async mapToExpressions(result: InterpreterResult): Promise<ExpressionProfile> {
    if (!result || !result.userId) {
