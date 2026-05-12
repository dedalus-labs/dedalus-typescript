// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Dedalus from 'dedalus';

const client = new Dedalus({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource machines', () => {
  test('create: only required params', async () => {
    const responsePromise = client.machines.create({
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
    const response = await client.machines.create({
      memory_mib: 0,
      storage_gib: 0,
      vcpu: 0,
      autosleep: 'autosleep',
    });
  });

  test('retrieve: only required params', async () => {
    const responsePromise = client.machines.retrieve({ machine_id: 'dm-3' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: required and optional params', async () => {
    const response = await client.machines.retrieve({ machine_id: 'dm-3' });
  });

  test('update: only required params', async () => {
    const responsePromise = client.machines.update({ machine_id: 'dm-3' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: required and optional params', async () => {
    const response = await client.machines.update({
      machine_id: 'dm-3',
      autosleep: 'autosleep',
      memory_mib: 0,
      storage_gib: 0,
      vcpu: 0,
    });
  });

  test('list', async () => {
    const responsePromise = client.machines.list();
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
      client.machines.list({ cursor: 'cursor', limit: 0 }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Dedalus.NotFoundError);
  });

  test('delete: only required params', async () => {
    const responsePromise = client.machines.delete({ machine_id: 'dm-3' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete: required and optional params', async () => {
    const response = await client.machines.delete({ machine_id: 'dm-3' });
  });

  test('sleep: only required params', async () => {
    const responsePromise = client.machines.sleep({ machine_id: 'dm-3' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('sleep: required and optional params', async () => {
    const response = await client.machines.sleep({ machine_id: 'dm-3' });
  });

  test('wake: only required params', async () => {
    const responsePromise = client.machines.wake({ machine_id: 'dm-3' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('wake: required and optional params', async () => {
    const response = await client.machines.wake({ machine_id: 'dm-3' });
  });

  test('watch: only required params', async () => {
    const responsePromise = client.machines.watch({ machine_id: 'dm-3' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('watch: required and optional params', async () => {
    const response = await client.machines.watch({ machine_id: 'dm-3', 'Last-Event-ID': 'Last-Event-ID' });
  });
});
