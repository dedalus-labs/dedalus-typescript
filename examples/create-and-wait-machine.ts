/**
 * Create a Dedalus Machine with smart retries and wait until it is running.
 *
 * Usage:
 *   DEDALUS_API_KEY=... npx tsx examples/create-and-wait-machine.ts
 */
import Dedalus from 'dedalus';

const client = new Dedalus({ apiKey: process.env.DEDALUS_API_KEY });

async function main() {
  console.log('Creating machine and waiting until running...');

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
        onStatus: (m) => {
          console.log(`  phase=${m.status.phase} reason=${m.status.reason}`);
        },
      },
    },
  );

  console.log('Ready:', machine.machine_id, machine.status.phase);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
