// File generated from our OpenAPI spec by Scalar. See README.md for details.

// Smoke tests for one resource; see smoke-support.ts for how to run them.
import { describe } from 'vitest';

import { client, smokeCase } from '../../smoke-support';

describe.concurrent('resource autoresizing', () => {
  smokeCase(
    'organization.autoresizing.retrieve:single',
    { operation: 'retrieve', path: '/v1/organization/autoresizing' },
    'retrieve',
    async () => {
      const policy = await client.organization.autoresizing.retrieve();
    },
  );
  smokeCase(
    'organization.autoresizing.update:required',
    { operation: 'update', path: '/v1/organization/autoresizing' },
    'update: only required params',
    async () => {
      const policy = await client.organization.autoresizing.update({});
    },
  );
  smokeCase(
    'organization.autoresizing.update:all',
    { operation: 'update', path: '/v1/organization/autoresizing' },
    'update: required and optional params',
    async () => {
      const policy = await client.organization.autoresizing.update({
        cpu: 'on',
        cpu_max_vcpu: 0.25,
        memory: 'on',
        memory_max_mib: 256,
      });
    },
  );
});
