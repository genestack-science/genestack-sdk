import { 
  experimentSystem, 
  networkIntelligence, 
  CompiledStackProtocol, 
  InterpreterResult 
} from '../src';

// Mock data for the demonstration
const mockProtocol: CompiledStackProtocol = {
  id: 'protocol-001',
  userId: 'user-123',
  timestamp: Date.now(),
  compounds: [
    { name: 'Caffeine', dosage: '200mg', frequency: 'daily', id: 'c1', class: 'stimulant', pathway: 'adenosine', mappedExpressions: [], details: '', contraindications: [], safeBoundsMg: [0, 400], clinicalConfidence: 0.9 }
  ],
  coverageScore: 0.8,
  redundancyScore: 'low',
  securityChecks: { isValid: true, warnings: [], adjustments: [] },
  suggestedPhasedSchedule: []
};

const mockBaseline: InterpreterResult = {
  id: 'baseline-001',
  userId: 'user-123',
  timestamp: Date.now(),
  computationTimeMs: 120,
  reliabilityIndex: 0.95,
  metrics: { focus: 6, energy: 5 }
};

async function runDemo() {
  console.log('--- Phase 02: Experiment System Launch ---');

  // 1. Initialize an experiment run
  const run = experimentSystem.initializeRun('user-123', mockProtocol, mockBaseline);
  console.log(`Experiment initialized: ${run.id}`);

  // 2. Log a checkpoint
  console.log('Logging outcome checkpoint...');
  experimentSystem.logCheckpoint(run.id, {
    subjectiveScore: 8,
    cognitiveDelta: 1.2,
    physicalDelta: 0.5,
    adverseEvents: [],
    notes: 'Feeling increased focus after 30 mins.'
  });

  // 3. Complete the run
  console.log('Completing experiment run...');
  const completedRun = experimentSystem.completeRun(run.id, {
    ...mockBaseline,
    metrics: { focus: 8, energy: 7 }
  });
  console.log(`Run ${completedRun.id} status: ${completedRun.status}`);

  // 4. Retrieve History
  const history = experimentSystem.getUserHistory('user-123');
  console.log(`User has ${history.length} runs in history.`);

  // 5. Network Insights
  console.log('Generating Network Insights...');
  const allRuns = experimentSystem.getAllRuns();
  const insights = networkIntelligence.generateInsights(allRuns);

  console.log('--- Network Genesis Report ---');
  console.log(`Total Network Runs: ${insights.totalRuns}`);
  console.log(`Outcome Consensus:`, insights.outcomeConsensus);
  console.log(`Reliability Index: ${insights.reliabilityScore.toFixed(2)}`);
}

runDemo().catch(console.error);
