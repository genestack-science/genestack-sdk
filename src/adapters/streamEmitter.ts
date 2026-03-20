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
