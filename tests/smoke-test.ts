// File generated from our OpenAPI spec by Scalar. See README.md for details.

// Smoke test: calls every generated operation once to confirm the SDK can reach each endpoint.
// Run it from this repo with `bun tests/smoke-test.ts`. Each case below calls one SDK method
// exactly the way the SDK exposes it (positional params, request body, pagination, streaming).
//
// Two environment variables tune a run:
//   - SCALAR_SMOKE_FILTER: comma-separated needles; only operations whose name or path contains
//     one of them run, so you can smoke-test a subset without editing this file.
//   - SCALAR_SMOKE_REPORT: a file path; when set, the run writes a JSON report there instead of
//     printing a table. The generator uses this to collect per-operation results.
import { writeFileSync } from 'node:fs';

// The package exports the client class. The client reads auth and the base URL from the
// environment, so it needs no constructor options to point at a server.
import Dedalus from 'dedalus';

// One shared client runs every case.
const client = new Dedalus();

// The result of running one case, collected for the JSON report or the printed table.
type SmokeResult = {
  operation: string;
  method: string;
  path: string;
  label?: string;
  status: 'passed' | 'failed';
  durationMs: number;
  error?: string;
};

// One or two entries per generated operation: the first passes only the arguments the method
// requires, the second also fills every optional parameter and body property. `label` says which
// is which, and is absent when the operation has no optional argument and so has only one case.
// `run` performs the real SDK call; the other fields are metadata used for filtering and
// reporting. This list is generated, so it stays in sync with the SDK surface.
const cases: {
  operation: string;
  method: string;
  path: string;
  label?: string;
  run: () => Promise<unknown>;
}[] = [
  {
    operation: 'retrieve',
    method: 'GET',
    path: '/v1/usage',
    label: 'required params',
    run: async () => {
      const orgUsage = await client.usage.retrieve();
    },
  },

  {
    operation: 'retrieve',
    method: 'GET',
    path: '/v1/usage',
    label: 'all params',
    run: async () => {
      const orgUsage = await client.usage.retrieve({
        period_start: 'periodStart',
      });
    },
  },

  {
    operation: 'machineCompute',
    method: 'GET',
    path: '/v1/usage/machines/compute',
    label: 'required params',
    run: async () => {
      const machineComputeUsage = await client.usage.machineCompute();
    },
  },

  {
    operation: 'machineCompute',
    method: 'GET',
    path: '/v1/usage/machines/compute',
    label: 'all params',
    run: async () => {
      const machineComputeUsage = await client.usage.machineCompute({
        period_start: 'periodStart',
        period_end: 'periodEnd',
        machine_id: 'machineID',
        granularity: 'granularity',
      });
    },
  },

  {
    operation: 'machineStorage',
    method: 'GET',
    path: '/v1/usage/machines/storage',
    label: 'required params',
    run: async () => {
      const machineStorageUsage = await client.usage.machineStorage();
    },
  },

  {
    operation: 'machineStorage',
    method: 'GET',
    path: '/v1/usage/machines/storage',
    label: 'all params',
    run: async () => {
      const machineStorageUsage = await client.usage.machineStorage({
        period_start: 'periodStart',
        period_end: 'periodEnd',
        machine_id: 'machineID',
      });
    },
  },

  {
    operation: 'list',
    method: 'GET',
    path: '/v1/machines',
    run: async () => {
      const page = await client.machines.list();
    },
  },

  {
    operation: 'create',
    method: 'POST',
    path: '/v1/machines',
    label: 'required params',
    run: async () => {
      const machine = await client.machines.create({
        memory_mib: 0,
        storage_gib: 0,
        vcpu: 0,
      });
    },
  },

  {
    operation: 'create',
    method: 'POST',
    path: '/v1/machines',
    label: 'all params',
    run: async () => {
      const machine = await client.machines.create({
        autosleep: '',
        memory_mib: 0,
        storage_gib: 0,
        vcpu: 0,
      });
    },
  },

  {
    operation: 'retrieve',
    method: 'GET',
    path: '/v1/machines/{machine_id}',
    run: async () => {
      const machine = await client.machines.retrieve({
        machine_id: 'machineID',
      });
    },
  },

  {
    operation: 'update',
    method: 'PATCH',
    path: '/v1/machines/{machine_id}',
    label: 'required params',
    run: async () => {
      const machine = await client.machines.update({
        machine_id: 'machineID',
      });
    },
  },

  {
    operation: 'update',
    method: 'PATCH',
    path: '/v1/machines/{machine_id}',
    label: 'all params',
    run: async () => {
      const machine = await client.machines.update({
        machine_id: 'machineID',
        autosleep: '',
        memory_mib: 0,
        storage_gib: 0,
        vcpu: 0,
      });
    },
  },

  {
    operation: 'delete',
    method: 'DELETE',
    path: '/v1/machines/{machine_id}',
    run: async () => {
      const machine = await client.machines.delete({
        machine_id: 'machineID',
      });
    },
  },

  {
    operation: 'watch',
    method: 'GET',
    path: '/v1/machines/{machine_id}/status/stream',
    label: 'required params',
    run: async () => {
      const stream = await client.machines.watch({
        machine_id: 'machineID',
      });

      for await (const machine of stream) {
        console.log(machine);
      }
    },
  },

  {
    operation: 'watch',
    method: 'GET',
    path: '/v1/machines/{machine_id}/status/stream',
    label: 'all params',
    run: async () => {
      const stream = await client.machines.watch({
        machine_id: 'machineID',
        'Last-Event-ID': 'lastEventID',
      });

      for await (const machine of stream) {
        console.log(machine);
      }
    },
  },

  {
    operation: 'sleep',
    method: 'POST',
    path: '/v1/machines/{machine_id}/sleep',
    run: async () => {
      const machine = await client.machines.sleep({
        machine_id: 'machineID',
      });
    },
  },

  {
    operation: 'wake',
    method: 'POST',
    path: '/v1/machines/{machine_id}/wake',
    run: async () => {
      const machine = await client.machines.wake({
        machine_id: 'machineID',
      });
    },
  },

  {
    operation: 'retrieve',
    method: 'GET',
    path: '/v1/machines/{machine_id}/network',
    run: async () => {
      const machineNetwork = await client.machines.network.retrieve({
        machine_id: 'machineID',
      });
    },
  },

  {
    operation: 'list',
    method: 'GET',
    path: '/v1/machines/{machine_id}/artifacts',
    run: async () => {
      const page = await client.machines.artifacts.list({
        machine_id: 'machineID',
      });
    },
  },

  {
    operation: 'retrieve',
    method: 'GET',
    path: '/v1/machines/{machine_id}/artifacts/{artifact_id}',
    run: async () => {
      const artifact = await client.machines.artifacts.retrieve({
        machine_id: 'machineID',
        artifact_id: 'artifactID',
      });
    },
  },

  {
    operation: 'delete',
    method: 'DELETE',
    path: '/v1/machines/{machine_id}/artifacts/{artifact_id}',
    run: async () => {
      const artifact = await client.machines.artifacts.delete({
        machine_id: 'machineID',
        artifact_id: 'artifactID',
      });
    },
  },

  {
    operation: 'list',
    method: 'GET',
    path: '/v1/machines/{machine_id}/ports',
    run: async () => {
      const page = await client.machines.ports.list({
        machine_id: 'machineID',
      });
    },
  },

  {
    operation: 'create',
    method: 'POST',
    path: '/v1/machines/{machine_id}/ports',
    label: 'required params',
    run: async () => {
      const port = await client.machines.ports.create({
        machine_id: 'machineID',
        port: 0,
      });
    },
  },

  {
    operation: 'create',
    method: 'POST',
    path: '/v1/machines/{machine_id}/ports',
    label: 'all params',
    run: async () => {
      const port = await client.machines.ports.create({
        machine_id: 'machineID',
        port: 0,
        protocol: 'http',
      });
    },
  },

  {
    operation: 'retrieve',
    method: 'GET',
    path: '/v1/machines/{machine_id}/ports/{port_id}',
    run: async () => {
      const port = await client.machines.ports.retrieve({
        machine_id: 'machineID',
        port_id: 'portID',
      });
    },
  },

  {
    operation: 'delete',
    method: 'DELETE',
    path: '/v1/machines/{machine_id}/ports/{port_id}',
    run: async () => {
      const port = await client.machines.ports.delete({
        machine_id: 'machineID',
        port_id: 'portID',
      });
    },
  },

  {
    operation: 'list',
    method: 'GET',
    path: '/v1/machines/{machine_id}/ssh',
    run: async () => {
      const page = await client.machines.ssh.list({
        machine_id: 'machineID',
      });
    },
  },

  {
    operation: 'create',
    method: 'POST',
    path: '/v1/machines/{machine_id}/ssh',
    run: async () => {
      const sshSession = await client.machines.ssh.create({
        machine_id: 'machineID',
        public_key: '',
      });
    },
  },

  {
    operation: 'retrieve',
    method: 'GET',
    path: '/v1/machines/{machine_id}/ssh/{session_id}',
    run: async () => {
      const sshSession = await client.machines.ssh.retrieve({
        machine_id: 'machineID',
        session_id: 'sessionID',
      });
    },
  },

  {
    operation: 'delete',
    method: 'DELETE',
    path: '/v1/machines/{machine_id}/ssh/{session_id}',
    run: async () => {
      const sshSession = await client.machines.ssh.delete({
        machine_id: 'machineID',
        session_id: 'sessionID',
      });
    },
  },

  {
    operation: 'list',
    method: 'GET',
    path: '/v1/machines/{machine_id}/executions',
    run: async () => {
      const page = await client.machines.executions.list({
        machine_id: 'machineID',
      });
    },
  },

  {
    operation: 'create',
    method: 'POST',
    path: '/v1/machines/{machine_id}/executions',
    label: 'required params',
    run: async () => {
      const execution = await client.machines.executions.create({
        machine_id: 'machineID',
        command: [],
      });
    },
  },

  {
    operation: 'create',
    method: 'POST',
    path: '/v1/machines/{machine_id}/executions',
    label: 'all params',
    run: async () => {
      const execution = await client.machines.executions.create({
        machine_id: 'machineID',
        command: [],
        cwd: '',
        env: {},
        stdin: '',
        timeout_ms: 0,
      });
    },
  },

  {
    operation: 'retrieve',
    method: 'GET',
    path: '/v1/machines/{machine_id}/executions/{execution_id}',
    run: async () => {
      const execution = await client.machines.executions.retrieve({
        machine_id: 'machineID',
        execution_id: 'executionID',
      });
    },
  },

  {
    operation: 'delete',
    method: 'DELETE',
    path: '/v1/machines/{machine_id}/executions/{execution_id}',
    run: async () => {
      const execution = await client.machines.executions.delete({
        machine_id: 'machineID',
        execution_id: 'executionID',
      });
    },
  },

  {
    operation: 'output',
    method: 'GET',
    path: '/v1/machines/{machine_id}/executions/{execution_id}/output',
    run: async () => {
      const execution = await client.machines.executions.output({
        machine_id: 'machineID',
        execution_id: 'executionID',
      });
    },
  },

  {
    operation: 'events',
    method: 'GET',
    path: '/v1/machines/{machine_id}/executions/{execution_id}/events',
    run: async () => {
      const page = await client.machines.executions.events({
        machine_id: 'machineID',
        execution_id: 'executionID',
      });
    },
  },

  {
    operation: 'list',
    method: 'GET',
    path: '/v1/machines/{machine_id}/terminals',
    run: async () => {
      const page = await client.machines.terminals.list({
        machine_id: 'machineID',
      });
    },
  },

  {
    operation: 'create',
    method: 'POST',
    path: '/v1/machines/{machine_id}/terminals',
    label: 'required params',
    run: async () => {
      const terminal = await client.machines.terminals.create({
        machine_id: 'machineID',
        height: 0,
        width: 0,
      });
    },
  },

  {
    operation: 'create',
    method: 'POST',
    path: '/v1/machines/{machine_id}/terminals',
    label: 'all params',
    run: async () => {
      const terminal = await client.machines.terminals.create({
        machine_id: 'machineID',
        cwd: '',
        env: {},
        height: 0,
        shell: '',
        width: 0,
      });
    },
  },

  {
    operation: 'retrieve',
    method: 'GET',
    path: '/v1/machines/{machine_id}/terminals/{terminal_id}',
    run: async () => {
      const terminal = await client.machines.terminals.retrieve({
        machine_id: 'machineID',
        terminal_id: 'terminalID',
      });
    },
  },

  {
    operation: 'delete',
    method: 'DELETE',
    path: '/v1/machines/{machine_id}/terminals/{terminal_id}',
    run: async () => {
      const terminal = await client.machines.terminals.delete({
        machine_id: 'machineID',
        terminal_id: 'terminalID',
      });
    },
  },

  {
    operation: 'connect',
    method: 'GET',
    path: '/v1/machines/{machine_id}/terminals/{terminal_id}/stream',
    run: async () => {
      const socket = client.machines.terminals.connect({
        machine_id: 'machineID',
        terminal_id: 'terminalID',
      });
      try {
        // Stop at the first proof a side works: the server accepted the upgrade (`open`) or sent a
        // payload (`message`/`raw`). Leaving the socket open would keep the process alive.
        for await (const message of socket) {
          if (message.type === 'open' || message.type === 'message' || message.type === 'raw') break;
        }
      } finally {
        socket.close();
      }
    },
  },

  {
    operation: 'retrieve',
    method: 'GET',
    path: '/v1/networks/{network_id}',
    run: async () => {
      const network = await client.networks.retrieve({
        network_id: 'networkID',
      });
    },
  },
];

const main = async (): Promise<void> => {
  // SCALAR_SMOKE_FILTER (comma-separated) keeps only cases whose operation name or path matches
  // one of the needles, so a caller can smoke-test a subset. With no filter, every case runs.
  const filter = process.env['SCALAR_SMOKE_FILTER'];
  const needles = filter
    ? filter
        .split(',')
        .map((needle) => needle.trim())
        .filter(Boolean)
    : [];
  const selected =
    needles.length > 0
      ? cases.filter((testCase) =>
          needles.some((needle) => testCase.operation.includes(needle) || testCase.path.includes(needle)),
        )
      : cases;

  // Run every selected case concurrently. Promise.allSettled means one failing operation never
  // blocks the others, so a single run reports the status of every endpoint.
  const settled = await Promise.allSettled(
    selected.map(async (testCase): Promise<SmokeResult> => {
      const startedAt = Date.now();
      // `label` distinguishes the required-params run from the all-params run of the same
      // operation; it is omitted entirely when the operation contributed only one case.
      const identity = {
        operation: testCase.operation,
        method: testCase.method,
        path: testCase.path,
        ...(testCase.label ? { label: testCase.label } : {}),
      };
      try {
        await testCase.run();
        return { ...identity, status: 'passed', durationMs: Date.now() - startedAt };
      } catch (error) {
        // Prefer the stack so a failure points at the failing SDK call; fall back to the message.
        const message = error instanceof Error ? (error.stack ?? error.message) : String(error);
        return { ...identity, status: 'failed', durationMs: Date.now() - startedAt, error: message };
      }
    }),
  );

  // allSettled never rejects, but defensively map any rejected slot to a failed result.
  const results: SmokeResult[] = settled.map((result) =>
    result.status === 'fulfilled'
      ? result.value
      : {
          operation: 'unknown',
          method: '',
          path: '',
          status: 'failed',
          durationMs: 0,
          error: String(result.reason),
        },
  );
  const failed = results.filter((result) => result.status === 'failed');

  // With SCALAR_SMOKE_REPORT set, write a machine-readable report; otherwise print a table.
  const reportPath = process.env['SCALAR_SMOKE_REPORT'];
  if (reportPath) {
    writeFileSync(reportPath, JSON.stringify({ total: results.length, failed: failed.length, results }));
  } else {
    for (const result of results) {
      const suffix = result.label ? ` [${result.label}]` : '';
      if (result.status === 'passed')
        console.log(
          `\u2714 ${result.operation}${suffix} (${result.method} ${result.path}) ${result.durationMs}ms`,
        );
      else
        console.error(
          `\u2718 ${result.operation}${suffix} (${result.method} ${result.path})\n${result.error ?? ''}`,
        );
    }
    if (results.length === 0) {
      console.error('No code samples ran (empty SDK or a SCALAR_SMOKE_FILTER that matched nothing).');
    } else {
      console.log(`\n${results.length - failed.length}/${results.length} samples passed`);
    }
  }

  // An empty run (no operations, or a filter that matched nothing) is a failure, not a vacuous pass.
  if (failed.length > 0 || results.length === 0) process.exitCode = 1;
};

void main();
