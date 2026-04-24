// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Dedalus from 'dedalus';

const client = new Dedalus({ apiKey: 'My API Key', baseURL: process.env["TEST_API_BASE_URL"] ?? 'http://127.0.0.1:4010' });

describe('resource terminals', () => {
  test('create: only required params', async () => {
    const responsePromise = client.machines.terminals.create({
    machine_id: 'machine_id',
    height: 0,
    width: 0,
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
    const response = await client.machines.terminals.create({
    machine_id: 'machine_id',
    height: 0,
    width: 0,
    cwd: 'cwd',
    env: { foo: 'string' },
    shell: 'shell',
  });
  });

  test('retrieve: only required params', async () => {
    const responsePromise = client.machines.terminals.retrieve({ machine_id: 'machine_id', terminal_id: 'terminal_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: required and optional params', async () => {
    const response = await client.machines.terminals.retrieve({ machine_id: 'machine_id', terminal_id: 'terminal_id' });
  });

  test('list: only required params', async () => {
    const responsePromise = client.machines.terminals.list({ machine_id: 'machine_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: required and optional params', async () => {
    const response = await client.machines.terminals.list({
    machine_id: 'machine_id',
    cursor: 'cursor',
    limit: 0,
  });
  });

  test('delete: only required params', async () => {
    const responsePromise = client.machines.terminals.delete({ machine_id: 'machine_id', terminal_id: 'terminal_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete: required and optional params', async () => {
    const response = await client.machines.terminals.delete({ machine_id: 'machine_id', terminal_id: 'terminal_id' });
  });
});
