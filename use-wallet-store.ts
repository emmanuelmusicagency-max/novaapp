import { create } from "zustand";
import type { WalletBalance } from "@/types";

interface WalletState {
  balances: WalletBalance[];
  watchlist: string[];
  isLoading: boolean;
  setBalances: (balances: WalletBalance[]) => void;
  setLoading: (loading: boolean) => void;
  toggleWatchlist: (symbol: string) => void;
  totalUsdValue: () => number;
}

/** Client-side wallet cache, hydrated from `/api/wallet`. */
export const useWalletStore = create<WalletState>((set, get) => ({
  balances: [],
  watchlist: [],
  isLoading: true,
  setBalances: (balances) => set({ balances, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
  toggleWatchlist: (symbol) =>
    set((state) => ({
      watchlist: state.watchlist.includes(symbol)
        ? state.watchlist.filter((s) => s !== symbol)
        : [...state.watchlist, symbol],
    })),
  totalUsdValue: () => get().balances.reduce((sum, b) => sum + b.usdValue, 0),
}));
