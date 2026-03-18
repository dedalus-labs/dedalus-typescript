// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { DedalusError } from './error';
import { FinalRequestOptions } from '../internal/request-options';
import { defaultParseResponse } from '../internal/parse';
import { type Dedalus } from '../client';
import { APIPromise } from './api-promise';
import { type APIResponseProps } from '../internal/parse';
import { maybeObj } from '../internal/utils/values';

export type PageRequestOptions = Pick<FinalRequestOptions, 'query' | 'headers' | 'body' | 'path' | 'method'>;

export abstract class AbstractPage<Item> implements AsyncIterable<Item> {
  #client: Dedalus;
  protected options: FinalRequestOptions;

  protected response: Response;
  protected body: unknown;

  constructor(client: Dedalus, response: Response, body: unknown, options: FinalRequestOptions) {
    this.#client = client;
    this.options = options;
    this.response = response;
    this.body = body;
  }

  abstract nextPageRequestOptions(): PageRequestOptions | null;

  abstract getPaginatedItems(): Item[];

  hasNextPage(): boolean {
    const items = this.getPaginatedItems();
    if (!items.length) return false;
    return this.nextPageRequestOptions() != null;
  }

  async getNextPage(): Promise<this> {
    const nextOptions = this.nextPageRequestOptions();
    if (!nextOptions) {
      throw new DedalusError(
        'No next page expected; please check `.hasNextPage()` before calling `.getNextPage()`.',
      );
    }

    return await this.#client.requestAPIList(this.constructor as any, nextOptions);
  }

  async *iterPages(): AsyncGenerator<this> {
    let page: this = this;
    yield page;
    while (page.hasNextPage()) {
      page = await page.getNextPage();
      yield page;
    }
  }

  async *[Symbol.asyncIterator](): AsyncGenerator<Item> {
    for await (const page of this.iterPages()) {
      for (const item of page.getPaginatedItems()) {
        yield item;
      }
    }
  }
}

/**
 * This subclass of Promise will resolve to an instantiated Page once the request completes.
 *
 * It also implements AsyncIterable to allow auto-paginating iteration on an unawaited list call, eg:
 *
 *    for await (const item of client.items.list()) {
 *      console.log(item)
 *    }
 */
export class PagePromise<
    PageClass extends AbstractPage<Item>,
    Item = ReturnType<PageClass['getPaginatedItems']>[number],
  >
  extends APIPromise<PageClass>
  implements AsyncIterable<Item>
{
  constructor(
    client: Dedalus,
    request: Promise<APIResponseProps>,
    Page: new (...args: ConstructorParameters<typeof AbstractPage>) => PageClass,
  ) {
    super(
      client,
      request,
      async (client, props) =>
        new Page(client, props.response, await defaultParseResponse(client, props), props.options),
    );
  }

  /**
   * Allow auto-paginating iteration on an unawaited list call, eg:
   *
   *    for await (const item of client.items.list()) {
   *      console.log(item)
   *    }
   */
  async *[Symbol.asyncIterator](): AsyncGenerator<Item> {
    const page = await this;
    for await (const item of page) {
      yield item;
    }
  }
}

export interface WorkspaceListResponse<Item> {
  items: Array<Item>;

  next_cursor: string | null;
}

export interface WorkspaceListParams {
  cursor?: string;

  limit?: number;
}

export class WorkspaceList<Item> extends AbstractPage<Item> implements WorkspaceListResponse<Item> {
  items: Array<Item>;

  next_cursor: string | null;

  constructor(
    client: Dedalus,
    response: Response,
    body: WorkspaceListResponse<Item>,
    options: FinalRequestOptions,
  ) {
    super(client, response, body, options);

    this.items = body.items || [];
    this.next_cursor = body.next_cursor || null;
  }

  getPaginatedItems(): Item[] {
    return this.items ?? [];
  }

  nextPageRequestOptions(): PageRequestOptions | null {
    const cursor = this.next_cursor;
    if (!cursor) {
      return null;
    }

    return {
      ...this.options,
      query: {
        ...maybeObj(this.options.query),
        cursor,
      },
    };
  }
}

export interface SSHSessionListResponse<Item> {
  items: Array<Item>;

  next_cursor: string | null;
}

export interface SSHSessionListParams {
  cursor?: string;

  limit?: number;
}

export class SSHSessionList<Item> extends AbstractPage<Item> implements SSHSessionListResponse<Item> {
  items: Array<Item>;

  next_cursor: string | null;

  constructor(
    client: Dedalus,
    response: Response,
    body: SSHSessionListResponse<Item>,
    options: FinalRequestOptions,
  ) {
    super(client, response, body, options);

    this.items = body.items || [];
    this.next_cursor = body.next_cursor || null;
  }

  getPaginatedItems(): Item[] {
    return this.items ?? [];
  }

  nextPageRequestOptions(): PageRequestOptions | null {
    const cursor = this.next_cursor;
    if (!cursor) {
      return null;
    }

    return {
      ...this.options,
      query: {
        ...maybeObj(this.options.query),
        cursor,
      },
    };
  }
}

export interface ExecutionListResponse<Item> {
  items: Array<Item>;

  next_cursor: string | null;
}

export interface ExecutionListParams {
  cursor?: string;

  limit?: number;
}

export class ExecutionList<Item> extends AbstractPage<Item> implements ExecutionListResponse<Item> {
  items: Array<Item>;

  next_cursor: string | null;

  constructor(
    client: Dedalus,
    response: Response,
    body: ExecutionListResponse<Item>,
    options: FinalRequestOptions,
  ) {
    super(client, response, body, options);

    this.items = body.items || [];
    this.next_cursor = body.next_cursor || null;
  }

  getPaginatedItems(): Item[] {
    return this.items ?? [];
  }

  nextPageRequestOptions(): PageRequestOptions | null {
    const cursor = this.next_cursor;
    if (!cursor) {
      return null;
    }

    return {
      ...this.options,
      query: {
        ...maybeObj(this.options.query),
        cursor,
      },
    };
  }
}

export interface ExecutionEventsResponse<Item> {
  items: Array<Item>;

  next_cursor: string | null;
}

export interface ExecutionEventsParams {
  cursor?: string;

  limit?: number;
}

export class ExecutionEvents<Item> extends AbstractPage<Item> implements ExecutionEventsResponse<Item> {
  items: Array<Item>;

  next_cursor: string | null;

  constructor(
    client: Dedalus,
    response: Response,
    body: ExecutionEventsResponse<Item>,
    options: FinalRequestOptions,
  ) {
    super(client, response, body, options);

    this.items = body.items || [];
    this.next_cursor = body.next_cursor || null;
  }

  getPaginatedItems(): Item[] {
    return this.items ?? [];
  }

  nextPageRequestOptions(): PageRequestOptions | null {
    const cursor = this.next_cursor;
    if (!cursor) {
      return null;
    }

    return {
      ...this.options,
      query: {
        ...maybeObj(this.options.query),
        cursor,
      },
    };
  }
}

export interface ArtifactListResponse<Item> {
  items: Array<Item>;

  next_cursor: string | null;
}

export interface ArtifactListParams {
  cursor?: string;

  limit?: number;
}

export class ArtifactList<Item> extends AbstractPage<Item> implements ArtifactListResponse<Item> {
  items: Array<Item>;

  next_cursor: string | null;

  constructor(
    client: Dedalus,
    response: Response,
    body: ArtifactListResponse<Item>,
    options: FinalRequestOptions,
  ) {
    super(client, response, body, options);

    this.items = body.items || [];
    this.next_cursor = body.next_cursor || null;
  }

  getPaginatedItems(): Item[] {
    return this.items ?? [];
  }

  nextPageRequestOptions(): PageRequestOptions | null {
    const cursor = this.next_cursor;
    if (!cursor) {
      return null;
    }

    return {
      ...this.options,
      query: {
        ...maybeObj(this.options.query),
        cursor,
      },
    };
  }
}

export interface PreviewListResponse<Item> {
  items: Array<Item>;

  next_cursor: string | null;
}

export interface PreviewListParams {
  cursor?: string;

  limit?: number;
}

export class PreviewList<Item> extends AbstractPage<Item> implements PreviewListResponse<Item> {
  items: Array<Item>;

  next_cursor: string | null;

  constructor(
    client: Dedalus,
    response: Response,
    body: PreviewListResponse<Item>,
    options: FinalRequestOptions,
  ) {
    super(client, response, body, options);

    this.items = body.items || [];
    this.next_cursor = body.next_cursor || null;
  }

  getPaginatedItems(): Item[] {
    return this.items ?? [];
  }

  nextPageRequestOptions(): PageRequestOptions | null {
    const cursor = this.next_cursor;
    if (!cursor) {
      return null;
    }

    return {
      ...this.options,
      query: {
        ...maybeObj(this.options.query),
        cursor,
      },
    };
  }
}

export interface TerminalListResponse<Item> {
  items: Array<Item>;

  next_cursor: string | null;
}

export interface TerminalListParams {
  cursor?: string;

  limit?: number;
}

export class TerminalList<Item> extends AbstractPage<Item> implements TerminalListResponse<Item> {
  items: Array<Item>;

  next_cursor: string | null;

  constructor(
    client: Dedalus,
    response: Response,
    body: TerminalListResponse<Item>,
    options: FinalRequestOptions,
  ) {
    super(client, response, body, options);

    this.items = body.items || [];
    this.next_cursor = body.next_cursor || null;
  }

  getPaginatedItems(): Item[] {
    return this.items ?? [];
  }

  nextPageRequestOptions(): PageRequestOptions | null {
    const cursor = this.next_cursor;
    if (!cursor) {
      return null;
    }

    return {
      ...this.options,
      query: {
        ...maybeObj(this.options.query),
        cursor,
      },
    };
  }
}
