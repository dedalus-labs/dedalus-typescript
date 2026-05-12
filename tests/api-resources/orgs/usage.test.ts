// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Dedalus from 'dedalus';

const client = new Dedalus({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource usage', () => {
  test('retrieve: only required params', async () => {
    const responsePromise = client.orgs.usage.retrieve({ org_id: 'org_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: required and optional params', async () => {
    const response = await client.orgs.usage.retrieve({ org_id: 'org_id', period_start: 'period_start' });
  });

  test('getMachineStorageUsage: only required params', async () => {
    const responsePromise = client.orgs.usage.getMachineStorageUsage({ org_id: 'org_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('getMachineStorageUsage: required and optional params', async () => {
    const response = await client.orgs.usage.getMachineStorageUsage({
      org_id: 'org_id',
      machine_id: 'machine_id',
      period_end: 'period_end',
      period_start: 'period_start',
    });
  });

  test('getMachineUsage: only required params', async () => {
    const responsePromise = client.orgs.usage.getMachineUsage({ org_id: 'org_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('getMachineUsage: required and optional params', async () => {
    const response = await client.orgs.usage.getMachineUsage({
      org_id: 'org_id',
      granularity: 'granularity',
      machine_id: 'machine_id',
      period_end: 'period_end',
      period_start: 'period_start',
    });
  });
});
