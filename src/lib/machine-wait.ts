/**
 * Non-generated machine lifecycle helpers.
 *
 * Prefer the SSE `watch` stream; fall back to `retrieve` polling when the
 * stream is unavailable or fails early. Lives outside Stainless-generated
 * resource files so regenerations do not wipe the logic.
 */
import { sleep } from '../internal/utils/sleep';
import type { Machine, LifecycleStatus } from '../resources/machines/machines';
import type { Stream } from '../core/streaming';
import {
  MachineTerminalError,
  MachineWaitAbortError,
  MachineWaitTimeoutError,
  TERMINAL_PHASES,
  type MachinePhase,
} from './machine-errors';

export type { MachinePhase } from './machine-errors';
export {
  MachineWaitError,
  MachineWaitTimeoutError,
  MachineTerminalError,
  MachineWaitAbortError,
} from './machine-errors';

export interface WaitOptions {
  /** Maximum time to wait before rejecting. @default 120_000 */
  timeoutMs?: number;
  /** Poll interval when using retrieve fallback. @default 1_500 */
  pollIntervalMs?: number;
  /** Prefer SSE watch stream (default true). Set false to force polling. */
  preferWatch?: boolean;
  /** Abort the wait early. */
  signal?: AbortSignal;
  /** Called on every observed machine state (including the first). */
  onStatus?: (machine: Machine) => void;
}

/** Minimal surface required from the Machines resource. */
export interface MachineWaitClient {
  retrieve(params: { machine_id: string }): Promise<Machine>;
  watch(params: { machine_id: string }): Promise<Stream<Machine>>;
}

function throwIfAborted(signal: AbortSignal | undefined, machineId: string, lastPhase?: MachinePhase): void {
  if (signal?.aborted) {
    throw new MachineWaitAbortError(machineId, lastPhase);
  }
}

function checkTerminal(machine: Machine): void {
  const phase = machine.status.phase;
  if (TERMINAL_PHASES.has(phase)) {
    throw new MachineTerminalError(machine.machine_id, phase, machine.status.last_error);
  }
}

async function waitViaWatch(
  client: MachineWaitClient,
  machineId: string,
  predicate: (machine: Machine) => boolean,
  options: Required<Pick<WaitOptions, 'timeoutMs'>> & WaitOptions,
): Promise<Machine> {
  const { timeoutMs, signal, onStatus } = options;
  const started = Date.now();

  throwIfAborted(signal, machineId);

  // Snapshot first — may already be ready before the stream connects.
  let machine = await client.retrieve({ machine_id: machineId });
  onStatus?.(machine);
  if (predicate(machine)) return machine;
  checkTerminal(machine);

  const stream = await client.watch({ machine_id: machineId });

  try {
    for await (const event of stream) {
      throwIfAborted(signal, machineId, machine.status.phase);

      if (Date.now() - started >= timeoutMs) {
        throw new MachineWaitTimeoutError(machineId, timeoutMs, machine.status.phase);
      }

      machine = event;
      onStatus?.(machine);
      if (predicate(machine)) return machine;
      checkTerminal(machine);
    }
  } finally {
    // Best-effort close if the stream supports it
    try {
      await (stream as { controller?: { abort?: () => void } }).controller?.abort?.();
    } catch {
      // ignore
    }
  }

  // Stream closed without matching — final retrieve as safety net
  machine = await client.retrieve({ machine_id: machineId });
  onStatus?.(machine);
  if (predicate(machine)) return machine;
  checkTerminal(machine);
  throw new MachineWaitTimeoutError(machineId, timeoutMs, machine.status.phase);
}

async function waitViaPoll(
  client: MachineWaitClient,
  machineId: string,
  predicate: (machine: Machine) => boolean,
  options: Required<Pick<WaitOptions, 'timeoutMs' | 'pollIntervalMs'>> & WaitOptions,
): Promise<Machine> {
  const { timeoutMs, pollIntervalMs, signal, onStatus } = options;
  const started = Date.now();

  throwIfAborted(signal, machineId);
  let machine = await client.retrieve({ machine_id: machineId });
  onStatus?.(machine);
  if (predicate(machine)) return machine;
  checkTerminal(machine);

  while (true) {
    throwIfAborted(signal, machineId, machine.status.phase);

    const elapsed = Date.now() - started;
    if (elapsed >= timeoutMs) {
      throw new MachineWaitTimeoutError(machineId, timeoutMs, machine.status.phase);
    }

    const remaining = timeoutMs - elapsed;
    await sleep(Math.min(pollIntervalMs, remaining));

    throwIfAborted(signal, machineId, machine.status.phase);
    machine = await client.retrieve({ machine_id: machineId });
    onStatus?.(machine);
    if (predicate(machine)) return machine;
    checkTerminal(machine);
  }
}

/**
 * Wait until `predicate` returns true.
 * Uses `watch` SSE by default; falls back to polling if the stream fails.
 */
export async function waitUntil(
  client: MachineWaitClient,
  machineId: string,
  predicate: (machine: Machine) => boolean,
  options: WaitOptions = {},
): Promise<Machine> {
  const {
    timeoutMs = 120_000,
    pollIntervalMs = 1_500,
    preferWatch = true,
    signal,
    onStatus,
  } = options;

  const resolved = { timeoutMs, pollIntervalMs, preferWatch, signal, onStatus };

  if (preferWatch) {
    try {
      return await waitViaWatch(client, machineId, predicate, resolved);
    } catch (err) {
      // Don't fall back for intentional wait failures
      if (
        err instanceof MachineWaitTimeoutError ||
        err instanceof MachineTerminalError ||
        err instanceof MachineWaitAbortError
      ) {
        throw err;
      }
      // Stream unavailable / network — poll instead
    }
  }

  return waitViaPoll(client, machineId, predicate, resolved);
}

export async function waitUntilRunning(
  client: MachineWaitClient,
  machineId: string,
  options?: WaitOptions,
): Promise<Machine> {
  return waitUntil(client, machineId, (m) => m.status.phase === 'running', options);
}

export async function waitUntilPhase(
  client: MachineWaitClient,
  machineId: string,
  phase: MachinePhase | MachinePhase[],
  options?: WaitOptions,
): Promise<Machine> {
  const phases = Array.isArray(phase) ? phase : [phase];
  return waitUntil(client, machineId, (m) => phases.includes(m.status.phase), options);
}

export interface CreateAndWaitOptions extends WaitOptions {
  /** Forwarded to the underlying create call's request options layer by the caller. */
}

/**
 * Create via `createFn`, then wait until running.
 * Kept generic so both resource methods and tests can supply create.
 */
export async function createAndWait(
  client: MachineWaitClient,
  createFn: () => Promise<Machine>,
  options?: WaitOptions,
): Promise<Machine> {
  const machine = await createFn();
  return waitUntilRunning(client, machine.machine_id, options);
}
