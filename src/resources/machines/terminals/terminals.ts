// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../../core/pagination';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Terminals extends APIResource {
  /**
   * Create terminal
   */
  create(params: TerminalCreateParams, options?: RequestOptions): APIPromise<Terminal> {
    const { machine_id, ...body } = params
    return this._client.post(path`/v1/machines/${machine_id}/terminals`, { body, ...options });
  }

  /**
   * Get terminal
   */
  retrieve(params: TerminalRetrieveParams, options?: RequestOptions): APIPromise<Terminal> {
    const { machine_id, terminal_id } = params
    return this._client.get(path`/v1/machines/${machine_id}/terminals/${terminal_id}`, options);
  }

  /**
   * List terminals
   */
  list(params: TerminalListParams, options?: RequestOptions): PagePromise<TerminalsCursorPage, Terminal> {
    const { machine_id, ...query } = params
    return this._client.getAPIList(path`/v1/machines/${machine_id}/terminals`, CursorPage<Terminal>, { query, ...options });
  }

  /**
   * Delete terminal
   */
  delete(params: TerminalDeleteParams, options?: RequestOptions): APIPromise<Terminal> {
    const { machine_id, terminal_id } = params
    return this._client.delete(path`/v1/machines/${machine_id}/terminals/${terminal_id}`, options);
  }
}

export type TerminalsCursorPage = CursorPage<Terminal>

export interface Terminal {
  created_at: string;

  height: number;

  machine_id: string;

  status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed';

  terminal_id: string;

  width: number;

  error_code?: string;

  error_message?: string;

  expires_at?: string;

  protocol?: 'websocket';

  ready_at?: string;

  retry_after_ms?: number;

  stream_url?: string;
}

export type TerminalClientEvent = TerminalInputEvent | TerminalResizeEvent

export interface TerminalClosedEvent {
  type: 'closed';
}

export interface TerminalCreateParams {
  height: number;

  width: number;

  cwd?: string;

  env?: { [key: string]: string };

  shell?: string;
}

export interface TerminalErrorEvent {
  type: 'error';

  error_code?: string;

  error_message?: string;
}

export interface TerminalInputEvent {
  /**
   * Base64-encoded terminal input.
   */
  data: string;

  type: 'input';
}

export interface TerminalList {
  items: Array<Terminal> | null;

  next_cursor?: string;
}

export interface TerminalOutputEvent {
  /**
   * Base64-encoded terminal output.
   */
  data: string;

  type: 'output';
}

export interface TerminalResizeEvent {
  height: number;

  type: 'resize';

  width: number;
}

export type TerminalServerEvent = TerminalOutputEvent | TerminalErrorEvent | TerminalClosedEvent

export interface TerminalCreateParams {
  /**
   * Path param
   */
  machine_id: string;

  /**
   * Body param
   */
  height: number;

  /**
   * Body param
   */
  width: number;

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
  shell?: string;
}

export interface TerminalRetrieveParams {
  machine_id: string;

  terminal_id: string;
}

export interface TerminalListParams extends CursorPageParams {
  /**
   * Path param
   */
  machine_id: string;
}

export interface TerminalDeleteParams {
  machine_id: string;

  terminal_id: string;
}

export interface TerminalConnectParams {
  machine_id: string;

  terminal_id: string;
}

export declare namespace Terminals {
  export {
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
