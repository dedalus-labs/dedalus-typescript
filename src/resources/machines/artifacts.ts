// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Artifacts extends APIResource {
  /**
   * Get artifact
   */
  retrieve(params: ArtifactRetrieveParams, options?: RequestOptions): APIPromise<Artifact> {
    const { machine_id, artifact_id } = params
    return this._client.get(path`/v1/machines/${machine_id}/artifacts/${artifact_id}`, options);
  }

  /**
   * List artifacts
   */
  list(params: ArtifactListParams, options?: RequestOptions): PagePromise<ArtifactsCursorPage, Artifact> {
    const { machine_id, ...query } = params
    return this._client.getAPIList(path`/v1/machines/${machine_id}/artifacts`, CursorPage<Artifact>, { query, ...options });
  }

  /**
   * Delete artifact
   */
  delete(params: ArtifactDeleteParams, options?: RequestOptions): APIPromise<Artifact> {
    const { machine_id, artifact_id } = params
    return this._client.delete(path`/v1/machines/${machine_id}/artifacts/${artifact_id}`, options);
  }
}

export type ArtifactsCursorPage = CursorPage<Artifact>

export interface Artifact {
  artifact_id: string;

  created_at: string;

  machine_id: string;

  name: string;

  size_bytes: number;

  download_url?: string;

  execution_id?: string;

  expires_at?: string;

  mime_type?: string;

  sha256?: string;
}

export interface ArtifactList {
  items: Array<Artifact> | null;

  next_cursor?: string;
}

export interface ArtifactRetrieveParams {
  machine_id: string;

  artifact_id: string;
}

export interface ArtifactListParams extends CursorPageParams {
  /**
   * Path param
   */
  machine_id: string;
}

export interface ArtifactDeleteParams {
  machine_id: string;

  artifact_id: string;
}

export declare namespace Artifacts {
  export {
    type Artifact as Artifact,
    type ArtifactList as ArtifactList,
    type ArtifactsCursorPage as ArtifactsCursorPage,
    type ArtifactRetrieveParams as ArtifactRetrieveParams,
    type ArtifactListParams as ArtifactListParams,
    type ArtifactDeleteParams as ArtifactDeleteParams
  };
}
