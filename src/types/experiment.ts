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

/**
 * Phase 3 Protocol Types
 */
export type ProtocolDuration = '7_days' | '14_days' | '30_days' | '90_days';

export interface ProtocolLogCheckpoint {
  id: string;
  protocolRunId: string;
  timestamp: number;
  dayNumber: number;
  adherenceScore: number;
  currentSignalProfile: any; // SignalInput
  subjectiveNotes?: string;
  adverseEvents?: string[];
}

export interface ProtocolRun {
  id: string;
  userId: string;
  stackId: string;
  status: 'active' | 'completed' | 'paused' | 'aborted';
  startDate: number;
  endDate?: number;
  targetDuration: ProtocolDuration;
  baselineSignalProfile: any; // SignalInput
  checkpoints: ProtocolLogCheckpoint[];
}
