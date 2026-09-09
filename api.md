# Dedalus TypeScript API

Complete reference of every operation, grouped by resource. See [the README](./README.md) for usage and configuration.

## Contents

- [`Machines`](#machines)
  - [List machines](#list-machines)
  - [Create machine](#create-machine)
  - [Get machine](#get-machine)
  - [Update machine](#update-machine)
  - [Destroy machine](#destroy-machine)
  - [Watch machine lifecycle status](#watch-machine-lifecycle-status)
  - [Sleep a running machine](#sleep-a-running-machine)
  - [Wake a sleeping machine](#wake-a-sleeping-machine)
  - [`Machines Network`](#machines-network)
    - [Get machine network identity](#get-machine-network-identity)
  - [`Machines Artifacts`](#machines-artifacts)
    - [List artifacts](#list-artifacts)
    - [Get artifact](#get-artifact)
    - [Delete artifact](#delete-artifact)
  - [`Machines Ports`](#machines-ports)
    - [List ports](#list-ports)
    - [Create port](#create-port)
    - [Get port](#get-port)
    - [Delete port](#delete-port)
  - [`Machines Ssh`](#machines-ssh)
    - [List SSH sessions](#list-ssh-sessions)
    - [Create SSH session](#create-ssh-session)
    - [Get SSH session](#get-ssh-session)
    - [Delete SSH session](#delete-ssh-session)
  - [`Machines Executions`](#machines-executions)
    - [List executions](#list-executions)
    - [Create execution](#create-execution)
    - [Get execution](#get-execution)
    - [Delete execution](#delete-execution)
    - [Get execution output](#get-execution-output)
    - [List execution events](#list-execution-events)
  - [`Machines Terminals`](#machines-terminals)
    - [List terminals](#list-terminals)
    - [Create terminal](#create-terminal)
    - [Get terminal](#get-terminal)
    - [Delete terminal](#delete-terminal)
    - [Connect to terminal WebSocket stream](#connect-to-terminal-websocket-stream)
- [`Networks`](#networks)
  - [Get network details](#get-network-details)
- [`Usage`](#usage)
  - [Get usage summary](#get-usage-summary)
  - [List machine compute usage breakdown](#list-machine-compute-usage-breakdown)
  - [List machine storage usage breakdown](#list-machine-storage-usage-breakdown)

## Setup

```ts
import Dedalus from 'dedalus';

const client = new Dedalus({
  apiKey: process.env['DEDALUS_API_KEY'], // defaults to the DEDALUS_API_KEY env var
});
```

## `Machines`

### List machines

| Direction | Type |
| --- | --- |
| Request | [`MachineListParams`](./src/resources/machines/machines.ts) |
| Response | [`MachineListItemsCursorPage`](./src/resources/machines/machines.ts) |

```ts
const page = await client.machines.list();
```

### Create machine

| Direction | Type |
| --- | --- |
| Request | [`MachineCreateParams`](./src/resources/machines/machines.ts) |
| Response | [`Machine`](./src/resources/machines/machines.ts) |

```ts
const machine = await client.machines.create({
  autosleep: '300s',
  memory_mib: 4096,
  storage_gib: 10,
  vcpu: 1,
});
```

### Get machine

| Direction | Type |
| --- | --- |
| Request | [`MachineRetrieveParams`](./src/resources/machines/machines.ts) |
| Response | [`MachineRetrieveResponse`](./src/resources/machines/machines.ts) |

```ts
const machine = await client.machines.retrieve({
  machine_id: 'machineID',
});
```

### Update machine

| Direction | Type |
| --- | --- |
| Request | [`MachineUpdateParams`](./src/resources/machines/machines.ts) |
| Response | [`Machine`](./src/resources/machines/machines.ts) |

```ts
const machine = await client.machines.update({
  machine_id: 'machineID',
});
```

### Destroy machine

| Direction | Type |
| --- | --- |
| Request | [`MachineDeleteParams`](./src/resources/machines/machines.ts) |
| Response | [`Machine`](./src/resources/machines/machines.ts) |

```ts
const machine = await client.machines.delete({
  machine_id: 'machineID',
});
```

### Watch machine lifecycle status

Streams machine lifecycle updates over Server-Sent Events. Each `status` event contains a full `LifecycleResponse` payload. The stream closes after the machine reaches its current desired state.

| Direction | Type |
| --- | --- |
| Request | [`MachineWatchParams`](./src/resources/machines/machines.ts) |

```ts
const stream = await client.machines.watch({
  machine_id: 'machineID',
});

for await (const machine of stream) {
  console.log(machine);
}
```

### Sleep a running machine

| Direction | Type |
| --- | --- |
| Request | [`MachineSleepParams`](./src/resources/machines/machines.ts) |
| Response | [`Machine`](./src/resources/machines/machines.ts) |

```ts
const machine = await client.machines.sleep({
  machine_id: 'machineID',
});
```

### Wake a sleeping machine

| Direction | Type |
| --- | --- |
| Request | [`MachineWakeParams`](./src/resources/machines/machines.ts) |
| Response | [`Machine`](./src/resources/machines/machines.ts) |

```ts
const machine = await client.machines.wake({
  machine_id: 'machineID',
});
```

### `Machines Network`

#### Get machine network identity

| Direction | Type |
| --- | --- |
| Request | [`NetworkRetrieveParams`](./src/resources/machines/network.ts) |
| Response | [`MachineNetwork`](./src/resources/machines/network.ts) |

```ts
const machineNetwork = await client.machines.network.retrieve({
  machine_id: 'machineID',
});
```

### `Machines Artifacts`

#### List artifacts

| Direction | Type |
| --- | --- |
| Request | [`ArtifactListParams`](./src/resources/machines/artifacts.ts) |
| Response | [`ArtifactsCursorPage`](./src/resources/machines/artifacts.ts) |

```ts
const page = await client.machines.artifacts.list({
  machine_id: 'machineID',
});
```

#### Get artifact

| Direction | Type |
| --- | --- |
| Request | [`ArtifactRetrieveParams`](./src/resources/machines/artifacts.ts) |
| Response | [`Artifact`](./src/resources/machines/artifacts.ts) |

```ts
const artifact = await client.machines.artifacts.retrieve({
  machine_id: 'machineID',
  artifact_id: 'artifactID',
});
```

#### Delete artifact

| Direction | Type |
| --- | --- |
| Request | [`ArtifactDeleteParams`](./src/resources/machines/artifacts.ts) |
| Response | [`Artifact`](./src/resources/machines/artifacts.ts) |

```ts
const artifact = await client.machines.artifacts.delete({
  machine_id: 'machineID',
  artifact_id: 'artifactID',
});
```

### `Machines Ports`

#### List ports

| Direction | Type |
| --- | --- |
| Request | [`PortListParams`](./src/resources/machines/ports.ts) |
| Response | [`PortsCursorPage`](./src/resources/machines/ports.ts) |

```ts
const page = await client.machines.ports.list({
  machine_id: 'machineID',
});
```

#### Create port

| Direction | Type |
| --- | --- |
| Request | [`PortCreateParams`](./src/resources/machines/ports.ts) |
| Response | [`Port`](./src/resources/machines/ports.ts) |

```ts
const port = await client.machines.ports.create({
  machine_id: 'machineID',
  port: 0,
});
```

#### Get port

| Direction | Type |
| --- | --- |
| Request | [`PortRetrieveParams`](./src/resources/machines/ports.ts) |
| Response | [`Port`](./src/resources/machines/ports.ts) |

```ts
const port = await client.machines.ports.retrieve({
  machine_id: 'machineID',
  port_id: 'portID',
});
```

#### Delete port

| Direction | Type |
| --- | --- |
| Request | [`PortDeleteParams`](./src/resources/machines/ports.ts) |
| Response | [`Port`](./src/resources/machines/ports.ts) |

```ts
const port = await client.machines.ports.delete({
  machine_id: 'machineID',
  port_id: 'portID',
});
```

### `Machines Ssh`

#### List SSH sessions

| Direction | Type |
| --- | --- |
| Request | [`SSHListParams`](./src/resources/machines/ssh.ts) |
| Response | [`SSHSessionsCursorPage`](./src/resources/machines/ssh.ts) |

```ts
const page = await client.machines.ssh.list({
  machine_id: 'machineID',
});
```

#### Create SSH session

| Direction | Type |
| --- | --- |
| Request | [`SSHCreateParams`](./src/resources/machines/ssh.ts) |
| Response | [`SSHSession`](./src/resources/machines/ssh.ts) |

```ts
const sshSession = await client.machines.ssh.create({
  machine_id: 'machineID',
  public_key: '',
});
```

#### Get SSH session

| Direction | Type |
| --- | --- |
| Request | [`SSHRetrieveParams`](./src/resources/machines/ssh.ts) |
| Response | [`SSHSession`](./src/resources/machines/ssh.ts) |

```ts
const sshSession = await client.machines.ssh.retrieve({
  machine_id: 'machineID',
  session_id: 'sessionID',
});
```

#### Delete SSH session

| Direction | Type |
| --- | --- |
| Request | [`SSHDeleteParams`](./src/resources/machines/ssh.ts) |
| Response | [`SSHSession`](./src/resources/machines/ssh.ts) |

```ts
const sshSession = await client.machines.ssh.delete({
  machine_id: 'machineID',
  session_id: 'sessionID',
});
```

### `Machines Executions`

#### List executions

| Direction | Type |
| --- | --- |
| Request | [`ExecutionListParams`](./src/resources/machines/executions.ts) |
| Response | [`ExecutionsCursorPage`](./src/resources/machines/executions.ts) |

```ts
const page = await client.machines.executions.list({
  machine_id: 'machineID',
});
```

#### Create execution

| Direction | Type |
| --- | --- |
| Request | [`ExecutionCreateParams`](./src/resources/machines/executions.ts) |
| Response | [`Execution`](./src/resources/machines/executions.ts) |

```ts
const execution = await client.machines.executions.create({
  machine_id: 'machineID',
  command: [''],
});
```

#### Get execution

| Direction | Type |
| --- | --- |
| Request | [`ExecutionRetrieveParams`](./src/resources/machines/executions.ts) |
| Response | [`Execution`](./src/resources/machines/executions.ts) |

```ts
const execution = await client.machines.executions.retrieve({
  machine_id: 'machineID',
  execution_id: 'executionID',
});
```

#### Delete execution

| Direction | Type |
| --- | --- |
| Request | [`ExecutionDeleteParams`](./src/resources/machines/executions.ts) |
| Response | [`Execution`](./src/resources/machines/executions.ts) |

```ts
const execution = await client.machines.executions.delete({
  machine_id: 'machineID',
  execution_id: 'executionID',
});
```

#### Get execution output

| Direction | Type |
| --- | --- |
| Request | [`ExecutionOutputParams`](./src/resources/machines/executions.ts) |
| Response | [`ExecutionOutput`](./src/resources/machines/executions.ts) |

```ts
const execution = await client.machines.executions.output({
  machine_id: 'machineID',
  execution_id: 'executionID',
});
```

#### List execution events

| Direction | Type |
| --- | --- |
| Request | [`ExecutionEventsParams`](./src/resources/machines/executions.ts) |
| Response | [`ExecutionEventsCursorPage`](./src/resources/machines/executions.ts) |

```ts
const page = await client.machines.executions.events({
  machine_id: 'machineID',
  execution_id: 'executionID',
});
```

### `Machines Terminals`

#### List terminals

| Direction | Type |
| --- | --- |
| Request | [`TerminalListParams`](./src/resources/machines/terminals/terminals.ts) |
| Response | [`TerminalsCursorPage`](./src/resources/machines/terminals/terminals.ts) |

```ts
const page = await client.machines.terminals.list({
  machine_id: 'machineID',
});
```

#### Create terminal

| Direction | Type |
| --- | --- |
| Request | [`TerminalCreateParams`](./src/resources/machines/terminals/terminals.ts) |
| Response | [`Terminal`](./src/resources/machines/terminals/terminals.ts) |

```ts
const terminal = await client.machines.terminals.create({
  machine_id: 'machineID',
  height: 0,
  width: 0,
});
```

#### Get terminal

| Direction | Type |
| --- | --- |
| Request | [`TerminalRetrieveParams`](./src/resources/machines/terminals/terminals.ts) |
| Response | [`Terminal`](./src/resources/machines/terminals/terminals.ts) |

```ts
const terminal = await client.machines.terminals.retrieve({
  machine_id: 'machineID',
  terminal_id: 'terminalID',
});
```

#### Delete terminal

| Direction | Type |
| --- | --- |
| Request | [`TerminalDeleteParams`](./src/resources/machines/terminals/terminals.ts) |
| Response | [`Terminal`](./src/resources/machines/terminals/terminals.ts) |

```ts
const terminal = await client.machines.terminals.delete({
  machine_id: 'machineID',
  terminal_id: 'terminalID',
});
```

#### Connect to terminal WebSocket stream

Upgrades to a WebSocket connection for interactive terminal I/O. Clients send JSON `TerminalClientEvent` messages and receive JSON `TerminalServerEvent` messages. Terminal byte streams are base64-encoded inside `input` and `output` events; `resize` events use integer `width` and `height` fields.

| Direction | Type |
| --- | --- |
| Request | [`TerminalConnectParams`](./src/resources/machines/terminals/terminals.ts) |

```ts
const connection = client.machines.terminals.connect({
  machine_id: 'machineID',
  terminal_id: 'terminalID',
});

try {
  for await (const message of connection) {
    console.log(message);
  }
} finally {
  connection.close();
}
```

## `Networks`

### Get network details

| Direction | Type |
| --- | --- |
| Request | [`NetworkRetrieveParams`](./src/resources/networks.ts) |
| Response | [`Network`](./src/resources/networks.ts) |

```ts
const network = await client.networks.retrieve({
  network_id: 'networkID',
});
```

## `Usage`

### Get usage summary

| Direction | Type |
| --- | --- |
| Request | [`UsageRetrieveParams`](./src/resources/usage.ts) |
| Response | [`OrgUsage`](./src/resources/usage.ts) |

```ts
const orgUsage = await client.usage.retrieve();
```

### List machine compute usage breakdown

| Direction | Type |
| --- | --- |
| Request | [`UsageMachineComputeParams`](./src/resources/usage.ts) |
| Response | [`MachineComputeUsage`](./src/resources/usage.ts) |

```ts
const machineComputeUsage = await client.usage.machineCompute();
```

### List machine storage usage breakdown

| Direction | Type |
| --- | --- |
| Request | [`UsageMachineStorageParams`](./src/resources/usage.ts) |
| Response | [`MachineStorageUsage`](./src/resources/usage.ts) |

```ts
const machineStorageUsage = await client.usage.machineStorage();
```
