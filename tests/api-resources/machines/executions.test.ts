// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Dedalus from 'dedalus';

const client = new Dedalus({ apiKey: 'My API Key', baseURL: process.env["TEST_API_BASE_URL"] ?? 'http://127.0.0.1:4010' });

describe('resource executions', () => {
  test('create: only required params', async () => {
    const responsePromise = client.machines.executions.create({ machine_id: 'machine_id', command: ['string'] });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.machines.executions.create({
    machine_id: 'machine_id',
    command: ['string'],
    cwd: 'cwd',
    env: { foo: 'string' },
    stdin: 'stdin',
    timeout_ms: 0,
  });
  });

  test('retrieve: only required params', async () => {
    const responsePromise = client.machines.executions.retrieve({ machine_id: 'machine_id', execution_id: 'execution_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: required and optional params', async () => {
    const response = await client.machines.executions.retrieve({ machine_id: 'machine_id', execution_id: 'execution_id' });
  });

  test('list: only required params', async () => {
    const responsePromise = client.machines.executions.list({ machine_id: 'machine_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: required and optional params', async () => {
    const response = await client.machines.executions.list({
    machine_id: 'machine_id',
    cursor: 'cursor',
    limit: 0,
  });
  });

  test('delete: only required params', async () => {
    const responsePromise = client.machines.executions.delete({ machine_id: 'machine_id', execution_id: 'execution_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete: required and optional params', async () => {
    const response = await client.machines.executions.delete({ machine_id: 'machine_id', execution_id: 'execution_id' });
  });

  test('events: only required params', async () => {
    const responsePromise = client.machines.executions.events({ machine_id: 'machine_id', execution_id: 'execution_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('events: required and optional params', async () => {
    const response = await client.machines.executions.events({
    machine_id: 'machine_id',
    execution_id: 'execution_id',
    cursor: 'cursor',
    limit: 0,
  });
  });

  test('output: only required params', async () => {
    const responsePromise = client.machines.executions.output({ machine_id: 'machine_id', execution_id: 'execution_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('output: required and optional params', async () => {
    const response = await client.machines.executions.output({ machine_id: 'machine_id', execution_id: 'execution_id' });
  });
});
