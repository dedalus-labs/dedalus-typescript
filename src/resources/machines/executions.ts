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
  create(params: ExecutionCreateParams, options?: RequestOptions): APIPromise<Execution> {
    const { machine_id, ...body } = params
    return this._client.post(path`/v1/machines/${machine_id}/executions`, { body, ...options });
  }

  /**
   * Get execution
   */
  retrieve(params: ExecutionRetrieveParams, options?: RequestOptions): APIPromise<Execution> {
    const { machine_id, execution_id } = params
    return this._client.get(path`/v1/machines/${machine_id}/executions/${execution_id}`, options);
  }

  /**
   * List executions
   */
  list(params: ExecutionListParams, options?: RequestOptions): PagePromise<ExecutionsCursorPage, Execution> {
    const { machine_id, ...query } = params
    return this._client.getAPIList(path`/v1/machines/${machine_id}/executions`, CursorPage<Execution>, { query, ...options });
  }

  /**
   * Delete execution
   */
  delete(params: ExecutionDeleteParams, options?: RequestOptions): APIPromise<Execution> {
    const { machine_id, execution_id } = params
    return this._client.delete(path`/v1/machines/${machine_id}/executions/${execution_id}`, options);
  }

  /**
   * List execution events
   */
  events(params: ExecutionEventsParams, options?: RequestOptions): PagePromise<ExecutionEventsCursorPage, ExecutionEvent> {
    const { machine_id, execution_id, ...query } = params
    return this._client.getAPIList(path`/v1/machines/${machine_id}/executions/${execution_id}/events`, CursorPage<ExecutionEvent>, { query, ...options });
  }

  /**
   * Get execution output
   */
  output(params: ExecutionOutputParams, options?: RequestOptions): APIPromise<ExecutionOutput> {
    const { machine_id, execution_id } = params
    return this._client.get(path`/v1/machines/${machine_id}/executions/${execution_id}/output`, options);
  }
}

export type ExecutionsCursorPage = CursorPage<Execution>

export type ExecutionEventsCursorPage = CursorPage<ExecutionEvent>

export interface ArtifactRef {
  artifact_id: string;

  name: string;
}

export interface Execution {
  command: Array<string> | null;

  created_at: string;

  execution_id: string;

  machine_id: string;

  status: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired';

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
  /**
   * Path param
   */
  machine_id: string;

  /**
   * Body param
   */
  command: Array<string> | null;

  /**
   * Body param
   */
  cwd?: string;

  /**
   * Body param
   */
  env?: { [key: string]: string };

  /**
   * Body param
   */
  stdin?: string;

  /**
   * Body param
   */
  timeout_ms?: number;
}

export interface ExecutionRetrieveParams {
  machine_id: string;

  execution_id: string;
}

export interface ExecutionListParams extends CursorPageParams {
  /**
   * Path param
   */
  machine_id: string;
}

export interface ExecutionDeleteParams {
  machine_id: string;

  execution_id: string;
}

export interface ExecutionEventsParams extends CursorPageParams {
  /**
   * Path param
   */
  machine_id: string;

  /**
   * Path param
   */
  execution_id: string;
}

export interface ExecutionOutputParams {
  machine_id: string;

  execution_id: string;
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
    type ExecutionOutputParams as ExecutionOutputParams
  };
}
