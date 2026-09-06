#!/usr/bin/env -S npm run tsn -T
import Dedalus from 'dedalus';

const client = new Dedalus({
  apiKey: process.env['DEDALUS_API_KEY'],
  // Default logLevel is 'warn'. Retry traces from createWithRetry are info —
  // set logLevel: 'info' if you want them.
});

async function main() {
  // 1. Usually this is enough. The client already retries 429/5xx.
  const viaClient = await client.machines.create(
    { memory_mib: 2048, storage_gib: 10, vcpu: 1 },
    { maxRetries: 5 },
  );
  console.log('created via client maxRetries', viaClient.machine_id);

  // 2. Use createWithRetry when you need a hook or a custom policy.
  const machine = await client.machines.createWithRetry(
    { memory_mib: 2048, storage_gib: 10, vcpu: 1 },
    undefined,
    {
      maxRetries: 5,
      onRetry: ({ attempt, delayMs, reason, error }) => {
        console.info(`retry ${attempt} in ${delayMs}ms (${reason}): ${error.message}`);
      },
    },
  );
  console.log('created via createWithRetry', machine.machine_id);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
