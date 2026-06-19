# VANIKARA Intelligence Portal: RC1 Operations & Recovery Manual

This operations guide outlines procedures for environment key configurations, database recovery actions, and user support fallbacks.

---

## 1. Environment Variable Reference

These parameters must be configured inside Vercel Dashboard Settings or local `.env.local` files:

| Key | Purpose | Expected Value / Format |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Public entry URL for Supabase DB client | `https://*.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon key for Row-Level Security checks | JWT Anon string |
| `SUPABASE_SERVICE_ROLE_KEY` | Service key for server-side admin updates | Secure JWT service role key |
| `OPENAI_API_KEY` | OpenAI completion key for Cygma AI routes | Starts with `sk-proj-...` |
| `GMAIL_USER` | Gmail account routing contact notifications | e.g. `vanikara26@gmail.com` |
| `GMAIL_PASS` | App password generated via Google Security accounts | 16-character secure code |
| `STRIPE_SECRET_KEY` | Stripe endpoint authorization key | `sk_live_...` or `sk_test_...` |
| `STRIPE_WEBHOOK_SECRET` | Secret verifying checkout payment events | `whsec_...` |

---

## 2. Backup & Recovery Guidelines

### Scheduled Database Backups
- **Frequency**: Automatic daily backups are handled natively by Supabase projects.
- **Manual Backups**: Supabase database schemas and tables data can be exported using the Supabase CLI tool:
  ```bash
  # Exports full schema definitions
  supabase db dump --clean > schema.sql
  
  # Exports table contents
  supabase db dump --data-only > data.sql
  ```

### Media Assets Storage
- Resumes uploaded through Careers forms are stored in:
  - Local disk directories `/public/uploads/resumes/` on the server instance.
  - Make sure backup policies copy the local `uploads` directory weekly or transfer uploads to a persistent Supabase Storage Bucket.

---

## 3. Browser Compatibility Fallbacks

### Speech-to-Text (Speech Recognition)
- Browser support for `webkitSpeechRecognition` is native in Chromium-based browsers (Chrome, Edge, Opera) and Safari, but restricted in Firefox.
- **Fallback**: The voice dictation microphone button is hidden or displays a clean warning alert if `window.SpeechRecognition` is not instantiated, letting users input inquiries via standard textareas safely.

### Three.js WebGL Core
- If a device blocks WebGL context initialization or lacks hardware acceleration, the `<Canvas>` controller catches initialization exceptions.
- **Fallback**: A static CSS backdrop using transparent glass overlays and dynamic background color flows replaces Three.js canvas items automatically, ensuring usability remains 100% intact.
