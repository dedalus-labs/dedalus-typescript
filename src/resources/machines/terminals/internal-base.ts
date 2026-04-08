// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { path } from '../../../internal/utils/path';
import * as TerminalsAPI from './terminals';
import { Dedalus } from '../../../client';
import { EventEmitter } from '../../../core/EventEmitter';
import { DedalusError } from '../../../core/error';
import { stringifyQuery } from '../../../internal/utils';

import type { ReconnectingEvent } from '../../../internal/ws';

export type TerminalsStreamMessage =
  | { type: 'connecting' | 'open' | 'closing' | 'close' }
  | { type: 'reconnecting'; reconnect: ReconnectingEvent }
  | { type: 'reconnected' }
  | { type: 'message'; message: TerminalsAPI.TerminalServerEvent }
  | { type: 'error'; error: WebSocketError };

export class WebSocketError extends DedalusError {
  /**
   * The error data that the API sent back in an error event.
   */
  error?: TerminalsAPI.TerminalErrorEvent | undefined;

  constructor(message: string, event: TerminalsAPI.TerminalErrorEvent | null) {
    super(message);

    this.error = event ?? undefined;
  }
}

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] } & {};

type WebSocketEvents = Simplify<
  {
    close: () => void;
    event: (event: TerminalsAPI.TerminalServerEvent) => void;
    error: (error: WebSocketError) => void;
    reconnecting: (event: ReconnectingEvent) => void;
    reconnected: () => void;
  } & {
    [EventType in Exclude<NonNullable<TerminalsAPI.TerminalServerEvent['type']>, 'error'>]: (
      event: Extract<TerminalsAPI.TerminalServerEvent, { type?: EventType }>,
    ) => unknown;
  }
>;

export abstract class TerminalsEmitter extends EventEmitter<WebSocketEvents> {
  /**
   * Send an event to the API.
   */
  abstract send(event: TerminalsAPI.TerminalClientEvent): void;

  /**
   * Close the WebSocket connection.
   */
  abstract close(props?: { code: number; reason: string }): void;

  protected _onError(event: null, message: string, cause: any): void;
  protected _onError(event: TerminalsAPI.TerminalErrorEvent, message?: string | undefined): void;
  protected _onError(
    event: TerminalsAPI.TerminalErrorEvent | null,
    message?: string | undefined,
    cause?: any,
  ): void {
    message = message ?? safeJSONStringify(event) ?? 'unknown error';

    if (!this._hasListener('error')) {
      const error = new WebSocketError(
        message +
          `\n\nTo resolve these unhandled rejection errors you should bind an \`error\` callback, e.g. \`ws.on('error', (error) => ...)\` `,
        event,
      );
      // @ts-ignore
      error.cause = cause;
      Promise.reject(error);
      return;
    }

    const error = new WebSocketError(message, event);
    // @ts-ignore
    error.cause = cause;

    this._emit('error', error);
  }
}

export function buildURL(client: Dedalus, parameters: Record<string, unknown>): URL {
  const { machine_id, terminal_id, ...query } = parameters;
  const endpoint = path`/v1/machines/${machine_id}/terminals/${terminal_id}/stream`;
  const baseURL = client.baseURL;
  const url = new URL(baseURL);
  url.pathname +=
    url.pathname.endsWith('/') ?
      endpoint.startsWith('/') ?
        endpoint.slice(1)
      : endpoint
    : endpoint.startsWith('/') ? endpoint
    : `/${endpoint}`;
  if (url.search) {
    url.search += `&${stringifyQuery(query)}`;
  } else {
    url.search = stringifyQuery(query);
  }
  url.protocol = url.protocol === 'http:' || url.protocol === 'ws:' ? 'ws:' : 'wss:';
  return url;
}

function safeJSONStringify(value: unknown): string | null {
  try {
    return JSON.stringify(value);
  } catch {
    return null;
  }
}
