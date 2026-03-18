// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Executions extends APIResource {
  /**
   * Create execution
   */
  create(workspaceID: string, body: ExecutionCreateParams, options?: RequestOptions): APIPromise<Execution> {
    return this._client.post(path`/v1/workspaces/${workspaceID}/executions`, { body, ...options });
  }

  /**
   * Get execution
   */
  retrieve(
    executionID: string,
    params: ExecutionRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<Execution> {
    const { workspace_id } = params;
    return this._client.get(path`/v1/workspaces/${workspace_id}/executions/${executionID}`, options);
  }

  /**
   * List executions
   */
  list(
    workspaceID: string,
    query: ExecutionListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ExecutionsCursorPage, Execution> {
    return this._client.getAPIList(path`/v1/workspaces/${workspaceID}/executions`, CursorPage<Execution>, {
      query,
      ...options,
    });
  }

  /**
   * Delete execution
   */
  delete(
    executionID: string,
    params: ExecutionDeleteParams,
    options?: RequestOptions,
  ): APIPromise<Execution> {
    const { workspace_id } = params;
    return this._client.delete(path`/v1/workspaces/${workspace_id}/executions/${executionID}`, options);
  }

  /**
   * List execution events
   */
  events(
    executionID: string,
    params: ExecutionEventsParams,
    options?: RequestOptions,
  ): PagePromise<ExecutionEventsCursorPage, ExecutionEvent> {
    const { workspace_id, ...query } = params;
    return this._client.getAPIList(
      path`/v1/workspaces/${workspace_id}/executions/${executionID}/events`,
      CursorPage<ExecutionEvent>,
      { query, ...options },
    );
  }

  /**
   * Get execution output
   */
  output(
    executionID: string,
    params: ExecutionOutputParams,
    options?: RequestOptions,
  ): APIPromise<ExecutionOutput> {
    const { workspace_id } = params;
    return this._client.get(path`/v1/workspaces/${workspace_id}/executions/${executionID}/output`, options);
  }
}

export type ExecutionsCursorPage = CursorPage<Execution>;

export type ExecutionEventsCursorPage = CursorPage<ExecutionEvent>;

export interface ArtifactRef {
  artifact_id: string;

  name: string;
}

export interface Execution {
  command: Array<string> | null;

  created_at: string;

  execution_id: string;

  status: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired';

  workspace_id: string;

  artifacts?: Array<ArtifactRef> | null;

  completed_at?: string;

  cwd?: string;

  env_keys?: Array<string> | null;

  error_code?: string;

  error_message?: string;

  exit_code?: number;

  expires_at?: string;

  retry_after_ms?: number;

  signal?: number;

  started_at?: string;

  stderr_bytes?: number;

  stderr_truncated?: boolean;

  stdout_bytes?: number;

  stdout_truncated?: boolean;
}

export interface ExecutionCreateParams {
  command: Array<string> | null;

  cwd?: string;

  env?: { [key: string]: string };

  stdin?: string;

  timeout_ms?: number;

  wake_if_needed?: boolean;
}

export interface ExecutionEvent {
  at: string;

  sequence: number;

  type: 'lifecycle' | 'stdout' | 'stderr';

  chunk?: string;

  error_code?: string;

  error_message?: string;

  exit_code?: number;

  signal?: number;

  status?: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired';
}

export interface ExecutionEvents {
  items: Array<ExecutionEvent> | null;

  next_cursor?: string;
}

export interface ExecutionList {
  items: Array<Execution> | null;

  next_cursor?: string;
}

export interface ExecutionOutput {
  execution_id: string;

  stderr?: string;

  stderr_bytes?: number;

  stderr_truncated?: boolean;

  stdout?: string;

  stdout_bytes?: number;

  stdout_truncated?: boolean;
}

export interface ExecutionCreateParams {
  command: Array<string> | null;

  cwd?: string;

  env?: { [key: string]: string };

  stdin?: string;

  timeout_ms?: number;

  wake_if_needed?: boolean;
}

export interface ExecutionRetrieveParams {
  workspace_id: string;
}

export interface ExecutionListParams extends CursorPageParams {}

export interface ExecutionDeleteParams {
  workspace_id: string;
}

export interface ExecutionEventsParams extends CursorPageParams {
  /**
   * Path param
   */
  workspace_id: string;
}

export interface ExecutionOutputParams {
  workspace_id: string;
}

export declare namespace Executions {
  export {
    type ArtifactRef as ArtifactRef,
    type Execution as Execution,
    type ExecutionCreateParams as ExecutionCreateParams,
    type ExecutionEvent as ExecutionEvent,
    type ExecutionEvents as ExecutionEvents,
    type ExecutionList as ExecutionList,
    type ExecutionOutput as ExecutionOutput,
    type ExecutionsCursorPage as ExecutionsCursorPage,
    type ExecutionEventsCursorPage as ExecutionEventsCursorPage,
    type ExecutionRetrieveParams as ExecutionRetrieveParams,
    type ExecutionListParams as ExecutionListParams,
    type ExecutionDeleteParams as ExecutionDeleteParams,
    type ExecutionEventsParams as ExecutionEventsParams,
    type ExecutionOutputParams as ExecutionOutputParams,
  };
}
