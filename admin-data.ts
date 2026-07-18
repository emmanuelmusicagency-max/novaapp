import type { SupportTicket, User } from "@/types";

export interface AdminUserRow extends User {
  totalBalanceUsd: number;
  status: "ACTIVE" | "SUSPENDED";
}

export const ADMIN_USERS: AdminUserRow[] = [
  { id: "u1", firstName: "Priya", lastName: "Sharma", email: "priya@example.com", role: "USER", kycStatus: "VERIFIED", twoFactorEnabled: true, createdAt: "2026-01-12T00:00:00Z", totalBalanceUsd: 84210.5, status: "ACTIVE" },
  { id: "u2", firstName: "Marcus", lastName: "Cole", email: "marcus@example.com", role: "USER", kycStatus: "PENDING", twoFactorEnabled: false, createdAt: "2026-02-03T00:00:00Z", totalBalanceUsd: 12040.2, status: "ACTIVE" },
  { id: "u3", firstName: "Elena", lastName: "Vasquez", email: "elena@example.com", role: "USER", kycStatus: "VERIFIED", twoFactorEnabled: true, createdAt: "2026-02-19T00:00:00Z", totalBalanceUsd: 210900.0, status: "ACTIVE" },
  { id: "u4", firstName: "Daniel", lastName: "Okafor", email: "daniel@example.com", role: "USER", kycStatus: "REJECTED", twoFactorEnabled: false, createdAt: "2026-03-01T00:00:00Z", totalBalanceUsd: 0, status: "SUSPENDED" },
  { id: "u5", firstName: "Hana", lastName: "Kobayashi", email: "hana@example.com", role: "USER", kycStatus: "UNVERIFIED", twoFactorEnabled: false, createdAt: "2026-03-22T00:00:00Z", totalBalanceUsd: 540.0, status: "ACTIVE" },
  { id: "u6", firstName: "Admin", lastName: "User", email: "admin@novabank.io", role: "ADMIN", kycStatus: "VERIFIED", twoFactorEnabled: true, createdAt: "2025-11-01T00:00:00Z", totalBalanceUsd: 0, status: "ACTIVE" },
];

export const KYC_QUEUE = ADMIN_USERS.filter((u) => u.kycStatus === "PENDING" || u.kycStatus === "UNVERIFIED");

export const SUPPORT_TICKETS: SupportTicket[] = [
  { id: "t1", subject: "Withdrawal stuck in pending", status: "OPEN", priority: "HIGH", userEmail: "marcus@example.com", createdAt: "2026-07-14T10:00:00Z", updatedAt: "2026-07-15T09:00:00Z" },
  { id: "t2", subject: "Unable to complete KYC upload", status: "IN_PROGRESS", priority: "MEDIUM", userEmail: "hana@example.com", createdAt: "2026-07-12T14:00:00Z", updatedAt: "2026-07-14T11:00:00Z" },
  { id: "t3", subject: "Question about staking lock period", status: "RESOLVED", priority: "LOW", userEmail: "priya@example.com", createdAt: "2026-07-10T08:00:00Z", updatedAt: "2026-07-11T16:00:00Z" },
  { id: "t4", subject: "Suspicious login alert", status: "OPEN", priority: "URGENT", userEmail: "daniel@example.com", createdAt: "2026-07-15T22:00:00Z", updatedAt: "2026-07-15T22:00:00Z" },
];

export const ADMIN_METRICS = {
  totalUsers: 820431,
  activeToday: 42918,
  totalAum: 4_210_000_000,
  pendingKyc: KYC_QUEUE.length,
  pendingWithdrawals: 18,
  openTickets: SUPPORT_TICKETS.filter((t) => t.status === "OPEN").length,
};

export const SIGNUP_GROWTH = [
  { month: "Feb", users: 690000 },
  { month: "Mar", users: 715000 },
  { month: "Apr", users: 742000 },
  { month: "May", users: 771000 },
  { month: "Jun", users: 798000 },
  { month: "Jul", users: 820431 },
];

export const DEPOSITS_WITHDRAWALS_VOLUME = [
  { month: "Feb", deposits: 182, withdrawals: 121 },
  { month: "Mar", deposits: 201, withdrawals: 138 },
  { month: "Apr", deposits: 245, withdrawals: 154 },
  { month: "May", deposits: 229, withdrawals: 162 },
  { month: "Jun", deposits: 268, withdrawals: 171 },
  { month: "Jul", deposits: 291, withdrawals: 183 },
];
