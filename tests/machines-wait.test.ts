import { Machines } from '../src/resources/machines/machines';
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

describe('Machines wait helpers', () => {
  test('waitUntilRunning resolves when phase becomes running', async () => {
    const phases: LifecycleStatus['phase'][] = ['accepted', 'starting', 'running'];
    let i = 0;

    const machines = {
      retrieve: jest.fn(async () => makeMachine(phases[Math.min(i++, phases.length - 1)])),
      waitUntil: Machines.prototype.waitUntil,
      waitUntilRunning: Machines.prototype.waitUntilRunning,
    } as unknown as Machines;

    // Bind methods so `this` works
    const waitUntilRunning = machines.waitUntilRunning.bind(machines);

    const result = await waitUntilRunning('dm-test', {
      pollIntervalMs: 1,
      timeoutMs: 5_000,
    });

    expect(result.status.phase).toBe('running');
    expect(machines.retrieve).toHaveBeenCalled();
  });

  test('waitUntil throws on terminal failed phase', async () => {
    const machines = {
      retrieve: jest.fn(async () => makeMachine('failed', {
        status: {
          phase: 'failed',
          reason: 'capacity',
          retryable: false,
          revision: '1',
          last_progress_at: new Date().toISOString(),
          last_transition_at: new Date().toISOString(),
          last_error: 'no capacity',
        },
      })),
      waitUntil: Machines.prototype.waitUntil,
    } as unknown as Machines;

    const waitUntil = machines.waitUntil.bind(machines);

    await expect(
      waitUntil('dm-test', (m) => m.status.phase === 'running', {
        pollIntervalMs: 1,
        timeoutMs: 2_000,
      }),
    ).rejects.toThrow(/terminal phase 'failed'/);
  });

  test('waitUntil respects timeout', async () => {
    const machines = {
      retrieve: jest.fn(async () => makeMachine('starting')),
      waitUntil: Machines.prototype.waitUntil,
    } as unknown as Machines;

    const waitUntil = machines.waitUntil.bind(machines);

    await expect(
      waitUntil('dm-test', (m) => m.status.phase === 'running', {
        pollIntervalMs: 5,
        timeoutMs: 30,
      }),
    ).rejects.toThrow(/Timed out/);
  });
});
