import { retryWithBackoff } from '../src/core/retry';
import { APIError } from '../src/core/error';

describe('retryWithBackoff', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should retry on 429 errors', async () => {
    const mockFn = jest.fn()
      .mockRejectedValueOnce(new APIError('Rate limited', 429))
      .mockRejectedValueOnce(new APIError('Rate limited', 429))
      .mockResolvedValue('success');

    const result = await retryWithBackoff(mockFn, { maxRetries: 3 });
    expect(result).toBe('success');
    expect(mockFn).toHaveBeenCalledTimes(3);
  });

  it('should respect Retry-After header', async () => {
    const error = new APIError('Rate limited', 429);
    (error as any).headers = new Headers({ 'retry-after': '5' });

    const mockFn = jest.fn()
      .mockRejectedValueOnce(error)
      .mockResolvedValue('success');

    const onRetry = jest.fn();
    const result = await retryWithBackoff(mockFn, {
      maxRetries: 1,
      onRetry,
    });

    expect(result).toBe('success');
    expect(onRetry).toHaveBeenCalledWith(1, error, 5000);
  });
});
