import { InterpreterResult } from './signals';
import { CompiledStackProtocol } from './stacks';

/**
 * Lifecycle states for an experiment run.
 */
export type ExperimentStatus = 'initializing' | 'active' | 'pausing' | 'completed' | 'terminated';

/**
 * Outcome metrics for a specific checkpoint.
 */
export interface OutcomeMetrics {
  subjectiveScore: number; // 1-10
  cognitiveDelta: number;
  physicalDelta: number;
  adverseEvents: string[];
  notes?: string;
}

/**
 * A snapshot of the user's state at a specific point in time.
 */
export interface ExperimentCheckpoint {
  id: string;
  timestamp: number;
  outcome: OutcomeMetrics;
  signalSnapshot?: InterpreterResult;
}

/**
 * Represents a full protocol experiment run.
 */
export interface ExperimentRun {
  id: string;
  userId: string;
  protocolId: string;
  protocolSnapshot: CompiledStackProtocol;
  status: ExperimentStatus;
  startTime: number;
  endTime?: number;
  checkpoints: ExperimentCheckpoint[];
  baselineSignals: InterpreterResult;
  finalSignals?: InterpreterResult;
}

/**
 * Aggregated network-wide insights.
 */
export interface NetworkInsights {
  totalRuns: number;
  activeSubjects: number;
  outcomeConsensus: {
    protocolId: string;
    protocolName: string;
    averageScore: number;
    matchCount: number;
    topStacks: string[];
  }[];
  timeToSignalMetrics: {
    protocolId: string;
    averageDays: number;
  }[];
  reliabilityScore: number;
}
