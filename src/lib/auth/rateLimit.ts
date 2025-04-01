export interface RateLimitOptions {
  interval: number;
  limit: number;
  uniqueTokenPerInterval: number;
}

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

export function rateLimit(options: RateLimitOptions) {
  const store: RateLimitStore = {};

  return {
    async check(token: string) {
      const now = Date.now();
      const resetTime = now + options.interval;

      if (!store[token]) {
        store[token] = {
          count: 0,
          resetTime,
        };
      }

      if (now > store[token].resetTime) {
        store[token] = {
          count: 0,
          resetTime,
        };
      }

      store[token].count++;

      const count = store[token].count;

      if (count > options.limit) {
        const error: unknown = new Error("Rate limit exceeded");
        (error as Error).name = "RateLimitError";
        throw error;
      }

      // Clean up old entries
      const keys = Object.keys(store);
      if (keys.length > options.uniqueTokenPerInterval) {
        const oldestKey = keys.reduce((oldest, key) => {
          return store[key].resetTime < store[oldest].resetTime ? key : oldest;
        }, keys[0]);

        delete store[oldestKey];
      }
    },
  };
}
