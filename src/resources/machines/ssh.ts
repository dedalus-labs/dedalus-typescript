// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class SSH extends APIResource {
  /**
   * Create SSH session
   */
  create(params: SSHCreateParams, options?: RequestOptions): APIPromise<SSHSession> {
    const { machine_id, ...body } = params;
    return this._client.post(path`/v1/machines/${machine_id}/ssh`, { body, ...options });
  }

  /**
   * Get SSH session
   */
  retrieve(params: SSHRetrieveParams, options?: RequestOptions): APIPromise<SSHSession> {
    const { machine_id, session_id } = params;
    return this._client.get(path`/v1/machines/${machine_id}/ssh/${session_id}`, options);
  }

  /**
   * List SSH sessions
   */
  list(params: SSHListParams, options?: RequestOptions): PagePromise<SSHSessionsCursorPage, SSHSession> {
    const { machine_id, ...query } = params;
    return this._client.getAPIList(path`/v1/machines/${machine_id}/ssh`, CursorPage<SSHSession>, {
      query,
      ...options,
    });
  }

  /**
   * Delete SSH session
   */
  delete(params: SSHDeleteParams, options?: RequestOptions): APIPromise<SSHSession> {
    const { machine_id, session_id } = params;
    return this._client.delete(path`/v1/machines/${machine_id}/ssh/${session_id}`, options);
  }
}

export type SSHSessionsCursorPage = CursorPage<SSHSession>;

export interface SSHConnection {
  endpoint: string;

  port: number;

  ssh_username: string;

  host_trust?: SSHHostTrust;

  user_certificate?: string;
}

export interface SSHHostTrust {
  host_pattern: string;

  kind: 'cert_authority';

  public_key: string;
}

export interface SSHSession {
  created_at: string;

  machine_id: string;

  session_id: string;

  status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed';

  connection?: SSHConnection;

  error_code?: string;

  error_message?: string;

  expires_at?: string;

  ready_at?: string;

  retry_after_ms?: number;
}

export interface SSHSessionCreateParams {
  public_key: string;
}

export interface SSHSessionList {
  items: Array<SSHSession> | null;

  next_cursor?: string;
}

export interface SSHCreateParams {
  /**
   * Path param
   */
  machine_id: string;

  /**
   * Body param
   */
  public_key: string;
}

export interface SSHRetrieveParams {
  machine_id: string;

  session_id: string;
}

export interface SSHListParams extends CursorPageParams {
  /**
   * Path param
   */
  machine_id: string;
}

export interface SSHDeleteParams {
  machine_id: string;

  session_id: string;
}

export declare namespace SSH {
  export {
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
}
