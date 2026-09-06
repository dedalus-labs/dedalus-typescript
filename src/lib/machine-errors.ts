import { DedalusError } from '../core/error';
import type { LifecycleStatus } from '../resources/machines/machines';

export type MachinePhase = LifecycleStatus['phase'];

/** Base class for machine lifecycle wait failures. */
export class MachineWaitError extends DedalusError {
  readonly machineId: string;
  readonly lastPhase: MachinePhase | undefined;

  constructor(message: string, machineId: string, lastPhase?: MachinePhase) {
    super(message);
    this.name = 'MachineWaitError';
    this.machineId = machineId;
    this.lastPhase = lastPhase;
  }
}

/** Timed out while waiting for a machine to reach a desired phase. */
export class MachineWaitTimeoutError extends MachineWaitError {
  readonly timeoutMs: number;

  constructor(machineId: string, timeoutMs: number, lastPhase?: MachinePhase) {
    super(
      `Timed out waiting for machine ${machineId} after ${timeoutMs}ms` +
        (lastPhase ? ` (last phase: ${lastPhase})` : ''),
      machineId,
      lastPhase,
    );
    this.name = 'MachineWaitTimeoutError';
    this.timeoutMs = timeoutMs;
  }
}

/** Machine reached a terminal phase (failed / destroyed) while waiting. */
export class MachineTerminalError extends MachineWaitError {
  readonly phase: MachinePhase;
  readonly lastError: string | undefined;

  constructor(machineId: string, phase: MachinePhase, lastError?: string) {
    super(
      `Machine ${machineId} reached terminal phase '${phase}'` +
        (lastError ? `: ${lastError}` : ''),
      machineId,
      phase,
    );
    this.name = 'MachineTerminalError';
    this.phase = phase;
    this.lastError = lastError;
  }
}

/** Wait was cancelled via AbortSignal. */
export class MachineWaitAbortError extends MachineWaitError {
  constructor(machineId: string, lastPhase?: MachinePhase) {
    super(`Wait for machine ${machineId} was aborted`, machineId, lastPhase);
    this.name = 'MachineWaitAbortError';
  }
}

export const TERMINAL_PHASES: ReadonlySet<MachinePhase> = new Set(['failed', 'destroyed']);
