/**
 * CYGMA AI — Backend Integration Test Suite
 *
 * Validates that the AI chat pipeline is functional end-to-end.
 * Runs against the local development server at http://localhost:3000.
 *
 * Usage:
 *   npx tsx scripts/test-ai-backend.ts
 *
 * Exit code 0 = all tests pass, 1 = one or more failures.
 */

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';
const STREAM_ENDPOINT = `${BASE_URL}/api/ai/stream`;
const TIMEOUT_MS = 60_000;                // 60s to allow for rate-limit retries on the backend
const DELAY_BETWEEN_TESTS_MS = process.env.CYGMA_MOCK_AI === 'true' ? 0 : 25_000;    // Respect rate limits unless in mock mode

interface TestCase {
  name: string;
  prompt: string;
  validate: (response: string) => boolean;
}

const TEST_CASES: TestCase[] = [
  {
    name: 'Basic Greeting',
    prompt: 'Hello',
    validate: (r) => r.length > 5, // Any non-trivial response
  },
  {
    name: 'Python Code Generation',
    prompt: 'Write a Python function to reverse a string. Include the function definition.',
    validate: (r) => {
      const lower = r.toLowerCase();
      return lower.includes('def ') || lower.includes('python') || lower.includes('reverse');
    },
  },
  {
    name: 'React Technical Explanation',
    prompt: 'Explain what React hooks are in 3 sentences.',
    validate: (r) => {
      const lower = r.toLowerCase();
      return lower.includes('react') || lower.includes('hook') || lower.includes('state') || lower.includes('component');
    },
  },
  {
    name: 'SQL Query Generation',
    prompt: 'Create a PostgreSQL query to find duplicate email addresses in a users table.',
    validate: (r) => {
      const lower = r.toLowerCase();
      return lower.includes('select') || lower.includes('group by') || lower.includes('having') || lower.includes('sql');
    },
  },
];

// ─────────────────────────────────────────────

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runTest(testCase: TestCase): Promise<{
  name: string;
  passed: boolean;
  statusCode: number;
  responseTime: number;
  responseLength: number;
  error?: string;
}> {
  const start = Date.now();

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const response = await fetch(STREAM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: testCase.prompt,
        model: 'gpt-4o',
        fileContext: '',
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      let errorDetail = `HTTP ${response.status}`;
      try {
        const errBody = await response.json();
        if (errBody?.error) errorDetail += `: ${errBody.error}`;
      } catch {
        // not JSON
      }
      return {
        name: testCase.name,
        passed: false,
        statusCode: response.status,
        responseTime: Date.now() - start,
        responseLength: 0,
        error: errorDetail,
      };
    }

    // Read the full streamed response
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let fullText = '';

    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });

        // Skip metadata chunks
        if (chunk.startsWith('[METADATA]:')) {
          const metaLine = chunk.split('\n')[0];
          const rest = chunk.replace(metaLine + '\n', '');
          fullText += rest;
        } else {
          fullText += chunk;
        }
      }
    }

    const responseTime = Date.now() - start;
    const passed = testCase.validate(fullText);

    return {
      name: testCase.name,
      passed,
      statusCode: response.status,
      responseTime,
      responseLength: fullText.length,
      error: passed ? undefined : `Validation failed. Response (${fullText.length} chars): "${fullText.slice(0, 200)}..."`,
    };
  } catch (err: any) {
    return {
      name: testCase.name,
      passed: false,
      statusCode: 0,
      responseTime: Date.now() - start,
      responseLength: 0,
      error: err.name === 'AbortError' ? `Timeout after ${TIMEOUT_MS}ms` : err.message,
    };
  }
}

// ─────────────────────────────────────────────

async function main() {
  console.log('\n╔══════════════════════════════════════════════════╗');
  console.log('║   CYGMA AI — Backend Integration Test Suite      ║');
  console.log('╚══════════════════════════════════════════════════╝\n');
  console.log(`Target: ${STREAM_ENDPOINT}`);
  console.log(`Timeout: ${TIMEOUT_MS / 1000}s per test`);
  console.log(`Delay: ${DELAY_BETWEEN_TESTS_MS / 1000}s between tests (rate limit safety)`);
  console.log(`Tests: ${TEST_CASES.length}\n`);
  console.log('─'.repeat(60));

  let allPassed = true;

  for (let i = 0; i < TEST_CASES.length; i++) {
    const testCase = TEST_CASES[i];

    // Wait between tests to avoid hitting OpenAI rate limits
    if (i > 0) {
      process.stdout.write(`\n   ⏱ Waiting ${DELAY_BETWEEN_TESTS_MS / 1000}s before next test (rate limit safety)...`);
      await sleep(DELAY_BETWEEN_TESTS_MS);
    }

    process.stdout.write(`\n⏳ ${testCase.name}... `);

    const result = await runTest(testCase);

    if (result.passed) {
      console.log(`✅ PASS`);
      console.log(`   Status: ${result.statusCode} | Time: ${result.responseTime}ms | Length: ${result.responseLength} chars`);
    } else {
      console.log(`❌ FAIL`);
      console.log(`   Status: ${result.statusCode} | Time: ${result.responseTime}ms`);
      console.log(`   Error: ${result.error}`);
      allPassed = false;
    }
  }

  console.log('\n' + '─'.repeat(60));

  if (allPassed) {
    console.log('\n🎉 All tests passed! CYGMA AI backend is production-ready.\n');
    process.exit(0);
  } else {
    console.log('\n⚠️  Some tests failed. Review the errors above before deploying.\n');
    process.exit(1);
  }
}

main();
