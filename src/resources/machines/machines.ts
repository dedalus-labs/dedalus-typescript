// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
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
import { APIPromise } from '../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Machines extends APIResource {
  ssh: SSHAPI.SSH = new SSHAPI.SSH(this._client);
  executions: ExecutionsAPI.Executions = new ExecutionsAPI.Executions(this._client);

  /**
   * Create machine
   */
  create(body: MachineCreateParams, options?: RequestOptions): APIPromise<Machine> {
    return this._client.post('/v1/machines', { body, ...options });
  }

  /**
   * Get machine
   */
  retrieve(params: MachineRetrieveParams, options?: RequestOptions): APIPromise<MachineRetrieveResponse> {
    const { machine_id } = params;
    return this._client.get(path`/v1/machines/${machine_id}`, options);
  }

  /**
   * Update machine
   */
  update(params: MachineUpdateParams, options?: RequestOptions): APIPromise<Machine> {
    const { machine_id, ...body } = params;
    return this._client.patch(path`/v1/machines/${machine_id}`, { body, ...options });
  }

  /**
   * List machines
   */
  list(
    query: MachineListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<MachineListItemsCursorPage, MachineListItem> {
    return this._client.getAPIList('/v1/machines', CursorPage<MachineListItem>, { query, ...options });
  }

  /**
   * Destroy machine
   */
  delete(params: MachineDeleteParams, options?: RequestOptions): APIPromise<Machine> {
    const { machine_id } = params;
    return this._client.delete(path`/v1/machines/${machine_id}`, options);
  }

  /**
   * Sleep a running machine
   */
  sleep(params: MachineSleepParams, options?: RequestOptions): APIPromise<Machine> {
    const { machine_id } = params;
    return this._client.post(path`/v1/machines/${machine_id}/sleep`, options);
  }

  /**
   * Wake a sleeping machine
   */
  wake(params: MachineWakeParams, options?: RequestOptions): APIPromise<Machine> {
    const { machine_id } = params;
    return this._client.post(path`/v1/machines/${machine_id}/wake`, options);
  }
}

export type MachineListItemsCursorPage = CursorPage<MachineListItem>;

export interface CreateParams {
  /**
   * Idle window before autosleep. Accepts fixed duration units like 30s, 30m, 2h,
   * 7d3h4s, or 1w3d, raw seconds ("1800"), or never to disable.
   */
  autosleep?: string;

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

export interface Machine {
  /**
   * Seconds of inactivity before autosleep. 0 disables autosleep.
   */
  autosleep_seconds: number;

  desired_state: 'running' | 'sleeping' | 'destroyed';

  machine_id: string;

  /**
   * Memory in MiB.
   */
  memory_mib: number;

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
  /**
   * Seconds of inactivity before autosleep. 0 disables autosleep.
   */
  autosleep_seconds: number;

  created_at: string;

  desired_state: 'running' | 'sleeping' | 'destroyed';

  machine_id: string;

  /**
   * Memory in MiB.
   */
  memory_mib: number;

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

  storage_gib: number;

  /**
   * CPU in vCPUs.
   */
  vcpu: number;
}

export interface UpdateParams {
  /**
   * Idle window before autosleep. Accepts fixed duration units like 30s, 30m, 2h,
   * 7d3h4s, or 1w3d, raw seconds ("1800"), or never to disable.
   */
  autosleep?: string;

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

export interface MachineRetrieveResponse {
  /**
   * Seconds of inactivity before autosleep. 0 disables autosleep.
   */
  autosleep_seconds: number;

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

export interface MachineCreateParams {
  /**
   * Idle window before autosleep. Accepts fixed duration units like 30s, 30m, 2h,
   * 7d3h4s, or 1w3d, raw seconds ("1800"), or never to disable.
   */
  autosleep?: string;

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

export interface MachineRetrieveParams {
  machine_id: string;
}

export interface MachineUpdateParams {
  /**
   * Path param
   */
  machine_id: string;

  /**
   * Body param: Idle window before autosleep. Accepts fixed duration units like 30s,
   * 30m, 2h, 7d3h4s, or 1w3d, raw seconds ("1800"), or never to disable.
   */
  autosleep?: string;

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

export interface MachineListParams extends CursorPageParams {}

export interface MachineDeleteParams {
  machine_id: string;
}

export interface MachineSleepParams {
  machine_id: string;
}

export interface MachineWakeParams {
  machine_id: string;
}

Machines.SSH = SSH;
Machines.Executions = Executions;

export declare namespace Machines {
  export {
    type CreateParams as CreateParams,
    type LifecycleStatus as LifecycleStatus,
    type Machine as Machine,
    type MachineList as MachineList,
    type MachineListItem as MachineListItem,
    type UpdateParams as UpdateParams,
    type MachineRetrieveResponse as MachineRetrieveResponse,
    type MachineListItemsCursorPage as MachineListItemsCursorPage,
    type MachineCreateParams as MachineCreateParams,
    type MachineRetrieveParams as MachineRetrieveParams,
    type MachineUpdateParams as MachineUpdateParams,
    type MachineListParams as MachineListParams,
    type MachineDeleteParams as MachineDeleteParams,
    type MachineSleepParams as MachineSleepParams,
    type MachineWakeParams as MachineWakeParams,
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
}
