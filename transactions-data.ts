import type { Transaction } from "@/types";

export const ALL_TRANSACTIONS: Transaction[] = [
  { id: "tx1", type: "BUY", status: "COMPLETED", asset: "BTC", amount: 0.042, usdValue: 4054.7, fee: 20.27, createdAt: "2026-07-15T14:22:00Z" },
  { id: "tx2", type: "STAKE", status: "COMPLETED", asset: "ETH", amount: 1.2, usdValue: 6385.0, fee: 0, createdAt: "2026-07-14T09:10:00Z" },
  { id: "tx3", type: "SWAP", status: "COMPLETED", asset: "SOL → USDC", amount: 12.5, usdValue: 3102.4, fee: 4.65, createdAt: "2026-07-13T18:45:00Z" },
  { id: "tx4", type: "WITHDRAW", status: "PENDING", asset: "BTC", amount: 0.01, usdValue: 965.4, fee: 1.5, createdAt: "2026-07-13T08:00:00Z" },
  { id: "tx5", type: "RECEIVE", status: "COMPLETED", asset: "ETH", amount: 0.5, usdValue: 2660.4, fee: 0, createdAt: "2026-07-11T16:30:00Z" },
  { id: "tx6", type: "SELL", status: "COMPLETED", asset: "ADA", amount: 500, usdValue: 560.0, fee: 2.8, createdAt: "2026-07-10T11:12:00Z" },
  { id: "tx7", type: "DEPOSIT", status: "COMPLETED", asset: "USDC", amount: 1000, usdValue: 1000, fee: 0, createdAt: "2026-07-09T07:45:00Z" },
  { id: "tx8", type: "SEND", status: "COMPLETED", asset: "SOL", amount: 5, usdValue: 1240.95, fee: 0.1, createdAt: "2026-07-07T21:00:00Z" },
  { id: "tx9", type: "REWARD", status: "COMPLETED", asset: "ETH", amount: 0.012, usdValue: 63.85, fee: 0, createdAt: "2026-07-06T00:00:00Z" },
  { id: "tx10", type: "BUY", status: "FAILED", asset: "DOGE", amount: 1000, usdValue: 420, fee: 2.1, createdAt: "2026-07-04T13:20:00Z" },
];
