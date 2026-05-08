import { 
  ExperimentRun, 
  ExperimentCheckpoint, 
  OutcomeMetrics 
} from '../types/experiment';
import { CompiledStackProtocol } from '../types/stacks';
import { InterpreterResult } from '../types/signals';

// If not in a crypto-enabled environment, fallback to a simple generator
const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
};

export class ExperimentSystem {
  private runs: Map<string, ExperimentRun> = new Map();

  /**
   * Initializes a new experiment run.
   */
  public initializeRun(
    userId: string, 
    protocol: CompiledStackProtocol, 
    baseline: InterpreterResult
  ): ExperimentRun {
    const run: ExperimentRun = {
      id: generateId(),
      userId,
      protocolId: protocol.id,
      protocolSnapshot: protocol,
      status: 'active',
      startTime: Date.now(),
      checkpoints: [],
      baselineSignals: baseline
    };

    this.runs.set(run.id, run);
    return run;
  }

  /**
   * Logs a checkpoint for an active run.
   */
  public logCheckpoint(
    runId: string, 
    outcome: OutcomeMetrics, 
    signalSnapshot?: InterpreterResult
  ): ExperimentCheckpoint {
    const run = this.runs.get(runId);
    if (!run) throw new Error(`Run with ID ${runId} not found.`);
    if (run.status !== 'active') throw new Error(`Cannot log checkpoint to a ${run.status} run.`);

    const checkpoint: ExperimentCheckpoint = {
      id: generateId(),
      timestamp: Date.now(),
      outcome,
      signalSnapshot
    };

    run.checkpoints.push(checkpoint);
    return checkpoint;
  }

  /**
   * Completes an experiment run.
   */
  public completeRun(runId: string, finalSignals?: InterpreterResult): ExperimentRun {
    const run = this.runs.get(runId);
    if (!run) throw new Error(`Run with ID ${runId} not found.`);

    run.status = 'completed';
    run.endTime = Date.now();
    run.finalSignals = finalSignals;

    return run;
  }

  /**
   * Retrieves the timeline history for a specific run.
   */
  public getRunTimeline(runId: string): ExperimentCheckpoint[] {
    const run = this.runs.get(runId);
    if (!run) throw new Error(`Run with ID ${runId} not found.`);
    return [...run.checkpoints].sort((a, b) => a.timestamp - b.timestamp);
  }

  /**
   * Gets all runs for a specific user.
   */
  public getUserHistory(userId: string): ExperimentRun[] {
    return Array.from(this.runs.values())
      .filter(run => run.userId === userId)
      .sort((a, b) => b.startTime - a.startTime);
  }

  /**
   * Internal method to get all runs (simulating a database for intelligence aggregation).
   */
  public getAllRuns(): ExperimentRun[] {
    return Array.from(this.runs.values());
  }
}

export const experimentSystem = new ExperimentSystem();
