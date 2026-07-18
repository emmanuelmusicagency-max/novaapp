import { create } from "zustand";
import type { User } from "@/types";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => Promise<void>;
}

/**
 * Client-side mirror of the authenticated user, hydrated on app load from
 * `/api/auth/me`. The source of truth for the session itself is always the
 * httpOnly cookie verified server-side; this store just avoids prop-drilling.
 */
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
  logout: async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    set({ user: null });
    window.location.href = "/login";
  },
}));
