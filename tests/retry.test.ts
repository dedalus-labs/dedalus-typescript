import { APIConnectionError, RateLimitError, APIError } from 'dedalus';
import { calculateDelay, parseRetryAfterMs, retryWithBackoff } from '../src/core/retry';

function rateLimit(headers?: HeadersInit) {
  return new RateLimitError(429, { message: 'Rate limited' }, 'Rate limited', new Headers(headers));
}

function apiError(status: number, message: string, headers?: HeadersInit) {
  return new APIError(status, { message }, message, new Headers(headers ?? {}));
}

describe('retryWithBackoff', () => {
  test('succeeds on the first attempt without sleeping', async () => {
    const sleep = jest.fn().mockResolvedValue(undefined);
    const result = await retryWithBackoff(async () => 'ok', { sleep });
    expect(result).toBe('ok');
    expect(sleep).not.toHaveBeenCalled();
  });

  test('retries 429 then succeeds', async () => {
    const sleep = jest.fn().mockResolvedValue(undefined);
    let calls = 0;
    const result = await retryWithBackoff(
      async () => {
        calls += 1;
        if (calls < 3) throw rateLimit();
        return 'success';
      },
      { maxRetries: 3, random: () => 0.5, sleep },
    );
    expect(result).toBe('success');
    expect(calls).toBe(3);
    expect(sleep).toHaveBeenCalledTimes(2);
  });

  test('never waits less than Retry-After seconds, even with low jitter', async () => {
    const decision = calculateDelay({
      attempt: 1,
      initialDelayMs: 500,
      maxDelayMs: 30_000,
      headers: new Headers({ 'retry-after': '5' }),
      random: () => 0.1,
    });
    expect(decision.delayMs).toBe(5000);
    expect(decision.reason).toBe('retry-after');
    expect(decision.jitterMultiplier).toBeCloseTo(0.8);
  });

  test('parses Retry-After HTTP-date (RFC 7231)', async () => {
    const now = Date.parse('Wed, 21 Oct 2026 07:28:00 GMT');
    const later = 'Wed, 21 Oct 2026 07:28:05 GMT';
    expect(parseRetryAfterMs(new Headers({ 'retry-after': later }), now)).toBe(5000);

    const decision = calculateDelay({
      attempt: 1,
      initialDelayMs: 500,
      maxDelayMs: 30_000,
      headers: new Headers({ 'retry-after': later }),
      random: () => 0.1,
      now: () => now,
    });
    expect(decision.delayMs).toBe(5000);
    expect(decision.reason).toBe('retry-after');
  });

  test('honors retry-after-ms', () => {
    expect(parseRetryAfterMs(new Headers({ 'retry-after-ms': '2500' }))).toBe(2500);
  });

  test('ignores unparsable Retry-After', () => {
    expect(parseRetryAfterMs(new Headers({ 'retry-after': 'soon' }))).toBeUndefined();
  });

  test('throws the last error when retries are exhausted', async () => {
    const sleep = jest.fn().mockResolvedValue(undefined);
    const err = apiError(503, 'Unavailable');
    await expect(
      retryWithBackoff(
        async () => {
          throw err;
        },
        { maxRetries: 2, random: () => 0.5, sleep },
      ),
    ).rejects.toBe(err);
    expect(sleep).toHaveBeenCalledTimes(2);
  });

  test('does not retry non-retryable 400', async () => {
    const sleep = jest.fn().mockResolvedValue(undefined);
    let calls = 0;
    const err = apiError(400, 'Bad request');
    await expect(
      retryWithBackoff(
        async () => {
          calls += 1;
          throw err;
        },
        { maxRetries: 5, sleep },
      ),
    ).rejects.toBe(err);
    expect(calls).toBe(1);
    expect(sleep).not.toHaveBeenCalled();
  });

  test('retries connection errors', async () => {
    const sleep = jest.fn().mockResolvedValue(undefined);
    let calls = 0;
    const result = await retryWithBackoff(
      async () => {
        calls += 1;
        if (calls === 1) throw new APIConnectionError({ message: 'socket hang up' });
        return 'up';
      },
      { maxRetries: 2, random: () => 0.5, sleep },
    );
    expect(result).toBe('up');
    expect(calls).toBe(2);
  });

  test('retries when error.error.retryable is true', async () => {
    const sleep = jest.fn().mockResolvedValue(undefined);
    let calls = 0;
    const err = new APIError(422, { message: 'retry me', retryable: true }, 'retry me', new Headers());
    const result = await retryWithBackoff(
      async () => {
        calls += 1;
        if (calls === 1) throw err;
        return 'ok';
      },
      { maxRetries: 1, sleep },
    );
    expect(result).toBe('ok');
    expect(calls).toBe(2);
  });

  test('applies jitter only to exponential backoff', () => {
    const decision = calculateDelay({
      attempt: 3,
      initialDelayMs: 500,
      maxDelayMs: 30_000,
      random: () => 0,
    });
    expect(decision.exponentialMs).toBe(2000);
    expect(decision.jitteredMs).toBe(1500);
    expect(decision.delayMs).toBe(1500);
    expect(decision.reason).toBe('backoff');
  });

  test('onRetry receives attempt, delay, and reason', async () => {
    const sleep = jest.fn().mockResolvedValue(undefined);
    const onRetry = jest.fn();
    let calls = 0;
    await retryWithBackoff(
      async () => {
        calls += 1;
        if (calls === 1) throw rateLimit({ 'retry-after': '5' });
        return 'ok';
      },
      { maxRetries: 1, random: () => 0.1, sleep, onRetry },
    );
    expect(onRetry).toHaveBeenCalledTimes(1);
    expect(onRetry.mock.calls[0][0]).toMatchObject({
      attempt: 1,
      delayMs: 5000,
      reason: 'retry-after',
    });
  });

  test('caps delay at maxDelayMs when Retry-After is larger', () => {
    const decision = calculateDelay({
      attempt: 1,
      initialDelayMs: 500,
      maxDelayMs: 8_000,
      headers: new Headers({ 'retry-after': '60' }),
      random: () => 0.5,
    });
    expect(decision.delayMs).toBe(8000);
  });
});
