// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import {
  PagePromise,
  PreviewList as PaginationPreviewList,
  type PreviewListParams as PaginationPreviewListParams,
} from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Previews extends APIResource {
  /**
   * Create preview
   */
  create(workspaceID: string, body: PreviewCreateParams, options?: RequestOptions): APIPromise<Preview> {
    return this._client.post(path`/v1/workspaces/${workspaceID}/previews`, { body, ...options });
  }

  /**
   * Get preview
   */
  retrieve(previewID: string, params: PreviewRetrieveParams, options?: RequestOptions): APIPromise<Preview> {
    const { workspace_id } = params;
    return this._client.get(path`/v1/workspaces/${workspace_id}/previews/${previewID}`, options);
  }

  /**
   * List previews
   */
  list(
    workspaceID: string,
    query: PreviewListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<PreviewsPreviewList, Preview> {
    return this._client.getAPIList(
      path`/v1/workspaces/${workspaceID}/previews`,
      PaginationPreviewList<Preview>,
      { query, ...options },
    );
  }

  /**
   * Delete preview
   */
  delete(previewID: string, params: PreviewDeleteParams, options?: RequestOptions): APIPromise<Preview> {
    const { workspace_id } = params;
    return this._client.delete(path`/v1/workspaces/${workspace_id}/previews/${previewID}`, options);
  }
}

export type PreviewsPreviewList = PaginationPreviewList<Preview>;

export interface Preview {
  created_at: string;

  port: number;

  preview_id: string;

  status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed';

  workspace_id: string;

  /**
   * A URL to the JSON Schema for this object.
   */
  $schema?: string;

  error_code?: string;

  error_message?: string;

  expires_at?: string;

  protocol?: 'http' | 'https';

  ready_at?: string;

  retry_after_ms?: number;

  url?: string;
}

export interface PreviewCreateParams {
  port: number;

  /**
   * A URL to the JSON Schema for this object.
   */
  $schema?: string;

  protocol?: 'http' | 'https';

  wake_if_needed?: boolean;
}

export interface PreviewList {
  items: Array<Preview> | null;

  /**
   * A URL to the JSON Schema for this object.
   */
  $schema?: string;

  next_cursor?: string;
}

export interface PreviewCreateParams {
  port: number;

  protocol?: 'http' | 'https';

  wake_if_needed?: boolean;
}

export interface PreviewRetrieveParams {
  workspace_id: string;
}

export interface PreviewListParams extends PaginationPreviewListParams {}

export interface PreviewDeleteParams {
  workspace_id: string;
}

export declare namespace Previews {
  export {
    type Preview as Preview,
    type PreviewCreateParams as PreviewCreateParams,
    type PreviewList as PreviewList,
    type PreviewsPreviewList as PreviewsPreviewList,
    type PreviewRetrieveParams as PreviewRetrieveParams,
    type PreviewListParams as PreviewListParams,
    type PreviewDeleteParams as PreviewDeleteParams,
  };
}
