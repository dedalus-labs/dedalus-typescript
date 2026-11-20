// File generated from our OpenAPI spec by Scalar. See README.md for details.

// Smoke tests for one resource; see smoke-support.ts for how to run them.
import { describe } from 'vitest';

import { client, smokeCase } from '../../../smoke-support';

describe.concurrent('resource logs', () => {
  smokeCase(
    'machines.executions.logs.retrieve:single',
    { operation: 'retrieve', path: '/v1/machines/{machine_id}/executions/{execution_id}/logs' },
    'retrieve',
    async () => {
      const status = await client.machines.executions.logs.retrieve({
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
        execution_id: 'executionID',
      });
    },
  );
  smokeCase(
    'machines.executions.logs.createToken:single',
    { operation: 'createToken', path: '/v1/machines/{machine_id}/executions/{execution_id}/logs/token' },
    'createToken',
    async () => {
      const readToken = await client.machines.executions.logs.createToken({
        machine_id: '017f22e2-79b0-7cc3-98c4-dc0c0c07398f',
        execution_id: 'executionID',
      });
    },
  );
});
