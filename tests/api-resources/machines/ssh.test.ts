// File generated from our OpenAPI spec by Scalar. See README.md for details.

// Smoke tests for one resource; see smoke-support.ts for how to run them.
import { describe } from 'vitest';

import { client, smokeCase } from '../../smoke-support';

describe.concurrent('resource ssh', () => {
  smokeCase(
    'machines.ssh.list:single',
    { operation: 'list', path: '/v1/machines/{machine_id}/ssh' },
    'list',
    async () => {
      const page = await client.machines.ssh.list({
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
      });
    },
  );
  smokeCase(
    'machines.ssh.create:single',
    { operation: 'create', path: '/v1/machines/{machine_id}/ssh' },
    'create',
    async () => {
      const sshSession = await client.machines.ssh.create({
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
        public_key: '',
      });
    },
  );
  smokeCase(
    'machines.ssh.retrieve:single',
    { operation: 'retrieve', path: '/v1/machines/{machine_id}/ssh/{session_id}' },
    'retrieve',
    async () => {
      const sshSession = await client.machines.ssh.retrieve({
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
        session_id: 'sessionID',
      });
    },
  );
  smokeCase(
    'machines.ssh.delete:single',
    { operation: 'delete', path: '/v1/machines/{machine_id}/ssh/{session_id}' },
    'delete',
    async () => {
      const sshSession = await client.machines.ssh.delete({
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
        session_id: 'sessionID',
      });
    },
  );
});
