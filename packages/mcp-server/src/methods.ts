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
    clientCallName: 'client.workspaces.create',
    fullyQualifiedName: 'workspaces.create',
    httpMethod: 'post',
    httpPath: '/v1/workspaces',
  },
  {
    clientCallName: 'client.workspaces.retrieve',
    fullyQualifiedName: 'workspaces.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/workspaces/{workspace_id}',
  },
  {
    clientCallName: 'client.workspaces.update',
    fullyQualifiedName: 'workspaces.update',
    httpMethod: 'patch',
    httpPath: '/v1/workspaces/{workspace_id}',
  },
  {
    clientCallName: 'client.workspaces.list',
    fullyQualifiedName: 'workspaces.list',
    httpMethod: 'get',
    httpPath: '/v1/workspaces',
  },
  {
    clientCallName: 'client.workspaces.delete',
    fullyQualifiedName: 'workspaces.delete',
    httpMethod: 'delete',
    httpPath: '/v1/workspaces/{workspace_id}',
  },
  {
    clientCallName: 'client.workspaces.artifacts.retrieve',
    fullyQualifiedName: 'workspaces.artifacts.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/workspaces/{workspace_id}/artifacts/{artifact_id}',
  },
  {
    clientCallName: 'client.workspaces.artifacts.list',
    fullyQualifiedName: 'workspaces.artifacts.list',
    httpMethod: 'get',
    httpPath: '/v1/workspaces/{workspace_id}/artifacts',
  },
  {
    clientCallName: 'client.workspaces.artifacts.delete',
    fullyQualifiedName: 'workspaces.artifacts.delete',
    httpMethod: 'delete',
    httpPath: '/v1/workspaces/{workspace_id}/artifacts/{artifact_id}',
  },
  {
    clientCallName: 'client.workspaces.previews.create',
    fullyQualifiedName: 'workspaces.previews.create',
    httpMethod: 'post',
    httpPath: '/v1/workspaces/{workspace_id}/previews',
  },
  {
    clientCallName: 'client.workspaces.previews.retrieve',
    fullyQualifiedName: 'workspaces.previews.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/workspaces/{workspace_id}/previews/{preview_id}',
  },
  {
    clientCallName: 'client.workspaces.previews.list',
    fullyQualifiedName: 'workspaces.previews.list',
    httpMethod: 'get',
    httpPath: '/v1/workspaces/{workspace_id}/previews',
  },
  {
    clientCallName: 'client.workspaces.previews.delete',
    fullyQualifiedName: 'workspaces.previews.delete',
    httpMethod: 'delete',
    httpPath: '/v1/workspaces/{workspace_id}/previews/{preview_id}',
  },
  {
    clientCallName: 'client.workspaces.ssh.create',
    fullyQualifiedName: 'workspaces.ssh.create',
    httpMethod: 'post',
    httpPath: '/v1/workspaces/{workspace_id}/ssh',
  },
  {
    clientCallName: 'client.workspaces.ssh.retrieve',
    fullyQualifiedName: 'workspaces.ssh.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/workspaces/{workspace_id}/ssh/{session_id}',
  },
  {
    clientCallName: 'client.workspaces.ssh.list',
    fullyQualifiedName: 'workspaces.ssh.list',
    httpMethod: 'get',
    httpPath: '/v1/workspaces/{workspace_id}/ssh',
  },
  {
    clientCallName: 'client.workspaces.ssh.delete',
    fullyQualifiedName: 'workspaces.ssh.delete',
    httpMethod: 'delete',
    httpPath: '/v1/workspaces/{workspace_id}/ssh/{session_id}',
  },
  {
    clientCallName: 'client.workspaces.executions.create',
    fullyQualifiedName: 'workspaces.executions.create',
    httpMethod: 'post',
    httpPath: '/v1/workspaces/{workspace_id}/executions',
  },
  {
    clientCallName: 'client.workspaces.executions.retrieve',
    fullyQualifiedName: 'workspaces.executions.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/workspaces/{workspace_id}/executions/{execution_id}',
  },
  {
    clientCallName: 'client.workspaces.executions.list',
    fullyQualifiedName: 'workspaces.executions.list',
    httpMethod: 'get',
    httpPath: '/v1/workspaces/{workspace_id}/executions',
  },
  {
    clientCallName: 'client.workspaces.executions.delete',
    fullyQualifiedName: 'workspaces.executions.delete',
    httpMethod: 'delete',
    httpPath: '/v1/workspaces/{workspace_id}/executions/{execution_id}',
  },
  {
    clientCallName: 'client.workspaces.executions.events',
    fullyQualifiedName: 'workspaces.executions.events',
    httpMethod: 'get',
    httpPath: '/v1/workspaces/{workspace_id}/executions/{execution_id}/events',
  },
  {
    clientCallName: 'client.workspaces.executions.output',
    fullyQualifiedName: 'workspaces.executions.output',
    httpMethod: 'get',
    httpPath: '/v1/workspaces/{workspace_id}/executions/{execution_id}/output',
  },
  {
    clientCallName: 'client.workspaces.terminals.create',
    fullyQualifiedName: 'workspaces.terminals.create',
    httpMethod: 'post',
    httpPath: '/v1/workspaces/{workspace_id}/terminals',
  },
  {
    clientCallName: 'client.workspaces.terminals.retrieve',
    fullyQualifiedName: 'workspaces.terminals.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/workspaces/{workspace_id}/terminals/{terminal_id}',
  },
  {
    clientCallName: 'client.workspaces.terminals.list',
    fullyQualifiedName: 'workspaces.terminals.list',
    httpMethod: 'get',
    httpPath: '/v1/workspaces/{workspace_id}/terminals',
  },
  {
    clientCallName: 'client.workspaces.terminals.delete',
    fullyQualifiedName: 'workspaces.terminals.delete',
    httpMethod: 'delete',
    httpPath: '/v1/workspaces/{workspace_id}/terminals/{terminal_id}',
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
