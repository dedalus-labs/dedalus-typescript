// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Dedalus from 'dedalus';

const client = new Dedalus({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource artifacts', () => {
  test('retrieve: only required params', async () => {
    const responsePromise = client.machines.artifacts.retrieve({
      machine_id: 'machine_id',
      artifact_id: 'artifact_id',
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
    const response = await client.machines.artifacts.retrieve({
      machine_id: 'machine_id',
      artifact_id: 'artifact_id',
    });
  });

  test('list: only required params', async () => {
    const responsePromise = client.machines.artifacts.list({ machine_id: 'machine_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: required and optional params', async () => {
    const response = await client.machines.artifacts.list({
      machine_id: 'machine_id',
      cursor: 'cursor',
      limit: 0,
    });
  });

  test('delete: only required params', async () => {
    const responsePromise = client.machines.artifacts.delete({
      machine_id: 'machine_id',
      artifact_id: 'artifact_id',
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
    const response = await client.machines.artifacts.delete({
      machine_id: 'machine_id',
      artifact_id: 'artifact_id',
    });
  });
});
