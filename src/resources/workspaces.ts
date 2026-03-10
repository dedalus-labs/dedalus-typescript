// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as WorkspacesAPI from './workspaces';
import { APIPromise } from '../core/api-promise';
import {
  PagePromise,
  WorkspaceList as PaginationWorkspaceList,
  type WorkspaceListParams as PaginationWorkspaceListParams,
} from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Workspaces extends APIResource {
  /**
   * Create workspace
   */
  create(body: WorkspaceCreateParams, options?: RequestOptions): APIPromise<Workspace> {
    return this._client.post('/v1/workspaces', { body, ...options });
  }

  /**
   * Get workspace
   */
  retrieve(workspaceID: string, options?: RequestOptions): APIPromise<Workspace> {
    return this._client.get(path`/v1/workspaces/${workspaceID}`, options);
  }

  /**
   * Update workspace
   */
  update(
    workspaceID: string,
    params: WorkspaceUpdateParams,
    options?: RequestOptions,
  ): APIPromise<Workspace> {
    const { 'If-Match': ifMatch, ...body } = params;
    return this._client.patch(path`/v1/workspaces/${workspaceID}`, {
      body,
      ...options,
      headers: buildHeaders([{ 'If-Match': ifMatch }, options?.headers]),
    });
  }

  /**
   * List workspaces
   */
  list(
    query: WorkspaceListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<WorkspaceListItemsWorkspaceList, WorkspaceList.Item> {
    return this._client.getAPIList('/v1/workspaces', PaginationWorkspaceList<WorkspaceList.Item>, {
      query,
      ...options,
    });
  }

  /**
   * Destroy workspace
   */
  delete(
    workspaceID: string,
    params: WorkspaceDeleteParams,
    options?: RequestOptions,
  ): APIPromise<Workspace> {
    const { 'If-Match': ifMatch } = params;
    return this._client.delete(path`/v1/workspaces/${workspaceID}`, {
      ...options,
      headers: buildHeaders([{ 'If-Match': ifMatch }, options?.headers]),
    });
  }
}

export type WorkspaceListItemsWorkspaceList = PaginationWorkspaceList<WorkspaceList.Item>;

export interface CreateParams {
  cpus: number;

  image_version: string;

  memory_mib: number;

  storage_gib: number;

  /**
   * A URL to the JSON Schema for this object.
   */
  $schema?: string;
}

export interface LifecycleStatus {
  last_progress_at: string;

  last_transition_at: string;

  observed_revision: string;

  phase:
    | 'accepted'
    | 'placement_pending'
    | 'starting'
    | 'running'
    | 'stopping'
    | 'sleeping'
    | 'destroying'
    | 'destroyed'
    | 'failed';

  reason: string;

  retryable: boolean;

  revision: string;

  assigned_host?: string;

  last_error?: string;
}

export interface UpdateParams {
  /**
   * A URL to the JSON Schema for this object.
   */
  $schema?: string;

  cpus?: number;

  memory_mib?: number;

  storage_gib?: number;
}

export interface Workspace {
  desired_state: 'active' | 'inactive' | 'destroyed';

  status: LifecycleStatus;

  workspace_id: string;

  /**
   * A URL to the JSON Schema for this object.
   */
  $schema?: string;
}

export interface WorkspaceList {
  items: Array<WorkspaceList.Item> | null;

  /**
   * A URL to the JSON Schema for this object.
   */
  $schema?: string;

  next_cursor?: string;
}

export namespace WorkspaceList {
  export interface Item {
    cpus: number;

    created_at: string;

    desired_state: 'active' | 'inactive' | 'destroyed';

    memory_mib: number;

    status: WorkspacesAPI.LifecycleStatus;

    storage_gib: number;

    workspace_id: string;

    image_version?: string;
  }
}

export interface WorkspaceCreateParams {
  cpus: number;

  image_version: string;

  memory_mib: number;

  storage_gib: number;
}

export interface WorkspaceUpdateParams {
  /**
   * Header param
   */
  'If-Match': string;

  /**
   * Body param
   */
  cpus?: number;

  /**
   * Body param
   */
  memory_mib?: number;

  /**
   * Body param
   */
  storage_gib?: number;
}

export interface WorkspaceListParams extends PaginationWorkspaceListParams {}

export interface WorkspaceDeleteParams {
  'If-Match': string;
}

export declare namespace Workspaces {
  export {
    type CreateParams as CreateParams,
    type LifecycleStatus as LifecycleStatus,
    type UpdateParams as UpdateParams,
    type Workspace as Workspace,
    type WorkspaceList as WorkspaceList,
    type WorkspaceListItemsWorkspaceList as WorkspaceListItemsWorkspaceList,
    type WorkspaceCreateParams as WorkspaceCreateParams,
    type WorkspaceUpdateParams as WorkspaceUpdateParams,
    type WorkspaceListParams as WorkspaceListParams,
    type WorkspaceDeleteParams as WorkspaceDeleteParams,
  };
}
