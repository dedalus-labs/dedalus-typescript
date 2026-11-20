# Dedalus

This library provides convenient access to the Dedalus REST API from TypeScript or JavaScript.

The full API of this library can be found in [api.md](./api.md).

<br />

## Contents

- [Installation](#installation)
- [Usage](#usage)
- [Image import](#image-import-nodejs)
- [API Reference](./api.md)
- [Authentication](#authentication)
- [Errors](#errors)
- [Client Options](#client-options)
- [Request Options](#request-options)
- [Retries and Timeouts](#retries-and-timeouts)
- [Pagination](#pagination)
- [Helpers](#helpers)
- [Logging](#logging)
- [Requirements](#requirements)

<br />

## Installation

```sh
npm install dedalus
```

<br />

## Image import (Node.js)

```ts
import Dedalus from 'dedalus';
import { importImage, pollImage } from 'dedalus/helpers/images';

const client = new Dedalus({ apiKey: process.env.DEDALUS_API_KEY });
const ready = await importImage(client, './my-app.tar', {
  name: 'my-app',
  platform: 'linux/amd64',
  onProgress: image => console.error(image.image_id, image.state),
});

// Alternatively, return after upload and registration, then wait later.
const accepted = await importImage(client, './my-app.tar', { wait: false });
const image = await pollImage(client, accepted.image_id);
```

These Node.js helpers stream a `docker save` archive, register it, and wait for
readiness by default. Use `wait: false` to return after registration.
`timeoutMs` defaults to 3,600,000 for the entire import; `pollIntervalMs` defaults
to 2,000. Pass an `AbortSignal` through `signal` to stop the client without cancelling
server preparation. Timeout and terminal failure errors identify the image through
`ImagePreparationError.image`; resume polling with its `image_id`.

Use the same `idempotencyKey` when retrying an import with unchanged input. Archives
must be regular, nonempty files of at most 5 GiB. Storage uploads use a separate
fetch transport without API credentials. The helpers require the image API to be
deployed and enabled for your organization; they do not change server access controls.

Custom image imports currently require an Ubuntu 24.04 `linux/amd64` Docker-save
archive. On Apple silicon, build or pull with `--platform linux/amd64` before
saving the archive. The image provides the filesystem; container entrypoint,
CMD, environment, working directory, and user settings are not applied. Start
processes using Machine exec or SSH after the Machine reaches running.

## Usage

```ts
import Dedalus from 'dedalus';

const client = new Dedalus({
  browserToken: process.env['DEDALUS_BROWSER_TOKEN'], // defaults to the DEDALUS_BROWSER_TOKEN env var
});

const machine = await client.machines.create({
  autosleep: '300s',
  memory_mib: 4096,
  storage_gib: 10,
  vcpu: 1,
});

console.log(machine.machine_id);
```

The examples in the following sections assume a `client` configured as shown above.

See the [API reference](./api.md) for every available operation.

<br />

## Authentication

Pass credentials to the generated client constructor. Environment variables are read automatically when supported by the target runtime.

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `apiKey` | `string \| AuthTokenProvider \| null` | - | Dedalus API key or short-lived delegated access token in `Authorization: Bearer <credential>`. Defaults to DEDALUS_API_KEY. |
| `xAPIKey` | `string \| AuthTokenProvider \| null` | - | Dedalus API key. Alternative to Bearer token. Defaults to DEDALUS_X_API_KEY. |
| `browserToken` | `string \| AuthTokenProvider \| null` | - | Credential for the BrowserAuth scheme. Defaults to DEDALUS_BROWSER_TOKEN. |

Declared schemes:

- `ApiKeyAuth` API key in header `x-api-key`
- `BearerAuth` bearer token
- `BrowserAuth` OAuth2/OpenID Connect

<br />

## Errors

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

Documented error statuses: `400`, `401`, `402`, `403`, `404`, `409`, `422`, `429`, `500`, `503`, `504`, `default`.

<br />

## Client Options

Configure the generated client by setting any of these options when you create it.

```ts
import Dedalus from 'dedalus';

const client = new Dedalus({
  timeout: 60000,
  maxRetries: 2,
  logLevel: 'debug',
});
```

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `apiKey` | `string \| AuthTokenProvider \| null` | `process.env["DEDALUS_API_KEY"]` | Dedalus API key or short-lived delegated access token in `Authorization: Bearer <credential>`. |
| `xAPIKey` | `string \| AuthTokenProvider \| null` | `process.env["DEDALUS_X_API_KEY"]` | Dedalus API key. Alternative to Bearer token. |
| `browserToken` | `string \| AuthTokenProvider \| null` | `process.env["DEDALUS_BROWSER_TOKEN"]` | Credential for the BrowserAuth scheme. |
| `baseURL` | `string \| null` | `process.env["DEDALUS_BASE_URL"]` | Override the default API base URL. Pass `null` when selecting a configured environment. |
| `timeout` | `number` | `60000` | Maximum time in milliseconds to wait for a response before aborting a request. |
| `maxRetries` | `number` | `2` | Number of retries for temporary failures. |
| `defaultHeaders` | `HeadersInit` | - | Headers sent with every request. |
| `defaultQuery` | `Record<string, string \| undefined>` | - | Query parameters sent with every request. |
| `fetchOptions` | `RequestInit` | - | Additional fetch options sent with every request. |
| `fetch` | `Fetch` | - | Custom fetch implementation. |
| `logLevel` | `"off" \| "error" \| "warn" \| "info" \| "debug" \| null` | `process.env["DEDALUS_LOG"]` | Controls request and retry debug logging. |
| `logger` | `Logger \| null` | `console` | Custom logger implementation. |

<br />

## Request Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `headers` | `HeadersInit` | - | Per-request headers. |
| `query` | `Record<string, unknown>` | - | Per-request query parameters. |
| `body` | `unknown` | - | Override the generated request body. |
| `timeout` | `number` | - | Per-request timeout in milliseconds. |
| `maxRetries` | `number` | - | Per-request retry count. |
| `signal` | `AbortSignal` | - | Abort an in-flight request. |
| `fetchOptions` | `RequestInit` | - | Per-request fetch options. |
| `idempotencyKey` | `string` | - | Idempotency key for retry-safe operations. Applies to this request and its retries. |

<br />

## Retries and Timeouts

Generated clients support request timeouts and retry temporary failures such as network errors, 408, 409, 429, and 5xx responses. Retry delays honor `Retry-After` headers when present. Tune the retry and timeout client options shown above, or override them per request.

<br />

## Pagination

List endpoints return paginated results you can iterate directly; the SDK fetches subsequent pages for you.

```ts
const page = await client.machines.list();
```

<br />

## Helpers

- Use `.withResponse()` on any request to inspect both parsed data and the raw `Response` object.
- Every operation returns an `APIPromise`, so you can `await` it directly or chain `.withResponse()`.

<br />

## Logging

- Set `logLevel: "debug"` to log request URLs, options, response status, response headers, and retry attempts.
- Pass a custom `logger` to route logs into your own observability pipeline.
- Set `logLevel: null` to disable environment-driven logging.

<br />

## Requirements

- Node.js 20+, a modern browser, or any runtime with `fetch` support

Powered by Scalar.

## Verify a local package

Run `pnpm install --frozen-lockfile --ignore-scripts`, `pnpm build`, and
`pnpm test:package` to install a tarball in an isolated directory and check both
ESM and CommonJS imports. The probe uses a public fixture URL and
does not send an API request. It catches runtime dependencies that a source-tree
build can hide.

CI runs the same package check. Edit `ci/sdk-ci.ts` and run `pnpm ci:generate`
to change its generated workflow.

<!-- @custom start -->
### Automatic retry identity

Client-generated idempotency keys use the API's 32-character UUIDv7 format.
Automatic retries reuse the original key. Independent submissions receive new
keys, and callers can still supply an explicit key when retrying a saved request.
<!-- @custom end -->
