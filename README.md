# VANIKARA INTELLIGENCE PRIVATE LIMITED — Flagship Portal

Welcome to the production repository for **VANIKARA Intelligence Private Limited**. This system serves as the primary student portal, print-binding logistics tracking interface, dynamic settings hub, and CYGMA AI playground.

---

## 1. Technical Stack Architecture

The portal is a high-performance Next.js application structured around:
- **Core Engine**: Next.js App Router, React 19, Framer Motion.
- **3D Universe Scene**: React Three Fiber (R3F), Three.js rendering a custom shader-dust crystal sphere.
- **Database & Auth**: Supabase DB nodes with strict Row-Level Security (RLS).
- **Styling**: Tailwind CSS & Glassmorphism design tokens.
- **Email Gateway**: Transactional SMTP routing via Nodemailer.
- **Payment Controller**: Stripe API payment routing.

---

## 2. Developer Operations Commands

To start developing or running local validation sweeps, use:

```bash
# Install dependencies
npm install

# Run the local development server (with dev tools active)
npm run dev

# Compile TypeScript and bundle optimized production code
npm run build

# Verify codebase checks for lint styling rules
npm run lint

# Run Playwright end-to-end browser tests
npx playwright install # (Only required on first run to setup browser binaries)
npm run test:e2e

# Run the lightweight REST/HTML E2E validator script
npm run test:validate
```

---

## 3. Operations & Reliability Infrastructures

### API Health Checks
Exposed at `/api/health`, this endpoint verifies connection loops in real-time:
- **Database**: Connects to Supabase, running a fast table inquiry.
- **OpenAI AI Node**: Asserts configuration keys are set and start with `sk-`.
- **Admissions Mail SMTP**: Dispatches connection tests to GMAIL SMTP.

### IP-Based Sliding Rate Limiter
Implemented inside `/src/lib/rateLimit.ts` and active across all `/api/ai` prompt entries:
- Limits requests to **30 calls per minute** per client IP.
- Responds with HTTP `429 Too Many Requests` alongside standard `Retry-After` header metrics to block scrapers and protect token budgets.

### Global Error Monitors
Uncaught UI exceptions and promise rejections are automatically intercepted in `ClientLogger.tsx` and POSTed to `/api/logs/report`. This formats client-side crash dumps into server logs.

---

## 4. Documentation References
- Review the operations checklist and restoration policies in the [RC1 Operations Guide](/docs/RC1_GUIDE.md).
- Adjust cookie consent preferences directly in the global consent banner control modal.
