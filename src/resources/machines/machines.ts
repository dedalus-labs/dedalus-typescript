// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ArtifactsAPI from './artifacts';
import { Artifact, ArtifactDeleteParams, ArtifactList, ArtifactListParams, ArtifactRetrieveParams, Artifacts, ArtifactsCursorPage } from './artifacts';
import * as ExecutionsAPI from './executions';
import { ArtifactRef, Execution, ExecutionCreateParams, ExecutionDeleteParams, ExecutionEvent, ExecutionEvents, ExecutionEventsCursorPage, ExecutionEventsParams, ExecutionList, ExecutionListParams, ExecutionOutput, ExecutionOutputParams, ExecutionRetrieveParams, Executions, ExecutionsCursorPage } from './executions';
import * as PreviewsAPI from './previews';
import { Preview, PreviewCreateParams, PreviewDeleteParams, PreviewList, PreviewListParams, PreviewRetrieveParams, Previews, PreviewsCursorPage } from './previews';
import * as SSHAPI from './ssh';
import { SSH, SSHConnection, SSHCreateParams, SSHDeleteParams, SSHHostTrust, SSHListParams, SSHRetrieveParams, SSHSession, SSHSessionCreateParams, SSHSessionList, SSHSessionsCursorPage } from './ssh';
import * as TerminalsAPI from './terminals/terminals';
import { Terminal, TerminalClientEvent, TerminalClosedEvent, TerminalConnectParams, TerminalCreateParams, TerminalDeleteParams, TerminalErrorEvent, TerminalInputEvent, TerminalList, TerminalListParams, TerminalOutputEvent, TerminalResizeEvent, TerminalRetrieveParams, TerminalServerEvent, Terminals, TerminalsCursorPage } from './terminals/terminals';
import { APIPromise } from '../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../core/pagination';
import { Stream } from '../../core/streaming';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Machines extends APIResource {
  artifacts: ArtifactsAPI.Artifacts = new ArtifactsAPI.Artifacts(this._client);
  previews: PreviewsAPI.Previews = new PreviewsAPI.Previews(this._client);
  ssh: SSHAPI.SSH = new SSHAPI.SSH(this._client);
  executions: ExecutionsAPI.Executions = new ExecutionsAPI.Executions(this._client);
  terminals: TerminalsAPI.Terminals = new TerminalsAPI.Terminals(this._client);

  /**
   * Create machine
   */
  create(body: MachineCreateParams, options?: RequestOptions): APIPromise<Machine> {
    return this._client.post('/v1/machines', { body, ...options });
  }

  /**
   * Get machine
   */
  retrieve(params: MachineRetrieveParams, options?: RequestOptions): APIPromise<Machine> {
    const { machine_id } = params
    return this._client.get(path`/v1/machines/${machine_id}`, options);
  }

  /**
   * Update machine
   */
  update(params: MachineUpdateParams, options?: RequestOptions): APIPromise<Machine> {
    const { machine_id, 'If-Match': ifMatch, ...body } = params
    return this._client.patch(path`/v1/machines/${machine_id}`, { body, ...options, headers: buildHeaders([{'If-Match': ifMatch}, options?.headers]) });
  }

  /**
   * List machines
   */
  list(query: MachineListParams | null | undefined = {}, options?: RequestOptions): PagePromise<MachineListItemsCursorPage, MachineListItem> {
    return this._client.getAPIList('/v1/machines', CursorPage<MachineListItem>, { query, ...options });
  }

  /**
   * Destroy machine
   */
  delete(params: MachineDeleteParams, options?: RequestOptions): APIPromise<Machine> {
    const { machine_id, 'If-Match': ifMatch } = params
    return this._client.delete(path`/v1/machines/${machine_id}`, { ...options, headers: buildHeaders([{'If-Match': ifMatch}, options?.headers]) });
  }

  /**
   * Sleep a running machine
   */
  sleep(params: MachineSleepParams, options?: RequestOptions): APIPromise<Machine> {
    const { machine_id, 'If-Match': ifMatch } = params
    return this._client.post(path`/v1/machines/${machine_id}/sleep`, { ...options, headers: buildHeaders([{'If-Match': ifMatch}, options?.headers]) });
  }

  /**
   * Wake a sleeping machine
   */
  wake(params: MachineWakeParams, options?: RequestOptions): APIPromise<Machine> {
    const { machine_id, 'If-Match': ifMatch } = params
    return this._client.post(path`/v1/machines/${machine_id}/wake`, { ...options, headers: buildHeaders([{'If-Match': ifMatch}, options?.headers]) });
  }

  /**
   * Streams machine lifecycle updates over Server-Sent Events. Each `status` event
   * contains a full `LifecycleResponse` payload. The stream closes after the machine
   * reaches its current desired state.
   */
  watch(params: MachineWatchParams, options?: RequestOptions): APIPromise<Stream<Machine>> {
    const { machine_id, 'Last-Event-ID': lastEventID } = params
    return this._client.get(path`/v1/machines/${machine_id}/status/stream`, { ...options, headers: buildHeaders([{Accept: 'text/event-stream', ...(lastEventID != null ? { 'Last-Event-ID': lastEventID } : undefined)}, options?.headers]), stream: true }) as APIPromise<Stream<Machine>>;
  }
}

export type MachineListItemsCursorPage = CursorPage<MachineListItem>

export interface CreateParams {
  /**
   * Memory in MiB.
   */
  memory_mib: number;

  /**
   * Storage in GiB.
   */
  storage_gib: number;

  /**
   * CPU in vCPUs.
   */
  vcpu: number;
}

export interface LifecycleStatus {
  last_progress_at: string;

  last_transition_at: string;

  phase: 'accepted' | 'placement_pending' | 'starting' | 'running' | 'stopping' | 'sleeping' | 'destroying' | 'destroyed' | 'failed';

  reason: string;

  retryable: boolean;

  revision: string;

  last_error?: string;
}

export interface Machine {
  desired_state: 'running' | 'sleeping' | 'destroyed';

  machine_id: string;

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
}

export interface MachineList {
  items: Array<MachineListItem> | null;

  next_cursor?: string;
}

export interface MachineListItem {
  created_at: string;

  desired_state: 'running' | 'sleeping' | 'destroyed';

  machine_id: string;

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
}

export interface UpdateParams {
  /**
   * Memory in MiB.
   */
  memory_mib?: number;

  /**
   * Storage in GiB.
   */
  storage_gib?: number;

  /**
   * CPU in vCPUs.
   */
  vcpu?: number;
}

export interface MachineCreateParams {
  /**
   * Memory in MiB.
   */
  memory_mib: number;

  /**
   * Storage in GiB.
   */
  storage_gib: number;

  /**
   * CPU in vCPUs.
   */
  vcpu: number;
}

export interface MachineRetrieveParams {
  machine_id: string;
}

export interface MachineUpdateParams {
  /**
   * Path param
   */
  machine_id: string;

  /**
   * Header param
   */
  'If-Match': string;

  /**
   * Body param: Memory in MiB.
   */
  memory_mib?: number;

  /**
   * Body param: Storage in GiB.
   */
  storage_gib?: number;

  /**
   * Body param: CPU in vCPUs.
   */
  vcpu?: number;
}

export interface MachineListParams extends CursorPageParams {
}

export interface MachineDeleteParams {
  /**
   * Path param
   */
  machine_id: string;

  /**
   * Header param
   */
  'If-Match': string;
}

export interface MachineSleepParams {
  /**
   * Path param
   */
  machine_id: string;

  /**
   * Header param
   */
  'If-Match': string;
}

export interface MachineWakeParams {
  /**
   * Path param
   */
  machine_id: string;

  /**
   * Header param
   */
  'If-Match': string;
}

export interface MachineWatchParams {
  /**
   * Path param: Machine identifier.
   */
  machine_id: string;

  /**
   * Header param: Optional resourceVersion bookmark used to resume a previous
   * stream.
   */
  'Last-Event-ID'?: string;
}

Machines.Artifacts = Artifacts;
Machines.Previews = Previews;
Machines.SSH = SSH;
Machines.Executions = Executions;
Machines.Terminals = Terminals;

export declare namespace Machines {
  export {
    type CreateParams as CreateParams,
    type LifecycleStatus as LifecycleStatus,
    type Machine as Machine,
    type MachineList as MachineList,
    type MachineListItem as MachineListItem,
    type UpdateParams as UpdateParams,
    type MachineListItemsCursorPage as MachineListItemsCursorPage,
    type MachineCreateParams as MachineCreateParams,
    type MachineRetrieveParams as MachineRetrieveParams,
    type MachineUpdateParams as MachineUpdateParams,
    type MachineListParams as MachineListParams,
    type MachineDeleteParams as MachineDeleteParams,
    type MachineSleepParams as MachineSleepParams,
    type MachineWakeParams as MachineWakeParams,
    type MachineWatchParams as MachineWatchParams
  };

  export {
    Artifacts as Artifacts,
    type Artifact as Artifact,
    type ArtifactList as ArtifactList,
    type ArtifactsCursorPage as ArtifactsCursorPage,
    type ArtifactRetrieveParams as ArtifactRetrieveParams,
    type ArtifactListParams as ArtifactListParams,
    type ArtifactDeleteParams as ArtifactDeleteParams
  };

  export {
    Previews as Previews,
    type Preview as Preview,
    type PreviewCreateParams as PreviewCreateParams,
    type PreviewList as PreviewList,
    type PreviewsCursorPage as PreviewsCursorPage,
    type PreviewRetrieveParams as PreviewRetrieveParams,
    type PreviewListParams as PreviewListParams,
    type PreviewDeleteParams as PreviewDeleteParams
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
    type SSHDeleteParams as SSHDeleteParams
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
    type ExecutionOutputParams as ExecutionOutputParams
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
    type TerminalConnectParams as TerminalConnectParams
  };
}
