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
  retrieve(
    artifactID: string,
    params: ArtifactRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<Artifact> {
    const { workspace_id } = params;
    return this._client.get(path`/v1/workspaces/${workspace_id}/artifacts/${artifactID}`, options);
  }

  /**
   * List artifacts
   */
  list(
    workspaceID: string,
    query: ArtifactListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ArtifactsCursorPage, Artifact> {
    return this._client.getAPIList(path`/v1/workspaces/${workspaceID}/artifacts`, CursorPage<Artifact>, {
      query,
      ...options,
    });
  }

  /**
   * Delete artifact
   */
  delete(artifactID: string, params: ArtifactDeleteParams, options?: RequestOptions): APIPromise<Artifact> {
    const { workspace_id } = params;
    return this._client.delete(path`/v1/workspaces/${workspace_id}/artifacts/${artifactID}`, options);
  }
}

export type ArtifactsCursorPage = CursorPage<Artifact>;

export interface Artifact {
  artifact_id: string;

  created_at: string;

  name: string;

  size_bytes: number;

  workspace_id: string;

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
  workspace_id: string;
}

export interface ArtifactListParams extends CursorPageParams {}

export interface ArtifactDeleteParams {
  workspace_id: string;
}

export declare namespace Artifacts {
  export {
    type Artifact as Artifact,
    type ArtifactList as ArtifactList,
    type ArtifactsCursorPage as ArtifactsCursorPage,
    type ArtifactRetrieveParams as ArtifactRetrieveParams,
    type ArtifactListParams as ArtifactListParams,
    type ArtifactDeleteParams as ArtifactDeleteParams,
  };
}
