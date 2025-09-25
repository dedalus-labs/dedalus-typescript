// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'dedalus-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Dedalus from 'dedalus';

export const metadata: Metadata = {
  resource: 'users',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/user/{username}',
  operationId: 'deleteUser',
};

export const tool: Tool = {
  name: 'delete_users',
  description: 'This can only be done by the logged in user.',
  inputSchema: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
      },
    },
    required: ['username'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Dedalus, args: Record<string, unknown> | undefined) => {
  const { username, ...body } = args as any;
  const response = await client.users.delete(username).asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };
