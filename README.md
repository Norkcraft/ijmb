# IJMB Admissions Platform

Next.js 14 App Router application for IJMB marketing, authentication, application flow, student portal, and admin operations.

## Stack
- Next.js 14 + TypeScript + Tailwind CSS
- Supabase (Auth, Postgres, RLS)
- Paystack (test mode payments + verified webhooks)

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy env file:
   ```bash
   cp .env.example .env.local
   ```
3. Fill variables in `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_APP_URL`
   - `SUPABASE_SERVICE_ROLE_KEY` (server only)
   - `PAYSTACK_SECRET_KEY` (server only)
   - `PAYSTACK_WEBHOOK_SECRET` (server only)

## Run locally
```bash
npm run dev
```

## Auth Redirect URLs
In Supabase Auth settings, add:
- `http://localhost:3000/reset-password` (dev)
- `https://www.ijmb.info/reset-password` (prod)

Also ensure Site URL points to current environment app URL.

## Paystack test configuration
- Use test secret key in `PAYSTACK_SECRET_KEY`.
- Add webhook URL:
  - Dev: `http://localhost:3000/api/webhooks/paystack`
  - Prod: `https://www.ijmb.info/api/webhooks/paystack`
- Payment unlock is webhook-only: `applications.form_fee_paid` becomes true only after `charge.success` verification.

## Payment test flow
1. Register and verify email.
2. Complete `/apply` steps and submit.
3. Go to `/apply/pay` and initialize payment.
4. Complete Paystack test checkout.
5. Confirm payment status in `/portal` and `/portal/payments`.

## Admin setup
After creating a user, set role in Supabase SQL editor:
```sql
update profiles set role = 'admin' where id = '<USER_UUID>';
```

Then login and access `/admin`.

## Route map
Public: `/`, `/about`, `/requirements`, `/fees`, `/faq`, `/contact`

Auth: `/register`, `/login`, `/verify-email`, `/forgot-password`, `/reset-password`

Apply: `/apply`, `/apply/personal`, `/apply/academics`, `/apply/program`, `/apply/review`, `/apply/pay`, `/apply/success`, `/apply/failed`

Student Portal: `/portal`, `/portal/application`, `/portal/payments`, `/portal/documents`, `/portal/support`, `/portal/profile`, `/portal/security`

Admin: `/admin`, `/admin/applications`, `/admin/applications/[id]`, `/admin/payments`
