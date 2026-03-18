// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Dedalus from 'dedalus';

const client = new Dedalus({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource executions', () => {
  test('create: only required params', async () => {
    const responsePromise = client.workspaces.executions.create('workspace_id', { command: ['string'] });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.workspaces.executions.create('workspace_id', {
      command: ['string'],
      cwd: 'cwd',
      env: { foo: 'string' },
      stdin: 'stdin',
      timeout_ms: 0,
      wake_if_needed: true,
    });
  });

  test('retrieve: only required params', async () => {
    const responsePromise = client.workspaces.executions.retrieve('execution_id', {
      workspace_id: 'workspace_id',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: required and optional params', async () => {
    const response = await client.workspaces.executions.retrieve('execution_id', {
      workspace_id: 'workspace_id',
    });
  });

  test('list', async () => {
    const responsePromise = client.workspaces.executions.list('workspace_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.workspaces.executions.list(
        'workspace_id',
        { cursor: 'cursor', limit: 0 },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Dedalus.NotFoundError);
  });

  test('delete: only required params', async () => {
    const responsePromise = client.workspaces.executions.delete('execution_id', {
      workspace_id: 'workspace_id',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete: required and optional params', async () => {
    const response = await client.workspaces.executions.delete('execution_id', {
      workspace_id: 'workspace_id',
    });
  });

  test('events: only required params', async () => {
    const responsePromise = client.workspaces.executions.events('execution_id', {
      workspace_id: 'workspace_id',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('events: required and optional params', async () => {
    const response = await client.workspaces.executions.events('execution_id', {
      workspace_id: 'workspace_id',
      cursor: 'cursor',
      limit: 0,
    });
  });

  test('output: only required params', async () => {
    const responsePromise = client.workspaces.executions.output('execution_id', {
      workspace_id: 'workspace_id',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('output: required and optional params', async () => {
    const response = await client.workspaces.executions.output('execution_id', {
      workspace_id: 'workspace_id',
    });
  });
});
