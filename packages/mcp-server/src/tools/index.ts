// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, Endpoint, HandlerFunction } from './types';

export { Metadata, Endpoint, HandlerFunction };

import create_pets from './pets/create-pets';
import retrieve_pets from './pets/retrieve-pets';
import update_pets from './pets/update-pets';
import delete_pets from './pets/delete-pets';
import find_by_status_pets from './pets/find-by-status-pets';
import find_by_tags_pets from './pets/find-by-tags-pets';
import update_by_id_pets from './pets/update-by-id-pets';
import upload_image_pets from './pets/upload-image-pets';
import list_inventory_store from './store/list-inventory-store';
import create_store_orders from './store/orders/create-store-orders';
import retrieve_store_orders from './store/orders/retrieve-store-orders';
import delete_store_orders from './store/orders/delete-store-orders';
import create_users from './users/create-users';
import retrieve_users from './users/retrieve-users';
import update_users from './users/update-users';
import delete_users from './users/delete-users';
import create_with_list_users from './users/create-with-list-users';
import login_users from './users/login-users';
import logout_users from './users/logout-users';

export const endpoints: Endpoint[] = [];

function addEndpoint(endpoint: Endpoint) {
  endpoints.push(endpoint);
}

addEndpoint(create_pets);
addEndpoint(retrieve_pets);
addEndpoint(update_pets);
addEndpoint(delete_pets);
addEndpoint(find_by_status_pets);
addEndpoint(find_by_tags_pets);
addEndpoint(update_by_id_pets);
addEndpoint(upload_image_pets);
addEndpoint(list_inventory_store);
addEndpoint(create_store_orders);
addEndpoint(retrieve_store_orders);
addEndpoint(delete_store_orders);
addEndpoint(create_users);
addEndpoint(retrieve_users);
addEndpoint(update_users);
addEndpoint(delete_users);
addEndpoint(create_with_list_users);
addEndpoint(login_users);
addEndpoint(logout_users);

export type Filter = {
  type: 'resource' | 'operation' | 'tag' | 'tool';
  op: 'include' | 'exclude';
  value: string;
};

export function query(filters: Filter[], endpoints: Endpoint[]): Endpoint[] {
  const allExcludes = filters.length > 0 && filters.every((filter) => filter.op === 'exclude');
  const unmatchedFilters = new Set(filters);

  const filtered = endpoints.filter((endpoint: Endpoint) => {
    let included = false || allExcludes;

    for (const filter of filters) {
      if (match(filter, endpoint)) {
        unmatchedFilters.delete(filter);
        included = filter.op === 'include';
      }
    }

    return included;
  });

  // Check if any filters didn't match
  const unmatched = Array.from(unmatchedFilters).filter((f) => f.type === 'tool' || f.type === 'resource');
  if (unmatched.length > 0) {
    throw new Error(
      `The following filters did not match any endpoints: ${unmatched
        .map((f) => `${f.type}=${f.value}`)
        .join(', ')}`,
    );
  }

  return filtered;
}

function match({ type, value }: Filter, endpoint: Endpoint): boolean {
  switch (type) {
    case 'resource': {
      const regexStr = '^' + normalizeResource(value).replace(/\*/g, '.*') + '$';
      const regex = new RegExp(regexStr);
      return regex.test(normalizeResource(endpoint.metadata.resource));
    }
    case 'operation':
      return endpoint.metadata.operation === value;
    case 'tag':
      return endpoint.metadata.tags.includes(value);
    case 'tool':
      return endpoint.tool.name === value;
  }
}

function normalizeResource(resource: string): string {
  return resource.toLowerCase().replace(/[^a-z.*\-_]*/g, '');
}
