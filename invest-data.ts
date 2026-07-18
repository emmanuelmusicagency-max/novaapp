import type { DcaPlan, StakingPosition } from "@/types";

export const STAKING_ASSETS = [
  { symbol: "ETH", name: "Ethereum", apy: 4.2, minLockDays: 0 },
  { symbol: "SOL", name: "Solana", apy: 7.1, minLockDays: 3 },
  { symbol: "ADA", name: "Cardano", apy: 3.4, minLockDays: 0 },
  { symbol: "DOT", name: "Polkadot", apy: 12.4, minLockDays: 28 },
  { symbol: "AVAX", name: "Avalanche", apy: 8.9, minLockDays: 14 },
];

export const STAKING_POSITIONS: StakingPosition[] = [
  { id: "sp1", asset: "ETH", amount: 1.2, apy: 4.2, lockPeriodDays: 0, startDate: "2026-04-10T00:00:00Z", rewardsEarned: 0.021 },
  { id: "sp2", asset: "SOL", amount: 15, apy: 7.1, lockPeriodDays: 3, startDate: "2026-05-22T00:00:00Z", rewardsEarned: 0.42 },
  { id: "sp3", asset: "DOT", amount: 120, apy: 12.4, lockPeriodDays: 28, startDate: "2026-06-01T00:00:00Z", rewardsEarned: 3.1 },
];

export const DCA_PLANS: DcaPlan[] = [
  { id: "dca1", asset: "BTC", amountUsd: 100, frequency: "WEEKLY", nextRunDate: "2026-07-21T00:00:00Z", active: true },
  { id: "dca2", asset: "ETH", amountUsd: 250, frequency: "MONTHLY", nextRunDate: "2026-08-01T00:00:00Z", active: true },
  { id: "dca3", asset: "SOL", amountUsd: 50, frequency: "DAILY", nextRunDate: "2026-07-17T00:00:00Z", active: false },
];

export const AUTO_INVEST_PROFILES = [
  {
    id: "CONSERVATIVE",
    name: "Conservative",
    description: "70% BTC/ETH, 30% stablecoins. Lower volatility.",
    allocation: [
      { symbol: "BTC", pct: 40 },
      { symbol: "ETH", pct: 30 },
      { symbol: "USDC", pct: 30 },
    ],
  },
  {
    id: "BALANCED",
    name: "Balanced",
    description: "Diversified across large and mid-cap assets.",
    allocation: [
      { symbol: "BTC", pct: 35 },
      { symbol: "ETH", pct: 30 },
      { symbol: "SOL", pct: 20 },
      { symbol: "BNB", pct: 15 },
    ],
  },
  {
    id: "AGGRESSIVE",
    name: "Aggressive",
    description: "Higher exposure to high-growth, higher-volatility assets.",
    allocation: [
      { symbol: "SOL", pct: 30 },
      { symbol: "AVAX", pct: 25 },
      { symbol: "DOT", pct: 25 },
      { symbol: "LINK", pct: 20 },
    ],
  },
];
