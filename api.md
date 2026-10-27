# Dedalus TypeScript API

Complete reference of every operation, grouped by resource. See [the README](./README.md) for usage and configuration.

## Contents

- [`Machines`](#machines)
  - [List machines](#list-machines)
  - [Create machine](#create-machine)
  - [Get machine](#get-machine)
  - [Update machine](#update-machine)
  - [Destroy machine](#destroy-machine)
  - [Sleep a running machine](#sleep-a-running-machine)
  - [Wake a sleeping machine](#wake-a-sleeping-machine)
  - [Reboot a machine with fresh memory](#reboot-a-machine-with-fresh-memory)
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
    - [`Machines Executions Logs`](#machines-executions-logs)
      - [Get execution log status](#get-execution-log-status)
      - [Reauthorize execution log publication](#reauthorize-execution-log-publication)
      - [Create execution log read token](#create-execution-log-read-token)
  - [`Machines Autoresizing`](#machines-autoresizing)
    - [Read this machine's RAM autoresizing settings](#read-this-machines-ram-autoresizing-settings)
    - [Set this machine's RAM autoresizing settings](#set-this-machines-ram-autoresizing-settings)
- [`Organization`](#organization)
  - [`Organization Autoresizing`](#organization-autoresizing)
    - [Read organization RAM autoresizing policy](#read-organization-ram-autoresizing-policy)
    - [Set organization RAM autoresizing policy](#set-organization-ram-autoresizing-policy)

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
  machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
});
```

### Update machine

| Direction | Type |
| --- | --- |
| Request | [`MachineUpdateParams`](./src/resources/machines/machines.ts) |
| Response | [`Machine`](./src/resources/machines/machines.ts) |

```ts
const machine = await client.machines.update({
  machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
});
```

### Destroy machine

| Direction | Type |
| --- | --- |
| Request | [`MachineDeleteParams`](./src/resources/machines/machines.ts) |
| Response | [`Machine`](./src/resources/machines/machines.ts) |

```ts
const machine = await client.machines.delete({
  machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
});
```

### Sleep a running machine

| Direction | Type |
| --- | --- |
| Request | [`MachineSleepParams`](./src/resources/machines/machines.ts) |
| Response | [`Machine`](./src/resources/machines/machines.ts) |

```ts
const machine = await client.machines.sleep({
  machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
});
```

### Wake a sleeping machine

| Direction | Type |
| --- | --- |
| Request | [`MachineWakeParams`](./src/resources/machines/machines.ts) |
| Response | [`Machine`](./src/resources/machines/machines.ts) |

```ts
const machine = await client.machines.wake({
  machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
});
```

### Reboot a machine with fresh memory

Checkpoints files and replaces the runtime. The machine ID and filesystem are preserved. RAM, processes, and temporary mounts are cleared. Poll the machine until its phase is running. Retry the same Idempotency-Key after a lost response.

| Direction | Type |
| --- | --- |
| Request | [`MachineRebootParams`](./src/resources/machines/machines.ts) |
| Response | [`Machine`](./src/resources/machines/machines.ts) |

```ts
const machine = await client.machines.reboot({
  machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
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
  machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
});
```

#### Create SSH session

| Direction | Type |
| --- | --- |
| Request | [`SSHCreateParams`](./src/resources/machines/ssh.ts) |
| Response | [`SSHSession`](./src/resources/machines/ssh.ts) |

```ts
const sshSession = await client.machines.ssh.create({
  machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
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
  machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
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
  machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
  session_id: 'sessionID',
});
```

### `Machines Executions`

#### List executions

| Direction | Type |
| --- | --- |
| Request | [`ExecutionListParams`](./src/resources/machines/executions/executions.ts) |
| Response | [`ExecutionsCursorPage`](./src/resources/machines/executions/executions.ts) |

```ts
const page = await client.machines.executions.list({
  machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
});
```

#### Create execution

| Direction | Type |
| --- | --- |
| Request | [`ExecutionCreateParams`](./src/resources/machines/executions/executions.ts) |
| Response | [`Execution`](./src/resources/machines/executions/executions.ts) |

```ts
const execution = await client.machines.executions.create({
  machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
  command: [''],
});
```

#### Get execution

| Direction | Type |
| --- | --- |
| Request | [`ExecutionRetrieveParams`](./src/resources/machines/executions/executions.ts) |
| Response | [`Execution`](./src/resources/machines/executions/executions.ts) |

```ts
const execution = await client.machines.executions.retrieve({
  machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
  execution_id: 'executionID',
});
```

#### Delete execution

| Direction | Type |
| --- | --- |
| Request | [`ExecutionDeleteParams`](./src/resources/machines/executions/executions.ts) |
| Response | [`Execution`](./src/resources/machines/executions/executions.ts) |

```ts
const execution = await client.machines.executions.delete({
  machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
  execution_id: 'executionID',
});
```

#### Get execution output

| Direction | Type |
| --- | --- |
| Request | [`ExecutionOutputParams`](./src/resources/machines/executions/executions.ts) |
| Response | [`ExecutionOutput`](./src/resources/machines/executions/executions.ts) |

```ts
const execution = await client.machines.executions.output({
  machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
  execution_id: 'executionID',
});
```

#### List execution events

| Direction | Type |
| --- | --- |
| Request | [`ExecutionEventsParams`](./src/resources/machines/executions/executions.ts) |
| Response | [`ExecutionEventsCursorPage`](./src/resources/machines/executions/executions.ts) |

```ts
const page = await client.machines.executions.events({
  machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
  execution_id: 'executionID',
});
```

#### `Machines Executions Logs`

##### Get execution log status

| Direction | Type |
| --- | --- |
| Request | [`LogRetrieveParams`](./src/resources/machines/executions/logs.ts) |
| Response | [`Status`](./src/resources/machines/executions/logs.ts) |

```ts
const status = await client.machines.executions.logs.retrieve({
  machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
  execution_id: 'executionID',
});
```

##### Reauthorize execution log publication

| Direction | Type |
| --- | --- |
| Request | [`LogReauthorizeParams`](./src/resources/machines/executions/logs.ts) |
| Response | [`Status`](./src/resources/machines/executions/logs.ts) |

```ts
const status = await client.machines.executions.logs.reauthorize({
  machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
  execution_id: 'executionID',
});
```

##### Create execution log read token

| Direction | Type |
| --- | --- |
| Request | [`LogCreateTokenParams`](./src/resources/machines/executions/logs.ts) |
| Response | [`ReadToken`](./src/resources/machines/executions/logs.ts) |

```ts
const readToken = await client.machines.executions.logs.createToken({
  machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
  execution_id: 'executionID',
});
```

### `Machines Autoresizing`

#### Read this machine's RAM autoresizing settings

| Direction | Type |
| --- | --- |
| Request | [`AutoresizingRetrieveParams`](./src/resources/machines/autoresizing.ts) |
| Response | [`Settings`](./src/resources/machines/autoresizing.ts) |

```ts
const settings = await client.machines.autoresizing.retrieve({
  machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
});
```

#### Set this machine's RAM autoresizing settings

| Direction | Type |
| --- | --- |
| Request | [`AutoresizingUpdateParams`](./src/resources/machines/autoresizing.ts) |
| Response | [`Settings`](./src/resources/machines/autoresizing.ts) |

```ts
const settings = await client.machines.autoresizing.update({
  machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
  enabled: false,
});
```

## `Organization`

### `Organization Autoresizing`

#### Read organization RAM autoresizing policy

| Direction | Type |
| --- | --- |
| Response | [`Policy`](./src/resources/organization/autoresizing.ts) |

```ts
const policy = await client.organization.autoresizing.retrieve();
```

#### Set organization RAM autoresizing policy

| Direction | Type |
| --- | --- |
| Request | [`AutoresizingUpdateParams`](./src/resources/organization/autoresizing.ts) |
| Response | [`Policy`](./src/resources/organization/autoresizing.ts) |

```ts
const policy = await client.organization.autoresizing.update({
  enabled: false,
});
```
