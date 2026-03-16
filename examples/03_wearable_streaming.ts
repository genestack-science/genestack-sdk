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

