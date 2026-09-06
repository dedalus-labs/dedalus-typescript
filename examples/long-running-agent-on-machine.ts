/**
 * Cookbook: long-running agent loop on a Dedalus Machine
 *
 * Pattern:
 *  1. createAndWait — durable Linux VM, no cold starts after wake
 *  2. bootstrap workspace on the machine filesystem (persistent)
 *  3. iterative execute → observe → decide loop
 *  4. checkpoint agent state to /workspace (survives sleep)
 *  5. optional sleep / destroy for cost control
 *
 * This is client-side orchestration. It does NOT require server-side
 * agent checkpoint APIs — the Machine filesystem is the durable store.
 *
 * Usage:
 *   DEDALUS_API_KEY=... npx tsx examples/long-running-agent-on-machine.ts
 *
 * Optional:
 *   GOAL="summarize the repo" MAX_STEPS=8
 */
import Dedalus, {
  MachineTerminalError,
  MachineWaitTimeoutError,
} from 'dedalus';

const client = new Dedalus({ apiKey: process.env.DEDALUS_API_KEY });

const GOAL = process.env.GOAL ?? 'List files in /workspace and write a short STATUS.md';
const MAX_STEPS = Number(process.env.MAX_STEPS ?? 6);

async function runOnMachine(machineId: string, command: string): Promise<string> {
  // Prefer executions API when present in the SDK version you have installed.
  const executions = (client.machines as any).executions;
  if (!executions?.create) {
    throw new Error(
      'machines.executions is not available in this SDK build. Upgrade dedalus or use terminals/SSH.',
    );
  }

  const execution = await executions.create({
    machine_id: machineId,
    command,
  });

  // Best-effort: some SDK versions return output inline; others need a follow-up.
  if (typeof execution?.stdout === 'string') return execution.stdout;
  if (typeof execution?.output === 'string') return execution.output;

  if (executions.output) {
    const out = await executions.output({ machine_id: machineId, execution_id: execution.execution_id });
    return typeof out === 'string' ? out : JSON.stringify(out);
  }

  return JSON.stringify(execution);
}

async function bootstrap(machineId: string) {
  const script = [
    'set -euo pipefail',
    'mkdir -p /workspace/agent',
    'cat > /workspace/agent/GOAL.txt <<EOF',
    GOAL,
    'EOF',
    'if [ ! -f /workspace/agent/STATE.json ]; then',
    '  echo "{\"step\":0,\"notes\":[]}" > /workspace/agent/STATE.json',
    'fi',
    'echo bootstrapped',
  ].join('\n');

  return runOnMachine(machineId, `bash -lc ${JSON.stringify(script)}`);
}

async function agentStep(machineId: string, step: number): Promise<string> {
  // A deliberately simple "agent": inspect workspace, append a note, update STATE.
  // Swap this body for LLM tool-calls against the same machine.
  const script = [
    'set -euo pipefail',
    'cd /workspace',
    'echo "=== step ' + step + ' ==="',
    'ls -la',
    'python3 - <<\'PY\'',
    'import json, pathlib, datetime',
    'p = pathlib.Path("/workspace/agent/STATE.json")',
    'state = json.loads(p.read_text()) if p.exists() else {"step": 0, "notes": []}',
    'state["step"] = ' + step,
    'state["notes"].append({"ts": datetime.datetime.utcnow().isoformat() + "Z", "step": ' + step + '})',
    'p.write_text(json.dumps(state, indent=2))',
    'pathlib.Path("/workspace/STATUS.md").write_text(
    f"# Status\\n\\nStep {state[\"step\"]}\\n\\nNotes: {len(state[\"notes\"])}\\n"
    )',
    'print(json.dumps(state))',
    'PY',
  ].join('\n');

  return runOnMachine(machineId, `bash -lc ${JSON.stringify(script)}`);
}

async function main() {
  console.log('Goal:', GOAL);
  console.log('Creating machine...');

  let machine;
  try {
    machine = await client.machines.createAndWait(
      { memory_mib: 2048, storage_gib: 10, vcpu: 1, autosleep: '30m' },
      {
        wait: {
          timeoutMs: 180_000,
          onStatus: (m) => console.log(`  phase=${m.status.phase}`),
        },
      },
    );
  } catch (err) {
    if (err instanceof MachineWaitTimeoutError || err instanceof MachineTerminalError) {
      console.error(err.message);
      process.exit(1);
    }
    throw err;
  }

  const machineId = machine.machine_id;
  console.log('Ready:', machineId);

  try {
    console.log('Bootstrap...');
    console.log(await bootstrap(machineId));

    for (let step = 1; step <= MAX_STEPS; step++) {
      console.log(`\n--- agent step ${step}/${MAX_STEPS} ---`);
      const out = await agentStep(machineId, step);
      console.log(out);

      // Example stop condition: STATUS.md mentions completion
      if (out.includes('"step": ' + MAX_STEPS) || step === MAX_STEPS) {
        console.log('Stopping: max steps reached (replace with your own success predicate).');
        break;
      }
    }

    console.log('\nCheckpoint lives on the machine filesystem at /workspace/agent/STATE.json');
    console.log('You can sleep the machine and resume later — disk persists.');

    // Cost control demo (comment out if you want to keep it warm):
    // await client.machines.sleep({ machine_id: machineId });
    // console.log('Machine sleeping.');
  } finally {
    if (process.env.DESTROY_WHEN_DONE === '1') {
      console.log('Destroying machine...');
      await client.machines.delete({ machine_id: machineId });
    } else {
      console.log(`Leaving machine ${machineId} running. Set DESTROY_WHEN_DONE=1 to auto-destroy.`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
