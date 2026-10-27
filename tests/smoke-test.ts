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
const client = new Dedalus({ maxRetries: 2, timeout: 10_000 });

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
    run: async () => {
      const machine = await client.machines.create({
        autosleep: '300s',
        memory_mib: 4096,
        storage_gib: 10,
        vcpu: 1,
      });
    },
  },

  {
    operation: 'retrieve',
    method: 'GET',
    path: '/v1/machines/{machine_id}',
    run: async () => {
      const machine = await client.machines.retrieve({
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
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
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
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
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
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
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
      });
    },
  },

  {
    operation: 'sleep',
    method: 'POST',
    path: '/v1/machines/{machine_id}/sleep',
    run: async () => {
      const machine = await client.machines.sleep({
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
      });
    },
  },

  {
    operation: 'wake',
    method: 'POST',
    path: '/v1/machines/{machine_id}/wake',
    run: async () => {
      const machine = await client.machines.wake({
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
      });
    },
  },

  {
    operation: 'reboot',
    method: 'POST',
    path: '/v1/machines/{machine_id}/reboot',
    label: 'required params',
    run: async () => {
      const machine = await client.machines.reboot({
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
      });
    },
  },

  {
    operation: 'reboot',
    method: 'POST',
    path: '/v1/machines/{machine_id}/reboot',
    label: 'all params',
    run: async () => {
      const machine = await client.machines.reboot({
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
        force: true,
      });
    },
  },

  {
    operation: 'list',
    method: 'GET',
    path: '/v1/machines/{machine_id}/ssh',
    run: async () => {
      const page = await client.machines.ssh.list({
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
      });
    },
  },

  {
    operation: 'create',
    method: 'POST',
    path: '/v1/machines/{machine_id}/ssh',
    run: async () => {
      const sshSession = await client.machines.ssh.create({
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
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
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
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
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
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
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
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
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
        command: [''],
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
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
        command: [''],
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
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
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
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
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
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
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
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
        execution_id: 'executionID',
      });
    },
  },

  {
    operation: 'retrieve',
    method: 'GET',
    path: '/v1/machines/{machine_id}/executions/{execution_id}/logs',
    run: async () => {
      const status = await client.machines.executions.logs.retrieve({
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
        execution_id: 'executionID',
      });
    },
  },

  {
    operation: 'reauthorize',
    method: 'POST',
    path: '/v1/machines/{machine_id}/executions/{execution_id}/logs/reauthorize',
    run: async () => {
      const status = await client.machines.executions.logs.reauthorize({
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
        execution_id: 'executionID',
      });
    },
  },

  {
    operation: 'createToken',
    method: 'POST',
    path: '/v1/machines/{machine_id}/executions/{execution_id}/logs/token',
    run: async () => {
      const readToken = await client.machines.executions.logs.createToken({
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
        execution_id: 'executionID',
      });
    },
  },

  {
    operation: 'retrieve',
    method: 'GET',
    path: '/v1/machines/{machine_id}/autoresizing',
    run: async () => {
      const settings = await client.machines.autoresizing.retrieve({
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
      });
    },
  },

  {
    operation: 'update',
    method: 'PUT',
    path: '/v1/machines/{machine_id}/autoresizing',
    run: async () => {
      const settings = await client.machines.autoresizing.update({
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
        enabled: false,
      });
    },
  },

  {
    operation: 'retrieve',
    method: 'GET',
    path: '/v1/organization/autoresizing',
    run: async () => {
      const policy = await client.organization.autoresizing.retrieve();
    },
  },

  {
    operation: 'update',
    method: 'PUT',
    path: '/v1/organization/autoresizing',
    run: async () => {
      const policy = await client.organization.autoresizing.update({
        enabled: false,
      });
    },
  },
];

/**
 * How many cases run at once, capped at the number of cases there are.
 *
 * SCALAR_SMOKE_CONCURRENCY overrides the default; anything unparseable falls back to it.
 */
const smokeConcurrency = (caseCount: number): number => {
  const override = Number.parseInt(process.env['SCALAR_SMOKE_CONCURRENCY'] ?? '', 10);
  const limit = Number.isInteger(override) && override > 0 ? override : 32;
  return Math.min(limit, caseCount);
};

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

  // Run the selected cases under a bounded worker pool rather than all at once. A large SDK has
  // hundreds of operations, and firing every request together exceeds what the client's transport
  // keeps connections for while the runner is already busy with other targets. Each worker pulls
  // the next index off a shared cursor and writes into a pre-sized array, so results stay in case
  // order however the workers interleave. The per-case body catches everything and never rejects,
  // so one failing operation still cannot block the others.
  const results: SmokeResult[] = new Array<SmokeResult>(selected.length);
  let cursor = 0;
  const runNext = async (): Promise<void> => {
    for (let index = cursor++; index < selected.length; index = cursor++) {
      const testCase = selected[index];
      if (!testCase) continue;
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
        results[index] = { ...identity, status: 'passed', durationMs: Date.now() - startedAt };
      } catch (error) {
        // Prefer the stack so a failure points at the failing SDK call; fall back to the message.
        const message = error instanceof Error ? (error.stack ?? error.message) : String(error);
        results[index] = {
          ...identity,
          status: 'failed',
          durationMs: Date.now() - startedAt,
          error: message,
        };
      }
    }
  };
  await Promise.all(Array.from({ length: smokeConcurrency(selected.length) }, runNext));
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
