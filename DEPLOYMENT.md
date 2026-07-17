# Deploying NovaBank

This guide walks through deploying NovaBank to production using Vercel and a
managed PostgreSQL provider.

## 1. Prerequisites

- A [Vercel](https://vercel.com) account
- A PostgreSQL database (e.g. [Neon](https://neon.tech), [Supabase](https://supabase.com),
  [Railway](https://railway.app), or Vercel Postgres)
- An email provider account for transactional email (e.g. [Resend](https://resend.com))
- A GitHub/GitLab/Bitbucket repository containing this project

## 2. Provision the database

1. Create a new PostgreSQL database with your provider of choice.
2. Copy the connection string (it should look like
   `postgresql://user:password@host:5432/dbname?sslmode=require`).
3. Locally, set `DATABASE_URL` in a `.env` file to this connection string.
4. Run the initial migration and seed:

   ```bash
   npx prisma migrate deploy
   npx prisma db seed
   ```

## 3. Configure environment variables

In the Vercel project settings, add the following environment variables
(see `.env.example` for the full list and descriptions):

| Variable | Required | Notes |
|---|---|---|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `JWT_SECRET` | Yes | Long random string, e.g. `openssl rand -base64 48` |
| `JWT_REFRESH_SECRET` | Yes | Different long random string |
| `SESSION_COOKIE_NAME` | No | Defaults to `novabank_session` |
| `NEXT_PUBLIC_APP_URL` | Yes | Your production URL, e.g. `https://novabank.io` |
| `EMAIL_FROM` | Yes | Sender address for transactional email |
| `EMAIL_API_KEY` | Yes | API key from your email provider |
| `MARKET_DATA_API_URL` | No | Defaults to the CoinGecko public API |
| `MARKET_DATA_API_KEY` | No | Only needed for a paid market data tier |

**Never commit real secrets to source control.** Use Vercel's encrypted
environment variable storage for all of the above.

## 4. Deploy to Vercel

1. Import the repository into Vercel ("Add New Project").
2. Vercel auto-detects the Next.js framework. The included `vercel.json`
   overrides the build command to run `prisma generate` before `next build`.
3. Add the environment variables from step 3.
4. Click **Deploy**.

Alternatively, deploy from the CLI:

```bash
npm install -g vercel
vercel login
vercel --prod
```

## 5. Run database migrations against production

After the first deploy, apply migrations to your production database:

```bash
DATABASE_URL="<your-production-db-url>" npx prisma migrate deploy
```

Re-run this command any time `prisma/schema.prisma` changes.

## 6. Post-deploy checklist

- [ ] Visit `/register` and confirm account creation + email delivery work
- [ ] Confirm `/login` issues a session cookie and redirects to `/dashboard`
- [ ] Confirm `/admin` is reachable only by users with the `ADMIN` role
- [ ] Verify HTTPS is enforced (Vercel does this automatically)
- [ ] Set up a custom domain in Vercel's Domains settings
- [ ] Configure your email provider's sending domain (SPF/DKIM records)
- [ ] Set up database backups with your PostgreSQL provider
- [ ] Review and tighten `RATE_LIMIT_MAX_REQUESTS` / `RATE_LIMIT_WINDOW_MS`
      for production traffic patterns

## 7. Scaling notes

- The in-memory rate limiter in `src/lib/rate-limit.ts` is fine for a single
  serverless region but will not share state across regions/instances at
  scale — swap in a Redis-backed limiter (e.g. Upstash) for multi-region
  deployments.
- Prisma's connection pooling works out of the box with most providers;
  for high-concurrency serverless workloads, use your provider's pooled
  connection string (e.g. Neon's pooled endpoint, or PgBouncer).

## 8. Rolling back

Vercel keeps every previous deployment. To roll back, go to the project's
**Deployments** tab, find the last known-good deployment, and select
**Promote to Production**.
