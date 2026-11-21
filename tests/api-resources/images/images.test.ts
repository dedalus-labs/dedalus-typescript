// File generated from our OpenAPI spec by Scalar. See README.md for details.

// Smoke tests for one resource; see smoke-support.ts for how to run them.
import { describe } from 'vitest';

import { client, smokeCase } from '../../smoke-support';

describe.concurrent('resource images', () => {
  smokeCase(
    'images.list:required',
    { operation: 'list', path: '/v1/images' },
    'list: only required params',
    async () => {
      const images = await client.images.list({
        limit: 100,
      });
    },
  );
  smokeCase(
    'images.list:all',
    { operation: 'list', path: '/v1/images' },
    'list: required and optional params',
    async () => {
      const images = await client.images.list({
        limit: 100,
        cursor: 'cursor',
      });
    },
  );
  smokeCase(
    'images.create:required',
    { operation: 'create', path: '/v1/images' },
    'create: only required params',
    async () => {
      const image = await client.images.create({
        platform: 'linux/amd64',
        source: {
          kind: '',
        },
      });
    },
  );
  smokeCase(
    'images.create:all',
    { operation: 'create', path: '/v1/images' },
    'create: required and optional params',
    async () => {
      const image = await client.images.create({
        credential_ref: '',
        name: '',
        platform: 'linux/amd64',
        source: {
          kind: '',
        },
      });
    },
  );
  smokeCase(
    'images.retrieve:single',
    { operation: 'retrieve', path: '/v1/images/{image_id}' },
    'retrieve',
    async () => {
      const image = await client.images.retrieve({
        image_id: 'imageID',
      });
    },
  );
  smokeCase(
    'images.update:single',
    { operation: 'update', path: '/v1/images/{image_id}' },
    'update',
    async () => {
      const image = await client.images.update({
        image_id: 'imageID',
        name: '',
      });
    },
  );
  smokeCase(
    'images.delete:single',
    { operation: 'delete', path: '/v1/images/{image_id}' },
    'delete',
    async () => {
      const image = await client.images.delete({
        image_id: 'imageID',
      });
    },
  );
});
