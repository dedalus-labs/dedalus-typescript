// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as WorkspacesAPI from './workspaces';
import * as ArtifactsAPI from './artifacts';
import {
  Artifact,
  ArtifactDeleteParams,
  ArtifactList,
  ArtifactListParams,
  ArtifactRetrieveParams,
  Artifacts,
  ArtifactsCursorPage,
} from './artifacts';
import * as ExecutionsAPI from './executions';
import {
  ArtifactRef,
  Execution,
  ExecutionCreateParams,
  ExecutionDeleteParams,
  ExecutionEvent,
  ExecutionEvents,
  ExecutionEventsCursorPage,
  ExecutionEventsParams,
  ExecutionList,
  ExecutionListParams,
  ExecutionOutput,
  ExecutionOutputParams,
  ExecutionRetrieveParams,
  Executions,
  ExecutionsCursorPage,
} from './executions';
import * as PreviewsAPI from './previews';
import {
  Preview,
  PreviewCreateParams,
  PreviewDeleteParams,
  PreviewList,
  PreviewListParams,
  PreviewRetrieveParams,
  Previews,
  PreviewsCursorPage,
} from './previews';
import * as SSHAPI from './ssh';
import {
  SSH,
  SSHConnection,
  SSHCreateParams,
  SSHDeleteParams,
  SSHHostTrust,
  SSHListParams,
  SSHRetrieveParams,
  SSHSession,
  SSHSessionCreateParams,
  SSHSessionList,
  SSHSessionsCursorPage,
} from './ssh';
import * as TerminalsAPI from './terminals/terminals';
import {
  Terminal,
  TerminalClientEvent,
  TerminalClosedEvent,
  TerminalCreateParams,
  TerminalDeleteParams,
  TerminalErrorEvent,
  TerminalInputEvent,
  TerminalList,
  TerminalListParams,
  TerminalOutputEvent,
  TerminalResizeEvent,
  TerminalRetrieveParams,
  TerminalServerEvent,
  Terminals,
  TerminalsCursorPage,
} from './terminals/terminals';
import { APIPromise } from '../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../core/pagination';
import { Stream } from '../../core/streaming';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Workspaces extends APIResource {
  artifacts: ArtifactsAPI.Artifacts = new ArtifactsAPI.Artifacts(this._client);
  previews: PreviewsAPI.Previews = new PreviewsAPI.Previews(this._client);
  ssh: SSHAPI.SSH = new SSHAPI.SSH(this._client);
  executions: ExecutionsAPI.Executions = new ExecutionsAPI.Executions(this._client);
  terminals: TerminalsAPI.Terminals = new TerminalsAPI.Terminals(this._client);

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
  ): PagePromise<WorkspaceListItemsCursorPage, WorkspaceList.Item> {
    return this._client.getAPIList('/v1/workspaces', CursorPage<WorkspaceList.Item>, { query, ...options });
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

  /**
   * Streams workspace lifecycle updates over Server-Sent Events. Each `status` event
   * contains a full `LifecycleResponse` payload. The stream closes after the
   * workspace reaches its current desired state.
   */
  streamStatus(
    workspaceID: string,
    params: WorkspaceStreamStatusParams | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Stream<Workspace>> {
    const { 'Last-Event-ID': lastEventID } = params ?? {};
    return this._client.get(path`/v1/workspaces/${workspaceID}/status/stream`, {
      ...options,
      headers: buildHeaders([
        {
          Accept: 'text/event-stream',
          ...(lastEventID != null ? { 'Last-Event-ID': lastEventID } : undefined),
        },
        options?.headers,
      ]),
      stream: true,
    }) as APIPromise<Stream<Workspace>>;
  }
}

export type WorkspaceListItemsCursorPage = CursorPage<WorkspaceList.Item>;

export interface CreateParams {
  /**
   * Memory in MiB.
   */
  memory_mib: number;

  storage_gib: number;

  /**
   * CPU in vCPUs.
   */
  vcpu: number;
}

export interface LifecycleStatus {
  last_progress_at: string;

  last_transition_at: string;

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

  last_error?: string;
}

export interface UpdateParams {
  /**
   * Memory in MiB.
   */
  memory_mib?: number;

  storage_gib?: number;

  /**
   * CPU in vCPUs.
   */
  vcpu?: number;
}

export interface Workspace {
  desired_state: 'active' | 'inactive' | 'destroyed';

  /**
   * Memory in MiB.
   */
  memory_mib: number;

  status: LifecycleStatus;

  storage_gib: number;

  /**
   * CPU in vCPUs.
   */
  vcpu: number;

  workspace_id: string;
}

export interface WorkspaceList {
  items: Array<WorkspaceList.Item> | null;

  next_cursor?: string;
}

export namespace WorkspaceList {
  export interface Item {
    created_at: string;

    desired_state: 'active' | 'inactive' | 'destroyed';

    /**
     * Memory in MiB.
     */
    memory_mib: number;

    status: WorkspacesAPI.LifecycleStatus;

    storage_gib: number;

    /**
     * CPU in vCPUs.
     */
    vcpu: number;

    workspace_id: string;
  }
}

export interface WorkspaceCreateParams {
  /**
   * Memory in MiB.
   */
  memory_mib: number;

  storage_gib: number;

  /**
   * CPU in vCPUs.
   */
  vcpu: number;
}

export interface WorkspaceUpdateParams {
  /**
   * Header param
   */
  'If-Match': string;

  /**
   * Body param: Memory in MiB.
   */
  memory_mib?: number;

  /**
   * Body param
   */
  storage_gib?: number;

  /**
   * Body param: CPU in vCPUs.
   */
  vcpu?: number;
}

export interface WorkspaceListParams extends CursorPageParams {}

export interface WorkspaceDeleteParams {
  'If-Match': string;
}

export interface WorkspaceStreamStatusParams {
  /**
   * Optional resourceVersion bookmark used to resume a previous stream.
   */
  'Last-Event-ID'?: string;
}

Workspaces.Artifacts = Artifacts;
Workspaces.Previews = Previews;
Workspaces.SSH = SSH;
Workspaces.Executions = Executions;
Workspaces.Terminals = Terminals;

export declare namespace Workspaces {
  export {
    type CreateParams as CreateParams,
    type LifecycleStatus as LifecycleStatus,
    type UpdateParams as UpdateParams,
    type Workspace as Workspace,
    type WorkspaceList as WorkspaceList,
    type WorkspaceListItemsCursorPage as WorkspaceListItemsCursorPage,
    type WorkspaceCreateParams as WorkspaceCreateParams,
    type WorkspaceUpdateParams as WorkspaceUpdateParams,
    type WorkspaceListParams as WorkspaceListParams,
    type WorkspaceDeleteParams as WorkspaceDeleteParams,
    type WorkspaceStreamStatusParams as WorkspaceStreamStatusParams,
  };

  export {
    Artifacts as Artifacts,
    type Artifact as Artifact,
    type ArtifactList as ArtifactList,
    type ArtifactsCursorPage as ArtifactsCursorPage,
    type ArtifactRetrieveParams as ArtifactRetrieveParams,
    type ArtifactListParams as ArtifactListParams,
    type ArtifactDeleteParams as ArtifactDeleteParams,
  };

  export {
    Previews as Previews,
    type Preview as Preview,
    type PreviewCreateParams as PreviewCreateParams,
    type PreviewList as PreviewList,
    type PreviewsCursorPage as PreviewsCursorPage,
    type PreviewRetrieveParams as PreviewRetrieveParams,
    type PreviewListParams as PreviewListParams,
    type PreviewDeleteParams as PreviewDeleteParams,
  };

  export {
    SSH as SSH,
    type SSHConnection as SSHConnection,
    type SSHHostTrust as SSHHostTrust,
    type SSHSession as SSHSession,
    type SSHSessionCreateParams as SSHSessionCreateParams,
    type SSHSessionList as SSHSessionList,
    type SSHSessionsCursorPage as SSHSessionsCursorPage,
    type SSHCreateParams as SSHCreateParams,
    type SSHRetrieveParams as SSHRetrieveParams,
    type SSHListParams as SSHListParams,
    type SSHDeleteParams as SSHDeleteParams,
  };

  export {
    Executions as Executions,
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

  export {
    Terminals as Terminals,
    type Terminal as Terminal,
    type TerminalClientEvent as TerminalClientEvent,
    type TerminalClosedEvent as TerminalClosedEvent,
    type TerminalCreateParams as TerminalCreateParams,
    type TerminalErrorEvent as TerminalErrorEvent,
    type TerminalInputEvent as TerminalInputEvent,
    type TerminalList as TerminalList,
    type TerminalOutputEvent as TerminalOutputEvent,
    type TerminalResizeEvent as TerminalResizeEvent,
    type TerminalServerEvent as TerminalServerEvent,
    type TerminalsCursorPage as TerminalsCursorPage,
    type TerminalRetrieveParams as TerminalRetrieveParams,
    type TerminalListParams as TerminalListParams,
    type TerminalDeleteParams as TerminalDeleteParams,
  };
}
