// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'dedalus-mcp/filtering';
import { Metadata, asTextContentResult } from 'dedalus-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Dedalus from 'dedalus';

export const metadata: Metadata = {
  resource: 'users',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/user/{username}',
  operationId: 'getUserByName',
};

export const tool: Tool = {
  name: 'retrieve_users',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGet user by user name\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/user',\n  $defs: {\n    user: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'integer'\n        },\n        email: {\n          type: 'string'\n        },\n        firstName: {\n          type: 'string'\n        },\n        lastName: {\n          type: 'string'\n        },\n        password: {\n          type: 'string'\n        },\n        phone: {\n          type: 'string'\n        },\n        username: {\n          type: 'string'\n        },\n        userStatus: {\n          type: 'integer',\n          description: 'User Status'\n        }\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['username'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Dedalus, args: Record<string, unknown> | undefined) => {
  const { username, jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.users.retrieve(username)));
};

export default { metadata, tool, handler };
