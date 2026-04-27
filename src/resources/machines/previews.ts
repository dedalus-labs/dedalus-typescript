// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Previews extends APIResource {
  /**
   * Create preview
   */
  create(params: PreviewCreateParams, options?: RequestOptions): APIPromise<Preview> {
    const { machine_id, ...body } = params;
    return this._client.post(path`/v1/machines/${machine_id}/previews`, { body, ...options });
  }

  /**
   * Get preview
   */
  retrieve(params: PreviewRetrieveParams, options?: RequestOptions): APIPromise<Preview> {
    const { machine_id, preview_id } = params;
    return this._client.get(path`/v1/machines/${machine_id}/previews/${preview_id}`, options);
  }

  /**
   * List previews
   */
  list(params: PreviewListParams, options?: RequestOptions): PagePromise<PreviewsCursorPage, Preview> {
    const { machine_id, ...query } = params;
    return this._client.getAPIList(path`/v1/machines/${machine_id}/previews`, CursorPage<Preview>, {
      query,
      ...options,
    });
  }

  /**
   * Delete preview
   */
  delete(params: PreviewDeleteParams, options?: RequestOptions): APIPromise<Preview> {
    const { machine_id, preview_id } = params;
    return this._client.delete(path`/v1/machines/${machine_id}/previews/${preview_id}`, options);
  }
}

export type PreviewsCursorPage = CursorPage<Preview>;

export interface Preview {
  created_at: string;

  machine_id: string;

  port: number;

  preview_id: string;

  status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed';

  visibility: 'public' | 'private' | 'org';

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

  protocol?: 'http' | 'https';

  visibility?: 'public' | 'private' | 'org';
}

export interface PreviewList {
  items: Array<Preview> | null;

  next_cursor?: string;
}

export interface PreviewCreateParams {
  /**
   * Path param
   */
  machine_id: string;

  /**
   * Body param
   */
  port: number;

  /**
   * Body param
   */
  protocol?: 'http' | 'https';

  /**
   * Body param
   */
  visibility?: 'public' | 'private' | 'org';
}

export interface PreviewRetrieveParams {
  machine_id: string;

  preview_id: string;
}

export interface PreviewListParams extends CursorPageParams {
  /**
   * Path param
   */
  machine_id: string;
}

export interface PreviewDeleteParams {
  machine_id: string;

  preview_id: string;
}

export declare namespace Previews {
  export {
    type Preview as Preview,
    type PreviewCreateParams as PreviewCreateParams,
    type PreviewList as PreviewList,
    type PreviewsCursorPage as PreviewsCursorPage,
    type PreviewRetrieveParams as PreviewRetrieveParams,
    type PreviewListParams as PreviewListParams,
    type PreviewDeleteParams as PreviewDeleteParams,
  };
}
