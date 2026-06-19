interface RateLimitRecord {
  timestamps: number[];
}

const ipCache = new Map<string, RateLimitRecord>();

const LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 30; // 30 requests per minute

/**
 * Checks if a specific client IP exceeds the rate limits.
 * Returns information about the limit check.
 */
export function isRateLimited(ip: string): { limited: boolean; remaining: number; reset: number } {
  const now = Date.now();
  if (!ipCache.has(ip)) {
    ipCache.set(ip, { timestamps: [now] });
    return { limited: false, remaining: MAX_REQUESTS - 1, reset: now + LIMIT_WINDOW_MS };
  }

  const record = ipCache.get(ip)!;
  // Filter out timestamps older than the sliding window
  record.timestamps = record.timestamps.filter(ts => now - ts < LIMIT_WINDOW_MS);
  
  if (record.timestamps.length >= MAX_REQUESTS) {
    const oldest = record.timestamps[0];
    return { 
      limited: true, 
      remaining: 0, 
      reset: oldest + LIMIT_WINDOW_MS 
    };
  }

  record.timestamps.push(now);
  return { 
    limited: false, 
    remaining: MAX_REQUESTS - record.timestamps.length, 
    reset: record.timestamps[0] + LIMIT_WINDOW_MS 
  };
}
