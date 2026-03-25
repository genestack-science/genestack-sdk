/**
 * @file 03_wearable_streaming.ts
 * @description Advanced telemetry script for parsing continuous biometric inputs from wearable devices.
 * 
 * Demonstrates:
 * 1. Listening to high-frequency biometric event streams
 * 2. De-noising physiological data on the fly
 * 3. Computing moving-average expression weights
 * 4. Raising system constraint flags for unusual physiological deviations
 * 
 */

import { Subject } from 'rxjs';
import { Interpreter } from '../src/core/interpreter';
import { Cleaner } from '../src/core/cleaner';
import { BiometricsConverter } from '../src/utils/biometrics';
import { WearableTelemetryPacket, BiometricSample } from '../src/adapters/wearableApi';

// Standard simulation configuration parameters
const SIMULATION_DURATION_MS = 12000;
const SAMPLE_EMISSION_RATE_MS = 1500;

class TelemetryStreamingManager {
  private sampleStream$ = new Subject<BiometricSample>();
  private cleaner = new Cleaner();
  private interpreter = new Interpreter();
  private biometricsConverter = new BiometricsConverter();
  private receivedPacketCounter = 0;

  constructor(private userId: string) {}

  public async startStreamSimulation() {
    console.log('================================================================');
    console.log(`📡 TELEMETRY STREAM SIMULATOR INITIALIZED FOR USER: ${this.userId}`);
    console.log('================================================================\n');

    // Subscribe to clean, processed stream inputs
    this.sampleStream$.subscribe({
      next: async (sample: BiometricSample) => {
        this.receivedPacketCounter++;
        console.log(`[PACKET INGESTED #${this.receivedPacketCounter}] Sample Type: ${sample.type} | Raw Value: ${sample.value}`);

        // Phase 1: De-noising the telemetry signal
        const cleanSample = await this.cleaner.cleanSample(sample);
        console.log(`   -> Signal De-noised. Filtered Variance delta: ${(cleanSample.variance - sample.value).toFixed(2)}`);

        // Phase 2: Compute mathematical conversion to biological range
        const normalizedScore = this.biometricsConverter.normalizeBiometricValue(
          cleanSample.type,
          cleanSample.value
        );
        console.log(`   -> Normalized Biomarker Baseline Score: ${(normalizedScore * 100).toFixed(1)}%`);

        // Phase 3: Evaluate signal impact via the functional expression layer
        const expressionWeight = await this.interpreter.evaluateExpressionDelta(
          cleanSample.type,
          normalizedScore
        );

        if (expressionWeight !== 0) {
          console.log(`   💥 Alert: Signal shift alters Gene Expression. Weight modifier applied: ${expressionWeight.toFixed(2)}`);
        } else {
          console.log('   ✅ Gene Expression stable. No alterations required.');
        }

        console.log('----------------------------------------------------------------');
      },
      error: (err) => {
        console.error('Fatal telemetry ingestion pipeline exception encountered:', err);
      },
      complete: () => {
        console.log('\n================================================================');
        console.log('🎉 TELEMETRY STREAM COMPLETED WITHOUT SYSTEM ERRORS');
        console.log('================================================================');
        console.log(`Total sample telemetry metrics analyzed: ${this.receivedPacketCounter}`);
        console.log('================================================================\n');
      }
