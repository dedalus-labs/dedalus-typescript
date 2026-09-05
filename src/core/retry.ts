import { sleep } from '../internal/utils/sleep';
import { RateLimitError, APIError } from './error';

export interface RetryOptions {
  maxRetries?: number;
  initialDelayMs?: number;
  maxDelayMs?: number;
  retryableStatuses?: number[];
  onRetry?: (attempt: number, error: Error, delayMs: number) => void;
}

export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxRetries = 5,
    initialDelayMs = 500,
    maxDelayMs = 30000,
    retryableStatuses = [429, 500, 502, 503, 504],
    onRetry,
  } = options;

  let lastError: Error;

  for (let attempt = 1; attempt <= maxRetries + 1; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (attempt > maxRetries || !isRetryable(error, retryableStatuses)) {
        throw lastError;
      }

      let delayMs = calculateDelay(attempt, initialDelayMs, maxDelayMs, error);
      onRetry?.(attempt, lastError, delayMs);
      await sleep(delayMs);
    }
  }

  throw lastError;
}

function isRetryable(error: Error, statuses: number[]): boolean {
  if (error instanceof RateLimitError) return true;
  if (error instanceof APIError) {
    return statuses.includes(error.status);
  }
  return false;
}

function calculateDelay(
  attempt: number,
  initialDelayMs: number,
  maxDelayMs: number,
  error: Error
): number {
  let delayMs = initialDelayMs * Math.pow(2, attempt - 1);

  if (error instanceof APIError && error.headers?.has('retry-after')) {
    const retryAfter = error.headers.get('retry-after');
    if (retryAfter) {
      const seconds = parseInt(retryAfter);
      if (!isNaN(seconds)) {
        delayMs = Math.max(delayMs, seconds * 1000);
      }
    }
  }

  delayMs = Math.min(delayMs, maxDelayMs);
  delayMs = delayMs * (0.75 + Math.random() * 0.5);

  return delayMs;
}
