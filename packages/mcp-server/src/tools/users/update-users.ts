// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'dedalus-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Dedalus from 'dedalus';

export const metadata: Metadata = {
  resource: 'users',
  operation: 'write',
  tags: [],
  httpMethod: 'put',
  httpPath: '/user/{username}',
  operationId: 'updateUser',
};

export const tool: Tool = {
  name: 'update_users',
  description: 'This can only be done by the logged in user.',
  inputSchema: {
    type: 'object',
    properties: {
      existingUsername: {
        type: 'string',
      },
      id: {
        type: 'integer',
      },
      email: {
        type: 'string',
      },
      firstName: {
        type: 'string',
      },
      lastName: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
      phone: {
        type: 'string',
      },
      username: {
        type: 'string',
      },
      userStatus: {
        type: 'integer',
        description: 'User Status',
      },
    },
    required: ['existingUsername'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Dedalus, args: Record<string, unknown> | undefined) => {
  const { existingUsername, ...body } = args as any;
  const response = await client.users.update(existingUsername, body).asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };
