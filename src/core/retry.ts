import { APIConnectionError, APIError } from './error';
import { sleep as sleepDefault } from '../internal/utils/sleep';

export type HeaderSource = { get(name: string): string | null };

export type DelayReason = 'backoff' | 'retry-after';

export interface DelayDecision {
  delayMs: number;
  reason: DelayReason;
  exponentialMs: number;
  jitteredMs: number;
  retryAfterMs: number | undefined;
  jitterMultiplier: number;
}

export interface RetryEvent {
  /** 1-based retry count (the failed attempt that is about to be retried). */
  attempt: number;
  retriesRemaining: number;
  error: Error;
  delayMs: number;
  reason: DelayReason;
}

export interface RetryOptions {
  /**
   * Number of retries after the first attempt.
   * Defaults to 2, matching `client.maxRetries`.
   */
  maxRetries?: number;
  /** Base delay for exponential backoff. @default 500 */
  initialDelayMs?: number;
  /** Cap applied after jitter and Retry-After. @default 30_000 */
  maxDelayMs?: number;
  /**
   * HTTP statuses that are retryable. Any 5xx is also retryable when this
   * list contains at least one 5xx, matching the client.
   * @default [408, 409, 429, 500, 502, 503, 504]
   */
  retryableStatuses?: number[];
  onRetry?: (event: RetryEvent) => void;
  /** Injected for tests. Defaults to `setTimeout`. */
  sleep?: (ms: number) => Promise<void>;
  random?: () => number;
  now?: () => number;
  signal?: AbortSignal;
}

export const DEFAULT_MAX_RETRIES = 2;
export const DEFAULT_INITIAL_DELAY_MS = 500;
export const DEFAULT_MAX_DELAY_MS = 30_000;
export const DEFAULT_RETRYABLE_STATUSES = [408, 409, 429, 500, 502, 503, 504];

/**
 * Parse `Retry-After` (RFC 7231 delay-seconds or HTTP-date) and the
 * de-facto `retry-after-ms` header. Past dates become 0.
 */
export function parseRetryAfterMs(
  headers: HeaderSource | null | undefined,
  now: number = Date.now(),
): number | undefined {
  if (!headers) return undefined;

  const retryAfterMsHeader = headers.get('retry-after-ms');
  if (retryAfterMsHeader != null && retryAfterMsHeader !== '') {
    const ms = Number(retryAfterMsHeader);
    if (Number.isFinite(ms) && ms >= 0) return ms;
  }

  const retryAfter = headers.get('retry-after');
  if (retryAfter == null || retryAfter === '') return undefined;

  const trimmed = retryAfter.trim();
  if (/^\d+(\.\d+)?$/.test(trimmed)) {
    return Number(trimmed) * 1000;
  }

  const dateMs = Date.parse(trimmed);
  if (!Number.isNaN(dateMs)) {
    return Math.max(0, dateMs - now);
  }

  return undefined;
}

/**
 * Jitter the internal exponential delay, then take
 * `min(maxDelayMs, max(jittered, retryAfterMs))`.
 * Server-mandated Retry-After is a floor — never scaled by jitter.
 */
export function calculateDelay(input: {
  attempt: number;
  initialDelayMs: number;
  maxDelayMs: number;
  headers?: HeaderSource | null;
  random?: () => number;
  now?: () => number;
}): DelayDecision {
  const random = input.random ?? Math.random;
  const now = input.now ?? Date.now;
  const jitterMultiplier = 0.75 + random() * 0.5;
  const exponentialMs = input.initialDelayMs * Math.pow(2, input.attempt - 1);
  const jitteredMs = exponentialMs * jitterMultiplier;
  const retryAfterMs = parseRetryAfterMs(input.headers, now());

  const delayMs = Math.min(input.maxDelayMs, Math.max(jitteredMs, retryAfterMs ?? 0));
  const reason: DelayReason =
    retryAfterMs != null && retryAfterMs >= jitteredMs ? 'retry-after' : 'backoff';

  return { delayMs, reason, exponentialMs, jitteredMs, retryAfterMs, jitterMultiplier };
}

export function isRetryable(error: unknown, statuses: number[]): boolean {
  if (error instanceof APIConnectionError) return true;
  if (!(error instanceof APIError)) return false;

  const body = error.error as { retryable?: boolean } | undefined;
  if (body?.retryable === true) return true;

  const status = error.status;
  if (typeof status !== 'number') return false;
  if (statuses.includes(status)) return true;
  if (status >= 500 && statuses.some((s) => s >= 500)) return true;
  return false;
}

export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {},
): Promise<T> {
  const {
    maxRetries = DEFAULT_MAX_RETRIES,
    initialDelayMs = DEFAULT_INITIAL_DELAY_MS,
    maxDelayMs = DEFAULT_MAX_DELAY_MS,
    retryableStatuses = DEFAULT_RETRYABLE_STATUSES,
    onRetry,
    sleep = sleepDefault,
    random = Math.random,
    now = Date.now,
    signal,
  } = options;

  const throwIfAborted = () => {
    if (signal?.aborted) {
      const err = new Error('Retry aborted');
      err.name = 'AbortError';
      throw err;
    }
  };

  for (let attempt = 0; ; attempt++) {
    throwIfAborted();
    try {
      return await fn();
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      const headers = error instanceof APIError ? error.headers : undefined;

      if (attempt >= maxRetries || !isRetryable(error, retryableStatuses)) {
        throw error;
      }

      const decision = calculateDelay({
        attempt: attempt + 1,
        initialDelayMs,
        maxDelayMs,
        headers,
        random,
        now,
      });

      onRetry?.({
        attempt: attempt + 1,
        retriesRemaining: maxRetries - attempt - 1,
        error: err,
        delayMs: decision.delayMs,
        reason: decision.reason,
      });

      throwIfAborted();
      await sleep(decision.delayMs);
    }
  }
}
