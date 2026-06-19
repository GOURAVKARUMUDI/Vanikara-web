import OpenAI from 'openai';

/**
 * OpenAI SDK Client — Server-Side Only
 *
 * Initializes the OpenAI client with production-ready defaults.
 * The API key is read exclusively from server-side environment variables.
 * This module logs whether the key is present at startup (never the value).
 */

const apiKey = process.env.OPENAI_API_KEY;

// Startup diagnostic — log key availability, never the key itself
if (typeof process !== 'undefined' && process.env) {
  if (apiKey) {
    console.log(
      `[CYGMA][${new Date().toISOString()}][OpenAI Client] ✓ OPENAI_API_KEY is configured (${apiKey.length} chars, prefix: ${apiKey.slice(0, 7)}...)`
    );
  } else {
    console.warn(
      `[CYGMA][${new Date().toISOString()}][OpenAI Client] ✗ OPENAI_API_KEY is NOT set. AI features will be unavailable.`
    );
  }
}

export const openai: OpenAI | null = apiKey
  ? new OpenAI({
      apiKey,
      timeout: 30_000,   // 30 second request timeout
      maxRetries: 2,      // SDK-level retries for transient failures
    })
  : null;

/**
 * Quick check for route guards — avoids initializing provider logic
 * when the key is missing entirely.
 */
export function isOpenAIConfigured(): boolean {
  return openai !== null || process.env.CYGMA_MOCK_AI === 'true';
}
