// File generated from our OpenAPI spec by Scalar. See README.md for details.

// Smoke tests for one resource; see smoke-support.ts for how to run them.
import { describe } from 'vitest';

import { client, smokeCase } from '../../smoke-support';

describe.concurrent('resource uploads', () => {
  smokeCase(
    'images.uploads.create:single',
    { operation: 'create', path: '/v1/images/uploads' },
    'create',
    async () => {
      const reservation = await client.images.uploads.create({
        platform: '',
        sha256: '',
        size_bytes: 0,
      });
    },
  );
});
