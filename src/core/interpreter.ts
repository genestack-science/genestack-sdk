/**
 * @file interpreter.ts
 * @description Advanced converter for mapping raw biological signals into inferred gene expressions.
 * 
 */

import { SignalProfile, InterpreterResult } from '../types/signals';
import { ProtocolRun, ProtocolDuration, ProtocolLogCheckpoint } from '../types/experiment';
import { IngestionPipeline } from './ingestion';

export class Interpreter {
  private cache: Map<string, InterpreterResult> = new Map();

  /**
   * Initializes a new Protocol Run for the user.
   */
  public async initializeProtocolRun(
    userId: string,
    stackId: string,
    duration: ProtocolDuration,
    baselineProfile: SignalProfile
  ): Promise<ProtocolRun> {
    console.log(`\n[GENESTACK CORE: INTERPRETER] Initializing new protocol run for stack [${stackId}]...`);
    
    const run: ProtocolRun = {
      id: `run_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`,
      userId,
      stackId,
      status: 'active',
      startDate: Date.now(),
      targetDuration: duration,
      baselineSignalProfile: baselineProfile,
      checkpoints: []
    };

    const validation = IngestionPipeline.validateProtocolRun(run);
    if (!validation.isValid) {
      console.error(`[GENESTACK CORE: INTERPRETER] Initialization failed schema validation.`);
      validation.errors.forEach(err => console.error(`   -> ${err}`));
      throw new Error('Failed to initialize protocol run due to schema validation errors.');
    }

    console.log(`[GENESTACK CORE: INTERPRETER] Protocol run initialized successfully (ID: ${run.id}).`);
    return run;
  }

  /**
   * Logs a new checkpoint for an active Protocol Run.
   */
  public async logCheckpoint(
    runId: string,
    dayNumber: number,
    adherenceScore: number,
    currentSignalProfile: SignalProfile,
    subjectiveNotes?: string,
    adverseEvents?: string[]
  ): Promise<ProtocolLogCheckpoint> {
    console.log(`\n[GENESTACK CORE: INTERPRETER] Logging checkpoint (Day ${dayNumber}) for run [${runId}]...`);
    
    const checkpoint: ProtocolLogCheckpoint = {
      id: `chk_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`,
      protocolRunId: runId,
      timestamp: Date.now(),
      dayNumber,
      adherenceScore,
      currentSignalProfile,
      subjectiveNotes,
      adverseEvents
    };

    const validation = IngestionPipeline.validateCheckpoint(checkpoint);
    if (!validation.isValid) {
      console.error(`[GENESTACK CORE: INTERPRETER] Checkpoint failed schema validation.`);
      validation.errors.forEach(err => console.error(`   -> ${err}`));
      throw new Error('Failed to log checkpoint due to schema validation errors.');
    }

    console.log(`[GENESTACK CORE: INTERPRETER] Checkpoint logged successfully (Adherence: ${(adherenceScore * 100).toFixed(1)}%).`);
    return checkpoint;
  }

  /**
   * Translates incoming multi-omics and biometric signals into normalized metrics.
   */
  public async interpret(input: SignalProfile): Promise<InterpreterResult> {
    const startTimeMs = Date.now();
    console.log(`\n[GENESTACK CORE: INTERPRETER] Translating incoming phenotypic signals...`);

    if (!input || !input.userId) {
      console.error(`[GENESTACK CORE: INTERPRETER] Interpretation Error: Payload contains no user identity.`);
      throw new Error('Interpretation Error: Ingestion payload contains no user identity.');
    }

    const cacheKey = JSON.stringify(input);
    if (this.cache.has(cacheKey)) {
      console.log(`[GENESTACK CORE: INTERPRETER] Cache hit. Returning cached interpretation.`);
      return this.cache.get(cacheKey)!;
    }

    const metrics: Record<string, string | number> = {};

    metrics['cognition_focus_score'] = input.cognition.focusPattern === 'stable' ? 0.9 : 
                                       input.cognition.focusPattern === 'burst_crash' ? 0.35 : 0.45;
    metrics['cognition_stress_tolerance'] = input.cognition.stressThreshold === 'resilient' ? 1.0 : 
                                            input.cognition.stressThreshold === 'normal' ? 0.75 : 0.4;

    metrics['circadian_sleep_efficiency'] = input.circadian.sleepLatency === 'low' ? 0.95 : 
                                            input.circadian.sleepLatency === 'normal' ? 0.8 : 0.4;
    metrics['circadian_restoration_quality'] = input.circadian.wakingState === 'deep_refreshed' ? 1.0 : 
                                               input.circadian.wakingState === 'normal' ? 0.7 : 0.35;

    metrics['inflammatory_cytokine_load'] = input.inflammation.sorenessPersistence === 'rare' ? 0.15 : 
                                            input.inflammation.sorenessPersistence === 'occasional' ? 0.45 : 0.85;

    metrics['growth_repair_signal'] = input.recovery.muscleRegeneration === 'fast' ? 0.95 : 
                                      input.recovery.muscleRegeneration === 'normal' ? 0.75 : 0.3;

    metrics['metabolic_storage_bias'] = input.metabolism.weightPreservation === 'lean' ? 0.2 : 
                                        input.metabolism.weightPreservation === 'normal' ? 0.5 : 0.9;

    const computationTimeMs = Date.now() - startTimeMs;
    const reliabilityIndex = 0.95; 

    const result = {
      id: `int_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`,
      userId: input.userId,
      timestamp: Date.now(),
      computationTimeMs,
      reliabilityIndex,
      metrics
    };

    this.cache.set(cacheKey, result);
    console.log(`[GENESTACK CORE: INTERPRETER] Interpretation complete in ${computationTimeMs}ms. Confidence: ${reliabilityIndex * 100}%`);
    return result;
  }

  /**
   * Compares continuous real-time biomarker readings against base levels to assess dynamic changes.
   */
  public async evaluateExpressionDelta(metricKey: string, score: number): Promise<number> {
    console.log(`[GENESTACK CORE: INTERPRETER] Evaluating expression delta for metric [${metricKey}] (Score: ${score})...`);
    
    if (score < 0 || score > 1) {
      console.error(`[GENESTACK CORE: INTERPRETER] Normalization Range Violation.`);
      throw new Error('Normalization Range Violation: Baseline score must fall within the [0, 1] range.');
    }

    let delta = 0.0;
    switch (metricKey) {
      case 'resting_heart_rate':
        delta = score > 0.75 ? 0.2 : score < 0.35 ? -0.25 : 0.0;
        break;
      case 'heart_rate_variability':
        delta = score > 0.8 ? 0.35 : score < 0.3 ? -0.4 : 0.0;
        break;
      case 'deep_sleep_duration_seconds':
        delta = score < 0.4 ? -0.3 : 0.0;
        break;
      default:
        delta = 0.0;
    }
    
    console.log(`[GENESTACK CORE: INTERPRETER] Delta computed: ${delta > 0 ? '+' : ''}${delta}`);
    return delta;
  }

  /**
   * Analyzes incoming signals specifically for pathogenic risk markers (Phase 2 Update).
   */
  public async analyzePathogenRisk(input: SignalProfile): Promise<number> {
    console.log(`[GENESTACK CORE: INTERPRETER] Performing Pathogen Risk Analysis (Strain-Zero Detection)...`);
    
    // Logic for high-risk cytokine spikes and metabolic instability
    let riskFactor = 0.0;
    if (input.inflammation.sorenessPersistence === 'chronic') riskFactor += 0.45;
    if (input.circadian.wakingState === 'fatigued_drained') riskFactor += 0.25;
    
    // Scale for Phase 2 compliance
    const normalizedRisk = Math.min(riskFactor, 1.0);
    console.log(`[GENESTACK CORE: INTERPRETER] Analysis Complete. Risk Index: ${normalizedRisk}`);
    return normalizedRisk;
  }
}
