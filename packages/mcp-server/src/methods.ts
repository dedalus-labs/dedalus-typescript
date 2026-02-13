// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { McpOptions } from './options';

export type SdkMethod = {
  clientCallName: string;
  fullyQualifiedName: string;
  httpMethod?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'query';
  httpPath?: string;
};

export const sdkMethods: SdkMethod[] = [
  {
    clientCallName: 'client.pets.create',
    fullyQualifiedName: 'pets.create',
    httpMethod: 'post',
    httpPath: '/pet',
  },
  {
    clientCallName: 'client.pets.retrieve',
    fullyQualifiedName: 'pets.retrieve',
    httpMethod: 'get',
    httpPath: '/pet/{petId}',
  },
  {
    clientCallName: 'client.pets.update',
    fullyQualifiedName: 'pets.update',
    httpMethod: 'put',
    httpPath: '/pet',
  },
  {
    clientCallName: 'client.pets.delete',
    fullyQualifiedName: 'pets.delete',
    httpMethod: 'delete',
    httpPath: '/pet/{petId}',
  },
  {
    clientCallName: 'client.pets.findByStatus',
    fullyQualifiedName: 'pets.findByStatus',
    httpMethod: 'get',
    httpPath: '/pet/findByStatus',
  },
  {
    clientCallName: 'client.pets.findByTags',
    fullyQualifiedName: 'pets.findByTags',
    httpMethod: 'get',
    httpPath: '/pet/findByTags',
  },
  {
    clientCallName: 'client.pets.updateByID',
    fullyQualifiedName: 'pets.updateByID',
    httpMethod: 'post',
    httpPath: '/pet/{petId}',
  },
  {
    clientCallName: 'client.pets.uploadImage',
    fullyQualifiedName: 'pets.uploadImage',
    httpMethod: 'post',
    httpPath: '/pet/{petId}/uploadImage',
  },
  {
    clientCallName: 'client.store.listInventory',
    fullyQualifiedName: 'store.listInventory',
    httpMethod: 'get',
    httpPath: '/store/inventory',
  },
  {
    clientCallName: 'client.store.orders.create',
    fullyQualifiedName: 'store.orders.create',
    httpMethod: 'post',
    httpPath: '/store/order',
  },
  {
    clientCallName: 'client.store.orders.retrieve',
    fullyQualifiedName: 'store.orders.retrieve',
    httpMethod: 'get',
    httpPath: '/store/order/{orderId}',
  },
  {
    clientCallName: 'client.store.orders.delete',
    fullyQualifiedName: 'store.orders.delete',
    httpMethod: 'delete',
    httpPath: '/store/order/{orderId}',
  },
  {
    clientCallName: 'client.users.create',
    fullyQualifiedName: 'users.create',
    httpMethod: 'post',
    httpPath: '/user',
  },
  {
    clientCallName: 'client.users.retrieve',
    fullyQualifiedName: 'users.retrieve',
    httpMethod: 'get',
    httpPath: '/user/{username}',
  },
  {
    clientCallName: 'client.users.update',
    fullyQualifiedName: 'users.update',
    httpMethod: 'put',
    httpPath: '/user/{username}',
  },
  {
    clientCallName: 'client.users.delete',
    fullyQualifiedName: 'users.delete',
    httpMethod: 'delete',
    httpPath: '/user/{username}',
  },
  {
    clientCallName: 'client.users.createWithList',
    fullyQualifiedName: 'users.createWithList',
    httpMethod: 'post',
    httpPath: '/user/createWithList',
  },
  {
    clientCallName: 'client.users.login',
    fullyQualifiedName: 'users.login',
    httpMethod: 'get',
    httpPath: '/user/login',
  },
  {
    clientCallName: 'client.users.logout',
    fullyQualifiedName: 'users.logout',
    httpMethod: 'get',
    httpPath: '/user/logout',
  },
];

function allowedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  if (!options) {
    return undefined;
  }

  let allowedMethods: SdkMethod[];

  if (options.codeAllowHttpGets || options.codeAllowedMethods) {
    // Start with nothing allowed and then add into it from options
    let allowedMethodsSet = new Set<SdkMethod>();

    if (options.codeAllowHttpGets) {
      // Add all methods that map to an HTTP GET
      sdkMethods
        .filter((method) => method.httpMethod === 'get')
        .forEach((method) => allowedMethodsSet.add(method));
    }

    if (options.codeAllowedMethods) {
      // Add all methods that match any of the allowed regexps
      const allowedRegexps = options.codeAllowedMethods.map((pattern) => {
        try {
          return new RegExp(pattern);
        } catch (e) {
          throw new Error(
            `Invalid regex pattern for allowed method: "${pattern}": ${e instanceof Error ? e.message : e}`,
          );
        }
      });

      sdkMethods
        .filter((method) => allowedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)))
        .forEach((method) => allowedMethodsSet.add(method));
    }

    allowedMethods = Array.from(allowedMethodsSet);
  } else {
    // Start with everything allowed
    allowedMethods = [...sdkMethods];
  }

  if (options.codeBlockedMethods) {
    // Filter down based on blocked regexps
    const blockedRegexps = options.codeBlockedMethods.map((pattern) => {
      try {
        return new RegExp(pattern);
      } catch (e) {
        throw new Error(
          `Invalid regex pattern for blocked method: "${pattern}": ${e instanceof Error ? e.message : e}`,
        );
      }
    });

    allowedMethods = allowedMethods.filter(
      (method) => !blockedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)),
    );
  }

  return allowedMethods;
}

export function blockedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  const allowedMethods = allowedMethodsForCodeTool(options);
  if (!allowedMethods) {
    return undefined;
  }

  const allowedSet = new Set(allowedMethods.map((method) => method.fullyQualifiedName));

  // Return any methods that are not explicitly allowed
  return sdkMethods.filter((method) => !allowedSet.has(method.fullyQualifiedName));
}
