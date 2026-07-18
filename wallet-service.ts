import { prisma } from "@/lib/prisma";
import type { TransactionType } from "@prisma/client";

/** Fetches (or lazily creates) a user's primary wallet. */
export async function getOrCreatePrimaryWallet(userId: string) {
  const existing = await prisma.wallet.findFirst({ where: { userId } });
  if (existing) return existing;
  return prisma.wallet.create({ data: { userId, label: "Main Wallet" } });
}

/**
 * Adjusts a holding's balance by `delta` (positive to credit, negative to
 * debit), creating the holding row if it doesn't exist yet. Throws if a
 * debit would make the balance negative.
 */
export async function adjustHolding(walletId: string, symbol: string, delta: number) {
  const holding = await prisma.holding.upsert({
    where: { walletId_symbol: { walletId, symbol } },
    update: {},
    create: { walletId, symbol, amount: 0 },
  });

  const newAmount = Number(holding.amount) + delta;
  if (newAmount < 0) {
    throw new Error(`Insufficient ${symbol} balance`);
  }

  return prisma.holding.update({
    where: { id: holding.id },
    data: { amount: newAmount },
  });
}

interface RecordTransactionParams {
  userId: string;
  type: TransactionType;
  asset: string;
  amount: number;
  usdValue: number;
  fee?: number;
  counterparty?: string;
  status?: "COMPLETED" | "PENDING" | "FAILED";
}

/** Records a transaction row for the audit trail / transaction history. */
export async function recordTransaction(params: RecordTransactionParams) {
  return prisma.transaction.create({
    data: {
      userId: params.userId,
      type: params.type,
      status: params.status ?? "COMPLETED",
      asset: params.asset,
      amount: params.amount,
      usdValue: params.usdValue,
      fee: params.fee ?? 0,
      counterparty: params.counterparty,
    },
  });
}
