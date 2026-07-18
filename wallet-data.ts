import type { WalletBalance } from "@/types";
import { CRYPTO_ASSETS } from "@/lib/constants";

/**
 * Demo wallet balances for the signed-in user. In production this is
 * fetched from `/api/wallet` and backed by the Wallet/Holding Prisma models.
 */
export const WALLET_HOLDINGS: WalletBalance[] = [
  { symbol: "BTC", name: "Bitcoin", amount: 0.5241, usdValue: 50607.4, color: "#F7931A" },
  { symbol: "ETH", name: "Ethereum", amount: 5.812, usdValue: 30924.9, color: "#627EEA" },
  { symbol: "SOL", name: "Solana", amount: 42.15, usdValue: 10457.1, color: "#14F195" },
  { symbol: "BNB", name: "BNB", amount: 8.02, usdValue: 5714.6, color: "#F3BA2F" },
  { symbol: "XRP", name: "XRP", amount: 1250, usdValue: 3587.5, color: "#23292F" },
  { symbol: "ADA", name: "Cardano", amount: 890, usdValue: 996.8, color: "#0033AD" },
  { symbol: "USDC", name: "USD Coin", amount: 3200, usdValue: 3200, color: "#2775CA" },
];

export const WALLET_ADDRESSES: Record<string, string> = {
  BTC: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  ETH: "0x71C7656EC7ab88b098defB751B7401B5f6d8976",
  SOL: "7NsgLmMhF8xhCuMHRZDW5bUdEnrLpVzHJj4EEwK6nSMV",
  USDC: "0x71C7656EC7ab88b098defB751B7401B5f6d8976",
};

export function findAssetPrice(symbol: string): number {
  return CRYPTO_ASSETS.find((a) => a.symbol === symbol)?.price ?? 0;
}
