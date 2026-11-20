// File generated from our OpenAPI spec by Scalar. See README.md for details.

// Smoke tests for one resource; see smoke-support.ts for how to run them.
import { describe } from 'vitest';

import { client, smokeCase } from '../../smoke-support';

describe.concurrent('resource autoresizing', () => {
  smokeCase(
    'machines.autoresizing.retrieve:single',
    { operation: 'retrieve', path: '/v1/machines/{machine_id}/autoresizing' },
    'retrieve',
    async () => {
      const policy = await client.machines.autoresizing.retrieve({
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
      });
    },
  );
  smokeCase(
    'machines.autoresizing.update:required',
    { operation: 'update', path: '/v1/machines/{machine_id}/autoresizing' },
    'update: only required params',
    async () => {
      const policy = await client.machines.autoresizing.update({
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
      });
    },
  );
  smokeCase(
    'machines.autoresizing.update:all',
    { operation: 'update', path: '/v1/machines/{machine_id}/autoresizing' },
    'update: required and optional params',
    async () => {
      const policy = await client.machines.autoresizing.update({
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
        cpu: 'on',
        cpu_max_vcpu: 0.25,
        memory: 'on',
        memory_max_mib: 256,
      });
    },
  );
});
