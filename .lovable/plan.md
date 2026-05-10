## Goal

Replace the current `mailto:` fallback in the contact form with a real email backend so:

1. You receive every submission at `shubh4880@gmail.com`
2. The visitor receives an auto-reply addressed to the email they entered ("Hey &nbsp;… thanks for reaching out")

## Approach

Use **Lovable Cloud** (built-in, no external account, no SMTP/Nodemailer setup needed). Nodemailer would require us to host an SMTP credential and an always-on server — Lovable Cloud's email pipeline is the right primitive here (durable queue, retries, suppression, unsubscribe, DKIM/SPF on your own domain). I'll mention this once and move on.

## Steps

1. **Enable Lovable Cloud** — provisions database + edge functions.
2. **Email sender domain setup** — you'll get a one-click dialog to pick a domain (e.g. `notify.yourdomain.com`). Required so emails come from your brand instead of a generic sender and actually land in inboxes. If you don't own a domain yet, we can use a Lovable-provided sender for now and swap later.
3. **Database**
  - `contact_submissions` table: `id uuid pk`, `name text`, `email text`, `message text`, `created_at timestamptz default now()`
  - RLS: anonymous `INSERT` allowed, no `SELECT` for anon (only service role reads it)
4. **Email templates** (React Email, in `supabase/functions/_shared/transactional-email-templates/`)
  - `contact-notification.tsx` — sent to **you** (`ss1188@srmist.edu.in`). Shows name, email, message, timestamp, with a "Reply to &nbsp;" button that opens mailto.
  - `contact-confirmation.tsx` — sent to **the visitor**. Greeting uses the email they entered: *"Hey {email}, thanks for reaching out — I'll get back to you within 24 hours."* Includes the message they sent so they have a copy. Branded with portfolio styling (dark theme accent on white body, mono accents to match SHUBH.OS aesthetic).
  - Both registered in `registry.ts`.
5. **Edge function wiring** — uses the platform's `send-transactional-email` function (already created by infra setup). No custom function needed.
6. **Frontend (`src/components/ContactForm.tsx`)**
  - Remove the `mailto:` fallback branch and the dynamic `@/integrations/supabase/client` import hack.
  - Use the real generated Supabase client.
  - On submit (after Zod validation):
  a. Insert row into `contact_submissions` with a generated `id`
  b. Invoke `send-transactional-email` twice (notification → you, confirmation → visitor) with idempotency keys derived from the row id
  - Toast on success, error toast on failure with email fallback link.
7. **Deploy edge functions** and verify by sending a test submission.

## What you'll see in the UI

- Cloud enable button (one click)
- Email domain setup dialog (one click + DNS info if you have a domain)
- After that: form works end-to-end. You get the notification email; the visitor gets the auto-reply addressed to them.

## Out of scope

- Nodemailer / external SMTP (not needed; Lovable Cloud handles delivery, retries, suppression, DKIM)
- Captcha / spam protection (can add later if you want)
- Admin dashboard to view submissions (data lives in Cloud → Database; can build a UI later)