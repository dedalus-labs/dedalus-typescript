// File generated from our OpenAPI spec by Scalar. See README.md for details.

// Smoke tests for one resource; see smoke-support.ts for how to run them.
import { describe } from 'vitest';

import { client, smokeCase } from '../../../smoke-support';

describe.concurrent('resource executions', () => {
  smokeCase(
    'machines.executions.list:single',
    { operation: 'list', path: '/v1/machines/{machine_id}/executions' },
    'list',
    async () => {
      const page = await client.machines.executions.list({
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
      });
    },
  );
  smokeCase(
    'machines.executions.create:required',
    { operation: 'create', path: '/v1/machines/{machine_id}/executions' },
    'create: only required params',
    async () => {
      const execution = await client.machines.executions.create({
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
        command: [''],
      });
    },
  );
  smokeCase(
    'machines.executions.create:all',
    { operation: 'create', path: '/v1/machines/{machine_id}/executions' },
    'create: required and optional params',
    async () => {
      const execution = await client.machines.executions.create({
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
        command: [''],
        cwd: '',
        env: {},
        stdin: '',
        timeout_ms: 0,
      });
    },
  );
  smokeCase(
    'machines.executions.retrieve:single',
    { operation: 'retrieve', path: '/v1/machines/{machine_id}/executions/{execution_id}' },
    'retrieve',
    async () => {
      const execution = await client.machines.executions.retrieve({
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
        execution_id: 'executionID',
      });
    },
  );
  smokeCase(
    'machines.executions.delete:single',
    { operation: 'delete', path: '/v1/machines/{machine_id}/executions/{execution_id}' },
    'delete',
    async () => {
      const execution = await client.machines.executions.delete({
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
        execution_id: 'executionID',
      });
    },
  );
  smokeCase(
    'machines.executions.output:single',
    { operation: 'output', path: '/v1/machines/{machine_id}/executions/{execution_id}/output' },
    'output',
    async () => {
      const execution = await client.machines.executions.output({
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
        execution_id: 'executionID',
      });
    },
  );
  smokeCase(
    'machines.executions.events:single',
    { operation: 'events', path: '/v1/machines/{machine_id}/executions/{execution_id}/events' },
    'events',
    async () => {
      const page = await client.machines.executions.events({
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
        execution_id: 'executionID',
      });
    },
  );
});
