/**
 * Create a Dedalus Machine with smart retries and wait until it is running.
 *
 * Uses watch SSE by default (falls back to poll).
 *
 * Usage:
 *   DEDALUS_API_KEY=... npx tsx examples/create-and-wait-machine.ts
 */
import Dedalus, {
  MachineWaitTimeoutError,
  MachineTerminalError,
} from 'dedalus';

const client = new Dedalus({ apiKey: process.env.DEDALUS_API_KEY });

async function main() {
  console.log('Creating machine and waiting until running...');

  try {
    const machine = await client.machines.createAndWait(
      {
        memory_mib: 2048,
        storage_gib: 10,
        vcpu: 1,
      },
      {
        retry: {
          maxRetries: 3,
          onRetry: (e) => {
            console.warn(`retry ${e.attempt}: ${e.error.message} (wait ${e.delayMs}ms)`);
          },
        },
        wait: {
          timeoutMs: 120_000,
          preferWatch: true,
          onStatus: (m) => {
            console.log(`  phase=${m.status.phase} reason=${m.status.reason}`);
          },
        },
      },
    );

    console.log('Ready:', machine.machine_id, machine.status.phase);
  } catch (err) {
    if (err instanceof MachineWaitTimeoutError) {
      console.error('Timed out:', err.message, 'last phase:', err.lastPhase);
      process.exit(1);
    }
    if (err instanceof MachineTerminalError) {
      console.error('Terminal failure:', err.message);
      process.exit(1);
    }
    throw err;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
