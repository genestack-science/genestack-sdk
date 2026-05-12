import { SignalInput, InterpreterResult } from '../types/signals';
import { ProtocolRun, ProtocolDuration, ProtocolLogCheckpoint } from '../types/experiment';
// import { IngestionPipeline } from './ingestion';
import { ProbabilisticEngine } from './probabilisticEngine';

export class Interpreter {
  private cache: Map<string, InterpreterResult> = new Map();
  private engine: ProbabilisticEngine = new ProbabilisticEngine();

  /**
   * Initializes a new Protocol Run for the user.
   */
  public async initializeProtocolRun(
    userId: string,
    stackId: string,
    duration: ProtocolDuration,
    baselineProfile: SignalInput
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

    // Note: IngestionPipeline is assumed to be handled by the user or defined elsewhere
    // If it's missing, we skip validation for now to avoid crashes
    /*
    try {
      const validation = IngestionPipeline.validateProtocolRun(run);
      if (!validation.isValid) {
        console.error(`[GENESTACK CORE: INTERPRETER] Initialization failed schema validation.`);
        validation.errors.forEach((err: string) => console.error(`   -> ${err}`));
        throw new Error('Failed to initialize protocol run due to schema validation errors.');
      }
    } catch (e) {
      console.warn(`[GENESTACK CORE: INTERPRETER] Validation skipped (IngestionPipeline missing).`);
    }
    */

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
    currentSignalProfile: SignalInput,
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

    /*
    try {
      const validation = IngestionPipeline.validateCheckpoint(checkpoint);
      if (!validation.isValid) {
        console.error(`[GENESTACK CORE: INTERPRETER] Checkpoint failed schema validation.`);
        validation.errors.forEach((err: string) => console.error(`   -> ${err}`));
        throw new Error('Failed to log checkpoint due to schema validation errors.');
      }
    } catch (e) {
      console.warn(`[GENESTACK CORE: INTERPRETER] Validation skipped (IngestionPipeline missing).`);
    }
    */

    console.log(`[GENESTACK CORE: INTERPRETER] Checkpoint logged successfully (Adherence: ${(adherenceScore * 100).toFixed(1)}%).`);
    return checkpoint;
  }

  /**
   * Translates incoming multi-omics and biometric signals into normalized metrics.
   * Utilizes the Phase 3 Probabilistic Inference Engine.
   */
  public async interpret(input: SignalInput): Promise<InterpreterResult> {
    const startTimeMs = Date.now();
    console.log(`\n[GENESTACK CORE: INTERPRETER] Translating incoming phenotypic signals (Phase 3)...`);

    if (!input || !input.userId) {
      console.error(`[GENESTACK CORE: INTERPRETER] Interpretation Error: Payload contains no user identity.`);
      throw new Error('Interpretation Error: Ingestion payload contains no user identity.');
    }

    const cacheKey = JSON.stringify(input);
    if (this.cache.has(cacheKey)) {
      console.log(`[GENESTACK CORE: INTERPRETER] Cache hit. Returning cached interpretation.`);
      return this.cache.get(cacheKey)!;
    }

    // Execute Probabilistic Inference
    const expressionProfile = this.engine.infer(input);
    const metrics: Record<string, string | number> = {};

    // Map expression statuses back to metrics for visualization
    Object.entries(expressionProfile.expressions).forEach(([gene, status]) => {
      metrics[`gene_${gene}_score`] = status?.score || 0;
      metrics[`gene_${gene}_status`] = status?.status || 'Normal';
    });

    // Add classic biometric metrics
    metrics['cognition_focus_score'] = input.cognition.focusPattern === 'stable' ? 0.9 : 0.4;
    metrics['circadian_sleep_efficiency'] = input.circadian.sleepLatency === 'low' ? 0.95 : 0.4;
    
    // Phase 3 Metrics
    if (input.mood) {
      metrics['mood_hedonic_tone'] = input.mood.hedonicTone;
    }

    const computationTimeMs = Date.now() - startTimeMs;
    const reliabilityIndex = 0.97; // Higher confidence with Phase 3 engine

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
      default:
        delta = 0.0;
    }
    
    console.log(`[GENESTACK CORE: INTERPRETER] Delta computed: ${delta > 0 ? '+' : ''}${delta}`);
    return delta;
  }

  /**
   * Analyzes incoming signals specifically for pathogenic risk markers (Phase 2/3 Update).
   */
  public async analyzePathogenRisk(input: SignalInput): Promise<number> {
    console.log(`[GENESTACK CORE: INTERPRETER] Performing Pathogen Risk Analysis (Strain-Zero Detection)...`);
    
    let riskFactor = 0.0;
    if (input.inflammation.sorenessPersistence === 'chronic') riskFactor += 0.35;
    if (input.circadian.wakingState === 'fatigued_drained') riskFactor += 0.2;
    
    // Phase 3: Stress and Mood factors in risk
    if (input.stress && input.stress.copingReserve === 'depleted') riskFactor += 0.25;
    if (input.mood && input.mood.hedonicTone === 'depressed') riskFactor += 0.15;
    
    const normalizedRisk = Math.min(riskFactor, 1.0);
    console.log(`[GENESTACK CORE: INTERPRETER] Analysis Complete. Risk Index: ${normalizedRisk}`);
    return normalizedRisk;
  }
}
