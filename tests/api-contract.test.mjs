import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { test } from 'node:test';
const { default: SDK } = await import(
  pathToFileURL(join(resolve(process.env.FEEDBACK_PACKAGE_ROOT ?? '.'), 'dist/esm/index.js'))
);
const { operations } = JSON.parse(
  readFileSync(new URL('../scalar-sdk.manifest.json', import.meta.url), 'utf8'),
);
for (const operation of operations) {
  test(`invariant ${operation.publicResource}.${operation.publicOperation} preserves its API route`, async () => {
    let sent;
    const client = new SDK({
      apiKey: 'fixture-key',
      baseURL: 'https://api.example.com',
      maxRetries: 0,
      fetch: async (url, options) => {
        sent = {
          url: new URL(url),
          method: options.method,
          auth: new Headers(options.headers).get('Authorization'),
        };
        return Response.json({ items: [] });
      },
    });
    const params = {};
    for (const name of operation.publicPathParams) params[name] = '017f22e2-79b0-7cc3-98c4-dc0c0c07398f';
    for (const parameter of operation.bodyParamDetails)
      if (parameter.required) params[parameter.name] = 'fixture';
    let resource = client;
    for (const part of operation.publicResource.split('.')) resource = resource[part];
    await resource[operation.publicOperation](params);
    assert.equal(sent.method, operation.method);
    assert.equal(sent.auth, 'Bearer fixture-key');
    assert.equal(
      sent.url.pathname,
      operation.path.replace(/\{[^}]+\}/g, '017f22e2-79b0-7cc3-98c4-dc0c0c07398f'),
    );
  });
}
