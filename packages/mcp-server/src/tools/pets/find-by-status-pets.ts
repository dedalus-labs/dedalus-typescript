// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'dedalus-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'dedalus-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Dedalus from 'dedalus';

export const metadata: Metadata = {
  resource: 'pets',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/pet/findByStatus',
  operationId: 'findPetsByStatus',
};

export const tool: Tool = {
  name: 'find_by_status_pets',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nMultiple status values can be provided with comma separated strings\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/pet_find_by_status_response',\n  $defs: {\n    pet_find_by_status_response: {\n      type: 'array',\n      items: {\n        $ref: '#/$defs/pet'\n      }\n    },\n    pet: {\n      type: 'object',\n      properties: {\n        name: {\n          type: 'string'\n        },\n        photoUrls: {\n          type: 'array',\n          items: {\n            type: 'string'\n          }\n        },\n        id: {\n          type: 'integer'\n        },\n        category: {\n          $ref: '#/$defs/category'\n        },\n        status: {\n          type: 'string',\n          description: 'pet status in the store',\n          enum: [            'available',\n            'pending',\n            'sold'\n          ]\n        },\n        tags: {\n          type: 'array',\n          items: {\n            type: 'object',\n            properties: {\n              id: {\n                type: 'integer'\n              },\n              name: {\n                type: 'string'\n              }\n            }\n          }\n        }\n      },\n      required: [        'name',\n        'photoUrls'\n      ]\n    },\n    category: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'integer'\n        },\n        name: {\n          type: 'string'\n        }\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      status: {
        type: 'string',
        description: 'Status values that need to be considered for filter',
        enum: ['available', 'pending', 'sold'],
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Dedalus, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.pets.findByStatus(body)));
  } catch (error) {
    if (isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
