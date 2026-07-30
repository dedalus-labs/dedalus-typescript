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
import { writeFileSync } from 'node:fs'

// The default export is the client class. The client reads auth and the base URL from the
// environment, so it needs no constructor options to point at a server.
import Dedalus from "dedalus"

// One shared client runs every case.
const client = new Dedalus()

// The result of running one case, collected for the JSON report or the printed table.
type SmokeResult = {
  operation: string
  method: string
  path: string
  status: 'passed' | 'failed'
  durationMs: number
  error?: string
}

// One entry per generated operation. `run` performs the real SDK call; the other fields are
// metadata used for filtering and reporting. This list is generated, so it stays in sync with
// the SDK surface.
const cases: { operation: string; method: string; path: string; run: () => Promise<unknown> }[] = [
  {
    operation: "list",
    method: "GET",
    path: "/v1/machines",
    run: async () => {
      const list = await client.machineLifecycle.list();
    },
  },

  {
    operation: "create",
    method: "POST",
    path: "/v1/machines",
    run: async () => {
      const create = await client.machineLifecycle.create({
        memory_mib: 0,
        storage_gib: 0,
        vcpu: 0,
      });
    },
  },

  {
    operation: "delete",
    method: "DELETE",
    path: "/v1/machines/{machine_id}",
    run: async () => {
      const delete_ = await client.machineLifecycle.delete({
        machine_id: "machineID",
      });
    },
  },

  {
    operation: "retrieve",
    method: "GET",
    path: "/v1/machines/{machine_id}",
    run: async () => {
      const retrieve = await client.machineLifecycle.retrieve({
        machine_id: "machineID",
      });
    },
  },

  {
    operation: "patch",
    method: "PATCH",
    path: "/v1/machines/{machine_id}",
    run: async () => {
      const patch = await client.machineLifecycle.patch({
        machine_id: "machineID",
      });
    },
  },

  {
    operation: "listArtifacts",
    method: "GET",
    path: "/v1/machines/{machine_id}/artifacts",
    run: async () => {
      const listArtifacts = await client.machineLifecycle.listArtifacts({
        machine_id: "machineID",
      });
    },
  },

  {
    operation: "deleteArtifact",
    method: "DELETE",
    path: "/v1/machines/{machine_id}/artifacts/{artifact_id}",
    run: async () => {
      const deleteArtifact = await client.machineLifecycle.deleteArtifact({
        machine_id: "machineID",
        artifact_id: "artifactID",
      });
    },
  },

  {
    operation: "retrieveArtifact",
    method: "GET",
    path: "/v1/machines/{machine_id}/artifacts/{artifact_id}",
    run: async () => {
      const retrieveArtifact = await client.machineLifecycle.retrieveArtifact({
        machine_id: "machineID",
        artifact_id: "artifactID",
      });
    },
  },

  {
    operation: "listExecutions",
    method: "GET",
    path: "/v1/machines/{machine_id}/executions",
    run: async () => {
      const listExecutions = await client.machineLifecycle.listExecutions({
        machine_id: "machineID",
      });
    },
  },

  {
    operation: "createExecution",
    method: "POST",
    path: "/v1/machines/{machine_id}/executions",
    run: async () => {
      const createExecution = await client.machineLifecycle.createExecution({
        machine_id: "machineID",
        command: [],
      });
    },
  },

  {
    operation: "deleteExecution",
    method: "DELETE",
    path: "/v1/machines/{machine_id}/executions/{execution_id}",
    run: async () => {
      const deleteExecution = await client.machineLifecycle.deleteExecution({
        machine_id: "machineID",
        execution_id: "executionID",
      });
    },
  },

  {
    operation: "retrieveExecution",
    method: "GET",
    path: "/v1/machines/{machine_id}/executions/{execution_id}",
    run: async () => {
      const retrieveExecution = await client.machineLifecycle.retrieveExecution({
        machine_id: "machineID",
        execution_id: "executionID",
      });
    },
  },

  {
    operation: "listExecutionEvents",
    method: "GET",
    path: "/v1/machines/{machine_id}/executions/{execution_id}/events",
    run: async () => {
      const listExecutionEvents = await client.machineLifecycle.listExecutionEvents({
        machine_id: "machineID",
        execution_id: "executionID",
      });
    },
  },

  {
    operation: "listExecutionOutput",
    method: "GET",
    path: "/v1/machines/{machine_id}/executions/{execution_id}/output",
    run: async () => {
      const listExecutionOutput = await client.machineLifecycle.listExecutionOutput({
        machine_id: "machineID",
        execution_id: "executionID",
      });
    },
  },

  {
    operation: "listPreviews",
    method: "GET",
    path: "/v1/machines/{machine_id}/previews",
    run: async () => {
      const listPreviews = await client.machineLifecycle.listPreviews({
        machine_id: "machineID",
      });
    },
  },

  {
    operation: "createPreview",
    method: "POST",
    path: "/v1/machines/{machine_id}/previews",
    run: async () => {
      const createPreview = await client.machineLifecycle.createPreview({
        machine_id: "machineID",
        port: 0,
      });
    },
  },

  {
    operation: "deletePreview",
    method: "DELETE",
    path: "/v1/machines/{machine_id}/previews/{preview_id}",
    run: async () => {
      const deletePreview = await client.machineLifecycle.deletePreview({
        machine_id: "machineID",
        preview_id: "previewID",
      });
    },
  },

  {
    operation: "retrievePreview",
    method: "GET",
    path: "/v1/machines/{machine_id}/previews/{preview_id}",
    run: async () => {
      const retrievePreview = await client.machineLifecycle.retrievePreview({
        machine_id: "machineID",
        preview_id: "previewID",
      });
    },
  },

  {
    operation: "sleep",
    method: "POST",
    path: "/v1/machines/{machine_id}/sleep",
    run: async () => {
      const sleep = await client.machineLifecycle.sleep({
        machine_id: "machineID",
      });
    },
  },

  {
    operation: "listSshSessions",
    method: "GET",
    path: "/v1/machines/{machine_id}/ssh",
    run: async () => {
      const listSSHSessions = await client.machineLifecycle.listSSHSessions({
        machine_id: "machineID",
      });
    },
  },

  {
    operation: "createSshSession",
    method: "POST",
    path: "/v1/machines/{machine_id}/ssh",
    run: async () => {
      const createSSHSession = await client.machineLifecycle.createSSHSession({
        machine_id: "machineID",
        public_key: "",
      });
    },
  },

  {
    operation: "deleteSshSession",
    method: "DELETE",
    path: "/v1/machines/{machine_id}/ssh/{session_id}",
    run: async () => {
      const deleteSSHSession = await client.machineLifecycle.deleteSSHSession({
        machine_id: "machineID",
        session_id: "sessionID",
      });
    },
  },

  {
    operation: "retrieveSshSession",
    method: "GET",
    path: "/v1/machines/{machine_id}/ssh/{session_id}",
    run: async () => {
      const retrieveSSHSession = await client.machineLifecycle.retrieveSSHSession({
        machine_id: "machineID",
        session_id: "sessionID",
      });
    },
  },

  {
    operation: "watchStatus",
    method: "GET",
    path: "/v1/machines/{machine_id}/status/stream",
    run: async () => {
      const stream = await client.machineLifecycle.watchStatus({
        machine_id: "machineID",
      });
      for await (const event of stream) {
        console.log(event);
      }
    },
  },

  {
    operation: "listTerminals",
    method: "GET",
    path: "/v1/machines/{machine_id}/terminals",
    run: async () => {
      const listTerminals = await client.machineLifecycle.listTerminals({
        machine_id: "machineID",
      });
    },
  },

  {
    operation: "createTerminal",
    method: "POST",
    path: "/v1/machines/{machine_id}/terminals",
    run: async () => {
      const createTerminal = await client.machineLifecycle.createTerminal({
        machine_id: "machineID",
        height: 0,
        width: 0,
      });
    },
  },

  {
    operation: "deleteTerminal",
    method: "DELETE",
    path: "/v1/machines/{machine_id}/terminals/{terminal_id}",
    run: async () => {
      const deleteTerminal = await client.machineLifecycle.deleteTerminal({
        machine_id: "machineID",
        terminal_id: "terminalID",
      });
    },
  },

  {
    operation: "retrieveTerminal",
    method: "GET",
    path: "/v1/machines/{machine_id}/terminals/{terminal_id}",
    run: async () => {
      const retrieveTerminal = await client.machineLifecycle.retrieveTerminal({
        machine_id: "machineID",
        terminal_id: "terminalID",
      });
    },
  },

  {
    operation: "connectTerminal",
    method: "GET",
    path: "/v1/machines/{machine_id}/terminals/{terminal_id}/stream",
    run: async () => {
      const socket = client.machineLifecycle.connectTerminal({
        machine_id: "machineID",
        terminal_id: "terminalID",
      })
      try {
        // Stop at the first proof a side works: the server accepted the upgrade (`open`) or sent a
        // payload (`message`/`raw`). Leaving the socket open would keep the process alive.
        for await (const message of socket) {
          if (message.type === 'open' || message.type === 'message' || message.type === 'raw') break
        }
      } finally {
        socket.close()
      }

    },
  },

  {
    operation: "wake",
    method: "POST",
    path: "/v1/machines/{machine_id}/wake",
    run: async () => {
      const wake = await client.machineLifecycle.wake({
        machine_id: "machineID",
      });
    },
  },

  {
    operation: "list",
    method: "GET",
    path: "/v1/usage",
    run: async () => {
      const list = await client.usage.list();
    },
  },

  {
    operation: "listComputeUsage",
    method: "GET",
    path: "/v1/usage/machines/compute",
    run: async () => {
      const listComputeUsage = await client.usage.machines.listComputeUsage();
    },
  },

  {
    operation: "listStorageUsage",
    method: "GET",
    path: "/v1/usage/machines/storage",
    run: async () => {
      const listStorageUsage = await client.usage.machines.listStorageUsage();
    },
  },

]

const main = async (): Promise<void> => {
  // SCALAR_SMOKE_FILTER (comma-separated) keeps only cases whose operation name or path matches
  // one of the needles, so a caller can smoke-test a subset. With no filter, every case runs.
  const filter = process.env['SCALAR_SMOKE_FILTER']
  const needles = filter ? filter.split(',').map((needle) => needle.trim()).filter(Boolean) : []
  const selected = needles.length > 0 ? cases.filter((testCase) => needles.some((needle) => testCase.operation.includes(needle) || testCase.path.includes(needle))) : cases

  // Run every selected case concurrently. Promise.allSettled means one failing operation never
  // blocks the others, so a single run reports the status of every endpoint.
  const settled = await Promise.allSettled(
    selected.map(async (testCase): Promise<SmokeResult> => {
      const startedAt = Date.now()
      try {
        await testCase.run()
        return { operation: testCase.operation, method: testCase.method, path: testCase.path, status: 'passed', durationMs: Date.now() - startedAt }
      } catch (error) {
        // Prefer the stack so a failure points at the failing SDK call; fall back to the message.
        const message = error instanceof Error ? (error.stack ?? error.message) : String(error)
        return { operation: testCase.operation, method: testCase.method, path: testCase.path, status: 'failed', durationMs: Date.now() - startedAt, error: message }
      }
    }),
  )

  // allSettled never rejects, but defensively map any rejected slot to a failed result.
  const results: SmokeResult[] = settled.map((result) => (result.status === 'fulfilled' ? result.value : { operation: 'unknown', method: '', path: '', status: 'failed', durationMs: 0, error: String(result.reason) }))
  const failed = results.filter((result) => result.status === 'failed')

  // With SCALAR_SMOKE_REPORT set, write a machine-readable report; otherwise print a table.
  const reportPath = process.env['SCALAR_SMOKE_REPORT']
  if (reportPath) {
    writeFileSync(reportPath, JSON.stringify({ total: results.length, failed: failed.length, results }))
  } else {
    for (const result of results) {
      if (result.status === 'passed') console.log(`\u2714 ${result.operation} (${result.method} ${result.path}) ${result.durationMs}ms`)
      else console.error(`\u2718 ${result.operation} (${result.method} ${result.path})\n${result.error ?? ''}`)
    }
    if (results.length === 0) {
      console.error('No code samples ran (empty SDK or a SCALAR_SMOKE_FILTER that matched nothing).')
    } else {
      console.log(`\n${results.length - failed.length}/${results.length} samples passed`)
    }
  }

  // An empty run (no operations, or a filter that matched nothing) is a failure, not a vacuous pass.
  if (failed.length > 0 || results.length === 0) process.exitCode = 1
}

void main()
