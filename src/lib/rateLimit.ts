interface RateLimitRecord {
  timestamps: number[];
}

const ipCache = new Map<string, RateLimitRecord>();

const LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 30; // 30 requests per minute

/**
 * Checks if a specific client IP exceeds the rate limits.
 * Integrates Upstash Redis (if configured) with local in-memory fallback.
 */
export async function isRateLimited(ip: string): Promise<{ limited: boolean; remaining: number; reset: number }> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (url && token) {
    try {
      const key = `ratelimit:${ip}`;
      // Execute INCR using Upstash REST API
      const res = await fetch(`${url}/incr/${key}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (res.ok) {
        const { result: count } = await res.json();
        
        if (count === 1) {
          // Set expiry to 60 seconds on initial increment
          await fetch(`${url}/expire/${key}/60`, {
            headers: { Authorization: `Bearer ${token}` }
          });
        }

        let ttl = 60;
        const ttlRes = await fetch(`${url}/ttl/${key}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (ttlRes.ok) {
          const ttlData = await ttlRes.json();
          if (typeof ttlData.result === "number" && ttlData.result > 0) {
            ttl = ttlData.result;
          }
        }

        const remaining = Math.max(0, MAX_REQUESTS - count);
        return {
          limited: count > MAX_REQUESTS,
          remaining,
          reset: Date.now() + (ttl * 1000)
        };
      }
    } catch (err) {
      console.warn("Upstash Redis connection failed, falling back to local memory rate limiter:", err);
    }
  }

  // Fallback: Local in-memory sliding window rate limiting
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
