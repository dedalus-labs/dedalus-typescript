// File generated from our OpenAPI spec by Scalar. See README.md for details.

// Smoke tests for one resource; see smoke-support.ts for how to run them.
import { describe } from 'vitest';

import { client, smokeCase } from '../../../smoke-support';

describe.concurrent('resource accessKeys', () => {
  smokeCase(
    'machines.ports.accessKeys.list:required',
    { operation: 'list', path: '/v1/machines/{machine_id}/ports/{port_id}/access-keys' },
    'list: only required params',
    async () => {
      const accessKey = await client.machines.ports.accessKeys.list({
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
        port_id: 'portID',
      });
    },
  );
  smokeCase(
    'machines.ports.accessKeys.list:all',
    { operation: 'list', path: '/v1/machines/{machine_id}/ports/{port_id}/access-keys' },
    'list: required and optional params',
    async () => {
      const accessKey = await client.machines.ports.accessKeys.list({
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
        port_id: 'portID',
        limit: 1,
        cursor: 'cursor',
      });
    },
  );
  smokeCase(
    'machines.ports.accessKeys.mint:single',
    { operation: 'mint', path: '/v1/machines/{machine_id}/ports/{port_id}/access-keys' },
    'mint',
    async () => {
      const accessKey = await client.machines.ports.accessKeys.mint({
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
        port_id: 'portID',
        expires_in: 1,
      });
    },
  );
  smokeCase(
    'machines.ports.accessKeys.revoke:single',
    { operation: 'revoke', path: '/v1/machines/{machine_id}/ports/{port_id}/access-keys/{access_key_id}' },
    'revoke',
    async () => {
      const accessKey = await client.machines.ports.accessKeys.revoke({
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
        port_id: 'portID',
        access_key_id: 'accessKeyID',
      });
    },
  );
  smokeCase(
    'machines.ports.accessKeys.rotate:single',
    {
      operation: 'rotate',
      path: '/v1/machines/{machine_id}/ports/{port_id}/access-keys/{access_key_id}/rotate',
    },
    'rotate',
    async () => {
      const accessKey = await client.machines.ports.accessKeys.rotate({
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
        port_id: 'portID',
        access_key_id: 'accessKeyID',
        expires_in: 1,
      });
    },
  );
});
