# Dedalus TypeScript API

Complete reference of every operation, grouped by resource. See [the README](./README.md) for usage and configuration.

## Contents

- [`MachineLifecycle`](#machinelifecycle)
  - [List machines](#list-machines)
  - [Create machine](#create-machine)
  - [Destroy machine](#destroy-machine)
  - [Get machine](#get-machine)
  - [Update machine](#update-machine)
  - [List artifacts](#list-artifacts)
  - [Delete artifact](#delete-artifact)
  - [Get artifact](#get-artifact)
  - [List executions](#list-executions)
  - [Create execution](#create-execution)
  - [Delete execution](#delete-execution)
  - [Get execution](#get-execution)
  - [List execution events](#list-execution-events)
  - [Get execution output](#get-execution-output)
  - [List previews](#list-previews)
  - [Create preview](#create-preview)
  - [Delete preview](#delete-preview)
  - [Get preview](#get-preview)
  - [Sleep a running machine](#sleep-a-running-machine)
  - [List SSH sessions](#list-ssh-sessions)
  - [Create SSH session](#create-ssh-session)
  - [Delete SSH session](#delete-ssh-session)
  - [Get SSH session](#get-ssh-session)
  - [Watch machine lifecycle status](#watch-machine-lifecycle-status)
  - [List terminals](#list-terminals)
  - [Create terminal](#create-terminal)
  - [Delete terminal](#delete-terminal)
  - [Get terminal](#get-terminal)
  - [Connect to terminal WebSocket stream](#connect-to-terminal-websocket-stream)
  - [Wake a sleeping machine](#wake-a-sleeping-machine)
- [`Usage`](#usage)
  - [Get usage summary](#get-usage-summary)
  - [`Usage Machines`](#usage-machines)
    - [List machine compute usage breakdown](#list-machine-compute-usage-breakdown)
    - [List machine storage usage breakdown](#list-machine-storage-usage-breakdown)

## Setup

```ts
import Dedalus from "dedalus";

const client = new Dedalus({
  bearer: process.env["BEARER"], // defaults to the BEARER env var
  environment: "production",
});
```

## `MachineLifecycle`

### List machines

| Direction | Type |
| --- | --- |
| Request | [`MachineLifecycleListParams`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |
| Response | [`MachineLifecycleListResponse`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |

```ts
const list = await client.machineLifecycle.list();
```

### Create machine

| Direction | Type |
| --- | --- |
| Request | [`MachineLifecycleCreateParams`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |
| Response | [`MachineLifecycleCreateResponse`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |

```ts
const create = await client.machineLifecycle.create({
  memory_mib: 0,
  storage_gib: 0,
  vcpu: 0,
});
```

### Destroy machine

| Direction | Type |
| --- | --- |
| Request | [`MachineLifecycleDeleteParams`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |
| Response | [`MachineLifecycleDeleteResponse`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |

```ts
const delete_ = await client.machineLifecycle.delete({
  machine_id: "machineID",
});
```

### Get machine

| Direction | Type |
| --- | --- |
| Request | [`MachineLifecycleRetrieveParams`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |
| Response | [`MachineLifecycleRetrieveResponse`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |

```ts
const retrieve = await client.machineLifecycle.retrieve({
  machine_id: "machineID",
});
```

### Update machine

| Direction | Type |
| --- | --- |
| Request | [`MachineLifecyclePatchParams`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |
| Response | [`MachineLifecyclePatchResponse`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |

```ts
const patch = await client.machineLifecycle.patch({
  machine_id: "machineID",
});
```

### List artifacts

| Direction | Type |
| --- | --- |
| Request | [`MachineLifecycleListArtifactsParams`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |
| Response | [`MachineLifecycleListArtifactsResponse`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |

```ts
const listArtifacts = await client.machineLifecycle.listArtifacts({
  machine_id: "machineID",
});
```

### Delete artifact

| Direction | Type |
| --- | --- |
| Request | [`MachineLifecycleDeleteArtifactParams`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |
| Response | [`MachineLifecycleDeleteArtifactResponse`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |

```ts
const deleteArtifact = await client.machineLifecycle.deleteArtifact({
  machine_id: "machineID",
  artifact_id: "artifactID",
});
```

### Get artifact

| Direction | Type |
| --- | --- |
| Request | [`MachineLifecycleRetrieveArtifactParams`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |
| Response | [`MachineLifecycleRetrieveArtifactResponse`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |

```ts
const retrieveArtifact = await client.machineLifecycle.retrieveArtifact({
  machine_id: "machineID",
  artifact_id: "artifactID",
});
```

### List executions

| Direction | Type |
| --- | --- |
| Request | [`MachineLifecycleListExecutionsParams`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |
| Response | [`MachineLifecycleListExecutionsResponse`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |

```ts
const listExecutions = await client.machineLifecycle.listExecutions({
  machine_id: "machineID",
});
```

### Create execution

| Direction | Type |
| --- | --- |
| Request | [`MachineLifecycleCreateExecutionParams`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |
| Response | [`MachineLifecycleCreateExecutionResponse`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |

```ts
const createExecution = await client.machineLifecycle.createExecution({
  machine_id: "machineID",
  command: [],
});
```

### Delete execution

| Direction | Type |
| --- | --- |
| Request | [`MachineLifecycleDeleteExecutionParams`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |
| Response | [`MachineLifecycleDeleteExecutionResponse`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |

```ts
const deleteExecution = await client.machineLifecycle.deleteExecution({
  machine_id: "machineID",
  execution_id: "executionID",
});
```

### Get execution

| Direction | Type |
| --- | --- |
| Request | [`MachineLifecycleRetrieveExecutionParams`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |
| Response | [`MachineLifecycleRetrieveExecutionResponse`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |

```ts
const retrieveExecution = await client.machineLifecycle.retrieveExecution({
  machine_id: "machineID",
  execution_id: "executionID",
});
```

### List execution events

| Direction | Type |
| --- | --- |
| Request | [`MachineLifecycleListExecutionEventsParams`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |
| Response | [`MachineLifecycleListExecutionEventsResponse`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |

```ts
const listExecutionEvents = await client.machineLifecycle.listExecutionEvents({
  machine_id: "machineID",
  execution_id: "executionID",
});
```

### Get execution output

| Direction | Type |
| --- | --- |
| Request | [`MachineLifecycleListExecutionOutputParams`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |
| Response | [`MachineLifecycleListExecutionOutputResponse`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |

```ts
const listExecutionOutput = await client.machineLifecycle.listExecutionOutput({
  machine_id: "machineID",
  execution_id: "executionID",
});
```

### List previews

| Direction | Type |
| --- | --- |
| Request | [`MachineLifecycleListPreviewsParams`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |
| Response | [`MachineLifecycleListPreviewsResponse`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |

```ts
const listPreviews = await client.machineLifecycle.listPreviews({
  machine_id: "machineID",
});
```

### Create preview

| Direction | Type |
| --- | --- |
| Request | [`MachineLifecycleCreatePreviewParams`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |
| Response | [`MachineLifecycleCreatePreviewResponse`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |

```ts
const createPreview = await client.machineLifecycle.createPreview({
  machine_id: "machineID",
  port: 0,
});
```

### Delete preview

| Direction | Type |
| --- | --- |
| Request | [`MachineLifecycleDeletePreviewParams`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |
| Response | [`MachineLifecycleDeletePreviewResponse`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |

```ts
const deletePreview = await client.machineLifecycle.deletePreview({
  machine_id: "machineID",
  preview_id: "previewID",
});
```

### Get preview

| Direction | Type |
| --- | --- |
| Request | [`MachineLifecycleRetrievePreviewParams`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |
| Response | [`MachineLifecycleRetrievePreviewResponse`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |

```ts
const retrievePreview = await client.machineLifecycle.retrievePreview({
  machine_id: "machineID",
  preview_id: "previewID",
});
```

### Sleep a running machine

| Direction | Type |
| --- | --- |
| Request | [`MachineLifecycleSleepParams`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |
| Response | [`MachineLifecycleSleepResponse`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |

```ts
const sleep = await client.machineLifecycle.sleep({
  machine_id: "machineID",
});
```

### List SSH sessions

| Direction | Type |
| --- | --- |
| Request | [`MachineLifecycleListSSHSessionsParams`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |
| Response | [`MachineLifecycleListSSHSessionsResponse`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |

```ts
const listSSHSessions = await client.machineLifecycle.listSSHSessions({
  machine_id: "machineID",
});
```

### Create SSH session

| Direction | Type |
| --- | --- |
| Request | [`MachineLifecycleCreateSSHSessionParams`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |
| Response | [`MachineLifecycleCreateSSHSessionResponse`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |

```ts
const createSSHSession = await client.machineLifecycle.createSSHSession({
  machine_id: "machineID",
  public_key: "",
});
```

### Delete SSH session

| Direction | Type |
| --- | --- |
| Request | [`MachineLifecycleDeleteSSHSessionParams`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |
| Response | [`MachineLifecycleDeleteSSHSessionResponse`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |

```ts
const deleteSSHSession = await client.machineLifecycle.deleteSSHSession({
  machine_id: "machineID",
  session_id: "sessionID",
});
```

### Get SSH session

| Direction | Type |
| --- | --- |
| Request | [`MachineLifecycleRetrieveSSHSessionParams`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |
| Response | [`MachineLifecycleRetrieveSSHSessionResponse`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |

```ts
const retrieveSSHSession = await client.machineLifecycle.retrieveSSHSession({
  machine_id: "machineID",
  session_id: "sessionID",
});
```

### Watch machine lifecycle status

Streams machine lifecycle updates over Server-Sent Events. Each `status` event contains a full `LifecycleResponse` payload. The stream closes after the machine reaches its current desired state.

| Direction | Type |
| --- | --- |
| Request | [`MachineLifecycleWatchStatusParams`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |
| Response | [`MachineLifecycleWatchStatusResponse`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |

```ts
const stream = await client.machineLifecycle.watchStatus({
  machine_id: "machineID",
});
for await (const event of stream) {
  console.log(event);
}
```

### List terminals

| Direction | Type |
| --- | --- |
| Request | [`MachineLifecycleListTerminalsParams`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |
| Response | [`MachineLifecycleListTerminalsResponse`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |

```ts
const listTerminals = await client.machineLifecycle.listTerminals({
  machine_id: "machineID",
});
```

### Create terminal

| Direction | Type |
| --- | --- |
| Request | [`MachineLifecycleCreateTerminalParams`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |
| Response | [`MachineLifecycleCreateTerminalResponse`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |

```ts
const createTerminal = await client.machineLifecycle.createTerminal({
  machine_id: "machineID",
  height: 0,
  width: 0,
});
```

### Delete terminal

| Direction | Type |
| --- | --- |
| Request | [`MachineLifecycleDeleteTerminalParams`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |
| Response | [`MachineLifecycleDeleteTerminalResponse`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |

```ts
const deleteTerminal = await client.machineLifecycle.deleteTerminal({
  machine_id: "machineID",
  terminal_id: "terminalID",
});
```

### Get terminal

| Direction | Type |
| --- | --- |
| Request | [`MachineLifecycleRetrieveTerminalParams`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |
| Response | [`MachineLifecycleRetrieveTerminalResponse`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |

```ts
const retrieveTerminal = await client.machineLifecycle.retrieveTerminal({
  machine_id: "machineID",
  terminal_id: "terminalID",
});
```

### Connect to terminal WebSocket stream

Upgrades to a WebSocket connection for interactive terminal I/O. Clients send JSON `TerminalClientEvent` messages and receive JSON `TerminalServerEvent` messages. Terminal byte streams are base64-encoded inside `input` and `output` events; `resize` events use integer `width` and `height` fields.

| Direction | Type |
| --- | --- |
| Request | [`MachineLifecycleConnectTerminalParams`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |

```ts
const connection = client.machineLifecycle.connectTerminal({
  machine_id: "machineID",
  terminal_id: "terminalID",
});
try {
  for await (const message of connection) {
    console.log(message);
  }
} finally {
  connection.close();
}
```

### Wake a sleeping machine

| Direction | Type |
| --- | --- |
| Request | [`MachineLifecycleWakeParams`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |
| Response | [`MachineLifecycleWakeResponse`](./src/resources/machine-lifecycle/machine-lifecycle.ts) |

```ts
const wake = await client.machineLifecycle.wake({
  machine_id: "machineID",
});
```

## `Usage`

### Get usage summary

| Direction | Type |
| --- | --- |
| Request | [`UsageListParams`](./src/resources/usage/usage.ts) |
| Response | [`UsageListResponse`](./src/resources/usage/usage.ts) |

```ts
const list = await client.usage.list();
```

### `Usage Machines`

#### List machine compute usage breakdown

| Direction | Type |
| --- | --- |
| Request | [`MachineListComputeUsageParams`](./src/resources/usage/machines.ts) |
| Response | [`MachineListComputeUsageResponse`](./src/resources/usage/machines.ts) |

```ts
const listComputeUsage = await client.usage.machines.listComputeUsage();
```

#### List machine storage usage breakdown

| Direction | Type |
| --- | --- |
| Request | [`MachineListStorageUsageParams`](./src/resources/usage/machines.ts) |
| Response | [`MachineListStorageUsageResponse`](./src/resources/usage/machines.ts) |

```ts
const listStorageUsage = await client.usage.machines.listStorageUsage();
```
