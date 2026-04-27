// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as WS from 'ws';
import { NodeWebSocket } from '../../../internal/ws-adapter-node';
import { TerminalsWSBase, type TerminalsWSBaseOptions, type TerminalsWSParameters } from './ws-base';
import { Dedalus } from '../../../client';

export type { TerminalsWSParameters, TerminalsWSReconnectOptions } from './ws-base';

export interface TerminalsWSClientOptions extends WS.ClientOptions, TerminalsWSBaseOptions {}

export class TerminalsWS extends TerminalsWSBase<NodeWebSocket> {
  private _wsOptions: WS.ClientOptions | null | undefined;

  constructor(
    client: Dedalus,
    parameters: TerminalsWSParameters,
    options?: TerminalsWSClientOptions | null | undefined,
  ) {
    if (!WS?.WebSocket) {
      throw new Error(
        'TerminalsWS from "dedalus/resources/machines/terminals/ws" requires the "ws" package but it could not be loaded.',
      );
    }

    const { reconnect, maxQueueSize, ...wsOptions } = options ?? {};
    super(client, parameters, { reconnect, maxQueueSize });
    this._wsOptions = wsOptions;
    this._connectInitial();
  }

  protected _createSocket(url: URL, authHeaders: Record<string, string>): NodeWebSocket {
    const ws = new WS.WebSocket(url, {
      ...this._wsOptions,
      headers: {
        ...authHeaders,
        ...this._wsOptions?.headers,
      },
    });
    return new NodeWebSocket(ws);
  }
}
