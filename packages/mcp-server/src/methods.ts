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
    clientCallName: 'client.machines.create',
    fullyQualifiedName: 'machines.create',
    httpMethod: 'post',
    httpPath: '/v1/machines',
  },
  {
    clientCallName: 'client.machines.retrieve',
    fullyQualifiedName: 'machines.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/machines/{machine_id}',
  },
  {
    clientCallName: 'client.machines.update',
    fullyQualifiedName: 'machines.update',
    httpMethod: 'patch',
    httpPath: '/v1/machines/{machine_id}',
  },
  {
    clientCallName: 'client.machines.list',
    fullyQualifiedName: 'machines.list',
    httpMethod: 'get',
    httpPath: '/v1/machines',
  },
  {
    clientCallName: 'client.machines.delete',
    fullyQualifiedName: 'machines.delete',
    httpMethod: 'delete',
    httpPath: '/v1/machines/{machine_id}',
  },
  {
    clientCallName: 'client.machines.sleep',
    fullyQualifiedName: 'machines.sleep',
    httpMethod: 'post',
    httpPath: '/v1/machines/{machine_id}/sleep',
  },
  {
    clientCallName: 'client.machines.wake',
    fullyQualifiedName: 'machines.wake',
    httpMethod: 'post',
    httpPath: '/v1/machines/{machine_id}/wake',
  },
  {
    clientCallName: 'client.machines.ssh.create',
    fullyQualifiedName: 'machines.ssh.create',
    httpMethod: 'post',
    httpPath: '/v1/machines/{machine_id}/ssh',
  },
  {
    clientCallName: 'client.machines.ssh.retrieve',
    fullyQualifiedName: 'machines.ssh.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/machines/{machine_id}/ssh/{session_id}',
  },
  {
    clientCallName: 'client.machines.ssh.list',
    fullyQualifiedName: 'machines.ssh.list',
    httpMethod: 'get',
    httpPath: '/v1/machines/{machine_id}/ssh',
  },
  {
    clientCallName: 'client.machines.ssh.delete',
    fullyQualifiedName: 'machines.ssh.delete',
    httpMethod: 'delete',
    httpPath: '/v1/machines/{machine_id}/ssh/{session_id}',
  },
  {
    clientCallName: 'client.machines.executions.create',
    fullyQualifiedName: 'machines.executions.create',
    httpMethod: 'post',
    httpPath: '/v1/machines/{machine_id}/executions',
  },
  {
    clientCallName: 'client.machines.executions.retrieve',
    fullyQualifiedName: 'machines.executions.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/machines/{machine_id}/executions/{execution_id}',
  },
  {
    clientCallName: 'client.machines.executions.list',
    fullyQualifiedName: 'machines.executions.list',
    httpMethod: 'get',
    httpPath: '/v1/machines/{machine_id}/executions',
  },
  {
    clientCallName: 'client.machines.executions.delete',
    fullyQualifiedName: 'machines.executions.delete',
    httpMethod: 'delete',
    httpPath: '/v1/machines/{machine_id}/executions/{execution_id}',
  },
  {
    clientCallName: 'client.machines.executions.events',
    fullyQualifiedName: 'machines.executions.events',
    httpMethod: 'get',
    httpPath: '/v1/machines/{machine_id}/executions/{execution_id}/events',
  },
  {
    clientCallName: 'client.machines.executions.output',
    fullyQualifiedName: 'machines.executions.output',
    httpMethod: 'get',
    httpPath: '/v1/machines/{machine_id}/executions/{execution_id}/output',
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
