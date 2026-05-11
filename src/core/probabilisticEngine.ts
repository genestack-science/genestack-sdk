import { SignalInput, ExpressionProfile, ExpressionStatus } from '../types/signals';

export class ProbabilisticEngine {
  /**
   * Performs weighted probabilistic inference to map phenotypic signals to gene expression states.
   * This is the core of the Phase 3 Intelligence Expansion.
   */
  public infer(input: SignalInput): ExpressionProfile {
    const expressions: Record<string, ExpressionStatus> = {};

    // 1. Dopaminergic Axis (COMT, DRD2)
    expressions['comt'] = this.calculateStatus(
      (input.cognition.focusPattern === 'stable' ? 0.9 : 0.4) * 0.7 +
      (input.cognition.stressThreshold === 'resilient' ? 0.8 : 0.3) * 0.3
    );

    // 2. Circadian Axis (PER3, CLOCK)
    expressions['per3'] = this.calculateStatus(
      (input.circadian.sleepLatency === 'low' ? 0.9 : 0.4) * 0.6 +
      (input.circadian.wakingState === 'deep_refreshed' ? 0.8 : 0.3) * 0.4
    );
    expressions['clock'] = this.calculateStatus(
      (input.circadian.nocturnalArousal === 'low' ? 0.85 : 0.35)
    );

    // 3. Inflammatory Axis (TNF, IL6)
    expressions['tnf'] = this.calculateStatus(
      (input.inflammation.sorenessPersistence === 'rare' ? 0.2 : 0.8) * 0.5 +
      (input.inflammation.chronicFatigue === 'rare' ? 0.2 : 0.8) * 0.5,
      true // Inverse: high signal = bad (downregulated/upregulated inflammatory marker)
    );

    // 4. Somatic Repair (IGF1)
    expressions['igf1'] = this.calculateStatus(
      (input.recovery.muscleRegeneration === 'fast' ? 0.9 : 0.3) * 0.7 +
      (input.recovery.forcePreservation === 'enhanced' ? 0.8 : 0.4) * 0.3
    );

    // 5. Metabolic Axis (FTO, PPARG)
    expressions['fto'] = this.calculateStatus(
      (input.metabolism.weightPreservation === 'lean' ? 0.2 : 0.8),
      true
    );
    expressions['pparg'] = this.calculateStatus(
      (input.metabolism.caloricUtilization === 'efficient' ? 0.9 : 0.4)
    );

    // 6. HPA Axis (Phase 3: NR3C1, FKBP5)
    if (input.stress) {
      expressions['nr3c1'] = this.calculateStatus(
        (input.stress.perceivedControl === 'high' ? 0.9 : 0.3) * 0.6 +
        (input.stress.copingReserve === 'abundant' ? 0.8 : 0.2) * 0.4
      );
      expressions['fkbp5'] = this.calculateStatus(
        (input.stress.physioHyperarousal === 'frequent' ? 0.9 : 0.2),
        true
      );
    }

    // 7. Oxidative Stress (Phase 3: SOD1, SOD2)
    expressions['sod1'] = this.calculateStatus(
      (input.inflammation.localizedStiffness === 'none' ? 0.9 : 0.3)
    );
    expressions['sod2'] = this.calculateStatus(
      (input.recovery.jointSoreness === 'none' ? 0.85 : 0.25)
    );

    // 8. Methylation Cycle (Phase 3: MTHFR, DNMT1)
    if (input.methylation) {
      expressions['mthfr'] = this.calculateStatus(
        (input.methylation.samToSahRatio > 4 ? 0.9 : 0.4)
      );
      expressions['dnmt1'] = this.calculateStatus(
        (input.methylation.homocysteineLevel < 10 ? 0.8 : 0.3)
      );
    }

    return {
      id: `exp_${Date.now().toString(36)}`,
      userId: input.userId,
      timestamp: input.timestamp,
      expressions
    };
  }

  private calculateStatus(score: number, inverse: boolean = false): ExpressionStatus {
    const finalScore = inverse ? 1 - score : score;
    let status: ExpressionStatus['status'] = 'Normal';

    if (finalScore > 0.75) status = 'Upregulated';
    else if (finalScore > 0.4) status = 'Normal';
    else if (finalScore > 0.2) status = 'Compensating';
    else status = 'Downregulated';

    return { status, score: parseFloat(finalScore.toFixed(2)) };
  }

  /**
   * Synthesizes time-decayed Bayesian updates from multi-omic streams.
   */
  public inferTimeDecay(profiles: ExpressionProfile[], _lambda: number = 0.1): ExpressionStatus {
    if (profiles.length === 0) return { status: 'Normal', score: 0.5 };
    
    // Sort by timestamp descending
    const sorted = [...profiles].sort((a, b) => b.timestamp - a.timestamp);
    const mostRecent = sorted[0];
    
    // Placeholder for actual Bayesian decay logic
    return mostRecent.expressions['comt'] || { status: 'Normal', score: 0.5 };
  }
}
