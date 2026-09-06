import {
  waitUntil,
  waitUntilRunning,
  waitUntilPhase,
  MachineWaitTimeoutError,
  MachineTerminalError,
  MachineWaitAbortError,
  type MachineWaitClient,
} from '../src/lib/machine-wait';
import type { Machine, LifecycleStatus } from '../src/resources/machines/machines';

function makeMachine(phase: LifecycleStatus['phase'], overrides: Partial<Machine> = {}): Machine {
  return {
    machine_id: 'dm-test',
    memory_mib: 2048,
    storage_gib: 10,
    vcpu: 1,
    autosleep_seconds: 0,
    desired_state: 'running',
    status: {
      phase,
      reason: phase,
      retryable: false,
      revision: '1',
      last_progress_at: new Date().toISOString(),
      last_transition_at: new Date().toISOString(),
    },
    ...overrides,
  };
}

function asyncIter<T>(items: T[]): AsyncIterable<T> {
  return {
    async *[Symbol.asyncIterator]() {
      for (const item of items) {
        yield item;
      }
    },
  };
}

describe('machine wait helpers', () => {
  test('watch path: resolves when stream emits running', async () => {
    const phases: LifecycleStatus['phase'][] = ['accepted', 'starting', 'running'];
    let retrieveCount = 0;

    const client: MachineWaitClient = {
      retrieve: jest.fn(async () => {
        // First snapshot is accepted; stream carries the rest
        return makeMachine(phases[Math.min(retrieveCount++, phases.length - 1)]);
      }),
      watch: jest.fn(async () =>
        asyncIter([makeMachine('starting'), makeMachine('running')]) as any,
      ),
    };

    const result = await waitUntilRunning(client, 'dm-test', {
      timeoutMs: 5_000,
      pollIntervalMs: 1,
    });

    expect(result.status.phase).toBe('running');
    expect(client.watch).toHaveBeenCalled();
  });

  test('falls back to poll when watch throws', async () => {
    const phases: LifecycleStatus['phase'][] = ['accepted', 'starting', 'running'];
    let i = 0;

    const client: MachineWaitClient = {
      retrieve: jest.fn(async () => makeMachine(phases[Math.min(i++, phases.length - 1)])),
      watch: jest.fn(async () => {
        throw new Error('SSE unavailable');
      }),
    };

    const result = await waitUntilRunning(client, 'dm-test', {
      timeoutMs: 5_000,
      pollIntervalMs: 1,
    });

    expect(result.status.phase).toBe('running');
    expect(client.watch).toHaveBeenCalled();
    expect(client.retrieve).toHaveBeenCalled();
  });

  test('preferWatch=false forces polling', async () => {
    const phases: LifecycleStatus['phase'][] = ['starting', 'running'];
    let i = 0;

    const client: MachineWaitClient = {
      retrieve: jest.fn(async () => makeMachine(phases[Math.min(i++, phases.length - 1)])),
      watch: jest.fn(async () => {
        throw new Error('should not be called');
      }),
    };

    const result = await waitUntilRunning(client, 'dm-test', {
      preferWatch: false,
      timeoutMs: 5_000,
      pollIntervalMs: 1,
    });

    expect(result.status.phase).toBe('running');
    expect(client.watch).not.toHaveBeenCalled();
  });

  test('throws MachineTerminalError on failed', async () => {
    const client: MachineWaitClient = {
      retrieve: jest.fn(async () =>
        makeMachine('failed', {
          status: {
            phase: 'failed',
            reason: 'capacity',
            retryable: false,
            revision: '1',
            last_progress_at: new Date().toISOString(),
            last_transition_at: new Date().toISOString(),
            last_error: 'no capacity',
          },
        }),
      ),
      watch: jest.fn(async () => asyncIter([]) as any),
    };

    await expect(
      waitUntil(client, 'dm-test', (m) => m.status.phase === 'running', {
        preferWatch: false,
        timeoutMs: 2_000,
        pollIntervalMs: 1,
      }),
    ).rejects.toBeInstanceOf(MachineTerminalError);
  });

  test('throws MachineWaitTimeoutError', async () => {
    const client: MachineWaitClient = {
      retrieve: jest.fn(async () => makeMachine('starting')),
      watch: jest.fn(async () => asyncIter([]) as any),
    };

    await expect(
      waitUntilRunning(client, 'dm-test', {
        preferWatch: false,
        pollIntervalMs: 5,
        timeoutMs: 30,
      }),
    ).rejects.toBeInstanceOf(MachineWaitTimeoutError);
  });

  test('throws MachineWaitAbortError on signal abort', async () => {
    const controller = new AbortController();
    controller.abort();

    const client: MachineWaitClient = {
      retrieve: jest.fn(async () => makeMachine('starting')),
      watch: jest.fn(async () => asyncIter([]) as any),
    };

    await expect(
      waitUntilRunning(client, 'dm-test', {
        preferWatch: false,
        signal: controller.signal,
        timeoutMs: 5_000,
      }),
    ).rejects.toBeInstanceOf(MachineWaitAbortError);
  });

  test('waitUntilPhase accepts multiple targets', async () => {
    const client: MachineWaitClient = {
      retrieve: jest.fn(async () => makeMachine('sleeping')),
      watch: jest.fn(async () => asyncIter([]) as any),
    };

    const result = await waitUntilPhase(client, 'dm-test', ['running', 'sleeping'], {
      preferWatch: false,
      timeoutMs: 2_000,
    });
    expect(result.status.phase).toBe('sleeping');
  });

  test('onStatus is invoked for each observation', async () => {
    const seen: string[] = [];
    let i = 0;
    const phases: LifecycleStatus['phase'][] = ['accepted', 'running'];

    const client: MachineWaitClient = {
      retrieve: jest.fn(async () => makeMachine(phases[Math.min(i++, phases.length - 1)])),
      watch: jest.fn(async () => {
        throw new Error('force poll');
      }),
    };

    await waitUntilRunning(client, 'dm-test', {
      pollIntervalMs: 1,
      timeoutMs: 5_000,
      onStatus: (m) => seen.push(m.status.phase),
    });

    expect(seen).toEqual(['accepted', 'running']);
  });
});
