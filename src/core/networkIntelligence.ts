import { ExperimentRun, NetworkInsights } from '../types/experiment';
import { mean } from '../utils/math';

export class NetworkIntelligence {
  /**
   * Aggregates anonymized outcome data into network insights.
   */
  public generateInsights(runs: ExperimentRun[]): NetworkInsights {
    const activeRuns = runs.filter(r => r.status === 'active');
    const completedRuns = runs.filter(r => r.status === 'completed');

    // Group runs by protocol
    const protocols = Array.from(new Set(runs.map(r => r.protocolId)));

    const outcomeConsensus = protocols.map(pId => {
      const pRuns = completedRuns.filter(r => r.protocolId === pId);
      const scores = pRuns.flatMap(r => r.checkpoints.map(c => c.outcome.subjectiveScore));
      
      return {
        protocolId: pId,
        protocolName: pRuns[0]?.protocolSnapshot.compounds.map(c => c.name).join(' + ') || 'Unknown Protocol',
        averageScore: scores.length > 0 ? mean(scores) : 0,
        matchCount: pRuns.length,
        topStacks: [] // Placeholder for stack popularity analysis
      };
    });

    const timeToSignalMetrics = protocols.map(pId => {
      const pRuns = completedRuns.filter(r => r.protocolId === pId);
      const durations = pRuns.map(r => (r.endTime! - r.startTime) / (1000 * 60 * 60 * 24));

      return {
        protocolId: pId,
        averageDays: durations.length > 0 ? mean(durations) : 0
      };
    });

    return {
      totalRuns: runs.length,
      activeSubjects: activeRuns.length,
      outcomeConsensus,
      timeToSignalMetrics,
      reliabilityScore: this.calculateReliability(runs)
    };
  }

  private calculateReliability(runs: ExperimentRun[]): number {
    if (runs.length === 0) return 1.0;
    const completedRatio = runs.filter(r => r.status === 'completed').length / runs.length;
    const checkpointDensity = mean(runs.map(r => r.checkpoints.length));
    
    // Simple heuristic for reliability
    return Math.min(1.0, (completedRatio * 0.7) + (Math.min(1.0, checkpointDensity / 5) * 0.3));
  }
}

export const networkIntelligence = new NetworkIntelligence();
