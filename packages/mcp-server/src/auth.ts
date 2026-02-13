// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { IncomingMessage } from 'node:http';
import { ClientOptions } from 'dedalus';

export const parseAuthHeaders = (req: IncomingMessage, required?: boolean): Partial<ClientOptions> => {
  const apiKey = Array.isArray(req.headers['api_key']) ? req.headers['api_key'][0] : req.headers['api_key'];
  return { apiKey };
};
