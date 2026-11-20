// File generated from our OpenAPI spec by Scalar. See README.md for details.

// Smoke tests for one resource; see smoke-support.ts for how to run them.
import { describe } from 'vitest';

import { client, smokeCase } from '../../smoke-support';

describe.concurrent('resource machines', () => {
  smokeCase('machines.list:single', { operation: 'list', path: '/v1/machines' }, 'list', async () => {
    const page = await client.machines.list();
  });
  smokeCase(
    'machines.create:required',
    { operation: 'create', path: '/v1/machines' },
    'create: only required params',
    async () => {
      const machine = await client.machines.create({
        autosleep: '300s',
        memory_mib: 4096,
        storage_gib: 10,
        vcpu: 1,
      });
    },
  );
  smokeCase(
    'machines.create:all',
    { operation: 'create', path: '/v1/machines' },
    'create: required and optional params',
    async () => {
      const machine = await client.machines.create({
        autosleep: '300s',
        image_id: 'x',
        memory_mib: 4096,
        storage_gib: 10,
        vcpu: 1,
      });
    },
  );
  smokeCase(
    'machines.retrieve:single',
    { operation: 'retrieve', path: '/v1/machines/{machine_id}' },
    'retrieve',
    async () => {
      const machine = await client.machines.retrieve({
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
      });
    },
  );
  smokeCase(
    'machines.update:required',
    { operation: 'update', path: '/v1/machines/{machine_id}' },
    'update: only required params',
    async () => {
      const machine = await client.machines.update({
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
      });
    },
  );
  smokeCase(
    'machines.update:all',
    { operation: 'update', path: '/v1/machines/{machine_id}' },
    'update: required and optional params',
    async () => {
      const machine = await client.machines.update({
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
        autosleep: '',
        storage_gib: 0,
      });
    },
  );
  smokeCase(
    'machines.delete:required',
    { operation: 'delete', path: '/v1/machines/{machine_id}' },
    'delete: only required params',
    async () => {
      const machine = await client.machines.delete({
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
      });
    },
  );
  smokeCase(
    'machines.delete:all',
    { operation: 'delete', path: '/v1/machines/{machine_id}' },
    'delete: required and optional params',
    async () => {
      const machine = await client.machines.delete({
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
        force: true,
      });
    },
  );
  smokeCase(
    'machines.sleep:single',
    { operation: 'sleep', path: '/v1/machines/{machine_id}/sleep' },
    'sleep',
    async () => {
      const machine = await client.machines.sleep({
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
      });
    },
  );
  smokeCase(
    'machines.wake:single',
    { operation: 'wake', path: '/v1/machines/{machine_id}/wake' },
    'wake',
    async () => {
      const machine = await client.machines.wake({
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
      });
    },
  );
  smokeCase(
    'machines.reboot:required',
    { operation: 'reboot', path: '/v1/machines/{machine_id}/reboot' },
    'reboot: only required params',
    async () => {
      const machine = await client.machines.reboot({
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
      });
    },
  );
  smokeCase(
    'machines.reboot:all',
    { operation: 'reboot', path: '/v1/machines/{machine_id}/reboot' },
    'reboot: required and optional params',
    async () => {
      const machine = await client.machines.reboot({
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
        force: true,
      });
    },
  );
  smokeCase(
    'machines.resize:required',
    { operation: 'resize', path: '/v1/machines/{machine_id}/resize' },
    'resize: only required params',
    async () => {
      const machine = await client.machines.resize({
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
      });
    },
  );
  smokeCase(
    'machines.resize:all',
    { operation: 'resize', path: '/v1/machines/{machine_id}/resize' },
    'resize: required and optional params',
    async () => {
      const machine = await client.machines.resize({
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
        memory_mib: 0,
        vcpu: 0,
      });
    },
  );
});
