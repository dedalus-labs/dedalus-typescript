# Dedalus TypeScript API

Pass an API key to `new Dedalus({ apiKey })`. Resource methods accept parameter objects; see their TypeScript declarations for required fields.

| Method | HTTP operation |
| --- | --- |
| `client.machines.list()` | `GET /v1/machines` |
| `client.machines.create()` | `POST /v1/machines` |
| `client.machines.retrieve()` | `GET /v1/machines/{machine_id}` |
| `client.machines.update()` | `PATCH /v1/machines/{machine_id}` |
| `client.machines.delete()` | `DELETE /v1/machines/{machine_id}` |
| `client.machines.sleep()` | `POST /v1/machines/{machine_id}/sleep` |
| `client.machines.wake()` | `POST /v1/machines/{machine_id}/wake` |
| `client.machines.reboot()` | `POST /v1/machines/{machine_id}/reboot` |
| `client.machines.ssh.list()` | `GET /v1/machines/{machine_id}/ssh` |
| `client.machines.ssh.create()` | `POST /v1/machines/{machine_id}/ssh` |
| `client.machines.ssh.retrieve()` | `GET /v1/machines/{machine_id}/ssh/{session_id}` |
| `client.machines.ssh.delete()` | `DELETE /v1/machines/{machine_id}/ssh/{session_id}` |
| `client.machines.executions.list()` | `GET /v1/machines/{machine_id}/executions` |
| `client.machines.executions.create()` | `POST /v1/machines/{machine_id}/executions` |
| `client.machines.executions.retrieve()` | `GET /v1/machines/{machine_id}/executions/{execution_id}` |
| `client.machines.executions.delete()` | `DELETE /v1/machines/{machine_id}/executions/{execution_id}` |
| `client.machines.executions.output()` | `GET /v1/machines/{machine_id}/executions/{execution_id}/output` |
| `client.machines.executions.events()` | `GET /v1/machines/{machine_id}/executions/{execution_id}/events` |
| `client.machines.executions.logs.retrieve()` | `GET /v1/machines/{machine_id}/executions/{execution_id}/logs` |
| `client.machines.executions.logs.reauthorize()` | `POST /v1/machines/{machine_id}/executions/{execution_id}/logs/reauthorize` |
| `client.machines.executions.logs.createToken()` | `POST /v1/machines/{machine_id}/executions/{execution_id}/logs/token` |
| `client.machines.autoresizing.retrieve()` | `GET /v1/machines/{machine_id}/autoresizing` |
| `client.machines.autoresizing.update()` | `PUT /v1/machines/{machine_id}/autoresizing` |
| `client.organization.autoresizing.retrieve()` | `GET /v1/organization/autoresizing` |
| `client.organization.autoresizing.update()` | `PUT /v1/organization/autoresizing` |

```ts
const machine = await client.machines.create({ vcpu: 1, memory_mib: 4096 });
const execution = await client.machines.executions.create({
  machine_id: machine.machine_id, command: ["echo", "hello"],
});
```
