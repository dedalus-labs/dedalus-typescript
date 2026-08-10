# Dedalus

This library provides convenient access to the Dedalus REST API from TypeScript or JavaScript.

The full API of this library can be found in [api.md](./api.md).

<br />

## Contents

- [Installation](#installation)
- [API Reference](./api.md)
- [Authentication](#authentication)
- [Errors](#errors)
- [Client Options](#client-options)
- [Request Options](#request-options)
- [Retries and Timeouts](#retries-and-timeouts)
- [Helpers](#helpers)
- [Logging](#logging)
- [Requirements](#requirements)

<br />

## Installation

```sh
npm install dedalus
```

<br />

## Authentication

Pass credentials to the generated client constructor. Environment variables are read automatically when supported by the target runtime.

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `apiKey` | `string \| provider` | - | API key authentication using Bearer token Defaults to DEDALUS_API_KEY. |
| `xAPIKey` | `string \| provider` | - | API key authentication using X-API-Key header Defaults to DEDALUS_X_API_KEY. |
| `bearerAuth` | `string \| provider` | - | Dedalus API key in Authorization: Bearer <key>. Defaults to DEDALUS_BEARER_AUTH. |

Declared schemes:

- `ApiKeyAuth` API key in header `x-api-key`
- `BearerAuth` bearer token
- `Bearer` bearer token

<br />

## Errors

Non-success responses throw generated API errors. Error objects expose status, headers, response body, and request metadata where the target runtime supports it.

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
| `apiKey` | `string \| AuthTokenProvider` | `process.env["DEDALUS_API_KEY"]` | API key authentication using Bearer token |
| `xAPIKey` | `string \| AuthTokenProvider` | `process.env["DEDALUS_X_API_KEY"]` | API key authentication using X-API-Key header |
| `bearerAuth` | `string \| AuthTokenProvider` | `process.env["DEDALUS_BEARER_AUTH"]` | Dedalus API key in Authorization: Bearer <key>. |
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
| `idempotencyKey` | `string` | - | Idempotency key for retry-safe operations. |

<br />

## Retries and Timeouts

Generated clients support request timeouts and retry temporary failures such as network errors, 408, 409, 429, and 5xx responses. Retry delays honor `Retry-After` headers when present. Tune the retry and timeout client options shown above, or override them per request.

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
