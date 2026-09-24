---
name: dedalus-typescript-sdk
description: "TypeScript SDK for Dedalus API. Use when writing TypeScript code that calls Dedalus API with the dedalus package: installing it, constructing and authenticating the client, and calling API operations."
---

# Dedalus TypeScript SDK

Generated TypeScript client for Dedalus API, published as `dedalus`. Use the generated client instead of hand-writing HTTP requests.

## Install

```sh
npm install dedalus
```

## Client setup and authentication

```ts
import Dedalus from 'dedalus';

const client = new Dedalus({
  apiKey: process.env['DEDALUS_API_KEY'], // defaults to the DEDALUS_API_KEY env var
});
```

Provide credentials using the options below. Environment variables are read automatically when the target runtime supports them:

- `apiKey` (env: `DEDALUS_API_KEY`) — API key authentication using Bearer token
- `xAPIKey` (env: `DEDALUS_X_API_KEY`) — API key authentication using X-API-Key header

## Calling operations

```ts
import Dedalus from 'dedalus';

const client = new Dedalus({
  apiKey: process.env['DEDALUS_API_KEY'], // defaults to the DEDALUS_API_KEY env var
});

const machine = await client.machines.create({
  autosleep: '300s',
  memory_mib: 4096,
  storage_gib: 10,
  vcpu: 1,
});

console.log(machine.machine_id);
```

Method names, parameter shapes, and response types are generated from the API description — do not guess them. Look up the exact call signature in [api.md](./api.md) before writing a call.

## Pagination

List endpoints return paginated results you can iterate directly; the SDK fetches subsequent pages for you.

```ts
const page = await client.machines.list();
```

## Error handling

Non-success responses throw generated API errors. Error objects expose status, headers, response body, and request metadata where the target runtime supports it.

```ts
import { APIError } from 'dedalus';

try {
  const machine = await client.machines.create({
    autosleep: '300s',
    memory_mib: 4096,
    storage_gib: 10,
    vcpu: 1,
  });
} catch (err) {
  if (err instanceof APIError) {
    console.log(err.status, err.name, err.headers);
  }
  throw err;
}
```

## Requirements

- Node.js 20+, a modern browser, or any runtime with `fetch` support

## Reference files

- [README.md](./README.md) — full feature tour: client options, request options, retries and timeouts, logging.
- [api.md](./api.md) — complete catalogue of every operation with request and response types.
