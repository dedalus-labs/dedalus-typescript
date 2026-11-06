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
  - [Resize machine](#resize-machine)
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
      - [Create execution log read token](#create-execution-log-read-token)
  - [`Machines Autoresizing`](#machines-autoresizing)
    - [Read this machine's autoresizing settings](#read-this-machines-autoresizing-settings)
    - [Set this machine's autoresizing settings](#set-this-machines-autoresizing-settings)
- [`Organization`](#organization)
  - [`Organization Autoresizing`](#organization-autoresizing)
    - [Read organization autoresizing policy](#read-organization-autoresizing-policy)
    - [Set organization autoresizing policy](#set-organization-autoresizing-policy)
- [`Images`](#images)
  - [List image IDs owned by the authenticated organization](#list-image-ids-owned-by-the-authenticated-organization)
  - [Register an immutable OCI image for preparation](#register-an-immutable-oci-image-for-preparation)
  - [Read preparation status for an organization-owned image](#read-preparation-status-for-an-organization-owned-image)
  - [Rename an organization-owned image](#rename-an-organization-owned-image)
  - [Delete an organization-owned image](#delete-an-organization-owned-image)
  - [`Images Uploads`](#images-uploads)
    - [Reserve an immutable Docker image archive upload](#reserve-an-immutable-docker-image-archive-upload)

## Setup

```ts
import Dedalus from 'dedalus';

const client = new Dedalus({
  browserToken: process.env['DEDALUS_BROWSER_TOKEN'], // defaults to the DEDALUS_BROWSER_TOKEN env var
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

Changes settings such as autosleep.

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

### Resize machine

Wakes a sleeping Machine, then waits up to 30 seconds for the host to confirm CPU and RAM. Returns the Machine with its confirmed size. After RESIZE_TIMEOUT, repeat the same request and Idempotency-Key to wait again.

| Direction | Type |
| --- | --- |
| Request | [`MachineResizeParams`](./src/resources/machines/machines.ts) |
| Response | [`MachineResizeResponse`](./src/resources/machines/machines.ts) |

```ts
const machine = await client.machines.resize({
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

#### Read this machine's autoresizing settings

| Direction | Type |
| --- | --- |
| Request | [`AutoresizingRetrieveParams`](./src/resources/machines/autoresizing.ts) |
| Response | [`Policy`](./src/resources/machines/autoresizing.ts) |

```ts
const policy = await client.machines.autoresizing.retrieve({
  machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
});
```

#### Set this machine's autoresizing settings

Changes RAM, CPU or both for this machine. An absent resource keeps its setting.

| Direction | Type |
| --- | --- |
| Request | [`AutoresizingUpdateParams`](./src/resources/machines/autoresizing.ts) |
| Response | [`Policy`](./src/resources/machines/autoresizing.ts) |

```ts
const policy = await client.machines.autoresizing.update({
  machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
});
```

## `Organization`

### `Organization Autoresizing`

#### Read organization autoresizing policy

| Direction | Type |
| --- | --- |
| Response | [`Policy`](./src/resources/organization/autoresizing.ts) |

```ts
const policy = await client.organization.autoresizing.retrieve();
```

#### Set organization autoresizing policy

Changes defaults copied to new Machines. Existing Machines retain their own policy.

| Direction | Type |
| --- | --- |
| Request | [`AutoresizingUpdateParams`](./src/resources/organization/autoresizing.ts) |
| Response | [`Policy`](./src/resources/organization/autoresizing.ts) |

```ts
const policy = await client.organization.autoresizing.update({});
```

## `Images`

### List image IDs owned by the authenticated organization

Pages through the organization's images in ID order. A deleted image is left out; it still reads by ID.

| Direction | Type |
| --- | --- |
| Request | [`ImageListParams`](./src/resources/images/images.ts) |
| Response | [`ImageList`](./src/resources/images/images.ts) |

```ts
const imageList = await client.images.list({
  limit: 100,
});
```

### Register an immutable OCI image for preparation

Requires an entitled organization and linux/amd64 on the current fleet. Acceptance queues preparation; only a ready image can launch a machine. Private registry credentials are not yet supported.

| Direction | Type |
| --- | --- |
| Request | [`ImageCreateParams`](./src/resources/images/images.ts) |
| Response | [`Image`](./src/resources/images/images.ts) |

```ts
const image = await client.images.create({
  platform: 'linux/amd64',
  source: {
    kind: '',
  },
});
```

### Read preparation status for an organization-owned image

A preparing image reports its stage, the worker's last step and an estimated percent of the whole preparation. A failed image names the cause: IMAGE_OS_UNSUPPORTED, IMAGE_SOURCE_INVALID, IMAGE_SOURCE_NOT_FOUND and IMAGE_SOURCE_UNAUTHORIZED describe the image or its reference and are final; IMAGE_SOURCE_UNAVAILABLE, IMAGE_REGISTRY_UNREACHABLE, IMAGE_REGISTRY_RATE_LIMITED, IMAGE_ARCHIVE_UNAVAILABLE and IMAGE_EXECUTION_FAILED describe this attempt and are retryable with a new idempotency key.

| Direction | Type |
| --- | --- |
| Request | [`ImageRetrieveParams`](./src/resources/images/images.ts) |
| Response | [`Image`](./src/resources/images/images.ts) |

```ts
const image = await client.images.retrieve({
  image_id: 'imageID',
});
```

### Rename an organization-owned image

Changes only the name. The image's source, platform and state are immutable.

| Direction | Type |
| --- | --- |
| Request | [`ImageUpdateParams`](./src/resources/images/images.ts) |
| Response | [`Image`](./src/resources/images/images.ts) |

```ts
const image = await client.images.update({
  image_id: 'imageID',
  name: '',
});
```

### Delete an organization-owned image

The image can create no new Machine and no longer counts against the organization's image limit. Machines already running from it keep working. The image stays readable, and deleting it again returns the same image.

| Direction | Type |
| --- | --- |
| Request | [`ImageDeleteParams`](./src/resources/images/images.ts) |
| Response | [`Image`](./src/resources/images/images.ts) |

```ts
const image = await client.images.delete({
  image_id: 'imageID',
});
```

### `Images Uploads`

#### Reserve an immutable Docker image archive upload

| Direction | Type |
| --- | --- |
| Request | [`UploadCreateParams`](./src/resources/images/uploads.ts) |
| Response | [`Reservation`](./src/resources/images/uploads.ts) |

```ts
const reservation = await client.images.uploads.create({
  platform: '',
  sha256: '',
  size_bytes: 0,
});
```
