// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'dedalus-mcp/filtering';
import { Metadata, asTextContentResult } from 'dedalus-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Dedalus from 'dedalus';

export const metadata: Metadata = {
  resource: 'pets',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/pet/{petId}/uploadImage',
  operationId: 'uploadFile',
};

export const tool: Tool = {
  name: 'upload_image_pets',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nuploads an image\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/pet_upload_image_response',\n  $defs: {\n    pet_upload_image_response: {\n      type: 'object',\n      properties: {\n        code: {\n          type: 'integer'\n        },\n        message: {\n          type: 'string'\n        },\n        type: {\n          type: 'string'\n        }\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      petId: {
        type: 'integer',
      },
      image: {
        type: 'string',
      },
      additionalMetadata: {
        type: 'string',
        description: 'Additional Metadata',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['petId', 'image'],
  },
  annotations: {},
};

export const handler = async (client: Dedalus, args: Record<string, unknown> | undefined) => {
  const { petId, image, jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.pets.uploadImage(petId, image, body)));
};

export default { metadata, tool, handler };
