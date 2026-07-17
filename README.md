# NovaBank

NovaBank is an enterprise-grade crypto investment banking platform built with
Next.js 15, React 19, TypeScript, Prisma, and PostgreSQL. It provides secure
authentication, a full trading/wallet suite, staking and DCA investment
tools, live portfolio analytics, and a complete admin back office.

> **Disclaimer:** This is a demonstration / portfolio-grade application
> scaffold. It is not connected to real banking rails, real cryptocurrency
> networks, or real custodial wallets. Before handling real funds, real user
> KYC data, or real crypto custody, it would require a licensed banking
> partner, a compliance/legal review, and a professional security audit.

## Tech Stack

- **Framework:** Next.js 15 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS, shadcn/ui, Framer Motion, Lucide Icons
- **State:** Zustand
- **Forms/Validation:** React Hook Form + Zod
- **Data:** Prisma ORM + PostgreSQL
- **Charts:** Recharts
- **Notifications:** Sonner

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Configure environment variables
cp .env.example .env
# then edit .env with real values

# 3. Set up the database
npx prisma migrate dev
npx prisma db seed

# 4. Run the dev server
npm run dev
```

Visit `http://localhost:3000`.

## Project Structure

```
novabank/
├── app/                  # Next.js App Router pages & layouts
├── src/
│   ├── components/       # UI + feature components
│   ├── lib/               # utils, auth, api helpers, validation
│   ├── hooks/              # custom React hooks
│   ├── store/               # Zustand stores
│   └── types/                # shared TypeScript types
├── prisma/
│   ├── schema.prisma      # database schema
│   └── seed.ts             # database seed script
└── public/                  # static assets
```

## Scripts

| Command                  | Description                          |
|---------------------------|---------------------------------------|
| `npm run dev`              | Start development server              |
| `npm run build`             | Build for production                   |
| `npm run start`              | Start production server                 |
| `npm run lint`                 | Run ESLint                              |
| `npm run prisma:migrate`        | Run Prisma migrations                    |
| `npm run prisma:seed`             | Seed the database                        |
| `npm run prisma:studio`             | Open Prisma Studio                        |

## Deployment

See `DEPLOYMENT.md` (generated in the final phase) for a full Vercel +
managed Postgres deployment walkthrough.

## License

Proprietary — all rights reserved.
