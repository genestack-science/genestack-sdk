/**
 * @file streamEmitter.ts
 * @description Outbound real-time bio-telemetry socket stream and continuous packet emission logic.
 * 
 */

import { Subject } from 'rxjs';
import { BiometricSample } from './wearableApi';

export class OutboundStreamEmitter {
  private socketStream$ = new Subject<BiometricSample>();
  private activeEmissionsCounter = 0;
  private emissionIntervalTimer: NodeJS.Timeout | null = null;

  /**
   * Subscribes to the outbound stream to receive biometric updates in real-time.
   */
  public getStream(): Subject<BiometricSample> {
    return this.socketStream$;
  }

  /**
   * Connects to a remote endpoint to begin streaming continuous biometric samples.
   */
  public connectEndpoint(endpointUrl: string): void {
    if (!endpointUrl || !endpointUrl.startsWith('ws')) {
      throw new Error(`Connection Failure: Endpoint "${endpointUrl}" must be a valid WebSocket URI.`);
    }

    console.log(`[STREAMING] Established connection to outbound telemetry endpoint: ${endpointUrl}`);
  }

  /**
   * Emits a new biometric packet into the stream.
   */
  public emitPacket(sample: BiometricSample): void {
    if (!sample || !sample.type) {
      return;
    }

    this.activeEmissionsCounter++;
    this.socketStream$.next(sample);
  }

  /**
   * Shuts down the outbound socket stream safely.
   */
  public disconnect(): void {
    if (this.emissionIntervalTimer) {
      clearInterval(this.emissionIntervalTimer);
      this.emissionIntervalTimer = null;
    }
    
    this.socketStream$.complete();
    console.log('[STREAMING] Stream emitter safely disconnected.');
