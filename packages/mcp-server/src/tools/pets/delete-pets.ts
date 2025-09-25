// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'dedalus-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Dedalus from 'dedalus';

export const metadata: Metadata = {
  resource: 'pets',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/pet/{petId}',
  operationId: 'deletePet',
};

export const tool: Tool = {
  name: 'delete_pets',
  description: 'delete a pet',
  inputSchema: {
    type: 'object',
    properties: {
      petId: {
        type: 'integer',
      },
    },
    required: ['petId'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Dedalus, args: Record<string, unknown> | undefined) => {
  const { petId, ...body } = args as any;
  const response = await client.pets.delete(petId).asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };
