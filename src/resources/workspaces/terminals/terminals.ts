// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import {
  PagePromise,
  TerminalList as PaginationTerminalList,
  type TerminalListParams as PaginationTerminalListParams,
} from '../../../core/pagination';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Terminals extends APIResource {
  /**
   * Create terminal
   */
  create(workspaceID: string, body: TerminalCreateParams, options?: RequestOptions): APIPromise<Terminal> {
    return this._client.post(path`/v1/workspaces/${workspaceID}/terminals`, { body, ...options });
  }

  /**
   * Get terminal
   */
  retrieve(
    terminalID: string,
    params: TerminalRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<Terminal> {
    const { workspace_id } = params;
    return this._client.get(path`/v1/workspaces/${workspace_id}/terminals/${terminalID}`, options);
  }

  /**
   * List terminals
   */
  list(
    workspaceID: string,
    query: TerminalListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<TerminalsTerminalList, Terminal> {
    return this._client.getAPIList(
      path`/v1/workspaces/${workspaceID}/terminals`,
      PaginationTerminalList<Terminal>,
      { query, ...options },
    );
  }

  /**
   * Delete terminal
   */
  delete(terminalID: string, params: TerminalDeleteParams, options?: RequestOptions): APIPromise<Terminal> {
    const { workspace_id } = params;
    return this._client.delete(path`/v1/workspaces/${workspace_id}/terminals/${terminalID}`, options);
  }
}

export type TerminalsTerminalList = PaginationTerminalList<Terminal>;

export interface Terminal {
  created_at: string;

  height: number;

  status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed';

  terminal_id: string;

  width: number;

  workspace_id: string;

  /**
   * A URL to the JSON Schema for this object.
   */
  $schema?: string;

  error_code?: string;

  error_message?: string;

  expires_at?: string;

  protocol?: 'websocket';

  ready_at?: string;

  retry_after_ms?: number;

  stream_url?: string;
}

export type TerminalClientEvent = TerminalInputEvent | TerminalResizeEvent;

export interface TerminalClosedEvent {
  type: 'closed';
}

export interface TerminalCreateParams {
  height: number;

  width: number;

  /**
   * A URL to the JSON Schema for this object.
   */
  $schema?: string;

  cwd?: string;

  env?: { [key: string]: string };

  shell?: string;

  wake_if_needed?: boolean;
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

  /**
   * A URL to the JSON Schema for this object.
   */
  $schema?: string;

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

export type TerminalServerEvent = TerminalOutputEvent | TerminalErrorEvent | TerminalClosedEvent;

export interface TerminalCreateParams {
  height: number;

  width: number;

  cwd?: string;

  env?: { [key: string]: string };

  shell?: string;

  wake_if_needed?: boolean;
}

export interface TerminalRetrieveParams {
  workspace_id: string;
}

export interface TerminalListParams extends PaginationTerminalListParams {}

export interface TerminalDeleteParams {
  workspace_id: string;
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
    type TerminalsTerminalList as TerminalsTerminalList,
    type TerminalRetrieveParams as TerminalRetrieveParams,
    type TerminalListParams as TerminalListParams,
    type TerminalDeleteParams as TerminalDeleteParams,
  };
}
