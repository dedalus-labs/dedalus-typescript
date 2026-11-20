// File generated from our OpenAPI spec by Scalar. See README.md for details.

// Smoke tests for one resource; see smoke-support.ts for how to run them.
import { describe } from 'vitest';

import { client, smokeCase } from '../../../smoke-support';

describe.concurrent('resource ports', () => {
  smokeCase(
    'machines.ports.list:single',
    { operation: 'list', path: '/v1/machines/{machine_id}/ports' },
    'list',
    async () => {
      const page = await client.machines.ports.list({
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
      });
    },
  );
  smokeCase(
    'machines.ports.create:required',
    { operation: 'create', path: '/v1/machines/{machine_id}/ports' },
    'create: only required params',
    async () => {
      const port = await client.machines.ports.create({
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
        port: 0,
        protocol: 'http',
        visibility: 'private',
      });
    },
  );
  smokeCase(
    'machines.ports.create:all',
    { operation: 'create', path: '/v1/machines/{machine_id}/ports' },
    'create: required and optional params',
    async () => {
      const port = await client.machines.ports.create({
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
        expires: 1,
        port: 0,
        protocol: 'http',
        visibility: 'private',
      });
    },
  );
  smokeCase(
    'machines.ports.retrieve:single',
    { operation: 'retrieve', path: '/v1/machines/{machine_id}/ports/{port_id}' },
    'retrieve',
    async () => {
      const port = await client.machines.ports.retrieve({
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
        port_id: 'portID',
      });
    },
  );
  smokeCase(
    'machines.ports.update:single',
    { operation: 'update', path: '/v1/machines/{machine_id}/ports/{port_id}' },
    'update',
    async () => {
      const port = await client.machines.ports.update({
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
        port_id: 'portID',
        visibility: 'public',
      });
    },
  );
  smokeCase(
    'machines.ports.delete:single',
    { operation: 'delete', path: '/v1/machines/{machine_id}/ports/{port_id}' },
    'delete',
    async () => {
      const port = await client.machines.ports.delete({
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
        port_id: 'portID',
      });
    },
  );
});
