// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Dedalus from 'dedalus';

const client = new Dedalus({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource workspaces', () => {
  test('create: only required params', async () => {
    const responsePromise = client.workspaces.create({
      memory_mib: 0,
      storage_gib: 0,
      vcpu: 0,
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.workspaces.create({
      memory_mib: 0,
      storage_gib: 0,
      vcpu: 0,
    });
  });

  test('retrieve', async () => {
    const responsePromise = client.workspaces.retrieve('workspace_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: only required params', async () => {
    const responsePromise = client.workspaces.update('workspace_id', { 'If-Match': 'If-Match' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: required and optional params', async () => {
    const response = await client.workspaces.update('workspace_id', {
      'If-Match': 'If-Match',
      memory_mib: 0,
      storage_gib: 0,
      vcpu: 0,
    });
  });

  test('list', async () => {
    const responsePromise = client.workspaces.list();
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
      client.workspaces.list({ cursor: 'cursor', limit: 0 }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Dedalus.NotFoundError);
  });

  test('delete: only required params', async () => {
    const responsePromise = client.workspaces.delete('workspace_id', { 'If-Match': 'If-Match' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete: required and optional params', async () => {
    const response = await client.workspaces.delete('workspace_id', { 'If-Match': 'If-Match' });
  });

  test('streamStatus', async () => {
    const responsePromise = client.workspaces.streamStatus('workspace_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('streamStatus: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.workspaces.streamStatus(
        'workspace_id',
        { 'Last-Event-ID': 'Last-Event-ID' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Dedalus.NotFoundError);
  });
});
