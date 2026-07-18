import { PrismaClient } from "@prisma/client";

/**
 * Prisma client singleton. In development, Next.js hot-reloads modules,
 * which would otherwise create a new PrismaClient (and new DB connections)
 * on every edit — so we cache the instance on `globalThis`.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
